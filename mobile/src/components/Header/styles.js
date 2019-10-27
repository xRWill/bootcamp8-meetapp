import styled from 'styled-components/native';

export const Container = styled.View`
  height: 64px;
  background-color: rgba(0, 0, 0, 0.2);

  align-items: center;
  justify-content: center;
  margin-bottom: 15px;
`;

import logo from '~/assets/logo.png';

export const Logo = styled.Image.attrs({ source: logo })`
  width: 24px;
  height: 24px;
`;
