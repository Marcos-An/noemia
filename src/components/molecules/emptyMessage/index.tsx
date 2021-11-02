
import React from 'react'
import styles from './emptyMessage.module.scss'
import GenericText from '../../atoms/genericText'
import Image from 'next/image'
import GenericTitle from '../../atoms/genericTitle'

export default function EmptyMessage({ title, text }) {

  return (
    <div className={styles.emptyMessage}>
      <div className={styles.imageContainer}>
        <Image
          src="/washing-dishes.png"
          alt="emptyMessageImage"
          layout="fill"
          objectFit="cover"
        />
      </div>
      <GenericTitle>{title}</GenericTitle>
      <GenericText>{text}</GenericText>
    </div>
  )
}
