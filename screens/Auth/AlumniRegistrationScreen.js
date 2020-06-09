import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput,ImageBackground,Dimensions,ScrollView,ActivityIndicator,ToastAndroid } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import {Picker} from '@react-native-community/picker';
import axios from 'axios'

import Colors from '../../constants/Colors';
export default class AlumniRegistrationScreen extends React.Component{
    constructor(props){
        super(props)
        this.state= {
            batch:'',
            cn:'',
            loading:false
        }
    }
    async handlePress(){
        this.setState({loading:true})
        const config = {
            headers: { Authorization: `Bearer ${this.props.navigation.state.params.userId}` }
        };
        
        await axios.patch('https://chatapp-backend111.herokuapp.com/user',{
            'campusName' : this.state.cn,
            'batch':this.state.batch
        },config).then(()=>{
            ToastAndroid.show(`Profile Set`, ToastAndroid.SHORT);
          }).then(()=>this.setState({
              loading:false
          })).then(() => this.props.navigation.navigate('Main'))
          .catch(error => {ToastAndroid.show(`Something is wrong`, ToastAndroid.SHORT);});
        this.setState({loading:false})
      }
    render(){
    return(
        <View style={styles.container}>
            <ScrollView style={styles.innerContainer}>
                <View style={{width: '100%',alignItems:'center',marginTop:20}}>
                    <View style = {{borderWidth:4,borderColor:'black',alignItems:'center',marginBottom:'5%',paddingTop:10,backgroundColor:Colors.primary}}>
                        <TouchableOpacity>
                            <ImageBackground style = {{width:Dimensions.get('window').width/3,height:Dimensions.get('window').width/3}} resizeMode = 'stretch' source = {require('../../assets/education.png')}/>
                        </TouchableOpacity>
                        <Text style = {{fontWeight:'bold',color:'#fff'}}>Alumni</Text>
                    </View>
                </View>
                <View style = {{elevation:5,width:'80%',backgroundColor:'#fff',padding:20,paddingBottom:'20%',alignSelf:'center',margin:'5%',borderRadius:20}}>
                <View style = {styles.inputContainer}> 
                    <Text style={styles.text}>Batch of</Text>
                    <View style = {{height:40,width:'100%',borderBottomWidth:2,borderColor:Colors.primary}}>
                        <Picker prompt = 'Choose year of graduation'
                                selectedValue={this.state.batch}
                                onValueChange={(itemValue, itemIndex) =>
                                this.setState({batch: itemValue})
                        }>
                                <Picker.Item label="19-20" value="1920" />
                                <Picker.Item label="18-19" value="1819" />
                                <Picker.Item label="17-18" value="1718" />
                                <Picker.Item label="16-17" value="1617" />
                                <Picker.Item label="15-16" value="1516" />
                                <Picker.Item label="14-15" value="1415" />
                                <Picker.Item label="13-14" value="1314" />
                                <Picker.Item label="12-13" value="1213" />
                        </Picker>
                    </View>
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.text}>Campus Name</Text>
                    <View style = {{flexDirection:'row',justifyContent:'center'}}>
                        <FontAwesome5 name = 'user-graduate' size = {24} color = {Colors.primary} />
                        <TextInput onChangeText = {(cn)=>this.setState({cn})} placeholder="Institute Name" style={styles.textInput}/>
                    </View>
                </View>
                </View>
                <ActivityIndicator style = {{marginTop:30}} size="large" animating = {this.state.loading} color={Colors.primary} />
            </ScrollView>
            <TouchableOpacity onPress = {()=>this.handlePress()} style={{alignSelf:'center',bottom:0,position:'absolute'}}>
                    <View style = {{backgroundColor: Colors.primary, justifyContent: 'center', alignItems: 'center',width:Dimensions.get('window').width,height:60 }}>
                        <Text style= {{textAlign:'center',fontSize:26,fontWeight:'bold',color:'white'}}>Next</Text>
                    </View>
            </TouchableOpacity>
        </View>
    );
    }
}

AlumniRegistrationScreen.navigationOptions = navData => {
    return {
      headerTitle: 'Alumni Registration',
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
        width: '100%',
        padding: 20,
    },
    text: {
        fontSize: 16,
        fontWeight:'bold',
        marginBottom:'5%'
    },
    textInput: {
        fontSize: 20,
        borderColor: 'black',
        borderBottomWidth: 2,
        height:30,
        paddingHorizontal: 10,
        marginLeft:10,
        width:'100%',
        borderColor:Colors.primary
    }
});
