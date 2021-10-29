import React, { useContext } from 'react'
import styles from './cardAddress.module.scss'
import GenericText from '../../atoms/genericText'
import GenericDescription from '../../atoms/genericDescription'
import { AuthContext } from '../../../contexts/AuthContext'
import GenericIcon from '../../atoms/genericIcon'
import { useRouter } from 'next/router'

export default function CardAddress() {
  const router = useRouter()
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
    <div className={styles.cardAddress}>
      <GenericText weight="bold">{`${user.street}, ${user.number}`}</GenericText>
      <GenericDescription>{formatAddres()}</GenericDescription>
      <div className={styles.icon}>
        <GenericIcon icon="edit-3" size="16" color="grey" onClick={() => router.push('/profile/address/edit-address')} />
      </div>
    </div>
  )
}