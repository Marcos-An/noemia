import React from 'react'
import GenericText from '../../atoms/genericText'
import styles from './cardDrinks.module.scss'

export default function CardDrinks({ itemMenu, onClick }) {
  const { name, path, isActive } = itemMenu

  const menuItem = () => {
    return `linear-gradient(0deg, rgba(1, 54, 134, 0.35), rgba(1, 54, 134, 0.35)) ,url(${path})`
  }

  return (
    <div
      style={{ backgroundImage: menuItem() }}
      className={styles[`${isActive ? 'cardDrinks-active' : 'cardDrinks'}`]}
      onClick={() => onClick(itemMenu)}
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