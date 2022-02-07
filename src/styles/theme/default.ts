/* eslint-disable no-unused-vars */
import React from 'react';
import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface TypographyVariants {
    error: React.CSSProperties;
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    error?: React.CSSProperties;
  }
}

// Update the Typography's variant prop options
declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    error: true;
  }
}

export const defaultTheme = createTheme({
  typography: {
    fontSize: 15,
    h1: {
      fontSize: 32,
      color: '#2D323F',
    },
    h2: {
      fontSize: 28,
    },
    h3: {
      fontSize: 23,
      color: '#2D323F',
    },
    h4: {
      fontSize: 19,
    },
    h5: {
      fontSize: 17,
    },
    h6: {
      fontSize: 14,
    },
    subtitle1: {
      fontSize: 12,
    },
    subtitle2: {
      fontSize: 10,
    },
    caption: {
      fontSize: 8,
    },
    error: {
      color: 'red',
    },
  },
  palette: {
    primary: {
      main: '#319ADE',
    },
  },
});
