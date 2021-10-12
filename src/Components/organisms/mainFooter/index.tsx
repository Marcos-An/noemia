import styles from './mainFooter.module.scss'
import GenericIcon from '../../atoms/genericIcon'
import GenericText from '../../atoms/genericText'
import { useEffect, useState } from 'react'
import { FOOTER_MENU } from '../../../utils/datas'
import { useRouter } from 'next/router'


export default function MainFooter() {
  const [menuItems, setMenuItems] = useState(FOOTER_MENU)
  const router = useRouter()

  useEffect(() => {
    const newMenuItems = menuItems

    newMenuItems.forEach((item) => {
      if (router.asPath.split('/')[1] === '' && item.name === 'Home') {
        item.isActive = true
      }
      if (router.asPath.split('/')[1] === item.name) {
        item.isActive = true
      }
    })
    setMenuItems(() => [...newMenuItems])
  }, [router])

  const handleActive = itemSeleted => {
    const newMenuItems = [...menuItems]

    newMenuItems.forEach((currentItem) => {
      if (currentItem === itemSeleted) {
        currentItem.isActive = true;
      } else {
        currentItem.isActive = false;
      }
    })
    setMenuItems(() => [...newMenuItems])
  }

  return (
    <div className={styles.footer}>
      {menuItems.map(item =>
        <div
          key={item.name}
          className={styles.itemMenu}
          onClick={() => handleActive(item)}
        >
          <div className={item.isActive ? styles.itemWrapperActive : styles.itemWrapper}>
            <GenericIcon icon={item.icon} size="18" />
            <GenericText>{item.name}</GenericText>
          </div>
        </div>
      )}
    </div>
  )
}