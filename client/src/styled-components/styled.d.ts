import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      btnPrimary: string;
      btnPrimary2: string;
      btnSecondary: string;
      white: string;
      black: string;
      ltBlack: string;
    };
    boxShadow: {
      default: string;
      hover: string;
      transition: string;
    };
    borderRadius: {
      default: string;
    };
  }
}
