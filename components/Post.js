import React, { Component } from 'react'
import { Text, View, StyleSheet, Image, Dimensions } from 'react-native'
import { AntDesign, Feather, FontAwesome } from '@expo/vector-icons'
import PostImage from "./image"
import Polls from './Polls'
import VideoPost from "./VideoPost"
import TextPost from './TextPost'

class Post extends Component {

  renderContent = () => {
    switch (this.props.data.type) {
      case "Image":
        return <PostImage image={this.props.data.image} />
      case "Polls":
        return <Polls
          question={this.props.data.question}
          options={this.props.data.options}
          votes={this.props.data.votes}
        />
      case "Video":
        return <VideoPost video={this.props.data.video} />
      case "Text":
        if (this.props.type == "complete") {
          return <TextPost type="complete" data={this.props.data} navigate={this.props.navigate} />
        } else {
          return <TextPost type="short" data={this.props.data} navigate={this.props.navigate} />
        }
    }
  }
  render() {
    console.log("navigate recieved:", this.props.navigate)
    return (
      <View style={styles.main}>
        <View style={styles.upperRow}>
          <Image source={{ uri: this.props.data.profile }} style={styles.profileImage}></Image>
          <View style={{ flexDirection: 'column', alignSelf: 'center' }}>
            <Text style={styles.nameStyle}>{this.props.data.name}</Text>
            <Text style={styles.timeStyle}>{this.props.data.time}</Text>
          </View>
        </View>
        {this.renderContent()}
        <View style={styles.lowerRow}>

          <View style={{ flexDirection: 'row', width: 70 }}>
            {this.props.data.responded.map((img, index) => {
              console.log(img, index)
              if (index == 0) {
                return <Image source={{ uri: img }} style={styles.respondedStyle}></Image>
              } else if (0 < index && index < 3) {
                return <Image source={{ uri: img }} style={{ ...styles.respondedStyle, left: 20 * index }}></Image>
              } else {
                return null
              }
            })}
          </View>

          <Text style={styles.likeStyle}>+{this.props.data.likes} likes</Text>
          <View style={{ marginHorizontal: 10, flexDirection: 'row', flex: 1, justifyContent: 'flex-end', alignSelf: 'center' }}>
            <AntDesign style={styles.likeIconStyle} name="like1" />
            <AntDesign style={styles.likeIconStyle} name="dislike1" />
            <FontAwesome
              style={styles.likeIconStyle}

              name="comment-o" onPress={() => this.props.onComment()} />
            <Feather style={styles.likeIconStyle} name="share-2" />

          </View>
        </View>
      </View >
    )
  }
}

const styles = StyleSheet.create({
  main: {
    flexDirection: "column",
    marginBottom: 20,
    backgroundColor: 'white',
    elevation: 5
  },
  upperRow: {
    flexDirection: "row",
    backgroundColor: '#E9E9E9',
    paddingVertical: 10
  },
  lowerRow: {
    flexDirection: "row",
    height: 45,
    paddingHorizontal: 10
  },
  profileImage: {
    height: 42,
    width: 42,
    borderRadius: 21,
    marginHorizontal: 10
  },
  nameStyle: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  timeStyle: {
    fontSize: 13,
    fontWeight: '600',
    color: 'grey'
  },
  respondedStyle: {
    height: 30,
    width: 30,
    borderRadius: 15,
    borderWidth: 3,
    borderColor: 'white',
    alignSelf: 'center',
    position: 'absolute'
  },
  likeStyle: {
    fontSize: 15,
    alignSelf: 'center',
    color: "#929292",
    fontWeight: 'bold'
  },
  likeIconStyle: {
    fontSize: 25,
    marginLeft: 17,
    alignSelf: 'center'
  }
})
export default Post