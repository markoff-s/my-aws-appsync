import styled from 'styled-components';

const Button = styled.button`
  background-color: ${(props) =>
    props.color === 'light'
      ? props.theme.colors.accentSecondary
      : props.theme.colors.accentPrimary};
  color: ${(props) =>
    props.color === 'light' ? props.theme.colors.accentPrimary2 : props.theme.colors.white};
  padding: 1rem;
  border: ${(props) =>
    props.color === 'light'
      ? props.theme.colors.accentSecondary
      : props.theme.colors.accentPrimary2};
  font-size: 1rem;
  font-family: ${(props) => props.theme.font.default};
  cursor: pointer;
  margin: 0.5rem 0;
  box-shadow: ${(props) => props.theme.boxShadow.default};
`;

export default Button;
