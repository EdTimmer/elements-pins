import styled from 'styled-components';
import colors from './styles/colors';

export const AppWrapper = styled.div`
  position: relative;
  z-index: 1;
  font-family: 'Roboto Mono', monospace;
  padding: 0 370px;
  width: 100%;
  height: 2075px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  overflow: hidden;
  background-color: ${colors.seasalt};

  @media (max-width: 1250px) {
    padding: 0;
    min-height: 100vh;
  }
`;

export const AppMiddleColumn = styled.div`
  position: relative;
  z-index: 1;
  margin: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: ${colors.eerieBlack};
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

export const CenterSectionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  padding-top: 200px;

  @media (min-width: 1250px) {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

export const RowOne = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: -260px;
  margin-bottom: -100px;
  padding: 0;
  flex-wrap: wrap;

  @media (max-width: 1250px) {
    margin-top: -230px;
  }
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-bottom: -100px;
  padding: 0;
  flex-wrap: wrap;
`;

export const RightSidePin = styled.div`
  @media (max-width: 600px) {
    margin-top: -100px;
  }
`;

export const WebLinkContainer = styled.div`
  color: ${colors.seasalt};  
  position: fixed;
  top: 10px;
  left: 50%;
  transform: translate(-50%, 0%);
  font-size: 16px;
  letter-spacing: 2px;
  z-index: 3;

  a {
    font-family: 'Carlito', 'Roboto Mono', monospace;
    color: #6c757dff;
    text-decoration: underline;
    text-underline-offset: 4px;

    &:hover {
      color: #fff;
    }
  }
`;

export const Box = styled.div`
  position: absolute;
  left: 10px;
  bottom: 10px;
  background-color: ${colors.eerieBlack};
  width: 350px;
  height: 40px;
`;
