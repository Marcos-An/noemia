import React from 'react'
import GenericIcon from '../../atoms/genericIcon'
import GenericText from '../../atoms/genericText'
import styles from './profile.module.scss'
import Link from 'next/link'
import Spinner from '@components/atoms/spinner'

export default function ProfileItemMenu({ icon, children, path }) {

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

export function ProfileItemLogout({ icon, children, doLogout, isLoading }) {

  return (
    <div className={styles.itemProfileMenu} onClick={doLogout}>
      <div className={styles.itemNameIcon}>
        <GenericIcon icon={icon} size="20" />
        <GenericText weight="bold">{children}</GenericText>
      </div>
      {isLoading ? <Spinner /> : <GenericIcon icon="chevron-right" />}
    </div>
  )
}