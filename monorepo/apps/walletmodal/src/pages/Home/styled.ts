import { Box } from '@pangolindex/core';
import styled from 'styled-components';

export const GridContainer = styled(Box)`
  display: grid;
  grid-template-columns: minmax(auto, 75%) minmax(auto, 25%);
  grid-gap: 12px;
  padding: 10px 0px;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    grid-template-columns: none;
    grid-template-rows: max-content;
  `};
`;

export const SwapWidgetWrapper = styled(Box)`
  height: 100%;
  width: 100%;
  min-width: 280px;
  max-width: 400px;
  margin: auto;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    margin: initial;
    margin-right: auto;
    margin-left: auto;
    flex:0;
  `};
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const PortfolioContainer = styled(GridContainer)`
  grid-template-columns: 1fr 1fr;
  height: 400px;
`;
