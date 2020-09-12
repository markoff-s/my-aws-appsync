import styled from 'styled-components';

const Input = styled.input`
  padding: '.5rem 1rem';
  &::placeholder {
    color: ${(props) => props.theme.colors.gray};
  }
`;

export default Input;
