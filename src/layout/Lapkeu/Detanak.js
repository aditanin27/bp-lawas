import { Text, View, ScrollView, StyleSheet } from 'react-native'
import React, { Component } from 'react'

export class Detanak extends Component {
    render() {
        return (
            <ScrollView>
                <View style={{ backgroundColor: '#00A9B8', width: '100%', height: 140, borderBottomLeftRadius: 28, borderBottomRightRadius: 28 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{
                            fontSize: 16,
                            fontWeight: 'bold',
                            color: '#ffffff',
                            marginLeft: 10,
                            marginTop: 10,
                        }}
                        >Laporan Keuangan</Text>
                        {/* <Image source={bell} style={{ marginTop: 20, left: 200 }}></Image> */}
                        {/* <View style={{ marginRight: 30, marginTop: 10 }}>
                <Text style={{ color: '#fff' }}>Anak Yang {"\n"}Diasuh</Text>
                <View style={{ flexDirection: 'row' }}>
                  <Image source={akun}></Image>
                  <Text style={style.angka}>1</Text>
                </View>
              </View> */}
                    </View>
                    <Text style={{
                        fontSize: 12,
                        color: '#ffffff',
                        marginLeft: 20,
                        marginTop: 20,
                    }}>Jadilah orang tua asuh dan wujudkan impian {'\n'}anak-anak</Text>

                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 15 }}>
                    <Text style={{ marginLeft: 15 }}>Riwayat Pendanaan</Text>
                    <Text style={{ marginRight: 15 }}>Terbaru</Text>
                </View>
                <View style={style.kotakbaru}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 10 }}>
                        <Text style={style.Labelbaru}>Laporan Keuangan </Text>
                        <Text>21 Feb 2021</Text>
                    </View>
                    <View style={{ width: '100%', height: 1, backgroundColor: '#EBEAEA' }} />
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 5 }}>
                        <Text>Nama</Text>
                        <Text>Fauzan M</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 5 }}>
                        <Text>Kelas/Semester</Text>
                        <Text>V/Genap</Text>
                    </View>
                    <View style={{ width: '100%', height: 1, backgroundColor: '#EBEAEA' }} />

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 5 }}>
                        <Text>Bimbel</Text>
                        <Text>Rp.500.000</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 5 }}>
                        <Text>Eskul dan Keagamaan</Text>
                        <Text>Rp.500.000</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 5 }}>
                        <Text>Laporan</Text>
                        <Text>Rp.500.000</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 5 }}>
                        <Text>Uang Tunai</Text>
                        <Text>Rp.500.000</Text>
                    </View>
                    <View style={{ width: '100%', height: 1, backgroundColor: '#EBEAEA' }} />
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 10 }}>
                        <Text style={style.Labelbaru2}>Total Pengeluaran</Text>
                        <Text style={style.Labelbaru2}>Rp.2.000.000</Text>
                    </View>
                    <View style={{ width: '100%', height: 1, backgroundColor: '#EBEAEA' }} />

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 5 }}>
                        <Text>Donasi</Text>
                        <Text>Rp.500.000</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 5 }}>
                        <Text>Subsidi Infak</Text>
                        <Text>Rp.500.000</Text>
                    </View>
                    <View style={{ width: '100%', height: 1, backgroundColor: '#EBEAEA' }} />
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 10 }}>
                        <Text style={style.Labelbaru2}>Total Pemasukan</Text>
                        <Text style={style.Labelbaru2}>Rp.1.000.000</Text>
                    </View>
                    <View style={{ width: '100%', height: 1, backgroundColor: '#EBEAEA' }} />
                </View>

                <View style={style.kotakbaru}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 10 }}>
                        <Text style={style.Labelbaru}>Laporan Keuangan </Text>
                        <Text>21 Feb 2021</Text>
                    </View>
                    <View style={{ width: '100%', height: 1, backgroundColor: '#EBEAEA' }} />
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 5 }}>
                        <Text>Nama</Text>
                        <Text>Dede ali</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 5 }}>
                        <Text>Kelas/Semester</Text>
                        <Text>VI/Genap</Text>
                    </View>
                    <View style={{ width: '100%', height: 1, backgroundColor: '#EBEAEA' }} />

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 5 }}>
                        <Text>Bimbel</Text>
                        <Text>Rp.500.000</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 5 }}>
                        <Text>Eskul dan Keagamaan</Text>
                        <Text>Rp.500.000</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 5 }}>
                        <Text>Laporan</Text>
                        <Text>Rp.500.000</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 5 }}>
                        <Text>Uang Tunai</Text>
                        <Text>Rp.500.000</Text>
                    </View>
                    <View style={{ width: '100%', height: 1, backgroundColor: '#EBEAEA' }} />
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 10 }}>
                        <Text style={style.Labelbaru2}>Total Pengeluaran</Text>
                        <Text style={style.Labelbaru2}>Rp.2.000.000</Text>
                    </View>
                    <View style={{ width: '100%', height: 1, backgroundColor: '#EBEAEA' }} />

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 5 }}>
                        <Text>Donasi</Text>
                        <Text>Rp.500.000</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 5 }}>
                        <Text>Subsidi Infak</Text>
                        <Text>Rp.500.000</Text>
                    </View>
                    <View style={{ width: '100%', height: 1, backgroundColor: '#EBEAEA' }} />
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 10 }}>
                        <Text style={style.Labelbaru2}>Total Pemasukan</Text>
                        <Text style={style.Labelbaru2}>Rp.1.000.000</Text>
                    </View>
                    <View style={{ width: '100%', height: 1, backgroundColor: '#EBEAEA' }} />
                </View>
            </ScrollView>
        )
    }
}

export default Detanak
const style = StyleSheet.create({
    Labelbaru: {
        fontWeight: 'bold',
        fontSize: 16,
        marginTop: -5,
        marginLeft: 20,
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
        height: 350,
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
    Labelbaru2: {
        fontSize: 16,
        fontWeight: 'bold',
    },
})