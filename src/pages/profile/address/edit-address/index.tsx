import styles from './editAddress.module.scss'
import React, { useState, useEffect, useContext } from 'react'
import { ControllersContext } from '../../../../Contexts/ControllersContext'
import GenericInput from '../../../../Components/atoms/genericInput'
import GenericButton from '../../../../Components/atoms/genericButton'
import { useRouter } from 'next/router'


export default function EditAddress() {
  const controllersContext = useContext(ControllersContext)
  const { updateFooterType, updateHeaderText, updateAddress, address } = controllersContext
  const router = useRouter()

  const [street, setStreet] = useState(address.street)
  const [number, setNumber] = useState(address.number)
  const [zipCode, setZipCode] = useState(address.zipCode)
  const [state, setState] = useState(address.state)
  const [city, setCity] = useState(address.city)
  const [neighbourhood, setNeighbourhood] = useState(address.neighbourhood)


  useEffect(() => {
    updateHeaderText('Edit Address')
    updateFooterType('none')
  }, [updateFooterType, updateHeaderText])

  useEffect(() => {
    if (!address.street) {
      router.push('/profile/address')
    }
  }, [address, router])


  const saveAddAdress = () => {
    const newAdress = {
      street,
      number,
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
        <GenericButton text="save" disabled={false} onClick={() => saveAddAdress()} />
      </div>
    </div>
  )
}