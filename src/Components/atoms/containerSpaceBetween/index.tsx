import React, { useContext, useEffect } from 'react';
import { ControllersContext } from '../../../Contexts/ControllersContext'
import styles from './containerSpaceBetween.module.scss'

export default function ContainerSpaceBetween({ children }) {
  const controllersContext = useContext(ControllersContext)
  const { updateHeaderText, updateFooterType, } = controllersContext

  useEffect(() => {
    updateHeaderText('Payment')
    updateFooterType('payment')
  }, [updateHeaderText, updateFooterType])

  return (
    <div className={styles.container}>
      {children}
    </div>
  )
}