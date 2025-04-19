import { ScrollView, Text, View, Image, StyleSheet, RefreshControl, FlatList, SafeAreaView } from 'react-native'
import React, { Component } from 'react'
import { test, siswa1, siswa2 } from '../../assets/images'
import { Zakat, Wallet, Profil2, Kids, Lapkeu, Infak, Berita, Aktifitasin, IconRumah, Tamnak, PlusDark } from '../../assets/icons'
import { connect } from 'react-redux';

class DetAktifitasAnak extends Component {
    constructor(props) {
        super(props)
        this.state = {
            filter: [],
            absen: [],
            detail: this.props.route.params.item,

        }
    }
    componentDidMount() {
        this.GetanakrenAPi();

    }
    GetanakrenAPi() {
        fetch('https://kilauindonesia.org/datakilau/api/detailabsenak/' + this.state.detail.id_absen).then(res => {
            if (res.status === 200)
                return res.json()
        }).then(resdata => {
            console.log(resdata.data)
            this.setState({
                absen: resdata.data,
                filter: resdata.data,
                refreshing: false,

            })
        })
    }

    render() {


        return (
            <FlatList
                style={{ flex: 1, backgroundColor: '#fff' }}
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.refreshing}
                        onRefresh={() => this.onRefresh()}

                    />
                }
                data={this.state.absen}
                renderItem={({ item, index }) => (
                    <SafeAreaView style={style.contentContainer}>
                        <View style={{ backgroundColor: '#0EBEDF', height: 75, borderBottomRightRadius: 28, borderBottomLeftRadius: 28 }}>
                            <Text style={style.title1}>Detail Aktifitas</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignContent: 'space-around', marginBottom: 10 }}>
                            <View style={{ flexDirection: 'row', marginLeft: -30 }}>
                                <Image source={test} style={{ height: 50, width: 50, marginLeft: 10, borderRadius: 30, marginTop: 10 }} ></Image>
                                <Text style={style.label}>{item.full_name}</Text>
                            </View>

                            <View style={{ backgroundColor: item.absen === 'Hadir' ? '#0076B8' : '#B22222', borderRadius: 4.2, marginRight: item.absen === 'Tidak Hadir' ? 10 : -20, height: 40, marginTop: 5 }}>
                                <Text style={{ paddingHorizontal: '6%', paddingVertical: '2%', color: item.absen === 'Hadir' ? '#fff' : '#fff', fontFamily: 'Poppins-Regular', fontSize: 12 }}>{item.absen}</Text>
                            </View>
                        </View>
                        <View style={{ width: '100%', height: 1, backgroundColor: '#EBEAEA' }} />
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignContent: 'space-around', padding: 10,marginHorizontal:10 }}>
                            <Text>Keterangan</Text>
                            <Text>{item.tanggal}</Text>
                        </View>
                        <View style={{ width: '100%', height: 1, backgroundColor: '#EBEAEA' }} />
                        <View >
                            <View style={style.kotakbaru1}>
                                <Text style={{ marginLeft: 20, }}>{item.jenis_kegiatan}</Text>
                            </View>
                        </View>
                        <View style={{ width: '100%', height: 1, backgroundColor: '#EBEAEA' }} />
                        <Text style={style.label3}>Foto Aktifitas</Text>

                        <View style={style.kotakbaru1}>
                            <Image source={siswa2} style={{ height: 200, width: 350, marginLeft: 10 }}></Image>

                        </View>
                    </SafeAreaView >
                )}></FlatList>
        )
    }
}

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
        height: 220,
        borderRadius: 15,
        marginTop: 5,
        marginLeft: 10,
        borderWidth: 1,
        borderColor: '#E9E9E9',
        backgroundColor: '#fff',
        marginBottom: 10,
    },
})
const mapStateToProps = state => {
    return {
        user: state,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeUser: data => dispatch({ type: 'CHANGE/USER', payload: data }),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(DetAktifitasAnak);