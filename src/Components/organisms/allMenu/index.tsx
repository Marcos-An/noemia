import React, { useState, useEffect , useContext} from 'react'
import styles from './allMenu.module.scss'
import GenericTitle from '../../atoms/genericTitle'
import CardAllMenu from '../../molecules/cardAllMenu'
import { ControllersContext } from '../../../contexts/ControllersContext'

export default function AllMenu({ products }) {
  const controllersContext = useContext(ControllersContext)
  const { selectedItemMenu } = controllersContext

  const [starterProducts, setStarterProducts] = useState([])
  const [pizzaProducts, setPizzaProducts] = useState([])
  const [wineProducts, setWineProducts] = useState([])
  const [drinkProducts, setDrinkProducts] = useState([])

  useEffect(() => {
    const newStarters = products.filter(({category}) => category.name === 'Starter')
    const newPizzas = products.filter(({category}) => category.name === 'Pizza')
    const newWine = products.filter(({category}) => category.name === 'Wine')
    const newDrinks = products.filter(({category}) => category.name === 'Drink')

    setStarterProducts(newStarters)
    setPizzaProducts(newPizzas) 
    setDrinkProducts(newDrinks)
    setWineProducts(newWine)
  }, [])
 
  return (
    <div className={styles.allMenu}>
      <br />
      <GenericTitle>Our Menu</GenericTitle>
      <br />
      <div>
        {selectedItemMenu.name === 'Starter' && starterProducts.map(product => <CardAllMenu key={product.id} product={product} /> )} 
        {selectedItemMenu.name === 'Pizza' && pizzaProducts.map(product => <CardAllMenu key={product.id} product={product} /> )} 
        {selectedItemMenu.name === 'Wine' && wineProducts.map(product => <CardAllMenu key={product.id} product={product} /> )} 
        {selectedItemMenu.name === 'Drink' && drinkProducts.map(product => <CardAllMenu key={product.id} product={product} /> )} 
      </div>
    </div>
  )
}
