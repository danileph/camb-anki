export const theme = {
  palette: {
    primary: {
      normal: '#A26B61',
      darker: '#825D5B',
      darkest: '#6F5F5C',
      lighter: '#E38F71',
      lightest: '#F0B270',
    },
    secondary: {
      normal: '#F0E9DC',
      darker: '#CFBFA2',
      darkest: '#AA9F97',
    },
    background: '#F0E9DC',
  },
  transition: 'all 0.2s ease',

}

export type ThemeType = typeof theme;