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

  const dateSelected = useMemo(
    () => date && format(date, "d 'de' MMMM", { locale: ptBR }),
    [date]
  );

  useEffect(() => {
    if (isFocused) {
      loadMeetups();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused]);

  async function loadMeetups() {
    console.tron.log(`'load' ${page} ${date}`);
    setIsLoading(true);
    const response = await api.get('meetups', {
      params: {
        page,
        date: date.toISOString(),
      },
    });
    const data = response.data.map(meetup => ({
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
    setMeetups(page >= 2 ? [...meetups, ...data] : data);
  }

  function loadMoreMeetups() {
    setPage(page + 1);
    console.tron.log(`More: ${page}`);
    loadMeetups();
  }

  function handleRefresh() {
    setPage(1);
    console.tron.log(`Refresh: ${page}`);
    loadMeetups();
  }

  function selectPrevDay() {
    setMeetups(false);
    setDate(subDays(date, 1));
    console.tron.log(`PrevDay: ${date}`);
    handleRefresh();
  }

  function selectNextDay() {
    setMeetups(false);
    setDate(addDays(date, 1));
    console.tron.log(`NextDay: ${date}`);
    handleRefresh();
  }

  async function handleSubscribe(id) {
    const response = await api.post(`meetups/${id}/subscribe`);
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

        <DateSelector>
          <TouchableOpacity onPress={selectPrevDay}>
            <Icon name="chevron-left" size={28} color="#fff" />
          </TouchableOpacity>
          <DateSelected>{dateSelected}</DateSelected>
          <TouchableOpacity onPress={selectNextDay}>
            <Icon name="chevron-right" size={28} color="#fff" />
          </TouchableOpacity>
        </DateSelector>
        <List
          data={meetups}
          keyExtrator={item => String(item.id)}
          renderItem={({ item }) => (
            <Meetup handleSubscribe={handleSubscribe} data={item} />
          )}
          onEndReachedThreshold={0.1}
          onEndReached={() => loadMoreMeetups()}
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
  tabBarLabel: 'Meetups',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="format-list-bulleted" size={20} color={tintColor} />
  ),
};

export default withNavigationFocus(Meetups);
