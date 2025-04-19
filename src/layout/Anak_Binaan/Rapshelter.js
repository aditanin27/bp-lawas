import React, { Component } from 'react'
import {
    Text, View, StyleSheet, TouchableOpacity,
    FlatList, RefreshControl, Dimensions, ScrollView, Modal, Image, SafeAreaView
} from 'react-native'
import { connect } from 'react-redux';
import { Tamnak } from '../../assets/icons'
import { juara } from '../../assets/images'
import AsyncStorage from '@react-native-async-storage/async-storage';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

class Rapshelter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            detail: this.props.route.params.id_anak,
            item: this.props.route.params.item,
            kelas: [],
            materi: [],
            datarapot: [],
            perrapot: [],
            lihatdetail: false,
            detak: [],
            id_anak: [],
            tot: [],
            detak: [],
            list: [],
        };
    }

    GetRapotshelterAPi() {
        const id_anak = this.props.route.params.id_anak
        AsyncStorage.getItem('token').then((token) => {
            fetch('https://kilauindonesia.org/datakilau/api/getrapotshelter/' + id_anak, {
                headers: {
                    Authorization: 'Bearer ' + token,
                    // 'Accept': 'application/json',
                    // 'Content-Type': 'application/json'
                },
            }).then((res) => res.json())
                .then((resJson) => {
                    // console.log('oke');
                    const length = resJson.data.length;
                    this.setState({
                        datarapot: resJson.data,
                    });
                })
                .catch((err) => console.log('error catch home', err));
        });
    }


    GetDetAPi() {
        AsyncStorage.getItem('token').then((token) => {
            fetch('https://kilauindonesia.org/datakilau/api/getlevelbinaan/' + this.props.route.params.item.id_kelompok, {
                headers: {
                    Authorization: 'Bearer ' + token,
                    // 'Accept': 'application/json',
                    // 'Content-Type': 'application/json'
                },
            }).then((res) => res.json())
                .then((resJson) => {
                    // console.log('oke');
                    const length = resJson.data.length;
                    this.setState({
                        kelas: resJson.data,
                    });
                })
                .catch((err) => console.log('error catch home', err));
        });
    }


    test() {
        AsyncStorage.getItem('token').then((token) => {
            fetch('https://kilauindonesia.org/datakilau/api/materi', {
                headers: {
                    Authorization: 'Bearer ' + token,
                    // 'Accept': 'application/json',
                    // 'Content-Type': 'application/json'
                },
            }).then((res) => res.json())
                .then((resJson) => {
                    // console.log('oke');
                    const length = resJson.data.length;
                    this.setState({
                        materi: resJson.data,
                    });
                })
                .catch((err) => console.log('error catch home', err));
        });
    }
    componentDidMount() {
        this.GetRapotshelterAPi();
        this.GetDetAPi();
        this.onRefresh()
        this.test();
        // console.log(this.state.kelas);
    }
    onRefresh() {
        this.GetRapotshelterAPi();
        this.setState({ refreshing: false });
    }
    render() {
        const filmateri = this.state.materi.filter((item, index) => {
            return (
                this.state.materi.findIndex(
                    i => i.mata_pelajaran === item.mata_pelajaran,
                ) === index
            );
        });
        // const { detak } = this.state;
        const dr = this.state.datarapot;
        const kelas = this.state.kelas;
        const nilai = [];
        const tot = this.state.tot;
        const detak = this.state.detak;
        const list = this.state.list;
        console.log(this.state.kelas)

        return (
            <View contentContainer style={style.contentContainer} showsVerticalScrollIndicator={true}>
                <View style={{ backgroundColor: '#0EBEDF' }}>
                    <Text style={style.title2}>Rapot Shelter</Text>
                </View>

                <FlatList
                    data={this.state.datarapot}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={() => this.onRefresh()}
                        />
                    }
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() =>
                            this.setState({ lihatdetail: true, tot: item, detak: item, list: item, nama: this.props.route.params.item })

                        }
                        >
                            {item.id_id_rapshelter === null || item.absen === null ?
                                <View>
                                    <View style={{ flexDirection: 'column', }}>
                                        <View style={style.iconbesar}>
                                            <Tamnak />
                                        </View>
                                        <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'center', }}>Anak Asuh Belum</Text>
                                        <Text style={{ fontSize: 12, textAlign: 'center', }}>Belum Ada Rapot dari Shelter</Text>
                                    </View>


                                </View> :
                                <View style={style.kotakabu}>
                                    {/* <Image source={juara} style={style.img}></Image> */}
                                    <View style={{ flexDirection: 'row' }}>
                                        <View>
                                            <View style={{ flexDirection: 'row', }}>
                                                <View style={{ flexDirection: 'column', marginTop: 5 }}>
                                                    <View style={{ flexDirection: 'row' }}>
                                                        <Text style={style.labelkiri}>Kelas:</Text>
                                                        <Text style={style.labelkanan}>{item.kelas}</Text>
                                                    </View>
                                                    <View style={{ flexDirection: 'row' }}>
                                                        <Text style={style.labelkiri}>Semester:</Text>
                                                        <Text style={style.labelkanan}>{item.semester}</Text>
                                                    </View>
                                                </View>
                                            </View>
                                            <View style={{ flexDirection: 'row', }}>
                                                <Text style={[{
                                                    textAlign: 'right', width: '100%', fontSize: 12,
                                                    fontWeight: 'bold', marginRight: -10, marginBottom: 10
                                                }]}>{item.tanggal}</Text>

                                            </View>
                                        </View>

                                    </View>
                                </View>
                            }
                        </TouchableOpacity>
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
                                <Text style={{ fontSize: 12, textAlign: 'center', }}>Belum Ada Rapot dari Shelter</Text>
                            </View>
                        </View>
                    }>
                </FlatList>
                <Modal animationType={"fade"} transparent={true}
                    visible={this.state.lihatdetail}
                    onRequestClose={() => this.setState({ lihatdetail: false })}>
                    <SafeAreaView style={style.containerSafe}>
                        <TouchableOpacity activeOpacity={1.0} style={style.ModalCont}>
                            <View style={{
                                paddingTop: 5,
                                marginVertical: 10,
                                marginHorizontal: 10,
                                backgroundColor: '#fff',
                                // flexDirection: 'row',
                                borderRadius: 20,
                                height: '30%',
                                shadowColor: "#333",
                                shadowOffset: {
                                    width: 1,
                                    height: 1,
                                },
                                shadowOpacity: 0.3,
                                shadowRadius: 2,
                                elevation: 3,
                                alignItems: 'center'
                            }}>
                              
                                <Text style={style.txtPresensi}>Pilih</Text>
                                <View style={{ height: 1, width: '100%', borderWidth: 1, borderColor: '#bdbdbd', width: '90%', marginLeft: 10 }}></View>
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                    }}>
                                    <View
                                        style={[style.kotakkecil, { backgroundColor: '#18C3F7' }]}>
                                        <TouchableOpacity
                                            onPress={() =>
                                                this.props.navigation.navigate('Editrapotshelter',
                                                    { tot: tot, detak: detak, list: this.state.list, nama: this.props.route.params.item, kelas: kelas })
                                            }>
                                            <Text
                                                style={{
                                                    color: '#fff',
                                                    textAlign: 'center',
                                                    padding: 5,
                                                }}>
                                                Edit Data
                                            </Text>
                                        </TouchableOpacity>
                                    </View>

                                    <View
                                        style={[
                                            style.kotakkecil,
                                            { backgroundColor: '#00DD73' },
                                        ]}>
                                        <TouchableOpacity
                                            onPress={() =>
                                                this.props.navigation.navigate('DetailRShel',
                                                    { tot: tot, detak: detak, list: list, nama: this.props.route.params.item, })
                                            }>
                                            {/* <KKada style={{ justifyContent: 'center', alignSelf: 'center' }} /> */}
                                            <Text
                                                style={{
                                                    color: '#fff',
                                                    textAlign: 'center',
                                                    padding: 5,
                                                }}>
                                                Lihat Detail
                                            </Text>
                                        </TouchableOpacity>
                                    </View>


                                </View>
                                <View
                                    style={[style.kotakkecil, { backgroundColor: '#DC143C', marginTop: 20 }]}>
                                    <TouchableOpacity
                                        onPress={() => this.setState({ lihatdetail: false })
                                        }>
                                        <Text
                                            style={{
                                                color: '#fff',
                                                textAlign: 'center',
                                                padding: 5,
                                            }}>
                                            Kembali
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                        </TouchableOpacity>
                    </SafeAreaView>
                </Modal>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('TamRapotShelter', { detail: this.state.detail, item: kelas })} style={style.refresh} >
                    <View style={{
                        backgroundColor: '#0EBEDF', width: 170, height: 40, justifyContent: 'center', alignContent: 'center', alignItems: 'center', alignSelf: 'center', borderRadius: 10
                    }}>
                        <Text style={{ color: '#fff', textAlign: 'center', justifyContent: 'center', alignContent: 'center' }}>+ Tambah Rapot Shelter</Text>
                    </View>
                </TouchableOpacity>

            </View >

        )
    }
}


const style = StyleSheet.create({
    contentContainer: {
        backgroundColor: '#fff',
        width: '100%',
        height: '100%',
        flex: 1
    },
    iconbesar: {
        marginTop: 50,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
    },
    containerfoto: {
        marginTop: 40,
        multiline: true,
        marginLeft: 100,
        width: 200,
        height: 200,
        flex: 1,
        margin: 20,
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        shadowColor: '#333',
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
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnSimpanUn: {
        width: '40%',
        fontWeight: 'bold',
        backgroundColor: '#C6C6C6',
        borderRadius: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: '#E9E9E9',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
    },
    btnSimpanUn1: {
        width: '40%',
        fontWeight: 'bold',
        backgroundColor: '#C6C6C6',
        borderRadius: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: '#E9E9E9',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        textAlign: 'center',
    },

    btnSimpan: {
        backgroundColor: '#00A9B8',
        padding: '4%',
        borderRadius: 10,
        marginTop: '6%',
        width: '70%',
        justifyContent: 'center',
        alignItems: 'center',
    },

    btnSimpan2: {
        borderWidth: 1,
        borderColor: '#00A9B8',
        padding: '4%',
        borderRadius: 10,
        marginTop: '6%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    tambah: {
        position: 'absolute',
        width: 50,
        height: 50,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
    },
    logo4: {
        width: 75,
        height: 75,
        marginLeft: 10,
    },
    coltom: {
        width: '90%',
        marginLeft: 20,
        justifyContent: 'space-between',
        alignItems: 'center',
        alignContent: 'center',
        fontSize: 16,
        flexDirection: 'row',
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: '#fff',
        marginVertical: 8,
        marginHorizontal: 16,
        shadowColor: '#333',
        shadowOffset: {
            width: 1,
            height: 1,
        },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        borderColor: '#7e7e7e',
        elevation: 3,
    },
    coltom1: {
        width: '100%',
        marginTop: 20,
        fontSize: 16,
        flexDirection: 'row',
        padding: 10,
        backgroundColor: '#fff',
        marginVertical: 8,
        marginHorizontal: 16,
        shadowColor: '#333',
        shadowOffset: {
            width: 1,
            height: 1,
        },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        borderColor: '#7e7e7e',
        elevation: 3,
    },
    coltom2: {
        width: '90%',
        fontSize: 16,
        flexDirection: 'row',
        padding: 10,
        backgroundColor: '#fff',
        marginVertical: 8,
        marginHorizontal: 16,
        shadowColor: '#333',
        shadowOffset: {
            width: 1,
            height: 1,
        },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        borderColor: '#7e7e7e',
        elevation: 3,
    },
    item2: {
        padding: 10,
        height: 120,
        width: '30%',
        position: 'absolute',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
    },
    item1: {
        flex: 1,
        marginTop: 10,
        textAlign: 'center',
        fontSize: 16,
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 10,
        borderWidth: 0.1,
        marginVertical: 1,
        marginHorizontal: 50,
    },
    picker: {
        color: 'F',
        marginTop: 10,
        backgroundColor: '#ffffff',
        flexDirection: 'row',
        borderRadius: 5,
        // marginHorizontal: 5,
        height: 30,
        width: '100%',
        shadowColor: '#333',
        shadowOffset: {
            width: 1,
            height: 1,
        },
        shadowOpacity: 0.3,
        shadowRadius: 2,

        elevation: 3,
        alignItems: 'center',
        justifyContent: 'center',
    },
    imgSmall: {
        position: 'absolute',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
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
    kotak2: {
        color: '#000000',
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10,
        borderRadius: 2,
        borderWidth: 0.1,
        fontSize: 12,
        height: 52,
        backgroundColor: '#7e7e7',
    },
    Label: {
        padding: 5,
        color: '#000000',
        marginLeft: 10,
        marginTop: 20,
    },
    detailgmbr: {
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 18,
        marginTop: 20,
        fontWeight: 'bold',
        color: '#7e7e7e',
    },
    detail: {
        // borderRadius: 2,
        // borderWidth: 0.1,
        width: '90%',
        padding: 10,
        marginLeft: 25,
        justifyContent: 'center',
        alignContent: 'center',
        shadowColor: '#333',
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
        marginTop: 20,
        marginLeft: 20,
        textAlign: 'center',
        color: '#000',
    },
    Label2: {
        marginTop: 5,
        marginLeft: 20,
        padding: 5,
        color: '#000',
        alignItems: 'center',
        justifyContent: 'center',
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
        shadowColor: '#333',
        shadowOffset: {
            width: 1,
            height: 1,
        },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        borderColor: '#7e7e7e',
        elevation: 3,
    },
    Textinputcss2: {
        color: '#7e7e7e',
        borderRadius: 10,
        borderWidth: 1,
        fontSize: 12,
        height: 52,
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
    itemText: {
        textAlign: 'center',
        color: 'black',
        fontSize: 16,
        width: '100%',
        height: 50,
    },
    item: {
        flex: 1,
        fontSize: 16,
        flexDirection: 'row',
        padding: 10,
        backgroundColor: '#fff',
        marginVertical: 8,
        marginHorizontal: 16,
        shadowColor: '#333',
        shadowOffset: {
            width: 1,
            height: 1,
        },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        borderColor: '#7e7e7e',
        elevation: 3,
    },
    types: {
        marginRight: 5,
        borderWidth: 1,
        borderColor: '#bbb',
        paddingHorizontal: 15,
        paddingVertical: 7,
        borderRadius: 6,
        backgroundColor: '#fff',
    },
    itemflat: {
        flex: 1,
        fontSize: 12,
        flexDirection: 'row',
        marginLeft: 10,
        paddingRight: 30,
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
    },
    ModalLaporan: {
        flex: 1,
        justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: '#00000099',
        paddingHorizontal: '10%',
    },
    ModalCont2: {
        flex: 1,
        // alignItems: 'center',
        backgroundColor: '#00000079',
    },
    checkbox: {
        flexDirection: 'row',
        alignContent: 'space-between',
        alignItems: 'center',
        margin: 20,
    },

    ImageStyle: {
        padding: 10,
        margin: 5,
        height: 20,
        width: 20,
        resizeMode: 'stretch',
        alignItems: 'center',
    },
    kotak4: {
        color: '#000000',
        marginTop: 2,
        marginLeft: 18,
        marginRight: 10,
        borderRadius: 2,
        borderWidth: 0.1,
        fontSize: 12,
        height: 40,
        width: '40%',
        backgroundColor: '#F0F8FF',
    },
    kotak5: {
        color: '#000000',
        marginTop: 2,
        marginLeft: 18,
        marginRight: 10,
        borderRadius: 2,
        borderBottomWidth: 1,
        borderBottomColor: '#000',
        fontSize: 12,
        height: 40,
        width: '40%',
        backgroundColor: '#FFF',
    },
    refresh: {
        padding: 10,
        bottom: 0,
        marginBottom: 10,
        flexDirection: 'row',
        borderRadius: 5,
        position: 'absolute',
        // marginHorizontal: 5,
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'center',
        alignSelf: 'center',
        marginTop: 20,

    },
    labelbaru5: {
        fontFamily: 'Poppins-Medium',
        fontSize: 12,
        marginLeft: 10,
        color: '#C0C0C0',
    }, //vildan
    img: {
        width: '95%',
        height: 150,
        marginLeft: 10,
        marginTop: 10,
        borderRadius: 10,
    },
    IconCari: {
        position: 'absolute',
        top: 8,
        left: 20,
    },
    kotakkecil: {
        flexDirection: 'column',
        borderColor: '#bdbdbd',
        borderWidth: 1,
        width: '40%',
        height: 70,
        justifyContent: 'center',
        alignContent: 'center',
        alignSelf: 'center',
        textAlign: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginTop: 10,
        marginHorizontal: 10,
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
    kotakabu: {
        shadowColor: '#333',
        shadowOffset: {
            width: 1,
            height: 1,
        },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        elevation: 3,
        width: '95%',
        borderRadius: 15,
        borderWidth: 1,
        marginLeft: 10,
        marginTop: 10,
        borderColor: '#E9E9E9',
        backgroundColor: '#fff',
    },
    labelkiri: {
        fontSize: 12,
        fontWeight: 'bold',
        marginVertical: 5,
        marginLeft: 20,
        width: 100,
    },
    labelkanan: {
        fontSize: 12,
        marginVertical: 5,
        width: 200,
    },
    ModalCont: {
        flex: 1,
        justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: '#00000099',
        paddingHorizontal: 10,
    },
    containerSafe: {
        flex: 1,
        flexDirection: 'column',
    },
    infoContainer: {
        width: '80%',
        marginBottom: 10,
        marginHorizontal: 20,
        borderRadius: 10,
        borderWidth: 1,
        height: 70,
        borderColor: '#DDDDDD',
        backgroundColor: '#fff',
    },
});
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
export default connect(mapStateToProps, mapDispatchToProps)(Rapshelter);