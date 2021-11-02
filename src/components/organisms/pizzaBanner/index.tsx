import React, { useState, useEffect } from 'react'
import GenericTitle from '../../atoms/genericTitle'
import CardRecentOrder from '../../molecules/cardRecentOrder'
import GenericCarousel from '../../molecules/genericCarousel'
import styles from './pizzaBanner.module.scss'
import _ from 'lodash'

export default function PizzaBanner({ products }) {
  const [recentOrders, setRecentOrders] = useState([])

  useEffect(() => {
    const newRecentOrders = []


    function setRecentOrder() {
      newRecentOrders.push(products[Math.floor(Math.random() * (products.length - 1))])

      if (_.uniqBy(newRecentOrders, 'id').length !== 5) {
        setRecentOrders(_.uniqBy(newRecentOrders, 'id'))
        setRecentOrder()
      }

      if (_.uniqBy(newRecentOrders, 'id').length === 5) {
        setRecentOrders(_.uniqBy(newRecentOrders, 'id'))
      }
    }

    if (recentOrders.length === 0) {
      setRecentOrder()
    }
  }, [])

  return (
    <div className={styles.pizzaBanner}>
      <GenericTitle>Recent Orders</GenericTitle>
      <br />
      <GenericCarousel
        size={recentOrders.length}
        padding={false}
        limit={47}
      >
        {
          recentOrders.map(product => (
            <CardRecentOrder key={product.id} product={product} />
          ))
        }
      </GenericCarousel>
    </div>
  )
}