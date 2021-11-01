import React, { useState, useEffect } from 'react'
import GenericTitle from '../../atoms/genericTitle'
import styles from './drinksBanner.module.scss'
import { CARDS_MENU_DRINKS } from '../../../utils/datas'
import CardDrinks from '../../molecules/cardDrinks'
import AllMenu from '@components/organisms/allMenu'

export default function DrinksBanner({ products }) {
  const [menuItems, setMenuItems] = useState(CARDS_MENU_DRINKS)
  const [selectedItem, setSelectedItem] = useState("cocktails")
  const [cocktails, setCocktails] = useState([])
  const [sodas, setSoda] = useState([])
  const [others, setOthers] = useState([])

  useEffect(() => {
    const newCocktails = products.filter(({ drinkType }) => drinkType === 'cocktails')
    const newSoda = products.filter(({ drinkType }) => drinkType === 'sodas')
    const newOthers = products.filter(({ drinkType }) => drinkType === 'others')


    setCocktails(newCocktails)
    setSoda(newSoda)
    setOthers(newOthers)

  }, [])

  const handleActive = async itemSeleted => {
    const newMenuItems = [...menuItems]
    var value = ''
    newMenuItems.forEach((currentItem) => {
      if (currentItem === itemSeleted) {
        currentItem.isActive = true;
        value = currentItem.value
      } else {
        currentItem.isActive = false;
      }
    })
    setSelectedItem(value)
    setMenuItems(() => [...newMenuItems])
  }

  const showProducts = () => {
    if (cocktails.length > 0 && sodas.length > 0 && others.length > 0) {
      return true
    } else false
  }

  return (
    <div>
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
      {showProducts() &&
        <div className={styles.itemsWrapper}>
          {selectedItem === 'cocktails' && <AllMenu products={cocktails} />}
          {selectedItem === 'sodas' && <AllMenu products={sodas} />}
          {selectedItem === 'others' && <AllMenu products={others} />}
        </div>
      }
    </div>
  )
}