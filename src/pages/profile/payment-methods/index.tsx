import styles from './paymentMethods.module.scss'
import React, { useEffect, useContext, useState } from 'react'
import { ControllersContext } from '../../../contexts/ControllersContext'
import { AuthContext } from '../../../contexts/AuthContext'
import { useMutation } from '@apollo/client'
import { UPDATE_USER_PAYMENT_METHOD, REMOVE_USER_PAYMENT_METHOD } from '@graphql/mutations'
import GenericButton from '../../../components/atoms/genericButton'
import GenericInvisibleButton from '../../../components/atoms/genericInvisibleButton'
import CardPaymentMethod from '../../../components/molecules/cardPaymentMethod'
import GenericTitle from '../../../components/atoms/genericTitle'
import GenericInput from '../../../components/atoms/genericInput'
import TrashButton from '../../../components/molecules/trashButton'
import Drawer from '../../../components/molecules/drawer'
import { useRouter } from 'next/router'
import toastMessage from '@utils/toastMessage'

export default function PaymentMethod() {
  const controllersContext = useContext(ControllersContext)
  const authContext = useContext(AuthContext)
  const {
    updateFooterType,
    updateHeaderText,
    removingPaymentMethod,
    updatePaymentMethod,
    initializePaymentMethods,
    updateMainPaymentMethod,
    mainPaymentMethod,
    paymentMethods
  } = controllersContext

  const { user } = authContext

  const router = useRouter()

  const [updatePaymentMethodMutation] = useMutation(UPDATE_USER_PAYMENT_METHOD);
  const [deletePaymentMethod] = useMutation(REMOVE_USER_PAYMENT_METHOD);

  const [nickName, setNickName] = useState('')
  const [drawerIsActive, setDrawerIsActive] = useState(false)
  const [selectedItem, setSelectedItem] = useState<any>({})


  useEffect(() => {
    updateHeaderText('Payment Methods')
    updateFooterType('none')

    if (!!user.paymentMethods) {
      if (paymentMethods.length < user.paymentMethods.length) {
        initializePaymentMethods(user.paymentMethods)
        setSelectedItem(user.paymentMethods[0])
      }
    } else {
      router.replace('/profile', '/profile', { shallow: true })
    }

  }, [updateHeaderText, updateFooterType, user.paymentMethods, initializePaymentMethods, router, paymentMethods.length])

  useEffect(() => {
    if (paymentMethods.length === 1) {
      updateMainPaymentMethod(paymentMethods[0])
    }
  }, [paymentMethods, updateMainPaymentMethod])

  const openDrawer = (card) => {
    setDrawerIsActive(true)
    setSelectedItem(card)
    setNickName(card.nickName)
  }

  const removeItem = () => {
    deletePaymentMethod({
      variables: {
        number: selectedItem.number
      }
    }).then(() => {
      toastMessage('Your card has been deleted!', 'success')
      removingPaymentMethod(selectedItem)
      setDrawerIsActive(false)
    })
  }

  const updateItem = async () => {
    updatePaymentMethodMutation({
      variables: {
        uid: user.uid,
        nickName: nickName,
      }
    }).then(() => {
      updatePaymentMethod(selectedItem, nickName)
      toastMessage('Your card has been updated!', 'success')
      setDrawerIsActive(false)
    })
  }

  return (
    <div className={styles.paymentMethods}>
      {paymentMethods.map((card, index) =>
        <CardPaymentMethod key={index} card={card} updatePayment={() => openDrawer(card)} />
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
            max={12}
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