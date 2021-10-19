import { createContext, useState, ReactNode, useEffect } from 'react';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword
} from "firebase/auth";
import { initializeApp, getApps } from 'firebase/app'
import 'firebase/auth';
import 'firebase/firestore';
import { useRouter } from 'next/router';

if (!getApps().length) {
  initializeApp({
    apiKey: "AIzaSyAFJ9qFccj345DhmDF34OKVBiz5x5VQbK4",
    authDomain: "noemia-d766f.firebaseapp.com",
    projectId: "noemia-d766f",
    storageBucket: "noemia-d766f.appspot.com",
    messagingSenderId: "295921300881",
    appId: "1:295921300881:web:612a4ea0f83a4e32dc1630"
  });

}

const auth = getAuth();


type AuthControlerData = {
  user: any;
  authIsLoading: boolean;
  createAccount: (data: SignUpData) => void;
  signIn: (data: SignInData) => void;
  signInAccountWithGoogle: () => void;
}



type SignUpData = {
  name: string;
  phone: string;
  email: string;
  password: string;
}

type SignInData = {
  email: string;
  password: string;
}


export const AuthContext = createContext({} as AuthControlerData)


type AuthContextProviderProps = {
  children: ReactNode,
}

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const router = useRouter()
  const [user, setUser] = useState<any>()
  const [authIsLoading, setAuthIsLoading] = useState(false)


  const createAccount = async (data: SignUpData) => {
    setAuthIsLoading(true)
    await createUserWithEmailAndPassword(auth, data.email, data.password)
      .then(() => {
        signIn({ email: data.email, password: data.password })
        setAuthIsLoading(false)
      });
  }

  const signIn = async (data: SignInData) => {
    setAuthIsLoading(true)
    await signInWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        const user = userCredential.user;

        setUser(user);

        if (typeof window !== 'undefined') {
          const { uid, email } = user;
          localStorage.setItem('@noemia:user', JSON.stringify({ uid, email }));
        }
        setAuthIsLoading(false)
        router.replace('/my-cart/payment', '/my-cart', { shallow: true });
      })

  }

  const signInAccountWithGoogle = async () => {
    setAuthIsLoading(true)
    const provider = new GoogleAuthProvider();
    auth.languageCode = 'it';

    await signInWithPopup(auth, provider).then(result => {
      const user = result.user;

      setUser(user);

      if (typeof window !== 'undefined') {
        const { uid, email } = user;
        localStorage.setItem('@noemia:user', JSON.stringify({ uid, email }));
      }

      setAuthIsLoading(false)
      router.push('/my-cart/payment')
    })
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        authIsLoading,
        signIn,
        createAccount,
        signInAccountWithGoogle,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}