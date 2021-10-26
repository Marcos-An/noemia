import React, { useContext, useEffect, useState } from 'react'
import styles from './header.module.scss'
import SimpleAddress from '../../molecules/simpleAddress'
import CardButton from '../../molecules/cartButton'
import BackButton from '../../molecules/backButton'
import { useRouter } from 'next/router'
import { initializeApollo } from '@graphql/apollo'
import { GET_USERS_BY_UID } from '@graphql/queries'
import { AuthContext } from '../../../contexts/AuthContext'
import GenericTitle from '../../atoms/genericTitle'
import GenericText from '../../atoms/genericText'
import { ControllersContext } from '../../../contexts/ControllersContext'

export default function Header() {
  const controllersContext = useContext(ControllersContext)
  const authContext = useContext(AuthContext)
  const { updateMainPaymentMethod, isLoading, updateLoading } = controllersContext
  const { updateUser, user } = authContext

  const router = useRouter()

  useEffect(() => {
    updateLoading(true)
    const client = initializeApollo()
    const userStorage: any = JSON.parse(localStorage.getItem('@noemia:user'))

    async function fetchMyAPI() {
      if (userStorage) {
        await client.query({
          query: GET_USERS_BY_UID,
          variables: {
            uid: userStorage.uid,
          }
        }).then(({ data }) => {
          updateLoading(false)
          updateUser(data.users[0])
          updateMainPaymentMethod(data.users[0].mainPaymentMethod[0])
        })
      }
    }

    if (!user.uid) {
      fetchMyAPI()
    } else {
      updateLoading(false)
    }
  }, [updateLoading, updateMainPaymentMethod, updateUser, user.uid])

  const headerShow = () => {
    const path = router.asPath
    if (path === '/' || path === '/profile' || path === '/search' || path === '/login' || path === '/register') {
      if (path === '/') {
        return <HeaderHome />
      }
      if (path === '/profile') {
        return <HeaderProfile authContext={authContext} />
      }
      if (path === '/search') {
        return <HeaderSearch />
      }
      if (path === '/login') {
        return <div />
      }
      if (path === '/register') {
        return <div />
      }
    } else {
      return <HeaderWithBackButton controllersContext={controllersContext} />
    }
  }

  return isLoading ? <div /> : headerShow()

}

function HeaderHome() {
  return (
    <div className={styles.headerContainer}>
      <SimpleAddress>R. Dourado, 2565</SimpleAddress>
      <CardButton />
    </div>
  )
}

function HeaderProfile({ authContext }) {
  const { user } = authContext

  return (
    user.uid ? <div className={styles.headerProfile}>
      <GenericText>User configurations</GenericText>
      <GenericTitle>{user.name}</GenericTitle>
    </div> : <div />
  )
}

function HeaderSearch() {
  return (
    <div />
  )
}


function HeaderWithBackButton({ controllersContext }) {
  const { headerText } = controllersContext

  return (
    <div className={styles.headerWithBackButton}>
      <BackButton />
      <GenericTitle>{headerText}</GenericTitle>
    </div>
  )
}