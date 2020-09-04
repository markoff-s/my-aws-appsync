import styled from 'styled-components';

const Button = styled.button`
  background-color: ${(props) =>
    props.color === 'red' ? props.theme.colors.red : props.theme.colors.ltBlue};
  color: ${(props) => props.theme.colors.white};
  padding: 1rem 2rem;
  border: none;
  border-radius: ${(props) => props.theme.borderRadius.default};
  font-size: 1rem;
  cursor: pointer;
  margin: 0.5rem 0;
  box-shadow: ${(props) => props.theme.boxShadow.default};
`;

export default Button;
