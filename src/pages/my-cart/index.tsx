import styles from './myCart.module.scss'
import React, { useState, useEffect, useContext } from 'react'
import { ControllersContext } from '../../contexts/ControllersContext'
import { AuthContext } from '../../contexts/AuthContext'
import CardMyCart from '../../components/molecules/cardMyCart'
import { initializeApollo } from '@graphql/apollo'
import { GET_CART_BY_UID } from '@graphql/queries'
import { REMOVE_USER_CART_ITEM } from '@graphql/mutations'
import GenericTitle from '../../components/atoms/genericTitle'
import Drawer from '../../components/molecules/drawer'
import TrashButton from '../../components/molecules/trashButton'
import RadioSelector from '../../components/organisms/radioSelector'
import UpdateItemCartButton from '../../components/organisms/updateItemCartButton'
import { SIZE_OPTIONS } from '../../utils/datas'
import EmptyMessage from '../../components/molecules/emptyMessage'
import ResumeCart from '../../components/molecules/resumeCart'
import { useMutation } from '@apollo/react-hooks';

export default function MyCart() {
  const controllersContext = useContext(ControllersContext)
  const client = initializeApollo()
  const authContext = useContext(AuthContext)
  const { myCartItems, updateHeaderText, updateFooterType, initializeMyCart } = controllersContext
  const [removeCartItem] = useMutation(REMOVE_USER_CART_ITEM);

  const { user, updateUser } = authContext


  useEffect(() => {
    updateHeaderText('Your Cart')
    updateFooterType('cartDetail')
  }, [updateHeaderText, updateFooterType])

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
          updateUser(data.users[0].cart)
          initializeMyCart(data.users[0].cart)
        })
      }
    }
    if (userStorage && user.uid) {
      fetchCartUser()
    }
  }, [])


  return myCartItems.length > 0 ?
    <CartWithItems
      controllersContext={controllersContext}
      authContext={authContext}
      removeCartItem={removeCartItem}
    /> : <CartWithoutItems />
}

function CartWithItems({ controllersContext, authContext, removeCartItem }) {
  const [drawerIsActive, setDrawerIsActive] = useState(false)
  const [options, setOptions] = useState(SIZE_OPTIONS)

  const {
    myCartItems,
    addingCardItem,
    updateAddingCartItem,
    updateMyCart,
    removingItemFromCart
  } = controllersContext

  useEffect(() => {
    const newOptions = [...options]

    newOptions.forEach((currentItem) => {
      if (currentItem.value === addingCardItem.size) {
        currentItem.isActive = true;
      } else {
        currentItem.isActive = false;
      }
    })

    setOptions(() => [...newOptions])
  }, [])

  const handleDrawerActive = (selectedItem) => {
    updateAddingCartItem(selectedItem)
    setDrawerIsActive(!drawerIsActive)
  }

  const handleActiveOption = itemSeleted => {
    const newOptions = [...options]
    var newAddingCartItem = addingCardItem

    newOptions.forEach((currentItem) => {
      if (currentItem === itemSeleted) {
        currentItem.isActive = true;
      } else {
        currentItem.isActive = false;
      }
    })

    var percentPice: number

    if (itemSeleted.value === 'Large') {
      newAddingCartItem = { ...newAddingCartItem, priceBySize: newAddingCartItem.price }
    }
    if (itemSeleted.value === 'Medium') {
      percentPice = parseInt((newAddingCartItem.price * 0.8).toFixed(2))
      newAddingCartItem = { ...newAddingCartItem, priceBySize: percentPice }
    }

    if (itemSeleted.value === 'Mini') {
      percentPice = parseInt((newAddingCartItem.price * 0.7).toFixed(2))
      newAddingCartItem = { ...newAddingCartItem, priceBySize: percentPice }
    }

    newAddingCartItem.size = itemSeleted.value
    newAddingCartItem = { ...newAddingCartItem, size: itemSeleted.value }

    console.log(newAddingCartItem)
    setOptions(() => [...newOptions])
    updateAddingCartItem({ ...newAddingCartItem })
  }

  const updateCart = () => {
    updateMyCart(addingCardItem)
    setDrawerIsActive(!drawerIsActive)
  }

  const removeItem = () => {
    const userStorage: any = JSON.parse(localStorage.getItem('@noemia:user'))

    removeCartItem({
      variables: {
        uid: userStorage.uid,
        id: addingCardItem.id
      }
    }).then(() => {
      removingItemFromCart(addingCardItem)
      setDrawerIsActive(!drawerIsActive)
    })
  }


  return (
    <div className={styles.container}>
      {myCartItems.map(item =>
        <CardMyCart key={item.id} product={item} openDrawer={() => handleDrawerActive(item)} />
      )}

      <ResumeCart />

      <Drawer isActive={drawerIsActive} close={setDrawerIsActive}>
        <div className={styles.titleAndTrashButton}>
          <GenericTitle>{addingCardItem.name}</GenericTitle>
          <TrashButton onClick={removeItem} />
        </div>
        {addingCardItem.type === 'Pizza' && (
          <div className={styles.chooseSize}>
            <GenericTitle>Choose a size</GenericTitle>
            <RadioSelector options={options} changeOption={handleActiveOption} />
          </div>
        )}
        <UpdateItemCartButton
          isDisabled={false}
          price={addingCardItem.quantity * addingCardItem.price}
          text="Update cart"
          onClick={updateCart}
        />
      </Drawer>
    </div >
  )
}



function CartWithoutItems() {
  return (
    <div className={styles.container}>
      <EmptyMessage
        title="Dishes is clear!"
        text="We don't find any items in your cart, add an item and come back here."
      />
    </div>
  )
}