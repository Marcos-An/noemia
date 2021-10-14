import React, { useContext } from 'react'
import styles from './header.module.scss'
import SimpleAddress from '../../molecules/simpleAddress'
import CardButton from '../../molecules/cartButton'
import BackButton from '../../molecules/backButton'
import { useRouter } from 'next/router'
import GenericTitle from '../../atoms/genericTitle'
import GenericText from '../../atoms/genericText'
import { ControllersContext } from '../../../Contexts/ControllersContext'

export default function Header() {
  const router = useRouter()

  const headerShow = () => {
    if (router.asPath === '/') {
      return <HeaderHome />
    } else if (router.asPath.includes('/profile')) {
      return <HeaderProfile />
    } else {
      return <HeaderWithBackButton router={router} />
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

function HeaderProfile() {
  return (
    <div className={styles.headerProfile}>
      <GenericText>User configurations</GenericText>
      <GenericTitle>Marcos Antonio da Silva Junior</GenericTitle>
    </div>
  )
}


function HeaderWithBackButton({ router }) {
  const controllersContext = useContext(ControllersContext)
  const { headerText } = controllersContext

  return (
    <div className={styles.headerWithBackButton}>
      <BackButton />
      <GenericTitle>{headerText}</GenericTitle>
    </div>
  )
}