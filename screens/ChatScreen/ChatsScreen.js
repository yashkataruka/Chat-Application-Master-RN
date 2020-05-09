import React from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux'

import * as actionTypes from '../../store/actions/HomeHeaderDisplay';
import Chat from '../../components/Chat';

const ChatsScreen = props => {

    return (
        <View style = {styles.coontainer} >
            <Chat name = "Yash Kataruka" message = "Hi, are you free right now?" online
                onSelect = {() => props.navigation.navigate("ChatDetail", {
                    name: "Yash Kataruka"
                })} time = "16:43 PM" delivered
                image = "https://scontent.fdel21-1.fna.fbcdn.net/v/t31.0-0/p640x640/27500624_1631883743526849_5371185179369120659_o.jpg?_nc_cat=111&_nc_sid=85a577&_nc_ohc=HxC82h-6TjgAX9PHczR&_nc_ht=scontent.fdel21-1.fna&_nc_tp=6&oh=433e35c82605599e6def6a9d1ce587d5&oe=5ED304FC" 
            />
        </View>
    );
}

const styles = StyleSheet.create({
    coontainer: {
        flex: 1,
        // justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    }
})

export default ChatsScreen;