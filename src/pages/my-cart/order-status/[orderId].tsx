import styles from './orderStatus.module.scss'
import React, { useContext, useEffect, useState } from 'react'
import { ControllersContext } from '../../../contexts/ControllersContext' 
import OrderStatusItem from '../../../components/molecules/orderStatusItem'
import GenericTitle from '../../../components/atoms/genericTitle'
import GenericText from '../../../components/atoms/genericText'
import GenericButton from '../../../components/atoms/genericButton'
import { REMOVE_USER_CART_ITEM } from '@graphql/mutations'
import { useMutation } from '@apollo/react-hooks'; 
import { format } from 'date-fns' 
import { useRouter } from 'next/router'


export default function OrderStatus() {
  const controllersContext = useContext(ControllersContext)
  const [removeCartItem] = useMutation(REMOVE_USER_CART_ITEM);
  const { updateHeaderText, updateFooterType, order, cartItems, removingItemFromCart} = controllersContext
  const [index, setIndex] = useState(0)
  const [currentOrder, setCurrrentOrder] = useState({
    dateOrder: "",
    cartItems: [],
    orderId: 0,
    orderStatus: [  ]
  })

  const router = useRouter()
  
  useEffect(() => {
    updateHeaderText('Order Status')
    updateFooterType('none')
  }, [updateHeaderText, updateFooterType])


  useEffect(() => { 
    if (order.length === 0) {
      router.push('/')
    }

    order.forEach(item => {  
      if (router.query.orderId === `${item.orderId}`) {
        setCurrrentOrder(item)
      }
    })
  }, [setCurrrentOrder, order, router])


  useEffect(() => {  
    if(currentOrder.orderStatus[index]){
      if(!currentOrder.orderStatus[index].completeDate){
        setTimeout(() => {
          const newCutrrentStatus = currentOrder.orderStatus
   
          newCutrrentStatus[index].completeDate  = format(new Date(), 'MM/dd - p')
          
          setIndex(index + 1)
          setCurrrentOrder({...currentOrder, orderStatus: newCutrrentStatus})
        }, 3000)
      }  
    }
  }, [currentOrder, index])

  useEffect(() => {  
    if(index === currentOrder.orderStatus.length -1) {
      const userStorage: any = JSON.parse(localStorage.getItem('@noemia:user'))

      cartItems.forEach(item => { 
        removeCartItem({
          variables: {
            uid: userStorage.uid,
            id: item.id
          }
        }).then(() => {
          removingItemFromCart(item) 
        }) 
      })
    }
  }, [currentOrder])

  const showButton = () => {
    if(currentOrder.orderStatus[3] && currentOrder.orderStatus[3].completeDate){
      return true
    } return false
  }

  return (
    <div className={styles.orderStatus}>
      <br />
      <GenericTitle>{`Order - # ${currentOrder.orderId}`}</GenericTitle>
      <GenericText>{`Purchase Date - ${currentOrder.dateOrder}`}</GenericText>
      <div className={styles.status}>
        {currentOrder.orderStatus.map((status, index) => (
          <OrderStatusItem key={index} status={status} />
        ))} 
      </div> 
      { showButton() && <GenericButton text="Back to home" onClick={() => router.push('/')}/>}
      
    </div>
  )
}