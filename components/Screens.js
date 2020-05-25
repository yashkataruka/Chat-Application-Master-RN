import React, { Component } from 'react';
import {
  StyleSheet,   // CSS-like styles
  Text,         // Renders text
  View          // Container component
} from 'react-native';
import Swiper from './Swiper';

import Screen1 from './OnBoardingScreens/Screen1'
import Screen2 from './OnBoardingScreens/Screen2'
import Screen3 from './OnBoardingScreens/Screen3'
import Screen4 from './OnBoardingScreens/Screen4'
import Screen5 from './OnBoardingScreens/Screen5'

export default class Screens extends Component {
    constructor(props){
        super(props)
        this.state = {
          anim:false
        }
    } 
 async update(){
   console.log('end')
        this.props.update()
        await this.setState({anim:true})
    }
    render() {
        return (
          <Swiper update = {()=>this.update()}>
            <Screen1/>
            <Screen2 />
            <Screen3/>
            <Screen4/>
            <Screen5/>
          </Swiper>
        );
      }
}

