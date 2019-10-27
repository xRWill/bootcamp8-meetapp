import React from 'react';
import { StatusBar } from 'react-native';

import { Container, Logo } from './styles';

export default function Header() {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="rgba(0,0,0,0.2)" />
      <Container>
        <Logo />
      </Container>
    </>
  );
}
