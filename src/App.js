import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Router from './router';
import { Provider } from 'react-redux';
import { store } from './redux/store/index';
import Toast from 'react-native-toast-message'; // Import Toast

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        {/* Your main app router */}
        <Router />
        
        {/* Toast component at root level */}
        <Toast 
          ref={(ref) => Toast.setRef(ref)} 
          // Optional config (adjust as needed)
          config={{
            success: ({ text1, text2 }) => (
              <View style={styles.toastSuccess}>
                <Text style={styles.toastText1}>{text1}</Text>
                {text2 && <Text style={styles.toastText2}>{text2}</Text>}
              </View>
            ),
            error: ({ text1 }) => (
              <View style={styles.toastError}>
                <Text style={styles.toastText1}>{text1}</Text>
              </View>
            ),
          }}
        />
      </Provider>
    );
  }
}

// Add toast styles
const styles = StyleSheet.create({
  toastSuccess: {
    padding: 15,
    backgroundColor: 'green',
    borderRadius: 5,
    marginHorizontal: 20,
  },
  toastError: {
    padding: 15,
    backgroundColor: 'red',
    borderRadius: 5,
    marginHorizontal: 20,
  },
  toastText1: {
    color: 'white',
    fontWeight: 'bold',
  },
  toastText2: {
    color: 'white',
  },
});