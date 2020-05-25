import React, { Component } from 'react';
import {
  StyleSheet,   // CSS-like styles
  Text,         // Renders text
  View ,
  Image,
  Dimensions,         // Container component
} from 'react-native';

export default class Screen1 extends React.Component{
    render(){
        return(
            <View style={[styles.slide]}>
            <View style = {{flex:1,backgroundColor:'#fff'}}>
                <View style = {{flex:1,backgroundColor:'#5dbcd2',justifyContent:'center',borderBottomLeftRadius:300}}>
                <Text style = {styles.header}>FOLLOW</Text>
                </View>
            </View>
            <View style = {{flex:3,backgroundColor:'#5dbcd2'}}>
                <View style = {{flex:1,backgroundColor:'#fff',justifyContent:'center',borderTopRightRadius:150}}>
                <Image source = {require('../../assets/followings.png')} resizeMode='contain'  style = {{alignSelf:'center',width:Dimensions.get("window").width}} />
                </View>
                
            </View>
              
        </View>
        )
    }
}
const styles = StyleSheet.create({
    // Slide styles
    slide: {
      flex: 1,         
    },
    // Header styles
    header: {
      color: '#FFFFFF',
      fontSize: 30,
      alignSelf:"center",
      position:'absolute',
      top:70,
      fontWeight: 'bold',
      marginVertical: 15,
    },
    // Text below header
    text: {
      color: '#FFFFFF',
      fontSize: 18,
      marginHorizontal: 40,
      textAlign: 'center',
    },
  });