import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const Spinner = styled.div`
  width: 60px;
  height: 60px;
  border: 5px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  border-top-color: #ffffff;
  animation: ${spin} 1s ease-in-out infinite;
  margin-top: 400px;
`;

const LoadingSpinner = () => {
  return <Spinner />;
};

export default LoadingSpinner;