import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { render } from 'react-dom';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {evaluate} from './math.min.js';

export default class App extends Component {

  constructor() {
    super();
    this.state = {
      resultText: '',
      total: ''
    };
  }

  // eval(text) {
  //   // creating stack for number and operator
  //   let op = [];
  //   let num = [];

  //   let n = text.length;
  //   let txt = '';
  //   for(let i=0;i<n;i++) {

  //     if(text[i]=='+' ||text[i]=='-' ||text[i]=='*' ||text[i]=='/') {
  //       op.push(text[i]);
  //       num.push(txt);
  //       txt = '';
  //     }
  //     else {
  //       txt += text[i];
  //     }
  //   }
  //   num.push(txt);

  //   // calulation
  //   let N = num.length;
  //   while(N>1) {

  //     if(op.indexOf('/')) {
  //       let index = op.indexOf('/');
  //       let a = num[index];
  //       let b = num[index+1];
  //       let c = Number(a)/Number(b);

  //       num[index] = ''+c;
  //       for(let j=index+1;j<num.length-1;j++) {
  //         num[j] = num[j+1];
  //       }
  //       num.pop();

  //       for(let j=index;j<op.length-1;j++) {
  //         op[j] = op[j+1];
  //       }
  //       op.pop();

  //     }
  //     else if(op.indexOf('*')) {

  //       let index = op.indexOf('*');
  //       let a = num[index];
  //       let b = num[index+1];
  //       let c = Number(a)*Number(b);

  //       num[index] = ''+c;
  //       for(let j=index+1;j<num.length-1;j++) {
  //         num[j] = num[j+1];
  //       }
  //       num.pop();

  //       for(let j=index;j<op.length-1;j++) {
  //         op[j] = op[j+1];
  //       }
  //       op.pop();
  //     }
  //     else if(op.indexOf('+')) {

  //       let index = op.indexOf('+');
  //       let a = num[index];
  //       let b = num[index+1];
  //       let c = Number(a)+Number(b);

  //       num[index] = ''+c;
  //       for(let j=index+1;j<num.length-1;j++) {
  //         num[j] = num[j+1];
  //       }
  //       num.pop();

  //       for(let j=index;j<op.length-1;j++) {
  //         op[j] = op[j+1];
  //       }
  //       op.pop();

  //     }
  //     else if(op.indexOf('-')) {

  //       let index = op.indexOf('-');
  //       let a = num[index];
  //       let b = num[index+1];
  //       let c = Number(a)-Number(b);

  //       num[index] = ''+c;
  //       for(let j=index+1;j<num.length-1;j++) {
  //         num[j] = num[j+1];
  //       }
  //       num.pop();

  //       for(let j=index;j<op.length-1;j++) {
  //         op[j] = op[j+1];
  //       }
  //       op.pop();

  //     }
  //     N--;
      
  //   }

  //   return num[0];

  // }

  calculateResult() {
    const text = this.state.resultText;

    // count extra operators or consecutive operators
    let count = 0;
    let n = text.length;
    if(n>0) {
      if(text[0]=='+' ||text[0]=='-' ||text[0]=='*' ||text[0]=='/') {
        count++;
      }
      
      if(n-1!=0) {
        if(text[n-1]=='+' ||text[n-1]=='-' ||text[n-1]=='*' ||text[n-1]=='/') {
          count++;
        }
      }
    }

    for(let i=1;i<n-1;i++) {
      if(text[i]=='+' ||text[i]=='-' ||text[i]=='*' ||text[i]=='/') {
        if(text[i]==text[i+1]) {
          count++;
        }
      }

    }


    if(text.length>0 && count==0) {
      // const result = evaluate(text);
      const result = evaluate(text);
      this.setState({
        resultText: '',
        total: ''+result
      });
    }
  }

  buttonPressed(text) {
    console.log(text);

    if(text == '=') {
      this.calculateResult();
    }
    else {
      this.setState({
        resultText: this.state.resultText + this.state.total + text,
        total: ''
      });
    }
    
  }

  operation(op) {
    switch(op) {
      case 'C':
        this.setState({
          resultText: '',
          total: ''
        });
        break;

      case 'DEL':
        const result = this.state.resultText;
        const total = this.state.total;
        
        if(result.length>0) {
          const text = this.state.resultText.split('');
          text.pop();

          this.setState({
            resultText: text.join('')
          });
        }
        else {
          const txt = this.state.total;
          this.setState({
            resultText: txt,
            total: ''
          });
        }
        break;

      case '/':
        this.setState({
          resultText: this.state.resultText + this.state.total + op,
          total: ''
        });
        break;

      case '*':
        this.setState({
          resultText: this.state.resultText + this.state.total + op,
          total: ''
        });
        break;
      
      case '-':
        this.setState({
          resultText: this.state.resultText + this.state.total + op,
          total: ''
        });
        break;
      
      case '+':
        this.setState({
          resultText: this.state.resultText + this.state.total + op,
          total: ''
        });
        break;

    }
  }

  render() {

    let rows = [];
    let num = [[7,8,9],[4,5,6],[1,2,3],['.',0,'=']];

    for(let i=0;i<4;i++) {
      let r = [];
      for(let j=0;j<3;j++) {
        r.push(
          <TouchableOpacity style={styles.btn} onPress={()=> this.buttonPressed(num[i][j])}>
            <Text style={styles.btnText}>{num[i][j]}</Text>
          </TouchableOpacity>
        );
      }
      rows.push(
        <View style={styles.row}>
          {r}        
        </View>
      );
    }

    let operators = ['C','DEL','/','*','-','+'];
    let op = [];
    for(let i=0;i<6;i++) {
      op.push(
        <TouchableOpacity style={styles.btn} onPress={()=> this.operation(operators[i])}>
          <Text style={styles.btnText}>{operators[i]}</Text>
        </TouchableOpacity>
      );
    }

    return (
    
      <View style={styles.container}>
        <View style={styles.result}>
          <Text style={styles.resultText}>{this.state.resultText}</Text>
        </View>
        <View style={styles.calculation}>
          <Text style={styles.calculationText}>{this.state.total}</Text>
        </View>
        <View style={styles.buttons}>
          <View style={styles.numbers}>
            {rows}
          </View>
          <View style={styles.operations}>
            {op}
          </View>
        </View>
  
      </View>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  btnText: {
    color: 'white',
    fontSize: 30
  },
  btn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch'
  },
  resultText : {
    fontSize: 30,
    color: '#808080'
  },
  calculationText: {
    fontSize: 40,
    color: 'black'
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  result: {
    flex: 2,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  calculation: {
    flex: 2,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  buttons: {
    flex: 6,
    flexDirection: 'row'
  },
  numbers: {
    flex: 3,
    backgroundColor: '#101010'
  },
  operations: {
    flex: 1,
    justifyContent: 'space-around',
    backgroundColor: 'black'
  }
});
