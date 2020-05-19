import React from 'react';
import { View, Text, ImageBackground, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons, MaterialCommunityIcons, Octicons, Ionicons } from '@expo/vector-icons';

import Colors from '../constants/Colors';

const Chat = (props) => {

    return (
        <View>
        <TouchableOpacity style = {{flexDirection: 'row', width: '95%', marginLeft: '2.5%', marginTop: 10}} onPress = {() => props.onSelect()} >
            <ImageBackground source = {{uri: props.image}} style = {{height: 60, width: 60, alignItems: 'center', justifyContent: 'center', borderRadius: 30, overflow: 'hidden'}} >
            </ImageBackground>
            <View style = {{justifyContent: 'space-evenly', marginLeft: 15, width: '80%'}} >
                <View style = {{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}} >
                    <Text style = {{fontSize: 18, fontWeight: 'bold'}} >{props.name}</Text>
                    <Text style = {{fontSize: 12, fontWeight: 'bold', color: '#ccc'}} >{props.time}</Text>
                </View>
                <View style = {{flexDirection: 'row', justifyContent: 'space-between',alignItems: 'center'}} >
                    {props.message}
                    {props.receivedtick ? <Ionicons name = "ios-checkmark-circle" color = {Colors.primary} size = {13} /> : 
                        props.seentick ? <Ionicons name = "ios-checkmark-circle-outline" color = {Colors.primary} size = {13} /> : null
                    }
                </View>
            </View>
        </TouchableOpacity>
        { props.online ? <View style = {{height: 10, width: 10, backgroundColor: Colors.primary, borderRadius: 5, marginLeft: '3.6%', top: "-15%"}}/> : <View style = {{height: 10, width: 10, backgroundColor: 'white',  borderRadius: 5, marginLeft: '3.6%'}} /> }
        <View style = {{height: 1, width: '80%', marginLeft: '17%', backgroundColor: '#ccc', }} />
        </View>

    )
}

export default Chat;

// const Chat = props => {
    //     return (
    //         <TouchableOpacity onPress={() => props.onSelect()} style={styles.chatOverview} >
    //             <Image style={{...styles.image, ...props.imageStyle}} source={{ uri: props.image }} />
    //             {props.online ? <Image style = {styles.online} /> : null }
    //             <View style={styles.infoContainer}>
    //                 <View style = {styles.upper} >
    //                     <Text style={{...styles.name, ...props.nameStyle}}>{props.name}</Text>
    //                     <Text style = {{...styles.time, ...props.timeStyle}}>{props.time}</Text>
    //                 </View>
    //                 {props.missed ? <View style = {styles.missed} >
    //                                     <MaterialIcons name = "call-missed" color = "#F08080" style = {{right: 10}} />
    //                                     {props.message}
    //                                 </View> 
    //                     : props.seen ? <View style = {styles.seen} >
    //                                         <Text style={{...styles.message, ...props.style}}>{props.message}</Text>
    //                                         <MaterialCommunityIcons name = "check-all" color = {Colors.primary} size = {15} />
    //                                     </View>  
    //                     : props.delivered ? <View style = {styles.delivered} >
    //                                         <Text style={{...styles.message, ...props.style}}>{props.message}</Text>
    //                                         <Octicons name = "check" color = {Colors.primary} size = {15} />
    //                                     </View>  
    //                     : props.message }
    //             </View>
    //         </TouchableOpacity>
    //   );
    // };
    
    // const styles = StyleSheet.create({
    //     chatOverview: {
    //         paddingVertical: 10,
    //         paddingLeft: 10,
    //         flexDirection: 'row',
    //         alignItems: 'center',
    //         width: '100%'
    //     },
    //     image: {
    //         width: 60,
    //         height: 60,
    //         borderRadius: 30,
    //         backgroundColor: '#ccc',
    //     },
    //     infoContainer: {
    //         width: '80%',
    //     },
    //     upper: {
    //         flexDirection: 'row',
    //         alignItems: 'baseline',
    //         justifyContent: 'space-between',
    //         left: 2
    //     },
    //     time: {
    //         color: '#ccc',
    //         fontWeight: 'bold',
    //         fontSize: 13
    //     },
    //     name: {
    //         color: 'black',
    //         fontSize: 18,
    //         marginBottom: 5,
    //     },
    //     message: {
    //         color: '#666',
    //         fontSize: 16
    //     },
    //     missed: {
    //         flexDirection: 'row',
    //         alignItems: 'center'
    //     },
    //     seen: {
    //         width: '115%',
    //         flexDirection: 'row',
    //         alignItems: 'center',
    //         justifyContent: 'space-between'
    //     },
    //     delivered: {
    //         flexDirection: 'row',
    //         alignItems: 'center',
    //         justifyContent: 'space-between'
    //     },
    //     online: {
    //         backgroundColor: Colors.primary, 
    //         height: 10, 
    //         width: 10,
    //         borderRadius: 5,
    //         right: 53,
    //         top: 24
    //     }
    // });