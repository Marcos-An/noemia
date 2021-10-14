import styles from './myCart.module.scss'
import React, { useState, useEffect, useContext } from 'react'
import { ControllersContext } from '../../Contexts/ControllersContext'
import CardMyCart from '../../Components/molecules/cardMyCart'
import GenericTitle from '../../Components/atoms/genericTitle'
import GenericText from '../../Components/atoms/genericText'
import { formatCurrency } from '../../utils/formatData'
import Drawer from '../../Components/molecules/drawer'
import TrashButton from '../../Components/molecules/trashButton'
import RadioSelector from '../../Components/organisms/radioSelector'
import UpdateItemCartButton from '../../Components/organisms/updateItemCartButton'
import { SIZE_OPTIONS } from '../../utils/datas'
import EmptyMessage from '../../Components/molecules/emptyMessage'

export default function MyCart() {
  const controllersContext = useContext(ControllersContext)
  const { myCartItems, updateHeaderText, updateFooterType, } = controllersContext

  useEffect(() => {
    updateHeaderText('Your Cart')
    updateFooterType('cartDetail')
  }, [])

  return myCartItems.length > 0 ? <CartWithItems controllersContext={controllersContext} /> : <CartWithoutItems />
}

function CartWithoutItems() {
  return (
    <div className={styles.container}>
      <EmptyMessage
        title="Dishes is clear!"
        text="We don't find any items in your cart, add an item and come back here."
      />
    </div>
  )
}

function CartWithItems({ controllersContext }) {
  const [drawerIsActive, setDrawerIsActive] = useState(false)
  const [options, setOptions] = useState(SIZE_OPTIONS)
  const [selectedItem, setSelectedItem] = useState({
    id: 0,
    name: '',
    pathImage: '',
    description: '',
    type: '',
    price: 0,
    quantity: 0,
    size: '',
    observation: '',
  })

  const {
    myCartItems,
    addingCardItem,
    updateAddingCardItem,
    updateMyCart,
    removingItemFromCart
  } = controllersContext

  useEffect(() => {
    const newOptions = [...options]

    newOptions.forEach((currentItem) => {
      if (currentItem.value === addingCardItem.size) {
        setSelectedItem(addingCardItem)
        currentItem.isActive = true;
      } else {
        currentItem.isActive = false;
      }
    })

    setOptions(() => [...newOptions])
  }, [addingCardItem])


  const currentPrice = () => {
    var subTotal = 0

    myCartItems.forEach(({ quantity, price }) => {
      subTotal = quantity * price
    })

    return subTotal
  }

  const itemPrice = () => {
    return selectedItem.price * selectedItem.quantity
  }

  const handleDrawerActive = (selectedItem) => {
    setSelectedItem(selectedItem)
    updateAddingCardItem(selectedItem)
    setDrawerIsActive(!drawerIsActive)
  }

  const handleActiveOption = selectedItem => {
    const newOptions = [...options]

    newOptions.forEach((currentItem) => {
      if (currentItem === selectedItem) {
        currentItem.isActive = true;
      } else {
        currentItem.isActive = false;
      }
    })

    setOptions(() => [...newOptions])
  }

  const updateCart = () => {
    updateMyCart(selectedItem)
    setDrawerIsActive(!drawerIsActive)
  }

  const removeItem = () => {
    removingItemFromCart(selectedItem)
    setDrawerIsActive(!drawerIsActive)
  }


  return (
    <div className={styles.container}>
      {myCartItems.map(item =>
        <CardMyCart key={item.name} product={item} onClick={() => handleDrawerActive(item)} />
      )}

      <div className={styles.resumeCart}>
        <GenericTitle>Your Resume</GenericTitle>
        <div className={styles.resumeItems}>
          <GenericText>Subtotal</GenericText>
          <GenericTitle>{formatCurrency(currentPrice())}</GenericTitle>
        </div>
        <div className={styles.resumeItems}>
          <GenericText>Delivery</GenericText>
          <GenericTitle>{formatCurrency(5)}</GenericTitle>
        </div>
        <div className={styles.strokeDashed} />
        <div className={styles.resumeItems}>
          <GenericText>Total</GenericText>
          <GenericTitle>{formatCurrency(currentPrice() + 5)}</GenericTitle>
        </div>
      </div>

      <Drawer isActive={drawerIsActive} close={setDrawerIsActive}>
        <div className={styles.titleAndTrashButton}>
          <GenericTitle>{selectedItem.name}</GenericTitle>
          <TrashButton onClick={removeItem} />
        </div>
        {selectedItem.type === 'pizza' && (
          <div className={styles.chooseSize}>
            <GenericTitle>Choose a size</GenericTitle>
            <RadioSelector options={options} onClick={handleActiveOption} />
          </div>
        )}
        <UpdateItemCartButton
          disabled={false}
          price={itemPrice()}
          text="Update cart"
          onClick={updateCart}
        />
      </Drawer>
    </div >
  )
}
