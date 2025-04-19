import { ScrollView, Text, View, StyleSheet, TextInput, Image, TouchableOpacity, SafeAreaView, FlatList, ImageBackground, Button } from 'react-native'
import React, { Component } from 'react'
import { akun, test, Union } from '../../assets/images'
import {
    Wallet, Profil2, Kidsin, Aktifitas, IconRumah, Tamnak, Kel, Body,
    Sekolah, Tgl, Jenis, Gender, Locations, TingkatH
} from '../../assets/icons'
import LinearGradient from 'react-native-linear-gradient';
import { connect } from 'react-redux'

export class Pilnak extends Component {
    constructor(props) {
        super(props)
        this.state = {
            carianak: '',
            filt_anak1: [],
            filter_sta: [],
            anak1: [],
            detail: [],
        }
    }

    GetAnakAPi() {
        fetch('https://kilauindonesia.org/datakilau/api/joindataanak')
            .then(res => {
                if (res.status === 200)
                    return res.json()
            }).then(resdata => {
                console.log(resdata.data)
                this.setState({
                    anak1: resdata.data,
                    filt_anak1: resdata.data,
                    filter_sta: resdata.data,
                })
            })
    }
    componentDidMount() {
        this.GetAnakAPi();
        console.log(this.props);
    }
    filterList(textToSearch) {
        this.setState({
            filt_anak1: this.state.anak1.filter(i => i.full_name.toLowerCase().includes(textToSearch)),
        });
    }
    render() {

        const filter_sta = this.state.anak1.filter(item => item.status_cpb === 'CPB')
        return (
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ backgroundColor: '#0EBEDF', height: 150, borderBottomRightRadius: 28, borderBottomLeftRadius: 28 }}>
                    <Text style={style.title1}>Anak Asuh</Text>
                    <Text style={{
                        marginRight: 20,
                        marginLeft: 20,
                        marginTop: -10,
                        marginBottom: 15,
                        fontSize: 12,
                        fontWeight: 'bold',
                        color: '#fff',
                    }}>Jadilah Orang tua asuh dan wujudkan impian {"\n"}anak-anak</Text>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: '#fff',
                        borderWidth: 0.5,
                        height: 40,
                        borderRadius: 5,
                        margin: 10,
                        borderColor: '#C0C0C0'
                    }}>
                        <TextInput
                            value={this.state.carianak}
                            placeholder={'Cari'}
                            onChangeText={(text) => {
                                this.filterList(text.toLowerCase()), this.setState({ carianak: text })
                            }}
                            style={style.searchBar} />
                    </View>

                </View>
                <FlatList
                   
                    data={filter_sta}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => { this.props.navigation.navigate('Detail', { id_anak: item.id_anak, item: item }), this.setState({ detail: item }) }}>

                   
                            <ImageBackground source={test} style={{ width: 200, height: 300, marginHorizontal: 10, marginTop: 10, borderRadius: 20 }} imageStyle={{ borderRadius: 20 }}>

                                <LinearGradient
                                    colors={['#00000000', '#000']}
                                    style={{ height: '100%', width: '100%' }}>
                                    <View style={{ justifyContent: 'center', textAlign: 'center', alignItems: 'center', alignContent: 'center', alignSelf: 'center', top: 200, backgroundColor: 'transparent', }}>
                                        <Text style={{ color: '#fff', textAlign: 'center' }}>{item.full_name}</Text>
                                        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                                            {
                                                item.kelas === '' | item.kelas === 'null' | item.kelas === null ?
                                                    <View style={{ flexDirection: 'row', }}>
                                                        <TingkatH style={{ marginLeft: 10, }} />
                                                        <Text style={{ color: '#000', fontSize: 12, marginLeft: 5 }}>Belum Sekolah</Text>
                                                    </View>

                                                    :
                                                    <View style={{ flexDirection: 'row', marginLeft: 10 }}>
                                                        <Kel />
                                                        <Text style={style.labeldlm}>Kelas {item.kelas}</Text>
                                                    </View>
                                            }

                                        </View>
                                        <View style={style.kolomkecil}>
                                            <View style={{ flexDirection: 'column', marginLeft: 15, }}>
                                                <Jenis style={{ marginRight: 20, }} />
                                                <Text style={{ marginRight: 20, color: '#fff', fontSize: 10, marginTop: 2, textAlign: 'center' }}>{item.status_cpb}</Text>
                                            </View>
                                            <View style={{ marginLeft: 0, width: 1, height: '90%', backgroundColor: '#EBEAEA', }} />

                                            {
                                                item.nama_shelter === '' | item.nama_shelter === 'null' | item.nama_shelter === null ?
                                                    <View style={{ flexDirection: 'column', }}>
                                                        <Locations style={{ alignSelf: 'center' }} />
                                                        <Text style={{ color: '#fff', fontSize: 10, marginLeft: 5, textAlign: 'center' }}>Tidak {'\n'}Ada Shleter</Text>
                                                    </View>
                                                    :
                                                    <View style={{ flexDirection: 'column', }}>
                                                        <Locations style={{ marginLeft: 10, }} />
                                                        <Text style={{ marginLeft: 5, color: '#fff', fontSize: 10, textAlign: 'center' }}>{item.nama_shelter}</Text>
                                                    </View>
                                            }

                                            <View style={{ marginLeft: 5, width: 1, height: '90%', backgroundColor: '#EBEAEA', }} />


                                            <View style={{ flexDirection: 'column', }}>
                                                < Gender style={{ marginLeft: 20, }} />
                                                <Text style={{ marginLeft: 5, color: '#fff', fontSize: 10, textAlign: 'center' }}>{item.jenis_kelamin}</Text>
                                            </View>
                                        </View>
                                    </View>
                                </LinearGradient>
                            </ImageBackground>
                        </TouchableOpacity>
                    )}>
                </FlatList>
            </ScrollView>
        )
    }
}


const style = StyleSheet.create({
    title1: {
        marginRight: 20,
        marginLeft: 20,
        marginTop: 15,
        marginBottom: 15,
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
    },
    searchBar: {
        fontSize: 12,
        width: '90%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        alignContent: 'center',
        marginTop: 5,
    },
    pencarian: {
        borderRadius: 10,
        borderWidth: 1,
        width: 120,
        height: 40,
        padding: 8,
        justifyContent: 'space-between',
        alignContent: 'space-between',
        borderColor: '#E9E9E9',
        margin: 10
    },
    labeldlm: {
        fontSize: 10,
        color: '#fff',
    },
    linearGradient: {
        width: '100%', height: '25%',
    },
    kolomkecil: {
        width: '90%',
        height: 80,
        justifyContent: 'space-around',
        alignContent: 'space-around',
        borderRadius: 15,
        flexDirection: 'row',
        textAlign: 'center',
    },
})

const mapStateToProps = (state) => {
    return {
        user: state,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        changeUser: (data) => dispatch({ type: 'CHANGE/USER', payload: data }),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Pilnak);