import {
  Alert,
  Dimensions,
  Modal,
  TouchableOpacity,
  ScrollView,
  ToastAndroid,
  FlatList,
  SafeAreaView,
  Image,
  Text,
  View,
  TextInput,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import React, { Component } from 'react';
import * as ImagePicker from 'react-native-image-picker';
import CheckBox from '@react-native-community/checkbox';
import { connect } from 'react-redux';
import {
  akun,
  test,
  Union,
  background1,
  juara,
  IconTamKelompok,
} from '../../assets/images';
import {
  Rapot,
  Sekolah,
  Tgl,
  Jenis,
  Cerita,
  Prestasiin,
  Profil1,
  Locations,
  CeritaH,
  Surat,
  RiwayatH,
  PrestasiH,
} from '../../assets/icons';
import { Picker } from '@react-native-picker/picker';
import Swiper from 'react-native-swiper';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import BottomSheet from 'react-native-bottomsheet-reanimated';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';

const Screen = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height,
};
const snapPoints = [0, Screen.height / 2, '70%', '100%'];
const snapPoints2 = [0, Screen.height / 2, '70%', '85%'];

class Detail1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gambar: '',
      img: {
        0: {
          image: {
            name: '',
            type: '',
            uri: 'https://static.thenounproject.com/png/187803-200.png',
          },
        },
      },
      imgp: {
        0: {
          image: {
            name: '',
            type: '',
            uri: 'https://static.thenounproject.com/png/187803-200.png',
          },
        },
      },
      foto: {
        name: '',
        type: '',
        uri:
          'https://kilauindonesia.org/datakilau/gambarUpload/' +
          this.props.route.params.item.foto,
        id: 0,
      },
      img1: null,
      img2: 0,
      img3: null,
      img4: 0,
      count: 1,
      Camera: '',
      nama: '',
      anak: [],
      search: [],
      // anak: this.props.route.params.item.detak,
      modaldetail: 'false',
      modalhistori: 'false',
      collapse: 'false',
      index: -1,
      modalTamAK: false,
      modalTamPel: false,
      pel: '',
      myd: '',
      materi: [],
      check: false,
      reguler: false,
      quran: false,
      modalpembayaran: false,
      count: 0,
      harga: 0,
      orang: '',
      bayar: '',
      det: [],
      detailanak: '',
      detail: this.props.route.params.item,
      detak: [],
      latitude: 0,
      longitude: 0,
      lat: 0,
      long: 0,
      modalpilih: false,
      status_validasi: 'non-aktif',
    };
  }

  editData() {
    {
      let simpandata = {
        status_validasi: this.state.status_validasi,
      };
      let data = new FormData();
      for (let key in simpandata) {
        data.append(key, simpandata[key]);
      }
      fetch(
        'https://kilauindonesia.org/datakilau/api/ubahstatanak/' +
        this.state.detail.id_anak,
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
          },
          body: data,
        },
      )
        .then(res => res.json())
        .then(resJson => {
          console.log(resJson);
          if (resJson.status === 'sukses') {
            ToastAndroid.show('Data berhasil ditambah!', ToastAndroid.SHORT);
          } else {
            alert(`Data gagal disimpan !!!`);
          }
        })
        .catch(err => console.log('dari catch send Data ===', err));
    }
  }
  Hapusdata() {
    {
      fetch(
        'https://kilauindonesia.org/datakilau/api/penhapusanak/' +
        this.state.detail.id_anak,
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
          },
        },
      )
        .then(res => res.json())
        .then(resJson => {
          console.log(resJson);
          if (resJson.status === 'sukses') {
            ToastAndroid.show('Data berhasil dihapus!', ToastAndroid.SHORT);
          } else {
            alert(`Data gagal disimpan !!!`);
          }
        })
        .catch(err => console.log('dari catch send Data ===', err));
    }
  }
  kooranak = () => {
    var koor = kooranak(
      { latitude: this.state.latitude, longitude: this.state.longitude },
      { latitude: this.state.lat, longitude: this.state.long },
    );
    if ((getPreciseDistance.latitude, (getPreciseDistance.longitude = koor))) {
      this.props.navigation.navigate('maps', {
        latitude: this.state.latitude,
        longitude: this.state.longitude,
        anak: this.state.id_anak,
      });
    } else {
      alert(this.state.id_anak + `, Belum Memasukan Koordinat!`);
    }
  };
  renderMarker() {
    const { latitude, longitude } = map;
    return (
      <Marker
        coordinate={{
          latitude: parseFloat(latitude),
          longitude: parseFloat(longitude),
        }}>
        <View>
          <Image source={require('../../assets/images/IconMarker.png')} />
        </View>
      </Marker>
    );
  }
  GetDetAPi() {
    fetch(
      'https://kilauindonesia.org/datakilau/api/detailanakdetail/' +
      this.state.detail,
    )
      .then(res => {
        if (res.status === 200) return res.json();
      })
      .then(resdata => {
        console.log(resdata.data);
        this.setState({
          det: resdata.data,
        });
      });
  }
  componentDidMount() {
    this.GetDetAPi(), console.log(this.state.det);
  }
  takePic(index) {
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
        response => {
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
              },
              //   id: 0,
            };
            console.log('ini gambar = ', source);
            this.setState(
              prevState => {
                prevState.taimage[index] = source;
                //   prevState.tgl_lahir[index] != this.props.route.params.tgl_lahir[index] ? this.setState({tglmbuh : true}) : this.setState({tglmbuh : false});
                return {
                  taimage: prevState.taimage,
                };
              },
              () => console.log(this.state.taimage),
            );
            this.setState({
              totol: index,
              tot: index,
            });
            console.log('ini gambar = ', this.state.taimage);
          }
        },
      );
    }
  }
  takePicAK(index) {
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
        response => {
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
              },
              //   id: 0,
            };
            console.log('ini gambar = ', source);
            this.setState(
              prevState => {
                prevState.img[index] = source;
                //   prevState.tgl_lahir[index] != this.props.route.params.tgl_lahir[index] ? this.setState({tglmbuh : true}) : this.setState({tglmbuh : false});
                return {
                  img: prevState.img,
                };
              },
              () => console.log(this.state.img),
            );
            this.setState({
              img1: index,
              img2: index,
            });
            console.log('ini gambar = ', this.state.img);
          }
        },
      );
    }
  }
  takePicPel(index) {
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
        response => {
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
              },
              //   id: 0,
            };
            console.log('ini gambar = ', source);
            this.setState(
              prevState => {
                prevState.imgp[index] = source;
                //   prevState.tgl_lahir[index] != this.props.route.params.tgl_lahir[index] ? this.setState({tglmbuh : true}) : this.setState({tglmbuh : false});
                return {
                  imgp: prevState.imgp,
                };
              },
              () => console.log(this.state.img),
            );
            this.setState({
              img3: index,
              img4: index,
            });
            console.log('ini gambar = ', this.state.img);
          }
        },
      );
    }
  }

  componentDidMount() {
    // this.getmateriAPi();
    // this.GetDetAPi(),
    // BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    // Firebase.initializeApp(this);
    // this.requestCameraPermission();
    console.log(this.state.detail);
  }
  componentWillUnmount() {
    this.mounted = false;
    // BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }
  filterList(array, status) {
    this.setState({
      list: this.state.list.filter(i => i.toLowerCase().includes(list)),
    });
    // return array.filter(item => item.Status === status);
    // return list.filter(listItem =>th listItem.toString().toLowerCase().includes(this.state.search.toString().toLowerCase()));
  }
  _onLongPressButton() {
    alert('You long-pressed the button!');
  }
  // delete = (index) => {
  //   anak.splice(index, 1);
  //   this.setState({});
  // }
  histori(show) {
    this.setState({ modalhistori: show });
  }
  displayModal(show) {
    this.setState({ modaldetail: show });
  }
  togleTamAK(show) {
    this.setState({ modalTamAK: show });
  }
  togleTamPel(show) {
    this.setState({ modalTamPel: show });
  }
  detail = () => { };
  onOpenBottomSheetHandler = index => {
    this.refs.BottomSheet.snapTo(index);
  };
  onOpenBottomSheet = index => {
    this.refs.BottomSheet2.snapTo(index);
  };
  render() {
    const detak = this.state.detak;
    const tokyoRegion = {
      latitude: 35.6762,
      longitude: 139.6503,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    };
    const inputbutton = [];
    const detail = this.state.detail;
    const { count } = this.state;
    const { harga } = this.state;

    for (let i = 0; i < this.state.count; i++) {
      inputbutton.push(
        <>
          <View key={i}>
            <View
              style={{ height: 7, backgroundColor: '#696969', marginTop: 10 }}
            />
            <Text>{i + 1}.</Text>
            <Text style={style.Label}>Nama</Text>
            <TextInput
              style={style.kotak2}
              onChangeText={text => this.setState({ text })}
              value={this.state.orang[i]}
              placeholder="Nama"
            />
          </View>
        </>,
      );
    }
    var img = [];
    for (let i = 0; i <= this.state.img2; i++) {
      img.push(
        <Image
          style={{ width: 200, height: 200, resizeMode: 'contain' }}
          source={this.state.img[i].image}
        />,
      );
    }

    var imgpel = [];
    for (let i = 0; i <= this.state.img4; i++) {
      imgpel.push(
        <Image
          style={{ width: 200, height: 200, resizeMode: 'contain' }}
          source={this.state.imgp[i].image}
        />,
      );
    }

    return (
      <View>
        {this.props.user.presensi === 'karyawan' ? ( //donatur dan tutor//
          <View>
            <ImageBackground
              source={background1}
              style={{ width: '100%', height: 200 }}></ImageBackground>
            <View style={[style.kolomkecil, { height: '23%' }]}>
              <Image
                source={test}
                style={{
                  width: 150,
                  height: 150,
                  borderRadius: 70,
                  justifyContent: 'center',
                  alignSelf: 'center',
                  marginTop: -110,
                  position: 'absolute',
                }}></Image>
              <View
                style={{
                  justifyContent: 'center',
                  textAlign: 'center',
                  alignItems: 'center',
                  alignContent: 'center',
                  alignSelf: 'center',
                  marginTop: 50,
                }}>
                <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold' }}>
                  {detail.full_name}
                </Text>
                <View
                  style={{
                    flexDirection: 'column',
                    justifyContent: 'center',
                    textAlign: 'center',
                    alignItems: 'center',
                    alignContent: 'center',
                    alignSelf: 'center',
                  }}>
                  <View style={{ flexDirection: 'row' }}>
                    <Locations />
                    <Text style={style.labeldlm}>{detail.nama_shelter}</Text>
                  </View>
                </View>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  marginTop: 15,
                  padding: 5,
                  height: 170,
                }}>
                <View
                  style={{
                    flexDirection: 'column',
                    marginLeft: 20,
                    marginTop: 0,
                  }}>
                  <Jenis style={{ marginLeft: 20 }} />
                  <Text style={{ marginTop: 2, color: '#fff', fontSize: 10 }}>
                    {detail.jenis_anak_binaan}
                  </Text>
                </View>
                <View
                  style={{
                    marginTop: -10,
                    width: 1,
                    height: '40%',
                    backgroundColor: '#EBEAEA',
                  }}
                />

                <View style={{ flexDirection: 'column', marginTop: -2 }}>
                  <Tgl style={{ marginLeft: 15 }} />
                  <Text style={{ color: '#fff', fontSize: 10 }}>
                    {detail.tanggal_lahir}
                  </Text>
                </View>
                <View
                  style={{
                    marginTop: -10,
                    width: 1,
                    height: '40%',
                    backgroundColor: '#EBEAEA',
                  }}
                />

                <View
                  style={{
                    flexDirection: 'column',
                    marginRight: 20,
                    marginTop: 0,
                  }}>
                  <Sekolah style={{ marginLeft: 5 }} />
                  <Text style={{ marginLeft: 3, color: '#fff', fontSize: 10 }}>
                    {detail.tingkat}
                  </Text>
                </View>
              </View>
            </View>

            <View
              style={{
                justifyContent: 'center',
                alignContent: 'center',
                alignItems: 'center',
                alignSelf: 'center',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  alignSelf: 'center',
                  marginTop: 20,
                }}>
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate('Tamrap', {
                      id_anak: this.props.route.params.id_anak,
                    })
                  }>
                  <View style={style.kotakbaru3}>
                    <Rapot style={style.icon} />
                    <Text style={style.Labelbawah}>Raport</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate('Presensi', {
                      id_anak: this.props.route.params.id_anak,
                    })
                  }>
                  <View style={style.kotakbaru3}>
                    <PrestasiH style={style.icon} />
                    <Text style={style.Labelbawah}>Prestasi</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate('SuratAB', {
                      id_anak: this.props.route.params.id_anak,
                    })
                  }>
                  <View style={style.kotakbaru3}>
                    <Surat style={style.icon} />
                    <Text style={style.Labelbawah}>Surat</Text>
                  </View>
                </TouchableOpacity>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  alignItems: 'center',
                  alignSelf: 'center',
                }}>
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate('Histori', {
                      id_anak: this.props.route.params.id_anak,
                    })
                  }>
                  <View style={style.kotakbaru3}>
                    <RiwayatH style={style.icon} />
                    <Text style={style.Labelbawah}>Riwayat</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => this.onOpenBottomSheetHandler(1)}>
                  <View style={style.kotakbaru3}>
                    <CeritaH style={style.icon} />
                    <Text style={style.Labelbawah}>Cerita</Text>
                  </View>
                </TouchableOpacity>
                {/* onPress={() => this.props.navigation.navigate('Identitas', { detail: this.props.route.params.item })} */}
                <TouchableOpacity onPress={() => this.onOpenBottomSheet(1)}>
                  <View style={style.kotakbaru3}>
                    <Profil1 style={style.icon} />
                    <Text style={style.Labelbawah}>Detail</Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  alignItems: 'center',
                  alignSelf: 'center',
                }}>
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate('Nilai', {
                      id_anak: this.props.route.params.id_anak,
                    })
                  }>
                  <View style={style.kotakbaru3}>
                    <CeritaH style={style.icon} />
                    <Text style={style.Labelbawah}>Nilai Anak</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate('Rapshelter', {
                      id_anak: this.props.route.params.id_anak,
                      id_anak: this.props.route.params.id_anak,
                    })
                  }>
                  <View style={style.kotakbaru3}>
                    <Rapot style={style.icon} />
                    <Text style={style.Labelbawah}>Raport Shelter</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            <BottomSheet
              bottomSheerColor="#FFFFFF"
              // backDropColor="red"
              ref="BottomSheet"
              initialPosition={'-10%'}
              snapPoints={snapPoints}
              isBackDrop={true}
              isBackDropDismissByPress={true}
              isRoundBorderWithTipHeader={true}
              // overDrag={false}
              // keyboardAware
              // isModal
              // containerStyle={{backgroundColor:"red"}}
              // tipStyle={{backgroundColor:"red"}}
              // headerStyle={{backgroundColor:"red"}}
              // bodyStyle={{backgroundColor:"red",flex:1}}
              header={
                <View>
                  <Text
                    style={{
                      color: '#000',
                      fontSize: 18,
                      fontFamily: 'Poppins-SemiBold',
                      marginTop: '2%',
                    }}>
                    Cerita
                  </Text>
                </View>
              }
              body={
                <View style={{ paddingHorizontal: 20, width: '100%' }}>
                  <View>
                    <Text
                      style={{
                        color: '#000',
                        fontSize: 14,
                        fontFamily: 'Poppins-Regular',
                        textAlign: 'justify',
                      }}>
                      Gugun (13), seorang anak kecil dari pasangan Jujun Suhanda
                      dan Dede Rosmiati ini tinggal di sebuah rumah yang
                      sederhana di daerah Pamarisen, Kabupaten Sumedang, Jawa
                      Barat, dan kondisi yang ia alami sangatlah memprihatinkan.
                      {'\n'}
                      {'\n'}
                      Pasalnya, sudah sejak kecil ia beserta kakak dan adiknya
                      hidup dengan serba kekurangan dikarenakan faktor ekonomi
                      dari keluarganya. kalian bayangkan saja, mereka untuk
                      memenuhi kebutuhan hidupnya hanya mengandalkan pendapatan
                      yang diterima oleh ayahnya dan pendapatan yang diterimanya
                      pun hanya cukup untuk memenuhi kebutuhan pokoknya saja.
                      {'\n'}
                      {'\n'}
                      Oleh sebab itu, dengan segala keterbatasan yang ia miliki
                      serta alami membuat dirinya menjadi cemas akan bagaimana
                      nasib pendidikannya nanti. Namun, dibalik rasa kecemasan
                      yang ia rasakan, tidak membuat dirinya menjadi minder
                      ataupun malu terhadap teman-teman sebayanya ketika sedang
                      berkumpul. Selain itu, ia bahkan masih memiliki semangat
                      dan bertekad untuk terus rajin belajar agar kelak nantinya
                      ia bisa merubah kondisi kehidupan keluarganya menjadi
                      lebih baik. Untuk itu, yuk jangan biarkan kondisi Gugun
                      terus menerus seperti ini dan berikan bantuan terbaik yang
                      kita miliki agar apa yang ia impikan bisa terwujud. Terima
                      kasih sahabat.
                    </Text>
                  </View>
                </View>
              }
            />
            <BottomSheet
              bottomSheerColor="#FFFFFF"
              // backDropColor="red"
              ref="BottomSheet2"
              initialPosition={'0%'}
              snapPoints={snapPoints2}
              isBackDrop={true}
              isBackDropDismissByPress={true}
              isRoundBorderWithTipHeader={true}
              // overDrag={false}
              // keyboardAware
              // isModal
              // containerStyle={{backgroundColor:"red"}}
              // tipStyle={{backgroundColor:"red"}}
              // headerStyle={{backgroundColor:"red"}}
              // bodyStyle={{backgroundColor:"red",flex:1}}
              header={
                <View>
                  <Text
                    style={{
                      color: '#000',
                      fontSize: 18,
                      fontFamily: 'Poppins-SemiBold',
                      marginTop: '2%',
                    }}>
                    Identitas
                  </Text>
                </View>
              }
              body={
                <View style={{ paddingHorizontal: 20, width: '100%' }}>
                  <View style={{ flexDirection: 'column', marginTop: 10 }}>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: 'bold',
                        marginLeft: 20,
                      }}>
                      Identitas Anak
                    </Text>
                    <View style={{ justifyContent: 'center' }}>
                      <View style={style.form}>
                        <Text style={style.labelkiri}>Nama</Text>
                        <Text style={style.labelkanan}>
                          :{detail.full_name}
                        </Text>
                      </View>
                      <View style={style.form}>
                        <Text style={style.labelkiri}>
                          Tempat, Tanggal Lahir
                        </Text>
                        <Text style={style.labelkanan}>
                          :{detail.tempat_lahir} {detail.tanggal_lahir}
                        </Text>
                      </View>
                      <View style={style.form}>
                        <Text style={style.labelkiri}>Jenis Kelamin</Text>
                        <Text style={style.labelkanan}>
                          :{detail.jenis_kelamin}
                        </Text>
                      </View>
                      <View style={style.form}>
                        <Text style={style.labelkiri}>Hobi</Text>
                        <Text style={style.labelkanan}>:{detail.hobi}</Text>
                      </View>
                    </View>
                    <View
                      style={{
                        marginLeft: 10,
                        width: '90%',
                        height: 1,
                        backgroundColor: '#EBEAEA',
                        marginTop: 10,
                      }}
                    />
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: 'bold',
                        marginLeft: 20,
                      }}>
                      Detail Anak
                    </Text>

                    <View style={{ justifyContent: 'center' }}>
                      <View style={style.form}>
                        <Text style={style.labelkiri}>Anak ke</Text>
                        <Text style={style.labelkanan}>:{detail.anak_ke}</Text>
                      </View>
                      <View style={style.form}>
                        <Text style={style.labelkiri}>Tinggal Bersama</Text>
                        <Text style={style.labelkanan}>
                          :{detail.tinggal_bersama}
                        </Text>
                      </View>
                      <View style={style.form}>
                        <Text style={style.labelkiri}>
                          Jarak rumah ke sheleter
                        </Text>
                        <Text style={style.labelkanan}>
                          :{detail.jarak_rumah}KM
                        </Text>
                      </View>
                      <View style={style.form}>
                        <Text style={style.labelkiri}>Transportasi</Text>
                        <Text style={style.labelkanan}>
                          :{detail.transportasi}
                        </Text>
                      </View>

                      <View
                        style={{
                          marginLeft: 10,
                          width: '90%',
                          height: 1,
                          backgroundColor: '#EBEAEA',
                          marginTop: 10,
                        }}
                      />
                      <Text
                        style={{
                          fontSize: 16,
                          fontWeight: 'bold',
                          marginLeft: 20,
                        }}>
                        Detail Pendidikan
                      </Text>
                      {(detail.jenjang === 'Belum Sekolah') |
                        (detail.jenjang === '') |
                        (detail.jenjang === 'null') |
                        (detail.jenjang === null) ? (
                        <View style={style.form}>
                          <Text style={style.labelkiri}>Belum Sekolah</Text>
                        </View>
                      ) : (
                        <View style={{ justifyContent: 'center' }}>
                          <View style={style.form}>
                            <Text style={style.labelkiri}>Nama Sekolah</Text>
                            <Text style={style.labelkanan}>
                              :{detail.nama_sekolah}
                            </Text>
                          </View>
                          <View style={style.form}>
                            <Text style={style.labelkiri}>Kelas</Text>
                            <Text style={style.labelkanan}>
                              :{detail.kelas}
                            </Text>
                          </View>
                          <View style={style.form}>
                            <Text style={style.labelkiri}>Alamat Sekolah</Text>
                            <Text style={style.labelkanan}>
                              :{detail.alamat_sekolah}
                            </Text>
                          </View>
                        </View>
                      )}

                      <View style={style.coltom1}>
                        <TouchableOpacity
                          onPress={() =>
                            this.props.navigation.navigate('maps', {
                              det: this.props.route.params.item,
                            })
                          }>
                          <Text style={{ textAlign: 'center', color: '#fff' }}>
                            Lihat Koordinat Anak
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>
              }
            />
          </View>
        ) : (
          <View />
        )}
        {this.props.user.presensi === '' ? ( // ini untuk tampilan pengelola  //
          <View>
            <ImageBackground
              source={background1}
              style={{ width: '100%', height: 130 }}></ImageBackground>

            <View style={[style.kolomkecil, { height: '24%', }]}>
              <Image
                source={
                  {
                    uri:
                      'https://kilauindonesia.org/datakilau/gambarUpload/' +
                      detail.foto,
                  }

                  // test

                }
                style={{
                  width: 150,
                  height: 150,
                  borderRadius: 70,
                  justifyContent: 'center',
                  alignSelf: 'center',
                  marginTop: -110,
                  position: 'absolute',
                }}></Image>
              <View
                style={{
                  justifyContent: 'center',
                  textAlign: 'center',
                  alignItems: 'center',
                  alignContent: 'center',
                  alignSelf: 'center',
                  marginTop: 50,
                }}>
                <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold' }}>
                  {detail.full_name}
                </Text>
                <View
                  style={{
                    flexDirection: 'column',
                    justifyContent: 'center',
                    textAlign: 'center',
                    alignItems: 'center',
                    alignContent: 'center',
                    alignSelf: 'center',
                  }}>
                  <View style={{ flexDirection: 'row' }}>
                    <Locations />
                    <Text style={style.labeldlm}>{detail.tempat_lahir}</Text>
                  </View>
                </View>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  marginTop: 15,
                  padding: 5,
                  height: 170,
                }}>
                <View
                  style={{
                    flexDirection: 'column',
                    marginLeft: 20,
                    marginTop: 0,
                  }}>
                  <Jenis style={{ marginLeft: 20 }} />
                  <Text style={{ marginTop: 2, color: '#fff', fontSize: 10 }}>
                    {detail.jenis_kelamin}
                  </Text>
                </View>
                <View
                  style={{
                    marginTop: -10,
                    width: 1,
                    height: '40%',
                    backgroundColor: '#EBEAEA',
                  }}
                />

                <View style={{ flexDirection: 'column', marginTop: 0 }}>
                  <Tgl style={{ marginLeft: 15 }} />
                  <Text style={{ color: '#fff', fontSize: 10 }}>
                    {detail.tanggal_lahir}
                  </Text>
                </View>
                <View
                  style={{
                    marginTop: -10,
                    width: 1,
                    height: '40%',
                    backgroundColor: '#EBEAEA',
                  }}
                />

                <View
                  style={{
                    flexDirection: 'column',
                    marginRight: 20,
                    marginTop: 0,
                  }}>
                  <Sekolah style={{ marginLeft: 0 }} />
                  <Text style={{ marginLeft: 5, color: '#fff', fontSize: 10 }}>
                    {detail.jenjang}
                  </Text>
                </View>
              </View>
            </View>

            <View style={{ backgroundColor: '#FFF' }}>
              <View

                style={{
                  justifyContent: 'center',
                  alignContent: 'center',
                  alignItems: 'center',
                  alignSelf: 'center',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    alignSelf: 'center',
                    marginTop: 20,
                  }}>
                  <TouchableOpacity
                    onPress={() =>
                      this.props.navigation.navigate('Tamrap', {
                        id_anak: this.props.route.params.id_anak,
                      })
                    }>
                    <View style={style.kotakbaru3}>
                      <Rapot style={style.icon} />
                      <Text style={style.Labelbawah}>Raport</Text>
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() =>
                      this.props.navigation.navigate('Presensi', {
                        id_anak: this.props.route.params.id_anak,
                      })
                    }>
                    <View style={style.kotakbaru3}>
                      <PrestasiH style={style.icon} />
                      <Text style={style.Labelbawah}>Prestasi</Text>
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() =>
                      this.props.navigation.navigate('SuratAB', {
                        id_anak: this.props.route.params.id_anak,
                      })
                    }>
                    <View style={style.kotakbaru3}>
                      <Surat style={style.icon} />
                      <Text style={style.Labelbawah}>Surat</Text>
                    </View>
                  </TouchableOpacity>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                    alignSelf: 'center',
                  }}>
                  <TouchableOpacity
                    onPress={() =>
                      this.props.navigation.navigate('Histori', {
                        id_anak: this.props.route.params.id_anak,
                      })
                    }>
                    <View style={style.kotakbaru3}>
                      <RiwayatH style={style.icon} />
                      <Text style={style.Labelbawah}>Riwayat</Text>
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => this.onOpenBottomSheetHandler(1)}>
                    <View style={style.kotakbaru3}>
                      <CeritaH style={style.icon} />
                      <Text style={style.Labelbawah}>Cerita</Text>
                    </View>
                  </TouchableOpacity>
                  {/* onPress={() => this.props.navigation.navigate('Identitas', { detail: this.props.route.params.item })} */}
                  <TouchableOpacity onPress={() => this.onOpenBottomSheet(1)}>
                    <View style={style.kotakbaru3}>
                      <Profil1 style={style.icon} />
                      <Text style={style.Labelbawah}>Detail</Text>
                    </View>
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                    alignSelf: 'center',
                  }}>
                  <TouchableOpacity
                    onPress={() =>
                      this.props.navigation.navigate('Nilai', {
                        id_anak: this.props.route.params.id_anak,
                      })
                    }>
                    <View style={style.kotakbaru3}>
                      <CeritaH style={style.icon} />
                      <Text style={style.Labelbawah}>Nilai Anak</Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() =>
                      this.props.navigation.navigate('Rapshelter', {
                        id_anak: this.props.route.params.id_anak,
                        item: this.props.route.params.item,
                      })
                    }>
                    <View style={style.kotakbaru3}>
                      <Rapot style={style.icon} />
                      <Text style={style.Labelbawah}>Raport Shelter </Text>
                    </View>
                  </TouchableOpacity>
                  {/* onPress={() => this.props.navigation.navigate('Identitas', { detail: this.props.route.params.item })} */}
                </View>
              </View>

              <View
                style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                <TouchableOpacity
                  style={style.btnSimpan}
                  onPress={() =>
                    this.setState({ modalpilih: true, detak: detail })
                  }>
                  <Text
                    style={{
                      color: '#fff',
                      fontFamily: 'Poppins-Medium',
                      fontSize: 15,
                    }}>
                    Pengaturan
                  </Text>
                </TouchableOpacity>
              </View>
            </View>


            <BottomSheet
              bottomSheerColor="#FFFFFF"
              // backDropColor="red"
              ref="BottomSheet"
              initialPosition={'0%'}
              snapPoints={snapPoints}
              isBackDrop={true}
              isBackDropDismissByPress={true}
              isRoundBorderWithTipHeader={true}
              // overDrag={false}
              // keyboardAware
              // isModal
              // containerStyle={{backgroundColor:"red"}}
              // tipStyle={{backgroundColor:"red"}}
              // headerStyle={{backgroundColor:"red"}}
              // bodyStyle={{backgroundColor:"red",flex:1}}
              header={
                <View>
                  <Text
                    style={{
                      color: '#000',
                      fontSize: 18,
                      fontFamily: 'Poppins-SemiBold',
                      marginTop: '2%',
                    }}>
                    Cerita
                  </Text>
                </View>
              }
              body={
                <View style={{ paddingHorizontal: 20, width: '100%' }}>
                  <View>
                    <Text
                      style={{
                        color: '#000',
                        fontSize: 14,
                        fontFamily: 'Poppins-Regular',
                        textAlign: 'justify',
                      }}>
                      Gugun (13), seorang anak kecil dari pasangan Jujun Suhanda
                      dan Dede Rosmiati ini tinggal di sebuah rumah yang
                      sederhana di daerah Pamarisen, Kabupaten Sumedang, Jawa
                      Barat, dan kondisi yang ia alami sangatlah memprihatinkan.
                      {'\n'}
                      {'\n'}
                      Pasalnya, sudah sejak kecil ia beserta kakak dan adiknya
                      hidup dengan serba kekurangan dikarenakan faktor ekonomi
                      dari keluarganya. kalian bayangkan saja, mereka untuk
                      memenuhi kebutuhan hidupnya hanya mengandalkan pendapatan
                      yang diterima oleh ayahnya dan pendapatan yang diterimanya
                      pun hanya cukup untuk memenuhi kebutuhan pokoknya saja.
                      {'\n'}
                      {'\n'}
                      Oleh sebab itu, dengan segala keterbatasan yang ia miliki
                      serta alami membuat dirinya menjadi cemas akan bagaimana
                      nasib pendidikannya nanti. Namun, dibalik rasa kecemasan
                      yang ia rasakan, tidak membuat dirinya menjadi minder
                      ataupun malu terhadap teman-teman sebayanya ketika sedang
                      berkumpul. Selain itu, ia bahkan masih memiliki semangat
                      dan bertekad untuk terus rajin belajar agar kelak nantinya
                      ia bisa merubah kondisi kehidupan keluarganya menjadi
                      lebih baik. Untuk itu, yuk jangan biarkan kondisi Gugun
                      terus menerus seperti ini dan berikan bantuan terbaik yang
                      kita miliki agar apa yang ia impikan bisa terwujud. Terima
                      kasih sahabat.
                    </Text>
                  </View>
                </View>
              }
            />
            <BottomSheet
              bottomSheerColor="#FFFFFF"
              // backDropColor="red"
              ref="BottomSheet2"
              initialPosition={'0%'}
              snapPoints={snapPoints2}
              isBackDrop={true}
              isBackDropDismissByPress={true}
              isRoundBorderWithTipHeader={true}
              // overDrag={false}
              // keyboardAware
              // isModal
              // containerStyle={{backgroundColor:"red"}}
              // tipStyle={{backgroundColor:"red"}}
              // headerStyle={{backgroundColor:"red"}}
              // bodyStyle={{backgroundColor:"red",flex:1}}
              header={
                <View>
                  <Text
                    style={{
                      color: '#000',
                      fontSize: 18,
                      fontFamily: 'Poppins-SemiBold',
                      marginTop: '2%',
                    }}>
                    Identitas
                  </Text>
                </View>
              }
              body={
                <View style={{ paddingHorizontal: 20, width: '100%' }}>
                  <View style={{ flexDirection: 'column', marginTop: 10 }}>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: 'bold',
                        marginLeft: 20,
                      }}>
                      Identitas Anak
                    </Text>
                    <View style={{ justifyContent: 'center' }}>
                      <View style={style.form}>
                        <Text style={style.labelkiri}>Nama</Text>
                        <Text style={style.labelkanan}>
                          :{detail.full_name}
                        </Text>
                      </View>
                      <View style={style.form}>
                        <Text style={style.labelkiri}>
                          Tempat, Tanggal Lahir
                        </Text>
                        <Text style={style.labelkanan}>
                          :{detail.tempat_lahir} {detail.tanggal_lahir}
                        </Text>
                      </View>
                      <View style={style.form}>
                        <Text style={style.labelkiri}>Jenis Kelamin</Text>
                        <Text style={style.labelkanan}>
                          :{detail.jenis_kelamin}
                        </Text>
                      </View>
                      {detail.hobi === '' || detail.hobi === null ?
                        <View style={style.form}>
                          <Text style={style.labelkiri}>Hobi</Text>
                          <Text style={style.labelkanan}>:Belum Memasukan Hobi</Text>
                        </View> :
                        <View style={style.form}>
                          <Text style={style.labelkiri}>Hobi</Text>
                          <Text style={style.labelkanan}>:{detail.hobi}</Text>
                        </View>
                      }
                    </View>
                    <View
                      style={{
                        marginLeft: 10,
                        width: '90%',
                        height: 1,
                        backgroundColor: '#EBEAEA',
                        marginTop: 10,
                      }}
                    />
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: 'bold',
                        marginLeft: 20,
                      }}>
                      Detail Anak
                    </Text>

                    <View style={{ justifyContent: 'center' }}>
                      <View style={style.form}>
                        <Text style={style.labelkiri}>Anak ke</Text>
                        <Text style={style.labelkanan}>:{detail.anak_ke}</Text>
                      </View>
                      <View style={style.form}>
                        <Text style={style.labelkiri}>Tinggal Bersama</Text>
                        <Text style={style.labelkanan}>
                          :{detail.tinggal_bersama}
                        </Text>
                      </View>
                      <View style={style.form}>
                        <Text style={style.labelkiri}>
                          Jarak rumah ke sheleter
                        </Text>
                        <Text style={style.labelkanan}>
                          :{detail.jarak_rumah}KM
                        </Text>
                      </View>
                      <View style={style.form}>
                        <Text style={style.labelkiri}>Transportasi</Text>
                        <Text style={style.labelkanan}>
                          :{detail.transportasi}
                        </Text>
                      </View>

                      <View
                        style={{
                          marginLeft: 10,
                          width: '90%',
                          height: 1,
                          backgroundColor: '#EBEAEA',
                          marginTop: 10,
                        }}
                      />
                      <Text
                        style={{
                          fontSize: 16,
                          fontWeight: 'bold',
                          marginLeft: 20,
                        }}>
                        Detail Pendidikan
                      </Text>
                      {(detail.jenjang === 'Belum SD') |
                        (detail.jenjang === '') |
                        (detail.jenjang === 'null') |
                        (detail.jenjang === null) ? (
                        <View style={style.form}>
                          <Text style={style.labelkiri}>Belum Sekolah</Text>
                        </View>
                      ) : (
                        <View style={{ justifyContent: 'center' }}>
                          <View style={style.form}>
                            <Text style={style.labelkiri}>Nama Sekolah</Text>
                            <Text style={style.labelkanan}>
                              :{detail.nama_sekolah}
                            </Text>
                          </View>
                          <View style={style.form}>
                            <Text style={style.labelkiri}>Kelas</Text>
                            <Text style={style.labelkanan}>
                              :{detail.kelas}
                            </Text>
                          </View>
                          <View style={style.form}>
                            <Text style={style.labelkiri}>Alamat Sekolah</Text>
                            <Text style={style.labelkanan}>
                              :{detail.alamat_sekolah}
                            </Text>
                          </View>
                        </View>
                      )}
                      {detail.longitude === '' || detail.longitude === null ?
                        <View style={style.coltom1}>
                          <TouchableOpacity onPress={() => this.props.navigation.navigate('ambilbaru', { detail: detail })}>
                            <Text style={{ textAlign: 'center', color: '#fff' }}>Tambah Koordinat Anak</Text>
                          </TouchableOpacity>
                        </View> :
                        <View style={style.coltom1}>
                          <TouchableOpacity
                            onPress={() =>
                              this.props.navigation.navigate('maps', {
                                det: this.props.route.params.item,
                              })
                            }>
                            <Text style={{ textAlign: 'center', color: '#fff' }}>
                              Lihat Koordinat Anak
                            </Text>
                          </TouchableOpacity>
                        </View>
                      }

                    </View>
                  </View>
                </View>
              }
            />
            <Modal
              animationType={'fade'}
              transparent={true}
              visible={this.state.modalpilih}
              onRequestClose={() => this.setState({ modalpilih: false })}>
              <View
                style={{
                  backgroundColor: '#fff',
                  paddingTop: 5,
                  marginHorizontal: 5,
                  marginTop: '50%',
                  borderRadius: 20,
                  height: '25%',
                  width: '80%',
                  borderWidth: 1,
                  borderColor: '#bdbdbd',
                  alignItems: 'center',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignSelf: 'center',
                }}>
                <SafeAreaView style={{ alignItems: 'center' }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    {
                      detail.latitude === null || detail.longitude === null ?
                        <View
                          style={[style.kotakkecil, { backgroundColor: '#00A9B8', width: '75%', }]}>
                          <TouchableOpacity
                            onPress={() =>
                              this.props.navigation.navigate('ambilbaru', {
                                modalpilih: false,
                                detail: this.state.detail,
                              })
                            }
                          >
                            <Text
                              style={{
                                color: '#fff',
                                textAlign: 'center',
                                padding: 5,
                              }}>
                              Masukan Koordinat Rumah Anak
                            </Text>
                          </TouchableOpacity>
                        </View>
                        :
                        <View
                          style={[style.kotakkecil, { backgroundColor: '#00A9B8', width: '45%', }]}>
                          <TouchableOpacity
                            onPress={() =>

                              this.props.navigation.navigate('editdataanak', {
                                modalpilih: false,
                                detak: this.state.detak,
                              })


                            }
                          >
                            <Text
                              style={{
                                color: '#fff',
                                textAlign: 'center',
                                padding: 5,
                              }}>
                              Edit data
                            </Text>
                          </TouchableOpacity>
                        </View>
                    }


                  </View>

                  <View
                    style={{
                      marginTop: '5%',
                      alignItems: 'center',
                      flexDirection: 'row',
                      alignContent: 'center',
                    }}>
                    <TouchableOpacity
                      onPress={() =>
                        this.setState({ modalpilih: false }) +
                        ToastAndroid.show('Batal', ToastAndroid.SHORT)
                      }>
                      <View
                        style={{
                          height: 50,
                          borderColor: '#00A9B8',
                          borderWidth: 1,
                          width: 100,
                          justifyContent: 'center',
                          alignItems: 'center',
                          alignSelf: 'center',
                          borderRadius: 5,
                        }}>
                        <Text
                          style={{
                            color: '#00A9B8',
                            fontFamily: 'Poppins-Medium',
                            fontSize: 14,
                          }}>
                          Batal
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </SafeAreaView>
              </View>
            </Modal>
          </View>
        ) : (
          <View />
        )}

        {this.props.user.presensi === 'admin' ? ( //ini untuk tampilan admin cabang //
          <View>
            <ImageBackground
              source={background1}
              style={{ width: '100%', height: 200 }}></ImageBackground>
            <View style={style.kolomkecil}>
              <Image
                source={this.state.foto}
                style={{
                  width: 150,
                  height: 150,
                  borderRadius: 70,
                  justifyContent: 'center',
                  alignSelf: 'center',
                  marginTop: -110,
                  position: 'absolute',
                }}></Image>
              <View
                style={{
                  justifyContent: 'center',
                  textAlign: 'center',
                  alignItems: 'center',
                  alignContent: 'center',
                  alignSelf: 'center',
                  marginTop: 50,
                }}>
                <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold' }}>
                  {detail.full_name}
                </Text>
                <View
                  style={{
                    flexDirection: 'column',
                    justifyContent: 'center',
                    textAlign: 'center',
                    alignItems: 'center',
                    alignContent: 'center',
                    alignSelf: 'center',
                  }}>
                  <View style={{ flexDirection: 'row' }}>
                    <Locations />
                    <Text style={style.labeldlm}>{detail.tempat_lahir}</Text>
                  </View>
                </View>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  marginTop: 15,
                  padding: 5,
                  height: 170,
                }}>
                <View
                  style={{
                    flexDirection: 'column',
                    marginLeft: 20,
                    marginTop: 0,
                  }}>
                  <Jenis style={{ marginLeft: 10 }} />
                  <Text style={{ marginTop: 2, color: '#fff', fontSize: 10 }}>
                    {detail.jenis_anak_binaan}
                  </Text>
                </View>
                <View
                  style={{
                    marginTop: -10,
                    width: 1,
                    height: '40%',
                    backgroundColor: '#EBEAEA',
                  }}
                />

                <View style={{ flexDirection: 'column', marginTop: 0 }}>
                  <Tgl style={{ marginLeft: 15 }} />
                  <Text style={{ color: '#fff', fontSize: 10 }}>
                    {detail.tanggal_lahir}
                  </Text>
                </View>
                <View
                  style={{
                    marginTop: -10,
                    width: 1,
                    height: '40%',
                    backgroundColor: '#EBEAEA',
                  }}
                />
                {detail.jenjang === 'Belum Sekolah' ?
                  <View
                    style={{
                      flexDirection: 'column',
                      marginRight: 20,
                      marginTop: 0,
                    }}>

                    <Sekolah style={{ marginLeft: 20 }} />
                    <Text style={{ marginLeft: 5, color: '#fff', fontSize: 10 }}>
                      {detail.jenjang}
                    </Text>
                  </View>
                  : <View
                    style={{
                      flexDirection: 'column',
                      marginRight: 20,
                      marginTop: 0,
                    }}>

                    <Sekolah style={{ marginLeft: 0 }} />
                    <Text style={{ marginLeft: 5, color: '#fff', fontSize: 10 }}>
                      {detail.jenjang}
                    </Text>
                  </View>}
              </View>
            </View>
            <View
              style={{
                backgroundColor: '#fff',
                borderTopRightRadius: 20,
                borderTopLeftRadius: 20,
                marginTop: -10,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  alignItems: 'center',
                  alignSelf: 'center',
                }}>
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate('Tamrap', {
                      id_anak: this.props.route.params.id_anak,
                    })
                  }>
                  <View style={style.kotakbaru3}>
                    <Rapot style={style.icon} />
                    <Text style={style.Labelbawah}>Raport</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate('Presensi', {
                      id_anak: this.props.route.params.id_anak,
                    })
                  }>
                  <View style={style.kotakbaru3}>
                    <PrestasiH style={style.icon} />
                    <Text style={style.Labelbawah}>Prestasi</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate('SuratAB', {
                      id_anak: this.props.route.params.id_anak,
                    })
                  }>
                  <View style={style.kotakbaru3}>
                    <Surat style={style.icon} />
                    <Text style={style.Labelbawah}>Surat</Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  alignItems: 'center',
                  alignSelf: 'center',
                }}>
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate('Histori', {
                      id_anak: this.props.route.params.id_anak,
                    })
                  }>
                  <View style={style.kotakbaru3}>
                    <RiwayatH style={style.icon} />
                    <Text style={style.Labelbawah}>Riwayat</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => this.onOpenBottomSheetHandler(1)}>
                  <View style={style.kotakbaru3}>
                    <CeritaH style={style.icon} />
                    <Text style={style.Labelbawah}>Cerita</Text>
                  </View>
                </TouchableOpacity>
                {/* onPress={() => this.props.navigation.navigate('Identitas', { detail: this.props.route.params.item })} */}
                <TouchableOpacity onPress={() => this.onOpenBottomSheet(1)}>
                  <View style={style.kotakbaru3}>
                    <Profil1 style={style.icon} />
                    <Text style={style.Labelbawah}>Detail</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
              <TouchableOpacity
                style={style.btnSimpan}
                onPress={() =>
                  this.setState({ modalpilih: true, detak: detail })
                }>
                <Text
                  style={{
                    color: '#fff',
                    fontFamily: 'Poppins-Medium',
                    fontSize: 15,
                  }}>
                  Pengaturan
                </Text>
              </TouchableOpacity>
            </View>

            <Modal
              animationType={'fade'}
              transparent={true}
              visible={this.state.modalpilih}
              onRequestClose={() => this.setState({ modalpilih: false })}>
              <View
                style={{
                  backgroundColor: '#fff',
                  paddingTop: 5,
                  marginHorizontal: 5,
                  marginTop: '50%',
                  borderRadius: 20,
                  height: '35%',
                  width: '90%',
                  borderWidth: 1,
                  borderColor: '#bdbdbd',
                  alignItems: 'center',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignSelf: 'center',
                }}>
                <SafeAreaView style={{ alignItems: 'center' }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <View
                      style={[style.kotakkecil, { backgroundColor: '#DC143C' }]}>
                      <TouchableOpacity
                        onPress={() =>
                          this.props.navigation.navigate(
                            'List_Anak_Binaan',
                            { modalpilih: false },
                            this.Hapusdata(),
                          )
                        }>
                        <Text
                          style={{
                            color: '#fff',
                            textAlign: 'center',
                            padding: 5,
                          }}>
                          Hapus Data
                        </Text>
                      </TouchableOpacity>
                    </View>

                    <View
                      style={[
                        style.kotakkecil,
                        { width: '28%', backgroundColor: '#DC143C' },
                      ]}>
                      <TouchableOpacity
                        onPress={() =>
                          this.setState({ modalpilih: false }, this.editData())
                        }>
                        {/* <KKada style={{ justifyContent: 'center', alignSelf: 'center' }} /> */}
                        <Text
                          style={{
                            color: '#fff',
                            textAlign: 'center',
                            padding: 5,
                          }}>
                          Non-Aktfikan
                        </Text>
                      </TouchableOpacity>
                    </View>

                    <View
                      style={[style.kotakkecil, { backgroundColor: '#00A9B8' }]}>
                      <TouchableOpacity
                        onPress={() =>
                          this.props.navigation.navigate('editdataanak', {
                            modalpilih: false,
                            detak: this.state.detak,
                          })
                        }>
                        {/* <KKada style={{ justifyContent: 'center', alignSelf: 'center' }} /> */}
                        <Text
                          style={{
                            color: '#fff',
                            textAlign: 'center',
                            padding: 5,
                          }}>
                          Edit data
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>

                  <View
                    style={{
                      marginTop: '5%',
                      alignItems: 'center',
                      flexDirection: 'row',
                      alignContent: 'center',
                    }}>
                    <TouchableOpacity
                      onPress={() =>
                        this.setState({ modalpilih: false }) +
                        ToastAndroid.show('Batal', ToastAndroid.SHORT)
                      }>
                      <View
                        style={{
                          height: 50,
                          borderColor: '#00A9B8',
                          borderWidth: 1,
                          width: 100,
                          justifyContent: 'center',
                          alignItems: 'center',
                          alignSelf: 'center',
                          borderRadius: 5,
                        }}>
                        <Text
                          style={{
                            color: '#00A9B8',
                            fontFamily: 'Poppins-Medium',
                            fontSize: 14,
                          }}>
                          Batal
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </SafeAreaView>
              </View>
            </Modal>

            <BottomSheet
              bottomSheerColor="#FFFFFF"
              // backDropColor="red"
              ref="BottomSheet"
              initialPosition={'0%'}
              snapPoints={snapPoints}
              isBackDrop={true}
              isBackDropDismissByPress={true}
              isRoundBorderWithTipHeader={true}
              // overDrag={false}
              // keyboardAware
              // isModal
              // containerStyle={{backgroundColor:"red"}}
              // tipStyle={{backgroundColor:"red"}}
              // headerStyle={{backgroundColor:"red"}}
              // bodyStyle={{backgroundColor:"red",flex:1}}
              header={
                <View>
                  <Text
                    style={{
                      color: '#000',
                      fontSize: 18,
                      fontFamily: 'Poppins-SemiBold',
                      marginTop: '2%',
                    }}>
                    Cerita
                  </Text>
                </View>
              }
              body={
                <View style={{ paddingHorizontal: 20, width: '100%' }}>
                  <View>
                    <Text
                      style={{
                        color: '#000',
                        fontSize: 14,
                        fontFamily: 'Poppins-Regular',
                        textAlign: 'justify',
                      }}>
                      Gugun (13), seorang anak kecil dari pasangan Jujun Suhanda
                      dan Dede Rosmiati ini tinggal di sebuah rumah yang
                      sederhana di daerah Pamarisen, Kabupaten Sumedang, Jawa
                      Barat, dan kondisi yang ia alami sangatlah memprihatinkan.
                      {'\n'}
                      {'\n'}
                      Pasalnya, sudah sejak kecil ia beserta kakak dan adiknya
                      hidup dengan serba kekurangan dikarenakan faktor ekonomi
                      dari keluarganya. kalian bayangkan saja, mereka untuk
                      memenuhi kebutuhan hidupnya hanya mengandalkan pendapatan
                      yang diterima oleh ayahnya dan pendapatan yang diterimanya
                      pun hanya cukup untuk memenuhi kebutuhan pokoknya saja.
                      {'\n'}
                      {'\n'}
                      Oleh sebab itu, dengan segala keterbatasan yang ia miliki
                      serta alami membuat dirinya menjadi cemas akan bagaimana
                      nasib pendidikannya nanti. Namun, dibalik rasa kecemasan
                      yang ia rasakan, tidak membuat dirinya menjadi minder
                      ataupun malu terhadap teman-teman sebayanya ketika sedang
                      berkumpul. Selain itu, ia bahkan masih memiliki semangat
                      dan bertekad untuk terus rajin belajar agar kelak nantinya
                      ia bisa merubah kondisi kehidupan keluarganya menjadi
                      lebih baik. Untuk itu, yuk jangan biarkan kondisi Gugun
                      terus menerus seperti ini dan berikan bantuan terbaik yang
                      kita miliki agar apa yang ia impikan bisa terwujud. Terima
                      kasih sahabat.
                    </Text>
                  </View>
                </View>
              }
            />
            <BottomSheet
              bottomSheerColor="#FFFFFF"
              // backDropColor="red"
              ref="BottomSheet2"
              initialPosition={'0%'}
              snapPoints={snapPoints2}
              isBackDrop={true}
              isBackDropDismissByPress={true}
              isRoundBorderWithTipHeader={true}
              // overDrag={false}
              // keyboardAware
              // isModal
              // containerStyle={{backgroundColor:"red"}}
              // tipStyle={{backgroundColor:"red"}}
              // headerStyle={{backgroundColor:"red"}}
              // bodyStyle={{backgroundColor:"red",flex:1}}
              header={
                <View>
                  <Text
                    style={{
                      color: '#000',
                      fontSize: 18,
                      fontFamily: 'Poppins-SemiBold',
                      marginTop: '2%',
                    }}>
                    Identitas
                  </Text>
                </View>
              }
              body={
                <View style={{ paddingHorizontal: 20, width: '100%' }}>
                  <View style={{ flexDirection: 'column', marginTop: 10 }}>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: 'bold',
                        marginLeft: 20,
                      }}>
                      Identitas Anak
                    </Text>
                    <View style={{ justifyContent: 'center' }}>
                      <View style={style.form}>
                        <Text style={style.labelkiri}>
                          Nama
                        </Text>
                        <Text style={style.labelkanan}>
                          :{detail.full_name}
                        </Text>
                      </View>
                      <View style={style.form}>
                        <Text style={style.labelkiri}>
                          Tempat, Tanggal Lahir
                        </Text>
                        <Text style={style.labelkanan}>
                          :{detail.tempat_lahir} {detail.tanggal_lahir}
                        </Text>
                      </View>
                      <View style={style.form}>
                        <Text style={style.labelkiri}>Jenis Kelamin</Text>
                        <Text style={style.labelkanan}>
                          :{detail.jenis_kelamin}
                        </Text>
                      </View>
                      <View style={style.form}>
                        <Text style={style.labelkiri}>Hobi</Text>
                        <Text style={style.labelkanan}>:{detail.hobi}</Text>
                      </View>
                    </View>
                    <View
                      style={{
                        marginLeft: 10,
                        width: '90%',
                        height: 1,
                        backgroundColor: '#EBEAEA',
                        marginTop: 10,
                      }}
                    />
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: 'bold',
                        marginLeft: 20,
                      }}>
                      Detail Anak
                    </Text>

                    <View style={{ justifyContent: 'center' }}>
                      <View style={style.form}>
                        <Text style={style.labelkiri}>Anak ke</Text>
                        <Text style={style.labelkanan}>:{detail.anak_ke}</Text>
                      </View>
                      <View style={style.form}>
                        <Text style={style.labelkiri}>Tinggal Bersama</Text>
                        <Text style={style.labelkanan}>
                          :{detail.tinggal_bersama}
                        </Text>
                      </View>
                      <View style={style.form}>
                        <Text style={style.labelkiri}>
                          Jarak rumah ke sheleter
                        </Text>
                        <Text style={style.labelkanan}>
                          :{detail.jarak_rumah}KM
                        </Text>
                      </View>
                      <View style={style.form}>
                        <Text style={style.labelkiri}>Transportasi</Text>
                        <Text style={style.labelkanan}>
                          :{detail.transportasi}
                        </Text>
                      </View>

                      <View
                        style={{
                          marginLeft: 10,
                          width: '90%',
                          height: 1,
                          backgroundColor: '#EBEAEA',
                          marginTop: 10,
                        }}
                      />
                      <Text
                        style={{
                          fontSize: 16,
                          fontWeight: 'bold',
                          marginLeft: 20,
                        }}>
                        Detail Pendidikan
                      </Text>
                      {(detail.jenjang === 'Belum Sekolah') |
                        (detail.jenjang === '') |
                        (detail.jenjang === 'null') |
                        (detail.jenjang === null) ? (
                        <View style={style.form}>
                          <Text style={style.labelkiri}>Belum Sekolah</Text>
                        </View>
                      ) : (
                        <View style={{ justifyContent: 'center' }}>
                          <View style={style.form}>
                            <Text style={style.labelkiri}>Nama Sekolah</Text>
                            <Text style={style.labelkanan}>
                              :{detail.nama_sekolah}
                            </Text>
                          </View>
                          <View style={style.form}>
                            <Text style={style.labelkiri}>Kelas</Text>
                            <Text style={style.labelkanan}>
                              :{detail.kelas}
                            </Text>
                          </View>
                          <View style={style.form}>
                            <Text style={style.labelkiri}>Alamat Sekolah</Text>
                            <Text style={style.labelkanan}>
                              :{detail.alamat_sekolah}
                            </Text>
                          </View>
                        </View>
                      )}
                      <View style={style.coltom1}>
                        <TouchableOpacity
                          onPress={() =>
                            this.props.navigation.navigate('maps', {
                              det: this.props.route.params.item,
                            })
                          }>
                          <Text style={{ textAlign: 'center', color: '#fff' }}>
                            Lihat Koordinat Anak
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>
              }
            />
          </View>
        ) : (
          <View />
        )}
      </View>
    );
  }
}

const style = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  wrapper: {},
  slide1: {
    flex: 1,
    marginLeft: 10,
  },
  slide2: {
    height: '100%',
  },
  slide3: {
    flex: 1,
    width: '100%',
    height: '50%',
  },
  icon: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  contentContainer: {
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: '#fff',
    flex: 1,
  },
  Labelbawah: {
    textAlign: 'center',
  },
  containerfoto: {
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
    color: '#fff',
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
  tambah: {
    position: 'absolute',
    width: 50,
    height: 50,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  logo4: {
    width: 75,
    height: 75,
    marginLeft: 10,
  },
  groupdatetime: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  coltom: {
    width: '100%',
    marginTop: 20,
    fontSize: 16,
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#fff',
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
  coltom2: {
    width: '100%',
    fontSize: 16,
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#fff',
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
  item2: {
    padding: 10,
    height: 120,
    width: '30%',
    position: 'absolute',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  item1: {
    flex: 1,
    marginTop: 10,
    textAlign: 'center',
    fontSize: 16,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 10,
    borderWidth: 0.1,
    marginVertical: 1,
    marginHorizontal: 50,
  },
  picker: {
    color: 'F',
    marginTop: 10,
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    borderRadius: 5,
    // marginHorizontal: 5,
    height: 30,
    width: '100%',
    shadowColor: '#333',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.3,
    shadowRadius: 2,

    elevation: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imgSmall: {
    position: 'absolute',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
    marginRight: 20,
    marginLeft: 20,
    marginTop: 15,
    marginBottom: 15,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
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
    backgroundColor: '#7e7e7',
  },
  Label: {
    padding: 5,
    color: '#000000',
    marginLeft: 10,
    marginTop: 20,
  },
  detailgmbr: {
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 18,
    marginTop: 20,
    fontWeight: 'bold',
    color: '#7e7e7e',
  },
  detail: {
    padding: 10,
    borderRadius: 2.5,
    borderWidth: 0.1,
  },
  Label1: {
    flex: 1,
    fontSize: 12,
    padding: 5,
    color: '#000000',
    flexDirection: 'column',
  },
  Label2: {
    marginTop: 5,
    marginLeft: 25,
    padding: 5,
    color: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  Textinputcss: {
    color: '#7e7e7e',
    borderRadius: 10,
    borderWidth: 0.1,
    fontSize: 12,
    height: 52,
    width: '20%',
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
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchBar: {
    fontSize: 16,
    marginLeft: 50,
    width: '70%',
    height: 50,
    shadowColor: '#333',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 3,
    backgroundColor: '#fff',
    borderRadius: 2,
    borderWidth: 0.1,
    justifyContent: 'center',
    textAlign: 'center',
  },
  itemText: {
    textAlign: 'center',
    color: 'black',
    fontSize: 16,
    width: '100%',
    height: 50,
  },
  item: {
    flex: 1,
    fontSize: 16,
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#fff',
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
  ModalLaporan: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#00000099',
    paddingHorizontal: '10%',
  },
  ModalCont2: {
    flex: 1,
    // alignItems: 'center',
    backgroundColor: '#00000079',
  },
  refresh: {
    padding: 10,
    position: 'absolute',
    bottom: 95,
    right: 15,
    flexDirection: 'row',
    borderRadius: 5,
    // marginHorizontal: 5,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkbox: {
    flexDirection: 'row',
    alignContent: 'space-between',
    alignItems: 'center',
    margin: 20,
  },
  foto: {
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    width: 125,
    height: 125,
    borderRadius: 50,
    marginLeft: 10,
    marginTop: 30,
    marginRight: 20,
  },
  form: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    width: '100%',
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
    fontWeight: 'bold',
    marginVertical: 5,
    marginLeft: 20,
    width: 100,
    color: '#C0C0C0',
  },
  labelkiri2: {
    fontSize: 12,
    fontWeight: 'bold',
    marginVertical: 5,
    marginTop: -15,
    marginLeft: 20,
    width: 100,
    color: '#C0C0C0',
  },
  labelkanan: {
    fontSize: 12,
    marginHorizontal: 5,
    width: 150,
  },
  labelkanan2: {
    fontSize: 12,
    marginHorizontal: 5,
    width: 150,
    marginLeft: 80,
    fontWeight: 'bold',
  },
  labelkanan1: {
    fontSize: 12,
    marginHorizontal: 5,
    width: 150,
    marginTop: 10,
    marginLeft: 80,
    fontWeight: 'bold',
  },
  btnSimpanbaru: {
    width: '55%',
    fontWeight: 'bold',
    backgroundColor: '#0EBEDF',
    borderRadius: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#0EBEDF',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    textAlign: 'center',
    color: '#fff',
  },
  kolomkecil: {
    backgroundColor: '#00A9B8',
    width: '100%',
    height: '30%',
  },
  kolomkecil1: {
    width: '90%',
    height: 60,
    marginTop: 15,
    justifyContent: 'space-around',
    alignContent: 'space-around',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 15,
    flexDirection: 'row',
    textAlign: 'center',
  },
  countContainer: {
    color: '#000000',
    alignItems: 'center',
    flexDirection: 'row',
    padding: 5,
    justifyContent: 'center',
  },
  btnSimpanDark1: {
    width: '20%',
    fontWeight: 'bold',
    backgroundColor: '#E9E9E9',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E9E9E9',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  labeldlm: {
    fontSize: 10,
    color: '#fff',
    marginTop: 3,
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
    height: 300,
    borderRadius: 15,
    borderWidth: 1,
    marginLeft: 10,
    marginTop: 10,
    borderColor: '#E9E9E9',
    backgroundColor: '#fff',
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
  kotakbaru3: {
    shadowColor: '#333',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 3,
    width: 100,
    height: 100,
    borderRadius: 15,
    borderWidth: 1,
    margin: 10,
    marginTop: 15,
    borderColor: '#E9E9E9',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  btnSimpan: {
    backgroundColor: '#00A9B8',
    padding: '4%',
    borderRadius: 10,
    marginTop: '6%',
    width: '70%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  kotakkecil: {
    flexDirection: 'column',
    borderColor: '#bdbdbd',
    borderWidth: 1,
    width: '25%',
    height: 70,
    justifyContent: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    textAlign: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 10,
    marginHorizontal: 10,
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
export default connect(mapStateToProps, mapDispatchToProps)(Detail1);
