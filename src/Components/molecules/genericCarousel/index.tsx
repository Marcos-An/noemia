import styles from './genericCarousel.module.scss'
import { useState, useEffect } from 'react'

export default function GenericCarousel({ children, padding = true, size, limit = 9 }) {
  const [initialPosition, setInitialPosition] = useState(null)
  const [moving, setMoving] = useState(false)
  const [trasnform, setTrasnform] = useState(0)
  const [difference, setDifference] = useState(null)
  const [id, setId] = useState('#id')

  useEffect(() => {
    var randomColor = Math.floor(Math.random() * 16777215).toString(16);
    setId(`#${randomColor}`)
  }, [])

  const startTheRoll = ({ changedTouches }) => {
    setInitialPosition(changedTouches[0].pageX)
    const carouselContainer = document.getElementById(id)
    const trasnformMatrix = window.getComputedStyle(carouselContainer).getPropertyValue('transform')
    if (trasnformMatrix !== 'none') {
      setTrasnform(parseInt(trasnformMatrix.split(',')[4].trim()))
    }
    setMoving(true)
  }

  const rollingTheCarousel = ({ changedTouches }) => {
    if (moving) {
      const currentPosition = changedTouches[0].pageX
      const diff = currentPosition - initialPosition
      document.getElementById(id).style.transform = `translateX(${trasnform + diff}px)`
      setDifference(trasnform + diff)

    }
  }

  const endTheRoll = () => {
    if (Math.sign(difference) === 1) {
      document.getElementById(id).style.transform = `translateX(0px)`
    } if (difference < -90) {
      document.getElementById(id).style.transform = `translateX(-${limit}rem)`
    }
    setMoving(false)
  }

  return (
    <div
      style={{ padding: padding ? '0rem 2.4rem' : `none` }}
      className={styles.carouselWrapper}
    >
      <div
        id={id}
        style={{ gridTemplateColumns: `repeat(${size}, 1fr)` }}
        className={styles.carouselContainer}
        onTouchStart={event => startTheRoll(event)}
        onTouchMove={(event) => rollingTheCarousel(event)}
        onTouchEnd={() => endTheRoll()}
      >
        {children}
      </div>
    </div>
  )

}