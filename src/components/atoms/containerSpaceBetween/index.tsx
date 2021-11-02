import React from 'react';
import styles from './containerSpaceBetween.module.scss'

export default function ContainerSpaceBetween({ children }) {
  return (
    <div className={styles.container}>
      {children}
    </div>
  )
}