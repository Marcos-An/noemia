import React, { useContext, useEffect, useState } from 'react';
import styles from './register.module.scss'
import { ControllersContext } from '../../Contexts/ControllersContext';
import { AuthContext } from '../../Contexts/AuthContext';
import ContainerSpaceBetween from '../../Components/atoms/containerSpaceBetween';
import GenericButton from '../../Components/atoms/genericButton';
import GenericButtonGoogle from '../../Components/atoms/genericButtonGoogle';
import GenericTitle from '../../Components/atoms/genericTitle';
import GenericInput from '../../Components/atoms/genericInput';
import GenericMaskedInput from '../../Components/atoms/genericMaskedInput';
import GenericText from '../../Components/atoms/genericText';
import Image from 'next/image'
import Router from 'next/router'

export default function Register() {
  const controllersContext = useContext(ControllersContext)
  const authContext = useContext(AuthContext)
  const { updateFooterType } = controllersContext
  const { createAccount, signInAccountWithGoogle, authIsLoading } = authContext

  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')

  useEffect(() => {
    updateFooterType('none')
  }, [updateFooterType])


  const create = () => {
    if ((email && password) && (password === passwordConfirm) && password.length >= 6) {
      createAccount({ name, email, password, phone })
    }
  }

  const redirect = () => {
    Router.replace('/register', '/register', { shallow: true });
  }

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

      <div className={styles.registerContainer}>
        <ContainerSpaceBetween>
          <GenericTitle>Register</GenericTitle>
          <div className={styles.loginWrapper} onClick={() => redirect()}>
            <GenericText>Login</GenericText>
            <span>&#8594;</span>
          </div>
        </ContainerSpaceBetween>

        <form>
          <GenericInput
            label='Your Name'
            value={name}
            setValue={setName}
          />
          <GenericMaskedInput
            label='Phone'
            mask={['(99) 9 9999-9999']}
            value={phone}
            setValue={setPhone}
          />
          <GenericInput
            label='Email'
            value={email}
            setValue={setEmail}
          />
          <GenericInput
            label='Passord'
            type='password'
            value={password}
            setValue={setPassword}
          />
          <div className={styles.passwordRule}>
            <ul>
              <li>6 Min characters</li>
            </ul>
          </div>
          <GenericInput
            label='Passord Confirm'
            type='password'
            value={passwordConfirm}
            setValue={setPasswordConfirm}
          />
        </form>
        <div className={styles.button}>
          <GenericButton text="Register" onClick={create} loading={authIsLoading} />
        </div>
        <br />
        <ContainerSpaceBetween>
          <hr />
          <span>or</span>
          <hr />
        </ContainerSpaceBetween>
        <br />
        <GenericButtonGoogle text="Login with Google" onClick={() => signInAccountWithGoogle()} />
      </div>
    </div>
  )
}