import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity, AppState } from 'react-native';
import { useSelector, useDispatch } from 'react-redux'
import dayjs from 'dayjs';
import { FontAwesome, MaterialCommunityIcons, Ionicons, MaterialIcons } from '@expo/vector-icons';

import Chat from '../../components/Chat';
import { FlatList } from 'react-native-gesture-handler';
import * as actionTypes from '../../store/actions/UpdateMessage';
import * as lastSeenActionTypes from '../../store/actions/UpdateLastSeen';

const ChatsScreen = props => {

    const [appState, setAppState] = useState(AppState.currentState)

    const dispatch = useDispatch()

    //displaying for just use1 with _id = 1
    const user_id = 1

    const lastSeenStatus = useSelector(state => state.lastSeenReducer.lastSeen).filter(user => user._id !== user_id)
    // console.log(lastSeenStatus)
    
    const contacts = useSelector(state => state.contactReducer.contacts).filter(id_contacts => id_contacts._id === user_id)

    const contactsIdList = contacts[0].id_contacts

    const users = useSelector(state => state.userReducer.users)

    let initialUsersToDisplay = []

    for (var id in contactsIdList) {
        for (var user_detail in users) {
            if (contactsIdList[id] === users[user_detail]._id) {
                const arrayToBeAdded = users[user_detail]
                initialUsersToDisplay = initialUsersToDisplay.concat(arrayToBeAdded)
                break
            }
        }
    }

    const messages = useSelector(state => state.messageReducer.messages).filter(message_id => message_id._id === user_id)[0].receivers
    
    let lastMessages = []

    for (var id in messages) {
        const lastMessageDetail = {_id: messages[id].receiver_id, message: messages[id].messages[messages[id].messages.length - 1] }
        lastMessages = lastMessages.concat(lastMessageDetail)
    }

    // for manually set ID = 1
    const user_details = users.filter(user => user._id === user_id)

    let orderToBeDisplayed = []
    let timeDiffArray = []

    for (var i in lastMessages) {
        timeDiff = new Date() - lastMessages[i].message.createdAt
        timeDiffArray = timeDiffArray.concat({timeDiff: timeDiff, _id: lastMessages[i]._id })
    }
    
    timeDiffArray.sort((a,b) => a.timeDiff < b.timeDiff ? -1 : 1);
    
    let finalUsersToDisplay = []

    for (var i in timeDiffArray) {
        for (var j in users) {
            if (timeDiffArray[i]._id === users[j]._id) {
                const arrayToBeAdded = users[j]
                finalUsersToDisplay = finalUsersToDisplay.concat(arrayToBeAdded)
                break
            }
        }
    }

    const chatPressed = (receiver_imageUrl, receiver_name, receiver_id, _id, name, avatar, lastSeenTime) => {
        props.navigation.navigate("ChatDetail", {
            receiver_imageUrl: receiver_imageUrl, receiver_name: receiver_name, receiver_id: receiver_id,  
            _id: _id, name: name, avatar: avatar, lastSeenTime: lastSeenTime
        })
    }

    const _handleAppStateChange = (nextAppState) => {
        // console.log(appState)
        if (appState === 'active' && nextAppState === 'background') {
            // console.log('App has come to the foreground!')
            dispatch(lastSeenActionTypes.updateLastSeen(user_id, dayjs(new Date()).format("HH:mm A")))
        }
        // console.log(nextAppState)
        setAppState(nextAppState)
      }

    useEffect(() => {
        AppState.addEventListener('change', _handleAppStateChange)
        dispatch(lastSeenActionTypes.updateLastSeen(user_id, "online"))
        return () => {
            AppState.addEventListener('change', _handleAppStateChange)
        }
    }, [])

    return (
        <View style = {styles.coontainer} >
            <FlatList data = {finalUsersToDisplay} keyExtractor = {(item, index) => item._id.toString()}
                        renderItem = { itemData => <Chat name = {itemData.item.name} online = {lastSeenStatus.filter(user => user._id === itemData.item._id)[0].lastSeenTime === "online" ? true : false}
                        image = {itemData.item.avatar} 
                        message = 
                        {
                            lastMessages[lastMessages.findIndex(lastMessage => lastMessage._id === itemData.item._id)].message.text.length === 0 ?
                            lastMessages[lastMessages.findIndex(lastMessage => lastMessage._id === itemData.item._id)].message.image ?
                            <View style = {{flexDirection: 'row', alignItems: 'center'}}>
                                <FontAwesome name = "photo" color = "#ccc" size = {16} />
                                <Text style = {{fontSize: 16, color: '#666'}} >  Photo</Text>
                            </View> : 
                            lastMessages[lastMessages.findIndex(lastMessage => lastMessage._id === itemData.item._id)].message.video ?
                            <View style = {{flexDirection: 'row', alignItems: 'center'}}>
                                <Ionicons name = "md-videocam" color = "#ccc" size = {20} />
                                <Text style = {{fontSize: 16, color: '#666'}} >  Video</Text>
                            </View> : 
                            <View style = {{flexDirection: 'row', alignItems: 'center'}}>
                                <MaterialIcons name = "audiotrack" color = "#ccc" size = {20} />
                                <Text style = {{fontSize: 16, color: '#666'}} > Audio</Text>
                            </View> : 
                            lastMessages[lastMessages.findIndex(lastMessage => lastMessage._id === itemData.item._id)].message.image ? 
                            <View style = {{flexDirection: 'row', alignItems: 'center'}} >
                                <FontAwesome name = "photo" color = "#ccc" size = {16} />
                                <Text style = {{fontSize: 16, color: 'black', width: '85%'}} numberOfLines = {1} >  {lastMessages[lastMessages.findIndex(lastMessage => lastMessage._id === itemData.item._id)].message.text } </Text>
                            </View> :
                            lastMessages[lastMessages.findIndex(lastMessage => lastMessage._id === itemData.item._id)].message.video ? 
                            <View style = {{flexDirection: 'row', alignItems: 'center'}} >
                                <Ionicons name = "md-videocam" color = "#ccc" size = {20} />
                                <Text style = {{fontSize: 16, color: 'black', width: '85%'}} numberOfLines = {1} >  {lastMessages[lastMessages.findIndex(lastMessage => lastMessage._id === itemData.item._id)].message.text } </Text>
                            </View> :
                            lastMessages[lastMessages.findIndex(lastMessage => lastMessage._id === itemData.item._id)].message.audio ? 
                            <View style = {{flexDirection: 'row', alignItems: 'center'}} >
                                <MaterialIcons name = "audiotrack" color = "#ccc" size = {20} />
                                <Text style = {{fontSize: 16, color: 'black', width: '85%'}} numberOfLines = {1} > {lastMessages[lastMessages.findIndex(lastMessage => lastMessage._id === itemData.item._id)].message.text } </Text>
                            </View> :
                            <Text style = {{fontSize: 16, width: '85%'}} numberOfLines = {1} >
                                {lastMessages[lastMessages.findIndex(lastMessage => lastMessage._id === itemData.item._id)].message.text }
                            </Text>
                        }
                        seentick = {lastMessages[lastMessages.findIndex(lastMessage => lastMessage._id === itemData.item._id)].message.sent ? true : false}
                        receivedtick = {lastMessages[lastMessages.findIndex(lastMessage => lastMessage._id === itemData.item._id)].message.received ? true : false}
                        time = {dayjs(lastMessages[lastMessages.findIndex(lastMessage => lastMessage._id === itemData.item._id)].message.createdAt).format("HH:mm A")}
                        onSelect = {() => chatPressed(itemData.item.avatar, itemData.item.name, itemData.item._id, user_id, user_details[0].name, user_details[0].avatar, lastSeenStatus.filter(user => user._id === itemData.item._id)[0].lastSeenTime )}
                        />
            }/>
        </View>
    );
}

const styles = StyleSheet.create({
    coontainer: {
        flex: 1,
        backgroundColor: 'white'
    }
})

export default ChatsScreen;