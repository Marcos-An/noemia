import React, { useContext, useEffect, useState } from 'react';
import { ControllersContext } from '../../../contexts/ControllersContext'
import { AuthContext } from '../../../contexts/AuthContext'
import MainPaymentMethod from '../../../components/molecules/mainPaymentMethod';
import CurrentAddress from '../../../components/molecules/currentAddress';
import ContainerSpaceBetween from '../../../components/atoms/containerSpaceBetween';
import GenericTitle from '../../../components/atoms/genericTitle';
import GenericIcon from '../../../components/atoms/genericIcon';
import GenericButton from '../../../components/atoms/genericButton';
import CardPaymentMethod from '../../../components/molecules/cardPaymentMethod';
import ResumeCart from '../../../components/molecules/resumeCart'
import Drawer from '../../../components/molecules/drawer'
import { useRouter } from 'next/router';
import styles from './payment.module.scss'

export default function Payment() {
  const controllersContext = useContext(ControllersContext)
  const authContext = useContext(AuthContext)

  const { paymentMethods, updateHeaderText, updateFooterType, } = controllersContext
  const { user } = authContext

  const [drawerActive, setDrawerIsActive] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (!localStorage.getItem('@noemia:user')) {
      router.push('/')
    }
    updateHeaderText('Payment')
    updateFooterType('payment')
  }, [updateHeaderText, updateFooterType, router])


  return (
    <div className={styles.container}>
      <div className={styles.address}>
        <GenericTitle>Address</GenericTitle>
        <ContainerSpaceBetween>
          <CurrentAddress />
          {user.street ?
            <GenericIcon icon="chevron-right" color="yellow" /> :
            <span onClick={() => router.push('/profile/address/add-address')}>Add Address</span>
          }
        </ContainerSpaceBetween>
      </div>

      <div className={styles.payment}>
        <GenericTitle>Payment Method</GenericTitle>
        <br />
        <ContainerSpaceBetween>
          <MainPaymentMethod />
          <span onClick={() => setDrawerIsActive(true)}>change</span>
        </ContainerSpaceBetween>
      </div>
      <ResumeCart />
      <Drawer isActive={drawerActive} close={() => setDrawerIsActive(false)}>
        <div className={styles.containerDrawer}>
          <GenericTitle>Payment Methods</GenericTitle>
          <div className={styles.paymentMethodsList}>
            {paymentMethods.map((paymentMethod, index) =>
              <CardPaymentMethod key={index} card={paymentMethod} edit={false} />
            )}
          </div>

          <div className={styles.button}>
            <GenericButton text="Add a new card" onClick={() => router.push('/profile/payment-methods/new-payment-method')} />
          </div>
        </div>
      </Drawer>
    </div>
  )
}