import styles from './genericText.module.scss'

export default function GenericText({ weight = "regular", color = "black", children }) {
  return <p className={styles[`genericText-${weight}-${color}`]}>{children}</p>
}