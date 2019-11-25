import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const Logo = styled.div`
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  top: 30px;
  font-size: 40px;
  color: #496174;
  font-weight: bold;
`;

const Flex = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`;

const Footer = styled.div`
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0%);
  bottom: 0;
  border: #ecf0f1 solid 10px;
  border-bottom: none;
  background-color: #f7f7f7;
  width: 350px;
  line-height: 6px;
  font-size: 13px;
  text-align: center;
  color: #6e8290;
  border-radius: 11px;
  height: 55px;
`;

export {
  Container, Flex, Logo, Footer,
};
