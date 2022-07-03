import React from 'react'
import cn from 'classnames'

const View: React.FC<ViewProps> = ({
  children,
  className,
  isRow,
  isRowWrap,
  justify = 'flex-start',
  align = '',
  renderIf = true,
  flexGrow = 0,
  style,
  forwardRef,
  ...props
}) => {
  if (!renderIf) return null

  return (
    <div
      ref={forwardRef}
      className={cn(
        'cmp-view',
        {
          [`cmp-view__justify--${justify}`]: justify,
          [`cmp-view__align--${align}`]: align,
          'cmp-view--row': isRow,
          'cmp-view--row-no-wrap': isRowWrap,
        },
        className
      )}
      style={{ ...style, flexGrow }}
      {...props}
    >
      {children}
    </div>
  )
}

export type ViewProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  isRow?: boolean
  isRowWrap?: boolean
  justify?:
    | 'center'
    | 'space-between'
    | 'flex-start'
    | 'flex-end'
    | 'space-around'
    | 'space-evenly'
  align?: 'center' | 'flex-start' | 'flex-end'
  renderIf?: boolean
  flexGrow?: number
  forwardRef?: React.LegacyRef<HTMLDivElement>
}

export default View
