import React, { useState, useContext, useEffect } from 'react'
import styles from './product.module.scss'
import GenericTitle from '../../components/atoms/genericTitle'
import GenericIcon from '../../components/atoms/genericIcon'
import GenericText from '../../components/atoms/genericText'
import GenericInputArea from '../../components/atoms/genericInputArea'
import RadioSelector from '../../components/organisms/radioSelector'
import { ControllersContext } from '../../contexts/ControllersContext'
import { SIZE_OPTIONS } from '../../utils/datas'
import { initializeApollo } from '@graphql/apollo'
import { GET_PRODUCT_BY_ID, GET_PRODUCTS_QUERY } from '@graphql/queries'
import Image from 'next/image'
import { GetStaticPaths, GetStaticProps } from 'next'
import { AuthContext } from '@contexts/AuthContext'
import _ from 'lodash'

export const getStaticPaths: GetStaticPaths = async () => {
  const client = initializeApollo()
  const products = await client.query({ query: GET_PRODUCTS_QUERY }).then(({ data }) => data.product)


  const paths = products.map(product => {
    return { params: { productType: product.category.name, id: product.id.toString() } }
  })

  return {
    paths,
    fallback: 'blocking'
  }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const client = initializeApollo()

  const { id } = context.params


  const product = await client.query({ query: GET_PRODUCT_BY_ID, variables: { id } }).then(({ data }) => data.product[0])
  
  return {
    props: {
      product
    },
  }
}


export default function Product({ product }) {
  const [options, setOptions] = useState(SIZE_OPTIONS)
  const [observation, setObservation] = useState({ value: '', fieldActive: false })
  const controllersContext = useContext(ControllersContext)
  const authContext = useContext(AuthContext)

  const { addingCardItem, updateAddingCartItem, updateHeaderText, updateFooterType, cartItems } = controllersContext
  const { user } = authContext

  useEffect(() => {
    updateHeaderText('')
    updateFooterType('productDetail') 

    var hasInCart = false
 
    if (user.card) {
      hasInCart = _.some([...cartItems, ...user.card], product)
    } else { 
      hasInCart = _.some([...cartItems], product)
    }

    if (!hasInCart) {
      if (addingCardItem.id !== product.id) {
        const newCardItem = {
          ...product,
          type: product.category.name,
          priceBySize: product.price,
          observation: '',
          quantity: 1,
          size: ''
        }
        updateAddingCartItem(newCardItem)
      }
    } else {
      if (user.card) {
        [...cartItems, ...user.card].forEach(item => {
          if (item.id === product.id) {
            updateAddingCartItem(item)
          }
        })
      } else {
        [...cartItems].forEach(item => {
          if (item.id === product.id) {
            updateAddingCartItem(item)
          }
        })
      }
    }

  }, []);

  const handleActive = itemSeleted => {
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

    setOptions(() => [...newOptions])
    updateAddingCartItem({ ...newAddingCartItem })
  }

  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <Image
          src={product.path_image}
          alt={product.name}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className={styles.informationsContainer}>
        <GenericTitle>{product.name}</GenericTitle>
        <GenericText>{product.description}</GenericText>
        {product.category.name === 'Pizza' && (
          <div className={styles.chooseSize}>
            <GenericTitle>Choose a size</GenericTitle>
            <RadioSelector options={options} changeOption={handleActive} />
          </div>
        )}
        <div className={styles.addObservationWrapper}>
          <GenericIcon icon="message-square" size="18" />
          <GenericTitle>Add observation</GenericTitle>
        </div>
        <GenericInputArea
          observation={observation}
          setObservation={setObservation}
        />
      </div>
    </div>
  )
}