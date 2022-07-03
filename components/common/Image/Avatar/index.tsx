import React from 'react'
import Image, { ImageProps } from 'next/image'

import styles from './styles.module.scss'

const Avatar: React.FC<Props> = ({ src, alt, size = 45, ...props }) => {
  return (
    <div
      className={styles.container}
      style={{
        width: `${size}px`,
        height: `${size}px`,
      }}
    >
      <Image src={src} alt={alt} {...props} width={size} height={size} />
    </div>
  )
}

type Props = {
  src: StaticImageData
  alt: string
  size?: number
} & ImageProps

export default Avatar
