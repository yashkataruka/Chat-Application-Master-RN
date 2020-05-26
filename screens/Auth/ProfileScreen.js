import React from 'react';
import { View, Text, StyleSheet, ImageBackground,BackHandler,Alert, Switch, TextInput, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import Colors from '../../constants/Colors';
import Slider from 'react-native-fluid-slider';
import { withOrientation } from 'react-navigation';

export default class ProfileScreen extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            image:null,
            value:18,
            mbg:'#fff',
            wbg:'#fff',
            micon:'#000',
            wicon:'#000',

        }
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
    componentDidMount() {
        console.log(this.props.navigation.state.params.userId)
        this.backHandler = BackHandler.addEventListener(
          "hardwareBackPress",
          this.backAction
        );
      }
    
      componentWillUnmount() {
        this.backHandler.remove();
      }
    onValueChanged = value => this.setState({ value });
    mpress(){
        if(this.state.mbg==Colors.primary){
            this.setState({mbg:'#fff',micon:'#000'})
        }
        else{
            this.setState({
                mbg:Colors.primary,
                micon:'#fff',
                wbg:'#fff',
                wicon:'#000',
            })
        }
    }
    wpress(){
        if(this.state.wbg==Colors.primary){
            this.setState({wbg:'#fff',wicon:'#000'})
        }
        else{
            this.setState({
                wbg:Colors.primary,
                wicon:'#fff',
                mbg:'#fff',
                micon:'#000',
                
            })
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
    return( 
            <View style={styles.innerContainer}>
                <View style={styles.imageContainer}>
                    <ImageBackground style={styles.imageBackground} imageStyle={styles.image} 
                    source={{uri:this.state.image}}>
                        <TouchableOpacity onPress={()=>this._pickImage()}>
                            <View style = {{height: 50, width: 50, borderRadius: 25, backgroundColor: Colors.primary, justifyContent: 'center', alignItems: 'center',alignSelf:'flex-end' }}>
                                <Ionicons name = "ios-camera" size = {27} color = "white" />
                            </View>
                        </TouchableOpacity>
                    </ImageBackground>  
                </View>
                <View style = {{flexDirection:'row',marginTop:20,alignItems:'center',justifyContent:'center'}}>
                    <TextInput  placeholder="Name" style={{borderBottomWidth:1,borderColor:'#000',fontSize:18,paddingLeft:10,width:'50%',marginRight:10}}/>
                    <Ionicons size = {30} name = "md-create" color = {Colors.primary}/>
                </View>
                <View style={styles.sliderContainer}>
                    <View style = {{borderRadius:50,width:100,height:100,alignSelf:'center',borderColor:Colors.primary,borderWidth:3}}>
                    <Text style={styles.valueText}>
                        {this.state.value.toFixed()}
                    </Text>
                    <Text style = {{textAlign:'center'}}>Age</Text>
                    </View>
                    <Slider
                            style = {{height:40}}
                            minimumValue = {18}
                            maximumValue = {80}
                            minimumTrackTintColor = {Colors.primary}
                            maximumTrackTintColor = {Colors.primary}
                            thumbTintColor ={Colors.primary}
                            value={this.state.value}
                            onValueChange={value => this.setState({ value })}
                            onSlidingComplete={(value) => { console.warn('Sliding Complete with value: ', value) }}
                    />
                </View>
                <View style={styles.genderContainer}>
                    <TouchableOpacity onPress = {()=> this.mpress()}>
                        <View style = {{width:60,borderWidth:2,marginRight:'10%',padding:10,backgroundColor:this.state.mbg}}>
                            <Ionicons name = 'md-man' size = {50} color = {this.state.micon}  style = {{alignSelf:'center'}}/>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress = {()=> this.wpress()}>
                        <View style = {{borderWidth:2,padding:10,width:60,backgroundColor:this.state.wbg}}>
                            <Ionicons name = 'md-woman' color = {this.state.wicon} size = {50} style = {{alignSelf:'center'}}/>
                        </View>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={()=>{this.props.navigation.navigate('Profession')}} style={{alignSelf:'center',bottom:0,position:'absolute'}}>
                    <View style = {{backgroundColor: Colors.primary, justifyContent: 'center', alignItems: 'center',width:Dimensions.get('window').width,height:60 }}>
                        <Text style= {{textAlign:'center',fontSize:26,fontWeight:'bold',color:'white'}}>Next</Text>
                    </View>
                </TouchableOpacity>
            </View>
    );
    }
}
ProfileScreen.navigationOptions = navData => {
    return{
        headerLeft: () => null
}
}
const styles = StyleSheet.create({

    innerContainer: {
        alignItems: 'center',
        flex:1,
        backgroundColor:'#fff'
    },
    imageContainer: {
        width: 150, 
        height: 150,
        alignItems:'center',
        marginTop: 20,
        alignSelf:'center'
    },
    imageBackground: {
        width: 150,
        height: 150,
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        padding: 10
    },
    sliderContainer: {
        width: '80%',
        marginVertical:'10%'
      },
    valueText: {
        fontSize: 40,
        textAlign: 'center',
        margin: 5,
        color: Colors.primary,
      },
    image: {
        width:  150,
        height: 150,
        borderRadius: 75,
        borderWidth:4,
        backgroundColor:'#c4def2',
        borderColor:Colors.primary
    },

    genderContainer: {
        flexDirection: 'row',
        marginTop:30,
        marginBottom:30
    },
});
