
import {
  Modal, BackHandler, ScrollView, Linking, TextInput, Text,
  View, SafeAreaView, StyleSheet, TouchableOpacity, Alert, ToastAndroid, Image, Dimensions, TouchableNativeFeedback
} from 'react-native'
import {
  tanya, luar, Info, Card, sett, kunci, Vector, profilein, Kids, wallet, Aktifitas,
  arrowright, rec, phone, Group, Banner, akun, logout, anak, home1, back, arrow, x, hide,test
} from '../../assets/images'
import React, { Component } from 'react';
import { Collapse, CollapseHeader, CollapseBody, AccordionList } from 'accordion-collapse-react-native';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Tentang, Profil1, Gear, Rek, Key, Profilin, ProfilH, Home, AktifitasH, Arrowleft, ArrowleftWhite, Book, GenderAbu, IconAktifitas, IconBook,
  IconProfile, Jenis, JenisAbu, LocationAbu1, PanahKan, Close
} from '../../assets/icons';
import SwitchSelector from 'react-native-switch-selector';
import { faListNumeric } from '@fortawesome/free-solid-svg-icons';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
export class Akun extends Component {
  constructor(props) {
    super(props)
    this.state = {
      gambar: '',
      image: {
        name: '',
        type: '',
        uri: "...",
        id: 0,
      },
      count: 1,
      Camera: '',
      nama: '',
      text: '',
      email: '',
      alamat: '',
      dosa: [],
      selectedValue: '',
      show: 0,
      index: 0,
      Kegiatan: [],
      id_kegiatan: '',
      nama_kegiatan: '',
      keg: '',
      gantipw: false,
      dd: false,
      modaleditprofil: false,
      modaleditpassword: false,
      modaleditprofiltutor: false,
      pwlama: '',
      pwbaru: '',
      pwkon: '',
      visible: true,
      show: true,
      gantinama: false,
      namabaru: '',
      gantiemail: false,
      emailbaru: '',
      gantinohp: false,
      nohpbaru: '',
      wilayah:false,
    }
  }



  componentDidMount() {
    this.GetDataAPi();
   
    console.log(this.props);
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  logout = async () => {
    await AsyncStorage.clear()
    this.props.navigation.navigate('Login')
    ToastAndroid.show('Logout Berhasil', ToastAndroid.LONG);
  }

  GetDataAPi() {
    fetch('https://berbagipendidikan.org/sim/api/Kegiatan/getkegiatan').then(res => {
      if (res.status === 200)
        return res.json()
    }).then(resdata => {
      console.log(resdata.DATA)
      this.setState({
        Kegiatan: resdata.DATA
      })
    })
  }
  Update() {
    this.Kegiatan();
  }
  youtube = () => {
    let url =
      'https://www.youtube.com/'
    Linking.openURL(url)
      .then(data => {
        console.log("Opened successfully " + data);
      })
  };
  onPressButton() {
    alert('You clicked the button!')
  }
  displayModal(show) {
    this.setState({ modaleditprofil: show })
  }
  displayModal(show) {
    this.setState({ modaleditpassword: show })
  }

  render() {

    const { show, visible } = this.state;
    const requestCameraPermission = async () => {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: "App Camera Permission",
            message: "App needs access to your camera ",
            buttonNeutral: "Ask Me Later",
            buttonNegative: "Cancel",
            buttonPositive: "OK"
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log("Camera permission given");
        } else {
          console.log("Camera permission denied");
        }
      } catch (err) {
        console.warn(err);
      }
    };

    return (
      <ScrollView contentContainerStyle={style.contentContainer} showsVerticalScrollIndicator={false}>
 {this.props.user.presensi === 'karyawan' ? //admin cabang
          <ScrollView contentContainerStyle={style.contentContainer} showsVerticalScrollIndicator={false}>
            <View style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
              <Text style={{ fontSize: 20, marginTop: 15 }}> Profil</Text>
              <Image style={style.foto}></Image>
              <Text style={{ fontSize: 20, marginTop: 10 }}>Nama User</Text>
            </View>
            <Text style={{ fontWeight: 'bold', fontSize: 18, marginTop: 10, marginLeft: 20 }}>Akun Managemen</Text>

            <TouchableOpacity onPress={() => { this.setState({ dd: true }) }}>
              <View style={{ flexDirection: 'row', marginLeft: 20, marginTop: 10 }}>
                <ProfilH />
                <Text style={style.labelbaru}>Data Diri</Text>
              </View>
              <Image source={arrowright} style={{
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
            </TouchableOpacity>

            <TouchableOpacity onPress={() => { this.setState({ gantipw: true }) }}>
              <View style={{ flexDirection: 'row', marginLeft: 20, marginTop: 10 }}>
                <Key />
                <Text style={style.labelbaru}>Ganti Password</Text>
              </View>
              <Image source={arrowright} style={{
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
            </TouchableOpacity>


            <Text style={{ fontWeight: 'bold', fontSize: 18, marginTop: 10, marginLeft: 20 }}>INFORMASI UMUM</Text>

            <TouchableOpacity onPress={() => this.props.navigation.navigate('bantuan')}>
              <View style={{ flexDirection: 'row', marginLeft: 20, marginTop: 10 }}>
                <Tentang />
                <Text style={style.labelbaru}>Bantuan</Text>
              </View>
              <Image source={arrowright} style={{
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
            </TouchableOpacity>

            <View>
              <View style={{ flexDirection: 'row', marginLeft: 20, marginTop: 10 }}>
                <Tentang />
                <Text style={style.labelbaru}>Tentang</Text>
              </View>
              <Image source={arrowright} style={{
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

            <View style={{ marginTop: 20, borderWidth: 1, height: 60, width: 250, borderRadius: 10, justifyContent: 'center', alignItems: 'center', alignContent: 'center', alignSelf: 'center', borderColor: '#00A9B8', }}>
              <TouchableOpacity onPress={this.logout} style={{ flexDirection: 'row' }}>
                <Image source={luar}></Image>
                <Text style={{ color: '#00A9B8', marginLeft: 10, fontSize: 16 }}>Keluar Akun</Text>
              </TouchableOpacity>
            </View>
            
          
          </ScrollView>
          :
          <View />
        }

        {this.props.user.presensi === 'tutor' ? //tutor
          <ScrollView contentContainerStyle={style.contentContainer} showsVerticalScrollIndicator={false}>
            <View style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
              <Text style={{ fontSize: 20, marginTop: 15 }}> Profil</Text>
              <Image style={style.foto}></Image>
              <Text style={{ fontSize: 20, marginTop: 10 }}>Nama User</Text>
            </View>
            <Text style={{ fontWeight: 'bold', fontSize: 18, marginTop: 10, marginLeft: 20 }}>AKUN</Text>

            <TouchableOpacity onPress={() => { this.setState({ dd: true }) }}>
              <View style={{ flexDirection: 'row', marginLeft: 20, marginTop: 10 }}>
                <ProfilH />
                <Text style={style.labelbaru}>Data Diri</Text>
              </View>
              <Image source={arrowright} style={{
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
            </TouchableOpacity>

            <TouchableOpacity onPress={() => { this.setState({ gantipw: true }) }}>
              <View style={{ flexDirection: 'row', marginLeft: 20, marginTop: 10 }}>
                <Key />
                <Text style={style.labelbaru}>Ganti Password</Text>
              </View>
              <Image source={arrowright} style={{
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
            </TouchableOpacity>

            <TouchableOpacity onPress={() => this.props.navigation.navigate('Listkeg')}>
              <View style={{ flexDirection: 'row', marginLeft: 20, marginTop: 10 }}>
                <AktifitasH />
                <Text style={style.labelbaru}>Aktifitas</Text>
              </View>
              <Image source={arrowright} style={{
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
            </TouchableOpacity>

            <Text style={{ fontWeight: 'bold', fontSize: 18, marginTop: 10, marginLeft: 20 }}>INFORMASI UMUM</Text>

            <TouchableOpacity onPress={() => this.props.navigation.navigate('bantuan')}>
              <View style={{ flexDirection: 'row', marginLeft: 20, marginTop: 10 }}>
                <Tentang />
                <Text style={style.labelbaru}>Bantuan</Text>
              </View>
              <Image source={arrowright} style={{
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
            </TouchableOpacity>

            <View>
              <View style={{ flexDirection: 'row', marginLeft: 20, marginTop: 10 }}>
                <Tentang />
                <Text style={style.labelbaru}>Tentang</Text>
              </View>
              <Image source={arrowright} style={{
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

            <View style={{ marginTop: 20, borderWidth: 1, height: 60, width: 250, borderRadius: 10, justifyContent: 'center', alignItems: 'center', alignContent: 'center', alignSelf: 'center', borderColor: '#00A9B8', }}>
              <TouchableOpacity onPress={this.logout} style={{ flexDirection: 'row' }}>
                <Image source={luar}></Image>
                <Text style={{ color: '#00A9B8', marginLeft: 10, fontSize: 16 }}>Keluar Akun</Text>
              </TouchableOpacity>
            </View>

          </ScrollView>
          :
          <View />
        }

        {this.props.user.presensi === 'donatur' ? //donatur
          <ScrollView contentContainerStyle={style.contentContainer} showsVerticalScrollIndicator={false}>
            <View style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
              <Text style={{ fontSize: 20, marginTop: 15 }}> Profil</Text>
              <Image style={style.foto}></Image>
              <Text style={{ fontSize: 20, marginTop: 10 }}>Nama User</Text>
            </View>
            <Text style={{ fontWeight: 'bold', fontSize: 18, marginTop: 10, marginLeft: 20 }}>AKUN</Text>

            <TouchableOpacity onPress={() => { this.setState({ dd: true }) }}>
              <View style={{ flexDirection: 'row', marginLeft: 20, marginTop: 10 }}>
                <ProfilH />
                <Text style={style.labelbaru}>Data Diri</Text>
              </View>
              <Image source={arrowright} style={{
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
            </TouchableOpacity>

            <TouchableOpacity onPress={() => { this.setState({ gantipw: true }) }}>
              <View style={{ flexDirection: 'row', marginLeft: 20, marginTop: 10 }}>
                <Key />
                <Text style={style.labelbaru}>Ganti Password</Text>
              </View>
              <Image source={arrowright} style={{
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
            </TouchableOpacity>

            <TouchableOpacity onPress={() => this.props.navigation.navigate('rek')}>
              <View style={{ flexDirection: 'row', marginLeft: 20, marginTop: 10 }}>
                <Rek />
                <Text style={style.labelbaru}>Rekening</Text>
              </View>
              <Image source={arrowright} style={{
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
            </TouchableOpacity>

            <Text style={{ fontWeight: 'bold', fontSize: 18, marginTop: 10, marginLeft: 20 }}>INFORMASI UMUM</Text>

            <TouchableOpacity onPress={() => this.props.navigation.navigate('bantuan')}>
              <View style={{ flexDirection: 'row', marginLeft: 20, marginTop: 10 }}>
                <Tentang />
                <Text style={style.labelbaru}>Bantuan</Text>
              </View>
              <Image source={arrowright} style={{
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
            </TouchableOpacity>

            <View>
              <View style={{ flexDirection: 'row', marginLeft: 20, marginTop: 10 }}>
                <Tentang />
                <Text style={style.labelbaru}>Tentang</Text>
              </View>
              <Image source={arrowright} style={{
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

            <View style={{ marginTop: 20, borderWidth: 1, height: 60, width: 250, borderRadius: 10, justifyContent: 'center', alignItems: 'center', alignContent: 'center', alignSelf: 'center', borderColor: '#00A9B8', }}>
              <TouchableOpacity onPress={this.logout} style={{ flexDirection: 'row' }}>
                <Image source={luar}></Image>
                <Text style={{ color: '#00A9B8', marginLeft: 10, fontSize: 16 }}>Keluar Akun</Text>
              </TouchableOpacity>
            </View>


            <View style={{
              flexDirection: 'row',
              backgroundColor: '#ffffff',
              justifyContent: 'space-between',
              position: 'absolute',
              paddingRight: 30,
              paddingLeft: 15,

              paddingVertical: 10,
              shadowColor: "#333",
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
              width: '100%',
              top: '90%',
            }}>
              <TouchableOpacity onPress={() => this.props.navigation.replace('Home')} style={{
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                borderRadius: 15,
                paddingLeft: 15,
                paddingRight: 15,
                marginRight: -30
              }}
              >
                <Home />
                <Text style={{
                  fontSize: 13,
                }}>Home</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => this.props.navigation.replace('Absen')} style={{
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                borderRadius: 15,
                paddingLeft: 15,
                paddingRight: 15,
                marginRight: -30,
                marginTop: 5,
              }}
              >
                <Image source={Aktifitas}></Image>
                <Text style={{
                  marginTop: 2,
                  fontSize: 13,
                }}>Aktifitas</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => this.props.navigation.replace('Bayar')} style={{
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                borderRadius: 15,
                paddingLeft: 15,
                paddingRight: 15,
                marginRight: -30
              }}
              >
                <Image source={wallet}></Image>
                <Text style={{
                  fontSize: 13,
                }}>Bayar</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => this.props.navigation.replace('List_anak')} style={{
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                borderRadius: 15,
                paddingLeft: 15,
                paddingRight: 15,
                marginRight: -30
              }}
              >
                <Image source={Kids}></Image>
                <Text>Anak Asuh</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => this.props.navigation.replace('Akun',)} style={{
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                borderRadius: 15,
                paddingLeft: 15,
                paddingRight: 15,
                marginRight: 0
              }}
              >
                <Profilin />
                <Text style={{
                  fontSize: 13,
                }}> Profil</Text>
              </TouchableOpacity>
            </View>



          </ScrollView>

          :
          <View />
        }

        {this.props.user.presensi === '' ? //Pengelola
        <View style={{height:'100%'}}>
          <View style={style.kolomkecil}></View>
            <View style={{marginTop:-60, borderTopRightRadius: 20, borderTopLeftRadius: 20,backgroundColor:'#fff'}}>
              <Image source={test} style={{width:130,height:130,borderRadius:70,alignSelf:'center',marginTop:-60}}></Image>
                <View style={{marginTop:10,alignSelf:'center',justifyContent:'center',alignContent:'center',alignItems:'center'}}>
                  <Text style={{fontWeight:'bold',fontSize:14}}>{this.props.user.name}</Text>
                  <Text style={{marginTop:5}}>Matematika</Text>
                </View>
                <View style={{padding:5,flexDirection:'row',justifyContent:'space-around',alignSelf:'center',marginTop:10,borderRadius:10,marginHorizontal:10,backgroundColor:'#EBEAEA',width:'73%' }}>
                  <TouchableOpacity style={{backgroundColor:'#fff',width:'45%',height:'90%',borderRadius:10,marginTop:1}}>
                    <Text style={{justifyContent:'center',textAlign:'center',alignSelf:'center',alignContent:'center',alignItems:'center',padding:10}}>Profil</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={()=>this.props.navigation.navigate('Tutor')} style={{width:'45%',height:'90%',borderRadius:10,}}>
                    <Text style={{justifyContent:'center',textAlign:'center',alignSelf:'center',alignContent:'center',alignItems:'center',padding:10}}>Riwayat</Text>
                  </TouchableOpacity>
                </View>
                <View style={{height: 1,width: '90%',backgroundColor: '#bdbdbb',marginHorizontal:20,marginTop:20}}></View>
  <TouchableNativeFeedback onPress={() => this.props.navigation.navigate('ProfilTutor', { detail: detail, }, ToastAndroid.show('Detail Identitas Diklik', ToastAndroid.SHORT,))}>
    <View style={{ marginTop: '4%', flexDirection: 'row', width: '100%', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: '8%' }}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <IconProfile />
        <Text style={{ left: '45%', color: '#000', fontFamily: 'Poppins-Medium', fontSize: 14, right: '30%' }}>Detail Identitas</Text>
      </View>
      <PanahKan />
    </View>
  </TouchableNativeFeedback>
  <TouchableNativeFeedback onPress={() => this.props.navigation.navigate('Listkeg')}>
    <View style={{ marginTop: '4%', flexDirection: 'row', width: '100%', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: '8%' }}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <IconAktifitas />
        <Text style={{ left: '45%', color: '#000', fontFamily: 'Poppins-Medium', fontSize: 14, right: '30%' }}>Aktivitas Tutor</Text>
      </View>
      <PanahKan />
    </View>
  </TouchableNativeFeedback>
  <View style={{height: 1,width: '90%',backgroundColor: '#bdbdbb',marginHorizontal:20,marginTop:20}}></View>

  <View style={{marginTop:20}}>
    <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between', paddingHorizontal: '10%', }}>
      <Text style={{ color: '#000', fontFamily: 'Poppins-Reguler', fontSize: 14, }}>Kantor Cabang</Text>
      <Text style={{ color: '#000', fontFamily: 'Poppins-Reguler', fontSize: 14 }}>Nama Kacab</Text>
    </View>
    <View style={{ marginTop: '3%', flexDirection: 'row', width: '100%', justifyContent: 'space-between', paddingHorizontal: '10%', }}>
      <Text style={{ color: '#000', fontFamily: 'Poppins-Reguler', fontSize: 14, }}>Wilayah Binaan</Text>
      <Text style={{ color: '#000', fontFamily: 'Poppins-Reguler', fontSize: 14, }}>Nama Wilbin</Text>
    </View>
    <View style={{ marginTop: '3%', flexDirection: 'row', width: '100%', justifyContent: 'space-between', paddingHorizontal: '10%', }}>
      <Text style={{ color: '#000', fontFamily: 'Poppins-Reguler', fontSize: 14, }}>Shelter</Text>
      <Text style={{ color: '#000', fontFamily: 'Poppins-Reguler', fontSize: 14, }}>Nama Shelter</Text>
    </View>
    <Text>
    </Text>
  </View>
  <View style={{height: 1,width: '90%',backgroundColor: '#bdbdbb',marginHorizontal:20,}}></View>

  <View style={{ marginTop:20, borderWidth: 1, height: 60, width: 250, borderRadius: 10, justifyContent: 'center', alignItems: 'center', alignContent: 'center', alignSelf: 'center', borderColor: '#00A9B8', }}>
    <TouchableOpacity onPress={this.logout} style={{ flexDirection: 'row' }}>
      <Image source={luar}></Image>
      <Text style={{ color: '#00A9B8', marginLeft: 10, fontSize: 16 }}>Keluar Akun</Text>
    </TouchableOpacity>
  </View>
</View>

        </View>
          :
          <View />
        }

<Modal
              animationType={"slide"}
              transparent={true}
              visible={this.state.gantipw}
              style={{
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <SafeAreaView style={{
                backgroundColor: '#ffffff',
                alignItems: 'center',
                justifyContent: 'center',
                alignContent: 'center',
              }}>
                <View style={style.ModalCont}>
                  <View style={{
                    paddingTop: 5,
                    marginHorizontal: 10,
                    marginTop: 500,
                    backgroundColor: '#ffffff',
                    // flexDirection: 'row',
                    borderRadius: 20,
                    height: 300,
                    width: 300,
                    shadowColor: "#333",
                    shadowOffset: {
                      width: 1,
                      height: 1,
                    },
                    shadowOpacity: 0.3,
                    shadowRadius: 2,
                    elevation: 3,
                    alignItems: 'center',

                  }}>
                    <View style={{ justifyContent: 'center', alignItems: 'center', textAlign: 'center', }}>
                      <Text >Ubah Password</Text>

                      <View style={{ flexDirection: 'row' }}>
                        <TextInput
                          style={style.kotak3}
                          onChangeText={pwlama => this.setState({ pwlama })}
                          value={this.state.pwlama}
                          keyboardType='default'
                          secureTextEntry={visible}
                          placeholder="Password Lama "
                          placeholderTextColor='#7e7e7e'
                        />
                        <View style={style.btnEye}>
                          <TouchableOpacity
                            onPress={() => {
                              if (show === true) {
                                this.setState({ visible: true })
                                this.setState({ show: false })
                              } else {
                                this.setState({ visible: false })
                                this.setState({ show: true })
                              }
                            }}
                          >
                            <View>
                              {show === true ? <Image source={hide} style={style.ImageStyle}></Image> : <Image source={hide} style={style.ImageStyle}></Image>}
                            </View>
                          </TouchableOpacity>
                        </View>
                      </View>

                      <View style={{ flexDirection: 'row' }}>
                        <TextInput
                          style={style.kotak3}
                          onChangeText={pwbaru => this.setState({ pwbaru })}
                          value={this.state.pwbaru}
                          keyboardType='default'
                          secureTextEntry={visible}
                          placeholder="Password Baru "
                          placeholderTextColor='#7e7e7e'
                        />
                        <View style={style.btnEye}>
                          <TouchableOpacity
                            onPress={() => {
                              if (show === true) {
                                this.setState({ visible: true })
                                this.setState({ show: false })
                              } else {
                                this.setState({ visible: false })
                                this.setState({ show: true })
                              }
                            }}
                          >
                            <View>
                              {show === true ? <Image source={hide} style={style.ImageStyle}></Image> : <Image source={hide} style={style.ImageStyle}></Image>}
                            </View>
                          </TouchableOpacity>
                        </View>
                      </View>

                      <View style={{ flexDirection: 'row' }}>
                        <TextInput
                          style={style.kotak3}
                          onChangeText={pwkon => this.setState({ pwkon })}
                          value={this.state.pwkon}
                          keyboardType='default'
                          secureTextEntry={visible}
                          placeholder="Konfirmasi Password "
                          placeholderTextColor='#7e7e7e'
                        />
                        <View style={style.btnEye}>
                          <TouchableOpacity
                            onPress={() => {
                              if (show === true) {
                                this.setState({ visible: true })
                                this.setState({ show: false })
                              } else {
                                this.setState({ visible: false })
                                this.setState({ show: true })
                              }
                            }}
                          >
                            <View>
                              {show === true ? <Image source={hide} style={style.ImageStyle}></Image> : <Image source={hide} style={style.ImageStyle}></Image>}
                            </View>
                          </TouchableOpacity>
                        </View>
                      </View>

                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignContent: 'space-around', alignItems: 'center', marginTop: 15, }}>

                      <TouchableOpacity onPress={() => { this.setState({ gantipw: false }) }} style={style.btnBatalbaru}>
                        <Text>Batal</Text>

                      </TouchableOpacity>

                      <TouchableOpacity style={style.btnSimpanbaru}>
                        <Text style={{color:'#fff'}}>Ubah</Text>
                      </TouchableOpacity>

                    </View>
                  </View>
                </View>
              </SafeAreaView>
            </Modal>

            <Modal
              animationType={"slide"}
              transparent={true}
              visible={this.state.gantinama}
              style={{
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <SafeAreaView style={{
                backgroundColor: '#ffffff',
                alignItems: 'center',
                justifyContent: 'center',
                alignContent: 'center',
              }}>
                <View style={style.ModalCont}>
                  <View style={{
                    paddingTop: 5,
                    marginHorizontal: 10,
                    marginTop: 500,
                    backgroundColor: '#ffffff',
                    // flexDirection: 'row',
                    borderRadius: 20,
                    height: 200,
                    width: 200,
                    shadowColor: "#333",
                    shadowOffset: {
                      width: 1,
                      height: 1,
                    },
                    shadowOpacity: 0.3,
                    shadowRadius: 2,
                    elevation: 3,
                    alignItems: 'center',

                  }}>
                    <View style={{ justifyContent: 'center', alignItems: 'center', textAlign: 'center', }}>
                      <Text >Ubah Nama</Text>
                      <TextInput
                        style={style.kotak3}
                        onChangeText={namabaru => this.setState({ namabaru })}
                        value={this.state.namabaru}
                        keyboardType='default'
                        placeholder="Masukan Nama "
                        placeholderTextColor='#7e7e7e'
                      />
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignContent: 'space-around', alignItems: 'center', marginTop: 15, }}>

                      <TouchableOpacity onPress={() => { this.setState({ gantinama: false }) }} style={style.btnBatalbaru}>
                        <Text>Batal</Text>

                      </TouchableOpacity>

                      <TouchableOpacity style={style.btnSimpanbaru}>
                        <Text style={{color:'#fff'}}>Ubah</Text>
                      </TouchableOpacity>

                    </View>
                  </View>
                </View>
              </SafeAreaView>
            </Modal>

            <Modal
              animationType={"slide"}
              transparent={true}
              visible={this.state.gantiemail}
              style={{
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <SafeAreaView style={{
                backgroundColor: '#ffffff',
                alignItems: 'center',
                justifyContent: 'center',
                alignContent: 'center',
              }}>
                <View style={style.ModalCont}>
                  <View style={{
                    paddingTop: 5,
                    marginHorizontal: 10,
                    marginTop: 500,
                    backgroundColor: '#ffffff',
                    // flexDirection: 'row',
                    borderRadius: 20,
                    height: 200,
                    width: 300,
                    shadowColor: "#333",
                    shadowOffset: {
                      width: 1,
                      height: 1,
                    },
                    shadowOpacity: 0.3,
                    shadowRadius: 2,
                    elevation: 3,
                    alignItems: 'center',

                  }}>
                    <View style={{ justifyContent: 'center', alignItems: 'center', textAlign: 'center', }}>
                      <Text >Ubah Nama</Text>
                      <TextInput
                        style={style.kotak4}
                        onChangeText={emailbaru => this.setState({ emailbaru })}
                        value={this.state.emailbaru}
                        keyboardType='default'
                        placeholder="Email"
                        placeholderTextColor='#7e7e7e'
                      />
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignContent: 'space-around', alignItems: 'center', marginTop: 15, }}>

                      <TouchableOpacity onPress={() => { this.setState({ gantiemail: false }) }} style={style.btnBatalbaru}>
                        <Text>Batal</Text>

                      </TouchableOpacity>

                      <TouchableOpacity style={style.btnSimpanbaru}>
                        <Text style={{color:'#fff'}}>Ubah</Text>
                      </TouchableOpacity>

                    </View>
                  </View>
                </View>
              </SafeAreaView>
            </Modal>

            <Modal
              animationType={"slide"}
              transparent={true}
              visible={this.state.gantinohp}
              style={{
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <SafeAreaView style={{
                backgroundColor: '#ffffff',
                alignItems: 'center',
                justifyContent: 'center',
                alignContent: 'center',
              }}>
                <View style={style.ModalCont}>
                  <View style={{
                    paddingTop: 5,
                    marginHorizontal: 10,
                    marginTop: 500,
                    backgroundColor: '#ffffff',
                    // flexDirection: 'row',
                    borderRadius: 20,
                    height: 200,
                    width: 250,
                    shadowColor: "#333",
                    shadowOffset: {
                      width: 1,
                      height: 1,
                    },
                    shadowOpacity: 0.3,
                    shadowRadius: 2,
                    elevation: 3,
                    alignItems: 'center',

                  }}>
                    <View style={{ justifyContent: 'center', alignItems: 'center', textAlign: 'center', }}>
                      <Text >Ubah Nomor HP</Text>
                      <TextInput
                        style={style.kotak3}
                        onChangeText={nohpbaru => this.setState({ nohpbaru })}
                        value={this.state.nohpbaru}
                        keyboardType='default'
                        placeholder="Masukan No HP "
                        placeholderTextColor='#7e7e7e'
                      />
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignContent: 'space-around', alignItems: 'center', marginTop: 15, }}>

                      <TouchableOpacity onPress={() => { this.setState({ gantinohp: false }) }} style={style.btnBatalbaru}>
                        <Text>Batal</Text>

                      </TouchableOpacity>

                      <TouchableOpacity style={style.btnSimpanbaru}>
                        <Text style={{color:'#fff'}}>Ubah</Text>
                      </TouchableOpacity>

                    </View>
                  </View>
                </View>
              </SafeAreaView>
            </Modal>

            <Modal
              animationType={"slide"}
              transparent={true}
              propagateSwipe={true}
              visible={this.state.dd}
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
                  height: '100%',
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
                  <SafeAreaView style={{ width: '100%', height: '100%' }}>
                    <View style={{ marginBottom: 20, marginTop: 10, }}>
                      <TouchableOpacity onPress={() => { this.setState({ dd: false }) }} >
                        <Image source={back} style={{ marginLeft: 20, marginTop: 20 }}></Image>
                      </TouchableOpacity>
                      <Text style={{ textAlign: 'center', fontSize: 18, marginTop: -20, fontWeight: 'bold' }}>Data Diri</Text>
                    </View>
                    <View style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                      <Image style={style.foto}></Image>
                    </View>
                    <TouchableOpacity>
                      <Text style={{ color: '#00A9B8', textAlign: 'center', marginTop: 10 }}>Ubah Foto Profil</Text>
                    </TouchableOpacity>

                    <Text style={{ fontWeight: 'bold', marginLeft: 20, }}>Info Pribadi</Text>

                    <TouchableOpacity onPress={() => { this.setState({ gantinama: true }) }}>
                      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginLeft: 20, marginTop: 10, }}>
                        <Text>Nama</Text>
                        <View style={{ flexDirection: 'row' }}>
                          <Text style={{ marginRight: 50 }}>Hafidh Fauzan</Text>
                          <Image source={arrowright} style={style.panahkanan}></Image>
                        </View>
                      </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => { this.setState({ gantiemail: true }) }}>
                      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginLeft: 20, marginTop: 10, }}>
                        <Text>Email</Text>
                        <View style={{ flexDirection: 'row' }}>
                          <Text style={{ marginRight: 50 }}>Hafidhfauzan@gmail.com</Text>
                          <Image source={arrowright} style={style.panahkanan}></Image>
                        </View>
                      </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => { this.setState({ gantinohp: true }) }}>
                      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginLeft: 20, marginTop: 10, }}>
                        <Text>Nomor HP</Text>
                        <View style={{ flexDirection: 'row' }}>
                          <Text style={{ marginRight: 50 }}>xxx-xxx-xxx-xxx</Text>
                          <Image source={arrowright} style={style.panahkanan}></Image>
                        </View>
                      </View>
                    </TouchableOpacity>

                    <TouchableOpacity>
                      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginLeft: 20, marginTop: 10, }}>
                        <Text>Jenis Kelamin</Text>
                        <View style={{ flexDirection: 'row' }}>
                          <Text style={{ marginRight: 50 }}>Laki-laki</Text>
                          <Image source={arrowright} style={style.panahkanan}></Image>
                        </View>
                      </View>
                    </TouchableOpacity>
                  </SafeAreaView>
                </View>
              </View>
            </Modal>
      </ScrollView >
    )
  }
}
const style = StyleSheet.create({
  scrollView: {
    backgroundColor: 'white',
    marginHorizontal: -5,
    width: '100%',
    hoght: '100%',
  },
  kolomkecil: {
    backgroundColor: '#00A9B8',
    width: '100%',
    height: '20%',
  },
  Label: {
    fontSize: 20,
    color: '#000000',
    marginLeft: 10,
  },
  Label1: {
    fontSize: 16,
    color: '#000000',
    marginLeft: 10,
  },
  Labelkon: {
    fontSize: 20,
    color: '#000000',
    marginLeft: 30,
    marginTop: 20,
    marginBottom: 20,
  },
  kotak2: {
    color: '#000',
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 10,
    borderWidth: 1,
    fontSize: 12,
    height: 47,
    backgroundColor: '#fff',
    shadowColor: "#333",
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    borderColor: '#f2f2f2',
    elevation: 3,
  },
  logo: {
    marginTop: 20,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    height: 100,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  texttop: {
    fontSize: 12,
    color: '#000',
    marginTop: 0,
    backgroundColor: '#fff'

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
  cardtop: {
    backgroundColor: '#0EBEDF',
    marginLeft: 20,
    marginTop: -60,
    width: '90%',
    borderRadius: 10,
    shadowColor: "#333",
    shadowOffset: {
      width: 1,
      height: 1,
    }
  },

  contentContainer: {
    height: '100%',
    backgroundColor: '#fff'
  },
  title: {
    marginRight: 20,
    marginLeft: 20,
    marginTop: 15,
    marginBottom: 15,
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  texttop: {
    fontSize: 12,
    color: '#000',
    marginTop: 0,
  },
  logo5: {
    width: 25,
    height: 25,
    marginLeft: 10,
  },
  logo4: {
    width: 75,
    height: 75,
    marginLeft: 10,
  },
  logo3: {
    width: 25,
    height: 19,
    marginLeft: 15,
  },
  foto: {
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    width: 100,
    height: 100,
    borderRadius: 50,
    marginLeft: 10,
    marginTop: 20,
    backgroundColor: '#989898'
  },
  groupdatetime: {
    marginTop: 30,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  btnSimpanUn1: {
    fontWeight: 'bold',
    backgroundColor: '#C6C6C6',
    borderRadius: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#E9E9E9',
    justifyContent: 'center', alignItems: 'center',
    alignContent: 'center',
    textAlign: 'center',
  },
  col: {
    backgroundColor: '#fff',
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: "#333",
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
    width: '95%',
    marginLeft: 10,
    fontSize: 16,
    flexDirection: 'row',
    padding: 10,
    marginVertical: 4,
    backgroundColor: '#fff',
    shadowColor: "#333",
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    borderColor: '#7e7e7e',
    elevation: 3,
  },
  coltom: {
    width: '95%',
    marginLeft: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    alignContent: 'center',
    fontSize: 16,
    flexDirection: 'row',
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#fff',
    shadowColor: "#333",
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    borderColor: '#7e7e7e',
    elevation: 3,
  },
  ImageStyle: {
    marginTop: 10,
    marginLeft: 20,
    height: 45,
    width: 45,
  },

  detail: {
    width: '100%',
    justifyContent: 'center',
    alignContent: 'center',
  },
  btnSimpanUn: {
    width: '40%',
    fontWeight: 'bold',
    backgroundColor: '#C6C6C6',
    borderRadius: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#E9E9E9',
    justifyContent: 'center', alignItems: 'center',
    textAlign: 'center',
    marginTop: 10,
  },
  Labeledit: {
    fontSize: 20,
    color: '#000000',
    marginLeft: 10,
    marginTop: 10,
  },
  colin: {
    width: '80%',
    marginLeft: 20,
    marginTop: 10,
    marginBottom: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    alignContent: 'center',
    fontSize: 16,
    flexDirection: 'row',
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#fff',
    shadowColor: "#333",
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
    backgroundColor: '#0EBEDF',
    borderRadius: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#E9E9E9',
    textAlign: 'center',
    justifyContent: 'center', alignItems: 'center'
  },
  labelbaru: {
    fontSize: 16,
    marginLeft: 10,
  },
  ModalCont2: {
    flex: 1,
    backgroundColor: '#00000079',
  },
  btnBaru: {
    marginTop: 20,
    borderWidth: 1,
    height: 60,
    width: 250,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    borderColor: '#00A9B8',
    backgroundColor: '#00A9B8',
  },
  labelBaru1: {
    color: 'C0C0C0',
    fontSize: 14,
    marginLeft: 22,
  },
  panahkanan: {
    padding: 10,
    margin: 5,
    height: 20,
    width: 20,
    position: 'absolute',
    resizeMode: 'stretch',
    alignItems: 'center',
    right: 15,
    top: -2,
  },
  ModalCont: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#00000099',
    paddingHorizontal: 10,
  },
  kotak3: {
    color: '#000000',
    borderColor: '#bdbdbd',
    margin: 10,
    borderRadius: 2,
    borderWidth: 1,
    fontSize: 12,
    height: 40,
    width: 150,
  },
  kotak4: {
    color: '#000000',
    margin: 10,
    borderRadius: 2,
    borderWidth: 0.1,
    fontSize: 12,
    height: 40,
    width: 200,
    backgroundColor: '#F0F8FF',
  },
  btnSimpanbaru: {
    width: '30%',
    fontWeight: 'bold',
    backgroundColor: '#00A9B8',
    borderRadius: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#00A9B8',
    justifyContent: 'center', alignItems: 'center',
    textAlign: 'center',
    color: '#fff'
  },
  btnBatalbaru: {
    width: '30%',
    fontWeight: 'bold',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#00A9B8',
    justifyContent: 'center', alignItems: 'center',
    textAlign: 'center',
    color: '#00A9B8'
  },
  ImageStyle: {
    padding: 10,
    margin: 5,
    height: 20,
    width: 20,
    resizeMode: 'stretch',
    alignItems: 'center',
  },
  infoContainer: {
    zIndex: 0,
    width: '75%',
    borderRadius: 10,
    marginTop: 20,
    marginLeft: 40,
    height: 50,
    justifyContent: 'center',
    borderWidth: 1,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 10,
    shadowOpacity: 1.0,
    elevation: 5,
  },
  btnEye: {
    position: 'absolute',
    padding: 10,
    right: 0,
    top: 5,
  },
  containerSafe: {
    flex: 1,
    flexDirection: 'column',
},
txtPresensi: {
    justifyContent: 'center', alignItems: 'center',
    fontSize: 18,
    marginTop: 20,
    fontWeight: 'bold',
    color: '#7e7e7e'
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
})
const mapStateToProps = (state) => {
  return {
    user: state,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeUser: (data) => dispatch({ type: 'CHANGE/USER', payload: data }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Akun);


