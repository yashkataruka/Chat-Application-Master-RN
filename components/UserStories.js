import React from 'react'
import { View, Text, StyleSheet, ImageBackground,Image, ScrollView, Dimensions } from 'react-native'
import { Ionicons } from '@expo/vector-icons';


class UserStories extends React.Component {
  renderStories = () => {
    return this.props.stories.map((img,index) => {
      return (
        <ImageBackground
        key = {index}
          source={{ uri: img.imag }}
          style={styles.story}
        >
             <View style = {{position: 'absolute',bottom:0,marginLeft:5}}>
             {
               img.type=='image'?<Ionicons name = "md-camera" size = {20} color = "white" />:<Ionicons name = "md-videocam" size = {20} color = "white" />
             }
             </View>
        </ImageBackground>
      )
    })
  }
  render() {
    const no = this.props.stories.length
    return (
      <View style={styles.mainView}>
        <View style={styles.upper}>
          <Image
            source={{ uri: this.props.image }}
            style={styles.image}
          />
          <Text style={styles.username}>{this.props.name}</Text>
          <Text style={styles.rightInfo}>date and time | {no}</Text>
        </View>
        <ScrollView
          style={styles.lower}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        >
          {this.renderStories()}

        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  mainView: {
    flexDirection: 'column',
    width:Dimensions.get('screen').width-50,
  },
  upper: {
    flexDirection: 'row',
    alignItems:'center'
  },
  lower: {
    flexDirection: 'row',
  },
  image: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#ccc',
    margin: 10
  },
  username: {
    fontSize: 18,
    fontWeight: "400",
    alignSelf: 'center',
    color: '#525151',
  },
  story: {
    width: 70,
    height: 100,
    marginLeft: 10,
    borderRadius: 10,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5
  },
  rightInfo: {
    alignSelf: 'center',
    flex: 1,
    textAlign: 'right',
    color: '#939292',
    marginHorizontal: 10
  }
})


export default UserStories