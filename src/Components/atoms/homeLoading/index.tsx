import React from 'react';
import styles from './homeLoading.module.scss'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export default function HomeLoading() {
  return (
    <div className={styles.container}>
      <div className={styles.menu}>
        <Skeleton className={styles.skeleton} />
        <Skeleton className={styles.skeleton} />
        <Skeleton className={styles.skeleton} />
        <Skeleton className={styles.skeleton} />
      </div>
      <Skeleton className={styles.skeletonTitle} />

      <div className={styles.banner}>
        <Skeleton className={styles.skeleton} />
        <Skeleton className={styles.skeleton} />
        <Skeleton className={styles.skeleton} />
      </div>

      <Skeleton className={styles.skeletonTitle} />
      <div className={styles.suggestions}>
        <Skeleton className={styles.skeleton} />
        <Skeleton className={styles.skeleton} />
        <Skeleton className={styles.skeleton} />
        <Skeleton className={styles.skeleton} />
      </div>

      <Skeleton className={styles.skeletonTitle} />

      <div className={styles.allMenu}>
        <Skeleton className={styles.skeleton} />
        <Skeleton className={styles.skeleton} />
        <Skeleton className={styles.skeleton} />
        <Skeleton className={styles.skeleton} />
        <Skeleton className={styles.skeleton} />
        <Skeleton className={styles.skeleton} />
      </div>
    </div>
  )
}
