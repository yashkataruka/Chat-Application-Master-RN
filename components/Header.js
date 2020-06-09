import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Button } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';

export default class CustomHeader extends React.Component{
    constructor(props){
        super(props)
    }
    _menu = null;
 
  setMenuRef = ref => {
    this._menu = ref;
  };
 
  hideMenu = () => {
    this._menu.hide();
  };
 
  showMenu = () => {
    this._menu.show();
  };
    render(){
        return(
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center',marginRight:30 }}>
        <Menu
          ref={this.setMenuRef}
          button={<TouchableOpacity  onPress = {this.showMenu}><Ionicons name = 'md-menu' color = '#fff' size = {30}/></TouchableOpacity>}
        >
          <MenuItem onPress={()=>{this.hideMenu();this.props.nav.navigate('NewChat')}}><Ionicons name = "md-chatboxes" size = {26}/>
            <Text>    New Chat</Text></MenuItem>
            <MenuDivider />
          <MenuItem onPress={()=>{this.hideMenu();this.props.nav.navigate('NewGroup')}}><Ionicons name = "ios-people" size = {26}/>
            <Text>    New Group</Text></MenuItem>
            <MenuDivider />
          <MenuItem onPress={()=>{this.hideMenu();this.props.nav.navigate('Barcode')}}>
          <Ionicons name = "md-qr-scanner" style = {{marginRight:20}} size = {26}/>
            <Text style = {{marginLeft:20}}>    Scan</Text>
          </MenuItem>
          <MenuDivider />
          <MenuItem onPress={()=>{this.hideMenu();this.props.nav.navigate('Broadcast')}}><Ionicons name = "md-wifi" size = {26}/>
            <Text>    Broadcast</Text></MenuItem>
        </Menu>
      </View>
        )
    }
}