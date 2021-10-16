import styles from './currentAddress.module.scss'
import React, { useContext } from 'react'
import { ControllersContext } from '../../../Contexts/ControllersContext'
import GenericDescription from '../../atoms/genericDescription'
import Image from 'next/image'
import GenericText from '../../atoms/genericText'

export default function CurrentAddress() {
  const controllersContext = useContext(ControllersContext)
  const { address } = controllersContext

  const formatAddres = () => {
    const newAddress = `${address.neighbourhood}, ${address.city} - ${address.state}`
    if (!address.neighbourhood) {
      return newAddress.replace(',', '')
    }
    return newAddress
  }

  return (
    address.street ?
      <div className={styles.currentAddress}>
        <div className={styles.imageContainer}>
          <Image
            src="/maps.png"
            alt={'maps'}
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className={styles.address}>
          <GenericText weight="bold">{`${address.street}, ${address.number}`}</GenericText>
          <GenericDescription>{formatAddres()}</GenericDescription>
        </div>
      </div> :
      <div className={styles.currentAddress}>
        <GenericText>We don’t find any address</GenericText>
      </div>
  )
}