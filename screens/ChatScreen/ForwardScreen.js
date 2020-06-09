import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux'
import dayjs from 'dayjs';
import { FontAwesome, MaterialCommunityIcons, Ionicons, MaterialIcons } from '@expo/vector-icons';

import Chat from '../../components/Chat';
import { FlatList } from 'react-native-gesture-handler';
import * as actions from '../../store/actions/UpdateMessage';

const ForwardScreen = props => {

    const [selectedUsers, setSelectedUsers] = useState([])

    const dispatch = useDispatch()

    const user_id = props.navigation.state.params._id
    
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

    useEffect(() => {
        let array = []
        for (var i in contactsIdList) {
            array = array.concat({ _id: contactsIdList[i], selected: false})
        }
        setSelectedUsers(array)
    }, [])

    const updateReceivers = (receiver_id) => {
        const newSelectedUsers = [...selectedUsers]
        const getIndex = newSelectedUsers.findIndex(val => val._id === receiver_id)
        newSelectedUsers[getIndex].selected = !!!newSelectedUsers[getIndex].selected
        setSelectedUsers(newSelectedUsers)
    }

    const sendMessage = () => {
        for (var i in selectedUsers) {
            if (selectedUsers[i].selected) {
                const finalMessage = [{
                    _id: new Date(),
                    createdAt: new Date(),
                    text: props.navigation.state.params.message.text,
                    audio: props.navigation.state.params.message.audio,
                    video: props.navigation.state.params.message.video,
                    image: props.navigation.state.params.message.image,
                    user: {
                        _id: props.navigation.state.params._id,
                        name: props.navigation.state.params.name,
                        avatar: props.navigation.state.params.avatar
                    }
                }]
                dispatch(actions.updateMessage(props.navigation.state.params._id, selectedUsers[i]._id, finalMessage))
            }
        }
        props.navigation.navigate("ChatDetail")
    }

    return (
        <View style = {styles.coontainer} >
            <FlatList data = {finalUsersToDisplay} keyExtractor = {(item, index) => item._id.toString()}
                        renderItem = { itemData => <Chat name = {itemData.item.name} image = {itemData.item.avatar} 
                        message = { selectedUsers.length !==0 ? selectedUsers[selectedUsers.findIndex(val => val._id === itemData.item._id)].selected ? <Text>SELECTED</Text> : null : null}
                        onSelect = {() => updateReceivers(itemData.item._id)}
                        />
            }/>
            <TouchableOpacity onPress = {() => sendMessage()} >
                <View style = {{paddingVertical: 20, backgroundColor: Colors.primary, justifyContent: 'center', alignItems: 'center'}} >
                    <Text style = {{color: 'white', fontSize: 20}} >Send</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
}

ForwardScreen.navigationOptions = (navData) => {
    return {
        headerTitle: 'Forward To...',
        headerStyle: {
            backgroundColor: Colors.primary,
            elevation: 0
        },
        headerTintColor: 'white',
        headerTitleAlign: 'center'
    }
}

const styles = StyleSheet.create({
    coontainer: {
        flex: 1,
        backgroundColor: 'white'
    }
})

export default ForwardScreen;