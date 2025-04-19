import {
  RefreshControl,
  Dimensions,
  ToastAndroid,
  TextInput,
  TouchableOpacity,
  Alert,
  FlatList,
  SafeAreaView,
  Image,
  Text,
  View,
  Modal,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import React, { Component } from 'react';
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
  AccordionList,
} from 'accordion-collapse-react-native';
import {
  test,
  Warnahijau
} from '../../assets/images';
import {
  HeaderKelKun,
  PanahBulatKiri,
  TitikTiga,
  LocationsH,
  JenisH,
  TingkatH,
  Adduser,
  Close,
} from '../../assets/icons';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'react-native-image-picker';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import { connect } from 'react-redux';
import { useState } from 'react';
import moment from 'moment';
import { ScrollView, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import ActionButton from 'react-native-action-button';


const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;
export class KelompokKun extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gambar: '',
      img: {
        0: {
          image: {
            name: '',
            type: '',
            uri: 'https://static.thenounproject.com/png/187803-200.png',
          },
        },
      },
      imgp: {
        0: {
          image: {
            name: '',
            type: '',
            uri: 'https://static.thenounproject.com/png/187803-200.png',
          },
        },
      },
      img1: null,
      img2: 0,
      img3: null,
      fil: false,
      img4: 0,
      count: 1,
      Camera: '',
      nama: '',
      Tutor: [],
      search: [],
      detak: [],
      modaldetail: 'false',
      collapse: 'false',
      index: -1,
      modalTamAK: false,
      modalTamPel: false,
      pel: '',
      date: new Date(),
      modaldate: false,
      simpan: false,
      setOpen: '',
      setDate: '',
      chosenDate: '',
      myd: '',
      materi: [],
      check: false,
      Pel: '',
      filter: [],
      refreshing: true,
      options: '',
      listfilter: '',
      kelas: '',
      ST: '',
      SMP: '',
      select: '',
      unselect: '',
      anak: [],
      edit: false,
      detail: this.props.route.params.item,
      namakelompok: this.props.route.params.item.nama_kelompok,
      level: [],
      pillev: this.props.route.params.item.id_level_anak_binaan,
      pilih: false,
      pilihkelompok: false,
      hapus: '',
      id_shelter: this.props.route.params.id_shelter,
      Kelompok: [],
      ganti: '',
      det: [],
    };
  }

  Hapuskelompok() {
    {
      fetch('https://kilauindonesia.org/datakilau/api/kelompokhps/' + this.state.detail.id_kelompok, {
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
            this.onRefresh()
            this.props.navigation.navigate('DataKelshel')
            ToastAndroid.show("Data berhasil dihapus!", ToastAndroid.SHORT)
          } else {
            alert(`Data gagal disimpan !!!`);
          }
        })
        .catch((err) => console.log('dari catch send Data ===', err));
    };
  }
  editData() {
    {
      let simpandata = {
        id_level_anak_binaan: this.state.pillev,
        nama_kelompok: this.state.namakelompok,
      }
      let data = new FormData();
      for (let key in simpandata) {
        data.append(key, simpandata[key]);
      }
      fetch('https://kilauindonesia.org/datakilau/api/kelompokupd/' + this.state.detail.id_kelompok, {
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
            this.onRefresh()
            ToastAndroid.show("Data berhasil diperbaharui!", ToastAndroid.SHORT)
          } else {
            alert(`Data gagal disimpan !!!`);
          }
        })
        .catch((err) => console.log('dari catch send Data ===', err));
    }

  }
  pindahkelanak(id_kelompok) {
    {
      let simpandata = {
        id_kelompok: id_kelompok,
      }
      let data = new FormData();
      for (let key in simpandata) {
        data.append(key, simpandata[key]);
      }
      fetch('https://kilauindonesia.org/datakilau/api/pindahkelanak/' + this.state.det.id_anak, {
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
            this.onRefresh()
            this.setState({ pilih: false })
          } else {
            alert(`Data gagal disimpan !!!`);
          }
        })
        .catch((err) => console.log('dari catch send Data ===', err));
    }

  }
  editDataanak(id_kelompok) {
    {
      let simpandata = {
        id_kelompok: this.state.hapus,
      }
      let data = new FormData();
      for (let key in simpandata) {
        data.append(key, simpandata[key]);
      }
      fetch('https://kilauindonesia.org/datakilau/api/kelanakupdhps/' + id_kelompok, {
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
            this.onRefresh()
            this.setState({ pilih: false })
          } else {
            alert(`Data gagal disimpan !!!`);
          }
        })
        .catch((err) => console.log('dari catch send Data ===', err));
    }

  }
  GetAnakAPi() {
    fetch('https://kilauindonesia.org/datakilau/api/anakkelompok/' + this.state.detail.id_kelompok)
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
  GetLevelAPi() {
    fetch('https://kilauindonesia.org/datakilau/api/levelbinaan')
      .then(res => {
        if (res.status === 200) return res.json();
      })
      .then(resdata => {
        console.log(resdata.data);
        this.setState({
          level: resdata.data,
          refreshing: false,
        });
      });
  }
  GetKelompokAPi() {
    fetch('https://kilauindonesia.org/datakilau/api/kelompok/' + this.state.id_shelter)
      .then(res => {
        if (res.status === 200) return res.json();
      })
      .then(resdata => {
        console.log(resdata.data);
        this.setState({
          Kelompok: resdata.data,
          // refreshing:resdata.data,
        });
      });
  }
  componentDidMount() {
    this.GetAnakAPi();
    this.GetLevelAPi();
    this.GetKelompokAPi();
    console.log();
  }
  componentWillUnmount() {
    this.mounted = false;
  }
  filterList(textToSearch) {
    this.setState({
      Tutor: this.state.Tutor.filter(i =>
        i.nama.toLowerCase().includes(textToSearch),
      ),
    });
  }
  onRefresh() {
    this.GetAnakAPi();
    this.setState({ refreshing: false });
  }
  render() {
    const det = this.state.det
    const fillv =
      this.state.level.filter((item, index) => {
        return this.state.level.findIndex(i => i.nama_level_binaan === item.nama_level_binaan) === index;
      })
    const detail = this.state.detail
    const listfilter = [
      { label: 'Kemarin', value: 'Kemarin' },
      {
        label: '1 Minggu yang lalu',
        value: '1 Minggu yang lalu'
      },
      {
        label: '1 Bulan yang lalu',
        value: '1 Bulan yang lalu'
      },
      {
        label: 'Pilih Sendiri',
        value: 'Pilih Sendiri'
      },
    ];

    var Pel = [
      { label: 'Reguler', value: 'Reguler' },
      { label: 'Quran', value: 'Quran' },
    ];
    const { detak } = this.state;
    var img = [];
    for (let i = 0; i <= this.state.img2; i++) {
      img.push(
        <Image
          style={{ width: 200, height: 200, resizeMode: 'contain' }}
          source={this.state.img[i].image}
        />,
      );
    }
    var imgpel = [];
    for (let i = 0; i <= this.state.img4; i++) {
      imgpel.push(
        <Image
          style={{ width: 200, height: 200, resizeMode: 'contain' }}
          source={this.state.imgp[i].image}
        />,
      );
    }

    return (

      <View style={{ backgroundColor: '#fff', flex: 1 }}>
        {
          this.props.user.presensi === '' ?  // ini tampilan untuk Pengelola//
            <View style={{ flex: 1 }}>
              <ScrollView >
                <ImageBackground source={Warnahijau} style={{ height: 200, width: width }} />
                <View>
                  <View style={{ flexDirection: 'row', marginTop: '-50%', marginHorizontal: 20, width: width * 1.6, alignItems: 'center', justifyContent: 'space-between' }}>
                    <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('DetailKelompok')}>
                      <PanahBulatKiri />
                    </TouchableWithoutFeedback>
                    <View>

                    </View>
                  </View>
                  <Text style={style.title2}>{detail.nama_kelompok}</Text>
                  <View style={{ flexDirection: 'row', position: 'absolute', marginTop: 20 }}>
                    <Text style={style.title3}>{detail.jumlah}</Text>
                    <Text style={style.title4}>Orang</Text>
                  </View>
                </View>


                {/* <View style={{flexDirection:'row'}}> */}
                <ScrollView>
                  <FlatList
                    refreshControl={
                      <RefreshControl
                        refreshing={this.state.refreshing}
                        onRefresh={() => this.onRefresh()}
                      />
                    }
                    data={this.state.anak}
                    renderItem={({ item }) => (
                      <View style={{}}>
                        <TouchableOpacity
                          onPress={() => this.props.navigation.navigate('Detail1', { id_anak: item.id_anak, item: item })}>

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
                                    <View style={{ flexDirection: 'row' }}>
                                      {/* <View style={{ flexDirection: 'row' }}>
                                      <JenisH style={{ marginLeft: 10 }} />
                                      <Text style={{ color: '#000', fontSize: 10, marginLeft: 5, fontFamily: 'Poppins-Regular' }}>Non-Tahfidz</Text>
                                    </View> */}

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
                </ScrollView>


              </ScrollView>
              <ActionButton buttonColor='#00A9B8' offsetX={'7%'} offsetY={'160%'} bgColor="#000" bgOpacity={0.7}>
                <ActionButton.Item
                  buttonColor='#00A9B8'
                  title="Masukan Anak "
                  offsetX={25}
                  hideShadow={true}
                  onPress={() => this.props.navigation.navigate('MasukanAnak', { detail: this.state.detail })}
                  textStyle={{ fontSize: 14, fontFamily: 'Poppins-Medium' }}
                  buttonTextStyle={{ backgroundColor: '#000' }}
                >
                  <Adduser style={style.actionButtonIcon} />
                </ActionButton.Item>

                <ActionButton.Item
                  buttonColor='#00A9B8'
                  title="Edit Kelompok"
                  offsetX={25}
                  hideShadow={true}
                  textStyle={{ fontSize: 14, fontFamily: 'Poppins-Medium' }}
                  onPress={() => this.setState({ edit: true })}
                >
                  <Adduser style={style.actionButtonIcon} />
                </ActionButton.Item>


              </ActionButton>
            </View>
            :
            <View />
        }
        {
          this.props.user.presensi === 'Tutor' ?  // ini tampilan untuk Tutor//
            <View style={{ backgroundColor: '#fff', height: '100%' }}>
              <ImageBackground source={Warnahijau} style={{ height: height * 0.3, width: width }} />
              <View>
                <View style={{ flexDirection: 'row', marginTop: '-50%', marginHorizontal: 20, width: width * 1.6, alignItems: 'center', justifyContent: 'space-between' }}>
                  <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('DetailKelompok')}>
                    <PanahBulatKiri />
                  </TouchableWithoutFeedback>
                  <View>

                  </View>
                </View>
                <Text style={style.title2}>{detail.nama_kelompok}</Text>
                <View style={{ flexDirection: 'row', position: 'absolute', marginTop: 20 }}>
                  <Text style={style.title3}>{this.state.anak.length}</Text>
                  <Text style={style.title4}>Orang</Text>
                </View>
              </View>



              {/* <View style={{flexDirection:'row'}}> */}
              <FlatList
                refreshControl={
                  <RefreshControl
                    refreshing={this.state.refreshing}
                    onRefresh={() => this.onRefresh()}
                  />
                }
                data={this.state.anak}
                renderItem={({ item }) => (
                  <View style={{}}>
                    <TouchableOpacity
                    // onPress={() =>
                    //   this.setState({ pilih: true, det: item, id_anak: item.id_anak })
                    // }
                    >

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
                                <View style={{ flexDirection: 'row' }}>
                                  <View style={{ flexDirection: 'row' }}>
                                    <JenisH style={{ marginLeft: 10 }} />
                                    <Text style={{ color: '#000', fontSize: 10, marginLeft: 5, fontFamily: 'Poppins-Regular' }}>{item.jenis_anak_binaan
                                    }</Text>
                                  </View>

                                  {/* <View style={{ flexDirection: 'row', }}>
                                    <TingkatH style={{ marginLeft: 10, }} />
                                    <Text style={{ color: '#000', fontSize: 10, fontFamily: 'Poppins-Regular', marginLeft: 5 }}>{item.kelas}</Text>
                                  </View> */}

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
            :
            <View />
        }
        {
          this.props.user.presensi === 'karyawan' ?  // ini tampilan untuk admin //
            <View style={{ backgroundColor: '#fff', height: '100%' }}>
              <ImageBackground source={Warnahijau} style={{ height: height * 0.3, width: width }} />
              <View>
                <View style={{ flexDirection: 'row', marginTop: '-50%', marginHorizontal: 20, width: width * 1.6, alignItems: 'center', justifyContent: 'space-between' }}>
                  <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('DetailKelompok')}>
                    <PanahBulatKiri />
                  </TouchableWithoutFeedback>
                  <View>

                  </View>
                </View>
                <Text style={style.title2}>{detail.nama_kelompok}</Text>
                <View style={{ flexDirection: 'row', position: 'absolute', marginTop: 20 }}>
                  <Text style={style.title3}>{this.state.anak.length}</Text>
                  <Text style={style.title4}>Orang</Text>
                </View>
              </View>



              {/* <View style={{flexDirection:'row'}}> */}
              <FlatList
                refreshControl={
                  <RefreshControl
                    refreshing={this.state.refreshing}
                    onRefresh={() => this.onRefresh()}
                  />
                }
                data={this.state.anak}
                renderItem={({ item }) => (
                  <View style={{}}>
                    <TouchableOpacity
                      onPress={() =>
                        this.setState({ pilih: true, det: item, id_anak: item.id_anak })
                      }>

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
                              <Image
                                source={test}
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
              <ActionButton buttonColor='#00A9B8' offsetX={'7%'} offsetY={'130%'} bgColor="#000" bgOpacity={0.7}>
                <ActionButton.Item
                  buttonColor='#00A9B8'
                  title="Masukan Anak Ke kelompok"
                  offsetX={25}
                  hideShadow={true}
                  onPress={() => this.props.navigation.navigate('MasukanAnak', { detail: this.state.detail })}
                  textStyle={{ fontSize: 14, fontFamily: 'Poppins-Medium' }}
                  buttonTextStyle={{ backgroundColor: '#000' }}
                >
                  <Adduser style={style.actionButtonIcon} />
                </ActionButton.Item>
                <ActionButton.Item
                  buttonColor='#00A9B8'
                  title="Edit Kelompok"
                  offsetX={25}
                  hideShadow={true}
                  textStyle={{ fontSize: 14, fontFamily: 'Poppins-Medium' }}
                  onPress={() => this.setState({ edit: true, detail: detail })}
                >
                  <Adduser style={style.actionButtonIcon} />
                </ActionButton.Item>

                <ActionButton.Item
                  buttonColor='#00A9B8'
                  title="Hapus Kelompok"
                  offsetX={25}
                  hideShadow={true}
                  textStyle={{ fontSize: 14, fontFamily: 'Poppins-Medium' }}
                  onPress={() => this.state.anak.length === 0 ? this.Hapuskelompok() :
                    Alert.alert(
                      'Peringatan',
                      'Pindahkan/Hapus Terlebih dahulu Anak yang ada di Kelompok ini',
                      [
                        {
                          text: "Ya",
                          onPress: () => console.log("Cancel Pressed"),
                          style: "cancel"
                        },
                      ],
                      { cancelable: false },
                    )}
                >
                  <Adduser style={style.actionButtonIcon} />
                </ActionButton.Item>
              </ActionButton>
            </View>
            :
            <View />
        }

        <Modal animationType={"fade"} transparent={true}
          visible={this.state.pilih}
          onRequestClose={() => this.setState({ pilih: false })}>

          <SafeAreaView style={style.containerSafe}>
            <TouchableOpacity activeOpacity={1.0} onPress={() => this.setState({ pilih: false })} style={style.ModalCont}>
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
                <TouchableOpacity onPress={() => this.setState({ pilih: false })} style={{ position: 'absolute', right: 20, top: 5 }}>
                  <Close />
                </TouchableOpacity>
                <Text style={style.txtPresensi}>Pilih Pengaturan</Text>
                <Text style={{ marginTop: '1%', fontWeight: 'bold' }}>{det.full_name}</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>


                  <View style={[style.kotakkecil, { backgroundColor: '#DC143C', }]}>
                    <TouchableOpacity onPress={() =>
                      Alert.alert(
                        'Peringatan',
                        'Apakah Anda Ingin Menghapus Anak dari Kelompok ini ?',
                        [
                          {
                            text: 'Ya',
                            onPress: () => { this.editDataanak(det.id_anak), { pilih: false } },
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

                  <View style={[style.kotakkecil, { backgroundColor: '#00A9B8' }]}>
                    <TouchableOpacity onPress={() => this.setState({ pilih: false, pilihkelompok: true })}>
                      {/* <KKada style={{ justifyContent: 'center', alignSelf: 'center' }} /> */}
                      <Text style={{ color: '#fff', textAlign: 'center', padding: 5, fontWeight: 'bold' }}>Pindah</Text>
                    </TouchableOpacity>
                  </View>
                </View>

                <View style={{
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
                  marginTop: 20,
                }}>
                  <TouchableOpacity onPress={() => this.setState({ pilih: false })}>
                    {/* <KKada style={{ justifyContent: 'center', alignSelf: 'center' }} /> */}
                    <Text style={{ color: '#00A9B8', textAlign: 'center', padding: 5, fontWeight: 'bold', fontSize: 14 }}>Batal</Text>
                  </TouchableOpacity>
                </View>
                {/* <View style={{ marginTop: '5%', alignItems: 'center', flexDirection: 'row', alignContent: 'center', }}>
                        <TouchableOpacity onPress={() => this.setState({ edit: false })}>
                          <View style={{ height: 50, borderColor: '#00A9B8', borderWidth: 1, width: 100, justifyContent: 'center', alignItems: 'center', alignSelf: 'center', borderRadius: 5 }}>
                            <Text style={{ color: '#00A9B8', fontFamily: 'Poppins-Medium', fontSize: 14 }}>Batal</Text>
                          </View>
                        </TouchableOpacity>

                      </View> */}
              </View>
            </TouchableOpacity>
          </SafeAreaView>
        </Modal>
        <Modal animationType={"fade"} transparent={true}
          visible={this.state.pilihkelompok}
          onRequestClose={() => this.setState({ pilihkelompok: false })}>

          <SafeAreaView style={style.containerSafe}>
            <TouchableOpacity activeOpacity={1.0} onPress={() => this.setState({ pilihkelompok: false })} style={style.ModalCont}>
              <View style={{
                paddingTop: 5,
                marginHorizontal: 10,
                backgroundColor: '#fff',
                // flexDirection: 'row',
                borderRadius: 20,
                height: "65%",
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
                <TouchableOpacity onPress={() => this.setState({ pilihkelompok: false })} style={{ position: 'absolute', right: 20, top: 5 }}>
                  <Close />
                </TouchableOpacity>
                <Text style={style.txtPresensi}>untuk anak</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <FlatList
                    refreshControl={
                      <RefreshControl
                        refreshing={this.state.refreshing}
                        onRefresh={() => this.onRefresh()}
                      />
                    }
                    data={this.state.Kelompok}
                    renderItem={({ item }) => (
                      <View>
                        <TouchableOpacity onPress={() => { this.pindahkelanak(item.id_kelompok), this.setState({ pilihkelompok: false }) }}>
                          <View style={style.itemflat}>
                            <View style={{ justifyContent: 'space-between', flexDirection: 'row', marginHorizontal: '10%' }}>
                              <View style={{ flexDirection: 'row', justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                                <LocationsH />
                                <Text style={[style.labelkiri,]}>{item.nama_kelompok}</Text>
                              </View>

                            </View>
                          </View>
                        </TouchableOpacity>

                      </View>


                    )}></FlatList>




                </View>

                <View style={{
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
                  marginTop: 20,
                }}>
                  <TouchableOpacity onPress={() => this.setState({ pilihkelompok: false })}>
                    {/* <KKada style={{ justifyContent: 'center', alignSelf: 'center' }} /> */}
                    <Text style={{ color: '#00A9B8', textAlign: 'center', padding: 5, fontWeight: 'bold', fontSize: 14 }}>Batal</Text>
                  </TouchableOpacity>
                </View>
                {/* <View style={{ marginTop: '5%', alignItems: 'center', flexDirection: 'row', alignContent: 'center', }}>
                        <TouchableOpacity onPress={() => this.setState({ edit: false })}>
                          <View style={{ height: 50, borderColor: '#00A9B8', borderWidth: 1, width: 100, justifyContent: 'center', alignItems: 'center', alignSelf: 'center', borderRadius: 5 }}>
                            <Text style={{ color: '#00A9B8', fontFamily: 'Poppins-Medium', fontSize: 14 }}>Batal</Text>
                          </View>
                        </TouchableOpacity>

                      </View> */}
              </View>
            </TouchableOpacity>
          </SafeAreaView>
        </Modal>
        <Modal animationType={"fade"} transparent={true}
          visible={this.state.edit}
          onRequestClose={() => this.setState({ edit: false })}>

          <View style={{
            backgroundColor: '#fff',
            paddingTop: 5,
            marginHorizontal: 5,
            marginTop: '50%',
            borderRadius: 20,
            height: '35%',
            width: '90%',
            borderWidth: 1,
            alignItems: 'center',
            flexDirection: 'column',
            justifyContent: 'center',
            alignSelf: 'center'
          }}>
            <SafeAreaView style={{ alignItems: 'center' }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
              </View>


              <View style={style.form}>
                <Text style={style.labelkiri}>Level Binaan</Text>
                <View
                  style={style.kotakpicker}>
                  <Picker
                    style={style.Textinputcss}

                    selectedValue={this.state.pillev}
                    onValueChange={(itemValue,) => {
                      this.setState({
                        pillev: itemValue
                      })
                    }}>
                    <Picker.Item style={{ fontSize: 12 }} label="Pilih" value={''} key={'0'} />
                    {
                      this.state.level.map((pillev, index) =>
                        <Picker.Item style={{ height: '100%', width: '100%', fontSize: 12, }} label={pillev.nama_level_binaan} value={pillev.id_level_anak_binaan} key={index} />
                      )}
                  </Picker>

                </View>
              </View>
              <View style={style.form}>
                <Text style={style.labelkiri}>Nama Kelompok</Text>
                <TextInput
                  style={style.kotak3}
                  onChangeText={namakelompok => this.setState({ namakelompok })}
                  value={this.state.namakelompok}
                  keyboardType='default'
                  placeholder=""
                  placeholderTextColor="#C0C0C0"
                />
              </View>
              <View style={{ marginTop: '2%', alignItems: 'center', flexDirection: 'row', alignContent: 'center', margin: 20, }}>
                <TouchableOpacity style={{ marginRight: 10 }} onPress={() => this.setState({ edit: false }) + ToastAndroid.show('Batal', ToastAndroid.SHORT)}>
                  <View style={{ height: 50, borderColor: '#00A9B8', borderWidth: 1, width: 100, justifyContent: 'center', alignItems: 'center', alignSelf: 'center', borderRadius: 5 }}>
                    <Text style={{ color: '#00A9B8', fontFamily: 'Poppins-Medium', fontSize: 14 }}>Kembali</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity style={{ marginLeft: 10 }} onPress={() => this.props.navigation.navigate('DataKelshel', { edit: false }, this.editData())}>
                  <View style={{ height: 50, borderColor: '#00A9B8', borderWidth: 1, width: 100, justifyContent: 'center', alignItems: 'center', alignSelf: 'center', borderRadius: 5 }}>
                    <Text style={{ color: '#00A9B8', fontFamily: 'Poppins-Medium', fontSize: 14 }}>Simpan</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </SafeAreaView>
          </View >

        </Modal >
      </View>
    );
  }
}
const style = StyleSheet.create({
  contentContainer: {
    flex: 1,
  },
  containerfoto: {
    marginTop: 40,
    multiline: true,
    marginLeft: 100,
    width: 200,
    height: 200,
    flex: 1,
    margin: 20,
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    shadowColor: '#333',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    borderColor: '#7e7e7e',
    elevation: 3,
  },
  btnSimpanDark: {
    width: '40%',
    fontWeight: 'bold',
    backgroundColor: '#87cefa',
    borderRadius: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#E9E9E9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnSimpanUn: {
    width: '40%',
    fontWeight: 'bold',
    backgroundColor: '#C6C6C6',
    borderRadius: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#E9E9E9',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  btnSimpanUn1: {
    width: '40%',
    fontWeight: 'bold',
    backgroundColor: '#C6C6C6',
    borderRadius: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#E9E9E9',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    textAlign: 'center',
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

  btnSimpan2: {
    borderWidth: 1,
    borderColor: '#00A9B8',
    padding: '4%',
    borderRadius: 10,
    marginTop: '6%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tambah: {
    position: 'absolute',
    width: 50,
    height: 50,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  logo4: {
    width: 75,
    height: 75,
    marginLeft: 10,
  },
  coltom: {
    width: '90%',
    marginLeft: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    alignContent: 'center',
    fontSize: 16,
    flexDirection: 'row',
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#fff',
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: '#333',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    borderColor: '#7e7e7e',
    elevation: 3,
  },
  coltom1: {
    width: '100%',
    marginTop: 20,
    fontSize: 16,
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#fff',
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: '#333',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    borderColor: '#7e7e7e',
    elevation: 3,
  },
  coltom2: {
    width: '90%',
    fontSize: 16,
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#fff',
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: '#333',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    borderColor: '#7e7e7e',
    elevation: 3,
  },
  item2: {
    padding: 10,
    height: 120,
    width: '30%',
    position: 'absolute',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  item1: {
    flex: 1,
    marginTop: 10,
    textAlign: 'center',
    fontSize: 16,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 10,
    borderWidth: 0.1,
    marginVertical: 1,
    marginHorizontal: 50,
  },
  picker: {
    color: 'F',
    marginTop: 10,
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    borderRadius: 5,
    // marginHorizontal: 5,
    height: 30,
    width: '100%',
    shadowColor: '#333',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.3,
    shadowRadius: 2,

    elevation: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imgSmall: {
    position: 'absolute',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title1: {
    marginRight: 20,
    marginLeft: 20,
    marginTop: 15,
    marginBottom: 15,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  title2: {
    position: 'absolute',
    marginTop: -110,
    marginBottom: 10,
    marginRight: 40,
    marginLeft: 20,
    fontSize: 24,
    width: '40%',
    fontFamily: 'Poppins-SemiBold',
    color: '#fff',
  },
  title3: {
    marginTop: -70,
    marginBottom: 10,
    marginLeft: 20,
    fontSize: 16,
    fontFamily: 'Poppins-Reguler',
    color: '#fff',
  },
  title4: {
    marginTop: -70,
    marginBottom: 10,
    marginRight: 40,
    marginLeft: 7,
    fontSize: 16,
    fontFamily: 'Poppins-Reguler',
    color: '#fff',
  },
  kotak2: {
    color: '#000000',
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 2,
    borderWidth: 0.1,
    fontSize: 12,
    height: 52,
    backgroundColor: '#7e7e7',
  },
  Label: {
    padding: 5,
    color: '#000000',
    marginLeft: 10,
    marginTop: 20,
  },
  detailgmbr: {
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 18,
    marginTop: 20,
    fontWeight: 'bold',
    color: '#7e7e7e',
  },
  detail: {
    // borderRadius: 2,
    // borderWidth: 0.1,
    width: '90%',
    padding: 10,
    marginLeft: 25,
    justifyContent: 'center',
    alignContent: 'center',
    shadowColor: '#333',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    borderColor: '#7e7e7e',
    elevation: 3,
  },
  BSimpan: {
    backgroundColor: '#00A9B8',
    borderRadius: 10,
    marginHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,

  },
  BSimpan2: {
    position: 'absolute',
    top: height * 0.9,
    justifyContent: 'center',
    alignSelf: 'center',
    height: 70,
    width: width,
    backgroundColor: '#fff',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    shadowColor: '#333',
    shadowOffset: {
      width: 4,
      height: 4,
    },
    shadowOpacity: 5.3,
    shadowRadius: 5,
    borderColor: '#7e7e7e',
    elevation: 5,
  },
  label5: {
    color: '#fff',
    padding: 10,
    fontFamily: 'Poppins-Medium',
    fontSize: 13,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  Label1: {
    marginTop: 20,
    marginLeft: 20,
    textAlign: 'center',
    color: '#000',
  },
  Label2: {
    marginTop: 5,
    marginLeft: 20,
    padding: 5,
    color: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  Textinputcss: {
    width: width - 200,
    color: '#C0C0C0',
    marginTop: -10,
    borderRadius: 10,
    borderWidth: 1,
    fontSize: 10,
    height: 40,
    borderColor: '#C0C0C0',
    fontFamily: 'Poppins-Regular',
  },

  searchBar: {
    fontSize: 12,
    width: '90%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    alignContent: 'center',
    marginTop: 5,
  },
  itemText: {
    textAlign: 'center',
    color: 'black',
    fontSize: 16,
    width: '100%',
    height: 50,
  },
  item: {
    flex: 1,
    fontSize: 16,
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#fff',
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: '#333',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    borderColor: '#7e7e7e',
    elevation: 3,
  },
  itemflat: {
    zIndex: 0,
    flex: 1,
    fontSize: 12,
    flexDirection: 'row',
    marginLeft: 20,
    padding: 10,
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
  checkbox: {
    flexDirection: 'row',
    alignContent: 'space-between',
    alignItems: 'center',
    margin: 20,
  },
  list: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    numberOfLines: 2,
    flexDirection: 'column',
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 8,
    backgroundColor: '#fff',
    shadowColor: '#333',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 3,
    borderColor: '#7e7e7e',
  },
  ImageStyle: {
    padding: 10,
    margin: 5,
    height: 20,
    width: 20,
    resizeMode: 'stretch',
    alignItems: 'center',
  },
  kotak4: {
    color: '#000000',
    marginTop: 2,
    marginLeft: 18,
    marginRight: 10,
    borderRadius: 2,
    borderWidth: 0.1,
    fontSize: 12,
    height: 40,
    width: '40%',
    backgroundColor: '#F0F8FF',
  },
  kotak5: {
    color: '#000000',
    marginTop: 2,
    marginLeft: 18,
    marginRight: 10,
    borderRadius: 2,
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    fontSize: 12,
    height: 40,
    width: '40%',
    backgroundColor: '#FFF',
  },
  refresh: {
    padding: 10,
    bottom: 0,
    right: -250,
    top: 700,
    left: 0,
    flexDirection: 'row',
    borderRadius: 5,
    position: 'absolute',
    // marginHorizontal: 5,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
  },
  labelbaru5: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    marginLeft: 10,
    color: '#C0C0C0',
  }, //vildan
  img2: {
    width: '100%',
    height: 170,
    marginTop: 10,
    borderRadius: 10,
  }, //vildan
  IconCari: {
    position: 'absolute',
    top: '76%',
    left: '3%',
  },
  form: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    width: '100%'
  },
  labelkiri: {
    fontSize: 12,
    fontWeight: 'bold',
    marginVertical: 5,
    marginLeft: 20,
    width: 100,
  },
  labelkanan: {
    fontSize: 12,
    marginHorizontal: 5,
    width: 150,
  },
  kotak3: {
    marginTop: 10,
    color: '#000',
    borderRadius: 10,
    borderWidth: 0.1,
    fontSize: 13,
    height: 40,
    width: width * 0.5,
    padding: 12,
    backgroundColor: '#fff',
    borderColor: '#DDDDDD',
    borderWidth: 1,
    fontFamily: 'Poppins-Regular',
  },
  kotakpicker: {
    marginTop: 10,
    paddingVertical: 5,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#DDD',
    width: width * 0.5,
    height: 40,
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

const mapStateToProps = state => {
  return {
    user: state,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changeUser: data => dispatch({ type: 'CHANGE/USER', payload: data }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(KelompokKun);