import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PostScreen = props => {
    return (
        <View style = {styles.coontainer} >
            <Text>Post Screen</Text>
        </View>
    );
}

PostScreen.navigationOptions = navData => {
    return {
        headerStyle: {
            backgroundColor: Colors.primary,
            elevation: 0
        },
        headerTitle: 'Post',
        headerTitleAlign: 'center',
        headerTintColor: 'white'
    }
}

const styles = StyleSheet.create({
    coontainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default PostScreen;