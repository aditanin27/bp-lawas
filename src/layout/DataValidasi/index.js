import {
    Text, View, SafeAreaView, TouchableOpacity,
    TextInput, Modal, StyleSheet, Dimensions, Image,
    FlatList, RefreshControl, ScrollView, ToastAndroid
} from 'react-native'
import React, { Component } from 'react'
import { connect } from 'react-redux';
import ActionButton from 'react-native-action-button';
import SwitchSelector from 'react-native-switch-selector';
import {
    search,
    arrow,
    plus,
    Background,
    addfoto,
    Union,
    x,
    orang3,
    orang2,
    orang1,
    test,
    Warnakuning,
    Warnapink, Warnamerah, Warnahijau, Warnaabu, Warnabiru,
} from '../../assets/images';
import {
    Plus,
    Math,
    IconCari,
    FilterdanText,
    Location,
    Book,
    Document,
    Adduser,
    TKP,
    TP,
    LocationsH,
    TingkatH,
    JenisH,
    Btntambah,
    Tambahkk,
    KKada,
    Dashboard,
    JenisA,
    JenisK
} from '../../assets/icons';


const numColumns = 3;
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
export class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            carikeluarga: '',
            options: '',
            validasi: [],
            filter: [],
            filter1: [],
            databelum: [],
            refreshing: true,
        };
    }
    GetdataAPi() {
        fetch('https://kilauindonesia.org/datakilau/api/getsurvey')
            .then(res => {
                if (res.status === 200) return res.json();
            })
            .then(resdata => {
                console.log(resdata.data);
                this.setState({
                    validasi: resdata.data,
                    filter: resdata.data,
                    refreshing: false,

                });
            });
    }
    GetbelumdataAPi() {
        fetch('https://kilauindonesia.org/datakilau/api/surveykeluarga')
            .then(res => {
                if (res.status === 200) return res.json();
            })
            .then(resdata => {
                console.log(resdata.data);
                this.setState({
                    databelum: resdata.data,
                    filter1: resdata.data,
                    refreshing: false,

                });
            });
    }
    componentDidMount() {
        this.GetdataAPi();
        this.GetbelumdataAPi();
        console.log(this.GetbelumdataAPi());
    }
    onRefresh() {
        this.GetdataAPi();
        this.GetbelumdataAPi();
        this.setState({ refreshing: false });
    }
    filterList(textToSearch) {
        this.setState({
            filter: this.state.validasi
                .filter(item => item.kepala_keluarga.toLowerCase(textToSearch).includes(textToSearch)
                )
        })
    }
    filterListbelum(textToSearch) {
        const Belum = this.state.databelum.filter(item => item.kondisi_penerima_manfaat === null)
        this.setState({
            filter1: Belum
                .filter(item => item.kepala_keluarga.toLowerCase(textToSearch).includes(textToSearch)
                )
        })
    }
    render() {
        const Belum = this.state.databelum.filter(item => item.kondisi_penerima_manfaat === null)
        const options = [
            { label: 'Isi Survey', value: 'Isi Survey' },
            { label: 'Validasi Survey', value: 'Validasi' },
        ];
        return (
            <View style={{ color: '#fff', height: '100%' }}>
                {
                    this.props.user.presensi === 'karyawan' ? //ini nanti dipakai untuk pengelola dan admin //
                        <SafeAreaView style={{ backgroundColor: '#fff' }}>

                            <View style={{ backgroundColor: '#0EBEDF', height: 164 }}>

                                {/* <Text style={style.title1}>Data Pengajar </Text> */}

                                {/* <View  style={{ flexDirection:'row', backgroundColor: '#FFF', height: 38, width: 250, borderRadius: 9, marginTop: 20, marginLeft: 10}}>
                <IconCari/>
                <Text style={{color: }}>Cari</Text>
              </View> */}
                                {this.state.options === 'Validasi' ?
                                    <View
                                        style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20 }}>
                                        <TextInput
                                            style={{
                                                flexDirection: 'row',
                                                backgroundColor: '#FFF',
                                                paddingHorizontal: 40,
                                                height: 38,
                                                width: 250,
                                                borderRadius: 9,
                                                marginLeft: 10,
                                            }}
                                            color={'#000'}
                                            onChangeText={(text) => {
                                                this.filterList(text.toLowerCase()), this.setState({ carikeluarga: text })
                                            }}
                                            value={this.state.text}
                                            placeholder="Cari Kepala Keluarga"
                                            placeholderTextColor="#C0C0C0"
                                            underlineColorAndroid="transparent"
                                        />
                                        <IconCari style={style.IconCari} name="your-icon" size={20} />
                                        <TouchableOpacity
                                            onPress={() => {
                                                this.setState({ fil: true });
                                            }}>
                                            <FilterdanText style={{ marginLeft: 20 }} />
                                        </TouchableOpacity>


                                    </View> : <View />
                                }

                                {this.state.options === 'Isi Survey' || this.state.options === '' ?
                                    <View
                                        style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20 }}>
                                        <TextInput
                                            style={{
                                                flexDirection: 'row',
                                                backgroundColor: '#FFF',
                                                paddingHorizontal: 40,
                                                height: 38,
                                                width: 250,
                                                borderRadius: 9,
                                                marginLeft: 10,
                                            }}
                                            color={'#000'}
                                            onChangeText={(text) => {
                                                this.filterListbelum(text.toLowerCase()), this.setState({ carikeluarga: text })
                                            }}
                                            value={this.state.text}
                                            placeholder="Cari Kepala Keluarga"
                                            placeholderTextColor="#C0C0C0"
                                            underlineColorAndroid="transparent"
                                        />
                                        <IconCari style={style.IconCari} name="your-icon" size={20} />
                                        <TouchableOpacity
                                            onPress={() => {
                                                this.setState({ fil: true });
                                            }}>
                                            <FilterdanText style={{ marginLeft: 20 }} />
                                        </TouchableOpacity>


                                    </View>
                                    : <View />}
                                <View style={{ marginTop: 30, marginHorizontal: 20 }}>
                                    <SwitchSelector
                                        fontSize={12}
                                        fontFamily={'Poppins-Medium'}
                                        options={options}
                                        initial={0}
                                        borderWidth={0}
                                        height={49}
                                        borderRadius={10}
                                        hasPadding
                                        // onPress={(value) => console.log(`Call onPress with value: ${value}`)}
                                        onPress={value => {
                                            this.setState({ options: value }),
                                                ToastAndroid.show(value.toString(), ToastAndroid.SHORT);
                                        }}

                                    />
                                </View>

                            </View>


                            {/* <View style={{flexDirection:'row'}}> */}
                            {this.state.options === 'Isi Survey' | this.state.options === '' ?
                                <FlatList
                                    refreshControl={
                                        <RefreshControl
                                            refreshing={this.state.refreshing}
                                            onRefresh={() => this.onRefresh()}
                                        />
                                    }
                                    data={this.state.carikeluarga === '' ? Belum : this.state.filter1}
                                    renderItem={({ item, index }) =>
                                        <View style={{}}>
                                            <TouchableOpacity
                                                onPress={() => this.props.navigation.navigate('tambahdata', { id_keluarga: item.id_keluarga, item: item })}>
                                                <View style={style.itemflat}>
                                                    <View
                                                        style={{
                                                            height: 50,
                                                            width: '100%',
                                                            justifyContent: 'center',

                                                        }}>
                                                        <View
                                                            style={{
                                                                flexDirection: 'row',
                                                                alignItems: 'center',
                                                                justifyContent: 'center',
                                                            }}>
                                                            <View style={{ flexDirection: 'row', }}>
                                                                <View
                                                                    style={{ flexDirection: 'column', justifyContent: 'center', width: '90%', marginLeft: 30, padding: 5, }}>
                                                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                                                        <Text style={{ width: 150, color: '#000', fontFamily: 'Poppins-Medium', fontSize: 14, marginBottom: 5, marginLeft: 10 }}>
                                                                            {item.kepala_keluarga}
                                                                        </Text>
                                                                        {item.kondisi_penerima_manfaat === null ?
                                                                            <Text style={{
                                                                                backgroundColor: 'red',
                                                                                padding: 3,
                                                                                borderRadius: 3,
                                                                                fontSize: 10,
                                                                                height: 20,
                                                                                color: '#fff',
                                                                                textAlign: 'center'
                                                                            }}>Belum Mengisi Survey</Text>
                                                                            : <View />}

                                                                    </View>
                                                                    <View style={{ flexDirection: 'row' }}>


                                                                        {/* <View style={{ flexDirection: 'row', }}>
                                                                            <TingkatH style={{ marginLeft: 10, }} />
                                                                            <Text style={{ color: '#000', fontSize: 10, fontFamily: 'Poppins-Regular', marginLeft: 5 }}>{item.status_ortu}</Text>
                                                                        </View>

                                                                        <View style={{ flexDirection: 'row' }}>
                                                                            <JenisH style={{ marginLeft: 10 }} />
                                                                            <Text style={{ color: '#000', fontSize: 10, marginLeft: 5, fontFamily: 'Poppins-Regular' }}>{item.pendidikan_kepala_keluarga}</Text>
                                                                        </View>

                                                                        <View style={{ flexDirection: 'row', }}>
                                                                            <LocationsH style={{ marginLeft: 10, }} />
                                                                            <Text style={{ color: '#000', fontSize: 10, fontFamily: 'Poppins-Regular', marginLeft: 5 }}>{item.petugas_survey}</Text>
                                                                        </View> */}

                                                                    </View>

                                                                </View>
                                                            </View>
                                                        </View>
                                                    </View>
                                                </View>
                                            </TouchableOpacity>
                                        </View>

                                    }></FlatList>
                                : <View />}



                            {this.state.options === 'Validasi' ?
                                <FlatList
                                    refreshControl={
                                        <RefreshControl
                                            refreshing={this.state.refreshing}
                                            onRefresh={() => this.onRefresh()}
                                        />
                                    }
                                    data={this.state.filter}
                                    renderItem={({ item, index }) => (
                                        <View style={{}}>
                                            <TouchableOpacity
                                                onPress={() => this.props.navigation.navigate('editdata', { id_anak: item.id_anak, item: item })}>
                                                <View style={style.itemflat}>
                                                    <View
                                                        style={{
                                                            height: 90,
                                                            width: '100%',
                                                            justifyContent: 'center',
                                                        }}>
                                                        <View
                                                            style={{
                                                                flexDirection: 'row',
                                                                alignItems: 'center',
                                                                justifyContent: 'center',
                                                            }}>
                                                            <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                                                                <View
                                                                    style={{ flexDirection: 'column', justifyContent: 'center', width: '90%', marginLeft: 30 }}>
                                                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                                                        <Text style={{ width: 150, color: '#000', fontFamily: 'Poppins-Medium', fontSize: 14, marginBottom: 5, marginLeft: 10 }}>
                                                                            {item.kepala_keluarga}
                                                                        </Text>
                                                                        {item.hasil_survey === null ?
                                                                            <Text style={[style.bannerstatvalid, { backgroundColor: 'orange', width: 100, }]}>Belum di validasi</Text>
                                                                            : item.hasil_survey === 'Tidak Layak' ?
                                                                                <Text style={[style.bannerstatvalid, { backgroundColor: 'red', width: 100, }]}>{item.hasil_survey}</Text>
                                                                                :
                                                                                <Text style={style.bannerstatvalid}>{item.hasil_survey}</Text>
                                                                        }
                                                                    </View>
                                                                    <View style={{ flexDirection: 'row' }}>
                                                                        <View style={{ flexDirection: 'row' }}>
                                                                            <JenisH style={{ marginLeft: 10 }} />
                                                                            <Text style={{ color: '#000', fontSize: 10, marginLeft: 5, fontFamily: 'Poppins-Regular' }}>{item.pendidikan_kepala_keluarga}</Text>
                                                                        </View>

                                                                        <View style={{ flexDirection: 'row', }}>
                                                                            <TingkatH style={{ marginLeft: 10, }} />
                                                                            <Text style={{ color: '#000', fontSize: 10, fontFamily: 'Poppins-Regular', marginLeft: 5 }}>{item.status_anak}</Text>
                                                                        </View>

                                                                        <View style={{ flexDirection: 'row', }}>
                                                                            <LocationsH style={{ marginLeft: 10, }} />
                                                                            <Text style={{ color: '#000', fontSize: 10, fontFamily: 'Poppins-Regular', marginLeft: 5 }}>{item.petugas_survey}</Text>
                                                                        </View>

                                                                    </View>

                                                                </View>
                                                            </View>
                                                        </View>
                                                    </View>
                                                </View>
                                            </TouchableOpacity>
                                        </View>

                                    )}></FlatList>

                                : <View />
                            }

                            {/* <ActionButton buttonColor='#00A9B8' offsetX={'7%'} offsetY={'140%'} bgColor="#000" bgOpacity={0.7}>
                                <ActionButton.Item
                                    buttonColor='#00A9B8'
                                    title="Tambah Anak Binaan"
                                    offsetX={25}
                                    hideShadow={true}
                                    onPress={() => this.setState({ modalpilih: true })}
                                    textStyle={{ fontSize: 14, fontFamily: 'Poppins-Medium' }}
                                    buttonTextStyle={{ backgroundColor: '#000' }}
                                >
                                    <Adduser style={style.actionButtonIcon} />
                                </ActionButton.Item>
                                <ActionButton.Item
                                    buttonColor='#00A9B8'
                                    title="Tambah Kelompok Anak"
                                    offsetX={25}
                                    hideShadow={true}
                                    textStyle={{ fontSize: 14, fontFamily: 'Poppins-Medium' }}
                                    onPress={() => this.props.navigation.navigate('TambahKelompokAnak')}
                                >
                                    <Adduser style={style.actionButtonIcon} />
                                </ActionButton.Item>

                                <ActionButton.Item
                                    buttonColor='#00A9B8'
                                    title="Ajukan Pencarian Dana"
                                    hideShadow={true}
                                    offsetX={25}
                                    textStyle={{ fontSize: 14, fontFamily: 'Poppins-Medium' }}
                                    onPress={() => this.props.navigation.navigate('ListPengajuan')}
                                >
                                    <Document style={style.actionButtonIcon} />
                                </ActionButton.Item>
                            </ActionButton> */}




                        </SafeAreaView >

                        :
                        <View />
                }
            </View >
        )
    }
}
const style = StyleSheet.create({
    contentContainer: {
        flex: 1,
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
        backgroundColor: '#fff'
    },
    itemflat: {
        flex: 1,
        fontSize: 12,
        flexDirection: 'row',
        marginLeft: 15,
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
    list: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        numberOfLines: 2,
        flexDirection: 'column',
        padding: 10,
        marginVertical: 8,
        marginHorizontal: 8,
        backgroundColor: '#fff',
        shadowColor: '#333',
        shadowOffset: {
            width: 1,
            height: 1,
        },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        elevation: 3,
        borderColor: '#7e7e7e',
        height: width / numColumns,
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
        right: -250,
        top: 700,
        left: 0,
        flexDirection: 'row',
        borderRadius: 5,
        position: 'absolute',
        // marginHorizontal: 5,
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
    },
    labelbaru5: {
        fontFamily: 'Poppins-Medium',
        fontSize: 12,
        marginLeft: 10,
        color: '#C0C0C0',
    }, //vildan
    img2: {
        width: '100%',
        height: 170,
        marginTop: 10,
        borderRadius: 10,
    }, //vildan
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
        height: 160,
        justifyContent: 'center',
        alignContent: 'center',
        alignSelf: 'center',
        textAlign: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginTop: 10,
        marginHorizontal: 10,
    },
    bannerstatvalid: {
        backgroundColor: '#006400',
        padding: 3,
        borderRadius: 3,
        fontSize: 10,
        height: 20,
        width: 40,
        color: '#fff',
        textAlign: 'center'
    },
    bannerstat: {
        backgroundColor: '#8B0000',
        padding: 3,
        borderRadius: 3,
        fontSize: 10,
        height: 20,
        width: 40,
        color: '#fff',
        textAlign: 'center'
    }
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
export default connect(mapStateToProps, mapDispatchToProps)(index);