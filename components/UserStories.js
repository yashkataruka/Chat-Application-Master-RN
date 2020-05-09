import React from 'react'
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native'



class UserStories extends React.Component {
  renderStories = () => {
    return this.props.stories.map(img => {
      return (
        <Image
          source={{ uri: img }}
          style={styles.story}
        />
      )
    })
  }
  render() {
    return (
      <View style={styles.mainView}>
        <View style={styles.upper}>
          <Image
            source={{ uri: this.props.image }}
            style={styles.image}
          />
          <Text style={styles.username}>{this.props.name}</Text>
          <Text style={styles.rightInfo}>date and time</Text>
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
  },
  upper: {
    flexDirection: 'row',
  },
  lower: {
    flexDirection: 'row'
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