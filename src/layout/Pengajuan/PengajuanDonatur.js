import React, { Component } from 'react'
import { Text, View, FlatList, StyleSheet, TouchableOpacity } from 'react-native'
import { Picker } from '@react-native-picker/picker';

export class PengajuanDonatur extends Component {
    constructor(props) {
        super(props)
        this.state = {
            listrqeust: [],
        }
    }
    componentDidMount() {
        this.GetrequestAPi();
    }
    GetrequestAPi() {
        fetch('https://kilauindonesia.org/datakilau/api/getrequestanak').then(res => {
            if (res.status === 200)
                return res.json()
        }).then(resdata => {
            console.log(resdata.data)
            this.setState({
                listrqeust: resdata.data

            })
        })
    }
    render() {
        return (
            <View style={{ backgroundColor: '#fff', height: '100%' }}>
                <View style={{ backgroundColor: '#0EBEDF', height: 50 }}>
                    <Text style={{ color: '#fff', textAlign: 'center', fontWeight: 'bold', fontSize: 16, marginTop: 5, marginBottom: 5 }}>Riwayat Pengajuan</Text>
                </View>
                <FlatList
                    pagingEnabled={true}
                    data={this.state.listrqeust}
                    renderItem={({ item }) => (
                        // style={style.kotakbaru4}
                        <TouchableOpacity onPress={() =>
                            this.props.navigation.navigate('DetailDonatur', { list: item })
                        }
                        >
                            <View style={[style.kotakstat, { height: 120 }]}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text style={[style.status, {
                                        color: item.status === 'Diterima' ?
                                            'green' : item.status === 'Ditolak' ? 'red' : '#D39800'
                                    }]}>{item.status}</Text>

                                    <Text style={[style.status, {
                                        color: item.status_bayar === 'Sudah' ?
                                            'green' : item.status_bayar === 'Belum' ? 'red' : '#D39800'
                                    }]}>{item.status_bayar}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                    <Text style={[style.judul, { marginLeft: 4, color: '#bdbdbd' }]}>Pengajuan Anak Asuh</Text>
                                </View>

                                <Text style={{ textAlign: 'right', color: '#bdbdbd', fontWeight: 'bold' }}>{item.tanggal}</Text>
                            </View>
                        </TouchableOpacity>
                    )}>
                </FlatList>
            </View>
        )
    }
}

export default PengajuanDonatur
const style = StyleSheet.create({
    contentContainer: {
        backgroundColor: '#fff',
        width: '100%',
        height: '100%',
    },
    title1: {
        marginRight: 20,
        marginLeft: 20,
        marginTop: 15,
        marginBottom: 15,
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
    },
    label: {
        marginTop: 20,
        marginLeft: 10,
    },
    label3: {
        marginTop: 20,
        marginLeft: 30,
    },
    label2: {
        marginLeft: -40,
    },
    kotakbaru1: {
        width: '95%',
        height: 200,
        borderRadius: 15,
        marginTop: 5,
        marginLeft: 10,
        borderWidth: 1,
        borderColor: '#E9E9E9',
        backgroundColor: '#fff',
        marginBottom: 10,
    },
    kotakstat: {
        backgroundColor: '#fff',
        height: 140,
        marginVertical: 8,
        marginLeft: 20,
        width: '90%',
        borderRadius: 10,
        paddingHorizontal: '4%',
        shadowColor: '#858585',
        overflow: 'hidden',
        shadowRadius: 15,
        elevation: 6,
        shadowOpacity: '25%',
    },
    status: {
        marginTop: 10,
        // color: '#D39800',
        // backgroundColor: '#bdbdbd',
        width: 60,
        height: 30,
        fontWeight: 'bold',
        padding: 3,
        textAlign: 'center',
        borderRadius: 5,
    },
    judul: {
        marginTop: 10,
        fontWeight: 'bold',
        fontSize: 16,
        width: '90%',
        // color: '#000',
    },
    btnkembali: {
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        width: '40%',
        height: 50,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#00A9B8',
    },
    btntambah: {
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        width: '40%',
        height: 50,
        borderWidth: 1,
        borderRadius: 10,
        color: '#fff',
        borderColor: '#00A9B8',
        backgroundColor: '#00A9B8',
    },
    txtPresensi: {
        justifyContent: 'center', alignItems: 'center',
        fontSize: 18,
        marginTop: 20,
        fontWeight: 'bold',
        color: '#7e7e7e'
    },
    kotakkecil: {
        flexDirection: 'column',
        borderColor: '#bdbdbd',
        borderWidth: 1,
        width: '40%',
        height: 100,
        justifyContent: 'center',
        alignContent: 'center',
        alignSelf: 'center',
        textAlign: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginTop: 10,
        marginHorizontal: 10,
    },
    containerSafe: {
        flex: 1,
        flexDirection: 'column',
    },
    ModalCont: {
        flex: 1,
        justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: '#00000099',
        paddingHorizontal: 10,
    },
})