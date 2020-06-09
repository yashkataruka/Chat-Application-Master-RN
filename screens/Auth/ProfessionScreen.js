import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity,Image,Dimensions,Animated, ImageBackground,ToastAndroid } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { withOrientation } from 'react-navigation';
import AsyncStorage from '@react-native-community/async-storage';

export default class ProfessionScreen extends React.Component {
    constructor(props){
        super(props);
        this.tpos = new Animated.Value(0)
        this.spos = new Animated.Value(0)
        this.apos = new Animated.Value(0)
        this.to = new Animated.Value(1)
        this.so = new Animated.Value(1)
        this.ao = new Animated.Value(1)
        this.state = {
            sbg:'#fff',
            pbg:'#fff',
            abg:'#fff',
            st:'#000',
            pt:'#000',
            at:'#000',
            pYPosition:0,
            sYPosition:0,
            aYPosition:0,
            userId:''
        } 
    }
    componentDidMount(){
        this.getData()
        this.props.navigation.addListener('willFocus',
        ()=>this.update())
    }
    getData = async () => {
        try {
          const value = await AsyncStorage.getItem('userId')
          this.setState({userId:value})
        } catch(e) {
            ToastAndroid.show(`Some Error has occurred`, ToastAndroid.SHORT)
            
        }
      }
    update(){
        this.so.setValue(1),
        this.to.setValue(1),
        this.ao.setValue(1),
        this.spos.setValue(0),
        this.apos.setValue(0),
        this.tpos.setValue(0)
    }
    spress(){
        if(this.state.sbg==Colors.primary){
            this.setState({sbg:'#fff',st:'#000'})
        }
        else{
            this.setState({
                sbg:Colors.primary,
                st:'#fff',
                pbg:'#fff',
                pt:'#000',
                abg:'#fff',
                at:'#000'
            })
        }
    }
    ppress(){
        if(this.state.pbg==Colors.primary){
            this.setState({pbg:'#fff',pt:'#000'})
        }
        else{
            this.setState({
                pbg:Colors.primary,
                pt:'#fff',
                sbg:'#fff',
                st:'#000',
                abg:'#fff',
                at:'#000'
            })
        }
    }
    apress(){
        if(this.state.abg==Colors.primary){
            this.setState({abg:'#fff',at:'#000'})
        }
        else{
            this.setState({
                abg:Colors.primary,
                at:'#fff',
                sbg:'#fff',
                st:'#000',
                pbg:'#fff',
                pt:'#000',
            })
        }
    }
    nextpress(){
        if(this.state.sbg==Colors.primary){
            this.sanim() 
        }
        else if(this.state.pbg==Colors.primary){
            this.tanim()
        }
        else if(this.state.abg==Colors.primary){
            this.aanim()
        }

    }
    tanim(){
        const { pYPosition } = this.state;
        const FINAL_POSITION = Dimensions.get('window').width/6
        Animated.parallel([Animated.timing(this.tpos, {
            toValue: pYPosition-FINAL_POSITION-14
        }),
        Animated.timing(this.so,{
            toValue:0
        }),
        Animated.timing(this.ao,{
            toValue:0
        })]).start(()=>this.props.navigation.navigate('TeacherRegistration',{userId:this.state.userId}))
    }
    sanim(){
        const { sYPosition } = this.state;
        const FINAL_POSITION = Dimensions.get('window').width/6
        Animated.parallel([Animated.timing(this.spos, {
            toValue: FINAL_POSITION+14-sYPosition
        }),
        Animated.timing(this.to,{
            toValue:0
        }),
        Animated.timing(this.ao,{
            toValue:0
        })]).start(()=>this.props.navigation.navigate('StudentRegistration',{userId:this.state.userId}))
    }
    aanim(){
        const { aYPosition } = this.state;
        const FINAL_POSITION = Dimensions.get('window').width/6
        Animated.parallel([Animated.timing(this.apos, {
            toValue: FINAL_POSITION-aYPosition-50
        }),
        Animated.timing(this.so,{
            toValue:0
        }),
        Animated.timing(this.to,{
            toValue:0
        })]).start(()=>this.props.navigation.navigate('AlumniRegistration',{userId:this.state.userId}))
    }
    render() {
    return(
        <View style={styles.container}>
            <View style = {{flexDirection:'row',marginTop:20}}>
                <Animated.View onLayout={event => {const { y } = event.nativeEvent.layout;this.setState({sYPosition: y})}} style = {{borderWidth:4,borderColor:'black',alignItems:'center',marginRight:20,paddingTop:10,backgroundColor:this.state.sbg,opacity:this.so,transform: [{translateX: this.spos}]}}>
                    <TouchableOpacity onPress = {()=>this.spress()}>
                        <ImageBackground style = {{width:Dimensions.get('window').width/3,height:Dimensions.get('window').width/3}} resizeMode = 'stretch' source = {require('../../assets/learning.png')}/>
                    </TouchableOpacity>
                    <Text style = {{fontWeight:'bold',color:this.state.st}}>Student</Text>
                </Animated.View>
                <Animated.View onLayout={event => {const { y } = event.nativeEvent.layout;this.setState({pYPosition: y})}} style = {{borderWidth:4,borderColor:'black',alignItems:'center',paddingTop:10,backgroundColor:this.state.pbg,opacity:this.to,transform: [{translateX: this.tpos}]}}>
                    <TouchableOpacity onPress = {()=>this.ppress()}>
                        <ImageBackground style = {{width:Dimensions.get('window').width/3,height:Dimensions.get('window').width/3}} resizeMode = 'stretch' source = {require('../../assets/professor.png')}/>
                    </TouchableOpacity>
                    <Text style = {{fontWeight:'bold',color:this.state.pt}}>Professor</Text>
                </Animated.View>
            </View>
            <Animated.View onLayout={event => {const { y } = event.nativeEvent.layout;this.setState({aYPosition: y})}} style = {{borderWidth:4,borderColor:'black',alignItems:'center',marginTop:30,opacity:this.ao,paddingTop:10,backgroundColor:this.state.abg,transform: [{translateY: this.apos}]}}>
                    <TouchableOpacity onPress = {()=>this.apress()}>
                        <ImageBackground style = {{width:Dimensions.get('window').width/3,height:Dimensions.get('window').width/3}} resizeMode = 'stretch' source = {require('../../assets/education.png')}/>
                    </TouchableOpacity>
                    <Text style = {{fontWeight:'bold',color:this.state.at}}>Alumni</Text>
            </Animated.View>
            <TouchableOpacity onPress={()=>{this.nextpress()}} style={{alignSelf:'center',bottom:0,position:'absolute'}}>
                    <View style = {{backgroundColor: Colors.primary, justifyContent: 'center', alignItems: 'center',width:Dimensions.get('window').width,height:60 }}>
                        <Text style= {{textAlign:'center',fontSize:26,fontWeight:'bold',color:'white'}}>Next</Text>
                    </View>
            </TouchableOpacity>

        </View>
    );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems:'center',
        backgroundColor:'#fff'
    },
    question: {
        fontSize: 25,
        marginVertical: 30,
    },
    view: {
        flexDirection: 'row', 
        alignItems:'center',
        justifyContent:'space-around', 
        width:'100%',
        paddingVertical: 30,
        paddingHorizontal:40
    },
    touchableOpacity: {
        borderColor: 'black', borderWidth:2, width: 24, height: 24, borderRadius: 12
    },
    imagetext:{
        alignSelf:'center',
        position:'absolute',
        bottom:0,
        backgroundColor:'#fff',
        color:'#000',
        fontWeight:'bold',
        fontSize:16
    },
    text: {
        fontSize: 18, borderColor: 'black', borderWidth:2, borderRadius:15
    }
});
