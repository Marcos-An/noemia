import styles from './addAdress.module.scss'
import React, { useState, useEffect, useContext } from 'react'
import { ControllersContext } from '../../../../contexts/ControllersContext'
import GenericInput from '../../../../components/atoms/genericInput'
import GenericButton from '../../../../components/atoms/genericButton'
import { AuthContext } from '../../../../contexts/AuthContext'
import { useMutation } from '@apollo/react-hooks';
import { UPDATE_USER_ADDRESS } from '@graphql/mutations'
import { initializeApollo } from '@graphql/apollo'
import { GET_USER_ADDRESS_BY_UID } from '@graphql/queries'
import toastMessage from '@utils/toastMessage';
import { useRouter } from 'next/router'

export default function AddAdress() {
  const router = useRouter()
  const client = initializeApollo()

  const [street, setStreet] = useState('')
  const [number, setNumber] = useState('')
  const [zipCode, setZipCode] = useState('')
  const [state, setState] = useState('')
  const [city, setCity] = useState('')
  const [neighbourhood, setNeighbourhood] = useState('')


  const [updateAddress, { loading }] = useMutation(UPDATE_USER_ADDRESS);

  const [isDisabled, setIsDisabled] = useState(true)
  const authContext = useContext(AuthContext)
  const controllersContext = useContext(ControllersContext)

  const { updateFooterType, updateHeaderText } = controllersContext
  const { updateUser, user } = authContext

  useEffect(() => {
    updateHeaderText('Add Adress')
    updateFooterType('none')

    const userStorage: any = JSON.parse(localStorage.getItem('@noemia:user'))

    client.query({
      query: GET_USER_ADDRESS_BY_UID,
      variables: {
        uid: userStorage.uid,
      }
    }).then(({ data }) => {
      setStreet(data.users[0].street);
      setNumber(data.users[0].number)
      setZipCode(data.users[0].zipCode)
      setState(data.users[0].state)
      setCity(data.users[0].city)
      setNeighbourhood(data.users[0].neighbourhood)
    })

  }, [updateFooterType, updateHeaderText])

  useEffect(() => {
    if (street !== '' && number !== '' && zipCode !== '' && state !== '' && city !== '') {
      setIsDisabled(false)
    } else {
      setIsDisabled(true)
    }
  }, [street, number, zipCode, state, city, neighbourhood])

  const saveAddAdress = async () => {
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
      }).then(() => {
        toastMessage('Your adrress was created!', 'success')
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
          id="neighbourhood"
          label='neighbourhood'
          value={neighbourhood}
          setValue={setNeighbourhood}
        />
      </form>
      <div className={styles.button}>
        <GenericButton text="save" isDisabled={isDisabled} isLoading={loading} onClick={() => saveAddAdress()} />
      </div>
    </div>
  )
}