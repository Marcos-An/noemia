import React from 'react'
import styles from './itemRadio.module.scss'
import GenericText from '../../atoms/genericText'
import RadioIsSelected from '../../atoms/radioIsSelected'

export default function ItemRadio({ option }) {
  const { label, isActive } = option

  return (
    <div className={styles.container}>
      <GenericText>{label}</GenericText>
      <RadioIsSelected isActive={isActive} />
    </div>
  )
}
