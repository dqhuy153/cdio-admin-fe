import React from 'react'
import cn from 'classnames'
import { Grid } from '@material-ui/core'
import { Callback } from '@utils/types'

import styles from './styles.module.scss'
import { Skeleton } from '@mui/material'

interface Props {
  label?: string | React.ReactNode
  iconTopLeft?: React.ReactNode
  iconTopRight?: React.ReactNode
  backgroundColor?: string
  borderRadius?: number
  header?: string | React.ReactNode
  body: string | React.ReactNode
  style?: React.CSSProperties
  loading?: boolean
  className?: string
  maxHeightBody?: string
  footer?: string | React.ReactNode
  onIconTopLeftClick?: Callback
  onIconTopRightClick?: Callback
}

// tslint:disable-next-line: cyclomatic-complexity
const OverviewBox: React.FC<Props> = ({
  label = 'Label',
  iconTopLeft,
  iconTopRight,
  backgroundColor = '#ffffff',
  borderRadius = 18,
  maxHeightBody = 'auto',
  loading = false,
  header,
  style,
  className,
  body,
  footer,
  onIconTopLeftClick,
  onIconTopRightClick,
}) => {
  return (
    <Grid
      container
      spacing={1}
      className={cn(styles.container, className)}
      style={{
        ...style,
        borderRadius: `${borderRadius}px`,
        background: backgroundColor,
        overflow: 'auto',
      }}
    >
      {header ? (
        <Grid item xs={12}>
          {loading ? (
            <Skeleton width='80%' />
          ) : typeof header === 'string' ? (
            <h4>{header}</h4>
          ) : (
            header
          )}
        </Grid>
      ) : (
        <Grid item xs={12}>
          <div className='justify-space-between'>
            {loading ? (
              <>
                <Skeleton
                  width={'65%'}
                  height={35}
                  style={{ borderRadius: '8px' }}
                />
                <Skeleton
                  width={'25%'}
                  height={35}
                  style={{ borderRadius: '8px' }}
                />
              </>
            ) : (
              <>
                <div className='justify-space-between'>
                  {iconTopLeft && (
                    <div
                      style={{
                        cursor: onIconTopLeftClick ? 'cursor' : 'default',
                      }}
                      onClick={onIconTopLeftClick}
                    >
                      {iconTopLeft}
                    </div>
                  )}
                  {typeof label === 'string' ? <h4>{label}</h4> : label}
                </div>
                <div
                  style={{
                    cursor: onIconTopLeftClick ? 'cursor' : 'default',
                  }}
                  onClick={onIconTopRightClick}
                >
                  {iconTopRight}
                </div>
              </>
            )}
          </div>
        </Grid>
      )}
      {loading ? (
        <Skeleton
          width='100%'
          height={100}
          animation='wave'
          style={{ borderRadius: '8px' }}
        />
      ) : (
        <>
          <Grid
            item
            xs={12}
            style={{
              maxHeight: maxHeightBody,
              overflow: 'auto',
            }}
          >
            {typeof body === 'string' ? <h3>{body}</h3> : body}
          </Grid>
          <Grid item xs={12}>
            {typeof footer === 'string' ? <p>{footer}</p> : footer}
          </Grid>
        </>
      )}
    </Grid>
  )
}

export default OverviewBox
