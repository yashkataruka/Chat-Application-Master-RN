import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, ActivityIndicator,
    TouchableOpacity, Platform, KeyboardAvoidingView, Alert, Dimensions, RecyclerViewBackedScrollViewBase } from 'react-native';
import { GiftedChat, InputToolbar, Send, Bubble, Actions, Composer, Time, Message } from 'react-native-gifted-chat';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import { Picker } from 'emoji-mart';
import { useSelector, useDispatch } from 'react-redux';

import Colors from '../../constants/Colors';
import * as actionTypes from '../../store/actions/UpdateMessage';

const ChatDetailScreen = props => {

    const [messages1, setMessages] = useState([]);
    const [inputText, setInputText] = useState("");

    const dispatch = useDispatch();
    
    const _id = props.navigation.state.params._id
    const avatar = props.navigation.state.params.avatar
    const name = props.navigation.state.params.name
    const receiver_id = props.navigation.state.params.receiver_id
    const receiver_name = props.navigation.state.params.receiver_name
    const receiver_imageUrl = props.navigation.state.params.receiver_imageUrl

    const messages = useSelector(state => state.messageReducer.messages).filter(message_id => message_id._id === _id)[0].receivers.filter(receiver => receiver.receiver_id === receiver_id)[0].messages

    const verifyPermissions = async () => {
        const result = await Permissions.askAsync(Permissions.CAMERA, Permissions.CAMERA_ROLL, Permissions.AUDIO_RECORDING);
        if (result.status !== "granted") {
            Alert.alert("Insufficient Permissions", "You need to grant Camera Permission", [{
                text: 'Okay'
            }])
            return false;
        }
        return true
    }

    const takeImageHandler = async () => {
        const hasPermission = await verifyPermissions();
        if (!hasPermission) {
            return
        }
        const image = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [16, 9],
            quality: 1
        })
        // setPickedImage(image.uri)
        // props.onImageTaken(image.uri)
    }

    const takeVideoHandler = async () => {
        const hasPermission = await verifyPermissions();
        if (!hasPermission) {
            return
        }
        const video = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Videos,
            allowsEditing: true,
            aspect: [16, 9],
            quality: 1
        })
        // setPickedImage(image.uri)
        // props.onImageTaken(image.uri)
    }

    const openGalleryHandler = async () => {
        const hasPermission = await verifyPermissions();
        if (!hasPermission) {
            return
        }
        const gallery = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            allowsMultipleSelection: true,
            quality: 1
        })
        // setPickedImage(image.uri)
        // props.onImageTaken(image.uri)
    }

    const goToCamera = () => {
        props.navigation.navigate("Camera", {
            _id: _id,
            avatar: avatar,
            name: name,
            receiver_id: receiver_id,
            receiver_name: receiver_name,
            receiver_imageUrl: receiver_imageUrl
        })
    }

    const onChangeText = (event) => {
        setInputText(event)
    }

    const onSend = (message) => {
        message[0].sent = true,
        message[0].received = false
        // setMessages(GiftedChat.append(messages, message))
        console.log(message)
        dispatch(actionTypes.updateMessage(_id, receiver_id, message))
    }

    const renderInputToolbar = (props) => {
        return <InputToolbar {...props} containerStyle={styles.inputToolbarStyle}
                    primaryStyle = {{alignItems: 'flex-end', borderColor: '#888', width: '89%', 
                    borderWidth: 1, borderRadius: 40, backgroundColor: 'white'}}
                />;
    }

    const renderSend = (props) => {
        return <Send {...props}
                containerStyle = {{alignItems: 'center', justifyContent: 'center', right: 10}}
                textStyle = {{color: Colors.primary}}
                children = {<Ionicons name = "md-send" size = {25} color = '#888' />}
               />
    }

    const renderBubble = (props) => {
        return <Bubble {...props} tickStyle = {{justifyContent: 'center'}} bottomContainerStyle = {{right: {justifyContent: 'space-between'}}}
        wrapperStyle = {{right: {backgroundColor: Colors.primary, marginBottom: 2, maxWidth: '70%'},
                        left: {marginBottom: 3, backgroundColor: '#D1EEEE', maxWidth: '70%'}}} renderMessageVideo = {() => {}}
        />
    }

    const renderActions = (props) => {
        return (
            <View style = {{flexDirection: 'row', justifyContent: 'flex-start'}} >
                <Actions {...props}
                    containerStyle = {{justifyContent: 'center', alignItems: 'center'}}
                    icon = {() => <Ionicons name = "ios-camera" size = {30} color = '#888' />}
                    // options = {{"Photo": takeImageHandler, "Video": takeVideoHandler}}
                    onPressActionButton = {goToCamera}
                />
                <Actions {...props}
                    containerStyle = {{justifyContent: 'center', alignItems: 'center'}}
                    icon = {() => <Ionicons name = "ios-add" size = {30} color = '#888' style = {{right: 10}} />}
                    options = {{"Choose from Gallery": openGalleryHandler, "Cancel": () => {}}}
                />
            </View>
        )
    }

    const renderActionsAgain = (props) => {
        return <Actions {...props}
            containerStyle = {{justifyContent: 'center', alignItems: 'center', right: 30}}
            icon = {() => <Ionicons name = "ios-camera" size = {30} color = '#888' />}
            onPressActionButton = {takeImageHandler}
        />
    }

    const renderComposer = (props) => {
        return <Composer {...props}
        // onTextChanged = {(event) => onChangeText(event)} text = {inputText}
            textInputStyle = {{fontSize: 16, right: 18}} render
        />
    }

    const renderMessage = (props) => {
        return <Message {...props}
          customTextStyle={{ fontSize: 16, lineHeight: 18, paddingTop: 5, paddingBottom: 0 }} />
    }

    const renderTime = (props) => {
        return <Time {...props} timeTextStyle = {{right: {color: '#888'}}}
            />
    }

    const renderAccessory = (props) => {
        return (
            <TouchableOpacity>
                <View style = {{width: 44, height: 44, borderRadius: 22,
                                borderWidth: 1, borderColor: "#888",
                                justifyContent: 'center', alignItems: 'center' }} >
                    <Ionicons name = "md-mic" size = {25} color = "#888" />
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <KeyboardAvoidingView style = {{flex: 1, backgroundColor: 'white'}} >
            <GiftedChat messages = {messages} onSend = {(message) => onSend(message)}
                user = {{_id: _id, name: name, avatar: avatar}}
                messagesContainerStyle = {{backgroundColor: 'white', bottom: 5}} scrollToBottom
                renderAvatarOnTop inverted = {false} renderInputToolbar = {renderInputToolbar}  renderFooter = {() => null}
                bottomOffset = {0} renderSend = {renderSend} renderBubble = {renderBubble} renderActions = {renderActions}
                renderComposer = {renderComposer} renderMessage = {renderMessage} renderAccessory = {renderAccessory}
                renderTime = {renderTime} infiniteScroll minInputToolbarHeight = {22}
            />
        </KeyboardAvoidingView>
    )
}

ChatDetailScreen.navigationOptions = navData => {
    const receiver_name = navData.navigation.state.params.receiver_name
    const receiver_imageUrl = navData.navigation.state.params.receiver_imageUrl
    return {
        headerTitle: receiver_name,
        headerTintColor: 'white',
        headerTitleAlign: 'center',
        headerStyle: {
            backgroundColor: Colors.primary,
            elevation: 0
        },
        headerRight: () => {
            return (
            <TouchableOpacity onPress = {() => navData.navigation.navigate("UserDetail", {name: receiver_name, imageUrl: receiver_imageUrl })}  style = {{right: 10}} >
                <Ionicons name = "ios-menu" size = {25} color = "white" style = {{}} />
            </TouchableOpacity>
            )
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
        flexDirection: 'row',
        borderTopWidth: 0,
        marginLeft: 5,
        marginRight: 5,
        marginBottom: 3,
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        height: 44,
        bottom: 2
    }
})

export default ChatDetailScreen;