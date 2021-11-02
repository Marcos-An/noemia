import React, { useContext } from 'react'
import { ControllersContext } from '../../../contexts/ControllersContext'
import styles from './footer.module.scss'
import MainFooter from '../mainFooter'
import ButtonFooter from '../buttonFooter'

export default function Footer() {
  const controllersContext = useContext(ControllersContext)
  const { footerType } = controllersContext

  const handleShowMainMenu = () => {
    if (footerType === 'main') {
      return (
        <div className={styles.footer}>
          <MainFooter />
        </div>
      )
    } if (footerType === 'none') {
      return <div />
    } else {
      return (
        <div className={styles.footer}>
          <ButtonFooter />
        </div >
      )
    }
  }

  return handleShowMainMenu()
}