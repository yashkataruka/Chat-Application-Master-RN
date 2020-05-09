import React from 'react';
import UserStories from "../../components/UserStories";
import { View, Text, StyleSheet,ScrollView,ImageBackground } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
const images = [
    {   
        name:'Ashish',
        uri:["https://images.unsplash.com/photo-1556740749-887f6717d7e4",
             "https://images.unsplash.com/photo-1556740749-887f6717d7e4"]
    },
    {
        name:'Aaron',
        uri:["https://images.unsplash.com/photo-1556740749-887f6717d7e4",
            "https://images.unsplash.com/photo-1556740749-887f6717d7e4"]
    },
    {
        name:'Ronaldo',
        uri:["https://images.unsplash.com/photo-1556740749-887f6717d7e4",
            "https://images.unsplash.com/photo-1556740749-887f6717d7e4"]
    },
    {
        name:'Messi',
        uri:["https://images.unsplash.com/photo-1556740749-887f6717d7e4",
            "https://images.unsplash.com/photo-1556740749-887f6717d7e4"]
    },
  ];

//random Samples
const img1 = "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"
const img2 = "https://images.unsplash.com/photo-1532910404247-7ee9488d7292?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=282&q=80"
const img3 = "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80"

const StoriesScreen = props => {
    return (
        <ScrollView showsVerticalScrollIndicator={false}>
        <View style = {styles.coontainer} >
            <View style = {styles.addStory}>
                <TouchableOpacity>
                    <View style = {styles.addStoryBox}>
                        <Ionicons name = "md-add" size = {34} color = 'grey'/>
                    </View>
                </TouchableOpacity>
                <View style = {{marginLeft:15}}>
                    <Text style = {{fontSize:16,fontWeight:'bold',marginBottom:10}}>My Story</Text>
                    <Text>Add to my Story</Text>
                </View>
            </View>
            <View style = {{marginTop:30}}>
                <Text style = {{fontSize:14,fontWeight:'700',color:'grey'}}>
                    RECENT STORIES
                </Text>
                <View style = {{marginTop:10}}>
                {images.map((image, imageIndex) => {
            return ( //<Userstories/> here
              <View style = {{marginVertical:10}}
                key={imageIndex}
              > 
                
                <View style = {{flexDirection:'row'}}>
                <ImageBackground source={{ uri: image.uri[0] }} style={styles.card}>
                  <View style={styles.textContainer}>
                    <Text style={styles.infoText}>
                      {image.name}
                    </Text>
                  </View>
                </ImageBackground>
                </View>
              </View>
            );
          })}  
                </View>
            </View>
            <View style = {{marginTop:30}}>
                <Text style = {{fontSize:14,fontWeight:'700',color:'grey'}}>
                    VIEWED STORIES
                </Text>
                <View style = {{marginTop:10}}>
                {images.map((image, imageIndex) => {
            return (
                //<Userstories/> here 
              <View style = {{marginVertical:10}}
                key={imageIndex}
              > 
                <View style = {{flexDirection:'row'}}>
                <ImageBackground source={{ uri: image.uri[0] }} style={styles.card}>
                  <View style={styles.textContainer}>
                    <Text style={styles.infoText}>
                      {image.name}
                    </Text>
                  </View>
                </ImageBackground>
                </View>
              </View>
            );
          })}  
                </View>
            </View>
        
        </View>
        </ScrollView>
    );
}

StoriesScreen.navigationOptions = navData => {
    return {
        headerStyle: {
            backgroundColor: Colors.primary,
            elevation: 0
        },
        headerTitle: 'Stories',
        headerTitleAlign: 'center',
        headerTintColor: 'white',
    }
}

const styles = StyleSheet.create({
    coontainer: {
        flex: 1,
        flexDirection:'column',
        alignItems: 'flex-start',
        paddingLeft:30,
        paddingTop:30,
    },
    addStory:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center'

    },
    addStoryBox:{
        width:80,
        height:110,
        borderWidth:0.8,
        borderRadius:5,
        justifyContent:'center',
        alignItems:'center',
        borderColor:'grey'
    },
    card: {
        flex: 1,
        marginVertical: 4,
        borderRadius: 5,
        overflow: "hidden",
        alignItems: "center",
        justifyContent: "center"
      },
      textContainer: {
        backgroundColor: "rgba(0,0,0, 0.7)",
        paddingHorizontal: 24,
        paddingVertical: 8,
        borderRadius: 5
      },
      infoText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold"
      },
})

export default StoriesScreen;