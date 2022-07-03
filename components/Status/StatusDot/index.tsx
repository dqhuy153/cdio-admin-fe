import { AllStatus, StatusColor } from '@config/constant'
import { getStatusText } from '@utils/helpers'
import React, { Fragment } from 'react'

interface Props {
  statusId?: number
  showText?: boolean
}

const StatusDot = ({ statusId, showText = false }: Props) => {
  let color
  switch (statusId) {
    case AllStatus.ACTIVE:
      color = StatusColor.ACTIVE
      break
    case AllStatus.INACTIVE:
      color = StatusColor.INACTIVE
      break
    case AllStatus.PENDING:
      color = StatusColor.PENDING
      break
    case AllStatus.BANNED:
      color = StatusColor.BANNED
      break
    case AllStatus.DRAFT:
      color = StatusColor.DRAFT
      break

    default:
      color = '#9c9c9c'
      break
  }
  const styles = { backgroundColor: color }

  return color ? (
    <Fragment>
      {showText ? (
        <div>
          <span>{getStatusText(statusId)}</span>
          <span className='cmp-status-dot' style={styles} />
        </div>
      ) : (
        <span className='cmp-status-dot' style={styles} />
      )}
    </Fragment>
  ) : null
}

export default StatusDot
