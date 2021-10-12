import React from 'react'
import styles from './allMenu.module.scss'
import GenericTitle from '../../atoms/genericTitle'
import CardAllMenu from '../../molecules/cardAllMenu'

export default function AllMenu() {
  return (
    <div className={styles.allMenu}>
      <br />
      <GenericTitle>Our Menu</GenericTitle>
      <br />
      <div>
        <CardAllMenu />
        <CardAllMenu />
        <CardAllMenu />
        <CardAllMenu />
        <CardAllMenu />
      </div>
    </div>
  )
}
