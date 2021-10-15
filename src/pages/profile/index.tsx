import styles from './profile.module.scss'
import React, { useEffect, useContext } from 'react'
import { ControllersContext } from '../../Contexts/ControllersContext'
import ItemProfileMenu from '../../Components/molecules/itemProfileMenu'

export default function Profile() {
  const controllersContext = useContext(ControllersContext)
  const { updateFooterType } = controllersContext

  useEffect(() => {
    updateFooterType('main')
  }, [updateFooterType])

  return (
    <div className={styles.profile}>
      <ItemProfileMenu icon="file-text" path="/profile/my-informations">My informations</ItemProfileMenu>
      <ItemProfileMenu icon="credit-card" path="/profile/payment-methods">Payment Methods</ItemProfileMenu>
      <ItemProfileMenu icon="map-pin" path="/profile/address">Adress</ItemProfileMenu>
    </div>
  )
}