import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Button } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default class CustomHeader extends React.Component{
    render(){
        return(
            <View style = {{flexDirection: 'row'}} >
                            <TouchableOpacity>
                                <Ionicons name = "md-add" size = {25} color = 'white' style = {{marginRight: 20}} />
                            </TouchableOpacity>
                        </View>
        )
    }
}