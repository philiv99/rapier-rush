export const LinkittyDoTheme = {
  colors: {
    cream: '#FDEC92',
    mint: '#A9EAD2',
    ink: '#161813',
    pop: '#FB2B57',
    paper: '#EEEDE5',
  },
  fonts: {
    headline: '"Bungee", cursive',
    ui: '"Nunito", sans-serif',
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    xxl: '48px',
  },
  borderRadius: {
    sm: '4px',
    md: '8px',
    lg: '16px',
    full: '9999px',
  },
  shadows: {
    sm: '0 1px 3px rgba(0, 0, 0, 0.1)',
    md: '0 4px 6px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px rgba(0, 0, 0, 0.1)',
    xl: '0 20px 25px rgba(0, 0, 0, 0.1)',
  },
  breakpoints: {
    mobile: '480px',
    tablet: '768px',
    desktop: '1024px',
  },
};

export type Theme = typeof LinkittyDoTheme;
