import React, { useContext } from 'react'
import styles from './buttonFooter.module.scss'
import GenericButton from '../../atoms/genericButton'
import { ControllersContext } from '../../../Contexts/ControllersContext'
import AddItemButton from '../../molecules/addItemButton'
import { formatCurrency } from '../../../utils/formatData'

export default function ButtonFooter() {
  const controllersContext = useContext(ControllersContext)
  const { addingCardItem } = controllersContext

  const currentPrice = () => {
    return addingCardItem.quantity * addingCardItem.price
  }

  return (
    <div className={styles.footer}>
      <AddItemButton />
      <GenericButton disabled={addingCardItem.size ? false : true} text="Add to cart" price={formatCurrency(currentPrice())} />
    </div>
  )
}