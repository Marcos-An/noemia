import React from 'react'
import styles from './header.module.scss'
import SimpleAdress from '../../molecules/simpleAdress'
import CardButton from '../../molecules/cardButton'
import BackButton from '../../molecules/backButton'
import { useRouter } from 'next/router'
import GenericTitle from '../../atoms/genericTitle'

export default function Header() {
  const router = useRouter()
  const isHome = () => {
    return router.asPath === '/' ? true : false
  }

  return isHome() ? <HeaderHome /> : <HeaderWithBackButton router={router} />

}

function HeaderHome() {
  return (
    <div className={styles.headerContainer}>
      <SimpleAdress>R. Dourado, 2565</SimpleAdress>
      <CardButton />
    </div>
  )
}
function HeaderWithBackButton({ router }) {
  return (
    <div className={styles.headerWithBackButton}>
      <BackButton />
      {!router.asPath.includes("products") && <GenericTitle>Your Cart</GenericTitle>}
    </div>
  )
}