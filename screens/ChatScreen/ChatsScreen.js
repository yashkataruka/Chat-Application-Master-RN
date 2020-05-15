import React from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux'
import dayjs from 'dayjs';
import { FontAwesome } from '@expo/vector-icons';

import Chat from '../../components/Chat';
import { FlatList } from 'react-native-gesture-handler';

const ChatsScreen = props => {

    const dispatch = useDispatch()

    //displaying for just user with _id = 1
    const user_id = 1
    
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

    // console.log(initialUsersToDisplay)
    // console.log("------------------------------------------------------------------------------------------------------------------")
    // console.log(lastMessages)

    let orderToBeDisplayed = []
    let timeDiffArray = []

    for (var i in lastMessages) {
        timeDiff = new Date() - lastMessages[i].message.createdAt
        timeDiffArray = timeDiffArray.concat({timeDiff: timeDiff, _id: lastMessages[i]._id })
    }
    
    // console.log(timeDiffArray)

    timeDiffArray.sort((a,b) => a.timeDiff < b.timeDiff ? -1 : 1);
    
    // console.log(timeDiffArray)

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

    // console.log(finalUsersToDisplay)

    return (
        <View style = {styles.coontainer} >
            <FlatList data = {finalUsersToDisplay} keyExtractor = {(item, index) => item._id.toString()}
                        renderItem = { itemData => <Chat name = {itemData.item.name} online image = {itemData.item.avatar} 
                        message = 
                        {
                            lastMessages[lastMessages.findIndex(lastMessage => lastMessage._id === itemData.item._id)].message.text.length === 0 ?
                            <View style = {{flexDirection: 'row', alignItems: 'center'}}>
                                <FontAwesome name = "photo" color = "#ccc" size = {18} />
                                <Text style = {{fontSize: 16, color: '#666'}} >  Photo</Text>
                            </View> : 
                            lastMessages[lastMessages.findIndex(lastMessage => lastMessage._id === itemData.item._id)].message.image ? 
                            <View style = {{flexDirection: 'row', alignItems: 'center'}} >
                                <FontAwesome name = "photo" color = "#ccc" size = {18} />
                                <Text style = {{fontSize: 16, color: 'black', width: '85%'}} numberOfLines = {1} >  {lastMessages[lastMessages.findIndex(lastMessage => lastMessage._id === itemData.item._id)].message.text } </Text>
                            </View> :
                            <Text style = {{fontSize: 16, width: '85%'}} numberOfLines = {1} >
                                {lastMessages[lastMessages.findIndex(lastMessage => lastMessage._id === itemData.item._id)].message.text }
                            </Text>
                        }
                        tick = {lastMessages[lastMessages.findIndex(lastMessage => lastMessage._id === itemData.item._id)].message.user._id === user_id ? true : false}
                        time = {dayjs(lastMessages[lastMessages.findIndex(lastMessage => lastMessage._id === itemData.item._id)].message.createdAt).format("HH:mm A")}
                        onSelect = {() => props.navigation.navigate("ChatDetail", {
                            receiver_imageUrl: itemData.item.avatar, receiver_name: itemData.item.name, receiver_id: itemData.item._id,  
                            _id: user_id, name: user_details[0].name, avatar: user_details[0].avatar
                        })}
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