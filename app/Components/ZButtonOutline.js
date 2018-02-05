/**
 * @providesModule ZButtonOutline
 */

import Icon from 'react-native-vector-icons/Ionicons';
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity
} from 'react-native';

export default class ZButtonOutline extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selected: this.props.isSelected

    }
  }

  onPressButton = () => {
    if (this.state.selected) {
      this.setState({selected: false});
      this.props.selectedButton(false);
    }else {
      this.setState({selected: true});
      this.props.selectedButton(true);
    }
  }

  renderIcon = () => {
    if(this.props.icon){
      return(
        <Icon name={this.props.icon} size={20} color={this.props.iconColor} style={{backgroundColor: 'transparent', marginHorizontal: 10, marginTop: 3}} />
      )
    }
  }

  render() {
    return (
      <TouchableOpacity onPress={this.props.onPress}>
        <View style={[{height: (this.props.height || 35), paddingHorizontal: 10, borderRadius: 20, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#5F5FBA'}, this.props.styles]}>
          {this.renderIcon()}
          <Text style={[{fontSize: 14, fontWeight: '500', color: '#5F5FBA'}, this.props.textStyles]}>{this.props.name}</Text>
        </View>
      </TouchableOpacity>
    );
  }

}
