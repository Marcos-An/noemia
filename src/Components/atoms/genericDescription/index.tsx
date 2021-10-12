import styles from './genericDescription.module.scss'

export default function GenericDescription({ children }) {
  return <p className={styles.genericDescription}>{children}</p>
}