import { Alert, Text, View, SafeAreaView, TextInput, TouchableOpacity, StyleSheet, FlatList, RefreshControl, Modal, Image, ToastAndroid } from 'react-native'
import React, { Component } from 'react'
import {
  Plus,
  Math,
  IconCari,
  FilterdanText,
  Location,
  Book,
  Document,
  Adduser,
  TKP,
  TP,
  LocationsH,
  TingkatH,
  JenisH,
  CardkelasKuning,
  Btntambah,
  CardkelasBiru,
  CardkelasPink,
  CardkelasMerah,
  CardkelasAbu,
  Groupplus,
  Locationabu,
  Bukuabu,
  Close,
  SekolahH,
} from '../../assets/icons';
import {
  search,
  arrow,
  plus,
  Background,
  addfoto,
  Union,
  x,
  orang3,
  orang2,
  orang1,
  test,
  Warnakuning,
  Warnapink, Warnamerah, Warnahijau, Warnaabu, Warnabiru,
} from '../../assets/images';
import ActionButton from 'react-native-action-button';
import SwitchSelector from 'react-native-switch-selector';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { connect } from 'react-redux';

export class UserManagement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: true,
      cek: '',
      detail: '',
      edit: false,
      cabang: '',
      pusat: '',
      caridonatur: '',
      caricabang: '',
      carishelter: '',
      filtertutor: [],
      tutor: [],
      donatur: [],
      shelter: [],
      admcabang: [],
      filter: [],
      filteradms: [],
      filteradmc: [],
    }
  }
  GetDonaturAPi() {
    fetch('https://kilauindonesia.org/datakilau/api/getdonatur')
      .then(res => {
        if (res.status === 200) return res.json();
      })
      .then(resdata => {
        // console.log(resdata.data);
        this.setState({
          donatur: resdata.data,
          filter: resdata.data,
          refreshing: false,

        });
      });
  }


  GetAdminShelterAPi() {
    fetch('https://kilauindonesia.org/datakilau/api/getpengelola')
      .then(res => {
        if (res.status === 200) return res.json();
      })
      .then(resdata => {
        // console.log(resdata.data);
        this.setState({
          shelter: resdata.data,
          filteradms: resdata.data,
          refreshing: false,

        });
      });
  }
  GetAdminCabangAPi() {
    fetch('https://kilauindonesia.org/datakilau/api/penadmincabang')
      .then(res => {
        if (res.status === 200) return res.json();
      })
      .then(resdata => {
        // console.log(resdata.data);
        this.setState({
          admcabang: resdata.data,
          filteradmc: resdata.data,
          refreshing: false,

        });
      });
  }

  GetTutorAPi() {
    fetch('https://kilauindonesia.org/datakilau/api/tutor')
      .then(res => {
        if (res.status === 200) return res.json();
      })
      .then(resdata => {
        // console.log(resdata.data);
        this.setState({
          tutor: resdata.data,
          filtertutor: resdata.data,
          refreshing: false,

        });
      });
  }
  Hapuspengelola() {
    {
      fetch('https://kilauindonesia.org/datakilau/api/pengelolahps/' + this.state.cek.id_users, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data'
        },
      })
        .then((res) => res.json())
        .then((resJson) => {
          console.log(resJson);
          if (resJson.status === 'sukses') {

            ToastAndroid.show("Data berhasil dihapus!", ToastAndroid.SHORT)
          } else {
            alert(`Data gagal disimpan !!!`);
          }
        })
        .catch((err) => console.log('dari catch send Data ===', err));
    };
  }

  Hapusadmc() {
    {
      fetch('https://kilauindonesia.org/datakilau/api/admincabanghps/' + this.state.cek.id_users, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data'
        },
      })
        .then((res) => res.json())
        .then((resJson) => {
          console.log(resJson);
          if (resJson.status === 'sukses') {

            ToastAndroid.show("Data berhasil dihapus!", ToastAndroid.SHORT)
          } else {
            alert(`Data gagal disimpan !!!`);
          }
        })
        .catch((err) => console.log('dari catch send Data ===', err));
    };
  }
  onRefresh() {
    this.GetDonaturAPi();
    this.GetAdminShelterAPi();
    this.GetAdminCabangAPi();
    this.GetTutorAPi();
    this.setState({ refreshing: false });
  }
  componentDidMount() {
    this.GetDonaturAPi();
    this.GetAdminShelterAPi();
    this.GetAdminCabangAPi();
    this.GetTutorAPi();
    console.log(this.state.shelter);
  }
  filterListadminshelter(textToSearch) {
    this.setState({
      filteradms: this.state.shelter
        .filter(i => i.nama_lengkap.toLowerCase(textToSearch).includes(textToSearch))
    })
  }
  filterListadmincabang(textToSearch) {
    this.setState({
      filteradmc: this.state.admcabang
        .filter(i => i.nama_lengkap.toLowerCase(textToSearch).includes(textToSearch))
    })
  }
  filterListdonatur(textToSearch) {
    this.setState({
      filter: this.state.donatur
        .filter(i => i.nama_lengkap.toLowerCase(textToSearch).includes(textToSearch))
    })
  }
  filterListtutor(textToSearch) {
    this.setState({
      filtertutor: this.state.tutor
        .filter(i => i.nama.toLowerCase(textToSearch).includes(textToSearch))
    })
  }
  render() {
    const cek = this.state.cek

    const cabang = [
      { label: 'List Donatur', value: 'Donatur' },
      { label: 'List Admin Shelter', value: 'Admin' },
    ];
    const pusat = [
      { label: 'List Donatur', value: 'Donatur' },
      { label: 'List Tutor', value: 'Tutor' },
      { label: 'List Admin Shelter', value: 'Admin' },
      { label: 'List Admin Cabang', value: 'Cabang' },

    ];

    return (
      <View style={{ backgroundColor: '#fff' }}>
        {
          this.props.user.presensi === 'admin' ?  //tampilan untuk Admin cabang
            <SafeAreaView style={{ backgroundColor: '#fff' }}>
              <View style={{ backgroundColor: '#0EBEDF', height: 164 }}>
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
                    onChangeText={text => this.filterList(text)}
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

                <View style={{ marginTop: 30, marginHorizontal: 20 }}>
                  <SwitchSelector
                    fontSize={12}
                    fontFamily={'Poppins-Medium'}
                    options={cabang}
                    initial={0}
                    borderWidth={0}
                    height={49}
                    borderRadius={10}
                    hasPadding
                    // onPress={(value) => console.log(`Call onPress with value: ${value}`)}
                    onPress={value => {
                      this.setState({ cabang: value }),
                        ToastAndroid.show(value.toString(), ToastAndroid.SHORT);
                    }}

                  />
                </View>

              </View>


              {/* <View style={{flexDirection:'row'}}> */}
              {this.state.cabang === 'Donatur' | this.state.cabang === '' ?
                <FlatList
                  refreshControl={
                    <RefreshControl
                      refreshing={this.state.refreshing}
                      onRefresh={() => this.onRefresh()}
                    />
                  }
                  data={this.state.donatur}
                  renderItem={({ item }) => (
                    <View >
                      <View style={{}}>
                        <TouchableOpacity
                          onPress={() => this.props.navigation.navigate('ProfilDonatur', { item: item })}>

                          <View style={style.itemflat}>
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
                                      {item.full_name}
                                    </Text>
                                    <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                      <View style={{ flexDirection: 'row', }}>
                                        <SekolahH style={{ marginLeft: 10, }} />
                                        {
                                          item.nama_shelter === '' | item.nama_shelter === null | item.nama_shelter === 'null' ?
                                            <Text style={[style.labelkiri, { marginTop: -5 }]}>Belum Memasukan/Tidak Ada Shelter</Text>
                                            :
                                            <Text style={[style.labelkiri, { marginTop: 0 }]}>{item.nama_shelter}</Text>
                                        }
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
                  )}></FlatList>
                :
                <View></View>
              }
              {this.state.cabang === 'Admin' ?
                <FlatList
                  refreshControl={
                    <RefreshControl
                      refreshing={this.state.refreshing}
                      onRefresh={() => this.onRefresh()}
                    />
                  }
                  data={this.state.shelter}
                  renderItem={({ item }) => (
                    <View >
                      <View style={{}}>
                        <TouchableOpacity
                          onPress={() => this.props.navigation.navigate('ProfilAdminShelter', { item: item })}>

                          <View style={style.itemflat}>
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
                                    <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                      <View style={{ flexDirection: 'row', }}>
                                        <SekolahH style={{ marginLeft: 10, }} />
                                        {
                                          item.nama_shelter === '' | item.nama_shelter === null | item.nama_shelter === 'null' ?
                                            <Text style={[style.labelkiri, { marginTop: -5 }]}>Belum Memasukan/Tidak Ada Shelter</Text>
                                            :
                                            <Text style={[style.labelkiri, { marginTop: 0 }]}>{item.nama_shelter}</Text>
                                        }
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

                  )}></FlatList>
                :
                <View></View>

              }
              <ActionButton buttonColor='#00A9B8' offsetX={'7%'} offsetY={'170%'} bgColor="#000" bgOpacity={0.7}>
                <ActionButton.Item
                  buttonColor='#00A9B8'
                  title="Tambah Donatur"
                  offsetX={25}
                  hideShadow={true}
                  onPress={() => this.props.navigation.navigate('TambahDona')}
                  textStyle={{ fontSize: 14, fontFamily: 'Poppins-Medium' }}
                  buttonTextStyle={{ backgroundColor: '#000' }}
                >
                  <Adduser style={style.actionButtonIcon} />
                </ActionButton.Item>
                <ActionButton.Item
                  buttonColor='#00A9B8'
                  title="Tambah Admin Shelter"
                  offsetX={25}
                  hideShadow={true}
                  textStyle={{ fontSize: 14, fontFamily: 'Poppins-Medium' }}
                  onPress={() => this.props.navigation.navigate('TambahADMS')}
                >
                  <Adduser style={style.actionButtonIcon} />
                </ActionButton.Item>


              </ActionButton>
            </SafeAreaView >
            : <View />
        }

        {
          this.props.user.presensi === 'karyawan' ?  //tampilan untuk Admin Pusat
            <SafeAreaView style={{ backgroundColor: '#fff' }}>
              <View style={{ backgroundColor: '#0EBEDF', height: 164 }}>
                {this.state.pusat === 'Donatur' | this.state.pusat === '' ?
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
                        this.filterListdonatur(text.toLowerCase()), this.setState({ caridonatur: text })
                      }}
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
                  : <View />
                }

                {this.state.pusat === 'Tutor' ?
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
                        this.filterListtutor(text.toLowerCase()), this.setState({ carishelter: text })
                      }}
                      placeholder="Cari Tutor"
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
                  : <View />
                }

                {this.state.pusat === 'Admin' ?
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
                        this.filterListadminshelter(text.toLowerCase()), this.setState({ carishelter: text })
                      }}
                      placeholder="Cari admin shelter"
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
                  : <View />
                }

                {this.state.pusat === 'Cabang' ?
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
                        this.filterListadmincabang(text.toLowerCase()), this.setState({ caricabang: text })

                      }}
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
                  : <View />
                }

                <View style={{ marginTop: 30, marginHorizontal: 20 }}>
                  <SwitchSelector
                    fontSize={12}
                    fontFamily={'Poppins-Medium'}
                    options={pusat}
                    initial={0}
                    borderWidth={0}
                    height={49}
                    borderRadius={10}
                    hasPadding
                    // onPress={(value) => console.log(`Call onPress with value: ${value}`)}
                    onPress={value => {
                      this.setState({ pusat: value }),
                        ToastAndroid.show(value.toString(), ToastAndroid.SHORT);
                    }}

                  />
                </View>

              </View>

              {this.state.pusat === 'Tutor' ?
                <FlatList
                  refreshControl={
                    <RefreshControl
                      refreshing={this.state.refreshing}
                      onRefresh={() => this.onRefresh()}
                    />
                  }
                  data={this.state.filtertutor}
                  renderItem={({ item }) =>
                    <View>
                      <View style={{}}>
                        <TouchableOpacity
                          style={style.itemflat}
                          onPress={() => this.props.navigation.navigate('ProfilTutoradmin', { item: item, })}>
                          <View
                            style={{
                              height: 90,
                              width: '100%',
                              justifyContent: 'center',
                              marginLeft: 20,
                            }}>
                            <View
                              style={{
                                flexDirection: 'row',
                                alignItems: 'center',

                              }}>
                              <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                                <Image
                                  source={{ uri: 'https://kilauindonesia.org/datakilau/gambarUpload/' + item.foto }}
                                  style={{
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    alignSelf: 'center',
                                    height: 70,
                                    width: 70,
                                    borderRadius: 45,
                                    color: '#000',
                                  }}
                                />

                                <View
                                  style={{ flexDirection: 'column', marginLeft: 10 }}>
                                  <View style={{ flexDirection: 'row', justifyContent: "space-between" }}>
                                    <Text
                                      style={{
                                        color: '#000',
                                        fontFamily: 'Poppins-Medium',
                                        fontSize: 12,
                                        marginTop: 10,
                                        marginLeft: 10,
                                        width: 100
                                      }}>
                                      {item.nama}
                                    </Text>
                                    <View style={{
                                      height: 32,
                                      marginRight: item.status === 'tidak aktif' ? 30 : 30,
                                      width: '40%',
                                      padding: 5,
                                      borderRadius: 5,
                                      backgroundColor:
                                        item.status === 'aktif'
                                          ? '#0076B8'
                                          : '#E32845'
                                    }}>
                                      {item.status === 'tidak aktif' || item.status === null ?
                                        <Text style={{ color: '#fff', fontSize: 12, textAlign: 'center', marginTop: 2 }}>TIdak Aktif</Text>
                                        : <Text style={{ color: '#fff', fontSize: 12, textAlign: 'center', marginTop: 2 }}>{item.status}</Text>
                                      }

                                    </View>
                                  </View>

                                  {/* <Text
                                    style={{
                                      color: '#000',
                                      fontFamily: 'Poppins-Regular',
                                      fontSize: 14,
                                      marginLeft: 10,
                                    }}>
                                    {item.pendidikan}
                                  </Text> */}
                                  <View
                                    style={{
                                      flexDirection: 'row',
                                      marginTop: 10,
                                      marginLeft: 10,
                                    }}>
                                    <Bukuabu />
                                    <Text
                                      style={{
                                        color: '#5D5C5D',
                                        fontFamily: 'Poppins-Regular',
                                        fontSize: 12,
                                        marginLeft: 5,
                                      }}>
                                      {item.mapel}
                                    </Text>
                                    {/* <Locationabu />
                                    <Text
                                      style={{
                                        color: '#5D5C5D',
                                        fontFamily: 'Poppins-Regular',
                                        fontSize: 12,
                                        marginLeft: 5,
                                        marginRight: 10,
                                      }}>
                                      {item.nama_wilbin}
                                    </Text> */}
                                  </View>
                                </View>
                              </View>
                            </View>
                          </View>
                        </TouchableOpacity>
                      </View>
                    </View>
                  }>
                </FlatList>
                : <View />
              }

              {/* <View style={{flexDirection:'row'}}> */}
              {this.state.pusat === 'Donatur' | this.state.pusat === '' ?
                <FlatList
                  refreshControl={
                    <RefreshControl
                      refreshing={this.state.refreshing}
                      onRefresh={() => this.onRefresh()}
                    />
                  }
                  data={this.state.filter}
                  renderItem={({ item }) => (
                    <View>
                      <View>
                        <View style={{}}>
                          <TouchableOpacity onPress={() => this.setState({ edit: true, cek: item })}
                            onLongPress={() => this.props.navigation.navigate('ProfilDonatur', { item: item })}>
                            <View style={style.itemflat}>
                              <View style={{ justifyContent: 'space-between', flexDirection: 'row', marginHorizontal: '10%', height: 80, }}>
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
                                    : <Text style={{ color: '#fff', fontSize: 9, textAlign: 'center' }}>{item.diperuntukkan}</Text>
                                  }

                                </View>
                              </View>

                            </View>
                          </TouchableOpacity>

                        </View>

                      </View>
                    </View >



                  )}></FlatList>
                :
                <View></View>
              }
              {this.state.pusat === 'Admin' ?
                <FlatList
                  refreshControl={
                    <RefreshControl
                      refreshing={this.state.refreshing}
                      onRefresh={() => this.onRefresh()}
                    />
                  }
                  data={this.state.filteradms}
                  renderItem={({ item }) => (
                    <View >
                      <View style={{}}>
                        <TouchableOpacity
                          onLongPress={() => this.props.navigation.navigate('ProfilAdminShelter', { item: item })}
                          onPress={() => this.setState({ edit: true, cek: item })} >
                          <View style={style.itemflat}>
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
                                  <Image source={{ uri: 'https://kilauindonesia.org/datakilau/gambarUpload/' + item.foto }}
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
                                    <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                      <View style={{ flexDirection: 'row', }}>
                                        <SekolahH style={{ marginLeft: 10, }} />
                                        {
                                          item.nama_shelter === '' | item.nama_shelter === null | item.nama_shelter === 'null' ?
                                            <Text style={[style.labelkiri, { marginTop: -5 }]}>Belum Memasukan/Tidak Ada Shelter</Text>
                                            :
                                            <Text style={[style.labelkiri, { marginTop: 0 }]}>{item.nama_shelter}</Text>
                                        }
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

                  )}></FlatList>
                :
                <View></View>

              }

              {
                this.state.pusat === 'Cabang' ?
                  <FlatList
                    style={{ height: '100%' }}
                    refreshControl={
                      <RefreshControl
                        refreshing={this.state.refreshing}
                        onRefresh={() => this.onRefresh()}
                      />
                    }
                    data={this.state.filteradmc}
                    renderItem={({ item }) => (
                      <View>
                        <View style={{}}>
                          <TouchableOpacity
                            onLongPress={() => this.props.navigation.navigate('ProfilAdminCabang', { item: item })}
                            onPress={() => this.setState({ edit: true, cek: item })} >
                            <View style={style.itemflat}>
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
                                    <Image source={{ uri: 'https://kilauindonesia.org/datakilau/gambarUpload/' + item.foto }}
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
                                      <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                        <View style={{ flexDirection: 'row', }}>
                                          <SekolahH style={{ marginLeft: 10, }} />
                                          {
                                            item.alamat === '' | item.alamat === null | item.alamat === 'null' ?
                                              <Text style={[style.labelkiri, { marginTop: -5 }]}>Belum Memasukan/Tidak Ada Alamat</Text>
                                              :
                                              <Text style={[style.labelkiri, { marginTop: 0 }]}>{item.alamat}</Text>
                                          }
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

                    )}></FlatList>
                  :
                  <View></View>

              }
              <ActionButton buttonColor='#00A9B8' offsetX={'7%'} offsetY={'170%'} bgColor="#000" bgOpacity={0.7}>
                <ActionButton.Item
                  buttonColor='#00A9B8'
                  title="Tambah Donatur"
                  offsetX={25}
                  hideShadow={true}
                  onPress={() => this.props.navigation.navigate('TambahDona')}
                  textStyle={{ fontSize: 14, fontFamily: 'Poppins-Medium' }}
                  buttonTextStyle={{ backgroundColor: '#000' }}
                >
                  <Adduser style={style.actionButtonIcon} />
                </ActionButton.Item>
                <ActionButton.Item
                  buttonColor='#00A9B8'
                  title="Tambah Admin Shelter"
                  offsetX={25}
                  hideShadow={true}
                  textStyle={{ fontSize: 14, fontFamily: 'Poppins-Medium' }}
                  onPress={() => this.props.navigation.navigate('TambahADMS')}
                >
                  <Adduser style={style.actionButtonIcon} />
                </ActionButton.Item>

                <ActionButton.Item
                  buttonColor='#00A9B8'
                  title="Tambah Admin Cabang"
                  hideShadow={true}
                  offsetX={25}
                  textStyle={{ fontSize: 14, fontFamily: 'Poppins-Medium' }}
                  onPress={() => this.props.navigation.navigate('TambahADMC')}
                >
                  <Adduser style={style.actionButtonIcon} />
                </ActionButton.Item>

                <ActionButton.Item
                  buttonColor='#00A9B8'
                  title="Tambah Tutor"
                  offsetX={25}
                  hideShadow={true}
                  textStyle={{ fontSize: 14, fontFamily: 'Poppins-Medium' }}
                  onPress={() => this.props.navigation.navigate('TambahTutor')}
                >
                  <Adduser style={style.actionButtonIcon} />
                </ActionButton.Item>
              </ActionButton>


              <Modal animationType={"fade"} transparent={true}
                visible={this.state.edit}
                onRequestClose={() => this.setState({ edit: false })}>

                <SafeAreaView style={style.containerSafe}>
                  <TouchableOpacity activeOpacity={1.0} onPress={() => this.setState({ edit: false })} style={style.ModalCont}>
                    <View style={{
                      paddingTop: 5,
                      marginHorizontal: 10,
                      backgroundColor: '#fff',
                      // flexDirection: 'row',
                      borderRadius: 20,
                      height: 200,
                      shadowColor: "#333",
                      shadowOffset: {
                        width: 1,
                        height: 1,
                      },
                      shadowOpacity: 0.3,
                      shadowRadius: 2,
                      elevation: 3,
                      alignItems: 'center'
                    }}>
                      <TouchableOpacity onPress={() => this.setState({ edit: false })} style={{ position: 'absolute', right: 20, top: 5 }}>
                        <Close />
                      </TouchableOpacity>
                      <Text style={style.txtPresensi}>Pilih Pengaturan</Text>
                      <Text style={{ marginTop: '5%', fontWeight: 'bold' }}>{cek.nama_lengkap}</Text>
                      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: '5%' }}>
                        <View style={[style.kotakkecil, { backgroundColor: '#00A9B8' }]}>
                          <TouchableOpacity onPress={() => this.setState({ edit: false })}>
                            {/* <KKada style={{ justifyContent: 'center', alignSelf: 'center' }} /> */}
                            <Text style={{ color: '#fff', textAlign: 'center', padding: 5, fontWeight: 'bold' }}>Batal</Text>
                          </TouchableOpacity>
                        </View>

                        <View style={[style.kotakkecil, { backgroundColor: '#DC143C', }]}>
                          <TouchableOpacity onPress={() =>
                            Alert.alert(
                              'Peringatan',
                              'Apakah Anda Ingin Mengapus',
                              [
                                {
                                  text: 'Ya',
                                  onPress: () => { this.state.pusat === 'Admin' ? this.Hapuspengelola() : this.state.pusat === 'Cabang' ? this.Hapusadmc() : this.state.pusat === 'Donatur' ? this.HapusDonatur() : this.HapusTutor(), { edit: false } },
                                  style: 'cancel',
                                },
                                {
                                  text: "Cancel",
                                  onPress: () => console.log("Cancel Pressed"),
                                  style: "cancel"
                                },
                              ],
                              { cancelable: false },
                            )
                          }
                          >
                            {/* <KKada style={{ justifyContent: 'center', alignSelf: 'center' }} /> */}
                            <Text style={{ color: '#fff', textAlign: 'center', padding: 5, fontWeight: 'bold' }}>Hapus</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                </SafeAreaView>
              </Modal>
            </SafeAreaView >
            : <View />
        }
      </View >
    )
  }
}
const style = StyleSheet.create({
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

  IconCari: {
    position: 'absolute',
    top: 8,
    left: 20,
  },
  labelkiri: {
    fontSize: 12,
    fontWeight: 'bold',
    marginVertical: 5,
    marginLeft: 10,
    width: 180,
  },
  containerSafe: {
    flex: 1,
    flexDirection: 'column',
  },
  ModalCont: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#00000099',
    paddingHorizontal: 10,
  },
  kotakkecil: {
    flexDirection: 'column',
    borderColor: '#bdbdbd',
    borderWidth: 1,
    width: '40%',
    // height: 0,
    justifyContent: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    textAlign: 'center',
    alignItems: 'center',
    borderRadius: 10,
    padding: 16,
    marginTop: 10,
    marginHorizontal: 10,
  },
});
const mapStateToProps = (state) => {
  return {
    user: state,
    initialState: state
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeUser: (data) => dispatch({ type: 'CHANGE/USER', payload: data }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(UserManagement);