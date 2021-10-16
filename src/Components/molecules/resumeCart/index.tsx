import React, { useContext } from 'react';
import styles from './resumeCart.module.scss'
import GenericTitle from '../../atoms/genericTitle'
import GenericText from '../../atoms/genericText'
import { formatCurrency } from '../../../utils/formatData'
import { ControllersContext } from '../../../Contexts/ControllersContext'


export default function Payment() {
  const controllersContext = useContext(ControllersContext)
  const { myCartItems } = controllersContext

  const currentPrice = () => {
    var subTotal = 0

    myCartItems.forEach(({ quantity, price }) => {
      subTotal = quantity * price
    })

    return subTotal
  }

  const itemPrice = (item) => {
    var subTotal = 0

    subTotal = item.quantity * item.price

    return subTotal
  }


  return (
    <div className={styles.resumeCart}>
      <GenericTitle>Your Resume</GenericTitle>
      {myCartItems.map(item => (
        <div key={item.id} className={styles.resumeItems}>
          <GenericText>{item.name}</GenericText>
          <GenericTitle>{formatCurrency(itemPrice(item))}</GenericTitle>
        </div>
      ))}
      <div className={styles.resumeItems}>
        <GenericText>Subtotal</GenericText>
        <GenericTitle>{formatCurrency(currentPrice())}</GenericTitle>
      </div>
      <div className={styles.resumeItems}>
        <GenericText>Delivery</GenericText>
        <GenericTitle>{formatCurrency(5)}</GenericTitle>
      </div>
      <div className={styles.strokeDashed} />
      <div className={styles.resumeItems}>
        <GenericText>Total</GenericText>
        <GenericTitle>{formatCurrency(currentPrice() + 5)}</GenericTitle>
      </div>
    </div>
  )
}