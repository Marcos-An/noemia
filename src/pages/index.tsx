import React, { useContext, useEffect } from 'react'
import { ControllersContext } from '../Contexts/ControllersContext'
import styles from './home.module.scss'
import MainMenu from '../Components/organisms/mainMenu'
import Suggestions from '../Components/organisms/suggestions'
import Banners from '../Components/organisms/banners'
import AllMenu from '../Components/organisms/allMenu'

export default function Home() {
  const controllersContext = useContext(ControllersContext)
  const { updateFooterType } = controllersContext

  useEffect(() => {
    updateFooterType('main')
  }, [])

  return (
    <div className={styles.container}>
      <MainMenu />
      <Banners />
      <Suggestions />
      <AllMenu />
    </div>
  )
}
