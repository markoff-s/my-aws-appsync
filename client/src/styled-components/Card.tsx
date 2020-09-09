import styled from 'styled-components';

const Card = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 1rem;
  box-shadow: ${(props) => props.theme.boxShadow.default};
  transition: ${(props) => props.theme.boxShadow.transition};
  /* &:hover {
    box-shadow: ${(props) => props.theme.boxShadow.hover};
  } */
`;

export default Card;
