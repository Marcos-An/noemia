import styles from './mainPaymentMethod.module.scss'
import React, { useContext } from 'react'
import { ControllersContext } from '../../../Contexts/ControllersContext'
import Image from 'next/image'
import GenericTitle from '../../atoms/genericTitle'
import GenericText from '../../atoms/genericText'

export default function MainPaymentMethod() {
  const controllersContext = useContext(ControllersContext)
  const { mainPaymentMethod } = controllersContext

  const hideNumber = (number) => {
    return number.replace(/\d{4}(?= \d{4})/g, "****");
  }

  return (
    <div className={styles.MainPaymentMethod}>
      <div className={styles.imageContainer}>
        <Image
          src={`/${mainPaymentMethod.type}.png`}
          alt={mainPaymentMethod.type}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className={styles.nameNumber}>
        <GenericTitle>{mainPaymentMethod.nickName ? mainPaymentMethod.nickName : mainPaymentMethod.niceType}</GenericTitle>
        {mainPaymentMethod.cardNumber && <GenericText>{hideNumber(mainPaymentMethod.cardNumber)}</GenericText>}
      </div>
    </div>
  )
}