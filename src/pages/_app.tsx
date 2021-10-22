import '../../styles/globals.css'
import { ControllersContextProvider } from '../contexts/ControllersContext'
import { AuthContextProvider } from '../contexts/AuthContext'
import { ApolloProvider } from '@apollo/client'
import { useApollo } from '../graphql/apollo'
import Header from '../components/organisms/header'
import Footer from '../components/organisms/footer'

function MyApp({ Component, pageProps }) {

  const apolloClient = useApollo(pageProps)

  return (
    <AuthContextProvider >
      <ApolloProvider client={apolloClient}>
        <ControllersContextProvider>
          <Header />
          <Component {...pageProps} />
          <Footer />
        </ControllersContextProvider>
      </ApolloProvider>
    </AuthContextProvider>
  )
}

export default MyApp
