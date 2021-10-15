import styles from './myInformations.module.scss'
import React, { useState, useEffect, useContext } from 'react'
import { ControllersContext } from '../../../Contexts/ControllersContext'
import GenericInput from '../../../Components/atoms/genericInput'
import GenericMaskedInput from '../../../Components/atoms/genericMaskedInput'
import GenericButton from '../../../Components/atoms/genericButton'

export default function MyInformations() {
  const controllersContext = useContext(ControllersContext)
  const { updateFooterType, updateHeaderText, updateMyInformations, myInformations } = controllersContext

  const [name, setName] = useState(myInformations.name)
  const [email, setEmail] = useState(myInformations.email)
  const [phone, setPhone] = useState(myInformations.phone)

  useEffect(() => {
    updateHeaderText('My informations')
    updateFooterType('none')
  }, [updateHeaderText, updateFooterType])

  const saveMyInformations = () => {
    const newInformations = {
      name,
      email,
      phone
    }

    updateMyInformations(newInformations)
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