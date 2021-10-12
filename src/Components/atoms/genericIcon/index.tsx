import styles from './genericIcon.module.scss'
import FeatherIcon from 'feather-icons-react';

export default function GenericIcon({ icon, size = "24", color = "black", onClick = () => { } }) {
  return <FeatherIcon
    icon={icon}
    size={size}
    onClick={onClick}
    className={styles[`genericIcon-${color}`]}
  />
}