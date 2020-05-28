import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

class TextPost extends Component {
  text = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
  renderShortText = () => {
    return this.text.split(' ').slice(0, 50).join(' ')
  }
  render() {
    console.log("text navigation:", this.props.navigate)
    return (
      <ScrollView style={styles.main}>
        <Text
          style={{ ...styles.text, height: (this.props.type == "short") ? 250 : '100%' }}>
          {this.props.type == "short" && this.renderShortText()
          }
          {this.props.type == "complete" && this.text}
          {this.props.type == "short" && <Text style={{ color: 'grey', fontWeight: 'bold' }} onPress={() => console.log("clicked", this.props.navigate("SinglePostScreen", this.props.data))}> ...more</Text>}

        </Text>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  main: {
    width: '100%',
    padding: 10,
    marginTop: 10
  },
  text: {
    fontSize: 18,
    fontStyle: "italic",
    // fontVariant: "proportional-nums"
  }
})

export default TextPost