import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Router from './router';
// import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
// import { Store,persistor } from './redux/store';
import { store } from './redux/store/index'
// import { TamRapotShelter } from '../src/layout/Anak_Binaan/TamRapotShelter';
// import { Rapshelter } from '../src/layout/Anak_Binaan/Rapshelter';
// import { ListPengajuan } from '../src/layout/Pengajuan/ListPengajuan';

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        {/* <ListPengajuan /> */}
        <Router />
        {/* <PersistGate persistor={persistor} loading={null}>
        </PersistGate> */}
      </Provider>
    )
  }
}

const styles = StyleSheet.create({})
