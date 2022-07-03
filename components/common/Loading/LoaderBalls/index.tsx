import React from 'react'

import styles from '../LoaderBalls/styles.module.scss'

const LoaderBall = ({
  width = 50,
  height = 50,
  backgroundColor = 'transparent',
  color1 = '#669ff1',
  color2 = '#b4d3f8',
  color3 = '#b6bde5',
  color4 = '#4576e2',
  color5 = '#669ff1',
  className,
  style,
  showInMiddleOfPage = false,
}: Props) => {
  return (
    <div
      className={`${className} ${styles.container} ${
        showInMiddleOfPage && 'center-page'
      }`}
      style={style}
    >
      <span
        dangerouslySetInnerHTML={{
          __html: '<?xml version="1.0" encoding="utf-8"?>',
        }}
      />
      <svg
        xmlns='http://www.w3.org/2000/svg'
        xmlnsXlink='http://www.w3.org/1999/xlink'
        style={{
          backgroundColor,
          margin: 'auto',
          display: 'block',
          shapeRendering: 'auto',
        }}
        width={typeof width === 'number' ? `${width}px` : width}
        height={typeof height === 'number' ? `${height}px` : height}
        viewBox='0 0 100 100'
        preserveAspectRatio='xMidYMid'
      >
        <circle cx='84' cy='50' r='10' fill={`${color1}`}>
          <animate
            attributeName='r'
            repeatCount='indefinite'
            dur='0.6097560975609756s'
            calcMode='spline'
            keyTimes='0;1'
            values='13;0'
            keySplines='0 0.5 0.5 1'
            begin='0s'
          />
          <animate
            attributeName='fill'
            repeatCount='indefinite'
            dur='2.4390243902439024s'
            calcMode='discrete'
            keyTimes='0;0.25;0.5;0.75;1'
            values={`${color1};${color2};${color3};${color4};${color5};`}
            begin='0s'
          />
        </circle>
        <circle cx='16' cy='50' r='10' fill={`${color2}`}>
          <animate
            attributeName='r'
            repeatCount='indefinite'
            dur='2.4390243902439024s'
            calcMode='spline'
            keyTimes='0;0.25;0.5;0.75;1'
            values='0;0;13;13;13'
            keySplines='0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1'
            begin='0s'
          />
          <animate
            attributeName='cx'
            repeatCount='indefinite'
            dur='2.4390243902439024s'
            calcMode='spline'
            keyTimes='0;0.25;0.5;0.75;1'
            values='16;16;16;50;84'
            keySplines='0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1'
            begin='0s'
          />
        </circle>
        <circle cx='50' cy='50' r='10' fill={`${color3}`}>
          <animate
            attributeName='r'
            repeatCount='indefinite'
            dur='2.4390243902439024s'
            calcMode='spline'
            keyTimes='0;0.25;0.5;0.75;1'
            values='0;0;13;13;13'
            keySplines='0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1'
            begin='-0.6097560975609756s'
          />
          <animate
            attributeName='cx'
            repeatCount='indefinite'
            dur='2.4390243902439024s'
            calcMode='spline'
            keyTimes='0;0.25;0.5;0.75;1'
            values='16;16;16;50;84'
            keySplines='0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1'
            begin='-0.6097560975609756s'
          />
        </circle>
        <circle cx='84' cy='50' r='10' fill={`${color4}`}>
          <animate
            attributeName='r'
            repeatCount='indefinite'
            dur='2.4390243902439024s'
            calcMode='spline'
            keyTimes='0;0.25;0.5;0.75;1'
            values='0;0;13;13;13'
            keySplines='0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1'
            begin='-1.2195121951219512s'
          />
          <animate
            attributeName='cx'
            repeatCount='indefinite'
            dur='2.4390243902439024s'
            calcMode='spline'
            keyTimes='0;0.25;0.5;0.75;1'
            values='16;16;16;50;84'
            keySplines='0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1'
            begin='-1.2195121951219512s'
          />
        </circle>
        <circle cx='16' cy='50' r='10' fill={`${color5}`}>
          <animate
            attributeName='r'
            repeatCount='indefinite'
            dur='2.4390243902439024s'
            calcMode='spline'
            keyTimes='0;0.25;0.5;0.75;1'
            values='0;0;13;13;13'
            keySplines='0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1'
            begin='-1.8292682926829267s'
          />
          <animate
            attributeName='cx'
            repeatCount='indefinite'
            dur='2.4390243902439024s'
            calcMode='spline'
            keyTimes='0;0.25;0.5;0.75;1'
            values='16;16;16;50;84'
            keySplines='0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1'
            begin='-1.8292682926829267s'
          />
        </circle>
      </svg>
    </div>
  )
}

type Props = {
  width?: number | string
  height?: number | string
  backgroundColor?: string
  color1?: string
  color2?: string
  color3?: string
  color4?: string
  color5?: string
  className?: string
  style?: React.CSSProperties
  showInMiddleOfPage?: boolean
}

export default LoaderBall
