import { takeLatest, call, put, all } from 'redux-saga/effects';

import { Alert } from 'react-native';
import api from '~/services/api';
import { signInSuccess, signFailure } from './actions';
// import history from '~/services/history';

export function* signIn({ payload }) {
  try {
    const { email, password } = payload;

    const response = yield call(api.post, '/sessions', { email, password });
    const { token, user } = response.data;
    if (user.provider) {
      Alert.alert('Erro no login', 'Usuário não pode ser prestador!');
      return;
    }
    yield put(signInSuccess(token, user));
    // history.push('/dashboard');
  } catch (err) {
    Alert.alert('Erro no login', 'Verifique seus dados.');
    yield put(signFailure());
  }
}

export function* signUp({ payload }) {
  const { name, email, password } = payload;
  try {
    yield call(api.post, 'users', {
      name,
      email,
      password,
    });

    // history.push('/');
  } catch (err) {
    Alert.alert('Erro no cadastro', 'Verifique os dados.');
    yield put(signFailure());
  }
}

export function setToken({ payload }) {
  if (!payload) return;

  const { token } = payload.auth;
  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`;
    console.tron.log(api, token, payload);
  }
}

export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('@auth/SIGN_UP_REQUEST', signUp),
]);
