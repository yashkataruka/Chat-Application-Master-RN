import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { enableScreens } from 'react-native-screens';
import { combineReducers, createStore } from 'redux';
import { Provider } from 'react-redux'

import AuthNavigator from './navigator/ScreenNavigator';
import { homeHeaderReducer } from './store/reducers/HomeHeaderDisplay';

enableScreens();

const rootReducer = combineReducers({
  homeHeaderReducer: homeHeaderReducer
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
