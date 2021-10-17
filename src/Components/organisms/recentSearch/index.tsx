import styles from './recentSearch.module.scss'
import GenericTitle from '../../atoms/genericTitle'
import RecentSearchItem from '../../molecules/recentSearchItem'

export default function RecentSearch() {
  return (
    <div className={styles.recentSearch}>
      <GenericTitle>Recent Search</GenericTitle>

      <RecentSearchItem />
      <RecentSearchItem />
      <RecentSearchItem />
      <RecentSearchItem />
    </div>
  )
}