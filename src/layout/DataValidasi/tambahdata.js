import {
  Text, View, ScrollView, TextInput, StyleSheet,
  Dimensions, ToastAndroid, TouchableOpacity, Image, Alert
} from 'react-native'
import React, { Component } from 'react'
import * as ImagePicker from "react-native-image-picker"
import { Picker } from '@react-native-picker/picker';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import { Camera } from '../../assets/icons'
import moment from 'moment';
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps'

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
export class tambah extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detail: this.props.route.params.item,
      pekerjaan_kepala_keluarga: '0',
      pengahasilan: '',
      pendidikan_kepala_keluarga: '0',
      jumlah_tanggungan: '',
      kepemilikan_tabungan: '',
      jumlah_makan: '',
      kepemilikan_tanah: '',
      kepemilikan_rumah: '',
      kondisi_rumah_dinding: '0',
      kondisi_rumah_lantai: '0',
      kepemilikan_kendaraan: '',
      kepemilikan_elektronik: '',
      sumber_air_bersih: 'Pilih',
      jamban_limbah: 'pilih',
      tempat_sampah: '',
      perokok: '',
      konsumen_miras: '',
      persediaan_p3k: '',
      makan_buah_sayur: '',
      solat_lima_waktu: '',
      membaca_alquran: '',
      majelis_taklim: '',
      membaca_koran: '',
      pengurus_organisasi: '',
      pengurus_organisasi_sebagai: '',
      status_anak: '',
      biaya_pendidikan_perbulan: '',
      bantuan_lembaga_formal_lain: '',
      bantuan_lembaga_formal_lain_sebesar: '',
      kondisi_penerima_manfaat: '',
      tanggal_survey: '',
      petugas_survey: '',
      hasil_survey: '',
      penghasilan: '',
      date: new Date(),
      keterangan_hasil: '',
      kondinding: '',
      konlantai: '',
      pekerkep: '',
      penkel: '',
      jamban: '',
      jiwa: '',
      petugas: '',
      rumah: '',
      gaji: '',
      lantai: '',
      dinding: '',
      air: '',
      biaya: '',
      pekerjaan: '',
      elektronik: '',
      keterangan: '',
      lihatkeluarga: false,
      lihatasset: false,
      lihatekonomi: false,
      lihatibadah: false,
      lihatkesehatan: false,
      lihatlainya: false,
      lihathasil: false,
      foto: {
        name: '',
        type: '',
        uri: '',
        id: 0,
      },
      petugaslist: [],
      img1: null,
      img2: 0,
      mapType: 'hybrid',
    };
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
  componentDidMount() {
    this.GetkkAPi();
    console.log(this.state.detail)
  }

  GetkkAPi() {
    const id_anak = this.state.anak
    fetch('https://kilauindonesia.org/datakilau/api/penadmincabang').then(res => {
      if (res.status === 200)
        return res.json()
    }).then(resdata => {
      console.log(resdata.data)
      this.setState({
        petugaslist: resdata.data,
      })
    })
  }
  SimpanData() {

    {
      let simpandata = {
        id_keluarga: this.state.detail.id_keluarga,
        pekerjaan_kepala_keluarga: this.state.pekerjaan_kepala_keluarga === '' ?
          this.state.pekerkep : this.state.pekerjaan_kepala_keluarga,

        penghasilan: this.state.penghasilan,

        pendidikan_kepala_keluarga: this.state.pendidikan_kepala_keluarga === '' ?
          this.state.penkel : this.state.pendidikan_kepala_keluarga,

        jumlah_tanggungan: this.state.jumlah_tanggungan,
        kepemilikan_tabungan: this.state.kepemilikan_tabungan,
        jumlah_makan: this.state.jumlah_makan,
        kepemilikan_tanah: this.state.kepemilikan_tanah,
        kepemilikan_rumah: this.state.kepemilikan_rumah,

        kondisi_rumah_dinding: this.state.kondisi_rumah_dinding === '' ?
          this.state.kondinding : this.state.kondisi_rumah_dinding,

        kondisi_rumah_lantai: this.state.kondisi_rumah_lantai === '' ?
          this.state.konlantai : this.state.kondisi_rumah_lantai,

        kepemilikan_kendaraan: this.state.kepemilikan_kendaraan,

        kepemilikan_elektronik: this.state.kepemilikan_elektronik,

        sumber_air_bersih: this.state.sumber_air_bersih === '' ?
          this.state.sumberlain : this.state.sumber_air_bersih,

        jamban_limbah: this.state.jamban_limbah === '' ?
          this.state.jamban : this.state.jamban_limbah,

        tempat_sampah: this.state.tempat_sampah,
        perokok: this.state.perokok,
        foto: this.state.foto,
        konsumen_miras: this.state.konsumen_miras,
        persediaan_p3k: this.state.persediaan_p3k,
        makan_buah_sayur: this.state.makan_buah_sayur,
        solat_lima_waktu: this.state.solat_lima_waktu,
        membaca_alquran: this.state.membaca_alquran,
        majelis_taklim: this.state.majelis_taklim,
        membaca_koran: this.state.membaca_koran,
        pengurus_organisasi: this.state.pengurus_organisasi,
        pengurus_organisasi_sebagai: this.state.pengurus_organisasi_sebagai,
        status_anak: this.state.status_anak,
        biaya_pendidikan_perbulan: this.state.biaya_pendidikan_perbulan,
        bantuan_lembaga_formal_lain: this.state.bantuan_lembaga_formal_lain,
        bantuan_lembaga_formal_lain_sebesar: this.state.bantuan_lembaga_formal_lain_sebesar,
        kondisi_penerima_manfaat: this.state.kondisi_penerima_manfaat,
        tanggal_survey: moment(this.state.date).format('YYYY-MM-DD'),
        petugas_survey: this.state.petugas_survey,
        hasil_survey: this.state.hasil_survey,
        keterangan_hasil: this.state.keterangan_hasil,
      }
      let data = new FormData();
      for (let key in simpandata) {
        data.append(key, simpandata[key]);
      }
      fetch('https://kilauindonesia.org/datakilau/api/tamsurvey/' + this.state.detail.id_keluarga, {
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
            this.props.navigation.navigate('DataValidasi')
            this.onRefresh()
            ToastAndroid.show("Data berhasil ditambah!", ToastAndroid.SHORT)

          } else {

            ToastAndroid.show("gagal menyimpan", ToastAndroid.SHORT)
          }
        })
        .catch((err) => console.log('dari catch send Data ===', err));
    }

  }
  render() {
    var Pilihan = [
      { label: 'Ya', value: 'Ya' },
      { label: 'Tidak', value: 'Tidak' },
    ];
    var koran = [
      { label: 'Selalu', value: 'Selalu' },
      { label: 'Jarang', value: 'Jarang' },
      { label: 'Tidak Pernah', value: 'Tidak Pernah' },
    ];
    var majelis = [
      { label: 'Rutin', value: 'Rutin' },
      { label: 'Jarang', value: 'Jarang' },
      { label: 'Tidak Pernah', value: 'Tidak Pernah' },
    ];
    var Alquran = [
      { label: 'Lancar', value: 'Lancar' },
      { label: 'Terbata-bata', value: 'Terbata-bata' },
      { label: 'Tidak Bisa', value: 'Tidak Bisa' },
    ];
    var waktu = [
      { label: 'Lengkap', value: 'Lengkap' },
      { label: 'Kadang', value: 'Kadang-kadang' },
      { label: 'Tidak Pernah', value: 'Tidak Pernah' },
    ];
    var statusanak = [
      { label: 'Yatim', value: 'Yatim' },
      { label: 'Dhuafa', value: 'Dhuafa' },
      { label: 'Non Dhuafa', value: 'Non Dhuafa' },
    ];
    var Kendaraan = [
      { label: 'Sepeda', value: 'Sepeda' },
      { label: 'Motor', value: 'Motor' },
      { label: 'Mobil', value: 'Mobil' },
    ];
    var TPS = [
      { label: 'TPS', value: 'TPS' },
      { label: 'Sungai', value: 'Sungai' },
      { label: 'Pekarangan', value: 'Pekarangan' },
    ];
    const detail = this.state.detail
    // var rapimg = [];
    // for (let i = 0; i <= this.state.img2; i++) {
    //   rapimg.push(
    //     <Image
    //       style={{ width: 200, height: 200, resizeMode: 'contain', }}
    //       source={this.state.rapimg[i].image}
    //     />,
    //   );
    // }
    return (
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <View>
          <Text style={{ marginLeft: 20, marginTop: 15, fontWeight: 'bold', fontSize: 20 }}>Data Survey </Text>
        </View>

        <View style={{ justifyContent: 'center', flexDirection: 'row', marginVertical: 10, }}>
          <TouchableOpacity style={[style.kotak, {
            marginHorizontal: 15, width: '25%',
            backgroundColor: this.state.lihatkeluarga === false ? '#fff' : '#0EBEDF',
            borderColor: this.state.lihatkeluarga === false ? '#bdbdbd' : '#fff',
            padding: 8, borderRadius: 5
          }]}
            onPress={() => this.setState({
              lihatkeluarga: !this.state.lihatkeluarga, lihathasil: false,
              lihatasset: false, lihatekonomi: false, lihatibadah: false, lihatkesehatan: false, lihatlainya: false
            })}>
            <Text style={{ color: this.state.lihatkeluarga === false ? '#bdbdbd' : '#fff', textAlign: 'center' }}>Keluarga</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[style.kotak, {
            marginHorizontal: 15, width: '25%',
            backgroundColor: this.state.lihatekonomi === false ? '#fff' : '#0EBEDF',
            borderColor: this.state.lihatekonomi === false ? '#bdbdbd' : '#fff',
            padding: 8, borderRadius: 5
          }]} onPress={() => this.setState({
            lihatkeluarga: false, lihathasil: false,
            lihatasset: false, lihatekonomi: !this.state.lihatekonomi, lihatibadah: false, lihatkesehatan: false, lihatlainya: false,
          })}>
            <Text style={{ color: this.state.lihatekonomi === false ? '#bdbdbd' : '#fff', textAlign: 'center' }}>Ekonomi</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[style.kotak, {
            marginHorizontal: 15, width: '25%',
            backgroundColor: this.state.lihatkesehatan === false ? '#fff' : '#0EBEDF',
            borderColor: this.state.lihatkesehatan === false ? '#bdbdbd' : '#fff',
            padding: 8, borderRadius: 5
          }]} onPress={() => this.setState({
            lihatkeluarga: false, lihathasil: false,
            lihatasset: false, lihatekonomi: false, lihatibadah: false, lihatkesehatan: !this.state.lihatkesehatan, lihatlainya: false
          })}>
            <Text style={{ color: this.state.lihatkesehatan === false ? '#bdbdbd' : '#fff', textAlign: 'center' }}>Kesehatan</Text>
          </TouchableOpacity>
        </View>

        <View style={{ justifyContent: 'center', flexDirection: 'row', }}>
          <TouchableOpacity style={[style.kotak, {
            marginHorizontal: 15, width: '25%',
            backgroundColor: this.state.lihatibadah === false ? '#fff' : '#0EBEDF',
            borderColor: this.state.lihatibadah === false ? '#bdbdbd' : '#fff',
            padding: 8, borderRadius: 5
          }]} onPress={() => this.setState({
            lihatkeluarga: false, lihathasil: false,
            lihatasset: false, lihatekonomi: false, lihatibadah: !this.state.lihatibadah, lihatkesehatan: false, lihatlainya: false
          })}>
            <Text style={{ color: this.state.lihatibadah === false ? '#bdbdbd' : '#fff', textAlign: 'center' }}>Ibadah</Text>
          </TouchableOpacity>


          <TouchableOpacity style={[style.kotak, {
            marginHorizontal: 15, width: '25%',
            backgroundColor: this.state.lihatasset === false ? '#fff' : '#0EBEDF',
            borderColor: this.state.lihatasset === false ? '#bdbdbd' : '#fff',
            padding: 8, borderRadius: 5
          }]} onPress={() => this.setState({
            lihatkeluarga: false, lihathasil: false,
            lihatasset: !this.state.lihatasset, lihatekonomi: false, lihatibadah: false, lihatkesehatan: false, lihatlainya: false
          })}>
            <Text style={{ color: this.state.lihatasset === false ? '#bdbdbd' : '#fff', textAlign: 'center' }}>Asset</Text>
          </TouchableOpacity>


          <TouchableOpacity style={[style.kotak, {
            marginHorizontal: 15, width: '25%',
            backgroundColor: this.state.lihatlainya === false ? '#fff' : '#0EBEDF',
            borderColor: this.state.lihatlainya === false ? '#bdbdbd' : '#fff',
            padding: 8, borderRadius: 5
          }]} onPress={() => this.setState({
            lihatkeluarga: false, lihathasil: false,
            lihatasset: false, lihatekonomi: false, lihatibadah: false, lihatkesehatan: false, lihatlainya: !this.state.lihatlainya,
          })}>
            <Text style={{ color: this.state.lihatlainya === false ? '#bdbdbd' : '#fff', textAlign: 'center' }}>Lainya</Text>
          </TouchableOpacity>



        </View>

        <View style={{ marginHorizontal: 8 }}>
          <TouchableOpacity style={[style.kotak, {
            marginHorizontal: 15, width: '25%',
            backgroundColor: this.state.lihathasil === false ? '#fff' : '#0EBEDF',
            borderColor: this.state.lihathasil === false ? '#bdbdbd' : '#fff',
            padding: 8, borderRadius: 5
          }]} onPress={() => this.setState({
            lihatkeluarga: false, lihathasil: !this.state.lihathasil,
            lihatasset: false, lihatekonomi: false, lihatibadah: false, lihatkesehatan: false, lihatlainya: false,
          })}>
            <Text style={{ color: this.state.lihathasil === false ? '#bdbdbd' : '#fff', textAlign: 'center' }}>Hasil</Text>
          </TouchableOpacity>
        </View>
        <ScrollView>
          <View style={{ flexDirection: 'column', marginTop: 10 }}>
            {this.state.lihatkeluarga === true ?
              <View style={style.kotak}>
                <Text style={style.labelatas}>Keluarga</Text>
                <View style={{ justifyContent: 'center' }}>
                  <View style={style.form}>
                    <Text style={style.labelkiri}>No. Kartu Keluarga</Text>
                    <Text style={style.labelkk}>:{detail.no_kk} a/n {detail.kepala_keluarga}</Text>
                  </View>
                  <View style={style.form}>
                    <Text style={style.labelkiri}>Transportasi Anak</Text>
                    <Text style={style.labelkiri}>{detail.transportasi}</Text>
                  </View>
                  <View style={style.form}>
                    <Text style={style.labelkiri}>Jarak rumah ke Shelter</Text>
                    <Text style={style.labelkiri}>{detail.jarak_rumah} KM</Text>
                  </View>
                  <View style={{ width: '90%', height: 300, marginLeft: '5%', marginTop: 10 }}>
                    <MapView
                      style={style.map}
                      initialRegion={{
                        latitude: parseFloat(this.state.detail.latitude),
                        longitude: parseFloat(this.state.detail.longitude),
                        latitudeDelta: 0.01,
                        longitudeDelta: 0.003
                      }}
                      onRegionChange={this.onRegionChange}
                      showsUserLocation={true}
                      followUserLocation={true}
                      zoomEnabled={true}
                      showsScale={true}
                      mapType={this.state.mapType}
                      // followsUserLocation={true}
                      userLocationCalloutEnabled={true}
                    // userLocationAnnotationTitle={true}
                    // onPress={(e) => this.onMapPress(e)}
                    //   onPress={(e) => this.setState({
                    //     latitude: e.nativeEvent.coordinate.latitude,
                    //     longitude: e.nativeEvent.coordinate.longitude
                    //   })
                    // }
                    >
                      <Marker coordinate={{
                        latitude: parseFloat(this.state.detail.latitude),
                        longitude: parseFloat(this.state.detail.longitude),
                        latitudeDelta: 0.04,
                        longitudeDelta: 0.05,

                      }}>
                        <Callout tooltip >
                          <View style={style.bubble}>
                            <View style={{ width: 130, }}>
                              <Text >{this.state.detail.full_name}</Text>
                              <Text >{this.state.detail.jenis_kelamin}</Text>
                              {/* <Text style={style.kotak3}>Jalan Sudirman Rt:0200 Rw:1200 Sumedang selatan kabupaten sumedang</Text> */}
                            </View>
                          </View>
                          <View style={style.arrowborder}></View>
                          <View style={StyleSheet.arrow}></View>
                        </Callout>
                      </Marker>

                      {/* <Marker
                                key={this.state.markers.key}
                                coordinate={this.state.markers.coordinate}
                                pinColor={this.state.markers.color}
                            >
                                <Callout tooltip >
                                    <View style={[style.bubble, { width: 150 }]}>
                                        <Text >Ini Koordinat baru</Text>
                                    </View>
                                    <View style={style.arrowborder}></View>
                                    <View style={StyleSheet.arrow}></View>
                                </Callout>
                                <View style={style.marker}>
                                    <Image source={require('../../assets/images/IconMarker2.png')} />
                                    <Text style={style.text}>
                                        {JSON.stringify(this.state.markers.coordinate)}</Text>


                                </View>

                            </Marker> */}


                    </MapView>
                  </View>
                  <View style={style.form}>
                    <Text style={style.labelkiri}>Pendidikan Terakhir Kepala Keluarga</Text>
                    <View style={style.labelkanan2}>
                      <Picker
                        selectedValue={this.state.pendidikan_kepala_keluarga}
                        onValueChange={(itemValue) => {
                          this.setState({
                            pendidikan_kepala_keluarga: itemValue
                          })
                        }}>
                        <Picker.Item
                          style={{ fontSize: 14, fontFamily: 'Poppins-Regular' }}
                          label="Pilih"
                          value='0'

                        />
                        <Picker.Item
                          style={{ fontSize: 14, fontFamily: 'Poppins-Regular' }}
                          label="Tidak Sekolah"
                          value="Tidak Sekolah"
                        />
                        <Picker.Item
                          style={{ fontSize: 14, fontFamily: 'Poppins-Regular' }}
                          label="Sekolah Dasar"
                          value="Sekolah Dasar"
                        />
                        <Picker.Item
                          style={{ fontSize: 14, fontFamily: 'Poppins-Regular' }}
                          label="SMP/MTS/Sederajat"
                          value="SMP/MTS/Sederajat"
                        />
                        <Picker.Item
                          style={{ fontSize: 14, fontFamily: 'Poppins-Regular' }}
                          label="Bimbel"
                          value="Bimbel"
                        />
                        <Picker.Item
                          style={{ fontSize: 14, fontFamily: 'Poppins-Regular' }}
                          label="SMA/MA/SMK/Sederajat"
                          value="SMA/MA/SMK/Sederajat"
                        />
                        <Picker.Item
                          style={{ fontSize: 14, fontFamily: 'Poppins-Regular' }}
                          label="Diploma I"
                          value="Diploma I"
                        />
                        <Picker.Item
                          style={{ fontSize: 14, fontFamily: 'Poppins-Regular' }}
                          label="Diploma II"
                          value="Diploma II"
                        />
                        <Picker.Item
                          style={{ fontSize: 14, fontFamily: 'Poppins-Regular' }}
                          label="Diploma III"
                          value="Diploma III"
                        />
                        <Picker.Item
                          style={{ fontSize: 14, fontFamily: 'Poppins-Regular' }}
                          label="Diploma IV"
                          value="Diploma IV"
                        />
                        <Picker.Item
                          style={{ fontSize: 14, fontFamily: 'Poppins-Regular' }}
                          label="Strata-1"
                          value="Strata-1"
                        />
                        <Picker.Item
                          style={{ fontSize: 14, fontFamily: 'Poppins-Regular' }}
                          label="Strata-2"
                          value="Strata-2"
                        />
                        <Picker.Item
                          style={{ fontSize: 14, fontFamily: 'Poppins-Regular' }}
                          label="Strata-3"
                          value="Strata-3"
                        />
                        <Picker.Item
                          style={{ fontSize: 14, fontFamily: 'Poppins-Regular' }}
                          label="Lain-Lain"
                          value=""
                        />

                      </Picker>

                    </View>
                  </View>
                  {this.state.pendidikan_kepala_keluarga === '' ?
                    <View style={style.form}>
                      <Text style={style.labelkiri}></Text>
                      <TextInput
                        style={[style.labelkanan3,]}
                        onChangeText={penkel => this.setState({ penkel })}
                        value={this.state.penkel}
                        keyboardType='default'
                        placeholder='Tuliskan'
                        placeholderTextColor='#7e7e7e'
                      />
                    </View>
                    : <View />}

                  <View style={style.form}>
                    <Text style={style.labelkiri}>Jumlah Tanggungan Kepala Keluarga</Text>
                    <TextInput
                      style={style.labelkanan3}
                      onChangeText={jumlah_tanggungan => this.setState({ jumlah_tanggungan })}
                      value={this.state.jumlah_tanggungan}
                      keyboardType='numeric'
                      placeholder={''}
                      placeholderTextColor='#7e7e7e'
                    />
                  </View>
                </View>
              </View>
              : <View />
            }
            {this.state.lihatekonomi === true ?
              <View style={style.kotak}>
                <Text style={style.labelatas}>Ekonomi</Text>
                <View style={style.form}>
                  <Text style={style.labelkiri}>Pekerjaan Kepala Keluarga</Text>
                  <View style={style.labelkanan2}>
                    <Picker
                      selectedValue={this.state.pekerjaan_kepala_keluarga}

                      onValueChange={(itemValue) => {
                        this.setState({
                          pekerjaan_kepala_keluarga: itemValue
                        })
                      }}>
                      <Picker.Item
                        style={{ fontSize: 12, fontFamily: 'Poppins-Regular' }}
                        label="Pilih"
                        value='0'

                      />
                      <Picker.Item
                        style={{ fontSize: 12, fontFamily: 'Poppins-Regular' }}
                        label="Petani"
                        value="Petani"
                      />
                      <Picker.Item
                        style={{ fontSize: 12, fontFamily: 'Poppins-Regular' }}
                        label="Nelayan"
                        value="Nelayan"
                      />
                      <Picker.Item
                        style={{ fontSize: 12, fontFamily: 'Poppins-Regular' }}
                        label="Peternak"
                        value="Peternak"
                      />
                      <Picker.Item
                        style={{ fontSize: 12, fontFamily: 'Poppins-Regular' }}
                        label="Non PNS Dosen/Guru"
                        value="Non PNS Dosen/Guru"
                      />
                      <Picker.Item
                        style={{ fontSize: 12, fontFamily: 'Poppins-Regular' }}
                        label="SMA/MA/SMK/Sederajat"
                        value="SMA/MA/SMK/Sederajat"
                      />
                      <Picker.Item
                        style={{ fontSize: 12, fontFamily: 'Poppins-Regular' }}
                        label="Guru PNS"
                        value="Guru PNS"
                      />
                      <Picker.Item
                        style={{ fontSize: 12, fontFamily: 'Poppins-Regular' }}
                        label="Guru Non PNS"
                        value="Guru Non PNS"
                      />
                      <Picker.Item
                        style={{ fontSize: 12, fontFamily: 'Poppins-Regular' }}
                        label="PNS/TNI/POLRI"
                        value="PNS/TNI/POLRI"
                      />
                      <Picker.Item
                        style={{ fontSize: 12, fontFamily: 'Poppins-Regular' }}
                        label="Karyawan Swasta"
                        value="Karyawan Swasta"
                      />
                      <Picker.Item
                        style={{ fontSize: 12, fontFamily: 'Poppins-Regular' }}
                        label="Buruh"
                        value="Buruh"
                      />
                      <Picker.Item
                        style={{ fontSize: 12, fontFamily: 'Poppins-Regular' }}
                        label="Wiraswasta"
                        value="Wiraswasta"
                      />
                      <Picker.Item
                        style={{ fontSize: 12, fontFamily: 'Poppins-Regular' }}
                        label="Wirausaha"
                        value="Wirausaha"
                      />
                      <Picker.Item
                        style={{ fontSize: 12, fontFamily: 'Poppins-Regular' }}
                        label="Pedagang Kecil"
                        value="Pedagang Kecil"
                      />
                      <Picker.Item
                        style={{ fontSize: 12, fontFamily: 'Poppins-Regular' }}
                        label="Pedagang Besar"
                        value="Pedagang Besar"
                      />
                      <Picker.Item
                        style={{ fontSize: 12, fontFamily: 'Poppins-Regular' }}
                        label="Tidak Bekerja"
                        value="Tidak Bekerja"
                      />
                      <Picker.Item
                        style={{ fontSize: 12, fontFamily: 'Poppins-Regular' }}
                        label="Pensiunan"
                        value="Pensiunan"
                      />

                      <Picker.Item
                        style={{ fontSize: 12, fontFamily: 'Poppins-Regular' }}
                        label="Lainnya"
                        value=""
                      />
                      <Picker.Item
                        style={{ fontSize: 12, fontFamily: 'Poppins-Regular' }}
                        label="Sudah Meninggal"
                        value="Sudah Meninggal"
                      />
                    </Picker>
                  </View>
                </View>
                {this.state.pekerjaan_kepala_keluarga === '' ?
                  <View style={style.form}>
                    <Text style={style.labelkiri}></Text>
                    <TextInput
                      style={[style.labelkanan3]}
                      onChangeText={pekerkep => this.setState({ pekerkep })}
                      value={this.state.pekerkep}
                      keyboardType='default'
                      placeholder='Tuliskan'
                      placeholderTextColor='#7e7e7e'
                    />
                  </View>
                  : <View />}

                <View style={style.form}>
                  <Text style={style.labelkiri}>Rata-rata Penghasilan Perbulan Kepala Keluarga</Text>
                  <View style={style.labelkanan2}>
                    <Picker
                      selectedValue={this.state.penghasilan}
                      onValueChange={(itemValue) => {
                        this.setState({
                          penghasilan: itemValue
                        })
                      }}>
                      <Picker.Item style={{ fontSize: 10 }} label="Pilih"
                        value="" />
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




                <View style={style.form}>
                  <Text style={style.labelkiri}>Kepemilikan Tabungan </Text>
                  <RadioForm
                    radio_props={Pilihan}
                    onPress={value => {
                      this.setState({ kepemilikan_tabungan: value })
                      ToastAndroid.show(value.toString(), ToastAndroid.SHORT);
                    }}
                    initial={this.state.kepemilikan_tabungan === 'Ya' ? 0 : this.state.kepemilikan_tabungan === 'Tidak' ? 1 : 2}
                    animation={true}
                    formHorizontal={true}
                    buttonSize={10}
                    buttonOuterSize={19}
                    labelStyle={{ fontSize: 10, marginLeft: -5, paddingRight: 10 }}>
                  </RadioForm>
                </View>
                <View style={style.form}>
                  <Text style={style.labelkiri}>Makan 2x atau Lebih</Text>
                  <RadioForm
                    radio_props={Pilihan}
                    onPress={value => {
                      this.setState({ jumlah_makan: value })
                      ToastAndroid.show(value.toString(), ToastAndroid.SHORT);
                    }}
                    initial={this.state.jumlah_makan === 'Ya' ? 0 : this.state.jumlah_makan === 'Tidak' ? 1 : 2}
                    animation={true}
                    formHorizontal={true}
                    buttonOuterSize={19}
                    buttonSize={10}
                    labelStyle={{ fontSize: 10, marginLeft: -5, paddingRight: 10 }}>
                  </RadioForm>
                </View>
              </View>
              : <View />
            }
            {this.state.lihatasset === true ?
              <View style={style.kotak}>
                <Text style={style.labelatas}>Asset</Text>
                <View style={style.form}>
                  <Text style={style.labelkiri}>Kepemilikan Tanah</Text>
                  <RadioForm
                    radio_props={Pilihan}
                    onPress={value => {
                      this.setState({ kepemilikan_tanah: value })
                      ToastAndroid.show(value.toString(), ToastAndroid.SHORT);
                    }}
                    initial={this.state.kepemilikan_tanah === 'Ya' ? 0 : this.state.kepemilikan_tanah === 'Tidak' ? 1 : 2}
                    animation={true}
                    buttonOuterSize={19}
                    buttonSize={10}
                    labelStyle={{ fontSize: 10, marginLeft: -5, paddingRight: 10 }}
                    formHorizontal={true}>
                  </RadioForm>
                </View>
                <View style={style.form}>
                  <Text style={style.labelkiri}>Kepemilikan Rumah</Text>
                  <View style={style.labelkanan2}>
                    <Picker
                      selectedValue={this.state.kepemilikan_rumah}
                      onValueChange={(itemValue) => {
                        this.setState({
                          kepemilikan_rumah: itemValue
                        })
                      }}>
                      <Picker.Item style={{ fontSize: 10 }} l label="Pilih"
                        value="" />
                      <Picker.Item label="Hak Milik" value="Hak Milik" />
                      <Picker.Item label="Sewa" value="Sewa" />
                      <Picker.Item label="Orang Tua" value="Orang Tua" />
                      <Picker.Item label="Saudara" value="Saudara" />
                      <Picker.Item label="Kerabat" value="Kerabat" />
                    </Picker>
                  </View>
                </View>
                <View style={style.form}>
                  <Text style={style.labelkiri}>Kondisi Rumah</Text>
                </View>
                <View style={style.form}>
                  <Text style={style.labelkiri}>Lantai</Text>
                  <View style={style.labelkanan2}>
                    <Picker
                      selectedValue={this.state.kondisi_rumah_lantai}
                      onValueChange={(itemValue) => {
                        this.setState({
                          kondisi_rumah_lantai: itemValue
                        })
                      }}>
                      <Picker.Item style={{ fontSize: 10 }} l label="Pilih"
                        value="" />
                      <Picker.Item label="Keramik" value="Keramik" />
                      <Picker.Item label="Ubin" value="Ubin" />
                      <Picker.Item label="Marmer" value="Marmer" />
                      <Picker.Item label="Kayu" value="Kayu" />
                      <Picker.Item label="Tanah" value="Tanah" />
                      <Picker.Item label="Lainya" value="" />
                    </Picker>
                  </View>
                </View>
                {this.state.kondisi_rumah_lantai === '' ?
                  <View style={style.form}>
                    <Text style={style.labelkiri}></Text>
                    <TextInput
                      style={style.labelkanan3}
                      onChangeText={konlantai => this.setState({ konlantai })}
                      value={this.state.konlantai}
                      keyboardType='default'
                      placeholder='Tuliskan'
                      placeholderTextColor='#7e7e7e'
                    />
                  </View>
                  : <View />}


                <View style={style.form}>
                  <Text style={style.labelkiri}>Dinding</Text>
                  <View style={style.labelkanan2}>
                    <Picker
                      selectedValue={this.state.kondisi_rumah_dinding}
                      onValueChange={(itemValue) => {
                        this.setState({
                          kondisi_rumah_dinding: itemValue
                        })
                      }}>
                      <Picker.Item style={{ fontSize: 10 }} label="Pilih"
                        value="" />
                      <Picker.Item label="Tembok" value="Tembok" />
                      <Picker.Item label="Kayu" value="Kayu" />
                      <Picker.Item label="Papan" value="Papan" />
                      <Picker.Item label="Geribik" value="Geribik" />
                      <Picker.Item label="Lainnya" value="" />
                    </Picker>

                  </View>
                </View>

                {this.state.kondisi_rumah_dinding === '' ?
                  <View style={style.form}>
                    <Text style={style.labelkiri}></Text>
                    <TextInput
                      style={style.labelkanan3}
                      onChangeText={kondinding => this.setState({ kondinding })}
                      value={this.state.kondinding}
                      keyboardType='default'
                      placeholder='Tuliskan'
                      placeholderTextColor='#7e7e7e'
                    />
                  </View>
                  : <View />}

                <View style={style.form}>
                  <Text style={style.labelkiri}>Kepemilikan Kendaraan</Text>
                  <TextInput
                    style={style.labelkanan3}
                    onChangeText={kepemilikan_kendaraan => this.setState({ kepemilikan_kendaraan })}
                    value={this.state.kepemilikan_kendaraan}
                    keyboardType='default'
                    placeholder={''}
                    placeholderTextColor='#7e7e7e'
                  />
                </View>
                <View style={style.form}>
                  <Text style={style.labelkiri}>Kepemilikan Eletronik</Text>
                  <TextInput
                    style={style.labelkanan3}
                    onChangeText={kepemilikan_elektronik => this.setState({ kepemilikan_elektronik })}
                    value={this.state.kepemilikan_elektronik}
                    keyboardType='default'
                    placeholder={''}
                    placeholderTextColor='#7e7e7e'
                  />
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 20 }}>
                  <TouchableOpacity onPress={() => { this.takePic() }} style={[style.kotak3, {
                    height: 220,
                    justifyContent: 'center', alignItems: 'center', backgroundColor: '#ffffff',
                    borderColor: '#E9E9E9',
                  }]}>
                    <Image source={this.state.foto} style={{ width: 150, height: 150 }} />
                    <Camera style={style.imgSmall} />
                    {this.state.foto === null ?
                      <View>

                      </View>
                      : <View><Text style={{ backgroundColor: '#00A9B8', borderRadius: 10, padding: 10, color: '#fff', marginTop: 10, }}>Masukan Foto</Text></View>}
                  </TouchableOpacity>
                </View>
                {/* <View style={{
                  zIndex: 0, width: '90%', paddingBottom: 40, paddingLeft: 30, paddingRight: 30,
                  justifyContent: 'center', alignItems: 'center'
                }}>
                  <TouchableOpacity onPress={() =>
                    Alert.alert(
                      'Info',
                      'Ambl foto menggunakan',
                      [
                        {
                          text: 'Kamera',
                          onPress: () =>
                            this.takePic(this.state.img1 === null ? 0 : this.state.img1 + 1),
                          style: 'cancel',
                        },
                      ],
                      { cancelable: true },
                    )
                  }
                  >
                    <View style={{ backgroundColor: '#00A9B8', borderRadius: 10, marginTop: 10, padding: 10 }}>
                      <Text style={{ color: '#fff', fontFamily: 'Poppins-Medium', fontSize: 13 }}>Ambil Foto</Text>
                    </View>
                  </TouchableOpacity>
                </View> */}

              </View>
              : <View />
            }
            {this.state.lihatkesehatan === true ?
              <View style={style.kotak}>
                <Text style={style.labelatas}>Kesehatan {this.state.kepemilikan_tanah}</Text>
                <View style={style.form}>
                  <Text style={style.labelkiri}>Sumber Air Besih</Text>
                  <View style={style.labelkanan2}>
                    <Picker
                      selectedValue={this.state.sumber_air_bersih}
                      onValueChange={(itemValue) => {
                        this.setState({
                          sumber_air_bersih: itemValue
                        })
                      }}>
                      <Picker.Item style={{ fontSize: 10 }} label="Pilih"
                        value="pilih" />
                      <Picker.Item label="Sumur" value="Sumur" />
                      <Picker.Item label="Sungai" value="Sungai" />
                      <Picker.Item label="PDAM" value="PDAM" />
                      <Picker.Item label="Lainnya" value="" />
                    </Picker>
                  </View>
                </View>
                {this.state.sumber_air_bersih === '' ?
                  <View style={style.form}>
                    <Text style={style.labelkiri}></Text>
                    <TextInput
                      style={style.labelkanan3}
                      onChangeText={sumberlain => this.setState({ sumberlain })}
                      value={this.state.sumberlain}
                      keyboardType='default'
                      placeholder='Tuliskan'
                      placeholderTextColor='#7e7e7e'
                    />
                  </View>
                  : <View />}
                <View style={style.form}>
                  <Text style={style.labelkiri}>Jamban dan Saluran Limbah</Text>
                  <View style={style.labelkanan2}>
                    <Picker
                      selectedValue={this.state.jamban_limbah}
                      onValueChange={(itemValue) => {
                        this.setState({
                          jamban_limbah: itemValue
                        })
                      }}>
                      <Picker.Item style={{ fontSize: 10 }} label="Pilih"
                        value="pilih" />
                      <Picker.Item label="Sungai" value="Sungai" />
                      <Picker.Item label="Septiktank" value="Septiktank" />
                      <Picker.Item label="Lainnya" value="" />
                    </Picker>
                  </View>
                </View>
                {this.state.jamban_limbah === '' ?
                  <View style={style.form}>
                    <Text style={style.labelkiri}></Text>
                    <TextInput
                      style={style.labelkanan3}
                      onChangeText={jamban => this.setState({ jamban })}
                      value={this.state.jamban}
                      keyboardType='default'
                      placeholder='Tuliskan'
                      placeholderTextColor='#7e7e7e'
                    />
                  </View>
                  : <View />}
                <View style={style.form}>
                  <Text style={style.labelkiri}>Tempat Pembuangan Sampah</Text>
                  <RadioForm
                    radio_props={TPS}
                    onPress={value => {
                      this.setState({ tempat_sampah: value })
                      ToastAndroid.show(value.toString(), ToastAndroid.SHORT);
                    }}
                    initial={this.state.tempat_sampah === 'TPS' ? 0 : this.state.tempat_sampah === 'Sungai' ? 1 : this.state.tempat_sampah === 'Pekarangan' ? 2 : 3}
                    animation={true}
                    buttonOuterSize={19}
                    buttonSize={10}
                    labelStyle={{ fontSize: 10, marginLeft: -5, paddingRight: 10 }}
                    formHorizontal={true}>
                  </RadioForm>
                </View>
                <View style={style.form}>
                  <Text style={style.labelkiri}>Terdapat Perokok</Text>
                  <RadioForm
                    radio_props={Pilihan}
                    onPress={value => {
                      this.setState({ perokok: value })
                      ToastAndroid.show(value.toString(), ToastAndroid.SHORT);
                    }}
                    initial={this.state.perokok === 'Ya' ? 0 : this.state.perokok === 'Tidak' ? 1 : 2}
                    animation={true}
                    buttonOuterSize={19}
                    buttonSize={10}
                    labelStyle={{ fontSize: 10, marginLeft: -5, paddingRight: 10 }}
                    formHorizontal={true}>
                  </RadioForm>
                </View>
                <View style={style.form}>
                  <Text style={style.labelkiri}>Terdapat Konsumen Miras</Text>
                  <RadioForm
                    radio_props={Pilihan}
                    onPress={value => {
                      this.setState({ konsumen_miras: value })
                      ToastAndroid.show(value.toString(), ToastAndroid.SHORT);
                    }}
                    initial={this.state.konsumen_miras === 'Ya' ? 0 : this.state.konsumen_miras === 'Tidak' ? 1 : 2}
                    animation={true}
                    buttonOuterSize={19}
                    buttonSize={10}
                    labelStyle={{ fontSize: 10, marginLeft: -5, paddingRight: 10 }}
                    formHorizontal={true}>
                  </RadioForm>
                </View>
                <View style={style.form}>
                  <Text style={style.labelkiri}>Terdapat Persediaan Obat P3K</Text>
                  <RadioForm
                    radio_props={Pilihan}
                    onPress={value => {
                      this.setState({ persediaan_p3k: value })
                      ToastAndroid.show(value.toString(), ToastAndroid.SHORT);
                    }}
                    initial={this.state.persediaan_p3k === 'Ya' ? 0 : this.state.persediaan_p3k === 'Tidak' ? 1 : 2}
                    animation={true}
                    buttonOuterSize={19}
                    buttonSize={10}
                    labelStyle={{ fontSize: 10, marginLeft: -5, paddingRight: 10 }}
                    formHorizontal={true}>
                  </RadioForm>
                </View>
                <View style={style.form}>
                  <Text style={style.labelkiri}>Makan Buah dan Sayur Setiap Hari</Text>
                  <RadioForm
                    radio_props={Pilihan}
                    onPress={value => {
                      this.setState({ makan_buah_sayur: value })
                      ToastAndroid.show(value.toString(), ToastAndroid.SHORT);
                    }}
                    initial={this.state.makan_buah_sayur === 'Ya' ? 0 : this.state.makan_buah_sayur === 'Tidak' ? 1 : 2}
                    animation={true}
                    buttonOuterSize={19}
                    buttonSize={10}
                    labelStyle={{ fontSize: 10, marginLeft: -5, paddingRight: 10 }}
                    formHorizontal={true}>
                  </RadioForm>
                </View>
              </View>
              : <View />
            }
            {this.state.lihatibadah === true ?
              <View style={style.kotak}>
                <Text style={style.labelatas}>Ibadah & Sosial</Text>
                <View style={style.form}>
                  <Text style={style.labelkiri}>Solat 5 Waktu</Text>
                  <RadioForm
                    radio_props={waktu}
                    onPress={value => {
                      this.setState({ solat_lima_waktu: value })
                      ToastAndroid.show(value.toString(), ToastAndroid.SHORT);
                    }}
                    initial={this.state.solat_lima_waktu === 'Lengkap' ? 0 : this.state.solat_lima_waktu === 'Kadang-kadang' ? 1 : this.state.solat_lima_waktu === 'Tidak Pernah' ? 2 : 3}
                    animation={true}
                    buttonOuterSize={19}
                    buttonSize={10}
                    labelStyle={{ fontSize: 10, marginLeft: -5, paddingRight: 10 }}
                    formHorizontal={true}>
                  </RadioForm>
                </View>
                <View style={style.form}>
                  <Text style={style.labelkiri}>Membaca Alquran</Text>
                  <RadioForm
                    radio_props={Alquran}
                    onPress={value => {
                      this.setState({ membaca_alquran: value })
                      ToastAndroid.show(value.toString(), ToastAndroid.SHORT);
                    }}
                    initial={this.state.membaca_alquran === 'Lancar' ? 0 : this.state.membaca_alquran === 'Terbata-bata' ? 1 : this.state.membaca_alquran === 'Tidak Bisa' ? 2 : 3}
                    animation={true}
                    buttonOuterSize={19}
                    buttonSize={10}
                    labelStyle={{ fontSize: 10, marginLeft: -5, paddingRight: 10 }}
                    formHorizontal={true}>
                  </RadioForm>
                </View>
                <View style={style.form}>
                  <Text style={style.labelkiri}>Majelis Taklim</Text>
                  <RadioForm
                    radio_props={majelis}
                    onPress={value => {
                      this.setState({ majelis_taklim: value })
                      ToastAndroid.show(value.toString(), ToastAndroid.SHORT);
                    }}
                    initial={this.state.majelis_taklim === 'Rutin' ? 0 : this.state.majelis_taklim === 'Jarang' ? 1 : this.state.majelis_taklim === 'Tidak Pernah' ? 2 : 3}
                    animation={true}
                    buttonOuterSize={19}
                    buttonSize={10}
                    labelStyle={{ fontSize: 10, marginLeft: -5, paddingRight: 10 }}
                    formHorizontal={true}>
                  </RadioForm>
                </View>
                <View style={style.form}>
                  <Text style={style.labelkiri}>Membaca Koran</Text>
                  <RadioForm
                    radio_props={koran}
                    onPress={value => {
                      this.setState({ membaca_koran: value })
                      ToastAndroid.show(value.toString(), ToastAndroid.SHORT);
                    }}
                    initial={this.state.membaca_koran === 'Selalu' ? 0 : this.state.membaca_koran === 'Jarang' ? 1 : this.state.membaca_koran === 'Tidak Pernah' ? 2 : 3}
                    animation={true}
                    buttonOuterSize={19}
                    buttonSize={10}
                    labelStyle={{ fontSize: 10, marginLeft: -5, paddingRight: 10 }}
                    formHorizontal={true}>
                  </RadioForm>
                </View>
                <View style={style.form}>
                  <Text style={style.labelkiri}>Pengurus Organisasi</Text>
                  <RadioForm
                    radio_props={Pilihan}
                    onPress={value => {
                      this.setState({ pengurus_organisasi: value })
                      ToastAndroid.show(value.toString(), ToastAndroid.SHORT);
                    }}
                    initial={this.state.pengurus_organisasi === 'Ya' ? 0 : this.state.pengurus_organisasi === 'Tidak' ? 1 : 2}
                    animation={true}
                    buttonOuterSize={19}
                    buttonSize={10}
                    labelStyle={{ fontSize: 10, marginLeft: -5, paddingRight: 10 }}
                    formHorizontal={true}>
                  </RadioForm>
                </View>
                {this.state.pengurus_organisasi === 'Ya' ?
                  <View style={[style.form, { marginBottom: 10 }]}>
                    <Text style={style.labelkiri}>Posisi di organisasi</Text>
                    <TextInput
                      style={style.labelkanan3}
                      onChangeText={pengurus_organisasi_sebagai => this.setState({ pengurus_organisasi_sebagai })}
                      value={this.state.pengurus_organisasi_sebagai}
                      keyboardType='default'
                      placeholder='Posisi Sebagai'
                      placeholderTextColor='#7e7e7e'
                    />
                  </View>
                  : <View />}
              </View>
              : <View />
            }
            {this.state.lihatlainya === true ?
              <View style={style.kotak}>
                <Text style={style.labelatas}>Lainya</Text>
                <View style={style.form}>
                  <Text style={style.labelkiri}>Status Anak</Text>
                  <RadioForm
                    radio_props={statusanak}
                    onPress={value => {
                      this.setState({ status_anak: value })
                      ToastAndroid.show(value.toString(), ToastAndroid.SHORT);
                    }}
                    initial={this.state.status_anak === 'Yatim' ? 0 : this.state.status_anak === 'Dhuafa' ? 1 : this.state.status_anak === 'Non Dhuafa' ? 2 : 3}
                    animation={true}
                    buttonOuterSize={19}
                    buttonSize={10}
                    labelStyle={{ fontSize: 10, marginLeft: -5, paddingRight: 10 }}
                    formHorizontal={true}>
                  </RadioForm>
                </View>
                <View style={style.form}>
                  <Text style={style.labelkiri}>Biaya Pendidikan Anak/bulan</Text>
                  <TextInput
                    style={style.labelkanan3}
                    onChangeText={biaya_pendidikan_perbulan => this.setState({ biaya_pendidikan_perbulan })}
                    value={this.state.biaya_pendidikan_perbulan.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                    keyboardType='numeric'
                    placeholder={'Rp.'.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                    placeholderTextColor='#7e7e7e'
                  />
                </View>
                <View style={style.form}>
                  <Text style={style.labelkiri}>Bantuan Rutin dari Lembaga Formal Lainnya</Text>
                  <RadioForm
                    radio_props={Pilihan}
                    onPress={value => {
                      this.setState({ bantuan_lembaga_formal_lain: value })
                      ToastAndroid.show(value.toString(), ToastAndroid.SHORT);
                    }}
                    initial={this.state.bantuan_lembaga_formal_lain === 'Ya' ? 0 : this.state.bantuan_lembaga_formal_lain === 'Tidak' ? 1 : 2}
                    animation={true}
                    buttonOuterSize={19}
                    buttonSize={10}
                    labelStyle={{ fontSize: 10, marginLeft: -5, paddingRight: 10 }}
                    formHorizontal={true}>
                  </RadioForm>
                </View>
                {this.state.bantuan_lembaga_formal_lain === 'Ya' ?
                  <View style={[style.form, { marginBottom: 10 }]}>
                    <Text style={style.labelkiri}>Bantuan dari Organisasi lain</Text>
                    <TextInput
                      style={style.labelkanan3}
                      onChangeText={bantuan_lembaga_formal_lain_sebesar => this.setState({ bantuan_lembaga_formal_lain_sebesar })}
                      value={this.state.bantuan_lembaga_formal_lain_sebesar}
                      keyboardType='default'
                      placeholder=''
                      placeholderTextColor='#7e7e7e'
                    />
                  </View>
                  : <View />}
              </View>
              : <View />
            }
            {this.state.lihathasil === true ?
              <View style={style.kotak}>
                <Text style={style.labelatas}>Data Survey</Text>
                <View style={style.form}>
                  <Text style={style.labelkiri}>Resume Diskripstif, Kondisi Calon Penerima Manfaat</Text>
                  <TextInput
                    style={style.labelkanan4}
                    onChangeText={kondisi_penerima_manfaat => this.setState({ kondisi_penerima_manfaat })}
                    value={this.state.kondisi_penerima_manfaat}
                    keyboardType='default'
                    placeholder={''}
                    placeholderTextColor='#7e7e7e'
                  />
                </View>
                <View style={style.form}>
                  <Text style={style.labelkiri}>Petugas Survey</Text>
                  <View style={style.form}>
                    <View style={style.labelkanan2}>
                      <Picker
                        selectedValue={this.state.petugas_survey}
                        onValueChange={(itemValue) => {
                          this.setState({
                            petugas_survey: itemValue
                          })
                        }}>
                        <Picker.Item
                          style={{ fontSize: 14, fontFamily: 'Poppins-Regular' }}
                          label="Pilih"
                          value=""
                          key={'0'}
                        />
                        {this.state.petugaslist.map((pet) => (
                          <Picker.Item style={{ fontSize: 14, fontFamily: 'Poppins-Regular' }} label={pet.nama_lengkap} value={pet.nama_lengkap} key={pet.nama_lengkap} />
                        ))}

                      </Picker>

                    </View>
                  </View>
                </View>
                {/* <View style={style.form}>
                  <Text style={style.labelkiri}>Hasil Survey</Text>

                  <TextInput
                    style={style.labelkanan4}
                    onChangeText={hasil_survey => this.setState({ hasil_survey })}
                    value={this.state.hasil_survey}
                    keyboardType='default'
                    placeholder={''}
                    placeholderTextColor='#7e7e7e'
                  />
                  <Text style={style.labelkanan}></Text>
                </View> */}
                {/* <View style={style.form}>
                  <Text style={style.labelkiri}>Keterangan Survey</Text>
                  <TextInput
                    style={style.labelkanan4}
                    multiline={true}
                    onChangeText={keterangan => this.setState({ keterangan })}
                    value={this.state.keterangan}
                    keyboardType='default'
                    editable={false}
                    placeholder={''}
                    placeholderTextColor='#7e7e7e'
                  />
                </View> */}
              </View>
              : <View />
            }
          </View>

        </ScrollView>
        {this.state.lihathasil === true ?
          <View style={{ flexDirection: 'row', justifyContent: 'center', alignContent: 'center', alignItems: 'center', alignSelf: 'center', marginTop: 20, }}>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('DataValidasi')} style={style.refresh} >
              <View style={{
                backgroundColor: '#0EBEDF', width: 100, height: 40, justifyContent: 'center', alignContent: 'center', alignItems: 'center', alignSelf: 'center', borderRadius: 10
              }}>
                <Text style={{ color: '#fff', textAlign: 'center', justifyContent: 'center', alignContent: 'center' }}>Kembali</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('')} style={style.refresh} >
              <View style={{
                backgroundColor: '#0EBEDF', width: 100, height: 40, justifyContent: 'center', alignContent: 'center', alignItems: 'center', alignSelf: 'center', borderRadius: 10
              }}>
                <Text style={{ color: '#fff', textAlign: 'center', justifyContent: 'center', alignContent: 'center' }}>Reset </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.state.petugas_survey === '' ? alert('Tolong kolom petugas survey di isi')
              : this.state.kondisi_penerima_manfaat === '' ? alert('Tolong kolom Kondisi Calon Penerima Manfaat di isi')
                : this.SimpanData()} style={style.refresh} >
              <View style={{
                backgroundColor: '#0EBEDF', width: 100, height: 40, justifyContent: 'center', alignContent: 'center', alignItems: 'center', alignSelf: 'center', borderRadius: 10
              }}>
                <Text style={{ color: '#fff', textAlign: 'center', justifyContent: 'center', alignContent: 'center' }}>Simpan</Text>
              </View>
            </TouchableOpacity>
          </View>
          : <View />}

      </View>
    )
  }
}


export default tambah
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
    backgroundColor: '#fff',
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
    width: windowWidth - 40,
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
    marginBottom: 10,
    alignSelf: 'center',
    padding: 5
  },
  imgSmall: {
    position: 'absolute', flex: 1, alignItems: 'center', justifyContent: 'center'
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
})