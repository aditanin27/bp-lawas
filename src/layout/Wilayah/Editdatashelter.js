import { Text, View, StyleSheet, TextInput, TouchableOpacity, Dimensions, ToastAndroid } from 'react-native'
import React, { Component } from 'react'
import { Picker } from '@react-native-picker/picker';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';


const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
export class Editdatashelter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            wilbinpicker: [],
            wilbinpick: this.props.route.params.deshel.nama_wilbin,
            shelter: this.props.route.params.deshel.nama_shelter,
            koordinator: this.props.route.params.deshel.nama_koordinator,
            nohp: this.props.route.params.deshel.no_telpon,
            Alamat: this.props.route.params.deshel.alamat,
            wilbin: this.props.route.params.deshel.nama_wilbin,
            wilbinid: this.props.route.params.deshel.id_wilbin,
            detail: this.props.route.params.deshel,
            status: this.props.route.params.deshel.status_shelter,
            id: this.props.route.params.deshel.id_shelter

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
                nama_shelter: this.state.shelter,
                nama_koordinator: this.state.koordinator,
                no_telpon: this.state.nohp,
                alamat: this.state.Alamat,
                status_shelter: this.state.status,
                id_wilbin: this.state.wilbinid,
            }
            let data = new FormData();
            for (let key in simpandata) {
                data.append(key, simpandata[key]);
            }
            fetch('https://kilauindonesia.org/datakilau/api/shelterupd/' + this.state.id, {
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
                        this.props.navigation.navigate('Datashelter')
                        ToastAndroid.show("Data berhasil diubah!", ToastAndroid.SHORT)
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
        var Pilihan = [
            { label: 'Aktif', value: '0' },
            { label: 'Aktif Tidak', value: '1' },
        ];
        const detail = this.state.detail
        return (
            <View style={{ backgroundColor: '#fff', flex: 1 }}>
                <Text style={style.labelatas}>Edit Data Shelter{this.state.id}</Text>
                <View>
                    <View style={style.form}>
                        <Text style={style.labelkiri}>Wilayah Binaan</Text>
                        <TextInput
                            style={style.kotak3}
                            editable={false}
                            onChangeText={wilbinpick => this.setState({ wilbinpick })}
                            value={this.state.wilbinpick}
                            keyboardType='default'
                            placeholder=""
                            placeholderTextColor="#C0C0C0"
                        />
                    </View>


                    <View style={style.form}>
                        <Text style={style.labelkiri}>Ganti Wilayah Binaan</Text>
                        <View
                            style={[style.kotakpicker, { marginLeft: 10 }]}>
                            <Picker
                                style={style.Textinputcss}
                                selectedValue={this.state.wilbinid}
                                //   onFocus={() => { this.GetkelAPi() }}
                                onValueChange={(itemValue,) => {
                                    this.setState({
                                        wilbinid: itemValue,
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
                            onChangeText={shelter => this.setState({ shelter })}
                            value={this.state.shelter}
                            keyboardType='default'
                            placeholder=""
                            placeholderTextColor="#C0C0C0"
                        />
                    </View>

                    <View style={style.form}>
                        <Text style={style.labelkiri}>Nama Koordinator Shelter</Text>
                        <TextInput
                            style={style.kotak3}
                            onChangeText={koordinator => this.setState({ koordinator })}
                            value={this.state.koordinator}
                            keyboardType='default'
                            placeholder=""
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
                            placeholder=""
                            placeholderTextColor="#C0C0C0"
                        />
                    </View>

                    <View style={style.form}>
                        <Text style={style.labelkiri}>Alamat</Text>
                        <TextInput
                            multiline={true}
                            style={style.kotakalamat}
                            onChangeText={Alamat => this.setState({ Alamat })}
                            value={this.state.Alamat}
                            keyboardType='default'
                            placeholder=""
                            placeholderTextColor="#C0C0C0"
                        />
                    </View>
                </View>

                <View style={[style.form, { marginTop: 20 }]}>
                    <Text style={[style.labelkiri, { marginTop: -2 }]}>Status Shelter </Text>
                    <RadioForm
                        radio_props={Pilihan}
                        onPress={value => {
                            this.setState({ status: value })
                            ToastAndroid.show(value.toString(), ToastAndroid.SHORT);
                        }}
                        initial={this.state.status === 0 ? 0 : 1}
                        animation={true}
                        formHorizontal={true}
                        buttonOuterSize={19}
                        buttonSize={10}
                        labelStyle={{ fontSize: 10, marginLeft: -5, paddingRight: 10 }}>
                    </RadioForm>
                </View>

                <View style={{ marginTop: '5%', alignItems: 'center', flexDirection: 'row', alignContent: 'center', justifyContent: 'center', marginTop: 30 }}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Datashelter')}>
                        <View style={{ height: 50, borderColor: '#00A9B8', borderWidth: 1, width: 100, justifyContent: 'center', alignItems: 'center', alignSelf: 'center', borderRadius: 5 }}>
                            <Text style={{ color: '#00A9B8', fontFamily: 'Poppins-Medium', fontSize: 14 }}>Batal</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => { this.sendData() }}>
                        <View style={{ backgroundColor: '#00A9B8', marginLeft: 15, height: 50, borderColor: '#00A9B8', borderWidth: 1, width: 100, justifyContent: 'center', alignItems: 'center', alignSelf: 'center', borderRadius: 5 }}>
                            <Text style={{ color: '#fff', fontFamily: 'Poppins-Medium', fontSize: 14 }}>Simpan</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

export default Editdatashelter
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