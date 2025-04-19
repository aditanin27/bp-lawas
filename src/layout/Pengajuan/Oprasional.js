import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  ToastAndroid,
} from 'react-native';
import React, { Component } from 'react';
import { Plusblue, Pluswarna } from '../../assets/icons';
import moment from 'moment';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { connect } from 'react-redux';
export class Oprasional extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 1,
      jumlah: [],
      nama_barang: [],
      status: 'Pending',
      tujuan: 'Oprasional',
      date: new Date(),
      jenis: '',
      uang: '',
      berupa: '',
      jumlahorang: [],
      pelajaran: [],
      detail: '',
      materi: [],
    };
  }

  SimpanDataUang() {
    AsyncStorage.getItem('token').then((token) => {
      let dataToSend = {
        tanggal: moment(this.state.date).format('YYYY-MM-DD'),
        status: this.state.status,
        tujuan: this.state.tujuan,
        berupa: this.state.berupa,
        uang: this.state.uang,
        detail: encodeURIComponent(JSON.stringify(this.state.detail)),
        id_shelter: this.props.user.id_shelter,
      };
      let data = new FormData();

      for (let key in dataToSend) {
        data.append(key, dataToSend[key]);
      }
      console.log('kkkk', data);
      fetch('https://kilauindonesia.org/datakilau/api/tampengajuanuang', {
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
            this.props.navigation.navigate('ListPengajuan')

            ToastAndroid.show("Data berhasil ditambah!", ToastAndroid.SHORT)
          } else {
            alert(
              'Tolong isi Kolom Uang yang diajukan '
            )
            ToastAndroid.show("gagal menyimpan", ToastAndroid.SHORT)
          }
        })
        .catch((err) => console.log('dari catch send Data ===', err));
    });
  }

  SimpanDataTutor() {
    AsyncStorage.getItem('token').then((token) => {
      let dataToSend = {
        tanggal: moment(this.state.date).format('YYYY-MM-DD'),
        status: this.state.status,
        tujuan: this.state.tujuan,
        pelajaran: this.state.pelajaran,
        berupa: this.state.berupa,
        jumlahorang: this.state.jumlahorang,
        id_shelter: this.props.user.id_shelter,
      };
      let data = new FormData();

      for (let key in dataToSend) {
        data.append(key, dataToSend[key]);
      }
      console.log('kkkk', data);
      fetch('https://kilauindonesia.org/datakilau/api/tampengajuantutor', {
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
            this.props.navigation.navigate('ListPengajuan')

            ToastAndroid.show("Data berhasil ditambah!", ToastAndroid.SHORT)
          } else {
            alert(
              'Tolong isi Kolom Uang yang diajukan '
            )
            ToastAndroid.show("gagal menyimpan", ToastAndroid.SHORT)
          }
        })
        .catch((err) => console.log('dari catch send Data ===', err));
    });
  }

  getmateriAPi() {
    AsyncStorage.getItem('token').then((token) => {
      fetch('https://kilauindonesia.org/datakilau/api/materi', {
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
            materi: resJson.data,
            refreshing: false,
          });
        })
        .catch((err) => console.log('error catch home', err));
    });
  }

  componentDidMount() {
    this.getmateriAPi();
  }
  onChangeTextjumlah = (text, index) => {
    this.setState(
      prevState => {
        prevState.jumlah[index] = text;
        return {
          jumlah: prevState.jumlah,
          Jumlah: 1,
        };
      },
      () => console.log(this.state.jumlah),
    );
  };

  onChangeTextNama = (text, index) => {
    this.setState(
      prevState => {
        prevState.nama_barang[index] = text;
        return {
          nama_barang: prevState.nama_barang,
        };
      },
      () => console.log(this.state.nama_barang),
    );
  };
  render() {
    const filmateri = this.state.materi.filter((item, index) => {
      return (
        this.state.materi.findIndex(
          i => i.mata_pelajaran === item.mata_pelajaran,
        ) === index
      );
    });

    const inputbutton = [];
    for (let i = 0; i < this.state.count; i++) {
      inputbutton.push(
        <>
          <ScrollView>
            <View key={i}>
              <View style={{ flexDirection: 'row', marginTop: 10 }}>
                <View style={{ marginLeft: 20 }}>
                  <Text>Pengajuan Untuk</Text>
                  <TextInput
                    style={[style.kotak3, { width: windowWidth * 0.4 }]}
                    onChangeText={text => {
                      this.onChangeTextNama(text, i);
                    }}
                    value={this.state.nama_barang[i]}
                    placeholder="Nama barang"
                    placeholderTextColor="#C0C0C0"
                  />
                </View>
                <View style={{ marginLeft: 20 }}>
                  <Text>Jumlah Kebutuhan</Text>
                  <TextInput
                    style={[style.kotak3, { width: windowWidth * 0.2 }]}
                    onChangeText={text => {
                      this.onChangeTextjumlah(text, i);
                    }}
                    value={this.state.jumlah[i]}
                    keyboardType="numeric"
                    placeholder="jumlah"
                    placeholderTextColor="#C0C0C0"
                  />
                </View>
              </View>
            </View>
          </ScrollView>
        </>,
      );
    }
    return (
      <SafeAreaView style={{ backgroundColor: '#fff', height: '100%' }}>
        <Text style={{ textAlign: 'center', fontSize: 14, marginTop: 5 }}>
          Pengajuan Oprasional
        </Text>

        <View
          style={{
            width: '90%',
            borderRadius: 10,
            borderWidth: 1,
            marginLeft: 20,
            marginTop: 10,
            borderColor: '#E9E9E9',
            backgroundColor: '#fff',
            flexDirection: 'column',
            justifyContent: 'space-around',
          }}>
          <Picker
            mode="dropdown"
            style={style.Textinputcss}
            selectedValue={this.state.berupa}
            value={this.state.berupa}
            onValueChange={itemValue => {
              this.setState({
                berupa: itemValue,
              });
            }}>
            <Picker.Item
              style={{ fontSize: 12 }}
              label={'Pilih Pengajuan untuk'}
              value={'0'}
              key={'0'}
            />

            <Picker.Item style={{ fontSize: 12 }} label="Uang" value="Uang" />
            <Picker.Item style={{ fontSize: 12 }} label="Tutor Baru" value="Tutor Baru" />
            {/* <Picker.Item style={{ fontSize: 12 }} label="NPB/CPB/BCPB" value="Bimbingan" /> */}
          </Picker>
        </View>
        {this.state.berupa === 'Uang' ? (
          <View>
            <Text style={{ marginLeft: 10 }}>Masukan Uang yang di ajukan:</Text>
            <TextInput
              style={[style.kotak3, { width: windowWidth * 0.9, marginLeft: 10 }]}
              value={this.state.uang
                .replace(/\D/g, '')
                .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
              keyboardType="numeric"
              onChangeText={text =>
                this.setState({ uang: text.replace(/\D/g, '') })
              }
              placeholder="Masukan Nominal"
              placeholderTextColor="#7e7e7e"
            />
            <View >
              <Text style={{ marginLeft: 10 }}>Detail Kebutuhan:</Text>
              <TextInput
                style={[style.kotak3, { width: windowWidth * 0.9, marginLeft: 10, height: 75 }]}
                onChangeText={detail => this.setState({ detail })}
                value={this.state.detail}
                keyboardType='default'
                multiline={true}
                placeholder="Masukan detail "
                placeholderTextColor="#C0C0C0"
              />
            </View>
          </View>
        ) : (
          <View />
        )}

        {this.state.berupa === 'Tutor Baru' ? (
          <View>
            <Text style={{ marginLeft: 10 }}>
              Tutor yang ingin di perlukan untuk :
            </Text>
            <View
              style={{
                width: '90%',
                borderRadius: 10,
                borderWidth: 1,
                marginLeft: 20,
                marginTop: 10,
                borderColor: '#E9E9E9',
                backgroundColor: '#fff',
                flexDirection: 'column',
                justifyContent: 'space-around',
              }}>
              <Picker
                mode="dropdown"
                style={style.Textinputcss}
                selectedValue={this.state.pelajaran}
                value={this.state.pelajaran}
                onValueChange={itemValue => {
                  this.setState({
                    pelajaran: itemValue,
                  });
                }}>
                <Picker.Item
                  style={{ fontSize: 12 }}
                  label={'Pilih Pelajaran'}
                  value={'0'}
                  key={'0'}
                />
                {filmateri.map((kel, index) => (
                  <Picker.Item
                    style={{ height: '100%', width: '100%' }}
                    label={kel.mata_pelajaran}
                    value={kel.mata_pelajaran}
                    key={index}
                  />
                ))}

                {/* <Picker.Item style={{ fontSize: 12 }} label="NPB/CPB/BCPB" value="Bimbingan" /> */}
              </Picker>
            </View>
            <View style={{ marginLeft: 10 }}>
              <Text>Jumlah yang di butuhkan:</Text>
              <TextInput
                style={[style.kotak3, { width: windowWidth * 0.3 }]}
                onChangeText={jumlahorang => this.setState({ jumlahorang })}
                value={this.state.jumlahorang}
                placeholder=""
                keyboardType="numeric"
                placeholderTextColor="#C0C0C0"
              />
            </View>
          </View>
        ) : (
          <View />
        )}


        {this.state.berupa === 'Tutor Baru' ?
          <View style={style.botomnav}>
            <TouchableOpacity
              style={style.btntambah}
              onPress={() => this.SimpanDataTutor()}>
              <Text style={{ color: '#fff', textAlign: 'center' }}>Simpan</Text>
            </TouchableOpacity>
          </View>
          : <View style={style.botomnav}>
            <TouchableOpacity
              style={style.btntambah}
              onPress={() => this.SimpanDataUang()}>
              <Text style={{ color: '#fff', textAlign: 'center' }}>Simpan Data</Text>
            </TouchableOpacity>
          </View>}

      </SafeAreaView>
    );
  }
}
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const style = StyleSheet.create({
  itemflat: {
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
    borderRadius: 15,
  },
  btntambah: {
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    height: 50,
    borderWidth: 1,
    borderRadius: 10,
    color: '#fff',
    borderColor: '#00A9B8',
    backgroundColor: '#00A9B8',
  },
  kotak3: {
    marginTop: 10,
    color: '#000',
    borderRadius: 10,
    borderWidth: 0.1,
    fontSize: 13,
    height: 50,
    width: windowWidth * 0.3,
    padding: 12,
    backgroundColor: '#fff',
    borderColor: '#DDDDDD',
    borderWidth: 1,
    fontFamily: 'Poppins-Regular',
  },
  coltom1: {
    width: '90%',
    marginTop: 10,
    fontSize: 16,
    padding: 10,
    marginTop: 10,
    backgroundColor: '#0EBEDF',
    marginVertical: 8,
    marginHorizontal: 16,
    borderWidth: 0.1,
    borderRadius: 2,
    borderColor: '#fff',
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
export default connect(mapStateToProps, mapDispatchToProps)(Oprasional);