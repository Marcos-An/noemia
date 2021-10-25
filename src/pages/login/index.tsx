import React, { useContext, useEffect, useState } from 'react';
import { ControllersContext } from '@contexts/ControllersContext';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { CREATE_USER } from '@graphql/mutations'
import { GET_USERS_BY_UID } from '@graphql/queries'
import { initializeApollo } from '@graphql/apollo'
import Image from 'next/image'
import styles from './login.module.scss'
import toastMessage from '@utils/toastMessage'
import { AuthContext } from '@contexts/AuthContext';
import ContainerSpaceBetween from '@components/atoms/containerSpaceBetween';
import GenericButton from '@components/atoms/genericButton';
import GenericButtonGoogle from '@components/atoms/genericButtonGoogle';
import GenericTitle from '@components/atoms/genericTitle';
import GenericInput from '@components/atoms/genericInput';
import GenericText from '@components/atoms/genericText';
import Router from 'next/router'

export default function Login() {
  const controllersContext = useContext(ControllersContext)
  const authContext = useContext(AuthContext)
  const { updateFooterType } = controllersContext
  const { signIn, signInAccountWithGoogle, authIsLoading, updateLoading } = authContext

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')


  const [createUsers] = useMutation(CREATE_USER);

  useEffect(() => {
    updateFooterType('none')
  }, [updateFooterType])

  const redirect = () => {
    Router.replace('/register', '/register', { shallow: true });
  }

  const emailSignIn = ({ email, password }) => {
    signIn({ email, password }).then((response) => {
      updateLoading(true)

      if (response.code === 'auth/user-not-found') {
        toastMessage('User not found! Do a signUp with this email', "error")
      }
      if (response.code === 'auth/wrong-password') {
        toastMessage('Wrong password or email! Please try again', "error")
      }
    })
  }

  const goolgeSignIn = () => {
    signInAccountWithGoogle().then(async (res) => {
      updateLoading(true)
      const { uid, email, displayName } = res
      const client = initializeApollo()

      const user = await client.query({
        query: GET_USERS_BY_UID, variables: {
          uid: uid,
        }
      }).then(({ data }) => data.users)
      updateLoading(false)

      if (user.length === 0) {
        createUsers({
          variables: {
            users: { uid, email, phone: '', name: displayName },
          }
        }).then(() => {
          updateLoading(false)
          Router.replace('/my-cart/payment', '/my-cart', { shallow: true })
        })
      }
    })
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
          <GenericButton text="Login" onClick={() => emailSignIn({ email, password })} loading={authIsLoading} />
        </div>
        <br />
        <ContainerSpaceBetween>
          <hr />
          <span>or</span>
          <hr />
        </ContainerSpaceBetween>
        <br />
        <GenericButtonGoogle text="Login with Google" onClick={() => goolgeSignIn()} />
      </div>
    </div>
  )
}