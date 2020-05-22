import React, { Component } from 'react';
import {
  StyleSheet,   // CSS-like styles
  Text,         // Renders text
  View ,
  Image,
  Dimensions,
  Animated
} from 'react-native';
import { onFrameDidUpdate } from 'expo/build/AR';

export default class Screen1 extends React.Component{
    constructor(props){
        super(props);
    }
    

    
    render(){

        return(
        <View style={[styles.slide]}>
            <View style = {{flex:1,backgroundColor:'#fff'}}>
                <View style = {{flex:1,backgroundColor:'#5dbcd2',justifyContent:'center',borderBottomLeftRadius:150}}>
                    <Text style={[styles.header,{textAlign:'center'}]}>CAMPUS</Text>
                </View>
            </View>
            <View style = {{flex:3,backgroundColor:'#5dbcd2'}}>
                <View style = {{flex:1,backgroundColor:'#fff',justifyContent:'center',borderTopRightRadius:300}}>
                    <Image source = {require('../../assets/hello.png')}  resizeMode='contain' style = {{width:Dimensions.get('window').width,alignSelf:'center'}}/>
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
      alignSelf:"center",
      position:'absolute',
      top:100,
      color: '#fff',
      fontSize: 30,
      fontWeight: 'bold',
    },
    // Text below header
    text: {
      color: '#fff',
      fontSize: 18,
      marginHorizontal: 40,
      textAlign: 'center',
    },
  });