import styles from './cardPaymentMethods.module.scss'
import React, { useEffect, useContext } from 'react'
import { ControllersContext } from '../../../contexts/ControllersContext'
import Image from 'next/image'
import GenericTitle from '../../atoms/genericTitle'
import GenericText from '../../atoms/genericText'
import GenericIcon from '../../atoms/genericIcon'

export default function CardPaymentMethods({ card, edit = true, updatePayment }) {
  const controllersContext = useContext(ControllersContext)
  const { updateFooterType, updateHeaderText, updateMainPaymentMethod, mainPaymentMethod } = controllersContext

  useEffect(() => {
    updateHeaderText('Payment Methods')
    updateFooterType('none')
  }, [updateHeaderText, updateFooterType])

  const hideNumber = (number) => {
    return number.replace(/\d{4}(?= \d{4})/g, "****");
  }

  const isPaymentEqual = () => {
    if (mainPaymentMethod.number === card.number) {
      return true;
    } return false;
  }

  return (
    <div
      className={isPaymentEqual() ? styles.cardPaymentMethodsMain : styles.cardPaymentMethods}
      onClick={() => updateMainPaymentMethod(card)}
    >
      <div className={styles.imageContainer}>
        <Image
          src={`/${card.type}.png`}
          alt={card.type}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className={styles.nameNumber}>
        <GenericTitle>{card.nickName ? card.nickName : card.niceType}{isPaymentEqual() && <span>- Main</span>} </GenericTitle>
        {card.number && <GenericText>{hideNumber(card.number)}</GenericText>}
      </div>
      <div className={styles.icon}>
        {card.number && edit && <GenericIcon icon="edit-3" size="16" color="grey" onClick={updatePayment} />}
      </div>
    </div>
  )
}