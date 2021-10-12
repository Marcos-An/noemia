import React from 'react'
import GenericText from '../../atoms/genericText'
import styles from './cardNav.module.scss'

export default function CardNav({ itemMenu, onClick }) {
  const { name, path, isActive, gradient } = itemMenu

  const menuItem = () => {
    return `${isActive ? 'linear-gradient(0deg, rgba(36, 28, 0, 0.8), rgba(36, 28, 0, 0.8))' : gradient},url(${path})`
  }

  return (
    <div
      style={{ backgroundImage: menuItem() }}
      className={styles.cardNav}
      onClick={() => onClick(itemMenu)}
    >
      <GenericText
        weight="bold"
        color={isActive ? 'yellow' : 'white'}
      >
        {name}
      </GenericText>
    </div>
  )

}