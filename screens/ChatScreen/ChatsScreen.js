import React from 'react';
import { View, Text, StyleSheet,ScrollView, Button, TouchableOpacity,TextInput, Dimensions,Image,Modal, Keyboard,Animated } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';

import * as actionTypes from '../../store/actions/HomeHeaderDisplay';
import Chat from '../../components/Chat';

class ChatsScreen extends React.Component{
    constructor(props){
        super(props);
        this.showSearch = new Animated.Value(0)
        this.state = {
            searchList : [],
            current:'',
            modal:{},
            modalshow:false,
            searchshow:false,
            pressed:false

        }
        
       
        this.updateSearch = this.updateSearch.bind(this)
    }
    people = [
        {
            name:'Ashish Mathew',
            image:'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80',
            username:'ashishmp',
            bio:'Hello',
            location:'hi',
            online:true
        },
        {
            name:'Ashish Pandey',
            image:'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80',
            username:'ashhshmp',
            bio:'Hello',
            location:'hi',
            online:false
        },
        {
            name:'Ashish Nehra',
            image:'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80',
            username:'aship',
            bio:'Hello',
            location:'hi',
            online:true
        },
        {
            name:'Ashish Matt',
            image:'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80',
            username:'ashishp',
            bio:'Hello',
            location:'hi',
            online:true
        },
        {
            name:'Ashish Pand',
            image:'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80',
            username:'asshmp',
            bio:'Hello',
            location:'hi',
            online:false
        },
        {
            name:'Ashish Neh',
            image:'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80',
            username:'ashhmp',
            bio:'Hello',
            location:'hi',
            online:true
        },
        {
            name:'Ashish Ma',
            image:'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80',
            username:'ashismp',
            bio:'Hello',
            location:'hi',
            online:true
        },
        {
            name:'Ashish Pa',
            image:'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80',
            username:'ashihmp',
            bio:'Hello',
            location:'hi',
            online:false
        },
        {
            name:'Ashish Nea',
            image:'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80',
            username:'hishmp',
            bio:'Hello',
            location:'hi',
            online:true
        },
        {
            name:'Lionel',
            image:'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80',
            username:'lio',
            bio:'Hello',
            location:'hi',
            online:true
        },
        {
            name:'Cristiano',
            image:'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80',
            username:'cris',
            bio:'Hello',
            location:'hi',
            online:true
        },
        {
            name:'Cristopher',
            image:'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80',
            username:'christo',
            bio:'Hello',
            location:'hi',
            online:false
        },
        {
            name:'Christy',
            image:'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80',
            username:'christy',
            bio:'Hello',
            location:'hi',
            online:false
        }
    ]
    async updateSearch(text){
        await this.setState({searchList : []})
        if(text.length>1){
            this.people.map(p => p.name.indexOf(text) !== -1 ? this.setState({searchList:this.state.searchList.concat(p)}):null)
        }
        else null
    }



    click(){
        this.people.map(p => {if(p.username===this.state.current){
            this.setState({
                modalshow:true,
                modal:p
            },()=>console.log(this.state.modal))
        }})
        
    }

    show(){
        this.setState({
            pressed:true
        })
        if(!this.state.pressed){
            Animated.timing(this.showSearch,{
                toValue:1,
                duration:300
            }).start()}
        else{
            
            Animated.timing(this.showSearch,{
                toValue:0,
                duration:300
            }).start(()=>this.setState({
                pressed:false
            }))

        }
    }

    showMessage(){
        this.setState({
            modalshow:false,
            showSearch:false,
            pressed:false
        })
        this.props.navigation.navigate("ChatDetail", {
            name: `${this.state.modal.name}`
           })
        
    }
    render(){
        const w = Dimensions.get('screen').width/1.12;

        const width = this.showSearch.interpolate({
            inputRange:[0,1],
            outputRange:[50,w]
        }); 
        
 
    return (
        <View style = {styles.coontainer} >
        {this.state.pressed?
            <Animated.View style={{flexDirection: 'row', 
                                    justifyContent: 'center', 
                                    borderWidth:1,
                                    borderRadius:25,
                                    alignItems: 'center',
                                    alignSelf:'center',
                                    backgroundColor: '#009ACD',
                                    borderColor:'#009ACD',
                                    opacity:0.8,
                                    marginTop:20,
                                    height:50,
                                    width}}>
                <Ionicons onPress = {()=>this.show()} style={styles.searchIcon} name={this.state.pressed?"md-close":"md-search"} size={30} color="#fff"/>
                <TextInput
                    style={styles.input}
                    placeholder="Search"
                    placeholderTextColor='black'
                    onChangeText={(searchString) => this.updateSearch(searchString)}
                    underlineColorAndroid="transparent"
                    clearButtonMode="always"
                />

            </Animated.View>
            : null
        }
            
            {this.state.pressed ?
            <ScrollView alwaysBounceVertical = {true} keyboardShouldPersistTaps='handled' >
                 { 
                     this.state.searchList.map((p,index)=> {
                         return(
                            <TouchableOpacity key={index} onPress = {()=>this.setState({current:p.username},()=>this.click())} style={styles.chatOverview} >
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
            :
            <ScrollView contentContainerStyle = {styles.container} >
            <Chat name = "Yash Kataruka" message = "Hi, are you free right now?" online
                onSelect = {() => this.props.navigation.navigate("ChatDetail", {
                    name: "Yash Kataruka"
                })} time = "16:43 PM" delivered
                image = "https://scontent.fdel21-1.fna.fbcdn.net/v/t31.0-0/p640x640/27500624_1631883743526849_5371185179369120659_o.jpg?_nc_cat=111&_nc_sid=85a577&_nc_ohc=HxC82h-6TjgAX9PHczR&_nc_ht=scontent.fdel21-1.fna&_nc_tp=6&oh=433e35c82605599e6def6a9d1ce587d5&oe=5ED304FC" 
            />
            <Chat name = "Yash Kataruka" message = "Hi, are you free right now?" online
                onSelect = {() => this.props.navigation.navigate("ChatDetail", {
                    name: "Yash Kataruka"
                })} time = "16:43 PM" delivered
                image = "https://scontent.fdel21-1.fna.fbcdn.net/v/t31.0-0/p640x640/27500624_1631883743526849_5371185179369120659_o.jpg?_nc_cat=111&_nc_sid=85a577&_nc_ohc=HxC82h-6TjgAX9PHczR&_nc_ht=scontent.fdel21-1.fna&_nc_tp=6&oh=433e35c82605599e6def6a9d1ce587d5&oe=5ED304FC" 
            />
            <Chat name = "Ashish" message = "Hi, are you free right now?" online
                onSelect = {() => this.props.navigation.navigate("ChatDetail", {
                    name: "Ashish"
                })} time = "16:43 PM" delivered
                image = "https://scontent.fdel21-1.fna.fbcdn.net/v/t31.0-0/p640x640/27500624_1631883743526849_5371185179369120659_o.jpg?_nc_cat=111&_nc_sid=85a577&_nc_ohc=HxC82h-6TjgAX9PHczR&_nc_ht=scontent.fdel21-1.fna&_nc_tp=6&oh=433e35c82605599e6def6a9d1ce587d5&oe=5ED304FC" 
            />
            <Chat name = "Yash Kataruka" message = "Hi, are you free right now?" online
                onSelect = {() => this.props.navigation.navigate("ChatDetail", {
                    name: "Yash Kataruka"
                })} time = "16:43 PM" delivered
                image = "https://scontent.fdel21-1.fna.fbcdn.net/v/t31.0-0/p640x640/27500624_1631883743526849_5371185179369120659_o.jpg?_nc_cat=111&_nc_sid=85a577&_nc_ohc=HxC82h-6TjgAX9PHczR&_nc_ht=scontent.fdel21-1.fna&_nc_tp=6&oh=433e35c82605599e6def6a9d1ce587d5&oe=5ED304FC" 
            />
            <Chat name = "Yash Kataruka" message = "Hi, are you free right now?" online
                onSelect = {() => this.props.navigation.navigate("ChatDetail", {
                    name: "Yash Kataruka"
                })} time = "16:43 PM" delivered
                image = "https://scontent.fdel21-1.fna.fbcdn.net/v/t31.0-0/p640x640/27500624_1631883743526849_5371185179369120659_o.jpg?_nc_cat=111&_nc_sid=85a577&_nc_ohc=HxC82h-6TjgAX9PHczR&_nc_ht=scontent.fdel21-1.fna&_nc_tp=6&oh=433e35c82605599e6def6a9d1ce587d5&oe=5ED304FC" 
            />
            <Chat name = "Ashish" message = "Hi, are you free right now?" online
                onSelect = {() => this.props.navigation.navigate("ChatDetail", {
                    name: "Ashish"
                })} time = "16:43 PM" delivered
                image = "https://scontent.fdel21-1.fna.fbcdn.net/v/t31.0-0/p640x640/27500624_1631883743526849_5371185179369120659_o.jpg?_nc_cat=111&_nc_sid=85a577&_nc_ohc=HxC82h-6TjgAX9PHczR&_nc_ht=scontent.fdel21-1.fna&_nc_tp=6&oh=433e35c82605599e6def6a9d1ce587d5&oe=5ED304FC" 
            />
            <Chat name = "Yash Kataruka" message = "Hi, are you free right now?" online
                onSelect = {() => this.props.navigation.navigate("ChatDetail", {
                    name: "Yash Kataruka"
                })} time = "16:43 PM" delivered
                image = "https://scontent.fdel21-1.fna.fbcdn.net/v/t31.0-0/p640x640/27500624_1631883743526849_5371185179369120659_o.jpg?_nc_cat=111&_nc_sid=85a577&_nc_ohc=HxC82h-6TjgAX9PHczR&_nc_ht=scontent.fdel21-1.fna&_nc_tp=6&oh=433e35c82605599e6def6a9d1ce587d5&oe=5ED304FC" 
            />
            <Chat name = "Yash Kataruka" message = "Hi, are you free right now?" online
                onSelect = {() => this.props.navigation.navigate("ChatDetail", {
                    name: "Yash Kataruka"
                })} time = "16:43 PM" delivered
                image = "https://scontent.fdel21-1.fna.fbcdn.net/v/t31.0-0/p640x640/27500624_1631883743526849_5371185179369120659_o.jpg?_nc_cat=111&_nc_sid=85a577&_nc_ohc=HxC82h-6TjgAX9PHczR&_nc_ht=scontent.fdel21-1.fna&_nc_tp=6&oh=433e35c82605599e6def6a9d1ce587d5&oe=5ED304FC" 
            />
            <Chat name = "Ashish" message = "Hi, are you free right now?" online
                onSelect = {() => this.props.navigation.navigate("ChatDetail", {
                    name: "Ashish"
                })} time = "16:43 PM" delivered
                image = "https://scontent.fdel21-1.fna.fbcdn.net/v/t31.0-0/p640x640/27500624_1631883743526849_5371185179369120659_o.jpg?_nc_cat=111&_nc_sid=85a577&_nc_ohc=HxC82h-6TjgAX9PHczR&_nc_ht=scontent.fdel21-1.fna&_nc_tp=6&oh=433e35c82605599e6def6a9d1ce587d5&oe=5ED304FC" 
            />
            </ScrollView>
            }
            <View style={{position: 'absolute',
   width: 50,
   height: 50,
   borderRadius:25,
   backgroundColor:'#009ACD',
   alignItems: 'center',
   justifyContent: 'center',
   right: 30,
   bottom: 30,}}>
                <Ionicons onPress = {()=>this.show()} style={styles.searchIcon} name={this.state.pressed?"md-close":"md-search"} size={30} color="#fff"/>

            </View> 
            <Modal animationType={"slide"} transparent={true} visible={this.state.modalshow}>
                <View style={{justifyContent:'flex-end',flex: 1,backgroundColor: 'rgba(0,0,0,0.2)'}}>
                    <View style ={{flex:1, alignItems: 'center', justifyContent: 'flex-end'}}>
                        <View style={styles.overlay}>
                            <TouchableOpacity onPress={() => {this.setState({modalshow:false})}}>
                                <Ionicons name="md-close" size={34} color='#009ACD' style = {{margin:30,alignSelf:'flex-end'}} />
                            </TouchableOpacity>
                            <View style = {{justifyContent:'center',alignItems:'center'}}>
                                <Image style={styles.imgDetails} source={{ uri: this.state.modal.image}} />

                                <Text style = {{marginTop:20,fontSize:20,}}>{this.state.modal.name}</Text>

                                <Text style = {{marginTop:10,fontSize:18,fontWeight:'bold',fontStyle:'italic'}}>@{this.state.modal.username}</Text>

                                <View style = {{height:0.5,width:Dimensions.get('screen').width/1.8,borderWidth:0.5,marginTop:10,opacity:0.5}}/>

                                <View style= {{flexDirection:'row',marginTop:20}}>
                                    <Ionicons name="logo-facebook" size={40} color='#009ACD'  />
                                    <Ionicons name="logo-linkedin" style = {{marginHorizontal:30}} size={40} color='#009ACD'  />
                                    <Ionicons name="logo-instagram" size={40} color='#009ACD'  />
                                </View>

                                <View style = {{height:0.5,width:Dimensions.get('screen').width/1.8,borderWidth:0.5,marginTop:20,opacity:0.5}}/>

                                <View style = {{marginTop:20}}>
                                    <Text style = {{fontSize:16}}>About/Bio/One-line Story</Text>
                                </View>

                                <View style= {{flexDirection:'row',marginTop:30,alignItems:'center'}}>
                                    <Ionicons name="md-locate" size={30} color='red'  />
                                    <Text style = {{fontSize:16,marginLeft:20,fontStyle:'italic'}}>Location</Text>
                                </View>

                                <TouchableOpacity onPress = {() => this.showMessage()} style = {{marginTop:40,width:Dimensions.get('screen').width/2,paddingVertical:10,backgroundColor:'#009ACD',alignItems:'center',justifyContent:'center',borderRadius:8}}>
                                    <Text style = {{fontSize:20,fontWeight:'bold',color:'white'}}>
                                        Message
                                    </Text>
                                </TouchableOpacity>

                            </View>    
                         </View>

                    </View>
                </View>
            </Modal>
        </View>
        
    );
                }
}

const styles = StyleSheet.create({
    coontainer: {
        flex: 1,
        // justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        paddingHorizontal:20
    },
    container:{
        
        paddingTop:20,
        alignItems: 'center',
        width: '100%',
    },
    search:{
        backgroundColor:'#d5dae6',
        marginTop:10,
        height:40,
        paddingLeft:20,
        width:Dimensions.get('screen').width-30,
        borderRadius:8
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
        borderBottomWidth:0.3
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
    overlay:{
        backgroundColor: '#ffffff',
        width: Dimensions.get('screen').width,
        height: Dimensions.get('screen').height/1.2,
        borderTopLeftRadius:30,
        borderTopRightRadius:30,
        borderBottomWidth:1,
        borderBottomColor:'#aeb6f2'
    },
    imgDetails:{
        width: 150,
        height: 150,
        borderRadius: 75,
        backgroundColor: '#ccc',
        marginBottom:10
    },
    searchSection: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf:'center',
        width:Dimensions.get('screen').width/1.2,
        marginTop:20,
        height:40,
        marginRight:20,
        marginLeft:20
    },
    searchIcon: {
        padding: 10,
        borderTopLeftRadius:15,
        borderBottomLeftRadius:15
        
    },
    input: {
        flex: 1,
        paddingTop: 10,
        paddingRight: 10,
        paddingBottom: 10,
        paddingLeft: 0,
        color: '#424242',
    },
    
})

export default ChatsScreen;