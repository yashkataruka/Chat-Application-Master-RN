import React from 'react'
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native'



class UserStories extends React.Component {
  renderStories = () => {
    let stories = []
    if (this.props.flag) {
      for (let i = 0; i < 5; i++) {
        stories.push(
          <Image
            source={{ uri: 'https://scontent.fdel21-1.fna.fbcdn.net/v/t31.0-0/p640x640/27500624_1631883743526849_5371185179369120659_o.jpg?_nc_cat=111&_nc_sid=85a577&_nc_ohc=HxC82h-6TjgAX9PHczR&_nc_ht=scontent.fdel21-1.fna&_nc_tp=6&oh=433e35c82605599e6def6a9d1ce587d5&oe=5ED304FC' }}
            style={styles.story}
          />
        )
      }
    } else {
      stories.push(
        <Image
          source={{ uri: 'https://scontent.fdel21-1.fna.fbcdn.net/v/t31.0-0/p640x640/27500624_1631883743526849_5371185179369120659_o.jpg?_nc_cat=111&_nc_sid=85a577&_nc_ohc=HxC82h-6TjgAX9PHczR&_nc_ht=scontent.fdel21-1.fna&_nc_tp=6&oh=433e35c82605599e6def6a9d1ce587d5&oe=5ED304FC' }}
          style={styles.story}
        />
      )
    }
    return stories;
  }
  render() {
    return (
      <View style={styles.mainView}>
        <View style={styles.upper}>
          <Image
            source={{ uri: 'https://scontent.fdel21-1.fna.fbcdn.net/v/t31.0-0/p640x640/27500624_1631883743526849_5371185179369120659_o.jpg?_nc_cat=111&_nc_sid=85a577&_nc_ohc=HxC82h-6TjgAX9PHczR&_nc_ht=scontent.fdel21-1.fna&_nc_tp=6&oh=433e35c82605599e6def6a9d1ce587d5&oe=5ED304FC' }}
            style={styles.image}
          />
          <Text style={styles.username}>Yash Kataruka</Text>
          <Text style={styles.rightInfo}>date and time</Text>
        </View>
        <ScrollView
          style={styles.lower} horizontal={true}
          showsHorizontalScrollIndicator={false}
        // ref={ref => { this.scrollView = ref }}
        // onContentSizeChange={() => this.scrollView.scrollToEnd({ animated: true })}
        >
          <Image
            source={{ uri: 'https://scontent.fdel21-1.fna.fbcdn.net/v/t31.0-0/p640x640/27500624_1631883743526849_5371185179369120659_o.jpg?_nc_cat=111&_nc_sid=85a577&_nc_ohc=HxC82h-6TjgAX9PHczR&_nc_ht=scontent.fdel21-1.fna&_nc_tp=6&oh=433e35c82605599e6def6a9d1ce587d5&oe=5ED304FC' }}
            style={styles.story}
          />

          />
        </ScrollView>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  mainView: {
    flexDirection: 'column'
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
    fontWeight: "bold",
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