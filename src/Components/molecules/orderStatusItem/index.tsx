import styles from './orderStatusItem.module.scss'
import React from 'react'
import GenericIcon from '../../../components/atoms/genericIcon'
import GenericText from '../../../components/atoms/genericText' 


export default function OrderStatusItem({ status }) {

  const titleStatus = () => {
    if (status.step === 'confirmation') {
      return 'The order was confirmed'
    }
    if (status.step === 'preparation') {
      return 'Your product is being prepared'
    }
    if (status.step === 'delivery') {
      return 'Your order went out for delivery!'
    }
    if (status.step === 'arrived') {
      return 'Order arrived '
    }
  }

  return (
    <div className={styles.orderStatusItem}>
      <div className={styles.orderStatus}>
        {status.completeDate ?
          <ActiveStatus status={status} /> :
          <DefaultStatus status={status} />
        }
      </div>
      <div className={styles.statusDetail}>
        <GenericText weight="bold">{titleStatus()}</GenericText>
        <GenericText>{status.completeDate}</GenericText>
      </div> 
    </div>
  )
}

function ActiveStatus({ status }) {

  return (
    <div className={styles.activeStatus}>
      <div className={styles.icon}>
        {
          status.step !== 'arrived' ?
            <div className={styles.isActive} /> : <GenericIcon icon="check" color="yellow" />
        }
      </div>
      {status.step !== 'arrived' && <div className={styles.divider} />}
    </div>
  )
}

function DefaultStatus({ status }) {

  return (
    <div className={styles.defaultStatus} >
      <div className={styles.icon}>
        <div />
      </div>

      {status.step !== 'arrived' && <div className={styles.divider} />}
    </div>
  )
}