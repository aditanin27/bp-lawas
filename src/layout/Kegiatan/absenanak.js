import {
  RefreshControl,
  Modal,
  Video,
  ToastAndroid,
  Alert,
  ScrollView,
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
  BackHandler,
  Dimensions,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import React, { Component } from 'react';
import { search, arrow, test } from '../../assets/images';
import { BackHitam, MiniCam, Pesawat } from '../../assets/icons';
import * as ImagePicker from 'react-native-image-picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import CheckBox from '@react-native-community/checkbox';
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
  AccordionList,
} from 'accordion-collapse-react-native';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

const width = Dimensions.get('window').width;
const openCamera = () => {
  const [imageCamera, setImageCamera] = useState(null);
  const option = {
    mediaType: 'photo',
    quality: 1,
  };
};

export class absenanak extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tmblketsakit: false,
      tmblketizin: false,
      tanggal: new Date(),
      keterangan: '',
      kehadiran: '',
      anak: [],
      anaksemua: [],
      select: [],
      id_shelter: this.props.user.id_shelter,
      read: 'tidak',
      count: 1,
      foto1: {
        name: '',
        type: '',
        uri: '',
        size: '',
      },
      // getid: this.props.route.params.id_aktivitas,
    };
  }
  getIndex = selectedIndex => {
    this.setState({ selectedIndex: selectedIndex });
  };
  takePic(id_anak) {
    {
      ImagePicker.launchCamera(
        {
          noData: true,
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
              uri: response.assets[0].uri,
              name: response.assets[0].fileName,
              type: response.assets[0].type,
              id: 1,
            };
            console.log('ini gambar = ', source);
            this.setState({
              foto1: source,
              kehadiran: 'Sakit'
            }),
              this.SimpanData(id_anak);
            console.log('ini gambar = ', this.state.foto1);
          }
        },
      );
    }
  }
  takePicizin(id_anak) {
    {
      ImagePicker.launchCamera(
        {
          noData: true,
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
              uri: response.assets[0].uri,
              name: response.assets[0].fileName,
              type: response.assets[0].type,
              id: 1,
            };
            console.log('ini gambar = ', source);
            this.setState({
              foto1: source,
              kehadiran: 'Izin'
            }),
              this.SimpanData(id_anak);
            console.log('ini gambar = ', this.state.foto1);
          }
        },
      );
    }
  }
  displayModal(show) {
    this.setState({ isVisible: show });
  }
  displayModal1(show) {
    this.setState({ buka: show });
  }
  SimpanData(id_anak) {
    AsyncStorage.getItem('token').then((token) => {
      let dataToSend = {
        keterangan: this.state.foto1.name === '' ? '' : this.state.foto1,
        id_tutor: this.props.route.params.id_aktivitas[0].id_tutor,
        id_anak: id_anak,
        absen: this.state.kehadiran,
        is_read: this.state.read,
      };
      let data = new FormData();

      for (let key in dataToSend) {
        data.append(key, dataToSend[key]);
      }
      console.log('kkkk', data);
      fetch('https://kilauindonesia.org/datakilau/api/anakbelajar/' +
        this.props.route.params.id_aktivitas[0].id_aktivitas, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data'
        },
        body: data,
      })
        .then((res) => res.json())
        .then(resJson => {
          console.log(resJson);
          if (resJson.status === 'sukses') {
            // this.props.navigation.navigate('Home');
            // this.onRefresh();
            ToastAndroid.show('Data berhasil ditambah!', ToastAndroid.SHORT);
          } else {
            ToastAndroid.show(
              'Absen anak gagal karena anak ini sudah di absen',
              ToastAndroid.SHORT,
            );
          }
        })
        .catch((err) => console.log('dari catch send Data ===', err));
    });
  }


  componentDidMount() {
    this.GetAnakAPi();
    this.GetSemuaAPI();
    console.log();
  }

  onRefresh() {
    this.tokenCheck();
  }

  GetAnakAPi() {
    AsyncStorage.getItem('token').then((token) => {
      fetch('https://kilauindonesia.org/datakilau/api/getuntukabsen/' + this.props.route.params.id_aktivitas[0].nama_kelompok, {
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
            anak: resJson.data,
            Refreshing: false,
          });
        })
        .catch((err) => console.log('error catch home', err));
    });
  }
  GetSemuaAPI() {
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
            anaksemua: resJson.data,
            filter1: resJson.data,
            filter2: resJson.data,
            filter3: resJson.data,
            refreshing: false,
          });
        })
        .catch((err) => console.log('error catch home', err));
    });
  }
  Update() {
    this.Kegiatan();
  }

  checklis = index => {
    anak[this.state.index].check = !anak[this.state.index].check;
    this.setState({});
  };

  izin = (id_anak, index, kehadiran) => {
    var select = this.state.select;
    // var kehadiran = this.state.kehadiran;
    var del = 0;
    for (let i = 0; i < this.state.select.length; i++) {
      if (this.state.select[i].id_anak === id_anak) {
        this.state.select.splice(i, 1);
        del = id_anak;
      }
    }
    for (let i = 0; i < this.state.kehadiran.length; i++) {
      this.setState(
        prevState => {
          prevState.kehadiran[index] = kehadiran;
          return {
            kehadiran: prevState.kehadiran,
          };
        },
        () => console.log(this.state.kehadiran),
      );
    }
    if (id_anak != del) {
      select.push({ id_anak });
    }
    console.log(select, this.state.kehadiran);
  };

  alpa = (id_anak, status_cpb) => {
    this.setState({
      kehadiran: 'alpa',
    });
    console.log(this.state.kehadiran);
  };

  sakit = (id_anak, index, kehadiran) => {
    var select = this.state.select;
    // var kehadiran = this.state.kehadiran;
    var del = 0;
    for (let i = 0; i < this.state.select.length; i++) {
      if (this.state.select[i].id_anak === id_anak) {
        this.state.select.splice(i, 1);
        del = id_anak;
      }
    }
    if (id_anak != del) {
      select.push({ id_anak });
    }

    for (let i = 0; i < this.state.kehadiran.length; i++) {
      this.setState(
        prevState => {
          prevState.kehadiran[index] = kehadiran;
          return {
            kehadiran: prevState.kehadiran,
          };
        },
        () => console.log(this.state.kehadiran),
      );
    }
    console.log(select);
  };
  onRefresh() {
    this.GetAnakAPi();
    this.GetAnakAPisemua();
    this.setState({ Refreshing: false });
  }

  filterList(textToSearch) {
    this.setState({
      anak: this.state.anak.filter(i =>
        i.nama.toLowerCase().includes(textToSearch),
      ),
    });
    // | i.jabatan.toLowerCase().includes(textToSearch)
  }
  render() {
    const kehad = this.state.kehadiran;
    const filanak = this.state.anaksemua.filter(
      item => item.id_kelompok != null,
    );
    console.log(this.props.route.params.id_aktivitas);
    const SA = [];
    for (let i = 0; i < this.state.count; i++) {
      SA.push(
        <>
          <ScrollView>
            <View key={i}>
              {
                filanak.map((item, i) => {
                  return (
                    <View style={styles.cover}>
                      <Image
                        source={{
                          uri:
                            'https://kilauindonesia.org/datakilau/gambarUpload/' +
                            item.foto,
                        }}
                        style={{
                          width: 100,
                          height: 100,
                          borderRadius: 50,
                          justifyContent: 'center',
                          alignSelf: 'center',
                        }}></Image>
                      <View style={{ margin: 10 }}>
                        <Text style={{ textAlign: 'center' }}>
                          {item.full_name} {item.id_anak}
                        </Text>
                      </View>

                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-around',
                          marginHorizontal: 40,
                        }}>
                        <TouchableOpacity
                          onPress={() => {
                            // this.props.navigation.navigate('testface', { item: item })
                            if (this.state.kehadiran === '') {
                              ToastAndroid.show(
                                'Klik lagi untuk Konfirmasi',
                                ToastAndroid.LONG,
                              );
                              this.setState({ kehadiran: 'Hadir' });
                              console.log(this.state.kehadiran);
                            } else {
                              this.setState({ kehadiran: 'Hadir' });
                              this.SimpanData(item.id_anak);
                              console.log(this.state.kehadiran);
                            }
                          }
                          }
                          style={styles.kotakhadir}>
                          <Text style={{ color: '#00A9B8' }}>Hadir</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                          onPress={() => {
                            this.takePicizin(item.id_anak)
                            this.setState({ kehadiran: 'Izin' });
                            ;
                          }}
                          style={styles.kotakizin}>
                          <Text style={{ color: '#FFBB0C' }}>Izin</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                          onPress={() => {
                            this.takePic(item.id_anak);
                            this.setState({ kehadiran: 'Sakit' });
                          }}
                          style={styles.kotaksakit}>
                          <Text style={{ Color: '#FF460C', textAlign: 'center' }}>
                            Sakit
                          </Text>
                        </TouchableOpacity>
                      </View>
                      <TouchableOpacity
                        onPress={() => {
                          if (this.state.kehadiran === '') {
                            ToastAndroid.show(
                              'Klik lagi untuk Konfirmasi',
                              ToastAndroid.LONG,
                            );
                            this.setState({ kehadiran: 'Tidak Hadir' });
                            console.log(this.state.kehadiran);
                          } else {
                            this.setState({ kehadiran: 'Tidak Hadir' });
                            this.SimpanData(item.id_anak);
                          }
                        }}
                        style={styles.kotaktidak}>
                        <Text style={{ Color: '#bdbdbd', textAlign: 'center' }}>
                          Tidak ada Keterangan
                        </Text>
                      </TouchableOpacity>
                      {
                        this.state.tmblketsakit === true ? (
                          <View style={styles.kotaktidak1}>
                            <Text style={{ textAlign: 'right', marginLeft: 10, width: '70%' }}>
                              <Text>{this.state.foto1.name}</Text>
                            </Text>
                            <View
                              style={{
                                flexDirection: 'row',
                                marginHorizontal: 10,
                                justifyContent: 'flex-end',
                              }}>
                              <TouchableOpacity
                                onPress={() => {
                                  this.takePic();
                                }}>
                                <MiniCam style={{ marginRight: 10 }} />
                              </TouchableOpacity>

                              <TouchableOpacity
                                onPress={() => {
                                  if (this.state.kehadiran === '') {
                                    ToastAndroid.show(
                                      'Klik lagi untuk Konfirmasi',
                                      ToastAndroid.LONG,
                                    );
                                    this.setState({ kehadiran: '' });
                                    console.log(this.state.kehadiran);
                                  } else {
                                    this.setState({ kehadiran: 'Izin' });
                                    this.SimpanData(item.id_anak);
                                    console.log(this.state.kehadiran);
                                  }
                                }}>
                                <Pesawat />
                              </TouchableOpacity>
                            </View>
                          </View>
                        ) : (
                          <View />
                        )
                      }

                      {
                        this.state.tmblketizin === true ? (
                          <View style={styles.kotaktidak1}>
                            <Text style={{ textAlign: 'right', marginLeft: 10 }}>
                              {/* <Text>{this.state.foto.name}</Text> */}
                            </Text>
                            <View
                              style={{
                                flexDirection: 'row',
                                marginHorizontal: 10,
                                justifyContent: 'flex-end',
                              }}>
                              <MiniCam style={{ marginRight: 10 }} />
                              <TouchableOpacity
                                onPress={() => {
                                  if (this.state.kehadiran === '') {
                                    ToastAndroid.show(
                                      'Klik lagi untuk Konfirmasi',
                                      ToastAndroid.LONG,
                                    );
                                    this.setState({
                                      kehadiran: 'Sakit',
                                    });
                                    console.log(this.state.kehadiran);
                                  } else {
                                    this.setState({ kehadiran: 'Sakit' });
                                    this.SimpanData(item.id_anak);
                                    console.log(this.state.kehadiran);
                                  }
                                }}>
                                <Pesawat />
                              </TouchableOpacity>
                            </View>
                          </View>
                        ) : (
                          <View />
                        )
                      }
                    </View>
                  )
                })
              }
            </View>
          </ScrollView>
        </>,
      );
    }

    const sebagian = [];
    for (let i = 0; i < this.state.count; i++) {
      sebagian.push(
        <>
          <ScrollView>
            <View key={i}>
              {
                this.state.anak.map((item, i) => {
                  return (
                    <View style={styles.cover}>
                      <Image
                        source={{
                          uri:
                            'https://kilauindonesia.org/datakilau/gambarUpload/' +
                            item.foto,
                        }}
                        style={{
                          width: 100,
                          height: 100,
                          borderRadius: 50,
                          justifyContent: 'center',
                          alignSelf: 'center',
                        }}></Image>
                      <View style={{ margin: 10 }}>
                        <Text style={{ textAlign: 'center' }}>
                          {item.full_name} {item.id_anak}
                        </Text>
                      </View>

                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-around',
                          marginHorizontal: 40,
                        }}>
                        <TouchableOpacity
                          onPress={() => {
                            if (this.state.kehadiran === '') {
                              ToastAndroid.show(
                                'Klik lagi untuk Konfirmasi',
                                ToastAndroid.LONG,
                              );
                              this.setState({ kehadiran: 'Hadir' });
                              console.log(this.state.kehadiran);
                            } else {
                              this.setState({ kehadiran: 'Hadir' });
                              this.SimpanData(item.id_anak);
                              console.log(this.state.kehadiran);
                            }
                          }}
                          style={styles.kotakhadir}>
                          <Text style={{ color: '#00A9B8' }}>Hadir</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                          onPress={() => {
                            this.takePicizin(item.id_anak)
                              ;
                          }}
                          style={styles.kotakizin}>
                          <Text style={{ color: '#FFBB0C' }}>Izin</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                          onPress={() => {
                            this.takePic(item.id_anak);
                          }}
                          style={styles.kotaksakit}>
                          <Text style={{ Color: '#FF460C', textAlign: 'center' }}>
                            Sakit
                          </Text>
                        </TouchableOpacity>
                      </View>
                      <TouchableOpacity
                        onPress={() => {
                          if (this.state.kehadiran === '') {
                            ToastAndroid.show(
                              'Klik lagi untuk Konfirmasi',
                              ToastAndroid.LONG,
                            );
                            this.setState({ kehadiran: 'Tidak Hadir' });
                            console.log(this.state.kehadiran);
                          } else {
                            this.setState({ kehadiran: 'Tidak Hadir' });
                            this.SimpanData(item.id_anak);
                          }
                        }}
                        style={styles.kotaktidak}>
                        <Text style={{ Color: '#bdbdbd', textAlign: 'center' }}>
                          Tidak ada Keterangan
                        </Text>
                      </TouchableOpacity>
                      {this.state.tmblketsakit === true ? (
                        <View style={styles.kotaktidak1}>
                          <Text style={{ textAlign: 'right', marginLeft: 10 }}>
                            {/* <Text>{this.state.foto.name}</Text> */}
                          </Text>
                          <View
                            style={{
                              flexDirection: 'row',
                              marginHorizontal: 10,
                              justifyContent: 'flex-end',
                            }}>
                            <MiniCam style={{ marginRight: 10 }} />
                            <TouchableOpacity
                              onPress={() => {
                                if (this.state.kehadiran === '') {
                                  ToastAndroid.show(
                                    'Klik lagi untuk Konfirmasi',
                                    ToastAndroid.LONG,
                                  );
                                  this.setState({ kehadiran: 'Izin' });
                                  console.log(this.state.kehadiran);
                                } else {
                                  this.setState({ kehadiran: 'Izin' });
                                  this.SimpanData(item.id_anak);
                                  console.log(this.state.kehadiran);
                                }
                              }}>
                              <Pesawat />
                            </TouchableOpacity>
                          </View>
                        </View>
                      ) : (
                        <View />
                      )}

                      {this.state.tmblketizin === true ? (
                        <View style={styles.kotaktidak1}>
                          <Text style={{ textAlign: 'right', marginLeft: 10 }}>
                            {/* <Text>{this.state.foto.name}</Text> */}
                          </Text>
                          <View
                            style={{
                              flexDirection: 'row',
                              marginHorizontal: 10,
                              justifyContent: 'flex-end',
                            }}>
                            <MiniCam style={{ marginRight: 10 }} />
                            <TouchableOpacity
                              onPress={() => {
                                if (this.state.kehadiran === '') {
                                  ToastAndroid.show(
                                    'Klik lagi untuk Konfirmasi',
                                    ToastAndroid.LONG,
                                  );
                                  this.setState({
                                    kehadiran: 'Sakit',
                                  });
                                  console.log(this.state.kehadiran);
                                } else {
                                  this.setState({ kehadiran: 'Sakit' });
                                  this.SimpanData(item.id_anak);
                                  console.log(this.state.kehadiran);
                                }
                              }}>
                              <Pesawat />
                            </TouchableOpacity>
                          </View>
                        </View>
                      ) : (
                        <View />
                      )}
                    </View>
                  )
                })
              }
            </View>
          </ScrollView>
        </>,
      );
    }
    console.log(this.state.anaksemua)
    return (
      <View style={styles.contentContainer}>
        <ScrollView style={{ height: '100%', backgroundColor: '#fff' }}>
          <View>
            <Text style={styles.info2}>
              Tambah Kegiatan anak Binan {filanak.length}
              {/* {this.props.route.params.id_aktivitas[0].id_aktivitas} */}
            </Text>
            {/* <Text>{this.props.route.params.kelompok}</Text>
            <Text>{this.props.route.params.materi}</Text>
            <Text>{this.props.route.params.level}</Text>
            <Text>{this.props.route.params.keg}</Text>
            <Text>{this.props.route.params.namakel}</Text> */}
          </View>

          <View>
            {/* <Text>

              {this.props.route.params.id_aktivitas[0].jenis_kegiatan}
            </Text> */}

          </View>
          {this.props.route.params.id_aktivitas[0].jenis_kegiatan === 'Bimbel'
            ?
            <View>{sebagian}</View>
            : <View>{SA}</View>}
        </ScrollView>

        {/* <View style={styles.BSimpan2}>
                    <TouchableOpacity>
                    <View style={styles.BSimpan}>
                        <Text style={styles.label5}>Simpan</Text>
                      </View>
                    </TouchableOpacity>
                  </View> */}

        <View style={styles.BSimpan}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Home')}>
            <Text style={styles.label5}>Selesai</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  imageStyle: {
    padding: 10,
    margin: 5,
    height: 25,
    width: 25,
    resizeMode: 'stretch',
    alignItems: 'center',
    flex: 1,
  },

  contentContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
  },

  subcover: {
    paddingBottom: '10%',
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'column',
  },

  btnCover1: {
    borderColor: '#00A9B8',
    flexDirection: 'row',
    alignSelf: 'center',
    borderWidth: 1,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnCover2: {
    borderColor: '#FFBB0C',

    flexDirection: 'row',
    alignSelf: 'center',
    borderWidth: 1,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnCover3: {
    borderColor: '#FF460C',
    flexDirection: 'row',
    alignSelf: 'center',
    borderWidth: 1,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },

  btnCover4: {
    borderColor: '#C0C0C0',
    flexDirection: 'row',
    alignSelf: 'center',
    borderWidth: 1,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: '10%',
    paddingRight: '10%',
    paddingBottom: '5%',
    paddingTop: '5%',
    marginVertical: 10,
  },

  btnCover5: {
    // flexDirection : 'row',
    // textAlignVertical : 'top',
    // justifyContent : 'center',
    // marginHorizontal: '1%',
    // borderColor : '#C0C0C0',
    // borderWidth : 1,
    // borderRadius : 10,
    // marginLeft : 10,
    // marginRight : 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 0.5,
    borderColor: 'grey',
    height: 40,
    borderRadius: 8,
    margin: 10,
  },

  info2: {
    justifyContent: 'center',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 10,
  },

  info3: {
    flexDirection: 'row',
    justifyContent: 'center',
    fontSize: 14,
    paddingTop: '8%',
    alignItems: 'center',
    paddingBottom: '10%',
    paddingLeft: '35%',
    marginTop: -3,
    color: 'black',
    fontWeight: 'Bold',
  },
  btn1: {
    marginRight: '5%',
    paddingVertical: '3%',
    margin: '10%',

    fontSize: 12,
    color: '#00A9B8',
    fontWeight: 'bold',
    alignSelf: 'center',
    textTransform: 'uppercase',
    textAlignVertical: 'top',
    justifyContent: 'center',
  },
  btn2: {
    paddingVertical: '3%',

    fontSize: 12,
    margin: '10%',
    color: '#FFBB0C',
    fontWeight: 'bold',
    alignSelf: 'center',
    textTransform: 'uppercase',
    textAlignVertical: 'top',
    justifyContent: 'center',
  },
  btn3: {
    paddingVertical: '3%',
    fontSize: 12,
    margin: '10%',
    marginLeft: 10,
    color: '#FF460C',
    fontWeight: 'bold',
    alignSelf: 'center',
    textTransform: 'uppercase',
    textAlignVertical: 'top',
    justifyContent: 'center',
  },

  btn4: {
    fontSize: 12,

    color: '#C0C0C0',
    fontWeight: 'bold',
    alignSelf: 'center',
    textTransform: 'uppercase',
    textAlignVertical: 'top',
    justifyContent: 'center',
  },

  btn5: {
    // textAlign : 'left'
    flex: 1,
  },

  cover: {
    marginHorizontal: '9%',
    marginVertical: '9%',
    backgroundColor: 'white',
    marginBottom: '1%',
    borderRadius: 8,
    height: 350,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.8,
    shadowRadius: 4.65,
    elevation: 4,
  },
  cover2: {
    marginHorizontal: '9%',
    marginVertical: '9%',
    backgroundColor: 'white',

    borderRadius: 8,
    height: '40%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.8,
    shadowRadius: 4.65,
    elevation: 4,
  },
  kotakhadir: {
    height: 50,
    width: '30%',
    borderWidth: 1,
    borderColor: '#00A9B8',
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    borderRadius: 5,
  },
  kotakizin: {
    width: '30%',
    height: 50,
    borderWidth: 1,
    borderColor: '#FFBB0C',
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    borderRadius: 5,
  },
  kotaksakit: {
    width: '30%',
    height: 50,
    borderWidth: 1,
    borderColor: '#FF460C',
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    borderRadius: 5,
  },
  kotaktidak: {
    marginTop: 10,
    width: '50%',
    height: 50,
    borderWidth: 1,
    borderColor: '#bdbdbd',
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    borderRadius: 5,
  },
  kotaktidak1: {
    marginTop: 10,
    width: '90%',
    height: 50,
    borderWidth: 1,
    borderColor: '#bdbdbd',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignContent: 'center',
    alignSelf: 'center',
    borderRadius: 5,
    flexDirection: 'row',
  },
  kotakket: {
    height: 50,
    width: '90%',
    borderWidth: 1,
    borderColor: '#bdbdbd',
  },
  BSimpan2: {
    height: 70,
    width: windowWidth,
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
    elevation: 50,
  },
  BSimpan: {
    backgroundColor: '#00A9B8',
    borderRadius: 10,
    marginHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
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
export default connect(mapStateToProps, mapDispatchToProps)(absenanak);

// import { RefreshControl, Modal, Video, ToastAndroid, Alert, ScrollView, Text, View, StyleSheet, TextInput, TouchableOpacity, Image, FlatList, BackHandler, Dimensions, } from 'react-native'
// import { Picker } from '@react-native-picker/picker';
// import React, { Component } from 'react'
// import { search, arrow } from '../../assets/images'
// import * as ImagePicker from 'react-native-image-picker';
// import { SafeAreaView } from 'react-native-safe-area-context'
// import CheckBox from '@react-native-community/checkbox';
// import { Collapse, CollapseHeader, CollapseBody, AccordionList } from 'accordion-collapse-react-native';
// import { connect } from 'react-redux';

// const width = Dimensions.get('window').width;
// const openCamera = () => {
//   const [imageCamera, setImageCamera] = useState(null)
//   const option = {
//     mediaType: 'photo',
//     quality: 1
//   }
// }

// export class Kegiatan2 extends Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//       count: 1,
//       Camera: '',
//       nama: '',
//       text: '',
//       email: '',
//       alamat: '',
//       dosa: [],
//       selectedValue: '',
//       show: 0,
//       index: 0,
//       Kegiatan: [],
//       keg: '',
//       filelist: [],
//       resourcePath: {},
//       taimage: {
//         0: {
//           image: {
//             name: '',
//             type: '',
//             uri: 'https://static.thenounproject.com/png/187803-200.png'
//           },
//         }
//       },
//       images: [],
//       foto: [],
//       del: [],
//       materi: [],
//       anak: [],
//       ab: '',
//       list: '',
//       visible: false,
//       setVisible: false,
//       isVisible: false,
//       selected: 0,
//       selectedIndex: 0,
//       totol: null,
//       tot: 0,
//       isChecked: false,
//       check: false,
//       search: [],
//       p: '',
//       filterList: '',
//       toggle: true,
//       selected: null,
//       mat: '',
//       pel: '',
//       tur: '',
//       Refreshing: true,
//       buka: false,
//       imgsee: '',
//       ife: [],
//       pilih: 1,
//       kel: '',
//       level: '',
//       lv: '',
//       myd: '',
//       kelompok: [],
//       level: [],
//     }
//   }
//   getIndex = (selectedIndex) => {
//     this.setState({ selectedIndex: selectedIndex })
//   }

//   displayModal(show) {
//     this.setState({ isVisible: show })
//   }
//   displayModal1(show) {
//     this.setState({ buka: show })
//   }
//   takePic(index) {
//     {
//       ImagePicker.launchCamera(
//         {
//           noData: true,
//           saveToPhotos: true,
//           title: 'Select Photo',
//           maxWidth: 300,
//           maxHeight: 400,
//           compressImageQuality: 0.5,
//           storageOptions: {
//             skipBackup: false,
//             path: 'images',
//           },
//         },
//         (response) => {
//           console.log('Response = ', response);

//           if (response.didCancel) {
//             console.log('User cancelled image picker');
//           } else if (response.error) {
//             console.log('ImagePicker Error: ', response.error);
//           } else {
//             const source = {
//               image: {
//                 uri: response.assets[0].uri,
//                 name: response.assets[0].fileName,
//                 type: response.assets[0].type,
//               }
//               //   id: 0,
//             };
//             console.log('ini gambar = ', source);
//             this.setState(prevState => {
//               prevState.taimage[index] = source
//               //   prevState.tgl_lahir[index] != this.props.route.params.tgl_lahir[index] ? this.setState({tglmbuh : true}) : this.setState({tglmbuh : false});
//               return {
//                 taimage: prevState.taimage
//               }
//             }, () => console.log(this.state.taimage));
//             this.setState({
//               totol: index,
//               tot: index,
//             });
//             console.log('ini gambar = ', this.state.taimage);
//           }
//         },
//       );
//     }
//   }

//   // handleBackButton = () => {
//   //   if (this.props.navigation.isFocused()) {
//   //     Alert.alert(
//   //       'Keluar',
//   //       'Anda yakin akan keluar ?', [{
//   //         text: 'TIDAK',
//   //         onPress: () => ToastAndroid.show("Batal Keluar", ToastAndroid.SHORT)
//   //       }, {
//   //         text: 'YA',
//   //         onPress: () => BackHandler.exitApp()
//   //       },], {
//   //       cancelable: true
//   //     }
//   //     )
//   //     return true
//   //   } else {
//   //     return this.state.canBeClosed = false
//   //   }
//   // };

//   componentDidMount() {
//     // BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
//     // this.getProfile();
//     // this.tokenCheck();
//     this.GetAnakAPi();
//     this.GetKelompokAPi();
//     this.GetDataAPi();
//     this.getmateriAPi();
//     this.GetlevelAPi();
//     console.log(this.props);
//   }

//   componentWillUnmount() {
//     // this.mounted = false;
//     // BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
//   }

//   onRefresh() {
//     this.tokenCheck();
//   }
//   GetAnakAPi() {
//     fetch('https://kilauindonesia.org/datakilau/api/testo').then(res => {
//       if (res.status === 200)
//         return res.json()
//     }).then(resdata => {
//       console.log(resdata.data)
//       this.setState({
//         anak: resdata.data,
//         Refreshing: false,
//       })
//     })
//   }
//   GetDataAPi() {
//     fetch('https://berbagipendidikan.org/sim/api/Kegiatan/getkegiatan').then(res => {
//       if (res.status === 200)
//         return res.json()
//     }).then(resdata => {
//       console.log(resdata.DATA)
//       this.setState({
//         Kegiatan: resdata.DATA

//       })
//     })
//   }
//   GetlevelAPi() {
//     fetch('https://kilauindonesia.org/datakilau/api/level').then(res => {
//       if (res.status === 200)
//         return res.json()
//     }).then(resdata => {
//       console.log(resdata.data)
//       this.setState({
//         level: resdata.data

//       })
//     })
//   }
//   GetKelompokAPi() {
//     fetch('https://kilauindonesia.org/datakilau/api/kelompok').then(res => {
//       if (res.status === 200)
//         return res.json()
//     }).then(resdata => {
//       console.log(resdata.data)
//       this.setState({
//         kelompok: resdata.data

//       })
//     })
//   }
//   getmateriAPi() {
//     fetch('https://kilauindonesia.org/datakilau/api/materi').then(res => {
//       if (res.status === 200)
//         return res.json()
//     }).then(resdata => {
//       console.log(resdata.data)
//       this.setState({
//         materi: resdata.data,
//         Refreshing: false,
//       })
//     })
//   }

//   Update() {
//     this.Kegiatan();
//   }

//   cleanupImages() {
//     let taimage =
//       this.state.taimage ||
//       (this.state.taimage && this.state.taimage.length
//         ? this.state.taimage[0]
//         : null);
//     console.log('will cleanup image', taimage);

//     ImagePicker.cleanSingle(taimage ? taimage.uri : null)
//       .then(() => {
//         console.log(`removed tmp taimage ${taimage.uri} from tmp directory`);
//         this.setState({
//           taimage: [],
//         });
//       })
//       .catch((e) => {
//         alert(e);
//       });
//   }

//   cleansingleImage(index) {
//     let helperArray = this.state.taimag;
//     helperArray.splice(index, 1);
//     this.setState({ taimag: helperArray });
//   }
//   scaledHeight(oldW, oldH, newW) {
//     return (oldH / oldW) * newW;
//   }

//   checklis = (index) => {
//     anak[this.state.index].check = !anak[this.state.index].check
//     this.setState({});
//   }

//   onPressAction = () => {
//     this.setState((mat) => {
//       const selected = new Map(state.selected);
//       this.state.selected.has(key) ? selected.delete() : selected.set(key, !selecteditem.get(key));
//       return { selected };
//     });
//   }
//   selectionHandler = (nama_materi) => {
//     const { materi } = this.state
//     materi.forEach((elem) => {
//       elem.toggle = false
//       if (elem.nama_materi === nama_materi) {
//         elem.toggle = true
//       }
//     })
//     this.setState({ nama_materi })
//   }
//   // ini fungsi untuk checkbox tetapi masih belum berfungsi
//   //  isChecked = (itemId) => {
//   //   const isThere = this.state.ids.includes(itemId);
//   //   return isThere;
//   // };

//   // toggleChecked = (itemId) => {
//   //   const ids = [...this.state.ids, itemId];

//   //   if (this.isChecked(itemId)) {
//   //     this.setState({
//   //       ...this.state,
//   //       ids: this.state.ids.filter((id) => id !== itemId),
//   //     });
//   //   } else {
//   //     this.setState({
//   //       ...this.state,
//   //       ids,
//   //     });
//   //   }
//   // };
//   handleRefresh = () => {
//     this.setState({
//       page: 1,
//       Refreshing: true,
//       seed: this.state.seed + 1,
//     }, () => {
//       this.getmateriAPi();
//     })
//   };
//   onRefresh() {
//     this.anak();
//     this.setState({ Refreshing: false });
//   }

//   // filterList(textToSearch) {
//   //   this.setState({
//   //     anak: this.state.anak.filter(i =>i.nama.toLowerCase().includes(textToSearch.toLowerCase()),), });
//   // }
//   filterList(textToSearch) {
//     this.setState({
//       anak: this.state.anak.filter(i => i.nama.toLowerCase().includes(textToSearch)),
//     });
//     // | i.jabatan.toLowerCase().includes(textToSearch)
//   }
//   render() {

//     const fillv =
//       this.state.level.filter((item, index) => {
//         return this.state.level.findIndex(i => i.nama_level_binaan === item.nama_level_binaan) === index;
//       })

//     const filkom =
//       this.state.level.filter((item, index) => {
//         return this.state.level.findIndex(i => i.nama_level_binaan === this.state.lv && i.nama_kelompok === item.nama_kelompok) === index;
//       })
//     const filmat =
//       this.state.level.filter((item, index) => {
//         return this.state.level.findIndex(i => i.nama_level_binaan === this.state.lv && i.nama_kelompok === this.state.kel && i.materi === item.nama_materi) === index;
//       })

//     const inputbutton = [];
//     // for (let i = 0; i < this.state.count; i++) {
//     //   <><View key={i}>
//     //     <Text>{i + 1}.</Text>
//     //     <Picker style={style.Textinputcss} mode="dropdown"
//     //       selectedValue={this.state.keg}
//     //       value={this.state.ife[i]}
//     //       onValueChange={(itemValue) => {
//     //         this.setState({
//     //           keg: itemValue
//     //         })
//     //       }}>
//     //       <Picker.Item style={{ fontSize: 12 }} label={'Pilih Unit Kerja'} value={'0'} key={'0'} />
//     //       {
//     //         this.state.Kegiatan.map((keg) =>
//     //           <Picker.Item style={{ height: '100%', width: '100%', fontSize: 12, }} label={keg.nama_kegiatan.toString()} value={keg.nama_kegiatan.toString()} key={keg.id_kegiatan.toString()} />
//     //         )}
//     //     </Picker>
//     //   </View></>
//     // }
//     // const c = this.state.materi.filter((p) => p.id_level_anak_binaan === 1);
//     const renderItem = ({ item, index }) => (
//       <item id={item.id_level_anak_binaan}
//         id_materi={item.id_materi}
//         pelajaran={item.mata_pelajaran}
//         nama={item.nama_materi}
//         gambar={item.gambar_donatur} />

//     );

//     var taimag = [];
//     for (let i = 0; i <= this.state.tot; i++) {
//       taimag.push(
//         <Image
//           style={{ width: 200, height: 200, resizeMode: 'contain' }}
//           source={this.state.taimage[i].image}
//         />
//       )
//     }
//     return (
//       <ScrollView>
//         {this.props.user.presensi === 'karyawan' ? //Pengelola ini tampilan untuk pengelola//
//           <ScrollView contentContainer style={style.contentContainer} showsVerticalScrollIndicator={true}>
//             <SafeAreaView>
//               <View style={{ backgroundColor: '#0EBEDF' }}>
//                 <Text style={style.title}>Tambah Kegiatan Anak Binaan  </Text>
//               </View>
//               <>
//                 {inputbutton}
//                 <View>
//                   <Text style={style.Label1}>Jenis Kegiatan</Text>
//                   <Picker style={style.Textinputcss}
//                     selectedValue={this.state.keg}
//                     onValueChange={(itemValue) => this.setState({ keg: itemValue, show: 1 })}
//                   >
//                     <Picker.Item label="Pilih Kegiatan" value="" />
//                     <Picker.Item label="Agama" value="Agama" />
//                     <Picker.Item label="Qur'an(Non Shelter Tahfidz)" value="Qur'an(Non Shelter Tahfidz)" />
//                     <Picker.Item label="Bimbel" value="Bimbel" />
//                     <Picker.Item label="Lain-lain" value="Lain-lain" />
//                   </Picker>
//                 </View>

//                 {this.state.show === 1 && this.state.keg === 'Agama' ?
//                   <View>
//                     <Text style={style.Label2}>Nama Aktifitas</Text>
//                     <TextInput
//                       style={style.kotak2}
//                       onChangeText={text => this.setState({ text })}
//                       value={this.state.text}
//                       placeholder="Nama Aktivitas"
//                       placeholderTextColor='#7e7e7e'
//                     />
//                   </View>
//                   :
//                   this.state.show === 1 && this.state.keg === "Qur'an(Non Shelter Tahfidz" ?
//                     <View>
//                       <Text style={style.Label2}>Nama Aktifitas</Text>
//                       <TextInput
//                         style={style.kotak2}
//                         onChangeText={text => this.setState({ text })}
//                         value={this.state.text}
//                         placeholder="Nama Aktivitas"
//                         placeholderTextColor='#7e7e7e'
//                       />
//                     </View>
//                     :
//                     this.state.show === 1 && this.state.keg === 'Lain-lain' ?
//                       <View>
//                         <Text style={style.Label1}>Nama Aktifitas</Text>
//                         <TextInput
//                           style={style.kotak2}
//                           onChangeText={text => this.setState({ text })}
//                           value={this.state.text}
//                           placeholder="Nama Aktivitas"
//                           placeholderTextColor='#7e7e7e'
//                         />
//                       </View>
//                       :
//                       this.state.show === 1 && this.state.keg === 'Bimbel' ?
//                         <View>
//                           <Text style={style.Label1}>Level Anak Binaan</Text>
//                           <Picker style={style.Textinputcss} mode="dropdown"
//                             selectedValue={this.state.lv}
//                             onValueChange={(itemValue) => {
//                               this.setState({
//                                 lv: itemValue,
//                                 kel:'',
//                                 myd:'',
//                               })
//                             }}>
//                             <Picker.Item style={{ fontSize: 12 }} label={'Pilih'} value={''} key={'0'} />
//                             {
//                               fillv.map((lv, index) =>
//                                 <Picker.Item style={{ height: '100%', width: '100%', fontSize: 12, }} label={lv.nama_level_binaan.toString()} value={lv.nama_level_binaan.toString()} key={index}/>
//                               )}
//                           </Picker>

//                           <Text style={style.Label1}>Kelompok</Text>
//                           <Picker style={style.Textinputcss} mode="dropdown"
//                             selectedValue={this.state.kel}
//                             onValueChange={(itemValue) => {
//                               this.setState({
//                                 kel: itemValue,
//                                 myd:'',
//                               })
//                             }}>
//                             <Picker.Item style={{ fontSize: 12 }} label={'Pilih'} value={''} key={'0'} />
//                             {
//                               filkom.map((kel, index) =>
//                                 <Picker.Item style={{ height: '100%', width: '100%', fontSize: 12, }} label={kel.nama_kelompok.toString()} value={kel.nama_kelompok.toString()} key={index} />
//                               )}
//                           </Picker>

//                           <Text style={style.Label1}>Materi yang Disampaikan</Text>
//                           <Picker style={style.Textinputcss} mode="dropdown"
//                             selectedValue={this.state.myd}
//                             onValueChange={(itemValue) => {
//                               this.setState({
//                                 myd: itemValue
//                               })
//                             }}>
//                             <Picker.Item style={{ fontSize: 12 }} label={'Pilih'} value={''} key={'0'} />
//                             {
//                               filmat.map((myd, index) =>
//                                 <Picker.Item style={{ height: '100%', width: '100%', fontSize: 12, }} label={myd.nama_materi.toString()} value={myd.nama_materi.toString()} key={index} />
//                               )}
//                           </Picker>
//                         </View>

//                         :
//                         <></>}

//                 <View style={style.container}>
//                   <ScrollView horizontal={true}>
//                     <>
//                       {taimag}
//                       {/* {this.state.image taikon ? this.renderImage(this.state.image) : null} */}
//                       {/* {inputfoto} */}
//                       {/* {this.state.images ? this.state.images.map((i) => (
//                 <View key={i.uri}>{this.renderImage(i)}</View>)) : null} */}
//                     </>
//                   </ScrollView>

//                 </View>
//                 <View>
//                   <TouchableOpacity
//                     style={style.item}
//                     onPress={() => this.takePic(this.state.totol === null ? 0 : this.state.totol + 1)}>
//                     <Text style={style.text}>Pilih Foto</Text>
//                   </TouchableOpacity>
//                   <TouchableOpacity
//                     onPress={this.cleanupImages.bind(this)}
//                     style={style.item}
//                   >
//                     <Text style={style.text}>Hapus Semua Gambar</Text>
//                   </TouchableOpacity>
//                   <TouchableOpacity
//                     style={style.item}
//                     onPress={() => {
//                       this.displayModal(true);
//                     }}>
//                     <Text style={style.text}>{this.state.tur != '' ? this.state.tur : 'Absen Tutor'}</Text>
//                   </TouchableOpacity>

//                   {/* <TouchableOpacity
//               style={style.item}
//               onPress={() => {
//                 this.displayModal1(true);
//               }}>
//               <Text style={style.text}>{this.state.ab != '' ? this.state.ab : 'Pilih Anak Binaan'}</Text>
//             </TouchableOpacity> */}
//                 </View>

//                 <Modal
//                   animationType={"slide"}
//                   transparent={true}
//                   visible={this.state.isVisible}
//                   style={{
//                     alignItems: 'center',
//                     justifyContent: 'center',
//                   }}>
//                   <View style={{ marginLeft: 40, marginTop: 60, height: '70%', width: '80%', justifyContent: 'center', alignItems: 'center', alignContent: 'center', backgroundColor: '#f2f2f2', borderRadius: 5 }}>
//                     <View style={{
//                       flexDirection: 'row',
//                       justifyContent: 'center',
//                       alignItems: 'center',
//                       backgroundColor: '#fff',
//                       borderWidth: 0.5,
//                       borderColor: '#000',
//                       height: 40,
//                       borderRadius: 5,
//                       margin: 10,
//                     }}>

//                       <TextInput
//                         placeholder='Cari Tutor' onChangeText={text => { this.filterList(text.toLowerCase()) }}
//                         style={style.searchBar}>
//                         {/* <Image source={search} style={style.ImageStyle}></Image> */}
//                       </TextInput>

//                     </View>

//                     <FlatList
//                       // extraData={this.state.selectedId}
//                       // keyExtractor={(materi, index) => String(index)}
//                       refreshControl={
//                         <RefreshControl
//                           refreshing={this.state.Refreshing}
//                           onRefresh={() => this.onRefresh()}
//                         />
//                       }
//                       data={this.state.anak}
//                       renderItem={({ item }) => (
//                         <TouchableOpacity onPress={() => this.setState({ tur: item.nama, mat: item.nama_materi, isVisible: false })}>
//                           <View style={style.item1}>
//                             <View style={{ flexDirection: 'row' }}>
//                               <Image source={{ uri: 'https://www.kilauindonesia.org/datakilau/gambarDonatur/' + item.gambar_donatur }} style={{ height: 50, width: '20%' }} />
//                               <View style={style.Label}>
//                                 <Text>{item.nama}</Text>
//                                 <Text>{item.email}</Text>
//                                 {/* <Text>{item.alamat}</Text> */}
//                               </View>
//                             </View>
//                           </View>
//                         </TouchableOpacity>
//                       )}>
//                     </FlatList>

//                     <Text
//                       style={style.item1}
//                       onPress={() => {
//                         this.displayModal(!this.state.isVisible);
//                       }}>Kembali</Text>
//                   </View>
//                 </Modal>

//                 <Collapse>
//                   <CollapseHeader>
//                     <View style={style.item}>
//                       <Text style={style.detail}>Pilih Anak Binaan</Text>
//                       <Image source={arrow} style={{
//                         padding: 10,
//                         margin: 5,
//                         height: 20,
//                         width: 20,
//                         position: 'absolute',
//                         resizeMode: 'stretch',
//                         alignItems: 'center',
//                         right: 15,
//                         top: 5,
//                       }}></Image>
//                     </View>
//                   </CollapseHeader>
//                   <CollapseBody>
//                     <View style={style.detail}>
//                       <FlatList
//                         // extraData={this.state.selectedId}
//                         // keyExtractor={(materi, index) => String(index)}
//                         //   refreshControl={
//                         //     <RefreshControl
//                         //         refreshing={this.state.Refreshing}
//                         //         onRefresh={() => this.onRefresh()}
//                         //     />
//                         // }
//                         data={this.state.anak}
//                         renderItem={({ item }) => (
//                           <View style={style.item1}>
//                             <View style={{ flexDirection: 'row' }}>
//                               {/* <Image source={{ uri: 'https://www.kilauindonesia.org/datakilau/gambarDonatur/' + item.gambar_donatur }} style={{ height: 50, width: '20%' }} /> */}
//                               <View style={style.Label}>
//                                 <Text>{item.nama}</Text>
//                                 <Text>{item.email}</Text>
//                                 {/* <Text>{item.alamat}</Text> */}
//                               </View>

//                             </View>
//                             <View style={style.checkboxbtn}>
//                               <Text>Kehadiran</Text>
//                               <CheckBox
//                                 disabled={false}
//                                 value={this.state.check}
//                                 onPress={() => this.setState({ anak: !this.state.anak })}
//                                 onValueChange={(newValue) => this.setState({ check: newValue }, () => {
//                                   console.log(this.state.check);
//                                 })}
//                               ></CheckBox>
//                             </View>
//                           </View>
//                         )}>
//                       </FlatList>
//                     </View>
//                   </CollapseBody>
//                 </Collapse>
//               </>
//             </SafeAreaView>
//           </ScrollView >
//           :
//           <View />
//         }

//       </ScrollView>

//     )

//   }
// }
// {/* <TouchableOpacity
//           onPress={this.cleanupSingleImage.bind(this)}
//           style={style.button}
//         >
//           <Text style={style.text}>Cleanup Single Image</Text>
//         </TouchableOpacity>

//            <View style={style.container1}>
//                         <TouchableOpacity
//                             onPress={() => this.pickSingleWithCamera(true)}
//                             style={style.tmbl}
//                              >
//                           <Text style={style.text}>
//                             Pilih Masukan Foto
//                           </Text>
//                             </TouchableOpacity>

//                             <TouchableOpacity
//                             onPress={this.pickMultiple.bind(this)}
//                             style={style.tmbl}
//                             >
//                             <Text style={style.text}>Pilih Foto</Text>
//                             </TouchableOpacity>

//                             <TouchableOpacity
//                           onPress={this.deleteRule.bind(this)}
//                           style={style.tmbl}
//                         >
//                           <Text style={style.text}>Hapus Semua Gambar</Text>
//                         </TouchableOpacity>
//                         <TouchableOpacity
//                           onPress={this.cleanupSingleImage()}
//                           style={style.tmbl}
//                         >
//                           <Text style={style.text}>Hapus Gambar</Text>
//                         </TouchableOpacity>

//                           <View style={style.container2}>
//                           <TouchableOpacity onPress={() => console.log('Berhasil di simpan')} style={style.tmbl}>
//                           <Text style={style.text}>Simpan</Text>
//                           </TouchableOpacity>
//                           </View>
//                         </View> */}

// const mapStateToProps = (state) => {
//   return {
//     user: state,
//   };
// };

// const mapDispatchToProps = (dispatch) => {
//   return {
//     changeUser: (data) => dispatch({ type: 'CHANGE/USER', payload: data }),
//   };
// };
// export default connect(mapStateToProps, mapDispatchToProps)(Kegiatan2);

// const style = StyleSheet.create({
//   contentContainer: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   checkboxbtn: {
//     flex: 1,
//     flexDirection: 'column',
//     alignContent: 'flex-end',
//     alignItems: 'flex-end',
//     justifyContent: 'flex-end',
//   },
//   closeText: {
//     fontSize: 24,
//     color: '#00479e',
//     textAlign: 'center',
//   },
//   containerLaporanPesan: {
//     paddingTop: 5,
//     marginHorizontal: 10,
//     backgroundColor: 'white',
//     // flexDirection: 'row',
//     borderRadius: 20,
//     height: 280,
//     shadowColor: "#333",
//     shadowOffset: {
//       width: 1,
//       height: 1,
//     },
//     shadowOpacity: 0.3,
//     shadowRadius: 2,
//     elevation: 3,
//     alignItems: 'center'
//   },
//   containerSafe: {
//     flex: 1,
//     alignContent: 'center',
//     justifyContent: 'center',
//     flexDirection: 'column',
//   },
//   containermodal: {
//     flex: 0,
//     // shadowColor: "#333",
//     // shadowOffset: {
//     //   width: 1,
//     //   height: 1,
//     // },
//     // shadowOpacity: 0.3,
//     // shadowRadius: 2,
//     // borderColor: '#7e7e7e',
//     // elevation: 3,
//     marginTop: 200,
//     marginBottom: 400,
//   },
//   ImageStyle: {
//     padding: 10,
//     margin: 5,
//     height: 20,
//     width: 20,
//     resizeMode: 'stretch',
//     alignItems: 'center',
//   },
//   ImageStyle1: {
//     padding: 10,
//     height: 20,
//     width: 20,
//     resizeMode: 'stretch',
//     alignItems: 'center',
//   },
//   dropdown: {
//     position: 'absolute',
//     backgroundColor: '#fff',
//     width: '100%',
//     shadowColor: '#000000',
//     shadowRadius: 4,
//     shadowOffset: { height: 4, width: 0 },
//     shadowOpacity: 0.5,
//   },
//   item: {
//     flex: 1,
//     fontSize: 16,
//     flexDirection: 'row',
//     backgroundColor: '#fff',
//     padding: 17,
//     marginVertical: 8,
//     marginHorizontal: 16,
//     shadowColor: "#333",
//     shadowOffset: {
//       width: 1,
//       height: 1,
//     },
//     shadowOpacity: 0.3,
//     shadowRadius: 2,
//     borderColor: '#7e7e7e',
//     elevation: 3,
//   },
//   item1: {
//     fontSize: 12,
//     backgroundColor: '#fff',
//     flexDirection: 'row',
//     padding: 20,
//     marginVertical: 8,
//     marginHorizontal: 16,
//     shadowColor: "#333",
//     shadowOffset: {
//       width: 1,
//       height: 1,
//     },
//     shadowOpacity: 0.3,
//     shadowRadius: 2,
//     borderColor: '#7e7e7e',
//     elevation: 3,
//     textAlign: 'center',
//     fontWeight: 'bold',

//   },
//   container: {
//     marginTop: 40,
//     marginLeft: 75,
//     multiline: true,
//     width: 250,
//     height: 250,
//     flex: 1,
//     margin: 20,
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: '#fff',
//     shadowColor: "#333",
//     shadowOffset: {
//       width: 1,
//       height: 1,
//     },
//     shadowOpacity: 0.3,
//     shadowRadius: 2,
//     borderColor: '#7e7e7e',
//     elevation: 3,
//   },
//   container2: {
//     backgroundColor: '#fff',
//   },
//   container1: {
//     padding: 10,
//     backgroundColor: '#fff',
//     flexDirection: 'row'
//   },
//   images: {
//     width: 150,
//     height: 150,
//     borderColor: 'black',
//     borderWidth: 1,
//     marginHorizontal: 3
//   },
//   btn: {
//     backgroundColor: '#0080ff',
//     height: 50,
//     width: width - 60,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   ModalCont: {
//     flex: 1,
//     justifyContent: 'center',
//     // alignItems: 'center',
//     backgroundColor: '#00000099',
//     paddingHorizontal: 10,
//   },
//   buttonText: {
//     textAlign: 'center',
//     fontSize: 15,
//     color: '#000'
//   },
//   logo4: {
//     width: 75,
//     height: 75,
//     marginLeft: 10,
//   },
//   picker: {
//     color: 'F',
//     marginTop: 10,
//     backgroundColor: '#ffffff',
//     flexDirection: 'row',
//     borderRadius: 5,
//     // marginHorizontal: 5,
//     height: 30,
//     width: '100%',
//     shadowColor: "#333",
//     shadowOffset: {
//       width: 1,
//       height: 1,
//     },
//     shadowOpacity: 0.3,
//     shadowRadius: 2,

//     elevation: 3,
//     alignItems: 'center',
//     justifyContent: 'center'
//   },
//   imgSmall: {
//     position: 'absolute', flex: 1, alignItems: 'center', justifyContent: 'center'
//   },
//   title: {
//     marginRight: 20,
//     marginLeft: 20,
//     marginTop: 15,
//     marginBottom: 15,
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: 'white',
//   },
//   kotak2: {
//     color: '#000000',
//     marginTop: 10,
//     marginLeft: 30,
//     marginRight: 10,
//     borderRadius: 2,
//     borderWidth: 0.1,
//     fontSize: 12,
//     height: 52,
//     backgroundColor: '#7e7e7',
//   },
//   tmbl: {
//     justifyContent: 'center', alignItems: 'center', backgroundColor: '#0EBEDF', borderRadius: 10, fontSize: 12, width: 150, height: 60, marginTop: 10, fontWeight: 'bold', marginLeft: 120,
//   },
//   tmbl1: {
//     justifyContent: 'center', alignItems: 'center', backgroundColor: '#0EBEDF', borderRadius: 10, fontSize: 12, width: 150, height: 60, marginTop: 10, fontWeight: 'bold', paddingLeft: 50,
//   },
//   tmbl2: {
//     shadowColor: "#333",
//     shadowOffset: {
//       width: 1,
//       height: 1,
//     },
//     shadowOpacity: 0.3,
//     shadowRadius: 2,
//     elevation: 3,
//     fontSize: 24,
//     textAlign: 'center',
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#0EBEDF',
//     borderRadius: 10,
//     fontSize: 12,
//     width: 150,
//     height: 60,
//     marginTop: 10,
//     marginLeft: 120,
//   },
//   tmbl3: {
//     shadowColor: "#333",
//     shadowOffset: {
//       width: 1,
//       height: 1,
//     },
//     shadowOpacity: 0.3,
//     shadowRadius: 2,
//     elevation: 3,
//     fontSize: 24,
//     textAlign: 'center',
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#0EBEDF',
//     borderRadius: 10,
//     fontSize: 12,
//     width: 150,
//     height: 60,
//     marginTop: 10,
//     marginLeft: 120,
//     paddingTop: 2,
//   },
//   Label: {
//     fontSize: 12,
//     padding: 5,
//     color: '#000000',
//     marginLeft: 5,
//   },
//   Label2: {
//     marginTop: 10,
//     marginLeft: 25,
//     marginBottom: -10,
//     padding: 5,
//     color: '#000',
//     alignItems: 'center',
//     justifyContent: 'center'
//   },
//   Label1: {
//     marginTop: 5,
//     marginLeft: 25,
//     padding: 5,
//     color: '#000',
//     alignItems: 'center',
//     justifyContent: 'center'
//   },
//   image: {
//     height: '50%',
//     width: '50%',
//   },
//   Textinputcss: {
//     color: '#7e7e7e',
//     marginLeft: 30,
//     marginRight: 10,
//     borderRadius: 10,
//     borderWidth: 1,
//     fontSize: 12,
//     height: 52,
//     backgroundColor: '#fff',
//     shadowColor: "#333",
//     shadowOffset: {
//       width: 1,
//       height: 1,
//     },
//     shadowOpacity: 0.3,
//     shadowRadius: 2,
//     borderColor: '#7e7e7e',
//     elevation: 3,
//   },
//   containerBtn: {
//     borderRadius: 10,
//     backgroundColor: '#fff',
//     flex: 1,
//     justifyContent: 'space-between',
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     padding: 40,
//     position: 'absolute',
//     justifyContent: 'center', alignItems: 'center',
//     bottom: 0,
//     left: 0,
//     right: 0,
//   },
//   radioButton: {
//     height: 20,
//     width: 20,
//     backgroundColor: "#F8F8F8",
//     borderRadius: 10,
//     borderWidth: 1,
//     borderColor: "#E6E6E6",
//     alignItems: "center",
//     justifyContent: "center"
//   },
//   radioButtonIcon: {
//     height: 14,
//     width: 14,
//     borderRadius: 7,
//     backgroundColor: "#98CFB6"
//   },
//   searchBar: {
//     fontSize: 12,
//     width: '70%',
//     height: 50,
//     justifyContent: 'center',
//     alignItems: 'center',
//     textAlign: 'center',
//     alignContent: 'center',
//     marginTop: 5,
//   },
// })
