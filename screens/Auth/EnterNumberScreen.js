import React from 'react';
import { View, Text, StyleSheet,ScrollView, TextInput,ToastAndroid, Image,TouchableOpacity,ActivityIndicator, Dimensions,Animated ,Keyboard} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';

import Colors from '../../constants/Colors';

export default class EnterNumberScreen extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            number:0,
            loading:false
        }
        this.showWidth = new Animated.Value(0)
        this.button = new Animated.Value(0)
        this.buttonWidth = new Animated.Value(0)
        this.buttonOpacity = new Animated.Value(0)
    }
    componentDidMount(){
        this.getData()
        this.showAnim()

    }
    getData = async () => {
        try {
          const value = await AsyncStorage.getItem('userId')
          if(value !== null) {
            this.props.navigation.navigate('Profile',{userId:value})
          }
        } catch(e) {
            ToastAndroid.show(`Some Error has ocurred`, ToastAndroid.SHORT)
            
        }
      }
    showAnim(){
        Animated.timing(this.showWidth,{
            delay:500,
            toValue:2
        }).start() 
    }
    showbutton(){
        Animated.parallel([
        Animated.timing(this.button,{
            delay:200,
            toValue:1
        }),
        Animated.timing(this.buttonOpacity,{
            delay:300,
            toValue:1
        })
    ]
        ).start()
    }
    hidebutton(){
        Animated.parallel([
            Animated.timing(this.button,{
                delay:200,
                toValue:0
            }),
            Animated.timing(this.buttonOpacity,{
                delay:100,
                toValue:0
            })
        ]
            ).start()
    }
    async afterHide(){
        this.setState({loading:true})
        await axios.post('https://chatapp-backend111.herokuapp.com/auth/generate-otp',{
            'mobileNo' : this.state.number
        }).then(response => {
            if (response.data.status) {
             console.log(response.status);
           } 
          }).then(()=>this.setState({
              loading:false
          })).then(()=>{
            ToastAndroid.show(`OTP Sent`, ToastAndroid.SHORT);
          }).then(() => this.props.navigation.navigate({routeName:'EnterCode',params:{'mobileNo':this.state.number}}))
          .catch(error => {ToastAndroid.show(`Error Occured`, ToastAndroid.SHORT);});
        this.afterHideAnim()
    }
    afterHideAnim(){
        Animated.parallel([
            Animated.timing(this.buttonWidth,{
                delay:200,
                toValue:0
            }),
            Animated.timing(this.buttonOpacity,{
                delay:100,
                toValue:1
            })
        ]
            ).start()

    }


    pressed(){
        Animated.parallel([
            Animated.timing(this.buttonWidth,{
                delay:100,
                toValue:1
            }),
            Animated.timing(this.buttonOpacity,{
                delay:200,
                toValue:0
            })
        ]
            ).start(()=>this.afterHide())
    }
    async onChange(text){
        await this.setState({
            number:text
        })
        console.log(this.state.number)
        if(this.state.number.length==10){
            Keyboard.dismiss()
            this.showbutton()
        }
        else
            this.hidebutton()
        
    } 
 
    render(){
        const width = this.showWidth.interpolate({
            inputRange:[0,2],
            outputRange:['0%','70%'] 
        })

        const height = this.button.interpolate({
            inputRange:[0,1],
            outputRange:[0,50]
        })
        const buttonW = this.buttonWidth.interpolate({
            inputRange:[0,1],
            outputRange:['80%','0%']
        })
        const copacity = this.showWidth.interpolate({
            inputRange:[0,1,2],
            outputRange:[0,0.5,1]
        })
        const box_y = this.showWidth.interpolate({
            inputRange:[0,1],
            outputRange:[0,10]  
        })
        const bopacity = this.buttonOpacity
    return ( 
    <View style={{flex:1,backgroundColor:'#fff'}}>    
        <View style = {styles.container} >
            <View style = {{marginTop:'10%',alignItems:'center',marginBottom:20}} >
                <View style = {{marginTop: 20, flexDirection: 'row'}} >
                    <View style = {{width: 50, height: 5, backgroundColor: 'black', borderRadius: 3, marginRight: 10}} />
                    <View style = {{width: 50, height: 5, backgroundColor: 'white', borderRadius: 3, borderWidth: 1, borderColor: 'black'}} />
                </View>
            </View>
            <Animated.View style = {[styles.card,{opacity:copacity,transform:[{translateY:box_y}]}]} >
                <View style = {{margin: 20,marginBottom:50}}>
                    <Text style = {{fontWeight: 'bold', fontSize: 20}} >
                        Enter your Mobile Number to Login or Register
                    </Text>
                </View>
                <View style = {styles.number} >
                    <View style = {{borderColor: '#ccc', borderBottomWidth: 4, padding: 10, height: 35, justifyContent: 'center',alignItems:'flex-start',width:60}} >
                        <Text style = {{fontSize: 18}} >+91</Text>
                    </View> 
                    {/*NUMBER INPUT FIELD */} 
                    <Animated.View style = {{width}}>                  
                       <TextInput style = {{marginLeft:30,borderBottomWidth:4,borderColor:"#ccc",paddingLeft: 15,fontSize:18,height:35}} keyboardType = "number-pad" placeholder = "10-Digit No" key maxLength = {10} onChangeText = {(text)=>this.onChange(text)} />
                    </Animated.View>
                </View>
                {/*NEXT BUTTON */}

            </Animated.View>
            <TouchableOpacity style = {{width:'100%'}} onPress = {()=>this.pressed()}>
                <Animated.View style = {{backgroundColor:Colors.primary,justifyContent:'center',height,width:buttonW,opacity:bopacity,borderBottomRightRadius:10,borderBottomLeftRadius:10,alignSelf:'center'}}>
                    
                    <Text style = {{textAlign:'center',fontWeight:'bold',color:'#fff',fontSize:18}}>NEXT</Text>
                      
                </Animated.View>
            </TouchableOpacity>  
                
            <View style={{backgroundColor:'#fff', flexDirection:'row', alignItems:'flex-end'}}>
                <Image style={{width:Dimensions.get('window').width+100,height:(Dimensions.get('window').width*2)/3,marginTop:'10%'}} source={require("../../assets/bckgrd.jpg")} />
            </View>
            <ActivityIndicator size="large" animating = {this.state.loading} color={Colors.primary} />
        </View>
    </View>    
    )
    }
}


EnterNumberScreen.navigationOptions = navData => {
    hello = new EnterNumberScreen().state
    return {
        headerTitle: 'Campus Ring'

    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: '100%',
        width: '100%',
        position:'absolute',
        alignItems:'center',
        backgroundColor:'#fff'
    },
    card: {
        borderTopColor:Colors.primary,
        borderTopWidth:3,
        width: '80%',
        elevation: 5,
        backgroundColor: 'white',
        borderTopLeftRadius:10,
        borderTopRightRadius:10,
        marginBottom:'5%'
    },
    number: { 
        marginLeft: 20,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginBottom:40
    },
    textInput: {
        marginLeft: 25,
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderColor: '#ccc',
        height: 35,
        fontSize: 18,
        paddingLeft: 15
    },
    connectSocially: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
        backgroundColor: Colors.primary,
        marginLeft: 40
    }
})