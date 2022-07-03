import type { NextPage } from 'next'
import { useState, Fragment, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'redux/rootReducer'
import { Button, Grid, TextField } from '@material-ui/core'
import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import { useFormik } from 'formik'
import { formatDateForForm, formatDateFromApi, isEmpty } from '@utils/helpers'
import PhoneInput from '@components/common/PhoneInput'
import FileUpload from '@components/common/FileUpload'
import Select from '@components/common/Select'
import {
  AccountFormSchema,
  AccountFormType,
  getCreateAccountPayload,
  getUpdateAccountPayload,
  roleOptions,
  statusOptions,
} from './helpers'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import View from '@components/common/View'
import {
  createAccountDetailsThunkAction,
  deleteAccountThunkAction,
  updateAccountDetailsThunkAction,
} from '@redux/accounts/thunks'
import { uploadFileThunkAction } from '@redux/files/thunks'
import { LoaderBall } from '@components/common'
import ModalMain from '@components/common/Modal'
import ChangePasswordForm from '../ChangePasswordForm'
import ConfirmModal from '@components/ConfirmModal'
import { Callback } from '@utils/types'

// tslint:disable-next-line: cyclomatic-complexity
const AccountForm: NextPage<Props> = ({
  previousQueryUrl,
  accountId,
  accountData,
  onClose,
  callbackAfterAction,
}) => {
  const dispatch = useDispatch()
  const accountsState = useSelector(
    (state: RootState) => state.accountsManagement
  )
  const uploadFileLoading = useSelector(
    (state: RootState) => state.files.loading
  )

  const [avatarFile, setAvatarFile] = useState<File>()
  const [expanded, setExpanded] = useState<number>(1)
  const [showChangePasswordModal, setShowChangePasswordModal] =
    useState<boolean>(false)
  const [showConfirmDeleteModal, setShowConfirmDeleteModal] =
    useState<boolean>(false)

  const handleShowChangePasswordModal = () => {
    setShowChangePasswordModal(true)
  }

  const handleCloseChangePasswordModal = () => {
    setShowChangePasswordModal(false)
  }

  const handleAccordionChange = (panel: number) => (_, isExpanded) => {
    setExpanded(isExpanded ? panel : 0)
  }

  const handleShowConfirmDeleteModal = () => {
    setShowConfirmDeleteModal(true)
  }

  const handleCloseConfirmDeleteModal = () => {
    setShowConfirmDeleteModal(false)
  }

  const selectedAccount =
    accountData ?? accountsState.users.find(user => user._id === accountId)

  const isRootUser = useMemo(
    () => selectedAccount.role.id === 0,
    [selectedAccount]
  )

  const initialValues: AccountFormType = {
    id: selectedAccount?._id || '',
    firstName: selectedAccount?.firstName || '',
    lastName: selectedAccount?.lastName || '',
    email: selectedAccount?.email || '',
    street: selectedAccount?.address?.street || '',
    city: selectedAccount?.address?.city || '',
    country: selectedAccount?.address?.country || '',
    dateOfBirth: formatDateForForm(selectedAccount?.dateOfBirth) || '',
    phoneNumber: selectedAccount?.phoneNumber || '',
    description: selectedAccount?.description || '',
    imageUrl: selectedAccount?.imageUrl || '',
    roleId: selectedAccount?.role?.id || 0,
    facebook: selectedAccount?.socialLinks?.facebook || '',
    twitter: selectedAccount?.socialLinks?.twitter || '',
    instagram: selectedAccount?.socialLinks?.instagram || '',
    linkedIn: selectedAccount?.socialLinks?.linkedin || '',
    github: selectedAccount?.socialLinks?.github || '',
    status: selectedAccount?.status ?? 1,
    newPassword: '',
    confirmPassword: '',
  }

  const handleSubmit = (values: AccountFormType) => {
    const handleDispatchSubmit = (
      formValues: AccountFormType,
      imageUrl: string
    ) => {
      //update account
      if (!isEmpty(formik.values.id)) {
        const updatePayload = getUpdateAccountPayload(formValues, imageUrl)
        dispatch(
          updateAccountDetailsThunkAction(
            updatePayload,
            previousQueryUrl,
            () => {
              if (!onClose) return
              onClose()
              if (!callbackAfterAction) return
              callbackAfterAction()
            }
          )
        )

        return
      }

      //create account
      const createPayload = getCreateAccountPayload(formValues, imageUrl)
      dispatch(
        createAccountDetailsThunkAction(createPayload, previousQueryUrl, () => {
          if (!onClose) return
          onClose()
          if (!callbackAfterAction) return
          callbackAfterAction()
        })
      )
    }

    if (!isEmpty(avatarFile) && avatarFile) {
      dispatch(
        uploadFileThunkAction(avatarFile[0], (url: string) => {
          handleDispatchSubmit(values, url)
        })
      )

      return
    }

    handleDispatchSubmit(values, formik.values.imageUrl ?? '')
  }

  const handleDeleteAccount = () => {
    if (!selectedAccount || !selectedAccount?._id) return

    dispatch(
      deleteAccountThunkAction(selectedAccount._id, previousQueryUrl, () => {
        if (!onClose) return
        onClose()
        if (!callbackAfterAction) return
        callbackAfterAction()
      })
    )
  }

  const formik = useFormik({
    initialValues,
    validationSchema: AccountFormSchema,
    onSubmit: handleSubmit,
  })

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container className='modal-main__body' spacing={3}>
        <Grid item md={12} className='modal-main__body--item'>
          <Accordion
            expanded={expanded === 1}
            onChange={handleAccordionChange(1)}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls='panel1bh-content'
              id='panel1bh-header-1'
            >
              <h4>Main Information</h4>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={3}>
                <Grid item md={6} className='modal-main__body--item'>
                  <TextField
                    label='Email *'
                    type='email'
                    {...formik.getFieldProps('email')}
                    error={!!formik.errors.email && !!formik.touched.email}
                    helperText={
                      !!formik.errors.email && !!formik.touched.email
                        ? formik.errors.email
                        : ''
                    }
                    fullWidth
                    disabled={formik.values.id !== ''}
                    inputProps={{
                      autoComplete: 'new-password',
                      form: {
                        autoComplete: 'off',
                      },
                    }}
                  />
                </Grid>
                {formik.values.id && (
                  <Grid item md={6} className='modal-main__body--item'>
                    <TextField
                      label='Account ID'
                      value={formik.values.id}
                      fullWidth
                      disabled
                    />
                  </Grid>
                )}
                {!selectedAccount && (
                  <Fragment>
                    <Grid item md={6} className='modal-main__body--item'>
                      <TextField
                        label='Password *'
                        type='password'
                        {...formik.getFieldProps('newPassword')}
                        error={
                          !!formik.errors.newPassword &&
                          !!formik.touched.newPassword
                        }
                        helperText={
                          !!formik.errors.newPassword &&
                          !!formik.touched.newPassword
                            ? formik.errors.newPassword
                            : ''
                        }
                        fullWidth
                        autoComplete='off'
                      />
                    </Grid>
                    <Grid item md={6} className='modal-main__body--item'>
                      <TextField
                        label='Confirm Password *'
                        type='password'
                        {...formik.getFieldProps('confirmPassword')}
                        error={
                          !!formik.errors.confirmPassword &&
                          !!formik.touched.confirmPassword
                        }
                        helperText={
                          !!formik.errors.confirmPassword &&
                          !!formik.touched.confirmPassword
                            ? formik.errors.confirmPassword
                            : ''
                        }
                        fullWidth
                      />
                    </Grid>
                  </Fragment>
                )}
                <Grid item md={6} className='modal-main__body--item'>
                  <TextField
                    label='First Name *'
                    type='text'
                    {...formik.getFieldProps('firstName')}
                    error={
                      !!formik.errors.firstName && !!formik.touched.firstName
                    }
                    helperText={
                      !!formik.errors.firstName && !!formik.touched.firstName
                        ? formik.errors.firstName
                        : ''
                    }
                    fullWidth
                  />
                </Grid>
                <Grid item md={6} className='modal-main__body--item'>
                  <TextField
                    label='Last Name *'
                    type='text'
                    {...formik.getFieldProps('lastName')}
                    error={
                      !!formik.errors.lastName && !!formik.touched.lastName
                    }
                    helperText={
                      !!formik.errors.lastName && !!formik.touched.lastName
                        ? formik.errors.lastName
                        : ''
                    }
                    fullWidth
                  />
                </Grid>
                <Grid item md={6} className='modal-main__body--item'>
                  <TextField
                    label='Day of Birth'
                    type='date'
                    InputLabelProps={{
                      shrink: true,
                    }}
                    {...formik.getFieldProps('dateOfBirth')}
                    error={
                      !!formik.errors.dateOfBirth &&
                      !!formik.touched.dateOfBirth
                    }
                    helperText={
                      !!formik.errors.dateOfBirth &&
                      !!formik.touched.dateOfBirth
                        ? formik.errors.dateOfBirth
                        : ''
                    }
                    fullWidth
                  />
                </Grid>
                <Grid item md={6} className='modal-main__body--item'>
                  <PhoneInput
                    label='Phone Number'
                    placeholder='Phone Number'
                    {...formik.getFieldProps('phoneNumber')}
                    onChange={formik.setFieldValue}
                    defaultCountry='VN'
                  />
                </Grid>
                {!isRootUser && (
                  <Grid item md={6} className='modal-main__body--item'>
                    <Select
                      options={roleOptions}
                      label={'Role *'}
                      placeholder={'Select'}
                      errorMessage={
                        !!formik.errors.roleId && !!formik.touched.roleId
                          ? formik.errors.roleId
                          : ''
                      }
                      {...formik.getFieldProps('roleId')}
                      onChange={formik.setFieldValue}
                      onBlur={formik.setFieldTouched}
                    />
                  </Grid>
                )}
                {!isRootUser && (
                  <Grid item md={6} className='modal-main__body--item'>
                    <Select
                      options={statusOptions}
                      label={'Status *'}
                      placeholder={'Select'}
                      errorMessage={
                        formik.touched.status ? formik.errors.status : ''
                      }
                      {...formik.getFieldProps('status')}
                      onChange={formik.setFieldValue}
                      onBlur={formik.setFieldTouched}
                    />
                  </Grid>
                )}
                <Grid item md={6} className='modal-main__body--item'>
                  <p className='label-text mb-16'>Change Avatar</p>
                  <FileUpload
                    type='image'
                    onChange={(value: File) => setAvatarFile(value)}
                    numberAllow={1}
                  />
                </Grid>
                <Grid
                  item
                  md={6}
                  className='modal-main__body--item'
                  style={{ overflow: 'hidden' }}
                >
                  <p className='label-text'>Avatar</p>
                  <img
                    src={formik.values.imageUrl}
                    alt='Invalid or empty user avatar'
                    className='img-contain'
                  />
                </Grid>
                {selectedAccount && (
                  <Fragment>
                    <Grid item xs={6} md={3} className='modal-main__body--item'>
                      <TextField
                        label='Created Date'
                        type='text'
                        value={
                          formatDateFromApi(selectedAccount?.createdAt) || '--'
                        }
                        disabled
                      />
                    </Grid>
                    <Grid item xs={6} md={3} className='modal-main__body--item'>
                      <TextField
                        label='Updated Date'
                        type='text'
                        value={
                          formatDateFromApi(selectedAccount?.updatedAt) || '--'
                        }
                        disabled
                      />
                    </Grid>
                  </Fragment>
                )}
                <Grid item md={12} className='modal-main__body--item'>
                  <TextField
                    label='Description'
                    type='text'
                    {...formik.getFieldProps('description')}
                    error={
                      !!formik.errors.description &&
                      !!formik.touched.description
                    }
                    helperText={
                      !!formik.errors.description &&
                      !!formik.touched.description
                        ? formik.errors.description
                        : ''
                    }
                    fullWidth
                    multiline
                  />
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
        </Grid>
        <Grid item md={12} className='modal-main__body--item'>
          <Accordion
            expanded={expanded === 2}
            onChange={handleAccordionChange(2)}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls='panel1bh-content'
              id='panel1bh-header-1'
            >
              <h4>Address Detail</h4>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={3}>
                <Grid item md={6} className='modal-main__body--item'>
                  <TextField
                    label='Street'
                    type='text'
                    {...formik.getFieldProps('street')}
                    error={!!formik.errors.street && !!formik.touched.street}
                    helperText={
                      !!formik.errors.street && !!formik.touched.street
                        ? formik.errors.street
                        : ''
                    }
                    fullWidth
                  />
                </Grid>
                <Grid item md={6} className='modal-main__body--item'>
                  <TextField
                    label='City'
                    type='text'
                    {...formik.getFieldProps('city')}
                    error={!!formik.errors.city && !!formik.touched.city}
                    helperText={
                      !!formik.errors.city && !!formik.touched.city
                        ? formik.errors.city
                        : ''
                    }
                    fullWidth
                  />
                </Grid>
                <Grid item md={6} className='modal-main__body--item'>
                  <TextField
                    label='Country'
                    type='text'
                    {...formik.getFieldProps('country')}
                    error={!!formik.errors.country && !!formik.touched.country}
                    helperText={
                      !!formik.errors.country && !!formik.touched.country
                        ? formik.errors.country
                        : ''
                    }
                    fullWidth
                  />
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
        </Grid>
        <Grid item md={12} className='modal-main__body--item'>
          <Accordion
            expanded={expanded === 3}
            onChange={handleAccordionChange(3)}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls='panel1bh-content'
              id='panel1bh-header-2'
            >
              <h4>Social Links</h4>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={3}>
                <Grid item md={6} className='modal-main__body--item'>
                  <TextField
                    label='Facebook'
                    type='text'
                    {...formik.getFieldProps('facebook')}
                    error={
                      !!formik.errors.facebook && !!formik.touched.facebook
                    }
                    helperText={
                      !!formik.errors.facebook && !!formik.touched.facebook
                        ? formik.errors.facebook
                        : ''
                    }
                    fullWidth
                  />
                </Grid>
                <Grid item md={6} className='modal-main__body--item'>
                  <TextField
                    label='Instagram'
                    type='text'
                    {...formik.getFieldProps('instagram')}
                    error={
                      !!formik.errors.instagram && !!formik.touched.instagram
                    }
                    helperText={
                      !!formik.errors.instagram && !!formik.touched.instagram
                        ? formik.errors.instagram
                        : ''
                    }
                    fullWidth
                  />
                </Grid>
                <Grid item md={6} className='modal-main__body--item'>
                  <TextField
                    label='LinkedIn'
                    type='text'
                    {...formik.getFieldProps('linkedIn')}
                    error={
                      !!formik.errors.linkedIn && !!formik.touched.linkedIn
                    }
                    helperText={
                      !!formik.errors.linkedIn && !!formik.touched.linkedIn
                        ? formik.errors.linkedIn
                        : ''
                    }
                    fullWidth
                  />
                </Grid>
                <Grid item md={6} className='modal-main__body--item'>
                  <TextField
                    label='Twitter'
                    type='text'
                    {...formik.getFieldProps('twitter')}
                    error={!!formik.errors.twitter && !!formik.touched.twitter}
                    helperText={
                      !!formik.errors.twitter && !!formik.touched.twitter
                        ? formik.errors.twitter
                        : ''
                    }
                    fullWidth
                  />
                </Grid>
                <Grid item md={6} className='modal-main__body--item'>
                  <TextField
                    label='Github'
                    type='text'
                    {...formik.getFieldProps('github')}
                    error={!!formik.errors.github && !!formik.touched.github}
                    helperText={
                      !!formik.errors.github && !!formik.touched.github
                        ? formik.errors.github
                        : ''
                    }
                    fullWidth
                  />
                </Grid>
                <Grid item md={6} className='modal-main__body--item' />
              </Grid>
            </AccordionDetails>
          </Accordion>
        </Grid>
      </Grid>
      {/* Change password modal */}
      <ModalMain
        open={showChangePasswordModal}
        onClose={handleCloseChangePasswordModal}
        width={600}
        height={500}
        position='flex-start-center'
        preventBackdropClick
        label={'Change Password'}
      >
        <ChangePasswordForm
          userId={selectedAccount?._id}
          onClose={handleCloseChangePasswordModal}
          previousQueryUrl={previousQueryUrl}
          email={selectedAccount?.email}
        />
      </ModalMain>
      {/* Confirm Delete modal */}
      <ConfirmModal
        open={showConfirmDeleteModal}
        onClose={handleCloseConfirmDeleteModal}
        loading={accountsState.loading}
        onCancel={handleCloseConfirmDeleteModal}
        height={80}
        content={
          <p>
            {'Are you sure you want to delete an account with email '}
            <b>{`"${selectedAccount?.email}"`}</b> {' ?'}
          </p>
        }
        onConfirm={handleDeleteAccount}
        position='justify-center'
        type='danger'
      />
      <Grid
        container
        direction='row'
        alignItems='center'
        justifyContent='space-between'
        className='modal-main__footer mt-20'
        style={{
          position: 'absolute',
          bottom: 20,
          width: '92%',
        }}
      >
        {selectedAccount && !isRootUser ? (
          <View isRow>
            {
              <Button
                variant='outlined'
                className='has-text-danger'
                style={{ marginRight: '15px' }}
                onClick={handleShowConfirmDeleteModal}
              >
                Delete
              </Button>
            }
            <Button
              variant='outlined'
              className='has-text-warning'
              onClick={handleShowChangePasswordModal}
            >
              Change Password
            </Button>
          </View>
        ) : (
          <Button
            variant='outlined'
            className='has-text-secondary'
            onClick={onClose}
          >
            Discard
          </Button>
        )}
        <Button variant='contained' type='submit' color='primary'>
          {(accountsState.loading || uploadFileLoading) &&
          !showConfirmDeleteModal ? (
            <LoaderBall
              color1='#ffffff'
              color2='#eeeeee'
              color3='#ffffff'
              color4='#eeeeee'
              color5='#ffffff'
              height={18}
            />
          ) : (
            'Save'
          )}
        </Button>
      </Grid>
    </form>
  )
}

type Props = {
  accountId?: string
  previousQueryUrl?: URLSearchParams
  accountData?: any
  onClose?: () => void
  callbackAfterAction?: Callback
}

export default AccountForm
