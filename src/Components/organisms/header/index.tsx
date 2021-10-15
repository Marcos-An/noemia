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
  const controllersContext = useContext(ControllersContext)
  const router = useRouter()

  const headerShow = () => {
    if (router.asPath === '/') {
      return <HeaderHome />
    } else if (router.asPath === '/profile') {
      return <HeaderProfile controllersContext={controllersContext} />
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


function HeaderWithBackButton({ controllersContext }) {
  const { headerText } = controllersContext

  return (
    <div className={styles.headerWithBackButton}>
      <BackButton />
      <GenericTitle>{headerText}</GenericTitle>
    </div>
  )
}