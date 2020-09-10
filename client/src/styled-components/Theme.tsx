import { DefaultTheme } from 'styled-components';

const Theme: DefaultTheme = {
  colors: {
    btnPrimary: '#0061ab',
    btnPrimary2: '#0261ac',
    btnSecondary: '#f2f2f2',
    white: '#fff',
    black: '#000',
    ltBlack: '#3f3f3f',
  },
  boxShadow: {
    default: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
    hover: '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)',
    transition: 'all 0.3s cubic-bezier(.25,.8,.25,1);',
  },
  borderRadius: {
    default: '5px',
  },
};

export default Theme;
