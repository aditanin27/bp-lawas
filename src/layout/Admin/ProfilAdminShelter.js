
import {
  Text, View, FlatList, ImageBackground, Image, StyleSheet,
  Dimensions, TouchableOpacity, TextInput, RefreshControl, ToastAndroid, ScrollView, Alert
} from 'react-native'
import { background1, test } from '../../assets/images'
import React, { Component } from 'react'
import { Sekolah, Tgl, Jenis, Camera } from '../../assets/icons';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'react-native-image-picker';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
export class ProfilAdminShelter extends Component {
  constructor(props) {
    super(props)
    this.state = {
      det: [],
      detail: this.props.route.params.item,
      detailpengelola: [],
      getshelter: [],
      shelter: this.props.route.params.item.id_shelter,
      // shelter: '',
      shel: '',
      getwilbin: [],
      wilbin: this.props.route.params.item.id_wilbin,
      // wilbin: '',
      bin: '',
      getkacab: [],
      kacab: this.props.route.params.item.id_kacab,
      // kacab: '',
      cab: '',
      nama: this.props.route.params.item.nama_lengkap,
      Email: this.props.route.params.item.username,
      Status: this.props.route.params.item.status,
      HP: this.props.route.params.item.no_hp,
      alamat: this.props.route.params.item.alamat_adm,
      foto: {
        name: '',
        type: '',
        uri: 'https://kilauindonesia.org/datakilau/gambarUpload/' + this.props.route.params.item.foto,
        id: 0,
      },

    }
  }
  GetdetailpengelolaAPi() {
    fetch('https://kilauindonesia.org/datakilau/api/detailpengelola/' + this.state.detail.id_users)
      .then(res => {
        if (res.status === 200) return res.json();
      })
      .then(resdata => {
        console.log(resdata.data);
        this.setState({
          detailpengelola: resdata.data,
          refreshing: false,

        });
      });
  }
  GetShelterAPi() {
    fetch('https://kilauindonesia.org/datakilau/api/shelterfil')
      .then(res => {
        if (res.status === 200) return res.json();
      })
      .then(resdata => {
        console.log(resdata.data);
        this.setState({
          getshelter: resdata.data,
          refreshing: false,

        });
      });
  }
  GetWilbinAPi() {
    fetch('https://kilauindonesia.org/datakilau/api/wilbinfil')
      .then(res => {
        if (res.status === 200) return res.json();
      })
      .then(resdata => {
        console.log(resdata.data);
        this.setState({
          getwilbin: resdata.data,
          refreshing: false,

        });
      });
  }
  GetKacabAPi() {
    fetch('https://kilauindonesia.org/datakilau/api/kacab')
      .then(res => {
        if (res.status === 200) return res.json();
      })
      .then(resdata => {
        console.log(resdata.data);
        this.setState({
          getkacab: resdata.data,
          refreshing: false,

        });
      });
  }
  sendData1() {
    {
      let simpandata = {
        id_kacab: this.state.kacab,
        id_wilbin: this.state.wilbin,
        id_shelter: this.state.shelter,
        status: this.state.Status,
        nama_lengkap: this.state.nama,
        alamat_adm: this.state.alamat,
        no_hp: this.state.HP,
        foto: this.state.foto.name === '' ? '' : this.state.foto,
        username: this.state.Email,
        // no_hp: this.state.level,
        // password: this.state.password,
      }
      let data = new FormData();
      for (let key in simpandata) {
        data.append(key, simpandata[key]);
      }
      fetch('https://kilauindonesia.org/datakilau/api/pengelolaupd/' + this.state.detail.id_users, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data'
        },
        body: data,
      })
        .then((res) => res.json())
        .then((resJson) => {
          console.log(resJson);
          if (resJson.status === 'sukses') {

            ToastAndroid.show("Data berhasil diperbaharui!", ToastAndroid.SHORT)
          } else {
            alert(`Data gagal disimpan !!!`);
          }
        })
        .catch((err) => console.log('dari catch send Data ===', err));
    }

  }
  takePic() {
    {
      ImagePicker.launchCamera(
        {
          noData: true,
          saveToPhotos: true,
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
  componentDidMount() {
    this.GetdetailpengelolaAPi();
    this.GetWilbinAPi();
    this.GetKacabAPi();
    this.GetShelterAPi();
    console.log(this.state.detail);
  }

  render() {
    var detail = this.state.detail
    return (
      <View style={{ backgroundColor: '#fff', height: '100%' }}>
        <ImageBackground source={background1} style={{ width: '100%', height: 110, }}>
        </ImageBackground>
        <View style={style.kolomkecil}>
          <TouchableOpacity onPress={() => { this.takePic() }}>
            <Image source={this.state.foto} style={{ width: 150, height: 150, borderRadius: 70, justifyContent: 'center', alignSelf: 'center', position: 'absolute', marginTop: -70 }}></Image>
          </TouchableOpacity>
          <View style={{ justifyContent: 'center', textAlign: 'center', alignItems: 'center', alignContent: 'center', alignSelf: 'center' }}>
           
          </View>
                  </View>
        <ScrollView style={{ paddingHorizontal: 20, }}>
          <View style={{ flexDirection: 'column', marginTop: 10 }}>
            <View style={{ justifyContent: 'center' }}>
              <View style={style.form}>
                <Text style={style.labelkiri}>Nama Lengkap</Text>
                <TextInput
                  style={style.kotak3}
                  onChangeText={nama => this.setState({ nama })}
                  value={this.state.nama}
                  keyboardType='default'
                  placeholder=""
                  placeholderTextColor="#C0C0C0"
                />
              </View>
              <View style={style.form}>
                <Text style={style.labelkiri}>Email</Text>
                <TextInput
                  style={style.kotak3}
                  onChangeText={Email => this.setState({ Email })}
                  value={this.state.Email}
                  keyboardType='default'
                  placeholder={detail.username}
                  placeholderTextColor="#C0C0C0"
                />
              </View>
              <View style={style.form}>
                <Text style={style.labelkiri}>Status</Text>
                <View style={style.kotakpicker}>
                  <Picker
                    style={style.Textinputcss}
                    selectedValue={this.state.Status}
                    onValueChange={itemValue =>
                      this.setState({ Status: itemValue, show: 1 })
                    }>
                    <Picker.Item
                      style={{ fontSize: 14, fontFamily: 'Poppins-Regular', fontWeight: 'bold' }}
                      label="Pilih Status"
                      value=""
                    />
                    <Picker.Item style={{ fontSize: 14, fontFamily: 'Poppins-Regular', fontWeight: 'bold' }}
                      label="Aktif"
                      value="aktif" key="aktif" />

                    <Picker.Item style={{ fontSize: 14, fontFamily: 'Poppins-Regular', fontWeight: 'bold' }}
                      label="Tidak Aktif"
                      value="tidak akti" key="tidak akti" />
                  </Picker>
                </View>
              </View>
              <View style={style.form}>
                <Text style={style.labelkiri}>No HP</Text>
                <TextInput
                  style={style.kotak3}
                  onChangeText={HP => this.setState({ HP })}
                  value={this.state.HP}
                  keyboardType='numeric'
                  placeholder=""
                  placeholderTextColor="#C0C0C0"
                />
              </View>

              <View style={style.form}>
                <Text style={style.labelkiri}>Kantor Cabang</Text>
                <View style={style.kotakpicker}>
                  <Picker
                    style={style.Textinputcss}
                    selectedValue={this.state.kacab}
                    onValueChange={itemValue =>
                      this.setState({ kacab: itemValue, show: 1 })
                    }>
                    <Picker.Item
                      style={{ fontSize: 14, fontFamily: 'Poppins-Regular' }}
                      label={this.props.route.params.item.nama_kacab}
                      value=""
                    />
                    {
                      this.state.getkacab.map((cab) =>
                        <Picker.Item style={{ height: '100%', width: '100%', fontSize: 12, color: '#000' }} label={cab.nama_kacab.toString()} value={cab.id_kacab} key={cab.id_kacab} />
                      )}

                  </Picker>
                </View>
              </View>


              <View style={style.form}>
                <Text style={style.labelkiri}>Wilayah Binaan</Text>
                <View style={style.kotakpicker}>
                  <Picker
                    style={style.Textinputcss}
                    selectedValue={this.state.wilbin}
                    onValueChange={itemValue =>
                      this.setState({ wilbin: itemValue, show: 1 })
                    }>
                    <Picker.Item
                      style={{ fontSize: 14, fontFamily: 'Poppins-Regular' }}
                      label={this.props.route.params.item.nama_wilbin}
                      value=""
                    />
                    {
                      this.state.getwilbin.map((bin) =>
                        <Picker.Item style={{ height: '100%', width: '100%', fontSize: 12, }} label={bin.nama_wilbin.toString()} value={bin.id_wilbin} key={bin.id_wilbin} />
                      )}

                  </Picker>
                </View>
              </View>


              <View style={style.form}>
                <Text style={style.labelkiri}>Shelter</Text>
                <View style={style.kotakpicker}>
                  <Picker
                    style={style.Textinputcss}
                    selectedValue={this.state.shelter}
                    onValueChange={itemValue =>
                      this.setState({ shelter: itemValue, show: 1 })
                    }>
                    <Picker.Item
                      style={{ fontSize: 14, fontFamily: 'Poppins-Regular' }}
                      label={this.props.route.params.item.nama_shelter}
                      value=""
                    />
                    {
                      this.state.getshelter.map((shel) =>
                        <Picker.Item style={{ height: '100%', width: '100%', fontSize: 12, }} label={shel.nama_shelter.toString()} value={shel.id_shelter} key={shel.id_shelter} />
                      )}

                  </Picker>
                </View>
              </View>
              <View style={style.form}>
                <Text style={style.labelkiri}>Alamat</Text>
                <TextInput
                  style={style.kotakalamat}
                  multiline={true}
                  onChangeText={alamat => this.setState({ alamat })}
                  value={this.state.alamat}
                  keyboardType='default'
                  placeholder={detail.alamat_adm}
                  placeholderTextColor="#C0C0C0"
                />
              </View>
            </View>

          </View>

        </ScrollView>
       
        <View style={style.BSimpan2}>
          <TouchableOpacity onPress={() =>
            Alert.alert(
              'Peringatan',
              'Apakah Anda Ingin Mengedit Data',
              [
                {
                  text: 'Ya',
                  onPress: () => this.props.navigation.replace('UserManagement', this.sendData1()),
                  style: 'cancel',
                },
                {
                  text: "Cancel",
                  onPress: () => console.log("Cancel Pressed"),
                  style: "cancel"
                },
              ],
              { cancelable: false },
            )

          }>
            <View style={style.BSimpan}>
              <Text style={style.label5}>Edit</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View >
    )
  }
}
const style = StyleSheet.create({
  labelkiri: {
    fontSize: 12,
    fontWeight: 'bold',
    marginVertical: 5,
    marginLeft: 20,
    width: 100,
  },
  labelkanan: {
    fontSize: 12,
    marginHorizontal: 5,
    width: 150,
  },
  form: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    width: '100%'
  },
  kolomkecil: {
    backgroundColor: '#00A9B8',
    width: '100%',
    height: '17%'
  },
  BSimpan2: {
    height: 55,
    width: windowWidth,
    position: 'absolute',
    bottom: 0,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  BSimpan: {
    backgroundColor: '#00A9B8',
    borderRadius: 10,
    marginHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
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
  kotak3: {
    marginTop: 10,
    color: '#000',
    borderRadius: 10,
    borderWidth: 0.1,
    fontSize: 13,
    height: 40,
    width: windowWidth * 0.5,
    padding: 12,
    backgroundColor: '#fff',
    borderColor: '#DDDDDD',
    borderWidth: 1,
    fontFamily: 'Poppins-Regular',
  },
  kotakalamat: {
    marginTop: 10,
    color: '#000',
    borderRadius: 10,
    borderWidth: 0.1,
    fontSize: 13,
    height: 100,
    width: windowWidth * 0.5,
    padding: 12,
    backgroundColor: '#fff',
    borderColor: '#DDDDDD',
    borderWidth: 1,
    fontFamily: 'Poppins-Regular',
  },
  Textinputcss: {
    width: windowWidth - 200,
    color: '#C0C0C0',
    marginTop: -10,
    borderRadius: 10,
    borderWidth: 1,
    fontSize: 10,
    height: 40,
    borderColor: '#C0C0C0',
    fontFamily: 'Poppins-Regular',
  },
  kotakpicker: {
    marginTop: 10,
    paddingVertical: 5,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#DDD',
    width: windowWidth * 0.5,
    height: 40,
  },
});
export default ProfilAdminShelter