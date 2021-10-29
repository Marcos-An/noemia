import React from 'react'
import styles from './genericButton.module.scss'
import GenericText from '../genericText'
import Spinner from '../spinner'

export default function GenericButton({ text, price = null, isDisabled = false, onClick, isLoading = false }) {

  return (
    <button
      className={styles[`genericButton${isDisabled ? 'Disabled' : ''}${isLoading ? 'Loading' : ''}`]}
      onClick={onClick}
      disabled={isDisabled}
    >
      {isLoading ? <Spinner /> : (
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