import styles from './address.module.scss'
import React, { useEffect, useContext } from 'react'
import { ControllersContext } from '../../../Contexts/ControllersContext'
import CardAddress from '../../../Components/molecules/cardAddress'
import GenericText from '../../../Components/atoms/genericText'
import GenericButton from '../../../Components/atoms/genericButton'
import { useRouter } from 'next/router'
import Image from 'next/image'

export default function Address() {
  const router = useRouter()
  const controllersContext = useContext(ControllersContext)
  const { updateFooterType, updateHeaderText, address } = controllersContext

  useEffect(() => {
    updateHeaderText('Address')
    updateFooterType('none')
  }, [updateHeaderText, updateFooterType, address, router])

  return (
    <div className={styles.adress}>
      {address.street ?
        <CardAddress address={address} /> :
        <div className={styles.noAddress}>
          <div className={styles.imageContainer}>
            <Image
              src={`/maps.png`}
              alt={'address'}
              layout="fill"
              objectFit="cover"
            />
          </div>
          <GenericText>We don`t find any address, add a dress and come back!</GenericText>
          <div className={styles.button}>
            <GenericButton text="Add Addres!" onClick={() => router.push('/profile/address/add-address')} />
          </div>
        </div>
      }
    </div>
  )
}