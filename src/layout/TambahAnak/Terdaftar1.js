import { ScrollView, Text, View, StyleSheet, TouchableOpacity, Dimensions, TextInput, Image, Modal, ToastAndroid } from 'react-native'
import React, { Component } from 'react'
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from 'react-native-modal-datetime-picker';
// import DatePicker from 'react-native-modern-datepicker';
// import { DatePicker } from 'react-native-wheel-pick'
import { x, date } from '../../assets/images'
import { Camera } from '../../assets/icons'
import * as ImagePicker from 'react-native-image-picker';
import DocumentPicker from "react-native-document-picker"
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps'
import moment from 'moment';


export class Terdaftar1 extends Component {
    constructor(props) {
        super(props)
        this.state = {
            file: {
                name: '',
                type: '',
                uri: '',
                size: '',
            },
            foto: {
                name: '',
                type: '',
                uri: '',
                id: 0,
            },
            nik_anak: '',
            anak: '',
            dari: '',
            nickname: '',
            full: '',
            agama: '',
            tanggal_lahir: '',
            chosenDate: '',
            dateanak: new Date(),
            jenis: [],
            gender: '',
            tinggal: [],
            sm: '',
            status_validasi: 'tidak aktif',
            bina: '',
            pelajaran_favorit: '',
            hobi: '',
            jenis_anak_binaan: '',
            prestasi: '',
            jarak: '',
            kendaraan: '',
            totalSteps: "",
            currentStep: "",
            modaldate: false,
            show: false,
            tamak: this.props.route.params.tamak,
            mapType: 'hybrid',
            region: {
                latitude: 0,
                longitude: 0,
                latitudeDelta: 0.02,
                longitudeDelta: 0.04,
            },

            latitude: 0,
            longitude: 0,
            convert: '',
        }
    }
    handlePicker(date) {
        this.setState({ isVisible: false, chosenDate: moment(date).format('YYYY-MM-DD') })
    }
    hidePicker = () => {
        this.setState({
            isVisible: false,

        })
    }
    showPicker = () => {
        this.setState({ isVisible: true })
    }
    SimpanData() {
        {
            let simpandata = {
                jenjang: this.props.route.params.tingkat,
                id_keluarga: this.state.tamak.id_keluarga,
                kelas: this.props.route.params.kelas,
                nama_sekolah: this.props.route.params.namasek,
                alamat_sekolah: this.props.route.params.alamatsek,
                jurusan: this.props.route.params.jurusan,
                semester: this.props.route.params.semester,
                id_shelter: this.state.tamak.id_shelter,
                nik_anak: this.state.nik_anak,
                nick_name: this.state.nickname,
                full_name: this.state.full,
                anak_ke: this.state.anak,
                dari_bersaudara: this.state.dari,
                agama: this.state.agama,
                latitude: this.state.latitude,
                longitude: this.state.longitude,
                tanggal_lahir: this.state.dateanak,
                tempat_lahir: this.state.tempat_lahir,
                jenis_kelamin: this.state.gender,
                tinggal_bersama: this.state.sm,
                status_validasi: this.state.status_validasi,
                status_cpb: this.state.bina,
                jenis_anak_binaan: this.state.jenis_anak_binaan,
                pelajaran_favorit: this.state.pelajaran_favorit,
                hobi: this.state.hobi,
                prestasi: this.state.prestasi,
                jarak_rumah: this.state.jarak,
                transportasi: this.state.kendaraan,
                foto: this.state.foto,
                // absen: this.state.convert,
            }
            let data = new FormData();
            for (let key in simpandata) {
                data.append(key, simpandata[key]);
            }
            fetch('https://kilauindonesia.org/datakilau/api/tambahanakkel/' + this.state.tamak.id_keluarga, {
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

                        ToastAndroid.show("NIK Anak Sudah Terpakai Silahkan Periksa ulang", ToastAndroid.SHORT)
                    }
                })
                .catch((err) => console.log('dari catch send Data ===', err));
        }

    }

    takePicAnak() {
        {
            ImagePicker.launchCamera(
                {
                    noData: true,
                    title: 'Select Photo',
                    maxWidth: 300,
                    maxHeight: 400,
                    includeBase64: true,
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
                        this.setState({
                            foto: source,
                            convert: response,
                        });
                        console.log('ini gambar = ', this.state.convert);
                    }
                },
            );
        }
    }
    async docPicker() {
        // Pick a single file
        try {
            const res = await DocumentPicker.pick({
                type: [DocumentPicker.types.allFiles],
            });
            const source = {
                uri: res[0].uri,
                type: res[0].type,
                name: res[0].name,
                size: res[0].size,
            };
            this.setState({
                file: source,
            });
            console.log('ini file', this.state.file);//here you can call your API and send the data to that API
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                console.log("error -----", err);
            } else {
                throw err;
            }
        }
    }
    componentDidMount() {
        console.log(this.state.chosenDate)
            ;
    }

    render() {
        const tamak = this.state.tamak
        const sm = tamak.status_ortu === 'Yatim_Piatu' ?
            [
                { label: 'Tinggal Bersama Wali', value: 'Wali', index: '0' }
            ] :
            [
                { label: 'Tinggal Bersama Wali', value: 'Wali', index: '0' },
                { label: 'Tinggal Bersama Ayah', value: 'Ayah', index: '1' },
                { label: 'Tinggal Bersama Ibu', value: 'Ibu', index: '2' }
            ]

        const bina = tamak.status_ortu === 'Non-Dhuafa' ?
            [
                { label: 'Calon Non-Penerima Beasiswa (CPB)', value: 'CPB', index: '0' }
            ] :
            [
                { label: 'Calon Non-Penerima Beasiswa (CPB)', value: 'CPB', index: '0' },
                { label: 'Bakal Calon Penerima Beasiswa(BCPB)', value: 'BCPB', index: '1' },
            ]

        const so = [
            { label: 'Yatim Piatu', value: 'YT' }
        ];

        return (
            <ScrollView style={{ backgroundColor: '#fff' }}>
                <View style={{ backgroundColor: '#00A9B8' }}>
                    <Text>{this.props.route.params.jenjang}</Text>
                    <Text>{this.props.route.params.tingkat}</Text>
                    <Text>{this.props.route.params.kelas}</Text>
                    <Text>{this.props.route.params.namasek}</Text>
                    <Text>{this.props.route.params.alamatsek}</Text>

                    <Text style={style.title1}>Tambah Anak Binaan{this.state.tamak.id_shelter}</Text>
                </View>
                <Text
                    style={style.currentStepText}
                >{`Tahap 3`}</Text>
                <View style={{ flexDirection: 'row', marginLeft: 20 }}>
                    <View style={{
                        width: '40%',
                        height: 100,
                        borderRadius: 10,
                        borderWidth: 1,
                        marginLeft: 20,
                        marginTop: 10,
                        borderColor: '#E9E9E9',
                        backgroundColor: '#fff',
                        flexDirection: 'column',
                        justifyContent: 'space-around'
                    }}>
                        <Text style={{
                            marginTop: -10,
                            marginBottom: -25,
                            marginLeft: 25,
                            color: '#000',
                        }}>Anak Ke</Text>
                        <TextInput
                            style={style.kotak2}
                            onChangeText={anak => this.setState({ anak })}
                            value={this.state.anak}
                            keyboardType='numeric'
                            placeholder="Anak ke "
                            placeholderTextColor='#7e7e7e'
                        />
                    </View>
                    <View style={{
                        width: '40%',
                        height: 100,
                        borderRadius: 10,
                        borderWidth: 1,
                        marginLeft: 20,
                        marginTop: 10,
                        borderColor: '#E9E9E9',
                        backgroundColor: '#fff',
                        flexDirection: 'column',
                        justifyContent: 'space-around'
                    }}>
                        <Text style={{
                            marginTop: -10,
                            marginBottom: -25,
                            marginLeft: 25,
                            color: '#000',
                        }}>Dari</Text>
                        <TextInput
                            style={style.kotak2}
                            onChangeText={dari => this.setState({ dari })}
                            value={this.state.dari}
                            keyboardType='numeric'
                            placeholder="Bersaudara"
                            placeholderTextColor='#7e7e7e'
                        />
                    </View>
                </View>
                <View style={{
                    width: '90%',
                    height: 220,
                    borderRadius: 10,
                    borderWidth: 1,
                    marginLeft: 20,
                    marginTop: 10,
                    borderColor: '#E9E9E9',
                    backgroundColor: '#fff',
                    flexDirection: 'column',
                    justifyContent: 'space-around'
                }}>
                    <View >
                        <Text style={{
                            marginBottom: -0,
                            marginLeft: 25,
                            color: '#000',
                        }}>NIK Anak</Text>
                        <TextInput
                            style={style.kotak3}
                            onChangeText={nik_anak => this.setState({ nik_anak })}
                            value={this.state.nik_anak}
                            keyboardType='numeric'
                            placeholder="NIK"
                            placeholderTextColor='#7e7e7e'
                        />
                    </View>
                    <View >
                        <Text style={{
                            marginBottom: -0,
                            marginLeft: 25,
                            color: '#000',
                        }}>Nama Panggilan Anak</Text>
                        <TextInput
                            style={style.kotak3}
                            onChangeText={nickname => this.setState({ nickname })}
                            value={this.state.nickname}
                            keyboardType='default'
                            placeholder="Nama Panggilan"
                            placeholderTextColor='#7e7e7e'
                        />
                    </View>
                    <View>
                        <Text style={{
                            marginBottom: -0,
                            marginLeft: 25,
                            color: '#000',
                        }}>Nama Lengkap Anak</Text>
                        <TextInput
                            style={style.kotak3}
                            onChangeText={full => this.setState({ full })}
                            value={this.state.full}
                            keyboardType='default'
                            placeholder="Nama Lengkap"
                            placeholderTextColor='#7e7e7e'
                        />
                    </View>
                </View>
                <View>
                    <Text style={style.Label1}>Agama</Text>
                    <Picker style={style.Textinputcss} mode="dropdown"
                        selectedValue={this.state.agama}
                        onValueChange={(itemValue) => {
                            this.setState({
                                agama: itemValue
                            })
                        }}>
                        <Picker.Item style={{ fontSize: 12 }} label={'Pilih Agama'} value={'0'} key={'0'} />
                        <Picker.Item label="Islam" value="Islam" />
                        <Picker.Item label="Kristen" value="Kristen" />
                        <Picker.Item label="Budha" value="Budha" />
                        <Picker.Item label="Hindu" value="Hindu" />
                        <Picker.Item label="Konghuncu" value="Konghuncu" />
                    </Picker>
                </View>
                <View style={{
                    width: '90%',
                    height: 90,
                    borderRadius: 10,
                    borderWidth: 1,
                    marginLeft: 20,
                    marginTop: 10,
                    borderColor: '#E9E9E9',
                    backgroundColor: '#fff',
                    flexDirection: 'column',
                    justifyContent: 'space-around'
                }}>
                    <Text style={{
                        marginBottom: -15,
                        marginLeft: 25,
                        color: '#000',
                    }}>Tempat Lahir</Text>
                    <TextInput
                        style={style.kotak3}
                        onChangeText={tempat_lahir => this.setState({ tempat_lahir })}
                        value={this.state.tempat_lahir}
                        keyboardType='default'
                        placeholder="Tempat lahir"
                        placeholderTextColor='#7e7e7e'
                    />
                </View>
                <View style={{
                    width: '90%',
                    height: 100,
                    borderRadius: 10,
                    borderWidth: 1,
                    marginLeft: 20,
                    marginTop: 10,
                    borderColor: '#E9E9E9',
                    backgroundColor: '#fff',
                    flexDirection: 'column',
                    justifyContent: 'space-around'
                }}>
                    <Text style={{
                        marginBottom: -15,
                        marginLeft: 25,
                        color: '#000',
                    }}>Tanggal Lahir</Text>
                    <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-around' }} onPress={() => this.setState({ modaldate: true })}>
                        <Image source={date}
                            style={{
                                height: 30,
                                width: 30,
                                marginTop: 5,
                                marginLeft: 20,
                            }}></Image>


                        <Text
                            style={[style.kotak222, { width: '80%' }]}>
                            {moment(this.state.dateanak).format('YYYY-MM-DD')}

                        </Text>
                        {/* <Text style={{
                            color: '#000000',
                            marginTop: 2,
                            marginLeft: 20,
                            marginRight: 10,
                            borderRadius: 2,
                            borderWidth: 0.1,
                            fontSize: 18,
                            height: 40,
                            width: '80%',
                            backgroundColor: '#F0F8FF',
                        }}>{this.state.date.toLocaleString('default', { month: 'short' })} </Text> */}
                    </TouchableOpacity>


                </View>
                {/* <DateTimePicker
                    isVisible={this.state.isVisible}
                    onConfirm={this.handlePicker}
                    onCancel={this.setState({ isVisible: false })}
                    onDateChange={(date1) => {this.setState({date1: date1})}}
                    mode={'date'}
                    is24Hour={true}
                /> */}
                <Modal
                    animationType={"slide"}
                    transparent={true}
                    visible={this.state.modaldate}
                    onRequestClose={() => {
                        this.setState({ modaldate: false })
                    }}
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
                                        this.setState({ dateanak: moment(date).format('YYYY-MM-DD') }, () => console.log(this.state.dateanak))
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

                <View>
                    <Text style={style.Label1}>Jenis kelamin</Text>
                    <Picker style={style.Textinputcss} mode="dropdown"
                        selectedValue={this.state.gender}
                        onValueChange={(itemValue) => {
                            this.setState({
                                gender: itemValue
                            })
                        }}>
                        <Picker.Item style={{ fontSize: 12 }} label={'Pilih Jenis kelamin'} value={'0'} key={'0'} />
                        <Picker.Item label="Laki-Laki" value="Laki laki" />
                        <Picker.Item label="Perempuan" value="Perempuan" />
                    </Picker>
                </View>

                <View>
                    <Text style={style.Label1}>Tinggal Bersama</Text>
                    <Picker style={style.Textinputcss} mode="dropdown"
                        selectedValue={this.state.sm}
                        onValueChange={(itemValue) => {
                            this.setState({
                                sm: itemValue
                            })
                        }}>
                        < Picker.Item style={{ fontSize: 12 }} label={'Pilih Tinggal bersama'} value={'0'} key={'0'} />
                        {/* {
                        YT.map((sm) =>
                            <Picker.Item style={{ height: '100%', width: '100%', fontSize: 12, }} label={sm.label} value={sm.value} />
                        )
                    } */}
                        {sm.map(({ label, value, index }) => (
                            <Picker.Item style={{ fontSize: 12 }} label={label} value={value} key={index} />
                        ))}

                    </Picker>
                </View>

                <View>
                    <Text style={style.Label1}>Jenis Binaan</Text>
                    <Picker style={style.Textinputcss} mode="dropdown"
                        selectedValue={this.state.bina}
                        onValueChange={(itemValue) => {
                            this.setState({
                                bina: itemValue
                            })
                        }}>
                        <Picker.Item style={{ fontSize: 12 }} label={'Jenis Binaan'} value={'0'} key={'0'} />
                        {bina.map(({ label, value, index }) => (
                            <Picker.Item style={{ fontSize: 12 }} label={label} value={value} key={index} />
                        ))}

                    </Picker>
                </View>
                <View style={style.kotak5}>
                    <Text style={style.label3}>Pelajaran Favorit</Text>
                    <TextInput
                        style={style.kotak3}
                        onChangeText={pelajaran_favorit => this.setState({ pelajaran_favorit })}
                        value={this.state.pelajaran_favorit}
                        keyboardType='default'
                        placeholder="Pelajaran yang disukai"
                        placeholderTextColor='#7e7e7e'
                    />
                </View>
                <View style={style.kotak5}>
                    <Text style={style.label3}>Hobi</Text>
                    <TextInput
                        style={style.kotak3}
                        onChangeText={hobi => this.setState({ hobi })}
                        value={this.state.hobi}
                        keyboardType='default'
                        placeholder="Hobi"
                        placeholderTextColor='#7e7e7e'
                    />
                </View>
                <View>
                    <Text style={style.Label1}>Jenis Tahfidz</Text>
                    <Picker style={style.Textinputcss} mode="dropdown"
                        selectedValue={this.state.jenis_anak_binaan}
                        onValueChange={(itemValue) => {
                            this.setState({
                                jenis_anak_binaan: itemValue
                            })
                        }}>
                        <Picker.Item style={{ fontSize: 12 }} label={'Jenis Tahfidz'} value={'0'} key={'0'} />
                        <Picker.Item label=" Tahfidz" value="Tahfidz" />
                        <Picker.Item label="Non-Tahfidz" value="Non-Tahfidz" />
                    </Picker>
                </View>
                <View style={style.kotak5}>
                    <Text style={style.label3}>Prestasi</Text>
                    <TextInput
                        style={style.kotak3}
                        onChangeText={prestasi => this.setState({ prestasi })}
                        value={this.state.prestasi}
                        keyboardType='default'
                        placeholder="Prestasi"
                        placeholderTextColor='#7e7e7e'
                    />
                </View>
                <View style={style.kotak5}>
                    <Text style={style.label3}>Jarak Rumah Ke Shelter</Text>
                    <TextInput
                        style={style.kotak4}
                        onChangeText={text => this.setState({ jarak: text.replace(/\D/g, "") })}
                        value={this.state.jarak}
                        keyboardType='numeric'
                        placeholder=" KM"
                        placeholderTextColor='#7e7e7e'
                    />
                </View>
                <View>
                    <Text style={style.Label1}>Transportasi</Text>
                    <Picker style={style.Textinputcss} mode="dropdown"
                        selectedValue={this.state.kendaraan}
                        onValueChange={(itemValue) => {
                            this.setState({
                                kendaraan: itemValue
                            })
                        }}>
                        <Picker.Item style={{ fontSize: 12 }} label={'Pilih Transportasi'} value={'0'} key={'0'} />
                        <Picker.Item label="Jalan Kaki" value="Jalan Kaki" />
                        <Picker.Item label="Sepeda" value="Sepeda" />
                        <Picker.Item label="Sepeda Motor" value="Sepeda Motor" />
                        <Picker.Item label="Angkutan Umum" value="Angkutan Umum" />
                        <Picker.Item label="Diantar Orang Tua/Wali" value="Diantar Orang Tua/Wali" />
                        <Picker.Item label="Lainnya" value="Lainnya" />
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
                        <Image source={this.state.foto} style={{ width: 150, height: 150 }} />
                        <Camera style={style.imgSmall} />

                        {this.state.foto === null ?
                            <View>

                            </View>
                            : <View><Text style={{ backgroundColor: '#00A9B8', borderRadius: 10, padding: 10, color: '#fff', marginTop: 10, }}>Masukan Foto Anak</Text></View>}
                    </TouchableOpacity>
                </View>


                {/* <View style={{
                    width: '85%',
                    backgroundColor: '#ffffff',
                    borderRadius: 5,
                    marginTop: 5,
                    height: 40,
                    marginLeft: 30,
                    borderWidth: 1,
                    flexWrap: 'wrap',
                    padding: 5,
                    justifyContent: 'center', alignItems: 'center',
                    flexDirection: 'column',
                    borderColor: '#E9E9E9',
                }} >
                    <TextInput style={{ color: '#c7c7c7', width: '65%', padding: 5, marginLeft: 5, fontSize: 12 }}
                        placeholderTextColor='#A9A9A9'
                        keyboardType="email-address"
                        returnKeyType='next'
                        placeholder="Tidak ada file yang dipilih"
                        autoCorrect={false} value={this.state.file.name}>

                    </TextInput>
                    <TouchableOpacity style={{ height: 25, paddingLeft: 5, paddingRight: 5, backgroundColor: this.state.file.name === "" ? '#87cefa' : '#f2f2f2', borderRadius: 5, marginLeft: 10, }}
                        onPress={() => this.docPicker()}
                    >
                        <Text style={{ color: 'white', fontSize: 12, marginTop: 3 }}>Upload File</Text>
                    </TouchableOpacity>
                </View> */}

                <TouchableOpacity style={style.btnSimpanDark} onPress={() =>
                    // this.state.anak === '' ? alert('Tolong ada kolom yang belum terisi') :
                    //     this.state.dari === '' ? alert('Tolong ada kolom yang belum terisi') :
                    //         this.state.bina === '' ? alert('Tolong ada kolom yang belum terisi') :
                    //             this.state.jarak === '' ? alert('Tolong ada kolom yang belum terisi') :
                    //                 this.state.nickname === '' ? alert('Tolong ada kolom yang belum terisi') :
                    //                     this.state.full === '' ? alert('Tolong ada kolom yang belum terisi') :
                    //                         this.state.ag === '' ? alert('Tolong ada kolom yang belum terisi') :
                    //                             this.state.lahir === '' ? alert('Tolong ada kolom yang belum terisi') :
                    //                                 this.state.sm === '' ? alert('Tolong ada kolom yang belum terisi') :
                    //                                     this.state.tglahir === '' ? alert('Tolong ada kolom yang belum terisi') :
                    //                                         this.state.gender === '' ? alert('Tolong ada kolom yang belum terisi') :
                    //                                             this.state.kendaraan === '' ? alert('Tolong ada kolom yang belum terisi') :
                    //                                                 ToastAndroid.show("Data telah disimpan", ToastAndroid.SHORT)

                    this.SimpanData()}>
                    <Text>Lanjutkan</Text>
                </TouchableOpacity>
            </ScrollView >
        )
    }
}

export default Terdaftar1
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const style = StyleSheet.create({
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    Label1: {
        flex: 1,
        fontSize: 15,
        marginTop: 10,
        marginBottom: -1,
        marginLeft: 30,
        color: '#000000',
        flexDirection: 'column',
    },
    label3: {
        marginBottom: -15,
        marginLeft: 25,
        color: '#000',
    },
    kotak5: {
        width: '90%',
        height: 100,
        borderRadius: 10,
        borderWidth: 1,
        marginLeft: 20,
        marginTop: 10,
        borderColor: '#E9E9E9',
        backgroundColor: '#fff',
        flexDirection: 'column',
        justifyContent: 'space-around'
    },
    Textinputcss: {
        color: '#7e7e7e',
        marginLeft: 15,
        marginRight: 10,
        borderRadius: 10,
        borderWidth: 1,
        fontSize: 12,
        height: 52,
        backgroundColor: '#fff',
        shadowColor: "#333",
        shadowOffset: {
            width: 1,
            height: 1,
        },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        borderColor: '#7e7e7e',
        elevation: 3,
    },
    Label2: {
        marginLeft: 25,
        marginBottom: 5,
        color: '#000',
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
    Labeltgl: {
        marginTop: 5,
        position: 'absolute',
        top: 0, left: 10, right: 0, bottom: 0,
        height: 25, width: 25,
    },
    item: {
        flex: 1,
        fontSize: 16,
        flexDirection: 'row',
        backgroundColor: '#fff',
        padding: 17,
        marginVertical: 8,
        marginHorizontal: 16,
        shadowColor: "#333",
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
        width: 250,
        height: 250,
        flex: 1,
        margin: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        shadowColor: "#333",
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
        flexDirection: 'row',
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
        width: 150, height: 50,
        backgroundColor: '#87cefa',
        marginTop: 10,
        borderRadius: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: '#E9E9E9',
        justifyContent: 'center', alignContent: 'center',
        marginLeft: 120,
        fontSize: 12,
    },
    btnSimpanUn1: {
        width: '40%',
        fontWeight: 'bold',
        backgroundColor: '#C6C6C6',
        borderRadius: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: '#E9E9E9',
        justifyContent: 'center', alignItems: 'center',
        alignContent: 'center',
        textAlign: 'center',
    },
    coltom1: {
        width: '90%',
        marginLeft: 20,
        justifyContent: 'space-between',
        alignItems: 'center',
        alignContent: 'center',
        fontSize: 16,
        flexDirection: 'row',
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: '#fff',
        marginVertical: 8,
        marginHorizontal: 16,
        shadowColor: "#333",
        shadowOffset: {
            width: 1,
            height: 1,
        },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        borderColor: '#7e7e7e',
        elevation: 3,
    },
    itemflat: {
        fontSize: 16,
        flexDirection: 'column',
        backgroundColor: '#fff',
        padding: 20,
        height: 75,
        shadowColor: "#333",
        shadowOffset: {
            width: 1,
            height: 1,
        },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        borderColor: '#7e7e7e',
        elevation: 1,
    },
    ModalCont2: {
        backgroundColor: '#00000079',
    },
    wrap: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height * 0.25 // 25% window
    },
    itemText: {
        textAlign: 'justify',
        marginLeft: 10,
        fontSize: 12,
        width: '35%',
        height: 43,
    },
    tglText: {
        textAlign: 'justify',
        fontSize: 25,
    },
    kotak4: {
        color: '#000000',
        marginTop: 2,
        marginLeft: 20,
        marginRight: 10,
        borderRadius: 2,
        borderWidth: 0.1,
        fontSize: 12,
        height: 40,
        width: '15%',
        backgroundColor: '#F0F8FF',
    },
    kotak3: {
        color: '#000000',
        marginTop: 2,
        marginLeft: 20,
        marginRight: 10,
        borderRadius: 2,
        borderWidth: 0.1,
        fontSize: 12,
        height: 40,
        width: '90%',
        backgroundColor: '#F0F8FF',
    },//#e9e9e9//
    kotak2: {
        color: '#000000',
        marginTop: -15,
        marginLeft: 20,
        marginRight: 10,
        borderRadius: 2,
        borderWidth: 0.1,
        fontSize: 12,
        height: 40,
        width: '60%',
        backgroundColor: '#F0F8FF',
    },
    currentStepText: {
        color: "#7e7e7e",
        fontSize: 12
    },
    ModalCont2: {
        flex: 1,
        // alignItems: 'center',
        backgroundColor: '#00000079',
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
    kotak222: {
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
});