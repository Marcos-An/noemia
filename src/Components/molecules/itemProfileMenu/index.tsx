import React from 'react'
import GenericIcon from '../../atoms/genericIcon'
import GenericText from '../../atoms/genericText'
import styles from './profile.module.scss'
import Link from 'next/link'

export default function Profile({ icon, children, path }) {

  return (
    <Link href={path} passHref>
      <div className={styles.itemProfileMenu}>
        <div className={styles.itemNameIcon}>
          <GenericIcon icon={icon} size="20" />
          <GenericText weight="bold">{children}</GenericText>
        </div>
        <GenericIcon icon="chevron-right" />
      </div>
    </Link>
  )
}