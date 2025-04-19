import { Text, View, StyleSheet, TextInput, TouchableOpacity, Dimensions, ToastAndroid } from 'react-native'
import React, { Component } from 'react'
import { Picker } from '@react-native-picker/picker';
import RadioForm, {
    RadioButton,
    RadioButtonInput,
    RadioButtonLabel,
} from 'react-native-simple-radio-button';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
export class TambahKeuangan extends Component {
    constructor(props) {
        super(props);
        this.state = {
            anak: [],
            biaya: [],
            pilihanak: '',
            wilbinpick: '',
            pil: '',
            tingkat: '',
            waktutunai: '',
            Donasi: '',
            tunai: '',
            Pilih: '',
            biayadona:[],
        };
    }
    GetanakAPi() {
        fetch('https://kilauindonesia.org/datakilau/api/joindataanak').then(res => {
            if (res.status === 200)
                return res.json()
        }).then(resdata => {
            console.log(resdata.data)
            this.setState({
                anak: resdata.data
            })
        })
    }
    GetdonaAPi(itemValue) {
   
        fetch('https://kilauindonesia.org/datakilau/api/getbiaya/' + itemValue).then(res => {
            if (res.status === 200)
                return res.json()
        }).then(resdata => {
            console.log(resdata.data)
            this.setState({
                biaya: resdata.data
                
            })
        })
    }
    componentDidMount() {
        this.GetanakAPi();
    }
    render() {
        var Pilih = [
            { label: 'Ya', value: 'Ya' },
            { label: 'Tidak', value: 'Tidak' },
        ];
        const biaya = this.state.biaya;
        const biaya_donasi = this.state.biaya.biaya_donasi === undefined ? '' : this.state.biaya.biaya_donasi.toString();
        return (
            <View style={{ backgroundColor: '#fff', flex: 1 }}>
                <Text style={style.labelatas}>Tambah Data Keuangan</Text>
                <View>
                    <View style={style.form}>
                        <Text style={style.labelkiri}>Tingkat Sekolah</Text>
                        <View
                            style={[style.kotakpicker, { marginLeft: 10 }]}>
                            <Picker
                                style={style.Textinputcss}
                                selectedValue={this.state.tingkat}
                                //   onFocus={() => { this.GetkelAPi() }}
                                onValueChange={(itemValue,) => {
                                    this.setState({
                                        tingkat: itemValue,
                                        show: 1

                                    }),
                                    this.GetdonaAPi(itemValue);
                                }}>
                                {/* <Picker.Item style={{ fontSize: 12 }} label={detail.id_prov === null ? 'Pilih Provinsi' : detail.nama_prov} value={'0'} key={'0'} /> */}
                                <Picker.Item style={{ fontSize: 12 }} label={'Pilih Tingkat Sekolah'} value={'0'} key={'0'} />
                                <Picker.Item style={{ fontSize: 12 }} label={'SD'} value={'SD'} />
                                <Picker.Item style={{ fontSize: 12 }} label={'SMP'} value={'SMP'} />
                                <Picker.Item style={{ fontSize: 12 }} label={'SMA'} value={'SMA'} />
                                <Picker.Item style={{ fontSize: 12 }} label={'TAHFIDZ SD'} value={'TAHFIDZ SD'} />
                                <Picker.Item style={{ fontSize: 12 }} label={'TAHFIDZ SMP'} value={'TAHFIDZ SMP'} />
                                <Picker.Item style={{ fontSize: 12 }} label={'TAHFIDZ SMA'} value={'TAHFIDZ SMA'} />
                                <Picker.Item style={{ fontSize: 12 }} label={'NPB TAHFIDZ SD'} value={'NPB TAHFIDZ SD'} />
                                <Picker.Item style={{ fontSize: 12 }} label={'NPB TAHFIDZ SMP'} value={'NPB TAHFIDZ SMP'} />
                                <Picker.Item style={{ fontSize: 12 }} label={'NPB TAHFIDZ SMA'} value={'NPB TAHFIDZ SMA'} />
                            </Picker>
                        </View>
                    </View>

                    <View style={style.form}>
                        <Text style={style.labelkiri}>Kelas/Semester</Text>
                        <View
                            style={[style.kotakpicker, { marginLeft: 10 }]}>
                            <Picker

                                style={style.Textinputcss}
                                selectedValue={this.state.kelas}
                                //   onFocus={() => { this.GetkelAPi() }}
                                onValueChange={(itemValue,) => {
                                    this.setState({
                                        kelas: itemValue,
                                        show: 1
                                    })
                                }}>
                                {/* <Picker.Item style={{ fontSize: 12 }} label={detail.id_prov === null ? 'Pilih Provinsi' : detail.nama_prov} value={'0'} key={'0'} /> */}
                                <Picker.Item style={{ fontSize: 12 }} label={'Pilih Kelas/Semester'} value={'0'} key={'0'} />
                                <Picker.Item style={{ fontSize: 12 }} label={'Kelas I/Ganjil'} value={'Kelas I/Ganjil'} />
                                <Picker.Item style={{ fontSize: 12 }} label={'Kelas I/Genap'} value={'Kelas I/Genap'} />
                                <Picker.Item style={{ fontSize: 12 }} label={'Kelas II/Ganjil'} value={'Kelas II/Genap'} />
                                <Picker.Item style={{ fontSize: 12 }} label={'Kelas II/Genap'} value={'Kelas II/Ganjil'} />
                                <Picker.Item style={{ fontSize: 12 }} label={'Kelas III/Ganjil'} value={'Kelas III/Genap'} />
                                <Picker.Item style={{ fontSize: 12 }} label={'Kelas III/Genap'} value={'Kelas III/Ganjil'} />
                                <Picker.Item style={{ fontSize: 12 }} label={'Kelas IV/Ganjil'} value={'Kelas IV/Genap'} />
                                <Picker.Item style={{ fontSize: 12 }} label={'Kelas IV/Genap'} value={'Kelas IV/Ganjil'} />
                                <Picker.Item style={{ fontSize: 12 }} label={'Kelas V/Ganjil'} value={'Kelas V/Genap'} />
                                <Picker.Item style={{ fontSize: 12 }} label={'Kelas V/Genap'} value={'Kelas V/Ganjil'} />
                                <Picker.Item style={{ fontSize: 12 }} label={'Kelas VI/Ganjil'} value={'Kelas VI/Genap'} />
                                <Picker.Item style={{ fontSize: 12 }} label={'Kelas VI/Genap'} value={'Kelas VI/Ganjil'} />
                                <Picker.Item style={{ fontSize: 12 }} label={'Kelas VII/Ganjil'} value={'Kelas VII/Genap'} />
                                <Picker.Item style={{ fontSize: 12 }} label={'Kelas VII/Genap'} value={'Kelas VII/Ganjil'} />
                                <Picker.Item style={{ fontSize: 12 }} label={'Kelas VIII/Ganjil'} value={'Kelas VIII/Genap'} />
                                <Picker.Item style={{ fontSize: 12 }} label={'Kelas VIII/Genap'} value={'Kelas VIII/Ganjil'} />
                                <Picker.Item style={{ fontSize: 12 }} label={'Kelas IX/Ganjil'} value={'Kelas IX/Genap'} />
                                <Picker.Item style={{ fontSize: 12 }} label={'Kelas IX/Genap'} value={'Kelas IX/Ganjil'} />
                                <Picker.Item style={{ fontSize: 12 }} label={'Kelas X/Ganjil'} value={'Kelas X/Genap'} />
                                <Picker.Item style={{ fontSize: 12 }} label={'Kelas X/Genap'} value={'Kelas X/Ganjil'} />
                                <Picker.Item style={{ fontSize: 12 }} label={'Kelas XI/Ganjil'} value={'Kelas XI/Genap'} />
                                <Picker.Item style={{ fontSize: 12 }} label={'Kelas XI/Genap'} value={'Kelas XI/Ganjil'} />
                                <Picker.Item style={{ fontSize: 12 }} label={'Kelas XII/Ganjil'} value={'Kelas XII/Genap'} />
                                <Picker.Item style={{ fontSize: 12 }} label={'Kelas XII/Genap'} value={'Kelas XII/Ganjil'} />
                            </Picker>
                        </View>
                    </View>

                    <View style={style.form}>
                        <Text style={style.labelkiri}>Anak Binaan</Text>
                        <View
                            style={[style.kotakpicker, { marginLeft: 10 }]}>
                            <Picker

                                style={style.Textinputcss}
                                selectedValue={this.state.pilihanak}
                                //   onFocus={() => { this.GetkelAPi() }}
                                onValueChange={(itemValue,) => {
                                    this.setState({
                                        pilihanak: itemValue,
                                        show: 1
                                    })
                                }}>
                                {/* <Picker.Item style={{ fontSize: 12 }} label={detail.id_prov === null ? 'Pilih Provinsi' : detail.nama_prov} value={'0'} key={'0'} /> */}
                                <Picker.Item style={{ fontSize: 12 }} label={'Pilih Anak Binaan'} value={'0'} key={'0'} />
                                {
                                    this.state.anak.map((anak) =>
                                        <Picker.Item style={{ height: '100%', width: '100%', fontSize: 12, }} label={anak.full_name.toString()} value={anak.full_name} key={anak.full_name} />
                                    )}
                            </Picker>
                        </View>
                    </View>

                    <View style={style.form}>
                        <Text style={style.labelkiri}>Biaya Bimbel</Text>
                        <TextInput
                            style={style.kotak3}
                            onChangeText={bimbel => this.setState({ bimbel })}
                            value={this.state.bimbel}
                            keyboardType='numeric'
                            placeholder=""
                            placeholderTextColor="#C0C0C0"
                        />
                    </View>

                    <View style={style.form}>
                        <Text style={style.labelkiri}>Biaya Ekskul dan Keagamaan</Text>
                        <TextInput
                            style={style.kotak3}
                            onChangeText={eskuldanagama => this.setState({ eskuldanagama })}
                            value={this.state.eskuldanagama}
                            keyboardType='numeric'
                            placeholder={""}
                            placeholderTextColor="#C0C0C0"
                        />
                    </View>

                    <View style={style.form}>
                        <Text style={style.labelkiri}>Biaya Laporan</Text>
                        <TextInput
                            style={style.kotak3}
                            onChangeText={laporan => this.setState({ laporan })}
                            value={this.state.laporan}
                            keyboardType='numeric'
                            placeholder=""
                            placeholderTextColor="#C0C0C0"
                        />
                    </View>
                    <View style={[style.form, { marginTop: 10 }]}>
                        <Text style={style.labelkiri}>Uang Tunai</Text>
                        <RadioForm
                            radio_props={Pilih}
                            onPress={(value) => { this.setState({ Pilih: value }), ToastAndroid.show(value.toString(), ToastAndroid.SHORT) }}
                            initial={1}
                            buttonSize={10}
                            buttonOuterSize={20}
                            animation={true}
                            formHorizontal={false}
                            buttonWrapStyle={{ marginLeft: 10 }}
                            labelStyle={{ marginLeft: -5 }}
                            style={{ flexDirection: 'row', marginTop: 10, justifyContent: 'space-evenly', }}
                        ></RadioForm>
                    </View>

                    {this.state.Pilih === 'Ya' ?
                        <View style={{ flexDirection: 'row', marginLeft: 20 }}>
                            <TextInput
                                style={style.kotakdouble}
                                onChangeText={tunai => this.setState({ tunai })}
                                value={this.state.tunai}
                                keyboardType='numeric'
                                placeholder="Uang Tunai"
                                placeholderTextColor="#C0C0C0"
                            />
                            <View style={style.form}>
                                <View
                                    style={style.kotakpickerdouble}>
                                    <Picker
                                        style={style.Textinputcssdouble}
                                        selectedValue={this.state.waktutunai}
                                        //   onFocus={() => { this.GetkelAPi() }}
                                        onValueChange={(itemValue,) => {
                                            this.setState({
                                                waktutunai: itemValue,
                                                show: 1
                                            })
                                        }}>
                                        <Picker.Item style={{ fontSize: 12 }} label={'Pilih Bulan'} value={'0'} key={'0'} />
                                        <Picker.Item style={{ fontSize: 12 }} label={'1 Bulan'} value={'1 Bulan'} />
                                        <Picker.Item style={{ fontSize: 12 }} label={'2 Bulan'} value={'2 Bulan'} />
                                        <Picker.Item style={{ fontSize: 12 }} label={'3 Bulan'} value={'3 Bulan'} />
                                        <Picker.Item style={{ fontSize: 12 }} label={'4 Bulan'} value={'4 Bulan'} />
                                        <Picker.Item style={{ fontSize: 12 }} label={'5 Bulan'} value={'5 Bulan'} />
                                        <Picker.Item style={{ fontSize: 12 }} label={'6 Bulan'} value={'6 Bulan'} />
                                    </Picker>
                                </View>
                            </View>
                        </View>
                        :
                        <View></View>
                    }




                    <Text style={[style.labelkiri2]}>Biaya Donasi</Text>
                    <View style={{ flexDirection: 'row', marginLeft: 20, marginTop: -10 }}>
                        <TextInput
                            style={style.kotakdouble}
                            onChangeText={Donasi => this.setState({ Donasi })}
                            value={this.state.Donasi}
                            keyboardType='numeric'
                            placeholder={biaya_donasi}
                            placeholderTextColor="#C0C0C0"
                            
                        />
                        
                        <View style={style.form}>
                            <View
                                style={style.kotakpickerdouble}>
                                <Picker
                                    style={style.Textinputcssdouble}
                                    selectedValue={this.state.waktutunai}
                                    //   onFocus={() => { this.GetkelAPi() }}
                                    onValueChange={(itemValue,) => {
                                        this.setState({
                                            waktutunai: itemValue,
                                            show: 1
                                        })
                                    }}>
                                    <Picker.Item style={{ fontSize: 12 }} label={'Pilih Bulan'} value={'0'} key={'0'} />
                                    <Picker.Item style={{ fontSize: 12 }} label={'1 Bulan'} value={'1 Bulan'} />
                                    <Picker.Item style={{ fontSize: 12 }} label={'2 Bulan'} value={'2 Bulan'} />
                                    <Picker.Item style={{ fontSize: 12 }} label={'3 Bulan'} value={'3 Bulan'} />
                                    <Picker.Item style={{ fontSize: 12 }} label={'4 Bulan'} value={'4 Bulan'} />
                                    <Picker.Item style={{ fontSize: 12 }} label={'5 Bulan'} value={'5 Bulan'} />
                                    <Picker.Item style={{ fontSize: 12 }} label={'6 Bulan'} value={'6 Bulan'} />

                                </Picker>
                            </View>
                        </View>
                    </View>


                </View>

                <View style={{ marginTop: '5%', alignItems: 'center', flexDirection: 'row', alignContent: 'center', justifyContent: 'center', marginTop: 30 }}>
                    <TouchableOpacity onPress={() => ToastAndroid.show('Batal', ToastAndroid.SHORT)}>
                        <View style={{ height: 50, borderColor: '#00A9B8', borderWidth: 1, width: 100, justifyContent: 'center', alignItems: 'center', alignSelf: 'center', borderRadius: 5 }}>
                            <Text style={{ color: '#00A9B8', fontFamily: 'Poppins-Medium', fontSize: 14 }}>Batal</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => ToastAndroid.show('Tersimpan', ToastAndroid.SHORT)}>
                        <View style={{ backgroundColor: '#00A9B8', marginLeft: 15, height: 50, borderColor: '#00A9B8', borderWidth: 1, width: 100, justifyContent: 'center', alignItems: 'center', alignSelf: 'center', borderRadius: 5 }}>
                            <Text style={{ color: '#fff', fontFamily: 'Poppins-Medium', fontSize: 14 }}>Simpan</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

export default TambahKeuangan
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
    labelkiri2: {
        fontSize: 12,
        fontWeight: 'bold',
        marginVertical: 5,
        marginLeft: 30,
        marginTop: 20,
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
    Textinputcssdouble: {
        width: windowWidth * 0.49,
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
    kotakdouble: {
        marginTop: 10,
        color: '#000',
        borderRadius: 10,
        borderWidth: 0.1,
        fontSize: 13,
        height: 40,
        marginLeft: 10,
        width: windowWidth * 0.3,
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
    kotakpickerdouble: {
        marginTop: 10,
        paddingVertical: 5,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#DDD',
        width: windowWidth * 0.46,
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
    checkbox: {
        flexDirection: 'row',
        alignContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
    },
})