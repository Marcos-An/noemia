import React, { useContext, useEffect, useState } from 'react';
import { ControllersContext } from '../../Contexts/ControllersContext';
import Image from 'next/image'
import styles from './login.module.scss'
import { AuthContext } from '../../Contexts/AuthContext';
import ContainerSpaceBetween from '../../Components/atoms/containerSpaceBetween';
import GenericButton from '../../Components/atoms/genericButton';
import GenericButtonGoogle from '../../Components/atoms/genericButtonGoogle';
import GenericTitle from '../../Components/atoms/genericTitle';
import GenericInput from '../../Components/atoms/genericInput';
import GenericText from '../../Components/atoms/genericText';
import Router from 'next/router'

export default function Login() {
  const controllersContext = useContext(ControllersContext)
  const authContext = useContext(AuthContext)
  const { updateFooterType } = controllersContext
  const { signIn, signInAccountWithGoogle, authIsLoading } = authContext

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')


  useEffect(() => {
    updateFooterType('none')
  }, [updateFooterType])


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

      <div className={styles.loginContainer}>
        <ContainerSpaceBetween>
          <GenericTitle>Login</GenericTitle>
          <div className={styles.registerWrapper} onClick={() => redirect()}>
            <GenericText>Register</GenericText>
            <span>&#8594;</span>
          </div>
        </ContainerSpaceBetween>

        <form>
          <GenericInput
            id='email'
            label='User Name'
            value={email}
            setValue={setEmail}
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
          <GenericButton text="Login" onClick={() => signIn({ email, password })} loading={authIsLoading} />
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