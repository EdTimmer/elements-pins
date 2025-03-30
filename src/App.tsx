import { Suspense, lazy } from 'react';
import {
  AppWrapper,
  AppMiddleColumn,
  CenterSectionWrapper,
  Row,
  RowOne,
  WebLinkContainer,
  Box,
} from './App.styles'

const LogoSixWrapper = lazy(() => import('./components/LogoSix/LogoSixWrapper'));
const LogoFourWrapper = lazy(() => import('./components/LogoFour/LogoFourWrapper'));
const LogoTwoWrapper = lazy(() => import('./components/LogoTwo/LogoTwoWrapper'));
const LogoFiveWrapper = lazy(() => import('./components/LogoFive/LogoFiveWrapper'));
const LogoOneWrapper = lazy(() => import('./components/LogoOne/LogoOneWrapper'));
const LogoThreeWrapper = lazy(() => import('./components/LogoThree/LogoThreeWrapper'));
const LogoSevenWrapper = lazy(() => import('./components/LogoSeven/LogoSevenWrapper'));
const LogoEightWrapper = lazy(() => import('./components/LogoEight/LogoEightWrapper'));
import LoadingSpinner from './components/LoadingSpinner';

function App() {
  return (
    <AppWrapper>
      <Box />
      <AppMiddleColumn>
        <WebLinkContainer>
          <a href="https://www.edtimmer.com/" target="_blank" aria-label="Link to source code" title="Link to source code">edtimmer.com</a>
        </WebLinkContainer>

        <Suspense fallback={<LoadingSpinner />}>
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
              <LogoSevenWrapper guiy={'1365px'} />
              <LogoEightWrapper guiy={'1365px'} />              
            </Row>
          </CenterSectionWrapper>
        </Suspense>
      </AppMiddleColumn>
    </AppWrapper>
  )
}

export default App;
