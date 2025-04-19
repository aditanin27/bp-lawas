import {
  ScrollView, Text, View, StyleSheet, FlatList, TouchableOpacity,
  Image, TextInput, Modal, SafeAreaView
} from 'react-native'
import React, { Component } from 'react'
import { test, Union } from '../../assets/images'
import { Money, TingkatH } from '../../assets/icons'
import { Picker } from '@react-native-picker/picker';

export class index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      anakren: [],
      modalpembayaran: false,


    }
  }
  componentDidMount() {
    this.GetanakrenAPi();
  }

  GetanakrenAPi() {
    fetch('https://berbagibahagia.org/api/getanakrand').then(res => {
      if (res.status === 200)
        return res.json()
    }).then(resdata => {
      console.log(resdata.data)
      this.setState({
        anakren: resdata.data,
        filter: resdata.data,
        refreshing: false,

      })
    })
  }
  render() {
    return (
      <ScrollView>
        <View style={{ backgroundColor: '#0EBEDF', height: 130, borderBottomRightRadius: 28, borderBottomLeftRadius: 28 }}>
          <Text style={style.title1}>Pilih Anak</Text>
          <Text style={{
            marginRight: 20,
            marginLeft: 20,
            marginTop: 10,
            marginBottom: 15,
            fontSize: 12,
            fontWeight: 'bold',
            color: '#fff',
          }}></Text>
          <View style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#fff',
            borderWidth: 0.5,
            height: 40,
            borderRadius: 5,
            margin: 10,
            borderColor: '#C0C0C0'
          }}>
            <TextInput
              value={this.state.carianak}
              placeholder={'Cari'}
              onChangeText={(text) => {
                this.filterList1(text.toLowerCase()), this.setState({ carianak: text })
              }}
              style={style.searchBar} />
          </View>
        </View>
        <FlatList
          data={this.state.anakren}
          renderItem={({ item }) => (
            <View style={style.kotakbaru3}>
              <TouchableOpacity onPress={() => { this.setState({ detrand: item, modalpembayaran: true }); }}>
                <View style={{ flexDirection: 'row', marginLeft: 5, marginTop: 7 }}>
                  <Image source={test}
                    style={{ height: 100, width: 100, borderRadius: 10 }} />
                  <View style={{ flexDirection: 'column' }}>
                    <Text style={{ marginLeft: 10 }}>Yaseer Ahmad</Text>
                    <Text style={{ marginLeft: 10 }}>Shelter</Text>
                    <Text style={{ marginLeft: 10 }}>Kelas II/Ganjil</Text>
                    {/* <View style={{ flexDirection: 'row', marginTop: 10, marginLeft: 10 }}>
                      <TingkatH />
                    </View> */}
                    <View style={{ flexDirection: 'row', marginTop: 10, marginLeft: 10 }}>
                      <Money />
                      <Text style={{ marginLeft: 5, fontWeight: 'bold' }}>Total:700.000</Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          )}>
        </FlatList>

        <Modal
          animationType={"slide"}
          transparent={true}
          visible={this.state.modalpembayaran}
          style={{
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View style={style.ModalCont2}>
            <View style={{
              paddingTop: 5,
              backgroundColor: '#ffffff',
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
              height: '70%',
              shadowColor: "#333",
              shadowOffset: {
                width: 1,
                height: 1,
              },
              shadowOpacity: 0.3,
              shadowRadius: 2,
              elevation: 3,
              alignItems: 'center',
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
            }}>
              <SafeAreaView style={{ width: '100%', height: '100%' }}>
                <View style={{ flexDirection: 'row', marginTop: 20, }}>
                  <TouchableOpacity onPress={() => { this.setState({ modalpembayaran: false }) }}>
                    <Image source={Union} style={{ width: 15, height: 15, marginLeft: 10, marginRight: 10, marginTop: 5 }}></Image>
                  </TouchableOpacity>
                  <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Pembayaran</Text>
                </View>

                <View style={style.kotakbaru}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 5 }}>
                    <Text>Nama</Text>
                    <Text>Dede ali</Text>
                  </View>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 5 }}>
                    <Text>Kelas/Semester</Text>
                    <Text>VI/Genap</Text>
                  </View>
                  <View style={{ width: '100%', height: 1, backgroundColor: '#EBEAEA' }} />

                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 5 }}>
                    <Text>Bimbel</Text>
                    <Text>Rp.500.000</Text>
                  </View>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 5 }}>
                    <Text>Eskul dan Keagamaan</Text>
                    <Text>Rp.500.000</Text>
                  </View>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 5 }}>
                    <Text>Laporan</Text>
                    <Text>Rp.500.000</Text>
                  </View>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 5 }}>
                    <Text>Uang Tunai</Text>
                    <Text>Rp.500.000</Text>
                  </View>
                  <View style={{ width: '100%', height: 1, backgroundColor: '#EBEAEA' }} />
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 10 }}>
                    <Text style={style.Labelbaru2}>Total Pendanaan</Text>
                    <Text style={style.Labelbaru2}>Rp.2.000.000</Text>
                  </View>

                </View>

                <Picker style={style.Textinputcss} mode="dropdown"
                  selectedValue={this.state.nama}
                  value={this.state.bayar}
                  onValueChange={(itemValue) => {
                    this.setState({
                      nama: itemValue
                    })
                  }}>
                  <Picker.Item style={{ fontSize: 12 }} label={'Pilih Metode Pembayaran'} value={'0'} key={'0'} />
                  <Picker.Item label="ATM/Bank Tranfer" value="ATM" />

                </Picker>

                <View style={{ alignContent: 'center', justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
                  <TouchableOpacity style={style.btnSimpanbaru}>
                    <Text style={{ color: '#fff' }}>Salurkan Dana</Text>
                  </TouchableOpacity>
                </View>
              </SafeAreaView>

            </View>
          </View>
        </Modal>
      </ScrollView>

    )
  }
}

export default index
const style = StyleSheet.create({
  container: {
    backgroundColor: '#fff'
  },
  btnSimpanDark1: {
    width: '20%',
    fontWeight: 'bold',
    backgroundColor: '#E9E9E9',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E9E9E9',
    textAlign: 'center',
    justifyContent: 'center', alignItems: 'center'
  },
  labeldlm: {
    fontSize: 10,
    color: '#fff',
    marginTop: 3,
  },
  kotakabu: {
    shadowColor: "#333",
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 3,
    width: '95%',
    height: 300,
    borderRadius: 15,
    borderWidth: 1,
    marginLeft: 10,
    marginTop: 10,
    borderColor: '#E9E9E9',
    backgroundColor: '#fff',

  },
  img: {
    width: '95%',
    height: 150,
    marginLeft: 10,
    marginTop: 10,
    borderRadius: 10,
  },
  labelbaru: {
    fontSize: 16,
    marginTop: 10,
    marginLeft: 10
  },
  labelbaru1: {
    fontSize: 12,
    marginRight: 5,
    marginTop: 10
  },
  labelbaru2: {
    fontSize: 12,
    marginLeft: 10,
    marginTop: 10
  },
  kotakbaru3: {
    shadowColor: "#333",
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 3,
    width: '90%',
    height: 120,
    borderRadius: 15,
    marginLeft: 20,
    marginTop: 15,
    borderColor: '#E9E9E9',
    justifyContent: 'center',
    backgroundColor: '#fff'
  },
  title1: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  btnSimpanbaru: {
    width: '55%',
    fontWeight: 'bold',
    backgroundColor: '#0EBEDF',
    borderRadius: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#0EBEDF',
    justifyContent: 'center', alignItems: 'center', alignContent: 'center',
    textAlign: 'center',
    color: '#fff'
  },
  ModalCont2: {
    flex: 1,
    // alignItems: 'center',
    backgroundColor: '#00000079',
  },
  Labelbaru2: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  kotakbaru: {
    shadowColor: "#333",
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 3,
    width: '90%',
    height: 350,
    borderRadius: 10,
    borderWidth: 1,
    marginLeft: 20,
    marginTop: 10,
    borderColor: '#E9E9E9',
    justifyContent: 'center',
    textAlign: 'center',
    backgroundColor: '#fff',
    justifyContent: 'space-around'
  },
  Textinputcss: {
    color: '#7e7e7e',
    marginLeft: 20,
    marginRight: 10,
    marginTop: 10,
    borderRadius: 10,
    borderWidth: 1,
    fontSize: 12,
    width: '90%',
    height: 52,
    backgroundColor: '#fff',
    shadowColor: "#333",
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    borderColor: '#7e7e7e',
    elevation: 3,
  },
});
