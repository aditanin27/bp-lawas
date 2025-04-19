import { Text, View, StyleSheet, TouchableOpacity, TextInput, Dimensions, Image, ScrollView } from 'react-native'
import React, { Component } from 'react'
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'react-native-image-picker';
import { Camera } from '../../assets/icons'

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
export class TambahDona extends Component {
    constructor(props) {
        super(props)
        this.state = {
            anak: [],
            kacab: [],
            wilbin: [],
            shelter: [],
            listbank: [],
            status: 'aktif',
            level: 'donatur',
            email: '',
            password: '',
            id_kacab: '',
            id_wilbin: '',
            id_shelter: '',
            nama_lengkap: '',
            no_hp: '',
            pilbank: '',
            alamat: '',
            no_req: '',
            statanak: '',
            pilnak: '',
            foto: {
                name: '',
                type: '',
                uri: '',
                id: 0,
            },
        }
    }
    GetShelterAPi() {
        fetch('https://kilauindonesia.org/datakilau/api/shelter/' + this.state.id_wilbin).then(res => {
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
        fetch('https://kilauindonesia.org/datakilau/api/wilbin/' + this.state.id_kacab).then(res => {
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

    GetanakAPi() {
        fetch('https://kilauindonesia.org/datakilau/api/joindataanak').then(res => {
            if (res.status === 200)
                return res.json()
        }).then(resdata => {
            console.log(resdata.data)
            this.setState({
                anak: resdata.data,
            })
        })
    }
    SimpanData() {
        {
            let simpandata = {
                username: this.state.email,
                password: this.state.password,
                level: this.state.level,
                status: this.state.status,
                nama_lengkap: this.state.nama_lengkap,
                id_kacab: this.state.id_kacab,
                id_wilbin: this.state.id_wilbin,
                id_shelter: this.state.id_shelter,
                alamat: this.state.alamat,
                id_bank: this.state.pilbank === '' ? '' : this.state.pilbank,
                no_rekening: this.state.no_req === '' ? '' : this.state.no_req,
                no_hp: this.state.no_hp === '' ? '' : this.state.no_hp,
                diperuntukan: this.state.diperuntukan,
                foto: this.state.foto.name === '' ? '' : this.state.foto,
            }
            let data = new FormData();
            for (let key in simpandata) {
                data.append(key, simpandata[key]);
            }
            fetch('https://kilauindonesia.org/datakilau/api/tamdonatur', {
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
                        this.props.navigation.navigate('PengajuanAnak')
                        ToastAndroid.show("Data berhasil ditambah!", ToastAndroid.SHORT)
                    } else {
                        alert(`Data gagal disimpan !!!`);
                    }
                })
                .catch((err) => console.log('dari catch send Data ===', err));
        }

    }
    GetBankAPi() {
        fetch('https://kilauindonesia.org/datakilau/api/getbankpen')
            .then(res => {
                if (res.status === 200) return res.json();
            })
            .then(resdata => {
                console.log(resdata.data);
                this.setState({
                    listbank: resdata.data,
                    refreshing: false,

                });
            });
    }
    componentDidMount() {
        this.GetKacabAPi();
        this.GetWilbinAPi();
        this.GetShelterAPi();
        this.GetanakAPi();
        this.GetBankAPi();
        console.log(this.props);
    }
    takePic() {
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
                            foto: source,
                        });
                        console.log('ini gambar = ', this.state.foto);
                    }
                },
            );
        }
    }
    render() {
        const pilihanak = this.state.anak.filter(item => item.status_cpb === this.state.statanak)
        const pilnak = this.state.anak.filter(item => item.status_cpb === 'NPB' && 'CBP')

        return (
            <ScrollView style={{ backgroundColor: '#fff', height: '100%' }}>
                <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 16 }}>Tambah Donatur</Text>
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
                        <Text style={style.labelkiri}>Diperuntukkan</Text>
                        <View style={style.kotakpicker}>
                            <Picker
                                style={style.Textinputcss}
                                selectedValue={this.state.diperuntukan}
                                onValueChange={itemValue =>
                                    this.setState({ diperuntukan: itemValue, show: 1 })
                                }>
                                <Picker.Item
                                    style={{ fontSize: 14, fontFamily: 'Poppins-Regular', fontWeight: 'bold' }}
                                    label="Pilih Status Anak"
                                    value=""
                                />

                                <Picker.Item style={{ height: '100%', width: '100%', fontSize: 12, }}
                                    label="Pengajuan Donatur (Calon Anak Non Beasiswa)"
                                    value="NPB" key="NPB" />

                                <Picker.Item style={{ height: '100%', width: '100%', fontSize: 12, }}
                                    label="Pengajuan Donatur (Calon Anak Penerima Beasiswa)"
                                    value="CPB" key="CPB" />

                                <Picker.Item style={{ height: '100%', width: '100%', fontSize: 12, }}
                                    label="Pengajuan Donatur CPB Dan NPB"
                                    value="CPB DAN NPB " key="CPB DAN NPB" />

                            </Picker>
                        </View>
                    </View>

                    <View style={style.form}>
                        <Text style={style.labelkiri}>Kantor Cabang</Text>
                        <View style={style.kotakpicker}>
                            <Picker
                                style={style.Textinputcss}
                                selectedValue={this.state.id_kacab}
                                onValueChange={itemValue =>
                                    this.setState({ id_kacab: itemValue, show: 1 })
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
                        <Text style={style.labelkiri}>Wilayah Binaan</Text>
                        <View style={style.kotakpicker}>
                            <Picker
                                style={style.Textinputcss}
                                onFocus={() => { this.GetWilbinAPi() }}
                                selectedValue={this.state.id_wilbin}
                                onValueChange={(itemValue, kacab) => {
                                    this.setState({
                                        id_wilbin: (itemValue),
                                        show: 1
                                    })
                                }}>
                                <Picker.Item
                                    style={{ fontSize: 14, fontFamily: 'Poppins-Regular', fontWeight: 'bold' }}
                                    label="Pilih Wilayah Binaan"
                                    value=""
                                />
                                {
                                    this.state.wilbin.map((wb) =>
                                        <Picker.Item style={{ height: '100%', width: '100%', fontSize: 12, }} label={wb.nama_wilbin.toString()} value={wb.id_wilbin} key={wb.id_wilbin} />
                                    )}

                            </Picker>
                        </View>
                    </View>

                    <View style={style.form}>
                        <Text style={style.labelkiri}>Shelter</Text>
                        <View style={style.kotakpicker}>
                            <Picker
                                style={style.Textinputcss}
                                onFocus={() => { this.GetShelterAPi() }}
                                selectedValue={this.state.id_shelter}
                                onValueChange={(itemValue, wilbin) => {
                                    this.setState({
                                        id_shelter: (itemValue),
                                        show: 1
                                    })
                                }}>
                                <Picker.Item
                                    style={{ fontSize: 14, fontFamily: 'Poppins-Regular', fontWeight: 'bold' }}
                                    label="Pilih Shelter"
                                    value=""
                                />
                                {
                                    this.state.shelter.map((sh) =>
                                        <Picker.Item style={{ height: '100%', width: '100%', fontSize: 12, }} label={sh.nama_shelter.toString()} value={sh.id_shelter} key={sh.id_shelter} />
                                    )}
                            </Picker>
                        </View>
                    </View>
                    <View style={style.form}>
                        <Text style={style.labelkiri}>Nama Lengkap</Text>
                        <TextInput
                            style={style.kotak3}
                            onChangeText={nama_lengkap => this.setState({ nama_lengkap })}
                            value={this.state.nama_lengkap}
                            keyboardType='default'
                            placeholder="Masukan Nama"
                            placeholderTextColor="#C0C0C0"
                        />
                    </View>
                    <View style={style.form}>
                        <Text style={style.labelkiri}>No HP</Text>
                        <TextInput
                            style={style.kotak3}
                            onChangeText={no_hp => this.setState({ no_hp })}
                            value={this.state.no_hp}
                            maxLength={13}
                            keyboardType='numeric'
                            placeholder="Masukan No HP"
                            placeholderTextColor="#C0C0C0"
                        />
                    </View>
                    <View style={style.form}>
                        <Text style={style.labelkiri}>Pilih Bank</Text>
                        <View style={style.kotakpicker}>
                            <Picker
                                style={style.Textinputcss}
                                selectedValue={this.state.pilbank}
                                onValueChange={(itemValue) => {
                                    this.setState({
                                        pilbank: (itemValue),
                                        show: 1
                                    })
                                }}>
                                <Picker.Item
                                    style={{ fontSize: 14, fontFamily: 'Poppins-Regular', fontWeight: 'bold' }}
                                    label="Pilih Bank"
                                    value=""
                                />
                                {
                                    this.state.listbank.map((bk) =>
                                        <Picker.Item style={{ height: '100%', width: '100%', fontSize: 12, }} label={bk.nama_bank.toString()} value={bk.id_bank} key={bk.id_bank} />
                                    )}
                            </Picker>
                        </View>
                    </View>
                    <View style={style.form}>
                        <Text style={style.labelkiri}>No.Rekening</Text>
                        <TextInput
                            style={style.kotak3}
                            onChangeText={no_req => this.setState({ no_req })}
                            value={this.state.no_req}
                            keyboardType='numeric'
                            placeholder="Masukan No Rekening"
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

                    {/* <View style={style.form}>
                        <Text style={style.labelkiri}>Anak Binaan</Text>
                        <View style={style.kotakpicker}>
                            <Picker
                                style={style.Textinputcss}
                                onFocus={() => { this.GetanakAPi() }}
                                selectedValue={this.state.pilnak}
                                onValueChange={(itemValue, statanak) => {
                                    this.setState({
                                        pilnak: (itemValue),
                                        show: 1
                                    })
                                }}>
                                <Picker.Item
                                    style={{ fontSize: 14, fontFamily: 'Poppins-Regular', fontWeight: 'bold' }}
                                    label="Pilih Anak Binaan"
                                    value=""
                                />
                                {
                                    this.state.statanak === 'CNPB' ? pilnak : pilihanak.map((pilnak) =>
                                        <Picker.Item style={{ height: '100%', width: '100%', fontSize: 12, }} label={pilnak.full_name.toString()} value={pilnak.full_name} key={pilnak.id_anak} />
                                    )}

                            </Picker>
                        </View>
                    </View> */}

                </View>

                <View style={style.BSimpan2}>
                    <TouchableOpacity onPress={() => this.SimpanData()}>
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

export default TambahDona
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
        borderRadius: 5,
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