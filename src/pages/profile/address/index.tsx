import styles from './address.module.scss'
import React, { useEffect, useContext } from 'react'
import { ControllersContext } from '../../../contexts/ControllersContext'
import { AuthContext } from '../../../contexts/AuthContext'
import CardAddress from '../../../components/molecules/cardAddress'
import GenericText from '../../../components/atoms/genericText'
import GenericButton from '../../../components/atoms/genericButton'
import { useRouter } from 'next/router'
import Image from 'next/image'

export default function Address() {
  const router = useRouter()
  const controllersContext = useContext(ControllersContext)
  const authContext = useContext(AuthContext)
  const { updateFooterType, updateHeaderText } = controllersContext
  const { user } = authContext

  useEffect(() => {
    updateHeaderText('Address')
    updateFooterType('none')
  }, [updateHeaderText, updateFooterType])

  return (
    <div className={styles.adress}>
      {user.street ?
        <CardAddress address={user} /> :
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