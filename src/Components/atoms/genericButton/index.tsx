import React from 'react'
import styles from './genericButton.module.scss'
import GenericText from '../genericText'
import Spinner from '../spinner'

export default function GenericButton({ text, price = null, disabled = false, onClick, loading = false }) {

  return (
    <button
      className={styles[`genericButton${disabled ? 'Disabled' : ''}${loading ? 'Loading' : ''}`]}
      onClick={() => onClick()} disabled={disabled}>
      {loading ? <Spinner /> : (
        <>
          <GenericText weight="bold">
            {text}
          </GenericText>
          {price && (
            <GenericText weight="bold">
              {price}
            </GenericText>
          )}
        </>
      )}
    </button>
  )
}