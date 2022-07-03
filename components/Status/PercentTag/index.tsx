import React from 'react'
import cn from 'classnames'
import { GoTriangleDown, GoTriangleUp } from 'react-icons/go'

interface Props {
  value?: number
}

const PercentTag = ({ value = 0 }: Props) => {
  const styles =
    value > 0
      ? { background: '#E6F6E7' }
      : value < 0
      ? { background: '#FCE4E0' }
      : { background: '#EEEEEE' }

  const colorTextClass =
    value > 0
      ? 'has-text-success'
      : value < 0
      ? 'has-text-danger'
      : 'has-text-gray'

  return (
    <div className='py-4 px-8 br-4 justify-space-between' style={styles}>
      {value >= 0 ? (
        <GoTriangleUp className={cn(colorTextClass, 'mr-8')} />
      ) : (
        <GoTriangleDown className={cn(colorTextClass, 'mr-8')} />
      )}
      <p className={colorTextClass}>{value.toFixed(1)} %</p>
    </div>
  )
}

export default PercentTag
