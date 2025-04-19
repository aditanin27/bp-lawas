import {
  Text, View, TouchableOpacity, TextInput,
  StyleSheet, RefreshControl, FlatList, Image, ToastAndroid
} from 'react-native'
import React, { Component } from 'react'
import { IconCari, FilterdanText, LocationsH, JenisH, TingkatH, } from '../../assets/icons'
import { test } from '../../assets/images'
export class MasukanAnak extends Component {
  constructor(props) {
    super(props);
    this.state = {
      carianak: '',
      anak: [],
      filter: [],
      text: '',
      refreshing: true,
      kelompok: this.props.route.params.detail.id_kelompok

    };
  }
  GetAnakAPi() {
    fetch('https://kilauindonesia.org/datakilau/api/joindataanak')
      .then(res => {
        if (res.status === 200) return res.json();
      })
      .then(resdata => {
        console.log(resdata.data);
        this.setState({
          anak: resdata.data,
          filter: resdata.data,
          refreshing: false,
        });
      });
  }

  editData(id_anak) {
    {
      let simpandata = {
        id_kelompok: this.state.kelompok,
      }
      let data = new FormData();
      for (let key in simpandata) {
        data.append(key, simpandata[key]);
      }
      fetch('https://kilauindonesia.org/datakilau/api/kelanakupd/' + id_anak, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data'
        },
        body: data,
      })
        .then((res) => res.json())
        .then((resJson) => {
          console.log(resJson);
          if (resJson.status === 'sukses') {

            ToastAndroid.show("Data berhasil diperbaharui!", ToastAndroid.SHORT)
            this.props.navigation.navigate('ListKelompok')
            this.onRefresh()
          } else {
            alert(`Data gagal disimpan !!!`);
          }
        })
        .catch((err) => console.log('dari catch send Data ===', err));
    }

  }
  componentDidMount() {
    this.GetAnakAPi();
    console.log();
  }
  onRefresh() {
    this.GetAnakAPi();
    this.setState({ refreshing: false });
  }
  // filterList(textToSearch) {
  //   this.setState({
  //     filter: this.state.anak.filter(i => i.full_name.toLowerCase().includes(textToSearch) 
  //     && i.id_kelompok === null),
  //   });
  // }
  filterList(textToSearch) {
    this.setState({
      filter: this.state.anak
        .filter(i => i.full_name.toLowerCase(textToSearch).includes(textToSearch) && i.id_kelompok === null && i.status_validasi === 'aktif')
    })
  }
  render() {
    const nonkel = this.state.anak.filter(item => item.id_kelompok === null && item.status_validasi === 'aktif')
    return (
      <View>
        <View style={{ backgroundColor: '#0EBEDF', height: 100 }}>
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
                this.filterList(text.toLowerCase()), this.setState({ text: text })
              }}
              value={this.state.text}
              placeholder="Cari Anak Binaan"
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
          <Text style={{ color: '#FFF', marginTop: 10, marginLeft: 15 }}>Tambah Anggota Kelompok</Text>

        </View>
        <FlatList
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={() => this.onRefresh()}
            />
          }
          data={this.state.text === '' ? nonkel : this.state.filter}
          renderItem={({ item }) => (
            <View style={{}}>
              <TouchableOpacity
                onPress={() => { this.editData(item.id_anak) }}>
                <View style={style.itemflat}>
                  <View style={{
                    width: '10%', justifyContent: 'center',
                    backgroundColor: item.status_cpb === 'CPB' ? '#0076B8' : '#000' &&
                      item.status_cpb === 'PB' ? '#00B855' : '#000' && item.status_cpb === 'NPB' ? '#E32845' : '#000' && item.status_cpb === 'BCPB' ? '#FFBB0C' : '#000'
                  }}>
                    <View style={{ width: '40%', justifyContent: 'center', alignItems: 'center', alignSelf: 'center', alignContent: 'center' }}>
                      <Text style={{ fontSize: 12, fontFamily: 'Poppins-Medium', color: '#fff' }}>{item.status_cpb}</Text>
                    </View>
                  </View>
                  <View
                    style={{
                      height: 90,
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
                        <Image source={{
                          uri:
                            'https://kilauindonesia.org/datakilau/gambarUpload/' +
                            item.foto,
                        }}
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
                            {item.full_name}
                          </Text>
                          <View style={{ flexDirection: 'row' }}>
                            <View style={{ flexDirection: 'row' }}>
                              <JenisH style={{ marginLeft: 10 }} />
                              <Text style={{ color: '#000', fontSize: 10, marginLeft: 5, fontFamily: 'Poppins-Regular' }}>Non-Tahfidz</Text>
                            </View>

                            <View style={{ flexDirection: 'row', }}>
                              <TingkatH style={{ marginLeft: 10, }} />
                              <Text style={{ color: '#000', fontSize: 10, fontFamily: 'Poppins-Regular', marginLeft: 5 }}>Kelas {item.kelas}</Text>
                            </View>

                            <View style={{ flexDirection: 'row', }}>
                              <LocationsH style={{ marginLeft: 10, }} />
                              <Text style={{ color: '#000', fontSize: 10, fontFamily: 'Poppins-Regular', marginLeft: 5 }}>{item.tempat_lahir}</Text>
                            </View>

                          </View>

                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          )}></FlatList>
      </View>
    )
  }
}
const style = StyleSheet.create({
  IconCari: {
    position: 'absolute',
    top: 8,
    left: 20,
  },
  itemflat: {
    flex: 1,
    fontSize: 12,
    flexDirection: 'row',
    marginLeft: 10,
    paddingRight: 30,
    backgroundColor: '#fff',
    color: '#000',
    marginVertical: 10,
    marginHorizontal: 16,
    shadowColor: '#858585',
    overflow: 'hidden',
    shadowRadius: 15,
    elevation: 6,
    shadowOpacity: '25%',
    borderColor: '#7e7e7e',
    borderRadius: 15,
  },
});
export default MasukanAnak