import React from 'react'
import GenericTitle from '../../atoms/genericTitle'
import CardSuggestions from '../../molecules/cardSuggestions'
import styles from './suggestions.module.scss'


export default function Suggestions() {

  return (
    <div className={styles.suggestions}>
      <br />
      <GenericTitle>Suggestions</GenericTitle>
      <br />
      <div className={styles.suggestionsWrapper}>
        <CardSuggestions />
        <CardSuggestions />
        <CardSuggestions />
        <CardSuggestions />
      </div>
    </div>
  )
}