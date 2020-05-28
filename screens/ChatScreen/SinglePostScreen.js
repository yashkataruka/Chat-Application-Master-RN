import React from 'react'
import { View, Text, ScrollView, StyleSheet, TextInput, ColorPropType } from 'react-native'
import Post from "../../components/Post"
import Comments from "../../components/Comments"
import { ThemeColors } from 'react-navigation';
import { Colors } from 'react-native/Libraries/NewAppScreen';

class SinglePostScreen extends React.Component {
  state = {
    comment: "",
    height: 60
  }

  render() {
    const data = this.props.navigation.state.params.data;
    // console.log("data:", data)
    const commentData = {
      username: "Raghav Mahindra",
      profileImage: data.profile,
      comments: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      time: '30 minutes',
      likes: 20
    }
    return (
      <View style={{ flex: 1 }}>
        <ScrollView style={{ backgroundColor: 'white' }}>
          <Post data={data} onComment={() => console.log("open text input to write comments")} type="complete" />
          <Text style={styles.comments}>10 Comments</Text>
          <Comments data={commentData} />
          <Comments data={commentData} />
          <Comments data={commentData} />
          <Comments data={commentData} />
        </ScrollView>
        <View style={styles.postBack}>
          <TextInput
            style={{ ...styles.textInput, height: this.state.height }}
            placeholder="Leave your thoughts here..."
            placeholderTextColor='grey'
            onChangeText={(text) => {
              this.setState({ comment: text });
            }}
            onContentSizeChange={(event) => {
              console.log("called")
              this.setState({ height: 30 + event.nativeEvent.contentSize.height })
            }}
            multiline={true}
          />
          <Text style={styles.post}>POST</Text>
        </View>
      </View>
    )
  }
}

SinglePostScreen.navigationOptions = () => {
  return {
    headerStyle: {
      backgroundColor: Colors.primary,
      elevation: 0
    },
    headerTitle: '',
    headerTintColor: 'white',

  }
}


const styles = StyleSheet.create({
  comments: {
    paddingVertical: 5,
    borderBottomWidth: 1,
    marginHorizontal: 10,
    color: 'grey',
    borderColor: '#D9D9DA'
  },
  textInput: {
    height: 60,
    color: 'black',
    paddingHorizontal: 10,
    flex: 5
  },
  post: {
    flex: 1,
    alignSelf: 'center',
    color: Colors.primary,
    fontSize: 15,
    fontWeight: 'bold'
  },
  postBack: {
    flexDirection: 'row',
    backgroundColor: 'white',
    elevation: 5,
    borderTopWidth: 1,
    borderColor: '#D9D9DA',
  }
})

export default SinglePostScreen