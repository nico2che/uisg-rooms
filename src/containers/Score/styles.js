import styled from 'styled-components';

const Container = styled.div`
  background-color: #ecf0f1;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Logo = styled.div`
  margin-top: 30px;
  font-size: 40px;
  color: #496174;
  font-weight: bold;
`;

const Best = styled.div`
  display: flex;
  justify-content: center;
  align-items: baseline;
`;

const ImgContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Rank = styled.div`
  position: relative;
  width: 25px;
  background-color: white;
  height: 25px;
  border: 11px solid white;
  top: 31px;
  display: flex;
  border-radius: 30px;
  align-items: center;
  justify-content: center;
`;

const Img = styled.img`
  width: 200px;
  border: 20px #fff solid;
  margin-right: 20px;
`;

const Other = styled.div`
  margin-top: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ImgOther = styled.img`
  width: 200px;
  border: 10px #fff solid;
  margin-top: 20px;
`;

const RankOther = Rank.extend`
  top: 49px;
`;

export { Container, Best, Logo, ImgContainer, Rank, Img, Other, RankOther, ImgOther };
