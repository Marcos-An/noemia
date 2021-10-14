import React, { useState, useContext, useEffect } from 'react'
import styles from './product.module.scss'
import GenericTitle from '../../Components/atoms/genericTitle'
import GenericIcon from '../../Components/atoms/genericIcon'
import GenericText from '../../Components/atoms/genericText'
import GenericInputArea from '../../Components/atoms/genericInputArea'
import RadioSelector from '../../Components/organisms/radioSelector'
import { ControllersContext } from '../../Contexts/ControllersContext'
import { SIZE_OPTIONS } from '../../utils/datas'
import Image from 'next/image'

const itemSelected = {
  id: 1,
  name: "Napoletana",
  pathImage: "/napoletana.jpg",
  description: "Layer of Fresh Mozzarella, San Marzano Plum Tomatoes, Fresh garlic, Fresh Basil & Tuscan Olive Oil",
  type: 'pizza',
  price: 33.99,
}

const { name, pathImage, type, description } = itemSelected


export default function Product() {
  const [options, setOptions] = useState(SIZE_OPTIONS)
  const [observation, setObservation] = useState({ value: '', fieldActive: false })
  const controllersContext = useContext(ControllersContext)

  const { addingCardItem, updateAddingCardItem, updateHeaderText, updateFooterType } = controllersContext

  useEffect(() => {
    updateHeaderText('')
    updateFooterType('detailProduct')

    if (!(addingCardItem.id === itemSelected.id)) {
      const newCardItem = {
        ...itemSelected,
        observation: '',
        quantity: 1,
        size: ''
      }
      updateAddingCardItem(newCardItem)
    }
  }, [])

  const updateSize = (size) => {
    const newCardItem = { ...addingCardItem }

    newCardItem.size = size

    updateAddingCardItem(newCardItem)
  }

  const handleActive = itemSeleted => {
    const newOptions = [...options]

    newOptions.forEach((currentItem) => {
      if (currentItem === itemSeleted) {
        currentItem.isActive = true;
        updateSize(itemSeleted.value)
      } else {
        currentItem.isActive = false;
      }
    })
    setOptions(() => [...newOptions])
  }

  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <Image
          src={pathImage}
          alt="napoletana"
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className={styles.informationsContainer}>
        <GenericTitle>{name}</GenericTitle>
        <GenericText>{description}</GenericText>
        {type === 'pizza' && (
          <div className={styles.chooseSize}>
            <GenericTitle>Choose a size</GenericTitle>
            <RadioSelector options={options} onClick={handleActive} />
          </div>
        )}
        <div className={styles.addObservationWrapper}>
          <GenericIcon icon="message-square" size="18" />
          <GenericTitle>Add observation</GenericTitle>
        </div>
        <GenericInputArea
          observation={observation}
          setObservation={setObservation}
        />
      </div>
    </div>
  )
}
