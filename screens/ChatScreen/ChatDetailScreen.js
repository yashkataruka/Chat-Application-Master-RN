import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { GiftedChat, InputToolbar, Send, Bubble, Actions, Composer } from 'react-native-gifted-chat';
import { Ionicons } from '@expo/vector-icons';

import Colors from '../../constants/Colors';

const ChatDetailScreen = props => {

    const [messages, setMessages] = useState([]);

    useEffect(() => {
        setMessages([
            {_id: 1, text: 'Hello developer', createdAt: new Date(), user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any' }
        }, {_id: 2, text: 'Hello developer', createdAt: new Date(), user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any' }
        }, {_id: 3, text: 'Hello developer', createdAt: new Date(), user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any' }
        }, {_id: 4, text: 'Hello developer', createdAt: new Date(), user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any' }
        }, {_id: 5, text: 'Hello developer', createdAt: new Date(), user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any' }
        }, {_id: 6, text: 'Hello Bot', createdAt: new Date(), user: {
            _id: 1,
            name: 'Yash',
            avatar: 'https://placeimg.com/140/140/any' }
        }, {_id: 7, text: 'Hello Bot', createdAt: new Date(), user: {
            _id: 1,
            name: 'Yash',
            avatar: 'https://placeimg.com/140/140/any' }
        }, {_id: 8, text: 'Hello Bot', createdAt: new Date(), user: {
            _id: 1,
            name: 'Yash',
            avatar: 'https://placeimg.com/140/140/any' }
        }, {_id: 9, text: 'Hello Bot', createdAt: new Date(), 
            user: { _id: 1, name: 'Yash', avatar: 'https://placeimg.com/140/140/any' }
        }, {_id: 10, text: 'Hello Bot', createdAt: new Date(), user: {
            _id: 1,
            name: 'Yash',
            avatar: 'https://placeimg.com/140/140/any' }
        }, {_id: 11, text: 'How are you?', createdAt: new Date(), user: {
            _id: 1,
            name: 'Yash',
            avatar: 'https://placeimg.com/140/140/any' }
        }, {_id: 12, text: 'I am fine, You?', createdAt: new Date(), user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any' }
        }, {_id: 13, text: 'I am fine too, thanks!', createdAt: new Date(), user: {
            _id: 1,
            name: 'Yash',
            avatar: 'https://placeimg.com/140/140/any' }
        }, {_id: 14, text: "That's great!", createdAt: new Date(), user: {
            _id: 1,
            name: 'Yash',
            avatar: 'https://placeimg.com/140/140/any' }
        }, {_id: 15, text: 'How is the weather?', createdAt: new Date(), user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any' }
        }, {_id: 16, text: 'It has been okayish!', createdAt: new Date(), user: {
            _id: 1,
            name: 'Yash',
            avatar: 'https://placeimg.com/140/140/any' }
        }, {_id: 17, text: 'Has it been?', createdAt: new Date(), user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any' }
        }, {_id: 18, text: 'It is sunny out there!', createdAt: new Date(), user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any' }
        }, {
            _id: 19, text: 'This is a quick reply. Do you love Gifted Chat? (radio) KEEP IT', createdAt: new Date(2020, 5, 10, 21, 52, 30, 0),
            quickReplies: { type: 'radio', // or 'checkbox',
                keepIt: true,
                values: [
                    {
                        title: '😋 Yes',
                        value: 'yes',
                    },
                    {
                        title: '📷 Yes, let me show you with a picture!',
                        value: 'yes_picture',
                    },
                    {
                        title: '😞 Nope. What?',
                        value: 'no',
                    }
                ]}, user: {_id: 2, name: 'React Native' }
            }])
    }, [])

    const onSend = (message) => {
        console.log(message)
        setMessages(GiftedChat.append(messages, message))
    }

    const renderInputToolbar = (props) => {
        return <InputToolbar {...props} containerStyle={styles.inputToolbarStyle} 
                    primaryStyle = {{alignItems: 'center', borderColor: Colors.primary,
                    borderWidth: 1, borderRadius: 40}}
                />;
    }

    const renderSend = (props) => {
        return <Send {...props} 
                containerStyle = {{alignItems: 'center', justifyContent: 'center'}}
                textStyle = {{color: Colors.primary, top: 5}} 
               />
    }

    const renderBubble = (props) => {
        return <Bubble {...props} wrapperStyle = {{right: {backgroundColor: Colors.primary, marginBottom: 2},
                                                    left: {marginBottom: 2}}} />
    }

    const renderActions = (props) => {
        return <Actions {...props}
            containerStyle = {{justifyContent: 'center', alignItems: 'center', top: 5}} 
            // wrapperStyle = {{borderRadius: 20, justifyContent: 'center', backgroundColor: 'red'}}
            icon = {() => <Ionicons name = "ios-camera" size = {30} color = {Colors.primary} />}
        />
    }

    return (
        <SafeAreaView style = {{flex: 1, backgroundColor: 'white'}} >
            <GiftedChat messages = {messages} onSend = {(message) => onSend(message)} 
                user = {{_id: 1, name: 'Yash', avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg'}} 
                messagesContainerStyle = {{backgroundColor: 'white', bottom: 20}}  alwaysShowSend scrollToBottom 
                renderAvatarOnTop renderUsernameOnMessage inverted = {false} renderInputToolbar = {renderInputToolbar} 
                bottomOffset = {0} renderSend = {renderSend} renderBubble = {renderBubble} renderActions = {renderActions}
            />
        </SafeAreaView>
    )
}

ChatDetailScreen.navigationOptions = navData => {
    // console.log(navData.navigation.state.params.name)
    const name = navData.navigation.state.params.name
    return {
        headerTitle: name,
        headerTitleAlign: 'center',
        headerTintColor: 'white',
        headerStyle: {
            backgroundColor: Colors.primary,
            elevation: 0
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    inputToolbarStyle: {
        height: 60,
        borderTopWidth: 0,
        marginLeft: 5,
        marginRight: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
})

export default ChatDetailScreen;