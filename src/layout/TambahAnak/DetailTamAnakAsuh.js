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
  FlatList,
  SafeAreaView,
} from 'react-native';
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import { Arrowleft, Date, Markers, Camera, UpLoc } from '../../assets/icons';
import { Picker } from '@react-native-picker/picker';
import RadioForm from 'react-native-simple-radio-button';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { addfoto2, addfoto3, date } from '../../assets/images';
import DatePicker from 'react-native-datepicker';
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment';
import * as ImagePicker from 'react-native-image-picker';
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps'

class DetailTamAnakAsuh extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jenjang: '',
      kelas: '',
      namasekolah: '',
      alamatsekolah: '',
      jurusan: '',
      semester: '',
      nik: '',
      namapanggilan: '',
      namalengkap: '',
      agama: '',
      date: new Date(),
      chosenDate: '',
      jeniskelamin: '',
      anak_ke: '',
      dari: '',
      pelajaranfaf: '',
      hobi: '',
      jenisbinaan: '',
      foto: '',
      mapType: 'hybrid',
      region: {
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0.02,
        longitudeDelta: 0.04,
      },

      latitude: 0,
      longitude: 0,
      tamak: this.props.route.params.item,
    };
  }

  handlePicker = (date) => {
    this.setState({ isVisible: false, chosenDate: moment(date).format('DD-MM-YYYY') })
  }

  hidePicker = () => {
    this.setState({
      isVisible: false,

    })

  }
  GetkartuAPi() {
    fetch('https://kilauindonesia.org/datakilau/api/getkeluarga').then(res => {
      if (res.status === 200)
        return res.json()
    }).then(resdata => {
      console.log(resdata.data)
      this.setState({
        kartu: resdata.data
      })
    })
  }
  SimpanData() {
    {
      let simpandata = {
        jenjang: this.state.jenjang,
        kelas: this.state.kelas,
        nama_sekolah: this.state.namasekolah,
        alamat_sekolah: this.state.alamatsekolah,
        jurusan: this.state.jurusan,
        nik_anak: this.state.nik_anak,
        anak_ke: this.state.anak_ke,
        dari_bersaudara: this.state.dari_bersaudara,
        nick_name: this.state.nick_name,
        full_name: this.state.full_name,
        agama: this.state.agama,
        tanggal_lahir: this.state.tanggal_lahir,
        tempat_lahir: this.state.tempat_lahir,
        jenis_kelamin: this.state.jenis_kelamin,
        tinggal_bersama: this.state.tinggal_bersama,
        status_validasi: this.state.status_validasi,
        status_cpb: this.state.status_cpb,
        jenis_anak_binaan: this.state.jenis_anak_binaan,
        pelajaran_favorit: this.state.pelajaran_favorit,
        hobi: this.state.hobi,
        prestasi: this.state.prestasi,
        jarak_rumah: this.state.jarak_rumah,
        transportasi: this.state.transportasi,
        foto: this.state.foto,
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

            ToastAndroid.show("Data berhasil ditambah!", ToastAndroid.SHORT)
          } else {
            (resJson.status === 'nik_anak')
            ToastAndroid.show("NIK Anak Sudah Terpakai Silahkan Periksa ulang", ToastAndroid.SHORT)
          }
        })
        .catch((err) => console.log('dari catch send Data ===', err));
    }

  }
  componentDidMount() {
    this.GetkartuAPi();
    console.log(this.state.longitude, this.state.latitude);
  }
  showPicker = () => {
    this.setState({ isVisible: true })
  }
  onNextStep = () => {
    console.log('called next step');
  };

  onPaymentStepComplete = () => {
    ;
  };

  onPrevStep = () => {
    console.log('called previous step');
  };

  onSubmitSteps = () => {
    console.log('called on submit step.');
  };
  takePicAnak() {
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
              anakfoto: source,
            });
            console.log('ini gambar = ', this.state.anakfoto);
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



  render() {
    const tamak = this.state.tamak;
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

    const bina = this.state.tamak.status_ortu === 'Dhuafa' | this.state.tamak.status_ortu === 'Yatim' | this.state.tamak.status_ortu === 'Piatu' | this.state.tamak.status_ortu === 'Yatim_Piatu' ?
      [
        { label: 'Bakal Calon Penerima Beasiswa(BCPB)', value: 'BCPB', index: '1' },
      ] :
      [
        { label: 'Calon Non-Penerima Beasiswa (NPB)', value: 'NPB', index: '0' },
        { label: 'Bakal Calon Penerima Beasiswa(BCPB)', value: 'BCPB', index: '1' }
      ]
    var rapimg = [];
    for (let i = 0; i <= this.state.img2; i++) {
      rapimg.push(
        <Image
          style={{ width: 200, height: 200, resizeMode: 'contain' }}
          source={this.state.rapimg[i].image}
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
    const finishbuttonTextStyle = {
      backgroundColor: '#00A9B8',
      height: 50,
      width: 320,
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
      width: 130,
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
            onPress={() => this.props.navigation.navigate('List_Anak_Biaan')}>
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
            nextBtnText="Selanjutnya"
          >
            <View style={{ height: '100%' }}>
              <Text style={style.Label2}>Jenjang Pendidikan</Text>
              <RadioForm
                radio_props={tingkat}
                onPress={(value) => {
                  this.setState({ jenjang: value }),
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
                          kelas: itemValue
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
                      onChangeText={namasekolah => this.setState({ namasekolah })}
                      value={this.state.namasekolah}
                      keyboardType='default'
                      placeholder="Nama Sekolah"
                      placeholderTextColor='#7e7e7e'
                    />
                  </View>

                  <View>
                    <View style={style.infoContainer} >
                      <TextInput style={style.txtDesc} placeholder="Alamat Sekolah"
                        placeholderTextColor='#A9A9A9'
                        keyboardType="email-address"
                        value={this.state.alamatsekolah}
                        onChangeText={alamatsekolah => this.setState({ alamatsekolah })}
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
                            kelas: itemValue
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
                        onChangeText={namasekolah => this.setState({ namasekolah })}
                        value={this.state.namasekolah}
                        keyboardType='default'
                        placeholder="Nama Sekolah"
                        placeholderTextColor='#7e7e7e'
                      />
                    </View>

                    <View>
                      <View style={style.infoContainer} >
                        <TextInput style={style.txtDesc} placeholder="Alamat Sekolah"
                          placeholderTextColor='#A9A9A9'
                          keyboardType="email-address"
                          value={this.state.alamatsekolah}
                          onChangeText={alamatsekolah => this.setState({ alamatsekolah })}
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
                              kelas: itemValue
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
                          onChangeText={namasekolah => this.setState({ namasekolah })}
                          value={this.state.namasekolah}
                          keyboardType='default'
                          placeholder="Nama Sekolah"
                          placeholderTextColor='#7e7e7e'
                        />
                      </View>
                      <View>
                        <View style={style.infoContainer} >
                          <TextInput style={style.txtDesc} placeholder="Alamat Sekolah"
                            placeholderTextColor='#A9A9A9'
                            keyboardType="email-address"
                            value={this.state.alamatsekolah}
                            onChangeText={alamatsekolah => this.setState({ alamatsekolah })}
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
                                semester: itemValue
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
                            onChangeText={namasekolah => this.setState({ namasekolah })}
                            value={this.state.namasekolah}
                            keyboardType='default'
                            placeholder="Nama Sekolah"
                            placeholderTextColor='#7e7e7e'
                          />
                        </View>

                        <View>
                          <View style={style.infoContainer} >
                            <TextInput style={style.txtDesc} placeholder="ALamat Kampus"
                              placeholderTextColor='#A9A9A9'
                              keyboardType="email-address"
                              value={this.state.alamatsekolah}
                              onChangeText={alamatsekolah => this.setState({ alamatsekolah })}
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
            nextBtnTextStyle={finishbuttonTextStyle}
            finishBtnText="Selesai"
            nextBtnText="Selanjutnya"
            previousBtnDisabled={previousbuttonTextStyle}
            previousBtnText="  "
          >
            <View style={{ height: '100%' }}>
              <Text style={style.Label2}>Informasi Anak</Text>

              <TextInput
                style={style.kotak3}
                onChangeText={nik => this.setState({ nik })}
                value={this.state.nik}
                placeholder="NIK"
                placeholderTextColor="#C0C0C0"
              />
              <TextInput
                style={style.kotak3}
                onChangeText={namalengkap => this.setState({ namalengkap })}
                value={this.state.namalengkap}
                placeholder="Nama Lengkap"
                placeholderTextColor="#C0C0C0"
              />
              <TextInput
                style={style.kotak3}
                onChangeText={namapanggilan => this.setState({ namapanggilan })}
                value={this.state.namapanggilan}
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
              <View style={{ width: '90%', height: 300, marginLeft: '5%', marginTop: 10 }}>
                <MapView
                  style={style.map}
                  initialRegion={this.state.region}
                  onRegionChange={this.onRegionChange}
                  showsUserLocation={true}
                  followUserLocation={true}
                  zoomEnabled={true}
                  showsScale={true}
                  mapType={this.state.mapType}
                  // followsUserLocation={true}
                  // onUserLocationChange={(e) => this.setState({
                  //   latitude: e.nativeEvent.coordinate.latitude,
                  //   longitude: e.nativeEvent.coordinate.longitude,
                  // })}
                  onPress={(e) => this.setState({
                    latitude: e.nativeEvent.coordinate.latitude,
                    longitude: e.nativeEvent.coordinate.longitude
                  })}
                >

                  <Marker
                    coordinate={{
                      latitude: parseFloat(this.state.latitude),
                      longitude: parseFloat(this.state.longitude),
                      latitudeDelta: 0.04,
                      longitudeDelta: 0.05,
                    }}
                  >
                    <Callout tooltip >
                      <View style={[style.bubble, { width: 150 }]}>
                        <Text >Ini Koordinat baru</Text>
                      </View>
                      <View style={style.arrowborder}></View>
                      <View style={StyleSheet.arrow}></View>
                    </Callout>
                  </Marker>
                </MapView>
                {/* <TouchableOpacity style={style.refresh} onPress={() => this.setState({ mapType: this.state.mapType === 'standard' ? 'hybrid' : 'standard' })}>
                  <UpLoc />
                </TouchableOpacity> */}
              </View >

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
                  selectedValue={this.state.jeniskelamin}
                  onValueChange={itemValue =>
                    this.setState({ jeniskelamin: itemValue, show: 1 })
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
                  onChangeText={anak_ke => this.setState({ anak_ke })}
                  value={this.state.anak_ke}
                  placeholder="Anak ke"
                  placeholderTextColor="#C0C0C0"
                />
                <Text style={{ color: '#000', color: '#000', fontSize: 16, fontFamily: 'Poppins-Regular' }}> dari</Text>
                <TextInput
                  style={style.kotak6}
                  onChangeText={dari => this.setState({ dari })}
                  value={this.state.dari}
                  placeholder="Saudara"
                  placeholderTextColor="#C0C0C0"
                />
              </View>

              <TextInput
                style={style.kotak3}
                onChangeText={pelajaranfaf => this.setState({ pelajaranfaf })}
                value={this.state.pelajaranfaf}
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
                  this.setState({ jenis_anak_binaan: value }),
                    ToastAndroid.show(value.toString(), ToastAndroid.SHORT);
                }}
                initial={-1}
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

              <TextInput
                style={style.kotak3}
                onChangeText={prestasi => this.setState({ prestasi })}
                value={this.state.prestasi}
                placeholder="Prestasi"
                placeholderTextColor="#C0C0C0"
              />

              <TextInput
                style={style.kotak3}
                onChangeText={jarak_rumah => this.setState({ jarak_rumah })}
                value={this.state.jarak_rumah}
                placeholder="Jarak Rumah Ke Shelter"
                placeholderTextColor="#C0C0C0"
              />
              <View
                style={style.kotakpicker}>
                <Picker style={style.Textinputcss}
                  selectedValue={this.state.transportasi}
                  onValueChange={(itemValue,) => {
                    this.setState({
                      transportasi: itemValue
                    })
                  }}>
                  <Picker.Item style={{ fontSize: 12 }} label={"Pilih"} value={''} key={''} />
                  <Picker.Item label="Jalan Kaki" value="Jalan Kaki" />
                  <Picker.Item label="Sepeda" value="Sepeda" />
                  <Picker.Item label="Sepeda Motor" value="Sepeda Motor" />
                  <Picker.Item label="Angkutan Umum" value="Angkutan Umum" />
                  <Picker.Item label="Diantar Orang Tua/Wali" value="Diantar Orang Tua/Wali" />
                  <Picker.Item label="Lainnya" value="Lainnya" />

                </Picker>
              </View>
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

        </ProgressSteps>
      </ScrollView >
    );
  }
}

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

export default DetailTamAnakAsuh;

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
    marginLeft: 5,
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
    width: windowWidth - 173,
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
    width: windowWidth - 170,
    padding: 12,
    backgroundColor: '#fff',
    borderColor: '#DDDDDD',
    borderWidth: 1,
    fontFamily: 'Poppins-Regular',
  },
  kotak8: {
    marginTop: 10,
    color: '#000',
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
  kotak9: {
    marginTop: 10,
    color: '#000',
    borderRadius: 10,
    marginHorizontal: 10,
    borderWidth: 0.1,
    fontSize: 14,
    height: 50,
    width: 63,
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
  kolomkk: {
    borderWidth: 1,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 50,
    marginVertical: 10,
    borderRadius: 10,
    borderColor: '#DDDDDD',
    backgroundColor: '#fff',
  },
  imgSmall: {
    position: 'absolute', flex: 1, alignItems: 'center', justifyContent: 'center'
  },
  bubble: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    backgroundColor: '#fff',
    borderRadius: 6,
    borderColor: '#ccc',
    borderWidth: 0.5,
    padding: 15,
    width: 250,
  },
});
