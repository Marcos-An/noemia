import React from 'react'
import styles from './radioSelector.module.scss'
import ItemRadio from '../../molecules/itemRadio'

export default function RadioSelector({ options, changeOption }) {
  return (
    <div className={styles.container}>
      {options.map((option, index) =>
        <div
          key={index}
          className={styles.itemWrapper}
          onClick={() => changeOption(option)}
        >
          <ItemRadio key={index} option={option} />
        </div>
      )}
    </div>
  )
}
