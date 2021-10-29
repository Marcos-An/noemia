import styles from './paymentMethods.module.scss'
import React, { useEffect, useContext, useState } from 'react'
import { ControllersContext } from '../../../contexts/ControllersContext'
import { AuthContext } from '../../../contexts/AuthContext'
import { useMutation } from '@apollo/client'
import { UPDATE_USER_PAYMENT_METHOD, REMOVE_USER_PAYMENT_METHOD } from '@graphql/mutations'
import { initializeApollo } from '@graphql/apollo'
import { GET_USER_PAYMENT_METHOD } from '@graphql/queries'
import GenericButton from '../../../components/atoms/genericButton'
import GenericInvisibleButton from '../../../components/atoms/genericInvisibleButton'
import CardPaymentMethod from '../../../components/molecules/cardPaymentMethod'
import GenericTitle from '../../../components/atoms/genericTitle'
import GenericInput from '../../../components/atoms/genericInput'
import TrashButton from '../../../components/molecules/trashButton'
import Drawer from '../../../components/molecules/drawer'
import { useRouter } from 'next/router'
import toastMessage from '@utils/toastMessage'
import _ from 'lodash'

export default function PaymentMethod() {
  const client = initializeApollo()
  const controllersContext = useContext(ControllersContext)
  const authContext = useContext(AuthContext)
  const {
    updateFooterType,
    updateHeaderText,
    removingPaymentMethod,
    initializePaymentMethods,
    updatePaymentMethod,
    paymentMethods
  } = controllersContext

  const { user, updateUser } = authContext

  const router = useRouter()

  const [updatePaymentMethodMutation] = useMutation(UPDATE_USER_PAYMENT_METHOD);
  const [deletePaymentMethod] = useMutation(REMOVE_USER_PAYMENT_METHOD);


  const [nickName, setNickName] = useState('')
  const [drawerIsActive, setDrawerIsActive] = useState(false)
  const [selectedItem, setSelectedItem] = useState<any>({})


  useEffect(() => {
    updateHeaderText('Payment Methods')
    updateFooterType('none')
    const userStorage: any = JSON.parse(localStorage.getItem('@noemia:user'))

    if (!_.isEqual(user.paymentMethods, paymentMethods)) {
      client.query({
        query: GET_USER_PAYMENT_METHOD,
        variables: {
          uid: userStorage.uid,
        }
      }).then(({ data }) => {
        updateUser({ paymentMethods: data.users[0].paymentMethods })
        initializePaymentMethods(data.users[0].paymentMethods)
      })
    }

  }, [updateHeaderText, updateFooterType, user])


  const openDrawer = (card) => {
    setDrawerIsActive(true)
    setSelectedItem(card)
    setNickName(card.nickName)
  }

  const removeItem = () => {
    const userStorage: any = JSON.parse(localStorage.getItem('@noemia:user'))

    console.log(selectedItem)
    deletePaymentMethod({
      variables: {
        uid: userStorage.uid,
        number: selectedItem.number
      }
    }).then(() => {
      toastMessage('Your card has been deleted!', 'success')
      const newPaymentMethods = user.paymentMethods.filter(paymentMethod => paymentMethod.number !== selectedItem.number)
      updateUser({ paymentMethods: newPaymentMethods })
      removingPaymentMethod(selectedItem)
      setDrawerIsActive(false)
    })
  }

  const updateItem = async () => {
    const userStorage: any = JSON.parse(localStorage.getItem('@noemia:user'))

    updatePaymentMethodMutation({
      variables: {
        uid: userStorage.uid,
        number: selectedItem.number,
        nickName: nickName,
      }
    }).then(() => {
      toastMessage('Your card has been updated!', 'success')

      const newPaymentMethods = user.paymentMethods.map(paymentMethod => {
        if (paymentMethod.number === selectedItem.number) {
          paymentMethod = { ...paymentMethod, nickName: nickName }
          return paymentMethod
        } else {
          return paymentMethod
        }
      })

      updateUser({ paymentMethods: newPaymentMethods })
      updatePaymentMethod(selectedItem, nickName)
      setSelectedItem({ ...selectedItem, nickName: nickName })
      router.reload()
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