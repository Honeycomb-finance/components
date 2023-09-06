import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import { AppContent, MainContent, Wrapper } from './styled';

export default function Layout() {
  return (
    <Wrapper>
      <MainContent>
        <Header />
        <AppContent>
          <Outlet />
        </AppContent>
      </MainContent>
    </Wrapper>
  );
};
