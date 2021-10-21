import React from 'react'
import styles from './genericButtonGoogle.module.scss'
import GenericText from '../genericText'
import Image from 'next/image'

export default function GenericButtonGoogle({ text = "", onClick = () => { } }) {

  return (
    <button className={styles.genericButtonGoogle} onClick={() => onClick()}>
      <div className={styles.imageContainer}>
        <Image
          src='/google-logo.png'
          alt="google-login"
          layout="fill"
          objectFit="contain"
        />
      </div>
      <GenericText>
        {text}
      </GenericText>
    </button>
  )
}