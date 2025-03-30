import { Suspense, lazy, useEffect, useState } from 'react';
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
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const isSmallScreen = windowWidth < 1250;

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
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
              <LogoOneWrapper guiy={'10px'} isSmallScreen={isSmallScreen} />

              <RightSidePin>        
                <LogoTwoWrapper guiy={'10px'} isSmallScreen={isSmallScreen} />
              </RightSidePin>
            </RowOne>

            <Row>             
              <LogoThreeWrapper guiy={'445px'} isSmallScreen={isSmallScreen} />

              <RightSidePin>   
                <LogoFourWrapper guiy={'445px'} isSmallScreen={isSmallScreen} />
              </RightSidePin>  
            </Row>

            <Row>
              <LogoFiveWrapper guiy={'880px'} isSmallScreen={isSmallScreen} />

              <RightSidePin>
                <LogoSixWrapper guiy={'880px'} isSmallScreen={isSmallScreen} />
              </RightSidePin>         
            </Row>

            <Row>              
              <LogoSevenWrapper guiy={'1365px'} isSmallScreen={isSmallScreen} />

              <RightSidePin>
                <LogoEightWrapper guiy={'1365px'} isSmallScreen={isSmallScreen} />
              </RightSidePin>     
            </Row>
          </CenterSectionWrapper>
        </Suspense>
      </AppMiddleColumn>
    </AppWrapper>
  )
}

export default App;
