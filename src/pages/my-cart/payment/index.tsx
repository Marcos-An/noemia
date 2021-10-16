import React, { useContext, useEffect, useState } from 'react';
import { ControllersContext } from '../../../Contexts/ControllersContext'
import MainPaymentMethod from '../../../Components/molecules/mainPaymentMethod';
import CurrentAddress from '../../../Components/molecules/currentAddress';
import ContainerSpaceBetween from '../../../Components/atoms/containerSpaceBetween';
import GenericTitle from '../../../Components/atoms/genericTitle';
import GenericIcon from '../../../Components/atoms/genericIcon';
import GenericButton from '../../../Components/atoms/genericButton';
import CardPaymentMethod from '../../../Components/molecules/cardPaymentMethod';
import ResumeCart from '../../../Components/molecules/resumeCart'
import Drawer from '../../../Components/molecules/drawer'
import { useRouter } from 'next/router';
import styles from './payment.module.scss'

export default function Payment() {
  const controllersContext = useContext(ControllersContext)
  const { address, paymentMethods, updateHeaderText, updateFooterType, } = controllersContext
  const [drawerActive, setDrawerIsActive] = useState(false)
  const router = useRouter()

  useEffect(() => {
    updateHeaderText('Payment')
    updateFooterType('payment')
  }, [updateHeaderText, updateFooterType])


  return (
    <div className={styles.container}>
      <div className={styles.address}>
        <GenericTitle>Address</GenericTitle>
        <ContainerSpaceBetween>
          <CurrentAddress />
          {address.street ?
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