import React, { Component } from 'react'
import Carousel, { Pagination } from 'react-native-snap-carousel'
import { View, Image, StyleSheet, Dimensions, TouchableWithoutFeedback, Text } from 'react-native'
import Modal from 'react-native-modal'


class ImagePost extends Component {
  state = {
    activeSlide: 0,
    visible: false,
    selectedPic: null
  }

  width = Dimensions.get('window').width;
  renderItem = ({ item, index }) => {
    return (
      <TouchableWithoutFeedback
        onLongPress={() => this.setState({ visible: true, selectedPic: item })}
        onPressOut={() => this.setState({ visible: false, selectedPic: null })}
      >
        <View>
          <Image source={{ uri: item }} style={styles.contentStyle} resizeMode={"cover"}></Image>
        </View>
      </TouchableWithoutFeedback>
    )
  }

  render() {
    return (
      <View>
        <Modal isVisible={this.state.visible}>
          <View style={{ height: '80%', width: '100%', backgroundColor: 'white' }}>
            {this.state.selectedPic && <Image
              source={{ uri: this.state.selectedPic }}
              style={{ height: '100%', width: '100%' }}
              resizeMode={"cover"}>
            </Image>
            }
          </View>
        </Modal>
        <Carousel
          ref={(c) => { this._carousel = c }}
          data={this.props.image}
          renderItem={this.renderItem}
          sliderWidth={this.width}
          itemWidth={this.width}
          onSnapToItem={(index) => this.setState({ activeSlide: index })}
        />
        {
          this.props.image.length > 1 &&
          <View style={{ height: 20, flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-end' }}>
            {this.props.image.map((img, index) => {
              if (index == this.state.activeSlide) {
                return (
                  <View style={{ height: 10, width: 10, borderRadius: 5, backgroundColor: '#3D7093', marginHorizontal: 7 }}></View>
                )
              } else {
                return (
                  <View style={{ height: 7, width: 7, borderRadius: 3.5, backgroundColor: '#AFCFE5', marginHorizontal: 7 }}></View>
                )
              }

            })}
          </View>
        }

      </View>
    )
  }
}

const styles = StyleSheet.create({
  contentStyle: {
    height: 270,
    alignSelf: 'stretch',
    resizeMode: 'stretch',
  }
})

export default ImagePost