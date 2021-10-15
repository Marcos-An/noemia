import React from 'react'
import styles from './cardAddress.module.scss'
import GenericText from '../../atoms/genericText'
import GenericDescription from '../../atoms/genericDescription'
import GenericIcon from '../../atoms/genericIcon'
import { useRouter } from 'next/router'

export default function CardAddress({ address }) {
  const router = useRouter()

  const formatAddres = () => {
    const newAddress = `${address.neighbourhood}, ${address.city} - ${address.state}`
    if (!address.neighbourhood) {
      return newAddress.replace(',', '')
    }
    return newAddress
  }

  return (
    <div className={styles.cardAddress}>
      <GenericText weight="bold">{`${address.street}, ${address.number}`}</GenericText>
      <GenericDescription>{formatAddres()}</GenericDescription>
      <div className={styles.icon}>
        <GenericIcon icon="edit-3" size="16" color="grey" onClick={() => router.push('/profile/address/edit-address')} />
      </div>
    </div>
  )
}