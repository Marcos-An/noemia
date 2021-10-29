import styles from './cardPaymentMethods.module.scss'
import React, { useEffect, useContext, useRef } from 'react'
import { ControllersContext } from '../../../contexts/ControllersContext'
import { AuthContext } from '../../../contexts/AuthContext'
import { useMutation } from '@apollo/react-hooks';
import { UPDATE_MAIN_METHOD } from '@graphql/mutations'
import { GET_USER_MAIN_PAYMENT_BY_UID } from '@graphql/queries'
import { initializeApollo } from '@graphql/apollo'
import Image from 'next/image'
import GenericTitle from '../../atoms/genericTitle'
import GenericText from '../../atoms/genericText'
import GenericIcon from '../../atoms/genericIcon'
import toastMessage from '@utils/toastMessage';

export default function CardPaymentMethods({ card: paymentMethod, edit = true, updatePayment = null }) {
  const client = initializeApollo()
  const controllersContext = useContext(ControllersContext)
  const authContext = useContext(AuthContext)
  const { updateFooterType, updateHeaderText, updateMainPaymentMethod, mainPaymentMethod } = controllersContext
  const { user, updateUser } = authContext

  const [updatdMainPaymentMethods] = useMutation(UPDATE_MAIN_METHOD)

  useEffect(() => {
    updateHeaderText('Payment Methods')
    updateFooterType('none')

    const userStorage: any = JSON.parse(localStorage.getItem('@noemia:user'))

    function updateMethod() {
      client.query({
        query: GET_USER_MAIN_PAYMENT_BY_UID,
        variables: {
          uid: userStorage.uid,
        }
      }).then(({ data }) => {
        updateUser({ mainPaymentMethod: data.users[0].mainPaymentMethod[0] })
        if (data.users[0].mainPaymentMethod[0].number !== mainPaymentMethod.number) {
          updateMainPaymentMethod(data.users[0].mainPaymentMethod[0])
        }
      })
    }
    if (!user.mainPaymentMethod) {
      updateMethod()
    }
  }, [updateHeaderText, updateFooterType])

  const hideNumber = (number) => {
    return number.replace(/\d{4}(?= \d{4})/g, "****")
  }

  const isMainPayment = () => {
    if (mainPaymentMethod.number === paymentMethod.number) {
      return true
    } return false
  }

  const updateMainPaymentMethods = async (paymentMethod) => {
    const userStorage: any = JSON.parse(localStorage.getItem('@noemia:user'))

    const newMain = {
      valid: paymentMethod.valid,
      type: paymentMethod.type,
      number: paymentMethod.number,
      nickName: paymentMethod.nickName,
      niceType: paymentMethod.niceType,
      nameOwner: paymentMethod.nameOwner
    }

    updatdMainPaymentMethods({
      variables: {
        uid: userStorage.uid,
        paymentMethod: newMain
      }
    }).then(() => {
      toastMessage('Main payment method has been updated!', 'success')
      updateMainPaymentMethod(paymentMethod)
    }).catch(() => {
      toastMessage('Someting went wrong!', 'error')
    })
  }

  return user.mainPaymentMethod ?
    (
      <div
        className={isMainPayment() ? styles.cardPaymentMethodsMain : styles.cardPaymentMethods}
        onClick={() => updateMainPaymentMethods(paymentMethod)}
      >
        <div className={styles.imageContainer}>
          <Image
            src={`/${paymentMethod.type}.png`}
            alt={paymentMethod.type}
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className={styles.nameNumber}>
          <GenericTitle>{paymentMethod.nickName ? paymentMethod.nickName : paymentMethod.niceType}{isMainPayment() && <span>- Main</span>} </GenericTitle>
          {paymentMethod.number && <GenericText>{hideNumber(paymentMethod.number)}</GenericText>}
        </div>
        <div className={styles.icon}>
          {paymentMethod.number && edit && <GenericIcon icon="edit-3" size="16" color="grey" onClick={updatePayment} />}
        </div>
      </div>
    ) : <div />
}