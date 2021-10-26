import styles from './profile.module.scss'
import React, { useEffect, useContext } from 'react'
import { ControllersContext } from '../../contexts/ControllersContext'
import { AuthContext } from '../../contexts/AuthContext'
import ProfileLoading from '../../components/atoms/profileLoading'
import ItemProfileMenu from '../../components/molecules/itemProfileMenu'
import EmptyMessage from '../../components/molecules/emptyMessage'
import GenericButton from '@components/atoms/genericButton'
import Router from 'next/router'


export default function Profile() {
  const controllersContext = useContext(ControllersContext)
  const authContext = useContext(AuthContext)
  const { updateFooterType, isLoading } = controllersContext
  const { user } = authContext

  useEffect(() => {
    updateFooterType('main')
  }, [updateFooterType])


  return isLoading ? <ProfileLoading /> : user.uid ? <ProfileWithLogin /> : <WithoutLogin />
}

function WithoutLogin() {
  const redirect = () => {
    Router.push('/login')
  }

  return (
    <div className={styles.container}>
      <EmptyMessage
        title="You dont do your login!"
        text=" "
      />
      <GenericButton
        isDisabled={false}
        text={"Login"}
        onClick={() => redirect()} />
    </div>
  )
}

function ProfileWithLogin() {

  return (
    <div className={styles.profile}>
      <ItemProfileMenu icon="file-text" path="/profile/my-informations">My informations</ItemProfileMenu>
      <ItemProfileMenu icon="credit-card" path="/profile/payment-methods">Payment Methods</ItemProfileMenu>
      <ItemProfileMenu icon="map-pin" path="/profile/address">Adress</ItemProfileMenu>
    </div>
  )
}