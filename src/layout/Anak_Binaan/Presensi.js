import {
    Dimensions, Modal, TouchableOpacity, Text, View, StyleSheet,
    Image, ScrollView, SafeAreaView, TextInput, ToastAndroid, FlatList, RefreshControl
} from 'react-native'
import React, { Component } from 'react'
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'react-native-image-picker';
import { connect } from 'react-redux'
import { Label, Tamnak, Tagextra } from '../../assets/icons'
import { juara, addfoto2, addfoto } from '../../assets/images'
import AsyncStorage from '@react-native-async-storage/async-storage';

class Presensi extends Component {
    constructor(props) {
        super(props)
        this.state = {
            image: {
                name: '',
                type: '',
                uri: 'https://kilauindonesia.org/datakilau/gambarUpload/',

            },
            pres: '',
            level: '',
            total: null,
            tat: 0,
            detail: this.props.route.params.id_anak,
            pres: [],
            refreshing: true,
        }

    }

    getPrestasiAnakAPi() {
        AsyncStorage.getItem('token').then((token) => {
            fetch('https://kilauindonesia.org/datakilau/api/detailanakprestasi/' + this.state.detail, {
                headers: {
                    Authorization: 'Bearer ' + token,
                    // 'Accept': 'application/json',
                    // 'Content-Type': 'application/json'
                },
            }).then((res) => res.json())
                .then((resJson) => {
                    console.log('oke');
                    const length = resJson.data.length;
                    this.setState({
                        pres: resJson.data,
                    });
                })
                .catch((err) => console.log('error catch home', err));
        });
    }

    componentDidMount() {
        this.getPrestasiAnakAPi();
        console.log(this.props);
    }
    onRefresh() {
        this.getPrestasiAnakAPi();
        this.setState({ refreshing: false });
    }
    render() {
        const inputbutton = [];
        for (let i = 0; i < this.state.count; i++) {
            <>
                <View key={i}>
                    <Text>{i + 1}.</Text>
                    <Picker
                        style={style.Textinputcss}
                        selectedValue={this.state.rap}
                        value={this.state.tr[i]}
                        onValueChange={itemValue =>
                            this.setState({ rap: itemValue, show: 1 })
                        }>
                        <Picker.Item label="Pilih" value="" />
                        <Picker.Item label="SD/MI" value="SD/MI" />
                        <Picker.Item label="SMP/MTS" value="SMP/MTS" />
                        <Picker.Item label="SMA/SMK/MA" value="SMA/SMK/MA" />
                    </Picker>
                </View>
            </>;
        }
        const { prestasi } = this.state
      
        const images = [
            'https://www.kla.id/wp-content/uploads/2018/11/image049-5.jpg'
        ]

        return (

            <View contentContainerStyle={style.contentContainer} showsVerticalScrollIndicator={false}>
                <View style={{ backgroundColor: '#0EBEDF' }}>
                    <Text style={style.title2}>Prestasi</Text>
                </View>
                {this.props.user.presensi === '' ? //pengelola admin pusat/cabang
                    <SafeAreaView>
                        <FlatList
                            refreshControl={
                                <RefreshControl
                                    refreshing={this.state.refreshing}
                                    onRefresh={() => this.onRefresh()}
                                />
                            }
                            data={this.state.pres}
                            renderItem={({ item }) => (
                                <View style={style.kotakabu}>
                                    <Image source={{ uri: 'https://kilauindonesia.org/datakilau/gambarUpload/' + item.foto }} style={style.img}></Image>
                                    <View style={{ flexDirection: 'row', }}>
                                        <Text style={style.labelkiri}>Jenis</Text>
                                        <Text style={style.labelkanan}>{item.jenis_prestasi}</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', }}>
                                        <Text style={style.labelkiri}>Tingkat</Text>
                                        <Text style={style.labelkanan}>{item.level_prestasi}</Text>
                                    </View>

                                    <View style={{ flexDirection: 'column' }}>
                                        <Text numberOfLines={2} style={style.labelbaru}>{item.nama_prestasi}</Text>
                                    </View>
                                </View>
                            )}
                            keyExtractor={
                                (item, index) => index.toString()}
                            showsVerticalScrollIndicator={true}
                            ListEmptyComponent={() =>
                                <View>
                                    <View style={{ flexDirection: 'column', }}>
                                        <View style={style.iconbesar}>
                                            <Tamnak />
                                        </View>
                                        <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'center', }}>Anak Asuh Belum</Text>
                                        <Text style={{ fontSize: 12, textAlign: 'center', }}>Memasukan Prestasi</Text>
                                    </View>

                                </View>
                            }>
                        </FlatList>
                        <View style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center', alignSelf: 'center', marginTop: 20, position: 'absolute' }}>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('DetailTamPrestasi', { detail: this.state.detail })} style={style.refresh} >
                                <View style={{
                                    backgroundColor: '#0EBEDF', width: 170, height: 40, justifyContent: 'center', alignContent: 'center', alignItems: 'center', alignSelf: 'center', borderRadius: 10
                                }}>
                                    <Text style={{ color: '#fff', textAlign: 'center', justifyContent: 'center', alignContent: 'center' }}>+ Tambah Prestasi </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </SafeAreaView>

                    :
                    <View />
                }

                {this.props.user.presensi === 'admin' ? //ini halaman untuk donatur
                    <ScrollView >

                        <FlatList
                            data={this.state.pres}
                            refreshControl={
                                <RefreshControl
                                    refreshing={this.state.refreshing}
                                    onRefresh={() => this.onRefresh()}
                                />
                            }
                            renderItem={({ item }) => (
                                <View style={style.kotakabu}>
                                    <Image source={juara} style={style.img}></Image>
                                    <View style={{ flexDirection: 'row', }}>
                                        <Text style={style.labelkiri}>Jenis</Text>
                                        <Text style={style.labelkanan}>{item.jenis_prestasi}</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', }}>
                                        <Text style={style.labelkiri}>Tingkat</Text>
                                        <Text style={style.labelkanan}>{item.level_prestasi}</Text>
                                    </View>

                                    <View style={{ flexDirection: 'column' }}>
                                        <Text numberOfLines={2} style={style.labelbaru}>{item.nama_prestasi}</Text>
                                    </View>
                                </View>
                            )}
                            keyExtractor={
                                (item, index) => index.toString()}
                            showsVerticalScrollIndicator={false}
                            ListEmptyComponent={() =>
                                <View>
                                    <View style={{ flexDirection: 'column', }}>
                                        <View style={style.iconbesar}>
                                            <Tamnak />
                                        </View>
                                        <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'center', }}>Anak Asuh Belum</Text>
                                        <Text style={{ fontSize: 12, textAlign: 'center', }}>Memiliki Prestasi</Text>
                                    </View>
                                </View>
                            }>
                        </FlatList>
                    </ScrollView>
                    :
                    <View />
                }
            </View >
        )
    }
}
const style = StyleSheet.create({
    wrap: {
        width: Dimensions.get('window').width * 0.90,
        height: Dimensions.get('window').height * 0.25 // 25% window
    },
    Labeltgl: {
        position: 'absolute',
        top: 80, left: 0, right: 0, bottom: 0,
        height: 30, width: 30,
    },
    contentContainer: {
        flex: 1,
        backgroundColor: '#fff'
    },
    Label1: {
        flex: 1,
        fontSize: 12,
        padding: 5,
        color: '#000000',
        flexDirection: 'column',
    },
    btnSimpanUn: {
        width: '40%',
        fontWeight: 'bold',
        backgroundColor: '#C6C6C6',
        borderRadius: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: '#E9E9E9',
        justifyContent: 'center', alignItems: 'center',
        textAlign: 'center',
    },
    Textinputcss: {
        color: '#7e7e7e',
        marginLeft: 30,
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
    Label2: {
        marginTop: 5,
        marginLeft: 25,
        padding: 5,
        color: '#000',
        alignItems: 'center',
        justifyContent: 'center'
    },
    kotak2: {
        color: '#000000',
        marginTop: 10,
        marginLeft: 30,
        marginRight: 10,
        borderRadius: 2,
        borderWidth: 0.1,
        fontSize: 12,
        height: 52,
        backgroundColor: '#fff',
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
    title2: {
        marginRight: 20,
        marginLeft: 20,
        marginTop: 15,
        marginBottom: 15,
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
    },
    item: {
        flex: 1,
        fontSize: 16,
        flexDirection: 'row',
        backgroundColor: '#fff',
        padding: 17,
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
    container: {
        marginTop: 40,
        marginLeft: 75,
        multiline: true,
        width: 250,
        height: 250,
        flex: 1,
        margin: 20,
        alignItems: 'center',
        justifyContent: 'center',
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
    btnSimpanDark: {
        width: '40%',
        fontWeight: 'bold',
        backgroundColor: '#87cefa',
        borderRadius: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: '#E9E9E9',
        textAlign: 'center',
        justifyContent: 'center', alignItems: 'center'
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
    },
    coltom1: {
        width: '95%',
        marginLeft: 10,
        alignItems: 'center',
        alignContent: 'center',
        fontSize: 16,
        flexDirection: 'row',
        paddingTop: 10,
        paddingBottom: 10,
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
    img: {
        width: '95%',
        height: 150,
        marginLeft: 10,
        marginTop: 10,
        borderRadius: 10,
    },
    labelbaru: {
        fontSize: 14,
        marginTop: 10,
        marginLeft: 20
    },
    labelbaru1: {
        fontSize: 12,
        marginRight: 5,
        marginTop: 10
    },
    labelbaru2: {
        fontSize: 12,
        marginLeft: 10,
        marginTop: 10
    },
    kotakabu: {
        shadowColor: "#333",
        shadowOffset: {
            width: 1,
            height: 1,
        },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        elevation: 3,
        width: '95%',
        height: 260,
        borderRadius: 15,
        borderWidth: 1,
        marginLeft: 10,
        marginTop: 10,
        borderColor: '#E9E9E9',
        backgroundColor: '#fff',
    },
    kotakabu2: {
        shadowColor: '#333',
        shadowOffset: {
            width: 1,
            height: 1,
        },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        elevation: 3,
        width: '100%',
        height: 270,
        borderRadius: 15,
        marginTop: 10,
        backgroundColor: 'white',
        paddingHorizontal: 10
    }, //Vildan


    img2: {
        width: '100%',
        height: 150,
        marginTop: 10,
        borderRadius: 10,
    }, //vildan

    iconbesar: {
        marginTop: 50,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
    },
    labelkanan: {
        fontSize: 12,
        marginVertical: 5,
        width: 100,
    },
    labelkiri: {
        fontSize: 12,
        fontWeight: 'bold',
        marginVertical: 5,
        marginLeft: 20,
        width: 100,
    },
    labelbaru3: {
        fontSize: 16,
        marginTop: 10,
        fontWeight: 'bold',
        color: '#000'
    }, //vildan
    labelbaru4: {
        fontSize: 12,
        color: '#000'
    }, //vildan
    labelbaru5: {
        fontSize: 12,
        marginLeft: 10,
        color: '#000'
    }, //vildan

    refresh: {
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
        // marginHorizontal: 5,
        bottom: 10,
        position: 'absolute',
        top: 600

    },//vildan
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
export default connect(mapStateToProps, mapDispatchToProps)(Presensi);