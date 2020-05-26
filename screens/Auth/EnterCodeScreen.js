import React from 'react';
import { View, Text, StyleSheet,ScrollView, TextInput,ToastAndroid,Alert,BackHandler, TouchableOpacity,Animated,ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';

import Colors from '../../constants/Colors';

export default class EnterCodeScreen extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            one: '',
            two: '',
            three: '',
            four:'',
            oneed:true,
            twoed:false,
            threeed:false,
            foured:false, 
            oneFocus: false,
            twoFocus: false,
            threeFocus: false,
            fourFocus:false,
            loading:false,
            otpp:'',
            id:0
        };
        this.showWidth = new Animated.Value(0);
        this.button = new Animated.Value(0)
        this.buttonOpacity = new Animated.Value(0)
        this.buttonWidth = new Animated.Value(0)
    }
    componentDidMount() {
        this.backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            this.backAction
          );
        this.showAnim()
        this.refs.one.focus();
    }
    backAction = () => {
        Alert.alert("Exit App ?", "Are you sure you want to exit ?", [
          {
            text: "Cancel",
            onPress: () => null,
            style: "cancel"
          },
          { text: "YES", onPress: () => BackHandler.exitApp() }
        ]);
        return true;
      };
    
      componentWillUnmount() {
        this.backHandler.remove();
      }
    
    handleChangeTextOne = (text) => {
        this.setState({ one: text,otpp: this.state.otpp+text }, async () => { if (this.state.one) {await this.setState({twoed:true,oneed:false});this.refs.two.focus()} },()=>console.log(this.state.otpp));
    }
    handleChangeTextTwo = (text) => {
        this.setState({ two: text,otpp: this.state.otpp+text }, async () => { if (this.state.two) {await this.setState({threeed:true,twoed:false});this.refs.three.focus()} },()=>console.log(this.state.otpp));
    }
    handleChangeTextThree = (text) => {
        this.setState({ three: text,otpp: this.state.otpp+text }, async () => { if (this.state.three) {await this.setState({foured:true,threeed:false});this.refs.four.focus()} },()=>console.log(this.state.otpp));
    }
    handleChangeTextFour = (text) => {
        this.setState({ four: text,otpp: this.state.otpp+text },()=>console.log(this.state.otpp));
        this.showbutton()
    } 

     backspace = (id) => {
        this.hidebutton()
        if (id === 'two') {
          if (this.state.two) { this.setState({ two: '',otpp:(this.state.otpp-this.state.two)/10 }); } else if (this.state.one) { this.setState({ one: '',otpp:(this.state.otpp-this.state.one)/10},async ()=> await this.setState({oneed:true,twoed:false},()=> this.refs.one.focus()) ) }
        } else if (id === 'three') {
          if (this.state.three) { this.setState({ three: '',otpp:(this.state.otpp-this.state.three)/10 }); } else if (this.state.two) { this.setState({ two: '',otpp:(this.state.otpp-this.state.two)/10 },async ()=> await this.setState({twoed:true,threeed:false},()=>this.refs.two.focus())) }
        }
        else if (id === 'four') {
            if (this.state.four) { this.setState({ four: '',otpp:(this.state.otpp-this.state.four)/10 }); } else if (this.state.three) { this.setState({ three: '',otpp:(this.state.otpp-this.state.three)/10 },async ()=> await this.setState({threeed:true,foured:false},()=> this.refs.three.focus())) }
          }
    }


    showAnim(){
        Animated.timing(this.showWidth,{
            delay:500,
            toValue:2
        }).start() 
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

    async afterHide(){
        this.setState({loading:true})
        await axios.post('https://chatapp-backend111.herokuapp.com/auth/verify-otp',{
            'mobileNo' : this.props.navigation.state.params.mobileNo,
            'otp' : this.state.ottp
        }).then(response => {
            if (response.data.status) {
             console.log(response.data.id);
             this.setState({id:response.data.id})
           } 
          }).then(async ()=>{
                try {
                  await AsyncStorage.setItem('userId', this.state.id)
                } catch (e) {
                  Alert('Error Ocurred')
                }
              }).then(()=>{
            ToastAndroid.show(`OTP Verified`, ToastAndroid.SHORT);
          }).then(()=>this.setState({
              loading:false
          })).then(() => this.props.navigation.navigate('Profile',{userId:this.state.id}))
          .catch(error => {ToastAndroid.show(`OTP Verification Failed`, ToastAndroid.SHORT);});
        this.setState({loading:false})
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


    render(){
        const width = this.showWidth.interpolate({
            inputRange:[0,2],
            outputRange:['0%','20%'] 
        })
        const height = this.button.interpolate({
            inputRange:[0,1],
            outputRange:[0,50]
        })
        const { oneFocus, twoFocus, threeFocus,fourFocus } = this.state;
        const oneStyle = {
            borderBottomColor: oneFocus ? Colors.primary : 'black',
            borderBottomWidth: oneFocus ? 4 : 1,
          };
          const twoStyle = {
            borderBottomColor: twoFocus ? Colors.primary : 'black',
            borderBottomWidth: twoFocus ? 4 : 1,
          };
          const threeStyle = {
            borderBottomColor: threeFocus ? Colors.primary : 'black',
            borderBottomWidth: threeFocus ? 4 : 1,
          };
          const fourStyle = {
            borderBottomColor: fourFocus ? Colors.primary : 'black',
            borderBottomWidth: fourFocus ? 4 : 1,
          };
          const bopacity = this.buttonOpacity;
          const copacity = this.showWidth.interpolate({
            inputRange:[0,1,2],
            outputRange:[0,0.5,1]
            });
          const box_y = this.showWidth.interpolate({
            inputRange:[0,1],
            outputRange:[0,25]  
            });
          const buttonW = this.buttonWidth.interpolate({
            inputRange:[0,1],
            outputRange:['80%','0%']
            })
    return (
        <ScrollView style = {styles.container} >
            <View style = {{marginTop: '10%', flexDirection: 'row',alignSelf:'center'}} >
                    <View style = {{width: 50, height: 5, backgroundColor: 'white', borderRadius: 3, marginRight: 10, borderWidth: 1, borderColor: 'black'}} />
                    <View style = {{width: 50, height: 5, backgroundColor: 'black', borderRadius: 3, marginRight: 10}} />
            </View>
            <Animated.View style = {[styles.card,{opacity:copacity,transform:[{translateY:box_y}]}]} >
                <View style = {{margin: 20}} >
                    <Text style = {{fontWeight: 'bold', fontSize: 20}} >
                        Waiting to automatically detect and send SMS
                    </Text>
                </View>
                <View style = {styles.code} >
                    <View style = {{flexDirection: 'row', alignSelf: 'center'}} >
                    <Animated.View style = {{width,marginRight:'5%'}}>
                    <TextInput
                    editable = {this.state.oneed}
                        ref='one'
                        style={[styles.textInput, { ...oneStyle }]}
                        autoCorrect={false}
                        autoCapitalize='none'
                        keyboardType='number-pad'
                        caretHidden
                        onFocus={() => this.setState({ oneFocus: true})}
                        onBlur={() => this.setState({ oneFocus: false })}
                        maxLength={1}
                        onChangeText={(text) => { this.handleChangeTextOne(text); }}
                        value={this.state.one}
                    />
                    </Animated.View>
                    <Animated.View style = {{width,marginRight:'5%'}}>
                    <TextInput
                    editable = {this.state.twoed}
                        ref='two'
                        onKeyPress={({ nativeEvent }) => (
                        nativeEvent.key === 'Backspace' ? this.backspace('two') : null
                        )}
                        style={[styles.textInput, { ...twoStyle }]}
                        autoCorrect={false}
                        autoCapitalize='none'
                        maxLength={1}
                        onFocus={() => this.setState({ twoFocus: true})}
                        onBlur={() => this.setState({ twoFocus: false })}
                        caretHidden
                        keyboardType='number-pad'
                        onChangeText={(text) => { this.handleChangeTextTwo(text); }}
                        value={this.state.two}
                    />
                    </Animated.View>
                    <Animated.View style = {{width,marginRight:'5%'}}>
                    <TextInput
                    editable = {this.state.threeed}
                        ref='three'
                        onKeyPress={({ nativeEvent }) => (
                        nativeEvent.key === 'Backspace' ? this.backspace('three') : null
                        )}
                        style={[styles.textInput, { ...threeStyle }]}
                        autoCorrect={false} 
                        autoCapitalize='none'
                        onFocus={() => this.setState({ threeFocus: true})}
                        onBlur={() => this.setState({ threeFocus: false })}
                        maxLength={1}
                        caretHidden
                        keyboardType='number-pad'
                        onChangeText={(text) => { this.handleChangeTextThree(text); }}
                        value={this.state.three}
                    />
                    </Animated.View>
                    <Animated.View style = {{width}}>
                    <TextInput
                    editable = {this.state.foured}
                        ref='four'
                        onKeyPress={({ nativeEvent }) => (
                        nativeEvent.key === 'Backspace' ? this.backspace('four') : null
                        )}
                        style={[styles.textInput, { ...fourStyle }]}
                        autoCorrect={false}
                        autoCapitalize='none'
                        onFocus={() => this.setState({ fourFocus: true})}
                        onBlur={() => this.setState({ fourFocus: false })}
                        maxLength={1}
                        caretHidden
                        keyboardType='number-pad'
                        onChangeText={(text) => { this.handleChangeTextFour(text); }}
                        value={this.state.four}
                        />
                        </Animated.View> 
                    </View>
                </View>
                
            </Animated.View>
            <Animated.View style = {{backgroundColor:Colors.primary,height,width:buttonW,justifyContent:'center',opacity:bopacity,marginTop:10,borderBottomRightRadius:10,borderBottomLeftRadius:10,alignSelf:'center'}}>
                    <TouchableOpacity onPress = {() => this.pressed()} >
                        <Text style={{textAlign:'center',fontWeight:'bold',color:'#fff',fontSize:18}} >NEXT</Text>
                    </TouchableOpacity>
            </Animated.View>
            <View style = {{flexDirection:'row',marginTop:'20%',marginLeft:'10%'}}>
                    <TouchableOpacity onPress = {()=>this.pressed()}>
                        <View style = {styles.connectSocially}>
                            <Text style = {{color:"#fff",fontSize:16}}>Resend Code</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPressIn = {()=>this.props.navigation.navigate('EnterNumber')} style = {{marginLeft:'10%'}}>
                        <View style = {styles.connectSocially1}>
                            <Text style = {{color:"#fff",fontSize:16}}>Change Mobile No.</Text>
                        </View>
                    </TouchableOpacity>
            </View>
            <ActivityIndicator style = {{marginTop:30}} size="large" animating = {this.state.loading} color={Colors.primary} />
        </ScrollView>
    )
    }
}

EnterCodeScreen.navigationOptions = navData => {
    return {
        headerTitle: 'Campus Ring',
        headerLeft : ()=> null
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: '100%',
        width: '100%',
        position:'absolute',
        backgroundColor:'#fff'

    },
    card: {
        width: '80%',
        elevation: 5,
        backgroundColor: 'white',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        alignSelf:'center',
        borderTopWidth:2,
        borderColor:Colors.primary,
        marginBottom:'10%'
    },
    code: {
        marginLeft: 20,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginBottom:40,
    },
    textInput: {
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        width: 40,
        marginRight: 10,
        fontSize: 30,
        textAlign: 'center',
        padding: 5
    },
    connectSocially: {

        justifyContent: 'center',
        padding:15,
        alignItems: 'center',
        borderRadius: 30,
        backgroundColor: Colors.primary,
    },
    connectSocially1: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
        padding:15,
        backgroundColor: Colors.primary,
    }
})

