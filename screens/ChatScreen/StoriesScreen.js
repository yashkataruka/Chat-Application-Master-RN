import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import UserStories from "../../components/UserStories";

//random Samples
const img1 = "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"
const img2 = "https://images.unsplash.com/photo-1532910404247-7ee9488d7292?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=282&q=80"
const img3 = "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80"

const StoriesScreen = props => {
    return (
        <View style={styles.coontainer} >
            <UserStories flag="true" image={img1} name="Tara Hussain" stories={[img1, img2, img3, img2, img3, img1]} />
            <UserStories image={img2} name="Himani Malkeshakr" stories={[img1, img2, img3, img2]} />
            <UserStories image={img3} name="Joy S.Rohank" stories={[img1, img2]} />
        </View>
    );
}

StoriesScreen.navigationOptions = navData => {
    return {
        headerStyle: {
            backgroundColor: Colors.primary,
            elevation: 0
        },
        headerTitle: 'Stories',
        headerTitleAlign: 'center',
        headerTintColor: 'white'
    }
}

const styles = StyleSheet.create({
    coontainer: {
        flex: 1,
    }
})

export default StoriesScreen;