import { ScrollView, Text, View, StyleSheet, Dimensions, TextInput, ToastAndroid, Image, Modal, Alert } from 'react-native'
import React, { Component } from 'react'
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import { TouchableOpacity } from 'react-native-gesture-handler';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import { Camera, } from '../../assets/icons';
import { date, x } from '../../assets/images';
import * as ImagePicker from 'react-native-image-picker';
import DatePicker from 'react-native-date-picker';


const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
export class First extends Component {
    constructor(props) {
        super(props)
        this.state = {
            date: new Date(),
            text: '',
            kepala: '',
            KK: '',
            cabang: '',
            binaan: '',
            shel: '',
            SOT: '',
            bank: '',
            namabank: '',
            norek: '',
            an_rek: '',
            nohp: '',
            an_hp: '',
            notelp: '',
            kantor: [],
            wilbin: [],
            status: [],
            shelter: [],
            databank: [],
            tempat: '',
            nama: '',
            atas: '',
            telp: '',
            atas1: '',
            totalSteps: "",
            currentStep: "",
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
        }
    }
    GetBankAPi() {
        fetch('https://kilauindonesia.org/datakilau/api/getbankpen').then(res => {
            if (res.status === 200)
                return res.json()
        }).then(resdata => {
            console.log(resdata.data)
            this.setState({
                databank: resdata.data,
            })
        })
    }
    GetShelterAPi() {
        fetch('https://kilauindonesia.org/datakilau/api/shelter/' + this.state.binaan).then(res => {
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
        fetch('https://kilauindonesia.org/datakilau/api/wilbin/' + this.state.cabang).then(res => {
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
                kantor: resdata.data,
            })
        })
    }
    componentDidMount() {
        this.GetShelterAPi();
        this.GetKacabAPi();
        this.GetWilbinAPi();
        console.log(this.props);
    }

    takePicSKTM() {
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


    onPress = () => {
        const KK = this.state.KK;

        if (KK.length < 16) {
            Alert.alert(
                'Peringatan',
                'No KK anda kurang dari 16 digit',
                [
                    {
                        text: "Ya",
                        onPress: () => this.setState({}),
                        style: "cancel"
                    },
                ],
                { cancelable: false },
            )
        } if (this.state.SOT === '') {
            Alert.alert(
                'Peringatan',
                'Pilih Terlebih Dahulu Status Orang Tua',
                [
                    {
                        text: "Ya",
                        onPress: () => this.setState({}),
                        style: "cancel"
                    },
                ],
                { cancelable: false },
            )
        }
        else {
            this.props.navigation.navigate('Second',
                {
                    kepala: this.state.kepala,
                    KK: this.state.KK,
                    cabang: this.state.cabang,
                    binaan: this.state.binaan,
                    shel: this.state.shel,
                    SOT: this.state.SOT,
                    namabank: this.state.namabank,
                    norek: this.state.norek,
                    an_rek: this.state.an_rek,
                    nohp: this.state.nohp,
                    an_hp: this.state.an_hp,
                    notelp: this.state.notelp,
                    surket: this.state.surket,
                    sktm: this.state.sktm,
                })
        }
    }
    render() {
        const { currentStep, totalSteps } = this.state;
        const { nameError } = this.state
        const bank = [
            {
                label: 'Ya',
                value: 'Ya'
            },
            {
                label: 'Tidak',
                value: 'Tidak'
            }
        ];
        const notelp = [
            {
                label: 'Ya',
                value: 'Ya'
            },
            {
                label: 'Tidak',
                value: 'Tidak'
            }

        ];

        return (
            // <ScrollView style={{ backgroundColor: '#fff' }}>
            //     <View style={{ backgroundColor: '#00A9B8' }}>
            //         <Text style={style.title1}>Tambah Anak Binaan</Text>
            //     </View>
            //     <View>
            //         <Text
            //             style={style.currentStepText}
            //         >{`Tahap 1 `}</Text>
            //         <View>
            //             <Text style={style.Label1}>Kantor Cabang</Text>
            //             <Picker style={style.Textinputcss} mode="dropdown"
            //                 selectedValue={this.state.cabang}
            //                 onValueChange={(itemValue) => {
            //                     this.setState({
            //                         cabang: itemValue
            //                     })
            //                 }}>
            //                 <Picker.Item style={{ fontSize: 12 }} label={'Pilih Kacab'} value={'0'} key={'0'} />
            //                 {
            //                     this.state.kantor.map((cabang) =>
            //                         <Picker.Item style={{ height: '100%', width: '100%', fontSize: 12, }} label={lv.id_level_anak_binaan.toString()} value={lv.id_level_anak_binaan.toString()} key={lv.id_level_anak_binaan.toString()} />
            //                     )}
            //             </Picker>
            //         </View>
            //         <View>
            //             <Text style={style.Label1}>Wilayah Binaan</Text>
            //             <Picker style={style.Textinputcss} mode="dropdown"
            //                 selectedValue={this.state.binaan}
            //                 onValueChange={(itemValue) => {
            //                     this.setState({
            //                         binaan: itemValue
            //                     })
            //                 }}>
            //                 <Picker.Item style={{ fontSize: 12 }} label={'Pilih Wilbin'} value={'0'} key={'0'} />
            //                 {
            //                     this.state.shelter.map((tempat) =>
            //                         <Picker.Item style={{ height: '100%', width: '100%', fontSize: 12, }} label={lv.id_level_anak_binaan.toString()} value={lv.id_level_anak_binaan.toString()} key={lv.id_level_anak_binaan.toString()} />
            //                     )}
            //             </Picker>
            //         </View>
            //         <View>
            //             <Text style={style.Label1}>Shelter</Text>
            //             <Picker style={style.Textinputcss} mode="dropdown"
            //                 selectedValue={this.state.tempat}
            //                 onValueChange={(itemValue) => {
            //                     this.setState({
            //                         tempat: itemValue
            //                     })
            //                 }}>
            //                 <Picker.Item style={{ fontSize: 12 }} label={'Pilih Bank'} value={'0'} key={'0'} />
            //                 {
            //                     this.state.shelter.map((tempat) =>
            //                         <Picker.Item style={{ height: '100%', width: '100%', fontSize: 12, }} label={lv.id_level_anak_binaan.toString()} value={lv.id_level_anak_binaan.toString()} key={lv.id_level_anak_binaan.toString()} />
            //                     )}
            //             </Picker>
            //         </View>
            //         {!!this.state.nameError && (
            //             <Text style={{ color: "red" }}>{this.state.nameError}</Text>
            //         )}
            //         <View style={{
            //             width: '90%',
            //             height: 100,
            //             borderRadius: 10,
            //             borderWidth: 1,
            //             marginLeft: 20,
            //             marginTop: 10,
            //             borderColor: '#E9E9E9',
            //             backgroundColor: '#fff',
            //             flexDirection: 'column',
            //             justifyContent: 'space-around'
            //         }}>
            //             <Text style={style.Label1}> No.KK</Text>
            //             <TextInput
            //                 style={style.kotak3}
            //                 onChangeText={KK => this.setState({ KK })}
            //                 value={this.state.KK}
            //                 keyboardType='numeric'
            //                 placeholder="No.KK "
            //                 placeholderTextColor='#7e7e7e'
            //             />
            //         </View>
            //         <View style={{
            //             width: '90%',
            //             height: 100,
            //             borderRadius: 10,
            //             borderWidth: 1,
            //             marginLeft: 20,
            //             marginTop: 10,
            //             borderColor: '#E9E9E9',
            //             backgroundColor: '#fff',
            //             flexDirection: 'column',
            //             justifyContent: 'space-around'
            //         }}>
            //             <Text style={style.Label1}>Kepala Keluarga</Text>
            //             <TextInput
            //                 style={style.kotak3}
            //                 onChangeText={keke => this.setState({ keke })}
            //                 value={this.state.keke}
            //                 keyboardType='default'
            //                 placeholder="Nama Kepala Keluarga"
            //                 placeholderTextColor='#7e7e7e'
            //             />
            //         </View>

            //         <View >
            //             <Text style={style.Label1}>Status Orang Tua</Text>
            //             <Picker style={style.Textinputcss} mode="dropdown"
            //                 selectedValue={this.state.so}
            //                 onValueChange={(itemValue) => {
            //                     this.setState({
            //                         so: itemValue
            //                     })
            //                 }}>
            //                 <Picker.Item style={{ fontSize: 12 }} label={'Pilih '} value={'0'} key={'0'} />
            //                 <Picker.Item label="Yatim" value="Yatim" />
            //                 <Picker.Item label="Piatu" value="Piatu" />
            //                 <Picker.Item label="Yatim Piatu" value="YT" />
            //                 <Picker.Item label="Dhuafa" value="Dhuafa" />
            //                 <Picker.Item label="Non Dhuafa" value="ND" />
            //             </Picker>
            //         </View>
            //         <View>
            //             <Text style={style.Label1}>Apakah Memiliki Bank?</Text>
            //             <RadioForm
            //                 radio_props={bank}
            //                 onPress={(value) => { this.setState({ bank: value }), ToastAndroid.show(value.toString(), ToastAndroid.SHORT) }}
            //                 initial={1}
            //                 buttonSize={10}
            //                 buttonOuterSize={20}
            //                 animation={true}
            //                 formHorizontal={false}
            //                 style={{ flexDirection: 'row', marginTop: 10, justifyContent: 'space-evenly', marginLeft: -90 }}
            //             ></RadioForm>
            //         </View>
            //         {this.state.bank === 'Ya' ?
            //             <View style={{
            //                 width: '90%',
            //                 height: 250,
            //                 borderRadius: 10,
            //                 borderWidth: 1,
            //                 marginLeft: 20,
            //                 marginTop: 10,
            //                 borderColor: '#E9E9E9',
            //                 backgroundColor: '#fff',
            //                 flexDirection: 'column',
            //                 justifyContent: 'space-around'
            //             }}>
            //                 <View>
            //                     <Text style={style.Label2}>Nama Bank</Text>
            //                     <Picker style={{
            //                         color: '#7e7e7e',
            //                         marginLeft: 10,
            //                         marginRight: 10,
            //                         marginBottom: 10,
            //                         borderRadius: 10,
            //                         borderWidth: 1,
            //                         fontSize: 12,
            //                         height: 52,
            //                         backgroundColor: '#fff',
            //                         shadowColor: "#333",
            //                         shadowOffset: {
            //                             width: 1,
            //                             height: 1,
            //                         },
            //                         shadowOpacity: 0.3,
            //                         shadowRadius: 2,
            //                         borderColor: '#7e7e7e',
            //                         elevation: 3,
            //                     }} mode="dropdown"
            //                         selectedValue={this.state.nama}
            //                         onValueChange={(itemValue) => {
            //                             this.setState({
            //                                 nama: itemValue
            //                             })
            //                         }}>
            //                         <Picker.Item style={{ fontSize: 12 }} label={'Pilih Bank'} value={'0'} key={'0'} />
            //                         <Picker.Item label="BRI" value="BRI" />
            //                         <Picker.Item label="BNI" value="BNI" />
            //                         <Picker.Item label="BCA" value="BCA" />
            //                         <Picker.Item label="MANDIRI" value="MANDIRI" />
            //                         <Picker.Item label="BJB" value="BJB" />
            //                         <Picker.Item label="BSM" value="BSM" />
            //                     </Picker>
            //                 </View>
            //                 <View>
            //                     <Text style={style.Label2}>No. Rekening</Text>
            //                     <TextInput
            //                         style={style.kotak3}
            //                         onChangeText={norek => this.setState({ norek })}
            //                         value={this.state.norek}
            //                         keyboardType='numeric'
            //                         placeholder="No.Rekening"
            //                         placeholderTextColor='#7e7e7e'
            //                     />
            //                 </View>
            //                 <View>
            //                     <Text style={style.Label2}>Atas Nama</Text>
            //                     <TextInput
            //                         style={style.kotak3}
            //                         onChangeText={atas => this.setState({ atas })}
            //                         value={this.state.atas}
            //                         keyboardType='default'
            //                         placeholder="Atas Nama"
            //                         placeholderTextColor='#7e7e7e'
            //                     />
            //                 </View>

            //             </View>
            //             :
            //             <View></View>

            //         }

            //         <View>
            //             <Text style={style.Label1}>Apakah Memiliki No.Telepon?</Text>
            //             <RadioForm
            //                 radio_props={notelp}
            //                 onPress={(value) => { this.setState({ notelp: value }), ToastAndroid.show(value.toString(), ToastAndroid.SHORT) }}
            //                 initial={1}
            //                 buttonSize={10}
            //                 buttonOuterSize={20}
            //                 animation={true}
            //                 formHorizontal={false}
            //                 style={{ flexDirection: 'row', marginTop: 10, justifyContent: 'space-evenly', marginLeft: -90 }}
            //             >
            //             </RadioForm>
            //         </View>
            //         {this.state.notelp === 'Ya' ?
            //             <View style={{
            //                 width: '90%',
            //                 height: 150,
            //                 borderRadius: 10,
            //                 borderWidth: 1,
            //                 marginLeft: 20,
            //                 marginTop: 10,
            //                 borderColor: '#E9E9E9',
            //                 backgroundColor: '#fff',
            //                 flexDirection: 'column',
            //                 justifyContent: 'space-around'
            //             }}>
            //                 <View>
            //                     <Text style={style.Label2}>No.Telepon</Text>
            //                     <TextInput
            //                         style={style.kotak3}
            //                         onChangeText={telp => this.setState({ telp })}
            //                         value={this.state.telp}
            //                         keyboardType='numeric'
            //                         placeholder="Nomor yang dapat dihubungi"
            //                         placeholderTextColor='#7e7e7e'
            //                     />
            //                 </View>
            //                 <View>
            //                     <Text style={style.Label2}>Atas Nama</Text>
            //                     <TextInput
            //                         style={style.kotak3}
            //                         onChangeText={atas1 => this.setState({ atas1 })}
            //                         value={this.state.atas1}
            //                         keyboardType='numeric'
            //                         placeholder="Atas Nama Nomor Telp"
            //                         placeholderTextColor='#7e7e7e'
            //                     />
            //                 </View>
            //             </View>
            //             :
            //             <View></View>
            //         }

            //         <TouchableOpacity style={style.btnSimpanDark}
            //             onPress={() =>
            //                 // this.state.KK === '' ? alert('Tolong ada kolom yang belum terisi') :
            //                 //     this.state.keke === '' ? alert('Tolong ada kolom yang belum terisi') :
            //                 //         this.state.so === '' ? alert('Tolong ada kolom yang belum terisi') :
            //                 this.props.navigation.replace('Second', { so: this.state.so })
            //             }>
            //             <Text>Lanjutkan</Text>
            //         </TouchableOpacity>
            //     </View>
            // </ScrollView >
            <ScrollView style={{ flex: 1, backgroundColor: '#fff' }}>
                <Text style={style.Label2}>Informasi Wilayah</Text>

                {/* <Modal
                    animationType={"slide"}
                    transparent={true}
                    visible={this.state.modaldate}
                    onRequestClose={this.state.modaldate}
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
                            height: '27%',
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
                            <Text style={style.tglText}>Pilih Tanggal</Text>
                            <ScrollView style={{ width: '100%', height: '100%' }}>

                                <TouchableOpacity onPress={() => this.setState({ modaldate: false })} style={{ position: 'absolute', right: 20, top: 20 }}>
                                    <Image source={x}
                                        style={{
                                            height: 30,
                                            width: 30, alignItems: 'center',
                                        }}></Image>
                                </TouchableOpacity>
                                <DatePicker
                                    date={this.state.date}
                                    placeholder="select date"
                                    onDateChange={(date) =>
                                        this.setState({ date }, () => console.log(this.state.date))
                                    }
                                    androidVariant="nativeAndroid"
                                    mode='date'

                                />
                            </ScrollView>
                        </View>
                    </View>
                </Modal> */}
                <View style={{ alignContent: 'center', alignSelf: 'center' }}>
                    <View
                        style={style.kotakpicker}>
                        <Picker
                            selectedValue={this.state.cabang}
                            onValueChange={(itemValue) => {
                                this.setState({
                                    cabang: itemValue
                                })
                            }}>
                            <Picker.Item style={{ fontSize: 12 }} label={'Pilih kantor'} value={'0'} key={'0'} />

                            {
                                this.state.kantor.map((kan) =>
                                    <Picker.Item style={{ height: '100%', width: '100%', fontSize: 12, }} label={kan.nama_kacab} value={kan.id_kacab} key={kan.id_kacab} />
                                )}
                        </Picker>
                    </View>

                    <View
                        style={style.kotakpicker}>
                        <Picker
                            selectedValue={this.state.binaan}
                            onFocus={() => { this.GetWilbinAPi() }}
                            onValueChange={(itemValue, kacab) => {
                                this.setState({
                                    binaan: itemValue
                                })
                            }}>
                            <Picker.Item style={{ fontSize: 12 }} label={'Pilih Wilbin'} value={'0'} key={'0'} />

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
                                    shel: itemValue
                                })
                            }}>
                            <Picker.Item style={{ fontSize: 12 }} label={'Pilih Shelter'} value={'0'} key={'0'} />

                            {
                                this.state.shelter.map((she) =>
                                    <Picker.Item style={{ height: '100%', width: '100%', fontSize: 12, }} label={she.nama_shelter} value={she.id_shelter} key={she.id_shelter} />
                                )}
                        </Picker>
                    </View>

                    <TextInput
                        style={style.kotak3}
                        onChangeText={KK => this.setState({ KK })}
                        maxLength={16}
                        value={this.state.KK}
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


                    {/* {this.state.show === 1 && this.state.SOT === 'Dhuafa' ? (

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
                    )} */}
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
                                <View
                                    style={style.kotakpicker}>
                                    <Picker
                                        selectedValue={this.state.namabank}
                                        onValueChange={(itemValue) => {
                                            this.setState({
                                                namabank: (itemValue)
                                            })
                                        }}>
                                        <Picker.Item style={{ fontSize: 12 }} label={'Pilih Bank'} value={'0'} key={'0'} />

                                        {
                                            this.state.databank.map((bank) =>
                                                <Picker.Item style={{ height: '100%', width: '100%', fontSize: 12, }} label={bank.nama_bank} value={bank.id_bank} key={bank.id_bank} />
                                            )}
                                    </Picker>
                                </View>
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

                <TouchableOpacity style={style.nextbuttonTextStyle} onPress={() => this.onPress()}>
                    <Text style={{ justifyContent: 'center', textAlign: 'center', color: '#fff' }}>Lanjutkan</Text>
                </TouchableOpacity>
            </ScrollView>
        )
    }
}
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
        marginTop: 10,
        marginLeft: 10,
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
        width: windowWidth - 20,
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
    nextbuttonTextStyle: {
        backgroundColor: '#00A9B8',
        height: 50,
        width: 130,
        marginTop: 10,
        borderRadius: 12,
        color: 'white',
        justifyContent: 'center',
        alignContent: 'center',
        alignSelf: 'center',
        paddingHorizontal: 25,
        paddingVertical: 13,
        fontFamily: 'Poppins-SemiMedium',
        fontSize: 15,
    },
});

// const style = StyleSheet.create({
//     contentContainer: {
//     },
//     Label1: {
//         flex: 1,
//         fontSize: 15,
//         marginTop: 10,
//         marginBottom: -1,
//         marginLeft: 30,
//         color: '#000000',

//     },
//     kotak3: {
//         color: '#000000',
//         marginTop: 2,
//         marginLeft: 20,
//         marginRight: 10,
//         marginBottom: 20,
//         borderRadius: 2,
//         borderWidth: 0.1,
//         fontSize: 12,
//         height: 40,
//         width: '90%',
//         backgroundColor: '#F0F8FF',
//     },
//     currentStepText: {
//         color: "#7e7e7e",
//         fontSize: 12
//     },
//     Textinputcss: {
//         color: '#7e7e7e',
//         marginLeft: 10,
//         marginRight: 10,
//         borderRadius: 10,
//         borderWidth: 1,
//         fontSize: 12,
//         height: 52,
//         backgroundColor: '#fff',
//         shadowColor: "#333",
//         shadowOffset: {
//             width: 1,
//             height: 1,
//         },
//         shadowOpacity: 0.3,
//         shadowRadius: 2,
//         borderColor: '#7e7e7e',
//         elevation: 3,
//     },
//     Label2: {
//         marginTop: 5,
//         marginLeft: 25,
//         marginBottom: 5,
//         color: '#000',
//     },
//     kotak2: {
//         color: '#000000',
//         marginTop: 10,
//         marginLeft: 30,
//         marginRight: 10,
//         borderRadius: 2,
//         borderWidth: 0.1,
//         fontSize: 12,
//         height: 52,
//         backgroundColor: '#7e7e7e',
//     },
//     title1: {
//         marginRight: 20,
//         marginLeft: 20,
//         marginTop: 15,
//         marginBottom: 15,
//         fontSize: 18,
//         fontWeight: 'bold',
//         color: '#fff',
//     },
//     Labeltgl: {
//         marginTop: 5,
//         position: 'absolute',
//         top: 0, left: 10, right: 0, bottom: 0,
//         height: 25, width: 25,
//     },
//     item: {
//         flex: 1,
//         fontSize: 16,
//         flexDirection: 'row',
//         backgroundColor: '#fff',
//         padding: 17,
//         marginVertical: 8,
//         marginHorizontal: 16,
//         shadowColor: "#333",
//         shadowOffset: {
//             width: 1,
//             height: 1,
//         },
//         shadowOpacity: 0.3,
//         shadowRadius: 2,
//         borderColor: '#7e7e7e',
//         elevation: 3,
//     },
//     container: {
//         marginTop: 40,
//         marginLeft: 75,
//         width: 250,
//         height: 250,
//         flex: 1,
//         margin: 20,
//         alignItems: 'center',
//         justifyContent: 'center',
//         backgroundColor: '#fff',
//         shadowColor: "#333",
//         shadowOffset: {
//             width: 1,
//             height: 1,
//         },
//         shadowOpacity: 0.3,
//         shadowRadius: 2,
//         borderColor: '#7e7e7e',
//         elevation: 3,
//     },
//     btnSimpanUn1: {
//         width: '40%',
//         fontWeight: 'bold',
//         backgroundColor: '#C6C6C6',
//         borderRadius: 10,
//         padding: 10,
//         borderWidth: 1,
//         borderColor: '#E9E9E9',
//         justifyContent: 'center', alignItems: 'center',
//         alignContent: 'center',
//         textAlign: 'center',
//     },
//     coltom1: {
//         width: '90%',
//         marginLeft: 20,
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         alignContent: 'center',
//         fontSize: 16,
//         flexDirection: 'row',
//         paddingTop: 10,
//         paddingBottom: 10,
//         backgroundColor: '#fff',
//         marginVertical: 8,
//         marginHorizontal: 16,
//         shadowColor: "#333",
//         shadowOffset: {
//             width: 1,
//             height: 1,
//         },
//         shadowOpacity: 0.3,
//         shadowRadius: 2,
//         borderColor: '#7e7e7e',
//         elevation: 3,
//     },
//     itemflat: {
//         fontSize: 16,
//         flexDirection: 'column',
//         backgroundColor: '#fff',
//         padding: 20,
//         height: 75,
//         shadowColor: "#333",
//         shadowOffset: {
//             width: 1,
//             height: 1,
//         },
//         shadowOpacity: 0.3,
//         shadowRadius: 2,
//         borderColor: '#7e7e7e',
//         elevation: 1,
//     },
//     ModalCont2: {
//         flex: 1,
//         backgroundColor: '#00000079',
//     },
//     wrap: {
//         width: Dimensions.get('window').width,
//         height: Dimensions.get('window').height * 0.25 // 25% window
//     },
//     itemText: {
//         textAlign: 'justify',
//         marginLeft: 10,
//         fontSize: 12,
//         width: '35%',
//         height: 43,
//     },

//     btnSimpanDark: {
//         flexDirection: 'row',
//         color: '#fff',
//         fontWeight: 'bold',
//         textAlign: 'center',
//         width: 150, height: 50,
//         backgroundColor: '#87cefa',
//         marginTop: 10,
//         borderRadius: 10,
//         padding: 10,
//         borderWidth: 1,
//         borderColor: '#E9E9E9',
//         justifyContent: 'center', alignContent: 'center',
//         marginLeft: 120,
//         fontSize: 12,
//     },
//     upperContainer: {
//         flex: 1,
//         justifyContent: "flex-end",
//         alignItems: "center"
//     },
//     loginText: {
//         fontSize: 32,
//         color: "#fff"
//     },
//     lowerContainer: {
//         flex: 2
//     }
// });

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
export default connect(mapStateToProps, mapDispatchToProps)(First);