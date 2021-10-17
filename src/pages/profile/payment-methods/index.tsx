import styles from './paymentMethods.module.scss'
import React, { useEffect, useContext, useState } from 'react'
import { ControllersContext } from '../../../Contexts/ControllersContext'
import GenericButton from '../../../Components/atoms/genericButton'
import GenericInvisibleButton from '../../../Components/atoms/genericInvisibleButton'
import CardPaymentMethod from '../../../Components/molecules/cardPaymentMethod'
import GenericTitle from '../../../Components/atoms/genericTitle'
import GenericInput from '../../../Components/atoms/genericInput'
import TrashButton from '../../../Components/molecules/trashButton'
import Drawer from '../../../Components/molecules/drawer'
import { useRouter } from 'next/router'

export default function PaymentMethod() {
  const controllersContext = useContext(ControllersContext)
  const {
    updateFooterType,
    updateHeaderText,
    removingPaymentMethod,
    updatePaymentMethod,
    paymentMethods
  } = controllersContext

  const router = useRouter()

  const [nickName, setNickName] = useState('')
  const [drawerIsActive, setDrawerIsActive] = useState(false)
  const [selectedItem, setSelectedItem] = useState(paymentMethods[0])


  useEffect(() => {
    updateHeaderText('Payment Methods')
    updateFooterType('none')
  }, [updateHeaderText, updateFooterType])

  const updateCard = (card) => {
    setDrawerIsActive(true)
    setSelectedItem(card)
    setNickName(card.nickName)

  }
  const removeItem = () => {
    removingPaymentMethod(selectedItem)
    setDrawerIsActive(false)
  }
  const updateItem = () => {
    updatePaymentMethod(selectedItem, nickName)
  }

  return (
    <div className={styles.paymentMethods}>
      {paymentMethods.map((card, index) =>
        <CardPaymentMethod key={index} card={card} onClick={() => updateCard(card)} />
      )}

      <div className={styles.button}>
        <GenericButton text="Add a new card" onClick={() => router.push('/profile/payment-methods/new-payment-method')} />
      </div>

      <Drawer isActive={drawerIsActive} close={() => setDrawerIsActive(false)}>
        <div className={styles.titleAndTrashButton}>
          <GenericTitle>{selectedItem.nickName ? selectedItem.nickName : selectedItem.niceType}</GenericTitle>
          <TrashButton onClick={removeItem} />
        </div>

        <form className={styles.form}>
          <GenericInput
            label='nickName Card'
            value={nickName}
            max={15}
            setValue={setNickName}
          />
        </form>
        <div className={styles.buttonUpdate}>
          <GenericButton text="Update Card" onClick={updateItem} />
          <GenericInvisibleButton onClick={() => setDrawerIsActive(false)}>Cancel</GenericInvisibleButton>
        </div>
      </Drawer>
    </div>
  )
}