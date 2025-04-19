import { Text, View, TextInput, StyleSheet, TouchableOpacity, FlatList, RefreshControl, Image, ScrollView } from 'react-native'
import React, { Component } from 'react'
import { Anak2, Banyakanak, FilterdanText, IconCari, LocationsH, OrangHitam, TingkatH, Tamnak } from '../../assets/icons'
import { test } from '../../assets/images';
var RNFS = require('react-native-fs');
import XLSX from 'xlsx'

export class Detailjumlahdonatur extends Component {
  constructor(props) {
    super(props);
    this.state = {
      donatur: [],
      Jumnak: [],
      carido: [],
      cari: '',
      detail: this.props.route.params.detail,
    };
  }
  componentDidMount() {
    this.GetdonaAPi();
    this.GetAnakAPi();
    console.log(this.GetdonaAPi())
  }
  onRefresh() {
    this.GetdonaAPi();
    this.setState({ refreshing: false });
  }
  GetdonaAPi() {
    fetch('https://kilauindonesia.org/datakilau/api/getlaporandonatur/' + this.state.detail.id_shelter).then(res => {
      if (res.status === 200)
        return res.json()
    }).then(resdata => {
      console.log(resdata.data)
      this.setState({
        donatur: resdata.data,
        carido: resdata.data
      })
    })
  }
  GetAnakAPi() {
    fetch('https://kilauindonesia.org/datakilau/api/AnakDona/' + this.state.donatur.id_donatur).then(res => {
      if (res.status === 200)
        return res.json()
    }).then((resdata) => {
      console.log('ini resdata get', resdata);
      const length = resdata.data.length;
      if (length > 0) {
        this.setState({
          Jumnak: resdata.data,
          refreshing: false,

        });
      } else {
        this.setState({
          Jumnak: resdata.data,
          refreshing: false,
        });
      }
    })
  }
  SemuaDonatur = () => {

    let wb = XLSX.utils.book_new();
    let ws = XLSX.utils.json_to_sheet(this.state.donatur)
    XLSX.utils.book_append_sheet(wb, ws, "Users")
    const wbout = XLSX.write(wb, { type: 'binary', bookType: "xlsx" });

    // Write generated excel to Storage
    RNFS.writeFile(RNFS.DownloadDirectoryPath +'/Semua_Donatur.xlsx', wbout, 'ascii').then((r) => {
      console.log('Success');
    }).catch((e) => {
      console.log('Error', e);
    });

  }
  filterList(textToSearch) {
    const fildonat = this.state.donatur =
      this.state.donatur.filter((item, index) => {
        return this.state.donatur.findIndex(i => i.nama_lengkap === item.nama_lengkap) === index;
      })
    this.setState({
      carido: fildonat.filter(i => i.nama_lengkap.toLowerCase(textToSearch).includes(textToSearch))
    });
  }
  render() {
    const jumlah = this.state.Jumnak.filter(item => item.id_anak === item.id_anak)

    return (
      <View style={{ backgroundColor: '#fff',flex:1 }}>
        <View style={{ backgroundColor: '#0EBEDF', height: 90 }}>
          <View
            style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20 }}>
            <TextInput
              style={{
                flexDirection: 'row',
                backgroundColor: '#FFF',
                paddingHorizontal: 40,
                height: 38,
                width: 250,
                borderRadius: 9,
                marginLeft: 10,
              }}
              color={'#000'}
              onChangeText={(text) => {
                this.filterList(text.toLowerCase()), this.setState({ cari: text })
              }}
              value={this.state.text}
              placeholder="Cari"
              placeholderTextColor="#C0C0C0"
              underlineColorAndroid="transparent"
            />
            <IconCari style={style.IconCari} name="your-icon" size={20} />
            <TouchableOpacity
              onPress={() => {
                this.setState({ fil: true });
              }}>
              <FilterdanText style={{ marginLeft: 20 }} />
            </TouchableOpacity>
          </View>
        </View>
        
        <FlatList
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={() => this.onRefresh()}
            />
          }
          data={this.state.carido}
          renderItem={({ item, index }) => (
            <View>
              <View style={{}}>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('infoanak', { item: item })}>

                  <View style={style.itemflat}>
                    <View
                      style={{
                        height: 100,
                        width: '100%',
                        justifyContent: 'center',
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                        <View style={{ flexDirection: 'row' }}>
                          <Image source={test}
                            style={{
                              height: 50,
                              width: 50,
                              borderRadius: 45,
                              color: '#000',
                              marginRight: 30
                            }}
                          />
                          <View
                            style={{ flexDirection: 'column', marginLeft: '-10%', justifyContent: 'center', width: '70%' }}>
                            <Text style={{ color: '#000', fontFamily: 'Poppins-Medium', fontSize: 14, marginLeft: 10, }}>
                              {item.nama_lengkap}
                            </Text>
                            <View style={{ flexDirection: 'row', marginTop: 10 }}>
                              <View style={{ flexDirection: 'row', }}>
                                <OrangHitam style={{ marginLeft: 10, marginTop: -5 }} />
                                <Text style={{ color: '#000', fontSize: 10, fontFamily: 'Poppins-Regular', marginLeft: 5 }}>{item.diperuntukkan}</Text>
                              </View>

                              <View style={{ flexDirection: 'row', }}>
                                <LocationsH style={{ marginLeft: 10, marginTop: -5 }} />
                                <Text style={{ color: '#000', fontSize: 10, fontFamily: 'Poppins-Regular', marginLeft: 5 }}>{item.nama_shelter}</Text>
                              </View>
                            </View>

                          </View>
                        </View>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>

            </View>
          )}></FlatList >
          
          <View style={{ flexDirection: "row", justifyContent: 'center', alignSelf: 'center',position:'absolute',bottom:'14%'}}>
            <TouchableOpacity style={style.btnSimpan} onPress={() => this.SemuaDonatur()}>
              <Text style={{ color: '#fff', fontFamily: 'Poppins-Medium', fontSize: 15 }}>Download Semua</Text>
            </TouchableOpacity>
          </View>
      </View>
    )
  }
}
const style = StyleSheet.create({
  itemflat: {
    fontSize: 12,
    backgroundColor: '#fff',
    color: '#000',
    marginVertical: 5,
    marginHorizontal: 16,
    marginTop: 15,
    shadowColor: '#858585',
    overflow: 'hidden',
    shadowRadius: 15,
    elevation: 6,
    shadowOpacity: '25%',
    borderColor: '#7e7e7e',
    borderRadius: 15,
    width: '90%',
    justifyContent: 'center',
  },
  IconCari: {
    position: 'absolute',
    top: 8,
    left: 20,
  },
  refresh: {
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    bottom: 0,
  },
  labelkiri: {
    fontSize: 12,
    fontWeight: 'bold',
    marginVertical: 5,
    marginLeft: 10,
  },
  btnSimpan: {
    backgroundColor: '#00A9B8',
    padding: '4%',
    borderRadius: 10,
    marginTop: '6%',
    width: '70%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default Detailjumlahdonatur