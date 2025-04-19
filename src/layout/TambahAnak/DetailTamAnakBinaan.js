import React, { Component } from 'react';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableWithoutFeedback,
  TextInput,
  ToastAndroid,
  ImageBackground,
  Alert,
  Image,
  Button,
  ScrollView,
  Modal,
  SafeAreaView,
} from 'react-native';
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import { Arrowleft, Date, Camera, Markers } from '../../assets/icons';
import { Picker } from '@react-native-picker/picker';
import RadioForm from 'react-native-simple-radio-button';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { addfoto2, x, addfoto3, Union } from '../../assets/images';
import DatePicker from 'react-native-date-picker';
import DateTimePicker from 'react-native-modal-datetime-picker';
import CheckBox from '@react-native-community/checkbox';
import moment from 'moment';
// import ImagePicker from 'react-native-image-crop-picker';
import * as ImagePicker from 'react-native-image-picker';
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps'

export class DetailTamAnakBinaan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gambar: '',
      taimage: {
        0: {
          image: {
            name: '',
            type: '',
            uri: 'https://static.thenounproject.com/png/187803-200.png'
          },
        }
      },
      rapimg: {
        0: {
          image: {
            addfoto2
          },
        },
      },
      sktm: {
        name: '',
        type: '',
        uri: "",
        id: 0,
      },
      surket: {
        name: '',
        type: '',
        uri: '',
        id: 0,
      },
      anakfoto: {
        name: '',
        type: '',
        uri: '',
        id: 0,
      },
      walifoto: {
        name: '',
        type: '',
        uri: '',
        id: 0,
      },
      region: {
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0.02,
        longitudeDelta: 0.04,
      },
      markers: {
        coordinate: {
          latitude: '',
          longitude: '',
        },
        key: 1,
      },
      image: null,
      images: null,
      count: 1,
      tr: [],
      open: false,
      kancab: [],
      kan: '',
      wilbin: [],
      wil: '',
      shelter: [],
      shel: '',
      bank: '',
      shel: '',
      SOT: '',
      img1: null,
      img2: 0,
      text: '',
      show: 0,
      pel: '',
      peltinggi: '',
      pelrendah: '',
      Ganjil: false,
      Genap: false,
      modaldetail: false,
      modaldate: false,
      simpan: false,
      masukkk: false,
      kelas: '',
      agama: '',
      setOpen: '',
      setDate: '',
      kk: '',
      kepala: '',
      bank: '',
      norek: '',
      an_rek: '',
      notelp: '',
      an_hp: '',
      notlp: '',
      tingkat: '',
      kelas: '',
      namasek: '',
      alamatsek: '',
      jurusan: '',
      nikanak: '',
      namaanak: '',
      panggilan: '',
      agamaanak: '',
      chosenDate: '',
      JKanak: '',
      latitude: 0,
      longitude: 0,
      ke: '',
      saudara: '',
      pelfa: '',
      hobi: '',
      JK: '',
      TB: '',
      JB: '',
      jenisanak: '',
      nikayah: '',
      ayah: '',
      agamaayah: '',
      temayah: '',
      chosenDate2: '',
      chosenDate3: '',
      provayah: '',
      kabayah: '',
      kecayah: '',
      kelayah: '',
      penghasilanayah: '',
      penyebabayah: '',
      nikibu: '',
      ibu: '',
      agamaibu: '',
      temibu: '',
      chosenDate4: '',
      chosenDate5: '',
      provibu: '',
      kabibu: '',
      kelibu: '',
      kecibu: '',
      penghasilanibu: '',
      penyebabibu: '',
      nikwali: '',
      wali: '',
      agamawali: '',
      temwali: '',
      chosenDate6: '',
      provwali: '',
      kabwali: '',
      kecwali: '',
      kelwali: '',
      penghasilanwali: '',
      hubkerabat: '',
      prov: [],
      kota: [],
      kartu: [],
      carikartu: [],
      carikkk: '',
      kecamatan: [],
      kelurahan: [],
      resourcePath: {},
      date: new Date(),
      date2: new Date(),
      date3: new Date(),
      date4: new Date(),
      date5: new Date(),
      date6: new Date(),
      showAlert: false,
      tanggal: new Date(),
      modaltanya: false,
      check: false,
      modalmap: false,


    };
  }
  GetkartuAPi() {
    fetch('https://kilauindonesia.org/datakilau/api/getkeluarga').then(res => {
      if (res.status === 200)
        return res.json()
    }).then(resdata => {
      console.log(resdata.data)
      this.setState({
        kartu: resdata.data,
        carikartu: resdata.data,

      })
    })
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
  GetkotaAPi() {
    fetch('https://kilauindonesia.org/datakilau/api/getkab/' + this.state.provayah).then(res => {
      if (res.status === 200)
        return res.json()
    }).then(resdata => {
      console.log(resdata.data)
      this.setState({
        kota: resdata.data

      })
    })
  }
  GetkecAPi() {
    fetch('https://kilauindonesia.org/datakilau/api/getkec/' + this.state.kabayah).then(res => {
      if (res.status === 200)
        return res.json()
    }).then(resdata => {
      console.log(resdata.data)
      this.setState({
        kecamatan: resdata.data

      })
    })
  }
  GetkelAPi() {
    fetch('https://kilauindonesia.org/datakilau/api/getk/' + this.state.kecayah).then(res => {
      if (res.status === 200)
        return res.json()
    }).then(resdata => {
      console.log(resdata.data)
      this.setState({
        kelurahan: resdata.data
      })
    })
  }
  GetShelterAPi() {
    fetch('https://kilauindonesia.org/datakilau/api/shelter/' + this.state.wil).then(res => {
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
    fetch('https://kilauindonesia.org/datakilau/api/wilbin/' + this.state.kan).then(res => {
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
    fetch('https://kilauindonesia.org/datakilau/api/kacab/').then(res => {
      if (res.status === 200)
        return res.json()
    }).then(resdata => {
      console.log(resdata.data)
      this.setState({
        kancab: resdata.data,
      })
    })
  }
  componentDidMount() {
    this.GetShelterAPi();
    this.GetKacabAPi();
    this.GetWilbinAPi();
    this.GetprovAPi();
    this.GetkotaAPi();
    this.GetkecAPi();
    this.GetkartuAPi();
    console.log(this.props);
  }
  takePicSKTM() {
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
              sktm: source,
            });
            console.log('ini gambar = ', this.state.sktm);
          }
        },
      );
    }
  }
  takePicSURKET() {
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
              surket: source,
            });
            console.log('ini gambar = ', this.state.surket);
          }
        },
      );
    }
  }
  takePicAnak() {
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
              anakfoto: source,
            });
            console.log('ini gambar = ', this.state.anakfoto);
          }
        },
      );
    }
  }
  takePicWali() {
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
              walifoto: source,
            });
            console.log('ini gambar = ', this.state.walifoto);
          }
        },
      );
    }
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

            };
            console.log('ini gambar = ', source);
            this.setState(prevState => {
              prevState.taimage[index] = source
              //   prevState.tgl_lahir[index] != this.props.route.params.tgl_lahir[index] ? this.setState({tglmbuh : true}) : this.setState({tglmbuh : false});
              return {
                taimage: prevState.taimage
              }
            }, () => console.log(this.state.taimage));
            this.setState({
              img1: index,
              img2: index,
            });
            console.log('ini gambar = ', this.state.taimage);
          }
        },
      );
    }
  }
  takePicayah(index) {
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
              image: {
                uri: response.assets[0].uri,
                name: response.assets[0].fileName,
                type: response.assets[0].type,
              }

            };
            console.log('ini gambar = ', source);
            this.setState(prevState => {
              prevState.taimage[index] = source
              //   prevState.tgl_lahir[index] != this.props.route.params.tgl_lahir[index] ? this.setState({tglmbuh : true}) : this.setState({tglmbuh : false});
              return {
                taimage: prevState.taimage
              }
            }, () => console.log(this.state.taimage));
            this.setState({
              img3: index,
              img4: index,
            });
            console.log('ini gambar = ', this.state.taimage);
          }
        },
      );
    }
  }
  takePicGal(index) {
    {
      ImagePicker.launchImageLibrary(
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
                prevState.rapimg[index] = source;
                //   prevState.tgl_lahir[index] != this.props.route.params.tgl_lahir[index] ? this.setState({tglmbuh : true}) : this.setState({tglmbuh : false});
                return {
                  rapimg: prevState.rapimg,
                };
              },
              () => console.log(this.state.rapimg),
            );
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
  onMapPress(e) {
    this.setState({
      markers:
      {
        coordinate: e.nativeEvent.coordinate,
        key: id,
        color: randomColor(),
      },
    })
  };

  SaveAddress = () => {
    console.log(JSON.stringify(this.state.markers[0].coordinate.latitude))
  }
  renderImage(image) {
    return (
      <Image
        style={{ width: 300, height: 300, resizeMode: 'contain' }}
        source={image}
      />
    );
  }

  renderAsset(image) {
    if (image.mime && image.mime.toLowerCase().indexOf('video/') !== -1) {
      return this.renderVideo(image);
    }

    return this.renderImage(image);
  }
  pickSingleWithCamera(cropit, circular = false, mediaType) {
    ImagePicker.openPicker({
      width: 500,
      height: 500,
      cropping: cropit,
      cropperCircleOverlay: circular,
      sortOrder: 'none',
      compressImageMaxWidth: 1000,
      compressImageMaxHeight: 1000,
      compressImageQuality: 1,
      compressVideoPreset: 'MediumQuality',
      includeExif: true,
      cropperStatusBarColor: 'white',
      cropperToolbarColor: 'white',
      cropperActiveWidgetColor: 'white',
      cropperToolbarWidgetColor: '#3498DB',
    })
      .then((image) => {
        console.log('received image', image);
        this.setState({
          image: {
            uri: image.path,
            width: image.width,
            height: image.height,
            mime: image.mime,
          },
          images: null,
        });
      })
      .catch((e) => {
        console.log(e);
        Alert.alert(e.message ? e.message : e);
      });
  }

  handlePicker = (date) => {
    this.setState({ isVisible: false, chosenDate: moment(date).format('DD-MM-YYYY') })
  }
  handlePicker2 = (date2) => {
    this.setState({ isVisible: false, chosenDate2: moment(date2).format('DD-MM-YYYY') })
  }
  handlePicker3 = (date3) => {
    this.setState({ isVisible: false, chosenDate3: moment(date3).format('DD-MM-YYYY') })
  }
  handlePicker4 = (date4) => {
    this.setState({ isVisible: false, chosenDate4: moment(date4).format('DD-MM-YYYY') })
  }
  handlePicker5 = (date5) => {
    this.setState({ isVisible: false, chosenDate5: moment(date5).format('DD-MM-YYYY') })
  }
  handlePicker6 = (date6) => {
    this.setState({ isVisible: false, chosenDate6: moment(date6).format('DD-MM-YYYY') })
  }
  hidePicker = () => {
    this.setState({
      isVisible: false,

    })

  }
  closeModal() {
    this.setState({ masukkk: false });
  }
  showPicker = () => {
    this.setState({ isVisible: true })
  }
  toggletanya(visible) {
    this.setState({ modaltanya: visible });
  }

  filterList(textToSearch) {
    this.setState({
      carikartu: this.state.kartu.filter(i => i.kepala_keluarga.toLowerCase(textToSearch).includes(textToSearch)),
    });
  }
  render() {
    const onChange = (event, selectedDate) => {
      const currentDate = selectedDate;
      setShow(false);
      setDate(currentDate);
    };

    const showMode = (currentMode) => {
      setShow(true);
      setMode(currentMode);
    };

    const showDatepicker = () => {
      showMode('date');
    };

    const showTimepicker = () => {
      showMode('time');
    };

    var rapimg = [];
    for (let i = 0; i <= this.state.img2; i++) {
      rapimg.push(
        <Image
          style={{ width: 200, height: 200, resizeMode: 'contain' }}
          source={this.state.rapimg[i].image}
        />,
      );
    }
    const tokyoRegion = {
      latitude: -6.95,
      longitude: 107.57,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
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
    var tingkat = [
      { label: 'Belum Sekolah', value: 'Belum Sekolah' },
      { label: 'SD', value: 'SD' },
      { label: 'SMP', value: 'SMP' },
      { label: 'SMA', value: 'SMA' },
      { label: 'Perguruan Tinggi', value: 'Perguruan_Tinggi' },
    ];
    const sm = this.state.SOT === 'Yatim_Piatu' ?
      [
        { label: 'Tinggal Bersama Wali', value: 'TBW', index: '0' }
      ] :
      [
        { label: 'Tinggal Bersama Wali', value: 'TBW', index: '0' },
        { label: 'Tinggal Bersama Ayah', value: 'TBA', index: '1' },
        { label: 'Tinggal Bersama Ibu', value: 'TBI', index: '2' }
      ]

    const bina = this.state.SOT === 'Dhuafa' | this.state.SOT === 'Yatim' | this.state.SOT === 'Piatu' | this.state.SOT === 'Yatim_Piatu' ?
      [
        { label: 'Bakal Calon Penerima Beasiswa(BCPB)', value: 'BCPB', index: '1' },
      ] :
      [
        { label: 'Calon Non-Penerima Beasiswa (NPB)', value: 'NPB', index: '0' },
      ]

    const so = [
      { label: 'Yatim Piatu', value: 'Yatim_Piatu' }
    ];
    const bank = [
      {
        label: 'Ya',
        value: 'Ya',
      },
      {
        label: 'Tidak',
        value: 'Tidak',
      },
    ];
    const notelp = [
      {
        label: 'Ya',
        value: 'Ya',
      },
      {
        label: 'Tidak',
        value: 'Tidak',
      },
    ];
    const jenisanak = [
      {
        label: 'Tahfidz',
        value: 'Tahfidz',
      },
      {
        label: 'Non-Tahfidz',
        value: 'Non-Tahfidz',
      },
    ];
    const progressStepsStyle = {
      activeStepIconBorderColor: '#00A9B8',
      activeStepNumColor: 'transparent',
      activeStepIconColor: '#00A9B8',
      completedStepIconColor: '#00A9B8',
      completedProgressBarColor: '#00A9B8',
      disabledStepNumColor: 'transparent',
      completedCheckColor: 'transparent',
      borderWidth: 2,

    };

    const nextbuttonTextStyle = {
      backgroundColor: '#00A9B8',
      height: 50,
      width: 130,
      borderRadius: 12,
      color: 'white',
      paddingHorizontal: 25,
      paddingVertical: 13,
      fontFamily: 'Poppins-SemiMedium',
      fontSize: 15,
    };
    const modalbuttonTextStyle = {
      backgroundColor: '#00A9B8',
      height: 50,
      width: 130,
      borderRadius: 12,
      color: 'white',
      paddingHorizontal: 25,
      paddingVertical: 13,
      fontFamily: 'Poppins-SemiMedium',
      fontSize: 15,
    };
    const finishbuttonTextStyle = {
      backgroundColor: '#00A9B8',
      height: 50,
      width: 310,
      borderRadius: 12,
      color: 'white',
      paddingHorizontal: 130,
      paddingVertical: 13,
      fontFamily: 'Poppins-SemiMedium',
      fontSize: 15
    };

    const previousbuttonTextStyle = {
      backgroundColor: 'white',
      height: 50,
      width: 140,
      borderWidth: 1,
      borderRadius: 12,
      borderColor: '#00A9B8',
      color: '#00A9B8',
      paddingHorizontal: 36,
      paddingVertical: 13,
      fontFamily: 'Poppins-SemiMedium',
    };

    return (
      <ScrollView style={{ flex: 1, paddingHorizontal: 20, backgroundColor: '#fff', height: windowHeight }}>
        {/* <View style={style.header}>
          <Arrowleft/>
          <Text style={{color:'#000'}}>Tambah Anak Binaan</Text>
        </View> */}
        <View
          style={{
            flexDirection: 'row',
            marginTop: 10,
            marginHorizontal: 10,
            alignItems: 'center',
          }}>
          <TouchableWithoutFeedback
            onPress={() => this.props.navigation.navigate('List_anak')}>
            {/* <Arrowleft /> */}
            <Text></Text>
          </TouchableWithoutFeedback>
          <View style={{ justifyContent: 'center', width: '100%', padding: 10 }}>
            <Text style={style.title2}>Tambah Anak Binaan</Text>
          </View>
        </View>
        <ProgressSteps {...progressStepsStyle}>
          <ProgressStep
            nextBtnTextStyle={nextbuttonTextStyle}
            nextBtnText="Selanjutnya">
            <View style={{ height: '100%', }}>
              <Text style={style.Label2}>Informasi Wilayah</Text>
              
              <DatePicker
                date={this.state.date}
                placeholder="select date"
                onDateChange={(date) =>
                  this.setState({ date }, () => console.log(this.state.date))
                }
                androidVariant="nativeAndroid"
                mode='date'

              />

              <View
                style={style.kotakpicker}>
                <Picker
                  selectedValue={this.state.kan}
                  onValueChange={(itemValue) => {
                    this.setState({
                      kan: itemValue
                    })
                  }}>
                  <Picker.Item style={{ fontSize: 12 }} label={'Pilih kantor'} value={'0'} key={'0'} />

                  {
                    this.state.kancab.map((kan) =>
                      <Picker.Item style={{ height: '100%', width: '100%', fontSize: 12, }} label={kan.nama_kacab} value={kan.id_kacab} key={kan.id_kacab} />
                    )}
                </Picker>
              </View>

              <View
                style={style.kotakpicker}>
                <Picker
                  selectedValue={this.state.wil}
                  onFocus={() => { this.GetWilbinAPi() }}
                  onValueChange={(itemValue, kacab) => {
                    this.setState({
                      wil: itemValue
                    })
                  }}>
                  <Picker.Item style={{ fontSize: 12 }} label={'Pilih Kabupaten'} value={'0'} key={'0'} />

                  {
                    this.state.wilbin.map((wil) =>
                      <Picker.Item style={{ height: '100%', width: '100%', fontSize: 12, }} label={wil.nama_wilbin} value={wil.id_wilbin} key={wil.id_wilbin} />
                    )}
                </Picker>
              </View>
              <View
                style={style.kotakpicker}>
                <Picker
                  selectedValue={this.state.shel}
                  onFocus={() => { this.GetShelterAPi() }}
                  onValueChange={(itemValue, wilbin) => {
                    this.setState({
                      shel: (itemValue)
                    })
                  }}>
                  <Picker.Item style={{ fontSize: 12 }} label={'Pilih shelter'} value={'0'} key={'0'} />

                  {
                    this.state.shelter.map((shel) =>
                      <Picker.Item style={{ height: '100%', width: '100%', fontSize: 12, }} label={shel.nama_shelter} value={shel.id_shel} key={shel.id_shel} />
                    )}
                </Picker>
              </View>

              <TextInput
                style={style.kotak3}
                onChangeText={kk => this.setState({ kk })}
                value={this.state.kk}
                keyboardType='numeric'
                placeholder="No.KK"
                placeholderTextColor="#C0C0C0"
              />

              <TextInput
                style={style.kotak3}
                onChangeText={kepala => this.setState({ kepala })}
                value={this.state.kepala}
                keyboardType='default'
                placeholder="Kepala Keluarga"
                placeholderTextColor="#C0C0C0"
              />

              <View
                style={style.kotakpicker}>
                <Picker
                  style={style.Textinputcss}
                  selectedValue={this.state.SOT}
                  onValueChange={itemValue =>
                    this.setState({ SOT: itemValue, show: 1 })
                  }>
                  <Picker.Item
                    style={{ fontSize: 14, fontFamily: 'Poppins-Regular' }}
                    label="Status Orang Tua"
                    value=""
                  />
                  <Picker.Item
                    style={{ fontSize: 14, fontFamily: 'Poppins-Regular' }}
                    label="Yatim"
                    value="Yatim"
                  />
                  <Picker.Item
                    style={{ fontSize: 14, fontFamily: 'Poppins-Regular' }}
                    label="Piatu"
                    value="Piatu"
                  />
                  <Picker.Item
                    style={{ fontSize: 14, fontFamily: 'Poppins-Regular' }}
                    label="Yatim Piatu"
                    value="Yatim_Piatu"
                  />
                  <Picker.Item
                    style={{ fontSize: 14, fontFamily: 'Poppins-Regular' }}
                    label="Dhuafa"
                    value="Dhuafa"
                  />
                  <Picker.Item
                    style={{ fontSize: 14, fontFamily: 'Poppins-Regular' }}
                    label="Non-Dhuafa"
                    value="Non_Dhuafa"
                  />
                </Picker>
              </View>


              {this.state.show === 1 && this.state.SOT === 'Dhuafa' ? (

                <View>
                  <Text style={style.Label3}>Foto SKTM</Text>
                  <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 20 }}>
                    <TouchableOpacity onPress={() => { this.takePicSKTM() }} style={{
                      width: '90%',
                      backgroundColor: '#ffffff',
                      borderRadius: 5,
                      marginTop: 5,
                      paddingTop: 40,
                      paddingBottom: 40,
                      paddingLeft: 30,
                      paddingRight: 30,
                      borderWidth: 0.5,
                      borderColor: '#E9E9E9',
                      justifyContent: 'center', alignItems: 'center'
                    }}>
                      {this.state.image}
                      <Camera style={style.imgSmall} />
                      {/* {this.state.sktm === null ?
                        <View>
                          <Text>+ Tambah Surat SKTM</Text>
                        </View>
                        : <View></View>} */}
                    </TouchableOpacity>
                  </View>
                </View>
              ) : this.state.show === 1 && this.state.SOT === 'Yatim' ? (
                <View>
                  <Text style={style.Label3}>Foto SKTM</Text>
                  <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 20 }}>
                    <TouchableOpacity onPress={() => { this.takePicSKTM() }} style={{
                      width: '90%',
                      backgroundColor: '#ffffff',
                      borderRadius: 5,
                      marginTop: 5,
                      paddingTop: 40,
                      paddingBottom: 40,
                      paddingLeft: 30,
                      paddingRight: 30,
                      borderWidth: 0.5,
                      borderColor: '#E9E9E9',
                      justifyContent: 'center', alignItems: 'center'
                    }}>
                      <Image source={this.state.sktm} style={{ width: 150, height: 150 }} />
                      <Camera style={style.imgSmall} />
                    </TouchableOpacity>
                  </View>

                  <Text style={style.Label3}>Surat Keterangan Yatim</Text>
                  <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 20 }}>
                    <TouchableOpacity onPress={() => { this.takePicSURKET() }} style={{
                      width: '90%',
                      backgroundColor: '#ffffff',
                      borderRadius: 5,
                      marginTop: 5,
                      paddingTop: 40,
                      paddingBottom: 40,
                      paddingLeft: 30,
                      paddingRight: 30,
                      borderWidth: 0.5,
                      borderColor: '#E9E9E9',
                      justifyContent: 'center', alignItems: 'center'
                    }}>
                      <Image source={this.state.surket} style={{ width: 150, height: 150 }} />
                      <Camera style={style.imgSmall} />
                    </TouchableOpacity>
                  </View>
                </View>
              ) : this.state.show === 1 && this.state.SOT === 'Piatu' ? (
                <View>
                  <Text style={style.Label3}>Foto SKTM</Text>
                  <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 20 }}>
                    <TouchableOpacity onPress={() => { this.takePicSKTM() }} style={{
                      width: '90%',
                      backgroundColor: '#ffffff',
                      borderRadius: 5,
                      marginTop: 5,
                      paddingTop: 40,
                      paddingBottom: 40,
                      paddingLeft: 30,
                      paddingRight: 30,
                      borderWidth: 0.5,
                      borderColor: '#E9E9E9',
                      justifyContent: 'center', alignItems: 'center'
                    }}>
                      <Image source={this.state.sktm} style={{ width: 150, height: 150 }} />
                      <Camera style={style.imgSmall} />
                    </TouchableOpacity>
                  </View>

                  <Text style={style.Label3}>Surat Keterangan Piatu</Text>
                  <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 20 }}>
                    <TouchableOpacity onPress={() => { this.takePicSURKET() }} style={{
                      width: '90%',
                      backgroundColor: '#ffffff',
                      borderRadius: 5,
                      marginTop: 5,
                      paddingTop: 40,
                      paddingBottom: 40,
                      paddingLeft: 30,
                      paddingRight: 30,
                      borderWidth: 0.5,
                      borderColor: '#E9E9E9',
                      justifyContent: 'center', alignItems: 'center'
                    }}>
                      <Image source={this.state.surket} style={{ width: 150, height: 150 }} />
                      <Camera style={style.imgSmall} />
                    </TouchableOpacity>
                  </View>
                </View>
              ) : this.state.show === 1 && this.state.SOT === 'Yatim_Piatu' ? (
                <View>
                  <Text style={style.Label3}>Foto SKTM</Text>
                  <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 20 }}>
                    <TouchableOpacity onPress={() => { this.takePicSKTM() }} style={{
                      width: '90%',
                      backgroundColor: '#ffffff',
                      borderRadius: 5,
                      marginTop: 5,
                      paddingTop: 40,
                      paddingBottom: 40,
                      paddingLeft: 30,
                      paddingRight: 30,
                      borderWidth: 0.5,
                      borderColor: '#E9E9E9',
                      justifyContent: 'center', alignItems: 'center'
                    }}>
                      <Image source={this.state.sktm} style={{ width: 150, height: 150 }} />
                      <Camera style={style.imgSmall} />
                    </TouchableOpacity>
                  </View>
                  <Text style={style.Label3}>Surat Keterangan Yatim Piatu</Text>
                  <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 20 }}>
                    <TouchableOpacity onPress={() => { this.takePicSURKET() }} style={{
                      width: '90%',
                      backgroundColor: '#ffffff',
                      borderRadius: 5,
                      marginTop: 5,
                      paddingTop: 40,
                      paddingBottom: 40,
                      paddingLeft: 30,
                      paddingRight: 30,
                      borderWidth: 0.5,
                      borderColor: '#E9E9E9',
                      justifyContent: 'center', alignItems: 'center'
                    }}>
                      <Image source={this.state.surket} style={{ width: 150, height: 150 }} />
                      <Camera style={style.imgSmall} />
                    </TouchableOpacity>
                  </View>
                </View>
              ) : (
                <></>
              )}
              <View>
                <Text style={style.Label3}>Memiliki Rekening Bank</Text>
                <RadioForm
                  radio_props={bank}
                  onPress={value => {
                    this.setState({ bank: value }),
                      ToastAndroid.show(value.toString(), ToastAndroid.SHORT);
                  }}
                  initial={1}
                  buttonSize={10}
                  buttonOuterSize={20}
                  animation={true}
                  formHorizontal={false}
                  buttonColor='#000'
                  style={{
                    flexDirection: 'row',
                    marginTop: 10,
                    justifyContent: 'space-evenly',
                    marginLeft: -90,
                  }}></RadioForm>

                {this.state.bank === 'Ya' ? (
                  <View style={{}}>
                    <TextInput
                      style={style.kotak3}
                      onChangeText={norek => this.setState({ norek })}
                      value={this.state.norek}
                      placeholder="No. Rekening"
                      placeholderTextColor="#C0C0C0"
                      keyboardType='numeric'
                    />
                    <TextInput
                      style={style.kotak3}
                      onChangeText={an_rek => this.setState({ an_rek })}
                      value={this.state.an_rek}
                      placeholder="Atas Nama"
                      placeholderTextColor="#C0C0C0"
                      keyboardType='numeric'
                    />
                  </View>
                ) : (
                  <View></View>
                )}
              </View>
              <View>
                <Text style={style.Label3}>Memiliki No Telepon</Text>
                <RadioForm
                  radio_props={notelp}
                  onPress={value => {
                    this.setState({ notelp: value }),
                      ToastAndroid.show(value.toString(), ToastAndroid.SHORT);
                  }}
                  initial={1}
                  buttonSize={10}
                  buttonOuterSize={20}
                  animation={true}
                  formHorizontal={false}
                  buttonColor='#000'
                  style={{
                    flexDirection: 'row',
                    marginTop: 10,
                    justifyContent: 'space-evenly',
                    marginLeft: -90,
                  }}></RadioForm>

                {this.state.notelp === 'Ya' ? (
                  <View style={{}}>
                    <TextInput
                      style={style.kotak3}
                      onChangeText={nohp => this.setState({ nohp })}
                      value={this.state.nohp}
                      placeholder="No.HP"
                      placeholderTextColor="#C0C0C0"
                      keyboardType='numeric'
                    />
                    <TextInput
                      style={style.kotak3}
                      onChangeText={an_hp => this.setState({ an_hp })}
                      value={this.state.an_hp}
                      placeholder="No.HP"
                      placeholderTextColor="#C0C0C0"
                      keyboardType='numeric'
                    />
                  </View>
                ) : (
                  <View></View>
                )}
              </View>
            </View>
          </ProgressStep>


          <ProgressStep
            nextBtnTextStyle={nextbuttonTextStyle}
            nextBtnText="Selanjutnya"
            previousBtnTextStyle={previousbuttonTextStyle}
            previousBtnText="Kembali">
            <View style={{ height: '100%' }}>
              <Text style={style.Label2}>Jenjang Pendidikan</Text>
              <RadioForm
                radio_props={tingkat}
                onPress={(value) => {
                  this.setState({ tingkat: value }),
                    ToastAndroid.show(value.toString(), ToastAndroid.SHORT)
                }}
                initial={0}
                buttonSize={10}
                buttonOuterSize={20}
                animation={true}
                formHorizontal={false}
                style={{ flexDirection: 'column', marginLeft: 15, marginTop: 10 }}
              >
              </RadioForm>
              {this.state.tingkat === 'SD' ?
                <View >
                  <Text>Kelas</Text>
                  <View style={style.kotakpicker}>
                    <Picker style={style.Textinputcss} mode="dropdown"
                      selectedValue={this.state.kelas}
                      onValueChange={(itemValue) => {
                        this.setState({
                          ag: itemValue
                        })
                      }}>
                      <Picker.Item style={{ fontSize: 12 }} label={'Pilih Kelas'} value={'0'} key={'0'} />
                      <Picker.Item label="I" value="I" />
                      <Picker.Item label="II" value="II" />
                      <Picker.Item label="III" value="III" />
                      <Picker.Item label="IV" value="IV" />
                      <Picker.Item label="V" value="V" />
                      <Picker.Item label="VI" value="VI" />

                    </Picker>
                  </View>
                  <View>
                    <TextInput
                      style={style.kotak3}
                      onChangeText={namasek => this.setState({ namasek })}
                      value={this.state.namasek}
                      keyboardType='default'
                      placeholder="Nama Sekolah"
                      placeholderTextColor='#7e7e7e'
                    />
                  </View>

                  <View>
                    <View style={style.infoContainer} >
                      <TextInput style={style.txtDesc} placeholder="Alamat Lengkap"
                        placeholderTextColor='#A9A9A9'
                        keyboardType="email-address"
                        value={this.state.alamatsek}
                        onChangeText={alamat => this.setState({ alamat })}
                        multiline={true}
                        numberOfLines={5}
                        autoCorrect={false}>
                      </TextInput>
                    </View>
                  </View>

                </View>

                : this.state.tingkat === 'SMP' ?
                  <View>
                    <View style={style.kotakpicker}>
                      <Picker style={style.Textinputcss} mode="dropdown"
                        selectedValue={this.state.kelas}
                        onValueChange={(itemValue) => {
                          this.setState({
                            kel: itemValue
                          })
                        }}>
                        <Picker.Item style={{ fontSize: 12 }} label={'Pilih Kelas'} value={'0'} key={'0'} />
                        <Picker.Item label="VII" value="VII" />
                        <Picker.Item label="VIII" value="VIII" />
                        <Picker.Item label="IX" value="IX" />
                      </Picker>
                    </View>
                    <View>
                      <TextInput
                        style={style.kotak3}
                        onChangeText={namasek => this.setState({ namasek })}
                        value={this.state.namasek}
                        keyboardType='default'
                        placeholder="Nama Sekolah"
                        placeholderTextColor='#7e7e7e'
                      />
                    </View>

                    <View>
                      <View style={style.infoContainer} >
                        <TextInput style={style.txtDesc} placeholder="Alamat Lengkap"
                          placeholderTextColor='#A9A9A9'
                          keyboardType="email-address"
                          value={this.state.alamatsek}
                          onChangeText={alamat => this.setState({ alamat })}
                          multiline={true}
                          numberOfLines={5}
                          autoCorrect={false}>
                        </TextInput>
                      </View>
                    </View>

                  </View>
                  : this.state.tingkat === 'SMA' ?
                    <View>
                      <View style={style.kotakpicker}>
                        <Picker style={style.Textinputcss} mode="dropdown"
                          selectedValue={this.state.kelas}
                          onValueChange={(itemValue) => {
                            this.setState({
                              kel: itemValue
                            })
                          }}>
                          <Picker.Item style={{ fontSize: 12 }} label={'Pilih Kelas'} value={'0'} key={'0'} />
                          <Picker.Item label="X" value="X" />
                          <Picker.Item label="XI" value="XI" />
                          <Picker.Item label="XII" value="XII" />
                        </Picker>
                      </View>

                      <View>
                        <TextInput
                          style={style.kotak3}
                          onChangeText={namasek => this.setState({ namasek })}
                          value={this.state.namasek}
                          keyboardType='default'
                          placeholder="Nama Sekolah"
                          placeholderTextColor='#7e7e7e'
                        />
                      </View>
                      <View>
                        <View style={style.infoContainer} >
                          <TextInput style={style.txtDesc} placeholder="Alamat Lengkap"
                            placeholderTextColor='#A9A9A9'
                            keyboardType="email-address"
                            value={this.state.alamatsek}
                            onChangeText={alamat => this.setState({ alamat })}
                            multiline={true}
                            numberOfLines={5}
                            autoCorrect={false}>
                          </TextInput>
                        </View>
                      </View>


                    </View>
                    : this.state.tingkat === 'Perguruan_Tinggi' ?
                      <View >
                        <View>
                          <Text style={style.Label1}>Jurusan</Text>
                          <TextInput
                            style={style.kotak3}
                            onChangeText={jurusan => this.setState({ jurusan })}
                            value={this.state.jurusan}
                            keyboardType='default'
                            placeholder="Jurusan"
                            placeholderTextColor='#7e7e7e'
                          />
                        </View>
                        <View style={style.kotakpicker}>
                          <Picker style={style.Textinputcss} mode="dropdown"
                            selectedValue={this.state.semester}
                            onValueChange={(itemValue) => {
                              this.setState({
                                sem: itemValue
                              })
                            }}>
                            <Picker.Item style={{ fontSize: 12 }} label={'Pilih Semester'} value={'0'} key={'0'} />
                            <Picker.Item label="Semester 1" value="Semester 1" />
                            <Picker.Item label="Semester 2" value="Semester 2" />
                            <Picker.Item label="Semester 3" value="Semester 3" />
                            <Picker.Item label="Semester 4" value="Semester 4" />
                            <Picker.Item label="Semester 5" value="Semester 5" />
                            <Picker.Item label="Semester 6" value="Semester 6" />
                            <Picker.Item label="Semester 7" value="Semester 7" />
                            <Picker.Item label="Semester 8" value="Semester 8" />
                            <Picker.Item label="Semester 9" value="Semester 9" />
                            <Picker.Item label="Semester 10" value="Semester 10" />

                          </Picker>
                        </View>
                        <View>
                          <TextInput
                            style={style.kotak3}
                            onChangeText={namasek => this.setState({ namasek })}
                            value={this.state.namasek}
                            keyboardType='default'
                            placeholder="Nama Sekolah"
                            placeholderTextColor='#7e7e7e'
                          />
                        </View>

                        <View>
                          <View style={style.infoContainer} >
                            <TextInput style={style.txtDesc} placeholder="Alamat Lengkap"
                              placeholderTextColor='#A9A9A9'
                              keyboardType="email-address"
                              value={this.state.alamatsek}
                              onChangeText={alamat => this.setState({ alamat })}
                              multiline={true}
                              numberOfLines={5}
                              autoCorrect={false}>
                            </TextInput>
                          </View>
                        </View>

                      </View>
                      :
                      <View></View>
              }

            </View>
          </ProgressStep>


          <ProgressStep
            nextBtnTextStyle={nextbuttonTextStyle}
            nextBtnText="Selanjutnya"
            previousBtnTextStyle={previousbuttonTextStyle}
            previousBtnText="Kembali">
            <View style={{ height: '100%' }}>
              <Text style={style.Label2}>Informasi Anak</Text>

              <TextInput
                style={style.kotak3}
                onChangeText={nikanak => this.setState({ nikanak })}
                value={this.state.nikanak}
                placeholder="NIK"
                placeholderTextColor="#C0C0C0"
              />
              <TextInput
                style={style.kotak3}
                onChangeText={namaanak => this.setState({ namaanak })}
                value={this.state.namaanak}
                placeholder="Nama Lengkap"
                placeholderTextColor="#C0C0C0"
              />
              <TextInput
                style={style.kotak3}
                onChangeText={panggilan => this.setState({ panggilan })}
                value={this.state.panggilan}
                placeholder="Nama Panggilan"
                placeholderTextColor="#C0C0C0"
              />
              <View style={style.kotakpicker}>
                <Picker
                  style={style.Textinputcss}
                  selectedValue={this.state.agama}
                  onValueChange={itemValue =>
                    this.setState({ agama: itemValue, show: 1 })
                  }>
                  <Picker.Item
                    style={{ fontSize: 14, fontFamily: 'Poppins-Regular' }}
                    label="Agama" s
                    value=""
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
              <Text style={style.kotak7}>{this.state.region.longitude != '' ? this.state.region.longitude : 'Masukan longitude'}</Text>
              <View style={{ flexDirection: 'row' }}>
                <Text style={style.kotak7}>{this.state.region.latitude != '' ? this.state.region.latitude : 'Masukan latitude'}</Text>
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
                  <TouchableOpacity onPress={() => { this.props.navigation.navigate('ambil') }}>
                    <View style={{ height: 50, width: 50, justifyContent: 'center', alignItems: 'center', borderRadius: 10, }}>
                      <Markers />
                    </View>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={{ flexDirection: 'row' }}>
                <TextInput
                  style={style.kotak7}
                  onChangeText={chosenDate => this.setState({ chosenDate })}
                  value={this.state.chosenDate}
                  placeholder="Tanggal Lahir"
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
                  <TouchableOpacity TouchableOpacity onPress={this.showPicker}>
                    <View style={{ height: 50, width: 50, justifyContent: 'center', alignItems: 'center', borderRadius: 10, }}>
                      <Date />
                    </View>
                  </TouchableOpacity>
                </View>
                <DateTimePicker
                  isVisible={this.state.isVisible}
                  onConfirm={this.handlePicker}
                  onCancel={this.hidePicker}
                  mode={'date'}
                  is24Hour={true}
                />
              </View>

              <View
                style={style.kotakpicker}>
                <Picker
                  style={style.Textinputcss}
                  selectedValue={this.state.JKanak}
                  onValueChange={itemValue =>
                    this.setState({ JK: itemValue, show: 1 })
                  }>
                  <Picker.Item
                    style={{ fontSize: 14, fontFamily: 'Poppins-Regular' }}
                    label="Jenis Kelamin"
                    value=""
                  />
                  <Picker.Item
                    style={{ fontSize: 14, fontFamily: 'Poppins-Regular' }}
                    label="Laki-Laki"
                    value="Laki-Laki"
                  />
                  <Picker.Item
                    style={{ fontSize: 14, fontFamily: 'Poppins-Regular' }}
                    label="Perempuan"
                    value="Perempuan"
                  />
                </Picker>
              </View>

              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ color: '#000', fontSize: 16, fontFamily: 'Poppins-Regular' }}> Anak ke</Text>
                <TextInput
                  style={style.kotak6}
                  onChangeText={ke => this.setState({ ke })}
                  value={this.state.ke}
                  placeholder="Anak ke"
                  placeholderTextColor="#C0C0C0"
                />
                <Text style={{ color: '#000', color: '#000', fontSize: 16, fontFamily: 'Poppins-Regular' }}> dari</Text>
                <TextInput
                  style={style.kotak6}
                  onChangeText={saudara => this.setState({ saudara })}
                  value={this.state.saudara}
                  placeholder="Saudara"
                  placeholderTextColor="#C0C0C0"
                />
              </View>
              <View
                style={style.kotakpicker}>
                <Picker
                  style={style.Textinputcss}
                  selectedValue={this.state.TB}
                  onValueChange={itemValue =>
                    this.setState({ TB: itemValue, show: 1 })
                  }>
                  <Picker.Item
                    style={{ fontSize: 14, fontFamily: 'Poppins-Regular' }}
                    label="Tinggal Bersama"
                    value=""
                  />
                  {sm.map(({ label, value, index }) => (
                    <Picker.Item style={{ fontSize: 14, fontFamily: 'Poppins-Regular' }} label={label} value={value} key={index} />
                  ))}
                </Picker>
              </View>


              <TextInput
                style={style.kotak3}
                onChangeText={pelfa => this.setState({ pelfa })}
                value={this.state.pelfa}
                placeholder="Pelajaran Favorit"
                placeholderTextColor="#C0C0C0"
              />
              <TextInput
                style={style.kotak3}
                onChangeText={hobi => this.setState({ hobi })}
                value={this.state.hobi}
                placeholder="Hobi"
                placeholderTextColor="#C0C0C0"
              />
              <View
                style={style.kotakpicker}>
                <Picker
                  style={style.Textinputcss}
                  selectedValue={this.state.JB}
                  onValueChange={itemValue =>
                    this.setState({ JB: itemValue, show: 0 })
                  }>
                  <Picker.Item
                    style={{ fontSize: 14, fontFamily: 'Poppins-Regular' }}
                    label="Jenis Binaan"
                    value=""
                  />
                  {bina.map(({ label, value, index }) => (
                    <Picker.Item style={{ fontSize: 14, fontFamily: 'Poppins-Regular' }} label={label} value={value} key={index} />
                  ))}
                </Picker>


              </View>

              <Text style={{ color: '#000', color: '#000', fontSize: 16, fontFamily: 'Poppins-Regular', marginTop: 10 }}>Jenis Anak</Text>

              <RadioForm
                radio_props={jenisanak}
                onPress={value => {
                  this.setState({ bank: jenisanak }),
                    ToastAndroid.show(value.toString(), ToastAndroid.SHORT);
                }}
                initial={1}
                buttonSize={10}
                buttonOuterSize={20}
                animation={true}
                formHorizontal={false}
                buttonColor='#000'
                style={{
                  flexDirection: 'row',
                  marginTop: 10,
                  justifyContent: 'space-evenly',
                  marginLeft: -40,
                }}></RadioForm>
              <Text style={{ color: '#000', color: '#000', fontSize: 16, fontFamily: 'Poppins-Regular', marginTop: 10 }}>Foto Anak</Text>

              <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 20 }}>
                <TouchableOpacity onPress={() => { this.takePicAnak() }} style={{
                  width: '90%',
                  backgroundColor: '#ffffff',
                  borderRadius: 5,
                  marginTop: 5,
                  paddingTop: 40,
                  paddingBottom: 40,
                  paddingLeft: 30,
                  paddingRight: 30,
                  borderWidth: 0.5,
                  borderColor: '#E9E9E9',
                  justifyContent: 'center', alignItems: 'center'
                }}>
                  <Image source={this.state.anakfoto} style={{ width: 150, height: 150 }} />
                  <Camera style={style.imgSmall} />

                  {this.state.anakfoto === null ?
                    <View>

                    </View>
                    : <View><Text style={{ backgroundColor: '#00A9B8', borderRadius: 10, padding: 10, color: '#fff', marginTop: 10, }}>Masukan Foto Anak</Text></View>}
                </TouchableOpacity>
              </View>

            </View>

          </ProgressStep>



          <ProgressStep
            nextBtnTextStyle={nextbuttonTextStyle}
            nextBtnText="Selanjutnya"
            previousBtnTextStyle={previousbuttonTextStyle}
            previousBtnText="Kembali"
          >
            <View style={{ height: "100%" }}>
              <View>
                <Text style={style.Label2}>Informasi Ayah</Text>
                <TextInput
                  style={style.kotak3}
                  editable={this.state.SOT === 'Yatim_Piatu' ? false : true && this.state.SOT === 'Yatim' ? false : true}
                  onChangeText={nikayah => this.setState({ nikayah })}
                  value={this.state.ayah}
                  placeholder="NIK Ayah"
                  placeholderTextColor="#C0C0C0"
                />
                <TextInput
                  style={style.kotak3}
                  onChangeText={ayah => this.setState({ ayah })}
                  value={this.state.ayah}
                  placeholder="Nama Ayah"
                  placeholderTextColor="#C0C0C0"
                />
                <View
                  style={style.kotakpicker}>
                  <Picker
                    style={style.Textinputcss}
                    selectedValue={this.state.agamaayah}
                    onValueChange={itemValue =>
                      this.setState({ agamaayah: itemValue, show: 1 })
                    }>
                    <Picker.Item
                      style={{ fontSize: 14, fontFamily: 'Poppins-Regular' }}
                      label="Agama"
                      value=""
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

                <TextInput
                  style={style.kotak3}
                  onChangeText={temayah => this.setState({ temayah })}
                  value={this.state.temayah}
                  placeholder="Tempat Lahir"
                  placeholderTextColor="#C0C0C0"
                />
                <View style={{ flexDirection: 'row' }}>
                  <TextInput
                    style={style.kotak7}
                    editable={false}
                    onChangeText={chosenDate2 => this.setState({ chosenDate2 })}
                    value={this.state.chosenDate2}
                    placeholder="Tanggal Lahir"
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
                    <TouchableOpacity TouchableOpacity onPress={this.showPicker}>
                      <View style={{ height: 50, width: 50, justifyContent: 'center', alignItems: 'center', borderRadius: 10, }}>
                        <Date />
                      </View>
                    </TouchableOpacity>
                  </View>


                  <DateTimePicker
                    isVisible={this.state.isVisible}
                    onConfirm={this.handlePicker2}
                    onCancel={this.hidePicker}
                    mode={'date'}
                    is24Hour={true}
                  />
                </View>

                <View
                  style={style.kotakpicker}>
                  <Picker
                    enabled={this.state.SOT === 'Yatim_Piatu' ? false : true && this.state.SOT === 'Yatim' ? false : true}
                    selectedValue={this.state.provayah}
                    onValueChange={(itemValue) => {
                      this.setState({
                        provayah: itemValue
                      })
                    }}>
                    <Picker.Item style={{ fontSize: 12 }} label={'Pilih Provinsi'} value={'0'} key={'0'} />

                    {
                      this.state.prov.map((provayah) =>
                        <Picker.Item style={{ height: '100%', width: '100%', fontSize: 12, }} label={provayah.nama.toString()} value={provayah.id_prov} key={provayah.id_prov} />
                      )}
                  </Picker>
                </View>

                <View
                  style={style.kotakpicker}>
                  <Picker
                    enabled={this.state.SOT === 'Yatim_Piatu' ? false : true && this.state.SOT === 'Yatim' ? false : true}
                    selectedValue={this.state.kabayah}
                    onFocus={() => { this.GetkotaAPi() }}
                    onValueChange={(itemValue, prov) => {
                      this.setState({
                        kabayah: itemValue
                      })
                    }}>
                    <Picker.Item style={{ fontSize: 12 }} label={'Pilih Kabupaten'} value={'0'} key={'0'} />

                    {
                      this.state.kota.map((kabayah) =>
                        <Picker.Item style={{ height: '100%', width: '100%', fontSize: 12, }} label={kabayah.nama.toString()} value={kabayah.id_kab} key={kabayah.id_kab} />
                      )}
                  </Picker>
                </View>
                <View
                  style={style.kotakpicker}>
                  <Picker
                    enabled={this.state.SOT === 'Yatim_Piatu' ? false : true && this.state.SOT === 'Yatim' ? false : true}
                    selectedValue={this.state.kecayah}
                    onFocus={() => { this.GetkecAPi() }}
                    onValueChange={(itemValue, kota) => {
                      this.setState({
                        kecayah: (itemValue)
                      })
                    }}>
                    <Picker.Item style={{ fontSize: 12 }} label={'Pilih Kecamatan'} value={'0'} key={'0'} />

                    {
                      this.state.kecamatan.map((kecayah) =>
                        <Picker.Item style={{ height: '100%', width: '100%', fontSize: 12, }} label={kecayah.nama} value={kecayah.id_kec} key={kecayah.id_kec} />
                      )}
                  </Picker>
                </View>
                <View
                  style={style.kotakpicker}>
                  <Picker
                    enabled={this.state.SOT === 'Yatim_Piatu' ? false : true && this.state.SOT === 'Yatim' ? false : true}
                    selectedValue={this.state.kelayah}
                    onFocus={() => { this.GetkelAPi() }}
                    onValueChange={(itemValue, kecamatan) => {
                      this.setState({
                        kelayah: (itemValue)
                      })
                    }}>
                    <Picker.Item style={{ fontSize: 12 }} label={'Pilih Kelurahan'} value={'0'} key={'0'} />
                    {
                      this.state.kelurahan.map((kelayah) =>
                        <Picker.Item style={{ height: '100%', width: '100%', fontSize: 12, }} label={kelayah.nama.toString()} value={kelayah.id_kel} key={kecayah.id_kel} />
                      )}
                  </Picker>
                </View>

                <View style={style.kotakpicker}>
                  <Picker style={style.Textinputcss} mode="dropdown"
                    selectedValue={this.state.penghasilanayah}
                    enabled={this.state.SOT === 'Yatim_Piatu' ? false : true && this.state.SOT === 'Yatim' ? false : true}
                    onValueChange={(itemValue,) => {
                      this.setState({
                        penghasilanayah: itemValue
                      })
                    }}>
                    <Picker.Item style={{ fontSize: 12 }} label={'Pilih Penghasilan'} value={'0'} key={'0'} />
                    <Picker.Item label="Dibawah Rp.500.000,-" value="Kakak" />
                    <Picker.Item label="Rp.500.000,- s/d Rp.1.500.000,-" value="1" />
                    <Picker.Item label="Rp.1.500.000,- s/d Rp.2.500.000,-" value="2" />
                    <Picker.Item label="Rp.2.500.000,- s/d Rp.3.500.000,-" value="3" />
                    <Picker.Item label="Rp.3.500.000,- s/d Rp.5.000.000,-" value="4" />
                    <Picker.Item label="Rp.5.000.000,- s/d Rp.7.000.000,-" value="5" />
                    <Picker.Item label="Rp.7.000.000,- s/d Rp.10.000.000,-" value="6" />
                    <Picker.Item label="Diatas Rp.10.000.000,-" value="7" />
                  </Picker>
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <TextInput
                    style={style.kotak7}
                    editable={false}
                    onChangeText={chosenDate3 => this.setState({ chosenDate3 })}
                    value={this.state.chosenDate3}
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
                    <TouchableOpacity TouchableOpacity onPress={this.showPicker}>
                      <View style={{ height: 50, width: 50, justifyContent: 'center', alignItems: 'center', borderRadius: 10, }}>
                        <Date />
                      </View>
                    </TouchableOpacity>
                  </View>
                  <DateTimePicker
                    isVisible={this.state.isVisible}
                    onConfirm={this.handlePicker3}
                    onCancel={this.hidePicker}
                    mode={'date'}
                    is24Hour={true}
                  />
                </View>
                <TextInput
                  style={style.kotak3}
                  onChangeText={text => this.setState({ text })}
                  value={this.state.penyebabayah}
                  placeholder="Penyebab Kematian"
                  keyboardType='numberic'
                  placeholderTextColor="#C0C0C0"
                />
              </View>



              <View>
                <Text style={[style.Label2, { marginTop: 20 }]}>Informasi Ibu</Text>
                <TextInput
                  style={style.kotak3}
                  onChangeText={nikibu => this.setState({ nikibu })}
                  value={this.state.nikibu}
                  placeholder="NIK Ibu"
                  placeholderTextColor="#C0C0C0"
                />
                <TextInput
                  style={style.kotak3}
                  onChangeText={nikibu => this.setState({ nikibu })}
                  value={this.state.ibu}
                  placeholder="Nama Ibu"
                  placeholderTextColor="#C0C0C0"
                />
                <View
                  style={style.kotakpicker}>
                  <Picker
                    style={style.Textinputcss}
                    selectedValue={this.state.agamaibu}
                    onValueChange={itemValue =>
                      this.setState({ agama: itemValue, show: 1 })
                    }>
                    <Picker.Item
                      style={{ fontSize: 14, fontFamily: 'Poppins-Regular' }}
                      label="Agama"
                      value=""
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
                <TextInput
                  style={style.kotak3}
                  onChangeText={temibu => this.setState({ temibu })}
                  value={this.state.temibu}
                  placeholder="Tempat Lahir"
                  placeholderTextColor="#C0C0C0"
                />
                <View style={{ flexDirection: 'row' }}>
                  <TextInput
                    style={style.kotak7}
                    editable={false}
                    onChangeText={chosenDate4 => this.setState({ chosenDate4 })}
                    value={this.state.chosenDate4}
                    placeholder="Tanggal Lahir"
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
                    <TouchableOpacity TouchableOpacity onPress={this.showPicker}>
                      <View style={{ height: 50, width: 50, justifyContent: 'center', alignItems: 'center', borderRadius: 10, }}>
                        <Date />
                      </View>
                    </TouchableOpacity>
                  </View>
                  <DateTimePicker
                    isVisible={this.state.isVisible}
                    onConfirm={this.handlePicker5}
                    onCancel={this.hidePicker}
                    mode={'date'}
                    is24Hour={true}
                  />
                </View>
                <View
                  style={style.kotakpicker}>
                  <Picker
                    enabled={this.state.SOT === 'Yatim_Piatu' ? false : true && this.state.SOT === 'Piatu' ? false : true}
                    selectedValue={this.state.provibu}
                    onValueChange={(itemValue) => {
                      this.setState({
                        provibu: itemValue
                      })
                    }}>
                    <Picker.Item style={{ fontSize: 12 }} label={'Pilih Provinsi'} value={'0'} key={'0'} />

                    {
                      this.state.prov.map((provibu) =>
                        <Picker.Item style={{ height: '100%', width: '100%', fontSize: 12, }} label={provibu.nama.toString()} value={provibu.id_prov} key={provibu.id_prov} />
                      )}
                  </Picker>
                </View>

                <View
                  style={style.kotakpicker}>
                  <Picker
                    enabled={this.state.SOT === 'Yatim_Piatu' ? false : true && this.state.SOT === 'Piatu' ? false : true}
                    selectedValue={this.state.kabibu}
                    onFocus={() => { this.GetkotaAPi() }}
                    onValueChange={(itemValue, prov) => {
                      this.setState({
                        kabibu: itemValue
                      })
                    }}>
                    <Picker.Item style={{ fontSize: 12 }} label={'Pilih Kabupaten'} value={'0'} key={'0'} />

                    {
                      this.state.kota.map((kabibu) =>
                        <Picker.Item style={{ height: '100%', width: '100%', fontSize: 12, }} label={kabibu.nama.toString()} value={kabibu.id_kab} key={kabibu.id_kab} />
                      )}
                  </Picker>
                </View>
                <View
                  style={style.kotakpicker}>
                  <Picker
                    enabled={this.state.SOT === 'Yatim_Piatu' ? false : true && this.state.SOT === 'Piatu' ? false : true}
                    selectedValue={this.state.kecibu}
                    onFocus={() => { this.GetkecAPi() }}
                    onValueChange={(itemValue, kota) => {
                      this.setState({
                        kecibu: (itemValue)
                      })
                    }}>
                    <Picker.Item style={{ fontSize: 12 }} label={'Pilih Kecamatan'} value={'0'} key={'0'} />

                    {
                      this.state.kecamatan.map((kecibu) =>
                        <Picker.Item style={{ height: '100%', width: '100%', fontSize: 12, }} label={kecibu.nama} value={kecibu.id_kec} key={kecibu.id_kec} />
                      )}
                  </Picker>
                </View>
                <View
                  style={style.kotakpicker}>
                  <Picker
                    enabled={this.state.SOT === 'Yatim_Piatu' ? false : true && this.state.SOT === 'Yatim' ? false : true}
                    selectedValue={this.state.kelibu}
                    onFocus={() => { this.GetkelAPi() }}
                    onValueChange={(itemValue, kecamatan) => {
                      this.setState({
                        kelibu: (itemValue)
                      })
                    }}>
                    <Picker.Item style={{ fontSize: 12 }} label={'Pilih Kelurahan'} value={'0'} key={'0'} />
                    {
                      this.state.kelurahan.map((kelibu) =>
                        <Picker.Item style={{ height: '100%', width: '100%', fontSize: 12, }} label={kelibu.nama.toString()} value={kelibu.id_kel} key={kelibu.id_kel} />
                      )}
                  </Picker>
                </View>

                <View style={style.kotakpicker}>
                  <Picker style={style.Textinputcss} mode="dropdown"
                    selectedValue={this.state.penghasilanibu}
                    enabled={this.state.SOT === 'Yatim_Piatu' ? false : true && this.state.so === 'Yatim' ? false : true}
                    onValueChange={(itemValue,) => {
                      this.setState({
                        penghasilanibu: itemValue
                      })
                    }}>
                    <Picker.Item style={{ fontSize: 12 }} label={'Pilih Penghasilan'} value={'0'} key={'0'} />
                    <Picker.Item label="Dibawah Rp.500.000,-" value="" />
                    <Picker.Item label="Rp.500.000,- s/d Rp.1.500.000,-" value="1" />
                    <Picker.Item label="Rp.1.500.000,- s/d Rp.2.500.000,-" value="2" />
                    <Picker.Item label="Rp.2.500.000,- s/d Rp.3.500.000,-" value="3" />
                    <Picker.Item label="Rp.3.500.000,- s/d Rp.5.000.000,-" value="4" />
                    <Picker.Item label="Rp.5.000.000,- s/d Rp.7.000.000,-" value="5" />
                    <Picker.Item label="Rp.7.000.000,- s/d Rp.10.000.000,-" value="6" />
                    <Picker.Item label="Diatas Rp.10.000.000,-" value="7" />
                  </Picker>
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <TextInput
                    style={style.kotak7}
                    editable={false}
                    onChangeText={chosenDate5 => this.setState({ chosenDate5 })}
                    value={this.state.chosenDate5}
                    placeholder="Tanggal Lahir"
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
                    <TouchableOpacity TouchableOpacity onPress={this.showPicker}>
                      <View style={{ height: 50, width: 50, justifyContent: 'center', alignItems: 'center', borderRadius: 10, }}>
                        <Date />
                      </View>
                    </TouchableOpacity>
                  </View>
                  <DateTimePicker
                    isVisible={this.state.isVisible}
                    onConfirm={this.handlePicker4}
                    onCancel={this.hidePicker}
                    mode={'date'}
                    is24Hour={true}
                  />
                </View>
                <TextInput
                  style={style.kotak3}
                  onChangeText={penyebabibu => this.setState({ penyebabibu })}
                  value={this.state.penyebabibu}
                  placeholder="Penyebab Kematian"
                  keyboardType='numberic'
                  placeholderTextColor="#C0C0C0"
                />
              </View>


            </View>
          </ProgressStep>


          <ProgressStep
            nextBtnTextStyle={finishbuttonTextStyle}
            finishBtnText="Selesai"
            nextBtnText="Selanjutnya"
            previousBtnDisabled={previousbuttonTextStyle}
            previousBtnText="  "
          >

            <View >
              <Text style={style.Label2}>Informasi Wali</Text>

              <TextInput
                style={style.kotak3}
                onChangeText={nikwali => this.setState({ nikwali })}
                value={this.state.nikwali}
                placeholder="NIK Wali"
                placeholderTextColor="#C0C0C0"
              />
              <TextInput
                style={style.kotak3}
                onChangeText={wali => this.setState({ wali })}
                value={this.state.wali}
                placeholder="Nama Wali"
                placeholderTextColor="#C0C0C0"
              />
              <View
                style={style.kotakpicker}>
                <Picker
                  style={style.Textinputcss}
                  selectedValue={this.state.agamawali}
                  onValueChange={itemValue =>
                    this.setState({ agama: itemValue, show: 1 })
                  }>
                  <Picker.Item
                    style={{ fontSize: 14, fontFamily: 'Poppins-Regular' }}
                    label="Agama"
                    value=""
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

              <TextInput
                style={style.kotak3}
                onChangeText={temwali => this.setState({ temwali })}
                value={this.state.temwali}
                placeholder="Tempat Lahir"
                placeholderTextColor="#C0C0C0"
              />
              <View style={{ flexDirection: 'row' }}>
                <TextInput
                  style={style.kotak7}
                  editable={false}
                  onChangeText={chosenDate6 => this.setState({ chosenDate6 })}
                  value={this.state.chosenDate6}
                  placeholder="Tanggal Lahir"
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
                  <TouchableOpacity TouchableOpacity onPress={this.showPicker}>
                    <View style={{ height: 50, width: 50, justifyContent: 'center', alignItems: 'center', borderRadius: 10, }}>
                      <Date />
                    </View>
                  </TouchableOpacity>
                </View>
                <DateTimePicker
                  isVisible={this.state.isVisible}
                  onConfirm={this.handlePicker6}
                  onCancel={this.hidePicker}
                  mode={'date'}
                  is24Hour={true}
                />
              </View>

              <View
                style={style.kotakpicker}>
                <Picker
                  selectedValue={this.state.provwali}
                  onValueChange={(itemValue) => {
                    this.setState({
                      provwali: itemValue
                    })
                  }}>
                  <Picker.Item style={{ fontSize: 12 }} label={'Pilih Provinsi'} value={'0'} key={'0'} />

                  {
                    this.state.prov.map((provwali) =>
                      <Picker.Item style={{ height: '100%', width: '100%', fontSize: 12, }} label={provwali.nama.toString()} value={provwali.id_prov} key={provwali.id_prov} />
                    )}
                </Picker>
              </View>

              <View
                style={style.kotakpicker}>
                <Picker
                  selectedValue={this.state.kabwali}
                  onFocus={() => { this.GetkotaAPi() }}
                  onValueChange={(itemValue, prov) => {
                    this.setState({
                      kabwali: itemValue
                    })
                  }}>
                  <Picker.Item style={{ fontSize: 12 }} label={'Pilih Kabupaten'} value={'0'} key={'0'} />

                  {
                    this.state.kota.map((kabwali) =>
                      <Picker.Item style={{ height: '100%', width: '100%', fontSize: 12, }} label={kabwali.nama.toString()} value={kabwali.id_kab} key={kabwali.id_kab} />
                    )}
                </Picker>
              </View>
              <View
                style={style.kotakpicker}>
                <Picker
                  selectedValue={this.state.kecwali}
                  onFocus={() => { this.GetkecAPi() }}
                  onValueChange={(itemValue, kota) => {
                    this.setState({
                      kecwali: (itemValue)
                    })
                  }}>
                  <Picker.Item style={{ fontSize: 12 }} label={'Pilih Kecamatan'} value={'0'} key={'0'} />

                  {
                    this.state.kecamatan.map((kecwali) =>
                      <Picker.Item style={{ height: '100%', width: '100%', fontSize: 12, }} label={kecwali.nama} value={kecwali.id_kec} key={kecwali.id_kec} />
                    )}
                </Picker>
              </View>
              <View
                style={style.kotakpicker}>
                <Picker
                  selectedValue={this.state.kelwali}
                  onFocus={() => { this.GetkelAPi() }}
                  onValueChange={(itemValue, kecamatan) => {
                    this.setState({
                      kelwali: (itemValue)
                    })
                  }}>
                  <Picker.Item style={{ fontSize: 12 }} label={'Pilih Kelurahan'} value={'0'} key={'0'} />
                  {
                    this.state.kelurahan.map((kelwali) =>
                      <Picker.Item style={{ height: '100%', width: '100%', fontSize: 12, }} label={kelwali.nama.toString()} value={kelwali.id_kel} key={kelwali.id_kel} />
                    )}
                </Picker>
              </View>

              <View style={style.kotakpicker}>
                <Picker style={style.Textinputcss} mode="dropdown"
                  selectedValue={this.state.penghasilanwali}
                  onValueChange={(itemValue,) => {
                    this.setState({
                      penghasilanwali: itemValue
                    })
                  }}>
                  <Picker.Item style={{ fontSize: 12 }} label={'Pilih Penghasilan'} value={'0'} key={'0'} />
                  <Picker.Item label="Dibawah Rp.500.000,-" value="" />
                  <Picker.Item label="Rp.500.000,- s/d Rp.1.500.000,-" value="1" />
                  <Picker.Item label="Rp.1.500.000,- s/d Rp.2.500.000,-" value="2" />
                  <Picker.Item label="Rp.2.500.000,- s/d Rp.3.500.000,-" value="3" />
                  <Picker.Item label="Rp.3.500.000,- s/d Rp.5.000.000,-" value="4" />
                  <Picker.Item label="Rp.5.000.000,- s/d Rp.7.000.000,-" value="5" />
                  <Picker.Item label="Rp.7.000.000,- s/d Rp.10.000.000,-" value="6" />
                  <Picker.Item label="Diatas Rp.10.000.000,-" value="7" />
                </Picker>
              </View>
              <TextInput
                style={style.kotak3}
                onChangeText={hubkerabat => this.setState({ hubkerabat })}
                value={this.state.hubkerabat}
                placeholder="Hubungan Kerabat"
                placeholderTextColor="#C0C0C0"
              />
              <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 20 }}>
                <TouchableOpacity onPress={() => { this.takePicWali() }} style={{
                  width: '90%',
                  backgroundColor: '#ffffff',
                  borderRadius: 5,
                  marginTop: 5,
                  paddingTop: 40,
                  paddingBottom: 40,
                  paddingLeft: 30,
                  paddingRight: 30,
                  borderWidth: 0.5,
                  borderColor: '#E9E9E9',
                  justifyContent: 'center', alignItems: 'center'
                }}>
                  <Image source={this.state.walifoto} style={{ width: 150, height: 150 }} />
                  <Camera style={style.imgSmall} />

                  {this.state.walifoto === null ?
                    <View>

                    </View>
                    : <View><Text style={{ backgroundColor: '#00A9B8', borderRadius: 10, padding: 10, color: '#fff', marginTop: 10, }}>Masukan Foto Wali</Text></View>}
                </TouchableOpacity>
              </View>
            </View>

          </ProgressStep>

        </ProgressSteps>



        <Modal
          animationType={'slide'}
          transparent={true}
          onRequestClose={() => this.closeModal(false)}
          visible={this.state.masukkk}
          style={{
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View style={style.ModalCont2}>
            <View
              style={{
                paddingHorizontal: 15,
                paddingVertical: 10,
                backgroundColor: '#ffffff',
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                height: '80%',
                shadowColor: '#333',
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
              <SafeAreaView style={{ width: '100%', height: '100%', paddingHorizontal: 20, }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: 10,
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      this.setState({ masukkk: false });
                    }}>
                    <Image
                      source={Union}
                      style={{
                        width: 15,
                        height: 15,
                        marginRight: 10,
                      }}></Image>
                  </TouchableOpacity>
                  <Text style={{ fontWeight: 'bold', fontSize: 18, fontFamily: 'Poppins-SemiBold', marginLeft: 10, color: '#000', }}>
                    Cari Kartu Keluarga
                  </Text>
                </View>

                <View>
                  <TextInput
                    style={{
                      flexDirection: 'row',
                      backgroundColor: '#FFF',
                      paddingHorizontal: 40,
                      height: 38,
                      width: 250,
                      borderRadius: 9,
                      marginLeft: 10,
                    }}
                    onChangeText={(text) => {
                      this.filterList(text.toLowerCase()), this.setState({ carikkk: text })
                    }}
                    value={this.state.text}
                    placeholder="Cari Nama yang diinginkan"
                    placeholderTextColor="#C0C0C0"
                    underlineColorAndroid="transparent"
                  />

                </View>
                <FlatList
                  data={this.state.carikartu}
                  renderItem={({ item }) => (
                    <View>
                      <Text>{item.no_kk}{item.kepala_keluarga}</Text>
                    </View>
                  )}>

                </FlatList>



                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <TouchableOpacity style={style.btnSimpan}>
                    <Text style={{ color: '#fff', fontFamily: 'Poppins-Medium', fontSize: 15 }}> Terapkan</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={style.btnSimpan2} onPress={() => btnReset}>
                    <Text style={{ color: '#00A9B8', fontFamily: 'Poppins-Medium', fontSize: 15 }}>Reset</Text>
                  </TouchableOpacity>
                </View>

              </SafeAreaView>
            </View>
          </View>
        </Modal>
        {/* <Modal animationType={"fade"} transparent={true}
          visible={this.state.modalmap}
          onRequestClose={() => { console.log("Modal has been closed.") }}>

          <View>

            <MapView
              provider={this.props.provider}
              style={style.map}
              initialRegion={this.state.region}
              onPress={e => this.onMapPress(e)}
            >

              <Marker
                key={this.state.markers.key}
                coordinate={this.state.markers.coordinate}
                pinColor={this.state.markers.color}
              >
                <View style={style.marker}>
                  <Text style={style.text}>
                    {JSON.stringify(this.state.markers.coordinate)}</Text>
                </View>
              </Marker>
              <Callout style={style.buttonCallout}>
                <TouchableOpacity
                  style={[style.touchable]}
                  onPress={() => console.log("press")}
                >
                  <Text style={style.touchableText}>Press Me 1</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[style.touchable]}
                  onPress={() => console.log("press")}
                >
                  <Text style={style.touchableText}>Press Me 2</Text>
                </TouchableOpacity>
              </Callout>
            </MapView>
          </View>
        </Modal> */}

        <Modal animationType={"fade"} transparent={true}
          visible={this.state.modaltanya}
          onRequestClose={() => { console.log("Modal has been closed.") }}>

          <View style={style.ModalCont}>
            <View style={style.container3}>
              <View style={style.context2}>
                <Text style={style.kolek}></Text>
                <Text style={style.jumlah2}></Text>
              </View>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('Home', this.setState({ modalSebelumPulang: false }))} style={style.buka} >
                <Text style={style.txtbtn}>Belum saatnya Pulang</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </ScrollView >
    );
  }
}

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

export default DetailTamAnakBinaan;

const style = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    width: windowWidth * 0.95,
    height: windowHeight * 0.29,
    flexDirection: 'row',
  },
  header2: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    width: windowWidth * 0.6,
    height: windowHeight * 0.3,
    flexDirection: 'row',
  },
  contentContainer: {
    backgroundColor: '#fff',
    width: '100%',
    height: '100%',
    flex: 1,
  }, // vildan menghapus flex dan menambahkan backgroundCOlor,width dan hight
  colnilai: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  Label2: {
    marginTop: -5,
    fontSize: 16,
    width: '100%',
    color: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Poppins-Medium',
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
  Label3: {
    marginTop: 15,
    fontSize: 16,
    width: '100%',
    color: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Poppins-Medium',
  },
  title2: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginRight: 20,
    fontSize: 15,
    color: '#000',
    fontFamily: 'Poppins-SemiBold',
  },
  Textinputcss: {
    color: '#C0C0C0',
    marginTop: -10,
    borderRadius: 10,
    borderWidth: 1,
    fontSize: 10,
    height: 40,
    borderColor: '#C0C0C0',
    fontFamily: 'Poppins-Regular',
  },
  Textinputcss2: {
    color: '#C0C0C0',
    marginTop: 10,
    left: 2,
    marginLeft: 10,
    borderRadius: 10,
    borderWidth: 1,
    fontSize: 10,
    height: 30,
    width: windowWidth - 240,
    borderColor: '#C0C0C0',
    fontFamily: 'Poppins-Regular',
  },
  kotak3: {
    marginTop: 10,
    color: '#000',
    borderRadius: 10,
    borderWidth: 0.1,
    fontSize: 13,
    height: 50,
    width: windowWidth - 40,
    padding: 12,
    backgroundColor: '#fff',
    borderColor: '#DDDDDD',
    borderWidth: 1,
    fontFamily: 'Poppins-Regular',
  },
  kotak4: {
    marginTop: 10,
    color: '#000',
    borderRadius: 10,
    borderWidth: 0.1,
    fontSize: 13,
    height: 50,
    width: windowWidth - 123,
    padding: 12,
    backgroundColor: '#fff',
    borderColor: '#DDDDDD',
    borderWidth: 1,
    fontFamily: 'Poppins-Regular',
  },
  kotak7: {
    marginTop: 10,
    color: "#C0C0C0",
    borderRadius: 10,
    borderWidth: 0.1,
    fontSize: 13,
    height: 50,
    width: windowWidth - 130,
    padding: 12,
    backgroundColor: '#fff',
    borderColor: '#DDDDDD',
    borderWidth: 1,
    fontFamily: 'Poppins-Regular',
  },
  kotak5: {
    marginTop: 15,
    color: '#000',
    borderRadius: 10,
    borderWidth: 0.1,
    fontSize: 13,
    height: 100,
    width: windowWidth - 40,
    backgroundColor: '#fff',
    borderColor: '#DDDDDD',
    borderWidth: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: 12,
    fontFamily: 'Poppins-Regular',
    textAlignVertical: 'top'
  },
  kotak6: {
    marginTop: 10,
    color: '#000',
    borderRadius: 10,
    marginHorizontal: 10,
    borderWidth: 0.1,
    fontSize: 14,
    height: 50,
    width: 83,
    backgroundColor: '#fff',
    borderColor: '#DDDDDD',
    borderWidth: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: 12,
    fontFamily: 'Poppins-Regular',
    textAlignVertical: 'top'
  },
  kotakpicker: {
    marginTop: 10,
    paddingVertical: 5,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#DDD',
  },
  infoContainer: {
    width: '100%',
    marginTop: 10,
    borderRadius: 10,
    borderWidth: 1,
    height: 70,
    borderColor: '#DDDDDD',
    backgroundColor: '#fff',
  },
  ModalCont2: {
    flex: 1,
    backgroundColor: '#00000079',
  },
  imgSmall: {
    position: 'absolute', flex: 1, alignItems: 'center', justifyContent: 'center'
  },
});
