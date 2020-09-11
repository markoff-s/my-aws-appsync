import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    font: {
      default: string;
    };
    colors: {
      accentPrimary: string;
      accentPrimary2: string;
      accentSecondary: string;
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
