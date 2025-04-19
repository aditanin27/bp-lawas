import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Image,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  ToastAndroid,
  ImageBackground,
  Modal,
  Dimensions,
  Alert
} from 'react-native';
import React, { Component } from 'react';
import { Picker } from '@react-native-picker/picker';
import CheckBox from '@react-native-community/checkbox';
import * as ImagePicker from 'react-native-image-picker';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';
import { connect } from 'react-redux';
import { rapot, Calendar, juara, addfoto2 } from '../../assets/images';
import { Arrowleft } from '../../assets/icons';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import PDFScanner from "@woonivers/react-native-document-scanner"
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';

class DetailTamRapot extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gambar: '',
      foto: {
        name: '',
        type: '',
        uri: '',
        size: '',
      },
      foto2: {
        name: '',
        type: '',
        uri: '',
        size: '',
      },
      foto3: {
        name: '',
        type: '',
        uri: '',
        size: '',
      },
      foto4: {
        name: '',
        type: '',
        uri: '',
        size: '',
      },
      rapimg: {
        0: {
          // image: {
          name: '',
          type: '',
          uri: '',
          size: '',
        },
        // },
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
      resourcePath: {},
      data: '',
      pdfScannerElement: null,
      setData: '',
      pil: '',
      tingkat: '',
      kelas: '',
      semester: '',
      nilai_max: '',
      nilai_min: '',
      nilai_rata_rata: '',
      detail: this.props.route.params.detail,
      convert: '',

    };
  }

  handleOnPressRetry() {
    setData({})
  }
  SimpanData() {
    AsyncStorage.getItem('token').then((token) => {
      const datagabug = this.state.peltinggi + ':' + this.state.nilai_max;
      const datagabugmin = this.state.pelrendah + ':' + this.state.nilai_min;
      let dataToSend = {
        tingkat: this.state.tingkat,
        foto: this.state.foto.name === '' ? '' : this.state.foto,
        foto2: this.state.foto2.name === '' ? '' : this.state.foto2,
        foto3: this.state.foto3.name === '' ? '' : this.state.foto3,
        foto4: this.state.foto4.name === '' ? '' : this.state.foto4,
        kelas: this.state.kelas,
        semester: this.state.semester,
        nilai_max: datagabug,
        nilai_min: datagabugmin,
        nilai_rata_rata: this.state.nilai_rata_rata,
        tanggal: moment(this.state.date).format('YYYY-MM-DD'),
      }
      let data = new FormData();
      for (let key in dataToSend) {
        data.append(key, dataToSend[key]);
      }
      console.log('kkkk', data);
      fetch('https://kilauindonesia.org/datakilau/api/tamrapot/' + this.state.detail, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data'
        },
        body: data,
      })
        .then((res) => res.json())
        .then((resJson) => {
          console.log(resJson);
          if (resJson.status === 'sukses') {
            this.props.navigation.navigate('Tamrap')
            // this.onRefresh()
            ToastAndroid.show("Data berhasil ditambah!", ToastAndroid.SHORT)
          } else {

            ToastAndroid.show("gagal menyimpan", ToastAndroid.SHORT)
          }
        })
        .catch((err) => console.log('dari catch send Data ===', err));
    });
  }


  takePic() {
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
              uri: response.assets[0].uri,
              name: response.assets[0].fileName,
              type: response.assets[0].type,
              id: 1,
            };
            console.log('ini gambar = ', source);
            this.setState({
              foto: source,
            });
            console.log('ini gambar = ', this.state.foto);
          }
        },
      );
    }
  }
  takePic2() {
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
              uri: response.assets[0].uri,
              name: response.assets[0].fileName,
              type: response.assets[0].type,
              id: 1,
            };
            console.log('ini gambar = ', source);
            this.setState({
              foto2: source,
            });
            console.log('ini gambar = ', this.state.foto2);
          }
        },
      );
    }
  }
  takePic3() {
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
              uri: response.assets[0].uri,
              name: response.assets[0].fileName,
              type: response.assets[0].type,
              id: 1,
            };
            console.log('ini gambar = ', source);
            this.setState({
              foto3: source,
            });
            console.log('ini gambar = ', this.state.foto3);
          }
        },
      );
    }
  }
  takePic4() {
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
              uri: response.assets[0].uri,
              name: response.assets[0].fileName,
              type: response.assets[0].type,
              id: 1,
            };
            console.log('ini gambar = ', source);
            this.setState({
              foto4: source,
            });
            console.log('ini gambar = ', this.state.foto4);
          }
        },
      );
    }
  }
  handleOnPressRetry() {
    setData({})
  }
  render() {
    const base64Image = this.state.convert;

    // var base64Icon = 'data:image/png;base64,{this.state.foto}'
    var rapimg = [];
    var semester = [
      { label: 'Ganjil ', value: 'Ganjil' },
      { label: 'Genap', value: 'Genap' },
    ];
    for (let i = 0; i <= this.state.img2; i++) {
      rapimg.push(
        <Image
          style={{ width: 200, height: 200, resizeMode: 'contain' }}
          source={this.state.rapimg[i]}
        />,
      );
    }

    const inputbutton = [];
    for (let i = 0; i < this.state.count; i++) {
      <>
        <View key={i}>
          <Text>{i + 1}.</Text>
          <Picker
            style={style.Textinputcss}
            selectedValue={this.state.rap}
            value={this.state.tr[i]}
            onValueChange={itemValue =>
              this.setState({ rap: itemValue, show: 1 })
            }>
            <Picker.Item label="Pilih" value="" />
            <Picker.Item label="SD/MI" value="SD/MI" />
            <Picker.Item label="SMP/MTS" value="SMP/MTS" />
            <Picker.Item label="SMA/SMK/MA" value="SMA/SMK/MA" />
          </Picker>
        </View>
      </>;
    }
    return (
      <View contentContainer
        style={style.contentContainer}>
        <View style={{ flexDirection: 'row', marginTop: 10, marginHorizontal: 10, alignItems: 'center' }}>
          <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('List_anak')}>
          </TouchableWithoutFeedback>
          <View style={{ justifyContent: 'center', width: '100%', padding: 10 }}>
            <Text style={style.title2}>Tambah Rapot</Text>
          </View>
        </View>
        <ScrollView style={{ paddingHorizontal: 15, marginTop: -20 }}
          showsVerticalScrollIndicator={true}>
          {this.props.user.presensi === '' ? ( //ini tampilan untuk pengelola dan admin pusat / cabang
            <SafeAreaView>
              <>
                <View>
                  {inputbutton}
                  {/* <Text>{this.state.foto}</Text> */}
                  <View>
                    <Text style={style.Label4}>Informasi Sekolah</Text>
                    <View style={{ borderColor: '#DDD', borderWidth: 1, height: 55, width: '100%', borderRadius: 10, position: 'absolute', top: 52 }} />
                    <Picker
                      style={style.Textinputcss}
                      selectedValue={this.state.tingkat}
                      onValueChange={itemValue =>
                        this.setState({ tingkat: itemValue, show: 1 })
                      }>
                      <Picker.Item style={{ fontSize: 14, fontFamily: 'Poppins-Regular' }} label="Tingkat Sekolah" value="" />
                      <Picker.Item style={{ fontSize: 14, fontFamily: 'Poppins-Regular' }} label="SD/MI" value="SD/MI" />
                      <Picker.Item style={{ fontSize: 14, fontFamily: 'Poppins-Regular' }} label="SMP/MTS" value="SMP/MTS" />
                      <Picker.Item style={{ fontSize: 14, fontFamily: 'Poppins-Regular' }} label="SMA/SMK/MA" value="SMA/SMK/MA" />
                    </Picker>
                  </View>

                  {this.state.tingkat === 'SD/MI' ? (
                    <View>
                      <Text style={style.Label4}>Kelas</Text>
                      <View style={{ borderColor: '#DDD', borderWidth: 1, height: 55, width: '100%', borderRadius: 10, position: 'absolute', top: 52 }} />
                      <Picker
                        style={style.Textinputcss}
                        selectedValue={this.state.kelas}
                        onValueChange={itemValue =>
                          this.setState({ kelas: itemValue, show: 1 })
                        }>
                        <Picker.Item style={{ fontSize: 14, fontFamily: 'Poppins-Regular' }} label="Kelas" value="" />
                        <Picker.Item style={{ fontSize: 14, fontFamily: 'Poppins-Regular' }} label="I" value="I" />
                        <Picker.Item style={{ fontSize: 14, fontFamily: 'Poppins-Regular' }} label="II" value="II" />
                        <Picker.Item style={{ fontSize: 14, fontFamily: 'Poppins-Regular' }} label="III" value="III" />
                        <Picker.Item style={{ fontSize: 14, fontFamily: 'Poppins-Regular' }} label="IV" value="IV" />
                        <Picker.Item style={{ fontSize: 14, fontFamily: 'Poppins-Regular' }} label="V" value="V" />
                        <Picker.Item style={{ fontSize: 14, fontFamily: 'Poppins-Regular' }} label="VI" value="VI" />
                      </Picker>
                    </View>
                  ) : this.state.tingkat === 'SMP/MTS' ? (
                    <View>
                      <Text style={style.Label2}>Kelas</Text>
                      <Picker
                        style={style.Textinputcss}
                        selectedValue={this.state.kelas}
                        onValueChange={itemValue =>
                          this.setState({ kelas: itemValue, show: 1 })
                        }>
                        <Picker.Item style={{ fontSize: 14, fontFamily: 'Poppins-Regular' }} label="Pilih" value="" />
                        <Picker.Item style={{ fontSize: 14, fontFamily: 'Poppins-Regular' }} label="VII" value="VII" />
                        <Picker.Item style={{ fontSize: 14, fontFamily: 'Poppins-Regular' }} label="VIII" value="VIII" />
                        <Picker.Item style={{ fontSize: 14, fontFamily: 'Poppins-Regular' }} label="IX" value="XI" />
                      </Picker>
                    </View>
                  ) : this.state.tingkat === 'SMA/SMK/MA' ? (
                    <View>
                      <Text style={style.Label2}>Kelas</Text>
                      <Picker
                        style={style.Textinputcss}
                        selectedValue={this.state.kelas}
                        onValueChange={itemValue =>
                          this.setState({ kelas: itemValue, show: 1 })
                        }>
                        <Picker.Item style={{ fontSize: 14, fontFamily: 'Poppins-Regular' }} label="Pilih" value="" />
                        <Picker.Item style={{ fontSize: 14, fontFamily: 'Poppins-Regular' }} label="X" value="X" />
                        <Picker.Item sstyle={{ fontSize: 14, fontFamily: 'Poppins-Regular' }} label="XI" value="XI" />
                        <Picker.Item style={{ fontSize: 14, fontFamily: 'Poppins-Regular' }} label="XII" value="XII" />
                      </Picker>
                    </View>
                  ) : (
                    <></>
                  )}
                  <Text style={style.Label4}>Semester</Text>
                  <View style={style.checkbox}>
                    <RadioForm
                      radio_props={semester}
                      onPress={value => {
                        this.setState({ semester: value })
                        ToastAndroid.show(value.toString(), ToastAndroid.SHORT);
                      }}
                      initial={2}
                      buttonSize={10}
                      buttonOuterSize={20}
                      animation={true}
                      formHorizontal={true}

                    >
                    </RadioForm>
                  </View>

                  <Text style={style.Label2}>Nilai Tertinggi</Text>
                  <View style={style.colnilai}>
                    <View style={{ borderColor: '#DDD', borderWidth: 1, height: 55, width: '62%', borderRadius: 10, position: 'absolute', left: 5 }} />
                    <Picker
                      style={style.nilai}
                      selectedValue={this.state.peltinggi}
                      onValueChange={itemValue =>
                        this.setState({ peltinggi: itemValue, show: 1 })
                      }>
                      <Picker.Item style={{ fontSize: 14, fontFamily: 'Poppins-Regular' }} label="Mata Pelajaran" value="" />
                      <Picker.Item style={{ fontSize: 14, fontFamily: 'Poppins-Regular' }}
                        label="Bahasa Indonesia"
                        value="Bahasa Indonesia"
                      />
                      <Picker.Item style={{ fontSize: 14, fontFamily: 'Poppins-Regular' }} label="Matematika" value="Matematika" />
                      <Picker.Item style={{ fontSize: 14, fontFamily: 'Poppins-Regular' }} label="IPA" value="IPA" />
                      <Picker.Item style={{ fontSize: 14, fontFamily: 'Poppins-Regular' }} label="IPS" value="IPS" />
                      <Picker.Item
                        label="Bahasa Inggris"
                        value="Bahasa Inggris"
                      />
                      <Picker.Item style={{ fontSize: 14, fontFamily: 'Poppins-Regular' }} label="Kimia" value="Kimia" />
                      <Picker.Item style={{ fontSize: 14, fontFamily: 'Poppins-Regular' }} label="Fisika" value="Fisika" />
                      <Picker.Item style={{ fontSize: 14, fontFamily: 'Poppins-Regular' }} label="Biologi" value="Biologi" />
                      <Picker.Item style={{ fontSize: 14, fontFamily: 'Poppins-Regular' }} label="Lain-lain" value="Lain-lain" />
                    </Picker>
                    <TextInput
                      style={style.kotak3}
                      onChangeText={nilai_max => this.setState({ nilai_max })}
                      value={this.state.nilai_max}
                      keyboardType="numeric"
                      placeholder="Nilai"
                      placeholderTextColor="#C0C0C0"
                    />
                  </View>
                  <Text style={style.Label2}>Nilai Terendah</Text>
                  <View style={style.colnilai}>
                    <View style={{ borderColor: '#DDD', borderWidth: 1, height: 55, width: '62%', borderRadius: 10, position: 'absolute', top: 0, left: 5 }} />
                    <Picker
                      style={style.nilai}
                      selectedValue={this.state.pelrendah}
                      onValueChange={itemValue =>
                        this.setState({ pelrendah: itemValue, show: 1 })
                      }>
                      <Picker.Item style={{ fontSize: 14, fontFamily: 'Poppins-Regular' }} label="Pilih Mata Pelajaran" value="" />
                      <Picker.Item style={{ fontSize: 14, fontFamily: 'Poppins-Regular' }}
                        label="Bahasa Indonesia"
                        value="Bahasa Indonesia"
                      />
                      <Picker.Item style={{ fontSize: 14, fontFamily: 'Poppins-Regular' }} label="Matematika" value="Matematika" />
                      <Picker.Item style={{ fontSize: 14, fontFamily: 'Poppins-Regular' }} label="IPA" value="IPA" />
                      <Picker.Item style={{ fontSize: 14, fontFamily: 'Poppins-Regular' }} label="IPS" value="IPS" />
                      <Picker.Item style={{ fontSize: 14, fontFamily: 'Poppins-Regular' }}
                        label="Bahasa Inggris"
                        value="Bahasa Inggris"
                      />
                      <Picker.Item style={{ fontSize: 14, fontFamily: 'Poppins-Regular' }} label="Kimia" value="Kimia" />
                      <Picker.Item style={{ fontSize: 14, fontFamily: 'Poppins-Regular' }} label="Fisika" value="Fisika" />
                      <Picker.Item style={{ fontSize: 14, fontFamily: 'Poppins-Regular' }} label="Biologi" value="Biologi" />
                      <Picker.Item style={{ fontSize: 14, fontFamily: 'Poppins-Regular' }} label="Lain-lain" value="Lain-lain" />
                    </Picker>

                    <TextInput
                      style={style.kotak3}
                      onChangeText={nilai_min => this.setState({ nilai_min })}
                      value={this.state.nilai_min}
                      keyboardType="numeric"
                      placeholder="Nilai"
                      placeholderTextColor="#C0C0C0"
                    />
                  </View>

                  <View>
                    <Text style={style.Label2}>Rata-rata Nilai</Text>
                  </View>
                  <TextInput
                    style={style.kotak4}
                    onChangeText={nilai_rata_rata => this.setState({ nilai_rata_rata })}
                    value={this.state.nilai_rata_rata}
                    keyboardType="numeric"
                    placeholder="Nilai"
                    placeholderTextColor="#C0C0C0"
                  />

                  <View>
                    <Text style={style.Label2}>Foto Rapot</Text>
                  </View>
                 
                  <ScrollView horizontal={true} style={{ marginHorizontal: 10, marginVertical: 8 }} >
                    <>
                     
                      <Image source={this.state.foto} style={{ width: 100, height: 100 }} />
                      <Image source={this.state.foto2} style={{ width: 100, height: 100 }} />
                      <Image source={this.state.foto3} style={{ width: 100, height: 100 }} />
                      <Image source={this.state.foto4} style={{ width: 100, height: 100 }} />
                    </>
                  </ScrollView>

                </View>
              </>
            </SafeAreaView>
          ) : (
            <View />
          )}
        </ScrollView>

        <View style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center', alignSelf: 'center', marginTop: 50, position: 'absolute' }}>

          {this.state.foto.name === '' ? (
            <TouchableOpacity onPress={() =>
              Alert.alert(
                'Info',
                'Ambl foto menggunakan',
                [
                  {
                    text: 'Kamera',
                    onPress: () => this.takePic(),
                    style: 'cancel',
                  },
                ],
                { cancelable: true },
              )
            } style={style.refresh} >
              <View style={{
                backgroundColor: '#00A9B8', width: 170, height: 40, justifyContent: 'center', alignContent: 'center', alignItems: 'center', alignSelf: 'center', borderRadius: 10
              }}>
                <Text style={{ color: '#fff', textAlign: 'center', justifyContent: 'center', alignContent: 'center' }}>  + Tambah Foto Rapot</Text>
              </View>
            </TouchableOpacity>
          ) : (
            <View />
          )}
        </View>


        <View style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center', alignSelf: 'center', marginTop: 50, position: 'absolute' }}>
          {this.state.foto.name != '' ? (
            <TouchableOpacity
              style={style.refresh}
              onPress={() =>
                this.state.foto2.name === '' ?
                  Alert.alert(
                    'Info',
                    'Ambl foto menggunakan',
                    [
                      {
                        text: 'Kamera',
                        onPress: () => this.takePic2(),
                        style: 'cancel',
                      },
                    ],
                    { cancelable: true },
                  )
                  :
                  this.state.foto3.name === '' && this.state.foto2.name != '' && this.state.foto.name != '' ?
                    Alert.alert(
                      'Info',
                      'Ambl foto menggunakan',
                      [
                        {
                          text: 'Kamera',
                          onPress: () => this.takePic3(),
                          style: 'cancel',
                        },
                      ],
                      { cancelable: true },
                    )
                    :
                    Alert.alert(
                      'Info',
                      'Ambl foto menggunakan',
                      [
                        {
                          text: 'Kamera',
                          onPress: () => this.takePic4(),
                          style: 'cancel',
                        },
                      ],
                      { cancelable: true },
                    )

              }>
              <View style={{
                backgroundColor: '#00A9B8', width: 170, height: 40, justifyContent: 'center', alignContent: 'center', alignItems: 'center', alignSelf: 'center', borderRadius: 10
              }}>
                <Text style={{ color: '#fff', textAlign: 'center', justifyContent: 'center', alignContent: 'center' }}>  + Tambah Foto Rapot</Text>
              </View>
            </TouchableOpacity>
          ) : (
            <View />
          )}
        </View>

        <View style={style.BSimpan2}>
          <TouchableOpacity onPress={() => this.SimpanData()}>
            <View style={style.BSimpan}>
              <Text style={style.label5}>Simpan</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View >
    );
  }
}

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const style = StyleSheet.create({
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    width: windowWidth * 0.95,
    height: windowHeight * 0.29
  },
  contentContainer: {
    backgroundColor: '#fff',
    width: '100%',
    height: '100%',
    flex: 1
  },// vildan menghapus flex dan menambahkan backgroundCOlor,width dan hight
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
  label5: {
    color: '#fff',
    padding: 10,
    fontFamily: 'Poppins-Medium',
    fontSize: 13,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
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
    height: 70,
    width: windowWidth,
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


  },
  ModalCont2: {
    flex: 1,
    backgroundColor: '#00000079',
  },
  Textinputcss: {
    color: '#C0C0C0',
    marginTop: 5,
    left: 2,
    marginRight: 4,
    borderRadius: 10,
    borderWidth: 1,
    fontSize: 10,
    height: 40,
    borderColor: '#C0C0C0',
    fontFamily: 'Poppins-Regular'
  },
  Textinputcss2: {
    color: '#7e7e7e',
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 30,
    borderWidth: 1,
    fontSize: 12,
    fontFamily: 'Poppins-SemiBold',
    height: 52,
    shadowColor: '#333',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    borderColor: '#7e7e7e',
    elevation: 3
  }, //vildan
  nilai: {
    color: '#C0C0C0',
    fontSize: 10,
    height: 30,
    width: '55%',
    backgroundColor: '#FFF',
    borderColor: '#000',
    borderWidth: 3,
    fontFamily: 'Poppins-Regular',
  },
  Label2: {
    marginTop: 10,
    padding: 5,
    width: '100%',
    color: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Poppins-Medium'
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
  Label4: {
    marginTop: 25,
    width: '100%',
    color: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Poppins-Medium'
  },
  kotak2: {
    color: '#C0C0C0',
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
    color: '#C0C0C0',
    marginLeft: 30,
    borderRadius: 10,
    borderWidth: 0.1,
    fontSize: 14,
    height: 52,
    width: '25%',
    textAlign: 'center',
    backgroundColor: '#fff',
    borderColor: '#DDDDDD',
    borderWidth: 1
  },
  kotak4: {
    color: '#C0C0C0',
    marginLeft: 4,
    borderRadius: 10,
    borderWidth: 0.1,
    fontSize: 14,
    height: 52,
    width: '25%',
    textAlign: 'center',
    backgroundColor: '#fff',
    borderColor: '#DDDDDD',
    borderWidth: 1
  },
  //vidan
  button: {

    width: 250,

    height: 60,

    backgroundColor: '#3740ff',

    alignItems: 'center',

    justifyContent: 'center',

    borderRadius: 4,

    marginBottom: 12

  },

  buttonText: {

    textAlign: 'center',

    fontSize: 15,

    color: '#fff'

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
    marginTop: 10,
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
    height: 250,
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
    top: 600

  },//vildan
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
export default connect(mapStateToProps, mapDispatchToProps)(DetailTamRapot);
