import React, { useState, useContext, useEffect } from 'react';
import styles from './search.module.scss'
import { ControllersContext } from '../../contexts/ControllersContext'
import GenericSearchInput from '../../components/atoms/genericSearchInput'
import GenericText from '../../components/atoms/genericText'
import ContainerSpaceBetween from '../../components/atoms/containerSpaceBetween'
import CategoriesSearch from '../../components/organisms/categoriesSearch'
import RecentSearch from '../../components/organisms/recentSearch'

export default function Search() {
  const controllersContext = useContext(ControllersContext)
  const { updateFooterType } = controllersContext
  const [search, setSearch] = useState('')
  const [focused, setFocused] = useState(false)


  useEffect(() => {
    updateFooterType('main')
  }, [updateFooterType])

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