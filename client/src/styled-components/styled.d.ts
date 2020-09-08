import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      ltBlue: string;
      red: string;
      white: string;
      black: string;
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
