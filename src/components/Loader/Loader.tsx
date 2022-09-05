import React from 'react';
import styled from 'styled-components';
import { Loading, LogoIcon } from 'src/components/Icons';
import { Box, Text } from '../';

const PendingWrapper = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100%;
`;

export interface Props {
  size: number;
  label?: string;
}
const Loader: React.FC<Props> = (props) => {
  const { size, label } = props;

  return (
    <PendingWrapper>
      <Box mb={'15px'} display="flex" alignItems="center" flexDirection="column">
        <Box width={size} height={size} position="relative" display="flex" alignItems="center" justifyContent="center">
          <Loading />

          <Box position="absolute">
            <LogoIcon />
          </Box>
        </Box>
        {label && (
          <Text color="loader.text" fontWeight={500} fontSize={20} textAlign="center" mt={10}>
            {label}
          </Text>
        )}
      </Box>
    </PendingWrapper>
  );
};

export default Loader;
