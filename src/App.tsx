import {
  AppWrapper,
  AppMiddleColumn,
  CenterSectionWrapper,
  Row,
  RowOne,
} from './App.styles'

import LogoSixWrapper from './components/LogoSix/LogoSixWrapper';
import LogoOneWrapper from './components/LogoOne/LogoOneWrapper';
import LogoFourWrapper from './components/LogoFour/LogoFourWrapper';
import LogoTwoWrapper from './components/LogoTwo/LogoTwoWrapper';
import LogoFiveWrapper from './components/LogoFive/LogoFiveWrapper';
import LogoThreeWrapper from './components/LogoThree/LogoThreeWrapper';
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
            <LogoThreeWrapper guiy={'500px'} />
            <LogoFourWrapper guiy={'570px'} />
          </Row>

          <Row>
            <LogoFiveWrapper guiy={'1060px'} />
            <LogoSixWrapper guiy={'1350px'} />
          </Row>

          <Row>
            <LogoSevenWrapper guiy={'1960px'} />
            <LogoEightWrapper guiy={'2150px'} />
          </Row>
        </CenterSectionWrapper>
      </AppMiddleColumn>
    </AppWrapper>
  )
}

export default App;
