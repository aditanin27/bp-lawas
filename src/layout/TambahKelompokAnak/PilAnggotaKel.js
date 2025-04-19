import {
  RefreshControl,
  Dimensions,
  ToastAndroid,
  Alert,
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
  Modal,
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
  JenisH,
  TingkatH,
  LocationsH,
} from '../../assets/icons';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'react-native-image-picker';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import { connect } from 'react-redux';
import SwitchSelector from 'react-native-switch-selector';
import { useState } from 'react';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import ActionButton from 'react-native-action-button';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';


const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;
export class PilAnggotaKel extends Component {
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
      text: null,
      select: [],
      carianak: '',
      filt_anak1: [],
    };
  }
  filterItem = (event) => {
    var text = event.nativeEvent.text;
    this.setState({
      text: text
    });
  }

  handlePicker = (date) => {
    this.setState({ isVisible: false, chosenDate: moment(date).format('DD-MM-YYYY') })
  }

  onPressTitle = () => {
    this.setState({ chosenDate });
  };

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

  GetAnakAPi() {
    fetch('https://kilauindonesia.org/datakilau/api/joindataanak')
      .then(res => {
        if (res.status === 200) return res.json();
      })
      .then(resdata => {
        console.log(resdata.data);
        this.setState({
          Anak: resdata.data,
          filt_anak1: resdata.data,
          refreshing: false,

        });
      });
  }

  searchUser(textToSearch) {
    this.setState({
      Anak: this.state.Anak.filter(i => i.full_name.includes(textToSearch)),
    })
  }
  componentDidMount() {
    this.GetAnakAPi();
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
      filt_anak1: this.state.Anak
        .filter(i => i.full_name.toLowerCase(textToSearch).includes(textToSearch))
    })
  }
  selectanak = (id_anak) => {
    // if (id_anak == index) {
    //     item.isSelected = !item.isSelected;
    //     Alert.alert('Silahkan Pilih Anak yang inign di Cairkan Dananya');
    // } else {
    var select = this.state.select;
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

    console.log(select);
    // this.setState({id_anak, no});

    // }

  }
  onRefresh() {
    this.GetAnakAPi();
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
        {/* vv */}
        {this.props.user.presensi === 'Karyawan' ? ( // ini tampilan untuk Pengelola dan admin cabang//
          <View style={{}}>
            <View style={{ backgroundColor: '#fff', width: width }}>
              <View style={{ flexDirection: 'row', marginTop: 10, marginHorizontal: 20, alignItems: 'center', justifyContent: 'space-between' }}>
                <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('List_anak')}>
                  <Arrowleft />
                </TouchableWithoutFeedback>
                <View style={{ justifyContent: 'center', alignItems: 'center', width: width, padding: 10, marginRight: 100 }}>
                  <Text style={style.title2}>Pilih Anggota Kelompok</Text>
                </View>
                <View>

                </View>
              </View>
              <TextInput
                style={{
                  flexDirection: 'row',
                  backgroundColor: '#fff',
                  paddingHorizontal: 40,
                  height: 38,
                  width: '90%',
                  justifyContent: 'center',
                  alignSelf: 'center',
                  borderRadius: 9,
                  borderColor: '#C0C0C0',
                  borderWidth: 1,
                  marginTop: 10,
                  color: '#000'
                }}
                // onChangeText={text => this.setState({text})}
                onChangeText={(text) => {
                  this.filterList(text.toLowerCase()), this.setState({ carianak: text })
                }}
                value={this.state.text}
                placeholder="Cari"
                placeholderTextColor="#C0C0C0"
                underlineColorAndroid="transparent"
              />
              <IconCari style={style.IconCari} name="your-icon" size={20} />
            </View>

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
                  <View style={{}}>
                    <TouchableOpacity
                      onPress={() => {
                        this.setState({ detak: item, });
                      }}
                      onLongPress={() => this.selectanak(item.id_anak)}>

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
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                  alignSelf: 'center',
                                  height: 50,
                                  width: 50,
                                  borderRadius: 45,
                                  color: '#000',
                                }}
                              />
                              {/* <View style={style.Label1}>
                              <Text> </Text>
                              <Text>{item.email}</Text>
                            </View> */}
                              <View
                                style={{ flexDirection: 'column', justifyContent: 'center', width: '70%' }}>
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
                </View>

              )}></FlatList>

          </View>
        ) : (
          <View />
        )}
        <View style={style.BSimpan2}>
          <TouchableOpacity onPress={() => this.setState({ simpan: true })}>
            <View style={style.BSimpan}>
              <Text style={style.label5}>Simpan</Text>
            </View>
          </TouchableOpacity>
        </View>
        <Modal visible={this.state.simpan}>
          <View style={{ backgroundColor: '#fff', borderRadius: 10, height: '23%', width: '80%', alignSelf: 'center', alignItems: 'center', flexDirection: 'column', justifyContent: 'space-between', padding: 30 }}>
            <Text style={{ color: '#000', fontFamily: 'Poppins-Regular', fontSize: 14, marginBottom: 15 }}>Simpan Data ?</Text>
            <View style={{ alignItems: 'center', flexDirection: 'row', alignContent: 'center' }}>
              <TouchableOpacity onPress={() => this.setState({ simpan: false }) + ToastAndroid.show('Batal Disimpan', ToastAndroid.SHORT)}>
                <View style={{ height: '70%', borderColor: '#00A9B8', borderWidth: 1, width: 100, justifyContent: 'center', alignItems: 'center', alignSelf: 'center', borderRadius: 10 }}>
                  <Text style={{ color: '#00A9B8', fontFamily: 'Poppins-Medium', fontSize: 14 }}>Batal</Text>
                </View>
              </TouchableOpacity>
              <View style={{ width: 20 }} />
              <TouchableOpacity onPress={() => this.props.navigation.navigate('TamKelompokAnak') + ToastAndroid.show('Data Berhasil Disimpan', ToastAndroid.SHORT)}>
                <View style={{ height: '70%', backgroundColor: '#00A9B8', width: 100, justifyContent: 'center', alignItems: 'center', alignSelf: 'center', borderRadius: 10 }}>
                  <Text style={{ color: '#fff', fontFamily: 'Poppins-Medium', fontSize: 14 }}>Simpan</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
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
    marginTop: 10,
    marginBottom: 10,
    marginRight: 40,
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#000',
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
    Textinputcss: {
      color: '#C0C0C0',
      marginTop: 20,
      left: 2,
      marginRight: 4,
      borderRadius: 10,
      borderWidth: 1,
      fontSize: 10,
      height: 40,
      backgroundColor: '#fff',
      borderColor: '#C0C0C0',
      fontFamily: 'Poppins-Regular'
    },
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
    bottom: '10%',
    left: '8%',
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
export default connect(mapStateToProps, mapDispatchToProps)(PilAnggotaKel);