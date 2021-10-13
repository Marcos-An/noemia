import React from 'react'
import GenericTitle from '../../atoms/genericTitle'
import CardRecentOrder from '../../molecules/cardRecentOrder'
import GenericCarousel from '../../molecules/genericCarousel'
import styles from './pizzaBanner.module.scss'


export default function PizzaBanner() {

  return (
    <div className={styles.pizzaBanner}>
      <GenericTitle>Recent Orders</GenericTitle>
      <br />
      <GenericCarousel
        size={3}
        padding={false}
        limit={13}
      >
        <CardRecentOrder />
        <CardRecentOrder />
        <CardRecentOrder />
      </GenericCarousel>
    </div>
  )
}