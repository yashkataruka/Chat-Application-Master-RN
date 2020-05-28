import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Animated, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialCommunityIcons, FontAwesome, Feather } from '@expo/vector-icons'
import Post from "../../components/Post"
import { ScrollView } from 'react-native-gesture-handler';
import Modal from 'react-native-modal'
import Polls from "../../components/Polls"


const img = "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"
const img2 = "https://images.unsplash.com/photo-1532910404247-7ee9488d7292?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=282&q=80"
const img3 = "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80"
const video = "http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4"
const posts = [{
    name: 'Ravi Hussain',
    time: '30 minutes ago',
    type: "Image",
    image: [img, img2, img3],
    profile: img,
    responded: [
        img,
        img,
        img,
        img
    ],
    likes: 10,
    tags: ['#travel', '#music']
},
{
    name: 'Ravi Hussain',
    time: '30 minutes ago',
    type: "Polls",
    question: 'What do you think about new policy?',
    options: ["Makes sense", "I hate it", 'I love it', 'It doesnt make difference'],
    votes: [10, 2, 15, 9],
    profile: img,
    responded: [
        img,
        img,
        img,
        img
    ],
    likes: 10,
    tags: ['#travel', '#music']
},
{
    name: 'Ravi Hussain',
    time: '30 minutes ago',
    type: "Video",
    video: video,
    profile: img,
    responded: [
        img,
        img,
        img,
        img
    ],
    likes: 10,
    tags: ['#travel', '#music']
},
{
    name: 'Ravi Hussain',
    time: '30 minutes ago',
    type: "Text",
    profile: img,
    responded: [
        img,
        img,
        img,
        img
    ],
    likes: 10,
    tags: ['#travel', '#music']
}
];


const setAnimation = enable => {
    Animated.timing(this.state.height, {
        duration: 400,
        toValue: enable ? 64 : 0
    }).start()
};

class PostScreen extends React.Component {
    state = {
        enable: false,
        size: 30,
        visible: false,
    }

    // componentDidUpdate() {
    //     Animated.timing(this.state.size, {
    //         duration: 0,
    //         toValue: this.state.enable ? 0 : 40
    //     }).start()
    // }

    navigate = (screen, data) => {
        this.props.navigation.navigate(screen, { data: data })
    }

    handleScroll(enable) {
        console.log("called:", enable)
        Animated.timing(this.state.size, {
            duration: 100,
            toValue: (enable) ? 0 : 40
        })
    }
    render() {
        console.log(this.state)
        return (
            <View style={{ flex: 1 }}>
                <Modal
                    isVisible={this.state.visible}
                    onBackButtonPress={() => this.setState({ visible: false })}
                    onSwipeComplete={() => this.setState({ visible: false })}
                    animationIn="slideInUp"
                    animationInTiming={2000}
                    swipeDirection={['down']}
                    style={{ margin: 0 }}
                >
                    <View style={{
                        height: '80%',
                        width: '100%',
                        backgroundColor: 'white',
                        position: 'absolute',
                        top: '20%',
                        borderTopLeftRadius: 10,
                        borderTopRightRadius: 10
                    }}>
                        <Text>This is modal</Text>

                    </View>
                </Modal>
                <View style={styles.searchBar} >
                    <TextInput
                        style={styles.searchInputStyle}
                        placeholder="Search #music #party #travel"
                        onChangeText={text => console.log(text)}
                        onEndEditing={() => console.log("edit end")}
                    ></TextInput>
                    <View style={styles.searchIconBack}>
                        <FontAwesome name="search" style={styles.searchIconStyle} onPress={() => this.setState({ visible: true })} />
                    </View>

                </View>
                <ScrollView>
                    {posts.map(post => <Post data={post} navigate={this.navigate} onComment={() => this.navigate("SinglePostScreen", post)} />)}
                    {posts.map(post => <Post data={post} navigate={this.navigate} onComment={() => this.navigate("SinglePostScreen", post)} />)}
                    <View style={{ height: 70 }}></View>
                </ScrollView>
                <View style={{ justifyContent: 'flex-end', }} >
                    <Feather
                        name="plus"
                        style={{
                            elevation: 5,
                            fontSize: this.state.size,
                            fontWeight: 'bold',
                            right: 10, bottom: 10,
                            position: 'absolute',
                            alignSelf: 'flex-end',
                            color: 'white',
                            backgroundColor: 'red',
                            borderRadius: 30,
                            padding: 10
                        }}
                        onPress={() => console.log(this.props.navigation.navigate("CreatePost", {
                            name: "Ravi Hussain",
                            profileImage: img
                        }))}
                    />
                </View>
            </View >
        );
    }
}

PostScreen.navigationOptions = navData => {
    return {
        headerStyle: {
            backgroundColor: Colors.primary,
            elevation: 0
        },
        headerTitle: 'Post',
        headerTitleAlign: 'center',
        headerTintColor: 'white',
        headerRight: (e) => {
            return (
                <TouchableOpacity onPress={() => console.log(navData.navigation.navigate("SettingScreen"))}>
                    <Ionicons name="md-settings" size={25} color='white' style={{ marginRight: 20 }} />
                </TouchableOpacity>
            )
        }

    }
}

const styles = StyleSheet.create({
    searchBar: {
        height: 50,
        // backgroundColor: 'gainsboro',
        // borderRadius: 10,
        flexDirection: 'row',
        // marginHorizontal: 7,
        // marginVertical: 2,
        // borderWidth: 3,
        // borderColor: '#203A94',
        borderTopWidth: 0,
        backgroundColor: 'white',
        elevation: 5,
    },
    searchInputStyle: {
        fontSize: 18,
        fontWeight: '300',
        paddingHorizontal: 10,
        flex: 3
    },
    searchIconStyle: {
        fontSize: 25,
        marginHorizontal: 10,
        color: "#203A94",
        alignSelf: 'center',
        color: 'white',
        paddingHorizontal: 2
    },
    searchIconBack: {
        flexDirection: 'row',
        backgroundColor: '#18617E'
    }
})

export default PostScreen;