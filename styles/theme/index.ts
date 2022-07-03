import { createTheme } from '@material-ui/core/styles'

const defaultTheme = {
  palette: {
    primary: {
      main: '#38B6FF',
      contrastText: '#fff',
      light: '#B7E1FA',
      dark: '#2083BB',
    },
    secondary: {
      main: '#00AB55',
    },
    error: {
      light: '#e57373',
      main: '#f44336',
      dark: '#d32f2f',
      contrastText: '#fff',
    },
    text: {
      primary: 'rgb(33, 43, 54)',
      secondary: '#637381',
    },
    action: {
      selected: 'rgb(33, 43, 54)',
      selectedOpacity: 1,
      focus: '#00AB55',
    },
  },
  typography: {
    button: {
      textTransform: 'none',
    },
  },
}

export default createTheme(defaultTheme as any)
