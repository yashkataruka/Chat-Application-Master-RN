import React from 'react'
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native'
import { Divider } from 'react-native-paper'
import { MaterialIcons } from '@expo/vector-icons'

const img = "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"

const settings = [
  {
    iconname: "vpn-key",
    title: "Account",
    subtitle: "Privacy, security, change number"
  },
  {
    iconname: "message",
    title: "Chats",
    subtitle: "Theme, wallpapers, chat history"
  },
  {
    iconname: "notifications",
    title: "Notifications",
    subtitle: "Message, group & call tones"
  },
  {
    iconname: "data-usage",
    title: "Data and storage usage",
    subtitle: "Network usage, auto-download"
  },
  {
    iconname: "help-outline",
    title: "Help",
    subtitle: "FAQ,contact us, privacy policy"
  },
]
class SettingScreen extends React.Component {

  renderSettings = ({ iconname, title, subtitle }) => {
    return (
      <View style={styles.list}>
        <MaterialIcons name={iconname} style={styles.icons} />
        <View>
          <Text style={styles.title}>{title}</Text>
          {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
        </View>
      </View>
    )
  }
  render() {
    return (
      <View style={styles.main}>
        <View style={styles.upper}>
          <Image source={{ uri: img }} style={styles.profileImage}></Image>
          <View style={{ flexDirection: 'column', paddingHorizontal: 10 }}>
            <Text style={styles.username}>Ravi Hussain Malik</Text>
            <Text style={styles.tagline}>Your tagline here</Text>
          </View>
        </View>
        <Divider />
        <ScrollView style={{ flex: 1 }}>
          {settings.map(setting => {
            return (this.renderSettings(setting))
          })}
          <Divider />
          {this.renderSettings({
            iconname: "people",
            title: "Invite a friend",
            subtitle: null
          })}
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    flexDirection: 'column'
  },
  upper: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20
  },
  profileImage: {
    height: 60,
    width: 60,
    borderRadius: 30
  },
  username: {
    fontSize: 20,
    fontWeight: 'bold',

  },
  tagline: {
    fontSize: 15,
    fontWeight: '600',
    color: 'grey'
  },
  list: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 15
  },
  icons: {
    fontSize: 20,
    marginHorizontal: 20,
    color: Colors.primary
  },
  title: {
    fontSize: 18
  },
  subtitle: {
    color: 'grey'
  }
})

SettingScreen.navigationOptions = navData => {
  return {
    headerStyle: {
      backgroundColor: Colors.primary,
      elevation: 0
    },
    headerTitle: 'Settings',
    headerTitleAlign: 'center',
    headerTintColor: 'white',

  }
}

export default SettingScreen