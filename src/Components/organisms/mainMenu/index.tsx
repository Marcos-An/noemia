import styles from './mainMenu.module.scss'
import React, { useState, useContext, useEffect } from 'react'
import { ControllersContext } from '../../../Contexts/ControllersContext'
import { CARDS_MENU } from '../../../utils/datas'
import CardNav from '../../molecules/cardNav'
import GenericCarousel from '../../molecules/genericCarousel'


export default function MainMenu() {
  const [menuItems, setMenuItems] = useState(CARDS_MENU)
  const controllersContext = useContext(ControllersContext)
  const { updateSelectedItemMenu } = controllersContext

  useEffect(() => {
    const newMenuItems = menuItems

    newMenuItems.forEach((item) => {
      if (item.isActive) {
        updateSelectedItemMenu(item)
      }
    })
  }, [])


  const handleActive = itemSeleted => {
    const newMenuItems = [...menuItems]

    updateSelectedItemMenu(itemSeleted)

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
    <div className={styles.mainMenu}>
      <GenericCarousel size={menuItems.length}>
        {menuItems.map(item =>
          <CardNav
            key={item.name}
            itemMenu={item}
            onClick={handleActive}
          />
        )}
      </GenericCarousel>
    </div>
  )
}
