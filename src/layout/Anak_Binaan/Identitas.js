import {
  Text, View, StyleSheet,
  ImageBackground, ScrollView, Image,
  FlatList, TouchableOpacity, SafeAreaView, ToastAndroid
} from 'react-native'
import React, { Component } from 'react'
import SwitchSelector from 'react-native-switch-selector';
import { akun, test, Union, background1, juara } from '../../assets/images'
import { Sekolah, Tgl, Jenis, } from '../../assets/icons';

export class Identitas extends Component {
  constructor(props) {
    super(props)
    this.state = {
      det: [],
      // detail: this.props.route.params.id_anak,
      detail: this.props.route.params.item,
      detak: '',
    }
  }

  GetDetAPi() {
    fetch('https://kilauindonesia.org/datakilau/api/getkeluarga/' + this.state.detail,)
      .then(res => {
        if (res.status === 200)
          return res.json()
      }).then(resdata => {
        console.log(resdata.data)
        this.setState({
          det: resdata.data,
        })
      })
  }
  componentDidMount() {
    this.GetDetAPi(),
      console.log(this.state.detail);
  }
  render() {
    var detail = this.state.detail;
    const detak = [
      { label: 'Data Anak', value: 'Data Anak' },
      { label: 'Data Pendidikan', value: 'Data Pendidikan' },
      { label: 'Data Keluarga', value: 'Data Keluarga' },
    ];
    return (
      <ScrollView style={{ flex: 1, backgroundColor: '#fff' }}>
        <ImageBackground source={background1} style={{ width: '100%', height: 160, }}>
        </ImageBackground>
        <View style={style.kolomkecil}>
          <Image source={test} style={{ width: 150, height: 150, borderRadius: 70, justifyContent: 'center', alignSelf: 'center', marginTop: -90, position: 'absolute' }}></Image>
          <View style={{ justifyContent: 'center', textAlign: 'center', alignItems: 'center', alignContent: 'center', alignSelf: 'center', marginTop: 70 }}>
            <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold', }}>{detail.full_name}</Text>
            {/* <View style={{ flexDirection: 'column', justifyContent: 'center', textAlign: 'center', alignItems: 'center', alignContent: 'center', alignSelf: 'center', }}>
                            <View style={{ flexDirection: 'row' }}>
                                <Locations />
                                <Text style={style.labeldlm}>{detail.nama_shelter}</Text>
                            </View>
                        </View> */}
          </View>
          <View style={{ flexDirection: 'column' }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 15, padding: 5, }}>
              <View style={{ flexDirection: 'column', marginLeft: 20, marginTop: -5 }}>
                <Jenis style={{ marginLeft: 20 }} />
                <Text style={{ marginTop: 2, color: '#fff', fontSize: 10 }}>Non-Tahfidz</Text>
              </View>
              <View style={{ marginTop: -10, width: 1, height: '100%', backgroundColor: '#EBEAEA', }} />

              <View style={{ flexDirection: 'column', marginTop: -5 }}>
                <Tgl style={{ marginLeft: 15, }} />
                <Text style={{ color: '#fff', fontSize: 10 }}>{detail.tanggal_lahir}</Text>
              </View>
              <View style={{ marginTop: -10, width: 1, height: '100%', backgroundColor: '#EBEAEA', }} />

              <View style={{ flexDirection: 'column', marginTop: -5 }}>
                < Sekolah style={{ justifyContent: 'center', alignSelf: 'center' }} />
                <Text style={{ marginLeft: 3, color: '#fff', fontSize: 10 }}>{detail.nama_sekolah}</Text>
              </View>

            </View>
            <View style={{ marginHorizontal: 20, marginTop: 5 }}>
              <SwitchSelector
                fontSize={12}
                fontFamily={'Poppins-Medium'}
                options={detak}
                initial={0}
                borderWidth={0}
                height={49}
                borderRadius={10}
                hasPadding
                // onPress={(value) => console.log(`Call onPress with value: ${value}`)}
                onPress={value => {
                  this.setState({ detak: value }),
                    ToastAndroid.show(value.toString(), ToastAndroid.SHORT);
                }}

              />
            </View>
          </View>

          <ScrollView style={{ paddingHorizontal: 20, backgroundColor: '#fff', width: '100%', marginTop: 10 }}>
            {this.state.detak === 'Data Anak' ? (
              <View style={{ paddingHorizontal: 5, backgroundColor: '#fff', flex: 1 }}>
                <View style={{ flexDirection: 'column', marginTop: 10 }}>
                  <View style={{ justifyContent: 'center' }}>
                    <View style={style.form}>
                      <Text style={style.labelkiri}>Nama Lengkap</Text>
                      <Text style={style.labelkanan}>:{detail.full_name}</Text>
                    </View>
                    <View style={style.form}>
                      <Text style={style.labelkiri}>Nama Panggilan Anak</Text>
                      <Text style={style.labelkanan}>:{detail.nick_name}</Text>
                    </View>
                    <View style={style.form}>
                      <Text style={style.labelkiri}>Anak ke</Text>
                      <Text style={style.labelkanan}>:{detail.anak_ke} dari {detail.anak_ke} Bersaudara</Text>
                    </View>
                    <View style={style.form}>
                      <Text style={style.labelkiri}>Tinggal Bersama</Text>
                      <Text style={style.labelkanan}>:{detail.tinggal_bersama}</Text>
                    </View>
                    <View style={style.form}>
                      <Text style={style.labelkiri}>Agama</Text>
                      <Text style={style.labelkanan}>:{detail.agama}</Text>
                    </View>
                    <View style={style.form}>
                      <Text style={style.labelkiri}>Tempat Tanggal Lahir</Text>
                      <Text style={style.labelkanan}>:{detail.tempat_lahir},{detail.tanggal_lahir}</Text>
                    </View>
                    <View style={style.form}>
                      <Text style={style.labelkiri}>Jenis Kelamin</Text>
                      <Text style={style.labelkanan}>:{detail.jenis_kelamin}</Text>
                    </View>
                    <View style={style.form}>
                      <Text style={style.labelkiri}>Status Validasi</Text>
                      <Text style={style.labelkanan}>:{detail.status_validasi}</Text>
                    </View>
                    <View style={style.form}>
                      <Text style={style.labelkiri}>Status Calon Binaan</Text>
                      <Text style={style.labelkanan}>:{detail.status_cpb}</Text>
                    </View>
                    <View style={style.form}>
                      <Text style={style.labelkiri}>Pelajaran Favorit</Text>
                      <Text style={style.labelkanan}>:{detail.pelajaran_favorit}</Text>
                    </View>
                    <View style={style.form}>
                      <Text style={style.labelkiri}>Hobi</Text>
                      <Text style={style.labelkanan}>:{detail.hobi}</Text>
                    </View>
                    <View style={style.form}>
                      <Text style={style.labelkiri}>Prestasi</Text>
                      <Text style={style.labelkanan}>:{detail.prestasi}</Text>
                    </View>
                    <View style={style.form}>
                      <Text style={style.labelkiri}>Jarak Rumah ke Shelter</Text>
                      <Text style={style.labelkanan}>:{detail.jarak_rumah}</Text>
                    </View>
                    <View style={style.form}>
                      <Text style={style.labelkiri}>Transportasi</Text>
                      <Text style={style.labelkanan}>:{detail.transportasi}</Text>
                    </View>
                  </View>


                </View>
              </View>
            ) : (
              <View></View>
            )}
            {this.state.detak === '' ? (
              <View style={{ paddingHorizontal: 5, backgroundColor: '#fff', flex: 1 }}>
                <View style={{ flexDirection: 'column', marginTop: 10 }}>
                  <View style={{ justifyContent: 'center' }}>
                    <View style={style.form}>
                      <Text style={style.labelkiri}>Nama Lengkap</Text>
                      <Text style={style.labelkanan}>:{detail.full_name}</Text>
                    </View>
                    <View style={style.form}>
                      <Text style={style.labelkiri}>Nama Panggilan Anak</Text>
                      <Text style={style.labelkanan}>:{detail.nick_name}</Text>
                    </View>
                    <View style={style.form}>
                      <Text style={style.labelkiri}>Anak ke</Text>
                      <Text style={style.labelkanan}>:{detail.anak_ke} dari {detail.anak_ke} Bersaudara</Text>
                    </View>
                    <View style={style.form}>
                      <Text style={style.labelkiri}>Tinggal Bersama</Text>
                      <Text style={style.labelkanan}>:{detail.tinggal_bersama}</Text>
                    </View>
                    <View style={style.form}>
                      <Text style={style.labelkiri}>Agama</Text>
                      <Text style={style.labelkanan}>:{detail.agama}</Text>
                    </View>
                    <View style={style.form}>
                      <Text style={style.labelkiri}>Tempat Tanggal Lahir</Text>
                      <Text style={style.labelkanan}>:{detail.tempat_lahir},{detail.tanggal_lahir}</Text>
                    </View>
                    <View style={style.form}>
                      <Text style={style.labelkiri}>Jenis Kelamin</Text>
                      <Text style={style.labelkanan}>:{detail.jenis_kelamin}</Text>
                    </View>
                    <View style={style.form}>
                      <Text style={style.labelkiri}>Status Validasi</Text>
                      <Text style={style.labelkanan}>:{detail.status_validasi}</Text>
                    </View>
                    <View style={style.form}>
                      <Text style={style.labelkiri}>Status Calon Binaan</Text>
                      <Text style={style.labelkanan}>:{detail.status_cpb}</Text>
                    </View>
                    <View style={style.form}>
                      <Text style={style.labelkiri}>Pelajaran Favorit</Text>
                      <Text style={style.labelkanan}>:{detail.pelajaran_favorit}</Text>
                    </View>
                    <View style={style.form}>
                      <Text style={style.labelkiri}>Hobi</Text>
                      <Text style={style.labelkanan}>:{detail.hobi}</Text>
                    </View>
                    <View style={style.form}>
                      <Text style={style.labelkiri}>Prestasi</Text>
                      <Text style={style.labelkanan}>:{detail.prestasi}</Text>
                    </View>
                    <View style={style.form}>
                      <Text style={style.labelkiri}>Jarak Rumah ke Shelter</Text>
                      <Text style={style.labelkanan}>:{detail.jarak_rumah}</Text>
                    </View>
                    <View style={style.form}>
                      <Text style={style.labelkiri}>Transportasi</Text>
                      <Text style={style.labelkanan}>:{detail.transportasi}</Text>
                    </View>
                  </View>


                </View>
              </View>
            ) : (

              <View></View>
            )}
            {this.state.detak === 'Data Pendidikan' ? (
              <View style={{ paddingHorizontal: 5, backgroundColor: '#fff', flex: 1 }}>
                <View style={{ flexDirection: 'column', marginTop: 10 }}>
                  <Text style={{ fontSize: 16, fontWeight: 'bold', marginLeft: 20 }}>Detail Pendidikan</Text>
                  {detail.jenjang === 'Belum SD' | detail.jenjang === '' | detail.jenjang === 'null' | detail.jenjang === null ?
                    <View style={style.form}>
                      <Text style={style.labelkiri}>Belum Sekolah</Text>
                    </View>
                    :
                    <View style={{ justifyContent: 'center' }}>
                      <View style={style.form}>
                        <Text style={style.labelkiri}>Nama Sekolah</Text>
                        <Text style={style.labelkanan}>:{detail.nama_sekolah}</Text>
                      </View>
                      <View style={style.form}>
                        <Text style={style.labelkiri}>Kelas</Text>
                        <Text style={style.labelkanan}>:{detail.kelas}</Text>
                      </View>
                      <View style={style.form}>
                        <Text style={style.labelkiri}>Alamat Sekolah</Text>
                        <Text style={style.labelkanan}>:{detail.alamat_sekolah}</Text>
                      </View>
                    </View>

                  }
                </View>
              </View>
            ) : (
              <View></View>
            )}
            {this.state.detak === 'Data Keluarga' ? (
              <View style={{ paddingHorizontal: 5, backgroundColor: '#fff', flex: 1 }}>
                <View style={{ flexDirection: 'column', marginTop: 10 }}>
                  <View style={{ justifyContent: 'center' }}>
                    <View style={style.form}>
                      <Text style={style.labelkiri}>No.Kartu Keluarga</Text>
                      <Text style={style.labelkanan}>:{detail.no_kk}</Text>
                    </View>
                    <View style={style.form}>
                      <Text style={style.labelkiri}>Nama Kepala Keluarga</Text>
                      <Text style={style.labelkanan}>:{detail.kepala_keluarga}</Text>
                    </View>
                    <View style={style.form}>
                      <Text style={style.labelkiri}>Nama Ayah</Text>
                      <Text style={style.labelkanan}>:{detail.nama_ayah}</Text>
                    </View>
                    <View style={style.form}>
                      <Text style={style.labelkiri}>Nama Ibu</Text>
                      <Text style={style.labelkanan}>:{detail.nama_ibu}</Text>
                    </View>
                    <View style={style.form}>
                      <Text style={style.labelkiri}>Nama Wali</Text>
                      <Text style={style.labelkanan}>:{detail.nama_wali}</Text>
                    </View>
                  </View>


                </View>
              </View>
            ) : (
              <View>
              </View>
            )}
          </ScrollView>
        </View>

      </ScrollView>
    )
  }
}

export default Identitas
const style = StyleSheet.create({
  wrapper: {},
  slide1: {
    flex: 1,
    marginLeft: 10,
  },
  slide2: {
    height: '100%'
  },
  slide3: {
    flex: 1,
    width: '100%',
    height: '50%',
  },
  contentContainer: {
    width: '100%',
    height: '85%',
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    flex: 1,
    marginTop: -25,
  },
  contentContainer1: {
    backgroundColor: '#fff',
  },
  containerfoto: {
    marginTop: 40,
    marginLeft: 75,
    multiline: true,
    width: 250,
    height: 250,
    flex: 1,
    margin: 20,
    alignItems: 'center',
    justifyContent: 'center',
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
    color: '#fff',
    width: '40%',
    fontWeight: 'bold',
    backgroundColor: '#87cefa',
    borderRadius: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#E9E9E9',
    textAlign: 'center',
    justifyContent: 'center', alignItems: 'center'
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
  },
  btnSimpanUn1: {
    width: '40%',
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
  groupdatetime: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  coltom: {
    width: '100%',
    marginTop: 20,
    fontSize: 16,
    flexDirection: 'row',
    padding: 10,
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
  coltom1: {
    flex: 2,
    width: '90%',
    marginTop: 10,
    fontSize: 16,
    flexDirection: 'row',
    padding: 10,
    marginLeft: 10,
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
    width: '100%',
    fontSize: 16,
    flexDirection: 'row',
    padding: 10,
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
  detail2: {
    padding: 10,
    height: 120, width: '30%',
    position: 'absolute',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  detail1: {
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
    shadowColor: "#333",
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.3,
    shadowRadius: 2,

    elevation: 3,
    alignItems: 'center',
    justifyContent: 'center'
  },
  imgSmall: {
    position: 'absolute', flex: 1, alignItems: 'center', justifyContent: 'center'
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
    marginLeft: 30,
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
    padding: 10,
    borderRadius: 2.5,
    borderWidth: 0.1,

  },
  Label1: {
    flex: 1,
    fontSize: 12,
    padding: 5,
    color: '#000000',
    flexDirection: 'column',
  },
  Label2: {
    marginTop: 5,
    marginLeft: 25,
    padding: 5,
    color: '#000',
    alignItems: 'center',
    justifyContent: 'center'
  },
  Textinputcss: {
    color: '#7e7e7e',
    borderRadius: 10,
    borderWidth: 0.1,
    fontSize: 12,
    height: 52,
    width: '20%',
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
    textAlign: 'center',
    justifyContent: 'center', alignItems: 'center'
  },
  searchBar: {
    fontSize: 16,
    marginLeft: 50,
    width: '70%',
    height: 50,
    shadowColor: "#333",
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 3,
    backgroundColor: '#fff',
    borderRadius: 2,
    borderWidth: 0.1,
    justifyContent: 'center',
    textAlign: 'center',
  },
  itemText: {
    textAlign: 'center',
    color: 'black',
    fontSize: 16,
    width: '100%',
    height: 50
  },
  item: {
    flex: 1,
    fontSize: 16,
    flexDirection: 'row',
    padding: 10,
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
  refresh: {
    padding: 10,
    position: 'absolute',
    bottom: 95,
    right: 15,
    flexDirection: 'row',
    borderRadius: 5,
    // marginHorizontal: 5,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center'
  },
  checkbox: {
    flexDirection: 'row',
    alignContent: 'space-between',
    alignItems: 'center',
    margin: 20,
  },
  foto: {
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    width: 125,
    height: 125,
    borderRadius: 50,
    marginLeft: 10,
    marginTop: 30,
    marginRight: 20,
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
  labelkiri1: {
    fontSize: 12,
    fontWeight: 'bold',
    marginVertical: 5,
    marginLeft: 20,
    width: 100,
    color: '#C0C0C0',
  },
  labelkiri2: {
    fontSize: 12,
    fontWeight: 'bold',
    marginVertical: 5,
    marginTop: -15,
    marginLeft: 20,
    width: 100,
    color: '#C0C0C0',
  },
  labelkanan: {
    fontSize: 12,
    marginHorizontal: 5,
    width: 150,

  },
  labelkanan2: {
    fontSize: 12,
    marginHorizontal: 5,
    width: 150,
    marginLeft: 80,
    fontWeight: 'bold',

  },
  labelkanan1: {
    fontSize: 12,
    marginHorizontal: 5,
    width: 150,
    marginTop: 10,
    marginLeft: 80,
    fontWeight: 'bold',
  },
  btnSimpanbaru: {
    width: '55%',
    fontWeight: 'bold',
    backgroundColor: '#0EBEDF',
    borderRadius: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#0EBEDF',
    justifyContent: 'center', alignItems: 'center', alignContent: 'center',
    textAlign: 'center',
    color: '#fff'
  },
  kolomkecil: {
    backgroundColor: '#00A9B8',
    width: '100%',
  },
  kolomkecil1: {
    width: '90%',
    height: 60,
    marginTop: 15,
    justifyContent: 'space-around',
    alignContent: 'space-around',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 15,
    flexDirection: 'row',
    textAlign: 'center',
  },
  countContainer: {
    color: '#000000',
    alignItems: "center",
    flexDirection: 'row',
    padding: 5,
    justifyContent: 'center'
  },
  btnSimpanDark1: {
    width: '20%',
    fontWeight: 'bold',
    backgroundColor: '#E9E9E9',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E9E9E9',
    textAlign: 'center',
    justifyContent: 'center', alignItems: 'center'
  },
  labeldlm: {
    fontSize: 10,
    color: '#fff',
    marginTop: 3,
  },
  kotakabu: {
    shadowColor: "#333",
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 3,
    width: '95%',
    height: 300,
    borderRadius: 15,
    borderWidth: 1,
    marginLeft: 10,
    marginTop: 10,
    borderColor: '#E9E9E9',
    backgroundColor: '#fff',

  },
  img: {
    width: '95%',
    height: 150,
    marginLeft: 10,
    marginTop: 10,
    borderRadius: 10,
  },
  labelbaru: {
    fontSize: 16,
    marginTop: 10,
    marginLeft: 10
  },
  labelbaru1: {
    fontSize: 12,
    marginRight: 5,
    marginTop: 10
  },
  labelbaru2: {
    fontSize: 12,
    marginLeft: 10,
    marginTop: 10
  }
});
