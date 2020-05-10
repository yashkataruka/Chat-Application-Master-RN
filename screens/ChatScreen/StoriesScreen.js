import React from 'react';
import UserStories from "../../components/UserStories";
import { View, Text, StyleSheet, ScrollView, ImageBackground } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
const images = [
  {
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80",
    name: 'Ashish',
    uri: [{imag:"https://images.unsplash.com/photo-1556740749-887f6717d7e4",
          type:'image'},
      {imag:"https://images.unsplash.com/photo-1556740749-887f6717d7e4",
      type:'video'},
      ]
  },
  {
    name: 'Aaron',
    uri: [{imag:"https://images.unsplash.com/photo-1556740749-887f6717d7e4",
    type:'image'},
{imag:"https://images.unsplash.com/photo-1556740749-887f6717d7e4",
type:'video'},
],
    image: "https://images.unsplash.com/photo-1532910404247-7ee9488d7292?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=282&q=80"
  },
  {
    name: 'Ronaldo',
    uri: [{imag:"https://images.unsplash.com/photo-1556740749-887f6717d7e4",
    type:'image'},
{imag:"https://images.unsplash.com/photo-1556740749-887f6717d7e4",
type:'video'},
{imag:"https://images.unsplash.com/photo-1556740749-887f6717d7e4",
    type:'image'},
{imag:"https://images.unsplash.com/photo-1556740749-887f6717d7e4",
type:'video'},
{imag:"https://images.unsplash.com/photo-1556740749-887f6717d7e4",
    type:'image'},
{imag:"https://images.unsplash.com/photo-1556740749-887f6717d7e4",
type:'video'},],
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80"
  },
  {
    name: 'Messi',
    uri: [{imag:"https://images.unsplash.com/photo-1556740749-887f6717d7e4",
    type:'image'},
{imag:"https://images.unsplash.com/photo-1556740749-887f6717d7e4",
type:'video'},
{imag:"https://images.unsplash.com/photo-1556740749-887f6717d7e4",
    type:'image'},
{imag:"https://images.unsplash.com/photo-1556740749-887f6717d7e4",
type:'video'},],
    image: "https://images.unsplash.com/photo-1556740749-887f6717d7e4"
  },
];


const StoriesScreen = props => {
  return (
    <ScrollView showsVerticalScrollIndicator={true}>
      <View style={styles.coontainer} >
        <View style={styles.addStory}>
          <TouchableOpacity>
            <View style={styles.addStoryBox}>
              <Ionicons name="md-add" size={34} color='grey' />
            </View>
          </TouchableOpacity>
          <View style={{ marginLeft: 15 }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 10 }}>My Story</Text>
            <Text>Add to my Story</Text>
          </View>
        </View>
        <View style={{ marginTop: 30,marginBottom:40 }}>
          <Text style={{ fontSize: 14, fontWeight: '700', color: 'grey' }}>
            RECENT STORIES
          </Text>
          <View style={{ marginTop: 10,paddingRight:40 ,flexDirection:"column"}}>
            {images.map((img, imageIndex) => {
              return ( //<Userstories/> here
                <View style={{ marginVertical: 20}}
                  key={imageIndex}
                >
                <UserStories stories = {img.uri} image = {img.image} name = {img.name}/>
                </View>
              );
            })}
          </View>
        </View>
        <View style={{ marginTop: 30,marginBottom:40 }}>
          <Text style={{ fontSize: 14, fontWeight: '700', color: 'grey' }}>
            VIEWED STORIES
          </Text>
          <View style={{ marginTop: 10,paddingRight:40 }}>
            {images.map((img, imageIndex) => {
              return ( //<Userstories/> here
                <View style={{ marginVertical: 20 }}
                  key={imageIndex}
                >
                <UserStories name={img.name} image = {img.image} stories = {img.uri}/>
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
    flexDirection: 'column',
    alignItems: 'flex-start',
    paddingLeft: 30,
    paddingTop: 30,
  },
  addStory: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'

  },
  addStoryBox: {
    width: 70,
    height: 100,
    borderWidth: 0.8,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'grey'
  },

})

export default StoriesScreen;