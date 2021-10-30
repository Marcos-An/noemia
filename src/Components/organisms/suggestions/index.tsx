import React, { useEffect, useState, useContext } from 'react'
import GenericTitle from '../../atoms/genericTitle'
import CardSuggestions from '../../molecules/cardSuggestions'
import styles from './suggestions.module.scss'
import { ControllersContext } from '@contexts/ControllersContext'

export default function Suggestions({ products }) {

  const controllersContext = useContext(ControllersContext)
  const { selectedItemMenu } = controllersContext

  const [starterProducts, setStarterProducts] = useState([])
  const [pizzaProducts, setPizzaProducts] = useState([])

  useEffect(() => {
    const newStarters = products.filter(({ category }) => category.name === 'Starter')
    const newPizzas = products.filter(({ category }) => category.name === 'Pizza')

    const starterSugestions = [newStarters[4], newStarters[2], newStarters[1], newStarters[3]]

    const pizzaSugestions = [newPizzas[0], newPizzas[4], newPizzas[6], newPizzas[10]]

    setStarterProducts(starterSugestions)
    setPizzaProducts(pizzaSugestions)
  }, [])


  return (
    <div className={styles.suggestions}>
      <br />
      <GenericTitle>Suggestions</GenericTitle>
      <br />
      <div className={styles.suggestionsWrapper}>
        {selectedItemMenu.name === 'Starter' && starterProducts.map(product => <CardSuggestions key={product.id} product={product} />)}
        {selectedItemMenu.name === 'Pizza' && pizzaProducts.map(product => <CardSuggestions key={product.id} product={product} />)}
      </div>
    </div>
  )
}