import React from 'react'
import styles from './home.module.scss'
import MainMenu from '../Components/organisms/mainMenu'
import Sugestions from '../Components/organisms/sugestions'
import Banners from '../Components/organisms/banners'
import AllMenu from '../Components/organisms/allMenu'

export default function Home() {

  return (
    <div className={styles.container}>
      <MainMenu />
      <Banners />
      <Sugestions />
      <AllMenu />
    </div>
  )
}
