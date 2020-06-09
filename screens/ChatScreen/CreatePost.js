import React from 'react'
import { View, Text, Button, Image, StyleSheet, TextInput, Picker, ScrollView } from 'react-native'
import * as ImagePicker from "expo-image-picker"
import { Ionicons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Video } from 'expo-av'
import Modal from 'react-native-modal'
import axios from 'axios'

class CreatePost extends React.Component {
  state = {
    content: null,
    selectedTags: null,
    selectedCategory: null,
    visible: false
  }
  componentDidMount() {
    this.props.navigation.setParams({
      handleSubmit: this.handleSubmit,
    });
  }
  

  pickImage = async () => {
    try {
      let options = {
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        // base64:true
      }

      let result = await ImagePicker.launchImageLibraryAsync(options)
      if (!result.cancelled) {
        this.setState({ content: result })
      }
      // console.log("image result picked:", this.state.content)
    } catch (E) {
      console.log("error in picking image:", E)
    }
  }

  pickVideo = async () => {
    try {
      let options = {
        mediaTypes: ImagePicker.MediaTypeOptions.Videos,
        allowsEditing: true,
        quality: 1
      }
      let result = await ImagePicker.launchImageLibraryAsync(options)
      if (!result.cancelled) {
        result.type = "video";
        this.setState({ content: result })
      }
      // console.log("video result picked:", this.state.content)
    } catch (E) {
      console.log("error in picking image:", E)
    }
  }

  renderContent = () => {
    if (this.state.content) {
      if (this.state.content.type == "image") {
        return (
          <Image
            style={styles.contentImage}
            source={{ uri: this.state.content.uri }} />
        )
      } else if (this.state.content.type == "video") {
        return (
          <Video
            ref={ref => { this.video = ref }}
            source={{ uri: this.state.content.uri }}
            rate={1.0}
            volume={1.0}
            isMuted={true}
            resizeMode="cover"
            shouldPlay={true}
            isLooping
            style={{ width: '100%', height: '100%' }}
            useNativeControls
          />
        )
      } 
    }
    else {
        return(
        <Text style={{fontSize:25,fontWeight:'900'}}>What's there in your mind??</Text>
        )
      }
  }

  createFormData = (response) => {
    const photo = {
      uri: response.uri,
      type: response.type,
      name: "my-img.jpg",
    };
    const form = new FormData();
    // form.append('title', "this is title")
    // form.append("description", "this is description")
    // form.append("eventType","LOST & FOUND")
    form.append('acivityFile',photo);
    return form;
  };
  handleSubmit = async () => {
    // if (this.state.content) {
    //   const config = {
    //     method: 'POST',
    //     headers: {
    //       'Accept': 'application/json',
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({
    //       title: "The latest Post by Anshika5",
    //       description: "This is a description",
    //       eventType: "LOST & FOUND",
    //       file: this.createFormData(this.state.content)
    //     }),
    //   };
    //   fetch("http://5d55f2973399.ngrok.io/activities", config)
    //     .then((checkStatusAndGetJSONResponse) => {
    //     })
    //     .catch((err) => { console.log(err) });
    // }
    
    if (this.state.content) {
      const formData = this.createFormData(this.state.content)
      console.log("form data:", formData)
      try {
        const res = await axios.post('http://393ad751391b.ngrok.io/activities',
          {
          title: "The latest Post by Anshika90",
          description: "This is a description",
          eventType: "LOST & FOUND",
          file: formData
        },
          {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'multipart/form-data'
            },
          },
        )
        console.log("res:", res.data);
      } catch (err) {
        console.log("err in post axios:",err)
      }
    }
  }
  render() {
    console.log("content picked:", this.state.content)
    
    const { profileImage, name } = this.props.navigation.state.params
    return (
      <View style={styles.main}>
        <Modal
          isVisible={this.state.visible}
          onBackButtonPress={() => this.setState({ visible: false })}
        >
          <View style={{ height: 100, width: '80%' }}>
            <Text style={{ fontSize: 25, fontWeight: '900' }}>Posted successfully</Text>
            <TouchableOpacity onPress={() => this.setState({ visible: 'false' })}>
              <Text style={{ top: '100%', left: '100%', margin: 10, color: 'red', fontWeight: 'bold' }}>OK</Text>
            </TouchableOpacity>
          </View>
        </Modal>
        <View style={styles.upper}>
          <Image style={styles.profileImage} source={{ uri: profileImage }} />
          <View style={styles.upperRight}>
            <Text style={styles.username}>{name}</Text>
            <View style={{ flexDirection: 'row' }}>
              <View style={{ ...styles.pickerParent, width: '40%' }}>
                <Picker
                  selectedValue={this.state.selectedTags}
                  style={styles.picker}
                  onValueChange={(itemValue, itemIndex) => this.setState({ selectedTags: itemValue })}
                >
                  <Picker.Item label="#tag1" value="#tag1" mode="dropdown" />
                  <Picker.Item label="#tag2" value="#tag2" mode="dropdown" />
                </Picker>
              </View>
              <View style={{ ...styles.pickerParent, width: '60%' }}>
                <Picker
                  selectedValue={this.state.selectedCategory}
                  style={styles.picker}
                  onValueChange={(itemValue, itemIndex) => this.setState({ selectedCategory: itemValue })}
                >
                  <Picker.Item label="Category 1" value="Category 1" mode="dropdown" />
                  <Picker.Item label="Category 2" value="Category 2" mode="dropdown" />
                </Picker>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.middle}>
          {this.renderContent()}
        </View>
        <View style={styles.horizontalBar}></View>
        <ScrollView style={styles.lower}>
          <TouchableOpacity onPress={() => this.pickImage()}>
            <View style={styles.list}>
              <Ionicons style={styles.icons} name="md-image" />
              <Text>Add a photo</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.pickVideo()}>
            <View style={styles.list}>
              <Ionicons style={styles.icons} name="md-videocam" />
              <Text>Take a video</Text>
            </View>
          </TouchableOpacity>
          <View style={styles.list}>
            <Ionicons style={styles.icons} name="md-medal" />
            <Text>Celebrate an occasion</Text>
          </View>
          <View style={styles.list}>
            <Ionicons style={styles.icons} name="md-document" />
            <Text>Add a document</Text>
          </View>
          <View style={styles.list}>
            <MaterialCommunityIcons style={styles.icons} name="poll-box" />
            <Text>Add a poll and get vote</Text>
          </View>
          <View style={styles.list}>
            <FontAwesome5 style={{ ...styles.icons, fontSize: 15 }} name="money-check" />
            <Text>Sell something</Text>
          </View>
          <View style={styles.list}>
            <MaterialCommunityIcons style={styles.icons} name="comment-text-outline" />
            <Text>Ask for recommendations</Text>
          </View>
        </ScrollView >
      </View >
    )
  }
}

CreatePost.navigationOptions = (nav) => {
  return {
    headerTitle: "Create Post",
    headerTitleAlign: 'center',
    headerTintColor: 'white',
    headerStyle: {
      backgroundColor: Colors.primary,
      elevation: 0
    },
    headerRight: () => {
      return (
        <TouchableOpacity onPress={() => nav.navigation.state.params.handleSubmit()}>
          <Text style={{color:'white',fontWeight:'bold',marginHorizontal:10,fontSize:15}}>POST</Text>
        </TouchableOpacity>
      )
    }
  }
}

const styles = StyleSheet.create({
  main: {
    flexDirection: 'column',
    flex: 1,
    backgroundColor:'white'
  },
  upper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    // elevation: 2,
    paddingVertical: 5,
    paddingHorizontal: 2
  },
  upperRight: {
    flexDirection: 'column',
    paddingHorizontal: 10,
    flex: 1
  },
  profileImage: {
    height: 50,
    width: 50,
    borderRadius: 25
  },
  username: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  picker: {
    height: 30,
    width: '100%',
    borderWidth: 1
  },
  pickerParent: {
    borderWidth: 1,
    margin: 2,
    borderRadius: 10
  },
  middle: {
    height: 200,
    backgroundColor: 'white',
    elevation: 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 10,
    borderColor:'#DADCDC'
    // marginVertical: 5
  },
  lower: {
    backgroundColor: 'white',
    flex: 1,
    paddingHorizontal: 5
  },
  list: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    paddingVertical: 5,
    height: 40,
    alignItems: 'center',
    borderColor: '#DADCDC'
  },
  icons: {
    width: 40,
    textAlign: 'center',
    fontSize: 20
  },
  contentImage: {
    height: '100%',
    width: '100%'
  },
  horizontalBar: {
    width: 100,
    height: 4,
    backgroundColor: "grey",
    alignSelf: 'center',
    marginVertical: 5,
    borderRadius:10
  }

})

export default CreatePost