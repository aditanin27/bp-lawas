import {
  Image,
  ImageBackground,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Modal,
  SafeAreaView,
  TextInput,
  Box,
  TextArea,
  ScrollView,
  Alert,
  BackHandler,
  ToastAndroid,
  Linking,
  TurboModuleRegistry,
  Dimensions,
  FlatList,
  RefreshControl,
  Animated,
  TouchableHighlight,
  TouchableWithoutFeedback,
  TouchableNativeFeedback,
  Button,
  SafeAreaViewBase,
  PermissionsAndroid,
} from 'react-native';
import 'react-native-gesture-handler';
import React, { Component } from 'react';
import {
  bell,
  akun,
  x,
  WA,
  massage,
  kegiatan,
  tutor,
  anak,
  test,
  Calendar,
  logout,
  orang3,
  orang2,
  orang1,
  siswa1,
  contoh,
} from '../../assets/images';
import {
  Zakat,
  Wallet,
  Profil2,
  Kids,
  Lapkeu,
  Infak,
  Anak2,
  Labelputih,
  Berita,
  Aktifitas,
  IconRumahAktif,
  PanahKanan,
  IconGrup,
  IconJA,
  IconTamPengajuan,
  IconTamAS,
  IconTamKegiatan,
  IconTamKelompok,
  IconTamTutor,
  Plusbaru,
  Pengajuan,
  CardkelasKuning,
  Kidsabu,
  Mapelputih,
  Dashboard,
  Banyakanak,
  Profil1,
  Kidsabukecil,
  Bellputih,
  Close,
  AnakGede,
  TopiGede,
  Contoh,
  PanahKanAbu,
} from '../../assets/icons';
import ButtonIcon from '../../components/ButtonIcon';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { connect } from 'react-redux';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";


const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: {
        name: '',
        type: '',
        uri: '',
        size: '',
      },
      modalpesan: false,
      berita: [],
      isOpen: false,
      selectedItem: 'About',
      terkumpul: 0.0,
      deskripsi: '',
      id_category: 0.0,
      visible: false,
      modaldetail: 'false',
      detbe: [],
      anakren: [],
      tutor2: [],
      pengelola: [],
      jml: [],
      jmltutor: [],
      curHours: null,
      curMinutes: null,
      curSecound: null,
      wilayah: false,
      admincabang: [],
      databelum: [],
      refreshing: true,
      pegajuanlist: [],
      donatur: [],
      lapfilter: [],
      shelter: [],
      id_shelter: '',
      anak: false,
      dettut: false,
      donat: false,
      detpengel: false,
      listkelompok: [],
      modalpengajuananak: false,
      modalpengajuanoprasional: false,

      item: []
    };
  }
  // GetBeritaAPi() {
  //   fetch('https://berbagibahagia.org/api/getcampung')
  //     .then(res => {
  //       if (res.status === 200) return res.json();
  //     })
  //     .then(resdata => {
  //       console.log(resdata.data);
  //       this.setState({
  //         berita: resdata.data,
  //         filter: resdata.data,
  //         refreshing: false,
  //       });
  //     });
  // }



  Getdonatur() {
    fetch('https://kilauindonesia.org/datakilau/api/getdonatur')
      .then(res => {
        if (res.status === 200) return res.json();
      })
      .then(resdata => {
        console.log(resdata.data);
        this.setState({
          donatur: resdata.data,
          refreshing: false,
        });
      });
  }

  GetbelumdataAPi() {
    fetch('https://kilauindonesia.org/datakilau/api/surveykeluarga')
      .then(res => {
        if (res.status === 200) return res.json();
      })
      .then(resdata => {
        console.log(resdata.data);
        this.setState({
          databelum: resdata.data,
          filter1: resdata.data,
          refreshing: false,
        });
      });
  }

  GetkelompkokallAPi() {
    AsyncStorage.getItem('token').then((token) => {
      fetch('https://kilauindonesia.org/datakilau/api/kelompokall', {
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
            listkelompok: resJson.data,
            refreshing: false,
          });
        })
        .catch((err) => console.log('error catch home', err));
    });
  }

  GettutorterbaruAPi() {
    AsyncStorage.getItem('token').then((token) => {
      fetch('https://kilauindonesia.org/datakilau/api/penabsentutor', {
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
            tutor2: resJson.data,
            refreshing: false,
          });
        })
        .catch((err) => console.log('error catch home', err));
    });
  }
  // GettutorterbaruAPi() {
  //   fetch('https://kilauindonesia.org/datakilau/api/tutor2')
  //     .then(res => {
  //       if (res.status === 200) return res.json();
  //     })
  //     .then(resdata => {
  //       console.log(resdata.data);
  //       this.setState({
  //         tutor2: resdata.data,
  //         refreshing: false,
  //       });
  //     });
  // }
  GetadmincabangAPi() {
    fetch('https://kilauindonesia.org/datakilau/api/penadmincabang')
      .then(res => {
        if (res.status === 200) return res.json();
      })
      .then(resdata => {
        console.log(resdata.data);
        this.setState({
          admincabang: resdata.data,
          refreshing: false,
        });
      });
  }


  GetdataanakAPi() {
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
            jml: resJson.data,
            refreshing: false,
          });
        })
        .catch((err) => console.log('error catch home', err));
    });
  }
  GetPengelolaAPi() {
    fetch('https://kilauindonesia.org/datakilau/api/getpengelola')
      .then(res => {
        if (res.status === 200) return res.json();
      })
      .then(resdata => {
        console.log(resdata.data);
        this.setState({
          jmlpengelola: resdata.data,
          refreshing: false,
        });
      });
  }

  GetdataanakAPi() {
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
            jml: resJson.data,
          });
        })
        .catch((err) => console.log('error catch home', err));
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
            jmltutor: resJson.data,
          });
        })
        .catch((err) => console.log('error catch home', err));
    });
  }
  GetPengajuanpengelola() {
    AsyncStorage.getItem('token').then((token) => {
      fetch('https://kilauindonesia.org/datakilau/api/getpengajuan', {
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
            pegajuanlist: resJson.data,
            refreshing: false,
          });
        })
        .catch((err) => console.log('error catch home', err));
    });
  }

  getProfile(token) {
    console.log('mulai getProfile...');
    setTimeout(() => {
      this.setState({ loading: true });
    }, 0);
    // const endpoint = 'https://kilauindonesia.org/kilau/api/profilekar';
    const endpoint = 'https://kilauindonesia.org/datakilau/api/profilepen';

    fetch(endpoint, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(resjson => {
        console.log('ini resjson getprofile', resjson);
        if (resjson.data) {
          this.updateState(resjson.data);
        }
      })
      .catch(err => {
        console.log('error dari splash profile', err);
      });
  }
  GetAdminShelterAPi() {
    fetch('https://kilauindonesia.org/datakilau/api/getpengelola')
      .then(res => {
        if (res.status === 200) return res.json();
      })
      .then(resdata => {
        console.log(resdata.data);
        this.setState({
          pengelola: resdata.data,
          refreshing: false,
        });
      });
  }
  async updateState(data) {
    this.props.changeUser(data);
    this.Update();
    console.log('ini email', this.props.user.email);
  }

  async tokenCheck() {
    AsyncStorage.getItem('token').then(res => {
      console.log('ini token ', res);
      if (res) {
        this.getProfile(res);
      }
    });
  }

  state = {
    curHours: null,
    curMinutes: null,
    curSecound: null,
  };



  GetfillaporanAPi() {
    fetch('https://kilauindonesia.org/datakilau/api/filteraktifitas/' + this.state.id_shelter).then(res => {
      if (res.status === 200)
        return res.json()
    }).then((resdata) => {
      console.log('ini resdata get', resdata);
      const length = resdata.data.length;
      if (length > 0) {
        this.setState({
          lapfilter: resdata.data,
        });
      } else {
        this.setState({
          lapfilter: resdata.data,
        });
      }
    })
  }
  GetLaporanAPi() {
    fetch('https://kilauindonesia.org/datakilau/api/shelterfil').then(res => {
      if (res.status === 200)
        return res.json()
    }).then((resdata) => {
      console.log('ini resdata get', resdata);
      const length = resdata.data.length;
      if (length > 0) {
        this.setState({
          shelter: resdata.data,
          refreshing: false,

        });
      } else {
        this.setState({
          shelter: resdata.data,
          refreshing: false,
        });
      }
    })
  }
  componentDidMount() {
    this.GettutorterbaruAPi();
    this.GetAdminShelterAPi();
    this.GetadmincabangAPi();
    this.GetdataanakAPi();
    this.GetPengelolaAPi();
    this.GetTutorAPi();
    this.GetbelumdataAPi();
    this.Getdonatur();
    this.GetPengajuanpengelola();
    this.GetLaporanAPi();
    this.GetfillaporanAPi();
    this.GetkelompkokallAPi();
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    this.tokenCheck();

    var now = new Date();
    var date = (now.getDate() < 10 ? '0' : '') + now.getDate(); //Current Date
    var month = (now.getMonth() + 1 < 10 ? '0' : '') + (now.getMonth() + 1); //Current Month
    var year = new Date().getFullYear(); //Current Year
    this.setState({
      date_api: date + '-' + month + '-' + year,
    });

    setInterval(() => {
      this.setState({
        curHours: new Date().getHours(),
        curMinutes: new Date().getMinutes(),
        curSecound: new Date().getSeconds(),
      });
    }, 1000);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  handleBackButton = () => {
    if (this.props.navigation.isFocused()) {
      Alert.alert(
        'Keluar',
        'Anda yakin akan keluar ?',
        [
          {
            text: 'TIDAK',
            onPress: () =>
              ToastAndroid.show('Batal Keluar', ToastAndroid.SHORT),
          },
          {
            text: 'YA',
            onPress: () => BackHandler.exitApp(),
          },
        ],
        {
          cancelable: true,
        },
      );
      return true;
    } else {
      return (this.state.canBeClosed = false);
    }
  };

  onRefresh() {
    this.GettutorterbaruAPi();
    this.GetAdminShelterAPi();
    this.GetadmincabangAPi();
    this.GetdataanakAPi();
    this.GetPengelolaAPi();
    this.GetTutorAPi();
    this.GetbelumdataAPi();
    this.Getdonatur();
    this.GetPengajuanpengelola();
    this.GetLaporanAPi();
    this.GetfillaporanAPi();
    this.GetkelompkokallAPi();
    this.setState({ refreshing: false });
  }

  openWhatsApp = () => {
    let msg = 'Assalamualaikum Developer App Berbagi Pendidikan, ';
    let url = 'whatsapp://send?text=' + msg + '&phone=6282119237558';
    Linking.openURL(url)
      .then(data => {
        console.log('WhatsApp Opened successfully ' + data);
      })
      .catch(() => {
        alert('Make sure WhatsApp installed on your device');
      });
  };

  BB = () => {
    let url = 'https://berbagibahagia.org/semuadonasi';
    Linking.openURL(url).then(data => {
      console.log('Opened successfully ' + data);
    });
  };
  render() {
    const touchableOpacityProps = {
      activeOpacity: 0.6,
    };

    const touchableHighlightProps = {
      activeOpacity: 0.5,
      underlayColor: 'green',
    };

    const getDisplayName = Component =>
      Component.displayName ||
      Component.name ||
      (typeof Component === 'string' ? Component : 'Component');
    // ini untuk animasi memakasi TouchableWithoutFeedback
    // const pinStyle={
    //     transform:[{
    //         scale:this.animation.interpolate({
    //             translateY:[0,1],
    //             outputRange:[0,-80]
    //         })
    //     }]
    // }
    // const rotation = {
    //     transform:[{
    //         rotate: this.animation.interpolate({
    //             inputRange:[0,1],
    //             outputRange:['0deg','45deg']
    //         })
    //     }]
    // }
    // const Drawer = createDrawerNavigator();

    const item = this.state.item
    const date = new Date();
    var ca = moment().format('HH:mm:ss');
    var c = ca.split(':');

    const jumlahpengelola = this.state.pengelola.map(item => {
      return item.id_users;
    });
    const jmldonatur = this.state.donatur.map(item => {
      return item.id_users;
    });
    const jumlahanak = this.state.jml.filter(
      item => item.status_validasi != 'tidak aktif',
    );
    const tidakaktif = this.state.jml.filter(
      item => item.status_validasi === 'tidak aktif',
    );
    const jumlahtutor = this.state.jmltutor.length;
    const jumlahadmcabang = this.state.admincabang.length;
    const belummasuk = this.state.databelum.filter(
      item => item.kondisi_penerima_manfaat === null,
    );
    const jmlpegajuan = this.state.pegajuanlist.filter(
      item => item.status === 'Pending',
    );

    //   const labels = this.state.jml.filter(
    //     item => item.status_cpb === item.status_cpb,
    //   ).map(item => {
    //     return item.status_cpb;
    //   })



    // const values = this.state.jml.filter(
    //   item => item.id_shelter === 50,
    // ).map(item => {
    //   return item.status_cpb;
    // })

    // const chartData = {
    //   labels,
    //   datasets: [
    //     {
    //       data: values,
    //     },
    //   ],
    // };

    return (
      <View style={{ color: '#fff', height: '100%' }}>
        {/* <Text> Hallo,{this.props.user.name}</Text> */}
        {/* user.presensi itu di dapat di redux/store */}
        {/* admin = donatur */}

        {
          this.props.user.presensi === 'donatur' ? ( // ini tamppilan donatur
            <ScrollView>
              <View
                style={{ backgroundColor: '#00A9B8', height: 160, width: '100%' }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignContent: 'space-between',
                  }}>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: 'bold',
                      color: '#ffffff',
                      marginLeft: 10,
                      marginTop: 10,
                    }}>
                    Hallo,{this.props.user.name}
                  </Text>
                  <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('Web1')}>
                    <Image
                      source={bell}
                      style={{ marginTop: 10, marginRight: 10 }}></Image>
                  </TouchableOpacity>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    alignContent: 'space-around',
                    alignItems: 'center',
                    marginTop: 10,
                  }}>
                  <View style={{ flexDirection: 'column' }}>
                    <Text style={style.Labelbaru}>
                      Total Biaya Anak {'\n'}Asuh
                    </Text>
                    <Text style={{ color: '#fff' }}>Rp</Text>
                    <Text style={{ color: '#fff' }}>2.000.000/Bulan</Text>
                  </View>
                  <View
                    style={{
                      height: '100%',
                      width: 1,
                      backgroundColor: '#fff',
                    }}></View>
                  <View style={{ marginLeft: -20 }}>
                    <Text style={{ color: '#fff' }}>Anak Yang {'\n'}Diasuh</Text>
                    <View style={{ flexDirection: 'row' }}>
                      <Anak2 />
                      <Text style={style.angka}>1</Text>
                    </View>
                  </View>
                </View>
              </View>

              {/* <View style={[style.kotakbaru1]}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignContent: 'space-around', alignItems: 'center' }}>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('Lapkeu')}>

                                    <Lapkeu />
                                    <Text> Laporan</Text>

                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => this.props.navigation.navigate('')}>
                                    <Berita />
                                    <Text style={{ marginTop: 5 }}> Berita</Text>

                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => this.props.navigation.navigate('bayarinfak')}>

                                    <Infak />
                                    <Text style={{ marginTop: -3 }}>Infak</Text>

                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => this.props.navigation.navigate('Zakat')}>

                                    <Zakat />
                                    <Text style={{ marginTop: 3 }}>Zakat</Text>

                                </TouchableOpacity>

                            </View>
                        </View> */}
              <View>
                <View>
                  <TouchableOpacity
                    style={style.itemflat}
                    onPress={() => {
                      this.props.navigation.navigate('Web1', {
                        des: item.deskripsi,
                      });
                      // this.props.navigation.navigate('Detail_Artikel', { des: item.deskripsi })
                    }}>
                    <View>
                      <ImageBackground
                        source={contoh}
                        style={{
                          marginLeft: 15,
                          height: 130,
                          width: '95%',
                          justifyContent: 'center',
                          alignContent: 'center',
                          alignSelf: 'center',
                          borderRadius: 10,
                        }}>
                        <Text style={style.tmblDonasi}>Donasi</Text>
                      </ImageBackground>
                      {/* <View style={{ flexDirection: 'column', marginTop: 20 }}>
                                            <Text style={{ marginTop: -20, marginLeft: 20, fontWeight: 'bold', }}>Judul</Text>
                                            <Text numberOfLines={3} style={style.itemText1}> Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry </Text>
                                            <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                                <Image style={style.Labeltgl} source={Calendar}></Image>
                                                <Text style={style.baca}>Penulis</Text>
                                            </View>
                                        </View> */}
                    </View>
                  </TouchableOpacity>
                </View>
                {/* <View style={{ flexDirection: 'column' }}>
                                        <Text style={{ textAlign: 'center', marginBottom: 10, }}>
                                            Apa yang Menarik hari ini
                                        </Text>

                                        <Text style={style.btnSimpanUn}> Lihat Artikel</Text>

                                    </View>
                                    <ImageBackground source={read1} style={{
                                    marginLeft: 60,
                                    marginTop: -10,
                                    width: 80,
                                    height: 100,
                                }}></ImageBackground> */}
              </View>

              <View
                style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: 'bold',
                    marginLeft: 20,
                    marginTop: 20,
                  }}>
                  Aktifitas Anak{' '}
                </Text>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('Absen')}>
                  <Text
                    style={{ marginTop: 20, color: '#00A9B8', marginRight: 20 }}>
                    Lihat Semua
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={style.kotakbaru1}>
                <View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <View style={{ flexDirection: 'row' }}>
                      <Image
                        source={test}
                        style={{
                          width: 35,
                          height: 35,
                          marginLeft: 20,
                          borderRadius: 30,
                          marginBottom: 10,
                        }}></Image>
                      <Text style={{ fontSize: 14, marginTop: 5, marginLeft: 5 }}>
                        {' '}
                        Nama Anak
                      </Text>
                    </View>
                    <View
                      style={{
                        marginRight: 20,
                        textAlign: 'center',
                        borderColor: '#E9E9E9',
                        borderWidth: 1,
                        width: 50,
                        height: 25,
                        backgroundColor: '#FFEFB5',
                      }}>
                      <Text style={{ textAlign: 'center', color: '#13B82D' }}>
                        Hadir
                      </Text>
                    </View>
                  </View>

                  <View
                    style={{
                      width: '95%',
                      height: 1,
                      backgroundColor: '#353739',
                      marginLeft: 8,
                    }}
                  />

                  <View
                    style={{
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                    }}>
                    <Text style={{ marginLeft: 20, fontSize: 14, marginTop: 5 }}>
                      {' '}
                      Keterangan Absen
                    </Text>
                    <View style={{ flexDirection: 'column' }}>
                      <Text style={{ marginRight: 20, fontSize: 12 }}>04 jan</Text>
                      <Text style={{ marginRight: 20, fontSize: 12 }}>10.30</Text>
                    </View>
                  </View>
                </View>
              </View>

              <View style={style.kotakbaru1}>
                <View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <View style={{ flexDirection: 'row' }}>
                      <Image
                        source={test}
                        style={{
                          width: 35,
                          height: 35,
                          marginLeft: 20,
                          borderRadius: 30,
                          marginBottom: 10,
                        }}></Image>
                      <Text style={{ fontSize: 14, marginTop: 5, marginLeft: 5 }}>
                        {' '}
                        Nama Anak
                      </Text>
                    </View>
                    <View
                      style={{
                        marginRight: 20,
                        textAlign: 'center',
                        borderColor: '#E9E9E9',
                        borderWidth: 1,
                        width: 50,
                        height: 25,
                        backgroundColor: '#FFEFB5',
                      }}>
                      <Text style={{ textAlign: 'center', color: '#FFBB0C' }}>
                        Izin
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      width: '95%',
                      height: 1,
                      backgroundColor: '#353739',
                      marginLeft: 8,
                    }}
                  />
                  <View
                    style={{
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                    }}>
                    <Text style={{ marginLeft: 20, fontSize: 14, marginTop: 5 }}>
                      {' '}
                      Keterangan Absen
                    </Text>
                    <View style={{ flexDirection: 'column' }}>
                      <Text style={{ marginRight: 20, fontSize: 12 }}>04 jan</Text>
                      <Text style={{ marginRight: 20, fontSize: 12 }}>10.30</Text>
                    </View>
                  </View>
                </View>
              </View>

              <View style={style.kotakbaru1}>
                <View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <View style={{ flexDirection: 'row' }}>
                      <Image
                        source={test}
                        style={{
                          width: 35,
                          height: 35,
                          marginLeft: 20,
                          borderRadius: 30,
                          marginBottom: 10,
                        }}></Image>
                      <Text style={{ fontSize: 14, marginTop: 5, marginLeft: 5 }}>
                        {' '}
                        Nama Anak
                      </Text>
                    </View>
                    <View
                      style={{
                        marginRight: 20,
                        textAlign: 'center',
                        borderColor: '#E9E9E9',
                        borderWidth: 1,
                        width: 50,
                        height: 25,
                        backgroundColor: '#FFEFB5',
                      }}>
                      <Text style={{ textAlign: 'center', color: '#FF460C' }}>
                        Sakit
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      width: '95%',
                      height: 1,
                      backgroundColor: '#353739',
                      marginLeft: 8,
                    }}
                  />
                  <View
                    style={{
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                    }}>
                    <Text style={{ marginLeft: 20, fontSize: 14, marginTop: 5 }}>
                      {' '}
                      Keterangan Absen
                    </Text>
                    <View style={{ flexDirection: 'column' }}>
                      <Text style={{ marginRight: 20, fontSize: 12 }}>04 jan</Text>
                      <Text style={{ marginRight: 20, fontSize: 12 }}>10.30</Text>
                    </View>
                  </View>
                </View>
              </View>

              <View
                style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: 'bold',
                    marginLeft: 20,
                    marginTop: 20,
                  }}>
                  {' '}
                  Jadi Orang Tua Asuh
                </Text>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('Pilnak')}>
                  <Text
                    style={{ marginTop: 20, color: '#00A9B8', marginRight: 20 }}>
                    Lihat Semua
                  </Text>
                </TouchableOpacity>
              </View>

              <FlatList
                horizontal
                pagingEnabled={true}
                data={this.state.anakren}
                renderItem={({ item }) => (
                  <View style={style.kotakbaru3}>
                    <TouchableOpacity
                      onPress={() => {
                        this.setState({ detrand: item, modaldetail: false });
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          marginLeft: 10,
                          marginTop: -10,
                        }}>
                        <Image
                          source={test}
                          style={{
                            borderRadius: 25,
                            height: 50,
                            width: 50,
                            marginTop: 5,
                          }}
                        />
                        <View style={{ flexDirection: 'column' }}>
                          <Text style={{ marginLeft: 10 }}>{item.nama}</Text>
                          <Text numberOfLines={3} style={style.itemText}>
                            {' '}
                            Yaseer bercita-cita menjadi pengusaha roti dan
                            membangun toko roti sendiri agar ibunya tidak lagi
                            berkeliling untuk berjualan roti.{' '}
                          </Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  </View>
                )}></FlatList>
              <View style={{ marginBottom: 80 }}></View>
            </ScrollView>
          ) : (
            <View />
          )
        }

        {
          this.props.user.presensi === 'tutor' ? ( // ini tampilan tutor//
            <ScrollView
              style={{ backgroundColor: '#fff', height: '100%' }}
              showsVerticalScrollIndicator={true}>
              <View
                style={{
                  backgroundColor: '#00A9B8',
                  height: 150,
                  width: '100%',
                  borderBottomLeftRadius: 28,
                  borderBottomRightRadius: 28,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignContent: 'space-between',
                  }}>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: 'bold',
                      color: '#ffffff',
                      marginLeft: 10,
                      marginTop: 10,
                    }}>
                    Hallo,{this.props.user.name}
                  </Text>
                  <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('Web')}>
                    <Bellputih
                      style={{ marginTop: 10, marginRight: 5 }}></Bellputih>
                  </TouchableOpacity>
                </View>

                <View style={style.groupdatetime}>
                  <Image source={Calendar} />
                  <View>
                    <Text style={style.texttime}>
                      {('0' + this.state.curHours).slice(-2)}:
                      {('0' + this.state.curMinutes).slice(-2)}:
                      {('0' + this.state.curSecound).slice(-2)}
                    </Text>
                    {this.state.curHours === 14 ? (
                      // Vibration.vibrate(1 * 1000)
                      <View></View>
                    ) : (
                      <View></View>
                    )}
                    <Text style={style.textdate}>
                      {moment(date).format('dddd, DD MMMM YYYY')}
                    </Text>
                  </View>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  alignSelf: 'center',
                  backgroundColor: '#fff',
                  width: '90%',
                  height: 100,
                  top: -25,
                  borderRadius: 10,
                  paddingHorizontal: '4%',
                  shadowColor: '#858585',
                  shadowRadius: 15,
                  elevation: 6,
                  shadowOpacity: '25%',
                }}>
                <TouchableNativeFeedback
                  onPress={() =>
                    this.props.navigation.navigate('List_Anak_Binaan')
                  }>
                  <View
                    style={{
                      flexDirection: 'column',
                      width: '20%',
                      height: '90%',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <IconTamAS />
                    <Text
                      style={{
                        color: '#5c5c5c',
                        fontSize: 10,
                        fontFamily: 'Poppins-Medium',
                        textAlign: 'center',
                      }}>
                      Anak Asuh
                    </Text>
                  </View>
                </TouchableNativeFeedback>
                <TouchableNativeFeedback
                  onPress={() => this.props.navigation.navigate('Tutor')}>
                  <View
                    style={{
                      flexDirection: 'column',
                      width: '20%',
                      height: '90%',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <IconTamTutor />
                    <Text
                      style={{
                        color: '#5c5c5c',
                        fontSize: 10,
                        fontFamily: 'Poppins-Medium',
                        textAlign: 'center',
                      }}>
                      Aktivitas
                    </Text>
                  </View>
                </TouchableNativeFeedback>
                <TouchableNativeFeedback
                  onPress={() =>
                    this.props.navigation.navigate('List_anak')
                  }>
                  <View
                    style={{
                      flexDirection: 'column',
                      width: '20%',
                      height: '90%',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <IconTamPengajuan />
                    <Text
                      style={{
                        color: '#5c5c5c',
                        fontSize: 10,
                        fontFamily: 'Poppins-Medium',
                        textAlign: 'center',
                      }}>
                      Buat Rapot Anak
                    </Text>
                  </View>
                </TouchableNativeFeedback>
                <TouchableNativeFeedback
                  onPress={() => this.props.navigation.navigate('ListPengajuan')}>
                  <View
                    style={{
                      flexDirection: 'column',
                      width: '20%',
                      height: '90%',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <IconTamKelompok />
                    <Text
                      style={{
                        color: '#5c5c5c',
                        fontSize: 10,
                        fontFamily: 'Poppins-Medium',
                        textAlign: 'center',
                      }}>
                      Tambah Pengajuan
                    </Text>
                  </View>
                </TouchableNativeFeedback>
              </View>

              <View>
                <View
                  style={{
                    paddingHorizontal: '5%',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginBottom: 5,
                  }}>
                  <Text
                    style={{
                      color: '#000',
                      fontSize: 16,
                      fontFamily: 'Poppins-Medium',
                    }}>
                    Kelompok Anak Binaan
                  </Text>
                  <TouchableOpacity
                    onPress={() =>
                      this.props.navigation.navigate('List_Anak_Binaan') +
                      ToastAndroid.show('Lihat Semua Kelas', ToastAndroid.SHORT)
                    }>
                    <Text
                      style={{
                        color: '#00A9B8',
                        fontSize: 16,
                        fontFamily: 'Poppins-Medium',
                      }}>
                      Lihat Semua
                    </Text>
                  </TouchableOpacity>
                </View>

                <FlatList
                  horizontal
                  pagingEnabled={true}
                  data={this.state.listkelompok}
                  renderItem={({ item }) => (
                    // style={style.kotakbaru4}
                    <View
                      style={{ marginLeft: 10, marginTop: 5, marginBottom: 25 }}>
                      <TouchableOpacity>
                        <View
                          style={{
                            width: windowWidth * 0.723,
                            height: windowHeight * 0.185,
                          }}>
                          <CardkelasKuning style={{ zIndex: 0 }} />
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
                              top: '32%',
                              left: '11%',
                            }}>
                            <Text
                              style={{
                                fontSize: 16,
                                color: '#fff',
                                fontFamily: 'Poppins-Regular',
                              }}>
                              {item.jumlah}
                            </Text>
                            <Text
                              style={{
                                fontSize: 16,
                                color: '#fff',
                                fontFamily: 'Poppins-Regular',
                                left: '15%',
                              }}>
                              Orang
                            </Text>
                          </View>
                          <View
                            style={{
                              position: 'absolute',
                              zIndex: 1,
                              paddingRight: '10%',
                              top: '80%',
                              flexDirection: 'row',
                              alignItems: 'center',
                              width: '100%',
                              justifyContent: 'flex-end',
                            }}>
                            <Image
                              source={orang1}
                              style={{ borderRadius: 100, width: 41, height: 41 }}
                            />
                            <Image
                              source={orang2}
                              style={{
                                borderRadius: 100,
                                width: 41,
                                height: 41,
                                marginLeft: -15,
                              }}
                            />
                            <Image
                              source={orang3}
                              style={{
                                borderRadius: 100,
                                width: 41,
                                height: 41,
                                marginLeft: -15,
                              }}
                            />
                          </View>
                        </View>
                      </TouchableOpacity>
                    </View>
                  )}></FlatList>
              </View>

              <View>
                <View
                  style={{
                    paddingHorizontal: '5%',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginBottom: 5,
                    marginTop: 10,
                  }}>
                  <Text
                    style={{
                      color: '#000',
                      fontSize: 16,
                      fontFamily: 'Poppins-Medium',
                    }}>
                    Riwayat Aktifitas
                  </Text>
                  <TouchableOpacity
                    onPress={() =>
                      this.props.navigation.navigate('AktifitasTutor')
                    }>
                    <Text
                      style={{
                        color: '#00A9B8',
                        fontSize: 16,
                        fontFamily: 'Poppins-Medium',
                      }}>
                      Lihat Semua
                    </Text>
                  </TouchableOpacity>
                </View>
                <FlatList
                  pagingEnabled={true}
                  data={this.state.tutor2}
                  renderItem={({ item }) => (
                    // style={style.kotakbaru4}
                    <View
                      style={{ marginLeft: 20, marginTop: 5, marginBottom: 25 }}>
                      <TouchableOpacity>
                        <View style={style.kotakaktif}>
                          <View style={{ flexDirection: 'row' }}>
                            <Image
                              source={{
                                uri:
                                  'https://kilauindonesia.org/datakilau/gambarUpload/' +
                                  item.foto,
                              }}
                              style={{
                                width: 40,
                                height: 40,
                                borderRadius: 20,
                                marginLeft: 10,
                              }}></Image>
                            <View
                              style={{
                                justifyContent: 'space-between',
                                flexDirection: 'row',
                              }}>
                              <View style={{ justifyContent: 'space-around' }}>
                                <View
                                  style={{
                                    marginLeft: 10,
                                    flexDirection: 'column',
                                  }}>
                                  <Text>Vildan Vinanda</Text>
                                  <View
                                    style={{
                                      color: '#fff',
                                      height: 30,
                                      backgroundColor: '#bdbdbd',
                                      justifyContent: 'center',
                                      textAlign: 'center',
                                      borderRadius: 20,
                                      flexDirection: 'row',
                                      width: 120,
                                    }}>
                                    <Mapelputih style={{ marginTop: 7 }} />
                                    <Text
                                      style={{
                                        marginTop: 5,
                                        marginLeft: 5,
                                        color: '#fff',
                                      }}>
                                      Matematika
                                    </Text>
                                  </View>
                                </View>
                              </View>
                            </View>
                          </View>
                          <View
                            style={{
                              height: 1,
                              width: '100%',
                              backgroundColor: '#bdbdbb',
                              marginTop: 10,
                            }}></View>

                          <Image
                            source={siswa1}
                            style={{
                              width: 300,
                              height: 200,
                              justifyContent: 'center',
                              alignSelf: 'center',
                              marginTop: 10,
                            }}></Image>
                          <View
                            style={{
                              justifyContent: 'space-between',
                              alignContent: 'space-between',
                              flexDirection: 'row',
                            }}>
                            <View
                              style={{
                                marginLeft: 10,
                                marginTop: 15,
                                color: '#fff',
                                height: 30,
                                backgroundColor: '#bdbdbd',
                                justifyContent: 'center',
                                textAlign: 'center',
                                borderRadius: 20,
                                flexDirection: 'row',
                                width: 120,
                              }}>
                              <Labelputih style={{ marginTop: 7 }} />
                              <Text
                                style={{
                                  marginTop: 5,
                                  marginLeft: 5,
                                  color: '#fff',
                                }}>
                                Bimbel
                              </Text>
                            </View>
                            <Text style={{ marginTop: 15, marginRight: 10 }}>
                              22 Januari 2022
                            </Text>
                          </View>

                          <Text
                            style={{
                              fontWeight: 'bold',
                              color: '#000',
                              fontSize: 16,
                              marginLeft: 15,
                              marginTop: 10,
                            }}>
                            Belajar Perkalian Dasar
                          </Text>
                          <Text style={{ marginLeft: 15, width: '90%' }}>
                            Anak-anak belajar untuk menghafal perkalian 1 sampai
                            dengan 5
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  )}></FlatList>
              </View>
              <View style={{ marginBottom: 50 }}></View>
            </ScrollView>
          ) : (
            <View />
          )
        }

        {
          this.props.user.presensi === '' ? ( //ini nanti dipakai untuk pengelola//
            <ScrollView
              style={{ backgroundColor: '#fff', height: '100%' }}
              showsVerticalScrollIndicator={true}>
              <View
                style={{
                  backgroundColor: '#00A9B8',
                  height: 160,
                  width: '100%',
                  borderBottomLeftRadius: 28,
                  borderBottomRightRadius: 28,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignContent: 'space-between',
                  }}>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: 'bold',
                      color: '#ffffff',
                      marginLeft: 10,
                      marginTop: 10,
                    }}>
                    Hallo,{this.props.user.name}
                  </Text>
                  <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('DataDataKel', { belummasuk: belummasuk.length })}>
                    <Image
                      style={{ marginRight: 20, marginTop: 10 }}
                      source={bell}></Image>
                  </TouchableOpacity>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    alignContent: 'space-around',
                    alignItems: 'center',
                    marginTop: 10,
                  }}>
                  <View style={{ flexDirection: 'column' }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}>
                      <Text
                        style={{
                          color: '#fff',
                          fontSize: 14,
                          fontFamily: 'Poppins-Medium',
                        }}>
                        Jumlah Tutor
                      </Text>
                      <PanahKanan style={{}} />
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        aligntItems: 'center',
                        top: '7%',
                        justifyContent: 'space-between',
                      }}>
                      <IconGrup style={{ top: '3%' }} />
                      <Text
                        style={{
                          color: '#fff',
                          fontSize: 25,
                          marginHorizontal: '7%',
                          fontFamily: 'Poppins-Reguler',
                        }}>
                        {jumlahtutor}
                      </Text>
                      <Text
                        style={{
                          color: '#fff',
                          top: '4%',
                          fontSize: 16,
                          fontFamily: 'Poppins-Medium',
                        }}>
                        Orang
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      height: '100%',
                      width: 1,
                      backgroundColor: '#fff',
                    }}></View>
                  <View style={{ marginLeft: -20 }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        width: windowWidth * 0.4,
                        alignItems: 'center',
                      }}>
                      <Text
                        style={{
                          color: '#fff',
                          fontSize: 14,
                          fontFamily: 'Poppins-Medium',
                        }}>
                        Jumlah Anak
                      </Text>
                      <PanahKanan style={{}} />
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        aligntItems: 'center',
                        top: '7%',
                        justifyContent: 'space-between',
                        width: windowWidth * 0.4,
                      }}>
                      <IconJA style={{}} />
                      <Text
                        style={{
                          color: '#fff',
                          fontSize: 25,
                          marginHorizontal: '7%',
                          fontFamily: 'Poppins-Reguler',
                        }}>
                        {jumlahanak.length}
                      </Text>
                      <Text
                        style={{
                          color: '#fff',
                          fontSize: 16,
                          fontFamily: 'Poppins-Medium',
                          top: '4%',
                        }}>
                        Orang
                      </Text>
                    </View>
                  </View>
                </View>

              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  alignSelf: 'center',
                  backgroundColor: '#fff',
                  width: '90%',
                  height: 100,
                  top: -25,
                  borderRadius: 10,
                  paddingHorizontal: '4%',
                  shadowColor: '#858585',
                  shadowRadius: 15,
                  elevation: 6,
                  shadowOpacity: '25%',
                }}>
                <TouchableNativeFeedback
                  onPress={() =>
                    this.props.navigation.navigate('List_Anak_Binaan')
                  }>
                  <View
                    style={{
                      flexDirection: 'column',
                      width: '20%',
                      height: '90%',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <IconTamAS />
                    <Text
                      style={{
                        color: '#5c5c5c',
                        fontSize: 10,
                        fontFamily: 'Poppins-Medium',
                        textAlign: 'center',
                      }}>
                      Tambah Anak Asuh
                    </Text>
                  </View>
                </TouchableNativeFeedback>
                <TouchableNativeFeedback
                  onPress={() => this.props.navigation.navigate('Tutor')}>
                  <View
                    style={{
                      flexDirection: 'column',
                      width: '20%',
                      height: '90%',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <IconTamTutor />
                    <Text
                      style={{
                        color: '#5c5c5c',
                        fontSize: 10,
                        fontFamily: 'Poppins-Medium',
                        textAlign: 'center',
                      }}>
                      Tambah Tutor
                    </Text>
                  </View>
                </TouchableNativeFeedback>
                <TouchableNativeFeedback
                  onPress={() =>
                    this.props.navigation.navigate('ListKelompok')
                  }>
                  <View
                    style={{
                      flexDirection: 'column',
                      width: '20%',
                      height: '90%',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <IconTamKelompok />
                    <Text
                      style={{
                        color: '#5c5c5c',
                        fontSize: 10,
                        fontFamily: 'Poppins-Medium',
                        textAlign: 'center',
                      }}>
                      Tambah Kelompok
                    </Text>
                  </View>
                </TouchableNativeFeedback>
                <TouchableNativeFeedback
                  onPress={() => this.props.navigation.navigate('ListPengajuan')}>
                  <View
                    style={{
                      flexDirection: 'column',
                      width: '20%',
                      height: '90%',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <IconTamPengajuan />
                    <Text
                      style={{
                        color: '#5c5c5c',
                        fontSize: 10,
                        fontFamily: 'Poppins-Medium',
                        textAlign: 'center',
                      }}>
                      Tambah Pengajuan
                    </Text>
                  </View>
                </TouchableNativeFeedback>
              </View>

              <View>
                <View
                  style={{
                    paddingHorizontal: '5%',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginBottom: 5,
                    marginTop: 15,
                  }}>
                  <Text
                    style={{
                      color: '#000',
                      fontSize: 16,
                      fontFamily: 'Poppins-Medium',
                    }}>
                    Aktifitas Tutor
                  </Text>
                  <TouchableOpacity
                    onPress={() =>
                      this.props.navigation.navigate('Tutor')
                    }>
                    <Text
                      style={{
                        color: '#00A9B8',
                        fontSize: 16,
                        fontFamily: 'Poppins-Medium',
                      }}>
                      Lihat Semua
                    </Text>
                  </TouchableOpacity>
                </View>
                <FlatList
                  pagingEnabled={true}
                  refreshControl={
                    <RefreshControl
                      refreshing={this.state.refreshing}
                      onRefresh={() => this.onRefresh()}
                    />
                  }
                  data={this.state.tutor2.slice(0, 2)}
                  renderItem={({ item }) => (
                    <View
                      style={{ marginLeft: 20, marginTop: 5, marginBottom: 25 }}>
                      <TouchableOpacity onPress={() => this.props.navigation.navigate('DetailAktifitas', {
                        item: item,
                      })}>
                        <View style={style.kotakaktif}>
                          <View style={{ flexDirection: 'row' }}>
                            <Image
                              source={{
                                uri:
                                  'https://kilauindonesia.org/datakilau/gambarUpload/' +
                                  item.foto,
                              }}
                              style={{
                                width: 40,
                                height: 40,
                                borderRadius: 20,
                                marginLeft: 10,
                              }}></Image>
                            <View
                              style={{
                                justifyContent: 'space-between',
                                flexDirection: 'row',
                              }}>
                              <View style={{ justifyContent: 'space-around' }}>
                                <View
                                  style={{
                                    marginLeft: 10,
                                    flexDirection: 'column',
                                  }}>
                                  <Text>{item.nama_lengkap}</Text>
                                  <View
                                    style={{
                                      color: '#fff',
                                      height: 30,
                                      backgroundColor: '#bdbdbd',
                                      justifyContent: 'center',
                                      textAlign: 'center',
                                      borderRadius: 20,
                                      flexDirection: 'row',
                                      width: 120,
                                    }}>
                                    <Mapelputih style={{ marginTop: 7 }} />
                                    <Text
                                      style={{
                                        marginTop: 5,
                                        marginLeft: 5,
                                        color: '#fff',
                                      }}>
                                      {item.jenis_kegiatan}
                                    </Text>
                                  </View>
                                </View>
                              </View>
                            </View>
                          </View>
                          <View
                            style={{
                              height: 1,
                              width: '100%',
                              backgroundColor: '#bdbdbb',
                              marginTop: 10,
                            }}></View>

                          <Image
                            source={{
                              uri:
                                'https://kilauindonesia.org/datakilau/gambarUpload/' +
                                item.foto_1,
                            }}
                            style={{
                              width: 300,
                              height: 200,
                              justifyContent: 'center',
                              alignSelf: 'center',
                              marginTop: 10,
                            }}></Image>
                          <View
                            style={{
                              justifyContent: 'space-between',
                              alignContent: 'space-between',
                              flexDirection: 'row',
                            }}>
                            <View
                              style={{
                                marginLeft: 10,
                                marginTop: 15,
                                color: '#fff',
                                height: 30,
                                backgroundColor: '#bdbdbd',
                                justifyContent: 'center',
                                textAlign: 'center',
                                borderRadius: 20,
                                flexDirection: 'row',
                                width: 120,
                              }}>
                              <Labelputih style={{ marginTop: 7 }} />
                              <Text
                                style={{
                                  marginTop: 5,
                                  marginLeft: 5,
                                  color: '#fff',
                                }}>
                                {item.level}
                              </Text>
                            </View>
                            <Text style={{ marginTop: 15, marginRight: 10 }}>
                              {item.tanggal}
                            </Text>
                          </View>

                          <Text
                            style={{
                              fontWeight: 'bold',
                              color: '#000',
                              fontSize: 16,
                              marginLeft: 15,
                              marginTop: 10,
                            }}>
                            {item.materi}
                          </Text>
                          <Text style={{ marginLeft: 15, width: '90%' }}>
                            kelompok yang mengikuti kegiatan {item.nama_kelompok}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  )}></FlatList>
              </View>

              <View>
                <View
                  style={{
                    paddingHorizontal: '5%',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginBottom: 5,
                  }}>
                  <Text
                    style={{
                      color: '#000',
                      fontSize: 16,
                      fontFamily: 'Poppins-Medium',
                    }}>
                    Riwayat Pengajuan
                  </Text>
                  <TouchableOpacity
                    onPress={() =>
                      this.props.navigation.navigate('ListPengajuan')
                    }>
                    <Text
                      style={{
                        color: '#00A9B8',
                        fontSize: 16,
                        fontFamily: 'Poppins-Medium',
                      }}>
                      Lihat Semua
                    </Text>
                  </TouchableOpacity>
                </View>

                <FlatList
                  style={{ marginBottom: 80 }}
                  horizontal
                  pagingEnabled={true}
                  data={this.state.pegajuanlist.slice(0, 2)}
                  renderItem={({ item }) => (
                    // style={style.kotakbaru4}
                    <TouchableOpacity onPress={() => item.tujuan === 'Oprasional' ? this.props.navigation.navigate('DetailOprasional', { list: item }) :
                      this.props.navigation.navigate('DetailPenga', { list: item })}>
                      <View style={style.kotakstat}>
                        <Text style={[style.status, {
                          color: item.status === 'Diterima' ?
                            'green' : item.status === 'Ditolak' ? 'red' : '#D39800'
                        }]}>{item.status}</Text>
                        <Text style={style.judul}>
                          Pengajuan {item.tujuan}
                        </Text>

                        <Text
                          style={{
                            textAlign: 'right',
                            color: '#bdbdbd',
                            fontWeight: 'bold',
                          }}>
                          {item.tanggal}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  )}></FlatList>




              </View>

              <Modal animationType={"fade"} transparent={true}
                visible={this.state.modalpengajuananak}
                onRequestClose={() => this.setState({ modalpengajuananak: false })}>
                <SafeAreaView style={style.containerSafe}>
                  <TouchableOpacity activeOpacity={1.0} onPress={() => this.setState({ modalpengajuananak: false })} style={style.ModalCont}>
                    <View style={{
                      paddingTop: 5,
                      marginHorizontal: 10,
                      backgroundColor: '#fff',
                      // flexDirection: 'row',
                      borderRadius: 20,
                      height: '70%',
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
                      <TouchableOpacity
                        onPress={() =>
                          this.props.navigation.navigate(
                            'Home',
                            this.setState({ modalpengajuananak: false }),
                          )
                        }
                        style={{ position: 'absolute', right: 20, top: 20 }}>
                        <Image
                          source={x}
                          style={{
                            height: 30,
                            width: 30,
                            alignItems: 'center',
                          }}></Image>
                      </TouchableOpacity>
                      <ScrollView>
                        <Text>{item.tujuan}</Text>
                        <View style={style.form}>
                          <Text style={style.labelkiri}>Nama</Text>
                          <Text style={style.labelkanan}>
                            :{item.full_name}
                          </Text>
                        </View>
                      </ScrollView>
                    </View>
                  </TouchableOpacity>
                </SafeAreaView>
              </Modal>
            </ScrollView>
          ) : (
            <View />
          )
        }

        {
          this.props.user.presensi === 'cabang' ? ( //admin cabang//
            <View
              style={{ backgroundColor: '#fff', flex: 1 }}
              showsVerticalScrollIndicator={true}>
              <View
                style={{ backgroundColor: '#00A9B8', height: 130, width: '100%' }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignContent: 'space-between',
                  }}>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: 'bold',
                      color: '#ffffff',
                      marginLeft: 10,
                      marginTop: 10,
                    }}>
                    Hallo,{this.props.user.name}
                  </Text>
                  <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('testface')}>
                    <Image
                      style={{ marginRight: 20, marginTop: 10 }}
                      source={bell}></Image>
                  </TouchableOpacity>
                </View>
              </View>

              <View
                style={{
                  top: '-7%',
                  alignSelf: 'center',
                  backgroundColor: '#fff',
                  width: '90%',
                  height: '15%',
                  borderRadius: 10,
                  paddingVertical: '2%',
                  paddingHorizontal: '4%',
                  shadowColor: '#858585',
                  shadowRadius: 15,
                  elevation: 6,
                  shadowOpacity: '25%',
                }}>
                <View
                  style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <TouchableNativeFeedback
                    onPress={() =>
                      this.props.navigation.navigate('List_Anak_Binaan')
                    }>
                    <View
                      style={{
                        flexDirection: 'column',
                        width: '20%',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <IconTamAS />
                      <Text
                        style={{
                          color: '#5c5c5c',
                          fontSize: 10,
                          fontFamily: 'Poppins-Medium',
                          textAlign: 'center',
                        }}>
                        Data Anak Asuh
                      </Text>
                    </View>
                  </TouchableNativeFeedback>

                  <TouchableNativeFeedback
                    onPress={() => this.props.navigation.navigate('Tutor')}>
                    <View
                      style={{
                        flexDirection: 'column',
                        width: '20%',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <IconTamTutor />
                      <Text
                        style={{
                          color: '#5c5c5c',
                          fontSize: 10,
                          fontFamily: 'Poppins-Medium',
                          textAlign: 'center',
                        }}>
                        Pengelola dan Tutor
                      </Text>
                    </View>
                  </TouchableNativeFeedback>

                  <TouchableNativeFeedback
                    onPress={() =>
                      this.props.navigation.navigate('DataValidasi')
                    }>
                    <View
                      style={{
                        flexDirection: 'column',
                        width: '20%',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <IconTamAS />
                      <Text
                        style={{
                          color: '#5c5c5c',
                          fontSize: 10,
                          fontFamily: 'Poppins-Medium',
                          textAlign: 'center',
                        }}>
                        Validasi
                      </Text>
                    </View>
                  </TouchableNativeFeedback>

                  <TouchableNativeFeedback
                    onPress={() => this.props.navigation.navigate('Report')}>
                    <View
                      style={{
                        flexDirection: 'column',
                        width: '20%',
                        justifyContent: 'center',
                        alignItems: 'center',
                        top: 5,
                      }}>
                      <IconTamAS />
                      <Text
                        style={{
                          color: '#5c5c5c',
                          fontSize: 10,
                          fontFamily: 'Poppins-Medium',
                          textAlign: 'center',
                        }}>
                        Keuangan Anak
                      </Text>
                    </View>
                  </TouchableNativeFeedback>
                </View>
              </View>

              <View>
                <View
                  style={{
                    marginHorizontal: 20,
                    top: '-5%',
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      alignSelf: 'center',
                      width: '100%',
                      height: 100,
                      marginTop: 10,
                      backgroundColor: '#fff',
                      paddingHorizontal: '4%',
                      shadowColor: '#858585',
                      shadowRadius: 15,
                      elevation: 6,
                      shadowOpacity: '25%',
                      marginBottom: 10,
                      borderRadius: 10,
                      paddingHorizontal: '4%',
                    }}>
                    <View>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}>
                        <Text
                          style={{ fontSize: 14, fontFamily: 'Poppins-Medium' }}>
                          Jumlah Tutor
                        </Text>
                        <PanahKanan style={{}} />
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          aligntItems: 'center',
                          top: '7%',
                          justifyContent: 'space-between',
                        }}>
                        <Contoh />
                        <Text
                          style={{
                            fontSize: 25,
                            marginHorizontal: '5%',
                            fontFamily: 'Poppins-Reguler',
                          }}>
                          46
                        </Text>
                        <Text
                          style={{
                            top: '4%',
                            fontSize: 16,
                            fontFamily: 'Poppins-Medium',
                          }}>
                          Orang
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>

                <View
                  style={{
                    marginHorizontal: 20,
                    top: '-5%',
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      alignSelf: 'center',
                      width: '100%',
                      height: 100,
                      marginTop: 10,
                      backgroundColor: '#fff',
                      paddingHorizontal: '4%',
                      shadowColor: '#858585',
                      shadowRadius: 15,
                      elevation: 6,
                      shadowOpacity: '25%',
                      marginBottom: 10,
                      borderRadius: 10,
                      paddingHorizontal: '4%',
                    }}>
                    <View style={{ flexDirection: 'column' }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}>
                        <Text
                          style={{ fontSize: 14, fontFamily: 'Poppins-Medium' }}>
                          Jumlah Pengelola
                        </Text>
                        <PanahKanan style={{}} />
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          aligntItems: 'center',
                          top: '7%',
                          justifyContent: 'space-between',
                        }}>
                        <Contoh />
                        <Text
                          style={{
                            fontSize: 25,
                            marginHorizontal: '5%',
                            fontFamily: 'Poppins-Reguler',
                          }}>
                          123
                        </Text>
                        <Text
                          style={{
                            top: '4%',
                            fontSize: 16,
                            fontFamily: 'Poppins-Medium',
                          }}>
                          Orang
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>

                <View
                  style={{
                    marginHorizontal: 20,
                    top: '-5%',
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      alignSelf: 'center',
                      width: '100%',
                      height: 100,
                      backgroundColor: '#fff',
                      paddingHorizontal: '4%',
                      shadowColor: '#858585',
                      shadowRadius: 15,
                      elevation: 6,
                      shadowOpacity: '25%',
                      marginBottom: 10,
                      borderRadius: 10,
                    }}>
                    <View style={{ flexDirection: 'column' }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}>
                        <Text
                          style={{ fontSize: 14, fontFamily: 'Poppins-Medium' }}>
                          Jumlah Donatur
                        </Text>
                        <PanahKanan style={{}} />
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          aligntItems: 'center',
                          top: '7%',
                          justifyContent: 'space-between',
                        }}>
                        <Contoh />
                        <Text
                          style={{
                            fontSize: 25,
                            marginHorizontal: '5%',
                            fontFamily: 'Poppins-Reguler',
                          }}>
                          270
                        </Text>
                        <Text
                          style={{
                            top: '4%',
                            fontSize: 16,
                            fontFamily: 'Poppins-Medium',
                          }}>
                          Orang
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>

                <View
                  style={{
                    marginHorizontal: 20,
                    top: '-5%',
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      alignSelf: 'center',
                      width: '100%',
                      height: 100,
                      marginTop: 10,
                      backgroundColor: '#fff',
                      paddingHorizontal: '4%',
                      shadowColor: '#858585',
                      shadowRadius: 15,
                      elevation: 6,
                      shadowOpacity: '25%',
                      marginBottom: 10,
                      borderRadius: 10,
                      paddingHorizontal: '4%',
                    }}>
                    <View style={{ flexDirection: 'column' }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}>
                        <Text
                          style={{ fontSize: 14, fontFamily: 'Poppins-Medium' }}>
                          Jumlah Anak Asuh
                        </Text>
                        <PanahKanan style={{}} />
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          aligntItems: 'center',
                          top: '7%',
                          justifyContent: 'space-between',
                        }}>
                        <Contoh />
                        <Text
                          style={{
                            fontSize: 25,
                            marginHorizontal: '5%',
                            fontFamily: 'Poppins-Reguler',
                          }}>
                          304
                        </Text>
                        <Text
                          style={{
                            top: '4%',
                            fontSize: 16,
                            fontFamily: 'Poppins-Medium',
                          }}>
                          Orang
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          ) : (
            <View />
          )
        }

        {
          this.props.user.presensi === 'karyawan' ? ( //admin pusat//
            <View
              style={{ backgroundColor: '#fff', flex: 1 }}
              showsVerticalScrollIndicator={true}>
              <View
                style={{ backgroundColor: '#00A9B8', height: 130, width: '100%' }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignContent: 'space-between',
                  }}>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: 'bold',
                      color: '#ffffff',
                      marginLeft: 10,
                      marginTop: 10,
                    }}>
                    Hallo,{this.props.user.name}
                  </Text>
                  <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('testface')}>
                    <Image
                      style={{ marginRight: 20, marginTop: 10 }}
                      source={bell}></Image>
                  </TouchableOpacity>
                </View>
              </View>

              <View
                style={{
                  top: '-7%',
                  alignSelf: 'center',
                  backgroundColor: '#fff',
                  width: '90%',
                  height: '15%',
                  borderRadius: 10,
                  paddingVertical: '2%',
                  paddingHorizontal: '4%',
                  shadowColor: '#858585',
                  shadowRadius: 15,
                  elevation: 6,
                  shadowOpacity: '25%',
                }}>
                <View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <TouchableNativeFeedback
                      onPress={() =>
                        this.props.navigation.navigate('pendidikan')
                      }>
                      <View
                        style={{
                          flexDirection: 'column',
                          width: '20%',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        {tidakaktif === 0 || jmlpegajuan === 0 ? (
                          <View />
                        ) : tidakaktif < 100 || jmlpegajuan < 100 ? (
                          <View
                            style={{
                              // marginTop: 0, marginRight: 10,
                              position: 'absolute',
                              top: -2,
                              right: 3,
                              backgroundColor: 'red',
                              padding: 5,
                              justifyContent: 'center',
                              borderRadius: 30,
                              height: 25,
                            }}>
                            <Text
                              style={{
                                fontSize: 11,
                                justifyContent: 'center',
                                alignSelf: 'center',
                                marginTop: -2,
                                color: '#fff',
                                fontWeight: 'bold',
                              }}>
                              {tidakaktif.length + jmlpegajuan.length}
                            </Text>
                          </View>
                        ) : (
                          <View
                            style={{
                              // marginTop: 0, marginRight: 10,
                              position: 'absolute',
                              top: -4,
                              right: 3,
                              backgroundColor: 'red',
                              padding: 5,
                              justifyContent: 'center',
                              borderRadius: 30,
                              height: 25,
                            }}>
                            <Text
                              style={{
                                fontSize: 11,
                                justifyContent: 'center',
                                alignSelf: 'center',
                                marginTop: -2,
                                color: '#fff',
                                fontWeight: 'bold',
                              }}>
                              {tidakaktif.length + jmlpegajuan.length}
                            </Text>
                          </View>
                        )}

                        <IconTamAS />
                        <Text
                          style={{
                            color: '#5c5c5c',
                            fontSize: 10,
                            fontFamily: 'Poppins-Medium',
                            textAlign: 'center',
                          }}>
                          Pendidikan
                        </Text>
                      </View>
                    </TouchableNativeFeedback>

                    {/* <TouchableNativeFeedback onPress={() => this.props.navigation.navigate('Tutor')}>
                                            <View style={{ flexDirection: 'column', width: '20%', justifyContent: 'center', alignItems: 'center' }}>
                                                <IconTamTutor />
                                                <Text style={{ color: '#5c5c5c', fontSize: 10, fontFamily: 'Poppins-Medium', textAlign: 'center' }}>Pengelola dan Tutor</Text>
                                            </View>
                                        </TouchableNativeFeedback> */}

                    <TouchableNativeFeedback
                      onPress={() =>
                        this.props.navigation.navigate('DataDataKel', {
                          belummasuk: belummasuk.length,
                        })
                      }>
                      <View
                        style={{
                          flexDirection: 'column',
                          width: '20%',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        {belummasuk === 0 ? (
                          <View />
                        ) : belummasuk < 100 ? (
                          <View
                            style={{
                              // marginTop: 0, marginRight: 10,
                              position: 'absolute',
                              top: -2,
                              right: 3,
                              backgroundColor: 'red',
                              padding: 5,
                              justifyContent: 'center',
                              borderRadius: 30,
                            }}>
                            <Text
                              style={{
                                fontSize: 11,
                                justifyContent: 'center',
                                alignSelf: 'center',
                                marginTop: -2,
                                color: '#fff',
                                fontWeight: 'bold',
                              }}>
                              {belummasuk.length}
                            </Text>
                          </View>
                        ) : (
                          <View
                            style={{
                              // marginTop: 0, marginRight: 10,
                              position: 'absolute',
                              top: -4,
                              right: 3,
                              backgroundColor: 'red',
                              padding: 5,
                              justifyContent: 'center',
                              borderRadius: 30,
                              height: 30,
                            }}>
                            <Text
                              style={{
                                fontSize: 9,
                                justifyContent: 'center',
                                alignSelf: 'center',
                                marginTop: -2,
                                color: '#fff',
                                fontWeight: 'bold',
                              }}>
                              {belummasuk.length}
                            </Text>
                          </View>
                        )}
                        <IconTamAS />
                        <Text
                          style={{
                            color: '#5c5c5c',
                            fontSize: 10,
                            fontFamily: 'Poppins-Medium',
                            textAlign: 'center',
                          }}>
                          Data Keluarga{' '}
                        </Text>
                      </View>
                    </TouchableNativeFeedback>

                    <TouchableNativeFeedback
                      onPress={() => this.props.navigation.navigate('Master')}>
                      <View
                        style={{
                          flexDirection: 'column',
                          width: '20%',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <IconTamAS />
                        <Text
                          style={{
                            color: '#5c5c5c',
                            fontSize: 10,
                            fontFamily: 'Poppins-Medium',
                            textAlign: 'center',
                          }}>
                          Setting
                        </Text>
                      </View>
                    </TouchableNativeFeedback>

                    <TouchableNativeFeedback
                      onPress={() => this.props.navigation.navigate('Akun')}>
                      <View
                        style={{
                          flexDirection: 'column',
                          width: '20%',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <IconTamAS />
                        <Text
                          style={{
                            color: '#5c5c5c',
                            fontSize: 10,
                            fontFamily: 'Poppins-Medium',
                            textAlign: 'center',
                          }}>
                          Akun
                        </Text>
                      </View>
                    </TouchableNativeFeedback>
                  </View>
                </View>
              </View>


              {/* <View style={{ flexDirection: 'row', marginHorizontal: 10, marginTop: '-10%' }}>

        <View style={[style.kotakbtn, {
          marginHorizontal: 5,
          backgroundColor: this.state.anak === false ? '#fff' : '#0EBEDF',
          borderColor: this.state.anak === false ? '#bdbdbd' : '#fff',
          padding: 8, borderRadius: 5
        }]}>
          <TouchableOpacity onPress={() => this.setState({ anak: !this.state.anak, donat: false, dettut: false, detpengel: false })}>
            <Text style={{ color: this.state.anak === false ? '#bdbdbd' : '#fff', textAlign: 'center', }}>Anak</Text>
          </TouchableOpacity>
        </View>

        <View style={[style.kotakbtn, {
          marginHorizontal: 5,
          backgroundColor: this.state.donat === false ? '#fff' : '#0EBEDF',
          borderColor: this.state.donat === false ? '#bdbdbd' : '#fff',
          padding: 8, borderRadius: 5
        }]}>
          <TouchableOpacity onPress={() => this.setState({ donat: !this.state.donat, anak: false, dettut: false, detpengel: false })}>
            <Text style={{ color: this.state.donat === false ? '#bdbdbd' : '#fff', textAlign: 'center', }}>Donatur</Text>
          </TouchableOpacity>
        </View>

        <View style={[style.kotakbtn, {
          marginHorizontal: 5,
          backgroundColor: this.state.dettut === false ? '#fff' : '#0EBEDF',
          borderColor: this.state.dettut === false ? '#bdbdbd' : '#fff',
          padding: 8, borderRadius: 5
        }]}>
          <TouchableOpacity onPress={() => this.setState({ dettut: !this.state.dettut, anak: false, donat: false, detpengel: false })}>
            <Text style={{ color: this.state.dettut === false ? '#bdbdbd' : '#fff', textAlign: 'center', }}>Tutor</Text>
          </TouchableOpacity>
        </View>

        <View style={[style.kotakbtn, {
          marginHorizontal: 5,
          backgroundColor: this.state.detpengel === false ? '#fff' : '#0EBEDF',
          borderColor: this.state.detpengel === false ? '#bdbdbd' : '#fff',
          padding: 8, borderRadius: 5
        }]}>
          <TouchableOpacity onPress={() => this.setState({ detpengel: !this.state.detpengel, anak: false, donat: false, dettut: false })}>
            <Text style={{ color: this.state.detpengel === false ? '#bdbdbd' : '#fff', textAlign: 'center', }}>Pengelola</Text>
          </TouchableOpacity>
        </View>
      </View>
      {this.state.anak === true ?
        <View horizontal={true}>
          <Text style={style.labelkiri}>Jumlah Anak</Text>
          <BarChart
            data={chartData}
            width={Dimensions.get("window")}
            height={220}
            chartConfig={{
              paddingRight: 0,
              paddingTop: 0,
              backgroundGradientFrom: '#fff',
              backgroundGradientFromOpacity: 1,
              backgroundGradientTo: '#fff',
              backgroundGradientToOpacity: 1,
              horizontalOffset: 0,
              fillShadowGradientFromOpacity: 1,
              fillShadowGradientToOpacity: 1,
              fillShadowGradientOpacity: 1,
              fillShadowGradientTo: '#00BFFF',
              fillShadowGradientFrom: '#1E90FF',
              fillShadowGradientFromOffset: 0.1,
              fillShadowGradientToOffset: 0.7,
              color: (opacity = 1) => `#023047`,
              labelColor: (opacity = 1) => `#333`,
              strokeWidth: 2,
              useShadowColorFromDataset: false,
              decimalPlaces: 0,

            }}
            style={{
              paddingRight: 0,
              paddingLeft: 0,
              paddingBottom: 0,
              alignItems: 'center',
              alignSelf: 'center'

            }}
            showValuesOnTopOfBars={true}
            fromZero
            withHorizontalLabels={false}
            withVerticalLabels={true}
            xLabelsOffset={0}
            showBarTops={false}
            yLabelsOffset={0}
            withInnerLines={false}
            yAxisLabel={''}
            xAxisLabel={''}
            valueOnTopOfBarOffsetY={-3}
            yAxisSuffix=""
          />
        </View>
        : <View />
      } */}

              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 20, marginTop: "-10%" }}>
                <TouchableOpacity style={{
                  width: '46%',
                  backgroundColor: '#00A9B8',
                  height: 150,
                  paddingHorizontal: '4%',
                  shadowColor: '#858585',
                  shadowRadius: 15,
                  elevation: 6,
                  shadowOpacity: '25%',
                  marginBottom: 10,
                  borderRadius: 10,
                  paddingHorizontal: '4%',
                }}
                  onPress={() => this.props.navigation.navigate('List_Anak_Binaan')}>
                  <View >
                    <Text style={{ color: '#fff', fontSize: 16 }}> Jumlah Anak:</Text>
                    <Text style={{
                      fontSize: 36, fontWeight: 'bold',
                      color: '#fff', justifyContent: 'center', alignSelf: 'center',
                      alignContent: 'center', alignItems: 'center', marginTop: 30
                    }}> {jumlahanak.length}</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('List_donatur')} style={{
                    width: '46%',
                    backgroundColor: '#00A9B8',
                    height: 150,
                    paddingHorizontal: '4%',
                    shadowColor: '#858585',
                    shadowRadius: 15,
                    elevation: 6,
                    shadowOpacity: '25%',
                    marginBottom: 10,
                    borderRadius: 10,
                    paddingHorizontal: '4%',
                  }}>
                  <View >
                    <Text style={{ color: '#fff', fontSize: 16 }}> Jumlah Donatur:</Text>
                    <Text style={{
                      fontSize: 36, fontWeight: 'bold',
                      color: '#fff', justifyContent: 'center', alignSelf: 'center',
                      alignContent: 'center', alignItems: 'center', marginTop: 30
                    }}> {jmldonatur.length}</Text>
                  </View>
                </TouchableOpacity>

              </View>
              {/* <ScrollView>
              <View>
                <View
                  style={{
                    marginHorizontal: 20,
                    top: '-5%',
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      alignSelf: 'center',
                      width: '100%',
                      height: 100,
                      marginTop: 10,
                      backgroundColor: '#fff',
                      paddingHorizontal: '4%',
                      shadowColor: '#858585',
                      shadowRadius: 15,
                      elevation: 6,
                      shadowOpacity: '25%',
                      marginBottom: 10,
                      borderRadius: 10,
                      paddingHorizontal: '4%',
                    }}>
                    <View>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}>
                        <Text
                          style={{ fontSize: 14, fontFamily: 'Poppins-Medium' }}>
                          Jumlah Tutor
                        </Text>
                        <PanahKanan style={{}} />
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          aligntItems: 'center',
                          top: '7%',
                          justifyContent: 'space-between',
                        }}>
                        <Contoh />
                        <Text
                          style={{
                            fontSize: 25,
                            marginHorizontal: '5%',
                            fontFamily: 'Poppins-Reguler',
                          }}>
                          46
                        </Text>
                        <Text
                          style={{
                            top: '4%',
                            fontSize: 16,
                            fontFamily: 'Poppins-Medium',
                          }}>
                          Orang
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>

                <View
                  style={{
                    marginHorizontal: 20,
                    top: '-5%',
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      alignSelf: 'center',
                      width: '100%',
                      height: 100,
                      marginTop: 10,
                      backgroundColor: '#fff',
                      paddingHorizontal: '4%',
                      shadowColor: '#858585',
                      shadowRadius: 15,
                      elevation: 6,
                      shadowOpacity: '25%',
                      marginBottom: 10,
                      borderRadius: 10,
                      paddingHorizontal: '4%',
                    }}>
                    <View style={{ flexDirection: 'column' }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}>
                        <Text
                          style={{ fontSize: 14, fontFamily: 'Poppins-Medium' }}>
                          Jumlah Pengelola
                        </Text>
                        <PanahKanan style={{}} />
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          aligntItems: 'center',
                          top: '7%',
                          justifyContent: 'space-between',
                        }}>
                        <Contoh />
                        <Text
                          style={{
                            fontSize: 25,
                            marginHorizontal: '5%',
                            fontFamily: 'Poppins-Reguler',
                          }}>
                          {jumlahlola}
                        </Text>
                        <Text
                          style={{
                            top: '4%',
                            fontSize: 16,
                            fontFamily: 'Poppins-Medium',
                          }}>
                          Orang
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>

                <View
                  style={{
                    marginHorizontal: 20,
                    top: '-5%',
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      alignSelf: 'center',
                      width: '100%',
                      height: 100,
                      backgroundColor: '#fff',
                      paddingHorizontal: '4%',
                      shadowColor: '#858585',
                      shadowRadius: 15,
                      elevation: 6,
                      shadowOpacity: '25%',
                      marginBottom: 10,
                      borderRadius: 10,
                    }}>
                    <View style={{ flexDirection: 'column' }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}>
                        <Text
                          style={{ fontSize: 14, fontFamily: 'Poppins-Medium' }}>
                          Jumlah Donatur
                        </Text>
                        <PanahKanan style={{}} />
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          aligntItems: 'center',
                          top: '7%',
                          justifyContent: 'space-between',
                        }}>
                        <Contoh />
                        <Text
                          style={{
                            fontSize: 25,
                            marginHorizontal: '5%',
                            fontFamily: 'Poppins-Reguler',
                          }}>
                          270
                        </Text>
                        <Text
                          style={{
                            top: '4%',
                            fontSize: 16,
                            fontFamily: 'Poppins-Medium',
                          }}>
                          Orang
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>

                <View
                  style={{
                    marginHorizontal: 20,
                    top: '-5%',
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      alignSelf: 'center',
                      width: '100%',
                      height: 100,
                      marginTop: 10,
                      backgroundColor: '#fff',
                      paddingHorizontal: '4%',
                      shadowColor: '#858585',
                      shadowRadius: 15,
                      elevation: 6,
                      shadowOpacity: '25%',
                      marginBottom: 10,
                      borderRadius: 10,
                      paddingHorizontal: '4%',
                    }}>
                    <View style={{ flexDirection: 'column' }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}>
                        <Text
                          style={{ fontSize: 14, fontFamily: 'Poppins-Medium' }}>
                          Jumlah Anak Asuh
                        </Text>
                        <PanahKanan style={{}} />
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          aligntItems: 'center',
                          top: '7%',
                          justifyContent: 'space-between',
                        }}>
                        <Contoh />
                        <Text
                          style={{
                            fontSize: 25,
                            marginHorizontal: '5%',
                            fontFamily: 'Poppins-Reguler',
                          }}>
                          {jumlahanak.length}
                        </Text>
                        <Text
                          style={{
                            top: '4%',
                            fontSize: 16,
                            fontFamily: 'Poppins-Medium',
                          }}>
                          Orang
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>

                <View
                  style={{
                    marginHorizontal: 20,
                    top: '-5%',
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      alignSelf: 'center',
                      width: '100%',
                      height: 100,
                      marginTop: 10,
                      backgroundColor: '#fff',
                      paddingHorizontal: '4%',
                      shadowColor: '#858585',
                      shadowRadius: 15,
                      elevation: 6,
                      shadowOpacity: '25%',
                      marginBottom: 10,
                      borderRadius: 10,
                      paddingHorizontal: '4%',
                    }}>
                    <View style={{ flexDirection: 'column' }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}>
                        <Text
                          style={{ fontSize: 14, fontFamily: 'Poppins-Medium' }}>
                          Jumlah Admin Cabang
                        </Text>
                        <PanahKanan style={{}} />
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          aligntItems: 'center',
                          top: '7%',
                          justifyContent: 'space-between',
                        }}>
                        <Contoh />
                        <Text
                          style={{
                            fontSize: 25,
                            marginHorizontal: '5%',
                            fontFamily: 'Poppins-Reguler',
                          }}>
                          {jumlahadmcabang}
                        </Text>
                        <Text
                          style={{
                            top: '4%',
                            fontSize: 16,
                            fontFamily: 'Poppins-Medium',
                          }}>
                          Orang
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </ScrollView> */}


              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 20 }}>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('Tutor')} style={{
                    width: '46%',
                    backgroundColor: '#00A9B8',
                    height: 150,
                    paddingHorizontal: '4%',
                    shadowColor: '#858585',
                    shadowRadius: 15,
                    elevation: 6,
                    shadowOpacity: '25%',
                    marginBottom: 10,
                    borderRadius: 10,
                    paddingHorizontal: '4%',
                  }}>
                  <View>
                    <Text style={{ color: '#fff', fontSize: 16 }}> Jumlah Tutor:</Text>
                    <Text style={{
                      fontSize: 36, fontWeight: 'bold',
                      color: '#fff', justifyContent: 'center', alignSelf: 'center',
                      alignContent: 'center', alignItems: 'center', marginTop: 30
                    }}> {jmldonatur.length}</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Tutor')} style={{
                  width: '46%',
                  backgroundColor: '#00A9B8',
                  height: 150,
                  paddingHorizontal: '4%',
                  shadowColor: '#858585',
                  shadowRadius: 15,
                  elevation: 6,
                  shadowOpacity: '25%',
                  marginBottom: 10,
                  borderRadius: 10,
                  paddingHorizontal: '4%',
                }}>
                  <View >
                    <Text style={{ color: '#fff', fontSize: 16 }}> Jumlah Pengelola:</Text>
                    <Text style={{
                      fontSize: 36, fontWeight: 'bold',
                      color: '#fff', justifyContent: 'center', alignSelf: 'center',
                      alignContent: 'center', alignItems: 'center', marginTop: 30
                    }}> {jumlahpengelola.length}</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <View />
          )
        }
        <Modal
          animationType={'fade'}
          transparent={true}
          visible={this.state.modalpesan}
          onRequestClose={() => {
            console.log('Modal has been closed.');
          }}>
          <SafeAreaView
            style={{
              backgroundColor: '#ffffff',
              alignItems: 'center',
              justifyContent: 'center',
              alignContent: 'center',
            }}>
            <TouchableOpacity
              activeOpacity={1.0}
              onPress={() => this.setState({ modalpesan: false })}
              style={style.ModalCont}>
              <View
                style={{
                  paddingTop: 5,
                  marginHorizontal: 10,
                  marginTop: 500,
                  backgroundColor: '#ffffff',
                  borderRadius: 20,
                  height: 250,
                  width: 250,
                  shadowColor: '#333',
                  shadowOffset: {
                    width: 1,
                    height: 1,
                  },
                  shadowOpacity: 0.3,
                  shadowRadius: 2,
                  elevation: 3,
                  alignItems: 'center',
                  flexDirection: 'row',
                }}>
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate(
                      'Home',
                      this.setState({ modalpesan: false }),
                    )
                  }
                  style={{ position: 'absolute', right: 20, top: 20 }}>
                  <Image
                    source={x}
                    style={{
                      height: 30,
                      width: 30,
                      alignItems: 'center',
                    }}></Image>
                </TouchableOpacity>

                <SafeAreaView style={{ marginLeft: 60 }}>
                  <TouchableOpacity onPress={() => this.openWhatsApp()}>
                    <View style={style.form}>
                      <Image source={WA} style={style.logo}></Image>
                      <Text
                        style={{
                          fontSize: 14,
                          fontWeight: 'bold',
                          marginVertical: 5,
                          marginLeft: 20,
                          width: 100,
                          color: '#000',
                        }}>
                        WhatsApp
                      </Text>
                    </View>
                  </TouchableOpacity>
                </SafeAreaView>
              </View>
            </TouchableOpacity>
          </SafeAreaView>
        </Modal>

        {/* BOTOM Nav */}
        {
          this.props.user.presensi === 'admin' ? ( //ini nanti dipakai untuk admin cabang cabang //
            <View style={style.botomnav}>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('DataKelshel')}>
                <View style={{ flexDirection: 'column', marginTop: 5 }}>
                  <Dashboard
                    style={{
                      justifyContent: 'center',
                      alignContent: 'center',
                      alignItems: 'center',
                      alignSelf: 'center',
                    }}
                  />
                  <Text style={{ marginTop: 5 }}>Kelompok</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('ListPengajuan')}>
                <View style={{ flexDirection: 'column', marginTop: 5 }}>
                  <Banyakanak
                    style={{
                      justifyContent: 'center',
                      alignContent: 'center',
                      alignItems: 'center',
                      alignSelf: 'center',
                    }}
                  />
                  <Text>Pengajuan Dana</Text>
                </View>
              </TouchableOpacity>



              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('PengajuanAnak')}>
                <View style={{ flexDirection: 'column', marginTop: 5 }}>
                  <Kidsabukecil
                    style={{
                      justifyContent: 'center',
                      alignContent: 'center',
                      alignItems: 'center',
                      alignSelf: 'center',
                    }}
                  />
                  <Text>Pengajuan Anak</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Akun')}>
                <View style={{ flexDirection: 'column', marginTop: 5 }}>
                  <Profil2
                    style={{
                      justifyContent: 'center',
                      alignContent: 'center',
                      alignItems: 'center',
                      alignSelf: 'center',
                    }}
                  />
                  <Text>Profil</Text>
                </View>
              </TouchableOpacity>
            </View>
          ) : (
            <View />
          )
        }



        {/* {this.props.user.presensi === 'karyawan' ? //ini nanti dipakai untuk admin pusat //
                    <View style={style.botomnav}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Home')}>
                            <View style={{ flexDirection: 'column', marginTop: 5 }}>
                                <Dashboard style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center', alignSelf: 'center' }} />
                                <Text style={{ marginTop: 5 }}>Home</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => this.props.navigation.navigate('ListPengajuan')}>
                            <View style={{ flexDirection: 'column', marginTop: 5 }}>
                                <Banyakanak style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center', alignSelf: 'center' }} />
                                <Text>Pengajuan Dana</Text>
                            </View>
                        </TouchableOpacity  >

                    

                        <TouchableOpacity onPress={() => this.props.navigation.navigate('PengajuanAnak')}>
                            <View style={{ flexDirection: 'column', marginTop: 5 }}>
                                <Kidsabukecil style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center', alignSelf: 'center' }} />
                                <Text>Pengajuan Anak</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Akun')}>
                            <View style={{ flexDirection: 'column', marginTop: 5 }}>
                                <Profil2 style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center', alignSelf: 'center' }} />
                                <Text>Profil</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    :
                    <View />
                } */}
        {
          this.props.user.presensi === 'karyawan' ? ( //ini nanti dipakai untuk pengelola//
            <View style={style.botomnav}>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Home')}>
                <View style={{ flexDirection: 'column', marginTop: 5 }}>
                  <Dashboard
                    style={{
                      justifyContent: 'center',
                      alignContent: 'center',
                      alignItems: 'center',
                      alignSelf: 'center',
                    }}
                  />
                  <Text style={{ marginTop: 5 }}>Dashboard</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Tutor')}>
                <View style={{ flexDirection: 'column', marginTop: 5 }}>
                  <Banyakanak
                    style={{
                      justifyContent: 'center',
                      alignContent: 'center',
                      alignItems: 'center',
                      alignSelf: 'center',
                    }}
                  />
                  <Text>Tutor</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Kegiatan')}
                style={{
                  justifyContent: 'center',
                  alignSelf: 'center',
                  top: '-5%',
                }}>
                <Plusbaru></Plusbaru>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate('List_Anak_Binaan')
                }>
                <View style={{ flexDirection: 'column', marginTop: 5 }}>
                  <Kidsabukecil
                    style={{
                      justifyContent: 'center',
                      alignContent: 'center',
                      alignItems: 'center',
                      alignSelf: 'center',
                    }}
                  />
                  <Text>Anak Binaan</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Akun')}>
                <View style={{ flexDirection: 'column', marginTop: 5 }}>
                  <Profil2
                    style={{
                      justifyContent: 'center',
                      alignContent: 'center',
                      alignItems: 'center',
                      alignSelf: 'center',
                    }}
                  />
                  <Text>Profil</Text>
                </View>
              </TouchableOpacity>
            </View>
          ) : (
            <View />
          )
        }
        {
          this.props.user.presensi === '' ? ( //ini nanti dipakai untuk tutor//
            <View style={style.botomnav}>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Home')}>
                <View style={{ flexDirection: 'column', marginTop: 5 }}>
                  <Dashboard
                    style={{
                      justifyContent: 'center',
                      alignContent: 'center',
                      alignItems: 'center',
                      alignSelf: 'center',
                    }}
                  />
                  <Text style={{ marginTop: 5 }}>Dashboard</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Tutor')}>
                <View style={{ flexDirection: 'column', marginTop: 5 }}>
                  <Banyakanak
                    style={{
                      justifyContent: 'center',
                      alignContent: 'center',
                      alignItems: 'center',
                      alignSelf: 'center',
                    }}
                  />
                  <Text>Tutor</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Kegiatan')}
                style={{
                  justifyContent: 'center',
                  alignSelf: 'center',
                  top: '-5%',
                }}>
                <Plusbaru></Plusbaru>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate('List_Anak_Binaan')
                }>
                <View style={{ flexDirection: 'column', marginTop: 5 }}>
                  <Kidsabukecil
                    style={{
                      justifyContent: 'center',
                      alignContent: 'center',
                      alignItems: 'center',
                      alignSelf: 'center',
                    }}
                  />
                  <Text>Anak Binaan</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Akun')}>
                <View style={{ flexDirection: 'column', marginTop: 5 }}>
                  <Profil2
                    style={{
                      justifyContent: 'center',
                      alignContent: 'center',
                      alignItems: 'center',
                      alignSelf: 'center',
                    }}
                  />
                  <Text>Profil</Text>
                </View>
              </TouchableOpacity>
            </View>
          ) : (
            <View />
          )
        }
        {
          this.props.user.presensi === 'donatur' ? ( //ini nanti dipakai untuk donatur//
            <View
              style={{
                flexDirection: 'row',
                backgroundColor: '#ffffff',
                justifyContent: 'space-between',
                paddingRight: 30,
                paddingLeft: 15,
                paddingVertical: 10,
                shadowColor: '#333',
                shadowOffset: {
                  width: 1,
                  height: 1,
                },
                shadowOpacity: 0.3,
                shadowRadius: 2,
                elevation: 3,
                borderTopLeftRadius: 15,
                borderTopRightRadius: 15,
                marginBottom: 20,
                height: 75,
                position: 'absolute',
                left: 0,
                right: 0,
                bottom: -20,
              }}>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Home')}
                style={style.bottom}>
                <IconRumahAktif />
                <Text
                  style={{
                    fontSize: 13,
                  }}>
                  Home
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Absen')}
                style={style.bottom}>
                <Aktifitas />
                <Text
                  style={{
                    fontSize: 13,
                  }}>
                  Aktifitas
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Bayar')}
                style={style.bottom}>
                <Wallet />
                <Text
                  style={{
                    fontSize: 13,
                  }}>
                  Bayar
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('List_anak')}
                style={style.bottom}>
                <Kids />
                <Text>Anak Asuh</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Akun')}
                style={style.bottom}>
                <Profil2 />
                <Text
                  style={{
                    fontSize: 13,
                  }}>
                  {' '}
                  Profil
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View />
          )
        }
      </View >
    );
  }
}
const style = StyleSheet.create({
  presensi: {
    flexDirection: 'column',
    borderRadius: 1,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.43,
    shadowRadius: 0.51,
    elevation: 5,
    bottom: 0,
    left: 0,
    right: 0,
    height: 75,
  },
  presensi1: {
    flexDirection: 'column',
    borderRadius: 1,
    width: '90%',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.43,
    shadowRadius: 9.51,
    elevation: 15,
    bottom: 0,
    left: 0,
    right: 0,
    height: 70,
    marginTop: 20,
    marginLeft: 20,
    borderRadius: 10,
  },
  example: {
    marginVertical: 10,
    flexDirection: 'row',
    marginLeft: 10,
    justifyContent: 'space-between',
  },
  example1: {
    flexDirection: 'row',
    marginLeft: 10,
    marginTop: -15,
    justifyContent: 'space-between',
  },
  logo4: {
    width: 75,
    height: 75,
    marginLeft: 10,
  },
  logo5: {
    width: 25,
    height: 25,
    marginLeft: 10,
  },
  logo3: {
    marginTop: 0,
    marginBottom: 10,
    marginLeft: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: 70,
    height: 70,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#333',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    backgroundColor: '#f2f2f2',
  },
  logo: {
    marginTop: 20,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
  },
  banner: {
    marginLeft: 30,
    width: 100,
    height: 120,
  },

  cardtop: {
    width: '90%',
    marginLeft: 20,
    marginTop: -60,
    borderRadius: 50,
    shadowColor: '#333',
    shadowOffset: {
      width: 1,
      height: 1,
    },
  },
  nama: {
    height: 50,
    width: '100%',
    flexDirection: 'row',
    borderRadius: 1,
    backgroundColor: '#0EBEDF',
  },

  foto: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: 7,
    alignItems: 'center',
    justifyContent: 'center',
    width: 30,
    height: 30,
    borderRadius: 50,
  },
  icons: {
    marginTop: 10,
    marginBottom: 10,
    paddingRight: 30,
  },
  icons2: {
    marginTop: 10,
    marginBottom: 10,
    paddingLeft: 30,
  },
  icons3: {
    marginTop: 10,
    marginBottom: 10,
    paddingLeft: 30,
  },

  grouptop: {
    marginTop: -10,
    marginLeft: 5,
    border: 1,
  },
  texttop: {
    fontSize: 12,
    color: '#000',
    marginTop: 0,
  },
  texttop1: {
    fontSize: 12,
    color: '#fff',
    marginTop: 15,
  },

  texttop2: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    width: '100%',
    marginTop: -5,
    flexDirection: 'row',
  },
  texttop3: {
    fontSize: 12,
    color: '#353739',
    paddingLeft: 30,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  texttop4: {
    fontSize: 12,
    color: '#000',
    paddingLeft: 30,
    marginBottom: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  texttop5: {
    fontSize: 16,
    color: '#353739',
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  boxtop: {
    flex: 1,
    borderRadius: 10,
    width: '80%',
    padding: 20,
    color: '#51C9C2',
    padding: 5,
    marginRight: 20,
    marginLeft: 20,
  },
  button: {
    marginTop: 10,
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    width: '30%',
    justifyContent: 'center',
  },
  countContainer: {
    color: '#000000',
    alignItems: 'center',
    padding: 5,
    justifyContent: 'center',
  },
  input: {
    color: '#000000',
    height: 100,
    borderRadius: 5,
  },
  Textinputcss: {
    borderRadius: 5,
    borderWidth: 1,
    marginLeft: 10,
    marginRight: 10,
    height: 100,
    color: '#000000',
    borderColor: '#000000',
  },
  kotak1: {
    marginLeft: 30,
    marginTop: 10,
    marginRight: 10,
    borderRadius: 5,
    borderWidth: 1,
    height: 100,
    width: 300,
    padding: 20,
    color: '#000000',
  },
  kotak2: {
    color: '#000000',
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 5,
    borderWidth: 1,
    fontSize: 12,
    height: 52,
    width: 300,
    padding: 20,
    borderColor: '#000000',
  },
  Label: {
    padding: 5,
    color: '#000000',
    marginTop: -10,
    fontSize: 7,
  },
  Labelbaru: {
    fontSize: 16,
    color: '#fff',
  },
  angka: {
    fontSize: 22,
    color: '#fff',
  },
  contentContainer: {
    backgroundColor: '#DDDDDD',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
  },
  tmblogout: {
    backgroundColor: '#0EBEDF',
    borderRadius: 10,
    fontSize: 12,
    width: 90,
    height: 30,
    paddingLeft: 25,
    marginHorizontal: 20,
    marginTop: 10,
  },
  tmbl: {
    backgroundColor: '#0EBEDF',
    borderRadius: 10,
    fontSize: 12,
    width: 90,
    height: 40,
    paddingLeft: 25,
    marginHorizontal: 20,
    marginTop: 10,
  },

  cardtop2: {
    width: '80%',
    height: '50%',
    height: 150,
    alignItems: 'center',
    marginLeft: 60,
  },
  texttime: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textdate: {
    fontSize: 14,
    color: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  kotak3: {
    shadowColor: '#333',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ModalCont2: {
    flex: 1,
    // alignItems: 'center',
    backgroundColor: '#00000079',
  },

  groupdatetime: {
    marginTop: 30,
    justifyContent: 'center',
    alignContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginLeft: -50,
  },

  ModalCont: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#00000099',
    paddingHorizontal: 10,
  },
  wrap: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height * 0.25, // 25% window
  },
  itemflatbaru: {
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
  itemflat: {
    fontSize: 16,
    flexDirection: 'column',
    marginVertical: 8,
    borderColor: '#7e7e7e',
  },

  itemflat1: {
    fontSize: 16,
    flexDirection: 'column',
    backgroundColor: '#fff',
    marginVertical: 8,
    shadowColor: '#333',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    borderColor: '#7e7e7e',
    elevation: 1,
  },
  itemflat2: {
    fontSize: 12,
    height: 100,
    width: '30%',
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
    elevation: 1,
  },
  btnSimpanUn: {
    width: '100%',
    fontWeight: 'bold',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    textAlign: 'center',
    fontWeight: 'bold',
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
    marginLeft: 20,
    fontWeight: 'bold',
  },
  btnSimpanUn2: {
    flexDirection: 'row',
    width: '80%',
    height: 100,
    borderRadius: 10,
    borderWidth: 1,
    marginLeft: 50,
    marginTop: 10,
    borderColor: '#E9E9E9',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    textAlign: 'center',
    backgroundColor: '#FFD700',
  },
  innerProgressCompleted: {
    height: 10,
    backgroundColor: '#0EBEDF',
  },
  innerProgressRemaining: {
    height: 10,
    backgroundColor: '#f2f2f2',
  },
  controls: {
    backgroundColor: 'transparent',
    borderRadius: 5,
    position: 'absolute',
    bottom: -5,
    left: 10,
    right: 10,
  },
  generalControls: {
    flex: 1,
    flexDirection: 'row',
    borderRadius: 4,
    overflow: 'hidden',
    paddingBottom: 10,
  },
  trackingControls: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  progress: {
    flex: 1,
    flexDirection: 'row',
    borderRadius: 3,
    overflow: 'hidden',
  },
  wrap: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height * 0.25, // 25% window
  },
  detail: {
    justifyContent: 'center',
    textAlign: 'center',
    margin: 20,
  },
  detail1: {
    justifyContent: 'space-evenly',
    flexDirection: 'row',
  },
  home: {
    justifyContent: 'center',
    textAlign: 'center',
    flexDirection: 'row',
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
  kotakbaru: {
    shadowColor: '#333',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 3,
    width: 350,
    height: 132,
    borderRadius: 20,
    borderWidth: 1,
    marginLeft: 20,
    marginTop: -50,
    borderColor: '#E9E9E9',
    justifyContent: 'center',
    textAlign: 'center',
    backgroundColor: '#fff',
  },
  kotakbaru1: {
    shadowColor: '#333',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 3,
    width: '90%',
    height: 100,
    borderRadius: 15,
    borderWidth: 1,
    marginLeft: 20,
    marginTop: 10,
    borderColor: '#E9E9E9',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  kotakbaru2: {
    shadowColor: '#333',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 3,
    width: 350,
    height: 150,
    borderRadius: 15,
    borderWidth: 1,
    marginLeft: 20,
    marginTop: 10,
    borderColor: '#E9E9E9',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  kotakbaru3: {
    shadowColor: '#333',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 3,
    width: 250,
    height: 100,
    borderRadius: 15,
    borderWidth: 1,
    marginTop: 10,
    marginHorizontal: 8,
    borderColor: '#E9E9E9',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  kotakbaru4: {
    shadowColor: '#333',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 3,
    width: windowWidth * 0.723,
    height: windowHeight * 0.2,
    borderRadius: 15,
    marginTop: 10,
    marginHorizontal: 8,
    borderColor: '#E9E9E9',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  Label1: {
    fontSize: 12,
    marginTop: 10,
  },
  Labeltgl: {
    marginTop: 5,
    position: 'absolute',
    top: 0,
    left: 10,
    right: 0,
    bottom: 0,
    height: 25,
    width: 25,
  },
  baca: {
    justifyContent: 'flex-end',
    marginLeft: 160,
    marginTop: 5,
    textAlign: 'center',
    height: 25,
    width: 50,
    backgroundColor: '#f2f2f2',
    shadowColor: '#333',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 0.1,
    borderRadius: 0.5,
    borderColor: '#7e7e7e',
  },
  itemText: {
    textAlign: 'justify',
    marginLeft: 10,
    fontSize: 10,
    width: '27%',
  },
  itemText1: {
    textAlign: 'justify',
    marginLeft: 10,
    fontSize: 12,
    width: '35%',
  },
  bottom: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    borderRadius: 15,
    paddingLeft: 15,
    paddingRight: 15,
  },
  contentContainer2: {
    backgroundColor: '#fff',
    flexDirection: 'column',
    width: '100%',
    flex: 1,
    height: windowHeight * 2,
  },
  itemflat3: {
    flex: 1,
    fontSize: 12,
    flexDirection: 'row',
    marginLeft: 20,
    padding: 10,
    backgroundColor: '#fff',
    color: '#000',
    marginVertical: 20,
    marginHorizontal: 16,
    shadowColor: '#858585',
    overflow: 'hidden',
    shadowRadius: 15,
    elevation: 6,
    shadowOpacity: '25%',
    borderColor: '#7e7e7e',
    borderRadius: 15,
  },
  labelbaru5: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    marginLeft: 10,
    color: '#C0C0C0',
  },
  tmblDonasi: {
    width: 80,
    height: 40,
    marginTop: 60,
    marginRight: 55,
    borderRadius: 10,
    borderWidth: 1,
    padding: 5,
    fontSize: 20,
    borderColor: '#E9E9E9',
    textAlign: 'center',
    alignSelf: 'flex-end',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  kotakstat: {
    marginHorizontal: 10,
    backgroundColor: '#fff',
    height: 170,
    width: 250,
    borderRadius: 10,
    paddingHorizontal: '4%',
    shadowColor: '#858585',
    overflow: 'hidden',
    shadowRadius: 15,
    elevation: 6,
    shadowOpacity: '25%',
  },
  status: {
    marginTop: 10,
    width: 60,
    height: 30,
    fontWeight: 'bold',
    padding: 3,
    textAlign: 'center',
    borderRadius: 5,
  },
  judul: {
    marginTop: 10,
    fontWeight: 'bold',
    fontSize: 16,
    width: '90%',
    color: '#000',
  },
  berhasil: {
    marginTop: 10,
    color: '#00A3B1',
    backgroundColor: '#bdbdbd',
    width: 60,
    height: 30,
    fontWeight: 'bold',
    padding: 3,
    textAlign: 'center',
    borderRadius: 5,
  },
  judul: {
    marginTop: 10,
    fontWeight: 'bold',
    fontSize: 16,
    width: '90%',
    color: '#000',
  },
  kotakaktif: {
    backgroundColor: '#fff',
    height: 420,
    width: '95%',
    borderRadius: 10,
    shadowRadius: 15,
    elevation: 6,
    shadowColor: '#858585',
    shadowOpacity: '25%',
  },
  botomnav: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    height: 70,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    top: '92%',
    backgroundColor: 'white',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 20,
    shadowColor: '#52006A',
  },
  kotakkecil: {
    flexDirection: 'column',
    borderColor: '#bdbdbd',
    borderWidth: 1,
    width: '40%',
    height: 100,
    justifyContent: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    textAlign: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 10,
    marginHorizontal: 10,
  },
  containerSafe: {
    flex: 1,
    flexDirection: 'column',
  },
  txtPresensi: {
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 18,
    marginTop: 20,
    fontWeight: 'bold',
    color: '#7e7e7e',
  },
  form: {
    paddingHorizontal: 10,
    width: '100%'
  },
  kotakbtn: {
    marginVertical: 10,
    marginHorizontal: 16,
    borderRadius: 15,
    shadowColor: '#858585',
    overflow: 'hidden',
    shadowRadius: 15,
    elevation: 6,
    shadowOpacity: '25%',
    borderColor: '#7e7e7e',
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
export default connect(mapStateToProps, mapDispatchToProps)(Home);


