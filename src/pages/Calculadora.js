import React from 'react';
import { StyleSheet, Text, View, TextInput, Picker, TouchableOpacity } from 'react-native';
import axios from 'axios';

export default class Calculadora extends React.Component {

  state = {
    operation: 'sum',
    num1: 0,
    num2: 0,
    result: 'Resultado',
  };

  calculate = () => {
    const { operation, num1, num2 } = this.state;
    const gatewayURL = 'https://ep0d2t20ue.execute-api.us-east-2.amazonaws.com/methods/my-resource'
      + '?num1=' + num1 + '&num2=' + num2 + '&operation=' + operation;
    axios({
      method: 'get',
      url: gatewayURL,
    }).then(res => {
      this.setState({ result: res.data.body });
    }).catch(error => {
      this.setState({ result: error.message });
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>CALCULADORA SERVERLESS</Text>
        <View style={styles.operationRow}>
          <TextInput
            style={styles.input}
            placeholder='0'
            keyboardType="numeric"
            onChangeText={num1Value => {
              this.setState({ num1: num1Value });
              console.log(num1Value);
            }}></TextInput>
          <Picker
            style={styles.input}
            selectedValue={this.state.operation}
            mode='dialog'
            onValueChange={(itemValue, itemIndex) => this.setState({ operation: itemValue })}>
            <Picker.Item label="+" value="sum" />
            <Picker.Item label="-" value="sub" />
            <Picker.Item label="/" value="div" />
            <Picker.Item label="*" value="mul" />
          </Picker>
          <TextInput
            style={styles.input}
            placeholder='0'
            keyboardType="numeric"
            onChangeText={num2Value => {
              this.setState({ num2: num2Value });
              console.log(num2Value);
            }}></TextInput>
        </View>
        <Text style={styles.output}>{this.state.result}</Text>
        <TouchableOpacity style={styles.button} onPress={this.calculate}>
          <Text style={styles.buttonText}>Calcular</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fcba03',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 36,
    paddingTop: 18,
    paddingBottom: 18,
    textAlign: "center",
    fontWeight: 'bold',
    color: '#024a00',
    textShadowColor: 'rgba(0, 0, 0, 0.6)',
    textShadowOffset: { width: -1, height: 0 },
    textShadowRadius: 5
  },
  operationRow: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
  },
  input: {
    width: 100,
    borderRadius: 10,
    padding: 8,
    margin: 8,
    textAlign: "center",
    alignContent: "center",
    alignItems: "center",
    alignSelf: "center",
    fontSize: 22,
    backgroundColor: '#fff',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 3,
  },
  button: {
    borderRadius: 10,
    padding: 8,
    margin: 18,
    textAlign: "center",
    fontSize: 22,
    backgroundColor: '#024a00',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 2,
  },
  buttonText: {
    fontSize: 22,
    color: 'white',
  },
  output: {
    fontSize: 24,
    margin: 20,
  },
});