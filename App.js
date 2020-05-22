import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { enableScreens } from 'react-native-screens';
import { combineReducers, createStore } from 'redux';
import { AsyncStorage } from 'react-native';
import { Provider } from 'react-redux';
import checkIfFirstLaunch from './utils/checkIfFirstLauch';
import clearALL from './utils/checkIfFirstLauch';
import Screens from './components/Screens'

import AuthNavigator from './navigator/ScreenNavigator';
import { homeHeaderReducer } from './store/reducers/HomeHeaderDisplay';
import { useEffect } from 'react';

enableScreens();

const rootReducer = combineReducers({
  homeHeaderReducer: homeHeaderReducer
})

const store = createStore(rootReducer)

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isFirstLaunch: false,
      hasCheckedAsyncStorage: false,
    };
  }
 /*async componentDidMount(){
   await AsyncStorage.clear()
 }*/
 async componentDidMount() {
    const isFirstLaunch = await checkIfFirstLaunch();
    this.setState({ isFirstLaunch, hasCheckedAsyncStorage: true });
  }
  render() {
    const { hasCheckedAsyncStorage, isFirstLaunch } = this.state;

    if (!hasCheckedAsyncStorage) {
      return null;
    }

    return isFirstLaunch ?
      <Screens update = {()=>this.setState({isFirstLaunch:false})}/> :
      <Provider store = {store} >
            <AuthNavigator />
      </Provider>
    ;
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
