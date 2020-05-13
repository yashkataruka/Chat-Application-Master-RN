import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Button } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { createAppContainer } from 'react-navigation';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';

import Colors from '../constants/Colors';
import ChatsScreen from '../screens/ChatScreen/ChatsScreen';
import GroupsScreen from '../screens/ChatScreen/GroupsScreen';
import NearbyScreen from '../screens/ChatScreen/NearbyScreen';
import ActiveScreen from '../screens/ChatScreen/ActiveScreen';
import ChatDetailScreen from '../screens/ChatScreen/ChatDetailScreen';
import CustomHeader from '../components/Header'


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
        navigationOptions: {
            headerTintColor: 'white',
            
            headerTitle:'Home',

            headerTitleAlign: 'center',
            headerStyle: {
                elevation: 0,
                backgroundColor: Colors.primary
            },
            headerRight: ({navigation}) => {
                return (
                    <CustomHeader/>
                )
            }
        }
    }
})

export default createAppContainer(ChatNavigator)