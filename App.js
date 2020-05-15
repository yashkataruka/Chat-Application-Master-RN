import React, { useReducer } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { enableScreens } from 'react-native-screens';
import { combineReducers, createStore } from 'redux';
import { Provider } from 'react-redux'

import AuthNavigator from './navigator/ScreenNavigator';
import MessageReducer from './store/reducers/UpdateMessage';
import UserReducer from './store/reducers/UpdateUsers';
import ContactReducer from './store/reducers/UpdateContacts';

enableScreens();

const rootReducer = combineReducers({
  messageReducer: MessageReducer,
  userReducer: UserReducer,
  contactReducer: ContactReducer
})

const store = createStore(rootReducer)

export default function App() {
  return (
    <Provider store = {store} >
      <AuthNavigator />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
