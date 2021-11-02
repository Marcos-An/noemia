import styles from './currentAddress.module.scss'
import React, { useContext } from 'react'
import { AuthContext } from '@contexts/AuthContext'
import GenericDescription from '../../atoms/genericDescription'
import Image from 'next/image'
import GenericText from '../../atoms/genericText'

export default function CurrentAddress() {
  const authContext = useContext(AuthContext)
  const { user } = authContext

  const formatAddres = () => {
    const newAddress = `${user.neighbourhood}, ${user.city} - ${user.state}`
    if (!user.neighbourhood) {
      return newAddress.replace(',', '')
    }
    return newAddress
  }

  return (
    user.street ?
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
          <GenericText weight="bold">{`${user.street}, ${user.number}`}</GenericText>
          <GenericDescription>{formatAddres()}</GenericDescription>
        </div>
      </div> :
      <div className={styles.currentAddress}>
        <GenericText>We don’t find any address</GenericText>
      </div>
  )
}