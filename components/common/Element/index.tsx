import React from 'react'
import cn from 'classnames'

import View, { ViewProps } from '../View'
import { isEmpty } from '@utils/helpers'

const Element: React.FC<Props> = ({
  isInlineLabel = false,
  id,
  children,
  errorMessage,
  label,
  className,
  ...props
}) => {
  const hasError = !isEmpty(errorMessage)
  const hasLabel = !isEmpty(label)

  return (
    <View
      isRowWrap={isInlineLabel}
      className={cn(className, 'form-element')}
      {...props}
    >
      {hasLabel && (
        <label className={isInlineLabel ? 'mt-8 mr-16' : ''} htmlFor={id}>
          {label}
        </label>
      )}
      <View>
        {children}
        {hasError && <p className='form-element__error'>{errorMessage}</p>}
      </View>
    </View>
  )
}

type Props = ViewProps & {
  children: React.ReactNode
  id?: string
  label?: string | React.ReactNode
  errorMessage?: string
  className?: string
  isInlineLabel?: boolean
}

export default Element
