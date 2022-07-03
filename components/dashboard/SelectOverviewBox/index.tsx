import PercentTag from '@components/Status/PercentTag'
import { Box, Card, List } from '@material-ui/core'
import { ClickAwayListener, ListItemButton } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { BiChevronDown } from 'react-icons/bi'
import OverviewBox from '../OverviewBox'

interface Props {
  options: {
    id?: string
    value: string | number
    percentage: number
    label: string
  }[]
  label?: string
  iconTopLeft?: React.ReactNode
  loading?: boolean
}

const SelectOverviewBox = ({ options, iconTopLeft, label, loading }: Props) => {
  const [showOptions, setShowOptions] = useState<boolean>(false)
  const [currentOptions, setCurrentOptions] = useState<{
    id?: string
    value: string | number
    percentage: number
    label: string
  }>(options[1])

  const handleOpenOptions = () => {
    setShowOptions(true)
  }

  const handleCloseOptions = () => {
    setShowOptions(false)
  }

  useEffect(() => {
    setCurrentOptions(options[1])
  }, [options, loading])

  return (
    <OverviewBox
      iconTopLeft={iconTopLeft}
      loading={loading}
      label={<p className='has-text-gray text-is-16 fw-bold'>{label}</p>}
      iconTopRight={<PercentTag value={currentOptions?.percentage || 0} />}
      body={<h2>{currentOptions?.value ?? '--'}</h2>}
      footer={
        <ClickAwayListener onClickAway={handleCloseOptions}>
          <Box>
            <div
              className='justify-flex-start'
              onClick={handleOpenOptions}
              style={{ cursor: 'pointer' }}
            >
              <p className='mr-4'>{currentOptions?.label}</p>
              <BiChevronDown size={18} />
            </div>
            {showOptions && (
              <Box position='absolute' zIndex={100}>
                <Card
                  variant='elevation'
                  className='page__header--profile-modal'
                >
                  <List component='nav' aria-labelledby='nested-list-subheader'>
                    {options.map((item, idx) => (
                      <ListItemButton
                        key={item.id || `${item.value}-${idx}`}
                        onClick={() => {
                          setCurrentOptions(item)
                          setShowOptions(false)
                        }}
                      >
                        <p className='text-is-12'>{item.label}</p>
                      </ListItemButton>
                    ))}
                  </List>
                </Card>
              </Box>
            )}
          </Box>
        </ClickAwayListener>
      }
    />
  )
}

export default SelectOverviewBox
