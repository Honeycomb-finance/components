import React from 'react';
import Logo from '../../assets/logo.png';
import { LogoImg, LogoWrapper, } from './styled';

export default function LogoIcon() {
  return (
    <LogoWrapper>
      <LogoImg height="64px" src={Logo} alt="logo" />
    </LogoWrapper>
  );
}
