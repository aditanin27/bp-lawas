import { Text, View, StyleSheet, ScrollView, Dimensions, TextInput, TouchableOpacity, ToastAndroid, Modal, Alert } from 'react-native'
import React, { Component } from 'react'
import { Tanggal, } from '../../assets/icons';
import { Picker } from '@react-native-picker/picker';
// import { DatePicker } from 'react-native-wheel-pick'
import moment from 'moment';
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

export class editdataayah extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detail: this.props.route.params.detail,
      nik_ayah: this.props.route.params.detail.nik_ayah,
      nama_ayah: this.props.route.params.detail.nama_ayah,
      agama: this.props.route.params.detail.agama,
      tempat_lahir: this.props.route.params.detail.tempat_lahir,
      alamat: this.props.route.params.detail.alamat,
      date: new Date(),
      chosenDate1: this.props.route.params.detail.tanggal_lahir,
      chosenDate2: this.props.route.params.detail.tanggal_kematian,
      prov: [],
      id_prov: this.props.route.params.detail.id_prov,
      datakota: [],
      id_kab: this.props.route.params.detail.id_kab,
      datakec: [],
      id_kec: this.props.route.params.detail.id_kec,
      datakel: [],
      id_kel: this.props.route.params.detail.id_kel,
      penghasilan: this.props.route.params.detail.penghasilan,
      penyebab_kematian: this.props.route.params.detail.penyebab_kematian,
      provinsi: this.props.route.params.detail.provinsi,
      kabupaten: this.props.route.params.detail.kabupaten,
      kecamatan: this.props.route.params.detail.kecamatan,
      kelurahan: this.props.route.params.detail.kelurahan,
      ortu: this.props.route.params.detail1.status_ortu,
      modaldate: false,
      modaldate2: false,
    };
  }
  GetprovAPi() {
    fetch('https://kilauindonesia.org/datakilau/api/getprovinsi').then(res => {
      if (res.status === 200)
        return res.json()
    }).then(resdata => {
      console.log(resdata.data)
      this.setState({
        prov: resdata.data

      })
    })
  }
  GetkabuAPi() {
    fetch('https://kilauindonesia.org/datakilau/api/getkab/' + this.state.id_prov).then(res => {
      if (res.status === 200)
        return res.json()
    }).then(resdata => {
      console.log(resdata.data)
      this.setState({
        datakota: resdata.data

      })
    })
  }
  GetkecAPi() {
    fetch('https://kilauindonesia.org/datakilau/api/getkec/' + this.state.id_kab).then(res => {
      if (res.status === 200)
        return res.json()
    }).then(resdata => {
      console.log(resdata.data)
      this.setState({
        datakec: resdata.data

      })
    })
  }
  GetkelAPi() {
    fetch('https://kilauindonesia.org/datakilau/api/getkel/' + this.state.id_kec).then(res => {
      if (res.status === 200)
        return res.json()
    }).then(resdata => {
      console.log(resdata.data)
      this.setState({
        datakel: resdata.data

      })
    })
  }
  editData() {
    {
      let simpandata = {
        nama_ayah: this.state.nama_ayah,
        agama: this.state.agama,
        tempat_lahir: this.state.tempat_lahir,
        tanggal_lahir: this.state.chosenDate1,
        alamat: this.state.alamat,
        id_prov: this.state.ortu === 'Yatim_Piatu' | this.state.ortu === 'Yatim' ? '' : this.state.id_prov,
        id_kab: this.state.ortu === 'Yatim_Piatu' | this.state.ortu === 'Yatim' ? '' : this.state.id_kab,
        id_kec: this.state.ortu === 'Yatim_Piatu' | this.state.ortu === 'Yatim' ? '' : this.state.id_kec,
        id_kel: this.state.ortu === 'Yatim_Piatu' | this.state.ortu === 'Yatim' ? '' : this.state.id_kel,
        penghasilan: this.state.ortu === 'Yatim_Piatu' | this.state.ortu === 'Yatim' ? '' : this.state.penghasilan,
        tanggal_kematian: this.state.ortu === 'Yatim_Piatu' | this.state.ortu === 'Yatim' ? moment(this.state.chosenDate2).format('YYYY-MM-DD') : '',
        penyebab_kematian: this.state.ortu === 'Yatim_Piatu' | this.state.ortu === 'Yatim' ? this.state.penyebab_kematian : '',

      }
      let data = new FormData();
      for (let key in simpandata) {
        data.append(key, simpandata[key]);
      }
      fetch('https://kilauindonesia.org/datakilau/api/ayahupd/' + this.state.detail.id_keluarga, {
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
            this.props.navigation.navigate('Keluarga')
            ToastAndroid.show("Data berhasil ditambah!", ToastAndroid.SHORT)
          } else {
            alert(`Data gagal disimpan !!!`);
          }
        })
        .catch((err) => console.log('dari catch send Data ===', err));
    }

  }
  componentDidMount() {
    this.GetprovAPi();
    this.GetkabuAPi();
    this.GetkecAPi();
    this.GetkelAPi();
    console.log(this.state.detail);
  }
  showPicker = () => {
    this.setState({ isVisible: true })
  }
  handlePicker = (date) => {
    this.setState({ isVisible: false, chosenDate: moment(date).format('DD-MM-YYYY') })
  }
  onPress = () => {
    const didin = this.state.nik_ayah;
    const dodol = didin.substring(0, 2);
    const kabu = didin.substring(0, 4)
    const keca = didin.substring(0, 6)
    const birth = moment(this.state.chosenDate1).format('DDMMYY')
    const tanggal = didin.substring(6, 12)
    if (dodol != this.state.id_prov) {
      Alert.alert(
        'Peringatan Data yang anda isi ',
        'Kode Provinsi dengan NIK TIDAK SAMA ',
        [
          {
            text: "Ubah",
            onPress: () => this.setState({}),
            style: "cancel"
          },
          {
            text: "Lanjutkan",
            onPress: () => {
              this.editData()
            }
            ,
            style: "cancel"
          },
        ],
        { cancelable: false },
      )
    }
    if (kabu != this.state.id_kab) {
      Alert.alert(
        'Peringatan Data yang anda isi ',
        'Kode Kabupaten dengan NIK TIDAK SAMA ',
        [
          {
            text: "Lanjutkan",
            onPress: () => {
              this.editData()
            }
            ,
            style: "cancel"
          },
          {
            text: "Ubah",
            onPress: () => this.setState({}),
            style: "cancel"
          },
        ],
        { cancelable: false },
      )
    }
    if (keca != this.state.id_kec) {
      Alert.alert(
        'Peringatan Data yang anda isi ',
        'Kode Kecamatan dengan NIK TIDAK SAMA ',
        [
          {
            text: "Lanjutkan",
            onPress: () => this.editData()
            ,
            style: "cancel"
          },
          {
            text: "Ubah",
            onPress: () => this.setState({}),
            style: "cancel"
          },
        ],
        { cancelable: false },
      )
    }
    if (tanggal != moment(this.state.chosenDate1).format('DDMMYY')) {
      Alert.alert(
        'Peringatan Data yang anda isi ',
        'Kode Tanggal Lahir dengan NIK TIDAK SAMA ',
        [
          {
            text: "Lanjutkan",
            onPress: () => { this.editData() }
            ,
            style: "cancel"
          },
          {
            text: "Ubah",
            onPress: () => this.setState({}),
            style: "cancel"
          },
        ],
        { cancelable: false },
      )
    }
    if (dodol == this.state.id_prov && kabu == this.state.id_kab && keca == this.state.id_kec && tanggal == moment(this.state.chosenDate1).format('DDMMYY')) {
      Alert.alert(
        'Peringatan Data yang anda isi ',
        'Kode Provinsi/Kecamatan/Kabupaten dengan NIK SUDAH SAMA',
        [
          {
            text: "Lanjutkan",
            onPress: () => {
              console.log('wdadawd')

              this.editData()

            }
            ,
            style: "cancel"
          },

        ],
        { cancelable: false },
      )
    }
  }
  render() {
    const detail = this.state.detail

    return (
      <ScrollView style={{ backgroundColor: '#fff', flex: 1 }}>
        <Text style={{ textAlign: 'center', fontSize: 16, fontWeight: 'bold', marginTop: 10 }}>Edit Data Ayah</Text>
        <View>
          <Text style={style.labelatas}>Data Keluarga</Text>
          <View style={{ justifyContent: 'center' }}>
            {this.state.ortu === 'Yatim_Piatu' | this.state.ortu === 'Yatim' ?
              <View /> :
              <View style={style.form}>
                <Text style={style.labelkiri}>NIK Ayah</Text>
                <TextInput
                  style={[style.kotak3, { backgroundColor: '#c0c0c0' }]}
                  onChangeText={nik_ayah => this.setState({ nik_ayah })}
                  value={this.state.nik_ayah}
                  keyboardType='numeric'
                  placeholder=''
                  editable={false}
                  placeholderTextColor="#C0C0C0"
                />
              </View>}
            <View style={style.form}>
              <Text style={style.labelkiri}>Nama Ayah</Text>
              <TextInput
                style={style.kotak3}
                onChangeText={nama_ayah => this.setState({ nama_ayah })}
                value={this.state.nama_ayah}
                keyboardType='default'
                placeholder=''
                placeholderTextColor="#C0C0C0"
              />
            </View>

            <View style={style.form}>
              <Text style={style.labelkiri}>Agama</Text>
              <View style={style.kotakpicker}>
                <Picker
                  style={style.Textinputcss}
                  selectedValue={this.state.agama}
                  onValueChange={itemValue =>
                    this.setState({ agama: itemValue, show: 1 })
                  }>
                  <Picker.Item
                    style={{ fontSize: 14, fontFamily: 'Poppins-Regular' }}
                    label={this.state.agama}
                    value={this.state.agama}
                  />
                  <Picker.Item
                    style={{ fontSize: 14, fontFamily: 'Poppins-Regular' }}
                    label="Islam"
                    value="Islam"
                  />
                  <Picker.Item
                    style={{ fontSize: 14, fontFamily: 'Poppins-Regular' }}
                    label="Kristen"
                    value="Kristen"
                  />
                  <Picker.Item
                    style={{ fontSize: 14, fontFamily: 'Poppins-Regular' }}
                    label="Hindu"
                    value="Hindu"
                  />
                  <Picker.Item
                    style={{ fontSize: 14, fontFamily: 'Poppins-Regular' }}
                    label="Budha"
                    value="Budha"
                  />
                </Picker>
              </View>
            </View>

            <View style={style.form}>
              <Text style={style.labelkiri}>Tempat Lahir</Text>
              <TextInput
                style={style.kotak3}
                onChangeText={tempat_lahir => this.setState({ tempat_lahir })}
                value={this.state.tempat_lahir}
                keyboardType='default'
                placeholder=''
                placeholderTextColor="#C0C0C0"
              />
            </View>

            <View style={style.form}>
              <Text style={style.labelkiri}>Tanggal Lahir</Text>
              <TextInput
                style={style.kotak3}
                onChangeText={chosenDate1 => this.setState({ chosenDate1 })}
                value={this.state.chosenDate1}
                keyboardType='default'
                placeholder=''
                placeholderTextColor="#C0C0C0"
              />
              <View
                style={{
                  borderColor: '#DDD',
                  borderWidth: 1,
                  height: 50,
                  width: 50,
                  borderRadius: 10,
                  top: 10,
                  marginLeft: 10,

                }}>
                <TouchableOpacity onPress={() => this.setState({ modaldate: true })}>
                  <View style={{ height: 50, width: 50, justifyContent: 'center', alignItems: 'center', borderRadius: 10, }}>
                    <Tanggal />
                  </View>
                </TouchableOpacity>
              </View>

            </View>

            <View style={style.form}>
              <Text style={style.labelkiri}>Alamat</Text>
              <TextInput
                style={style.kotakalamat}
                onChangeText={alamat => this.setState({ alamat })}
                value={this.state.alamat}
                keyboardType='default'
                placeholder=''
                placeholderTextColor="#C0C0C0"
              />
            </View>


            <View style={style.form}>
              <Text style={style.labelkiri}>Provinsi</Text>
              <View
                style={style.kotakpicker}>
                <Picker
                  style={style.Textinputcss}
                  enabled={this.state.ortu === 'Yatim_Piatu' | this.state.ortu === 'Yatim' ? false : true}
                  selectedValue={this.state.id_prov}
                  onValueChange={(itemValue,) => {
                    this.setState({
                      id_prov: itemValue
                    })
                  }}>
                  {/* <Picker.Item style={{ fontSize: 12 }} label={detail.id_prov === null ? 'Pilih Provinsi' : detail.nama_prov} value={'0'} key={'0'} /> */}
                  <Picker.Item style={{ fontSize: 12 }} label={this.state.provinsi} value={''} key={''} />
                  {
                    this.state.prov.map((provayah) =>
                      <Picker.Item style={{ height: '100%', width: '100%', fontSize: 12, }} label={provayah.nama.toString()} value={provayah.id_prov} key={provayah.id_prov} />
                    )}
                </Picker>
              </View>
            </View>

            <View style={style.form}>
              <Text style={style.labelkiri}>Kota/Kabupaten</Text>
              <View
                style={style.kotakpicker}>
                <Picker
                  style={style.Textinputcss}
                  enabled={this.state.ortu === 'Yatim_Piatu' | this.state.ortu === 'Yatim' ? false : true}
                  selectedValue={this.state.id_kab}
                  onFocus={() => { this.GetkabuAPi() }}
                  onValueChange={(itemValue, id_prov) => {
                    this.setState({
                      id_kab: itemValue,
                      show: 1
                    })
                  }}>
                  {/* <Picker.Item style={{ fontSize: 12 }} label={detail.id_prov === null ? 'Pilih Provinsi' : detail.nama_prov} value={'0'} key={'0'} /> */}
                  <Picker.Item style={{ fontSize: 12 }} label={this.state.kabupaten} value={''} key={''} />
                  {
                    this.state.datakota.map((kota) =>
                      <Picker.Item style={{ height: '100%', width: '100%', fontSize: 12, }} label={kota.nama.toString()} value={kota.id_kab} key={kota.id_kab} />
                    )}
                </Picker>
              </View>
            </View>

            <View style={style.form}>
              <Text style={style.labelkiri}>Kecamatan</Text>
              <View
                style={style.kotakpicker}>
                <Picker
                  style={style.Textinputcss}
                  enabled={this.state.ortu === 'Yatim_Piatu' | this.state.ortu === 'Yatim' ? false : true}
                  selectedValue={this.state.id_kec}
                  onFocus={() => { this.GetkecAPi() }}
                  onValueChange={(itemValue, id_kab) => {
                    this.setState({
                      id_kec: itemValue
                    })
                  }}>
                  {/* <Picker.Item style={{ fontSize: 12 }} label={detail.id_prov === null ? 'Pilih Provinsi' : detail.nama_prov} value={'0'} key={'0'} /> */}
                  <Picker.Item style={{ fontSize: 12 }} label={this.state.kecamatan} value={''} key={''} />
                  {
                    this.state.datakec.map((kec) =>
                      <Picker.Item style={{ height: '100%', width: '100%', fontSize: 12, }} label={kec.nama.toString()} value={kec.id_kec} key={kec.id_kec} />
                    )}
                </Picker>
              </View>
            </View>

            <View style={style.form}>
              <Text style={style.labelkiri}>Kelurahan</Text>
              <View
                style={style.kotakpicker}>
                <Picker
                  style={style.Textinputcss}
                  enabled={this.state.ortu === 'Yatim_Piatu' | this.state.ortu === 'Yatim' ? false : true}
                  selectedValue={this.state.id_kel}
                  onFocus={() => { this.GetkelAPi() }}
                  onValueChange={(itemValue, id_kec) => {
                    this.setState({
                      id_kel: itemValue,
                      show: 1
                    })
                  }}>
                  {/* <Picker.Item style={{ fontSize: 12 }} label={detail.id_prov === null ? 'Pilih Provinsi' : detail.nama_prov} value={'0'} key={'0'} /> */}
                  <Picker.Item style={{ fontSize: 12 }} label={this.state.kelurahan} value={''} key={''} />
                  {
                    this.state.datakel.map((kel) =>
                      <Picker.Item style={{ height: '100%', width: '100%', fontSize: 12, }} label={kel.nama.toString()} value={kel.id_kel} key={kel.id_kel} />
                    )}
                </Picker>
              </View>
            </View>

            <View style={style.form}>
              <Text style={style.labelkiri}>Penghasilan</Text>
              <View
                style={style.kotakpicker}>
                <Picker style={style.Textinputcss}
                  enabled={this.state.ortu === 'Yatim_Piatu' | this.state.ortu === 'Yatim' ? false : true}
                  selectedValue={this.state.penghasilan}
                  onValueChange={(itemValue,) => {
                    this.setState({
                      penghasilan: itemValue
                    })
                  }}>

                  <Picker.Item style={{ fontSize: 12 }} label={this.state.penghasilan === '' ? "Pilih " : this.state.penghasilan} value={'0'} key={'0'} />
                  <Picker.Item label="Dibawah Rp.500.000,-" value="Dibawah Rp.500.000,-" />
                  <Picker.Item label="Rp.500.000,- s/d Rp.1.500.000,-" value="Rp.500.000,- s/d Rp.1.500.000,-" />
                  <Picker.Item label="Rp.1.500.000,- s/d Rp.2.500.000,-" value="Rp.1.500.000,- s/d Rp.2.500.000,-" />
                  <Picker.Item label="Rp.2.500.000,- s/d Rp.3.500.000,-" value="Rp.2.500.000,- s/d Rp.3.500.000,-" />
                  <Picker.Item label="Rp.3.500.000,- s/d Rp.5.000.000,-" value="Rp.3.500.000,- s/d Rp.5.000.000,-" />
                  <Picker.Item label="Rp.5.000.000,- s/d Rp.7.000.000,-" value="Rp.5.000.000,- s/d Rp.7.000.000,-" />
                  <Picker.Item label="Rp.7.000.000,- s/d Rp.10.000.000,-" value="Rp.7.000.000,- s/d Rp.10.000.000,-" />
                  <Picker.Item label="Diatas Rp.10.000.000,-" value="Diatas Rp.10.000.000,-" />
                </Picker>
              </View>
            </View>

            {this.state.ortu === 'Yatim_Piatu' | this.state.ortu === 'Yatim' ?
              <View>
                <View style={style.form}>
                  <Text style={style.labelkiri}>Tanggal Kematian</Text>
                  <TextInput
                    style={style.kotak3}
                    onChangeText={chosenDate2 => this.setState({ chosenDate2 })}
                    value={this.state.chosenDate2}
                    keyboardType='numeric'
                    placeholder="Tanggal Kematian"
                    placeholderTextColor="#C0C0C0"
                  />
                  <View
                    style={{
                      borderColor: '#DDD',
                      borderWidth: 1,
                      height: 50,
                      width: 50,
                      borderRadius: 10,
                      top: 10,
                      marginLeft: 10,

                    }}>
                    <TouchableOpacity onPress={() => this.setState({ modaldate2: true })}>
                      <View style={{ height: 50, width: 50, justifyContent: 'center', alignItems: 'center', borderRadius: 10, }}>
                        <Tanggal />
                      </View>
                    </TouchableOpacity>
                  </View>

                </View>
                <View style={style.form}>
                  <Text style={style.labelkiri}>Penyebab Kematian</Text>
                  <TextInput
                    style={style.kotak3}
                    onChangeText={penyebab_kematian => this.setState({ penyebab_kematian })}
                    value={this.state.penyebab_kematian}
                    keyboardType='default'
                    placeholder='Penyebab Kematian'
                    placeholderTextColor="#C0C0C0"
                  />
                </View>
              </View>
              :
              <View />

            }

            <Modal
              animationType={"slide"}
              transparent={true}
              visible={this.state.modaldate}
              onRequestClose={() => this.setState({ modaldate: false })}
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
                  // height: '50%',
                  shadowColor: "#333",
                  shadowOffset: {
                    width: 1,
                    height: 1,
                  },
                  shadowOpacity: 0.3,
                  shadowRadius: 2,
                  elevation: 3,
                  height: '50%',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'absolute',
                  top: '50%',
                  bottom: 0,
                  left: 0,
                  right: 0,
                }}>
                  <Text style={style.tglText}>Pilih Tanggal</Text>
                  <ScrollView style={{ width: '100%', height: '100%' }}>

                    <DatePicker
                      order='D-M-Y'
                      style={{ height: 215, width: 380, backgroundColor: '#fff', marginLeft: 5 }}
                      minimumDate={new Date('1000-01-01')}
                      maximumDate={new Date('2222-12-31')}
                      format="YYYY-MM-DD"
                      onDateChange={(date) =>
                        this.setState({ chosenDate1: moment(date).format('YYYY-MM-DD') }, () => console.log(this.state.chosenDate1))
                      }
                    />
                    {/* <DatePicker
                                         date={this.state.dateanak}
                                         placeholder="select date"
                                         onDateChange={(dateanak) =>
                                             this.setState({ dateanak }, () => console.log(this.state.dateanak))
                                         }
                                         androidVariant='iosClone'
                                         locale='id'
                                     /> */}
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: '10%' }}>
                      <View style={style.kotakkecil}>
                        <TouchableOpacity onPress={() => this.setState({ modaldate: false })}>

                          <Text style={{
                            justifyContent: 'center', textAlign: 'center',
                          }}>Batal</Text>
                        </TouchableOpacity>
                      </View>
                      <View style={style.kotakkecil}>
                        <TouchableOpacity onPress={() => this.setState({ modaldate: false })}>
                          <Text style={{
                            justifyContent: 'center', textAlign: 'center',
                          }}>Simpan</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </ScrollView>
                </View>
              </View>
            </Modal>


            <Modal
              animationType={"slide"}
              transparent={true}
              visible={this.state.modaldate2}
              onRequestClose={() => this.setState({ modaldate2: false })}
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
                  // height: '50%',
                  shadowColor: "#333",
                  shadowOffset: {
                    width: 1,
                    height: 1,
                  },
                  shadowOpacity: 0.3,
                  shadowRadius: 2,
                  elevation: 3,
                  height: '50%',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'absolute',
                  top: '50%',
                  bottom: 0,
                  left: 0,
                  right: 0,
                }}>
                  <Text style={style.tglText}>Pilih Tanggal {this.state.chosenDate2}</Text>
                  <ScrollView style={{ width: '100%', height: '100%' }}>

                    <DatePicker
                      order='D-M-Y'
                      style={{ height: 215, width: 380, backgroundColor: '#fff', marginLeft: 5 }}
                      minimumDate={new Date('1000-01-01')}
                      maximumDate={new Date('2222-12-31')}
                      format="YYYY-MM-DD"
                      onDateChange={(date) =>
                        this.setState({ chosenDate2: moment(date).format('YYYY-MM-DD') }, () => console.log(this.state.chosenDate2))
                      }
                    />

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: '10%' }}>
                      <View style={style.kotakkecil}>
                        <TouchableOpacity onPress={() => this.setState({ modaldate2: false })}>

                          <Text style={{
                            justifyContent: 'center', textAlign: 'center',
                          }}>Batal</Text>
                        </TouchableOpacity>
                      </View>
                      <View style={style.kotakkecil}>
                        <TouchableOpacity onPress={() => this.setState({ modaldate2: false })}>
                          <Text style={{
                            justifyContent: 'center', textAlign: 'center',
                          }}>Simpan</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </ScrollView>
                </View>
              </View>
            </Modal>
            <View style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center', alignSelf: 'center', marginTop: 0, }}>
              <TouchableOpacity onPress={() =>
                this.state.ortu === 'Yatim_Piatu' | this.state.ortu === 'Yatim' ?
                  this.editData() :
                  this.onPress(dodol, kabu, keca, tanggal, birth)} style={style.refresh} >
                <View style={{
                  top: 20,
                  backgroundColor: '#0EBEDF', width: 170, height: 40, justifyContent: 'center', alignContent: 'center', alignItems: 'center', alignSelf: 'center', borderRadius: 10
                }}>
                  <Text style={{ color: '#fff', textAlign: 'center', justifyContent: 'center', alignContent: 'center' }}>Simpan</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView >
    )
  }
}
const style = StyleSheet.create({
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
    marginTop: 10,
    fontWeight: 'bold',
    marginVertical: 5,
    marginLeft: 30,
  },
  labelkiri2: {
    fontSize: 12,
    fontWeight: 'bold',
    marginVertical: 5,
    marginLeft: 20,
    width: 90,
  },
  labelkirianak: {
    fontSize: 12,
    fontWeight: 'bold',
    marginVertical: 5,
    marginLeft: 20,
    width: 200,
  },
  labelkanan: {
    fontSize: 12,
    marginHorizontal: 5,
    width: 150,
  },
  labelkk: {
    fontSize: 12,
    marginHorizontal: 5,
    width: 200,
  },
  labelkanan2: {
    fontSize: 12,
    marginHorizontal: 5,
    width: 220,
  },
  labelkanan3: {
    marginHorizontal: 5,
    width: 200,
    height: 40,
    borderWidth: 1,
    borderColor: '#bdbdbd',
    justifyContent: 'center',
    alignContent: 'center'
  },
  labelkanan4: {
    marginHorizontal: 5,
    width: 200,
    height: 90,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#bdbdbd',
    justifyContent: 'center',
    alignContent: 'center'
  },
  kotak: {
    marginVertical: 10,
    marginHorizontal: 16,
    borderRadius: 15,
    shadowColor: '#858585',
    overflow: 'hidden',
    shadowRadius: 15,
    elevation: 6,
    shadowOpacity: '25%',
    borderColor: '#7e7e7e',
    height: 300
  },
  kotakbtn: {
    marginVertical: 10,
    marginHorizontal: 16,
    borderRadius: 15,
    shadowColor: '#858585',
    overflow: 'hidden',
    shadowRadius: 15,
    elevation: 6,
    shadowOpacity: '25%',
    borderColor: '#7e7e7e',
  },
  kotakank: {
    marginVertical: 10,
    marginHorizontal: 16,
    borderRadius: 15,
    shadowColor: '#858585',
    overflow: 'hidden',
    shadowRadius: 15,
    elevation: 6,
    shadowOpacity: '25%',
    borderColor: '#7e7e7e',
  },
  labelatas: {
    fontSize: 14,
    marginLeft: 20,
    marginBottom: 5,
    fontWeight: 'bold',
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
  refresh: {
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    // marginHorizontal: 5,
    bottom: 10,
  },//vildan
  body: {
    backgroundColor: '#EEEEEE',
    borderColor: '#CECBCB',
    borderRadius: 10,
    borderWidth: 3,
    borderStyle: 'dashed',
    backgroundColor: '#ffff',
    marginTop: 10,
    width: '90%',
    height: 200,
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 10
  },
  itemflat: {
    flex: 1,
    fontSize: 12,
    flexDirection: 'row',
    marginLeft: 15,
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
    borderColor: '#7e7e7e',
    borderRadius: 15,
  },
  iconbesar: {
    marginTop: 50,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
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
  Label3: {
    marginTop: 10,
    fontSize: 16,
    width: '100%',
    color: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Poppins-Medium',
  },
  ModalCont2: {
    flex: 1,
    backgroundColor: '#00000079',
  },
  kotakkecil: {
    borderColor: '#bdbdbd',
    borderWidth: 1,
    width: '40%',
    height: 50,
    justifyContent: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    borderRadius: 10,
    marginTop: 10,
    marginHorizontal: 10,
  },
})
export default editdataayah