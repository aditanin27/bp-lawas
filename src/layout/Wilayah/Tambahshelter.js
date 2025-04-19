import { Text, View, StyleSheet, TextInput, TouchableOpacity, Dimensions, ToastAndroid } from 'react-native'
import React, { Component } from 'react'
import { Picker } from '@react-native-picker/picker';


const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
export class Tambahshelter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            wilbinpick: '',
            shelter: '',
            koordinator: '',
            nohp: '',
            Alamat: '',
            wilbinpicker: [],
            status: '0',
            nama_shelter:'',
            nama_koordinator:'',
            alamat:'',
            no_telpon:'',
            id_wilbin:'',


        };
    }
    GetwilbinAPi() {
        fetch('https://kilauindonesia.org/datakilau/api/wilbinfil').then(res => {
            if (res.status === 200)
                return res.json()
        }).then(resdata => {
            console.log(resdata.data)
            this.setState({
                wilbinpicker: resdata.data

            })
        })
    }

    sendData() {
        {
            let simpandata = {
                nama_shelter: this.state.nama_shelter,
                nama_koordinator: this.state.nama_koordinator,
                alamat: this.state.alamat,
                no_telpon: this.state.no_telpon,
                id_wilbin: this.state.id_wilbin,
                status_shelter: this.state.status,

            }
            let data = new FormData();
            for (let key in simpandata) {
                data.append(key, simpandata[key]);
            }
            fetch('https://kilauindonesia.org/datakilau/api/tamshelter', {
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
        this.GetwilbinAPi();
        console.log();
    }
    render() {
        return (
            <View style={{ backgroundColor: '#fff', flex: 1 }}>
                <Text style={style.labelatas}>Tambah Data Shelter</Text>
                <View>
                    <View style={style.form}>
                        <Text style={style.labelkiri}>Wilayah Binaan</Text>
                        <View
                            style={[style.kotakpicker, { marginLeft: 10 }]}>
                            <Picker
                                style={style.Textinputcss}
                                selectedValue={this.state.id_wilbin}
                                //   onFocus={() => { this.GetkelAPi() }}
                                onValueChange={(itemValue,) => {
                                    this.setState({
                                        id_wilbin: itemValue,
                                        show: 1
                                    })
                                }}>
                                {/* <Picker.Item style={{ fontSize: 12 }} label={detail.id_prov === null ? 'Pilih Provinsi' : detail.nama_prov} value={'0'} key={'0'} /> */}
                                <Picker.Item style={{ fontSize: 12 }} label={'Pilih Wilayah Binaan'} value={'0'} key={'0'} />
                                {
                                    this.state.wilbinpicker.map((wilbin) =>
                                        <Picker.Item style={{ height: '100%', width: '100%', fontSize: 12, }} label={wilbin.nama_wilbin.toString()} value={wilbin.id_wilbin} key={wilbin.id_wilbin} />
                                    )}
                            </Picker>
                        </View>
                    </View>

                    <View style={style.form}>
                        <Text style={style.labelkiri}>Nama Shelter</Text>
                        <TextInput
                            style={style.kotak3}
                            onChangeText={nama_shelter => this.setState({ nama_shelter })}
                            value={this.state.nama_shelter}
                            keyboardType='default'
                            placeholder=""
                            placeholderTextColor="#C0C0C0"
                        />
                    </View>

                    <View style={style.form}>
                        <Text style={style.labelkiri}>Nama Koordinator Shelter</Text>
                        <TextInput
                            style={style.kotak3}
                            onChangeText={nama_koordinator => this.setState({ nama_koordinator })}
                            value={this.state.nama_koordinator}
                            keyboardType='default'
                            placeholder=""
                            placeholderTextColor="#C0C0C0"
                        />
                    </View>

                    <View style={style.form}>
                        <Text style={style.labelkiri}>No HP</Text>
                        <TextInput
                            style={style.kotak3}
                            onChangeText={no_telpon => this.setState({ no_telpon })}
                            value={this.state.no_telpon}
                            keyboardType='numeric'
                            placeholder=""
                            placeholderTextColor="#C0C0C0"
                        />
                    </View>

                    <View style={style.form}>
                        <Text style={style.labelkiri}>Alamat</Text>
                        <TextInput
                            style={style.kotakalamat}
                            onChangeText={alamat => this.setState({ alamat })}
                            value={this.state.alamat}
                            keyboardType='default'
                            placeholder=""
                            placeholderTextColor="#C0C0C0"
                        />
                    </View>
                </View>

                <View style={{ marginTop: '5%', alignItems: 'center', flexDirection: 'row', alignContent: 'center', justifyContent: 'center', marginTop: 30 }}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Datashelter')}>
                        <View style={{ height: 50, borderColor: '#00A9B8', borderWidth: 1, width: 100, justifyContent: 'center', alignItems: 'center', alignSelf: 'center', borderRadius: 5 }}>
                            <Text style={{ color: '#00A9B8', fontFamily: 'Poppins-Medium', fontSize: 14 }}>Batal</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Datashelter', this.sendData())}>
                        <View style={{ backgroundColor: '#00A9B8', marginLeft: 15, height: 50, borderColor: '#00A9B8', borderWidth: 1, width: 100, justifyContent: 'center', alignItems: 'center', alignSelf: 'center', borderRadius: 5 }}>
                            <Text style={{ color: '#fff', fontFamily: 'Poppins-Medium', fontSize: 14 }}>Simpan</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

export default Tambahshelter
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
        marginTop: 20,
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
        marginLeft: 10,
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
        marginLeft: 10,
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
})