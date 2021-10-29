import React, { useContext, useState, useEffect } from 'react'
import styles from './buttonFooter.module.scss'
import GenericButton from '../../atoms/genericButton'
import { ControllersContext } from '../../../contexts/ControllersContext'
import { AuthContext } from '../../../contexts/AuthContext'
import UpdateItemCartButton from '../../organisms/updateItemCartButton'
import { formatCurrency } from '../../../utils/formatData'
import Router from 'next/router'
import GenericTitle from '../../atoms/genericTitle'
import GenericText from '../../atoms/genericText'
import { format } from 'date-fns'
import { CREATE_USER_CART_ITEM, UPDATE_USER_CART_ITEM } from '@graphql/mutations'
import { useMutation } from '@apollo/react-hooks';
import _ from 'lodash'
import { initializeApollo } from '@graphql/apollo'
import { GET_CART_BY_UID } from '@graphql/queries'

export default function ButtonFooter() {
  const controllersContext = useContext(ControllersContext)
  const authContext = useContext(AuthContext)
  const [priceBySize, setPriceBySize] = useState(0)
  const { footerType, addingCardItem } = controllersContext


  useEffect(() => {
    const newPrice = addingCardItem.quantity * addingCardItem.priceBySize
    setPriceBySize(newPrice)
  }, [addingCardItem])

  const selectFooter = () => {
    if (footerType === 'productDetail') {
      return (
        <ProductDetail
          controllersContext={controllersContext}
          authContext={authContext}
          price={priceBySize}
        />

      )
    }

    if (footerType === 'cartDetail') {
      return <CartDetail controllersContext={controllersContext} authContext={authContext} />
    }

    if (footerType === 'payment') {
      return <CartPayment controllersContext={controllersContext} authContext={authContext} />
    }
  }

  return selectFooter()
}

// FOOTER PRODUCT DETAIL
function ProductDetail({ controllersContext, authContext, price }) {
  const [isLoading, setIsLoading] = useState(false)
  const [createUserCartItem] = useMutation(CREATE_USER_CART_ITEM);
  const [updateUserCartItem] = useMutation(UPDATE_USER_CART_ITEM);
  const { addingCardItem, updateMyCart, myCartItems } = controllersContext
  const { user } = authContext

  const addToCart = () => {
    const userStorage: any = JSON.parse(localStorage.getItem('@noemia:user'))

    setIsLoading(true)

    const {
      description,
      name,
      observation,
      path_image,
      price,
      priceBySize,
      quantity,
      id,
      type,
      size
    } = addingCardItem

    const newItem = {
      description,
      name,
      observation,
      path_image,
      price,
      priceBySize,
      quantity,
      size,
      id,
      type,
      user_id: userStorage ? userStorage.uid : user.id,
    }

    var hasInCart = false

    if (user.uid && user.card) {
      hasInCart = _.includes([...myCartItems, ...user.card], newItem)
    } else {
      hasInCart = _.includes([...myCartItems], newItem)
    }


    if (user.uid && user.cart && userStorage.uid) {
      if (hasInCart) {
        createUserCartItem({
          variables: {
            cartItem: newItem
          }
        }).then((data) => {
          console.log(data)
          Router.push('/my-cart')
          updateMyCart(addingCardItem)
        }).catch((error) => console.log(error))
      } else {
        updateUserCartItem({
          variables: {
            uid: userStorage.uid,
            id: newItem.id,
            cartItem: newItem
          }
        }).then((data) => {
          console.log(data)
          Router.push('/my-cart')
          updateMyCart(addingCardItem)
        }).catch((error) => console.log(error))
      }
    } else {
      Router.push('/my-cart')
      updateMyCart(addingCardItem)
    }

    setIsLoading(false)
  }

  return (
    <div className={styles.footerUpdateItem}>
      <UpdateItemCartButton
        price={price}
        onClick={addToCart}
        isLoading={isLoading}
        text="Add to cart"
        isDisabled={addingCardItem.size ? false : true}
      />
    </div>
  )
}

// FOOTER MY CART DETAIL
function CartDetail({ controllersContext, authContext }) {
  const client = initializeApollo()
  const { myCartItems, initializeMyCart } = controllersContext
  const { user, updateUser } = authContext
  const hasUser = localStorage.getItem('@noemia:user')


  useEffect(() => {
    const userStorage: any = JSON.parse(localStorage.getItem('@noemia:user'))

    async function fetchCartUser() {
      if (userStorage) {
        await client.query({
          query: GET_CART_BY_UID,
          variables: {
            uid: userStorage.uid,
          }
        }).then(({ data }) => {
          updateUser({ cart: data.users[0].cart })
          initializeMyCart(data.users[0].cart)
        })
      }
    }
    if (userStorage && !user.cart) {
      fetchCartUser()
    }
  }, [])


  const currentPrice = () => {
    var subTotal = 0

    user.cart.forEach(({ quantity, priceBySize }) => {
      subTotal = subTotal + (quantity * priceBySize)
    })

    return subTotal + 5
  }

  const redirect = () => {
    if (hasUser) {
      Router.push('/my-cart/payment')
    } else {
      Router.push('/login')
    }
  }

  const disableButton = () => {
    if (!hasUser) {
      return false
    }
    if (hasUser && myCartItems.length > 0) {
      return false
    }
    if (hasUser && myCartItems.length === 0) {
      return true
    }
  }

  return (
    <div className={styles.footer}>

      <div className={styles.totalPrice}>
        <GenericText>Total</GenericText>
        {user.cart ?
          <GenericTitle>{formatCurrency(currentPrice())}</GenericTitle> :
          <GenericTitle>{formatCurrency(0)}</GenericTitle>
        }
      </div>
      <GenericButton
        isDisabled={disableButton()}
        text={!hasUser ? "Do Login" : myCartItems.length > 0 ? "Payment" : "Any Items"}
        onClick={() => redirect()} />
    </div>
  )
}

// FOOTER CART PAYMENT
function CartPayment({ controllersContext, authContext }) {
  const { myCartItems, updateOrder } = controllersContext
  const { user } = authContext

  const isDisabled = () => {
    return user.street && (myCartItems.length > 0 || user.cart > 0) ? false : true
  }

  const date = format(new Date(), 'PP')

  const saveOrderStatus = () => {
    const newOrder = {
      myCartItems: myCartItems,
      dateOrder: date,
      orderStatus: 'confirmed',
      orderId: Math.floor(Math.random() * 100) + 1
    }

    updateOrder(newOrder)

    Router.push(`/my-cart/order-status/${newOrder.orderId}`)
  }

  return (
    <div className={styles.cartPayment}>
      <GenericButton isDisabled={isDisabled()} text="Place Order" onClick={() => saveOrderStatus()} />
    </div>
  )
}