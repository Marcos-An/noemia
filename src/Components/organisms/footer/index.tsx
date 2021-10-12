import styles from './footer.module.scss'
import MainFooter from '../mainFooter'
import ButtonFooter from '../buttonFooter'
import { useRouter } from 'next/router'

export default function Footer() {
  const router = useRouter()

  const handleShowMenu = () => {
    if (router.asPath.includes('products')) {
      return false
    } else {
      return true
    }
  }
  return (
    <div className={styles.footer}>
      {handleShowMenu() ? <MainFooter /> : <ButtonFooter />}
    </div>
  )
}