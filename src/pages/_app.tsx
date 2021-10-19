import '../../styles/globals.css'
import { ControllersContextProvider } from '../Contexts/ControllersContext'
import { AuthContextProvider } from '../Contexts/AuthContext'
import Header from '../Components/organisms/header'
import Footer from '../Components/organisms/footer'

function MyApp({ Component, pageProps }) {
  return (
    <AuthContextProvider>
      <ControllersContextProvider>
        <Header />
        <Component {...pageProps} />
        <Footer />
      </ControllersContextProvider>
    </AuthContextProvider>
  )
}

export default MyApp
