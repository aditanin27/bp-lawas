import {
  ScrollView, Text, View, StyleSheet,
  TouchableOpacity, ImageBackground, Image, Modal, SafeAreaView, TextInput, ToastAndroid, FlatList, Dimensions
} from 'react-native'
import React, { Component } from 'react'
import { rapot, email, Calendar, Union, x, date, test } from '../../assets/images'
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import DatePicker from 'react-native-date-picker';
import { connect } from 'react-redux';
import { Zakat, Wallet, Profil2, Kids, Lapkeu, Infak, Berita, Aktifitasin, IconRumah, Tamnak, PlusDark, Filter } from '../../assets/icons'

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

class Absen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      gambar: '',
      hisimg: {
        0: {
          image: {
            name: '',
            type: '',
            uri: 'https://static.thenounproject.com/png/187803-200.png'
          },
        }
      },
      sa: false,
      st: false,
      jk: false,
      pa: false,
      modaldetail: false,
      anak1: [],
      filterList: [],
      jenisK: [
        { label: 'Pilih Semua', value: 'semua' },
        { label: 'Perempuan', value: 'perempuan' },
        { label: 'Laki-laki', value: 'laki-laki' },
      ],
      jenisA: [
        { label: 'Pilih Semua', value: 'semua' },
        { label: 'Tahfidz', value: 'Tahfidz' },
        { label: 'Non-Tahfidz', value: 'Non-Tahfidz' },
      ],
      tgl: '',
      date: new Date(),
      date1: new Date(),
      modaldate: false,
      modaldate1: false,
      filt_anak1: [],
      detailanak: '',
      filteranak: false,
    }
  }
  GetAnakAPi() {
    const id_anak = this.state.detailanak
    fetch('https://kilauindonesia.org/datakilau/api/joindataanak/' + id_anak).then(res => {
      if (res.status === 200)
        return res.json()
    }).then(resdata => {
      console.log(resdata.data)
      this.setState({
        anak1: resdata.data,
        filt_anak1: resdata.data
      })
    })
  }
  componentDidMount() {
    this.GetAnakAPi();
    
  }
  filterList(textToSearch) {
    this.setState({
      filt_anak1: this.state.anak1.filter(i => i.full_name.toLowerCase(textToSearch).includes(textToSearch)),
    });
  }
  render() {
    var jenis = [
      { label: 'Perempuan  ', value: 'perempuan' },
      { label: 'Laki-laki  ', value: 'laki-laki' },
      { label: 'Pilih Semua  ', value: 'semua' }
    ];
    const tgl = [
      { label: 'Tampilkan semua', value: 'semua' },
      { label: '7 Hari', value: '7' },
      { label: '30 Hari', value: '30' },
      { label: 'Pilih tanggal yang diinginkan', value: 'Pilih' },
    ];


    return (
      <View style={style.contentContainer}>
        {this.props.user.presensi === 'admin' ? //donatur//
          <>
            <View style={{ backgroundColor: '#0EBEDF', height: 150, borderBottomRightRadius: 28, borderBottomLeftRadius: 28 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={style.title1}>Riwayat Aktifitas Anak</Text>
                <TouchableOpacity onPress={() => { this.setState({ filteranak: true }) }} style={{ flexDirection: 'column' }} >
                  <Filter style={{ marginTop: 20, marginRight: 20 }} />
                  <Text style={{ marginLeft: -5, color: '#fff' }}>Filter</Text>
                </TouchableOpacity>
              </View>
              <Text style={{
                marginRight: 20,
                marginLeft: 20,
                marginTop: -10,
                marginBottom: 15,
                fontSize: 12,
                fontWeight: 'bold',
                color: '#fff',
              }}>Pantau Aktifitas anak sehari hari</Text>

              <View style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#fff',
                borderWidth: 0.5,
                height: 40,
                borderRadius: 5,
                margin: 10,
              }}>
                <TextInput
                  value={this.state.carianak}
                  placeholder={'Cari'}
                  onChangeText={(text) => {
                    this.filterList(text.toLowerCase()), this.setState({ carianak: text })
                  }}
                  style={style.searchBar} />
              </View>
            </View>
            <SafeAreaView>
              <FlatList
                data={this.state.filt_anak1}
                renderItem={({ item }) => (
                  <TouchableOpacity onPress={() => this.props.navigation.navigate('DetAktifitasAnak')}>
                    <View style={style.kotakbaru1}>
                      <View >
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                          <View style={{ flexDirection: 'row' }}>
                            <Image source={test} style={{ width: 35, height: 35, marginLeft: 20, borderRadius: 30, marginBottom: 10 }}></Image>
                            <Text style={{ fontSize: 14, marginTop: 5, marginLeft: 5 }}>{item.full_name}</Text>
                          </View>
                          <View style={{ marginRight: 20, textAlign: 'center', borderColor: '#E9E9E9', borderWidth: 1, width: 50, height: 25, backgroundColor: '#FFEFB5' }}>
                            <Text style={{ textAlign: 'center', color: '#13B82D' }}>Hadir</Text>
                          </View>
                        </View>

                        <View style={{ width: '95%', height: 1, backgroundColor: '#353739', marginLeft: 8 }} />

                        <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                          <Text style={{ marginLeft: 20, fontSize: 14, marginTop: 5 }}> Keterangan Absen</Text>
                          <View style={{ flexDirection: 'column' }}>
                            <Text style={{ marginRight: 20, fontSize: 12 }}>04 jan</Text>
                            <Text style={{ marginRight: 20, fontSize: 12 }}>10.30</Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                )}
                ListEmptyComponent={() =>
                  <View>
                    <View style={{ flexDirection: 'column', marginTop: 30, }}>
                      <View style={style.iconbesar}>
                        <Tamnak />
                      </View>
                      <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'center', }}>Anda belum memiliki anak asuh</Text>
                      <Text style={{ fontSize: 12, textAlign: 'center', }}>Coba Tambah Anak dahulu untuk mendapat</Text>
                      <Text style={{ fontSize: 12, textAlign: 'center', }}>aktifitas harian dari anak asuh</Text>
                    </View>

                    <View style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center', alignSelf: 'center', marginTop: 20 }}>
                      <TouchableOpacity style={style.btnSimpanbaru}>
                        <View style={{ flexDirection: 'row' }}>
                          <Text style={{ color: '#fff' }}>Tambah Anak Asuh</Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                }>
              </FlatList>
            </SafeAreaView>

            <View style={{ marginTop: 80 }}></View>
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
              top: 700,
              bottom: 0,
              right: 0,
              left: 0,
            }}>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('Home')} style={{
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                borderRadius: 15,
                paddingLeft: 15,
                paddingRight: 15,

              }}
              >
                <IconRumah />
                <Text style={{
                  fontSize: 13,
                }}>Home</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => this.props.navigation.navigate('Absen')} style={{
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                borderRadius: 15,
                paddingLeft: 15,
                paddingRight: 15,

              }}>
                <Aktifitasin />
                <Text style={{
                  fontSize: 13,
                }}>Aktifitas</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => this.props.navigation.navigate('Bayar')} style={{
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                borderRadius: 15,
                paddingLeft: 15,
                paddingRight: 15,
              }}
              >
                <Wallet />
                <Text style={{
                  fontSize: 13,
                }}>Bayar</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => this.props.navigation.navigate('List_anak')} style={{
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                borderRadius: 15,
                paddingLeft: 15,
                paddingRight: 15,
              }}
              >
                <Kids />
                <Text>Anak Asuh</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => this.props.navigation.navigate('Akun',)} style={{
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                borderRadius: 15,
                paddingLeft: 15,
                paddingRight: 15,
              }}
              >
                <Profil2 />
                <Text style={{
                  fontSize: 13,
                }}> Profil</Text>
              </TouchableOpacity>
            </View>
          </>
          :
          <View />
        }
       
        <Modal
          animationType={"slide"}
          transparent={false}
          visible={this.state.filteranak}
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
              height: '70%',
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
                <View style={{ flexDirection: 'row' }}>
                  <TouchableOpacity onPress={() => { this.setState({ st: false }) }}>
                    <Image source={Union} style={{ width: 15, height: 15, marginLeft: 10, marginRight: 10, marginTop: 5 }}></Image>
                  </TouchableOpacity>
                  <Text style={{ fontWeight: 'bold', fontSize: 18, textAlign: 'center' }}> Filter</Text>
                </View>


                <View>
                  <Text style={{ marginLeft: 10, marginBottom: 10, marginTop: 10 }}>Jenis Anak</Text>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-around', }}>
                    <TouchableOpacity style={style.btnFilt}>
                      <Text style={{ textAlign: 'center' }}>Tahfidz</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={style.btnFilt}>
                      <Text style={{ textAlign: 'center' }}>Non-Tahfidz</Text>
                    </TouchableOpacity>
                  </View>

                  <Text style={{ marginLeft: 10, marginBottom: 10, marginTop: 10 }}>Waktu Aktivitas</Text>
                  <RadioForm
                    radio_props={tgl}
                    onPress={(tgl) => {
                      this.setState({ tgl: tgl }),
                        ToastAndroid.show(tgl.toString(), ToastAndroid.SHORT)
                    }}
                    initial={0}
                    buttonSize={10}
                    buttonOuterSize={20}
                    radioStyle={{ margin: 10, }}
                    animation={true}
                    formHorizontal={false}
                  >
                  </RadioForm>
                </View>
                {this.state.tgl === 'Pilih' ?
                  <View style={{ flexDirection: 'row' }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center' }}>
                      <TouchableOpacity onPress={() => { this.setState({ modaldate: true }) }}>
                        <View style={style.kotak7}>
                          <Text >{this.state.date.toLocaleString('default', { month: 'short' })}</Text>
                        </View>
                      </TouchableOpacity>
                      <View
                        style={{
                          borderColor: '#DDD',
                          borderWidth: 1,
                          height: 50,
                          width: 50,
                          marginLeft: 250,
                          borderRadius: 10,
                          top: 10,
                          position: 'absolute',

                        }} />
                      <TouchableOpacity onPress={() => { this.setState({ modaldate: true }) }}>
                        <View style={{ height: 50, width: 50, justifyContent: 'center', alignItems: 'center', borderRadius: 10, marginTop: 10, marginLeft: 20 }}>
                          {/* <Date /> */}
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>



                  :
                  <View></View>
                }
                <View style={{ alignContent: 'center', justifyContent: 'center', alignItems: 'center', marginBottom: 50, flexDirection: 'row' }}>
                  <Text
                    style={style.btnSimpanUn1}
                    onPress={() => {
                      this.setState({ filteranak: false })
                    }}>Kembali</Text>
                </View>
              </SafeAreaView>
            </View>
          </View>
        </Modal>





        <Modal
          animationType={"slide"}
          transparent={false}
          visible={this.state.modaldetail}
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
                <View style={style.wrap}>

                </View>


                <View style={{ alignContent: 'center', justifyContent: 'center', alignItems: 'center', marginBottom: 50, flexDirection: 'row' }}>
                  <Text
                    style={style.btnSimpanUn1}
                    onPress={() => {
                      this.setState({ detak: [], modaldetail: false })
                    }}>Kembali</Text>
                </View>
              </SafeAreaView>
            </View>
          </View>
        </Modal>

        <Modal
          animationType={"slide"}
          transparent={true}
          visible={this.state.st}
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
              height: '50%',
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
              <ScrollView style={{ width: '100%', height: '100%' }}>
                <View style={{ flexDirection: 'row' }}>
                  <TouchableOpacity onPress={() => { this.setState({ st: false }) }}>
                    <Image source={Union} style={{ width: 15, height: 15, marginLeft: 10, marginRight: 10, marginTop: 5 }}></Image>
                  </TouchableOpacity>
                  <Text style={{ fontWeight: 'bold', fontSize: 18 }}> Pilih Tanggal</Text>
                </View>

                <View style={{ marginBottom: 50, }}>
                  <View style={{ marginBottom: 25, marginLeft: 30 }}>
                    <View>
                      {/* <View style={{ marginLeft: -30, marginRight: 120, }}>
                      <Text style={{ margin: 15 }}>Semua Anak</Text>
                      <Text style={{ margin: 15 }}>Tahfidz</Text>
                      <Text style={{ margin: 15 }}>Non-Tahfidz</Text>
                    </View> */}

                      <RadioForm
                        radio_props={tgl}
                        onPress={(tgl) => {
                          this.setState({ tgl: tgl }),
                            ToastAndroid.show(tgl.toString(), ToastAndroid.SHORT)
                        }}
                        initial={0}
                        buttonSize={10}
                        buttonOuterSize={20}
                        radioStyle={{ marginRight: -20, marginBottom: 20, marginTop: 10 }}
                        animation={true}
                        formHorizontal={false}
                      >
                      </RadioForm>
                    </View>
                  </View>
                  {this.state.tgl === 'Pilih' ?
                    <View style={{ marginLeft: -10 }}>
                      <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-around' }} onPress={() => this.setState({ modaldate: true })}>
                        <Image source={date}
                          style={{
                            height: 30,
                            width: 30,
                            marginTop: 5,
                            marginLeft: 20,
                          }}></Image>
                        <Text style={{
                          color: '#000000',
                          marginTop: 2,
                          marginRight: 10,
                          borderRadius: 2,
                          borderWidth: 0.1,
                          fontSize: 18,
                          height: 40,
                          padding: 7,
                          width: '80%',
                          backgroundColor: '#F0F8FF',
                        }}></Text>
                      </TouchableOpacity>
                      <View style={{ margin: 10, }}></View>

                      <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-around' }} onPress={() => this.setState({ modaldate1: true })}>
                        <Image source={date}
                          style={{
                            height: 30,
                            width: 30,
                            marginTop: 5,
                            marginLeft: 20,
                          }}></Image>
                        <Text style={{
                          color: '#000000',
                          marginTop: 2,
                          marginRight: 10,
                          borderRadius: 2,
                          borderWidth: 0.1,
                          fontSize: 18,
                          height: 40,
                          width: '80%',
                          padding: 7,
                          backgroundColor: '#F0F8FF',
                        }}></Text>
                      </TouchableOpacity>
                    </View>
                    :
                    <View></View>
                  }
                </View>
                <View style={{ alignContent: 'center', justifyContent: 'center', alignItems: 'center', }}>
                  <TouchableOpacity style={style.btnSimpan}>
                    <Text style={{ color: '#fff' }}> Terapkan</Text>
                  </TouchableOpacity>
                </View>

              </ScrollView>
            </View>
          </View>
        </Modal>

        <Modal
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
              // flexDirection: 'row',
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
              height: '27%',
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
              <Text style={style.tglText}>Pilih Tanggal</Text>
              <ScrollView style={{ width: '100%', height: '100%' }}>

                <TouchableOpacity onPress={() => this.setState({ modaldate: false })} style={{ position: 'absolute', right: 20, top: 20 }}>
                  <Image source={x}
                    style={{
                      height: 30,
                      width: 30, alignItems: 'center',
                    }}></Image>
                </TouchableOpacity>
                <DatePicker
                  date={this.state.date}
                  placeholder="select date"
                  onDateChange={(date) =>
                    this.setState({ date }, () => console.log(this.state.date))
                  }
                  androidVariant="nativeAndroid"
                  mode='date'

                />
              </ScrollView>

            </View>
          </View>
        </Modal>

        <Modal
          animationType={"slide"}
          transparent={true}
          visible={this.state.modaldate1}
          style={{
            alignItems: 'center',
            justifyContent: 'center',

          }}>
          <View style={style.ModalCont2}>
            <View style={{
              paddingTop: 5,
              backgroundColor: '#ffffff',
              // flexDirection: 'row',
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
              height: '27%',
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
              <Text style={style.tglText}>Pilih Tanggal</Text>
              <ScrollView style={{ width: '100%', height: '100%' }}>

                <TouchableOpacity onPress={() => this.setState({ modaldate: false })} style={{ position: 'absolute', right: 20, top: 20 }}>
                  <Image source={x}
                    style={{
                      height: 30,
                      width: 30, alignItems: 'center',
                    }}></Image>
                </TouchableOpacity>
                <DatePicker
                  date={this.state.date}
                  placeholder="select date"
                  onDateChange={(date) =>
                    this.setState({ date }, () => console.log(this.state.date))
                  }
                  androidVariant="nativeAndroid"
                  mode='date'

                />
              </ScrollView>
            </View>
          </View>
        </Modal>

        <Modal
          animationType={"slide"}
          transparent={true}
          visible={this.state.jk}
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
              height: '30%',
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
                <View style={{ flexDirection: 'row' }}>
                  <TouchableOpacity onPress={() => { this.setState({ jk: false }) }}>
                    <Image source={Union} style={{ width: 15, height: 15, marginLeft: 10, marginRight: 10, marginTop: 5 }}></Image>
                  </TouchableOpacity>
                  <Text style={{ fontWeight: 'bold', fontSize: 18 }}> Pilih Jenis Kelamin</Text>
                </View>

                <View style={{ marginBottom: 25, marginLeft: 30 }}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignContent: 'space-between' }}>
                    {/* <View style={{ marginLeft: -30, marginRight: 120, }}>
                      <Text style={{ margin: 15 }}>Semua Anak</Text>
                      <Text style={{ margin: 15 }}>Tahfidz</Text>
                      <Text style={{ margin: 15 }}>Non-Tahfidz</Text>
                    </View> */}

                    <RadioForm
                      radio_props={this.state.jenisK}
                      onPress={(jenisK) => { ToastAndroid.show(jenisK.toString(), ToastAndroid.SHORT) }}
                      initial={0}
                      buttonSize={10}
                      buttonOuterSize={20}
                      radioStyle={{ marginRight: -20, marginBottom: 20, marginTop: 10 }}
                      animation={true}
                      formHorizontal={false}
                    >
                    </RadioForm>
                  </View>
                  <View style={{ alignContent: 'center', justifyContent: 'center', alignItems: 'center', }}>
                    <TouchableOpacity style={style.btnSimpan}>
                      <Text style={{ color: '#fff' }}> Terapkan</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </SafeAreaView>
            </View>
          </View>
        </Modal>

        <Modal
          animationType={"slide"}
          transparent={true}
          visible={this.state.sa}
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
              height: '30%',
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
                <View style={{ flexDirection: 'row' }}>
                  <TouchableOpacity onPress={() => { this.setState({ sa: false }) }}>
                    <Image source={Union} style={{ width: 15, height: 15, marginLeft: 10, marginRight: 10, marginTop: 5 }}></Image>
                  </TouchableOpacity>
                  <Text style={{ fontWeight: 'bold', fontSize: 18 }}> Pilih Jenis Anak</Text>
                </View>

                <View style={{ marginBottom: 25, marginLeft: 30 }}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignContent: 'space-between' }}>
                    {/* <View style={{ marginLeft: -30, marginRight: 120, }}>
                      <Text style={{ margin: 15 }}>Semua Anak</Text>
                      <Text style={{ margin: 15 }}>Tahfidz</Text>
                      <Text style={{ margin: 15 }}>Non-Tahfidz</Text>
                    </View> */}

                    <RadioForm
                      radio_props={this.state.jenisA}
                      onPress={(value) => { ToastAndroid.show(value.toString(), ToastAndroid.SHORT) }}
                      initial={0}
                      buttonSize={10}
                      buttonOuterSize={20}
                      radioStyle={{ marginRight: -20, marginBottom: 20, marginTop: 10 }}
                      animation={true}
                      formHorizontal={false}
                    >
                    </RadioForm>
                  </View>

                  <View style={{ alignContent: 'center', justifyContent: 'center', alignItems: 'center', marginTop: -10 }}>
                    <TouchableOpacity style={style.btnSimpan}>
                      <Text style={{ color: '#fff' }}> Terapkan</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </SafeAreaView>
            </View>
          </View>
        </Modal>

        <Modal
          animationType={"slide"}
          transparent={true}
          visible={this.state.modaldetail}
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
                <View style={style.wrap}>
                  <ScrollView
                    onScroll={({ nativeEvent }) => this.change(nativeEvent)}
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled
                    horizontal
                    style={style.wrap}
                  >
                  </ScrollView>
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center', alignContent: 'center', }}>
                  <Image source={email} style={{ height: 150, width: '50%', marginLeft: 10, }} />
                </View>
                <ScrollView>
                  <View>
                    <TouchableOpacity onLongPress={() => { this.setState({ detak: [], modaldetail: false }) }}>
                      <Text style={{
                        marginTop: 10,
                        marginBottom: 10,
                        textAlign: 'center',
                        fontSize: 16,
                        fontWeight: 'bold',
                      }}>Detail</Text>
                      <View style={{ marginLeft: 20, flexDirection: 'column' }}>
                        <View style={{ flexDirection: 'row', }}>
                          <Text>
                            Jenis Kegiatan
                          </Text>
                          <Text style={{ marginLeft: 20, }}>
                            :Bimbel
                          </Text>
                        </View>
                        <View style={{ flexDirection: 'row', }}>
                          <Text>
                            Materi
                          </Text>
                          <Text style={{ marginLeft: 75, }}>
                            :Matematika bilangan cacah
                          </Text>
                        </View>

                        <View style={{ flexDirection: 'row', }}>
                          <Text>
                            Kehadiran
                          </Text>
                          <Text style={{ marginLeft: 52, }}>
                            :Hadir
                          </Text>
                        </View>

                        <View style={{ flexDirection: 'row', }}>
                          <Text>
                            Tanggal
                          </Text>
                          <Text style={{ marginLeft: 65, }}>
                            :Matematika 50
                          </Text>
                        </View>

                        <View style={{ flexDirection: 'row', }}>
                          <Text>
                            Pengajar
                          </Text>
                          <Text style={{ marginLeft: 60, }}>
                            :Tutor Test
                          </Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  </View>

                </ScrollView>
                <View style={{ alignContent: 'center', justifyContent: 'center', alignItems: 'center', marginBottom: 50, flexDirection: 'row' }}>
                  <Text
                    style={style.btnSimpanUn1}
                    onPress={() => {
                      this.setState({ detak: [], modaldetail: false })
                    }}>Kembali</Text>
                </View>
              </SafeAreaView>
            </View>
          </View>
        </Modal>
      </View>

    )
  }
}
const style = StyleSheet.create({
  contentContainer: {
    backgroundColor: '#fff',
    width: '100%',
    height: '100%',
  },
  contentContainer1: {
    justifyContent: 'space-between',
    alignContent: 'space-between'
  },
  pencarian: {
    borderRadius: 10,
    borderWidth: 1,
    width: 120,
    height: 40,
    padding: 8,
    justifyContent: 'space-between',
    alignContent: 'space-between',
    borderColor: '#E9E9E9',
    margin: 10
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
  Labeltgl: {
    marginTop: 5,
    position: 'absolute',
    top: 0, left: 10, right: 0, bottom: 0,
    height: 25, width: 25,
  },
  itemText: {
    textAlign: 'justify',
    marginLeft: 10,
    fontSize: 12,
    width: '35%',
    height: 43,
  },
  ModalCont2: {
    flex: 1,
    backgroundColor: '#00000079',
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
  btnSimpan: {
    width: '60%',
    fontWeight: 'bold',
    backgroundColor: '#00A9B8',
    borderRadius: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#E9E9E9',
    justifyContent: 'center', alignItems: 'center',
    alignContent: 'center',
    textAlign: 'center',
  },
  kotakbaru1: {
    shadowColor: "#333",
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
    backgroundColor: '#fff'
  },
  iconbesar: {
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  btnSimpanbaru: {
    width: '40%',
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
  btnFilt: {
    width: '30%',
    borderRadius: 10,
    padding: 10,
    borderWidth: 1,
    color: '#fff',
    borderColor: '#E9E9E9',
  },
  kotak7: {
    marginTop: 10,
    color: '#000',
    borderRadius: 10,
    borderWidth: 0.1,
    fontSize: 13,
    height: 50,
    width: windowWidth - 130,
    padding: 12,
    backgroundColor: '#fff',
    borderColor: '#DDDDDD',
    borderWidth: 1,
    fontFamily: 'Poppins-Regular',
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
export default connect(mapStateToProps, mapDispatchToProps)(Absen);