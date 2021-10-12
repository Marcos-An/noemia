import '../../styles/globals.css'
import { ControllersContextProvider } from '../Contexts/ControllersContext'
import Header from '../Components/organisms/header'
import Footer from '../Components/organisms/footer'

function MyApp({ Component, pageProps }) {
  return (
    <ControllersContextProvider>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </ControllersContextProvider>
  )
}

export default MyApp
