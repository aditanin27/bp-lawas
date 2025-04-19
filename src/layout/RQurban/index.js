import { Text, View, StyleSheet, Dimensions, TouchableOpacity, FlatList, ImageBackground } from 'react-native'
import React, { Component } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import { SK1, SK } from '../../assets/images'

export class index extends Component {
    constructor(props) {
        super(props)
        this.state = {
            refreshing: true,
            list: [],
            items: [],
            gambar_donatur: '',
            nama: '',
            detbe: [],
            modaldetail: 'false',
            active: 0,
            hasScrolled: false,
            page: 1,
            perPage: 2,
            loadMoreVisible: true,
        }
    }
    GetListAPi() {
        fetch('https://kilauindonesia.org/datakilau/api/testo').then(res => {
            if (res.status === 200)
                return res.json()
        }).then(resdata => {
            console.log(resdata.data)
            this.setState({
                list: resdata.data,
            })
        })
    }
    componentDidMount() {
        this.GetListAPi();
    }
    render() {
        return (
            <ScrollView style={{ backgroundColor: '#fff' }}>
                <View>
                    <View style={{ backgroundColor: '#0EBEDF' }}>
                        <Text style={style.title}>Ramadhan & Qurban</Text>
                    </View>
                    <TouchableOpacity style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center', marginTop: 20, }} onPress={() => this.props.navigation.navigate('Qurban')}>
                        <Text style={style.btnSimpanUn}> Qurban Sekarang</Text>
                    </TouchableOpacity>
                    <View>
                        <Text style={{ marginLeft: 20, marginTop: 10, }}> Riwayat Qurban Anda</Text>
                        <FlatList
                            data={this.state.list}
                            renderItem={({ item }) => (
                                <View style={{
                                    flexDirection: 'row',
                                    width: '90%',
                                    height: 90,
                                    borderRadius: 10,
                                    borderWidth: 1,
                                    marginLeft: 20,
                                    marginTop: 10,
                                    borderColor: '#E9E9E9',
                                    justifyContent: 'center', alignItems: 'center',
                                    alignContent: 'center',
                                    textAlign: 'center',
                                    backgroundColor: '#f2f2f2',
                                }}>
                                    <View style={{ flexDirection: 'column', marginTop: 20,}}>
                                        <Text style={{ marginTop: -30, fontWeight: 'bold' }}>
                                            JENIS QURBAN
                                        </Text>
                                        <Text style={{ fontSize: 12 }}>
                                            {item.nama}
                                        </Text>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 10 }}>
                                            <Text style={{ marginRight: 20 }}> tanggal</Text>
                                            <Text > harga</Text>
                                        </View>
                                    </View>
                                    <ImageBackground source={SK1} style={{
                                        marginLeft: 70,
                                        width: 90,
                                        height: 45,
                                    }}></ImageBackground>
                                </View>
                            )}>
                        </FlatList>
                    </View>
                </View>

            </ScrollView>
        )
    }
}

export default index
const style = StyleSheet.create({
    wrap: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height * 0.25 // 25% window
    },
    wrapDot: {
        position: 'absolute',
        bottom: 0,
        flexDirection: 'row',
        alignSelf: 'center'
    },
    dot: {
        margin: 3,
        color: '#888'
    },
    dotActive: {
        margin: 3,
        color: 'black'
    },
    contentContainer: {
        flex: 1,
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
        marginVertical: 8,
        marginLeft: 10,
        backgroundColor: '#fff',
        // shadowColor: "#333",
        // shadowOffset: {
        //   width: 1,
        //   height: 1,
        // },
        // shadowOpacity: 0.3,
        // shadowRadius: 2,
        // borderColor: '#7e7e7e',
        // elevation: 3,
    },
    Label: {
        color: '#fff',
        fontSize: 18,
        position: 'absolute',
        top: 55, left: 10, right: 0, bottom: 0,
    },
    Labeltgl: {
        marginTop: 5,
        position: 'absolute',
        top: 0, left: 10, right: 0, bottom: 0,
        height: 25, width: 25,
    },
    ModalCont2: {
        flex: 1,
        backgroundColor: '#00000079',
    },
    btnSimpanUn: {
        width: '50%',
        fontWeight: 'bold',
        color: '#fff',
        backgroundColor: '#0EBEDF',
        borderRadius: 10,
        padding: 10,
        justifyContent: 'center', alignItems: 'center',
        alignContent: 'center',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    btnSimpanUn1: {
        width: '40%',
        fontWeight: 'bold',
        backgroundColor: '#C6C6C6',
        borderRadius: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: '#E9E9E9',
        justifyContent: 'center', alignItems: 'center',
        alignContent: 'center',
        textAlign: 'center',
        marginRight: 10,
    },
    itemText: {
        textAlign: 'justify',
        marginLeft: 10,
        fontSize: 12,
        width: '35%',
        height: 43,
    },
    baca: {
        justifyContent: 'flex-end',
        marginLeft: 100,
        marginTop: 5,
        textAlign: 'center',
        height: 25,
        width: 50,
    },

})