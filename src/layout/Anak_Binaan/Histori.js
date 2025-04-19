import {
  Image, Text, View, TouchableOpacity, StyleSheet,
  ScrollView, SafeAreaView, ToastAndroid, TextInput, RefreshControl, Modal, FlatList
} from 'react-native'
import React, { Component } from 'react'
import CheckBox from '@react-native-community/checkbox';
import * as ImagePicker from 'react-native-image-picker';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import { email, Calendar, rawat } from '../../assets/images'
import { Tamnak } from '../../assets/icons'
import { connect } from 'react-redux'
import moment from 'react-moment';
import AsyncStorage from '@react-native-async-storage/async-storage';

class Histori extends Component {
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
      total: null,
      tat: 0,
      Musibah: '',
      Sakit: '',
      Histori: '',
      Opname: '',
      show: 0,
      checked: 0,
      count: 1,
      his: '',
      rf: [],
      itemSelected: '',
      modaldetail: false,
      histori: [],
      refreshing: true,
      detail: this.props.route.params.id_anak,

    }
  }
  takePic(index) {
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
        (response) => {
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
              }
              //   id: 0,
            };
            console.log('ini gambar = ', source);
            this.setState(prevState => {
              prevState.hisimg[index] = source
              //   prevState.tgl_lahir[index] != this.props.route.params.tgl_lahir[index] ? this.setState({tglmbuh : true}) : this.setState({tglmbuh : false});
              return {
                hisimg: prevState.hisimg
              }
            }, () => console.log(this.state.hisimg));
            this.setState({
              total: index,
              tat: index,
            });
            console.log('ini gambar = ', this.state.hisimg);
          }
        },
      );
    }
  }
  componentDidMount() {
    this.GetDetAPi(),
      console.log(this.props);
  }


  GetDetAPi() {
    AsyncStorage.getItem('token').then((token) => {
      fetch('https://kilauindonesia.org/datakilau/api/detailanakriwayat/' + this.state.detail, {
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
            histori: resJson.data,
            filter: resJson.data,
            refreshing: false,
          });
        })
        .catch((err) => console.log('error catch home', err));
    });
  }
  onRefresh() {
    this.GetDetAPi();
    this.setState({ refreshing: false });
  }
  render() {
    var Histori = [
      { label: 'Sakit  ', value: 'Sakit' },
      { label: 'Musibah ', value: 'Musibah' }
    ];
    var Opname = [
      { label: 'Ya  ', value: 'Ya' },
      { label: 'Tidak', value: 'Tidak' }
    ];
    const inputbutton = [];
    for (let i = 0; i < this.state.count; i++) {
      <><View key={i}>
        <Text>{i + 1}.</Text>
       
      </View></>
    }
    var hisimg = [];
    for (let i = 0; i <= this.state.tat; i++) {
      hisimg.push(
        <Image
          style={{ width: 200, height: 200, resizeMode: 'contain' }}
          source={this.state.hisimg[i].image}
        />
      )
    }
    return (
      <View contentContainer style={style.contentContainer} showsVerticalScrollIndicator={true}>
        <View style={{ backgroundColor: '#0EBEDF' }}>
          <Text style={style.title2}>Histori</Text>
        </View>
        {this.props.user.presensi === '' ? //pengelola dan admin
          <FlatList
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={() => this.onRefresh()}
              />
            }
            data={this.state.histori}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => { this.setState({ modaldetail: true }) }}>
                <View style={style.kotakabu}>
                  <Image source={{ uri: 'https://kilauindonesia.org/datakilau/gambarUpload/' + item.foto }} style={style.img}></Image>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                    <View style={{ flexDirection: 'column' }}>
                      <Text style={style.labelbaru}>{item.jenis_histori}</Text>
                      <Text style={style.labelbaru2}>{item.nama_histori}</Text>
                      <Text style={style.labelbaru2}>{item.di_rawatdi}</Text>
                    </View>
                    <View style={{ flexDirection: 'column' }}>
                      <Text style={style.labelbaru1}>{item.tanggal}</Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            )}
            keyExtractor={
              (item, index) => index.toString()}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={() =>
              <View>
                <View style={{ flexDirection: 'column', }}>
                  <View style={style.iconbesar}>
                    <Tamnak />
                  </View>
                  <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'center', }}>Anak Asuh</Text>
                  <Text style={{ fontSize: 12, textAlign: 'center', }}>Tidak Memiliki Riwayat Sakit/Kecelakaan</Text>
                </View>
              </View>
            }>
          </FlatList>



          :
          <View />
        }

        {this.props.user.presensi === 'admin' ? //donatur
          <ScrollView style={{ backgroundColor: '#fff' }}>
            <View style={{ backgroundColor: '#0EBEDF' }}>
              <Text style={style.title1}>Histori</Text>
            </View>
            <FlatList
              data={this.state.histori}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => { this.setState({ modaldetail: true }) }}>
                  <View style={style.kotakabu}>
                    <Image source={{ uri: 'https://kilauindonesia.org/datakilau/gambarUpload/' + item.foto }} style={style.img}></Image>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                      <View style={{ flexDirection: 'column' }}>
                        <Text style={style.labelbaru}>{item.jenis_histori}</Text>
                        <Text style={style.labelbaru2}>{item.nama_histori}</Text>
                        <Text style={style.labelbaru2}>{item.di_rawatdi}</Text>
                      </View>
                      <View style={{ flexDirection: 'column' }}>
                        <Text style={style.labelbaru1}>{item.tanggal}</Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              )}
              keyExtractor={
                (item, index) => index.toString()}
              showsVerticalScrollIndicator={false}
              ListEmptyComponent={() =>
                <View>
                  <View style={{ flexDirection: 'column', }}>
                    <View style={style.iconbesar}>
                      <Tamnak />
                    </View>
                    <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'center', }}>Anak Asuh</Text>
                    <Text style={{ fontSize: 12, textAlign: 'center', }}>Tidak Memiliki Riwayat Sakit/Kecelakaan</Text>
                  </View>


                </View>
              }>
            </FlatList>


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
                          <View style={{ margin: 10, }}>
                            <Text>
                              Nama Penyakit
                            </Text>
                            <Text>
                              Jenis Histori
                            </Text>
                            <Text>
                              Tanggal
                            </Text>
                            <Text>
                              Dirawat
                            </Text>
                            <Text>
                              Diopname
                            </Text>
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
          </ScrollView>

          :
          <View />
        }
        {this.props.user.presensi === '' ? //pengelola
          <View style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center', alignSelf: 'center', marginTop: 20, position: 'absolute' }}>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('DetailTamRiwayat', { detail: this.state.detail })} style={style.refresh} >
              <View style={{
                backgroundColor: '#0EBEDF', width: 170, height: 40, justifyContent: 'center', alignContent: 'center', alignItems: 'center', alignSelf: 'center', borderRadius: 10
              }}>
                <Text style={{ color: '#fff', textAlign: 'center', justifyContent: 'center', alignContent: 'center' }}>+ Tambah Riwayat </Text>
              </View>
            </TouchableOpacity>
          </View>
          : <View />}
      </View>


    )
  }
}
const style = StyleSheet.create({
  contentContainer: {
    backgroundColor: '#fff',
    width: '100%',
    height: '100%',
    flex: 1
  },
  Label1: {
    flex: 1,
    fontSize: 12,
    padding: 5,
    color: '#000000',
    flexDirection: 'column',
  },
  ModalCont2: {
    flex: 1,
    backgroundColor: '#00000079',
  },
  Textinputcss: {
    color: '#7e7e7e',
    marginLeft: 30,
    marginRight: 10,
    borderRadius: 10,
    borderWidth: 1,
    fontSize: 12,
    height: 52,
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
  Label2: {
    marginTop: 5,
    marginLeft: 25,
    padding: 5,
    color: '#000',
    alignItems: 'center',
    justifyContent: 'center'
  },
  kotak2: {
    color: '#000000',
    marginLeft: 30,
    marginRight: 10,
    borderRadius: 2,
    borderWidth: 0.1,
    fontSize: 12,
    height: 52,
    backgroundColor: '#7e7e7',
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
  item: {
    flex: 1,
    fontSize: 16,
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 17,
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
  container: {
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
  checkbox: {
    flexDirection: 'row',
    alignContent: 'space-between',
    alignItems: 'center',
    marginLeft: 30,
    margin: 20,
  },
  Label3: {
    marginTop: 5,
    marginBottom: -25,
    marginLeft: 25,
    padding: 5,
    width: '100%',
    color: '#000',
    alignItems: 'center',
    justifyContent: 'center'
  },
  radio: {
    flexDirection: 'row',
    marginLeft: 30,
    margin: 20,
    paddingRight: 10
  },
  img: {
    height: 20,
    width: 20
  },
  img: {
    height: 20,
    width: 20,
  },
  btn: {
    flexDirection: 'row'
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
    height: 250,
    borderRadius: 15,
    borderWidth: 1,
    marginLeft: 10,
    marginTop: 10,
    borderColor: '#E9E9E9',
    backgroundColor: '#fff',
    color: '#000'
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
    marginLeft: 25,
    marginTop: 10,
    width: '80%'
  },
  labelbaru2: {
    fontSize: 12,
    marginLeft: 10,
    marginTop: 10
  },
  iconbesar: {
    marginTop: 50,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  img2: {
    width: '100%',
    height: 150,
    marginTop: 10,
    borderRadius: 10,
  }, //vildan
  labelbaru3: {
    fontSize: 14,
    marginTop: '5%',
    color: '#000',
    fontFamily: 'Poppins-Regular',
  }, //vildan
  labelbaru4: {
    fontSize: 12,
    color: '#000'
  }, //vildan
  labelbaru5: {
    fontSize: 12,
    marginLeft: 10,
    color: '#000'
  }, //vildan
  refresh: {
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    // marginHorizontal: 5,
    bottom: 10,
    position: 'absolute',
    top: 600
  },//vildan
  title2: {
    marginRight: 20,
    marginLeft: 20,
    marginTop: 15,
    marginBottom: 15,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
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
export default connect(mapStateToProps, mapDispatchToProps)(Histori);