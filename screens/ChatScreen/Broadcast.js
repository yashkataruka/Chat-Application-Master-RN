import React from 'react';
import { View, Text, StyleSheet,ScrollView, Button, ToastAndroid, TouchableOpacity,TextInput, Dimensions,Image,Modal, Keyboard,Animated,Easing } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';

import * as actionTypes from '../../store/actions/HomeHeaderDisplay';
import Chat from '../../components/Chat';
import { HeaderTitle } from 'react-navigation-stack';

class Broadcast extends React.Component{
    constructor(props){
        super(props);
        this.showSearch = new Animated.Value(0)
        this.spin = new Animated.Value(0)
        this.state = {
            hello:'Hi',
            searchList : [],
            groupList:[],
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



    click(username){
        var found = false
        this.state.groupList.map((p)=>p.username===username ? found = true : null)
        if(found==false)
            this.people.map(p => p.username===username ? this.setState({groupList:this.state.groupList.concat(p)}):null)
        else ToastAndroid.show(`${username} already added`, ToastAndroid.SHORT);
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
    removePeople(index) {
        var array = [...this.state.groupList];
        array.splice(index, 1);
        this.setState({groupList: array});
      }
    render(){
        const w = Dimensions.get('screen').width/1.12;

        const width = this.showSearch.interpolate({
            inputRange:[0,1],
            outputRange:[0,w]
        }); 
        const spin = this.spin.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '90deg']
          });
        
 
    return (
        <View style = {styles.coontainer} >
        {this.state.groupList.length ? 
        <View>
        <View style = {{flexDirection:'row',height:50,marginTop:20,paddingHorizontal:20,justifyContent:'center'}}>
            <ScrollView horizontal = {true} showsHorizontalScrollIndicator = {true}>
                {
                    this.state.groupList.map((p,index)=>{return(
                        <TouchableOpacity key = {index} onPress = {()=>this.removePeople(index)} style = {{marginBottom:10}}>
                            <View style = {{flexDirection:'row',borderWidth:1,borderRadius:20,alignItems:'center',justifyContent:'center',marginRight:10,padding:5}}>
                                <Text style = {{color:'#000'}}>{p.name}</Text>
                                <Ionicons style = {{marginLeft:5}} size ={16} name = "md-close"/>
                            </View>
                        </TouchableOpacity>
                    )
                    })
                }
            </ScrollView>
            <Text style = {{marginLeft:10,fontWeight:'bold'}}>{this.state.groupList.length}</Text>
        </View></View> : null
        }
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
            : null
        }
            
            {this.state.pressed ?
            <ScrollView alwaysBounceVertical = {true} keyboardShouldPersistTaps='handled' >
                 { 
                     this.state.searchList.map((p,index)=> {
                         return(
                            <TouchableOpacity key={index} onPress = {()=>this.click(p.username)} style={styles.chatOverview} >
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
            <ScrollView alwaysBounceVertical = {true} keyboardShouldPersistTaps='handled' >
                 { 
                     this.people.map((p,index)=> {
                         return(
                            <TouchableOpacity key={index} onPress = {()=>this.click(p.username)} style={styles.chatOverview} >
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
                <Ionicons onPress = {()=>this.props.navigation.navigate('GroupDetails',{gm:this.state.groupList})} style={styles.searchIcon} name="md-arrow-forward" size={30} color="#fff"/>

            </View> 
            <View style={{position: 'absolute',
                            width: 50,
                            height: 50,
                            borderRadius:25,
                            backgroundColor:'#009ACD',
                            alignItems: 'center',
                            justifyContent: 'center',
                            right: 30,
                            bottom: 90,}}>
                <Ionicons onPress = {()=>this.show()} style={styles.searchIcon} name={this.state.pressed?"md-close":"md-search"} size={30} color="#fff"/>

            </View> 
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
        color: '#424242',
    },
    
})


export default Broadcast;