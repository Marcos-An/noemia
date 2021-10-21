import styles from './addAdress.module.scss'
import React, { useState, useEffect, useContext } from 'react'
import { ControllersContext } from '../../../../contexts/ControllersContext'
import GenericInput from '../../../../components/atoms/genericInput'
import GenericButton from '../../../../components/atoms/genericButton'
import { useRouter } from 'next/router'

export default function AddAdress() {
  const [street, setStreet] = useState('')
  const [number, setNumber] = useState('')
  const [zipCode, setZipCode] = useState('')
  const [state, setState] = useState('')
  const [city, setCity] = useState('')
  const [neighbourhood, setNeighbourhood] = useState('')

  const router = useRouter()
  const [disabled, setDisabled] = useState(true)
  const controllersContext = useContext(ControllersContext)
  const { updateFooterType, updateHeaderText, updateAddress } = controllersContext

  useEffect(() => {
    updateHeaderText('Add Adress')
    updateFooterType('none')
  }, [updateFooterType, updateHeaderText])

  useEffect(() => {
    if (street !== '' && number !== '' && zipCode !== '' && state !== '' && city !== '') {
      setDisabled(false)
    } else {
      setDisabled(true)
    }
  }, [street, number, zipCode, state, city, neighbourhood])

  const saveAddAdress = () => {
    const newAdress = {
      street,
      number: number.toString(),
      zipCode,
      state,
      city,
      neighbourhood
    }

    updateAddress(newAdress)
    router.back()
  }

  return (
    <div className={styles.myInformations}>
      <form className={styles.form}>
        <GenericInput
          id='street'
          label='Street'
          value={street}
          setValue={setStreet}
        />
        <div className={styles.grid}>
          <GenericInput
            id='number'
            label='Number'
            type="number"
            value={number}
            setValue={setNumber}
          />
          <GenericInput
            id='zipcode'
            label='Zip code'
            value={zipCode}
            setValue={setZipCode}
          />
        </div>
        <GenericInput
          id='state'
          label='State'
          value={state}
          setValue={setState}
        />
        <GenericInput
          id='city'
          label='City'
          value={city}
          setValue={setCity}
        />
        <GenericInput
          id="Neighbourhood"
          label='Neighbourhood'
          value={neighbourhood}
          setValue={setNeighbourhood}
        />
      </form>
      <div className={styles.button}>
        <GenericButton text="save" disabled={disabled} onClick={() => saveAddAdress()} />
      </div>
    </div>
  )
}