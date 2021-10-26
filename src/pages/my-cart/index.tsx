import styles from './myCart.module.scss'
import React, { useState, useEffect, useContext } from 'react'
import { ControllersContext } from '../../contexts/ControllersContext'
import CardMyCart from '../../components/molecules/cardMyCart'
import GenericTitle from '../../components/atoms/genericTitle'
import Drawer from '../../components/molecules/drawer'
import TrashButton from '../../components/molecules/trashButton'
import RadioSelector from '../../components/organisms/radioSelector'
import UpdateItemCartButton from '../../components/organisms/updateItemCartButton'
import { SIZE_OPTIONS } from '../../utils/datas'
import EmptyMessage from '../../components/molecules/emptyMessage'
import ResumeCart from '../../components/molecules/resumeCart'

export default function MyCart() {
  const controllersContext = useContext(ControllersContext)
  const { myCartItems, updateHeaderText, updateFooterType, } = controllersContext

  useEffect(() => {
    updateHeaderText('Your Cart')
    updateFooterType('cartDetail')
  }, [updateHeaderText, updateFooterType])

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

  const {
    myCartItems,
    addingCardItem,
    updateAddingCartItem,
    updateMyCart,
    removingItemFromCart
  } = controllersContext

  useEffect(() => {
    const newOptions = [...options]

    newOptions.forEach((currentItem) => {
      if (currentItem.value === addingCardItem.size) {
        currentItem.isActive = true;
      } else {
        currentItem.isActive = false;
      }
    })

    setOptions(() => [...newOptions])
  }, [])


  const handleDrawerActive = (selectedItem) => {
    updateAddingCartItem(selectedItem)
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
    updateMyCart(addingCardItem)
    setDrawerIsActive(!drawerIsActive)
  }

  const removeItem = () => {
    removingItemFromCart(addingCardItem)
    setDrawerIsActive(!drawerIsActive)
  }


  return (
    <div className={styles.container}>
      {myCartItems.map(item =>
        <CardMyCart key={item.name} product={item} onClick={() => handleDrawerActive(item)} />
      )}

      <ResumeCart />

      <Drawer isActive={drawerIsActive} close={setDrawerIsActive}>
        <div className={styles.titleAndTrashButton}>
          <GenericTitle>{addingCardItem.name}</GenericTitle>
          <TrashButton onClick={removeItem} />
        </div>
        {addingCardItem.type === 'pizza' && (
          <div className={styles.chooseSize}>
            <GenericTitle>Choose a size</GenericTitle>
            <RadioSelector options={options} onClick={handleActiveOption} />
          </div>
        )}
        <UpdateItemCartButton
          isDisabled={false}
          price={addingCardItem.quantity * addingCardItem.price}
          text="Update cart"
          onClick={updateCart}
        />
      </Drawer>
    </div >
  )
}
