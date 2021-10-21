import React, { useContext } from 'react'
import styles from './header.module.scss'
import SimpleAddress from '../../molecules/simpleAddress'
import CardButton from '../../molecules/cartButton'
import BackButton from '../../molecules/backButton'
import { useRouter } from 'next/router'
import GenericTitle from '../../atoms/genericTitle'
import GenericText from '../../atoms/genericText'
import { ControllersContext } from '../../../contexts/ControllersContext'

export default function Header() {
  const controllersContext = useContext(ControllersContext)
  const router = useRouter()

  const headerShow = () => {
    const path = router.asPath
    if (path === '/' || path === '/profile' || path === '/search' || path === '/login' || path === '/register') {
      if (path === '/') {
        return <HeaderHome />
      }
      if (path === '/profile') {
        return <HeaderProfile controllersContext={controllersContext} />
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

  return headerShow()

}

function HeaderHome() {
  return (
    <div className={styles.headerContainer}>
      <SimpleAddress>R. Dourado, 2565</SimpleAddress>
      <CardButton />
    </div>
  )
}

function HeaderProfile({ controllersContext }) {
  const { myInformations } = controllersContext

  return (
    <div className={styles.headerProfile}>
      <GenericText>User configurations</GenericText>
      <GenericTitle>{myInformations.name}</GenericTitle>
    </div>
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