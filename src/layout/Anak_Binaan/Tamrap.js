import {
  Text, View, StyleSheet, TextInput, Image,
  ScrollView, SafeAreaView, TouchableOpacity,
  ToastAndroid, ImageBackground, Modal, FlatList, RefreshControl
} from 'react-native'
import React, { Component } from 'react'
import { Picker } from '@react-native-picker/picker';
import CheckBox from '@react-native-community/checkbox';
import * as ImagePicker from 'react-native-image-picker';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import { connect } from 'react-redux';
import { rapot, Calendar, juara, addfoto, } from '../../assets/images'
import { Arrowleft, Tamnak } from '../../assets/icons';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';

class Tamrap extends Component {
  constructor(props) {
    super(props)
    this.state = {
      gambar: '',
      rapimg: {
        0: {
          image: {
            name: '',
            type: '',
            uri: 'https://static.thenounproject.com/png/187803-200.png'
          },
        }
      },
      count: 1,
      tr: [],
      rap: '',
      img1: null,
      img2: 0,
      text: '',
      text1: '',
      text2: '',
      show: 0,
      pel: '',
      peltinggi: '',
      pelrendah: '',
      Ganjil: false,
      Genap: false,
      modaldetail: false,
      kelas: '',
      detanak: [],
      lv: '',
      sem: '',
      kel: '',
      detail: this.props.route.params.id_anak,
      rapot: '',
    }
  }
  GetDetAPi() {
    AsyncStorage.getItem('token').then((token) => {
      fetch('https://kilauindonesia.org/datakilau/api/detailanakrapot/' + this.state.detail, {
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
            detanak: resJson.data,
          });
        })
        .catch((err) => console.log('error catch home', err));
    });
  }

  onRefresh() {
    this.GetDetAPi();
    this.setState({ refreshing: false });
  }

  componentDidMount() {
    this.GetDetAPi();
    console.log(this.state.detanak);
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
              prevState.rapimg[index] = source
              
              return {
                rapimg: prevState.rapimg
              }
            }, () => console.log(this.state.rapimg));
            this.setState({
              img1: index,
              img2: index,
            });
            console.log('ini gambar = ', this.state.rapimg);
          }
        },
      );
    }
  }

  render() {
    const tingkatrap =
      this.state.detanak.filter((item, index) => {
        return this.state.detanak.findIndex(i => i.tingkat === item.tingkat) === index;
      })

    const kelasrap =
      this.state.detanak.filter((item, index) => {
        return this.state.detanak.findIndex(i => i.tingkat === this.state.lv && i.kelas === item.kelas) === index;
      })
    const semrap =
      this.state.detanak.filter((item, index) => {
        return this.state.detanak.findIndex(i => i.tingkat === this.state.lv && i.kelas === this.state.kel && i.semester === item.semester) === index;
      })

    const filrap = this.state.detanak.filter((item, index) =>
      this.state.lv != '' && this.state.kel === '' && this.state.sem === '' ?
        item.tingkat === this.state.lv :
        this.state.kel != '' && this.state.sem === '' ?
          item.tingkat === this.state.lv && item.kelas === this.state.kel :
          this.state.sem != '' ?
            item.tingkat === this.state.lv && item.kelas === this.state.kel && item.semester === this.state.sem :
            index === 0);
    const rap = this.state
    const terbaru = this.state.detanak.filter(function (result) {
      return result.lv === rap;
    });
    var rapimg = [];
    var semester = [
      { label: 'Ganjil ', value: 'Ganjil' },
      { label: 'Genap', value: 'Genap' }
    ];
    for (let i = 0; i <= this.state.img2; i++) {
      rapimg.push(
        <Image
          style={{ width: 200, height: 200, resizeMode: 'contain' }}
          source={this.state.rapimg[i].image}
        />
      )
    }

    return (
      <View contentContainer style={style.contentContainer} showsVerticalScrollIndicator={true}>
        <View style={{ backgroundColor: '#0EBEDF' }}>
          <Text style={style.title1}>Rapot Anak Asuh</Text>
        </View>
        {this.props.user.presensi === '' ? //pengelola dan admin cabang / pusat
          <ScrollView>
            <FlatList
              data={this.state.detanak}
              refreshControl={
                <RefreshControl
                  refreshing={this.state.refreshing}
                  onRefresh={() => this.onRefresh()}
                />
              }
              renderItem={({ item }) => (
                <View style={style.kotakabu}>
                  <Image source={
                    {
                      uri:
                        'https://kilauindonesia.org/datakilau/gambarUpload/' +
                        item.foto,
                    }}
                    style={style.img}></Image>
                  <View style={{ flexDirection: 'row' }}>
                    <View>
                      <View style={{ flexDirection: 'row', }}>
                        <View style={{ flexDirection: 'column' }}>
                          <View style={{ flexDirection: 'row' }}>
                            <Text style={style.labelkiri}>Nilai Tertinggi</Text>
                            <Text style={style.labelkanan}>{item.nilai_max}</Text>
                          </View>
                          <View style={{ flexDirection: 'row' }}>
                            <Text style={style.labelkiri}>Nilai Terendah</Text>
                            <Text style={style.labelkanan}>{item.nilai_min}</Text>
                          </View>
                        </View>
                      </View>
                      <View style={{ flexDirection: 'row', }}>
                        <Text style={style.labelkiri}>Nilai Rata-rata</Text>
                        <Text style={style.labelkanan1}>{item.nilai_rata_rata}</Text>
                        <Text style={style.labelkiri1}>Semester</Text>
                        <Text style={style.labelkanan1}>{item.semester}</Text>
                      </View>
                    </View>

                  </View>
                </View>
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
                    <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'center', }}>Anak Asuh Belum</Text>
                    <Text style={{ fontSize: 12, textAlign: 'center', }}>Memasukan Rapot</Text>
                  </View>

                </View>
              }>
            </FlatList>
          </ScrollView>
          :
          <View />
        }

        {this.props.user.presensi === 'karyawan' ? //donatur
          <ScrollView >
            <View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                <Picker style={style.Textinputcss} mode="dropdown"
                  selectedValue={this.state.lv}
                  onValueChange={(itemValue) => {
                    this.setState({
                      lv: itemValue,
                      kel: '',
                      sem: ''
                    })
                  }}>
                  <Picker.Item style={{ fontSize: 12 }} label={'Pilih Tingkat'} value={''} key={'0'} />
                  {
                    tingkatrap.map((lv, index) =>
                      <Picker.Item style={{ height: '100%', width: '100%', fontSize: 12, }} label={lv.tingkat} value={lv.tingkat} key={index} />
                    )}
                </Picker>
                <Picker style={style.Textinputcss} mode="dropdown"
                  selectedValue={this.state.kel}
                  onValueChange={(itemValue) => {
                    this.setState({
                      kel: itemValue,
                      sem: ''
                    })
                  }}>
                  <Picker.Item style={{ fontSize: 12 }} label={'Pilih Semester'} value={''} key={'0'} />
                  {
                    kelasrap.map((kel, index) =>
                      <Picker.Item style={{ height: '100%', width: '100%', }} label={kel.kelas} value={kel.kelas} key={index} />
                    )}
                </Picker>
                <Picker style={style.Textinputcss} mode="dropdown"
                  selectedValue={this.state.sem}
                  onValueChange={(itemValue) => {
                    this.setState({
                      sem: itemValue
                    })
                  }}>
                  <Picker.Item style={{ fontSize: 12 }} label={'Pilih'} value={''} key={'0'} />
                  {
                    semrap.map((sem, index) =>
                      <Picker.Item style={{ height: '100%', width: '100%', fontSize: 12, }} label={sem.semester} value={sem.semester} key={index} />
                    )}
                </Picker>
              </View>
            </View>

            <FlatList
              data={filrap}
              renderItem={({ item }) => (
                <View style={style.kotakabu}>
                  <Image source={juara} style={style.img}></Image>
                  <View style={{ flexDirection: 'row' }}>
                    <View>
                      <View style={{ flexDirection: 'row', }}>
                        <View style={{ flexDirection: 'column' }}>
                          <View style={{ flexDirection: 'row' }}>
                            <Text style={style.labelkiri}>Nilai Tertinggi</Text>
                            <Text style={style.labelkanan}>{item.nilai_max}</Text>
                          </View>
                          <View style={{ flexDirection: 'row' }}>
                            <Text style={style.labelkiri}>Nilai Terendah</Text>
                            <Text style={style.labelkanan}>{item.nilai_min}</Text>
                          </View>
                        </View>
                      </View>
                      <View style={{ flexDirection: 'row', }}>
                        <Text style={style.labelkiri}>Nilai Rata-rata</Text>
                        <Text style={style.labelkanan1}>{item.nilai_rata_rata}</Text>
                        <Text style={style.labelkiri1}>Semester</Text>
                        <Text style={style.labelkanan1}>{item.semester}</Text>
                      </View>
                    </View>

                  </View>
                </View>
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
                    <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'center', }}>Anak Asuh Belum</Text>
                    <Text style={{ fontSize: 12, textAlign: 'center', }}>Memiliki Rapot</Text>
                  </View>

                </View>
              }>
            </FlatList>
           
            {
              this.state.show === 1 && this.state.rap === 'SD/MI' ?
                <View>
                </View>
                :
                this.state.show === 1 && this.state.rap === "SMP/MTS" ?
                  <View>
                  </View>
                  :
                  this.state.show === 1 && this.state.rap === 'SMA/SMK/MA' ?
                    <View>
                    </View>
                    :
                    <></>
            }
          </ScrollView >
          :
          <View />
        }
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
                  <Image source={rapot} style={{ height: 200, width: '50%', marginLeft: 10, }} />
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
                            Tingkat
                          </Text>
                          <Text style={{ marginLeft: 60, }}>
                            :SD
                          </Text>
                        </View>
                        <View style={{ flexDirection: 'row', }}>
                          <Text>
                            Semester
                          </Text>
                          <Text style={{ marginLeft: 48, }}>
                            :III
                          </Text>
                        </View>

                        <View style={{ flexDirection: 'row', }}>
                          <Text>
                            Nilai Tertinggi
                          </Text>
                          <Text style={{ marginLeft: 22, }}>
                            :Bahasa indonesia 100
                          </Text>
                        </View>

                        <View style={{ flexDirection: 'row', }}>
                          <Text>
                            Nilai Terendah
                          </Text>
                          <Text style={{ marginLeft: 20, }}>
                            :Matematika 50
                          </Text>
                        </View>

                        <View style={{ flexDirection: 'row', }}>
                          <Text>
                            Rata Rata Nilai
                          </Text>
                          <Text style={{ marginLeft: 20, }}>
                            :75
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

        {this.props.user.presensi === '' ?
          <View style={{
            justifyContent: 'center', alignContent: 'center', alignItems: 'center',
            alignSelf: 'center', marginTop: 20, position: 'absolute', bottom: 100,
          }}>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('DetailTamRapot', { detail: this.state.detail })} style={style.refresh} >
              <View style={{
                backgroundColor: '#0EBEDF', width: 170, height: 40, justifyContent: 'center', alignContent: 'center', alignItems: 'center', alignSelf: 'center', borderRadius: 10
              }}>
                <Text style={{ color: '#fff', textAlign: 'center', justifyContent: 'center', alignContent: 'center' }}>+ Tambah Rapot</Text>
              </View>
            </TouchableOpacity>
          </View>
          : <View />
        }
      </View >

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
  contentContainer2: {
    backgroundColor: '#fff',
    width: '100%',
    height: '100%'
  },
  label5: {
    color: '#fff',
    padding: 10,
    fontFamily: 'Poppins-Medium',
    fontSize: 13,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },//vildan
  BSimpan: {
    backgroundColor: '#00A9B8',
    borderRadius: 10,
    marginHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,

  },//vildan
  BSimpan2: {
    height: 70,
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
    elevation: 50,


  },//vildan
  colnilai: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
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
    borderRadius: 10,
    borderWidth: 1,
    fontSize: 12,
    marginVertical: 10,
    width: '30%',
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
    marginHorizontal: 20,
    marginTop: 30,
    borderRadius: 30,
    borderWidth: 1,
    fontSize: 12,
    fontFamily: 'Poppins-SemiBold',
    height: 30,
    backgroundColor: '#fff',
    shadowColor: '#333',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    borderColor: '#7e7e7e',
    elevation: 2
  }, //vildan
  nilai: {
    color: '#7e7e7e',
    fontSize: 12,
    height: 35,
    width: '60%',
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
  Label2: {
    marginTop: 5,
    marginLeft: 25,
    padding: 5,
    width: '100%',
    color: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  Label3: {
    marginTop: 5,
    marginBottom: -25,
    marginLeft: 25,
    padding: 5,
    width: '100%',
    color: '#000',
    alignItems: 'center',
    justifyContent: 'center',
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
    width: '15%',
    backgroundColor: '#7e7e7',
  },
  kotak3: {
    color: '#000000',
    marginTop: 10,
    marginLeft: 30,
    marginRight: 10,
    borderRadius: 2,
    borderWidth: 0.1,
    fontSize: 12,
    height: 52,
    width: '15%',
    textAlign: 'center',
    backgroundColor: '#fff',
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
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginRight: 20,
    fontSize: 15,
    color: '#000',
    fontFamily: 'Poppins-SemiBold'
  },
  item: {
    flex: 1,
    fontSize: 16,
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 17,
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
    textAlign: 'center',
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
  checkbox: {
    flexDirection: 'row',
    alignContent: 'space-between',
    alignItems: 'center',
    marginLeft: 30,
    margin: 20,
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
  btnEye: {
    position: 'absolute',
    padding: 10,
    right: 0,
  },
  Labeltgl: {
    marginTop: 5,
    position: 'absolute',
    top: 0,
    left: 180,
    right: 0,
    bottom: 0,
    height: 25,
    width: 25,
  },
  itemText: {
    textAlign: 'justify',
    marginLeft: 10,
    fontSize: 12,
    width: '35%',
    height: 43,
  },
  kotakbaru: {
    flexDirection: 'column',
    width: '95%',
    height: 110,
    borderRadius: 10,
    borderWidth: 1,
    marginLeft: 10,
    marginTop: 10,
    borderColor: '#E9E9E9',
    alignItems: 'center',
    alignContent: 'center',
    textAlign: 'center',
    backgroundColor: '#fff',
    shadowColor: '#333',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 3,
  },
  kotakabu: {
    shadowColor: '#333',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 3,
    width: '95%',
    borderRadius: 15,
    borderWidth: 1,
    marginLeft: 10,
    marginTop: 10,
    borderColor: '#E9E9E9',
    backgroundColor: '#fff',
  },
  kotakabu2: {
    shadowColor: '#333',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 3,
    width: '100%',
    height: 230,
    borderRadius: 15,
    marginTop: 10,
    backgroundColor: 'white',
    paddingHorizontal: 10
  }, //Vildan

  img: {
    width: '95%',
    height: 150,
    marginLeft: 10,
    marginTop: 10,
    borderRadius: 10,
  },

  img2: {
    width: '100%',
    height: 150,
    marginTop: 10,
    borderRadius: 10,
  }, //vildan

  labelbaru: {
    fontSize: 16,
    marginTop: 10,
    marginLeft: 10,
  },
  labelbaru1: {
    fontSize: 12,
    marginRight: 5,
    marginTop: 10,
  },
  labelbaru2: {
    fontSize: 12,
    marginLeft: 10,
    marginTop: 10,
  },
  labelbaru3: {
    fontSize: 16,
    marginTop: 10,
    fontWeight: 'bold',
    color: '#000'
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
    top: 0,
  },//vildan
  iconbesar: {
    marginTop: 50,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  labelkanan: {
    fontSize: 12,
    marginVertical: 5,
    width: 200,
  },
  labelkiri: {
    fontSize: 12,
    fontWeight: 'bold',
    marginVertical: 5,
    marginLeft: 20,
    width: 100,
  },
  labelkanan1: {
    fontSize: 12,
    marginVertical: 5,
    marginLeft: 10,
  },
  labelkiri1: {
    fontSize: 12,
    fontWeight: 'bold',
    marginVertical: 5,
    marginLeft: 30

  },
});
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
export default connect(mapStateToProps, mapDispatchToProps)(Tamrap);
