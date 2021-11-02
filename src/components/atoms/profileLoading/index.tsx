import React from 'react';
import styles from './profileLoading.module.scss'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export default function ProfileLoading() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Skeleton className={styles.skeletonText} />
        <Skeleton className={styles.skeletonName} />
      </div>
      <div className={styles.itemMenu}>
        <Skeleton className={styles.skeletonIcon} />
        <Skeleton className={styles.skeletonOption} />
      </div>
      <div className={styles.itemMenu}>
        <Skeleton className={styles.skeletonIcon} />
        <Skeleton className={styles.skeletonOption} />
      </div>
      <div className={styles.itemMenu}>
        <Skeleton className={styles.skeletonIcon} />
        <Skeleton className={styles.skeletonOption} />
      </div>
    </div>
  )
}
