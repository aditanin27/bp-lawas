import { Text, View, StyleSheet, TouchableOpacity, TextInput, Dimensions, Image, ScrollView, ToastAndroid } from 'react-native'
import React, { Component } from 'react'
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'react-native-image-picker';
import { Camera } from '../../assets/icons'

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
export class TambahADMC extends Component {
    constructor(props) {
        super(props)
        this.state = {
            kacab: [],
            wilbin: [],
            shelter: [],
            email: '',
            password: '',
            cab: '',
            tingkat: '',
            nama: '',
            nohp: '',
            alamat: '',
            foto: {
                name: '',
                type: '',
                uri: '',
                id: 0,
            },
        }
    }
    GetShelterAPi() {
        fetch('https://kilauindonesia.org/datakilau/api/shelter/' + this.state.wb).then(res => {
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
        fetch('https://kilauindonesia.org/datakilau/api/wilbin/' + this.state.cab).then(res => {
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
        fetch('https://kilauindonesia.org/datakilau/api/kacab').then(res => {
            if (res.status === 200)
                return res.json()
        }).then(resdata => {
            console.log(resdata.data)
            this.setState({
                kacab: resdata.data,
            })
        })
    }
    sendData() {
        {
            let simpandata = {
                id_kacab: this.state.cab,
                alamat: this.state.alamat,
                no_hp: this.state.nohp,
                foto: this.state.foto,
                status: this.state.Status,
                nama_lengkap: this.state.nama,
                username: this.state.email,
                password: this.state.password,
                level: this.state.tingkat,
            }
            let data = new FormData();
            for (let key in simpandata) {
                data.append(key, simpandata[key]);
            }
            fetch('https://kilauindonesia.org/datakilau/api/tamadmc', {
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
                        alert(`Data gagal disimpan !!!`);
                    }
                })
                .catch((err) => console.log('dari catch send Data ===', err));
        }

    }
    componentDidMount() {
        this.GetKacabAPi();
        this.GetWilbinAPi();
        this.GetShelterAPi();
        console.log(this.props);
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
    render() {
        return (
            <ScrollView style={{ backgroundColor: '#fff', height: '100%' }}>
                <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 16 }}>Tambah Admin Cabang</Text>
                <View style={{ marginTop: '10%' }}>
                    <View style={style.form}>
                        <Text style={style.labelkiri}>Email</Text>
                        <TextInput
                            style={style.kotak3}
                            onChangeText={email => this.setState({ email })}
                            value={this.state.email}
                            keyboardType='default'
                            placeholder="Masukan Email"
                            placeholderTextColor="#C0C0C0"
                        />
                    </View>
                    <View style={style.form}>
                        <Text style={style.labelkiri}>Password</Text>
                        <TextInput
                            style={style.kotak3}
                            onChangeText={password => this.setState({ password })}
                            value={this.state.password}
                            keyboardType='default'
                            placeholder="Masukan Password"
                            placeholderTextColor="#C0C0C0"
                        />
                    </View>

                    <View style={style.form}>
                        <Text style={style.labelkiri}>Kantor Cabang</Text>
                        <View style={style.kotakpicker}>
                            <Picker
                                style={style.Textinputcss}
                                selectedValue={this.state.cab}
                                onValueChange={itemValue =>
                                    this.setState({ cab: itemValue, show: 1 })
                                }>
                                <Picker.Item
                                    style={{ fontSize: 14, fontFamily: 'Poppins-Regular', fontWeight: 'bold' }}
                                    label="Pilih Kantor Cabang"
                                    value=""
                                />
                                {
                                    this.state.kacab.map((cab) =>
                                        <Picker.Item style={{ height: '100%', width: '100%', fontSize: 12, }} label={cab.nama_kacab.toString()} value={cab.id_kacab} key={cab.id_kacab} />
                                    )}

                            </Picker>
                        </View>
                    </View>

                    <View style={style.form}>
                        <Text style={style.labelkiri}>Level Akses</Text>
                        <View style={style.kotakpicker}>
                            <Picker
                                style={style.Textinputcss}
                                selectedValue={this.state.tingkat}
                                onValueChange={itemValue =>
                                    this.setState({ tingkat: itemValue, show: 1 })
                                }>
                                <Picker.Item
                                    style={{ fontSize: 14, fontFamily: 'Poppins-Regular', fontWeight: 'bold' }}
                                    label="Pilih Level Akses"
                                    value=""
                                />
                                <Picker.Item style={{ fontSize: 14, fontFamily: 'Poppins-Regular', fontWeight: 'bold' }}
                                    label="Admin Cabang"
                                    value="admin_cabang" key="admin_cabang" />

                            </Picker>
                        </View>
                    </View>

                    <View style={style.form}>
                        <Text style={style.labelkiri}>Status</Text>
                        <View style={style.kotakpicker}>
                            <Picker
                                style={style.Textinputcss}
                                selectedValue={this.state.Status}
                                onValueChange={itemValue =>
                                    this.setState({ Status: itemValue, show: 1 })
                                }>
                                <Picker.Item
                                    style={{ fontSize: 14, fontFamily: 'Poppins-Regular', fontWeight: 'bold' }}
                                    label="Pilih Status"
                                    value=""
                                />
                                <Picker.Item style={{ fontSize: 14, fontFamily: 'Poppins-Regular', fontWeight: 'bold' }}
                                    label="Aktif"
                                    value="aktif" key="aktif" />

                                <Picker.Item style={{ fontSize: 14, fontFamily: 'Poppins-Regular', fontWeight: 'bold' }}
                                    label="Tidak Aktif"
                                    value="tidak akti" key="tidak akti" />
                            </Picker>
                        </View>
                    </View>

                    <View style={style.form}>
                        <Text style={style.labelkiri}>Nama Lengkap</Text>
                        <TextInput
                            style={style.kotak3}
                            onChangeText={nama => this.setState({ nama })}
                            value={this.state.nama}
                            keyboardType='default'
                            placeholder="Masukan Nama"
                            placeholderTextColor="#C0C0C0"
                        />
                    </View>
                    <View style={style.form}>
                        <Text style={style.labelkiri}>No HP</Text>
                        <TextInput
                            style={style.kotak3}
                            onChangeText={nohp => this.setState({ nohp })}
                            value={this.state.nohp}
                            keyboardType='numeric'
                            placeholder="Masukan No HP"
                            placeholderTextColor="#C0C0C0"
                        />
                    </View>
                    <View style={style.form}>
                        <Text style={style.labelkiri}>Alamat</Text>
                        <TextInput
                            style={[style.kotak3, { height: 60 }]}
                            onChangeText={alamat => this.setState({ alamat })}
                            multiline={true}
                            value={this.state.alamat}
                            keyboardType='default'
                            placeholder="Masukan Alamat"
                            placeholderTextColor="#C0C0C0"
                        />
                    </View>
                    <View style={style.form}>
                        <Text style={style.labelkiri}>Foto</Text>
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
                    </View>
                </View>
                <View style={style.BSimpan2}>
                    <TouchableOpacity onPress={() => this.props.navigation.replace('UserManagement', this.sendData())}>
                        <View style={style.BSimpan}>
                            <Text style={style.label5}>Simpan</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                {/* <View style={style.BSimpan2}>
                    <TouchableOpacity>
                        <View style={style.BSimpan}>
                            <Text style={style.label5}>Simpan</Text>
                        </View>
                    </TouchableOpacity>
                </View> */}
            </ScrollView >
        )
    }
}

export default TambahADMC
const style = StyleSheet.create({
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
    form: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        width: '100%'
    },
    kolomkecil: {
        backgroundColor: '#00A9B8',
        width: '100%',
    },
    BSimpan2: {
        height: 70,
        justifyContent: "center",
        alignContent: 'center',
        alignSelf: 'center',
        width: windowWidth * 0.5,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        bottom: 0,
    },
    BSimpan: {
        backgroundColor: '#00A9B8',
        borderRadius: 10,
        marginHorizontal: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    label5: {
        color: '#fff',
        padding: 10,
        fontFamily: 'Poppins-Medium',
        fontSize: 13,
        fontWeight: 'bold',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
    },
    kotak3: {
        color: '#000000',
        borderColor: '#bdbdbd',
        margin: 10,
        borderRadius: 2,
        borderWidth: 1,
        fontSize: 12,
        height: 40,
        borderRadius: 10,
        width: windowWidth * 0.5
    },
    kotakpicker: {
        marginTop: 10,
        marginLeft: 10,
        paddingVertical: 5,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#DDD',
        width: windowWidth * 0.5,
        height: 40,
    },
    Textinputcss: {
        width: windowWidth * 0.5,
        marginLeft: 10,
        color: '#C0C0C0',
        marginTop: -10,
        borderRadius: 10,
        borderWidth: 1,
        fontSize: 10,
        height: 40,
        borderColor: '#C0C0C0',
        fontFamily: 'Poppins-Regular',
    },
    btnSimpan: {
        backgroundColor: '#00A9B8',
        padding: '4%',
        borderRadius: 10,
        marginTop: '1%',
        width: '70%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    imgSmall: {
        position: 'absolute', flex: 1, alignItems: 'center', justifyContent: 'center'
    },
});