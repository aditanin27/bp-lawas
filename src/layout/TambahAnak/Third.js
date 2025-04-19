import {
    ScrollView, Text, View, StyleSheet, TouchableOpacity, Dimensions,
    TextInput, Button, Modal, SafeAreaView, Image, Alert
} from 'react-native'
import React, { Component } from 'react'
// import DatePicker from 'react-native-date-picker';
// import { DatePicker } from 'react-native-wheel-pick'
import { x, date } from '../../assets/images'
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import { Camera, Markers, Tanggal } from '../../assets/icons'
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'react-native-image-picker';
import DocumentPicker from "react-native-document-picker"
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps'
import moment from 'moment';

export class Third extends Component {
    constructor(props) {
        super(props)
        this.state = {
            anakfoto: {
                name: '',
                type: '',
                uri: '',
                size: '',
            },
            nikanak: '',
            anak: '',
            saudara: '',
            panggilan: '',
            namaanak: '',
            agama: '',
            tempatlahir: '',
            JK: '',
            TB: '',
            kendaraan: '',
            pelfa: '',
            hobi: '',
            JB: '',
            prestasi: '',
            jenis_anak_binaan: '',
            SOT: this.props.route.params.SOT,
            jenis: [],
            tinggal: [],
            sm: '',
            YT: [],
            Binaan: [],
            bina: '',
            hobi: '',
            tahfidz: [],
            bacaan: '',
            pres: '',
            jarak: '',
            trans: [],
            totalSteps: "",
            currentStep: "",
            dateanak: new Date(),
            modaldate: false,
            show: false,
            isVisible: false,
            mapType: 'hybrid',
            latitude: 0,
            longitude: 0,
            region: {
                latitude: 0,
                longitude: 0,
                latitudeDelta: 0.02,
                longitudeDelta: 0.04,
            },
        }
    }

    takePicAnak(index) {
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
                            //   id: 0,
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
                            totol: index,
                            tot: index,
                        });
                        console.log('ini gambar = ', this.state.taimage);
                    }
                },
            );
        }
    }
    onPress = () => {
        const nikanak = this.state.nikanak;

        if (nikanak.length < 16) {
            Alert.alert(
                'Peringatan',
                'NIK Anak anda kurang dari 16 digit',
                [
                    {
                        text: "Ya",
                        onPress: () => this.setState({}),
                        style: "cancel"
                    },
                ],
                { cancelable: false },
            )
        } else {
            this.props.navigation.replace('Four', {
                nikanak: this.state.nikanak,
                anak: this.state.anak,
                saudara: this.state.saudara,
                panggilan: this.state.panggilan,
                namaanak: this.state.namaanak,
                agama: this.state.agama,
                tempatlahir: this.state.tempatlahir,
                dateanak: this.state.dateanak,
                JK: this.state.JK,
                TB: this.state.TB,
                kendaraan: this.state.kendaraan,
                pelfa: this.state.pelfa,
                hobi: this.state.hobi,
                jarak: this.state.jarak,
                JB: this.state.JB,
                jenis_anak_binaan: this.state.jenis_anak_binaan,
                latitude: this.state.latitude,
                longitude: this.state.longitude,
                prestasi: this.state.prestasi,
                anakfoto: this.state.anakfoto,
                tingkat: this.props.route.params.tingkat,
                kelas: this.props.route.params.kelas,
                namasek: this.props.route.params.namasek,
                alamatsek: this.props.route.params.alamatsek,
                semester: this.props.route.params.semester,
                jurusan: this.props.route.params.jurusan,
                kepala: this.props.route.params.kepala,
                KK: this.props.route.params.KK,
                cabang: this.props.route.params.cabang,
                binaan: this.props.route.params.binaan,
                shel: this.props.route.params.shel,
                SOT: this.props.route.params.SOT,
                namabank: this.props.route.params.namabank,
                norek: this.props.route.params.norek,
                an_rek: this.props.route.params.an_rek,
                nohp: this.props.route.params.nohp,
                an_hp: this.props.route.params.an_hp,
                notelp: this.props.route.params.notelp,
                surket: this.props.route.params.surket,
                sktm: this.props.route.params.sktm,
            })
        }
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

        const { currentStep, totalSteps } = this.state;
        // const sm = [
        //     this.state.so === 'YT' ?
        //         label: "Tinggal bersama Wali", value: "TBW"

        //     },
        //     {
        //         label: "Tinggal bersama Ayah", value: "TBA"
        //     },
        //     {
        //         label: "Tinggal bersama Ibu", value: "TBI"
        //     }
        // ]
        const sm = this.state.SOT === 'Yatim_Piatu' ?
            [
                { label: 'Tinggal Bersama Wali', value: 'Wali', index: '0' }
            ] :
            [
                { label: 'Tinggal Bersama Ayah', value: 'Ayah', index: '1' },
                { label: 'Tinggal Bersama Ibu', value: 'Ibu', index: '2' }
            ]

        const bina = this.state.SOT === 'Non_Dhuafa' ?
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
        var options = {
            year: "numeric",
            month: "2-digit",
            day: "numeric"
        };
        return (
            <ScrollView style={{ backgroundColor: '#fff' }}>
                <Text style={style.Label2}>Informasi Anak</Text>

                <View style={{ height: '100%', alignContent: 'center', alignSelf: 'center' }}>

                    <TextInput
                        style={style.kotak3}
                        maxLength={16}
                        onChangeText={nikanak => this.setState({ nikanak })}
                        value={this.state.nikanak}
                        placeholder="NIK"
                        keyboardType='numeric'
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
                        onChangeText={tempatlahir => this.setState({ tempatlahir })}
                        value={this.state.tempatlahir}
                        placeholder="Tempat Lahir"
                        placeholderTextColor="#C0C0C0"
                    />
                    <View style={[style.kotak3, { height: 100, }]}>
                        <Text>Tanggal Lahir</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <Text
                                style={style.kotak7}>
                                {moment(this.state.dateanak).format('YYYY-MM-DD')}

                            </Text>
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
                                <TouchableOpacity TouchableOpacity onPress={() => this.setState({ modaldate: true })}>
                                    <View style={{ height: 50, width: 50, justifyContent: 'center', alignItems: 'center', borderRadius: 10, }}>
                                        <Tanggal />
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
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
                    <View
                        style={style.kotakpicker}>
                        <Picker
                            style={style.Textinputcss}
                            selectedValue={this.state.JK}
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
                            onChangeText={anak => this.setState({ anak })}
                            value={this.state.anak}
                            placeholder="Anak ke"
                            keyboardType='numeric'
                            placeholderTextColor="#C0C0C0"
                        />
                        <Text style={{ color: '#000', color: '#000', fontSize: 16, fontFamily: 'Poppins-Regular' }}> dari</Text>
                        <TextInput
                            style={style.kotak6}
                            onChangeText={saudara => this.setState({ saudara })}
                            value={this.state.saudara}
                            placeholder="Saudara"
                            keyboardType='numeric'
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
                    <TextInput
                        style={style.kotak3}
                        onChangeText={prestasi => this.setState({ prestasi })}
                        value={this.state.prestasi}
                        placeholder="Prestasi"
                        placeholderTextColor="#C0C0C0"
                    />
                    <TextInput
                        style={style.kotak3}
                        onChangeText={jarak => this.setState({ jarak })}
                        value={this.state.jarak}
                        keyboardType='numeric'
                        placeholder="Jarak Rumah Ke Shelter(KM)"
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

                    <View
                        style={style.kotakpicker}>
                        <Picker
                            style={style.Textinputcss}
                            selectedValue={this.state.kendaraan}
                            onValueChange={itemValue =>
                                this.setState({ kendaraan: itemValue, show: 1 })
                            }>
                            <Picker.Item style={{ fontSize: 12 }} label={"Pilih Transportasi"} value={''} key={''} />
                            <Picker.Item label="Jalan Kaki" value="Jalan Kaki" />
                            <Picker.Item label="Sepeda" value="Sepeda" />
                            <Picker.Item label="Sepeda Motor" value="Sepeda Motor" />
                            <Picker.Item label="Angkutan Umum" value="Angkutan Umum" />
                            <Picker.Item label="Diantar Orang Tua/Wali" value="Diantar Orang Tua/Wali" />
                            <Picker.Item label="Lainnya" value="Lainnya" />
                        </Picker>
                    </View>

                    <View style={style.kotakpicker}>
                        <Picker
                            style={style.Textinputcss}
                            selectedValue={this.state.jenis_anak_binaan}
                            onValueChange={itemValue =>

                                this.setState({ jenis_anak_binaan: itemValue, show: 1 })
                            }>
                            <Picker.Item style={{ fontSize: 12 }} label={'Jenis Tahfidz'} value={'0'} key={'0'} />
                            <Picker.Item label=" Tahfidz" value="Tahfidz" />
                            <Picker.Item label="Non-Tahfidz" value="Non-Tahfidz" />
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
                            userLocationCalloutEnabled={true}
                            followsUserLocation={true}
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
                            <Image source={this.state.anakfoto} style={{ width: 150, height: 150 }} />
                            <Camera style={style.imgSmall} />

                            {this.state.anakfoto === null ?
                                <View>

                                </View>
                                : <View><Text style={{ backgroundColor: '#00A9B8', borderRadius: 10, padding: 10, color: '#fff', marginTop: 10, }}>Masukan Foto Anak</Text></View>}
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={style.nextbuttonTextStyle} onPress={() =>
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
                        this.onPress()} >
                        <Text style={{ justifyContent: 'center', textAlign: 'center', color: '#fff' }}>Lanjutkan</Text>
                    </TouchableOpacity>
                </View>


            </ScrollView >
        )
    }
}

export default Third
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const style = StyleSheet.create({

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

    map: {
        position: "absolute",
        width: windowWidth * 0.9,
        height: windowHeight * 0.3,
        marginLeft: -10,
        flex: 1,
    },

});