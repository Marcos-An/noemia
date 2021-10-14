import React, { useContext } from 'react'
import { ControllersContext } from '../../../Contexts/ControllersContext'
import styles from './footer.module.scss'
import MainFooter from '../mainFooter'
import ButtonFooter from '../buttonFooter'

export default function Footer() {
  const controllersContext = useContext(ControllersContext)
  const { footerType } = controllersContext

  const handleShowMainMenu = () => {
    if (footerType === 'main') {
      return true
    }
    return false
  }

  return (
    <div className={styles.footer}>
      {handleShowMainMenu() ? <MainFooter /> : <ButtonFooter />}
    </div>
  )
}