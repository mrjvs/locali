import themer from "tailwindcss-themer";
import { type Config } from "tailwindcss";
import type { ThemeConfig } from "tailwindcss-themer/lib/utils/optionsUtils";

const theme = (name: string, themeColors: typeof baseColorTheme): ThemeConfig => ({
  name,
  selectors: ['.theme-' + name],
  extend: {
    colors: themeColors,
  }
})

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

const baseColorTheme = {
  bg: colors.neutral.c100,
  bold: colors.neutral.c800,
  text: colors.neutral.c600,
  card: colors.neutral.c50,
  cardStroke: colors.neutral.c200,
  shadowColor: 'black',
  black: 'black',
  inputBorder: colors.neutral.c300,
  error: colors.semantic.error,
  errorContrast: 'white',

  // these colors are for dynamic themed elements
  primaryLighter: colors.accent.c200,
  primary: colors.accent.c300,
  primaryDarker: colors.accent.c400,
  primaryContrast: colors.neutral.c50,
}

export default {
  content: [],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Source Sans 3"', 'Helvetica', 'Arial', 'sans-serif'],
        heading: ['"Manrope"', '"Source Sans 3"', 'Helvetica', 'Arial', 'sans-serif'],
      }
    },
    colors: baseColorTheme,
    boxShadow: {
      'sm': '0 2px 4px rgba(0, 0, 0, 0.05)',
      'input': '0 1px 2px rgba(0, 0, 0, 0.06)',
    },
  },
  plugins: [themer({
    defaultTheme: {
      extend: {
        colors: baseColorTheme
      }
    },
    themes: [
      theme('lcl-light', baseColorTheme),
      theme('lcl-dark', {
        bg: colors.neutralDark.c800,
        bold: colors.neutralDark.c50,
        text: colors.neutralDark.c200,
        card: colors.neutralDark.c700,
        cardStroke: colors.neutralDark.c600,
        shadowColor: 'transparent',
        inputBorder: colors.neutralDark.c600,
        error: colors.semantic.error,
        errorContrast: 'white',
        black: 'black',

        primaryLighter: colors.accent.c300,
        primary: colors.accent.c200,
        primaryDarker: colors.accent.c100,
        primaryContrast: colors.neutralDark.c50,
      })
    ]
  })]
} satisfies Config;
