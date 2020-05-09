import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import UserStories from "../../components/UserStories"

const StoriesScreen = props => {
    let img1 = "https://www.google.com/imgres?imgurl=https%3A%2F%2Fwww.adobe.com%2Fcontent%2Fdam%2Fcc%2Fus%2Fen%2Fcreativecloud%2Fphotography%2Fdiscover%2Fportrait-photography%2FCODERED_B1_portrait_photography-P4a_438x447.jpg.img.jpg&imgrefurl=https%3A%2F%2Fwww.adobe.com%2Fcreativecloud%2Fphotography%2Fdiscover%2Fportrait-photography.html&tbnid=rDVnn182Xs7LUM&vet=12ahUKEwj18urO56bpAhUzWHwKHZY1BfUQMygIegUIARCrAg..i&docid=yJ4FxNwCujeqbM&w=438&h=447&q=portrait&ved=2ahUKEwj18urO56bpAhUzWHwKHZY1BfUQMygIegUIARCrAg"
    let img2 = "https://www.google.com/imgres?imgurl=https%3A%2F%2Fmymodernmet.com%2Fwp%2Fwp-content%2Fuploads%2F2019%2F07%2Fai-portraits-celebrities-keanu-reeves.jpg&imgrefurl=https%3A%2F%2Fmymodernmet.com%2Fai-portraits%2F&tbnid=FBOTdnOrzo47QM&vet=12ahUKEwj18urO56bpAhUzWHwKHZY1BfUQMygLegUIARCxAg..i&docid=BTF9HuCCGVyA8M&w=750&h=375&q=portrait&ved=2ahUKEwj18urO56bpAhUzWHwKHZY1BfUQMygLegUIARCxAg"
    let img3 = "https://www.google.com/imgres?imgurl=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1506794778202-cad84cf45f1d%3Fixlib%3Drb-1.2.1%26ixid%3DeyJhcHBfaWQiOjEyMDd9%26w%3D1000%26q%3D80&imgrefurl=https%3A%2F%2Funsplash.com%2Fs%2Fphotos%2Fportrait&tbnid=g3rPcS0txcWl4M&vet=12ahUKEwj18urO56bpAhUzWHwKHZY1BfUQMygPegUIARC5Ag..i&docid=INW7sO3zOe1OeM&w=1000&h=1500&q=portrait&ved=2ahUKEwj18urO56bpAhUzWHwKHZY1BfUQMygPegUIARC5Ag"
    return (
        <View style={styles.coontainer} >
            <UserStories flag="true" image={img1} />
            <UserStories image={img2} />
            <UserStories image={img3} />
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