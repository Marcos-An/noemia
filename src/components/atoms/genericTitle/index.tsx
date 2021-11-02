import styles from './genericTitle.module.scss'

export default function GenericTitle({ color = 'black', children }) {
  return <h1 className={styles[`genericTitle-${color}`]}>{children}</h1>
}
