import React, { useReducer } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { enableScreens } from 'react-native-screens';
import { combineReducers, createStore } from 'redux';
import { Provider } from 'react-redux'
import { ActionSheetProvider } from '@expo/react-native-action-sheet';

import AuthNavigator from './navigator/ScreenNavigator';
import MessageReducer from './store/reducers/UpdateMessage';
import UserReducer from './store/reducers/UpdateUsers';
import ContactReducer from './store/reducers/UpdateContacts';
import LastSeenReducer from './store/reducers/UpdateLastSeen';

enableScreens();

const rootReducer = combineReducers({
  messageReducer: MessageReducer,
  userReducer: UserReducer,
  contactReducer: ContactReducer,
  lastSeenReducer: LastSeenReducer
})

const store = createStore(rootReducer)

export default function App() {
  return (
    <ActionSheetProvider>
      <Provider store = {store} >
        <AuthNavigator />
      </Provider>
    </ActionSheetProvider>
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
