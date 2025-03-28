import {
  AppWrapper,
  AppMiddleColumn,
  CenterSectionWrapper,
  Row,
  RowOne,
} from './App.styles'

import LogoSixWrapper from './components/LogoSix/LogoSixWrapper';
import LogoOneOldWrapper from './components/LogoOneOld/LogoOneOldWrapper';
import LogoFourWrapper from './components/LogoFour/LogoFourWrapper';
import LogoTwoWrapper from './components/LogoTwo/LogoTwoWrapper';
import LogoFiveWrapper from './components/LogoFive/LogoFiveWrapper';
import LogoThreeOldWrapper from './components/LogoThreeOld/LogoThreeOldWrapper';
import LogoOneWrapper from './components/LogoOne/LogoOneWrapper';
import LogoThreeWrapper from './components/LogoThree/LogoThreeWrapper';
import LogoNineWrapper from './components/LogoNine/LogoNineWrapper';
import LogoSevenWrapper from './components/LogoSeven/LogoSevenWrapper';
import LogoEightWrapper from './components/LogoEight/LogoEightWrapper';

function App() {
  return (
    <AppWrapper>
      <AppMiddleColumn>
        <CenterSectionWrapper>
          <RowOne>
            <LogoOneWrapper guiy={'10px'} />        
            <LogoTwoWrapper guiy={'10px'} />
          </RowOne>

          <Row>
            <LogoThreeWrapper guiy={'600px'} />
            <LogoFourWrapper guiy={'570px'} />
          </Row>

          <Row>
            <LogoFiveWrapper guiy={'1060px'} />
            <LogoSixWrapper guiy={'1350px'} />
          </Row>

          <Row>
            {/* <LogoSevenOldWrapper guiy={'1960px'} /> */}
            <LogoSevenWrapper guiy={'1700px'} />
            <LogoEightWrapper guiy={'2150px'} />
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
