import React, { useState, useContext, useEffect } from 'react';
import styles from './search.module.scss'
import GenericSearchInput from '../../Components/atoms/genericSearchInput'
import GenericText from '../../Components/atoms/genericText'
import ContainerSpaceBetween from '../../Components/atoms/containerSpaceBetween'
import CategoriesSearch from '../../Components/organisms/categoriesSearch'
import RecentSearch from '../../Components/organisms/recentSearch'

export default function Search() {
  const [search, setSearch] = useState('')
  const [focused, setFocused] = useState(false)

  const updateSearchValueDebounced = (value) => {
    console.log(value)
  }

  return (
    <div className={styles.search}>
      <div className={styles.searchInput}>
        <ContainerSpaceBetween >
          <GenericSearchInput
            value={search} setValue={setSearch}
            onChange={updateSearchValueDebounced}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
          />
          {focused && <GenericText>Cancel</GenericText>}
        </ContainerSpaceBetween>
      </div>
      {focused ? <RecentSearch /> : <CategoriesSearch />}
    </div>
  )
}