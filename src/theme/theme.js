import { createTheme } from '@mui/material/styles';

// Light Theme
export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#FF0000', // Bright Red
    },
    secondary: {
      main: '#f50057',
    },
    background: {
      default: '#f5f5f5',
      paper: 'rgba(255, 255, 255, 0.9)',
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
});

// Dark Theme
export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#FF0000', // Bright Red
    },
    secondary: {
      main: '#f50057',
    },
    background: {
      default: '#121212',
      paper: 'rgba(30, 30, 30, 0.9)',
    },
    text: {
      primary: '#ffffff',
      secondary: '#bbbbbb',
    }
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
});
