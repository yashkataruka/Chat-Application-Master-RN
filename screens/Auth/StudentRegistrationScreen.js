import React from 'react';
import {Picker} from '@react-native-community/picker';
import { View, Text, StyleSheet, TouchableOpacity,ScrollView, TextInput,ImageBackground,Dimensions } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

import Colors from '../../constants/Colors';

export default class StudentRegistrationScreen extends React.Component  {
    constructor(props){
        super(props)
        this.state = {
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
                        <ImageBackground style = {{width:Dimensions.get('window').width/3,height:Dimensions.get('window').width/3}} resizeMode = 'stretch' source = {require('../../assets/learning.png')}/>
                    </TouchableOpacity>
                    <Text style = {{fontWeight:'bold',color:'#fff'}}>Student</Text>
                </View>
                    <Text style={styles.text}>Current Education Level</Text>
                    <View style = {{height:40,width:'50%',borderBottomWidth:2}}>
                    <Picker prompt = 'Choose Current Education Level'
                            selectedValue={this.state.language}
                            onValueChange={(itemValue, itemIndex) =>
                            this.setState({language: itemValue})
                    }>
                            <Picker.Item label="11" value="11" />
                            <Picker.Item label="12" value="12" />
                            <Picker.Item label="UG" value="ug" />
                            <Picker.Item label="PG" value="pg" />
                            <Picker.Item label="PhD" value="phd" />
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
                <View style={[styles.inputContainer,{marginBottom:80}]}>
                    <Text style={styles.text}>Campus Name</Text>
                    <View style = {{flexDirection:'row',}}>
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

StudentRegistrationScreen.navigationOptions = navData => {
    return {
      headerTitle: 'Student Registration',
    };
  };

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor:'#fff'
    },
    innerContainer: {
        position:'absolute',
        width:'100%',
        height:'100%',
    },
    inputContainer: {
        width: '100%',
        alignItems:'center',
        marginTop:'10%'
    },
    text: {
        fontSize: 16,
        marginBottom:'5%'
    },
    textInput: {
        fontSize: 20,
        borderColor: 'black',
        borderBottomWidth: 2,
        paddingHorizontal: 20,
        marginRight:5,
        width:'50%'
    }
});
