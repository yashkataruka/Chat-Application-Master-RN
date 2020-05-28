import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native'
import { Video } from 'expo-av'
// import InViewPort from 'react-native-inviewport'
import InViewPort from './InViewPort'

class VideoPost extends Component {
  state = {
    timeDuration: ""
  }

  timeDuration = ""
  millisToMinutesAndSeconds = (millis) => {
    let minutes = Math.floor(millis / 60000);
    let seconds = ((millis % 60000) / 1000).toFixed(0);
    return (seconds == 60 ? (minutes + 1) + ":00" : minutes + ":" + (seconds < 10 ? "0" :
      "") + seconds);
  }

  componentDidMount() {
    this.video._onPlaybackStatusUpdate = (status) => {
      // this.setState({ timeDuration: this.millisToMinutesAndSeconds(status.playableDurationMillis - status.positionMillis) })
      // console.log(this.millisToMinutesAndSeconds(status.playableDurationMillis - status.positionMillis))
    }
  }

  pauseVideo = () => {
    if (this.video) {
      this.video.pauseAsync();
    }
  }
  playVideo = () => {
    if (this.video) {
      this.video.playAsync();
    }
  }
  handlePlaying = (isVisible) => {
    console.log('visible:', isVisible)
    isVisible ? this.playVideo() : this.pauseVideo();
  }

  render() {
    // console.log("text ref:", this.timeDuration)
    return (
      <InViewPort onChange={(e) => this.handlePlaying(e)}>
        {/* <Text ref={ref => { this.text = ref }} style={styles.timmer}>{this.state.timeDuration}</Text> */}
        <Video
          ref={ref => { this.video = ref }}
          source={{ uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4' }}
          rate={1.0}
          volume={1.0}
          isMuted={true}
          resizeMode="cover"
          shouldPlay={true}
          isLooping
          style={{ width: '100%', height: 300 }}
          disableSlider={true}
          progressUpdateIntervalMillis={1000}
        />
      </InViewPort>
    )
  }
}

const styles = StyleSheet.create({
  timmer: {
    position: 'absolute'
  }
})

export default VideoPost