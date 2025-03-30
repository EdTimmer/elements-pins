import {
  AppWrapper,
  AppMiddleColumn,
  CenterSectionWrapper,
  Row,
  RowOne,
  WebLinkContainer,
  Box,
} from './App.styles'

import LogoSixWrapper from './components/LogoSix/LogoSixWrapper';
import LogoFourWrapper from './components/LogoFour/LogoFourWrapper';
import LogoTwoWrapper from './components/LogoTwo/LogoTwoWrapper';
import LogoFiveWrapper from './components/LogoFive/LogoFiveWrapper';
import LogoOneWrapper from './components/LogoOne/LogoOneWrapper';
import LogoThreeWrapper from './components/LogoThree/LogoThreeWrapper';
import LogoSevenWrapper from './components/LogoSeven/LogoSevenWrapper';
import LogoEightWrapper from './components/LogoEight/LogoEightWrapper';

function App() {
  return (
    <AppWrapper>
      <Box />
      <AppMiddleColumn>
        <WebLinkContainer>
          <a href="https://www.edtimmer.com/" target="_blank" aria-label="Link to source code" title="Link to source code">edtimmer.com</a>
        </WebLinkContainer>

        <CenterSectionWrapper>
          <RowOne>
            <LogoOneWrapper guiy={'10px'} />        
            <LogoTwoWrapper guiy={'10px'} />
          </RowOne>

          <Row>
            <LogoThreeWrapper guiy={'445px'} />
            <LogoFourWrapper guiy={'445px'} />
          </Row>

          <Row>
            <LogoFiveWrapper guiy={'880px'} />
            <LogoSixWrapper guiy={'880px'} />
          </Row>

          <Row>
            {/* <LogoSevenOldWrapper guiy={'1960px'} /> */}
            <LogoSevenWrapper guiy={'1365px'} />
            <LogoEightWrapper guiy={'1365px'} />
          </Row>

          {/* <Row>
            <LogoNineWrapper guiy={'1960px'} />
          </Row> */}

        </CenterSectionWrapper>
      </AppMiddleColumn>
    </AppWrapper>
  )
}

export default App;
