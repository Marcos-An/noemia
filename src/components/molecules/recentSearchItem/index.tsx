import React from 'react'
import styles from './recentSearchItem.module.scss'
import GenericText from '../../atoms/genericText'
import GenericIcon from '../../atoms/genericIcon'
import ContainerSpaceBetween from '../../atoms/containerSpaceBetween'

export default function RecentSearchItem({ item, selecItem }) {
  return (
    <div className={styles.recentSearchItem} onClick={() => selecItem(item)}>
      <ContainerSpaceBetween>
        <GenericText weight="bold">{item}</GenericText>
        <GenericIcon icon="clock" color="grey" size="18" />
      </ContainerSpaceBetween>
    </div>
  )
}