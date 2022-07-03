import React from 'react'

import styles from './styles.module.scss'

const RoundIconButton = ({
  bgColor = '#fff',
  color,
  boxShadow,
  width = '100%',
  height = '100%',
  margin = '0',
  padding = '0',
  onClick,
  className,
  hoverBgColor = '',
  hoverColor = '',
  ...props
}: Props) => {
  return (
    <div
      className={`${styles.container} ${className}`}
      style={{
        color,
        boxShadow,
        width,
        height,
        margin,
        padding,
        background: bgColor,
      }}
    >
      <button onClick={onClick} {...props}>
        {props.children}
      </button>
    </div>
  )
}

type Props = {
  bgColor?: string
  color?: string
  boxShadow?: string
  width?: string
  height?: string
  margin?: string
  padding?: string
  onClick?: () => void
  className?: string
  children?: React.ReactNode
  hoverBgColor?: string
  hoverColor?: string
}

export default RoundIconButton
