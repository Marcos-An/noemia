import styles from './editAddress.module.scss'
import React, { useState, useEffect, useContext } from 'react'
import { ControllersContext } from '../../../../contexts/ControllersContext'
import GenericInput from '../../../../components/atoms/genericInput'
import GenericButton from '../../../../components/atoms/genericButton'
import { AuthContext } from '../../../../contexts/AuthContext'
import { useMutation } from '@apollo/react-hooks';
import { UPDATE_USER_ADDRESS } from '@graphql/mutations'
import toastMessage from '@utils/toastMessage';
import { useRouter } from 'next/router'


export default function EditAddress() {
  const controllersContext = useContext(ControllersContext)
  const authContext = useContext(AuthContext)
  const { updateFooterType, updateHeaderText } = controllersContext
  const { user, updateUser } = authContext
  const router = useRouter()

  const [street, setStreet] = useState(user.street)
  const [number, setNumber] = useState(user.number)
  const [zipCode, setZipCode] = useState(user.zipCode)
  const [state, setState] = useState(user.state)
  const [city, setCity] = useState(user.city)
  const [neighbourhood, setNeighbourhood] = useState(user.neighbourhood)

  const [updateAddress] = useMutation(UPDATE_USER_ADDRESS);

  useEffect(() => {
    updateHeaderText('Edit Address')
    updateFooterType('none')
  }, [updateFooterType, updateHeaderText])

  useEffect(() => {
    if (!user.street) {
      toastMessage('You dont have a adrress to update!', 'warning')
      router.replace('/profile/address', '/profile/address', { shallow: true })
    }
  }, [user, router])


  const saveAddAdress = () => {
    const newAdress = {
      street,
      number,
      zipCode,
      state,
      city,
      neighbourhood
    }

    updateUser(newAdress)

    const userUpdated = { ...user, ...newAdress }

    if (userUpdated !== user) {
      updateAddress({
        variables: {
          uid: user.uid,
          street: userUpdated.street,
          number: userUpdated.number,
          zipCode: userUpdated.zipCode,
          state: userUpdated.state,
          city: userUpdated.city,
          neighbourhood: userUpdated.neighbourhood,
        }
      }).then((response) => {
        toastMessage('Your adrress has was updated!', 'success')
        router.back()
      }).catch(() => { toastMessage('Something went wrong!', 'error') })
    }

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
        <GenericButton text="save" isDisabled={false} onClick={() => saveAddAdress()} />
      </div>
    </div>
  )
}