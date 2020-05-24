import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity, AppState, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux'
import dayjs from 'dayjs';
import { FontAwesome, MaterialCommunityIcons, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useColorScheme } from 'react-native-appearance'

import Chat from '../../components/Chat';
import { FlatList } from 'react-native-gesture-handler';
import * as actionTypes from '../../store/actions/UpdateMessage';
import * as lastSeenActionTypes from '../../store/actions/UpdateLastSeen';
import * as userActionTypes from '../../store/actions/UpdateUsers';
import * as contactActionTypes from '../../store/actions/UpdateContacts';
import Colors from '../../constants/Colors';

class ChatsScreen extends Component {

    constructor() {
        super();
        this.state = {
            appState: AppState.currentState,
            loading: false,
            user_id: 1
        }
    }
    
    _handleAppStateChange = (nextAppState) => {
        if (this.state.appState === 'active' && nextAppState === 'background') {
            this.props.updateLastSeen(this.state.user_id, new Date())
        }
        else if (this.state.appState === 'active' && nextAppState === 'active') {
            this.props.updateLastSeen(this.state.user_id, "online")
        }
        this.setState({
            appState: nextAppState
        })
    }

    componentDidMount () {
        AppState.addEventListener('change', this._handleAppStateChange)
        this.props.updateLastSeen(this.state.user_id, "online")
        return () => {
            AppState.addEventListener('change', this._handleAppStateChange)
        }
    }

    chatPressed = (receiver_imageUrl, receiver_name, receiver_id, _id, name, avatar, lastSeenTime) => {
        this.props.navigation.navigate("ChatDetail", {
            receiver_imageUrl: receiver_imageUrl, receiver_name: receiver_name, receiver_id: receiver_id,  
            _id: _id, name: name, avatar: avatar, lastSeenTime: lastSeenTime
        })
    }

    render() {

        const user_details = this.props.users.filter(user => user._id === this.state.user_id)

        let lastMessages = []

        for (var id in this.props.messages) {
            const lastMessageDetail = {_id: this.props.messages[id].receiver_id, message: this.props.messages[id].messages[this.props.messages[id].messages.length - 1] }
            lastMessages = lastMessages.concat(lastMessageDetail)
        }

        let timeDiffArray = []


        for (var i in lastMessages) {
            const timeDiff = new Date() - new Date(lastMessages[i].message.createdAt)
            timeDiffArray = timeDiffArray.concat({timeDiff: timeDiff, _id: lastMessages[i]._id })
        }
        
        timeDiffArray.sort((a,b) => a.timeDiff < b.timeDiff ? -1 : 1);

        let finalUsersToDisplay = []

        for (var i in timeDiffArray) {
            for (var j in this.props.users) {
                if (timeDiffArray[i]._id === this.props.users[j]._id) {
                    const arrayToBeAdded = this.props.users[j]
                    finalUsersToDisplay = finalUsersToDisplay.concat(arrayToBeAdded)
                    break
                }
            }
        }

        let finalLastSeenStatus = []

        for (var i in this.props.lastSeenStatus) {
            let lastSeen
            if (this.props.lastSeenStatus[i].lastSeenTime === "online") {
                lastSeen = "online"
            }
            else {
                if (new Date() - new Date(this.props.lastSeenStatus[i].lastSeenTime) < 86400000 ) {
                    lastSeen = dayjs(new Date(this.props.lastSeenStatus[i].lastSeenTime)).format("HH:mm A") 
                }
                else if (
                    new Date() - new Date(this.props.lastSeenStatus[i].lastSeenTime) > 86400000 &&
                    new Date() - new Date(this.props.lastSeenStatus[i].lastSeenTime) < 172800000 
                ) {
                    lastSeen = "Yesterday"
                }
                else {
                    lastSeen = new Date(this.props.lastSeenStatus[i].lastSeenTime).getDate() + "/" + parseInt(new Date(this.props.lastSeenStatus[i].lastSeenTime).getMonth() + 1) + "/" + new Date(this.props.lastSeenStatus[i].lastSeenTime).getFullYear()
                }
            }
            finalLastSeenStatus = finalLastSeenStatus.concat({_id: this.props.lastSeenStatus[i]._id, lastSeenTime: lastSeen })
        }

        return (
            <View style = {{flex: 1, backgroundColor: 'white'}} >
                <FlatList data = {finalUsersToDisplay} keyExtractor = {(item, index) => item._id.toString()}
                            renderItem = { itemData => <Chat name = {itemData.item.name} online = { finalLastSeenStatus.filter(user => user._id === itemData.item._id)[0].lastSeenTime === "online" ? true : false }
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
                            time = {
                                new Date() - new Date(lastMessages[lastMessages.findIndex(lastMessage => lastMessage._id === itemData.item._id)].message.createdAt) < 86400000 ?
                                dayjs(new Date(lastMessages[lastMessages.findIndex(lastMessage => lastMessage._id === itemData.item._id)].message.createdAt)).format("HH:mm A") :
                                new Date() - new Date(lastMessages[lastMessages.findIndex(lastMessage => lastMessage._id === itemData.item._id)].message.createdAt) > 86400000 &&
                                new Date() - new Date(lastMessages[lastMessages.findIndex(lastMessage => lastMessage._id === itemData.item._id)].message.createdAt) < 172800000 ?
                                "Yesterday" :
                                new Date(lastMessages[lastMessages.findIndex(lastMessage => lastMessage._id === itemData.item._id)].message.createdAt).getDate() + "/" +
                                parseInt(new Date(lastMessages[lastMessages.findIndex(lastMessage => lastMessage._id === itemData.item._id)].message.createdAt).getMonth() + 1) + "/" +
                                new Date(lastMessages[lastMessages.findIndex(lastMessage => lastMessage._id === itemData.item._id)].message.createdAt).getFullYear()
                            }
                            onSelect = { () => this.chatPressed(itemData.item.avatar, itemData.item.name, itemData.item._id, this.state.user_id, user_details[0].name, user_details[0].avatar, finalLastSeenStatus.filter(user => user._id === itemData.item._id)[0].lastSeenTime ) }
                            />
                }/>
            </View>
        );
    }
}

const mapStateToProps = state => {
    return {
        lastSeenStatus: state.lastSeenReducer.lastSeen.filter(user => user._id !== 1),
        users:  state.userReducer.users,
        contacts: state.contactReducer.contacts,
        messages: state.messageReducer.messages.filter(message_id => message_id._id === 1)[0].receivers
    };
}

const mapDispatchToProps = dispatch => {
    return {
        updateLastSeen: (user_id, status) => dispatch(lastSeenActionTypes.updateLastSeen(user_id, status)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatsScreen);