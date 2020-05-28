import React from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'

class Comments extends React.Component {

  //props={profileImage,username,comment,likes,time}
  render() {
    return (
      <View style={styles.main}>
        <Image source={{ uri: this.props.data.profileImage }} style={styles.profileImage} />
        <View style={styles.commentBack}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.username}>{this.props.data.username}</Text>
            <Text style={styles.time}>{this.props.data.time}</Text>
          </View>
          <Text style={styles.comment}>{this.props.data.comments}</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main: {
    flexDirection: 'row',
    marginHorizontal: 5,
    marginVertical: 10
  },
  profileImage: {
    height: 40,
    width: 40,
    borderRadius: 20
  },
  commentBack: {
    flex: 1,
    backgroundColor: '#E9F1F6',
    marginHorizontal: 5,
    padding: 10,
    borderRadius: 5,
    // elevation: 2
  },
  username: {
    fontWeight: 'bold',
    color: '#375F7B',
    borderRightWidth: 1,
    paddingRight: 5,
    borderColor: 'grey'
  },
  time: {
    color: 'grey',
    marginHorizontal: 5
  },
  comment: {
    marginTop: 10,
    // fontWeight: 'bold'
  }
})
export default Comments