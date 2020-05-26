import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput,ImageBackground,Dimensions,ScrollView } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import {Picker} from '@react-native-community/picker';

import Colors from '../../constants/Colors';
export default class TeacherRegistrationScreen extends React.Component{
    constructor(props){
        super(props)
        this.state= {
            language:''
        }
    }
    render(){
    return(
        <View style={styles.container}>
            <ScrollView style={styles.innerContainer}>
                <View style={{width: '100%',alignItems:'center',marginTop:20}}>
                <View style = {{borderWidth:4,borderColor:'black',alignItems:'center',marginBottom:'5%',paddingTop:10,backgroundColor:Colors.primary}}>
                    <TouchableOpacity>
                        <ImageBackground style = {{width:Dimensions.get('window').width/3,height:Dimensions.get('window').width/3}} resizeMode = 'stretch' source = {require('../../assets/professor.png')}/>
                    </TouchableOpacity>
                    <Text style = {{fontWeight:'bold',color:'#fff'}}>Professor</Text>
                </View>
                    <Text style={styles.text}>Teacher / Professor of </Text>
                    <View style = {{height:40,width:'50%',borderBottomWidth:2}}>
                    <Picker prompt = 'Choose where you teach'
                            selectedValue={this.state.language}
                            onValueChange={(itemValue, itemIndex) =>
                            this.setState({language: itemValue})
                    }>
                            <Picker.Item label="College/University" value="java" />
                            <Picker.Item label="School" value="js" />
                    </Picker>
                    </View>
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.text}>Campus Location</Text>
                    <View style = {{flexDirection:'row'}}>
                        <TextInput placeholder="City Name" style={styles.textInput}/>
                        <FontAwesome5 name = 'city' size = {32} color = {Colors.primary} />
                    </View>
                </View>
                <View style={[styles.inputContainer],{marginBottom:60,width:'50%',alignSelf:'center'}}>
                    <Text style={styles.text}>Campus Name</Text>
                    <View style = {{flexDirection:'row',justifyContent:'center'}}>
                        <TextInput placeholder="Institute Name" style={styles.textInput}/>
                        <FontAwesome5 name = 'user-graduate' size = {32} color = {Colors.primary} />
                    </View>
                </View>
            </ScrollView>
            <TouchableOpacity onPress = {()=>this.props.navigation.navigate('Main')} style={{alignSelf:'center',bottom:0,position:'absolute'}}>
                    <View style = {{backgroundColor: Colors.primary, justifyContent: 'center', alignItems: 'center',width:Dimensions.get('window').width,height:60 }}>
                        <Text style= {{textAlign:'center',fontSize:26,fontWeight:'bold',color:'white'}}>Next</Text>
                    </View>
            </TouchableOpacity>
        </View>
    );
    }
}

TeacherRegistrationScreen.navigationOptions = navData => {
    return {
      headerTitle: 'Teacher Registration',
    };
  };

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor:'#fff',
    },
    innerContainer: {
        position:'absolute',
        width:'100%',
        height:'100%',
    },
    inputContainer: {
        marginTop:'10%',
        width: '50%',
        padding: 20,
        alignSelf:'center'
    },
    text: {
        fontSize: 16,
        textAlign:'center',
        marginBottom:'2%'
    },
    textInput: {
        fontSize: 20,
        borderColor: 'black',
        borderBottomWidth: 2,
        height:30,
        paddingHorizontal: 20,
        marginRight:5,
        width:'100%'
    }
});
