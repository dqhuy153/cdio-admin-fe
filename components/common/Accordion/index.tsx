import React, { useState } from 'react'
import cn from 'classnames'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Grid,
} from '@material-ui/core'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { Callback } from '@utils/types'

interface Props {
  children: React.ReactNode
  expanded?: boolean
  initExpanded?: boolean
  onAccordionChange?:
    | ((event: React.ChangeEvent<{}>, expanded: boolean) => void)
    | undefined
  label?: string
  labelNode?: React.ReactNode
  variant?: 'primary' | 'secondary'
  className?: string
  editLabel?: string
  onEdit?: Callback
}

const AccordionSection = ({
  children,
  expanded,
  initExpanded,
  onAccordionChange,
  onEdit,
  label = 'Title',
  variant = 'primary',
  className,
  editLabel = 'Edit',
  labelNode,
}: Props) => {
  const [currentExpanded, setCurrentExpanded] = useState(initExpanded || false)
  // tslint:disable-next-line: no-shadowed-variable
  const handleChange = (event, expanded) => {
    if (onAccordionChange) {
      return onAccordionChange(event, expanded)
    }

    setCurrentExpanded(prev => !prev)
  }

  return (
    <Accordion
      expanded={expanded ?? currentExpanded}
      onChange={handleChange}
      className={cn('cmp-accordion__section', className)}
      style={{
        boxShadow: 'none',
        width: '100%',
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls='panel1bh-content'
        id='panel1bh-header-1'
        style={{ padding: '5px 25px', backgroundColor: '#fafafa' }}
      >
        <Grid container spacing={0} direction='row' alignItems='center'>
          <Grid item xs={11}>
            {labelNode ? (
              labelNode
            ) : (
              <p
                className={
                  variant === 'primary'
                    ? 'cmp-accordion__title--primary'
                    : 'cmp-accordion__title--secondary'
                }
              >
                {label}
              </p>
            )}
          </Grid>
          {onEdit && (
            <Grid item xs={1}>
              <Button
                variant='outlined'
                className='has-text-primary'
                onClick={onEdit}
              >
                {editLabel}
              </Button>
            </Grid>
          )}
        </Grid>
      </AccordionSummary>
      <AccordionDetails style={{ padding: '25px 25px' }}>
        {children}
      </AccordionDetails>
    </Accordion>
  )
}

export default AccordionSection
