import React, { useState } from 'react'
import GenericTitle from '../../atoms/genericTitle'
import styles from './drinksBanner.module.scss'
import { CARDS_MENU_DRINKS } from '../../../utils/datas'
import CardDrinks from '../../molecules/cardDrinks'

export default function DrinksBanner() {
  const [menuItems, setMenuItems] = useState(CARDS_MENU_DRINKS)


  const handleActive = itemSeleted => {
    const newMenuItems = [...menuItems]
    newMenuItems.forEach((currentItem) => {
      if (currentItem === itemSeleted) {
        currentItem.isActive = true;
      } else {
        currentItem.isActive = false;
      }
    })
    setMenuItems(() => [...newMenuItems])
  }


  return (
    <div className={styles.drinksBanner}>
      <GenericTitle>What are you looking  for?</GenericTitle>
      <div className={styles.container}>
        {menuItems.map((item) =>
          <CardDrinks
            key={item.name}
            itemMenu={item}
            onClick={handleActive}
          />
        )}
      </div>
    </div>
  )
}