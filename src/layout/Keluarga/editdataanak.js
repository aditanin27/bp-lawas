import { ScrollView, Text, View, TextInput, StyleSheet, Dimensions, TouchableOpacity, Image, ToastAndroid, Modal } from 'react-native'
import React, { Component } from 'react'
import { Tanggal, Camera, UpLoc } from '../../assets/icons'
import { Picker } from '@react-native-picker/picker';
// import { DatePicker } from 'react-native-wheel-pick'
import * as ImagePicker from "react-native-image-picker"
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps'
import moment from 'moment';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
export class editdataanak extends Component {
    constructor(props) {
        super(props)
        this.state = {
            nik_anak: this.props.route.params.detak.nik_anak,
            anak_ke: this.props.route.params.detak.anak_ke,
            dari_bersaudara: this.props.route.params.detak.dari_bersaudara,
            nick_name: this.props.route.params.detak.nick_name,
            full_name: this.props.route.params.detak.full_name,
            agama: this.props.route.params.detak.agama,
            tempat_lahir: this.props.route.params.detak.tempat_lahir,
            detail: this.props.route.params.detak,
            tanggal: new Date(),
            chosenDate: this.props.route.params.detak.tanggal_lahir,
            jenis_kelamin: this.props.route.params.detak.jenis_kelamin,
            tinggal_bersama: this.props.route.params.detak.tinggal_bersama,
            status_cpb: this.props.route.params.detak.status_cpb,
            pelajaran_favorit: this.props.route.params.detak.pelajaran_favorit,
            prestasi: this.props.route.params.detak.prestasi,
            hobi: this.props.route.params.detak.hobi,
            jarak_rumah: this.props.route.params.detak.jarak_rumah,
            transportasi: this.props.route.params.detak.transportasi,
            latitudedulu: this.props.route.params.detak.latitude,
            longitudedulu: this.props.route.params.detak.longitude,
            mapType: 'hybrid',
            modaldate: false,
            foto: {
                name: '',
                type: '',
                uri: "https://kilauindonesia.org/datakilau/gambarUpload/" + this.props.route.params.detak.foto,
                id: 0,
            },
            latitude: 0,
            longitude: 0,
            // markers: {
            //     coordinate: {
            //         latitude: 0,
            //         longitude: 0,
            //     },
            // }

        }
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
    onMapPress(e) {
        this.setState({
            markers:
            {
                coordinate: e.nativeEvent.coordinate,

            },

        });
        console.log(this.state.markers)
    }
    handlePicker(date) {
        this.setState({ isVisible: false, chosenDate: moment(date).format('DD-MM-YYYY') })
    }
    hidePicker = () => {
        this.setState({
            isVisible: false,

        })
    }
    showPicker = () => {
        this.setState({ isVisible: true })
    }
    componentDidMount() {
        console.log(this.state.latitude,
            this.state.longitude)
            ;
    }
    editData() {
        {
            let simpandata = {

                nick_name: this.state.nick_name,
                full_name: this.state.full_name,
                agama: this.state.agama,
                tempat_lahir: this.state.tempat_lahir,
                tanggal_lahir: moment(this.state.chosenDate).format('YYYY-MM-DD'),
                jenis_kelamin: this.state.jenis_kelamin,
                tinggal_bersama: this.state.tinggal_bersama,
                status_cpb: this.state.status_cpb,
                pelajaran_favorit: this.state.pelajaran_favorit,
                hobi: this.state.hobi,
                jarak_rumah: this.state.jarak_rumah,
                transportasi: this.state.transportasi,
                prestasi: this.state.prestasi,
                foto: this.state.foto.name === '' ? '' : this.state.foto,
                latitude: this.state.latitude === 0 ? this.state.latitudedulu : this.state.latitude,
                longitude: this.state.longitude === 0 ? this.state.longitudedulu : this.state.latitude,


            }
            let data = new FormData();
            for (let key in simpandata) {
                data.append(key, simpandata[key]);
            }
            fetch('https://kilauindonesia.org/datakilau/api/anakupd/' + this.props.route.params.detak.id_anak, {
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
                        this.props.navigation.navigate('List_Anak_Binaan')
                        ToastAndroid.show("Data berhasil diperbaharui!", ToastAndroid.SHORT)
                    } else {
                        alert(`Data gagal disimpan !!!`);
                    }
                })
                .catch((err) => console.log('dari catch send Data ===', err));
        }

    }
    render() {
        const detail = this.state.detail
        return (
            <ScrollView style={{ backgroundColor: '#FFF' }}>
                <View>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('maps', { det: this.state.detail })}>
                        <Text style={style.labelatas}>Edit Anak</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <View style={style.form}>
                        <Text style={style.labelkiri}>Anak Ke:</Text>
                        <TextInput
                            style={style.kotak3}
                            onChangeText={anak_ke => this.setState({ anak_ke })}
                            value={this.state.anak_ke}
                            keyboardType='numeric'
                            placeholder=""
                            placeholderTextColor="#C0C0C0"
                        />
                    </View>
                    <View style={style.form}>
                        <Text style={style.labelkiri}>Dari</Text>
                        <TextInput
                            style={style.kotaksaudara}
                            onChangeText={dari_bersaudara => this.setState({ dari_bersaudara })}
                            value={this.state.dari_bersaudara}
                            keyboardType='numeric'
                            placeholder=""
                            placeholderTextColor="#C0C0C0"
                        />
                        <Text style={{ marginLeft: 10, marginTop: 5 }}>Bersaudara</Text>
                    </View>
                    <View style={style.form}>
                        <Text style={style.labelkiri}>Nama Panggilan</Text>
                        <TextInput
                            style={style.kotak3}
                            onChangeText={nick_name => this.setState({ nick_name })}
                            value={this.state.nick_name}
                            keyboardType='defalut'
                            placeholder=""
                            placeholderTextColor="#C0C0C0"
                        />
                    </View>
                    <View style={style.form}>
                        <Text style={style.labelkiri}>Nama Lengkap</Text>
                        <TextInput
                            style={style.kotak3}
                            onChangeText={full_name => this.setState({ full_name })}
                            value={this.state.full_name}
                            keyboardType='defalut'
                            placeholder=""
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
                    </View>

                    <View style={style.form}>
                        <Text style={style.labelkiri}>Tempat Lahir</Text>
                        <TextInput
                            style={style.kotak3}
                            onChangeText={tempat_lahir => this.setState({ tempat_lahir })}
                            value={this.state.tempat_lahir}
                            keyboardType='default'
                            placeholder=""
                            placeholderTextColor="#C0C0C0"
                        />
                    </View>
                    <View style={style.form}>
                        <Text style={style.labelkiri}>Tanggal Lahir</Text>
                        <TextInput
                            style={style.kotak3}
                            onChangeText={chosenDate => this.setState({ chosenDate })}
                            value={this.state.chosenDate}
                            keyboardType='numeric'
                            placeholder=""
                            placeholderTextColor="#C0C0C0"
                        />
                        <View
                            style={{
                                borderColor: '#DDD',
                                borderWidth: 1,
                                height: 50,
                                width: 50,
                                borderRadius: 10,
                                top: 6,
                                marginLeft: 10,

                            }}>
                            <TouchableOpacity onPress={() => this.setState({ modaldate: true })}>
                                <View style={{ height: 47, width: 47, justifyContent: 'center', alignItems: 'center', borderRadius: 10, }}>
                                    <Tanggal />
                                </View>
                            </TouchableOpacity>
                        </View>
                        {/* <DateTimePicker
                            isVisible={this.state.isVisible}
                            onConfirm={this.handlePicker}
                            onCancel={this.hidePicker}
                            mode={'date'}
                            is24Hour={true}
                        /> */}
                    </View>
                    <View style={style.form}>
                        <Text style={style.labelkiri}>Jenis Kelamin</Text>
                        <View
                            style={style.kotakpicker}>
                            <Picker style={style.Textinputcss}
                                selectedValue={this.state.jenis_kelamin}
                                onValueChange={(itemValue,) => {
                                    this.setState({
                                        jenis_kelamin: itemValue
                                    })
                                }}>
                                <Picker.Item style={{ fontSize: 12 }} label={this.state.jenis_kelamin} value={'0'} key={'0'} />
                                <Picker.Item label="Laki-Laki" value="Laki-Laki" />
                                <Picker.Item label="Perempuan" value="Perempuan" />

                            </Picker>
                        </View>
                    </View>

                    <View style={style.form}>
                        <Text style={style.labelkiri}>Tinggal Bersama</Text>
                        <View
                            style={style.kotakpicker}>
                            <Picker style={style.Textinputcss}
                                selectedValue={this.state.tinggal_bersama}
                                onValueChange={(itemValue,) => {
                                    this.setState({
                                        tinggal_bersama: itemValue
                                    })
                                }}>
                                <Picker.Item style={{ fontSize: 12 }} label={this.state.tinggal_bersama} value={'0'} key={'0'} />
                                <Picker.Item label="Ayah" value="Ayah" />
                                <Picker.Item label="Ibu" value="Ibu" />
                                <Picker.Item label="Wali" value="Wali" />

                            </Picker>
                        </View>
                    </View>
                    <View style={style.form}>
                        <Text style={style.labelkiri}>Status Binaan</Text>
                        <View
                            style={style.kotakpicker}>
                            <Picker style={style.Textinputcss}
                                selectedValue={this.state.status_cpb}
                                onValueChange={(itemValue,) => {
                                    this.setState({
                                        status_cpb: itemValue
                                    })
                                }}>
                                <Picker.Item style={{ fontSize: 12 }} label={this.state.status_cpb} value={'0'} key={'0'} />
                                <Picker.Item label="NPB" value="NPB" />
                                <Picker.Item label="CPB" value="CPB" />
                                <Picker.Item label="BCPB" value="BCPB" />

                            </Picker>
                        </View>
                    </View>
                    <View style={style.form}>
                        <Text style={style.labelkiri}>Pelajaran Favorit</Text>
                        <TextInput
                            style={style.kotak3}
                            onChangeText={pelajaran_favorit => this.setState({ pelajaran_favorit })}
                            value={this.state.pelajaran_favorit}
                            keyboardType='default'
                            placeholder=""
                            placeholderTextColor="#C0C0C0"
                        />
                    </View>
                    <View style={style.form}>
                        <Text style={style.labelkiri}>Hobi</Text>
                        <TextInput
                            style={style.kotak3}
                            onChangeText={hobi => this.setState({ hobi })}
                            value={this.state.hobi}
                            keyboardType='default'
                            placeholder=""
                            placeholderTextColor="#C0C0C0"
                        />
                    </View>
                    <View style={style.form}>
                        <Text style={style.labelkiri}>Prestasi</Text>
                        <TextInput
                            style={style.kotak3}
                            onChangeText={prestasi => this.setState({ prestasi })}
                            value={this.state.prestasi}
                            keyboardType='default'
                            placeholder=""
                            placeholderTextColor="#C0C0C0"
                        />
                    </View>
                    <View style={style.form}>
                        <Text style={style.labelkiri}>Jarak Rumah</Text>
                        <TextInput
                            style={style.kotaksaudara}
                            onChangeText={jarak_rumah => this.setState({ jarak_rumah })}
                            value={this.state.jarak_rumah}
                            keyboardType='numeric'
                            placeholder=""
                            placeholderTextColor="#C0C0C0"
                        />
                        <Text style={{ marginTop: 5, marginLeft: 10 }}>KM</Text>
                    </View>
                    <View style={style.form}>
                        <Text style={style.labelkiri}>Transportasi</Text>
                        <View
                            style={style.kotakpicker}>
                            <Picker style={style.Textinputcss}
                                selectedValue={this.state.transportasi}
                                onValueChange={(itemValue,) => {
                                    this.setState({
                                        transportasi: itemValue
                                    })
                                }}>
                                <Picker.Item style={{ fontSize: 12 }} label={detail.transportasi} value={''} key={''} />
                                <Picker.Item label="Jalan Kaki" value="Jalan Kaki" />
                                <Picker.Item label="Sepeda" value="Sepeda" />
                                <Picker.Item label="Sepeda Motor" value="Sepeda Motor" />
                                <Picker.Item label="Angkutan Umum" value="Angkutan Umum" />
                                <Picker.Item label="Diantar Orang Tua/Wali" value="Diantar Orang Tua/Wali" />
                                <Picker.Item label="Lainnya" value="Lainnya" />

                            </Picker>
                        </View>
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
                            onPress={(e) => this.setState({
                                latitude: e.nativeEvent.coordinate.latitude,
                                longitude: e.nativeEvent.coordinate.longitude
                            })}
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
                        {/* <TouchableOpacity style={style.refresh} onPress={() => this.setState({ mapType: this.state.mapType === 'standard' ? 'hybrid' : 'standard' })}>
                            <UpLoc />
                        </TouchableOpacity> */}

                        {/* <TouchableOpacity style={{
                            padding: 10,
                            position: 'absolute',
                            bottom: 30,
                            marginLeft: '25%',
                            textAlign: 'center',
                            borderRadius: 5,
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: '#0EBEDF', width: 170, height: 40, borderRadius: 10
                        }} onPress={() =>
                            this.props.navigation.navigate('editdataanak',
                                { mapType: this.state.mapType === 'standard' ? 'hybrid' : 'standard' }, this.editData())}>
                            <Text style={{ color: '#fff' }}>Ubah Koordinat Anak</Text>
                        </TouchableOpacity> */}

                    </View >
                    {/* <View style={style.form}>
                        <Text style={style.labelkiri}>Latitude</Text>
                        <TextInput
                            style={style.kotak3}
                            onChangeText={latitude => this.setState({ latitude })}
                            value={this.state.latitude}
                            editable={false}
                            keyboardType='numeric'
                            placeholder=""
                            placeholderTextColor="#C0C0C0"
                        />
                    </View>
                    <View style={style.form}>
                        <Text style={style.labelkiri}>Longitude</Text>
                        <TextInput
                            style={style.kotak3}
                            onChangeText={longitude => this.setState({ longitude })}
                            value={this.state.longitude}
                            editable={false}
                            keyboardType='numeric'
                            placeholder=""
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
                                marginTop: -10

                            }}>
                            <TouchableOpacity TouchableOpacity onPress={() => this.props.navigation.navigate('maps', { det: this.state.detail })}
                            >
                                <View style={{ height: 50, width: 50, justifyContent: 'center', alignItems: 'center', borderRadius: 10, }}>
                                    <Date />
                                </View>
                            </TouchableOpacity>
                        </View>
                       
                    </View>
                     */}
                    <Text style={[style.labelkiri, { marginLeft: 10 }]}>Foto Anak</Text>
                    <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 20, width: 300, height: 300, alignSelf: 'center' }}>
                        <TouchableOpacity onPress={() => { this.takePic() }} style={{
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

                            {this.state.image === null ?
                                <View>

                                </View>
                                : <View><Text style={{ backgroundColor: '#00A9B8', borderRadius: 10, padding: 10, color: '#fff', marginTop: 10, }}>Ubah Foto Anak</Text></View>}
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center', alignSelf: 'center', marginTop: 0, }}>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('List_Anak_Binaan')} style={style.refresh}>
                                <View style={{
                                    top: 20,
                                    backgroundColor: '#DC143C', width: 170, height: 40, justifyContent: 'center', alignContent: 'center', alignItems: 'center', alignSelf: 'center', borderRadius: 10
                                }}>
                                    <Text style={{ color: '#fff', textAlign: 'center', justifyContent: 'center', alignContent: 'center' }}>Batal</Text>
                                </View>
                            </TouchableOpacity>
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
                                                this.setState({ chosenDate: moment(date).format('YYYY-MM-DD') }, () => console.log(this.state.chosenDate))
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
                        <View style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center', alignSelf: 'center', marginTop: 0, }}>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('List_Anak_Binaan', this.editData())} style={style.refresh} >
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
            </ScrollView>
        )
    }
}

export default editdataanak
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
    kotaksaudara: {
        marginTop: 10,
        color: '#000',
        borderRadius: 10,
        borderWidth: 0.1,
        fontSize: 13,
        height: 40,
        width: windowWidth * 0.3,
        padding: 12,
        backgroundColor: '#fff',
        borderColor: '#DDDDDD',
        borderWidth: 1,
        fontFamily: 'Poppins-Regular',
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
    imgSmall: {
        position: 'absolute', flex: 1, alignItems: 'center', justifyContent: 'center'
    },
    map: {
        ...StyleSheet.absoluteFillObject,
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