import styles from './profile.module.scss'
import React, { useState, useEffect, useContext } from 'react'
import { ControllersContext } from '../../Contexts/ControllersContext'


export default function Profile() {
  const controllersContext = useContext(ControllersContext)
  const { myCartItems, updateHeaderText, updateFooterType } = controllersContext

  useEffect(() => {
    updateFooterType('main')
  }, [])

  return (
    <div className={styles.profile}>
      <h1> teste</h1>
    </div>
  )
}