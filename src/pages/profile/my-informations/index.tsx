import styles from './myInformations.module.scss'
import React, { useState, useEffect, useContext } from 'react'
import { ControllersContext } from '../../../contexts/ControllersContext'
import { AuthContext } from '../../../contexts/AuthContext'
import { useMutation } from '@apollo/react-hooks';
import { UPDATE_USER } from '@graphql/mutations'
import GenericInput from '../../../components/atoms/genericInput'
import GenericMaskedInput from '../../../components/atoms/genericMaskedInput'
import GenericButton from '../../../components/atoms/genericButton'
import toastMessage from '@utils/toastMessage';
import Router from 'next/router'

export default function MyInformations() {
  const controllersContext = useContext(ControllersContext)
  const authContext = useContext(AuthContext)
  const { updateFooterType, updateHeaderText } = controllersContext
  const { user, updateUser } = authContext

  const [name, setName] = useState(user.name)
  const [email, setEmail] = useState(user.email)
  const [phone, setPhone] = useState(user.phone)

  const [updateUsers] = useMutation(UPDATE_USER);

  useEffect(() => {
    updateHeaderText('My informations')
    updateFooterType('none')
  }, [updateHeaderText, updateFooterType])


  const saveMyInformations = async () => {
    const newInformations = {
      name,
      email,
      phone
    }

    updateUser(newInformations)

    const userUpdated = { ...user, ...newInformations }

    if (userUpdated !== user) {
      updateUsers({
        variables: {
          uid: user.uid,
          name: userUpdated.name,
          email: userUpdated.email,
          phone: userUpdated.phone,
        }
      }).then(() => {
        toastMessage('Your informations has been updated!', 'success')
        Router.back()
      }).catch(() => { toastMessage('Something went wrong!', 'error') })
    }
  }

  return (
    <div className={styles.myInformations}>
      <form className={styles.form}>
        <GenericInput
          id="name"
          label='Name'
          value={name}
          setValue={setName}
        />
        <GenericInput
          id="email"
          label='Email'
          value={email}
          setValue={setEmail}
        />
        <GenericMaskedInput
          id="phone"
          label='Phone'
          value={phone}
          mask={['(99) 9 9999-9999']}
          setValue={setPhone}
        />
      </form>
      <div className={styles.button}>
        <GenericButton text="save" onClick={() => saveMyInformations()} />
      </div>
    </div>
  )
}