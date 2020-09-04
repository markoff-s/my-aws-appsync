import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  padding: 2rem;
  box-shadow: ${(props) => props.theme.boxShadow.default};
  transition: ${(props) => props.theme.boxShadow.transition};
  &:hover {
    box-shadow: ${(props) => props.theme.boxShadow.hover};
  }
`;

export default Container;
