import React from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { Ionicons, MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons'

const PostScreen = props => {
    return (
        <View style={styles.searchBar} >
            <TextInput
                style={styles.searchInputStyle}
                placeholder="Search #music #party #travel"
                onChangeText={text => console.log(text)}
                onEndEditing={() => console.log("edit end")}
            ></TextInput>
            <FontAwesome name="search" style={styles.searchIconStyle} />

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
    searchBar: {
        height: 40,
        backgroundColor: 'gainsboro',
        borderRadius: 10,
        flexDirection: 'row',
        marginHorizontal: 7,
        marginTop: 10
    },
    searchInputStyle: {
        fontSize: 18,
        fontWeight: '300',
        paddingHorizontal: 10
    },
    searchIconStyle: {
        fontSize: 25,
        flex: 1,
        textAlign: 'right',
        alignSelf: 'center',
        marginHorizontal: 10
    }
})

export default PostScreen;