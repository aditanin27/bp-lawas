import {
    Text, View, SafeAreaView, TextInput, TouchableOpacity,
    StyleSheet, FlatList, RefreshControl, Modal, Image, ToastAndroid, ScrollView, Alert
} from 'react-native'
import React, { Component } from 'react'
import {
    IconCari,
    FilterdanText,
    LocationsH,
    TingkatH,
    JenisH,
    Filter,
    Close,
    OrangHitam,
    IconTamKelompok,
} from '../../assets/icons';
import {
    back,
    test,
} from '../../assets/images';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import SwitchSelector from 'react-native-switch-selector';
import { Picker } from '@react-native-picker/picker';

export class PengajuanAnak extends Component {
    constructor(props) {
        super(props);
        this.state = {
            caridanatur: '',
            text: '',
            carianak: '',
            modalpilih: false,
            modalpilihNPB: false,
            pilihdonatur: false,
            pilihdonaturNPB: false,
            admin: '',
            id: '',
            filterdona: [],
            Anak: [],
            Donatur: [],
            detail: [],
            filter: [],
            filter2: [],
            refreshing: true,
        }
    }
    onRefresh() {
        this.GetAnakAPi();
        this.setState({ refreshing: false });
    }
    editData(id_donatur) {
        {
            let simpandata = {
                id_donatur: id_donatur,
            }
            let data = new FormData();
            for (let key in simpandata) {
                data.append(key, simpandata[key]);
            }
            fetch('https://kilauindonesia.org/datakilau/api/donaturanakupd/' + this.state.id, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'multipart/form-data'
                },
                body: data,
            })
                .then((res) => res.json())
                .then((resJson) => {
                    console.log(resJson);
                    if (resJson.status === 'sukses') {

                        ToastAndroid.show("Data berhasil ditambah!", ToastAndroid.SHORT)
                    } else {
                        alert(`Data gagal disimpan !!!`);
                    }
                })
                .catch((err) => console.log('dari catch send Data ===', err));
        }

    }

    HapusDonatur() {
        {
            let simpandata = {
                id_donatur: this.state.id_donatur,
            }
            let data = new FormData();
            for (let key in simpandata) {
                data.append(key, simpandata[key]);
            }
            fetch('https://kilauindonesia.org/datakilau/api/donaturanakhps/' + this.state.id, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'multipart/form-data'
                },
                body: data,
            })
                .then((res) => res.json())
                .then((resJson) => {
                    console.log(resJson);
                    if (resJson.status === 'sukses') {

                        ToastAndroid.show("Donatur Berhasil di Hapus!", ToastAndroid.SHORT)
                    } else {
                        alert(`Data gagal disimpan !!!`);
                    }
                })
                .catch((err) => console.log('dari catch send Data ===', err));
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
                    filter: resdata.data,
                    refreshing: false,
                });
            });
    }
    GetDonaturAPi() {
        fetch('https://kilauindonesia.org/datakilau/api/getdonatur')
            .then(res => {
                if (res.status === 200) return res.json();
            })
            .then(resdata => {
                console.log(resdata.data);
                this.setState({
                    Donatur: resdata.data,
                    filterdona: resdata.data,
                    donaCPB: resdata.data,
                    refreshing: false,
                });
            });
    }
    filterListdona(textToSearch) {
        const CPB_DAN_NPB = this.state.Donatur.filter(item => item.diperuntukkan != 'NPB')
        this.setState({
            filterdona: this.state.Donatur
                .filter(i => i.nama_lengkap.toLowerCase(textToSearch).includes(textToSearch))
        })
    }

    filterList(textToSearch) {
        this.setState({
            filter: this.state.Anak
                .filter(i => i.full_name.toLowerCase(textToSearch).includes(textToSearch))
        })
    }

    componentDidMount() {
        this.GetAnakAPi();
        this.GetDonaturAPi();
        // BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
        // Firebase.initializeApp(this);
        // this.requestCameraPermission();
        console.log(this.props);
    }

    render() {
        const admin = [
            { label: 'List CPB', value: 'CPB' },
            { label: 'List NPB', value: 'NPB' },
        ];
        const donaCPB = this.state.Donatur.filter(item => item.diperuntukkan === 'CPB')
        const donaNPB = this.state.Donatur.filter(item => item.diperuntukkan === 'NPB')
        const filter_NPB = this.state.Anak.filter(item => item.status_cpb === 'NPB')
        const filter_sta = this.state.Anak.filter(item => item.status_cpb != 'NPB')
        // const filter_sta = this.state.Anak.filter(item => item.status_cpb === 'PB' && item.status_cpb === 'CPB')
        return (
            <View>
                <SafeAreaView style={{ backgroundColor: '#fff' }}>
                    <View style={{ backgroundColor: '#0EBEDF', height: 130 }}>
                        {/* <Text>{filter_sta.length}</Text> */}
                        <View
                            style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
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
                                    this.filterList(text.toLowerCase()), this.setState({ carianak: text })
                                }}
                                placeholder="Cari"
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

                        <View style={{ marginTop: 20, marginHorizontal: 20 }}>
                            <SwitchSelector
                                fontSize={12}
                                fontFamily={'Poppins-Medium'}
                                options={admin}
                                initial={0}
                                borderWidth={0}
                                height={49}
                                borderRadius={10}
                                hasPadding
                                // onPress={(value) => console.log(`Call onPress with value: ${value}`)}
                                onPress={value => {
                                    this.setState({ admin: value }),
                                        ToastAndroid.show(value.toString(), ToastAndroid.SHORT);
                                }}

                            />
                        </View>

                    </View>


                    {/* <View style={{flexDirection:'row'}}> */}
                    {this.state.admin === 'CPB' | this.state.admin === '' ?
                        <FlatList
                            refreshControl={
                                <RefreshControl
                                    refreshing={this.state.refreshing}
                                    onRefresh={() => this.onRefresh()}
                                />
                            }
                            data={this.state.carianak === '' ? filter_sta : this.state.filter}
                            renderItem={({ item }) => (
                                <View>
                                    <View style={{}}>
                                        <TouchableOpacity
                                            onPress={() => this.setState({ modalpilih: true, id: item.id_anak })}>

                                            <View style={style.itemflat}>
                                                <View style={{
                                                    width: '10%', justifyContent: 'center',
                                                    backgroundColor: item.status_cpb === 'CPB' ? '#0076B8' : '#000' &&
                                                        item.status_cpb === 'PB' ? '#00B855' : '#000' && item.status_cpb === 'NPB' ? '#E32845' : '#000' && item.status_cpb === 'BCPB' ? '#FFBB0C' : '#000'
                                                }}>
                                                    <View style={{ justifyContent: 'center', alignItems: 'center', alignSelf: 'center', alignContent: 'center' }}>
                                                        <Text style={{ fontSize: 12, fontFamily: 'Poppins-Medium', color: '#fff', transform: [{ rotate: '-90deg' }] }}>{item.status_cpb}</Text>
                                                    </View>
                                                </View>
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
                                                        <View style={{ flexDirection: 'row', marginLeft: -10 }}>
                                                            <Image source={{
                                                                uri:
                                                                    'https://kilauindonesia.org/datakilau/gambarUpload/' +
                                                                    item.foto,
                                                            }}
                                                                style={{
                                                                    height: 50,
                                                                    width: 50,
                                                                    borderRadius: 45,
                                                                    color: '#000',
                                                                    marginRight: 30
                                                                }}
                                                            />
                                                            <View
                                                                style={{ flexDirection: 'column', marginLeft: '-10%', justifyContent: 'center', width: '70%' }}>
                                                                <Text style={{ color: '#000', fontFamily: 'Poppins-Medium', fontSize: 14, marginLeft: 10, }}>
                                                                    {item.full_name}
                                                                </Text>
                                                                <View style={{ flexDirection: 'row', marginTop: 5, }}>
                                                                    <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                                                        <JenisH style={{ marginLeft: 10, width: 25, height: 25 }} />
                                                                        {
                                                                            item.hasil_survey === '' | item.hasil_survey === 'null' | item.hasil_survey === null ?
                                                                                <Text style={{ color: '#000', fontSize: 10, fontFamily: 'Poppins-Regular', marginLeft: 5, width: 70, marginTop: -2 }}>Belum Mengesi Survey</Text>
                                                                                :
                                                                                <Text style={style.labelkiri}>{item.hasil_survey}</Text>
                                                                        }
                                                                    </View>
                                                                    <View style={{ flexDirection: 'row' }}>
                                                                        <OrangHitam style={{ marginLeft: 10, }} />
                                                                        {
                                                                            item.nama_lengkap === '' | item.nama_lengkap === 'null' | item.nama_lengkap === null ?
                                                                                <Text style={{ color: '#000', fontSize: 10, fontFamily: 'Poppins-Regular', marginLeft: 5, marginTop: 5 }}>Belum Memiliki Donatur</Text>
                                                                                :
                                                                                <Text style={style.labelkanan}>{item.nama_lengkap}</Text>
                                                                        }
                                                                    </View>

                                                                </View>

                                                            </View>
                                                        </View>
                                                    </View>
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                </View >

                            )
                            }></FlatList >
                        :
                        <View></View>
                    }
                    {
                        this.state.admin === 'NPB' ?
                            <FlatList
                                refreshControl={
                                    <RefreshControl
                                        refreshing={this.state.refreshing}
                                        onRefresh={() => this.onRefresh()}
                                    />
                                }
                                data={this.state.carianak === '' ? filter_NPB : this.state.filter}
                                renderItem={({ item }) => (
                                    <View>
                                        <View style={{}}>
                                            <TouchableOpacity
                                                onPress={() => this.setState({ modalpilihNPB: true, id: item.id_anak })}>

                                                <View style={style.itemflat}>
                                                    <View style={{
                                                        width: '10%', justifyContent: 'center',
                                                        backgroundColor: item.status_cpb === 'CPB' ? '#0076B8' : '#000' &&
                                                            item.status_cpb === 'PB' ? '#00B855' : '#000' && item.status_cpb === 'NPB' ? '#E32845' : '#000' && item.status_cpb === 'BCPB' ? '#FFBB0C' : '#000'
                                                    }}>
                                                        <View style={{ justifyContent: 'center', alignItems: 'center', alignSelf: 'center', alignContent: 'center' }}>
                                                            <Text style={{ fontSize: 12, fontFamily: 'Poppins-Medium', color: '#fff', transform: [{ rotate: '-90deg' }] }}>{item.status_cpb}</Text>
                                                        </View>
                                                    </View>
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
                                                            <View style={{ flexDirection: 'row' }}>
                                                                <Image source={test}
                                                                    style={{
                                                                        height: 50,
                                                                        width: 50,
                                                                        borderRadius: 45,
                                                                        color: '#000',
                                                                        marginRight: 30
                                                                    }}
                                                                />
                                                                <View
                                                                    style={{ flexDirection: 'column', marginLeft: '-10%', justifyContent: 'center', width: '70%' }}>
                                                                    <Text style={{ color: '#000', fontFamily: 'Poppins-Medium', fontSize: 14, marginLeft: 10, }}>
                                                                        {item.full_name}
                                                                    </Text>
                                                                    <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                                                        <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                                                            <JenisH style={{ marginLeft: 10, width: 25, height: 25 }} />
                                                                            {
                                                                                item.hasil_survey === '' | item.hasil_survey === 'null' | item.hasil_survey === null ?
                                                                                    <Text style={{ color: '#000', fontSize: 10, fontFamily: 'Poppins-Regular', marginLeft: 5 }}>Tidak Layak</Text>
                                                                                    :
                                                                                    <Text style={style.labelkanan}>{item.hasil_survey}</Text>
                                                                            }
                                                                        </View>


                                                                        <View style={{ flexDirection: 'row', }}>
                                                                            <OrangHitam style={{ marginLeft: 10, }} />
                                                                            {
                                                                                item.nama_lengkap === '' | item.nama_lengkap === 'null' | item.nama_lengkap === null ?
                                                                                    <Text style={{ color: '#000', fontSize: 10, fontFamily: 'Poppins-Regular', marginLeft: 5, marginTop: 5 }}>Belum Memiliki Donatur</Text>
                                                                                    :
                                                                                    <Text style={style.labelkanan}>{item.nama_lengkap}</Text>
                                                                            }
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

                                )}></FlatList>
                            :
                            <View></View>

                    }
                </SafeAreaView >

                <Modal
                    animationType={"slide"}
                    transparent={true}
                    propagateSwipe={true}
                    visible={this.state.pilihdonaturNPB}
                    onRequestClose={() => this.setState({ pilihdonaturNPB: false })}
                    style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                    <View style={style.ModalCont2}>
                        <View style={{
                            paddingTop: 5,
                            backgroundColor: '#ffffff',
                            borderTopLeftRadius: 10,
                            borderTopRightRadius: 10,
                            height: '100%',
                            shadowColor: "#333",
                            shadowOffset: {
                                width: 1,
                                height: 1,
                            },
                            shadowOpacity: 0.3,
                            shadowRadius: 2,
                            elevation: 3,
                            alignItems: 'center',
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            right: 0,
                        }}>
                            <SafeAreaView style={{ width: '100%', height: '100%' }}>
                                <TouchableOpacity activeOpacity={1.0} onPress={() => this.setState({})} style={style.ModalCont}>
                                    <View style={{
                                        paddingTop: 5,

                                        backgroundColor: '#ffffff',
                                        // flexDirection: 'row',
                                        borderRadius: 20,
                                        height: 430,
                                        width: '100%',
                                        shadowColor: "#333",
                                        shadowOffset: {
                                            width: 1,
                                            height: 1,
                                        },
                                        shadowOpacity: 0.3,
                                        shadowRadius: 2,
                                        elevation: 3,
                                    }}>
                                        <View style={{ backgroundColor: '#0EBEDF', height: 100, marginTop: -10, borderTopLeftRadius: 20, borderTopRightRadius: 20 }}>
                                            <TouchableOpacity onPress={() => this.setState({ pilihdonaturNPB: false })} style={{ position: 'absolute', right: 20, top: 20 }}>
                                                <Close />
                                            </TouchableOpacity>
                                            <Text style={style.txtPresensi}>Pilih Donatur NPB</Text>
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
                                                    style={{
                                                        flexDirection: 'row',
                                                        backgroundColor: '#FFF',
                                                        paddingHorizontal: 40,
                                                        height: 38,
                                                        width: 250,
                                                        borderRadius: 9,
                                                        textAlign: 'center'
                                                    }}
                                                    placeholder='Cari Donatur'
                                                    onChangeText={(text) => {
                                                        this.filterListdona(text.toLowerCase()), this.setState({ caridanatur: text })
                                                    }}
                                                    value={this.state.caridanatur}
                                                    placeholderTextColor="#C0C0C0"
                                                    underlineColorAndroid="transparent" />
                                            </View>

                                        </View>
                                        <ScrollView style={{ marginTop: 10, marginBottom: 30 }}>

                                            <View>
                                                <FlatList
                                                    refreshControl={
                                                        <RefreshControl
                                                            refreshing={this.state.refreshing}
                                                            onRefresh={() => this.onRefresh()}
                                                        />
                                                    }
                                                    data={this.state.caridanatur === '' ? donaNPB : this.state.filterdona}
                                                    renderItem={({ item }) => (
                                                        <View>
                                                            <View style={{}}>
                                                                <TouchableOpacity
                                                                    onPress={() => this.setState({ pilihdonaturNPB: false }, this.editData(item.id_donatur))}>

                                                                    <View style={style.itemflat2}>
                                                                        <Text style={{ marginLeft: 10 }}>{item.nama_lengkap}</Text>
                                                                    </View>
                                                                </TouchableOpacity>
                                                            </View>
                                                        </View>

                                                    )}></FlatList>
                                            </View>
                                        </ScrollView>


                                    </View>
                                </TouchableOpacity>
                            </SafeAreaView>
                        </View>
                    </View>
                </Modal>

                <Modal animationType={"fade"} transparent={true}
                    visible={this.state.pilihdonatur}
                    onRequestClose={() => { this.setState({ pilihdonatur: false }) }}>

                    <SafeAreaView style={style.containerSafe}>
                        <TouchableOpacity activeOpacity={1.0} onPress={() => this.setState({ pilihdonatur: false })} style={style.ModalCont}>
                            <View style={{
                                paddingTop: 5,

                                backgroundColor: '#ffffff',
                                // flexDirection: 'row',
                                borderRadius: 20,
                                height: 430,
                                width: '100%',
                                shadowColor: "#333",
                                shadowOffset: {
                                    width: 1,
                                    height: 1,
                                },
                                shadowOpacity: 0.3,
                                shadowRadius: 2,
                                elevation: 3,
                            }}>
                                <View style={{ backgroundColor: '#0EBEDF', height: 100, marginTop: -10, borderTopLeftRadius: 20, borderTopRightRadius: 20 }}>
                                    <TouchableOpacity onPress={() => this.setState({ pilihdonatur: false })} style={{ position: 'absolute', right: 20, top: 20 }}>
                                        <Close />
                                    </TouchableOpacity>
                                    <Text style={style.txtPresensi}>Pilih Donatur CPB</Text>
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
                                            style={{
                                                flexDirection: 'row',
                                                backgroundColor: '#FFF',
                                                paddingHorizontal: 40,
                                                height: 38,
                                                width: 250,
                                                borderRadius: 9,
                                                textAlign: 'center'
                                            }}
                                            placeholder='Cari Donatur'
                                            onChangeText={(text) => {
                                                this.filterListdona(text.toLowerCase()), this.setState({ caridanatur: text })
                                            }}
                                            value={this.state.caridanatur}
                                            placeholderTextColor="#C0C0C0"
                                            underlineColorAndroid="transparent" />
                                    </View>

                                </View>
                                <ScrollView style={{ marginTop: 10, marginBottom: 30 }}>
                                    <View>
                                        <FlatList
                                            refreshControl={
                                                <RefreshControl
                                                    refreshing={this.state.refreshing}
                                                    onRefresh={() => this.onRefresh()}
                                                />
                                            }
                                            data={this.state.caridanatur === '' ? donaCPB : this.state.filterdona}
                                            renderItem={({ item }) => (
                                                <View>
                                                    <View style={{}}>
                                                        <TouchableOpacity
                                                            onPress={() =>
                                                                Alert.alert(
                                                                    'Peringatan',
                                                                    'Apakah Anda Ingin Mengedit Data Anak ini ?',
                                                                    [
                                                                        {
                                                                            text: 'Ya',
                                                                            onPress: () => this.setState({ pilihdonatur: false, }, this.editData(item.id_donatur)),
                                                                            style: 'cancel',
                                                                        },
                                                                        {
                                                                            text: "Cancel",
                                                                            onPress: () => console.log("Cancel Pressed"),
                                                                            style: "cancel"
                                                                        },
                                                                    ],
                                                                    { cancelable: false },
                                                                )
                                                            }>

                                                            <View style={style.itemflat2}>
                                                                <Text style={{ marginLeft: 10, justifyContent: 'center' }}>{item.nama_lengkap}</Text>
                                                            </View>
                                                        </TouchableOpacity>
                                                    </View>
                                                </View>

                                            )}></FlatList>
                                    </View>
                                </ScrollView>


                            </View>
                        </TouchableOpacity>
                    </SafeAreaView>
                </Modal>


                <Modal animationType={"fade"} transparent={true}
                    visible={this.state.modalpilih}
                    onRequestClose={() => this.setState({ modalpilih: false })}>

                    <View style={{
                        backgroundColor: '#fff',
                        paddingTop: 5,
                        marginHorizontal: 5,
                        marginTop: '50%',
                        borderRadius: 20,
                        height: '35%',
                        width: '90%',
                        borderWidth: 1,
                        borderColor: '#bdbdbd',
                        alignItems: 'center',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignSelf: 'center'
                    }}>
                        <SafeAreaView style={{ alignItems: 'center' }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                                <View style={style.kotakkecil}>
                                    <TouchableOpacity onPress={() => this.setState({ pilihdonatur: true, modalpilih: false, id: this.state.id })}>
                                        <IconTamKelompok style={{ justifyContent: 'center', alignSelf: 'center' }} />
                                        <Text style={{ marginTop: 10, textAlign: 'center', padding: 5 }}>Pilih Donatur </Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={style.kotakkecil}>
                                    <TouchableOpacity onPress={() => this.setState({ modalpilih: false }, this.HapusDonatur())}>
                                        {/* <KKada style={{ justifyContent: 'center', alignSelf: 'center' }} /> */}
                                        <Text style={{ marginTop: 10, textAlign: 'center', padding: 5 }}>Hapus Donatur</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <View style={{ marginTop: '2%', alignItems: 'center', flexDirection: 'row', alignContent: 'center', }}>
                                <TouchableOpacity onPress={() => this.setState({ modalpilih: false }) + ToastAndroid.show('Batal', ToastAndroid.SHORT)}>
                                    <View style={{ height: 50, borderColor: '#00A9B8', borderWidth: 1, width: 100, justifyContent: 'center', alignItems: 'center', alignSelf: 'center', borderRadius: 5 }}>
                                        <Text style={{ color: '#00A9B8', fontFamily: 'Poppins-Medium', fontSize: 14 }}>Batal</Text>
                                    </View>
                                </TouchableOpacity>

                            </View>
                        </SafeAreaView>
                    </View >

                </Modal >

                <Modal animationType={"fade"} transparent={true}
                    visible={this.state.modalpilihNPB}
                    onRequestClose={() => this.setState({ modalpilihNPB: false })}>

                    <View style={{
                        backgroundColor: '#fff',
                        paddingTop: 5,
                        marginHorizontal: 5,
                        marginTop: '50%',
                        borderRadius: 20,
                        height: '35%',
                        width: '90%',
                        borderWidth: 1,
                        borderColor: '#bdbdbd',
                        alignItems: 'center',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignSelf: 'center'
                    }}>
                        <SafeAreaView style={{ alignItems: 'center' }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                                <View style={style.kotakkecil}>
                                    <TouchableOpacity onPress={() => this.setState({ pilihdonaturNPB: true, modalpilihNPB: false, id: this.state.id })}>
                                        <IconTamKelompok style={{ justifyContent: 'center', alignSelf: 'center' }} />
                                        <Text style={{ marginTop: 10, textAlign: 'center', padding: 5 }}>Pilih Donatur</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={style.kotakkecil}>
                                    <TouchableOpacity onPress={() => this.setState({ modalpilihNPB: false }, this.HapusDonatur())}>
                                        {/* <KKada style={{ justifyContent: 'center', alignSelf: 'center' }} /> */}
                                        <Text style={{ marginTop: 10, textAlign: 'center', padding: 5 }}>Hapus Donatur</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <View style={{ marginTop: '2%', alignItems: 'center', flexDirection: 'row', alignContent: 'center', }}>
                                <TouchableOpacity onPress={() => this.setState({ modalpilihNPB: false }) + ToastAndroid.show('Batal', ToastAndroid.SHORT)}>
                                    <View style={{ height: 50, borderColor: '#00A9B8', borderWidth: 1, width: 100, justifyContent: 'center', alignItems: 'center', alignSelf: 'center', borderRadius: 5 }}>
                                        <Text style={{ color: '#00A9B8', fontFamily: 'Poppins-Medium', fontSize: 14 }}>Batal</Text>
                                    </View>
                                </TouchableOpacity>

                            </View>
                        </SafeAreaView>
                    </View >

                </Modal >

            </View >
        )
    }
}
const style = StyleSheet.create({
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
    itemflat2: {
        flex: 1,
        fontSize: 12,
        marginLeft: 10,
        paddingRight: 10,
        backgroundColor: '#fff',
        color: '#000',
        marginVertical: 5,
        marginHorizontal: 16,
        shadowColor: '#858585',
        shadowRadius: 15,
        elevation: 6,
        shadowOpacity: '25%',
        borderColor: '#7e7e7e',
        borderRadius: 5,
        height: 40,
        justifyContent: "center",
        alignContent: 'center'
    },
    IconCari: {
        position: 'absolute',
        top: 8,
        left: 20,
    },
    ModalCont2: {
        flex: 1,
    },
    containerSafe: {
        flex: 1,
        flexDirection: 'column',
    },
    txtPresensi: {
        justifyContent: 'center', alignItems: 'center',
        fontSize: 18,
        marginTop: 20,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',

    },
    ModalCont: {
        flex: 1,
        justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: '#00000099',
        paddingHorizontal: 10,
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
    labelkanan: {
        color: '#000',
        fontSize: 10,
        marginHorizontal: 5,
        width: 100,
        marginTop: 3,
    },
    labelkiri: {
        color: '#000', fontSize: 10, marginTop: 0, marginLeft: 5,
        marginVertical: 5,
        width: 50,
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
});
export default PengajuanAnak