import React, { Component } from 'react'
import { View, Text, StyleSheet, Animated } from 'react-native'
import { RadioButton } from 'react-native-paper'

class Polls extends Component {
  state = {
    votes: this.props.votes.map(vote => vote * 100 / this.props.votes.reduce((a, b) => a + b)),
    checked: null
  }
  render() {
    console.log(this.state.votes)
    return (
      <View style={styles.main}>
        <Text style={styles.question}>{this.props.question}</Text>
        <View style={{ marginTop: 10, width: '100%' }}>
          {this.props.options.map((option, index) => {
            return (
              <View style={styles.optionsBack}>
                <View style={{
                  position: 'absolute',
                  width: this.state.checked ? `${this.state.votes[index]}` + '%' : 0,
                  backgroundColor: '#0C779B',
                  height: 50,
                  borderTopLeftRadius: 500,
                  borderBottomLeftRadius: 500,
                }}></View>
                <View style={styles.options}>

                  <RadioButton
                    value={option}
                    status={(this.state.checked == option) ? 'checked' : 'unchecked'}
                    onPress={() => this.setState({ checked: option })}
                    color='black'
                    uncheckedColor='black'
                  >
                    <View style={{ backgroundColor: 'white' }}></View>
                  </RadioButton>
                </View>
                <Text style={styles.options}>{option}</Text>
                {this.state.checked && <Text style={{ flex: 1, textAlign: 'right', alignSelf: 'center', color: '#0C779B', fontWeight: 'bold', marginRight: 5 }}>{parseInt(this.state.votes[index])}%</Text>}
              </View>
            )
          })
          }
        </View>
      </View >
    )
  }
}

const styles = StyleSheet.create({
  main: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    alignItems: 'center'
  },
  question: {
    fontSize: 25,
    fontWeight: '900',
    marginBottom: 5
  },
  optionsBack: {
    height: 50,
    width: '95%',
    borderRadius: 25,
    backgroundColor: '#C4DAE1',
    marginVertical: 5,
    paddingHorizontal: 10,
    flexDirection: 'row',
  },
  options: {
    alignSelf: 'center',
  }
})

export default Polls