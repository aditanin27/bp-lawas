import { Text, View } from 'react-native'
import React, { Component } from 'react'
import { WebView } from 'react-native-webview';

export class Detail_berita extends Component {
  render() {
    return (
      <WebView
      source={{uri: 'https://berbagibahagia.org/berbagiinfo'}}
      />
      
    )
  }
}

export default Detail_berita