import React, { useContext } from 'react'
import PizzaBanner from '../pizzaBanner'
import StarterBanner from '../starterBanner'
import WineBanner from '../wineBanner'
import DrinksBanner from '../drinksBanner'
import { ControllersContext } from '../../../contexts/ControllersContext'

export default function Banners({ products }) {
  const controllersContext = useContext(ControllersContext)
  const { selectedItemMenu } = controllersContext

  const { name } = selectedItemMenu

  return (
    <>
      {name === 'Pizza' && <PizzaBanner products={products} />}
      {name === 'Starter' && <StarterBanner />}
      {name === 'Wine' && <WineBanner />}
      {name === 'Drink' && <DrinksBanner />}
    </>
  )
}
