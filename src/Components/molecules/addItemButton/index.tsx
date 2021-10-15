import React, { useContext } from 'react'
import styles from './addItemButton.module.scss'
import GenericIcon from '../../atoms/genericIcon'
import { ControllersContext } from '../../../Contexts/ControllersContext'
import GenericText from '../../atoms/genericText'

export default function AddItemButton() {
  const controllersContext = useContext(ControllersContext)
  const { addingCardItem, updateAddingCartItem } = controllersContext

  const addItem = () => {
    const newCardItem = { ...addingCardItem }

    newCardItem.quantity += 1

    updateAddingCartItem(newCardItem)
  }

  const removeItem = () => {
    const newCardItem = { ...addingCardItem }

    newCardItem.quantity -= 1

    updateAddingCartItem(newCardItem)
  }

  return (
    <div className={styles.AddItemButton}>
      <GenericIcon
        icon="minus"
        size="16"
        color={addingCardItem.quantity === 1 ? "grey" : "black"}
        onClick={addingCardItem.quantity !== 1 ? removeItem : () => { }}
      />
      <GenericText>{addingCardItem.quantity}</GenericText>
      <GenericIcon icon="plus" size="16" onClick={addItem} />
    </div>
  )
}