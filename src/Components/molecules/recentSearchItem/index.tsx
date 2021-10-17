import React from 'react'
import styles from './recentSearchItem.module.scss'
import GenericText from '../../atoms/genericText'
import GenericIcon from '../../atoms/genericIcon'
import ContainerSpaceBetween from '../../atoms/containerSpaceBetween'

export default function RecentSearchItem() {
  return (
    <div className={styles.recentSearchItem}>
      <ContainerSpaceBetween>
        <GenericText weight="bold">item</GenericText>
        <GenericIcon icon="clock" color="grey" size="18" />
      </ContainerSpaceBetween>
    </div>
  )
}