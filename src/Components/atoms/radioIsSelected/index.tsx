import React from 'react'
import styles from './radioIsSelected.module.scss'

export default function RadioIsSelected({ isActive }) {

  return isActive ? <Selected /> : <Default />
}

function Selected() {
  return <div className={styles.selected} />
}

function Default() {
  return <div className={styles.default} />
}
