import {
    Text, View, StyleSheet, Dimensions, ScrollView, TextInput,
    FlatList, RefreshControl, ViewComponent, Image, TouchableOpacity, ToastAndroid
} from 'react-native'
import React, { Component } from 'react'
import { Tamnak } from '../../assets/icons'
import { test } from '../../assets/images'
import { Picker } from '@react-native-picker/picker';
import RadioForm from 'react-native-simple-radio-button';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

export class editdatakel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            kacab: this.props.route.params.detail.nama_kacab,
            wilbin: this.props.route.params.detail.nama_wilbin,
            shel: this.props.route.params.detail.nama_shelter,
            id_kacab: this.props.route.params.detail.id_kacab,
            id_wilbin: this.props.route.params.detail.id_wilbin,
            id_shelter: this.props.route.params.detail.id_shelter,
            detail: this.props.route.params.detail,
            kk: this.props.route.params.detail.no_kk,
            kepala: this.props.route.params.detail.kepala_keluarga,
            SOT: this.props.route.params.detail.status_ortu,
            nama_bank: this.props.route.params.detail.nama_bank,
            pilbank: this.props.route.params.detail.id_bank,
            norek: this.props.route.params.detail.no_rek,
            anrek: this.props.route.params.detail.an_rek,
            notlp: this.props.route.params.detail.no_tlp,
            antlp: this.props.route.params.detail.an_tlp,
            kancab: [],
            bankdata: [],
            kantor: '',
            datawilbin: [],
            datashelter: [],
            bank: '',
            HP: '',

        };
    }
    GetKacabAPi() {
        fetch('https://kilauindonesia.org/datakilau/api/kacab').then(res => {
            if (res.status === 200)
                return res.json()
        }).then(resdata => {
            // console.log(resdata.data)
            this.setState({
                kancab: resdata.data,
            })
        })
    }
    GetWilbinAPi() {
        fetch('https://kilauindonesia.org/datakilau/api/wilbinfil').then(res => {
            if (res.status === 200)
                return res.json()
        }).then(resdata => {
            // console.log(resdata.data)
            this.setState({
                datawilbin: resdata.data,
            })
        })
    }
    GetShelterAPi() {
        fetch('https://kilauindonesia.org/datakilau/api/shelterfil').then(res => {
            if (res.status === 200)
                return res.json()
        }).then(resdata => {
            // console.log(resdata.data)
            this.setState({
                datashelter: resdata.data,
            })
        })
    }
    GetBankAPi() {
        fetch('https://kilauindonesia.org/datakilau/api/getbankpen').then(res => {
            if (res.status === 200)
                return res.json()
        }).then(resdata => {
            // console.log(resdata.data)
            this.setState({
                bankdata: resdata.data,
            })
        })
    }
    editData() {
        {
            let simpandata = {
                id_kacab: this.state.id_kacab,
                id_wilbin: this.state.id_wilbin,
                id_shelter: this.state.id_shelter,
                no_kk: this.state.kk,
                kepala_keluarga: this.state.kepala,
                status_ortu: this.state.SOT,
                id_bank: this.state.bank === '' ? '' : this.state.pilbank,
                no_rek: this.state.bank === '' ? '' : this.state.norek,
                an_rek: this.state.bank === '' ? '' : this.state.anrek,
                no_tlp: this.state.HP === '' ? '' : this.state.notlp,
                an_tlp: this.state.HP === '' ? '' : this.state.antlp,
            }
            let data = new FormData();
            for (let key in simpandata) {
                data.append(key, simpandata[key]);
            }
            fetch('https://kilauindonesia.org/datakilau/api/keluargaupd/' + this.state.detail.id_keluarga, {
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
        this.GetBankAPi();
        this.GetWilbinAPi();
        this.GetShelterAPi();
        console.log(this.props.route.params.detail);
    }
    render() {
        const detail = this.state.detail
        const bank = [
            {
                label: 'Ya',
                value: '0',
            },
            {
                label: 'Tidak',
                value: '1',
            },
        ];
        const HP = [
            {
                label: 'Ya',
                value: '0',
            },
            {
                label: 'Tidak',
                value: '1',
            },
        ];
        return (
            <ScrollView style={{ backgroundColor: '#fff', flex: 1 }}>
                <Text style={{ textAlign: 'center', fontSize: 16, fontWeight: 'bold', marginTop: 10 }}>Edit Data Keluarga</Text>
                <View >
                    <View>
                        <View style={{ backgroundColor: '#fff' }}>
                            <Text style={style.labelatas}>Data Keluarga{this.state.detail.id_keluarga}</Text>
                            <View style={{ justifyContent: 'center' }}>
                                <View style={style.form}>
                                    <Text style={style.labelkiri}>Kantor Cabang</Text>
                                    <View
                                        style={style.kotakpicker}>
                                        <Picker
                                            style={style.Textinputcss}
                                            selectedValue={this.state.id_kacab}
                                            onValueChange={(itemValue) => {
                                                this.setState({
                                                    id_kacab: itemValue,
                                                    show: 1
                                                })
                                            }}>
                                            <Picker.Item
                                                style={{ fontSize: 14, fontFamily: 'Poppins-Regular', fontWeight: 'bold' }}
                                                label={this.state.kacab}
                                                value={this.state.id_kacab}
                                            />
                                            {
                                                this.state.kancab.map((cab) =>
                                                    <Picker.Item style={{ height: '100%', width: '100%', fontSize: 12, }} label={cab.nama_kacab} value={cab.id_kacab} key={cab.id_kacab} />
                                                )}
                                        </Picker>
                                    </View>
                                </View>
                                <View style={style.form}>
                                    <Text style={style.labelkiri}>Wilayah Binaan</Text>
                                    <View
                                        style={style.kotakpicker}>
                                        <Picker
                                            style={style.Textinputcss}
                                            selectedValue={this.state.id_wilbin}
                                            onValueChange={(itemValue) => {
                                                this.setState({
                                                    id_wilbin: itemValue
                                                })
                                            }}>
                                            <Picker.Item
                                                style={{ fontSize: 14, fontFamily: 'Poppins-Regular', fontWeight: 'bold' }}
                                                label={this.state.wilbin}
                                                value={this.state.id_wilbin}
                                            />
                                            {
                                                this.state.datawilbin.map((bin) =>
                                                    <Picker.Item style={{ height: '100%', width: '100%', fontSize: 12, }} label={bin.nama_wilbin} value={bin.id_wilbin} key={bin.id_wilbin} />
                                                )}
                                        </Picker>
                                    </View>
                                </View>
                                <View style={style.form}>
                                    <Text style={style.labelkiri}>Shelter</Text>
                                    <View
                                        style={style.kotakpicker}>
                                        <Picker
                                            style={style.Textinputcss}
                                            selectedValue={this.state.id_shelter}
                                            onValueChange={(itemValue) => {
                                                this.setState({
                                                    id_shelter: itemValue
                                                })
                                            }}>
                                            <Picker.Item
                                                style={{ fontSize: 14, fontFamily: 'Poppins-Regular', fontWeight: 'bold' }}
                                                label={this.state.shel}
                                                value={this.state.id_shelter}
                                            />
                                            {
                                                this.state.datashelter.map((shel) =>
                                                    <Picker.Item style={{ height: '100%', width: '100%', fontSize: 12, }} label={shel.nama_shelter} value={shel.id_shelter} key={shel.id_shelter} />
                                                )}
                                        </Picker>
                                    </View>
                                </View>

                                <View style={style.form}>
                                    <Text style={style.labelkiri}>No.KK</Text>
                                    <TextInput
                                        style={style.kotak3}
                                        onChangeText={kk => this.setState({ kk })}
                                        value={this.state.kk}
                                        keyboardType='default'
                                        placeholder=""
                                        placeholderTextColor="#C0C0C0"
                                    />
                                </View>

                                <View style={style.form}>
                                    <Text style={style.labelkiri}>Kepala Keluarga</Text>
                                    <TextInput
                                        style={style.kotak3}
                                        onChangeText={kepala => this.setState({ kepala })}
                                        value={this.state.kepala}
                                        keyboardType='default'
                                        placeholder=""
                                        placeholderTextColor="#C0C0C0"
                                    />
                                </View>

                                <View style={style.form}>
                                    <Text style={style.labelkiri}>Status Orang Tua</Text>
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
                                                label={detail.status_ortu}
                                                value={detail.status_ortu}
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
                                </View>
                                <View>
                                    <Text style={style.labelkiri1}>Apakah Memiliki Rekening Bank? </Text>
                                    <RadioForm
                                        radio_props={bank}
                                        onPress={value => {
                                            this.setState({ bank: value });
                                        }}
                                        initial={this.props.route.params.detail.id_bank === null ? 1 : 0}
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

                                    {this.state.bank === 0 || this.props.route.params.detail.id_bank != null ? (
                                        <View >
                                            <View style={style.form}>
                                                <Text style={style.labelkiri}>Nama Bank</Text>
                                                <View
                                                    style={style.kotakpicker}>
                                                    <Picker
                                                        style={style.Textinputcss}
                                                        selectedValue={this.state.pilbank}
                                                        onValueChange={itemValue =>
                                                            this.setState({ pilbank: itemValue, show: 1 })
                                                        }>
                                                        <Picker.Item
                                                            style={{ fontSize: 12 }}
                                                            label={this.state.nama_bank}
                                                            value=""
                                                        />
                                                        {
                                                            this.state.bankdata.map((pilbank) =>
                                                                <Picker.Item style={{ height: '100%', width: '100%', fontSize: 12, }} label={pilbank.nama_bank} value={pilbank.id_bank} key={pilbank.id_bank} />
                                                            )}
                                                    </Picker>
                                                </View>
                                            </View>
                                            <View style={style.form}>
                                                <Text style={style.labelkiri2}>No.Rekening Bank</Text>
                                                <TextInput
                                                    style={[style.kotak3, { marginLeft: 10 }]}
                                                    onChangeText={norek => this.setState({ norek })}
                                                    value={this.state.norek}
                                                    keyboardType='numeric'
                                                    placeholder=""
                                                    placeholderTextColor="#C0C0C0"
                                                />
                                            </View>
                                            <View style={style.form}>
                                                <Text style={style.labelkiri}>Atas Nama</Text>
                                                <TextInput
                                                    style={style.kotak3}
                                                    onChangeText={anrek => this.setState({ anrek })}
                                                    value={this.state.anrek}
                                                    keyboardType='default'
                                                    placeholder=""
                                                    placeholderTextColor="#C0C0C0"
                                                />
                                            </View>
                                        </View>
                                    ) : (
                                        <View></View>
                                    )}
                                </View>

                                <View>
                                    <Text style={style.labelkiri1}>Apakah Memiliki No.Telepon?</Text>
                                    <RadioForm
                                        radio_props={HP}
                                        onPress={value => {
                                            this.setState({ HP: value });
                                        }}
                                        initial={this.props.route.params.detail.no_tlp === null ? 1 : 0}
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

                                    {this.state.HP === '0' || this.props.route.params.detail.no_tlp != null ? (
                                        <View >
                                            <View style={style.form}>
                                                <Text style={style.labelkiri2}>No telpon</Text>
                                                <TextInput
                                                    style={[style.kotak3, { marginLeft: 10 }]}
                                                    onChangeText={notlp => this.setState({ notlp })}
                                                    value={this.state.notlp}
                                                    keyboardType='numeric'
                                                    placeholder=""
                                                    placeholderTextColor="#C0C0C0"
                                                />
                                            </View>
                                            <View style={style.form}>
                                                <Text style={style.labelkiri}>Atas Nama</Text>
                                                <TextInput
                                                    style={style.kotak3}
                                                    onChangeText={antlp => this.setState({ antlp })}
                                                    value={this.state.antlp}
                                                    keyboardType='default'
                                                    placeholder=''
                                                    placeholderTextColor="#C0C0C0"
                                                />
                                            </View>
                                        </View>
                                    ) : (
                                        <View></View>
                                    )}
                                </View>
                            </View>
                        </View>


                    </View>

                </View>
                <View style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center', alignSelf: 'center', marginTop: 20, flexDirection: 'row' }}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('editdatakel', { detail: this.state.detail })} style={style.refresh} >
                        <View style={{
                            backgroundColor: '#0EBEDF', width: 100, height: 40, justifyContent: 'center', alignContent: 'center', alignItems: 'center', alignSelf: 'center', borderRadius: 10
                        }}>
                            <Text style={{ color: '#fff', textAlign: 'center', justifyContent: 'center', alignContent: 'center' }}>Kembali</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => this.props.navigation.navigate('detailkeluarga', this.editData())} style={style.refresh} >
                        <View style={{
                            backgroundColor: '#00FFFF', width: 100, height: 40, justifyContent: 'center', alignContent: 'center', alignItems: 'center', alignSelf: 'center', borderRadius: 10
                        }}>
                            <Text style={{ color: '#fff', textAlign: 'center', justifyContent: 'center', alignContent: 'center' }}>Simpan</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        )
    }
}
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
})
export default editdatakel