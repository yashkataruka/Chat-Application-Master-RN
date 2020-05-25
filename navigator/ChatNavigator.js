import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Button } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { createAppContainer } from 'react-navigation';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import {Picker} from '@react-native-community/picker';
import Barcode from '../screens/ChatScreen/Barcode';
import GroupDetails from '../screens/ChatScreen/GroupDetails';
import Broadcast from '../screens/ChatScreen/Broadcast';

import Colors from '../constants/Colors';
import ChatsScreen from '../screens/ChatScreen/ChatsScreen';
import GroupsScreen from '../screens/ChatScreen/GroupsScreen';
import NearbyScreen from '../screens/ChatScreen/NearbyScreen';
import ActiveScreen from '../screens/ChatScreen/ActiveScreen';
import ChatDetailScreen from '../screens/ChatScreen/ChatDetailScreen';
import CustomHeader from '../components/Header'
import NewChat from '../screens/ChatScreen/NewChat'
import NewGroup from '../screens/ChatScreen/NewGroup'


const homeScreenConfig = {
    Chats: {
        screen:ChatsScreen,

    },
    Groups: {
        screen: GroupsScreen
    },
    Nearby: {
        screen: NearbyScreen
    },
    Active: {
        screen: ActiveScreen
    }
}

const HomeNavigator = createMaterialTopTabNavigator(homeScreenConfig, {
    tabBarOptions: {
        upperCaseLabel: false,
        indicatorStyle: {
            backgroundColor: 'white'
        },
        labelStyle: {
            fontWeight: 'bold',
            fontSize: 18
        },
        style: {
            backgroundColor: Colors.primary,
            elevation: 0
        }
    }
})

const ChatNavigator = createStackNavigator({
    Chats: {
        screen: HomeNavigator,
        navigationOptions:({navigation}) => ({
            headerTintColor: 'white',
            
            headerTitle:'Home',

            headerTitleAlign: 'center',
            headerStyle: {
                elevation: 0,
                backgroundColor: Colors.primary
            },
            headerRight:<CustomHeader nav = {navigation}/>
        })
    },
    NewChat: {
        screen: NewChat,
        navigationOptions: {
            headerTintColor: 'white',
            
            headerTitle:'New Chat',

            headerTitleAlign: 'center',
            headerStyle: {
                elevation: 0,
                backgroundColor: Colors.primary
            },
        }
    },
    NewGroup: {
        screen: NewGroup,
        navigationOptions: {
            headerTintColor: 'white',
            
            headerTitle:()=>(
                <View style = {{alignItems:'center'}}>
                  <Text style = {{fontSize:18,fontWeight:"bold",color:'#fff'}}>New Group</Text>
                  <Text style = {{color:'#fff'}}>Add Participants</Text>
                </View>
              ),

            headerTitleAlign: 'center',
            headerStyle: {
                elevation: 0,
                backgroundColor: Colors.primary
            },
        }
    },
    Broadcast: {
        screen: Broadcast,
        navigationOptions: {
            headerTintColor: 'white',
            
            headerTitle:()=>(
                <View style = {{alignItems:'center'}}>
                  <Text style = {{fontSize:18,fontWeight:"bold",color:'#fff'}}>Broadcast</Text>
                  <Text style = {{color:'#fff'}}>Add Participants</Text>
                </View>
              ),

            headerTitleAlign: 'center',
            headerStyle: {
                elevation: 0,
                backgroundColor: Colors.primary
            },
        }
    },
    GroupDetails: {
        screen: GroupDetails,
        navigationOptions: {
            headerTintColor: 'white',
            
            headerTitle:()=>(
                <View style = {{alignItems:'center'}}>
                  <Text style = {{fontSize:18,fontWeight:"bold",color:'#fff'}}>New Group</Text>
                  <Text style = {{color:'#fff'}}>Edit Group Details</Text>
                </View>
              ),

            headerTitleAlign: 'center',
            headerStyle: {
                elevation: 0,
                backgroundColor: Colors.primary
            },
        }
    },
    Barcode: {
        screen: Barcode,
        navigationOptions: {
            headerTintColor: 'white',
            
            headerTitle:'Scan',

            headerTitleAlign: 'center',
            headerStyle: {
                elevation: 0,
                backgroundColor: Colors.primary
            },
        }
    },
})

export default createAppContainer(ChatNavigator)