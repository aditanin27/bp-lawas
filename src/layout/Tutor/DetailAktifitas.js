import {
  Text,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  FlatList,
  RefreshControl,
  Modal,
  SafeAreaView,
  Dimensions,
  TextInput,
  ToastAndroid,
} from 'react-native';
import React, { Component } from 'react';
import {
  search,
  arrow,
  plus,
  Background,
  test,
  orang1,
} from '../../assets/images';
import { LocationsH, TingkatH, JenisH } from '../../assets/icons';
import moment from 'moment';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { connect } from 'react-redux';
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
export class DetailAktifitas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: this.props.route.params.item,
      listanak: [],
      jenispenilaian: '',
      namatugas: '',
      nilai: '',
      modalnilai: false,
      detail: '',
    };
  }
  getaktivitastutorAPi() {
    fetch(
      'https://kilauindonesia.org/datakilau/api/detailabsenanak/' +
      this.state.item.id_aktivitas,
    )
      .then(res => {
        if (res.status === 200) return res.json();
      })
      .then(resdata => {
        console.log(resdata.data);
        this.setState({
          listanak: resdata.data,
          refreshing: false,
        });
      });
  }

  // SimpanData() {
  //   AsyncStorage.getItem('token').then((token) => {
  //     let dataToSend = {
  //       id_aktivitas: this.state.item.id_aktivitas,
  //       id_anak: this.state.detail,
  //       nilai: this.state.nilai,
  //       tugas: this.state.namatugas,
  //       materi: this.state.item.materi,
  //       jenis_penilaian: this.state.jenispenilaian,
  //       jenis_kegiatan: this.state.item.jenis_kegiatan,
  //       tanggal: moment(this.state.tanggal).format('YYYY-MM-DD h:mm:ss'),
  //     };
  //     let data = new FormData();

  //     for (let key in dataToSend) {
  //       data.append(key, dataToSend[key]);
  //     }
  //     console.log('kkkk', data);
  //     fetch('https://kilauindonesia.org/datakilau/api/tambahnilai', {
  //       method: 'POST',
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //         Accept: 'application/json',
  //         'Content-Type': 'multipart/form-data'
  //       },
  //       body: data,
  //     })
  //       .then((res) => res.json())
  //       .then(resJson => {
  //         console.log(resJson);
  //         if (resJson.status === 'sukses') {
  //           this.setState({
  //             modalnilai: false,
  //             nilai: '',
  //             tugas: '',
  //             materi: '',
  //             jenispenilaian: '',
  //           });
  //           ToastAndroid.show('Data berhasil ditambah!', ToastAndroid.SHORT);
  //         } else {
  //           ToastAndroid.show('gagal menyimpan', ToastAndroid.SHORT);
  //         }
  //       })
  //       .catch((err) => console.log('dari catch send Data ===', err));
  //   });
  // }


  SimpanData() {
    {
      let simpandata = {
        id_aktivitas: this.state.item.id_aktivitas,
        id_anak: this.state.detail,
        nilai: this.state.nilai,
        tugas: this.state.namatugas,
        materi: this.state.item.materi,
        jenis_penilaian: this.state.jenispenilaian,
        jenis_kegiatan: this.state.item.jenis_kegiatan,
        tanggal: moment(this.state.tanggal).format('YYYY-MM-DD h:mm:ss'),
      };
      let data = new FormData();
      for (let key in simpandata) {
        data.append(key, simpandata[key]);
      }
      fetch(
        'https://kilauindonesia.org/datakilau/api/tambahnilai/' +
        this.state.item.id_aktivitas,
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
          },
          body: data,
        },
      )
        .then(res => res.json())
        .then(resJson => {
          console.log(resJson);
          if (resJson.status === 'sukses') {
            this.setState({
              modalnilai: false,
              nilai: '',
              tugas: '',
              materi: '',
              jenispenilaian: '',
              namatugas: '',
            });
            ToastAndroid.show('Data berhasil ditambah!', ToastAndroid.SHORT);
          } else {
            ToastAndroid.show('gagal menyimpan', ToastAndroid.SHORT);
          }
        })
        .catch(err => console.log('dari catch send Data ===', err));
    }
  }
  componentDidMount() {
    this.getaktivitastutorAPi();
    console.log();
  }
  render() {
    return (
      <ScrollView style={{ backgroundColor: '#fff', height: '100%' }}>
        <View
          style={{
            backgroundColor: '#0EBEDF',
            height: 164,
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
          }}>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 15,
              justifyContent: 'center',
              alignSelf: 'center',
              alignContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: '#fff',
                fontSize: 20,
                textAlign: 'center',
                fontWeight: 'bold',
                marginTop: -5,
              }}>
              Detail Aktifitas
            </Text>
          </View>
        </View>
        <View style={[style.itemflat]}>
          <Image
            source={{
              uri:
                'https://kilauindonesia.org/datakilau/gambarUpload/' +
                this.state.item.foto_1,
            }}
            style={style.img2}></Image>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <View style={{ flexDirection: 'row', marginTop: 10, marginLeft: 10 }}>
              <Image
                source={{
                  uri:
                    'https://kilauindonesia.org/datakilau/gambarUpload/' +
                    this.state.item.foto,
                }}
                style={{
                  justifyContent: 'center',
                  height: 40,
                  width: 40,
                  borderRadius: 45,
                  color: '#000',
                }}
              />

              <View style={{ flexDirection: 'column', marginLeft: 10 }}>
                <Text
                  style={{
                    color: '#000',
                    fontFamily: 'Poppins-Medium',
                    fontSize: 14,
                  }}>
                  {this.state.item.nama_lengkap}
                </Text>
                <View
                  style={{
                    alignContent: 'space-between',
                  }}>
                  <Text>{this.state.item.jenis_kegiatan}</Text>
                  <Text>{this.state.item.tanggal}</Text>
                </View>
              </View>
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

          <View>
            <Text
              style={{
                color: '#5D5C5D',
                fontFamily: 'Poppins-SemiBold',
                fontSize: 16,
                marginTop: 5,
                marginLeft: 10,
                marginBottom: 10,
              }}>
              {this.state.item.materi}
            </Text>
          </View>

          {/* <Text
            style={{
              color: '#5D5C5D',
              fontFamily: 'Poppins-Regular',
              fontSize: 14,
              marginTop: 10,
              marginHorizontal: 10,
              textAlign: 'justify',
            }}>
            Anak-anak belajar untuk menghafal perkalian 1 sampai dengan 5. Ada
            beberapa anak yang dapat menghafal dengan cepat ada juga anak yang
            membutuhkan treatment tertentu dalam menghafal.
          </Text> */}
          <View
            style={{
              // top: '12%',

              flexDirection: 'row',
              justifyContent: 'space-between',
              marginHorizontal: 20,
            }}>
            {/* <Text style={style.labelbaru5}> 10.45</Text> */}
          </View>
        </View>
        <FlatList
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={() => this.onRefresh()}
            />
          }
          data={this.state.listanak}
          renderItem={({ item }) => (
            <View>
              <View style={{}}>
                <TouchableOpacity
                  onPress={() => {
                    item.absen === 'Hadir'
                      ? this.setState({ modalnilai: true, detail: item.id_anak })
                      : alert('Anak ini Tidak Mengikuti aktivitas ini');
                  }}>
                  <View
                    style={{
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
                    }}>
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
                                this.state.item.foto,
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
                            <Text
                              style={{
                                color: '#000',
                                fontFamily: 'Poppins-Medium',
                                fontSize: 14,
                                marginLeft: 10,
                              }}>
                              Kehadiran: {item.absen}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          )}></FlatList>
        <Modal
          animationType={'fade'}
          transparent={true}
          visible={this.state.modalnilai}
          onRequestClose={() => this.setState({ modalnilai: false })}>
          <SafeAreaView style={style.containerSafe}>
            <TouchableOpacity
              activeOpacity={1.0}
              onPress={() => this.setState({ modalnilai: false })}
              style={style.ModalCont}>
              <View
                style={{
                  paddingTop: 5,
                  // marginHorizontal: 10,
                  backgroundColor: '#fff',
                  // flexDirection: 'row',
                  borderRadius: 20,
                  height: '40%',
                  shadowColor: '#333',
                  shadowOffset: {
                    width: 1,
                    height: 1,
                  },
                  shadowOpacity: 0.3,
                  shadowRadius: 2,
                  elevation: 3,
                  alignItems: 'center',
                }}>
                {/* <TouchableOpacity onPress={() => this.props.navigation.navigate('Home', this.setState({ wilayah: false }))} style={{ position: 'absolute', right: 20, top: 20 }}>
                                        <Close />
                                    </TouchableOpacity> */}
                <Text style={style.txtPresensi}>Masukan Nilai</Text>
                <View style={{ marginHorizontal: 10 }}>
                  <View style={{ flexDirection: 'row' }}>
                    <View>
                      <Text
                        style={[
                          style.labelkiri,
                          { fontSize: 14, marginLeft: 10 },
                        ]}>
                        {this.state.item.materi}
                      </Text>
                      <View
                        style={{
                          justifyContent: 'center',
                          alignContent: 'center',
                          alignItems: 'center',
                        }}>
                        <View style={style.kotakpicker}>
                          <Picker
                            style={{ width: windowWidth - 40 }}
                            selectedValue={this.state.jenispenilaian}
                            onValueChange={itemValue =>
                              this.setState({ jenispenilaian: itemValue, show: 1 })
                            }>
                            <Picker.Item
                              style={{ fontSize: 14, fontFamily: 'Poppins-Regular' }}
                              label="Jenis Penilaian"
                              value=""
                            />
                            <Picker.Item
                              style={{ fontSize: 14, fontFamily: 'Poppins-Regular' }}
                              label="PR"
                              value="PR"
                            />
                            <Picker.Item
                              style={{ fontSize: 14, fontFamily: 'Poppins-Regular' }}
                              label="Pemahaman Materi"
                              value="Materi"
                            />
                            <Picker.Item
                              style={{ fontSize: 14, fontFamily: 'Poppins-Regular' }}
                              label="UTS"
                              value="UTS"
                            />
                            <Picker.Item
                              style={{ fontSize: 14, fontFamily: 'Poppins-Regular' }}
                              label="UAS"
                              value="UAS"
                            />
                          </Picker>
                        </View>
                      </View>


                      {this.state.jenispenilaian === 'PR' ?
                        < View style={style.form}>
                          <Text style={style.labelkiri}>Nama Tugas</Text>
                          <TextInput
                            style={style.kotak3}
                            onChangeText={namatugas => this.setState({ namatugas })}
                            value={this.state.namatugas}
                            keyboardType="default"
                            placeholder=""
                            placeholderTextColor="#C0C0C0"
                          />
                        </View> : <View />}

                      <View style={style.form}>
                        <Text style={style.labelkiri}>Nilai</Text>
                        <TextInput
                          style={style.kotak3}
                          onChangeText={nilai => this.setState({ nilai })}
                          value={this.state.nilai}
                          keyboardType="numeric"
                          placeholder=""
                          placeholderTextColor="#C0C0C0"
                        />
                      </View>
                    </View>
                    <View style={{ marginTop: 30, marginLeft: -15 }}></View>
                  </View>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <View style={[style.kotakkecil, { backgroundColor: 'red' }]}>
                    <TouchableOpacity
                      onPress={() => this.setState({ modalbarang: false })}>
                      {/* <KKada style={{ justifyContent: 'center', alignSelf: 'center' }} /> */}
                      <Text
                        style={{
                          color: '#fff',
                          textAlign: 'center',
                          padding: 5,
                          fontWeight: 'bold',
                        }}>
                        Batal
                      </Text>
                    </TouchableOpacity>
                  </View>

                  <View
                    style={[style.kotakkecil, { backgroundColor: '#00A9B8' }]}>
                    <TouchableOpacity
                      onPress={() =>
                        this.setState({
                          modalbarang: false,
                        }, this.SimpanData())
                      }>
                      {/* <KKada style={{ justifyContent: 'center', alignSelf: 'center' }} /> */}
                      <Text
                        style={{
                          color: '#fff',
                          textAlign: 'center',
                          padding: 5,
                          fontWeight: 'bold',
                        }}>
                        Simpan
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          </SafeAreaView>
        </Modal>
      </ScrollView >
    );
  }
}
const style = StyleSheet.create({
  img2: {
    width: '90%',
    height: 200,
    marginTop: 10,
    borderRadius: 10,
    alignSelf: 'center',
  },
  itemflat: {
    flex: 1,
    fontSize: 12,
    backgroundColor: '#fff',
    color: '#000',
    marginVertical: 10,
    alignSelf: 'center',
    shadowColor: '#858585',
    overflow: 'hidden',
    shadowRadius: 15,
    elevation: 6,
    shadowOpacity: '25%',
    borderColor: '#7e7e7e',
    borderRadius: 15,

    width: '90%',
    marginTop: -90,
  },
  kotakkecil: {
    flexDirection: 'column',
    borderColor: '#bdbdbd',
    borderWidth: 1,
    width: '40%',
    height: '40%',
    justifyContent: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    textAlign: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 10,
    marginHorizontal: 10,
  },
  ModalCont: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#00000099',
    paddingHorizontal: 10,
  },
  containerSafe: {
    flex: 1,
    flexDirection: 'column',
  },
  form: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    // width: '100%',
  },
  labelkiri: {
    fontSize: 12,
    fontWeight: 'bold',
    marginVertical: 5,
    marginLeft: 0,
    width: 100,
  },
  kotak3: {
    marginTop: 10,
    color: '#000',
    borderRadius: 10,
    borderWidth: 0.1,
    fontSize: 13,
    height: 40,
    width: windowWidth * 0.4,
    padding: 12,
    backgroundColor: '#fff',
    borderColor: '#DDDDDD',
    borderWidth: 1,
    fontFamily: 'Poppins-Regular',
  },
});

const mapStateToProps = state => {
  return {
    user: state,
    initialState: state,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changeUser: data => dispatch({ type: 'CHANGE/USER', payload: data }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(DetailAktifitas);