import {
  RefreshControl,
  Dimensions,
  ToastAndroid,
  Alert,
  Modal,
  TouchableOpacity,
  ScrollView,
  FlatList,
  SafeAreaView,
  Image,
  Text,
  View,
  TextInput,
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
  search,
  arrow,
  plus,
  Background,
  addfoto,
  Union,
  x,
  test,
} from '../../assets/images';
import {
  Phone,
  Math,
  IconCari,
  FilterdanText,
  Locationabu,
  Bukuabu,
  Document,
  Adduser,
  TKP,
  TP,
  AnakHijau,
  Waktu,
  Arrowleft,
  ArrowleftWhite,
  Book,
  GenderAbu,
  IconAktifitas,
  IconBook,
  IconProfile,
  Jenis,
  JenisAbu,
  LocationAbu1,
  PanahKan,
  TogaAbu,
} from '../../assets/icons';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'react-native-image-picker';
import DateTimePicker from 'react-native-modal-datetime-picker';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';
import { connect } from 'react-redux';
import SwitchSelector from 'react-native-switch-selector';
import { useState } from 'react';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import ActionButton from 'react-native-action-button';
import AsyncStorage from '@react-native-async-storage/async-storage';

const numColumns = 3;
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
export class Tutor extends Component {
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
      setOpen: '',
      setDate: '',
      chosenDate: '',
      myd: '',
      absen: [],
      check: false,
      Pel: '',
      filter: [],
      refreshing: true,
      options: '',
      tutor: '',
      jadwal: [],
      listfilter: '',
      ST: '',
      SMP: '',
      cari: '',
      filt_tutor: [],
      filt_pengelola: [],
      cabang: '',
      pusat: '',
      mapel: '',
      pengelola: [],
      semuakegiatantutor: [],
    };
  }

  getPengelolaAPi() {
    fetch('https://kilauindonesia.org/datakilau/api/getpengelola')
      .then(res => {
        if (res.status === 200) return res.json();
      })
      .then(resdata => {
        console.log(resdata.data);
        this.setState({
          pengelola: resdata.data,
          filt_pengelola: resdata.data,
          refreshing: false,
        });
      });
  }
  getaktivitastutorAPi() {
    fetch('https://kilauindonesia.org/datakilau/api/penabsen')
      .then(res => {
        if (res.status === 200) return res.json();
      })
      .then(resdata => {
        console.log(resdata.data);
        this.setState({
          absen: resdata.data,
          refreshing: false,
        });
      });
  }
  GetjadwalAPi() {
    fetch('https://kilauindonesia.org/datakilau/api/tutor2')
      .then(res => {
        if (res.status === 200) return res.json();
      })
      .then(resdata => {
        console.log(resdata.data);
        this.setState({
          jadwal: resdata.data,
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
        console.log(resdata.data);
        this.setState({
          Tutor: resdata.data,
          filt_tutor: resdata.data,
          refreshing: false,
        });
      });
  }
  GetTutorAPi() {
    AsyncStorage.getItem('token').then((token) => {
      fetch('https://kilauindonesia.org/datakilau/api/tutor', {
        headers: {
          Authorization: 'Bearer ' + token,
          // 'Accept': 'application/json',
          // 'Content-Type': 'application/json'
        },
      }).then((res) => res.json())
        .then((resJson) => {
          const length = resJson.data.length;
          console.log('oke' + length);
          this.setState({
            Tutor: resJson.data,
            filt_tutor: resJson.data,
            refreshing: false,
          });
        })
        .catch((err) => console.log('error catch home', err));
    });
  }

  gettampilanaktivitastutor() {
    AsyncStorage.getItem('token').then((token) => {
      fetch('https://kilauindonesia.org/datakilau/api/penabsentutor', {
        headers: {
          Authorization: 'Bearer ' + token,
          // 'Accept': 'application/json',
          // 'Content-Type': 'application/json'
        },
      }).then((res) => res.json())
        .then((resJson) => {
          const length = resJson.data.length;
          console.log('oke' + length);
          this.setState({
            semuakegiatantutor: resJson.data,
            refreshing: false,
          });
        })
        .catch((err) => console.log('error catch home', err));
    });
  }

  componentDidMount() {
    this.GetTutorAPi();
    this.getaktivitastutorAPi();
    this.GetjadwalAPi();
    this.getPengelolaAPi();
    this.gettampilanaktivitastutor();
    console.log();
  }

  onRefresh() {
    this.GetTutorAPi();
    this.setState({ refreshing: false });
  }
  // delete = (index) => {
  //   anak.splice(index, 1);
  //   this.setState({});
  // }

  closeModal() {
    this.setState({ fil: false });
  }

  filterListLT(textToSearch) {
    this.setState({
      filt_tutor: this.state.Tutor.filter(
        i =>
          i.nama.toLowerCase(textToSearch).includes(textToSearch),
      ),
    });
  }
  filterListLP(textToSearch) {
    this.setState({
      filt_pengelola: this.state.pengelola.filter(
        i =>
          i.nama_lengkap.toLowerCase(textToSearch).includes(textToSearch),
      ),
    });
  }
  render() {
    const fildupe = this.state.absen.filter(
      item => item.id_aktivitas === item.id_aktivfilterListitas,
    );
    const options = [
      { label: 'List Tutor', value: 'LT' },
      { label: 'Semua Aktivitas Belajar', value: 'AT' },
    ];
    const tutor = [
      { label: 'Riwayat', value: 'Riwayat' },
      // {label: 'Jadwal', value: 'Jadwal'},
    ];
    const cabang = [
      { label: 'Semua Aktivitas Belajar', value: 'ALT' },
      { label: 'List Pengelola', value: 'LP' },
      // { label: 'Semua Aktivitas Pengelola', value: 'ALP' },
    ];
    const pusat = [
      { label: 'List Tutor', value: 'LT' },
      { label: 'List Pengelola', value: 'LP' },
      { label: 'Semua Aktivitas Belajar', value: 'ALT' },
      // { label: 'Semua Aktivitas Pengelola', value: 'ALP' },
    ];
    function Link(props) {
      return (
        <Text
          {...props}
          accessibilityRole="link"
          style={StyleSheet.compose(styles.link, props.style)}
        />
      );
    }

    const listfilter = [
      { label: 'Kemarin', value: 'Kemarin' },
      {
        label: '1 Minggu yang lalu',
        value: '1 Minggu yang lalu',
      },
      {
        label: '1 Bulan yang lalu',
        value: '1 Bulan yang lalu',
      },
      {
        label: 'Pilih Sendiri',
        value: 'Pilih Sendiri',
      },
    ];

    const colors = {
      green: 'green',
      red: 'red',
      blue: 'blue',
    };

    var Pel = [
      { label: 'Reguler', value: 'Reguler' },
      { label: 'Quran', value: 'Quran' },
    ];
    const { detak } = this.state;
    const { detur } = this.state;

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
      <SafeAreaView style={{ backgroundColor: '#fff' }}>
        {this.props.user.presensi === '' ? ( // ini tamppilan Pengelola
          <View style={{ backgroundColor: '#fff', height: '100%' }}>
            <View style={{ backgroundColor: '#0EBEDF', height: 164 }}>
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
                    this.filterListLT(text.toLowerCase()),
                      this.setState({ cari: text });
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

              <View style={{ marginTop: 30, marginHorizontal: 20 }}>
                <SwitchSelector
                  options={options}
                  initial={0}
                  borderWidth={0}
                  height={49}
                  borderRadius={10}
                  hasPadding
                  // onPress={(value) => console.log(`Call onPress with value: ${value}`)}
                  onPress={value => {
                    this.setState({ options: value }),
                      ToastAndroid.show(value.toString(), ToastAndroid.SHORT);
                  }}
                />
              </View>
            </View>
            {this.state.options === 'LT' || this.state.options === '' ? (
              <FlatList
                refreshControl={
                  <RefreshControl
                    refreshing={this.state.refreshing}
                    onRefresh={() => this.onRefresh()}
                  />
                }
                data={this.state.filt_tutor}
                renderItem={({ item }) => (
                  <View>
                    <View>
                      <TouchableOpacity
                        style={{
                          flex: 1,
                          fontSize: 12,
                          flexDirection: 'row',
                          padding: 10,
                          backgroundColor: '#fff',
                          color: '#000',
                          marginVertical: 10,
                          marginHorizontal: 8,
                          shadowColor: '#858585',
                          overflow: 'hidden',
                          shadowRadius: 15,
                          elevation: 6,
                          shadowOpacity: '25%',
                          borderColor: '#7e7e7e',
                          borderRadius: 15,
                        }}
                        onPress={() =>
                          this.props.navigation.navigate('ProfilTutoradmin', {
                            item: item,
                          })
                        }>
                        <View style={{ justifyContent: 'space-between', flexDirection: 'row', marginHorizontal: '5%', height: 80, }}>
                          <View style={{ flexDirection: 'row' }}>
                            <Image
                              source={{
                                uri:
                                  'https://kilauindonesia.org/datakilau/gambarUpload/' +
                                  item.foto,
                              }}
                              // source={test}
                              style={{
                                height: 70,
                                width: 70,
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
                                width: item.status != 'tidak aktif' ? '65%' : "65%",
                              }}>
                              <Text
                                style={{
                                  color: '#000',
                                  fontFamily: 'Poppins-Medium',
                                  fontSize: 14,
                                  marginLeft: 10,
                                }}>
                                {item.nama}
                              </Text>
                              <View style={{ flexDirection: 'row' }}>
                                <View style={{ flexDirection: 'row' }}>
                                  <Bukuabu style={{ marginLeft: 10 }} />
                                  <Text
                                    style={{
                                      color: '#000',
                                      fontSize: 10,
                                      fontFamily: 'Poppins-Regular',
                                      marginLeft: 5,
                                    }}>
                                    {item.mapel}
                                  </Text>
                                </View>
                              </View>
                            </View>
                          </View>
                          {/* <View style={{
                            height: 32,
                            marginRight: item.status === 'tidak aktif' ? 30 : 30,
                            marginTop: 10,
                            width: '20%',
                            padding: 5,
                            marginRight: -30,
                            borderRadius: 5,
                            backgroundColor:
                              item.status === 'aktif'
                                ? '#0076B8'
                                : '#E32845'
                          }}>
                            {item.status === 'aktif' ?
                              <Text style={{ color: '#fff', fontSize: 12, textAlign: 'center', marginTop: 2 }}>{item.status}</Text>
                              : <Text style={{ color: '#fff', fontSize: 10, textAlign: 'center', marginTop: 2 }}>Tidak Aktif</Text>
                            }

                          </View> */}
                        </View>
                        {/* <View
                          style={{
                            height: 90,
                            width: '100%',
                            marginLeft: 20,
                          }}>
                          <View
                            style={{
                              flexDirection: 'row',
                            }}>

                            <Image
                              source={{
                                uri:
                                  'https://kilauindonesia.org/datakilau/gambarUpload/' +
                                  item.foto,
                              }}
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
                              style={{
                                flexDirection: 'column',
                                marginLeft: 10,
                              }}>
                              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text
                                  style={{
                                    color: '#000',
                                    fontFamily: 'Poppins-Medium',
                                    fontSize: 16,
                                    marginLeft: 10,
                                  }}>
                                  {item.nama}
                                </Text>


                              </View>

                              <Text
                                style={{
                                  color: '#000',
                                  fontFamily: 'Poppins-Regular',
                                  fontSize: 14,
                                  marginLeft: 10,
                                }}>
                                {item.pendidikan}
                              </Text>
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

                              </View>
                            </View>

                          </View>
                        </View> */}
                      </TouchableOpacity>
                    </View>
                  </View>
                )}></FlatList>
            ) : (
              <View></View>
            )}

            {/* <View style={{flexDirection:'row'}}> */}


            {this.state.options === 'AT' ? (
              <FlatList
                refreshControl={
                  <RefreshControl
                    refreshing={this.state.refreshing}
                    onRefresh={() => this.onRefresh()}
                  />
                }
                data={this.state.semuakegiatantutor}
                renderItem={({ item }) => (
                  <View style={{}}>
                    <TouchableOpacity
                      style={style.itemflat}
                      onPress={() =>
                        this.props.navigation.navigate('DetailAktifitas', {
                          item: item,
                        })
                      }>
                      <View style={{ width: '100%' }}>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                          }}>
                          <View style={{ flexDirection: 'row' }}>
                            <Image
                              source={{
                                uri:
                                  'https://www.kilauindonesia.org/datakilau/gambarUpload/' +
                                  item.foto,
                              }}
                              style={{
                                justifyContent: 'center',
                                height: 40,
                                width: 40,
                                borderRadius: 45,
                                color: '#000',
                              }}
                            />

                            <View
                              style={{ flexDirection: 'column', marginLeft: 10 }}>
                              <Text
                                style={{
                                  color: '#000',
                                  fontFamily: 'Poppins-Medium',
                                  fontSize: 14,
                                }}>
                                {item.nama_lengkap}
                              </Text>
                              <Text>{item.level}</Text>
                            </View>
                          </View>

                          <View
                            style={{
                              flexDirection: 'column',
                              alignItems: 'flex-end',
                            }}>
                            <Text style={[style.labelbaru5, { width: '60%' }]}>
                              {item.tanggal}
                            </Text>
                          </View>
                        </View>
                        <View
                          style={{
                            borderWidth: 0.3,
                            borderColor: '#EBEAEA',
                            width: '100%',
                            marginTop: 10,
                          }}
                        />
                        <Image
                          source={{
                            uri:
                              'https://www.kilauindonesia.org/datakilau/gambarUpload/' +
                              item.foto_1,
                          }} style={style.img2}></Image>
                        <Text
                          style={{
                            color: '#5D5C5D',
                            fontFamily: 'Poppins-SemiBold',
                            fontSize: 16,
                            marginTop: 10,
                          }}>
                          {item.jenis_kegiatan}
                        </Text>
                        <Text
                          style={{
                            color: '#5D5C5D',
                            fontFamily: 'Poppins-Regular',
                            fontSize: 14,
                            marginTop: 10,
                          }}>
                          {item.materi}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                )}></FlatList>
            ) : (
              <View></View>
            )}
            <ActionButton
              buttonColor="#00A9B8"
              offsetX={25}
              offsetY={'170%'}
              bgColor="#000"
              bgOpacity={0.7}>
              <ActionButton.Item
                buttonColor="#00A9B8"
                title="Tambah Tutor"
                offsetX={25}
                hideShadow={true}
                onPress={() => {
                  this.props.navigation.navigate('TambahTutor');
                }}
                textStyle={{ fontSize: 14, fontFamily: 'Poppins-Medium' }}
                buttonTextStyle={{ backgroundColor: '#000' }}>
                <Adduser style={style.actionButtonIcon} />
              </ActionButton.Item>


              {/* <ActionButton.Item
                buttonColor="#00A9B8"
                title="Tambah Pelatihan"
                hideShadow={true}
                offsetX={25}
                textStyle={{ fontSize: 14, fontFamily: 'Poppins-Medium' }}
                onPress={() => {
                  this.props.navigation.navigate('TamPelatihan');
                }}>
                <TP style={style.actionButtonIcon} />
              </ActionButton.Item> */}
            </ActionButton>


          </View>
        ) : (
          <View />
        )}
        {this.props.user.presensi === 'admin' ? ( // ini tamppilan Tutor
          <View style={{ backgroundColor: '#fff', height: '100%' }}>
            <View style={{ backgroundColor: '#0EBEDF', height: 164 }}>
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
                      this.setState({ cari: text });
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

              <View style={{ marginTop: 30, marginHorizontal: 20 }}>
                <SwitchSelector
                  options={tutor}
                  initial={0}
                  borderWidth={0}
                  height={49}
                  borderRadius={10}
                  hasPadding
                  // onPress={(value) => console.log(`Call onPress with value: ${value}`)}
                  onPress={value => {
                    this.setState({ tutor: value }),
                      ToastAndroid.show(value.toString(), ToastAndroid.SHORT);
                  }}
                />
              </View>
            </View>
            {/* {this.state.tutor === 'Jadwal' ? (
              <FlatList
                refreshControl={
                  <RefreshControl
                    refreshing={this.state.refreshing}
                    onRefresh={() => this.onRefresh()}
                  />
                }
                data={this.state.jadwal}
                renderItem={({item, index}) =>
                  (index + 0) % 2 == 0 ? (
                    <View style={style.itemflat1}>
                      <View style={{flexDirection: 'row', marginLeft: 7}}>
                        <View
                          style={{
                            width: 20,
                            height: 20,
                            borderRadius: 10,
                            backgroundColor: '#FFBB0C',
                          }}></View>
                        <Text style={{marginLeft: 10}}>
                          {' '}
                          Mengajar Matematika
                        </Text>
                      </View>
                      <View style={{marginLeft: 35, marginVertical: 10}}>
                        <View style={{flexDirection: 'row', marginVertical: 5}}>
                          <AnakHijau></AnakHijau>
                          <Text>Kelas Kelinci II</Text>
                        </View>
                        <View style={{flexDirection: 'row'}}>
                          <Waktu></Waktu>
                          <Text>13.00-15.00</Text>
                        </View>
                      </View>
                    </View>
                  ) : (
                    <View style={[style.itemflat1]}>
                      <View style={{flexDirection: 'row', marginLeft: 10}}>
                        <View
                          style={{
                            width: 20,
                            height: 20,
                            borderRadius: 10,
                            backgroundColor: '#53D5FF',
                          }}></View>
                        <Text style={{marginLeft: 10}}>
                          {' '}
                          Mengajar Matematika
                        </Text>
                      </View>
                      <View style={{marginLeft: 35, marginVertical: 7}}>
                        <View style={{flexDirection: 'row', marginVertical: 5}}>
                          <AnakHijau></AnakHijau>
                          <Text style={{marginLeft: 10}}>Kelas Kelinci II</Text>
                        </View>
                        <View style={{flexDirection: 'row'}}>
                          <Waktu></Waktu>
                          <Text style={{marginLeft: 10}}>13.00-15.00</Text>
                        </View>
                      </View>
                    </View>
                  )
                }></FlatList>
            ) : (
              <View></View>
            )} */}

            {/* <View style={{flexDirection:'row'}}> */}

            {/* <View style={{flexDirection:'row'}}> */}
            <FlatList
              refreshControl={
                <RefreshControl
                  refreshing={this.state.refreshing}
                  onRefresh={() => this.onRefresh()}
                />
              }
              data={this.state.kegiatantutor}
              renderItem={({ item }) => (
                <View>
                  {this.state.tutor === '' ? (
                    <View style={{}}>
                      <TouchableOpacity
                        style={style.itemflat}
                        onPress={() =>
                          this.props.navigation.navigate('DetailAktifitas', {
                            item: item,
                          })
                        }>
                        <View style={{ width: '100%' }}>
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                            }}>
                            <View style={{ flexDirection: 'row' }}>
                              <Text></Text>
                              <Image
                                source={{
                                  uri:
                                    'https://www.kilauindonesia.org/datakilau/gambarDonatur/' +
                                    item.gambar_donatur,
                                }}
                                style={{
                                  justifyContent: 'center',
                                  height: 40,
                                  width: 40,
                                  borderRadius: 45,
                                  color: '#000',
                                }}
                              />
                              {/* <View style={style.Label1}>
                   <Text>{item.nama} </Text>
                   <Text>{item.email}</Text>
                 </View> */}
                              <View
                                style={{
                                  flexDirection: 'column',
                                  marginLeft: 10,
                                }}>
                                <Text
                                  style={{
                                    color: '#000',
                                    fontFamily: 'Poppins-Medium',
                                    fontSize: 14,
                                  }}>
                                  {item.id_tutor} {item.id_aktivitas}
                                </Text>
                                <Text>{item.jenis_kegiatan}</Text>
                              </View>
                            </View>
                            <View
                              style={{
                                flexDirection: 'column',
                                alignItems: 'flex-end',
                              }}>
                              <Text style={style.labelbaru5}>
                                {item.tanggal}
                              </Text>
                              {/* <Text style={style.labelbaru5}> 10.45</Text> */}
                            </View>
                          </View>
                          <View
                            style={{
                              borderWidth: 0.3,
                              borderColor: '#EBEAEA',
                              width: '100%',
                              marginTop: 10,
                            }}
                          />
                          <Image
                            source={{
                              uri:
                                'https://kilauindonesia.org/datakilau/gambarUpload/' +
                                item.foto_1,
                            }}
                            style={style.img2}></Image>
                          <Text
                            style={{
                              color: '#5D5C5D',
                              fontFamily: 'Poppins-SemiBold',
                              fontSize: 16,
                              marginTop: 10,
                            }}>
                            {item.materi}
                          </Text>
                          {/* <Text
                            style={{
                              color: '#5D5C5D',
                              fontFamily: 'Poppins-Regular',
                              fontSize: 14,
                              marginTop: 10,
                            }}>
                            Anak-anak belajar untuk menghafal perkalian 1 sampai
                            dengan 5
                          </Text> */}
                        </View>
                      </TouchableOpacity>
                    </View>
                  ) : (
                    <View></View>
                  )}
                  {this.state.tutor === 'Riwayat' ? (
                    <View style={{}}>
                      <TouchableOpacity
                        style={style.itemflat}
                        onPress={() =>
                          this.props.navigation.navigate('DetailAktifitas', {
                            item: item,
                          })
                        }>
                        <View style={{ height: 330, width: '100%' }}>
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                            }}>
                            <View style={{ flexDirection: 'row' }}>
                              <Image
                                source={{
                                  uri:
                                    'https://www.kilauindonesia.org/datakilau/gambarDonatur/' +
                                    item.gambar_donatur,
                                }}
                                style={{
                                  justifyContent: 'center',
                                  height: 40,
                                  width: 40,
                                  borderRadius: 45,
                                  color: '#000',
                                }}
                              />
                              {/* <View style={style.Label1}>
                 <Text>{item.nama} </Text>
                 <Text>{item.email}</Text>
               </View> */}
                              <View
                                style={{
                                  flexDirection: 'column',
                                  marginLeft: 10,
                                }}>
                                <Text
                                  style={{
                                    color: '#000',
                                    fontFamily: 'Poppins-Medium',
                                    fontSize: 14,
                                  }}>
                                  Vildan Vinanda
                                </Text>
                                <Math />
                              </View>
                            </View>
                            <View
                              style={{
                                flexDirection: 'column',
                                alignItems: 'flex-end',
                              }}>
                              <Text style={style.labelbaru5}>23 Jan 2022</Text>
                              <Text style={style.labelbaru5}> 10.45</Text>
                            </View>
                          </View>
                          <View
                            style={{
                              borderWidth: 0.3,
                              borderColor: '#EBEAEA',
                              width: '100%',
                              marginTop: 10,
                            }}
                          />
                          <Image source={addfoto} style={style.img2}></Image>
                          <Text
                            style={{
                              color: '#5D5C5D',
                              fontFamily: 'Poppins-SemiBold',
                              fontSize: 16,
                              marginTop: 10,
                            }}>
                            Belajar Perkalian Dasar
                          </Text>
                          <Text
                            style={{
                              color: '#5D5C5D',
                              fontFamily: 'Poppins-Regular',
                              fontSize: 14,
                              marginTop: 10,
                            }}>
                            Anak-anak belajar untuk menghafal perkalian 1 sampai
                            dengan 5
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  ) : (
                    <View></View>
                  )}
                </View>
              )}></FlatList>

            <ActionButton
              buttonColor="#00A9B8"
              offsetX={25}
              offsetY={'140%'}
              bgColor="#000"
              bgOpacity={0.7}>
              <ActionButton.Item
                buttonColor="#00A9B8"
                title="Tambah Kegiatan Mengajar"
                offsetX={25}
                hideShadow={true}
                onPress={() => {
                  this.props.navigation.navigate('Kegiatan');
                }}
                textStyle={{ fontSize: 14, fontFamily: 'Poppins-Medium' }}
                buttonTextStyle={{ backgroundColor: '#000' }}>
                <Adduser style={style.actionButtonIcon} />
              </ActionButton.Item>
            </ActionButton>

            <Modal
              animationType={'slide'}
              transparent={true}
              onRequestClose={() => this.closeModal(false)}
              visible={this.state.fil}
              style={{
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <View style={style.ModalCont2}>
                <View
                  style={{
                    paddingHorizontal: 15,
                    paddingVertical: 10,
                    backgroundColor: '#ffffff',
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                    height: '80%',
                    shadowColor: '#333',
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
                  <SafeAreaView
                    style={{
                      width: '100%',
                      height: '100%',
                      paddingHorizontal: 20,
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginTop: 10,
                      }}>
                      <TouchableOpacity
                        onPress={() => {
                          this.setState({ fil: false });
                        }}>
                        <Image
                          source={Union}
                          style={{
                            width: 15,
                            height: 15,
                            marginRight: 10,
                          }}></Image>
                      </TouchableOpacity>
                      <Text
                        style={{
                          fontWeight: 'bold',
                          fontSize: 18,
                          fontFamily: 'Poppins-SemiBold',
                          marginLeft: 10,
                          color: '#000',
                        }}>
                        Filter
                      </Text>
                    </View>
                    <Text
                      style={{
                        fontWeight: 'bold',
                        fontSize: 14,
                        fontFamily: 'Poppins-SemiBold',
                        color: '#000',
                        marginTop: 20,
                      }}>
                      Waktu Aktivitas
                    </Text>
                    <RadioForm
                      radio_props={listfilter}
                      onPress={value => {
                        this.setState({ listfilter: value }),
                          ToastAndroid.show(
                            value.toString(),
                            ToastAndroid.SHORT,
                          );
                      }}
                      initial={0}
                      buttonSize={10}
                      buttonOuterSize={20}
                      radioStyle={{ marginVertical: 10 }}
                      animation={true}
                      formHorizontal={false}
                      buttonColor="#000"></RadioForm>
                    {/* <View style={{ marginRight: 120, }}>
                                          <Text style={{ margin: 10, color: '#000'}}>Semua Jenis Kelamin</Text>
                                          <Text style={{ margin: 10, color: '#000' }}>Perempuan</Text>
                                          <Text style={{ margin: 10, color: '#000' }}>Laki-Laki</Text>
                                      </View> */}
                    {this.state.listfilter === 'Pilih Sendiri' ? (
                      <View style={{}}>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                          }}>
                          <Text
                            style={{
                              flex: 1,
                              color: '#000',
                              marginTop: 10,
                              fontFamily: 'Poppins-Regular',
                              fontSize: 11,
                            }}>
                            Mulai dari
                          </Text>
                          <Text
                            style={{
                              flex: 1,
                              color: '#000',
                              marginTop: 10,
                              fontFamily: 'Poppins-Regular',
                              fontSize: 11,
                            }}>
                            Sampai
                          </Text>
                        </View>

                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                          }}>
                          <TouchableOpacity
                            style={{ marginTop: 10, flex: 1 }}
                            onPress={() => this.setState({ modaldate: true })}>
                            <Text
                              style={{
                                color: '#000',
                                width: '45%',
                                fontFamily: 'Poppins-Regular',
                                fontSize: 15,
                                borderBottomWidth: 1,
                              }}>
                              {this.state.date.toLocaleDateString('default')}
                            </Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            style={{ marginTop: 10, flex: 1 }}
                            onPress={() => this.setState({ modaldate: true })}>
                            <Text
                              style={{
                                color: '#000',
                                width: '45%',
                                fontFamily: 'Poppins-Regular',
                                fontSize: 15,
                                borderBottomWidth: 1,
                              }}>
                              {this.state.date.toLocaleDateString('default')}
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    ) : (
                      <View></View>
                    )}
                    <Text
                      style={{
                        fontWeight: 'bold',
                        fontSize: 14,
                        fontFamily: 'Poppins-SemiBold',
                        color: '#000',
                        marginTop: '4%',
                      }}>
                      Tutor
                    </Text>
                    <View style={{ marginTop: '4%' }}>
                      <View
                        style={{
                          borderColor: '#DDD',
                          borderWidth: 1,
                          height: 50,
                          width: '100%',
                          borderRadius: 10,
                          position: 'absolute',
                        }}
                      />
                      <Picker
                        style={style.Textinputcss2}
                        selectedValue={this.state.ST}
                        onValueChange={itemValue =>
                          this.setState({ ST: itemValue, show: 1 })
                        }>
                        <Picker.Item
                          style={{ fontSize: 14, fontFamily: 'Poppins-Regular' }}
                          label="Semua Tutor"
                          value=""
                        />
                        <Picker.Item
                          style={{ fontSize: 14, fontFamily: 'Poppins-Regular' }}
                          label="Laki-Laki"
                          value="Laki-Laki"
                        />
                        <Picker.Item
                          style={{ fontSize: 14, fontFamily: 'Poppins-Regular' }}
                          label="Perempuan"
                          value="Perempuan"
                        />
                      </Picker>
                    </View>
                    <Text
                      style={{
                        fontWeight: 'bold',
                        fontSize: 14,
                        fontFamily: 'Poppins-SemiBold',
                        color: '#000',
                        marginTop: '4%',
                      }}>
                      Mata Pelajaran
                    </Text>
                    <View style={{ marginTop: '4%' }}>
                      <View
                        style={{
                          borderColor: '#DDD',
                          borderWidth: 1,
                          height: 50,
                          width: '100%',
                          borderRadius: 10,
                          position: 'absolute',
                        }}
                      />
                      <Picker
                        style={style.Textinputcss2}
                        selectedValue={this.state.SMP}
                        onValueChange={itemValue =>
                          this.setState({ SMP: itemValue, show: 1 })
                        }>
                        <Picker.Item
                          style={{ fontSize: 14, fontFamily: 'Poppins-Regular' }}
                          label="Semua Mata Pelajaran"
                          value=""
                        />
                        <Picker.Item
                          style={{ fontSize: 14, fontFamily: 'Poppins-Regular' }}
                          label="Bahasa Indonesia"
                          value="Bahasa Indonesia"
                        />
                        <Picker.Item
                          style={{ fontSize: 14, fontFamily: 'Poppins-Regular' }}
                          label="Matematika"
                          value="Matematika"
                        />
                        <Picker.Item
                          style={{ fontSize: 14, fontFamily: 'Poppins-Regular' }}
                          label="IPA"
                          value="IPA"
                        />
                        <Picker.Item
                          style={{ fontSize: 14, fontFamily: 'Poppins-Regular' }}
                          label="IPS"
                          value="IPS"
                        />
                        <Picker.Item
                          label="Bahasa Inggris"
                          value="Bahasa Inggris"
                        />
                        <Picker.Item
                          style={{ fontSize: 14, fontFamily: 'Poppins-Regular' }}
                          label="Kimia"
                          value="Kimia"
                        />
                        <Picker.Item
                          style={{ fontSize: 14, fontFamily: 'Poppins-Regular' }}
                          label="Fisika"
                          value="Fisika"
                        />
                        <Picker.Item
                          style={{ fontSize: 14, fontFamily: 'Poppins-Regular' }}
                          label="Biologi"
                          value="Biologi"
                        />
                        <Picker.Item
                          style={{ fontSize: 14, fontFamily: 'Poppins-Regular' }}
                          label="Lain-lain"
                          value="Lain-lain"
                        />
                      </Picker>
                    </View>

                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <TouchableOpacity style={style.btnSimpan}>
                        <Text
                          style={{
                            color: '#fff',
                            fontFamily: 'Poppins-Medium',
                            fontSize: 15,
                          }}>
                          {' '}
                          Terapkan
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={style.btnSimpan2}
                        onPress={() => btnReset}>
                        <Text
                          style={{
                            color: '#00A9B8',
                            fontFamily: 'Poppins-Medium',
                            fontSize: 15,
                          }}>
                          Reset
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </SafeAreaView>
                </View>
              </View>
            </Modal>
          </View>
        ) : (
          <View />
        )}
        {this.props.user.presensi === 'admin' ? ( // ini tamppilan admin cabang
          <View style={{ backgroundColor: '#fff', height: '100%' }}>
            <View style={{ backgroundColor: '#0EBEDF', height: 164 }}>
              {/* <Text style={style.title1}>Data Pengajar </Text> */}

              {/* <View  style={{ flexDirection:'row', backgroundColor: '#FFF', height: 38, width: 250, borderRadius: 9, marginTop: 20, marginLeft: 10}}>
          <IconCari/>
          <Text style={{color: }}>Cari</Text>
        </View> */}
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
                      this.setState({ cari: text });
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
              <Modal
                animationType={'slide'}
                transparent={true}
                onRequestClose={() => this.setState({ fil: false })}
                visible={this.state.fil}
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <View style={style.ModalCont2}>
                  <View
                    style={{
                      paddingHorizontal: 15,
                      paddingVertical: 10,
                      backgroundColor: '#ffffff',
                      borderTopLeftRadius: 20,
                      borderTopRightRadius: 20,
                      height: '50%',
                      shadowColor: '#333',
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
                    <SafeAreaView
                      style={{
                        width: '100%',
                        height: '100%',
                        paddingHorizontal: 20,
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          marginTop: 10,
                        }}>
                        <TouchableOpacity
                          onPress={() => {
                            this.setState({ fil: false });
                          }}>
                          <Image
                            source={Union}
                            style={{
                              width: 15,
                              height: 15,
                              marginRight: 10,
                            }}></Image>
                        </TouchableOpacity>
                        <Text
                          style={{
                            fontWeight: 'bold',
                            fontSize: 18,
                            fontFamily: 'Poppins-SemiBold',
                            marginLeft: 10,
                            color: '#000',
                          }}>
                          Filter
                        </Text>
                      </View>
                      <Text
                        style={{
                          fontWeight: 'bold',
                          fontSize: 14,
                          fontFamily: 'Poppins-SemiBold',
                          color: '#000',
                          marginTop: '4%',
                        }}>
                        Tutor
                      </Text>
                      <View style={{ marginTop: '4%' }}>
                        <View
                          style={{
                            borderColor: '#DDD',
                            borderWidth: 1,
                            height: 50,
                            width: '100%',
                            borderRadius: 10,
                            position: 'absolute',
                          }}
                        />
                        <Picker
                          style={style.Textinputcss2}
                          selectedValue={this.state.ST}
                          onValueChange={itemValue =>
                            this.setState({ ST: itemValue, show: 1 })
                          }>
                          <Picker.Item
                            style={{
                              fontSize: 14,
                              fontFamily: 'Poppins-Regular',
                            }}
                            label="Semua Tutor"
                            value=""
                          />
                          <Picker.Item
                            style={{
                              fontSize: 14,
                              fontFamily: 'Poppins-Regular',
                            }}
                            label="Laki-Laki"
                            value="Laki-Laki"
                          />
                          <Picker.Item
                            style={{
                              fontSize: 14,
                              fontFamily: 'Poppins-Regular',
                            }}
                            label="Perempuan"
                            value="Perempuan"
                          />
                        </Picker>
                      </View>
                      <Text
                        style={{
                          fontWeight: 'bold',
                          fontSize: 14,
                          fontFamily: 'Poppins-SemiBold',
                          color: '#000',
                          marginTop: '4%',
                        }}>
                        Mata Pelajaran
                      </Text>
                      <View style={{ marginTop: '4%' }}>
                        <View
                          style={{
                            borderColor: '#DDD',
                            borderWidth: 1,
                            height: 50,
                            width: '100%',
                            borderRadius: 10,
                            position: 'absolute',
                          }}
                        />
                        <Picker
                          style={style.Textinputcss2}
                          selectedValue={this.state.mapel}
                          onValueChange={itemValue =>
                            this.setState({ mapel: itemValue, show: 1 })
                          }>
                          <Picker.Item
                            style={{
                              fontSize: 14,
                              fontFamily: 'Poppins-Regular',
                            }}
                            label="Semua Mata Pelajaran"
                            value=""
                          />
                          <Picker.Item
                            style={{
                              fontSize: 14,
                              fontFamily: 'Poppins-Regular',
                            }}
                            label="Bahasa Indonesia"
                            value="Bahasa Indonesia"
                          />
                          <Picker.Item
                            style={{
                              fontSize: 14,
                              fontFamily: 'Poppins-Regular',
                            }}
                            label="Matematika"
                            value="Matematika"
                          />
                          <Picker.Item
                            style={{
                              fontSize: 14,
                              fontFamily: 'Poppins-Regular',
                            }}
                            label="IPA"
                            value="IPA"
                          />
                          <Picker.Item
                            style={{
                              fontSize: 14,
                              fontFamily: 'Poppins-Regular',
                            }}
                            label="IPS"
                            value="IPS"
                          />
                          <Picker.Item
                            label="Bahasa Inggris"
                            value="Bahasa Inggris"
                          />
                          <Picker.Item
                            style={{
                              fontSize: 14,
                              fontFamily: 'Poppins-Regular',
                            }}
                            label="Kimia"
                            value="Kimia"
                          />
                          <Picker.Item
                            style={{
                              fontSize: 14,
                              fontFamily: 'Poppins-Regular',
                            }}
                            label="Fisika"
                            value="Fisika"
                          />
                          <Picker.Item
                            style={{
                              fontSize: 14,
                              fontFamily: 'Poppins-Regular',
                            }}
                            label="Biologi"
                            value="Biologi"
                          />
                          <Picker.Item
                            style={{
                              fontSize: 14,
                              fontFamily: 'Poppins-Regular',
                            }}
                            label="Lain-lain"
                            value="Lain-lain"
                          />
                        </Picker>
                      </View>

                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}>
                        <TouchableOpacity
                          style={style.btnSimpan}
                          onPress={() =>
                            this.setState({ fil: false }, this.filterList())
                          }>
                          <Text
                            style={{
                              color: '#fff',
                              fontFamily: 'Poppins-Medium',
                              fontSize: 15,
                            }}>
                            {' '}
                            Terapkan
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={style.btnSimpan2}
                          onPress={() => btnReset}>
                          <Text
                            style={{
                              color: '#00A9B8',
                              fontFamily: 'Poppins-Medium',
                              fontSize: 15,
                            }}>
                            Reset
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </SafeAreaView>
                  </View>
                </View>
              </Modal>
              <View style={{ marginTop: 30, marginHorizontal: 20 }}>
                <SwitchSelector
                  options={cabang}
                  initial={0}
                  borderWidth={0}
                  height={55}
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
            {/* list pengelola */}
            <FlatList
              refreshControl={
                <RefreshControl
                  refreshing={this.state.refreshing}
                  onRefresh={() => this.onRefresh()}
                />
              }
              data={this.state.pengelola}
              renderItem={({ item }) => (
                <View>
                  {this.state.cabang === 'LP' ? (
                    <View>
                      <View style={{}}>
                        <TouchableOpacity
                          onPress={() =>
                            this.props.navigation.navigate(
                              'ProfilAdminShelter',
                              { item: item },
                            )
                          }>
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
                                  <Image
                                    source={{
                                      uri:
                                        'https://kilauindonesia.org/datakilau/gambarUpload/' +
                                        item.foto,
                                    }}
                                    style={{
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
                                      width: '70%',
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
                                    <View
                                      style={{
                                        flexDirection: 'row',
                                        marginTop: 5,
                                      }}>
                                      {/* <View style={{ flexDirection: 'row' }}>
                                                        <OrangHitam style={{ marginLeft: 10 }} />
                                                        {
                                                            item.nama_lengkap === '' | item.nama_lengkap === 'null' | item.nama_lengkap === null ?
                                                                <Text style={{ color: '#000', fontSize: 10, fontFamily: 'Poppins-Regular', marginLeft: 5, marginTop: 5 }}>Belum Memiliki Donatur</Text>
                                                                :
                                                                <Text style={style.labelkanan}>{item.nama_lengkap}</Text>
                                                        }
                                                    </View> */}

                                      <View style={{ flexDirection: 'row' }}>
                                        <Phone style={{ marginLeft: 10 }} />
                                        <Text
                                          style={{
                                            color: '#000',
                                            fontSize: 10,
                                            fontFamily: 'Poppins-Regular',
                                            marginLeft: 10,
                                            marginTop: 5,
                                          }}>
                                          {item.no_hp}
                                        </Text>
                                      </View>

                                      <View style={{ flexDirection: 'row' }}>
                                        <Locationabu style={{ marginLeft: 10 }} />
                                        {(item.nama_shelter === '') |
                                          (item.nama_shelter === 'null') |
                                          (item.nama_shelter === null) ? (
                                          <Text style={style.labelkanan}>
                                            Belum Memasukan /Tidak ada Shelter
                                          </Text>
                                        ) : (
                                          <Text
                                            style={{
                                              color: '#000',
                                              fontSize: 10,
                                              fontFamily: 'Poppins-Regular',
                                              marginLeft: 5,
                                              width: '70%',
                                            }}>
                                            {item.nama_shelter}
                                          </Text>
                                        )}
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
                  ) : (
                    <View></View>
                  )}
                </View>
              )}></FlatList>

            {/* <View style={{flexDirection:'row'}}> */}

            <FlatList
              refreshControl={
                <RefreshControl
                  refreshing={this.state.refreshing}
                  onRefresh={() => this.onRefresh()}
                />
              }
              data={this.state.filt_anak1}
              renderItem={({ item }) => (
                <View>
                  {(this.state.cabang === '') | (this.state.cabang === 'LT') ? (
                    <View style={{}}>
                      <TouchableOpacity
                        style={style.itemflat}
                        onPress={() =>
                          this.props.navigation.navigate('ProfilTutor', {
                            item: item,
                          })
                        }>
                        <View
                          style={{
                            height: 90,
                            width: '100%',
                            justifyContent: 'center',
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
                                // source={{
                                //   uri:
                                //     'https://www.kilauindonesia.org/datakilau/gambarDonatur/' +
                                //     item.gambar_donatur,
                                // }}
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
                                style={{
                                  flexDirection: 'column',
                                  marginLeft: 10,
                                }}>
                                <Text
                                  style={{
                                    color: '#000',
                                    fontFamily: 'Poppins-Medium',
                                    fontSize: 16,
                                    marginLeft: 10,
                                  }}>
                                  {item.nama}
                                </Text>
                                <Text
                                  style={{
                                    color: '#000',
                                    fontFamily: 'Poppins-Regular',
                                    fontSize: 14,
                                    marginLeft: 10,
                                  }}>
                                  {item.pendidikan}
                                </Text>
                                <View
                                  style={{
                                    flexDirection: 'row',
                                    marginLeft: 10,
                                    marginTop: 10,
                                    justifyContent: 'center',
                                  }}>
                                  <Bukuabu />
                                  <Text
                                    style={{
                                      color: '#5D5C5D',
                                      fontFamily: 'Poppins-Regular',
                                      fontSize: 12,
                                      marginLeft: 5,
                                      marginRight: 10,
                                    }}>
                                    {item.mapel}
                                  </Text>
                                  <Locationabu />
                                  <Text
                                    style={{
                                      color: '#5D5C5D',
                                      fontFamily: 'Poppins-Regular',
                                      fontSize: 12,
                                      marginLeft: 5,
                                      marginRight: 10,
                                    }}>
                                    {item.nama_wilbin}
                                  </Text>
                                </View>
                              </View>
                            </View>
                          </View>
                        </View>
                      </TouchableOpacity>
                    </View>
                  ) : (
                    <View></View>
                  )}
                </View>
              )}></FlatList>

            {/* aktifitas tutor */}
            {this.state.cabang === 'ALT' ? (
              <FlatList
                refreshControl={
                  <RefreshControl
                    refreshing={this.state.refreshing}
                    onRefresh={() => this.onRefresh()}
                  />
                }
                data={this.state.absen}
                renderItem={({ item }) => (
                  <View style={{}}>
                    <TouchableOpacity
                      style={style.itemflat}
                      onPress={() =>
                        this.props.navigation.navigate('', { item: item })
                      }>
                      <View style={{ height: 330, width: '100%' }}>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                          }}>
                          <View style={{ flexDirection: 'row' }}>
                            <Image
                              source={{
                                uri:
                                  'https://www.kilauindonesia.org/datakilau/gambarUpload/' +
                                  item.foto_1,
                              }}
                              style={{
                                justifyContent: 'center',
                                height: 40,
                                width: 40,
                                borderRadius: 45,
                                color: '#000',
                              }}
                            />

                            <View
                              style={{ flexDirection: 'column', marginLeft: 10 }}>
                              <Text
                                style={{
                                  color: '#000',
                                  fontFamily: 'Poppins-Medium',
                                  fontSize: 14,
                                }}>
                                {item.nama}
                              </Text>
                              <Text>{item.level}</Text>
                            </View>
                          </View>
                          <View
                            style={{
                              flexDirection: 'column',
                              alignItems: 'flex-end',
                            }}>
                            <Text style={[style.labelbaru5, { width: '60%' }]}>
                              {item.tanggal}
                            </Text>
                          </View>
                        </View>
                        <View
                          style={{
                            borderWidth: 0.3,
                            borderColor: '#EBEAEA',
                            width: '100%',
                            marginTop: 10,
                          }}
                        />
                        <Image source={addfoto} style={style.img2}></Image>
                        <Text
                          style={{
                            color: '#5D5C5D',
                            fontFamily: 'Poppins-SemiBold',
                            fontSize: 16,
                            marginTop: 10,
                          }}>
                          {item.jenis_kegiatan}
                        </Text>
                        <Text
                          style={{
                            color: '#5D5C5D',
                            fontFamily: 'Poppins-Regular',
                            fontSize: 14,
                            marginTop: 10,
                          }}>
                          {item.materi}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                )}></FlatList>
            ) : (
              <View></View>
            )}

            {this.state.cabang === 'ALP' ? (
              <FlatList
                refreshControl={
                  <RefreshControl
                    refreshing={this.state.refreshing}
                    onRefresh={() => this.onRefresh()}
                  />
                }
                data={this.state.filt_anak1}
                renderItem={({ item }) => (
                  <View style={{}}>
                    <TouchableOpacity
                      style={style.itemflat}
                      onPress={() =>
                        this.props.navigation.navigate('', { item: item })
                      }>
                      <View style={{ height: 330, width: '100%' }}>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                          }}>
                          <View style={{ flexDirection: 'row' }}>
                            <Image
                              source={{
                                uri:
                                  'https://www.kilauindonesia.org/datakilau/gambarDonatur/' +
                                  item.gambar_donatur,
                              }}
                              style={{
                                justifyContent: 'center',
                                height: 40,
                                width: 40,
                                borderRadius: 45,
                                color: '#000',
                              }}
                            />
                            {/* <View style={style.Label1}>
                  <Text>{item.nama} </Text>
                  <Text>{item.email}</Text>
                </View> */}
                            <View
                              style={{ flexDirection: 'column', marginLeft: 10 }}>
                              <Text
                                style={{
                                  color: '#000',
                                  fontFamily: 'Poppins-Medium',
                                  fontSize: 14,
                                }}>
                                Vildan Vinanda
                              </Text>
                              <Math />
                            </View>
                          </View>
                          <View
                            style={{
                              flexDirection: 'column',
                              alignItems: 'flex-end',
                            }}>
                            <Text style={style.labelbaru5}>23 Jan 2022</Text>
                            <Text style={style.labelbaru5}> 10.45</Text>
                          </View>
                        </View>
                        <View
                          style={{
                            borderWidth: 0.3,
                            borderColor: '#EBEAEA',
                            width: '100%',
                            marginTop: 10,
                          }}
                        />
                        <Image source={addfoto} style={style.img2}></Image>
                        <Text
                          style={{
                            color: '#5D5C5D',
                            fontFamily: 'Poppins-SemiBold',
                            fontSize: 16,
                            marginTop: 10,
                          }}>
                          Belajar Perkalian Dasar
                        </Text>
                        <Text
                          style={{
                            color: '#5D5C5D',
                            fontFamily: 'Poppins-Regular',
                            fontSize: 14,
                            marginTop: 10,
                          }}>
                          Anak-anak belajar untuk menghafal perkalian 1 sampai
                          dengan 5
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                )}></FlatList>
            ) : (
              <View></View>
            )}
            <ActionButton
              buttonColor="#00A9B8"
              offsetX={25}
              offsetY={'140%'}
              bgColor="#000"
              bgOpacity={0.7}>
              <ActionButton.Item
                buttonColor="#00A9B8"
                title="Tambah Tutor"
                offsetX={25}
                hideShadow={true}
                onPress={() => {
                  this.props.navigation.navigate('TTutor');
                }}
                textStyle={{ fontSize: 14, fontFamily: 'Poppins-Medium' }}
                buttonTextStyle={{ backgroundColor: '#000' }}>
                <Adduser style={style.actionButtonIcon} />
              </ActionButton.Item>

              <ActionButton.Item
                buttonColor="#00A9B8"
                title="Tambah Pengelola"
                offsetX={25}
                hideShadow={true}
                onPress={() => {
                  this.props.navigation.navigate('TTutor');
                }}
                textStyle={{ fontSize: 14, fontFamily: 'Poppins-Medium' }}
                buttonTextStyle={{ backgroundColor: '#000' }}>
                <Adduser style={style.actionButtonIcon} />
              </ActionButton.Item>
            </ActionButton>
          </View>
        ) : (
          <View />
        )}

        {this.props.user.presensi === 'karyawan' ? ( // ini tamppilan admin pusat
          <View style={{ backgroundColor: '#fff', height: '100%' }}>
            <View style={{ backgroundColor: '#0EBEDF', height: this.state.pusat === '' || this.state.pusat === 'LT' || this.state.pusat === 'LP' ? 164 : 100 }}>
              {this.state.pusat === 'LP' ?
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
                      this.filterListLP(text.toLowerCase()), this.setState({ cari: text });
                    }}
                    value={this.state.text}
                    placeholder="Cari Nama yang diinginkan"
                    placeholderTextColor="#C0C0C0"
                    underlineColorAndroid="transparent"
                  />
                  <IconCari style={style.IconCari} name="your-icon" size={20} />
                  <TouchableOpacity
                    onPress={() => {
                      this.setState({});
                    }}>
                    <FilterdanText style={{ marginLeft: 20 }} />
                  </TouchableOpacity>
                </View> :
                <View />}
              {this.state.pusat === 'LT' || this.state.pusat === '' ?
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
                      this.filterListLT(text.toLowerCase()), this.setState({ cari: text });
                    }}
                    value={this.state.text}
                    placeholder="Cari Nama yang diinginkan"
                    placeholderTextColor="#C0C0C0"
                    underlineColorAndroid="transparent"
                  />
                  <IconCari style={style.IconCari} name="your-icon" size={20} />
                  <TouchableOpacity
                    onPress={() => {
                      this.setState({});
                    }}>
                    <FilterdanText style={{ marginLeft: 20 }} />
                  </TouchableOpacity>
                </View> :
                <View />}
              <Modal
                animationType={'slide'}
                transparent={true}
                onRequestClose={() => this.setState({ fil: false })}
                visible={this.state.fil}
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <View style={style.ModalCont2}>
                  <View
                    style={{
                      paddingHorizontal: 15,
                      paddingVertical: 10,
                      backgroundColor: '#ffffff',
                      borderTopLeftRadius: 20,
                      borderTopRightRadius: 20,
                      height: '50%',
                      shadowColor: '#333',
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
                    <SafeAreaView
                      style={{
                        width: '100%',
                        height: '100%',
                        paddingHorizontal: 20,
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          marginTop: 10,
                        }}>
                        <TouchableOpacity
                          onPress={() => {
                            this.setState({ fil: false });
                          }}>
                          <Image
                            source={Union}
                            style={{
                              width: 15,
                              height: 15,
                              marginRight: 10,
                            }}></Image>
                        </TouchableOpacity>
                        <Text
                          style={{
                            fontWeight: 'bold',
                            fontSize: 18,
                            fontFamily: 'Poppins-SemiBold',
                            marginLeft: 10,
                            color: '#000',
                          }}>
                          Filter
                        </Text>
                      </View>
                      <Text
                        style={{
                          fontWeight: 'bold',
                          fontSize: 14,
                          fontFamily: 'Poppins-SemiBold',
                          color: '#000',
                          marginTop: '4%',
                        }}>
                        Tutor
                      </Text>
                      <View style={{ marginTop: '4%' }}>
                        <View
                          style={{
                            borderColor: '#DDD',
                            borderWidth: 1,
                            height: 50,
                            width: '100%',
                            borderRadius: 10,
                            position: 'absolute',
                          }}
                        />
                        <Picker
                          style={style.Textinputcss2}
                          selectedValue={this.state.ST}
                          onValueChange={itemValue =>
                            this.setState({ ST: itemValue, show: 1 })
                          }>
                          <Picker.Item
                            style={{
                              fontSize: 14,
                              fontFamily: 'Poppins-Regular',
                            }}
                            label="Semua Tutor"
                            value=""
                          />
                          <Picker.Item
                            style={{
                              fontSize: 14,
                              fontFamily: 'Poppins-Regular',
                            }}
                            label="Laki-Laki"
                            value="Laki-Laki"
                          />
                          <Picker.Item
                            style={{
                              fontSize: 14,
                              fontFamily: 'Poppins-Regular',
                            }}
                            label="Perempuan"
                            value="Perempuan"
                          />
                        </Picker>
                      </View>
                      <Text
                        style={{
                          fontWeight: 'bold',
                          fontSize: 14,
                          fontFamily: 'Poppins-SemiBold',
                          color: '#000',
                          marginTop: '4%',
                        }}>
                        Mata Pelajaran
                      </Text>
                      <View style={{ marginTop: '4%' }}>
                        <View
                          style={{
                            borderColor: '#DDD',
                            borderWidth: 1,
                            height: 50,
                            width: '100%',
                            borderRadius: 10,
                            position: 'absolute',
                          }}
                        />
                        <Picker
                          style={style.Textinputcss2}
                          selectedValue={this.state.mapel}
                          onValueChange={itemValue =>
                            this.setState({ mapel: itemValue, show: 1 })
                          }>
                          <Picker.Item
                            style={{
                              fontSize: 14,
                              fontFamily: 'Poppins-Regular',
                            }}
                            label="Semua Mata Pelajaran"
                            value=""
                          />
                          <Picker.Item
                            style={{
                              fontSize: 14,
                              fontFamily: 'Poppins-Regular',
                            }}
                            label="Bahasa Indonesia"
                            value="Bahasa Indonesia"
                          />
                          <Picker.Item
                            style={{
                              fontSize: 14,
                              fontFamily: 'Poppins-Regular',
                            }}
                            label="Matematika"
                            value="Matematika"
                          />
                          <Picker.Item
                            style={{
                              fontSize: 14,
                              fontFamily: 'Poppins-Regular',
                            }}
                            label="IPA"
                            value="IPA"
                          />
                          <Picker.Item
                            style={{
                              fontSize: 14,
                              fontFamily: 'Poppins-Regular',
                            }}
                            label="IPS"
                            value="IPS"
                          />
                          <Picker.Item
                            label="Bahasa Inggris"
                            value="Bahasa Inggris"
                          />
                          <Picker.Item
                            style={{
                              fontSize: 14,
                              fontFamily: 'Poppins-Regular',
                            }}
                            label="Kimia"
                            value="Kimia"
                          />
                          <Picker.Item
                            style={{
                              fontSize: 14,
                              fontFamily: 'Poppins-Regular',
                            }}
                            label="Fisika"
                            value="Fisika"
                          />
                          <Picker.Item
                            style={{
                              fontSize: 14,
                              fontFamily: 'Poppins-Regular',
                            }}
                            label="Biologi"
                            value="Biologi"
                          />
                          <Picker.Item
                            style={{
                              fontSize: 14,
                              fontFamily: 'Poppins-Regular',
                            }}
                            label="Lain-lain"
                            value="Lain-lain"
                          />
                        </Picker>
                      </View>

                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}>
                        <TouchableOpacity
                          style={style.btnSimpan}
                          onPress={() =>
                            this.setState({ fil: false }, this.filterList())
                          }>
                          <Text
                            style={{
                              color: '#fff',
                              fontFamily: 'Poppins-Medium',
                              fontSize: 15,
                            }}>
                            {' '}
                            Terapkan
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={style.btnSimpan2}
                          onPress={() => btnReset}>
                          <Text
                            style={{
                              color: '#00A9B8',
                              fontFamily: 'Poppins-Medium',
                              fontSize: 15,
                            }}>
                            Reset
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </SafeAreaView>
                  </View>
                </View>
              </Modal>
              <View style={{ marginTop: 30, marginHorizontal: 20 }}>
                <SwitchSelector
                  options={pusat}
                  initial={0}
                  borderWidth={0}
                  height={55}
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
            {/* list pengelola */}
            <FlatList
              refreshControl={
                <RefreshControl
                  refreshing={this.state.refreshing}
                  onRefresh={() => this.onRefresh()}
                />
              }
              data={this.state.filt_pengelola}
              renderItem={({ item }) => (
                <View>
                  {this.state.pusat === 'LP' ? (
                    <View>
                      <View style={{}}>
                        <TouchableOpacity
                          onPress={() =>
                            this.props.navigation.navigate(
                              'ProfilAdminShelter',
                              { item: item },
                            )
                          }>
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
                                  <Image
                                    source={{
                                      uri:
                                        'https://kilauindonesia.org/datakilau/gambarUpload/' +
                                        item.foto,
                                    }}
                                    style={{
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
                                      width: '70%',
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
                                    <View
                                      style={{
                                        flexDirection: 'row',
                                        marginTop: 5,
                                      }}>
                                      {/* <View style={{ flexDirection: 'row' }}>
                                                        <OrangHitam style={{ marginLeft: 10 }} />
                                                        {
                                                            item.nama_lengkap === '' | item.nama_lengkap === 'null' | item.nama_lengkap === null ?
                                                                <Text style={{ color: '#000', fontSize: 10, fontFamily: 'Poppins-Regular', marginLeft: 5, marginTop: 5 }}>Belum Memiliki Donatur</Text>
                                                                :
                                                                <Text style={style.labelkanan}>{item.nama_lengkap}</Text>
                                                        }
                                                    </View> */}

                                      <View style={{ flexDirection: 'row' }}>
                                        <Phone style={{ marginLeft: 10 }} />
                                        <Text
                                          style={{
                                            color: '#000',
                                            fontSize: 10,
                                            fontFamily: 'Poppins-Regular',
                                            marginLeft: 10,
                                            marginTop: 5,
                                          }}>
                                          {item.no_hp}
                                        </Text>
                                      </View>

                                      <View style={{ flexDirection: 'row' }}>
                                        <Locationabu style={{ marginLeft: 10 }} />
                                        {(item.nama_shelter === '') |
                                          (item.nama_shelter === 'null') |
                                          (item.nama_shelter === null) ? (
                                          <Text style={style.labelkanan}>
                                            Belum Memasukan /Tidak ada Shelter
                                          </Text>
                                        ) : (
                                          <Text
                                            style={{
                                              color: '#000',
                                              fontSize: 10,
                                              fontFamily: 'Poppins-Regular',
                                              marginLeft: 5,
                                              width: '70%',
                                            }}>
                                            {item.nama_shelter}
                                          </Text>
                                        )}
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
                  ) : (
                    <View></View>
                  )}
                </View>
              )}></FlatList>

            {/* list tutor */}
            <FlatList
              refreshControl={
                <RefreshControl
                  refreshing={this.state.refreshing}
                  onRefresh={() => this.onRefresh()}
                />
              }
              data={this.state.filt_tutor}
              renderItem={({ item }) => (
                <View>
                  {this.state.pusat === '' || this.state.pusat === 'LT' ? (
                    <View>
                      <View>
                        <TouchableOpacity
                          style={style.itemflat}
                          onPress={() =>
                            this.props.navigation.navigate('ProfilTutoradmin', {
                              item: item,
                            })
                          }>
                          <View
                            style={{
                              height: 90,
                              width: '100%',
                              marginLeft: 20,
                            }}>
                            <View
                              style={{
                                flexDirection: 'row',
                              }}>

                              <Image
                                source={{
                                  uri:
                                    'https://kilauindonesia.org/datakilau/gambarUpload/' +
                                    item.foto,
                                }}
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
                                style={{
                                  flexDirection: 'column',
                                  marginLeft: 10,
                                }}>
                                <Text
                                  style={{
                                    color: '#000',
                                    fontFamily: 'Poppins-Medium',
                                    fontSize: 16,
                                    marginLeft: 10,
                                  }}>
                                  {item.nama}
                                </Text>
                                <Text
                                  style={{
                                    color: '#000',
                                    fontFamily: 'Poppins-Regular',
                                    fontSize: 14,
                                    marginLeft: 10,
                                  }}>
                                  {item.pendidikan}
                                </Text>
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

                                </View>
                              </View>

                            </View>
                          </View>
                        </TouchableOpacity>
                      </View>
                    </View>
                  ) : (
                    <View></View>
                  )}
                </View>
              )}></FlatList>

            {/* aktifitas tutor */}
            {this.state.pusat === 'ALT' ? (
              <FlatList
                refreshControl={
                  <RefreshControl
                    refreshing={this.state.refreshing}
                    onRefresh={() => this.onRefresh()}
                  />
                }
                data={this.state.absen}
                renderItem={({ item }) => (
                  <View style={{}}>
                    <TouchableOpacity
                      style={style.itemflat}
                      onPress={() =>
                        this.props.navigation.navigate('DetailAktifitas', { item: item })
                      }>
                      <View style={{ height: 330, width: '100%' }}>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                          }}>
                          <View style={{ flexDirection: 'row' }}>
                            <Image
                              source={{
                                uri:
                                  'https://www.kilauindonesia.org/datakilau/gambarUpload/' +
                                  item.foto_1,
                              }}
                              style={{
                                justifyContent: 'center',
                                height: 40,
                                width: 40,
                                borderRadius: 45,
                                color: '#000',
                              }}
                            />

                            <View
                              style={{ flexDirection: 'column', marginLeft: 10 }}>
                              <Text
                                style={{
                                  color: '#000',
                                  fontFamily: 'Poppins-Medium',
                                  fontSize: 14,
                                }}>
                                {item.nama}
                              </Text>
                              <Text>{item.level}</Text>
                            </View>
                          </View>
                          <View
                            style={{
                              flexDirection: 'column',
                              alignItems: 'flex-end',
                            }}>
                            <Text style={[style.labelbaru5, { width: '60%' }]}>
                              {item.tanggal}
                            </Text>
                          </View>
                        </View>
                        <View
                          style={{
                            borderWidth: 0.3,
                            borderColor: '#EBEAEA',
                            width: '100%',
                            marginTop: 10,
                          }}
                        />
                        <Image source={{
                          uri:
                            'https://www.kilauindonesia.org/datakilau/gambarUpload/' +
                            item.foto_1,
                        }} style={style.img2}></Image>
                        <Text
                          style={{
                            color: '#5D5C5D',
                            fontFamily: 'Poppins-SemiBold',
                            fontSize: 16,
                            marginTop: 10,
                          }}>
                          {item.jenis_kegiatan}
                        </Text>
                        <Text
                          style={{
                            color: '#5D5C5D',
                            fontFamily: 'Poppins-Regular',
                            fontSize: 14,
                            marginTop: 10,
                          }}>
                          {item.materi}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                )}></FlatList>
            ) : (
              <View></View>
            )}
            {/* aktifitas pengelola */}
            {this.state.pusat === 'ALP' ? (
              <FlatList
                refreshControl={
                  <RefreshControl
                    refreshing={this.state.refreshing}
                    onRefresh={() => this.onRefresh()}
                  />
                }
                data={this.state.filt_anak1}
                renderItem={({ item }) => (
                  <View style={{}}>
                    <TouchableOpacity
                      style={style.itemflat}
                      onPress={() =>
                        this.props.navigation.navigate('', { item: item })
                      }>
                      <View style={{ height: 330, width: '100%' }}>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                          }}>
                          <View style={{ flexDirection: 'row' }}>
                            <Image
                              source={{
                                uri:
                                  'https://www.kilauindonesia.org/datakilau/gambarUpload/' +
                                  item.gambar_donatur,
                              }}
                              style={{
                                justifyContent: 'center',
                                height: 40,
                                width: 40,
                                borderRadius: 45,
                                color: '#000',
                              }}
                            />
                            {/* <View style={style.Label1}>
                  <Text>{item.nama} </Text>
                  <Text>{item.email}</Text>
                </View> */}
                            <View
                              style={{ flexDirection: 'column', marginLeft: 10 }}>
                              <Text
                                style={{
                                  color: '#000',
                                  fontFamily: 'Poppins-Medium',
                                  fontSize: 14,
                                }}>
                                Vildan Vinanda
                              </Text>
                              <Math />
                            </View>
                          </View>
                          <View
                            style={{
                              flexDirection: 'column',
                              alignItems: 'flex-end',
                            }}>
                            <Text style={style.labelbaru5}>23 Jan 2022</Text>
                            <Text style={style.labelbaru5}> 10.45</Text>
                          </View>
                        </View>
                        <View
                          style={{
                            borderWidth: 0.3,
                            borderColor: '#EBEAEA',
                            width: '100%',
                            marginTop: 10,
                          }}
                        />
                        <Image source={addfoto} style={style.img2}></Image>
                        <Text
                          style={{
                            color: '#5D5C5D',
                            fontFamily: 'Poppins-SemiBold',
                            fontSize: 16,
                            marginTop: 10,
                          }}>
                          Belajar Perkalian Dasar
                        </Text>
                        <Text
                          style={{
                            color: '#5D5C5D',
                            fontFamily: 'Poppins-Regular',
                            fontSize: 14,
                            marginTop: 10,
                          }}>
                          Anak-anak belajar untuk menghafal perkalian 1 sampai
                          dengan 5
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                )}></FlatList>
            ) : (
              <View></View>
            )}
            <ActionButton
              buttonColor="#00A9B8"
              offsetX={25}
              offsetY={'170%'}
              bgColor="#000"
              bgOpacity={0.7}>
              <ActionButton.Item
                buttonColor="#00A9B8"
                title="Tambah Tutor"
                offsetX={25}
                hideShadow={true}
                onPress={() => {
                  this.props.navigation.navigate('TambahTutor');
                }}
                textStyle={{ fontSize: 14, fontFamily: 'Poppins-Medium' }}
                buttonTextStyle={{ backgroundColor: '#000' }}>
                <Adduser style={style.actionButtonIcon} />
              </ActionButton.Item>

              <ActionButton.Item
                buttonColor="#00A9B8"
                title="Tambah Pengelola"
                offsetX={25}
                hideShadow={true}
                onPress={() => {
                  this.props.navigation.navigate('TambahADMS');
                }}
                textStyle={{ fontSize: 14, fontFamily: 'Poppins-Medium' }}
                buttonTextStyle={{ backgroundColor: '#000' }}>
                <Adduser style={style.actionButtonIcon} />
              </ActionButton.Item>
            </ActionButton>
          </View>
        ) : (
          <View />
        )}
      </SafeAreaView>
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
    marginRight: 20,
    marginLeft: 20,
    marginTop: 15,
    marginBottom: 15,
    fontSize: 18,
    fontWeight: 'bold',
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
    color: '#7e7e7e',
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 10,
    borderWidth: 1,
    fontSize: 12,
    height: 52,
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
  Textinputcss2: {
    color: '#7e7e7e',
    borderRadius: 10,
    borderWidth: 1,
    fontSize: 12,
    height: 52,
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
    flex: 1,
    fontSize: 12,
    flexDirection: 'row',
    marginLeft: 15,
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
  itemflat1: {
    width: '95%',
    height: 100,
    fontSize: 12,
    marginLeft: 10,
    padding: 10,
    backgroundColor: '#fff',
    color: '#000',
    marginVertical: 10,
    shadowColor: '#858585',
    overflow: 'hidden',
    shadowRadius: 15,
    elevation: 6,
    shadowOpacity: '25%',
    borderColor: '#7e7e7e',
    borderRadius: 15,
  },
  ModalLaporan: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#00000099',
    paddingHorizontal: '10%',
  },
  ModalCont2: {
    flex: 1,
    // alignItems: 'center',
    backgroundColor: '#00000079',
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
    height: width / numColumns,
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
    top: 8,
    left: 20,
  },
  labelkanan: {
    fontSize: 10,
    marginHorizontal: 5,
    width: 100,
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
export default connect(mapStateToProps, mapDispatchToProps)(Tutor);

{
  /* <Modal
          animationType={"slide"}
          transparent={true}
          visible={this.state.modaldate}
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
              height: '37%',
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
              <TouchableOpacity onPress={() => this.setState({ modaldate: false })} style={{ position: 'absolute', left: 20, top: '5%' }}>
                <Image source={Union}
                  style={{
                    height: 15,
                    width: 15,
                    alignItems: 'center',
                  }} />
              </TouchableOpacity>
              <Text style={{ color: '#000', fontFamily: 'Poppins-SemiBold', fontSize: 16 }}>Mulai Dari</Text>
              <ScrollView style={{ width: '100%', height: '100%' }}>
                <DatePicker
                  style={{ marginTop: '4%', justifyContent: 'center', alignSelf: 'center' }}
                  date={this.state.date}
                  placeholder="select date"
                  minimumDate={new Date('2000-01-01')}
                  maximumDate={new Date('2022-12-31')}
                  onDateChange={(date) =>
                    this.setState({ date }, () => console.log(this.state.date))
                  }
                  androidVariant="nativeAndroid"
                  mode='date'

                />
              </ScrollView>

            </View>
          </View>
        </Modal> */
}

{
  /* <Modal
          animationType={'slide'}
          transparent={true}
          visible={this.state.modaldetail}
          style={{
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View style={style.ModalCont2}>
            <View
              style={{
                paddingTop: 5,
                backgroundColor: '#ffffff',
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
                height: '100%',
                shadowColor: '#333',
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
              <Text style={style.itemText}>Detail</Text>
              <ScrollView style={{ width: '100%', height: '100%' }}>
                <View style={style.detailgmbr}>
                  <Image
                    source={{
                      uri:
                        'https://www.kilauindonesia.org/datakilau/gambarDonatur/' +
                        detak.gambar_donatur,
                    }}
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      height: 200,
                      width: '50%',
                    }}
                  />
                </View>
                <Collapse>
                  <CollapseHeader>
                    <View style={style.coltom}>
                      <Text
                        style={{
                          marginLeft: 25,
                          color: '#7e7e7e',
                          fontSize: 14,
                          textAlign: 'center',
                        }}>
                        Deskripsi
                      </Text>
                      <Image
                        source={arrow}
                        style={{
                          padding: 10,
                          margin: 5,
                          height: 20,
                          width: 20,
                          position: 'absolute',
                          resizeMode: 'stretch',
                          alignItems: 'center',
                          right: 15,
                          top: 5,
                        }}></Image>
                    </View>
                  </CollapseHeader>
                  <CollapseBody>
                    <View style={style.detail}>
                      <Text
                        style={{
                          padding: 10,
                          fontSize: 12,
                          fontWeight: 'bold',
                          color: '#000',
                        }}>
                        Nama Lengkap:{detak.nama}{' '}
                      </Text>
                      <Text
                        style={{
                          fontSize: 12,
                          fontWeight: 'bold',
                          padding: 10,
                          color: '#000',
                        }}>
                        Jenis Kelamin:{detak.jk}
                      </Text>
                      <Text
                        style={{
                          fontSize: 12,
                          fontWeight: 'bold',
                          padding: 10,
                          color: '#000',
                        }}>
                        Email:{detak.email}
                      </Text>
                      <Text
                        style={{
                          fontSize: 12,
                          fontWeight: 'bold',
                          padding: 10,
                          color: '#000',
                        }}>
                        Alamat:{detak.alamat}
                      </Text>
                      <Text
                        style={{
                          fontSize: 12,
                          fontWeight: 'bold',
                          padding: 10,
                          color: '#000',
                        }}>
                        Kota:{detak.kota}
                      </Text>
                      <Text
                        style={{
                          fontSize: 12,
                          fontWeight: 'bold',
                          padding: 10,
                          color: '#000',
                        }}>
                        Nomor HP:{detak.no_hp}
                      </Text>
                    </View>
                  </CollapseBody>
                </Collapse>

                <Collapse>
                  <CollapseHeader>
                    <View style={style.coltom}>
                      <Text
                        style={{
                          marginLeft: 25,
                          color: '#7e7e7e',
                          fontSize: 14,
                          textAlign: 'center',
                          color: '#000',
                        }}>
                        Aktifitas
                      </Text>
                      <Image
                        source={arrow}
                        style={{
                          padding: 10,
                          margin: 5,
                          height: 20,
                          width: 20,
                          position: 'absolute',
                          resizeMode: 'stretch',
                          alignItems: 'center',
                          right: 15,
                          top: 5,
                        }}></Image>
                    </View>
                  </CollapseHeader>
                  <CollapseBody>
                    <View style={style.detail}>
                      <Text> detail aktifitas pengajar</Text>
                      <Image
                        style={{
                          padding: 10,
                          margin: 5,
                          height: 20,
                          width: 20,
                          position: 'absolute',
                          resizeMode: 'stretch',
                          alignItems: 'center',
                          right: 15,
                          top: 5,
                        }}></Image>
                    </View>
                  </CollapseBody>
                </Collapse>

                <Collapse>
                  <CollapseHeader>
                    <View style={style.coltom}>
                      <Text
                        style={{
                          marginLeft: 25,
                          color: '#7e7e7e',
                          fontSize: 14,
                          textAlign: 'center',
                        }}>
                        Pelatihan
                      </Text>
                      <Image
                        source={arrow}
                        style={{
                          padding: 10,
                          margin: 5,
                          height: 20,
                          width: 20,
                          position: 'absolute',
                          resizeMode: 'stretch',
                          alignItems: 'center',
                          right: 15,
                          top: 5,
                        }}></Image>
                    </View>
                  </CollapseHeader>
                  <CollapseBody>
                    <View style={style.detail}>
                      <Text> detail Pelatihan pengajar</Text>
                    </View>
                  </CollapseBody>
                </Collapse>

                <Collapse>
                  <CollapseHeader>
                    <View style={style.coltom}>
                      <Text
                        style={{
                          marginLeft: 25,
                          color: '#7e7e7e',
                          fontSize: 14,
                          textAlign: 'center',
                        }}>
                        Tambah
                      </Text>
                      <Image
                        source={arrow}
                        style={{
                          padding: 10,
                          margin: 5,
                          height: 20,
                          width: 20,
                          position: 'absolute',
                          resizeMode: 'stretch',
                          alignItems: 'center',
                          right: 15,
                          top: 5,
                         
                        }}></Image>
                    </View>
                  </CollapseHeader>
                  <CollapseBody>
                    <TouchableOpacity
                      onPress={() => {
                        this.setState({ modalTamAK: true });
                      }}>
                      <View>
                        <Text style={style.coltom2}>Tambah Aktifitas</Text>
                      </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => {
                        this.setState({ modalTamPel: true });
                      }}>
                      <View>
                        <Text style={style.coltom2}>
                          Tambah Pelatihan Tutor
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </CollapseBody>
                </Collapse>
                <View
                  style={{
                    alignContent: 'center',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 10,
                    marginTop: 20,
                    marginRight: 20,
                  }}>
                  <Text
                    style={style.btnSimpanUn1}
                    onPress={() => {
                      this.setState({ detak: [], modaldetail: false });
                    }}>
                    Kembali
                  </Text>
                </View>

               
              </ScrollView>

            </View>
          </View>
        </Modal> */
}

{
  /* <Modal
          animationType={'slide'}
          transparent={true}
          visible={this.state.modalTamAK}
          style={{
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onRequestClose={() => {
            Alert.alert('Modal has now been closed.');
          }}>
          <View style={style.ModalCont2}>
            <View
              style={{
                paddingTop: 5,
                backgroundColor: '#ffffff',
                // flexDirection: 'row',
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
                height: '100%',
                shadowColor: '#333',
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
              <Text style={style.itemText}>Tambah Kegiatan Pekanan Tutor</Text>
              <ScrollView style={{ width: '100%', height: '100%' }}>
                <View>
                  <View>
                    <Text style={style.Label2}>Materi Yang Disampaikan</Text>
                    <Picker
                      style={style.Textinputcss}
                      selectedValue={this.state.keg}
                      onValueChange={itemValue =>
                        this.setState({ keg: itemValue, show: 1 })
                      }>
                      <Picker.Item label="Pilih Kegiatan" value="" />
                      <Picker.Item label="Agama" value="Agama" />
                      <Picker.Item
                        label="Qur'an(Non Shelter Tahfidz"
                        value="Qur'an(Non Shelter Tahfidz"
                      />
                      <Picker.Item label="Bimbel" value="Bimbel" />
                      <Picker.Item label="Lain-lain" value="Lain-lain" />
                    </Picker>
                  </View>
                  <View style={style.containerfoto}>
                    <ScrollView horizontal={true}>
                      <>{img}</>
                    </ScrollView>
                  </View>
                  <View>
                    <TouchableOpacity
                      style={style.item}
                      onPress={() =>
                        this.takePicAK(
                          this.state.img1 === null ? 0 : this.state.img1 + 1,
                        )
                      }>
                      <Text style={style.text}>Pilih Foto</Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 10,
                  }}>
                  <Text
                    style={style.btnSimpanUn}
                    onPress={() => {
                      this.setState({ modalTamAK: false });
                    }}>
                    Kembali
                  </Text>
                  <TouchableOpacity style={style.btnSimpanDark}>
                    <Text
                      onPress={() =>
                        this.setState(
                          { modalTamAK: false },
                          ToastAndroid.show(
                            'Data Telah Disimpan',
                            ToastAndroid.SHORT,
                          ),
                        )
                      }
                      style={{ color: 'white', fontWeight: 'bold' }}>
                      Kirim
                    </Text>
                  </TouchableOpacity>
                </View>

               
              </ScrollView>
            </View>
          </View>
        </Modal> */
}

{
  /* <Modal
          animationType={'slide'}
          transparent={true}
          visible={this.state.modalTamPel}
          style={{
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onRequestClose={() => {
            Alert.alert('Modal has now been closed.');
          }}>
          <View style={style.ModalCont2}>
            <View
              style={{
                paddingTop: 5,
                backgroundColor: '#ffffff',
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
                height: '100%',
                shadowColor: '#333',
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
              <Text style={style.itemText}>Tambah Pelatihan Tutor</Text>
              <ScrollView style={{ width: '100%', height: '100%' }}>
                <View>
                  <Text style={style.Label2}>Nama Pelatihan </Text>
                  <TextInput
                    style={style.kotak2}
                    onChangeText={text => this.setState({ text })}
                    value={this.state.text}
                    placeholder="Nama Pelatihan"
                    placeholderTextColor="#7e7e7e"
                  />
                  <View>
                    <Text style={style.Label2}>Tingkat Pelatihan </Text>
                    <Picker
                      style={style.Textinputcss}
                      selectedValue={this.state.pel}
                      onValueChange={itemValue =>
                        this.setState({ pel: itemValue, show: 1 })
                      }>
                      <Picker.Item label="Pilih Tingkatan Pelatihan" value="" />
                      <Picker.Item label="Dasar" value="Agama" />
                      <Picker.Item label="Lanjut" value="Lanjut" />
                      <Picker.Item label="Mahir" value="Mahir" />
                    </Picker>
                  </View>
                  <Text style={style.Label2}>Jenis Pelatihan </Text>

                  <View style={style.checkbox}>
                    <RadioForm
                      radio_props={Pel}
                      onPress={value => {
                        this.setState({ Pel: value }),
                          ToastAndroid.show(
                            value.toString(),
                            ToastAndroid.SHORT,
                          );
                      }}
                      initial={2}
                      buttonSize={10}
                      buttonOuterSize={20}
                      animation={true}
                      formHorizontal={true}></RadioForm>
                  </View>

                  <View style={style.containerfoto}>
                    <ScrollView horizontal={true}>
                      <>{imgpel}</>
                    </ScrollView>
                  </View>
                  <View>
                    <TouchableOpacity
                      style={style.item}
                      onPress={() =>
                        this.takePicPel(
                          this.state.img3 === null ? 0 : this.state.img3 + 1,
                        )
                      }>
                      <Text style={style.text}>Pilih Foto</Text>
                    </TouchableOpacity>
                  </View>

                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                      padding: 10,
                    }}>
                    <Text
                      style={style.btnSimpanUn}
                      onPress={() => {
                        this.setState({ modalTamPel: false });
                      }}>
                      Kembali
                    </Text>
                    <TouchableOpacity style={style.btnSimpanDark}>
                      <Text
                        onPress={() =>
                          this.setState(
                            { modalTamPel: false },
                            ToastAndroid.show(
                              'Data Telah Disimpan',
                              ToastAndroid.SHORT,
                            ),
                          )
                        }
                        style={{ color: 'white', fontWeight: 'bold' }}>
                        Kirim
                      </Text>
                    </TouchableOpacity>
                  </View>
               
                </View>
              </ScrollView>
            </View>
          </View>
        </Modal> */
}
