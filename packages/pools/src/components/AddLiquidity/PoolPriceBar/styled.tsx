import { Box } from '@honeycomb-finance/core';
import styled from 'styled-components';

export const Root = styled(Box)`
  width: 100%;
  position: relative;
  overflow: hidden;
  background-color: ${({ theme }) => theme.bg6};
`;
export const GridContainer = styled(Box)`
  display: grid;
  grid-template-columns: minmax(auto, 50%) minmax(auto, 50%);
  grid-gap: 8px;
`;
