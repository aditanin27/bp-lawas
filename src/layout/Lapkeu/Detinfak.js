import { Text, View, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native'
import React, { Component } from 'react'
import { Picker } from '@react-native-picker/picker';
import { qr, read1, arrow, BB, rapot, ovo } from '../../assets/images'

export class Detinfak extends Component {
    constructor(props) {
        super(props)
        this.state = {
            semester: '',
            keg: '',
            Kegiatan: [],
        }
    }
    componentDidMount() {
        this.GetDataAPi();
        console.log(this.props);
    }
    GetDataAPi() {
        fetch('https://berbagipendidikan.org/sim/api/Kegiatan/getkegiatan').then(res => {
            if (res.status === 200)
                return res.json()
        }).then(resdata => {
            console.log(resdata.DATA)
            this.setState({
                Kegiatan: resdata.DATA

            })
        })
    }
    render() {
        return (
            <ScrollView contentContainerStyle={style.contentContainer} showsVerticalScrollIndicator={false}>
                <View style={{ backgroundColor: '#00A9B8', width: '100%', height: 70, borderBottomLeftRadius: 28, borderBottomRightRadius: 28 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{
                            fontSize: 16,
                            fontWeight: 'bold',
                            color: '#ffffff',
                            marginLeft: 10,
                            marginTop: 10,
                        }}
                        >Infak Saya</Text>
                        {/* <Image source={bell} style={{ marginTop: 20, left: 200 }}></Image> */}
                        {/* <View style={{ marginRight: 30, marginTop: 10 }}>
                <Text style={{ color: '#fff' }}>Anak Yang {"\n"}Diasuh</Text>
                <View style={{ flexDirection: 'row' }}>
                  <Image source={akun}></Image>
                  <Text style={style.angka}>1</Text>
                </View>
              </View> */}
                    </View>
                    {/* <Text style={{
                        fontSize: 12,
                        color: '#ffffff',
                        marginLeft: 20,
                        marginTop: 20,
                    }}>....................</Text> */}
                </View>

                <Image source={BB} style={{ width: 170, height: 80, marginLeft: 20, marginBottom: 10, alignSelf: 'center', marginTop: 10 }}></Image>
                <Text style={{ textAlign: 'center' }}>Infak Berbagi Bahagia</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 15 }}>
                    <Text style={{ marginLeft: 15 }}>Riwayat Pendanaan</Text>
                    <Text style={{ marginRight: 15 }}>Terbaru</Text>
                </View>
                <View style={style.kotakbaru}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 5 }}>
                        <Text>Jumlah infak</Text>
                        <Text>Rp.500.000</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 5 }}>
                        <Text>Tanggal </Text>
                        <Text>2 Mar 2022</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 5 }}>
                        <Text>Status </Text>
                        <Text>Berhasil</Text>
                    </View>
                </View>
                <View style={style.kotakbaru}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 5 }}>
                        <Text>Jumlah infak</Text>
                        <Text>Rp.500.000</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 5 }}>
                        <Text>Tanggal </Text>
                        <Text>12 Feb 2022</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 5 }}>
                        <Text>Status </Text>
                        <Text>Berhasil</Text>
                    </View>
                </View>
                <View style={style.kotakbaru}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 5 }}>
                        <Text>Jumlah infak</Text>
                        <Text>Rp.500.000</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 5 }}>
                        <Text>Tanggal </Text>
                        <Text>39 Mar 2022</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 5 }}>
                        <Text>Status </Text>
                        <Text>Berhasil</Text>
                    </View>
                </View>
                <View style={style.kotakbaru}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 5 }}>
                        <Text>Jumlah infak</Text>
                        <Text>Rp.500.000</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 5 }}>
                        <Text>Tanggal </Text>
                        <Text>24 Jul 2022</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 5 }}>
                        <Text>Status </Text>
                        <Text>Berhasil</Text>
                    </View>
                </View>

                <View style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center', alignSelf: 'center', marginTop: 20, width: '90%' }}>
                    <TouchableOpacity style={style.btnSimpanbaru} onPress={() => this.props.navigation.navigate('bayarinfak')}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ color: '#fff' }}>Infak Lagi</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                {/* <View style={{ backgroundColor: '#0EBEDF' }}>
                    <Text style={style.title}>Laporan Keuangan</Text>
                </View>
                <View style={style.title}>
                    <Text style={{ fontWeight: 'bold', fontSize: 16, }}>Total Pengeluaran Rp.</Text>
                </View>
                <Picker style={style.Textinputcss} mode="dropdown"
                    selectedValue={this.state.keg}
                    onValueChange={(itemValue) => {
                        this.setState({
                            keg: itemValue
                        })
                    }}>
                    <Picker.Item style={{ fontSize: 12 }} label={'Semester'} value={'0'} key={'0'} />
                    {
                        this.state.Kegiatan.map((keg) =>
                            <Picker.Item style={{ height: '100%', width: '100%', fontSize: 12, }} label={keg.nama_kegiatan.toString()} value={keg.nama_kegiatan.toString()} key={keg.id_kegiatan.toString()} />
                        )}
                    <Picker.Item style={{ height: '100%', width: '100%', fontSize: 12, }} label='1' value='1' key='1' />
                    <Picker.Item style={{ height: '100%', width: '100%', fontSize: 12, }} label='2' value='2' key='1' />
                    <Picker.Item style={{ height: '100%', width: '100%', fontSize: 12, }} label='3' value='3' key='1' />
                    <Picker.Item style={{ height: '100%', width: '100%', fontSize: 12, }} label='4' value='4' key='1' />
                    <Picker.Item style={{ height: '100%', width: '100%', fontSize: 12, }} label='5' value='5' key='1' />
                    <Picker.Item style={{ height: '100%', width: '100%', fontSize: 12, }} label='6' value='6' key='1' />

                </Picker> */}
            </ScrollView>
        )
    }
}

export default Detinfak
const style = StyleSheet.create({
    contentContainer: {
        backgroundColor: '#fff',
    },
    title: {
        marginRight: 20,
        marginLeft: 20,
        marginTop: 15,
        marginBottom: 15,
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
    },
    itemflat: {
        flex: 1,
        fontSize: 12,
        flexDirection: 'row',
        marginLeft: 20,
        padding: 10,
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
    Label1: {
        marginTop: 15,
        marginLeft: 15,
        textAlign: 'center',
        color: '#000000',
    },
    Textinputcss: {
        color: '#7e7e7e',
        marginLeft: 10,
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
    kotakbaru: {
        shadowColor: "#333",
        shadowOffset: {
            width: 1,
            height: 1,
        },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        elevation: 3,
        width: '90%',
        height: 150,
        borderRadius: 10,
        borderWidth: 1,
        marginLeft: 20,
        marginTop: 10,
        borderColor: '#E9E9E9',
        justifyContent: 'center',
        textAlign: 'center',
        backgroundColor: '#fff',
        justifyContent: 'space-around'
    },
    btnSimpanbaru: {
        width: '80%',
        fontWeight: 'bold',
        backgroundColor: '#00A9B8',
        borderRadius: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: '#00A9B8',
        justifyContent: 'center', alignItems: 'center',
        textAlign: 'center',
        color: '#fff'
    },
})