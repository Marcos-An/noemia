import React from 'react'
import GenericTitle from '../../atoms/genericTitle'
import CardSugestions from '../../molecules/cardSugestions'
import styles from './sugestions.module.scss'


export default function Sugestions() {

  return (
    <div className={styles.sugestions}>
      <br />
      <GenericTitle>Sugestions</GenericTitle>
      <br />
      <div className={styles.sugestionsWrapper}>
        <CardSugestions />
        <CardSugestions />
        <CardSugestions />
        <CardSugestions />
      </div>
    </div>
  )
}