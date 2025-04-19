import {
  Text, View, SafeAreaView, ScrollView, ImageBackground, Image,
  StyleSheet, TouchableOpacity, Dimensions, TextInput, ToastAndroid
} from 'react-native'
import { background1, test } from '../../assets/images'
import React, { Component } from 'react'
import { Sekolah, Tgl, Jenis, } from '../../assets/icons';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'react-native-image-picker';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
export class ProfilDonatur extends Component {
  constructor(props) {
    super(props)
    this.state = {
      det: [],
      bank: [],
      kacab: [],
      wilbin: [],
      shelter: [],
      detail: this.props.route.params.item,
      namabaru: this.props.route.params.item.nama_lengkap,
      emailbaru: this.props.route.params.item.username,
      diperuntukkan: this.props.route.params.item.diperuntukkan,
      hpbaru: this.props.route.params.item.no_hp,
      bankbaru: this.props.route.params.item.id_bank,
      norekbaru: this.props.route.params.item.no_rekening,
      status: this.props.route.params.item.status,
      diprut: '',
      cab: this.props.route.params.item.nama_kacab,
      wb: this.props.route.params.item.nama_wilbin,
      sh: this.props.route.params.item.nama_shelter,
      alamat: this.props.route.params.item.alamat,
      id_kacab: this.props.route.params.item.id_kacab,
      id_wilbin: this.props.route.params.item.id_wilbin,
      id_shelter: this.props.route.params.item.id_shelter,
      id: this.props.route.params.item.id_users,
      foto: {
        name: '',
        type: '',
        uri: 'https://kilauindonesia.org/datakilau/gambarUpload/' + this.props.route.params.item.foto,
        id: 0,
      },
    }
  }

  GetShelterAPi() {
    fetch('https://kilauindonesia.org/datakilau/api/shelter/' + this.state.id_wilbin).then(res => {
      if (res.status === 200)
        return res.json()
    }).then(resdata => {
      console.log(resdata.data)
      this.setState({
        shelter: resdata.data,
      })
    })
  }
  GetWilbinAPi() {
    fetch('https://kilauindonesia.org/datakilau/api/wilbin/' + this.state.id_kacab).then(res => {
      if (res.status === 200)
        return res.json()
    }).then(resdata => {
      console.log(resdata.data)
      this.setState({
        wilbin: resdata.data,
      })
    })
  }
  GetKacabAPi() {
    fetch('https://kilauindonesia.org/datakilau/api/kacab').then(res => {
      if (res.status === 200)
        return res.json()
    }).then(resdata => {
      console.log(resdata.data)
      this.setState({
        kacab: resdata.data,
      })
    })
  }

  GetBankAPi() {
    fetch('https://kilauindonesia.org/datakilau/api/getbankpen').then(res => {
      if (res.status === 200)
        return res.json()
    }).then(resdata => {
      console.log(resdata.data)
      this.setState({
        bank: resdata.data,
      })
    })
  }

  componentDidMount() {
    this.GetKacabAPi();
    this.GetWilbinAPi();
    this.GetShelterAPi();
    this.GetBankAPi();
    console.log(this.state.id);
  }
  sendData() {
    {
      let simpandata = {
        username: this.state.emailbaru,
        status: this.state.status,
        id_kacab: this.state.id_kacab,
        id_wilbin: this.state.id_wilbin,
        id_shelter: this.state.id_shelter,
        nama_lengkap: this.state.namabaru,
        alamat: this.state.alamat,
        no_hp: this.state.hpbaru,
        foto: this.state.foto.name === '' ? '' : this.state.foto,
        id_bank: this.state.bankbaru,
        no_rekening: this.state.norekbaru,
        diperuntukkan: this.state.diperuntukkan
      }
      let data = new FormData();
      for (let key in simpandata) {
        data.append(key, simpandata[key]);
      }
      fetch('https://kilauindonesia.org/datakilau/api/donaturupd/' + this.state.id, {
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
            this.props.navigation.navigate('List_donatur')
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
  render() {
    var detail = this.state.detail
    var nama = this.state.shelter.nama_shelter
    return (
      <ScrollView style={{ backgroundColor: '#fff' }}>
        <ImageBackground source={background1} style={{ width: '100%', height: 160, }}>
        </ImageBackground>
        <View style={style.kolomkecil}>
          <TouchableOpacity onPress={() => { this.takePic() }}>
            <Image source={this.state.foto} style={{ width: 125, height: 125, borderRadius: 70, justifyContent: 'center', alignSelf: 'center', marginTop: -90, position: 'absolute' }}>
            </Image>
          </TouchableOpacity>
          <View style={{ justifyContent: 'center', textAlign: 'center', alignItems: 'center', alignContent: 'center', alignSelf: 'center', marginTop: 70 }}>
            <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold', }}>{detail.full_name}</Text>
            {/* <View style={{ flexDirection: 'column', justifyContent: 'center', textAlign: 'center', alignItems: 'center', alignContent: 'center', alignSelf: 'center', }}>
                          <View style={{ flexDirection: 'row' }}>
                              <Locations />
                              <Text style={style.labeldlm}>{detail.nama_shelter}</Text>
                          </View>
                      </View> */}
          </View>
          <View style={{ flexDirection: 'column', marginTop: -30 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 15, padding: 5, }}>

              <View style={{ flexDirection: 'column', marginTop: -5, justifyContent: 'center' }}>
                <Tgl style={{ justifyContent: 'center', alignSelf: 'center' }} />
                <Text style={{ color: '#fff', fontSize: 10 }}>{detail.diperuntukkan}</Text>
              </View>
              {/* <View style={{ marginTop: -10, width: 1, height: 70, backgroundColor: '#EBEAEA', }} /> */}

              <View style={{ flexDirection: 'column', marginTop: -5, justifyContent: 'center' }}>
                < Sekolah style={{ justifyContent: 'center', alignSelf: 'center' }} />
                <Text style={{ marginLeft: 3, color: '#fff', fontSize: 10 }}>{detail.nama_shelter}</Text>
              </View>

            </View>

          </View>


        </View>
        <View style={{ paddingHorizontal: 20, backgroundColor: '#fff', width: '100%', marginTop: 10, }}>
          <View style={style.form}>
            <Text style={style.labelkiri}>Status</Text>
            <View style={style.kotakpicker}>
              <Picker
                style={style.Textinputcss}
                selectedValue={this.state.status}
                value={this.state.status}
                onValueChange={itemValue =>
                  this.setState({ status: itemValue, show: 1 })
                }>
                <Picker.Item
                  style={{ fontSize: 14, fontFamily: 'Poppins-Regular', fontWeight: 'bold' }}
                  label="Pilih Status"
                  value=""
                />

                <Picker.Item style={{ height: '100%', width: '100%', fontSize: 12, }}
                  label="Aktif"
                  value="aktif" key="aktif" />

                <Picker.Item style={{ height: '100%', width: '100%', fontSize: 12, }}
                  label="Tidak Aktif"
                  value="tidak aktif" key="tidak aktif" />
              </Picker>
            </View>
          </View>

          <View style={style.form}>
            <Text style={style.labelkiri}>Nama Lengkap</Text>
            <TextInput
              style={style.kotak3}
              onChangeText={namabaru => this.setState({ namabaru })}
              value={this.state.namabaru}
              keyboardType='default'
              // placeholder={detail.nama_lengkap}
              placeholderTextColor="#C0C0C0"
            />
          </View>
          <View style={style.form}>
            <Text style={style.labelkiri}>Email</Text>
            <TextInput
              style={style.kotak3}
              onChangeText={emailbaru => this.setState({ emailbaru })}
              value={this.state.emailbaru}
              keyboardType='default'
              // placeholder={detail.email}
              placeholderTextColor="#C0C0C0"
            />
          </View>
        
          <View style={style.form}>
            <Text style={style.labelkiri}>No HP</Text>
            <TextInput
              style={style.kotak3}
              onChangeText={hpbaru => this.setState({ hpbaru })}
              value={this.state.hpbaru}
              keyboardType='numeric'
              // placeholder={detail.no_hp}
              placeholderTextColor="#C0C0C0"
            />
          </View>
        
          <View style={style.form}>
            <Text style={style.labelkiri}>Nama Bank</Text>
            <View style={style.kotakpicker}>
              <Picker
                style={style.Textinputcss}
                selectedValue={this.state.bankbaru}
                onValueChange={itemValue =>
                  this.setState({ bankbaru: itemValue, show: 1 })
                }>
                <Picker.Item
                  style={{ fontSize: 14, fontFamily: 'Poppins-Regular', fontWeight: 'bold' }}
                  label='Pilih Bank'
                  value=""
                />
                {
                  this.state.bank.map((ban) =>
                    <Picker.Item style={{ height: '100%', width: '100%', fontSize: 12, }} label={ban.nama_bank} value={ban.id_bank} key={ban.id_bank} />
                  )}
              </Picker>
            </View>
          </View>
          {this.state.bankbaru === null ? <View /> :
            <View style={style.form}>
              <Text style={style.labelkiri}>No Rekening</Text>
              <TextInput
                style={style.kotak3}
                onChangeText={norekbaru => this.setState({ norekbaru })}
                value={this.state.norekbaru}
                keyboardType='numeric'
                // placeholder={detail.no_hp}
                placeholderTextColor="#C0C0C0"
              />
            </View>
          }
          <View style={style.form}>
            <Text style={style.labelkiri}>Diperuntukkan</Text>
            <View style={style.kotakpicker}>
              <Picker
                style={style.Textinputcss}
                selectedValue={this.state.diperuntukkan}
                onValueChange={(itemValue,) => {
                  this.setState({
                    diperuntukkan: (itemValue),
                    show: 1
                  })
                }}>
                <Picker.Item
                  style={{ fontSize: 14, fontFamily: 'Poppins-Regular', fontWeight: 'bold' }}
                  label={this.state.diperuntukkan}
                  value=""
                />
                <Picker.Item style={{ height: '100%', width: '100%', fontSize: 12, }} label={"CPB"} value={"CPB"} />
                <Picker.Item style={{ height: '100%', width: '100%', fontSize: 12, }} label={"NPB"} value={"NPB"} />
                <Picker.Item style={{ height: '100%', width: '100%', fontSize: 12, }} label={"CPB DAN NPB"} value={"CPB DAN NPB"} />

              </Picker>
            </View>
          </View>

          <View style={style.form}>
            <Text style={style.labelkiri}>Kantor Cabang</Text>
            <View style={style.kotakpicker}>
              <Picker
                style={style.Textinputcss}
                selectedValue={this.state.id_kacab}
                onValueChange={itemValue =>
                  this.setState({ id_kacab: itemValue, show: 1 })
                }>
                <Picker.Item
                  style={{ fontSize: 14, fontFamily: 'Poppins-Regular', fontWeight: 'bold' }}
                  label={detail.nama_kacab}
                  value=""
                />
                {
                  this.state.kacab.map((cab) =>
                    <Picker.Item style={{ height: '100%', width: '100%', fontSize: 12, }} label={cab.nama_kacab.toString()} value={cab.id_kacab} key={cab.id_kacab} />
                  )}

              </Picker>
            </View>
          </View>

          <View style={style.form}>
            <Text style={style.labelkiri}>Wilayah Binaan</Text>
            <View style={style.kotakpicker}>
              <Picker
                style={style.Textinputcss}
                onFocus={() => { this.GetWilbinAPi() }}
                selectedValue={this.state.id_wilbin}
                onValueChange={(itemValue, kacab) => {
                  this.setState({
                    id_wilbin: (itemValue),
                    show: 1
                  })
                }}>
                <Picker.Item
                  style={{ fontSize: 14, fontFamily: 'Poppins-Regular', fontWeight: 'bold' }}
                  label={detail.nama_wilbin}
                  value=""
                />
                {
                  this.state.wilbin.map((wb) =>
                    <Picker.Item style={{ height: '100%', width: '100%', fontSize: 12, }} label={wb.nama_wilbin.toString()} value={wb.id_wilbin} key={wb.id_wilbin} />
                  )}

              </Picker>
            </View>
          </View>

          <View style={style.form}>
            <Text style={style.labelkiri}>Shelter</Text>
            <View style={style.kotakpicker}>
              <Picker
                style={style.Textinputcss}
                onFocus={() => { this.GetShelterAPi() }}
                selectedValue={this.state.id_shelter}
                onValueChange={(itemValue, wilbin) => {
                  this.setState({
                    id_shelter: (itemValue),
                    show: 1
                  })
                }}>
                <Picker.Item
                  style={{ fontSize: 14, fontFamily: 'Poppins-Regular', fontWeight: 'bold' }}
                  label={detail.nama_shelter}
                  value=""
                />
                {
                  this.state.shelter.map((sh) =>
                    <Picker.Item style={{ height: '100%', width: '100%', fontSize: 12, }} label={sh.nama_shelter.toString()} value={sh.id_shelter} key={sh.id_shelter} />
                  )}
              </Picker>
            </View>
          </View>

          <View style={style.form}>
            <Text style={style.labelkiri}>Alamat</Text>
            <TextInput
              style={[style.kotak3, { height: 70 }]}
              onChangeText={alamat => this.setState({ alamat })}
              value={this.state.alamat}
              multiline={true}
              keyboardType='default'
              placeholder={detail.alamat}
              placeholderTextColor="#C0C0C0"
            />
          </View>

        </View>
        <View style={style.BSimpan2}>
          <TouchableOpacity onPress={() => this.sendData()}>
            <View style={style.BSimpan}>
              <Text style={style.label5}>Edit</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    )
  }
}

export default ProfilDonatur
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
  },
  BSimpan2: {
    height: 70,
    width: windowWidth,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  BSimpan: {
    backgroundColor: '#00A9B8',
    borderRadius: 10,
    marginHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  label5: {
    color: '#fff',
    padding: 10,
    fontFamily: 'Poppins-Medium',
    fontSize: 13,
    fontWeight: 'bold',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  kotak3: {
    color: '#000000',
    borderColor: '#bdbdbd',
    margin: 10,
    borderRadius: 2,
    borderWidth: 1,
    fontSize: 12,
    height: 40,
    width: windowWidth * 0.5
  },
  kotakpicker: {
    marginTop: 10,
    marginLeft: 10,
    paddingVertical: 5,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#DDD',
    width: windowWidth * 0.5,
    height: 40,
  },
  Textinputcss: {
    width: windowWidth * 0.5,
    marginLeft: 10,
    color: '#C0C0C0',
    marginTop: -10,
    borderRadius: 10,
    borderWidth: 1,
    fontSize: 10,
    height: 40,
    borderColor: '#C0C0C0',
    fontFamily: 'Poppins-Regular',
  },
});