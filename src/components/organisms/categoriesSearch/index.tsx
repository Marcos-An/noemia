import React, { useState } from 'react';
import styles from './categoriesSearch.module.scss'
import GenericTitle from '../../atoms/genericTitle'
import CardCategory from '../../molecules/cardCategory'
import { CARDS_MENU } from '@utils/datas'


export default function CategoriesSearch() {
  const [categories] = useState(CARDS_MENU)

  return (
    <div className={styles.categoriesSearch}>
      <GenericTitle>Categories</GenericTitle>
      <div className={styles.categoriesItems}>
        {categories.map(category => (
          <CardCategory
            key={category.name}
            itemMenu={category}
          />
        ))}

      </div>
    </div>
  )
}
