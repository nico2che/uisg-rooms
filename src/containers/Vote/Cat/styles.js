import styled from 'styled-components';

const Content = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`;

const Img = styled.img`
  max-width: 70%;
  max-height: 70%;
  overflow: hidden;
  border: 20px #fff solid;
  cursor: pointer;
`;

export { Content, Img };
