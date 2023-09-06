import { MyPortfolio, Portfolio, WatchList } from '@pangolindex/portfolio';
import { GridContainer, PortfolioContainer, SwapWidgetWrapper } from './styled';
import { Box } from '@pangolindex/core';

export default function Home() {
  return (
    <Box>
      <GridContainer>
        <WatchList />
        <SwapWidgetWrapper>swap no available for now</SwapWidgetWrapper>
      </GridContainer>
      <PortfolioContainer>
        <MyPortfolio />
        <Portfolio />
      </PortfolioContainer>
    </Box>
  );
}
