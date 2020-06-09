import React from 'react';
import { View, Text, StyleSheet,ScrollView, Button,Switch, TouchableOpacity,TextInput,Image, Dimensions,ImageBackground,Modal, Keyboard,Animated,Easing } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import Colors from '../../constants/Colors'

import * as actionTypes from '../../store/actions/HomeHeaderDisplay';
import Chat from '../../components/Chat';
import { HeaderTitle } from 'react-navigation-stack';

export default class GroupDetails extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            image:null,
            isEnabled:true

        }
    }
    _pickImage = async () => {
        try {
          let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
          });
          if (!result.cancelled) {
            this.setState({ image: result.uri });
          }
    
          console.log(result);
        } catch (E) {
          console.log(E);
        }
      };
    render(){
        let { image } = this.state;
 
    return (
        <View style = {styles.coontainer}>
                <View style={{ alignItems: 'center' }}>
                        {image && <ImageBackground source={{ uri: image }} style={{ width: Dimensions.get('window').width, height:Dimensions.get('window').height/4 ,marginBottom:30 }}>
                        <TouchableOpacity onPress = {this._pickImage} style = {{position:'absolute',bottom:0,right:0,borderTopLeftRadius:40,backgroundColor:Colors.primary,padding:10}}><Ionicons size = {40} color ='#fff' name = 'md-create'/></TouchableOpacity>
                        </ImageBackground>}
                        {!image && <View style = {{marginVertical:30}}><Button title="Choose Image" onPress={this._pickImage} /></View>}
                </View>
                <TextInput placeholder = 'Enter Group Name' style = {{borderBottomWidth:1,width:Dimensions.get('window').width-120,paddingLeft:20,alignSelf:'center'}}/>
                <View style = {{width:Dimensions.get('window').width-30,height:1,backgroundColor:'#ccc',marginTop:20}}/>
                <View style = {{flexDirection:'row',marginVertical:20}}>
                        <Text style = {{marginRight:60,fontSize:20}}>Private:</Text>
                        <View style = {{position:'absolute',right:10}}>
                            <Switch
                                trackColor={{ false: "#767577", true: "#81b0ff" }}
                                thumbColor={this.state.isEnabled ? "#f4f3f4" : "#f4f3f4"}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange = {()=>this.setState({isEnabled:!this.state.isEnabled})}
                                value={this.state.isEnabled}
                            />
                        </View>
                </View>
                <Text style = {{fontSize:12,color:'#ccc'}}>Specify whether the group should be public or private</Text>
                <View style = {{width:Dimensions.get('window').width-30,height:1,backgroundColor:'#ccc'}}/>
                <Text style = {{fontWeight:'bold',marginTop:20}}>Participants: {this.props.navigation.state.params.gm.length}</Text>
                <ScrollView  alwaysBounceVertical = {true} keyboardShouldPersistTaps='handled' >
                        { 
                            this.props.navigation.state.params.gm.map((p,index)=> {
                                return(
                                    <TouchableOpacity key={index} style={styles.chatOverview} >
                                        <Image style={styles.image} source={{ uri: p.image }} />
                                        <View style={styles.infoContainer}>
                                            <View style = {styles.upper} >
                                                <Text style={styles.name}>{p.name}</Text>
                                                <View style = {[{alignSelf:'flex-end',width:10,height:10,borderRadius:5,marginBottom:10},{backgroundColor:(p.online)?'green':'red'}]}/>
                                            </View>
                        
                                        </View>
                                    </TouchableOpacity>
                                )
                            }
                            )
                        }  
                </ScrollView>
                <View style={{position: 'absolute',
                                    width: 50,
                                    height: 50,
                                    borderRadius:25,
                                    backgroundColor:'#009ACD',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    right: 30,
                                    bottom: 30,}}>
                        <Ionicons onPress = {()=>this.props.navigation.navigate('GroupDetails',{gm:this.state.groupList})} style={styles.searchIcon} name="md-arrow-forward" size={30} color="#fff"/>

                </View> 
        </View>
        
    );
    }
}

const styles = StyleSheet.create({
    coontainer: {
        flex: 1,
        backgroundColor: 'white',
        paddingHorizontal:10,
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#ccc',
        marginBottom:10
    },
    chatOverview: {
        paddingTop:20,
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
    },
    infoContainer: {
        width: '80%',
    },
    upper: {
        flexDirection: 'row',
        alignItems: 'baseline',
        justifyContent: 'space-between',
    },
    name: {
        marginLeft:20,
        color: 'black',
        fontSize: 18,
        marginBottom: 5,
    },
    
})
