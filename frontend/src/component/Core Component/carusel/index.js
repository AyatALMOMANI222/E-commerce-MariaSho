import React, { useState, useEffect, useRef } from 'react'
import "./style.scss";

import SVG from 'react-inlinesvg'
import {PointIcon} from "../../../icons"
const dir = "ltr"


const Carousel = ({ items, title, move, setMove, titleDataId, className = '' }) => {
  const [currentItem, setCurrentItem] = useState(0)
  const [isMousePressed, setMousePressed] = useState(false)
  const [isTouching, setTouching] = useState(false)
  const [initialX, setInitialX] = useState(null)
  const [movingRight, setMovingRight] = useState(false)
  const [movingLeft, setMovingLeft] = useState(false)
  const isMovingRight =
    currentItem == items?.length - 1 ? (movingRight ? 'moveRight' : 'resetRight') : ''
  const isMovingLeft = currentItem === 0 ? (movingLeft ? 'moveLeft' : 'resetLeft') : ''

  const itemRef = useRef(null)
  const handleMouseDown = (e) => {
    setMousePressed(true)
    setInitialX(e.clientX)
  }

  const handleDisplacement = () => {
    if (currentItem === items.length - 1) {
      setMovingRight(true)
      setTimeout(() => {
        setMovingRight(false)
      }, [500])
    }
    if (currentItem === 0) {
      setMovingLeft(true)
      setTimeout(() => {
        setMovingLeft(false)
      }, [500])
    }
  }

  const handleMouseMove = (e) => {
    if (isMousePressed) {
      const currentX = e.clientX
      if (dir == 'ltr') {
        if (currentX > initialX && currentItem == 0) {
          handleDisplacement()
        } else if (currentX > initialX && currentItem !== 0) {
          setCurrentItem(currentItem - 1)
        } else if (currentX < initialX && currentItem === items?.length - 1) {
          handleDisplacement()
        } else if (currentX < initialX && currentItem < items?.length - 1) {
          setCurrentItem(currentItem + 1)
        }
      } else {
        if (currentX < initialX && currentItem === 0) {
          handleDisplacement()
        } else if (currentX < initialX && currentItem !== 0) {
          setCurrentItem(currentItem - 1)
        } else if (currentX > initialX && currentItem === items?.length - 1) {
          handleDisplacement()
        } else if (currentX > initialX && currentItem < items?.length - 1) {
          setCurrentItem(currentItem + 1)
        }
      }
    }
  }

  const handleMouseUp = () => {
    setMousePressed(false)
  }

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isMousePressed])

  // for iPad Mini
  const handleTouchStart = (e) => {
    setTouching(true)
    setInitialX(e.touches[0].clientX)
  }

  const handleTouchMove = (e) => {
    if (isTouching) {
      if (dir == 'ltr') {
        const currentX = e.touches[0].clientX
        if (currentX > initialX && currentItem !== 0) {
          setCurrentItem(currentItem - 1)
        } else if (currentX > initialX && currentItem === 0) {
          handleDisplacement()
        } else if (currentX < initialX && currentItem === items.length - 1) {
          handleDisplacement()
        } else if (currentX < initialX && currentItem < items.length - 1) {
          setCurrentItem(currentItem + 1)
        }
      } else {
        const currentX = e.touches[0].clientX
        if (currentX < initialX && currentItem !== 0) {
          setCurrentItem(currentItem - 1)
        } else if (currentX < initialX && currentItem === 0) {
          handleDisplacement()
        } else if (currentX > initialX && currentItem === items.length - 1) {
          handleDisplacement()
        } else if (currentX > initialX && currentItem < items.length - 1) {
          setCurrentItem(currentItem + 1)
        }
      }
    }
  }

  const handleTouchEnd = () => {
    setTouching(false)
  }
  useEffect(() => {
    window.addEventListener('touchmove', handleTouchMove)
    window.addEventListener('touchend', handleTouchEnd)

    return () => {
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('touchend', handleTouchEnd)
    }
  }, [isTouching])

  useEffect(() => {
    setMove && setMove(!move)
  }, [currentItem])

  return (
    <div className={`${"carouselContainer"} ${className}`}>
      <div className={"carouselTitle"} data-id={titleDataId}>
        {title}
      </div>
      <div className={"carousel"}>
        <div
          className={"carouselTrack"}
          style={{
            transform: `translateX(${dir == 'ltr' ? '-' : ''}${
              currentItem * itemRef?.current?.offsetWidth + currentItem * 12
            }px)`,
          }}
          onTouchStart={handleTouchStart}
          onMouseDown={handleMouseDown}
        >
          {items?.map((item, index) => (
            <div
              ref={itemRef}
              key={index}
              className={`${"carouselElement"} ${"isMovingRight"} ${"isMovingLeft"}`}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
      <div className={"pointsContainer"}>
        {items?.map((item, index) => {
          return (
             <SVG
              src={PointIcon}
              className={`${"point"} ${currentItem === index ? "active" : ''}`}
             width={12}
              height={12}
              onClick={() => setCurrentItem(index)}
           />
          )
        })}
      </div>
    </div>
  )
}

export default Carousel
