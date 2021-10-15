import styles from './cardPaymentMethods.module.scss'
import React, { useEffect, useContext } from 'react'
import { ControllersContext } from '../../../Contexts/ControllersContext'
import Image from 'next/image'
import GenericTitle from '../../atoms/genericTitle'
import GenericText from '../../atoms/genericText'
import GenericIcon from '../../atoms/genericIcon'

export default function CardPaymentMethods({ card, onClick }) {
  const controllersContext = useContext(ControllersContext)
  const { updateFooterType, updateHeaderText } = controllersContext

  useEffect(() => {
    updateHeaderText('Payment Methods')
    updateFooterType('none')
  }, [updateHeaderText, updateFooterType])

  const hideNumber = (number) => {
    return number.replace(/\d{4}(?= \d{4})/g, "****");
  }

  return (
    <div className={styles.cardPaymentMethods}>
      <div className={styles.imageContainer}>
        <Image
          src={`/${card.type}.png`}
          alt={card.type}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className={styles.nameNumber}>
        <GenericTitle>{card.nickName ? card.nickName : card.niceType}</GenericTitle>
        {card.cardNumber && <GenericText>{hideNumber(card.cardNumber)}</GenericText>}
      </div>
      <div className={styles.icon}>
        {card.cardNumber && <GenericIcon icon="edit-3" size="16" color="grey" onClick={() => onClick()} />}
      </div>
    </div>
  )
}