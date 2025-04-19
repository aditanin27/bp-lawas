import {
    Text, View, TouchableOpacity, TextInput, StyleSheet,
    TouchableNativeFeedback, FlatList, RefreshControl, ScrollView,
    Modal, SafeAreaView, Dimensions, ToastAndroid, Alert
} from 'react-native'
import React, { Component } from 'react'
import { IconCari, FilterdanText, LocationsH, JenisH, Sekolah, SekolahH, Close } from '../../assets/icons'
import SwitchSelector from 'react-native-switch-selector';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
export class Datashelter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            refreshing: true,
            fil: false,
            edit: false,
            cari: '',
            shelter: [],
            filter: [],
            filter1: [],
            deshel: [],
            statshel: [],
            nonstat: [],
            status: '',
        };
    }
    componentDidMount() {
        this.getShelterAPi();


        console.log();
    }
    onRefresh() {
        this.getShelterAPi();
        this.setState({ refreshing: false });
    }
    getShelterAPi() {
        fetch('https://kilauindonesia.org/datakilau/api/shelterfil')
            .then(res => {
                if (res.status === 200) return res.json();
            })
            .then(resdata => {
                console.log(resdata.data);
                this.setState({
                    shelter: resdata.data,
                    filter: resdata.data,
                    filter1: resdata.data,
                    refreshing: false,
                });
            });
    }

    Hapusshelter() {
        {
            fetch('https://kilauindonesia.org/datakilau/api/penshelterhps/' + this.state.deshel.id_shelter, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'multipart/form-data'
                },
            })
                .then((res) => res.json())
                .then((resJson) => {
                    console.log(resJson);
                    if (resJson.status === 'sukses') {

                        ToastAndroid.show("Data berhasil dihapus!", ToastAndroid.SHORT)
                    } else {
                        alert(`Data gagal disimpan !!!`);
                    }
                })
                .catch((err) => console.log('dari catch send Data ===', err));
        };
    }



    filterListnon(textToSearch) {
        const sheltertidak = this.state.shelter.filter(item => item.status_shelter === 1)
        // const filtdupe =
        //     sheltertidak.filter((item, index) => {
        //         return this.state.shelter.findIndex(i => i.id_shelter === item.id_shelter) === index;
        //     })
        this.setState({
            filter1: sheltertidak
                .filter(item => item.nama_shelter.toLowerCase(textToSearch).includes(textToSearch)
                )
        })
    }
    filterList(textToSearch) {
        const filtdupe =
            this.state.shelter.filter((item, index) => {
                return this.state.shelter.findIndex(i => i.id_shelter === item.id_shelter) === index;
            })
        this.setState({
            filter: filtdupe
                .filter(item => item.nama_shelter.toLowerCase(textToSearch).includes(textToSearch)
                )
        })
    }
    render() {
        var status = [
            { label: 'Data Aktif', value: 'Aktif' },
            { label: 'Data Non-Aktif', value: 'Non-Aktif' },
        ];
        const deshel = this.state.deshel
        const jmkel = this.state.shelter.nama_kelompok
        const statshel = this.state.shelter.filter(item => item.status_shelter === 0)
        const sheltertidak = this.state.shelter.filter(item => item.status_shelter === 1)
        const nonstat = this.state.shelter.filter(item => item.id_wilbin === '49')
        const filtdupe =
            this.state.shelter.filter((item, index) => {
                return this.state.shelter.findIndex(i => i.id_shelter === item.id_shelter) === index;
            })
        console.log(statshel)
        // const filter_validasi = this.state.Anak.filter(item => item.status_validasi === 'non-aktif')
        return (
            <View style={{ flex: 1, backgroundColor: '#FFF' }}>
                <View style={{ backgroundColor: '#0EBEDF', height: 150 }}>


                    {this.state.status === '' || this.state.status === 'Aktif' ?
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
                                    this.filterList(text.toLowerCase()), this.setState({ cari: text })
                                }}
                                value={this.state.cari}
                                placeholder="Cari Data"
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
                        : <View />
                    }

                    {this.state.status === 'Non-Aktif' ?
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
                                    this.filterListnon(text.toLowerCase()), this.setState({ cari: text })
                                }}
                                value={this.state.cari}
                                placeholder="Cari Data"
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
                        : <View />
                    }
                    <View style={{ marginTop: 30, marginHorizontal: 20 }}>
                        <SwitchSelector
                            fontSize={12}
                            fontFamily={'Poppins-Medium'}
                            options={status}
                            initial={0}
                            borderWidth={0}
                            height={49}
                            borderRadius={10}
                            hasPadding
                            // onPress={(value) => console.log(`Call onPress with value: ${value}`)}
                            onPress={value => {
                                this.setState({ status: value }),
                                    ToastAndroid.show(value.toString(), ToastAndroid.SHORT);
                            }}

                        />
                    </View>
                </View>

                {this.state.status === '' || this.state.status === 'Aktif' ?
                    <View style={{ height: '80%' }}>
                        <FlatList
                            refreshControl={
                                <RefreshControl
                                    refreshing={this.state.refreshing}
                                    onRefresh={() => this.onRefresh()}
                                />
                            }
                            style={{ marginBottom: 50 }}
                            data={this.state.cari === '' ? statshel : this.state.filter}
                            renderItem={({ item, index }) => (
                                <View>
                                    <View style={{}}>
                                        <TouchableOpacity
                                            onPress={() => this.props.navigation.navigate('Editdatashelter', { deshel: item })}>
                                            <View style={style.itemflat}>

                                                <View
                                                    style={{
                                                        height: 90,
                                                        width: '100%',
                                                        justifyContent: 'center',
                                                    }}>
                                                    <View >
                                                        <View style={{
                                                            flexDirection: 'row', justifyContent: 'space-between'
                                                            // justifyContent: 'center',
                                                            // backgroundColor: item.status_ortu === 'non-dhuafa' ? '#0076B8' : '#000' &&
                                                            //   item.status_ortu === 'dhuafa' ? '#00B855' : '#000' && item.status_ortu === 'yatim_piatu' ? '#E32845' : '#000' && item.status_ortu === 'yatim' ? '#FFBB0C' : '#000'
                                                        }}>
                                                            <Text style={{ fontSize: 12, fontFamily: 'Poppins-Medium', marginLeft: 20, marginTop: -20, fontWeight: 'bold' }}></Text>

                                                        </View>
                                                    </View>
                                                    <View
                                                        style={{
                                                            marginLeft: '10%'
                                                        }}>
                                                        <View style={{ flexDirection: 'row' }}>

                                                            <View
                                                                style={{ flexDirection: 'column', marginLeft: '-10%', justifyContent: 'center', width: '90%' }}>
                                                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                                                    <View style={{ flexDirection: 'row', width: '65%' }}>
                                                                        <SekolahH style={{ marginLeft: 10, }} />
                                                                        <Text style={{ color: '#000', fontFamily: 'Poppins-Medium', fontSize: 14, marginLeft: 10, }}>
                                                                            {item.nama_shelter}
                                                                        </Text>
                                                                    </View>
                                                                    <View>
                                                                        {item.status_shelter === '1' ?
                                                                            <View>
                                                                                <Text style={[style.bannerstatvalid, { marginLeft: '35%' }]}>Tidak Aktif</Text>
                                                                            </View>
                                                                            :
                                                                            <View>
                                                                                <Text style={[style.bannerstatvalid, { marginLeft: '35%' }]}>Aktif</Text>
                                                                            </View>
                                                                        }
                                                                    </View>
                                                                </View>

                                                                <View style={{ flexDirection: 'row', marginTop: 7, width: '100%', }}>
                                                                    <View style={{ flexDirection: 'row', width: '60%', }}>
                                                                        <Text style={{ color: '#000', fontSize: 10, marginLeft: 5, fontFamily: 'Poppins-Regular' }}>{item.alamat}</Text>
                                                                    </View>


                                                                    <View style={{ flexDirection: 'row', marginLeft: '20%' }}>
                                                                        <LocationsH style={{ marginLeft: 10, }} />
                                                                        <Text style={{ color: '#000', fontSize: 10, fontFamily: 'Poppins-Regular', marginLeft: 5 }}>{item.nama_wilbin}</Text>
                                                                    </View>

                                                                </View>

                                                            </View>

                                                        </View>
                                                    </View>
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            )
                            }></FlatList >
                        <View style={{ position: 'absolute', justifyContent: 'center', alignContent: 'center', alignItems: 'center', alignSelf: 'center', bottom: 10, }}>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('Tambahshelter')} style={style.refresh} >
                                <View style={{
                                    top: 20,
                                    backgroundColor: '#0EBEDF', width: 170, height: 40, justifyContent: 'center', alignContent: 'center', alignItems: 'center', alignSelf: 'center', borderRadius: 10
                                }}>
                                    <Text style={{ color: '#fff', textAlign: 'center', justifyContent: 'center', alignContent: 'center' }}>Tambah Data Shelter </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                    : <View />}

                {this.state.status === 'Non-Aktif' ?
                    <View style={{ height: '80%' }}>
                        <FlatList
                            refreshControl={
                                <RefreshControl
                                    refreshing={this.state.refreshing}
                                    onRefresh={() => this.onRefresh()}
                                />
                            }
                            style={{ marginBottom: 50 }}
                            data={this.state.cari === '' ? sheltertidak : this.state.filter1}
                            renderItem={({ item, index }) => (
                                <View>
                                    <View style={{}}>
                                        <TouchableOpacity
                                            onPress={() => this.setState({ edit: true, deshel: item })}>
                                            <View style={style.itemflat}>

                                                <View
                                                    style={{
                                                        height: 90,
                                                        width: '100%',
                                                        justifyContent: 'center',
                                                    }}>
                                                    <View >
                                                        <View style={{
                                                            flexDirection: 'row', justifyContent: 'space-between'
                                                            // justifyContent: 'center',
                                                            // backgroundColor: item.status_ortu === 'non-dhuafa' ? '#0076B8' : '#000' &&
                                                            //   item.status_ortu === 'dhuafa' ? '#00B855' : '#000' && item.status_ortu === 'yatim_piatu' ? '#E32845' : '#000' && item.status_ortu === 'yatim' ? '#FFBB0C' : '#000'
                                                        }}>
                                                            <Text style={{ fontSize: 12, fontFamily: 'Poppins-Medium', marginLeft: 20, marginTop: -20, fontWeight: 'bold' }}></Text>

                                                        </View>
                                                    </View>
                                                    <View
                                                        style={{
                                                            marginLeft: '10%'
                                                        }}>
                                                        <View style={{ flexDirection: 'row' }}>

                                                            <View
                                                                style={{ flexDirection: 'column', marginLeft: '-10%', justifyContent: 'center', width: '90%' }}>
                                                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                                                    <View style={{ flexDirection: 'row', width: '65%' }}>
                                                                        <SekolahH style={{ marginLeft: 10, }} />
                                                                        <Text style={{ color: '#000', fontFamily: 'Poppins-Medium', fontSize: 14, marginLeft: 10, }}>
                                                                            {item.nama_shelter}
                                                                        </Text>
                                                                    </View>

                                                                    <View>
                                                                        {item.status_shelter === '0' ?
                                                                            <View>
                                                                                <Text style={[style.bannerstatvalid, { marginLeft: '35%' }]}>Aktif</Text>
                                                                            </View>
                                                                            :
                                                                            <View>
                                                                                <Text style={[style.bannerstat, { marginLeft: '35%' }]}>Tidak Aktif</Text>
                                                                            </View>
                                                                        }
                                                                    </View>
                                                                </View>

                                                                <View style={{ flexDirection: 'row', marginTop: 7, width: '100%', }}>
                                                                    <View style={{ flexDirection: 'row', width: '60%', }}>
                                                                        <Text style={{ color: '#000', fontSize: 10, marginLeft: 5, fontFamily: 'Poppins-Regular' }}>{item.alamat}</Text>
                                                                    </View>


                                                                    <View style={{ flexDirection: 'row', marginLeft: '20%' }}>
                                                                        <LocationsH style={{ marginLeft: 10, }} />
                                                                        <Text style={{ color: '#000', fontSize: 10, fontFamily: 'Poppins-Regular', marginLeft: 5 }}>{item.nama_wilbin}</Text>
                                                                    </View>

                                                                </View>

                                                            </View>

                                                        </View>
                                                    </View>
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            )
                            }></FlatList >
                        <View style={{ position: 'absolute', justifyContent: 'center', alignContent: 'center', alignItems: 'center', alignSelf: 'center', bottom: 10, }}>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('Tambahshelter')} style={style.refresh} >
                                <View style={{
                                    top: 20,
                                    backgroundColor: '#0EBEDF', width: 170, height: 40, justifyContent: 'center', alignContent: 'center', alignItems: 'center', alignSelf: 'center', borderRadius: 10
                                }}>
                                    <Text style={{ color: '#fff', textAlign: 'center', justifyContent: 'center', alignContent: 'center' }}>Tambah Data Shelter </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                    : <View />}

                <Modal animationType={"fade"} transparent={true}
                    visible={this.state.edit}
                    onRequestClose={() => this.setState({ edit: false })}>

                    <SafeAreaView style={style.containerSafe}>
                        <TouchableOpacity activeOpacity={1.0} onPress={() => this.setState({ edit: false })} style={style.ModalCont}>
                            <View style={{
                                paddingTop: 5,
                                marginHorizontal: 10,
                                backgroundColor: '#fff',
                                // flexDirection: 'row',
                                borderRadius: 20,
                                height: '25%',
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
                                <TouchableOpacity onPress={() => this.setState({ edit: false })} style={{ position: 'absolute', right: 20, top: 5 }}>
                                    <Close />
                                </TouchableOpacity>
                                <Text style={style.txtPresensi}>{deshel.nama_shelter}</Text>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                                    <View style={[style.kotakkecil, { backgroundColor: '#00A9B8' }]}>
                                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Editdatashelter', { deshel: this.state.deshel })}>
                                            {/* <KKada style={{ justifyContent: 'center', alignSelf: 'center' }} /> */}
                                            <Text style={{ color: '#fff', textAlign: 'center', padding: 5, fontWeight: 'bold' }}>Edit Data</Text>
                                        </TouchableOpacity>
                                    </View>




                                    <View style={[style.kotakkecil, { backgroundColor: '#DC143C', }]}>
                                        <TouchableOpacity onPress={() => this.setState({ edit: false }, this.Hapusshelter())

                                        }>
                                            <Text style={{ color: '#fff', textAlign: 'center', padding: 5, fontWeight: 'bold' }}>Hapus</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>

                                <View style={{ marginTop: '5%', alignItems: 'center', flexDirection: 'row', alignContent: 'center', }}>
                                    <TouchableOpacity onPress={() => this.setState({ edit: false })}>
                                        <View style={{ height: 50, borderColor: '#00A9B8', borderWidth: 1, width: 100, justifyContent: 'center', alignItems: 'center', alignSelf: 'center', borderRadius: 5 }}>
                                            <Text style={{ color: '#00A9B8', fontFamily: 'Poppins-Medium', fontSize: 14 }}>Batal</Text>
                                        </View>
                                    </TouchableOpacity>

                                </View>

                            </View>
                        </TouchableOpacity>
                    </SafeAreaView>
                </Modal>

            </View >
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
    },
    IconCari: {
        position: 'absolute',
        top: 8,
        left: 20,
    },
    refresh: {
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
        bottom: 0,
    },
    ModalCont: {
        flex: 1,
        justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: '#00000099',
        paddingHorizontal: 10,
    },
    labelkanan: {
        fontSize: 12,
        marginHorizontal: 5,
        width: 150,
    },
    labelkiri: {
        fontSize: 12,
        fontWeight: 'bold',
        marginVertical: 5,
        marginLeft: 20,
        width: 100,
    },
    form: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        width: '100%'
    },
    kotak3: {
        marginTop: 10,
        color: '#000',
        borderRadius: 10,
        borderWidth: 0.1,
        fontSize: 13,
        height: 40,
        width: windowWidth * 0.5,
        padding: 12,
        backgroundColor: '#fff',
        borderColor: '#DDDDDD',
        borderWidth: 1,
        fontFamily: 'Poppins-Regular',
    },
    containerSafe: {
        flex: 1,
        flexDirection: 'column',
    },
    kotakkecil: {
        flexDirection: 'column',
        borderColor: '#bdbdbd',
        borderWidth: 1,
        width: '40%',
        height: '60%',
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
        width: 80,
        color: '#fff',
        textAlign: 'center'
    },
    bannerstat: {
        backgroundColor: '#8B0000',
        padding: 3,
        borderRadius: 3,
        fontSize: 10,
        height: 20,
        width: 80,
        color: '#fff',
        textAlign: 'center'
    }
});
export default Datashelter