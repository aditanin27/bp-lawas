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
  orang3,
  orang2,
  orang1,
  test,
  Warnakuning,
  Warnapink,
  Warnamerah,
  Warnahijau,
  Warnaabu,
  Warnabiru,
  IconTamKelompok,
} from '../../assets/images';
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
  Tambahkk,
  KKada,
  Dashboard,
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
import RadioButtonRN from 'radio-buttons-react-native';
// import { SelectMultipleButton, SelectMultipleGroupButton } from 'react-native-selectmultiple-button'
import AsyncStorage from '@react-native-async-storage/async-storage';

const numColumns = 3;
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export class List_Anak_Binaan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      res: {},
      JenisK: '',
      JenisA: '',
      JenisS: '',
      JA: '',
      pilih: '',
      example: 1,
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
      foto: {
        name: '',
        type: '',
        uri: '',
        id: 0,
      },
      img1: null,
      img2: 0,
      img3: null,
      fil: false,
      img4: 0,
      count: 1,
      Camera: '',
      nama: '',
      Anak: [],
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
      materi: [],
      check: false,
      Pel: '',
      filter: [],
      refreshing: true,
      options: '',
      cabang: '',
      JK: '',
      Pendidikan: '',
      awal: '',
      listfilter: '',
      ST: '',
      SMP: '',
      modalpilih: false,
      tamtutor: '',
      filter1: [],
      filter2: [],
      filter3: [],
      filter_validasi: [],
      filter_aktif: [],
      carianak: '',
      Shelter: [],
      Absen: [],
      Kelompok: [],
    };
  }

  handlePicker = date => {
    this.setState({
      isVisible: false,
      chosenDate: moment(date).format('DD-MM-YYYY'),
    });
  };

  onPressTitle = () => {
    this.setState({ chosenDate });
  };

  takePicAK(index) {
    {
      ImagePicker.launchCamera(
        {
          noData: true,
          saveToPhotos: true,
          title: 'Select Photo',
          maxWidth: 300,
          maxHeight: 400,
          compressImageQuality: 0.5,
          storageOptions: {
            skipBackup: false,
            path: 'images',
          },
        },
        response => {
          console.log('Response = ', response);

          if (response.didCancel) {
            console.log('User cancelled image picker');
          } else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
          } else {
            const source = {
              image: {
                uri: response.assets[0].uri,
                name: response.assets[0].fileName,
                type: response.assets[0].type,
              },
              //   id: 0,
            };
            console.log('ini gambar = ', source);
            this.setState(
              prevState => {
                prevState.img[index] = source;
                //   prevState.tgl_lahir[index] != this.props.route.params.tgl_lahir[index] ? this.setState({tglmbuh : true}) : this.setState({tglmbuh : false});
                return {
                  img: prevState.img,
                };
              },
              () => console.log(this.state.img),
            );
            this.setState({
              img1: index,
              img2: index,
            });
            console.log('ini gambar = ', this.state.img);
          }
        },
      );
    }
  }
  takePicPel(index) {
    {
      ImagePicker.launchCamera(
        {
          noData: true,
          saveToPhotos: true,
          title: 'Select Photo',
          maxWidth: 300,
          maxHeight: 400,
          compressImageQuality: 0.5,
          storageOptions: {
            skipBackup: false,
            path: 'images',
          },
        },
        response => {
          console.log('Response = ', response);

          if (response.didCancel) {
            console.log('User cancelled image picker');
          } else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
          } else {
            const source = {
              image: {
                uri: response.assets[0].uri,
                name: response.assets[0].fileName,
                type: response.assets[0].type,
              },
              //   id: 0,
            };
            console.log('ini gambar = ', source);
            this.setState(
              prevState => {
                prevState.imgp[index] = source;
                //   prevState.tgl_lahir[index] != this.props.route.params.tgl_lahir[index] ? this.setState({tglmbuh : true}) : this.setState({tglmbuh : false});
                return {
                  imgp: prevState.imgp,
                };
              },
              () => console.log(this.state.img),
            );
            this.setState({
              img3: index,
              img4: index,
            });
            console.log('ini gambar = ', this.state.img);
          }
        },
      );
    }
  }
  GetShelterAPi() {
    fetch('https://kilauindonesia.org/datakilau/api/shelterfil')
      .then(res => {
        if (res.status === 200) return res.json();
      })
      .then(resdata => {
        // console.log(resdata.data);
        this.setState({
          Shelter: resdata.data,
          refreshing: false,
        });
      });
  }
  getmateriAPi() {
    fetch('https://berbagipendidikan.org/sim/api/materi/getmateri')
      .then(res => {
        if (res.status === 200) return res.json();
      })
      .then(resdata => {
        // console.log(resdata.DATA);
        this.setState({
          materi: resdata.DATA,
          refreshing: false,
        });
      });
  }

  GetAbsenAPi() {
    fetch('https://kilauindonesia.org/datakilau/api/absenaknew')
      .then(res => {
        if (res.status === 200) return res.json();
      })
      .then(resdata => {
        // console.log(resdata.data);
        this.setState({
          Absen: resdata.data,
          refreshing: false,
        });
      });
  }

  GetAnakAPi() {
    AsyncStorage.getItem('token').then((token) => {
      fetch('https://kilauindonesia.org/datakilau/api/joindataanak', {
        headers: {
          Authorization: 'Bearer ' + token,
          // 'Accept': 'application/json',
          // 'Content-Type': 'application/json'
        },
      }).then((res) => res.json())
        .then((resJson) => {
          console.log('oke');
          const length = resJson.data.length;
          this.setState({
            Anak: resJson.data,
            filter1: resJson.data,
            filter2: resJson.data,
            filter3: resJson.data,
          });
        })
        .catch((err) => console.log('error catch home', err));
    });
  }

  // GetAnakAPi() {
  //   fetch('https://kilauindonesia.org/datakilau/api/joindataanak')
  //     .then(res => {
  //       if (res.status === 200) return res.json();
  //     })
  //     .then(resdata => {
  //       // console.log(resdata.data);
  //       this.setState({
  //         Anak: resdata.data,
  //         filter1: resdata.data,
  //         filter2: resdata.data,
  //         filter3: resdata.data,
  //         refreshing: false,
  //       });
  //     });
  // }
  GetKelompokAPi() {
    fetch('https://kilauindonesia.org/datakilau/api/kelompokall')
      .then(res => {
        if (res.status === 200) return res.json();
      })
      .then(resdata => {
        // console.log(resdata.data);
        this.setState({
          Kelompok: resdata.data,
        });
      });
  }
  componentDidMount() {
    this.GetAnakAPi();
    this.GetShelterAPi();
    this.getmateriAPi();
    this.GetAbsenAPi();
    this.GetKelompokAPi();
    console.log();
  }
  componentWillUnmount() {
    this.mounted = false;
    // BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }
  filterListanakaktif(textToSearch) {
    const filter_aktif = this.state.Anak.filter(
      item => item.status_validasi === 'aktif',
    );
    this.setState({
      filter1: filter_aktif.filter(
        i =>
          i.full_name.toLowerCase(textToSearch).includes(textToSearch) ||
          (i.jenjang === this.state.pilih &&
            i.jenis_kelamin === this.state.JenisK &&
            i.status_cpb === this.state.JenisS),
      ),
    });
  }

  filterListBCPB(textToSearch) {
    const BCPB = this.state.Anak.filter(
      item => item.status_validasi === 'tidak aktif',
    );
    this.setState({
      filter2: BCPB.filter(
        i =>
          i.full_name.toLowerCase(textToSearch).includes(textToSearch) ||
          (i.jenjang === this.state.pilih &&
            i.jenis_kelamin === this.state.JenisK &&
            i.status_cpb === this.state.JenisS),
      ),
    });
  }
  filterListnon(textToSearch) {
    const filter_validasi = this.state.Anak.filter(
      item => item.status_validasi === 'non-aktif',
    );
    this.setState({
      filter3: filter_validasi.filter(
        i =>
          i.full_name.toLowerCase(textToSearch).includes(textToSearch) ||
          (i.jenjang === this.state.pilih &&
            i.jenis_kelamin === this.state.JenisK &&
            i.status_cpb === this.state.JenisS),
      ),
    });
  }
  onRefresh() {
    this.GetAnakAPi();
    this.setState({ refreshing: false });
  }

  render() {
    const BCPB = this.state.Anak.filter(
      item => item.status_validasi === 'tidak aktif',
    );
    const filter_validasi = this.state.Anak.filter(
      item => item.status_validasi === 'non-aktif',
    );
    const filter_aktif = this.state.Anak.filter(
      item => item.status_validasi === 'aktif'
      // && item.id_shelter === this.props.user.id_shelter,
    );
    const filter_aktif_tutor = this.state.Anak.filter(
      item => item.status_validasi === 'aktif' && item.id_kelompok != null,
    );
    const filterpendidikan = [
      {
        status: 'Semua',
      },
      {
        status: 'Belum_SD',
      },
      {
        status: 'SD',
      },
      {
        status: 'SMP/MTS',
      },
      {
        status: 'SMA/MA/SMK',
      },
      {
        status: 'Kuliah',
      },
    ];

    let { pilih } = this.state;
    let { JenisA } = this.state;
    let { JenisK } = this.state;
    let { JenisS } = this.state;

    const awal = [{ label: 'List Awal', value: 'Awal' }];
    const JK = [
      { label: 'Laki-laki', value: 'Laki-laki' },
      { label: 'Perempuan', value: 'Perempuan' },
    ];
    const JA = [
      { label: 'Non-Tahfidz', value: 'Non-Tahfidz' },
      { label: 'Tahfidz', value: 'Tahfidz' },
    ];
    const Pendidikan = [
      { label: 'SD', value: 'SD' },
      { label: 'SMP', value: 'SMP' },
      { label: 'SMA', value: 'SMA' },
      { label: 'Perguruan Tinggi', value: 'Perguruan Tinggi' },
    ];
    const options = [
      { label: 'List Anak', value: 'List Anak' },
      { label: 'Kelompok Anak', value: 'Kelompok Anak' },
      { label: 'Aktivitas Anak', value: 'Aktivitas Anak' },
    ];
    const cabang = [
      { label: 'Calon Anak', value: 'BCPB' },
      { label: 'List Anak', value: 'List Anak' },
      { label: 'Anak Non-Aktif', value: 'Non-aktif' },
    ];
    const adminpusat = [
      { label: 'List Anak', value: 'List Anak' },
      { label: 'Calon Anak', value: 'BCPB' },
      { label: 'Anak Non-Aktif', value: 'Non-aktif' },
    ];
    const tamtutor = [
      { label: 'List Anak', value: 'LA' },
      { label: 'List Kelompok', value: 'Kelompok' },
    ];
    function Link(props) {
      return (
        <Text
          {...props}
          listfilter
          accessibilityRole="link"
          style={StyleSheet.compose(styles.link, props.style)}
        />
      );
    }

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
      <View style={{ backgroundColor: '#fff' }}>
        {this.props.user.presensi === 'donatur' ? ( // ini tamppilan donatur
          <View>
            <FlatList
              refreshControl={
                <RefreshControl
                  refreshing={this.state.refreshing}
                  onRefresh={() => this.onRefresh()}
                />
              }
              data={this.state.Anak}
              renderItem={({ item, index }) => (
                <View>
                  <View>
                    <View style={{}}>
                      <TouchableOpacity
                        onPress={() =>
                          this.props.navigation.navigate('Detail1', {
                            id_anak: item.id_anak,
                            item: item,
                          })
                        }>
                        <View style={style.itemflat}>
                          <View
                            style={{
                              width: '10%',
                              justifyContent: 'center',
                              backgroundColor:
                                item.status_cpb === 'CPB'
                                  ? '#0076B8'
                                  : '#000' && item.status_cpb === 'PB'
                                    ? '#00B855'
                                    : '#000' && item.status_cpb === 'NPB'
                                      ? '#E32845'
                                      : '#000' && item.status_cpb === 'BCPB'
                                        ? '#FFBB0C'
                                        : '#000',
                            }}>
                            <View
                              style={{
                                width: '40%',
                                justifyContent: 'center',
                                alignItems: 'center',
                                alignSelf: 'center',
                                alignContent: 'center',
                              }}>
                              <Text
                                style={{
                                  fontSize: 12,
                                  fontFamily: 'Poppins-Medium',
                                  color: '#fff',
                                }}>
                                {item.status_cpb}
                              </Text>
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
                                    {item.full_name}
                                  </Text>
                                  <View style={{ flexDirection: 'row' }}>
                                    <View style={{ flexDirection: 'row' }}>
                                      <JenisH style={{ marginLeft: 10 }} />
                                      <Text
                                        style={{
                                          color: '#000',
                                          fontSize: 10,
                                          marginLeft: 5,
                                          fontFamily: 'Poppins-Regular',
                                        }}>
                                        Non-Tahfidz
                                      </Text>
                                    </View>

                                    <View style={{ flexDirection: 'row' }}>
                                      <TingkatH style={{ marginLeft: 10 }} />
                                      <Text
                                        style={{
                                          color: '#000',
                                          fontSize: 10,
                                          fontFamily: 'Poppins-Regular',
                                          marginLeft: 5,
                                        }}>
                                        Kelas {item.kelas}
                                      </Text>
                                    </View>

                                    <View style={{ flexDirection: 'row' }}>
                                      <LocationsH style={{ marginLeft: 10 }} />
                                      <Text
                                        style={{
                                          color: '#000',
                                          fontSize: 10,
                                          fontFamily: 'Poppins-Regular',
                                          marginLeft: 5,
                                        }}>
                                        {item.tempat_lahir}
                                      </Text>
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
                </View>
              )}></FlatList>
          </View>
        ) : (
          <View />
        )}
        {this.props.user.presensi === 'tutor' ? ( // ini tampilan tutor//
          <SafeAreaView style={{ backgroundColor: '#fff' }}>
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
                  color={'#000'}
                  onChangeText={text => {
                    this.filterListanakaktif(text.toLowerCase()),
                      this.setState({ carianak: text });
                    // this.filterListBCPB(text.toLowerCase()), this.setState({ carianak: text })
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

              <View style={{ marginTop: 30, marginHorizontal: 20 }}>
                <SwitchSelector
                  fontSize={12}
                  fontFamily={'Poppins-Medium'}
                  options={tamtutor}
                  initial={0}
                  borderWidth={0}
                  height={49}
                  borderRadius={10}
                  hasPadding
                  // onPress={(value) => console.log(`Call onPress with value: ${value}`)}
                  onPress={value => {
                    this.setState({ tamtutor: value }),
                      ToastAndroid.show(value.toString(), ToastAndroid.SHORT);
                  }}
                />
              </View>
            </View>

            {/* <View style={{flexDirection:'row'}}> */}
            {this.state.tamtutor === 'LA' || this.state.tamtutor === '' ? (
              <FlatList
                refreshControl={
                  <RefreshControl
                    refreshing={this.state.refreshing}
                    onRefresh={() => this.onRefresh()}
                  />
                }
                data={
                  this.state.carianak === '' ? filter_aktif_tutor : this.state.filter1
                }
                renderItem={({ item, index }) => (
                  <View>
                    <View style={{}}>
                      <TouchableOpacity
                        onPress={() =>
                          this.props.navigation.navigate('Detail1', {
                            id_anak: item.id_anak,
                            item: item,
                          })
                        }>
                        <View style={style.itemflat}>
                          <View
                            style={{
                              width: '10%',
                              justifyContent: 'center',
                              backgroundColor:
                                item.status_cpb === 'CPB'
                                  ? '#0076B8'
                                  : '#000' && item.status_cpb === 'PB'
                                    ? '#00B855'
                                    : '#000' && item.status_cpb === 'NPB'
                                      ? '#E32845'
                                      : '#000' && item.status_cpb === 'BCPB'
                                        ? '#FFBB0C'
                                        : '#000',
                            }}>
                            <View
                              style={{
                                width: '40%',
                                justifyContent: 'center',
                                alignItems: 'center',
                                alignSelf: 'center',
                                alignContent: 'center',
                              }}>
                              <Text
                                style={{
                                  fontSize: 12,
                                  fontFamily: 'Poppins-Medium',
                                  color: '#fff',
                                }}>
                                {item.status_cpb}
                              </Text>
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
                                    {item.full_name}
                                  </Text>
                                  <View style={{ flexDirection: 'row' }}>
                                    <View style={{ flexDirection: 'row' }}>
                                      <JenisH style={{ marginLeft: 10 }} />
                                      <Text
                                        style={{
                                          color: '#000',
                                          fontSize: 10,
                                          marginLeft: 5,
                                          fontFamily: 'Poppins-Regular',
                                        }}>
                                        Non-Tahfidz
                                      </Text>
                                    </View>

                                    <View style={{ flexDirection: 'row' }}>
                                      <TingkatH style={{ marginLeft: 10 }} />
                                      <Text
                                        style={{
                                          color: '#000',
                                          fontSize: 10,
                                          fontFamily: 'Poppins-Regular',
                                          marginLeft: 5,
                                        }}>
                                        Kelas {item.kelas}
                                      </Text>
                                    </View>

                                    <View style={{ flexDirection: 'row' }}>
                                      <LocationsH style={{ marginLeft: 10 }} />
                                      <Text
                                        style={{
                                          color: '#000',
                                          fontSize: 10,
                                          fontFamily: 'Poppins-Regular',
                                          marginLeft: 5,
                                        }}>
                                        {item.tempat_lahir}
                                      </Text>
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
            ) : (
              <View></View>
            )}

            {this.state.tamtutor === 'Kelompok' ? (
              <FlatList
                refreshControl={
                  <RefreshControl
                    refreshing={this.state.refreshing}
                    onRefresh={() => this.onRefresh()}
                  />
                }
                data={this.state.Kelompok}
                renderItem={({ item, index }) => (
                  <View>
                    <TouchableOpacity
                      onPress={() =>
                        this.props.navigation.navigate('KelompokKun', {
                          id_shelter: item,
                          item: item,
                        })
                      }>
                      {/* <ImageBackground source={CardImages} style={{ width: width * 0.90, height: height * 0.20, marginTop: '3%', justifyContent: 'center', alignSelf: 'center' }}> */}
                      <ImageBackground
                        source={
                          (index + 1) % 6 == 0
                            ? Warnahijau
                            : (index + 2) % 6 == 0
                              ? Warnakuning
                              : (index + 3) % 6 == 0
                                ? Warnabiru
                                : (index + 4) % 6 == 0
                                  ? Warnaabu
                                  : (index + 5) % 6 == 0
                                    ? Warnapink
                                    : Warnamerah
                        }
                        style={{
                          width: width * 0.9,
                          height: height * 0.2,
                          marginTop: '3%',
                          justifyContent: 'center',
                          alignSelf: 'center',
                        }}>
                        <Text
                          style={{
                            position: 'absolute',
                            zIndex: 1,
                            fontSize: 18,
                            color: '#fff',
                            fontFamily: 'Poppins-Medium',
                            left: '11%',
                            top: '11%',
                          }}>
                          {item.nama_kelompok}
                        </Text>
                        <View
                          style={{
                            position: 'absolute',
                            zIndex: 1,
                            flexDirection: 'row',
                            top: '25%',
                            left: '11%',
                          }}>
                          {/* <Text style={{ fontSize: 16, color: '#fff', fontFamily: 'Poppins-Regular' }}>12</Text> */}
                          <Text
                            style={{
                              fontSize: 16,
                              color: '#fff',
                              fontFamily: 'Poppins-Regular',
                              left: '15%',
                            }}>
                            {item.nama_level_binaan}
                          </Text>
                        </View>
                      </ImageBackground>
                    </TouchableOpacity>
                  </View>
                )}></FlatList>
            ) : (
              <View></View>
            )}
            {/* {this.state.tamtutor === 'Kelompok' ? (

            
          ) : (
            <View>
            </View>
          )} */}
          </SafeAreaView>
        ) : (
          <View />
        )}

        {this.props.user.presensi === '' ? ( //ini nanti dipakai untuk pengelola//
          <View style={{ backgroundColor: '#fff', height: '100%' }}>
            <View style={{ backgroundColor: '#0EBEDF', height: 150 }}>
              {this.state.cabang === 'List Anak' ? (
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
                    color={'#000'}
                    onChangeText={text => {
                      this.filterListanakaktif(text.toLowerCase()),
                        this.setState({ carianak: text });
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
              ) : (
                <View />
              )}
              {this.state.cabang === 'Non-aktif' ? (
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
                    color={'#000'}
                    onChangeText={text => {
                      this.filterListnon(text.toLowerCase()),
                        this.setState({ carianak: text });
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
              ) : (
                <View />
              )}
              {(this.state.cabang === 'BCPB') | (this.state.cabang === '') ? (
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
                    color={'#000'}
                    onChangeText={text => {
                      this.filterListBCPB(text.toLowerCase()),
                        this.setState({ carianak: text });
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
              ) : (
                <View />
              )}
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
                    this.setState({ cabang: value });
                  }}
                />
              </View>
            </View>
            {this.state.cabang === 'List Anak' ? (
              <FlatList
                refreshControl={
                  <RefreshControl
                    refreshing={this.state.refreshing}
                    onRefresh={() => this.onRefresh()}
                  />
                }
                data={
                  this.state.carianak === '' ? filter_aktif : this.state.filter1
                }
                renderItem={({ item }) => (
                  <View>
                    <View>
                      <View style={{}}>
                        <TouchableOpacity
                          onPress={() =>
                            this.props.navigation.navigate('Detail1', {
                              id_anak: item.id_anak,
                              item: item,
                            })
                          }>
                          <View style={style.itemflat}>
                            <View
                              style={{
                                width: '10%',
                                justifyContent: 'center',
                                backgroundColor:
                                  item.status_cpb === 'CPB'
                                    ? '#0076B8'
                                    : '#000' && item.status_cpb === 'PB'
                                      ? '#00B855'
                                      : '#000' && item.status_cpb === 'NPB'
                                        ? '#E32845'
                                        : '#000' && item.status_cpb === 'BCPB'
                                          ? '#FFBB0C'
                                          : '#000',
                              }}>
                              <View
                                style={{
                                  width: '40%',
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                  alignSelf: 'center',
                                  alignContent: 'center',
                                }}>
                                <Text
                                  style={{
                                    fontSize: 12,
                                    fontFamily: 'Poppins-Medium',
                                    color: '#fff',
                                  }}>
                                  {item.status_cpb}
                                </Text>
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
                                      {item.full_name}
                                    </Text>
                                    <View style={{ flexDirection: 'row' }}>
                                      <View style={{ flexDirection: 'row' }}>
                                        <JenisH style={{ marginLeft: 10 }} />
                                        <Text
                                          style={{
                                            color: '#000',
                                            fontSize: 10,
                                            marginLeft: 5,
                                            fontFamily: 'Poppins-Regular',
                                          }}>
                                          {item.jenis_kelamin}
                                        </Text>
                                      </View>

                                      <View style={{ flexDirection: 'row' }}>
                                        <TingkatH style={{ marginLeft: 10 }} />
                                        <Text
                                          style={{
                                            color: '#000',
                                            fontSize: 10,
                                            fontFamily: 'Poppins-Regular',
                                            marginLeft: 5,
                                          }}>
                                          Kelas {item.kelas}
                                        </Text>
                                      </View>

                                      <View style={{ flexDirection: 'row' }}>
                                        <LocationsH style={{ marginLeft: 10 }} />
                                        <Text
                                          style={{
                                            color: '#000',
                                            fontSize: 10,
                                            fontFamily: 'Poppins-Regular',
                                            marginLeft: 5,
                                          }}>
                                          {item.jenjang}
                                        </Text>
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
                  </View>
                )}></FlatList>
            ) : (
              <View></View>
            )}
            {(this.state.cabang === 'BCPB') | (this.state.cabang === '') ? (
              <FlatList
                refreshControl={
                  <RefreshControl
                    refreshing={this.state.refreshing}
                    onRefresh={() => this.onRefresh()}
                  />
                }
                data={this.state.carianak === '' ? BCPB : this.state.filter2}
                renderItem={({ item }) => (
                  <View>
                    <View style={{}}>
                      <TouchableOpacity
                        onPress={() =>
                          this.props.navigation.navigate('Non_aktif', {
                            id_anak: item.id_anak,
                            item: item,
                          })
                        }>
                        <View style={style.itemflat}>
                          <View
                            style={{
                              width: '10%',
                              justifyContent: 'center',
                              backgroundColor:
                                item.status_cpb === 'CPB'
                                  ? '#0076B8'
                                  : '#000' && item.status_cpb === 'PB'
                                    ? '#00B855'
                                    : '#000' && item.status_cpb === 'NPB'
                                      ? '#E32845'
                                      : '#000' && item.status_cpb === 'BCPB'
                                        ? '#FFBB0C'
                                        : '#000',
                            }}>
                            <View
                              style={{
                                width: '40%',
                                justifyContent: 'center',
                                alignItems: 'center',
                                alignSelf: 'center',
                                alignContent: 'center',
                              }}>
                              <Text
                                style={{
                                  fontSize: 12,
                                  fontFamily: 'Poppins-Medium',
                                  color: '#fff',
                                }}>
                                {item.status_cpb}
                              </Text>
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
                                    {item.full_name}
                                  </Text>
                                  <View style={{ flexDirection: 'row' }}>


                                    <View style={{ flexDirection: 'row' }}>
                                      <JenisH style={{ marginLeft: 10 }} />
                                      <Text
                                        style={{
                                          color: '#000',
                                          fontSize: 10,
                                          marginLeft: 5,
                                          fontFamily: 'Poppins-Regular',
                                          margintop: 10,
                                        }}>
                                        {item.jenis_kelamin}
                                      </Text>
                                    </View>


                                    {item.kelas === null ? (
                                      <View style={{ flexDirection: 'row' }}>
                                        <TingkatH style={{ marginLeft: 10 }} />
                                        <Text
                                          style={{
                                            color: '#000',
                                            fontSize: 10,
                                            fontFamily: 'Poppins-Regular',
                                            marginLeft: 5,
                                          }}>
                                          Kelas 0
                                        </Text>
                                      </View>
                                    ) : (
                                      <View style={{ flexDirection: 'row' }}>
                                        <TingkatH style={{ marginLeft: 10 }} />
                                        <Text
                                          style={{
                                            color: '#000',
                                            fontSize: 10,
                                            fontFamily: 'Poppins-Regular',
                                            marginLeft: 5,
                                          }}>
                                          Kelas {item.kelas}
                                        </Text>
                                      </View>
                                    )}
                                    {/* <View style={{ flexDirection: 'row', }}>
                                    <TingkatH style={{ marginLeft: 10, }} />
                                    <Text style={{ color: '#000', fontSize: 10, fontFamily: 'Poppins-Regular', }}>{item.kelas}</Text>
                                  </View> */}

                                    <View style={{ flexDirection: 'row' }}>
                                      <LocationsH style={{ marginLeft: 10 }} />
                                      <Text
                                        style={{
                                          color: '#000',
                                          fontSize: 10,
                                          fontFamily: 'Poppins-Regular',
                                          marginLeft: 5,
                                        }}>
                                        {item.tempat_lahir}
                                      </Text>
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
            ) : (
              <View></View>
            )}
            {this.state.cabang === 'Non-aktif' ? (
              <FlatList
                refreshControl={
                  <RefreshControl
                    refreshing={this.state.refreshing}
                    onRefresh={() => this.onRefresh()}
                  />
                }
                data={
                  this.state.carianak === ''
                    ? filter_validasi
                    : this.state.filter3
                }
                renderItem={({ item }) => (
                  <View style={{}}>
                    <TouchableOpacity
                      onPress={() =>
                        this.props.navigation.navigate('Non_aktif', {
                          id_anak: item.id_anak,
                          item: item,
                        })
                      }>
                      <View style={style.itemflat}>
                        <View
                          style={{
                            width: '10%',
                            justifyContent: 'center',
                            backgroundColor:
                              item.status_cpb === 'CPB'
                                ? '#0076B8'
                                : '#000' && item.status_cpb === 'PB'
                                  ? '#00B855'
                                  : '#000' && item.status_cpb === 'NPB'
                                    ? '#E32845'
                                    : '#000' && item.status_cpb === 'BCPB'
                                      ? '#FFBB0C'
                                      : '#000',
                          }}>
                          <View
                            style={{
                              width: '40%',
                              justifyContent: 'center',
                              alignItems: 'center',
                              alignSelf: 'center',
                              alignContent: 'center',
                            }}>
                            <Text
                              style={{
                                fontSize: 12,
                                fontFamily: 'Poppins-Medium',
                                color: '#fff',
                              }}>
                              {item.status_cpb}
                            </Text>
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
                                  {item.full_name}
                                </Text>
                                <View style={{ flexDirection: 'row' }}>
                                  <View style={{ flexDirection: 'row' }}>
                                    <JenisH style={{ marginLeft: 10 }} />
                                    <Text
                                      style={{
                                        color: '#000',
                                        fontSize: 10,
                                        marginLeft: 5,
                                        fontFamily: 'Poppins-Regular',
                                      }}>
                                      {item.jenis_kelamin}
                                    </Text>
                                  </View>

                                  <View style={{ flexDirection: 'row' }}>
                                    <TingkatH style={{ marginLeft: 10 }} />
                                    <Text
                                      style={{
                                        color: '#000',
                                        fontSize: 10,
                                        fontFamily: 'Poppins-Regular',
                                        marginLeft: 5,
                                      }}>
                                      Kelas {item.kelas}
                                    </Text>
                                  </View>

                                  <View style={{ flexDirection: 'row' }}>
                                    <LocationsH style={{ marginLeft: 10 }} />
                                    <Text
                                      style={{
                                        color: '#000',
                                        fontSize: 10,
                                        fontFamily: 'Poppins-Regular',
                                        marginLeft: 5,
                                      }}>
                                      {item.tempat_lahir}
                                    </Text>
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
            ) : (
              <View></View>
            )}

            <ActionButton
              buttonColor="#00A9B8"
              offsetX={'7%'}
              offsetY={'170%'}
              bgColor="#000"
              bgOpacity={0.7}>
              <ActionButton.Item
                buttonColor="#00A9B8"
                title="Tambah Anak Binaan"
                offsetX={25}
                hideShadow={true}
                onPress={() => this.setState({ modalpilih: true })}
                textStyle={{ fontSize: 14, fontFamily: 'Poppins-Medium' }}
                buttonTextStyle={{ backgroundColor: '#000' }}>
                <Adduser style={style.actionButtonIcon} />
              </ActionButton.Item>
            </ActionButton>

            <Modal
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
                              // padding: 10,
                              // bottom: 20,
                              // right: 15,
                              // flexDirection: 'row',
                              // borderRadius: 5,
                              // // marginHorizontal: 5,
                              // height: 45,
                              // alignItems: 'center',
                              // justifyContent: 'center'
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

                    {/* <TouchableOpacity style={style.refresh} onPress={() => this.togleTambah(true)}>
              <Image source={search} style={style.tambah}></Image>
            </TouchableOpacity> */}
                  </ScrollView>
                </View>
              </View>
            </Modal>

            <Modal
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
                  <Text style={style.itemText}>
                    Tambah Kegiatan Pekanan Tutor
                  </Text>
                  <ScrollView style={{ width: '100%', height: '100%' }}>
                    <View>
                      <View>
                        <Text style={style.Label2}>
                          Materi Yang Disampaikan
                        </Text>
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
                              this.state.img1 === null
                                ? 0
                                : this.state.img1 + 1,
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

                    {/* <TouchableOpacity style={style.refresh} onPress={() => this.togleTambah(true)}>
              <Image source={search} style={style.tambah}></Image>
            </TouchableOpacity> */}
                  </ScrollView>
                </View>
              </View>
            </Modal>

            <Modal
              animationType={'slide'}
              transparent={true}
              visible={this.state.modalTamPel}
              style={{
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onRequestClose={() => this.setState({ modalTamPel: false })}>
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
                          <Picker.Item
                            label="Pilih Tingkatan Pelatihan"
                            value=""
                          />
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
                              this.state.img3 === null
                                ? 0
                                : this.state.img3 + 1,
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
                      {/* <TouchableOpacity style={style.refresh} onPress={() => this.togleTambah(true)}>
              <Image source={search} style={style.tambah}></Image>
            </TouchableOpacity> */}
                    </View>
                  </ScrollView>
                </View>
              </View>
            </Modal>
            <Modal
              animationType={'fade'}
              transparent={true}
              visible={this.state.modalpilih}
              onRequestClose={() => this.setState({ modalpilih: false })}>
              <View
                style={{
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
                  alignSelf: 'center',
                }}>
                <SafeAreaView style={{ alignItems: 'center' }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <View style={style.kotakkecil}>
                      <TouchableOpacity
                        onPress={() =>
                          this.props.navigation.navigate('First', {
                            modalpilih: false,
                          })
                        }>
                        <Tambahkk />
                        <Text
                          style={{
                            marginTop: 10,
                            textAlign: 'center',
                            padding: 5,
                          }}>
                          Tambah Kartu Keluarga
                        </Text>
                      </TouchableOpacity>
                    </View>
                    <View style={style.kotakkecil}>
                      <TouchableOpacity
                        onPress={() =>
                          this.props.navigation.navigate('carikk', {
                            modalpilih: false,
                          })
                        }>
                        <KKada
                          style={{
                            justifyContent: 'center',
                            alignSelf: 'center',
                          }}
                        />
                        <Text
                          style={{
                            marginTop: 10,
                            textAlign: 'center',
                            padding: 5,
                          }}>
                          Gunakan KK yang sudah ada
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>

                  <View
                    style={{
                      marginTop: '2%',
                      alignItems: 'center',
                      flexDirection: 'row',
                      alignContent: 'center',
                    }}>
                    <TouchableOpacity
                      onPress={() =>
                        this.setState({ modalpilih: false }) +
                        ToastAndroid.show('Batal', ToastAndroid.SHORT)
                      }>
                      <View
                        style={{
                          height: 50,
                          borderColor: '#00A9B8',
                          borderWidth: 1,
                          width: 100,
                          justifyContent: 'center',
                          alignItems: 'center',
                          alignSelf: 'center',
                          borderRadius: 5,
                        }}>
                        <Text
                          style={{
                            color: '#00A9B8',
                            fontFamily: 'Poppins-Medium',
                            fontSize: 14,
                          }}>
                          Batal
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </SafeAreaView>
              </View>
            </Modal>
          </View>
        ) : (
          <View />
        )}
        {this.props.user.presensi === 'cabang' ? ( //admin cabang//
          <View style={{ backgroundColor: '#fff', height: '100%' }}>
            <View style={{ backgroundColor: '#0EBEDF', height: 150 }}>
              {(this.state.cabang === 'List Anak') |
                (this.state.cabang === '') ? (
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
                    color={'#000'}
                    onChangeText={text => {
                      this.filterListanakaktif(text.toLowerCase()),
                        this.setState({ carianak: text });
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
              ) : (
                <View />
              )}
              {this.state.cabang === 'Non-aktif' ? (
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
                    color={'#000'}
                    onChangeText={text => {
                      this.filterListnon(text.toLowerCase()),
                        this.setState({ carianak: text });
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
              ) : (
                <View />
              )}
              {this.state.cabang === 'BCPB' ? (
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
                    color={'#000'}
                    onChangeText={text => {
                      this.filterListBCPB(text.toLowerCase()),
                        this.setState({ carianak: text });
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
              ) : (
                <View />
              )}
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
                    this.setState({ cabang: value });
                  }}
                />
              </View>
            </View>
            {(this.state.cabang === 'List Anak') |
              (this.state.cabang === '') ? (
              <FlatList
                refreshControl={
                  <RefreshControl
                    refreshing={this.state.refreshing}
                    onRefresh={() => this.onRefresh()}
                  />
                }
                data={
                  this.state.carianak === '' ? filter_aktif : this.state.filter1
                }
                renderItem={({ item }) => (
                  <View>
                    <View>
                      <View style={{}}>
                        <TouchableOpacity
                          onPress={() =>
                            this.props.navigation.navigate('Detail1', {
                              id_anak: item.id_anak,
                              item: item,
                            })
                          }>
                          <View style={style.itemflat}>
                            <View
                              style={{
                                width: '10%',
                                justifyContent: 'center',
                                backgroundColor:
                                  item.status_cpb === 'CPB'
                                    ? '#0076B8'
                                    : '#000' && item.status_cpb === 'PB'
                                      ? '#00B855'
                                      : '#000' && item.status_cpb === 'NPB'
                                        ? '#E32845'
                                        : '#000' && item.status_cpb === 'BCPB'
                                          ? '#FFBB0C'
                                          : '#000',
                              }}>
                              <View
                                style={{
                                  width: '40%',
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                  alignSelf: 'center',
                                  alignContent: 'center',
                                }}>
                                <Text
                                  style={{
                                    fontSize: 12,
                                    fontFamily: 'Poppins-Medium',
                                    color: '#fff',
                                  }}>
                                  {item.status_cpb}
                                </Text>
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
                                      {item.full_name}
                                    </Text>
                                    <View style={{ flexDirection: 'row' }}>
                                      <View style={{ flexDirection: 'row' }}>
                                        <JenisH style={{ marginLeft: 10 }} />
                                        <Text
                                          style={{
                                            color: '#000',
                                            fontSize: 10,
                                            marginLeft: 5,
                                            fontFamily: 'Poppins-Regular',
                                          }}>
                                          {item.jenis_kelamin}
                                        </Text>
                                      </View>

                                      <View style={{ flexDirection: 'row' }}>
                                        <TingkatH style={{ marginLeft: 10 }} />
                                        <Text
                                          style={{
                                            color: '#000',
                                            fontSize: 10,
                                            fontFamily: 'Poppins-Regular',
                                            marginLeft: 5,
                                          }}>
                                          Kelas {item.kelas}
                                        </Text>
                                      </View>

                                      <View style={{ flexDirection: 'row' }}>
                                        <LocationsH style={{ marginLeft: 10 }} />
                                        <Text
                                          style={{
                                            color: '#000',
                                            fontSize: 10,
                                            fontFamily: 'Poppins-Regular',
                                            marginLeft: 5,
                                          }}>
                                          {item.jenjang}
                                        </Text>
                                      </View>
                                    </View>
                                  </View>
                                </View>
                              </View>
                            </View>
                          </View>
                        </TouchableOpacity>
                      </View>
                      {/* <Modal animationType={"fade"} transparent={true}
                          visible={this.state.modalpilih}
                          onRequestClose={() => this.setState({ modalpilih: false })}>

                          <View style={{
                            backgroundColor: '#fff',
                            paddingTop: 5,
                            marginHorizontal: 5,
                            marginTop: '50%',
                            borderRadius: 20,
                            height: '35%',
                            width: '90%',
                            borderWidth: 1,
                            borderColor: '#bdbdbd',
                            alignItems: 'center',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignSelf: 'center'
                          }}>
                            <SafeAreaView style={{ alignItems: 'center' }}>
                              <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                                <View style={style.kotakkecil}>
                                  <TouchableOpacity onPress={() => this.setState({ pilihdonatur: true, modalpilih: false })}>
                                    <IconTamKelompok style={{ justifyContent: 'center', alignSelf: 'center' }} />
                                    <Text style={{ marginTop: 10, textAlign: 'center', padding: 5 }}>Pilih Donatur</Text>
                                  </TouchableOpacity>
                                </View>
                                <View style={style.kotakkecil}>
                                  <TouchableOpacity onPress={() => this.setState({ modalpilih: false })}>
                                    <Text style={{ marginTop: 10, textAlign: 'center', padding: 5 }}>Edit</Text>
                                  </TouchableOpacity>
                                </View>
                                <View style={style.kotakkecil}>
                                  <TouchableOpacity onPress={() => this.setState({ modalpilih: false })}>
                                    <Text style={{ marginTop: 10, textAlign: 'center', padding: 5 }}>Hapus Donatur</Text>
                                  </TouchableOpacity>
                                </View>
                              </View>

                              <View style={{ marginTop: '2%', alignItems: 'center', flexDirection: 'row', alignContent: 'center', }}>
                                <TouchableOpacity onPress={() => this.setState({ modalpilih: false }) + ToastAndroid.show('Batal', ToastAndroid.SHORT)}>
                                  <View style={{ height: 50, borderColor: '#00A9B8', borderWidth: 1, width: 100, justifyContent: 'center', alignItems: 'center', alignSelf: 'center', borderRadius: 5 }}>
                                    <Text style={{ color: '#00A9B8', fontFamily: 'Poppins-Medium', fontSize: 14 }}>Batal</Text>
                                  </View>
                                </TouchableOpacity>

                              </View>
                            </SafeAreaView>
                          </View >

                        </Modal > */}
                    </View>
                  </View>
                )}></FlatList>
            ) : (
              <View></View>
            )}
            {this.state.cabang === 'BCPB' ? (
              <FlatList
                refreshControl={
                  <RefreshControl
                    refreshing={this.state.refreshing}
                    onRefresh={() => this.onRefresh()}
                  />
                }
                data={this.state.carianak === '' ? BCPB : this.state.filter2}
                renderItem={({ item }) => (
                  <View>
                    <View style={{}}>
                      <TouchableOpacity
                        onPress={() =>
                          this.props.navigation.navigate('Non_aktif', {
                            id_anak: item.id_anak,
                            item: item,
                          })
                        }>
                        <View style={style.itemflat}>
                          <View
                            style={{
                              width: '10%',
                              justifyContent: 'center',
                              backgroundColor:
                                item.status_cpb === 'CPB'
                                  ? '#0076B8'
                                  : '#000' && item.status_cpb === 'PB'
                                    ? '#00B855'
                                    : '#000' && item.status_cpb === 'NPB'
                                      ? '#E32845'
                                      : '#000' && item.status_cpb === 'BCPB'
                                        ? '#FFBB0C'
                                        : '#000',
                            }}>
                            <View
                              style={{
                                width: '40%',
                                justifyContent: 'center',
                                alignItems: 'center',
                                alignSelf: 'center',
                                alignContent: 'center',
                              }}>
                              <Text
                                style={{
                                  fontSize: 12,
                                  fontFamily: 'Poppins-Medium',
                                  color: '#fff',
                                }}>
                                {item.status_cpb}
                              </Text>
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
                                    {item.full_name}
                                  </Text>
                                  <View style={{ flexDirection: 'row' }}>
                                    <View style={{ flexDirection: 'row' }}>
                                      <JenisH style={{ marginLeft: 10 }} />
                                      <Text
                                        style={{
                                          color: '#000',
                                          fontSize: 10,
                                          marginLeft: 5,
                                          fontFamily: 'Poppins-Regular',
                                        }}>
                                        Non-Tahfidz
                                      </Text>
                                    </View>

                                    <View style={{ flexDirection: 'row' }}>
                                      <TingkatH style={{ marginLeft: 10 }} />
                                      <Text
                                        style={{
                                          color: '#000',
                                          fontSize: 10,
                                          fontFamily: 'Poppins-Regular',
                                          marginLeft: 5,
                                        }}>
                                        Kelas {item.kelas}
                                      </Text>
                                    </View>

                                    <View style={{ flexDirection: 'row' }}>
                                      <LocationsH style={{ marginLeft: 10 }} />
                                      <Text
                                        style={{
                                          color: '#000',
                                          fontSize: 10,
                                          fontFamily: 'Poppins-Regular',
                                          marginLeft: 5,
                                        }}>
                                        {item.tempat_lahir}
                                      </Text>
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
            ) : (
              <View></View>
            )}
            {this.state.cabang === 'Non-aktif' ? (
              <FlatList
                refreshControl={
                  <RefreshControl
                    refreshing={this.state.refreshing}
                    onRefresh={() => this.onRefresh()}
                  />
                }
                data={
                  this.state.carianak === ''
                    ? filter_validasi
                    : this.state.filter3
                }
                renderItem={({ item }) => (
                  <View style={{}}>
                    <TouchableOpacity
                      onPress={() =>
                        this.props.navigation.navigate('Non_aktif', {
                          id_anak: item.id_anak,
                          item: item,
                        })
                      }>
                      <View style={style.itemflat}>
                        <View
                          style={{
                            width: '10%',
                            justifyContent: 'center',
                            backgroundColor:
                              item.status_cpb === 'CPB'
                                ? '#0076B8'
                                : '#000' && item.status_cpb === 'PB'
                                  ? '#00B855'
                                  : '#000' && item.status_cpb === 'NPB'
                                    ? '#E32845'
                                    : '#000' && item.status_cpb === 'BCPB'
                                      ? '#FFBB0C'
                                      : '#000',
                          }}>
                          <View
                            style={{
                              width: '40%',
                              justifyContent: 'center',
                              alignItems: 'center',
                              alignSelf: 'center',
                              alignContent: 'center',
                            }}>
                            <Text
                              style={{
                                fontSize: 12,
                                fontFamily: 'Poppins-Medium',
                                color: '#fff',
                              }}>
                              {item.status_cpb}
                            </Text>
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
                                  {item.full_name}
                                </Text>
                                <View style={{ flexDirection: 'row' }}>
                                  <View style={{ flexDirection: 'row' }}>
                                    <JenisH style={{ marginLeft: 10 }} />
                                    <Text
                                      style={{
                                        color: '#000',
                                        fontSize: 10,
                                        marginLeft: 5,
                                        fontFamily: 'Poppins-Regular',
                                      }}>
                                      Non-Tahfidz
                                    </Text>
                                  </View>

                                  <View style={{ flexDirection: 'row' }}>
                                    <TingkatH style={{ marginLeft: 10 }} />
                                    <Text
                                      style={{
                                        color: '#000',
                                        fontSize: 10,
                                        fontFamily: 'Poppins-Regular',
                                        marginLeft: 5,
                                      }}>
                                      Kelas {item.kelas}
                                    </Text>
                                  </View>

                                  <View style={{ flexDirection: 'row' }}>
                                    <LocationsH style={{ marginLeft: 10 }} />
                                    <Text
                                      style={{
                                        color: '#000',
                                        fontSize: 10,
                                        fontFamily: 'Poppins-Regular',
                                        marginLeft: 5,
                                      }}>
                                      {item.tempat_lahir}
                                    </Text>
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
            ) : (
              <View></View>
            )}

            <ActionButton
              buttonColor="#00A9B8"
              offsetX={'7%'}
              offsetY={'170%'}
              bgColor="#000"
              bgOpacity={0.7}>
              <ActionButton.Item
                buttonColor="#00A9B8"
                title="Tambah Anak Binaan"
                offsetX={25}
                hideShadow={true}
                onPress={() => this.setState({ modalpilih: true })}
                textStyle={{ fontSize: 14, fontFamily: 'Poppins-Medium' }}
                buttonTextStyle={{ backgroundColor: '#000' }}>
                <Adduser style={style.actionButtonIcon} />
              </ActionButton.Item>
            </ActionButton>

            <Modal
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
                              // padding: 10,
                              // bottom: 20,
                              // right: 15,
                              // flexDirection: 'row',
                              // borderRadius: 5,
                              // // marginHorizontal: 5,
                              // height: 45,
                              // alignItems: 'center',
                              // justifyContent: 'center'
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

                    {/* <TouchableOpacity style={style.refresh} onPress={() => this.togleTambah(true)}>
                  <Image source={search} style={style.tambah}></Image>
                </TouchableOpacity> */}
                  </ScrollView>
                </View>
              </View>
            </Modal>

            <Modal
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
                  <Text style={style.itemText}>
                    Tambah Kegiatan Pekanan Tutor
                  </Text>
                  <ScrollView style={{ width: '100%', height: '100%' }}>
                    <View>
                      <View>
                        <Text style={style.Label2}>
                          Materi Yang Disampaikan
                        </Text>
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
                              this.state.img1 === null
                                ? 0
                                : this.state.img1 + 1,
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

                    {/* <TouchableOpacity style={style.refresh} onPress={() => this.togleTambah(true)}>
                  <Image source={search} style={style.tambah}></Image>
                </TouchableOpacity> */}
                  </ScrollView>
                </View>
              </View>
            </Modal>

            <Modal
              animationType={'slide'}
              transparent={true}
              visible={this.state.modalTamPel}
              style={{
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onRequestClose={() => this.setState({ modalTamPel: false })}>
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
                          <Picker.Item
                            label="Pilih Tingkatan Pelatihan"
                            value=""
                          />
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
                              this.state.img3 === null
                                ? 0
                                : this.state.img3 + 1,
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
                      {/* <TouchableOpacity style={style.refresh} onPress={() => this.togleTambah(true)}>
                  <Image source={search} style={style.tambah}></Image>
                </TouchableOpacity> */}
                    </View>
                  </ScrollView>
                </View>
              </View>
            </Modal>
            <Modal
              animationType={'fade'}
              transparent={true}
              visible={this.state.modalpilih}
              onRequestClose={() => this.setState({ modalpilih: false })}>
              <View
                style={{
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
                  alignSelf: 'center',
                }}>
                <SafeAreaView style={{ alignItems: 'center' }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <View style={style.kotakkecil}>
                      <TouchableOpacity
                        onPress={() =>
                          this.props.navigation.navigate('DetailTamAnakBinaan')
                        }>
                        <Tambahkk />
                        <Text
                          style={{
                            marginTop: 10,
                            textAlign: 'center',
                            padding: 5,
                          }}>
                          Tambah Kartu Keluarga
                        </Text>
                      </TouchableOpacity>
                    </View>
                    <View style={style.kotakkecil}>
                      <TouchableOpacity
                        onPress={() =>
                          this.props.navigation.navigate('carikk', {
                            modalpilih: false,
                          })
                        }>
                        <KKada
                          style={{
                            justifyContent: 'center',
                            alignSelf: 'center',
                          }}
                        />
                        <Text
                          style={{
                            marginTop: 10,
                            textAlign: 'center',
                            padding: 5,
                          }}>
                          Gunakan KK yang sudah ada
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>

                  <View
                    style={{
                      marginTop: '2%',
                      alignItems: 'center',
                      flexDirection: 'row',
                      alignContent: 'center',
                    }}>
                    <TouchableOpacity
                      onPress={() =>
                        this.setState({ modalpilih: false }) +
                        ToastAndroid.show('Batal', ToastAndroid.SHORT)
                      }>
                      <View
                        style={{
                          height: 50,
                          borderColor: '#00A9B8',
                          borderWidth: 1,
                          width: 100,
                          justifyContent: 'center',
                          alignItems: 'center',
                          alignSelf: 'center',
                          borderRadius: 5,
                        }}>
                        <Text
                          style={{
                            color: '#00A9B8',
                            fontFamily: 'Poppins-Medium',
                            fontSize: 14,
                          }}>
                          Batal
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </SafeAreaView>
              </View>
            </Modal>
          </View>
        ) : (
          <View />
        )}

        {(this.state.cabang === 'List Anak') | (this.state.cabang === '') ? (
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
                  height: '90%',
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
                    Jenis Anak
                  </Text>
                  <View style={{ flexDirection: 'row', marginTop: '4%' }}>
                    <TouchableOpacity
                      style={[
                        style.types,
                        {
                          backgroundColor:
                            JenisA === 'Non-Tahfidz' ? '#00A9B8' : '#fff',
                        },
                      ]}
                      onPress={() => this.setState({ JenisA: 'Non-Tahfidz' })}>
                      <Text
                        style={{
                          color: JenisA === 'Non-Tahfidz' ? '#fff' : '#5D5C5D',
                          fontFamily: 'Poppins-Regular',
                          fontSize: 14,
                        }}>
                        Non-Tahfidz
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[
                        style.types,
                        {
                          backgroundColor:
                            JenisA === 'Tahfidz' ? '#00A9B8' : '#fff',
                        },
                      ]}
                      onPress={() => this.setState({ JenisA: 'Tahfidz' })}>
                      <Text
                        style={{
                          color: JenisA === 'Tahfidz' ? '#fff' : '#5D5C5D',
                          fontFamily: 'Poppins-Regular',
                          fontSize: 14,
                        }}>
                        Tahfidz
                      </Text>
                    </TouchableOpacity>
                  </View>

                  <Text
                    style={{
                      fontWeight: 'bold',
                      fontSize: 14,
                      fontFamily: 'Poppins-SemiBold',
                      color: '#000',
                      marginTop: '4%',
                    }}>
                    Jenis Kelamin
                  </Text>

                  <View>
                    <View style={{ flexDirection: 'row', marginTop: '4%' }}>
                      <TouchableOpacity
                        style={[
                          style.types,
                          {
                            backgroundColor:
                              JenisK === 'Laki-Laki' ? '#00A9B8' : '#fff',
                          },
                        ]}
                        onPress={() => this.setState({ JenisK: 'Laki-Laki' })}>
                        <Text
                          style={{
                            color: JenisK === 'Laki-Laki' ? '#fff' : '#5D5C5D',
                            fontFamily: 'Poppins-Regular',
                            fontSize: 14,
                          }}>
                          Laki-laki
                        </Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={[
                          style.types,
                          {
                            backgroundColor:
                              JenisK === 'Perempuan' ? '#00A9B8' : '#fff',
                          },
                        ]}
                        onPress={() => this.setState({ JenisK: 'Perempuan' })}>
                        <Text
                          style={{
                            color: JenisK === 'Perempuan' ? '#fff' : '#5D5C5D',
                            fontFamily: 'Poppins-Regular',
                            fontSize: 14,
                          }}>
                          Perempuan
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                  {/*v3v*/}
                  <Text
                    style={{
                      fontWeight: 'bold',
                      fontSize: 14,
                      fontFamily: 'Poppins-SemiBold',
                      color: '#000',
                      marginTop: '4%',
                    }}>
                    Pendidikan
                  </Text>

                  <View style={{ marginTop: 10, flexDirection: 'column' }}>
                    <View style={{ flexDirection: 'row' }}>
                      <TouchableOpacity
                        style={[
                          style.types,
                          {
                            backgroundColor:
                              pilih === 'SD' ? '#00A9B8' : '#fff',
                          },
                        ]}
                        onPress={() =>
                          this.setState({ pilih: 'SD' }, () =>
                            console.log(this.state.pilih),
                          )
                        }>
                        <Text
                          style={{
                            color: pilih === 'SD' ? '#fff' : '#5D5C5D',
                            fontFamily: 'Poppins-Regular',
                            fontSize: 14,
                          }}>
                          SD
                        </Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={[
                          style.types,
                          {
                            backgroundColor:
                              pilih === 'SMP' ? '#00A9B8' : '#fff',
                          },
                        ]}
                        onPress={() =>
                          this.setState({ pilih: 'SMP' }, () =>
                            console.log(this.state.pilih),
                          )
                        }>
                        <Text
                          style={{
                            color: pilih === 'SMP' ? '#fff' : '#5D5C5D',
                            fontFamily: 'Poppins-Regular',
                            fontSize: 14,
                          }}>
                          SMP
                        </Text>
                      </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: '4%' }}>
                      <TouchableOpacity
                        style={[
                          style.types,
                          {
                            backgroundColor:
                              pilih === 'SMA' ? '#00A9B8' : '#fff',
                          },
                        ]}
                        onPress={() =>
                          this.setState({ pilih: 'SMA' }, () =>
                            console.log(this.state.pilih),
                          )
                        }>
                        <Text
                          style={{
                            color: pilih === 'SMA' ? '#fff' : '#5D5C5D',
                            fontFamily: 'Poppins-Regular',
                            fontSize: 14,
                          }}>
                          SMA
                        </Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={[
                          style.types,
                          {
                            backgroundColor:
                              pilih === 'Kuliah' ? '#00A9B8' : '#fff',
                          },
                        ]}
                        onPress={() =>
                          this.setState({ pilih: 'Kuliah' }, () =>
                            console.log(this.state.pilih),
                          )
                        }>
                        <Text
                          style={{
                            color: pilih === 'Kuliah' ? '#fff' : '#5D5C5D',
                            fontFamily: 'Poppins-Regular',
                            fontSize: 14,
                          }}>
                          Perguruan Tinggi
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      fontSize: 14,
                      fontFamily: 'Poppins-SemiBold',
                      color: '#000',
                      marginTop: '4%',
                    }}>
                    Status Binaan
                  </Text>
                  <View style={{ flexDirection: 'row', marginTop: '4%' }}>
                    <TouchableOpacity
                      style={[
                        style.types,
                        {
                          backgroundColor:
                            JenisS === 'BCPB' ? '#00A9B8' : '#fff',
                        },
                      ]}
                      onPress={() =>
                        this.setState({ JenisS: 'BCPB' }, () =>
                          console.log(this.state.JenisS),
                        )
                      }>
                      <Text
                        style={{
                          color: JenisS === 'BCPB' ? '#fff' : '#5D5C5D',
                          fontFamily: 'Poppins-Regular',
                          fontSize: 14,
                        }}>
                        BCPB
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[
                        style.types,
                        {
                          backgroundColor:
                            JenisS === 'CPB' ? '#00A9B8' : '#fff',
                        },
                      ]}
                      onPress={() =>
                        this.setState({ JenisS: 'CPB' }, () =>
                          console.log(this.state.JenisS),
                        )
                      }>
                      <Text
                        style={{
                          color: JenisS === 'CPB' ? '#fff' : '#5D5C5D',
                          fontFamily: 'Poppins-Regular',
                          fontSize: 14,
                        }}>
                        CPB
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[
                        style.types,
                        { backgroundColor: JenisS === 'PB' ? '#00A9B8' : '#fff' },
                      ]}
                      onPress={() =>
                        this.setState({ JenisS: 'PB' }, () =>
                          console.log(this.state.JenisS),
                        )
                      }>
                      <Text
                        style={{
                          color: JenisS === 'PB' ? '#fff' : '#5D5C5D',
                          fontFamily: 'Poppins-Regular',
                          fontSize: 14,
                        }}>
                        PB
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[
                        style.types,
                        {
                          backgroundColor:
                            JenisS === 'NPB' ? '#00A9B8' : '#fff',
                        },
                      ]}
                      onPress={() =>
                        this.setState({ JenisS: 'NPB' }, () =>
                          console.log(this.state.JenisS),
                        )
                      }>
                      <Text
                        style={{
                          color: JenisS === 'NPB' ? '#fff' : '#5D5C5D',
                          fontFamily: 'Poppins-Regular',
                          fontSize: 14,
                        }}>
                        NPB
                      </Text>
                    </TouchableOpacity>
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
                            {/* {this.state.date.toLocaleDateString('default')} */}
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={{ marginTop: 10, flex: 1 }}
                          onPress={() => this.setState({ modaldate1: true })}>
                          <Text
                            style={{
                              color: '#000',
                              width: '45%',
                              fontFamily: 'Poppins-Regular',
                              fontSize: 15,
                              borderBottomWidth: 1,
                            }}>
                            {/* {this.state.date1.toLocaleDateString('default')} */}
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                  {/* <RadioForm
                  radio_props={listfilter}
                  onPress={value => {
                    this.setState({ listfilter: value }),
                      ToastAndroid.show(value.toString(), ToastAndroid.SHORT);
                  }}
                  initial={-1}
                  buttonSize={10}
                  buttonOuterSize={20}
                  radioStyle={{ marginVertical: 10, }}
                  animation={true}
                  formHorizontal={false}
                  buttonColor="#000"></RadioForm> */}

                  <Modal
                    animationType={'slide'}
                    transparent={true}
                    visible={this.state.modaldate}
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <View style={style.ModalCont2}>
                      <View
                        style={{
                          paddingTop: 5,
                          backgroundColor: '#ffffff',
                          // flexDirection: 'row',
                          borderTopLeftRadius: 10,
                          borderTopRightRadius: 10,
                          height: '37%',
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
                        <TouchableOpacity
                          onPress={() => this.setState({ modaldate: false })}
                          style={{ position: 'absolute', left: 20, top: '5%' }}>
                          <Image
                            source={Union}
                            style={{
                              height: 15,
                              width: 15,
                              alignItems: 'center',
                            }}
                          />
                        </TouchableOpacity>
                        <Text
                          style={{
                            color: '#000',
                            fontFamily: 'Poppins-SemiBold',
                            fontSize: 16,
                          }}>
                          Mulai Dari
                        </Text>
                        <ScrollView style={{ width: '100%', height: '100%' }}>
                          <DatePicker
                            style={{
                              marginTop: '4%',
                              justifyContent: 'center',
                              alignSelf: 'center',
                            }}
                            date={this.state.date}
                            placeholder="select date"
                            minimumDate={new Date('2000-01-01')}
                            maximumDate={new Date('2022-12-31')}
                            onDateChange={date =>
                              this.setState({ date }, () =>
                                console.log(this.state.date),
                              )
                            }
                            androidVariant="nativeAndroid"
                            mode="date"
                          />
                        </ScrollView>
                      </View>
                    </View>
                  </Modal>

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
        ) : (
          <View />
        )}

        {this.props.user.presensi === 'karyawan' ? ( // admin pusat//
          <View style={{ backgroundColor: '#fff', height: '100%' }}>
            <View style={{ backgroundColor: '#0EBEDF', height: 150 }}>
              {this.state.cabang === 'List Anak' ? (
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
                    color={'#000'}
                    onChangeText={text => {
                      this.filterListanakaktif(text.toLowerCase()),
                        this.setState({ carianak: text });
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
              ) : (
                <View />
              )}
              {this.state.cabang === 'Non-aktif' ? (
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
                    color={'#000'}
                    onChangeText={text => {
                      this.filterListnon(text.toLowerCase()),
                        this.setState({ carianak: text });
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
              ) : (
                <View />
              )}
              {(this.state.cabang === 'BCPB') | (this.state.cabang === '') ? (
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
                    color={'#000'}
                    onChangeText={text => {
                      this.filterListBCPB(text.toLowerCase()),
                        this.setState({ carianak: text });
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
              ) : (
                <View />
              )}
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
                    this.setState({ cabang: value });
                  }}
                />
              </View>
            </View>
            {this.state.cabang === 'List Anak' ? (
              <FlatList
                refreshControl={
                  <RefreshControl
                    refreshing={this.state.refreshing}
                    onRefresh={() => this.onRefresh()}
                  />
                }
                data={
                  this.state.carianak === '' ? filter_aktif : this.state.filter1
                }
                renderItem={({ item }) => (
                  <View>
                    <View>
                      <View style={{}}>
                        <TouchableOpacity
                          onPress={() =>
                            this.props.navigation.navigate('Detail1', {
                              id_anak: item.id_anak,
                              item: item,
                            })
                          }>
                          <View style={style.itemflat}>
                            <View
                              style={{
                                width: '10%',
                                justifyContent: 'center',
                                backgroundColor:
                                  item.status_cpb === 'CPB'
                                    ? '#0076B8'
                                    : '#000' && item.status_cpb === 'PB'
                                      ? '#00B855'
                                      : '#000' && item.status_cpb === 'NPB'
                                        ? '#E32845'
                                        : '#000' && item.status_cpb === 'BCPB'
                                          ? '#FFBB0C'
                                          : '#000',
                              }}>
                              <View
                                style={{
                                  width: '40%',
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                  alignSelf: 'center',
                                  alignContent: 'center',
                                }}>
                                <Text
                                  style={{
                                    fontSize: 12,
                                    fontFamily: 'Poppins-Medium',
                                    color: '#fff',
                                  }}>
                                  {item.status_cpb}
                                </Text>
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
                                      {item.full_name}
                                    </Text>
                                    <View style={{ flexDirection: 'row' }}>
                                      <View style={{ flexDirection: 'row' }}>
                                        <JenisH style={{ marginLeft: 10 }} />
                                        <Text
                                          style={{
                                            color: '#000',
                                            fontSize: 10,
                                            marginLeft: 5,
                                            fontFamily: 'Poppins-Regular',
                                          }}>
                                          {item.jenis_kelamin}
                                        </Text>
                                      </View>

                                      <View style={{ flexDirection: 'row' }}>
                                        <TingkatH style={{ marginLeft: 10 }} />
                                        <Text
                                          style={{
                                            color: '#000',
                                            fontSize: 10,
                                            fontFamily: 'Poppins-Regular',
                                            marginLeft: 5,
                                          }}>
                                          {item.kelas}
                                        </Text>
                                      </View>

                                      <View style={{ flexDirection: 'row' }}>
                                        <LocationsH style={{ marginLeft: 10 }} />
                                        <Text
                                          style={{
                                            color: '#000',
                                            fontSize: 10,
                                            fontFamily: 'Poppins-Regular',
                                            marginLeft: 5,
                                          }}>
                                          {item.jenjang}
                                        </Text>
                                      </View>
                                    </View>
                                  </View>
                                </View>
                              </View>
                            </View>
                          </View>
                        </TouchableOpacity>
                      </View>
                      {/* <Modal animationType={"fade"} transparent={true}
                          visible={this.state.modalpilih}
                          onRequestClose={() => this.setState({ modalpilih: false })}>

                          <View style={{
                            backgroundColor: '#fff',
                            paddingTop: 5,
                            marginHorizontal: 5,
                            marginTop: '50%',
                            borderRadius: 20,
                            height: '35%',
                            width: '90%',
                            borderWidth: 1,
                            borderColor: '#bdbdbd',
                            alignItems: 'center',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignSelf: 'center'
                          }}>
                            <SafeAreaView style={{ alignItems: 'center' }}>
                              <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                                <View style={style.kotakkecil}>
                                  <TouchableOpacity onPress={() => this.setState({ pilihdonatur: true, modalpilih: false })}>
                                    <IconTamKelompok style={{ justifyContent: 'center', alignSelf: 'center' }} />
                                    <Text style={{ marginTop: 10, textAlign: 'center', padding: 5 }}>Pilih Donatur</Text>
                                  </TouchableOpacity>
                                </View>
                                <View style={style.kotakkecil}>
                                  <TouchableOpacity onPress={() => this.setState({ modalpilih: false })}>
                                    <Text style={{ marginTop: 10, textAlign: 'center', padding: 5 }}>Edit</Text>
                                  </TouchableOpacity>
                                </View>
                                <View style={style.kotakkecil}>
                                  <TouchableOpacity onPress={() => this.setState({ modalpilih: false })}>
                                    <Text style={{ marginTop: 10, textAlign: 'center', padding: 5 }}>Hapus Donatur</Text>
                                  </TouchableOpacity>
                                </View>
                              </View>

                              <View style={{ marginTop: '2%', alignItems: 'center', flexDirection: 'row', alignContent: 'center', }}>
                                <TouchableOpacity onPress={() => this.setState({ modalpilih: false }) + ToastAndroid.show('Batal', ToastAndroid.SHORT)}>
                                  <View style={{ height: 50, borderColor: '#00A9B8', borderWidth: 1, width: 100, justifyContent: 'center', alignItems: 'center', alignSelf: 'center', borderRadius: 5 }}>
                                    <Text style={{ color: '#00A9B8', fontFamily: 'Poppins-Medium', fontSize: 14 }}>Batal</Text>
                                  </View>
                                </TouchableOpacity>

                              </View>
                            </SafeAreaView>
                          </View >

                        </Modal > */}
                    </View>
                  </View>
                )}></FlatList>
            ) : (
              <View></View>
            )}
            {(this.state.cabang === 'BCPB') | (this.state.cabang === '') ? (
              <FlatList
                refreshControl={
                  <RefreshControl
                    refreshing={this.state.refreshing}
                    onRefresh={() => this.onRefresh()}
                  />
                }
                data={this.state.carianak === '' ? BCPB : this.state.filter2}
                renderItem={({ item }) => (
                  <View>
                    <View style={{}}>
                      <TouchableOpacity
                        onPress={() =>
                          this.props.navigation.navigate('Non_aktif', {
                            id_anak: item.id_anak,
                            item: item,
                          })
                        }>
                        <View style={style.itemflat}>
                          <View
                            style={{
                              width: '10%',
                              justifyContent: 'center',
                              backgroundColor:
                                item.status_cpb === 'CPB'
                                  ? '#0076B8'
                                  : '#000' && item.status_cpb === 'PB'
                                    ? '#00B855'
                                    : '#000' && item.status_cpb === 'NPB'
                                      ? '#E32845'
                                      : '#000' && item.status_cpb === 'BCPB'
                                        ? '#FFBB0C'
                                        : '#000',
                            }}>
                            <View
                              style={{
                                width: '40%',
                                justifyContent: 'center',
                                alignItems: 'center',
                                alignSelf: 'center',
                                alignContent: 'center',
                              }}>
                              <Text
                                style={{
                                  fontSize: 12,
                                  fontFamily: 'Poppins-Medium',
                                  color: '#fff',
                                }}>
                                {item.status_cpb}
                              </Text>
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
                                    {item.full_name}
                                  </Text>
                                  <View style={{ flexDirection: 'row' }}>
                                    {item.jenis_anak_binaan === null ? (
                                      <View style={{ flexDirection: 'row' }}>
                                        <JenisH style={{ marginLeft: 10 }} />
                                        <Text
                                          style={{
                                            color: '#000',
                                            fontSize: 10,
                                            marginLeft: 5,
                                            fontFamily: 'Poppins-Regular',
                                            margintop: 10,
                                          }}>
                                          Non-Tahfidz
                                        </Text>
                                      </View>
                                    ) : (
                                      <View style={{ flexDirection: 'row' }}>
                                        <JenisH style={{ marginLeft: 10 }} />
                                        <Text
                                          style={{
                                            color: '#000',
                                            fontSize: 10,
                                            marginLeft: 5,
                                            fontFamily: 'Poppins-Regular',
                                            margintop: 10,
                                          }}>
                                          {item.jenis_anak_binaan}
                                        </Text>
                                      </View>
                                    )}

                                    {item.kelas === null ? (
                                      <View style={{ flexDirection: 'row' }}>
                                        <TingkatH style={{ marginLeft: 10 }} />
                                        <Text
                                          style={{
                                            color: '#000',
                                            fontSize: 10,
                                            fontFamily: 'Poppins-Regular',
                                            marginLeft: 5,
                                          }}>
                                          Belum Sekolah
                                        </Text>
                                      </View>
                                    ) : (
                                      <View style={{ flexDirection: 'row' }}>
                                        <TingkatH style={{ marginLeft: 10 }} />
                                        <Text
                                          style={{
                                            color: '#000',
                                            fontSize: 10,
                                            fontFamily: 'Poppins-Regular',
                                            marginLeft: 5,
                                          }}>
                                          Kelas: {item.kelas}
                                        </Text>
                                      </View>
                                    )}
                                    {/* <View style={{ flexDirection: 'row', }}>
                                        <TingkatH style={{ marginLeft: 10, }} />
                                        <Text style={{ color: '#000', fontSize: 10, fontFamily: 'Poppins-Regular', }}>{item.kelas}</Text>
                                      </View> */}

                                    <View style={{ flexDirection: 'row' }}>
                                      <LocationsH style={{ marginLeft: 10 }} />
                                      <Text
                                        style={{
                                          color: '#000',
                                          fontSize: 10,
                                          fontFamily: 'Poppins-Regular',
                                          marginLeft: 5,
                                        }}>
                                        {item.tempat_lahir}
                                      </Text>
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
            ) : (
              <View></View>
            )}
            {this.state.cabang === 'Non-aktif' ? (
              <FlatList
                refreshControl={
                  <RefreshControl
                    refreshing={this.state.refreshing}
                    onRefresh={() => this.onRefresh()}
                  />
                }
                data={
                  this.state.carianak === ''
                    ? filter_validasi
                    : this.state.filter3
                }
                renderItem={({ item }) => (
                  <View style={{}}>
                    <TouchableOpacity
                      onPress={() =>
                        this.props.navigation.navigate('Non_aktif', {
                          id_anak: item.id_anak,
                          item: item,
                        })
                      }>
                      <View style={style.itemflat}>
                        <View
                          style={{
                            width: '10%',
                            justifyContent: 'center',
                            backgroundColor:
                              item.status_cpb === 'CPB'
                                ? '#0076B8'
                                : '#000' && item.status_cpb === 'PB'
                                  ? '#00B855'
                                  : '#000' && item.status_cpb === 'NPB'
                                    ? '#E32845'
                                    : '#000' && item.status_cpb === 'BCPB'
                                      ? '#FFBB0C'
                                      : '#000',
                          }}>
                          <View
                            style={{
                              width: '40%',
                              justifyContent: 'center',
                              alignItems: 'center',
                              alignSelf: 'center',
                              alignContent: 'center',
                            }}>
                            <Text
                              style={{
                                fontSize: 12,
                                fontFamily: 'Poppins-Medium',
                                color: '#fff',
                              }}>
                              {item.status_cpb}
                            </Text>
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
                                  {item.full_name}
                                </Text>
                                <View style={{ flexDirection: 'row' }}>
                                  <View style={{ flexDirection: 'row' }}>
                                    <JenisH style={{ marginLeft: 10 }} />
                                    <Text
                                      style={{
                                        color: '#000',
                                        fontSize: 10,
                                        marginLeft: 5,
                                        fontFamily: 'Poppins-Regular',
                                      }}>
                                      {item.jenis_anak_binaan}
                                    </Text>
                                  </View>

                                  <View style={{ flexDirection: 'row' }}>
                                    <TingkatH style={{ marginLeft: 10 }} />
                                    <Text
                                      style={{
                                        color: '#000',
                                        fontSize: 10,
                                        fontFamily: 'Poppins-Regular',
                                        marginLeft: 5,
                                      }}>
                                      {item.kelas}
                                    </Text>
                                  </View>

                                  <View style={{ flexDirection: 'row' }}>
                                    <LocationsH style={{ marginLeft: 10 }} />
                                    <Text
                                      style={{
                                        color: '#000',
                                        fontSize: 10,
                                        fontFamily: 'Poppins-Regular',
                                        marginLeft: 5,
                                      }}>
                                      {item.tempat_lahir}
                                    </Text>
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
            ) : (
              <View></View>
            )}

            <ActionButton
              buttonColor="#00A9B8"
              offsetX={'7%'}
              offsetY={'170%'}
              bgColor="#000"
              bgOpacity={0.7}>
              <ActionButton.Item
                buttonColor="#00A9B8"
                title="Tambah Anak Binaan"
                offsetX={25}
                hideShadow={true}
                onPress={() => this.setState({ modalpilih: true })}
                textStyle={{ fontSize: 14, fontFamily: 'Poppins-Medium' }}
                buttonTextStyle={{ backgroundColor: '#000' }}>
                <Adduser style={style.actionButtonIcon} />
              </ActionButton.Item>
            </ActionButton>

            <Modal
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
                              // padding: 10,
                              // bottom: 20,
                              // right: 15,
                              // flexDirection: 'row',
                              // borderRadius: 5,
                              // // marginHorizontal: 5,
                              // height: 45,
                              // alignItems: 'center',
                              // justifyContent: 'center'
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

                    {/* <TouchableOpacity style={style.refresh} onPress={() => this.togleTambah(true)}>
                  <Image source={search} style={style.tambah}></Image>
                </TouchableOpacity> */}
                  </ScrollView>
                </View>
              </View>
            </Modal>

            <Modal
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
                  <Text style={style.itemText}>
                    Tambah Kegiatan Pekanan Tutor
                  </Text>
                  <ScrollView style={{ width: '100%', height: '100%' }}>
                    <View>
                      <View>
                        <Text style={style.Label2}>
                          Materi Yang Disampaikan
                        </Text>
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
                              this.state.img1 === null
                                ? 0
                                : this.state.img1 + 1,
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

                    {/* <TouchableOpacity style={style.refresh} onPress={() => this.togleTambah(true)}>
                  <Image source={search} style={style.tambah}></Image>
                </TouchableOpacity> */}
                  </ScrollView>
                </View>
              </View>
            </Modal>

            <Modal
              animationType={'slide'}
              transparent={true}
              visible={this.state.modalTamPel}
              style={{
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onRequestClose={() => this.setState({ modalTamPel: false })}>
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
                          <Picker.Item
                            label="Pilih Tingkatan Pelatihan"
                            value=""
                          />
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
                              this.state.img3 === null
                                ? 0
                                : this.state.img3 + 1,
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
                      {/* <TouchableOpacity style={style.refresh} onPress={() => this.togleTambah(true)}>
                  <Image source={search} style={style.tambah}></Image>
                </TouchableOpacity> */}
                    </View>
                  </ScrollView>
                </View>
              </View>
            </Modal>
            <Modal
              animationType={'fade'}
              transparent={true}
              visible={this.state.modalpilih}
              onRequestClose={() => this.setState({ modalpilih: false })}>
              <View
                style={{
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
                  alignSelf: 'center',
                }}>
                <SafeAreaView style={{ alignItems: 'center' }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <View style={style.kotakkecil}>
                      <TouchableOpacity
                        onPress={() =>
                          this.props.navigation.navigate('First', {
                            modalpilih: false,
                          })
                        }>
                        <Tambahkk />
                        <Text
                          style={{
                            marginTop: 10,
                            textAlign: 'center',
                            padding: 5,
                          }}>
                          Tambah Kartu Keluarga
                        </Text>
                      </TouchableOpacity>
                    </View>
                    <View style={style.kotakkecil}>
                      <TouchableOpacity
                        onPress={() =>
                          this.props.navigation.navigate('carikk', {
                            modalpilih: false,
                          })
                        }>
                        <KKada
                          style={{
                            justifyContent: 'center',
                            alignSelf: 'center',
                          }}
                        />
                        <Text
                          style={{
                            marginTop: 10,
                            textAlign: 'center',
                            padding: 5,
                          }}>
                          Gunakan KK yang sudah ada
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>

                  <View
                    style={{
                      marginTop: '2%',
                      alignItems: 'center',
                      flexDirection: 'row',
                      alignContent: 'center',
                    }}>
                    <TouchableOpacity
                      onPress={() =>
                        this.setState({ modalpilih: false }) +
                        ToastAndroid.show('Batal', ToastAndroid.SHORT)
                      }>
                      <View
                        style={{
                          height: 50,
                          borderColor: '#00A9B8',
                          borderWidth: 1,
                          width: 100,
                          justifyContent: 'center',
                          alignItems: 'center',
                          alignSelf: 'center',
                          borderRadius: 5,
                        }}>
                        <Text
                          style={{
                            color: '#00A9B8',
                            fontFamily: 'Poppins-Medium',
                            fontSize: 14,
                          }}>
                          Batal
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </SafeAreaView>
              </View>
            </Modal>
          </View>
        ) : (
          <View />
        )}

        {(this.state.cabang === 'List Anak') | (this.state.cabang === '') ? (
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
                  height: '90%',
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
                    Jenis Anak
                  </Text>
                  <View style={{ flexDirection: 'row', marginTop: '4%' }}>
                    <TouchableOpacity
                      style={[
                        style.types,
                        {
                          backgroundColor:
                            JenisA === 'Non-Tahfidz' ? '#00A9B8' : '#fff',
                        },
                      ]}
                      onPress={() => this.setState({ JenisA: 'Non-Tahfidz' })}>
                      <Text
                        style={{
                          color: JenisA === 'Non-Tahfidz' ? '#fff' : '#5D5C5D',
                          fontFamily: 'Poppins-Regular',
                          fontSize: 14,
                        }}>
                        Non-Tahfidz
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[
                        style.types,
                        {
                          backgroundColor:
                            JenisA === 'Tahfidz' ? '#00A9B8' : '#fff',
                        },
                      ]}
                      onPress={() => this.setState({ JenisA: 'Tahfidz' })}>
                      <Text
                        style={{
                          color: JenisA === 'Tahfidz' ? '#fff' : '#5D5C5D',
                          fontFamily: 'Poppins-Regular',
                          fontSize: 14,
                        }}>
                        Tahfidz
                      </Text>
                    </TouchableOpacity>
                  </View>

                  <Text
                    style={{
                      fontWeight: 'bold',
                      fontSize: 14,
                      fontFamily: 'Poppins-SemiBold',
                      color: '#000',
                      marginTop: '4%',
                    }}>
                    Jenis Kelamin
                  </Text>

                  <View>
                    <View style={{ flexDirection: 'row', marginTop: '4%' }}>
                      <TouchableOpacity
                        style={[
                          style.types,
                          {
                            backgroundColor:
                              JenisK === 'Laki-Laki' ? '#00A9B8' : '#fff',
                          },
                        ]}
                        onPress={() => this.setState({ JenisK: 'Laki-Laki' })}>
                        <Text
                          style={{
                            color: JenisK === 'Laki-Laki' ? '#fff' : '#5D5C5D',
                            fontFamily: 'Poppins-Regular',
                            fontSize: 14,
                          }}>
                          Laki-laki
                        </Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={[
                          style.types,
                          {
                            backgroundColor:
                              JenisK === 'Perempuan' ? '#00A9B8' : '#fff',
                          },
                        ]}
                        onPress={() => this.setState({ JenisK: 'Perempuan' })}>
                        <Text
                          style={{
                            color: JenisK === 'Perempuan' ? '#fff' : '#5D5C5D',
                            fontFamily: 'Poppins-Regular',
                            fontSize: 14,
                          }}>
                          Perempuan
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                  {/*v3v*/}
                  <Text
                    style={{
                      fontWeight: 'bold',
                      fontSize: 14,
                      fontFamily: 'Poppins-SemiBold',
                      color: '#000',
                      marginTop: '4%',
                    }}>
                    Pendidikan
                  </Text>

                  <View style={{ marginTop: 10, flexDirection: 'column' }}>
                    <View style={{ flexDirection: 'row' }}>
                      <TouchableOpacity
                        style={[
                          style.types,
                          {
                            backgroundColor:
                              pilih === 'SD' ? '#00A9B8' : '#fff',
                          },
                        ]}
                        onPress={() =>
                          this.setState({ pilih: 'SD' }, () =>
                            console.log(this.state.pilih),
                          )
                        }>
                        <Text
                          style={{
                            color: pilih === 'SD' ? '#fff' : '#5D5C5D',
                            fontFamily: 'Poppins-Regular',
                            fontSize: 14,
                          }}>
                          SD
                        </Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={[
                          style.types,
                          {
                            backgroundColor:
                              pilih === 'SMP' ? '#00A9B8' : '#fff',
                          },
                        ]}
                        onPress={() =>
                          this.setState({ pilih: 'SMP' }, () =>
                            console.log(this.state.pilih),
                          )
                        }>
                        <Text
                          style={{
                            color: pilih === 'SMP' ? '#fff' : '#5D5C5D',
                            fontFamily: 'Poppins-Regular',
                            fontSize: 14,
                          }}>
                          SMP
                        </Text>
                      </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: '4%' }}>
                      <TouchableOpacity
                        style={[
                          style.types,
                          {
                            backgroundColor:
                              pilih === 'SMA' ? '#00A9B8' : '#fff',
                          },
                        ]}
                        onPress={() =>
                          this.setState({ pilih: 'SMA' }, () =>
                            console.log(this.state.pilih),
                          )
                        }>
                        <Text
                          style={{
                            color: pilih === 'SMA' ? '#fff' : '#5D5C5D',
                            fontFamily: 'Poppins-Regular',
                            fontSize: 14,
                          }}>
                          SMA
                        </Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={[
                          style.types,
                          {
                            backgroundColor:
                              pilih === 'Kuliah' ? '#00A9B8' : '#fff',
                          },
                        ]}
                        onPress={() =>
                          this.setState({ pilih: 'Kuliah' }, () =>
                            console.log(this.state.pilih),
                          )
                        }>
                        <Text
                          style={{
                            color: pilih === 'Kuliah' ? '#fff' : '#5D5C5D',
                            fontFamily: 'Poppins-Regular',
                            fontSize: 14,
                          }}>
                          Perguruan Tinggi
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      fontSize: 14,
                      fontFamily: 'Poppins-SemiBold',
                      color: '#000',
                      marginTop: '4%',
                    }}>
                    Status Binaan
                  </Text>
                  <View style={{ flexDirection: 'row', marginTop: '4%' }}>
                    <TouchableOpacity
                      style={[
                        style.types,
                        {
                          backgroundColor:
                            JenisS === 'BCPB' ? '#00A9B8' : '#fff',
                        },
                      ]}
                      onPress={() =>
                        this.setState({ JenisS: 'BCPB' }, () =>
                          console.log(this.state.JenisS),
                        )
                      }>
                      <Text
                        style={{
                          color: JenisS === 'BCPB' ? '#fff' : '#5D5C5D',
                          fontFamily: 'Poppins-Regular',
                          fontSize: 14,
                        }}>
                        BCPB
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[
                        style.types,
                        {
                          backgroundColor:
                            JenisS === 'CPB' ? '#00A9B8' : '#fff',
                        },
                      ]}
                      onPress={() =>
                        this.setState({ JenisS: 'CPB' }, () =>
                          console.log(this.state.JenisS),
                        )
                      }>
                      <Text
                        style={{
                          color: JenisS === 'CPB' ? '#fff' : '#5D5C5D',
                          fontFamily: 'Poppins-Regular',
                          fontSize: 14,
                        }}>
                        CPB
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[
                        style.types,
                        { backgroundColor: JenisS === 'PB' ? '#00A9B8' : '#fff' },
                      ]}
                      onPress={() =>
                        this.setState({ JenisS: 'PB' }, () =>
                          console.log(this.state.JenisS),
                        )
                      }>
                      <Text
                        style={{
                          color: JenisS === 'PB' ? '#fff' : '#5D5C5D',
                          fontFamily: 'Poppins-Regular',
                          fontSize: 14,
                        }}>
                        PB
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[
                        style.types,
                        {
                          backgroundColor:
                            JenisS === 'NPB' ? '#00A9B8' : '#fff',
                        },
                      ]}
                      onPress={() =>
                        this.setState({ JenisS: 'NPB' }, () =>
                          console.log(this.state.JenisS),
                        )
                      }>
                      <Text
                        style={{
                          color: JenisS === 'NPB' ? '#fff' : '#5D5C5D',
                          fontFamily: 'Poppins-Regular',
                          fontSize: 14,
                        }}>
                        NPB
                      </Text>
                    </TouchableOpacity>
                  </View>
                  {/* <RadioForm
                  radio_props={listfilter}
                  onPress={value => {
                    this.setState({ listfilter: value }),
                      ToastAndroid.show(value.toString(), ToastAndroid.SHORT);
                  }}
                  initial={-1}
                  buttonSize={10}
                  buttonOuterSize={20}
                  radioStyle={{ marginVertical: 10, }}
                  animation={true}
                  formHorizontal={false}
                  buttonColor="#000"></RadioForm> */}

                  <Modal
                    animationType={'slide'}
                    transparent={true}
                    visible={this.state.modaldate}
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <View style={style.ModalCont2}>
                      <View
                        style={{
                          paddingTop: 5,
                          backgroundColor: '#ffffff',
                          // flexDirection: 'row',
                          borderTopLeftRadius: 10,
                          borderTopRightRadius: 10,
                          height: '37%',
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
                        <TouchableOpacity
                          onPress={() => this.setState({ modaldate: false })}
                          style={{ position: 'absolute', left: 20, top: '5%' }}>
                          <Image
                            source={Union}
                            style={{
                              height: 15,
                              width: 15,
                              alignItems: 'center',
                            }}
                          />
                        </TouchableOpacity>
                        <Text
                          style={{
                            color: '#000',
                            fontFamily: 'Poppins-SemiBold',
                            fontSize: 16,
                          }}>
                          Mulai Dari
                        </Text>
                        <ScrollView style={{ width: '100%', height: '100%' }}>
                          <DatePicker
                            style={{
                              marginTop: '4%',
                              justifyContent: 'center',
                              alignSelf: 'center',
                            }}
                            date={this.state.date}
                            placeholder="select date"
                            minimumDate={new Date('2000-01-01')}
                            maximumDate={new Date('2022-12-31')}
                            onDateChange={date =>
                              this.setState({ date }, () =>
                                console.log(this.state.date),
                              )
                            }
                            androidVariant="nativeAndroid"
                            mode="date"
                          />
                        </ScrollView>
                      </View>
                    </View>
                  </Modal>

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
        ) : (
          <View />
        )}
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
  types: {
    marginRight: 5,
    borderWidth: 1,
    borderColor: '#bbb',
    paddingHorizontal: 15,
    paddingVertical: 7,
    borderRadius: 6,
    backgroundColor: '#fff',
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
  kotakkecil: {
    flexDirection: 'column',
    borderColor: '#bdbdbd',
    borderWidth: 1,
    width: '40%',
    height: 160,
    justifyContent: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    textAlign: 'center',
    alignItems: 'center',
    borderRadius: 10,
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
export default connect(mapStateToProps, mapDispatchToProps)(List_Anak_Binaan);
