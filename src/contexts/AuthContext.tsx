import { createContext, useState, ReactNode } from 'react';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { initializeApp, getApps } from 'firebase/app'
import 'firebase/auth';
import 'firebase/firestore';
import toastMessage from '@utils/toastMessage';

if (!getApps().length) {
  initializeApp({
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SANDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
  });
}

const auth = getAuth();


type AuthControlerData = {
  user: any;
  authIsLoading: boolean;
  createAccount: (data: SignUpData) => any;
  signIn: (data: SignInData) => any;
  signInAccountWithGoogle: () => any;
  updateLoading: (isLoading: boolean) => any;
  updateUser: (user: any) => any;
  signOut: () => any;
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
  const [user, setUser] = useState<any>({})
  const [authIsLoading, setAuthIsLoading] = useState(false)


  const createAccount = async (data: SignUpData) => {
    setAuthIsLoading(true)
    const response = await createUserWithEmailAndPassword(auth, data.email, data.password)
      .then(() => {
        setAuthIsLoading(false)
        return signIn({ email: data.email, password: data.password })
      }).catch((error) => {
        setAuthIsLoading(false)
        return error
      });

    return response
  }

  const updateLoading = (isLoading: boolean) => {
    setAuthIsLoading(isLoading)
  }

  const signIn = async (data: SignInData) => {
    setAuthIsLoading(true)

    const response = await signInWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        const user = userCredential.user;

        if (typeof window !== 'undefined') {
          const { uid, email } = user;
          localStorage.setItem('@noemia:user', JSON.stringify({ uid, email }));
        }

        setAuthIsLoading(false)
        return user
      }).catch((error) => {
        setAuthIsLoading(false)
        return error
      });

    return response
  }

  const signInAccountWithGoogle = async () => {
    setAuthIsLoading(true)
    const provider = new GoogleAuthProvider();
    auth.languageCode = 'it';

    const response = await signInWithPopup(auth, provider).then(result => {
      const user = result.user;

      if (typeof window !== 'undefined') {
        const { uid, email } = user;
        localStorage.setItem('@noemia:user', JSON.stringify({ uid, email }));
      }

      setAuthIsLoading(false)

      return user;
    }).catch((error) => {
      setAuthIsLoading(false)
      return error
    });

    return response
  }

  const signOut = async () => {
    setAuthIsLoading(true)

    const response = await auth.signOut()
      .then((response) => {
        setUser(false);
        if (typeof window !== 'undefined') {
          localStorage.removeItem('@noemia:user');
          setAuthIsLoading(false)
        }
        return response;
      }).catch((response) => {
        return response;
      });

    return response
  };

  const updateUser = (data: any) => {
    const newDatasUser = { ...user, ...data }
    setUser({ ...newDatasUser })
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        authIsLoading,
        signIn,
        updateLoading,
        createAccount,
        signInAccountWithGoogle,
        updateUser,
        signOut
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}