import React from 'react'
import GenericIcon from '../../atoms/genericIcon'
import styles from './backButton.module.scss'
import { useRouter } from 'next/router'

export default function ButtonCard() {
  const router = useRouter()

  return (
    <div className={styles.wrapper} onClick={() => router.back()}>
      <GenericIcon icon="arrow-left" size="20" />
    </div>
  )
}
