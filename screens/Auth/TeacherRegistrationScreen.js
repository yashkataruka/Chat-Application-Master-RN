import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput,ImageBackground,Dimensions,ScrollView,ToastAndroid,ActivityIndicator } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import {Picker} from '@react-native-community/picker';
import axios from 'axios'
import Colors from '../../constants/Colors';
export default class TeacherRegistrationScreen extends React.Component{
    constructor(props){
        super(props)
        this.state= {
            current:'',
            cn:'',
            cl:'',
            loading:false
        }
    }
    async handlePress(){
        this.setState({loading:true})
        const config = {
            headers: { Authorization: `Bearer ${this.props.navigation.state.params.userId}` }
        };
        
        await axios.patch('https://chatapp-backend111.herokuapp.com/user',{
            'campusLocation' : this.state.cl,
            'campusName' : this.state.cn,
            'collegeUniv':this.state.current
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
                <View style={{width: '100%',marginTop:20,alignItems:'center'}}>
                    <View style = {{borderWidth:4,borderColor:'black',paddingTop:10,backgroundColor:Colors.primary,alignItems:'center'}}>
                        <TouchableOpacity>
                            <ImageBackground style = {{width:Dimensions.get('window').width/3,height:Dimensions.get('window').width/3}} resizeMode = 'stretch' source = {require('../../assets/professor.png')}/>
                        </TouchableOpacity>
                        <Text style = {{fontWeight:'bold',color:'#fff'}}>Professor</Text>
                    </View>
                </View>
                <View style = {{elevation:5,width:'80%',backgroundColor:'#fff',padding:20,paddingBottom:'20%',alignSelf:'center',margin:'5%',borderRadius:20}}>
                <View style={styles.inputContainer}>
                    <Text style={styles.text}>Teacher / Professor of </Text>
                    <View style = {{height:40,width:'90%',borderBottomWidth:2,borderColor:Colors.primary,marginLeft:40}}>
                        <Picker prompt = 'Choose where you teach'
                                selectedValue={this.state.current}
                                onValueChange={(itemValue, itemIndex) =>
                                this.setState({current: itemValue})
                        }>
                                <Picker.Item label="College/University" value="college" />
                                <Picker.Item label="School" value="school" />
                        </Picker>
                    </View>
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.text}>Campus Location</Text>
                    <View style = {{flexDirection:'row',width:'90%'}}>
                        <FontAwesome5 name = 'city' size = {24} color = {Colors.primary} />
                        <TextInput onChangeText = {(cl)=>this.setState({cl})} placeholder="City Name" style={styles.textInput}/>
                    </View>
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.text}>Campus Name</Text>
                    <View style = {{flexDirection:'row',width:'90%'}}>
                        <FontAwesome5 name = 'user-graduate' size = {24} color = {Colors.primary} />
                        <TextInput onChangeText = {(cn)=>this.setState({cn})} placeholder="Institute Name" style={[styles.textInput,{marginLeft:20}]}/>
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
        width:'100%',
        height:'100%',
        marginBottom:40
    },
    inputContainer: { 
        width: '100%',
        marginTop:'10%'
    },
    text: {
        fontSize: 16,
        fontWeight:'bold',
        marginBottom:'4%'
    },
    textInput: {
        fontSize: 20,
        borderColor: Colors.primary,
        borderBottomWidth: 2,
        height:30,
        paddingHorizontal: 10,
        marginLeft:10,
        width:'100%'
    }
});
