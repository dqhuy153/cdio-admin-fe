import React from 'react'
import cn from 'classnames'
import { isEmpty } from '@utils/helpers'
import { Grid } from '@material-ui/core'
import View from '../View'

const ViewItem: React.FC<Props> = ({
  label,
  value,
  variant = 'is-half',
  className,
  boldValue = false,
  ...props
}) => {
  const isEmptyLine = isEmpty(label) && isEmpty(value)

  if (isEmptyLine) {
    return (
      <Grid
        className={cn('cmp-view-item__empty', variant, className)}
        {...props}
      />
    )
  }

  return (
    <Grid className={cn('cmp-view-item column', className)} {...props}>
      <View className='cmp-view-item__label'>{label}</View>
      <View className='cmp-view-item__value'>
        {boldValue
          ? <b>{value}</b> || <b>--</b>
          : typeof value === 'number' //check value is 0
          ? value
          : value || '--'}
      </View>
    </Grid>
  )
}

type Props = {
  label?: string | React.ReactElement
  value?: string | boolean | number | React.ReactElement
  className?: string
  variant?:
    | 'is-three-quarters'
    | 'is-two-thirds'
    | 'is-half'
    | 'is-one-third'
    | 'is-one-quarter'
    | 'is-full'
  boldValue?: boolean
}

export default ViewItem
