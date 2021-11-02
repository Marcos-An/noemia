import React, { useContext } from 'react'
import styles from './cardCategory.module.scss'
import { useRouter } from 'next/router'
import GenericText from '../../atoms/genericText'
import { ControllersContext } from '../../../contexts/ControllersContext'

export default function CardCategory({ itemMenu }) {
  const controllersContext = useContext(ControllersContext)
  const { updateSelectedItemMenu } = controllersContext
  const router = useRouter()
  const { name, path, gradient } = itemMenu

  const menuItem = () => {
    return `${gradient},url(${path})`
  }

  const redirect = (itemMenu) => {
    updateSelectedItemMenu(itemMenu)
    router.push('/')
  }

  return (
    <div
      style={{ backgroundImage: menuItem() }}
      className={styles.cardCategory}
      onClick={() => redirect(itemMenu)}
    >
      <GenericText
        weight="bold"
        color={'white'}
      >
        {name}
      </GenericText>
    </div>
  )

}