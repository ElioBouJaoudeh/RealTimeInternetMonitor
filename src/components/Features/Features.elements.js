import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const FSection = styled.div`
  padding: 100px 0 160px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: #07080a;
`;

export const FWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;

  @media screen and (max-width: 960px) {
    margin: 0 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

export const FHeading = styled.h1`
  color: #fff;
  font-size: 48px;
  margin-bottom: 50px;
`;

export const FContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  @media screen and (max-width: 960px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
  }
`;

export const FCard = styled(Link)`
  background: #2c4151;
  box-shadow: 0 6px 20px rgba(56, 125, 255, 0.2);
  width: 275px;
  height: 350px;
  text-decoration: none;
  border-radius: 4px;

  margin: 10px;

  &:hover {
    transform: scale(1.06);
    transition: all 0.3s ease-out;
    color: #2c4151;
  }

  @media screen and (max-width: 960px) {
    width: 90%;

    &:hover {
      transform: none;
    }
  }
`;

export const FCardInfo = styled.div`
  display: flex;
  flex-direction: column;
  height: 500px;
  padding: 24px;
  align-items: center;
  color: #fff;
`;

export const FCardIcon = styled.div`
  margin: 24px 0;
`;

export const FTitle = styled.h4`
  font-size: 30px;
`;

export const FDesc = styled.h4`
  margin-bottom: 10px;
  padding: 20px;
  text-align: justify;
`;