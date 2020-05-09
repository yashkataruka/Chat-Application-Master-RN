import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons, MaterialCommunityIcons, Octicons } from '@expo/vector-icons';

import Colors from '../constants/Colors';

const Chat = props => {
    return (
        <TouchableOpacity onPress={() => props.onSelect()} style={styles.chatOverview} >
            <Image style={{...styles.image, ...props.imageStyle}} source={{ uri: props.image }} />
            {props.online ? <Image style = {styles.online} /> : null }
            <View style={styles.infoContainer}>
                <View style = {styles.upper} >
                    <Text style={{...styles.name, ...props.nameStyle}}>{props.name}</Text>
                    <Text style = {{...styles.time, ...props.timeStyle}}>{props.time}</Text>
                </View>
                {props.missed ? <View style = {styles.missed} >
                                    <MaterialIcons name = "call-missed" color = "#F08080" style = {{right: 10}} />
                                    <Text style={{...styles.message, ...props.style}}>{props.message}</Text>
                                </View> 
                    : props.seen ? <View style = {styles.seen} >
                                        <Text style={{...styles.message, ...props.style}}>{props.message}</Text>
                                        <MaterialCommunityIcons name = "check-all" color = {Colors.primary} size = {15} />
                                    </View>  
                    : props.delivered ? <View style = {styles.delivered} >
                                        <Text style={{...styles.message, ...props.style}}>{props.message}</Text>
                                        <Octicons name = "check" color = {Colors.primary} size = {15} />
                                    </View>  
                    : <Text style={{...styles.message, ...props.style}}>{props.message}</Text> }
            </View>
        </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
    chatOverview: {
        paddingVertical: 10,
        paddingLeft: 10,
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%'
    },
    image: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#ccc',
    },
    infoContainer: {
        width: '80%',
    },
    upper: {
        flexDirection: 'row',
        alignItems: 'baseline',
        justifyContent: 'space-between',
    },
    time: {
        color: '#ccc',
        fontWeight: 'bold',
        fontSize: 13
    },
    name: {
        color: 'black',
        fontSize: 18,
        marginBottom: 5,
    },
    message: {
        color: '#666',
        fontSize: 16
    },
    missed: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    seen: {
        width: '115%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    delivered: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    online: {
        backgroundColor: Colors.primary, 
        height: 10, 
        width: 10,
        borderRadius: 5,
        right: 53,
        top: 24
    }
});

export default Chat;
