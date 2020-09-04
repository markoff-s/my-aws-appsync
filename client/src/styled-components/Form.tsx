import styled from 'styled-components';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  padding: 2rem;
  box-shadow: ${(props) => props.theme.boxShadow.default};

  input {
    margin: 0.25rem 0;
    padding: 0.3rem 0.5rem;
    border-radius: ${(props) => props.theme.borderRadius.default};
    border: none;
    box-shadow: ${(props) => props.theme.boxShadow.default};
  }
`;

export default Form;
