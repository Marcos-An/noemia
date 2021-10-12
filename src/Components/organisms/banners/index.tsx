import React, { useContext } from 'react'
import PizzaBanner from '../pizzaBanner'
import StarterBanner from '../starterBanner'
import WineBanner from '../wineBanner'
import DrinksBanner from '../drinksBanner'
import { ControllersContext } from '../../../Contexts/ControllersContext'

export default function Banners() {
  const controllersContext = useContext(ControllersContext)
  const { selectedItemMenu: { name } } = controllersContext

  return (
    <>
      {name === 'Pizza' && <PizzaBanner />}
      {name === 'Starter' && <StarterBanner />}
      {name === 'Wine' && <WineBanner />}
      {name === 'Drink' && <DrinksBanner />}
    </>
  )
}
