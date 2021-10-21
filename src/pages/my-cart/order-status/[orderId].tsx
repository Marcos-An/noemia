import styles from './orderStatus.module.scss'
import React, { useContext, useEffect, useState } from 'react'
import { ControllersContext } from '../../../contexts/ControllersContext'
import OrderStatusItem from '../../../components/molecules/orderStatusItem'
import GenericTitle from '../../../components/atoms/genericTitle'
import GenericText from '../../../components/atoms/genericText'
import { useRouter } from 'next/router'


export default function OrderStatus() {
  const controllersContext = useContext(ControllersContext)
  const { updateHeaderText, updateFooterType, order } = controllersContext
  const [currentOrder, setCurrrentOrder] = useState({
    dateOrder: "",
    myCartItems: [],
    orderId: 0,
    orderStatus: []
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
    </div>
  )
}