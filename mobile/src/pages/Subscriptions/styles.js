import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
`;

export const List = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: { padding: 20 },
})`
  /* margin: 0 20px; */
  /* border: 1px red solid; */
`;

export const DateSelector = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 10px 0;
`;

export const DateSelected = styled.Text`
  font-weight: bold;
  font-size: 20px;
  color: #fff;
  margin: 0 5px;
`;

export const Loading = styled.ActivityIndicator.attrs({
  color: '#fff',
  size: 50,
})`
  flex: 1;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  padding-bottom: 20px;
`;
