import styles from './newPaymentMethod.module.scss'
import React, { useState, useEffect, useContext } from 'react'
import { ControllersContext } from '../../../../contexts/ControllersContext'
import { useMutation } from '@apollo/react-hooks';
import { CREATE_USER_PAYMENT_METHOD } from '@graphql/mutations'
import GenericInput from '../../../../components/atoms/genericInput'
import GenericMaskedInput from '../../../../components/atoms/genericMaskedInput'
import GenericButton from '../../../../components/atoms/genericButton'
import Cards from 'react-credit-cards';
import { useRouter } from 'next/router'
import 'react-credit-cards/es/styles-compiled.css';
import { AuthContext } from '@contexts/AuthContext'
import toastMessage from '@utils/toastMessage';

const validationCard = require("card-validator");

export default function NewPaymentMethod() {
  const [number, setCardNumber] = useState('')
  const [valid, setValid] = useState('')
  const [CVC, setCVC] = useState('')
  const [nameOwner, setNameOwner] = useState('')
  const [nickName, setNickName] = useState('')

  const router = useRouter()

  const [updateAddress, { loading }] = useMutation(CREATE_USER_PAYMENT_METHOD);


  const [isDisabled, setIsDisabled] = useState(true)
  const [cardValidation, setCardValidation] = useState({
    card: { type: '', niceType: '' },
    isValid: false
  })
  const controllersContext = useContext(ControllersContext)
  const authContext = useContext(AuthContext)
  const { updateFooterType, updateHeaderText, updatePaymentMethods, paymentMethods } = controllersContext
  const { user, updateUser } = authContext

  useEffect(() => {
    updateHeaderText('Add Payment Methods')
    updateFooterType('none')

    if (!!!user) {
      router.replace('/payment', '/payment', { shallow: true })
    }
  }, [updateHeaderText, updateFooterType, user, router])

  useEffect(() => {
    const newValidation = validationCard.number(number)
    setIsDisabled(newValidation.isValid)
    setCardValidation(newValidation)
  }, [number])

  useEffect(() => {
    if (!!user.paymentMethods) {
      if (paymentMethods.length > user.paymentMethods.length) {
        router.back()
      }
    } else {
      router.replace('/profile', '/profile', { shallow: true })
    }
  }, [paymentMethods, user, router])


  const savePayment = () => {
    const userStorage: any = JSON.parse(localStorage.getItem('@noemia:user'))

    if (cardValidation.isValid) {
      const newPaymentMethod = {
        user_uid: userStorage.uid,
        number,
        valid,
        nameOwner,
        nickName,
        type: cardValidation.card.type,
        niceType: cardValidation.card.niceType,
      }

      updateAddress({
        variables: {
          paymentMethod: newPaymentMethod
        }
      }).then(({ data: { insert_paymentMethod_one } }) => {
        toastMessage('Your card was updated successfully', 'success')
        updateUser({ paymentMethods: [...user.paymentMethods, insert_paymentMethod_one] })
        updatePaymentMethods(insert_paymentMethod_one)
        router.back()
      })
    }
  }
  return (
    <div className={styles.myInformations}>
      <Cards
        cvc={CVC}
        expiry={valid}
        name={nameOwner}
        number={number}
      />
      <form className={styles.form}>
        <GenericMaskedInput
          label='Card Number'
          id='card-number'
          value={number}
          setValue={setCardNumber}
          mask={['9999 9999 9999 9999', '9999 999999 99999']}
        />
        <div className={styles.grid}>
          <GenericMaskedInput
            label='Valid Thru'
            id='data'
            value={valid}
            setValue={setValid}
            mask={['99/99']}
          />
          <GenericMaskedInput
            label='CVC'
            id='CVC'
            value={CVC}
            setValue={setCVC}
            mask={['999']}
          />
        </div>
        <GenericInput
          label='Name of the credit card owner'
          id='name'
          value={nameOwner}
          setValue={setNameOwner}
        />
        <GenericInput
          label='Card’s Nick Name (opitional)'
          id='nick'
          value={nickName}
          max={15}
          setValue={setNickName}
        />
      </form>
      <div className={styles.button}>
        <GenericButton text="save" isDisabled={!isDisabled} isLoading={loading} onClick={() => savePayment()} />
      </div>
    </div>
  )
}