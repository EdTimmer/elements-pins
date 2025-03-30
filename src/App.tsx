import { Suspense, lazy } from 'react';
import {
  AppWrapper,
  AppMiddleColumn,
  CenterSectionWrapper,
  Row,
  RowOne,
  WebLinkContainer,
  Box,
  RightSidePin,
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

              <RightSidePin>        
                <LogoTwoWrapper guiy={'10px'} />
              </RightSidePin>
            </RowOne>

            <Row>             
              <LogoThreeWrapper guiy={'445px'} />

              <RightSidePin>   
                <LogoFourWrapper guiy={'445px'} />
              </RightSidePin>  
            </Row>

            <Row>
              <LogoFiveWrapper guiy={'880px'} />

              <RightSidePin>
                <LogoSixWrapper guiy={'880px'} />
              </RightSidePin>         
            </Row>

            <Row>              
              <LogoSevenWrapper guiy={'1365px'} />

              <RightSidePin>
                <LogoEightWrapper guiy={'1365px'} />
              </RightSidePin>     
            </Row>
          </CenterSectionWrapper>
        </Suspense>
      </AppMiddleColumn>
    </AppWrapper>
  )
}

export default App;
