import styles from './mainFooter.module.scss'
import GenericIcon from '../../atoms/genericIcon'
import GenericText from '../../atoms/genericText'
import { useEffect, useState } from 'react'
import { FOOTER_MENU } from '../../../utils/datas'
import { useRouter } from 'next/router'


export default function MainFooter() {
  const [menuItems, setMenuItems] = useState(FOOTER_MENU)
  const [itemSelected, setItemSelected] = useState("")
  const router = useRouter()

  useEffect(() => {
    const newMenuItems = menuItems

    newMenuItems.forEach((item) => {
      if (itemSelected === item.name) {
        item.isActive = true
      }
    })

    setMenuItems(() => [...newMenuItems])
  }, [itemSelected, router])


  useEffect(() => {
    if (router.asPath === '/') {
      updateSelection("Home")
    }
    if (router.asPath.includes("/my-cart")) {
      updateSelection("Orders")
    }
    if (router.asPath.includes("/profile")) {
      updateSelection("User")
    }
    if (router.asPath.includes("/search")) {
      updateSelection("Search")
    }
  }, [router])

  const updateSelection = (name) => {
    const newMenuItems = [...menuItems]

    newMenuItems.forEach((currentItem) => {
      if (currentItem.name === name) {
        setItemSelected(name)
        currentItem.isActive = true;
      } else {
        currentItem.isActive = false;
      }
    })

    setMenuItems(() => [...newMenuItems])
  }

  const handleActive = itemSelected => {
    const newMenuItems = [...menuItems]

    newMenuItems.forEach((currentItem) => {
      if (currentItem === itemSelected) {
        router.push(itemSelected.path)
        setItemSelected(itemSelected.name)
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