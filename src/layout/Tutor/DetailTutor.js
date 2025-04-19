import {
  StyleSheet,
  Text,
  View,
  Alert,
  Modal,
  TouchableOpacity, ScrollView, TextInput, SafeAreaView, ToastAndroid, Image, FlatList, ImageBackground
} from 'react-native'
import React, { Component } from 'react'
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
// import Modal from 'react-native-modal'
import { BackHitam, Kelamin, Pesan, Telpon, Buku, NameCard, Backputih, Backhitam, Secul, Lokasi, User } from '../../assets/icons'
import { email, Union, search, test } from '../../assets/images';
// import {ModalPicker} from './ModalPicker'



export class DetailTutor extends Component {
  state = {
    detail: this.props.route.params.detail,
    // det: [],
    Almt: false,
    Email: false,
    Sekolah: false,
    modalNama: false,
    Telepon: false,
    Kelamin: false,
    Mapel: false,
    Tujuan: '',
    jk: false,
    jenisK: [

      { value: 'Laki-Laki', label: 'Laki-Laki ', },

    ],
    jenisK1: [


      { value: 'Perempuan', label: 'Perempuan', }
    ],
    Pelajaran: [

      { value: 'Bahasa Indonesia', label: 'Bahasa Indonesia', },
      { value: 'Matematika', label: 'Matematika', },
      { value: 'Biologi', label: 'Biologi', },
      { value: 'Kimia', label: 'Kimia', },
    ],
    Secula: [

      { value: 'SMA', label: 'SMA', },
      { value: 'S1', label: 'S1', },
      { value: 'S2', label: 'S2', },
      { value: 'S3', label: 'S3', },

    ],


    // modalEmail : false
  };

  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  }
  // GetDetAPi() {
  //   fetch('https://kilauindonesia.org/datakilau/api/tutor/' + this.state.detail)
  //     .then(res => {
  //       if (res.status === 200)
  //         return res.json()
  //     }).then(resdata => {
  //       console.log(resdata.data)
  //       this.setState({
  //         det: resdata.data,
  //       })
  //     })
  // }
  componentDidMount() {
    // this.GetDetAPi(),
    console.log('hai', this.state.detail);
  }
  render() {
    const detail = this.state.detail
    // const { modalEmail } = this.state;
    var Pelajaran = [

      { value: 'Bahasa Indonesia', label: 'Bahasa Indonesia', },
      { value: 'Matematika', label: 'Matematika', },
      { value: 'Biologi', label: 'Biologi', },
      { value: 'Kimia', label: 'Kimia', },
    ];

    var semester = [
      { value: 'Laki-Laki', label: 'Laki-Laki ', },
      { value: 'Perempuan', label: 'Perempuan', }
    ];
    return (

      <ScrollView style={{ backgroundColor: '#fff' }}>

        <BackHitam style={{ flex: 1, marginVertical: '5%', marginLeft: '7%' }} />

        <View style={style.contain}>
          <Image source={test} style={{ width: 150, height: 150, borderRadius: 70, justifyContent: 'center', alignSelf: 'center', marginTop: 50, }}></Image>

          <TouchableOpacity>
            <View style={style.bodyContent}>
              <Text style={style.info}>Ubah Foto Profil</Text>
            </View>
          </TouchableOpacity>

          {/*vv*/}
          <TouchableOpacity
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
            onPress={() => this.setState({ modalNama: true })}
          >
            <View style={{ flexDirection: 'row' }}>
              <NameCard />
              <Text style={style.info2}>{detail.nama}</Text>
            </View>
            <BackHitam style={{ flex: 1, marginTop: 10, paddingRight: '10%' }} />
          </TouchableOpacity>

          <TouchableOpacity
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
            onPress={() => this.setState({ Mapel: true })}
          >
            <View style={{ flexDirection: 'row' }}>
              <Buku />
              <Text style={style.info2}>{detail.mapel}</Text>
            </View>
            <BackHitam style={{ flex: 1, marginTop: 10, paddingRight: '10%' }} />
          </TouchableOpacity>

          <TouchableOpacity
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
            onPress={() => this.setState({ Email: true })}
          >
            <View style={{ flexDirection: 'row' }}>
              <Pesan />
              <Text style={style.info2}>{detail.email}</Text>
            </View>
            <BackHitam style={{ flex: 1, marginTop: 10, paddingRight: '10%' }} />
          </TouchableOpacity>

          <TouchableOpacity
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
            onPress={() => this.setState({ Telepon: true })}
          >
            <View style={{ flexDirection: 'row' }}>
              <Telpon />
              <Text style={style.info2}>{detail.no_hp}</Text>
            </View>
            <BackHitam style={{ flex: 1, marginTop: 10, paddingRight: '10%' }} />
          </TouchableOpacity>
          <TouchableOpacity
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
            onPress={() => this.setState({ Sekolah: true })}
          >
            <View style={{ flexDirection: 'row' }}>
              <Secul />
              <Text style={style.info2}>{detail.pendidikan}</Text>
            </View>
            <BackHitam style={{ flex: 1, marginTop: 10, paddingRight: '10%' }} />
          </TouchableOpacity>

          <View
            style={{
              borderWidth: 0.5,
              borderBottomColor: '#C0C0C0',
              justifyContent: 'center',
              marginBottom: 10,
              marginRight: '5%',
              marginLeft: '5%',
              marginTop: '1%',
            }}
          />
          <View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <View style={{ flexDirection: 'row' }}>
                <Lokasi />
                <Text style={style.info2}>Lokasi</Text>
              </View>
              <Text
                onPress={() => this.setState({ Almt: true })}
                style={style.in}>Edit</Text>
            </View>

            <TextInput
              style={style.alamat}
              placeholder='Alamat'
              autoCapitalize="words"
              textAlign="left"
              placeholderTextColor='Black'
              onChangeText={Tujuan => this.setState({ Tujuan })}
              value={detail.alamat}
              multiline={true}
            />
          </View>
        </View>


        <Modal animationType={"fade"} transparent={true}
          visible={this.state.modalNama}
          onRequestClose={() => this.setState({ modalNama: false })}>
          <SafeAreaView style={{
            backgroundColor: '#ffffff',
            alignItems: 'center',
            justifyContent: 'center',
            alignContent: 'center',
          }}>
            <TouchableOpacity activeOpacity={1.0} onPress={() => this.setState({ modalNama: false })} style={style.ModalCont}>
              <View style={{
                paddingTop: 5,
                marginHorizontal: 5,
                marginTop: '190%',
                backgroundColor: '#ffffff',
                borderRadius: 20,
                height: 180,
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
                flexDirection: 'column',
              }}>
                <SafeAreaView style={{ alignItems: 'center' }}>
                  <View >
                    <Text style={{ color: '#000', fontFamily: 'Poppins-Regular', fontSize: 14, marginBottom: 15, textAlign: 'center' }}>Ubah Nama</Text>
                    <TextInput style={style.input2}
                      textAlign="left"
                      placeholder="Masukan Nama" />
                    <View style={{ marginTop: '2%', marginRight: '5%', elevation: 1, alignItems: 'center', flexDirection: 'row', alignContent: 'center', marginLeft: '5%' }}>
                      <TouchableOpacity onPress={() => this.setState({ modalNama: false }) + ToastAndroid.show('Batal Disimpan', ToastAndroid.SHORT)}>
                        <View style={{ height: '50%', borderColor: '#00A9B8', borderWidth: 1, width: 100, justifyContent: 'center', alignItems: 'center', alignSelf: 'center', borderRadius: 5 }}>
                          <Text style={{ color: '#00A9B8', fontFamily: 'Poppins-Medium', fontSize: 14 }}>Batal</Text>
                        </View>
                      </TouchableOpacity>
                      <View style={{ width: 20 }} />
                      <TouchableOpacity onPress={() => this.setState({ modalNama: false }) + ToastAndroid.show('Data Berhasil Disimpan', ToastAndroid.SHORT)}>
                        <View style={{ height: '50%', backgroundColor: '#00A9B8', width: 100, justifyContent: 'center', alignItems: 'center', alignSelf: 'center', borderRadius: 5 }}>
                          <Text style={{ color: '#fff', fontFamily: 'Poppins-Medium', fontSize: 14 }}>Simpan</Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                </SafeAreaView>
              </View>
            </TouchableOpacity>
          </SafeAreaView>
        </Modal>

        <Modal animationType={"fade"} transparent={true}
          visible={this.state.Telepon}
          onRequestClose={() => { Telepon(true); }}>
          <SafeAreaView style={{
            backgroundColor: '#ffffff',
            alignItems: 'center',
            justifyContent: 'center',
            alignContent: 'center',
          }}>
            <TouchableOpacity activeOpacity={1.0} onPress={() => this.setState({ Telepon: false })} style={style.ModalCont}>
              <View style={{
                paddingTop: 5,
                marginHorizontal: 5,
                marginTop: '190%',
                backgroundColor: '#ffffff',
                borderRadius: 20,
                height: 180,
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
                flexDirection: 'column',
              }}>
                <SafeAreaView style={{ alignItems: 'center' }}>
                  <View >
                    <Text style={{ color: '#000', fontFamily: 'Poppins-Regular', fontSize: 14, marginBottom: 15, textAlign: 'center' }}>Ubah Nama</Text>
                    <TextInput style={style.input2}
                      textAlign="left"
                      placeholder="Masukan Nomor"
                      keyboardType='numeric'
                      maxLength={12}
                    />
                    <View style={{ marginTop: '2%', marginRight: '5%', elevation: 1, alignItems: 'center', flexDirection: 'row', alignContent: 'center', marginLeft: '5%' }}>
                      <TouchableOpacity onPress={() => this.setState({ Telepon: false }) + ToastAndroid.show('Batal Disimpan', ToastAndroid.SHORT)}>
                        <View style={{ height: '50%', borderColor: '#00A9B8', borderWidth: 1, width: 100, justifyContent: 'center', alignItems: 'center', alignSelf: 'center', borderRadius: 5 }}>
                          <Text style={{ color: '#00A9B8', fontFamily: 'Poppins-Medium', fontSize: 14 }}>Batal</Text>
                        </View>
                      </TouchableOpacity>
                      <View style={{ width: 20 }} />
                      <TouchableOpacity onPress={() => this.setState({ Telepon: false }) + ToastAndroid.show('Data Berhasil Disimpan', ToastAndroid.SHORT)}>
                        <View style={{ height: '50%', backgroundColor: '#00A9B8', width: 100, justifyContent: 'center', alignItems: 'center', alignSelf: 'center', borderRadius: 5 }}>
                          <Text style={{ color: '#fff', fontFamily: 'Poppins-Medium', fontSize: 14 }}>Simpan</Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>

                </SafeAreaView>
              </View>
            </TouchableOpacity>
          </SafeAreaView>
        </Modal>


        <Modal animationType={"fade"} transparent={true}
          visible={this.state.Email}
          onRequestClose={() => { Email(true); }}>
          <SafeAreaView style={{
            backgroundColor: '#ffffff',
            alignItems: 'center',
            justifyContent: 'center',
            alignContent: 'center',
          }}>
            <TouchableOpacity activeOpacity={1.0} onPress={() => this.setState({ Email: false })} style={style.ModalCont}>
              <View style={{
                paddingTop: 5,
                marginHorizontal: 5,
                marginTop: '190%',
                backgroundColor: '#ffffff',
                // flexDirection: 'row',
                borderRadius: 20,
                height: 180,
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
                flexDirection: 'column',
              }}>
                <SafeAreaView style={{ alignItems: 'center' }}>
                  <View >
                    <Text style={{ color: '#000', fontFamily: 'Poppins-Regular', fontSize: 14, marginBottom: 15, textAlign: 'center' }}>Ubah Email</Text>
                    <TextInput style={style.input2}
                      textAlign="left"
                      placeholder="Masukan E-mail" />
                    <View style={{ marginTop: '2%', marginRight: '5%', elevation: 1, alignItems: 'center', flexDirection: 'row', alignContent: 'center', marginLeft: '5%' }}>
                      <TouchableOpacity onPress={() => this.setState({ Email: false }) + ToastAndroid.show('Batal Disimpan', ToastAndroid.SHORT)}>
                        <View style={{ height: '50%', borderColor: '#00A9B8', borderWidth: 1, width: 100, justifyContent: 'center', alignItems: 'center', alignSelf: 'center', borderRadius: 5 }}>
                          <Text style={{ color: '#00A9B8', fontFamily: 'Poppins-Medium', fontSize: 14 }}>Batal</Text>
                        </View>
                      </TouchableOpacity>
                      <View style={{ width: 20 }} />
                      <TouchableOpacity onPress={() => this.setState({ Email: false }) + ToastAndroid.show('Data Berhasil Disimpan', ToastAndroid.SHORT)}>
                        <View style={{ height: '50%', backgroundColor: '#00A9B8', width: 100, justifyContent: 'center', alignItems: 'center', alignSelf: 'center', borderRadius: 5 }}>
                          <Text style={{ color: '#fff', fontFamily: 'Poppins-Medium', fontSize: 14 }}>Simpan</Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>

                </SafeAreaView>
              </View>
            </TouchableOpacity>
          </SafeAreaView>
        </Modal>

        <Modal
          animationType={"slide"}
          transparent={true}
          visible={this.state.jk}
        >
          <View style={style.ModalCont2}>
            <View style={{
              paddingTop: 5,
              backgroundColor: '#ffffff',
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
              height: '35%',
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
                  <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 18 }}> Pilih Jenis Kelamin</Text>
                </View>
                <View style={{ marginTop: '5%', marginBottom: '20%', marginLeft: '10%' }}>
                  <View style={{ flexDirection: 'column', justifyContent: 'space-between', alignContent: 'space-between' }}>
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
                      radioStyle={{ marginRight: -20, marginBottom: '4%', marginTop: 10 }}
                      animation={true}
                      formHorizontal={false}
                    >
                    </RadioForm>
                    <View style={{
                      borderBottomColor: '#C0C0C0',
                      borderBottomWidth: 1,
                      width: '95%',
                      marginRight: '10%',
                      justifyContent: 'center',
                      alignItems: 'center',
                      alignSelf: 'center',
                      marginBottom: 10,
                      marginLeft: '3%',

                    }}
                    />
                    <RadioForm
                      radio_props={this.state.jenisK1}
                      onPress={(jenisK1) => { ToastAndroid.show(jenisK1.toString(), ToastAndroid.SHORT) }}
                      initial={0}

                      buttonSize={10}
                      buttonOuterSize={20}
                      radioStyle={{ marginRight: -20, marginBottom: '4%', marginTop: 10 }}
                      animation={true}
                      formHorizontal={false}
                    >
                    </RadioForm>
                    <View style={{
                      borderBottomColor: '#C0C0C0',
                      borderBottomWidth: 1,
                      width: '95%',
                      marginRight: '10%',
                      justifyContent: 'center',
                      alignItems: 'center',
                      alignSelf: 'center',
                      marginBottom: 10,
                      marginLeft: '3%',

                    }}
                    />
                  </View>
                  <View style={{ marginTop: '5%', alignContent: 'center', justifyContent: 'center', alignItems: 'center', }}>
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
          visible={this.state.Mapel}
        >
          <View style={style.ModalCont2}>
            <View style={{
              paddingTop: 5,
              backgroundColor: '#ffffff',
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
              height: '60%',
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
                  <TouchableOpacity onPress={() => { this.setState({ Mapel: false }) }}>
                    <Image source={Union} style={{ width: 15, height: 15, marginLeft: 10, marginRight: 10, marginTop: 5 }}></Image>
                  </TouchableOpacity>
                  <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 18 }}> Pilih Pelajaran</Text>
                </View>
                <View style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  alignSelf: 'center',
                  height: 35,
                  width: '85%',
                  marginTop: 10,
                  marginBottom: 10,
                  borderRadius: 5,

                }}>
                  <TextInput
                    placeholder='Cari Mata Pelajaran' onChangeText={text => { this.filterList(text.toLowerCase()); }}
                    style={style.searchBar}>
                  </TextInput>
                  <Image source={search} style={style.ImageStyle}></Image>
                </View>
                <View style={{
                  borderBottomColor: '#C0C0C0',
                  borderBottomWidth: 1,
                  width: '85%',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignSelf: 'center',
                }}
                />
                <View style={{ marginBottom: 25, marginLeft: 30 }}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignContent: 'space-between' }}>
                    <RadioForm
                      radio_props={this.state.Pelajaran}
                      onPress={(Pelajaran) => { ToastAndroid.show(Pelajaran.toString(), ToastAndroid.SHORT) }}
                      initial={0}
                      buttonSize={10}
                      buttonOuterSize={20}
                      radioStyle={{ marginRight: -20, marginBottom: '20%', marginTop: 10 }}
                      animation={true}
                      formHorizontal={false}
                    >
                    </RadioForm>
                  </View>
                  <View>
                    <View style={{
                      borderBottomColor: '#C0C0C0',
                      borderBottomWidth: 1,
                      width: '95%',
                      marginRight: '10%',
                      justifyContent: 'center',
                      alignItems: 'center',
                      alignSelf: 'center',
                      marginBottom: 10,
                      marginTop: -5,
                    }}
                    />
                  </View>
                  <View style={{ marginRight: '10%', alignContent: 'center', justifyContent: 'center', alignItems: 'center', }}>
                    <TouchableOpacity style={style.btnSimpan2}>
                      <Text style={{ color: '#fff' }}> Terapkan</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </SafeAreaView>
            </View>
          </View>
        </Modal>
        {/* modal buat pilh pendidikan */}


        <Modal
          animationType={"slide"}
          transparent={true}
          visible={this.state.Sekolah}
        >
          <View style={style.ModalCont2}>
            <View style={{
              paddingTop: 5,
              backgroundColor: '#ffffff',
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
              height: '60%',
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
                  <TouchableOpacity onPress={() => { this.setState({ Sekolah: false }) }}>
                    <Image source={Union} style={{ width: 15, height: 15, marginLeft: 10, marginRight: 10, marginTop: 5 }}></Image>
                  </TouchableOpacity>
                  <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 18, marginBottom: '10%' }}> Ubah Pendidikan</Text>
                </View>
                <View style={{ marginBottom: 25, marginLeft: 30 }}>
                  <View style={{ flexDirection: 'column', justifyContent: 'space-between', alignContent: 'space-between' }}>
                    <RadioForm
                      radio_props={this.state.Secula}
                      onPress={(Secula) => { ToastAndroid.show(Secula.toString(), ToastAndroid.SHORT) }}
                      initial={0}

                      buttonSize={10}
                      buttonOuterSize={20}
                      radioStyle={{ marginRight: -20, marginBottom: 20, marginTop: 10 }}
                      animation={true}
                      formHorizontal={false}
                    >
                    </RadioForm>

                  </View>
                  <View style={{ marginRight: '10%', alignContent: 'center', justifyContent: 'center', alignItems: 'center', }}>
                    <TouchableOpacity style={style.btnSimpan2}>
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
          visible={this.state.Almt}
        >
          <View style={style.ModalCont2}>
            <View style={{
              paddingTop: 5,
              backgroundColor: '#ffffff',
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
              height: '40%',
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
                  <TouchableOpacity onPress={() => { this.setState({ Almt: false }) }}>
                    <Image source={Union} style={{ width: 15, height: 15, marginLeft: 10, marginRight: 10, marginTop: 5 }}></Image>
                  </TouchableOpacity>
                  <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 18 }}> Ubah Alamat</Text>
                </View>

                <View style={{ marginBottom: 25, marginLeft: 30 }}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignContent: 'space-between' }}>
                    {/* <View style={{ marginLeft: -30, marginRight: 120, }}>
                      <Text style={{ margin: 15 }}>Semua Anak</Text>
                      <Text style={{ margin: 15 }}>Tahfidz</Text>
                      <Text style={{ margin: 15 }}>Non-Tahfidz</Text>
                    </View> */}
                    <TextInput
                      style={{
                        paddingTop: '-1%',
                        marginTop: '10%',
                        marginBottom: '8%',
                        borderRadius: 5,
                        borderColor: '#C0C0C0',
                        width: '90%',
                        height: 90,
                        alignItems: 'center',
                        alignSelf: 'center',
                        justifyContent: 'center',
                        borderWidth: 1,

                      }}

                      placeholder='Alamat'
                      autoCapitalize="words"
                      textAlign="left"
                      placeholderTextColor='Black'
                      onChangeText={Tujuan => this.setState({ Tujuan })}
                      value={this.state.Tujuan}
                      multiline={true}
                    />

                  </View>

                  <View style={{ marginRight: 25, alignContent: 'center', justifyContent: 'center', alignItems: 'center', }}>
                    <TouchableOpacity style={style.btnSimpan2}>
                      <Text style={{ color: '#fff' }}> Terapkan</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </SafeAreaView>
            </View>
          </View>
        </Modal>

      </ScrollView>

    )
  }
}
const style = StyleSheet.create({
  contain: {
    flexDirection: 'column',
    marginVertical: '-20%',
    marginHorizontal:20,
  },
  in: {
    fontSize: 16,
    color: "#00BFFF",
    paddingTop: '1%',
    paddingBottom: '3%',
    paddingRight: '5%'

  },
  inf: {
    flex: 1,
    fontSize: 15,
    fontWeight: 'bold',
    color: 'black',
    marginTop: '1%',
    marginBottom: '2%',
    paddingLeft: '13%'

  },
  Cover: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    flexWrap: 'wrap',
    flexDirection: 'row',
    marginBottom: '10%'




  },


  header: {
    flex: 1,
    backgroundColor: "#00BFFF",
    height: 200,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
  },
  avatar: {
    flex: 1,
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom: 6,
    alignSelf: 'center',

    marginTop: '10%',

  },



  bodyContent: {
    marginTop: -20,
    padding: 15,
    alignItems: 'center',
  },
  name: {
    fontSize: 28,
    color: "#696969",
    fontWeight: "600"
  },
  info: {
    fontSize: 16,
    color: "#00BFFF",
    marginTop: 10,
    paddingTop: '5%',
    paddingBottom: '3%',
  },
  info2: {
    flexDirection: 'row',
    justifyContent: 'center',
    fontSize: 18,
    paddingTop: '2%',
    justifyContent: 'center',
    paddingBottom: 20,
    paddingLeft: '5%',
    marginTop: -3,
    color: 'black',
    fontWeight: 'Bold',
  },






  alamat: {
    flexDirection: 'column',
    borderColor: '#CECBCB',
    borderRadius: 5,
    fontSize: 15,
    height: 80,
    borderWidth: 1,
    color: 'Grey',
    shadowRadius: 10,
    marginBottom: '50%',
    justifyContent: 'center',
    marginHorizontal: '10%',
    paddingVertical: 11
  },
  //Modal Style
  input2: {
    borderRadius: 5,
    borderColor: '#C0C0C0', alignSelf: 'center', paddingHorizontal: '25%',
    borderWidth: 1,
    height: '25%',
    marginTop: '5%'
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",

    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    // alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,

  },
  modalView2: {
    flexDirection: 'row',



  },
  button: {
    borderRadius: 20,
    padding: '6%',

    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    borderWidth: 1





  },
  buttonOpen: {
    backgroundColor: "#white",
    marginRight: '10%',
    borderColor: '#00A9B8'



  },
  buttonClose: {
    backgroundColor: "#00A9B8",
    borderColor: '#00A9B8'


  },
  textStyle: {
    color: "Black",
    fontWeight: "bold",
    textAlign: "center",


  },
  textStyle2: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    flexDirection: 'row',

  },

  modalText: {
    marginBottom: 15,
    textAlign: "center",
    justifyContent: 'center',
    flexDirection: 'column',
    fontWeight: 'bold'

  },
  radio: {
    flexDirection: 'row',
    alignContent: 'space-between',
    alignItems: 'center',
    marginLeft: 30,
    margin: 20,
  },

  ModalCont2: {

    flex: 1,
    // alignItems: 'center',
    backgroundColor: '#00000079',
  },
  ModalCont: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#00000099',
    paddingHorizontal: 10,
  },
  btnSimpan: {
    width: '60%',
    fontWeight: 'bold',
    backgroundColor: '#00A9B8',
    borderRadius: 10,
    padding: 10,
    marginRight: 1,
    borderWidth: 1,
    borderColor: '#E9E9E9',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    textAlign: 'center',
  },
  btnSimpan2: {
    width: '90%',
    fontWeight: 'bold',
    backgroundColor: '#00A9B8',
    borderRadius: 10,
    padding: 10,
    marginRight: 1,
    borderWidth: 1,
    borderColor: '#E9E9E9',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    textAlign: 'center',
  },

  ImageStyle: {
    height: 20,
    width: 20,
    alignItems: 'center',
  },
  searchBar: {
    fontSize: 12,
    width: '40%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    alignContent: 'center',
    marginTop: 5,

  },
});
export default DetailTutor