import React, { useEffect, useState, useMemo } from 'react';
import { withNavigationFocus } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { TouchableOpacity, FlatList } from 'react-native';
import { format, parseISO, addDays, subDays } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import api from '~/services/api';

import { Container, List, DateSelector, DateSelected, Loading } from './styles';

import Header from '~/components/Header';
import Meetup from '~/components/Meetup';
import Background from '~/components/Background';
import ListEmpty from '~/components/ListEmpty';

function Meetups({ isFocused, navigation }) {
  const [meetups, setMeetups] = useState([]);
  const [date, setDate] = useState(new Date());
  const [page, setPage] = useState(1);
  const [refreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isFocused) {
      loadMeetups();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused]);

  async function loadMeetups() {
    console.tron.log(`'load' ${page} ${date}`);
    setIsLoading(true);
    const response = await api.get('subscriptions', {
      params: {
        page,
        date: date.toISOString(),
      },
    });
    const data = response.data.map(({ Meetup: meetup }) => ({
      ...meetup,
      formattedDate: format(
        parseISO(meetup.date),
        "d 'de' MMMM ', às' HH':'mm",
        {
          locale: ptBR,
        }
      ),
    }));

    setIsLoading(false);
    setMeetups(data);
  }

  function handleRefresh() {
    setPage(1);
    console.tron.log(`Refresh: ${page}`);
    loadMeetups();
  }

  async function handleCancelSubscription(id) {
    const response = await api.delete(`subscriptions/${id}`);
    setMeetups(
      meetups.map(meetup =>
        meetup.id === id
          ? { ...meetup, canceled_at: response.data.canceled_at }
          : meetup
      )
    );
  }

  return (
    <Background>
      <Container>
        <Header />

        <List
          data={meetups}
          keyExtrator={item => String(item.id)}
          renderItem={({ item }) => (
            <Meetup
              handleCancelSubscription={handleCancelSubscription}
              data={item}
            />
          )}
          // onEndReachedThreshold={0.1}
          // onEndReached={() => loadMoreMeetups()}
          onRefresh={() => handleRefresh()}
          refreshing={refreshing}
          ListEmptyComponent={<ListEmpty />}
          ListFooterComponent={isLoading && <Loading />}
        />
      </Container>
    </Background>
  );
}

Meetups.navigationOptions = {
  tabBarLabel: 'Inscrições',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="local-offer" size={20} color={tintColor} />
  ),
};

export default withNavigationFocus(Meetups);
