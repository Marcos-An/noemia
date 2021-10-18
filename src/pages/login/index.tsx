import React, { useContext, useEffect, useState } from 'react';
import { ControllersContext } from '../../Contexts/ControllersContext';
import Image from 'next/image'
import styles from './login.module.scss'
import ContainerSpaceBetween from '../../Components/atoms/containerSpaceBetween';
import GenericButton from '../../Components/atoms/genericButton';
import GenericButtonGoogle from '../../Components/atoms/genericButtonGoogle';
import GenericTitle from '../../Components/atoms/genericTitle';
import GenericInput from '../../Components/atoms/genericInput';
import GenericText from '../../Components/atoms/genericText';

export default function Login() {
  const controllersContext = useContext(ControllersContext)
  const { updateFooterType } = controllersContext

  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    updateFooterType('none')
  }, [updateFooterType])

  return (
    <div className={styles.container}>
      <div className={styles.imageBackgroundContainer}>
        <div className={styles.imageContainer}>
          <Image
            src={'/logo.png'}
            alt="logo"
            layout="fill"
            objectFit="cover"
          />
        </div>
      </div>

      <div className={styles.loginContainer}>
        <ContainerSpaceBetween>
          <GenericTitle>Login</GenericTitle>
          <div className={styles.registerWrapper}>
            <GenericText>Register</GenericText>
            <span>&#8594;</span>
          </div>
        </ContainerSpaceBetween>

        <form>
          <GenericInput
            id='email'
            label='User Name'
            value={userName}
            setValue={setUserName}
          />
          <GenericInput
            id='password'
            label='Passord'
            type='password'
            value={password}
            setValue={setPassword}
          />
        </form>
        <div className={styles.button}>
          <GenericButton text="Login" />
        </div>
        <br />
        <ContainerSpaceBetween>
          <hr />
          <span>or</span>
          <hr />
        </ContainerSpaceBetween>
        <br />
        <GenericButtonGoogle />
      </div>
    </div>
  )
}