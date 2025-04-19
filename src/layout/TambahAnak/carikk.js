import { Text, View, FlatList, StyleSheet, TextInput, TouchableOpacity, Image, SafeAreaView } from 'react-native'
import React, { Component } from 'react'
import { Arrowleft } from '../../assets/icons';

export class carikk extends Component {
    constructor(props) {
        super(props)
        this.state = {
            carikkk: '',
            kk: [],
            carikartu: [],
            showflatlist: false,
            anak: '',

        }
    }
    componentDidMount() {
        this.GetkkAPi();
    }

    GetkkAPi() {
        const id_anak = this.state.anak
        fetch('https://kilauindonesia.org/datakilau/api/pengetkeluarga').then(res => {
            if (res.status === 200)
                return res.json()
        }).then(resdata => {
            console.log(resdata.data)
            this.setState({
                kk: resdata.data,
                carikartu: resdata.data,
            })
        })
    }
    filterList(textToSearch) {
        const filker = this.state.kk =
            this.state.kk.filter((item, index) => {
                return this.state.kk.findIndex(i => i.kepala_keluarga === item.kepala_keluarga) === index;
            })
        this.setState({
            carikartu: filker.filter(i => i.kepala_keluarga.toLowerCase(textToSearch).includes(textToSearch))
        });
    }
    render() {

        return (
            <SafeAreaView style={{ width: '100%', height: '100%', paddingHorizontal: 20, backgroundColor: '#fff' }}>
                <View
                    style={{
                        flexDirection: 'row',
                        marginTop: 10,
                        marginHorizontal: 10,
                        alignItems: 'center',
                    }}>
                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('List_Anak_Binaan')}>
                        <Arrowleft />
                    </TouchableOpacity>
                    <View style={{ justifyContent: 'center', width: '100%', padding: 10 }}>
                        <Text style={style.title2}>Tambah Anak Binaan</Text>
                    </View>
                </View>
                <View>
                    <Text style={style.text}>Pilih Kartu Keluarga</Text>
                    <TextInput
                        style={{
                            backgroundColor: '#FFF',
                            paddingHorizontal: 40,
                            height: 38,
                            width: 250,
                            borderRadius: 3,
                            marginTop: 10,
                            justifyContent: 'center',
                            alignContent: 'center',
                            alignSelf: 'center',
                            borderWidth: 0.1,
                        }}
                        onChangeText={(text) => {
                            this.filterList(text.toLowerCase()), this.setState({ carikkk: text, showflatlist: true })
                        }}
                        value={this.state.text}
                        placeholder="Cari Nama yang diinginkan"
                        placeholderTextColor="#C0C0C0"
                        underlineColorAndroid="transparent"
                    />

                </View>
                {this.state.showflatlist ? (
                    <FlatList
                        data={this.state.carikartu}
                        renderItem={({ item }) => (
                            <View>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('Terdaftar', { item: item })}>
                                    <View style={style.kolomkk}>
                                        <Text style={{ textAlign: 'center', justifyContent: 'center' }}>{item.no_kk} {item.kepala_keluarga}</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        )}>

                    </FlatList>
                ) : (
                    <Text style={{ fontSize: 10, textAlign: 'center', marginTop: 10, }}> Masukan Nama Kepala Keluarga terlebih Dahulu</Text>
                )}

            </SafeAreaView>
        )
    }
}

export default carikk
const style = StyleSheet.create({
    searchBar: {
        fontSize: 12,
        width: '70%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        alignContent: 'center',
        marginTop: 5,
    },
    item1: {
        fontSize: 12,
        backgroundColor: '#fff',
        flexDirection: 'row',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        shadowColor: "#333",
        shadowOffset: {
            width: 1,
            height: 1,
        },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        elevation: 3,
        borderColor: '#7e7e7e',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    Label: {
        fontSize: 12,
        padding: 5,
        color: '#000000',
        marginLeft: 5,
    },
    kolomkk: {
        borderWidth: 1,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: 50,
        marginVertical: 10,
        borderRadius: 10,
        borderColor: '#DDDDDD',
        backgroundColor: '#fff',
    },
    title2: {
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginRight: 20,
        fontSize: 15,
        color: '#000',
        fontFamily: 'Poppins-SemiBold',
    },
    text: {
        fontWeight: 'bold',
        fontSize: 14,
        marginTop: 10,
        marginLeft: 10,
    }
})
