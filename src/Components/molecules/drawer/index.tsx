import React from 'react';
import styles from './drawer.module.scss'

export default function Drawer({ isActive, close, children }) {
  return isActive && (
    <div className={styles.drawer}>
      <div className={styles.closeDiv} onClick={() => close(false)} />
      <div className={styles.contentDrawerContainer}>
        {children}
      </div>
    </div>
  )
}