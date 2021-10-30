import styles from './recentSearch.module.scss'
import GenericTitle from '../../atoms/genericTitle'
import RecentSearchItem from '../../molecules/recentSearchItem'
import React from 'react'
import GenericText from '@components/atoms/genericText'

export default function RecentSearch({ recentSearch, selecItem }) {
  return (
    <div className={styles.recentSearch}>
      <GenericTitle>Recent Search</GenericTitle>
      {recentSearch.length > 0 ?
        recentSearch.map((item, index) =>
          <RecentSearchItem key={index} item={item} selecItem={selecItem} />
        ) : <GenericText>Without recent Search</GenericText>
      }
    </div>
  )
}