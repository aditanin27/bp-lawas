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
  test
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
  Arrowleft,
  LabelBimbel,
} from '../../assets/icons';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'react-native-image-picker';
import DateTimePicker from 'react-native-modal-datetime-picker';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import { connect } from 'react-redux';
import SwitchSelector from 'react-native-switch-selector';
import { useState } from 'react';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import ActionButton from 'react-native-action-button';


const numColumns = 3;
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
export class AktifitasTutor extends Component {
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
      aktiv: [],
      search: [],
      pel: '',
      materi: [],
      Pel: '',
      filter: [],
      refreshing: true,
      ST: '',
      detail: this.props.route.params.detail,
    };
  }

  getmateriAPi() {
    fetch('https://berbagipendidikan.org/sim/api/materi/getmateri')
      .then(res => {
        if (res.status === 200) return res.json();
      })
      .then(resdata => {
        console.log(resdata.DATA);
        this.setState({
          materi: resdata.DATA,
          refreshing: false,
        });
      });
  }

  GetAktivitasAPi() {
    fetch('https://kilauindonesia.org/datakilau/api/aktivitastutor/' + this.state.detail.id_tutor)
      .then(res => {
        if (res.status === 200) return res.json();
      })
      .then(resdata => {
        console.log(resdata.data);
        this.setState({
          aktiv: resdata.data,
          filter: resdata.data,
          refreshing: false,
        });
      });
  }
  componentDidMount() {
    this.GetAktivitasAPi();
    this.getmateriAPi();
    // BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    // Firebase.initializeApp(this);
    // this.requestCameraPermission();
    console.log(this.props);
  }
  componentWillUnmount() {
    this.mounted = false;
    // BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }
  filterList(textToSearch) {
    this.setState({
      Tutor: this.state.Tutor.filter(i =>
        i.nama.toLowerCase().includes(textToSearch),
      ),
    });
  }
  onRefresh() {
    this.GetTutorAPi();
    this.setState({ refreshing: false });
  }

  detail = () => { };
  render() {

    function Link(props) {
      return (
        <Text
          {...props}
          accessibilityRole="link"
          style={StyleSheet.compose(styles.link, props.style)}
        />
      );
    }

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
      <SafeAreaView style={{ backgroundColor: '#fff' }}>
        {this.props.user.presensi === 'karyawan' ? //ini tampilan untuk Pengelola dan admin 
          <SafeAreaView style={{ backgroundColor: '#fff' }}>

            <View style={{ backgroundColor: '#fff', flexDirection: 'row', height: 70, width: '100%', paddingHorizontal: '7%', alignItems: 'center', justifyContent: 'space-between' }}>
              <Arrowleft />
              <Text style={{ color: '#000', fontFamily: 'Poppins-SemiBold', fontSize: 16, right: width / 4 }}>Aktivitas Tutor Peroarangan</Text>
            </View>
            {/* <View style={{flexDirection:'row'}}> */}
            <FlatList
              refreshControl={
                <RefreshControl
                  refreshing={this.state.refreshing}
                  onRefresh={() => this.onRefresh()}
                />
              }
              data={this.state.aktiv}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={style.itemflat}
                >
                  <View>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}>
                      <View style={{ flexDirection: 'row' }}>
                        <Image
                          source={test}
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
                        <Text style={style.labelbaru5}>{item.Tahun}</Text>
                      </View>
                    </View>
                    <View
                      style={{
                        borderWidth: 0.3,
                        borderColor: '#c0c0c0',
                        width: '100%',
                        marginTop: 10,
                      }}
                    />
                    <Image source={addfoto} style={style.img2}></Image>
                    <View style={style.form}>
                      <Text style={style.labelkiri}>Kegiatan</Text>
                      <Text style={style.labelkanan}>{item.jenis_kegiatan}</Text>
                    </View>
                    <View style={style.form}>
                      <Text style={[style.labelkiri, { width: 150 }]}>Nama Kelompok</Text>
                      <Text style={[style.labelkanan, { marginLeft: -32 }]}>{item.nama_kelompok}</Text>
                    </View>
                    <View style={[style.form, { width: 300 }]}>
                      <Text style={style.labelkiri}>Materi</Text>
                      <Text style={[style.labelkanan, { width: 200 }]}>{item.materi}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              )}></FlatList>

            {/* <TouchableOpacity  onPress={()=> this.props.navigation.navigate('')}style={{ top: '75%', position: 'absolute', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ color: '#fff', paddingHorizontal: '10%', paddingVertical: '4%', fontFamily: 'Poppins-Medium', borderRadius: 10, backgroundColor: '#0EBEDF', fontSize: 14, }}>+ Tambah Kegiatan</Text>
            </TouchableOpacity> */}

            {/* {this.props.user.presensi === 'karyawan' ? ( // ini tampilan untuk Pengelola//
                <View style={style.refresh}>
                  <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('TTutor')}>
                    <View style={{backgroundColor: '#0EBEDF', borderRadius: 20}}>
                      <Image source={plus} style={{height: 40, width: 40}}></Image>
                    </View>
                  </TouchableOpacity>
                </View>
              ) : (
                <View />
              )} */}

          </SafeAreaView>
          :
          <View />}
        {this.props.user.presensi === 'admin' ? //ini tampilan untuk tutor
          <SafeAreaView style={{ backgroundColor: '#fff' }}>

            <View style={{ backgroundColor: '#fff', flexDirection: 'row', height: 70, width: '100%', paddingHorizontal: '7%', alignItems: 'center', justifyContent: 'space-between' }}>
              <Arrowleft />
              <Text style={{ color: '#000', fontFamily: 'Poppins-SemiBold', fontSize: 16, right: width / 4 }}>Aktivitas Saya</Text>
            </View>
            {/* <View style={{flexDirection:'row'}}> */}
            <FlatList
              refreshControl={
                <RefreshControl
                  refreshing={this.state.refreshing}
                  onRefresh={() => this.onRefresh()}
                />
              }
              data={this.state.Tutor}
              renderItem={({ item }) => (
                <View>
                  <View style={{}}>
                    <TouchableOpacity
                      style={style.itemflat}
                    >
                      <View>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                          }}>
                          <View style={{ flexDirection: 'row' }}>
                            <Image
                              source={test}
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
                        <LabelBimbel style={{ marginTop: '5%' }} />
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
                          {item.materi}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              )}></FlatList>

            <TouchableOpacity onPress={() => this.props.navigation.navigate('absenanak')} style={{ top: '75%', position: 'absolute', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ color: '#fff', paddingHorizontal: '10%', paddingVertical: '4%', fontFamily: 'Poppins-Medium', borderRadius: 10, backgroundColor: '#0EBEDF', fontSize: 14, }}>+ Tambah Kegiatan</Text>
            </TouchableOpacity>

            {/* {this.props.user.presensi === 'karyawan' ? ( // ini tampilan untuk Pengelola//
                <View style={style.refresh}>
                  <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('TTutor')}>
                    <View style={{backgroundColor: '#0EBEDF', borderRadius: 20}}>
                      <Image source={plus} style={{height: 40, width: 40}}></Image>
                    </View>
                  </TouchableOpacity>
                </View>
              ) : (
                <View />
              )} */}

          </SafeAreaView>
          :
          <View />}
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
    fontSize: 12,
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#fff',
    height: 370, width: '90%',
    color: '#000',
    marginVertical: 20,
    justifyContent: 'center',
    alignSelf: 'center',
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
  form: {
    flexDirection: 'row',
    width: '100%'
  },
  labelkiri: {
    fontWeight: 'bold',
    marginVertical: 5,
    marginLeft: 0,
    width: 60,
  },
  labelkanan: {
    marginHorizontal: 5,
    marginVertical: 5,
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
export default connect(mapStateToProps, mapDispatchToProps)(AktifitasTutor);