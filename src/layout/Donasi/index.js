import { ScrollView, Text, View, StyleSheet, TextInput, FlatList, TouchableOpacity, Image } from 'react-native'
import React, { Component } from 'react'
import { test } from '../../assets/images'
export class index extends Component {
    constructor(props) {
        super(props)
        this.state = {
            carianak: '',
            modaldetailanak: false,
            filt_anak1: [],
            anakren: [],
            berita: [],

        }
    }
    filterList1(textToSearch) {
        this.setState({
            filt_anak1: this.state.anakren.filter(i => i.nama.toLowerCase().includes(textToSearch)),
        });
    }

    GetanakrenAPi() {
        fetch('https://berbagibahagia.org/api/getanakrand').then(res => {
            if (res.status === 200)
                return res.json()
        }).then(resdata => {
            console.log(resdata.data)
            this.setState({
                anakren: resdata.data,
                filter: resdata.data,
                refreshing: false,

            })
        })
    }
    GetBeritaAPi() {
        fetch('https://berbagibahagia.org/api/getcampung').then(res => {
            if (res.status === 200)
                return res.json()
        }).then(resdata => {
            console.log(resdata.data)
            this.setState({
                berita: resdata.data,
                filter: resdata.data,
                refreshing: false,
            })
        })
    }
    componentDidMount() {
        this.GetBeritaAPi();
        this.GetanakrenAPi();
    }
    render() {
        return (
            <ScrollView>
                <View style={{ backgroundColor: '#0EBEDF', height: 150, borderBottomRightRadius: 28, borderBottomLeftRadius: 28 }}>
                    <Text style={style.title1}>Donasi</Text>
                    <Text style={{
                        marginRight: 20,
                        marginLeft: 20,
                        marginTop: 10,
                        marginBottom: 15,
                        fontSize: 12,
                        fontWeight: 'bold',
                        color: '#fff',
                    }}></Text>
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
                                this.filterList1(text.toLowerCase()), this.setState({ carianak: text })
                            }}
                            style={style.searchBar} />
                    </View>
                </View>
                <Text style={[style.Labelbaru1, { marginTop: 10, marginLeft: 10, }]}>Campign Unggulan</Text>
                <FlatList
                    horizontal
                    pagingEnabled={true}
                    data={this.state.berita}
                    renderItem={({ item }) => (
                        <View style={style.kotakbaru3}>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('bayardonasi')}>
                                <View style={{ flexDirection: 'column', padding: 5 }}>
                                    <Image source={test}
                                        style={{ height: 104, width: 133, marginTop: -10, marginLeft: 2 }} />
                                    <Text style={style.Labelbaru}>Yayasan Tahfidz</Text>
                                    <Text style={style.Labelbaru1}>Donasi Al Quran untuk para Tahfidz</Text>
                                    <Text style={style.Labelbaru}>Terkumpul</Text>
                                    <Text style={style.Labelbaru}>Rp.234.456.100</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    )}>
                </FlatList>
                <Text style={[style.Labelbaru1, { marginTop: 10, marginLeft: 10, }]}>Campign lainnya</Text>

                <FlatList
                    pagingEnabled={true}
                    data={this.state.berita}
                    renderItem={({ item }) => (
                        <View style={style.kotakbaru}>
                            <TouchableOpacity onPress={() => { this.setState({ detrand: item, }); }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Image source={test}
                                        style={{ height: 104, width: 133, marginTop: -10, marginLeft: 7 }} />

                                    <View style={{ flexDirection: 'column', padding: 5 }}>

                                        <Text style={[style.Labelbaru1, { width: '70%' }]}>Donasi Al Quran untuk para Tahfidz</Text>
                                        <View style={{ justifyContent: 'space-between', alignContent: 'space-between', flexDirection: 'row' }}>
                                            <View style={{ flexDirection: 'column' }}>
                                                <Text style={style.Lablebaru2}>Terkumpul</Text>
                                                <Text style={style.Lablebaru2}>Rp.234.456.100</Text>
                                            </View>
                                            <View style={{ flexDirection: 'column' }}>
                                                <Text style={style.Lablebaru2}>Tersisa</Text>
                                                <Text style={style.Lablebaru2}>26 Hari</Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </View>
                    )}>
                </FlatList>

            </ScrollView>
        )
    }
}

export default index
const style = StyleSheet.create({
    contentContainer: {
        backgroundColor: '#fff',
        width: '100%',
        height: '100%'
    },
    title1: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
    },
    kotakbaru3: {
        shadowColor: "#333",
        shadowOffset: {
            width: 1,
            height: 1,
        },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        elevation: 3,
        width: 150,
        height: 180,
        borderRadius: 15,
        borderWidth: 1,
        marginLeft: 20,
        marginTop: 10,
        borderColor: '#E9E9E9',
        justifyContent: 'center',
        backgroundColor: '#fff'
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
        borderRadius: 15,
        borderWidth: 1,
        marginLeft: 20,
        marginTop: 10,
        borderColor: '#E9E9E9',
        justifyContent: 'center',
        backgroundColor: '#fff'
    },
    Labelbaru: {
        fontSize: 10,
        marginLeft: 5,
    },
    Labelbaru1: {
        fontSize: 12,
        marginLeft: 5,
        fontWeight: 'bold',
    },
    Lablebaru2: {
        fontSize: 10,
        marginLeft: 5,
    }
});