import '../../styles/globals.css'
import { ControllersContextProvider } from '@contexts/ControllersContext'
import { AuthContextProvider } from '@contexts/AuthContext'
import { ApolloProvider } from '@apollo/client'
import { useApollo } from '@graphql/apollo'
import Header from '@components/organisms/header'
import Footer from '@components/organisms/footer'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';


function MyApp({ Component, pageProps }) {

  const apolloClient = useApollo(pageProps)

  return (
    <AuthContextProvider >
      <ControllersContextProvider>
        <ToastContainer />
        <ApolloProvider client={apolloClient}>
            <Header />
            <Component {...pageProps} />
            <Footer />
        </ApolloProvider>
      </ControllersContextProvider>
    </AuthContextProvider>
  )
}

export default MyApp
