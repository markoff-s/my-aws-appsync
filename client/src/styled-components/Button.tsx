import styled from 'styled-components';

const Button = styled.button`
  background-color: ${(props) =>
    props.color === 'light' ? props.theme.colors.btnSecondary : props.theme.colors.btnPrimary};
  color: ${(props) =>
    props.color === 'light' ? props.theme.colors.btnPrimary2 : props.theme.colors.white};
  padding: 1rem;
  border: ${(props) =>
    props.color === 'light' ? props.theme.colors.btnSecondary : props.theme.colors.btnPrimary2};
  font-size: 1rem;
  cursor: pointer;
  margin: 0.5rem 0;
  box-shadow: ${(props) => props.theme.boxShadow.default};
`;

export default Button;
