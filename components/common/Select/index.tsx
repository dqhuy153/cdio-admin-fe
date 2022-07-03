import React, { useRef } from 'react'
import cn from 'classnames'
import Select from 'react-select'
import { getRandomId, isEmpty } from '@utils/helpers'
import Element from '../Element'
import View from '../View'

const SelectCmp = ({
  options,
  onChange,
  label = '',
  className = '',
  value,
  errorMessage = '',
  placeholder = 'Select',
  containerClassName = '',
  onBlur,
  name = '',
  isClearable = true,
  multi = false,
  disabled = false,
  ...props
}) => {
  const id = useRef(`select-${getRandomId()}`)

  // tslint:disable-next-line: no-shadowed-variable
  const handleChange = (selectedOption: any) => {
    // tslint:disable-next-line: no-shadowed-variable
    const value =
      selectedOption?.value === false
        ? false
        : selectedOption?.value === 0
        ? 0
        : selectedOption?.value || null
    onChange(name, multi ? selectedOption : value)
  }

  const handleSelectBlur = () => {
    onBlur(name, true)
  }
  const hasError = !isEmpty(errorMessage)

  const selectedOption = multi
    ? value
    : options?.find(option => option.value === value) || null
  // For custom select, follow this link:
  // https://react-select.com/styles#using-classnames

  return (
    <Element
      id={id.current}
      errorMessage={errorMessage}
      label={label}
      className={containerClassName}
    >
      <View>
        <Select
          id={id.current}
          isClearable={isClearable}
          value={selectedOption}
          placeholder={placeholder}
          onChange={handleChange}
          options={options}
          className={cn('cmp-select', className, {
            'cmp-select--error': hasError,
          })}
          classNamePrefix='cmp-select'
          menuPlacement='auto'
          onBlur={handleSelectBlur}
          name={name}
          theme={theme => ({
            ...theme,
            colors: {
              ...theme.colors,
              primary: '#217ea6',
              neutral20: hasError ? '#c60000' : 'hsl(0, 0%, 80%)',
            },
          })}
          {...props}
          isDisabled={disabled}
          isMulti={multi}
        />
      </View>
    </Element>
  )
}

export default SelectCmp
