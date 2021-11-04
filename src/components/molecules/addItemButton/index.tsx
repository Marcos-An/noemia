import React, { useContext } from 'react'
import styles from './addItemButton.module.scss'
import GenericIcon from '../../atoms/genericIcon'
import GenericText from '../../atoms/genericText'
import { ControllersContext } from '@contexts/ControllersContext'

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
      <div>
        <GenericIcon
          icon="minus"
          size="16"
          color={addingCardItem.quantity === 1 ? "grey" : "black"}
          onClick={addingCardItem.quantity !== 1 ? removeItem : () => { }}
        />
      </div>
      <GenericText>{addingCardItem.quantity}</GenericText>
      <div>
        <GenericIcon icon="plus" size="16" onClick={addItem} />
      </div>
    </div>
  )
}
