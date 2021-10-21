import styles from './newPaymentMethod.module.scss'
import React, { useState, useEffect, useContext } from 'react'
import { ControllersContext } from '../../../../contexts/ControllersContext'
import GenericInput from '../../../../components/atoms/genericInput'
import GenericMaskedInput from '../../../../components/atoms/genericMaskedInput'
import GenericButton from '../../../../components/atoms/genericButton'
import Cards from 'react-credit-cards';
import { useRouter } from 'next/router'
import 'react-credit-cards/es/styles-compiled.css';

const validationCard = require("card-validator");

export default function NewPaymentMethod() {
  const [cardNumber, setCardNumber] = useState('')
  const [valid, setValid] = useState('')
  const [CVC, setCVC] = useState('')
  const [nameOwner, setNameOwner] = useState('')
  const [nickName, setNickName] = useState('')

  const router = useRouter()
  const [disabled, setDisabled] = useState(true)
  const [cardValidation, setCardValidation] = useState({
    card: { type: '', niceType: '' },
    isValid: false
  })
  const controllersContext = useContext(ControllersContext)
  const { updateFooterType, updateHeaderText, updatePaymentMethods } = controllersContext

  useEffect(() => {
    updateHeaderText('Add Payment Methods')
    updateFooterType('none')
  }, [updateHeaderText, updateFooterType])

  useEffect(() => {
    const newValidation = validationCard.number(cardNumber)
    setDisabled(newValidation.isValid)
    setCardValidation(newValidation)
  }, [cardNumber])


  const savePayment = () => {
    if (cardValidation.isValid) {
      const newPaymentMethod = {
        cardNumber,
        valid,
        CVC,
        nameOwner,
        nickName,
        type: cardValidation.card.type,
        niceType: cardValidation.card.niceType,

      }

      updatePaymentMethods(newPaymentMethod)
      router.back()
    }
  }
  return (
    <div className={styles.myInformations}>
      <Cards
        cvc={CVC}
        expiry={valid}
        name={nameOwner}
        number={cardNumber}
      />
      <form className={styles.form}>
        <GenericMaskedInput
          label='Card Number'
          id='card-number'
          value={cardNumber}
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
        <GenericButton text="save" disabled={!disabled} onClick={() => savePayment()} />
      </div>
    </div>
  )
}