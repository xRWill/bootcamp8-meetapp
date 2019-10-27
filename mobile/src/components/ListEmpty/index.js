import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { Container, TextEmpty } from './styles';

export default function ListEmpty() {
  return (
    <Container>
      <Icon name="clear" size={50} color="#999" />
      <TextEmpty>Nenhum meetup para mostrar</TextEmpty>
    </Container>
  );
}
