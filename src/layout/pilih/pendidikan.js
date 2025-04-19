import { Text, View, TouchableOpacity, StyleSheet, ScrollView } from 'react-native'
import React, { Component } from 'react'


export class pendidikan extends Component {
    constructor(props) {
        super(props)
        this.state = {
            Anak: [],
            filter1: [],
            test: [],
            pegajuanlist: [],
        }
    }
    GetAnakAPi() {
        fetch('https://kilauindonesia.org/datakilau/api/joindataanak')
            .then(res => {
                if (res.status === 200) return res.json();
            })
            .then(resdata => {
                console.log(resdata.data);
                this.setState({
                    Anak: resdata.data,
                    filter1: resdata.data,
                    refreshing: false,

                });
            });
    }
    GetPengajuanpengelola() {
        fetch('https://kilauindonesia.org/datakilau/api/getpengajuan').then(res => {
            if (res.status === 200)
                return res.json()
        }).then(resdata => {
            console.log(resdata.data)
            this.setState({
                pegajuanlist: resdata.data,
                refreshing: false,

            })
        })
    }
    componentDidMount() {
        this.GetAnakAPi();
        this.GetPengajuanpengelola();
        console.log(this.props);
    }
    render() {
        const BCPB = this.state.Anak.filter(item => item.status_validasi === 'tidak aktif')
        const jmlpegajuan = this.state.pegajuanlist.filter(item => item.status === "Pending")

        return (
            <ScrollView style={{ backgroundColor: '#fff', flex: 1 }}>
                <View style={style.itemflat}>
                    <TouchableOpacity style={{ flexDirection: 'row', justifyContent: "space-between" }} onPress={() => this.props.navigation.navigate('List_Anak_Binaan')}>
                        <Text style={style.labelkiri}>Data Anak Asuh</Text>
                        {BCPB === 0 ?
                            <View /> :
                            <View style={{
                                marginTop: -10, marginRight: 10, backgroundColor: "red", height: 25, width: 25, padding: 5,
                                justifyContent: 'center', borderRadius: 30
                            }}>
                                <Text style={{ fontSize: 14, justifyContent: "center", alignSelf: 'center', marginTop: -2, color: '#fff', fontWeight: 'bold' }}>{BCPB.length}</Text>
                            </View>}
                    </TouchableOpacity>
                </View>
                <View style={style.itemflat}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('DataKelshel')}>
                        <Text style={style.labelkiri}>Kelompok</Text>
                    </TouchableOpacity>
                </View>
                <View style={style.itemflat}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Tutor')}>
                        <Text style={style.labelkiri}>Pengelola Dan Tutor</Text>

                    </TouchableOpacity>
                </View>
                <View style={style.itemflat}>
                    <TouchableOpacity style={{ flexDirection: 'row', justifyContent: "space-between" }} onPress={() => this.props.navigation.navigate('ListPengajuan')}>
                        <Text style={style.labelkiri}>List Pengajuan Shelter</Text>
                        {jmlpegajuan === 0 ?
                            <View /> :
                            <View style={{
                                marginTop: -10, marginRight: 10, backgroundColor: "red", height: 25, width: 25, padding: 5,
                                justifyContent: 'center', borderRadius: 30, 
                            }}>
                                <Text style={{ fontSize: 12, justifyContent: "center", alignSelf: 'center', marginTop: -2, color: '#fff', fontWeight: 'bold' }}>{jmlpegajuan.length}</Text>
                            </View>}
                    </TouchableOpacity>
                </View>

                <View style={style.itemflat}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('PengajuanDonatur')}>
                        <Text style={style.labelkiri}>Pengajuan Donatur</Text>
                    </TouchableOpacity>
                </View>

                <View style={style.itemflat}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('PengajuanAnak')}>
                        <Text style={style.labelkiri}>Pengajuan Anak Untuk Donatur</Text>
                    </TouchableOpacity>
                </View>

                <View style={style.itemflat}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Report')}>
                        <Text style={style.labelkiri}>Report</Text>
                    </TouchableOpacity>
                </View>

                <View style={style.itemflat}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('LevelBinaan')}>
                        <Text style={style.labelkiri}>List Level Binaan</Text>
                    </TouchableOpacity>
                </View>

                <View style={style.itemflat}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Materi')}>
                        <Text style={style.labelkiri}>Materi/Kurikulum</Text>
                    </TouchableOpacity>
                </View>

                <View style={style.itemflat}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('ListKegiatan')}>
                        <Text style={style.labelkiri}>List Kegiatan</Text>
                    </TouchableOpacity>
                </View>

                <View style={style.itemflat}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Keuangan')}>
                        <Text style={style.labelkiri}>Data Keuangan Anak</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        )
    }
}

const style = StyleSheet.create({
    itemflat: {
        fontSize: 12,
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
        height: 60,
        width: '90%',
        justifyContent: 'center',
    },
    labelkiri: {
        fontSize: 12,
        fontWeight: 'bold',
        marginVertical: 5,
        marginLeft: 10,
    },
});
export default pendidikan