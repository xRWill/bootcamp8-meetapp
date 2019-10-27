import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {
  Container,
  Banner,
  Info,
  Title,
  InfoTxt,
  ButtonSubscription,
} from './styles';

export default function Meetup({
  data,
  handleSubscribe,
  handleCancelSubscription,
}) {
  return (
    <Container
      style={{
        opacity: !data.canceled_at && !data.past ? 1 : 0.6,
      }}
    >
      <Banner source={{ uri: data.File && data.File.url }} />
      <Title>{data.title}</Title>

      <Info>
        <Icon name="event" size={16} color="#999" />
        <InfoTxt>{data.formattedDate}</InfoTxt>
      </Info>

      <Info>
        <Icon name="location-on" size={16} color="#999" />
        <InfoTxt>{data.location}</InfoTxt>
      </Info>

      <Info>
        <Icon name="person" size={16} color="#999" />
        <InfoTxt>Organizador: {data.User.name}</InfoTxt>
      </Info>

      {!data.canceled_at && !data.past ? (
        handleCancelSubscription ? (
          <ButtonSubscription onPress={() => handleCancelSubscription(data.id)}>
            Canelar inscrição
          </ButtonSubscription>
        ) : (
          <ButtonSubscription onPress={() => handleSubscribe(data.id)}>
            Realizar inscrição
          </ButtonSubscription>
        )
      ) : null}
    </Container>
  );
}
Meetup.propTypes = {
  data: PropTypes.oneOfType([PropTypes.object]).isRequired,
  handleSubscribe: PropTypes.func,
  handleCancelSubscription: PropTypes.func,
};

Meetup.defaultProps = {
  handleSubscribe: null,
  handleCancelSubscription: null,
};
