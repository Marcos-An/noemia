import React from 'react'
import styles from './updateItemCartButton.module.scss'
import GenericButton from '../../atoms/genericButton'
import AddItemButton from '../../molecules/addItemButton'
import { formatCurrency } from '../../../utils/formatData'

export default function UpdateItemCartButton({ text, onClick, price = null, isDisabled = false }) {

  return (
    <div className={styles.footer}>
      <AddItemButton />
      <GenericButton
        isDisabled={isDisabled}
        text={text}
        price={price ? formatCurrency(price) : false}
        onClick={() => onClick()}
      />
    </div>
  )
}
