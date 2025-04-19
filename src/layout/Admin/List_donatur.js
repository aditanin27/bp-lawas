import React, { Component } from 'react'
import { Text, View, FlatList, TouchableOpacity, RefreshControl, StyleSheet, TextInput, Image } from 'react-native'
import { IconCari, FilterdanText, JenisH, TingkatH, LocationsH } from '../../assets/icons'
import { test } from '../../assets/images'
export class List_donatur extends Component {
  constructor(props) {
    super(props)
    this.state = {
      donatur: [],
      filtdona: [],
      refreshing: true,
      caritutor: '',
    }
  }

  getdonatur() {
    fetch('https://kilauindonesia.org/datakilau/api/getdonatur')
      .then(res => {
        if (res.status === 200) return res.json();
      })
      .then(resdata => {
        console.log(resdata.data);
        this.setState({
          donatur: resdata.data,
          filtdona: resdata.data,
          refreshing: false,
        });
      });
  }

  componentDidMount() {
    this.getdonatur();
    console.log(this.props);
  }
  onRefresh() {
    this.getdonatur();
    this.setState({ refreshing: false });
  }
  filterList(textToSearch) {
    this.setState({
      filtdona: this.state.donatur.filter(
        i =>
          i.nama_lengkap.toLowerCase(textToSearch).includes(textToSearch)
      ),
    });
  }
  render() {
    return (
      <View>
        <View style={{ backgroundColor: '#0EBEDF', height: 100 }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 20,
            }}>
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
              onChangeText={text => {
                this.filterList(text.toLowerCase()),
                  this.setState({ caritutor: text });
              }}
              value={this.state.text}
              placeholder="Cari Nama yang diinginkan"
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
          data={
            this.state.carianak === '' ? this.state.donatur : this.state.filtdona
          }
          renderItem={({ item }) => (
            <View>
              <View>
                <View style={{}}>
                  <TouchableOpacity onPress={() => this.props.navigation.navigate('ProfilDonatur', { item: item, id_users: item.id_users })}>
                    <View style={style.itemflat}>
                      <View style={{ justifyContent: 'space-between', flexDirection: 'row', marginHorizontal: '10%' }}>
                        <View style={{ flexDirection: 'row' }}>
                          <Image
                            source={{
                              uri:
                                'https://kilauindonesia.org/datakilau/gambarUpload/' +
                                item.foto,
                            }}
                            // source={test}
                            style={{
                              marginTop: 20,
                              height: 50,
                              width: 50,
                              borderRadius: 45,
                              color: '#000',
                              marginRight: 30,
                            }}
                          />
                          <View
                            style={{
                              flexDirection: 'column',
                              marginLeft: '-10%',
                              justifyContent: 'center',
                              width: item.diperuntukkan != 'CPB DAN NPB' ? '65%' : "65%",
                            }}>
                            <Text
                              style={{
                                color: '#000',
                                fontFamily: 'Poppins-Medium',
                                fontSize: 14,
                                marginLeft: 10,
                              }}>
                              {item.nama_lengkap}
                            </Text>
                            <View style={{ flexDirection: 'row' }}>
                              <View style={{ flexDirection: 'row' }}>
                                <LocationsH style={{ marginLeft: 10 }} />
                                <Text
                                  style={{
                                    color: '#000',
                                    fontSize: 10,
                                    fontFamily: 'Poppins-Regular',
                                    marginLeft: 5,
                                  }}>
                                  {item.alamat}
                                </Text>
                              </View>
                            </View>
                          </View>
                        </View>
                        <View style={{
                          height: 32,
                          marginRight: item.diperuntukkan === 'CPB DAN NPB' ? 30 : 30,
                          marginTop: 10,
                          width: '20%',
                          padding: 5,
                          borderRadius: 5,
                          backgroundColor:
                            item.diperuntukkan === 'CPB'
                              ? '#0076B8'
                              : '#000' && item.diperuntukkan === 'PB'
                                ? '#00B855'
                                : '#000' && item.diperuntukkan === 'NPB'
                                  ? '#E32845'
                                  : '#000' && item.diperuntukkan === 'CPB DAN NPB'
                                    ? '#FFBB0C'
                                    : '#000',
                        }}>
                          {item.diperuntukkan != 'CPB DAN NPB' ?
                            <Text style={{ color: '#fff', fontSize: 12, textAlign: 'center', marginTop: 2 }}>{item.diperuntukkan}</Text>
                            : <Text style={{ color: '#fff', fontSize: 9, textAlign: 'center' }}>{item.diperuntukkan}</Text>}

                        </View>
                      </View>

                    </View>
                  </TouchableOpacity>
                 
                </View>

              </View>
            </View >
          )
          }></FlatList >
      </View >
    )
  }
}

export default List_donatur
const style = StyleSheet.create({
  itemflat: {
    flexDirection: 'row',
    fontSize: 12,
    backgroundColor: '#fff',
    color: '#000',
    marginHorizontal: 16,
    marginTop: 15,
    shadowColor: '#858585',
    overflow: 'hidden',
    shadowRadius: 15,
    elevation: 6,
    shadowOpacity: '25%',
    borderColor: '#7e7e7e',
    borderRadius: 15,
    height: 90,
    width: '90%',
    justifyContent: 'center',
  },
  IconCari: {
    position: 'absolute',
    top: 8,
    left: 20,
  },
});
