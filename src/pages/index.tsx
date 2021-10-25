import React, { useContext, useEffect } from 'react'
import { ControllersContext } from '../contexts/ControllersContext'
import styles from './home.module.scss'
import HomeLoading from '@components/atoms/homeLoading'
import MainMenu from '@components/organisms/mainMenu'
import Suggestions from '@components/organisms/suggestions'
import Banners from '@components/organisms/banners'
import AllMenu from '@components/organisms/allMenu'
import { GET_CATEGORY_QUERY, GET_PRODUCTS_QUERY } from '@graphql/queries'
import { initializeApollo } from '@graphql/apollo'
import { useQuery } from '@apollo/client'


export default function Home({ categories, products }) {
  const controllersContext = useContext(ControllersContext)
  const { updateFooterType, selectedItemMenu } = controllersContext
  const { loading: categoryLoading } = useQuery(GET_CATEGORY_QUERY)
  const { loading: productLoading } = useQuery(GET_PRODUCTS_QUERY)


  useEffect(() => {
    updateFooterType('main')
  }, [updateFooterType])

  return (
    productLoading && categoryLoading ? <HomeLoading /> :
      <div className={styles.container}>
        <MainMenu categories={categories} />
        <Banners />
        {selectedItemMenu.name !== 'Drink' && <Suggestions />}
        <AllMenu products={products} />
      </div>
  )
}


export async function getStaticProps() {
  const client = initializeApollo()

  const categories = await client.query({ query: GET_CATEGORY_QUERY }).then(({ data }) => data.category)
  const products = await client.query({ query: GET_PRODUCTS_QUERY }).then(({ data }) => data.product)

  return {
    props: {
      categories,
      products
    },
  }
}
