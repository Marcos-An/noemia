import React from 'react'
import GenericIcon from '../../atoms/genericIcon'
import styles from './trashButton.module.scss'

export default function ButtonCard({ onClick }) {

  return (
    <div className={styles.wrapper}>
      <GenericIcon icon="trash" color="white" size="20" onClick={() => onClick()} />
    </div>
  )
}
