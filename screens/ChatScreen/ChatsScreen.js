import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity, AppState, ActivityIndicator,ScrollView,TextInput, Dimensions,Image,Modal, Keyboard,Animated,Easing } from 'react-native';
import { connect } from 'react-redux'
import dayjs from 'dayjs';
import { FontAwesome, MaterialCommunityIcons, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useColorScheme } from 'react-native-appearance'

import Chat from '../../components/Chat';
import { FlatList } from 'react-native-gesture-handler';
import * as actionTypes from '../../store/actions/UpdateMessage';
import * as lastSeenActionTypes from '../../store/actions/UpdateLastSeen';
import * as userActionTypes from '../../store/actions/UpdateUsers';
import * as contactActionTypes from '../../store/actions/UpdateContacts';
import Colors from '../../constants/Colors';

class ChatsScreen extends Component {

    constructor() {
        super();
        this.showSearch = new Animated.Value(0)
        this.spin = new Animated.Value(0)
        this.state = {
            appState: AppState.currentState,
            loading: false,
            user_id: 1,
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
                modal:p,
                searchList:[]
            },()=>console.log(this.state.modal))
        }})
        
    }

    show(){
        this.setState({
            pressed:true
        })
        if(!this.state.pressed){
            this.spin.setValue(0)
            Animated.timing(this.showSearch,{
                toValue:1,
                duration:400,
                easing:Easing.linear
            }).start()}
        else{
            
            Animated.sequence([Animated.timing(this.showSearch,{
                toValue:0,
                duration:300
            }),
            Animated.timing(
                this.spin,
              {
                toValue: 1,
                duration: 200,
                easing: Easing.linear,
              }
            )
        ]).start(()=>this.setState({
                pressed:false,
                searchList:[]
            }))

        }
    }

    showMessage(){
        this.setState({
            modalshow:false,
            showSearch:false,
        })
        this.props.navigation.navigate("ChatDetail", {
            name: `${this.state.modal.name}`
           })
        
    }
    
    _handleAppStateChange = (nextAppState) => {
        if (this.state.appState === 'active' && nextAppState === 'background') {
            this.props.updateLastSeen(this.state.user_id, new Date())
        }
        else if (this.state.appState === 'active' && nextAppState === 'active') {
            this.props.updateLastSeen(this.state.user_id, "online")
        }
        this.setState({
            appState: nextAppState
        })
    }

    componentDidMount () {
        AppState.addEventListener('change', this._handleAppStateChange)
        this.props.updateLastSeen(this.state.user_id, "online")
        return () => {
            AppState.addEventListener('change', this._handleAppStateChange)
        }
    }

    chatPressed = (receiver_imageUrl, receiver_name, receiver_id, _id, name, avatar, lastSeenTime) => {
        this.props.navigation.navigate("ChatDetail", {
            receiver_imageUrl: receiver_imageUrl, receiver_name: receiver_name, receiver_id: receiver_id,  
            _id: _id, name: name, avatar: avatar, lastSeenTime: lastSeenTime
        })
    }

    render() {
        const w = Dimensions.get('screen').width/1.12;

        const width = this.showSearch.interpolate({
            inputRange:[0,1],
            outputRange:[0,w]
        }); 
        const spin = this.spin.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '90deg']
          });

        const user_details = this.props.users.filter(user => user._id === this.state.user_id)

        let lastMessages = []

        for (var id in this.props.messages) {
            const lastMessageDetail = {_id: this.props.messages[id].receiver_id, message: this.props.messages[id].messages[this.props.messages[id].messages.length - 1] }
            lastMessages = lastMessages.concat(lastMessageDetail)
        }

        let timeDiffArray = []


        for (var i in lastMessages) {
            const timeDiff = new Date() - new Date(lastMessages[i].message.createdAt)
            timeDiffArray = timeDiffArray.concat({timeDiff: timeDiff, _id: lastMessages[i]._id })
        }
        
        timeDiffArray.sort((a,b) => a.timeDiff < b.timeDiff ? -1 : 1);

        let finalUsersToDisplay = []

        for (var i in timeDiffArray) {
            for (var j in this.props.users) {
                if (timeDiffArray[i]._id === this.props.users[j]._id) {
                    const arrayToBeAdded = this.props.users[j]
                    finalUsersToDisplay = finalUsersToDisplay.concat(arrayToBeAdded)
                    break
                }
            }
        }

        let finalLastSeenStatus = []

        for (var i in this.props.lastSeenStatus) {
            let lastSeen
            if (this.props.lastSeenStatus[i].lastSeenTime === "online") {
                lastSeen = "online"
            }
            else {
                if (new Date() - new Date(this.props.lastSeenStatus[i].lastSeenTime) < 86400000 ) {
                    lastSeen = dayjs(new Date(this.props.lastSeenStatus[i].lastSeenTime)).format("HH:mm A") 
                }
                else if (
                    new Date() - new Date(this.props.lastSeenStatus[i].lastSeenTime) > 86400000 &&
                    new Date() - new Date(this.props.lastSeenStatus[i].lastSeenTime) < 172800000 
                ) {
                    lastSeen = "Yesterday"
                }
                else {
                    lastSeen = new Date(this.props.lastSeenStatus[i].lastSeenTime).getDate() + "/" + parseInt(new Date(this.props.lastSeenStatus[i].lastSeenTime).getMonth() + 1) + "/" + new Date(this.props.lastSeenStatus[i].lastSeenTime).getFullYear()
                }
            }
            finalLastSeenStatus = finalLastSeenStatus.concat({_id: this.props.lastSeenStatus[i]._id, lastSeenTime: lastSeen })
        }

        return (
            <View style = {styles.coontainer} >
        {this.state.pressed?
            <View>
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
                                    width,
                                    transform: [{rotate: spin}]}}>
                <Ionicons  style={styles.searchIcon} name="md-search" size={30} color="#fff"/>
                <TextInput
                    style={styles.input}
                    placeholder="Search"
                    placeholderTextColor='#fff'
                    onChangeText={(searchString) => this.updateSearch(searchString)}
                    underlineColorAndroid="transparent"
                    clearButtonMode="always"
                />
                <Ionicons onPress = {()=>this.show()} style={styles.searchIcon} name={this.state.pressed?"md-close":"md-search"} size={30} color="#fff"/>

            </Animated.View>
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
            </View>
            : <View style = {{flex: 1, backgroundColor: 'white'}} >
                <FlatList data = {finalUsersToDisplay} keyExtractor = {(item, index) => item._id.toString()}
                            renderItem = { itemData => <Chat name = {itemData.item.name} online = { finalLastSeenStatus.filter(user => user._id === itemData.item._id)[0].lastSeenTime === "online" ? true : false }
                            image = {itemData.item.avatar} 
                            message = 
                            {
                                lastMessages[lastMessages.findIndex(lastMessage => lastMessage._id === itemData.item._id)].message.text.length === 0 ?
                                lastMessages[lastMessages.findIndex(lastMessage => lastMessage._id === itemData.item._id)].message.image ?
                                <View style = {{flexDirection: 'row', alignItems: 'center'}}>
                                    <FontAwesome name = "photo" color = "#ccc" size = {16} />
                                    <Text style = {{fontSize: 16, color: '#666'}} >  Photo</Text>
                                </View> : 
                                lastMessages[lastMessages.findIndex(lastMessage => lastMessage._id === itemData.item._id)].message.video ?
                                <View style = {{flexDirection: 'row', alignItems: 'center'}}>
                                    <Ionicons name = "md-videocam" color = "#ccc" size = {20} />
                                    <Text style = {{fontSize: 16, color: '#666'}} >  Video</Text>
                                </View> : 
                                <View style = {{flexDirection: 'row', alignItems: 'center'}}>
                                    <MaterialIcons name = "audiotrack" color = "#ccc" size = {20} />
                                    <Text style = {{fontSize: 16, color: '#666'}} > Audio</Text>
                                </View> : 
                                lastMessages[lastMessages.findIndex(lastMessage => lastMessage._id === itemData.item._id)].message.image ? 
                                <View style = {{flexDirection: 'row', alignItems: 'center'}} >
                                    <FontAwesome name = "photo" color = "#ccc" size = {16} />
                                    <Text style = {{fontSize: 16, color: 'black', width: '85%'}} numberOfLines = {1} >  {lastMessages[lastMessages.findIndex(lastMessage => lastMessage._id === itemData.item._id)].message.text } </Text>
                                </View> :
                                lastMessages[lastMessages.findIndex(lastMessage => lastMessage._id === itemData.item._id)].message.video ? 
                                <View style = {{flexDirection: 'row', alignItems: 'center'}} >
                                    <Ionicons name = "md-videocam" color = "#ccc" size = {20} />
                                    <Text style = {{fontSize: 16, color: 'black', width: '85%'}} numberOfLines = {1} >  {lastMessages[lastMessages.findIndex(lastMessage => lastMessage._id === itemData.item._id)].message.text } </Text>
                                </View> :
                                lastMessages[lastMessages.findIndex(lastMessage => lastMessage._id === itemData.item._id)].message.audio ? 
                                <View style = {{flexDirection: 'row', alignItems: 'center'}} >
                                    <MaterialIcons name = "audiotrack" color = "#ccc" size = {20} />
                                    <Text style = {{fontSize: 16, color: 'black', width: '85%'}} numberOfLines = {1} > {lastMessages[lastMessages.findIndex(lastMessage => lastMessage._id === itemData.item._id)].message.text } </Text>
                                </View> :
                                <Text style = {{fontSize: 16, width: '85%'}} numberOfLines = {1} >
                                    {lastMessages[lastMessages.findIndex(lastMessage => lastMessage._id === itemData.item._id)].message.text }
                                </Text>
                            }
                            seentick = {lastMessages[lastMessages.findIndex(lastMessage => lastMessage._id === itemData.item._id)].message.sent ? true : false}
                            receivedtick = {lastMessages[lastMessages.findIndex(lastMessage => lastMessage._id === itemData.item._id)].message.received ? true : false}
                            time = {
                                new Date() - new Date(lastMessages[lastMessages.findIndex(lastMessage => lastMessage._id === itemData.item._id)].message.createdAt) < 86400000 ?
                                dayjs(new Date(lastMessages[lastMessages.findIndex(lastMessage => lastMessage._id === itemData.item._id)].message.createdAt)).format("HH:mm A") :
                                new Date() - new Date(lastMessages[lastMessages.findIndex(lastMessage => lastMessage._id === itemData.item._id)].message.createdAt) > 86400000 &&
                                new Date() - new Date(lastMessages[lastMessages.findIndex(lastMessage => lastMessage._id === itemData.item._id)].message.createdAt) < 172800000 ?
                                "Yesterday" :
                                new Date(lastMessages[lastMessages.findIndex(lastMessage => lastMessage._id === itemData.item._id)].message.createdAt).getDate() + "/" +
                                parseInt(new Date(lastMessages[lastMessages.findIndex(lastMessage => lastMessage._id === itemData.item._id)].message.createdAt).getMonth() + 1) + "/" +
                                new Date(lastMessages[lastMessages.findIndex(lastMessage => lastMessage._id === itemData.item._id)].message.createdAt).getFullYear()
                            }
                            onSelect = { () => this.chatPressed(itemData.item.avatar, itemData.item.name, itemData.item._id, this.state.user_id, user_details[0].name, user_details[0].avatar, finalLastSeenStatus.filter(user => user._id === itemData.item._id)[0].lastSeenTime ) }
                            />
                }/>
            </View>
        }
            <View style={{position: 'absolute',
                            width: 50,
                            height: 50,
                            borderRadius:25,
                            backgroundColor:Colors.primary,
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

                                <TouchableOpacity style = {{marginTop:40,width:Dimensions.get('screen').width/2,paddingVertical:10,backgroundColor:'#009ACD',alignItems:'center',justifyContent:'center',borderRadius:8}}>
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
        alignItems: 'center',
        backgroundColor: 'white',
        paddingHorizontal:10,
    },
    container:{
        
        paddingTop:20,
        alignItems: 'center',
        width: '100%',
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
        color: '#fff',
        fontSize:18
    },
    
})

const mapStateToProps = state => {
    return {
        lastSeenStatus: state.lastSeenReducer.lastSeen.filter(user => user._id !== 1),
        users:  state.userReducer.users,
        contacts: state.contactReducer.contacts,
        messages: state.messageReducer.messages.filter(message_id => message_id._id === 1)[0].receivers
    };
}

const mapDispatchToProps = dispatch => {
    return {
        updateLastSeen: (user_id, status) => dispatch(lastSeenActionTypes.updateLastSeen(user_id, status)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatsScreen);
