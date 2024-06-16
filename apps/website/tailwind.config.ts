import { type Config } from "tailwindcss";

const colors = {
  neutral: {
    c900: '#141728',
    c800: '#23273D',
    c700: '#424761',
    c600: '#74748A',
    c500: '#9F9FB0',
    c400: '#C1C1CD',
    c300: '#E1E1E7',
    c200: '#EEEEF3',
    c100: '#FCFCFD',
    c50: '#FFFFFF'
  },
  neutralDark: {
    c900: '#09090C',
    c800: '#0E0E12',
    c700: '#17171D',
    c600: '#202027',
    c500: '#2B2B35',
    c400: '#4D4D5B',
    c300: '#66667A',
    c200: '#9696A7',
    c100: '#E5E5ED',
    c50: '#FFFFFF'
  },
  accent: {
    c500: '#111F6A',
    c400: '#1A2B86',
    c300: '#2337A8',
    c200: '#3C52D0',
    c100: '#546BEC'
  },
  accentDimmed: {
    c500: '#0D0F1F',
    c400: '#15182C',
    c300: '#272B47',
    c200: '#595E84',
    c100: '#ACA5CA'
  },
  semantic: {
    error: '#ED4040',
  }
}

export default {
  content: [],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Source Sans 3"', 'Helvetica', 'Arial', 'sans-serif'],
        heading: ['"Manrope"', '"Source Sans 3"', 'Helvetica', 'Arial', 'sans-serif'],
      },
    },
    colors: colors,
  },
} satisfies Config;
