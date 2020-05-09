import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import Colors from '../../constants/Colors';

const EnterNumberScreen = props => {
    return (
        <View style = {styles.container} >
            <View style = {styles.card} >
                <View style = {{margin: 20}} >
                    <Text style = {{fontWeight: 'bold', fontSize: 20}} >
                        Enter your Mobile Number to Login or Register
                    </Text>
                </View>
                <View style = {styles.number} >
                    <View style = {{borderColor: '#ccc', borderWidth: 1, padding: 10, height: 35, justifyContent: 'center'}} >
                        <Text style = {{fontSize: 18}} >+91</Text>
                    </View>                    
                    <TextInput style = {styles.textInput} keyboardType = "number-pad" key maxLength = {10} />
                </View>
                <TouchableOpacity onPress = {() => props.navigation.navigate("EnterCode")} >
                    <View style = {{height: 50, width: 50, borderRadius: 25, backgroundColor: Colors.primary,
                        left: 290, top: 20, justifyContent: 'center', alignItems: 'center' }}>
                        <Ionicons name = "md-arrow-forward" size = {27} color = "white" />
                    </View>
                </TouchableOpacity>
            </View>
            <View style = {{flex: 1, justifyContent: 'flex-end', marginBottom: 30}} >
                <View style = {{flexDirection: 'row', alignItems: 'flex-end', marginRight: 10}} >
                    <TouchableOpacity onPress = {() => props.navigation.navigate("ConnectSocially")} >
                        <View style = {styles.connectSocially} >
                            <Text style = {{color: 'white', marginHorizontal: 10, marginVertical: 5, fontSize: 20}}>Connect Socially</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style = {{marginLeft: 45, marginTop: 20, flexDirection: 'row'}} >
                    <View style = {{width: 50, height: 5, backgroundColor: 'black', borderRadius: 3, marginRight: 10}} />
                    <View style = {{width: 50, height: 5, backgroundColor: 'white', borderRadius: 3, borderWidth: 1, borderColor: 'black'}} />
                </View>
            </View>
        </View>
    )
}

EnterNumberScreen.navigationOptions = navData => {
    return {
        headerTitle: 'Campus Ring'
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: '100%',
        width: '100%'
    },
    card: {
        margin: '10%',
        height: 180,
        width: '80%',
        elevation: 5,
        backgroundColor: 'white',
        borderRadius: 10
    },
    number: {
        marginLeft: 20,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    textInput: {
        marginLeft: 25,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#ccc',
        width: 210,
        height: 35,
        fontSize: 18,
        paddingLeft: 15
    },
    connectSocially: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
        backgroundColor: Colors.primary,
        marginLeft: 40
    }
})

export default EnterNumberScreen;