import React, { useState, useContext, useEffect } from 'react';
import styles from './search.module.scss'
import { ControllersContext } from '../../contexts/ControllersContext'
import GenericSearchInput from '../../components/atoms/genericSearchInput'
import CardSuggestions from '../../components/molecules/cardSuggestions'
import GenericText from '../../components/atoms/genericText'
import ContainerSpaceBetween from '../../components/atoms/containerSpaceBetween'
import CategoriesSearch from '../../components/organisms/categoriesSearch'
import RecentSearch from '../../components/organisms/recentSearch'
import Spinner from '@components/atoms/spinner'
import { GET_SEARCH_PRODUCTS_QUERY } from '@graphql/queries'
import { initializeApollo } from '@graphql/apollo'
import _ from 'lodash'

export default function Search() {
  const client = initializeApollo()
  const controllersContext = useContext(ControllersContext)
  const { updateFooterType, } = controllersContext
  const [search, setSearch] = useState('')
  const [focused, setFocused] = useState(false)
  const [isLoading, setisLoading] = useState(false)
  const [itemsSearched, setItemsSearched] = useState([])
  const [recentSearch, setRecentSearch] = useState([])

  useEffect(() => {
    updateFooterType('main')
    const spinner = document.getElementById('spinner')

    if (spinner) {
      spinner.style.border = ' 4px solid rgb(255,210,57, 0.3)'
      spinner.style.borderTopColor = '#ffd239'
      spinner.style.marginTop = '5rem'
      spinner.style.height = '3rem'
      spinner.style.width = '3rem'
    }

  }, [updateFooterType, isLoading])


  useEffect(() => {
    const recent = JSON.parse(localStorage.getItem('@noemia:recentSearch'));

    if (!recent) {
      localStorage.setItem('@noemia:recentSearch', JSON.stringify([]));
    } else {
      setRecentSearch(recent)
    }
  }, [])


  const UpdateSearchValueDebounced = async (value) => {
    setisLoading(true)

    await client.query({
      query: GET_SEARCH_PRODUCTS_QUERY,
      variables: {
        search: `%${value}%`
      }
    }).then(({ data }) => {
      setItemsSearched(data.product)
      setisLoading(false)
      if (value && !_.includes(recentSearch, value)) {
        localStorage.setItem('@noemia:recentSearch', JSON.stringify([...recentSearch, value]));
        setRecentSearch([...recentSearch, value])
      }
    })
  }

  const updateSerchOnCancell = () => {
    setSearch('')
    setItemsSearched([])
    setFocused(false)
  }

  const showRecentSearch = () => {
    if (!search && focused && !isLoading && recentSearch) {
      return true
    } else return false
  }

  const showSerched = () => {
    if (!search && !focused && !isLoading) {
      return true
    } else return false
  }

  const selectRecentSearch = (item) => {
    setSearch(item)
    UpdateSearchValueDebounced(item)
  }
  return (
    <div className={styles.search}>
      <div className={styles.searchInput}>
        <ContainerSpaceBetween >
          <GenericSearchInput
            value={search}
            setValue={setSearch}
            onChange={UpdateSearchValueDebounced}
            onFocus={() => setFocused(true)}
          />
          {(focused || search) && (
            <div onClick={() => updateSerchOnCancell()}>
              <GenericText>Cancel</GenericText>
            </div>
          )}
        </ContainerSpaceBetween>
      </div>

      {showRecentSearch() && <RecentSearch recentSearch={recentSearch} selecItem={(item) => selectRecentSearch(item)} />}
      {showSerched() && <CategoriesSearch />}

      {isLoading && <Spinner />}
      {
        search && itemsSearched.length > 0 &&
        <div className={styles.searchedWrapper}>
          {itemsSearched.map(product => <CardSuggestions key={product.id} product={product} />)}
        </div>
      }
    </div>
  )
}