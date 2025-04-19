import {
    RefreshControl, Dimensions, Alert, Modal, TouchableOpacity, ScrollView,
    FlatList, ImageBackground, SafeAreaView, Image, Text, View, TextInput, StyleSheet, ToastAndroid
} from 'react-native'
import React, { Component } from 'react'
import { Collapse, CollapseHeader, CollapseBody, AccordionList } from 'accordion-collapse-react-native';
import { x, tmbh, arrow, search, histori, surat, prestasi, rapot, Union, plus, background1, test, juara, date, floatbtntab, floatbtnapd } from '../../assets/images'
import DatePicker from 'react-native-date-picker';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'react-native-image-picker';
import CheckBox from '@react-native-community/checkbox';
import { connect } from 'react-redux'
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import { FilterdanText, Tamnak, Sekolah, Tgl, TingkatH, JenisH, LocationsH, Filter, Locations, Jenis, IconCari, Label, Document, Adduser } from '../../assets/icons'
import Swiper from 'react-native-swiper'
import ActionButton from 'react-native-action-button';

const numColumns = 3
const width = Dimensions.get('window').width
const height = Dimensions.get('window').height
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

export class List_anak extends Component {
    constructor(props) {
        super(props)
        this.state = {
            gambar: '',
            img: {
                0: {
                    image: {
                        name: '',
                        type: '',
                        uri: 'https://static.thenounproject.com/png/187803-200.png'
                    },
                }
            },
            imgp: {
                0: {
                    image: {
                        name: '',
                        type: '',
                        uri: 'https://static.thenounproject.com/png/187803-200.png'
                    },
                }
            },
            img1: null,
            img2: 0,
            img3: null,
            img4: 0,
            count: 1,
            Camera: '',
            nama: '',
            anak: [],
            filter: [],
            search: [],
            detak: [],
            det: [],
            modaldetail: 'false',
            modaldetailadmin: 'false',
            modalhistori: 'false',
            collapse: 'false',
            index: -1,
            modalTamAK: false,
            modalTamPel: false,
            fil: false,
            pel: '',
            myd: '',
            materi: [],
            check: false,
            reguler: false,
            reguler1: false,
            quran: false,
            refreshing: true,
            sa: false,
            jk: false,
            st: false,
            jenisK: [
                { label: 'Pilih Semua', value: 'semua' },
                { label: 'Perempuan', value: 'perempuan' },
                { label: 'Laki-laki', value: 'laki-laki' },
            ],
            jenisA: [
                { label: 'Pilih Semua', value: 'semua' },
                { label: 'Tahfidz', value: 'Tahfidz' },
                { label: 'Non-Tahfidz', value: 'Non-Tahfidz' },
            ],
            carianak: '',
            modaldetailanak: false,
            filt_anak1: [],
            anak1: [],
            date: new Date(),
            date1: new Date(),
            modaldate1: false,
            modaldate: false,
            nama: '',
            prestasianak: '',
            Anakent: [],
            filter_sta: [],
            filteranak: false,
            filteranakpengelola: false,
            listfilter: '',
        }
    }

    filterList(textToSearch) {
        this.setState({
            filt_anak1: this.state.anak1.filter(i => i.full_name.toLowerCase(textToSearch).includes(textToSearch)),
        });
    }
    // filterList1(textToSearch) {
    //     this.setState({
    //         anak1: this.state.anak1.filter(i => i.full_name.toLowerCase().includes(textToSearch)),
    //     });
    // }
    takePicAK(index) {
        {
            ImagePicker.launchCamera(
                {
                    noData: true,
                    saveToPhotos: true,
                    title: 'Select Photo',
                    maxWidth: 300,
                    maxHeight: 400,
                    compressImageQuality: 0.5,
                    storageOptions: {
                        skipBackup: false,
                        path: 'images',
                    },
                },
                (response) => {
                    console.log('Response = ', response);

                    if (response.didCancel) {
                        console.log('User cancelled image picker');
                    } else if (response.error) {
                        console.log('ImagePicker Error: ', response.error);
                    } else {
                        const source = {
                            image: {
                                uri: response.assets[0].uri,
                                name: response.assets[0].fileName,
                                type: response.assets[0].type,
                            }
                            //   id: 0,
                        };
                        console.log('ini gambar = ', source);
                        this.setState(prevState => {
                            prevState.img[index] = source
                            //   prevState.tgl_lahir[index] != this.props.route.params.tgl_lahir[index] ? this.setState({tglmbuh : true}) : this.setState({tglmbuh : false});
                            return {
                                img: prevState.img
                            }
                        }, () => console.log(this.state.img));
                        this.setState({
                            img1: index,
                            img2: index,
                        });
                        console.log('ini gambar = ', this.state.img);
                    }
                },
            );
        }
    }
    takePicPel(index) {
        {
            ImagePicker.launchCamera(
                {
                    noData: true,
                    saveToPhotos: true,
                    title: 'Select Photo',
                    maxWidth: 300,
                    maxHeight: 400,
                    compressImageQuality: 0.5,
                    storageOptions: {
                        skipBackup: false,
                        path: 'images',
                    },
                },
                (response) => {
                    console.log('Response = ', response);

                    if (response.didCancel) {
                        console.log('User cancelled image picker');
                    } else if (response.error) {
                        console.log('ImagePicker Error: ', response.error);
                    } else {
                        const source = {
                            image: {
                                uri: response.assets[0].uri,
                                name: response.assets[0].fileName,
                                type: response.assets[0].type,
                            }
                            //   id: 0,
                        };
                        console.log('ini gambar = ', source);
                        this.setState(prevState => {
                            prevState.imgp[index
                            ] = source
                            //   prevState.tgl_lahir[index] != this.props.route.params.tgl_lahir[index] ? this.setState({tglmbuh : true}) : this.setState({tglmbuh : false});
                            return {
                                imgp: prevState.imgp
                            }
                        }, () => console.log(this.state.img));
                        this.setState({
                            img3: index,
                            img4: index,
                        });
                        console.log('ini gambar = ', this.state.img);
                    }
                },
            );
        }
    }

    GetDetAPi() {
        const id_anak = this.state.prestasianak
        fetch('https://kilauindonesia.org/datakilau/api/joindataanak/' + id_anak)
            .then(res => {
                if (res.status === 200)
                    return res.json()
            }).then(resdata => {
                console.log(resdata.data)
                this.setState({
                    det: resdata.data,
                    anak1: resdata.data,
                    filt_anak1: resdata.data,
                })
            })
    }

    GetAnaktutorAPi() {
        fetch('https://kilauindonesia.org/datakilau/api/joindataanak')
            .then(res => {
                if (res.status === 200) return res.json();
            })
            .then(resdata => {
                // console.log(resdata.data);
                this.setState({
                    Anakent: resdata.data,
                    refreshing: false,
                });
            });
    }

    GetpendAPi() {
        fetch('https://kilauindonesia.org/datakilau/api/joindatapend').then(res => {
            if (res.status === 200)
                return res.json()
        }).then(resdata => {
            console.log(resdata.DATA)
            this.setState({
                materi: resdata.DATA,
                filter: resdata.DATA,
                refreshing: false,
            })
        })
    }

    GetAnakAPi() {
        fetch('https://kilauindonesia.org/datakilau/api/testo').then(res => {
            if (res.status === 200)
                return res.json()
        }).then(resdata => {
            console.log(resdata.data)
            this.setState({
                anak: resdata.data

            })
        })
    }



    componentDidMount() {
        this.GetDetAPi(),
            this.GetpendAPi(),
            this.GetAnaktutorAPi(),
            // this.getmateriAPi();
            // BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
            // Firebase.initializeApp(this);
            // this.requestCameraPermission();
            console.log(this.state.det);
    }
    componentWillUnmount() {
        this.mounted = false;
        // BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    }

    onRefresh() {
        this.GetAnakAPi();
        this.setState({ refreshing: false });
    }
    // delete = (index) => {
    //   anak.splice(index, 1);
    //   this.setState({});
    // }
    histori(show) {
        this.setState({ modalhistori: show })
    }
    displayModal(show) {
        this.setState({ modaldetail: show })
    }
    displayModal(show) {
        this.setState({ modaldetailadmin: show })
    }
    togleTamAK(show) {
        this.setState({ modalTamAK: show });
    }
    togleTamPel(show) {
        this.setState({ modalTamPel: show });
    }
    filterListanakaktif(textToSearch) {
        const filter_aktif = this.state.Anakent.filter(
            item => item.status_validasi === 'aktif',
        );
        this.setState({
            filter1: filter_aktif.filter(
                i =>
                    i.full_name.toLowerCase(textToSearch).includes(textToSearch)
                // ||
                // (i.jenjang === this.state.pilih &&
                //     i.jenis_kelamin === this.state.JenisK &&
                //     i.status_cpb === this.state.JenisS),
            ),
        });
    }
    render() {
        const listfilter = [
            { label: 'Kemarin', value: 'Kemarin' },
            {
                label: '1 Minggu yang lalu',
                value: '1 Minggu yang lalu'
            },
            {
                label: '1 Bulan yang lalu',
                value: '1 Bulan yang lalu'
            },
            {
                label: 'Pilih Sendiri',
                value: 'Pilih Sendiri'
            },
        ];
        const filter_sta = this.state.anak1.filter(item => item.prestasi === 'NPB' | item.prestasi === 'BCPB' | item.prestasi === 'CPB')
        const tgl = [
            { label: 'Pilih Semua', value: 'semua' },
            { label: '7 Hari', value: '7' },
            { label: '30 Hari', value: '30' },
            { label: 'Pilih tanggal yang diinginkan', value: 'Pilih' },
        ];
        jenisK: [
            { label: 'Munculkan semua', value: 'semua' },
            { label: 'Perempuan', value: 'perempuan' },
            { label: 'Laki-laki', value: 'laki-laki' },
        ];
        const { detak } = this.state
        var img = [];
        for (let i = 0; i <= this.state.img2; i++) {
            img.push(
                <Image
                    style={{ width: 200, height: 200, resizeMode: 'contain' }}
                    source={this.state.img[i].image}
                />
            )
        }
        var imgpel = [];
        for (let i = 0; i <= this.state.img4; i++) {
            imgpel.push(
                <Image
                    style={{ width: 200, height: 200, resizeMode: 'contain' }}
                    source={this.state.imgp[i].image}
                />
            )
        }
        const filter_aktif_tutor = this.state.Anakent.filter(
            item => item.status_validasi === 'aktif' && item.id_kelompok != null,
        );
        return (

            <View style={style.contentContainer} >
                {this.props.user.presensi === 'karyawan' ? // ini tampilan untuk tutor//
                    <SafeAreaView style={{ backgroundColor: '#fff' }}>
                        <View style={{ backgroundColor: '#0EBEDF', height: 70 }}>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    marginTop: 20,
                                }}>
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
                                    onChangeText={text => {
                                        this.filterListanakaktif(text.toLowerCase()),
                                            this.setState({ carianak: text });
                                        // this.filterListBCPB(text.toLowerCase()), this.setState({ carianak: text })
                                    }}
                                    value={this.state.text}
                                    placeholder="Cari Anak Binaan"
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

                        </View>



                        <FlatList
                            refreshControl={
                                <RefreshControl
                                    refreshing={this.state.refreshing}
                                    onRefresh={() => this.onRefresh()}
                                />
                            }
                            data={
                                this.state.carianak === '' ? filter_aktif_tutor : this.state.filter1
                            }
                            renderItem={({ item, index }) => (
                                <View>
                                    <View style={{}}>
                                        <TouchableOpacity
                                            onPress={() =>
                                                this.props.navigation.navigate('Rapshelter', {
                                                    item: item,
                                                })
                                            }>
                                            <View style={style.itemflat2}>
                                                <View
                                                    style={{
                                                        width: '10%',
                                                        justifyContent: 'center',
                                                        backgroundColor:
                                                            item.status_cpb === 'CPB'
                                                                ? '#0076B8'
                                                                : '#000' && item.status_cpb === 'PB'
                                                                    ? '#00B855'
                                                                    : '#000' && item.status_cpb === 'NPB'
                                                                        ? '#E32845'
                                                                        : '#000' && item.status_cpb === 'BCPB'
                                                                            ? '#FFBB0C'
                                                                            : '#000',
                                                    }}>
                                                    <View
                                                        style={{
                                                            width: '40%',
                                                            justifyContent: 'center',
                                                            alignItems: 'center',
                                                            alignSelf: 'center',
                                                            alignContent: 'center',
                                                        }}>
                                                        <Text
                                                            style={{
                                                                fontSize: 12,
                                                                fontFamily: 'Poppins-Medium',
                                                                color: '#fff',
                                                            }}>
                                                            {item.status_cpb}
                                                        </Text>
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
                                                            <Image
                                                                source={test}
                                                                style={{
                                                                    height: 50,
                                                                    width: 50,
                                                                    borderRadius: 45,
                                                                    color: '#000',
                                                                    marginRight: 30,
                                                                }}
                                                            />
                                                            <View
                                                                style={{
                                                                    flexDirection: 'column',
                                                                    marginLeft: '-10%',
                                                                    justifyContent: 'center',
                                                                    width: '70%',
                                                                }}>
                                                                <Text
                                                                    style={{
                                                                        color: '#000',
                                                                        fontFamily: 'Poppins-Medium',
                                                                        fontSize: 14,
                                                                        marginLeft: 10,
                                                                    }}>
                                                                    {item.full_name}
                                                                </Text>
                                                                <View style={{ flexDirection: 'row' }}>
                                                                    <View style={{ flexDirection: 'row' }}>
                                                                        <JenisH style={{ marginLeft: 10 }} />
                                                                        <Text
                                                                            style={{
                                                                                color: '#000',
                                                                                fontSize: 10,
                                                                                marginLeft: 5,
                                                                                fontFamily: 'Poppins-Regular',
                                                                            }}>
                                                                            Non-Tahfidz
                                                                        </Text>
                                                                    </View>

                                                                    <View style={{ flexDirection: 'row' }}>
                                                                        <TingkatH style={{ marginLeft: 10 }} />
                                                                        <Text
                                                                            style={{
                                                                                color: '#000',
                                                                                fontSize: 10,
                                                                                fontFamily: 'Poppins-Regular',
                                                                                marginLeft: 5,
                                                                            }}>
                                                                            Kelas {item.kelas}
                                                                        </Text>
                                                                    </View>

                                                                    <View style={{ flexDirection: 'row' }}>
                                                                        <LocationsH style={{ marginLeft: 10 }} />
                                                                        <Text
                                                                            style={{
                                                                                color: '#000',
                                                                                fontSize: 10,
                                                                                fontFamily: 'Poppins-Regular',
                                                                                marginLeft: 5,
                                                                            }}>
                                                                            {item.tempat_lahir}
                                                                        </Text>
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
                    </SafeAreaView >
                    :
                    <View />
                }

                {
                    this.props.user.presensi === 'donatur' ? //ini untuk tampilan donatur//
                        <View >
                            <View style={{ backgroundColor: '#0EBEDF', height: 150, }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text style={style.title1}>Anak Asuh</Text>
                                    <TouchableOpacity onPress={() => { this.setState({ filteranak: true }) }} style={{ flexDirection: 'column' }} >
                                        <Filter style={{ marginTop: 20, marginRight: 20 }} />
                                        <Text style={{ marginLeft: -5, color: '#fff' }}>Filter</Text>
                                    </TouchableOpacity>
                                </View>
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



                            {/* onPress={() => { this.props.navigation.navigate('Detail'), this.setState({ detak: [] }) }} */}
                            <FlatList
                                data={this.state.filt_anak1}
                                renderItem={({ item }) => (
                                    <View style={{ flexDirection: 'row' }}>
                                        <TouchableOpacity style={style.kotakbaru1} onPress={() => this.props.navigation.navigate('Detail1', { id_anak: item.id_anak, item: item })}>
                                            <Image source={test} style={{ height: 60, width: 60, borderRadius: 30, marginTop: 15, marginLeft: 10, }} />
                                            <View style={{ flexDirection: 'column' }}>
                                                <Text style={{ textAlign: 'center', marginTop: 5, marginLeft: 15 }}>{item.full_name}</Text>

                                                <View style={{ flexDirection: 'row' }}>
                                                    <JenisH style={{ marginLeft: 10 }} />
                                                    <Text style={{ color: '#000', fontSize: 12, marginLeft: 5 }}>{item.kelas}</Text>
                                                </View>

                                                <View style={{ flexDirection: 'row', }}>
                                                    <TingkatH style={{ marginLeft: 10, }} />
                                                    <Text style={{ color: '#000', fontSize: 12, marginLeft: 5 }}>{item.jenjang} {item.kelas}</Text>
                                                </View>

                                                {
                                                    item.nama_shelter === '' | item.nama_shelter === 'null' | item.nama_shelter === null ?
                                                        <View style={{ flexDirection: 'row', }}>
                                                            <LocationsH style={{ marginLeft: 10, }} />
                                                            <Text style={{ color: '#000', fontSize: 12, marginLeft: 5 }}>Tidak Ada Shleter</Text>
                                                        </View>
                                                        :
                                                        <View style={{ flexDirection: 'row', }}>
                                                            <LocationsH style={{ marginLeft: 10, }} />
                                                            <Text style={{ marginLeft: 5, color: '#000', fontSize: 12 }}>{item.nama_shelter}</Text>
                                                        </View>
                                                }



                                            </View>

                                        </TouchableOpacity>
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
                                            <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'center', }}>Anda belum memiliki anak asuh</Text>
                                            <Text style={{ fontSize: 12, textAlign: 'center', }}>Coba Tambah Anak dahulu untuk mendapat</Text>
                                            <Text style={{ fontSize: 12, textAlign: 'center', }}>aktifitas harian dari anak asuh</Text>
                                        </View>

                                        {/* <View style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center', alignSelf: 'center', marginTop: 20 }}>
                                        <TouchableOpacity style={style.btnSimpanbaru}>
                                            <View style={{ flexDirection: 'row' }}>
                                                <Text style={{ color: '#fff' }}>Tambah Anak Asuh</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View> */}

                                    </View>

                                }>
                            </FlatList>



                            <ActionButton buttonColor='#00A9B8' offsetX={'7%'} offsetY={'140%'} bgColor="#000" bgOpacity={0.7}>
                                <ActionButton.Item
                                    buttonColor='#00A9B8'
                                    title="Tambah Anak Asuh"
                                    offsetX={-5}
                                    onPress={() => { this.props.navigation.navigate('Pilnak') }}>
                                    <Image source={floatbtntab} style={style.actionButtonIcon} />
                                </ActionButton.Item>
                                <ActionButton.Item
                                    buttonColor='#00A9B8'
                                    title="Lihat Pengajuan"
                                    offsetX={-5}
                                    onPress={() => { this.props.navigation.navigate('ListPengajuan') }}>
                                    <Image source={floatbtntab} style={style.actionButtonIcon} />
                                </ActionButton.Item>
                                {/* <ActionButton.Item
                                buttonColor='#00A9B8'
                                title="Ganti Anak Asuh"
                                offsetX={-5}
                                onPress={() => { }}
                            >
                                <Image source={floatbtnapd} style={style.actionButtonIcon} />
                            </ActionButton.Item> */}
                            </ActionButton>

                            {/* <SafeAreaView style={{
                            top: 30,
                            left: 0, right: 10,
                            bottom: 0,
                            position: 'absolute'
                        }}>
                            <ActionButton buttonColor='#00A9B8' offsetX={5}>
                               
                            </ActionButton>
                        </SafeAreaView> */}
                            {/* {this.state.anak1 === anak1 ?
                            <View></View>
                            :
                            <View></View>
                        } */}




                            {/* <Modal
                            animationType={"slide"}
                            transparent={true}
                            visible={this.state.modaldetailanak}
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
                                        <ScrollView contentContainer showsVerticalScrollIndicator={true}>
                                            <ImageBackground source={background1} style={{ width: '100%', height: 300 }}>
                                            </ImageBackground>
                                            <View style={style.kolomkecil}>
                                                <Image source={test} style={{ width: 150, height: 150, borderRadius: 70, justifyContent: 'center', alignSelf: 'center', marginTop: -110, position: 'absolute' }}></Image>
                                                <View style={{ justifyContent: 'center', textAlign: 'center', alignItems: 'center', alignContent: 'center', alignSelf: 'center', marginTop: 50 }}>
                                                    <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold', }}>Vildan Vinanda</Text>
                                                    <View style={{ flexDirection: 'column', justifyContent: 'center', textAlign: 'center', alignItems: 'center', alignContent: 'center', alignSelf: 'center', }}>
                                                        <Text style={style.labeldlm}> 7 Tahun</Text>
                                                        <View style={{ flexDirection: 'row' }}>
                                                            <Locations />
                                                            <Text style={style.labeldlm}>Pama,{</Text>
                                                        </View>
                                                    </View>
                                                </View>

                                                <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 15, padding: 5, height: 170, }}>
                                                    <View style={{ flexDirection: 'column', marginLeft: 20, marginTop: 0 }}>
                                                        <Jenis style={{ marginLeft: 20 }} />
                                                        <Text style={{ marginTop: 2, color: '#fff', fontSize: 10 }}>Non-Tahfidz</Text>
                                                    </View>
                                                    <View style={{ marginTop: -10, width: 1, height: '40%', backgroundColor: '#EBEAEA', }} />

                                                    <View style={{ flexDirection: 'column', marginTop: 0 }}>
                                                        <Tgl style={{ marginLeft: 20, }} />
                                                        <Text style={{ color: '#fff', fontSize: 10 }}>17 Maret 2015</Text>
                                                    </View>
                                                    <View style={{ marginTop: -10, width: 1, height: '40%', backgroundColor: '#EBEAEA', }} />

                                                    <View style={{ flexDirection: 'column', marginRight: 20, marginTop: 0 }}>
                                                        < Sekolah style={{ marginLeft: 20, }} />
                                                        <Text style={{ marginLeft: 5, color: '#fff', fontSize: 10 }}>Sekolah Dasar</Text>
                                                    </View>
                                                </View>
                                            </View>
                                            <View style={{ backgroundColor: '#fff', borderTopRightRadius: 20, borderTopLeftRadius: 20, marginTop: -10 }}>





                                            </View>



                                        </ScrollView >


                                    </SafeAreaView>
                                </View>
                            </View>
                        </Modal> */}



                            <Modal
                                animationType={"slide"}
                                transparent={false}
                                visible={this.state.filteranak}
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
                                        height: '70%',
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
                                            <View style={{ flexDirection: 'row' }}>
                                                <TouchableOpacity onPress={() => { this.setState({ st: false }) }}>
                                                    <Image source={Union} style={{ width: 15, height: 15, marginLeft: 10, marginRight: 10, marginTop: 5 }}></Image>
                                                </TouchableOpacity>
                                                <Text style={{ fontWeight: 'bold', fontSize: 18, textAlign: 'center' }}> Filter</Text>
                                            </View>


                                            <View>
                                                <Text style={{ marginLeft: 10, marginBottom: 10, marginTop: 10 }}>Jenis Anak</Text>
                                                <View style={{ flexDirection: 'row', justifyContent: 'space-around', }}>
                                                    <TouchableOpacity style={style.btnFilt}>
                                                        <Text style={{ textAlign: 'center' }}>Tahfidz</Text>
                                                    </TouchableOpacity>
                                                    <TouchableOpacity style={style.btnFilt}>
                                                        <Text style={{ textAlign: 'center' }}>Non-Tahfidz</Text>
                                                    </TouchableOpacity>
                                                </View>

                                            </View>
                                            <View>
                                                <Text style={{ marginLeft: 10, marginBottom: 10, marginTop: 10 }}>Jenis Anak</Text>
                                                <View style={{ flexDirection: 'row', justifyContent: 'space-around', }}>
                                                    <TouchableOpacity style={style.btnFilt}>
                                                        <Text style={{ textAlign: 'center' }}>Laki-laki</Text>
                                                    </TouchableOpacity>
                                                    <TouchableOpacity style={style.btnFilt}>
                                                        <Text style={{ textAlign: 'center' }}>Perempuan</Text>
                                                    </TouchableOpacity>
                                                </View>
                                            </View>

                                            <View>
                                                <Text style={{ marginLeft: 10, marginBottom: 10, marginTop: 10 }}>Pendidikan</Text>
                                                <View style={{ flexDirection: 'row' }}>
                                                    <TouchableOpacity style={style.btnFilt}>
                                                        <Text style={{ textAlign: 'center' }}>SD</Text>
                                                    </TouchableOpacity>
                                                    <TouchableOpacity style={style.btnFilt}>
                                                        <Text style={{ textAlign: 'center' }}>SMP</Text>
                                                    </TouchableOpacity>
                                                </View>
                                                <View style={{ flexDirection: 'row' }}>
                                                    <TouchableOpacity style={style.btnFilt}>
                                                        <Text style={{ textAlign: 'center' }}>SMA</Text>
                                                    </TouchableOpacity>
                                                    {/* <TouchableOpacity style={style.btnFilt1}>
                                                    <Text style={{ textAlign: 'center' }}>Perguruan Tinggi</Text>
                                                </TouchableOpacity> */}
                                                </View>
                                            </View>
                                            {/* <Text style={{ marginLeft: 10, marginBottom: 10, marginTop: 10 }}>Waktu Aktivitas</Text>
                                            <RadioForm
                                                radio_props={tgl}
                                                onPress={(tgl) => {
                                                    this.setState({ tgl: tgl }),
                                                        ToastAndroid.show(tgl.toString(), ToastAndroid.SHORT)
                                                }}
                                                initial={0}
                                                buttonSize={10}
                                                buttonOuterSize={20}
                                                radioStyle={{ margin: 10, }}
                                                animation={true}
                                                formHorizontal={false}
                                            >
                                            </RadioForm>
                                        </View>
                                        {this.state.tgl === 'Pilih' ?
                                            <View>
                                                <DatePicker
                                                    date={this.state.date}
                                                    placeholder="select date"
                                                    onDateChange={(date) =>
                                                        this.setState({ date }, () => console.log(this.state.date))
                                                    }
                                                    androidVariant="nativeAndroid"
                                                    mode='date'
                                                />
                                            </View>
                                            :
                                            <View></View>
                                        } */}
                                            <View style={{ alignContent: 'center', justifyContent: 'center', alignItems: 'center', marginBottom: 50, flexDirection: 'row' }}>
                                                <Text
                                                    style={style.btnSimpanbaru}
                                                    onPress={() => {
                                                        this.setState({ filteranak: false })
                                                    }}>Terapkan</Text>
                                            </View>
                                        </SafeAreaView>
                                    </View>
                                </View>
                            </Modal>

                            <Modal
                                animationType={"slide"}
                                transparent={true}
                                visible={this.state.modaldetailadmin}
                                style={{
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}>
                                <View style={style.ModalCont2}>
                                    <View style={{
                                        paddingTop: 5,
                                        backgroundColor: '#ffffff',
                                        // flexDirection: 'row',
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
                                        <Text style={style.itemText}>Detail</Text>
                                        <ScrollView style={{ width: '100%', height: '100%' }}>
                                            <View style={style.detailgmbr}>
                                                <Image source={{ uri: 'https://www.kilauindonesia.org/datakilau/gambarDonatur/' + detak.gambar_donatur }} style={{ justifyContent: 'center', alignItems: 'center', height: 200, width: '50%', }} />
                                            </View>
                                            <Collapse>
                                                <CollapseHeader>
                                                    <View style={style.coltom}>
                                                        <Text style={{ marginLeft: 25, color: '#7e7e7e', fontSize: 14, textAlign: 'center' }}>Data Diri</Text>
                                                        <Image source={arrow} style={{
                                                            padding: 10,
                                                            margin: 5,
                                                            height: 20,
                                                            width: 20,
                                                            position: 'absolute',
                                                            resizeMode: 'stretch',
                                                            alignItems: 'center',
                                                            right: 15,
                                                            top: 5,
                                                        }}></Image>
                                                    </View>
                                                </CollapseHeader>
                                                <CollapseBody>

                                                    <View style={style.detail}>
                                                        <Text style={{
                                                            padding: 10, fontSize: 12, fontWeight: 'bold',
                                                        }}>Nama Lengkap:{detak.nama} </Text>
                                                        <Text style={{
                                                            fontSize: 12, fontWeight: 'bold', padding: 10,
                                                        }}>Jenis Kelamin:{detak.jk}</Text>
                                                        <Text style={{
                                                            fontSize: 12, fontWeight: 'bold', padding: 10,
                                                        }}>Email:{detak.email}</Text>
                                                        <Text style={{
                                                            fontSize: 12, fontWeight: 'bold', padding: 10,
                                                        }}>Alamat:{detak.alamat}</Text>
                                                        <Text style={{
                                                            fontSize: 12, fontWeight: 'bold', padding: 10,
                                                        }}>Kota:{detak.kota}</Text>
                                                        <Text style={{
                                                            fontSize: 12, fontWeight: 'bold', padding: 10,
                                                        }}>Nomor HP:{detak.no_hp}</Text>
                                                    </View>
                                                </CollapseBody>
                                            </Collapse>

                                            <Collapse>
                                                <CollapseHeader>
                                                    <View style={style.coltom}>
                                                        <Text style={{ marginLeft: 25, color: '#7e7e7e', fontSize: 14, textAlign: 'center' }}>Aktifitas</Text>
                                                        <Image source={arrow} style={{
                                                            padding: 10,
                                                            margin: 5,
                                                            height: 20,
                                                            width: 20,
                                                            position: 'absolute',
                                                            resizeMode: 'stretch',
                                                            alignItems: 'center',
                                                            right: 15,
                                                            top: 5,
                                                        }}></Image>
                                                    </View>
                                                </CollapseHeader>
                                                <CollapseBody>

                                                    <View style={style.detail}>
                                                        <Text> Aktifitas Anak Asuh</Text>
                                                        <Image style={{
                                                            padding: 10,
                                                            margin: 5,
                                                            height: 20,
                                                            width: 20,
                                                            position: 'absolute',
                                                            resizeMode: 'stretch',
                                                            alignItems: 'center',
                                                            right: 15,
                                                            top: 5,
                                                        }}></Image>
                                                    </View>
                                                </CollapseBody>
                                            </Collapse>

                                            <Collapse>
                                                <CollapseHeader>
                                                    <View style={style.coltom}>
                                                        <Text style={{ marginLeft: 25, color: '#7e7e7e', fontSize: 14, textAlign: 'center' }}>Detail Hadir</Text>
                                                        <Image source={arrow} style={{
                                                            padding: 10,
                                                            margin: 5,
                                                            height: 20,
                                                            width: 20,
                                                            position: 'absolute',
                                                            resizeMode: 'stretch',
                                                            alignItems: 'center',
                                                            right: 15,
                                                            top: 5,
                                                        }}></Image>
                                                    </View>
                                                </CollapseHeader>
                                                <CollapseBody>

                                                    <View style={style.detail}>
                                                        <View style={{ padding: 10, flexDirection: 'row', justifyContent: 'space-around' }}>
                                                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                                                <Text style={{ color: '#51C95D', fontWeight: 'bold' }}>{this.state.hadirbaw}</Text>
                                                                <Text style={{ fontSize: 14, color: '#353739', }}> 0 Hadir</Text>
                                                            </View>
                                                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                                                <Text style={{ color: '#FF845D', fontWeight: 'bold' }}>{this.state.terlambatbaw}</Text>
                                                                <Text style={{ fontSize: 14, color: '#353739', }}> 0 Tidak Hadir </Text>
                                                            </View>
                                                        </View>
                                                    </View>
                                                </CollapseBody>
                                            </Collapse>




                                            <View style={{ alignContent: 'center', justifyContent: 'center', alignItems: 'center', padding: 10, flexDirection: 'row' }}>
                                                <Text
                                                    style={style.btnSimpanUn1}
                                                    onPress={() => {
                                                        this.setState({ detak: [], modaldetailadmin: false })
                                                    }}>Kembali</Text>
                                                {/* <Text
                                        style={style.btnSimpanDark}
                                        onPress={() => { this.setState({ modalhistori: true }) }}
                                    >Tambah
                                    </Text> */}

                                                {/* <Text
                                        style={style.btnSimpanDark}
                                        onPress={() => this.props.navigation.navigate('Tamrap', this.setState({ modaldetail: false }))}>Tambah Rapot
                                    </Text> */}
                                            </View>
                                            {/* <TouchableOpacity style={style.refresh} onPress={() => this.togleTambah(true)}>
                  <Image source={search} style={style.tambah}></Image>
                </TouchableOpacity> */}

                                        </ScrollView>
                                    </View>
                                </View>
                            </Modal>

                        </View >
                        :
                        <View />
                }


                {
                    this.props.user.presensi === 'admincabang' ? //ini untuk tampilan admin cabang//
                        <ScrollView showsVerticalScrollIndicator={false}>
                            <View style={{ backgroundColor: '#0EBEDF' }}>
                                <Text style={style.title1}>Anak Asuh</Text>
                            </View>
                            <FlatList
                                refreshControl={
                                    <RefreshControl
                                        refreshing={this.state.refreshing}
                                        onRefresh={() => this.onRefresh()}
                                    />
                                }
                                data={this.state.det}
                                renderItem={({ item }) => (
                                    <View >
                                        <TouchableOpacity style={style.itemflat} onPress={() => { this.props.navigation.navigate('Detail'), this.setState({ detak: [] }) }}>
                                            {/* <View tyle={{ justifyContent: 'row', alignItems: 'center', alignContent: 'center' }} > */}
                                            <Image source={{ uri: 'https://www.kilauindonesia.org/datakilau/gambarDonatur/' + item.gambar_donatur }} style={{ justifyContent: 'center', alignItems: 'center', alignContent: 'center', height: 90, width: 90, borderRadius: 45, }} />
                                            <View style={style.Label1}>
                                                <Text>{item.nama} </Text>
                                                <Text>{item.email}</Text>
                                                {/* <Text>Mata Pelajaran</Text>
                      <Text>Tingkat</Text> */}
                                                {/* <Text>{item.alamat}</Text> */}
                                            </View>
                                            {/* </View> */}
                                        </TouchableOpacity>
                                    </View>
                                )}>
                            </FlatList>
                            <Modal
                                animationType={"slide"}
                                transparent={true}
                                visible={this.state.modaldetailadmin}
                                style={{
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}>
                                <View style={style.ModalCont2}>
                                    <View style={{
                                        paddingTop: 5,
                                        backgroundColor: '#ffffff',
                                        // flexDirection: 'row',
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
                                        <Text style={style.itemText}>Detail</Text>
                                        <ScrollView style={{ width: '100%', height: '100%' }}>
                                            <View style={style.detailgmbr}>
                                                <Image source={{ uri: 'https://www.kilauindonesia.org/datakilau/gambarDonatur/' + detak.gambar_donatur }} style={{ justifyContent: 'center', alignItems: 'center', height: 200, width: '50%', }} />
                                            </View>
                                            <Collapse>
                                                <CollapseHeader>
                                                    <View style={style.coltom}>
                                                        <Text style={{ marginLeft: 25, color: '#7e7e7e', fontSize: 14, textAlign: 'center' }}>Data Diri</Text>
                                                        <Image source={arrow} style={{
                                                            padding: 10,
                                                            margin: 5,
                                                            height: 20,
                                                            width: 20,
                                                            position: 'absolute',
                                                            resizeMode: 'stretch',
                                                            alignItems: 'center',
                                                            right: 15,
                                                            top: 5,
                                                        }}></Image>
                                                    </View>
                                                </CollapseHeader>
                                                <CollapseBody>

                                                    <View style={style.detail}>
                                                        <Text style={{
                                                            padding: 10, fontSize: 12, fontWeight: 'bold',
                                                        }}>Nama Lengkap:{detak.nama} </Text>
                                                        <Text style={{
                                                            fontSize: 12, fontWeight: 'bold', padding: 10,
                                                        }}>Jenis Kelamin:{detak.jk}</Text>
                                                        <Text style={{
                                                            fontSize: 12, fontWeight: 'bold', padding: 10,
                                                        }}>Email:{detak.email}</Text>
                                                        <Text style={{
                                                            fontSize: 12, fontWeight: 'bold', padding: 10,
                                                        }}>Alamat:{detak.alamat}</Text>
                                                        <Text style={{
                                                            fontSize: 12, fontWeight: 'bold', padding: 10,
                                                        }}>Kota:{detak.kota}</Text>
                                                        <Text style={{
                                                            fontSize: 12, fontWeight: 'bold', padding: 10,
                                                        }}>Nomor HP:{detak.no_hp}</Text>
                                                    </View>
                                                </CollapseBody>
                                            </Collapse>

                                            <Collapse>
                                                <CollapseHeader>
                                                    <View style={style.coltom}>
                                                        <Text style={{ marginLeft: 25, color: '#7e7e7e', fontSize: 14, textAlign: 'center' }}>Aktifitas</Text>
                                                        <Image source={arrow} style={{
                                                            padding: 10,
                                                            margin: 5,
                                                            height: 20,
                                                            width: 20,
                                                            position: 'absolute',
                                                            resizeMode: 'stretch',
                                                            alignItems: 'center',
                                                            right: 15,
                                                            top: 5,
                                                        }}></Image>
                                                    </View>
                                                </CollapseHeader>
                                                <CollapseBody>

                                                    <View style={style.detail}>
                                                        <Text> Aktifitas Anak Asuh</Text>
                                                        <Image style={{
                                                            padding: 10,
                                                            margin: 5,
                                                            height: 20,
                                                            width: 20,
                                                            position: 'absolute',
                                                            resizeMode: 'stretch',
                                                            alignItems: 'center',
                                                            right: 15,
                                                            top: 5,
                                                        }}></Image>
                                                    </View>
                                                </CollapseBody>
                                            </Collapse>

                                            <Collapse>
                                                <CollapseHeader>
                                                    <View style={style.coltom}>
                                                        <Text style={{ marginLeft: 25, color: '#7e7e7e', fontSize: 14, textAlign: 'center' }}>Detail Hadir</Text>
                                                        <Image source={arrow} style={{
                                                            padding: 10,
                                                            margin: 5,
                                                            height: 20,
                                                            width: 20,
                                                            position: 'absolute',
                                                            resizeMode: 'stretch',
                                                            alignItems: 'center',
                                                            right: 15,
                                                            top: 5,
                                                        }}></Image>
                                                    </View>
                                                </CollapseHeader>
                                                <CollapseBody>

                                                    <View style={style.detail}>
                                                        <View style={{ padding: 10, flexDirection: 'row', justifyContent: 'space-around' }}>
                                                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                                                <Text style={{ color: '#51C95D', fontWeight: 'bold' }}>{this.state.hadirbaw}</Text>
                                                                <Text style={{ fontSize: 14, color: '#353739', }}> 0 Hadir</Text>
                                                            </View>
                                                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                                                <Text style={{ color: '#FF845D', fontWeight: 'bold' }}>{this.state.terlambatbaw}</Text>
                                                                <Text style={{ fontSize: 14, color: '#353739', }}> 0 Tidak Hadir </Text>
                                                            </View>
                                                        </View>
                                                    </View>
                                                </CollapseBody>
                                            </Collapse>

                                            <View style={{ alignContent: 'center', justifyContent: 'center', alignItems: 'center', padding: 10, flexDirection: 'row' }}>
                                                <Text
                                                    style={style.btnSimpanUn1}
                                                    onPress={() => {
                                                        this.setState({ detak: [], modaldetailadmin: false })
                                                    }}>Kembali</Text>
                                               
                                            </View>
                                        
                                        </ScrollView>
                                    </View>
                                </View>
                            </Modal>
                        </ScrollView>
                        :
                        <View />
                }

                {
                    this.props.user.presensi === 'pengelola' ? //ini untuk tampilan pengelola//
                        <SafeAreaView contentContainerStyle={style.contentContainer} showsVerticalScrollIndicator={false}>

                            <View style={{ backgroundColor: '#0EBEDF', height: 150, }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text style={style.title1}>Anak Asuh</Text>
                                    <TouchableOpacity onPress={() => { this.setState({ fil: true }) }} style={{ flexDirection: 'column' }} >
                                        <Filter style={{ marginTop: 20, marginRight: 20 }} />
                                        <Text style={{ marginLeft: -5, color: '#fff' }}>Filter</Text>
                                    </TouchableOpacity>
                                </View>
                                <Text style={{
                                    marginRight: 20,
                                    marginLeft: 20,
                                    marginTop: -10,
                                    marginBottom: 15,
                                    fontSize: 12,
                                    fontWeight: 'bold',
                                    color: '#fff',
                                    fontFamily: 'Poppins-SemiBold',
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
                            {/* onPress={() => { this.props.navigation.navigate('Detail'), this.setState({ detak: [] }) }} */}
                            <FlatList
                                data={this.state.filt_anak1}
                                renderItem={({ item }) => (
                                    <View style={{ flexDirection: 'row' }}>
                                        <TouchableOpacity style={style.kotakbaru1} onPress={() => this.props.navigation.navigate('Detail1', { id_anak: item.id_anak, item: item })}>
                                            <Image source={test} style={{ height: 60, width: 60, borderRadius: 30, marginTop: 15, marginLeft: 10, }} />
                                            <View style={{ flexDirection: 'column' }}>
                                                <Text style={{ textAlign: 'center', marginTop: 5, marginLeft: 15 }}>{item.full_name}</Text>

                                                <View style={{ flexDirection: 'row' }}>
                                                    <JenisH style={{ marginLeft: 10 }} />
                                                    <Text style={{ color: '#000', fontSize: 12, marginLeft: 5 }}>Non-Tahfidz</Text>
                                                </View>

                                                <View style={{ flexDirection: 'row', }}>
                                                    <TingkatH style={{ marginLeft: 10, }} />
                                                    <Text style={{ color: '#000', fontSize: 12, marginLeft: 5 }}>{item.jenjang} {item.kelas}</Text>
                                                </View>

                                                {
                                                    item.nama_shelter === '' | item.nama_shelter === 'null' | item.nama_shelter === null ?
                                                        <View style={{ flexDirection: 'row', }}>
                                                            <LocationsH style={{ marginLeft: 10, }} />
                                                            <Text style={{ color: '#000', fontSize: 12, marginLeft: 5 }}>Tidak Ada Shleter</Text>
                                                        </View>
                                                        :
                                                        <View style={{ flexDirection: 'row', }}>
                                                            <LocationsH style={{ marginLeft: 10, }} />
                                                            <Text style={{ marginLeft: 5, color: '#000', fontSize: 12 }}>{item.nama_shelter}</Text>
                                                        </View>
                                                }
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                )}
                                keyExtractor={
                                    (item, index) => index.toString()}
                                showsVerticalScrollIndicator={false}
                                ListEmptyComponent={() =>
                                    <View>
                                        <View style={{ flexDirection: 'column', marginTop: 30, }}>
                                            <View style={style.iconbesar}>
                                                <Tamnak />
                                            </View>
                                            <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'center', }}>Anda belum memiliki anak asuh</Text>
                                            <Text style={{ fontSize: 12, textAlign: 'center', }}>Coba Tambah Anak dahulu untuk mendapat</Text>
                                            <Text style={{ fontSize: 12, textAlign: 'center', }}>aktifitas harian dari anak asuh</Text>
                                        </View>

                                        <View style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center', alignSelf: 'center', marginTop: 20 }}>
                                            <TouchableOpacity style={style.btnSimpanbaru}>
                                                <View style={{ flexDirection: 'row' }}>
                                                    <Text style={{ color: '#fff' }}>Tambah Anak Asuh</Text>
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                }>

                            </FlatList>


                            <View style={{ position: 'absolute', top: 570, marginLeft: 340, alignItems: 'center' }}>
                                
                                <ActionButton buttonColor='#00A9B8' offsetX={5}>
                                    <ActionButton.Item
                                        buttonColor='#00A9B8'
                                        title="Tambah Anak Binaan"
                                        offsetX={-5}
                                        onPress={() => { this.props.navigation.navigate('TambahAnak') }}
                                        textStyle={{ fontSize: 14, fontFamily: 'Poppins-SemiBold' }}
                                        buttonTextStyle={{ backgroundColor: '#000' }}
                                    >


                                        <Adduser style={style.actionButtonIcon} />
                                    </ActionButton.Item>
                                    <ActionButton.Item
                                        buttonColor='#00A9B8'
                                        title="Ajukan Pencarian Dana"
                                        offsetX={-5}
                                        textStyle={{ fontSize: 14, fontFamily: 'Poppins-SemiBold' }}
                                        onPress={() => { this.props.navigation.navigate('ListPengajuan') }}
                                    >
                                        <Document style={style.actionButtonIcon} />
                                    </ActionButton.Item>

                                </ActionButton>
                            </View>
                            
                            <Modal
                                animationType={"slide"}
                                transparent={true}
                                visible={this.state.modaldetailanak}
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
                                            <ScrollView contentContainer showsVerticalScrollIndicator={true}>
                                                <ImageBackground source={background1} style={{ width: '100%', height: 300 }}>
                                                </ImageBackground>
                                                <View style={style.kolomkecil}>
                                                    <Image source={test} style={{ width: 150, height: 150, borderRadius: 70, justifyContent: 'center', alignSelf: 'center', marginTop: -110, position: 'absolute' }}></Image>
                                                    <View style={{ justifyContent: 'center', textAlign: 'center', alignItems: 'center', alignContent: 'center', alignSelf: 'center', marginTop: 50 }}>
                                                        <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold', }}>Vildan Vinanda</Text>
                                                        <View style={{ flexDirection: 'column', justifyContent: 'center', textAlign: 'center', alignItems: 'center', alignContent: 'center', alignSelf: 'center', }}>
                                                            <Text style={style.labeldlm}> 7 Tahun</Text>
                                                            <View style={{ flexDirection: 'row' }}>
                                                                <Locations />
                                                                <Text style={style.labeldlm}>Pama,Sumedang</Text>
                                                            </View>
                                                        </View>
                                                    </View>

                                                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 15, padding: 5, height: 170, }}>
                                                        <View style={{ flexDirection: 'column', marginLeft: 20, marginTop: 0 }}>
                                                            <Jenis style={{ marginLeft: 20 }} />
                                                            <Text style={{ marginTop: 2, color: '#fff', fontSize: 10 }}>Non-Tahfidz</Text>
                                                        </View>
                                                        <View style={{ marginTop: -10, width: 1, height: '40%', backgroundColor: '#EBEAEA', }} />

                                                        <View style={{ flexDirection: 'column', marginTop: 0 }}>
                                                            <Tgl style={{ marginLeft: 20, }} />
                                                            <Text style={{ color: '#fff', fontSize: 10 }}>17 Maret 2015</Text>
                                                        </View>
                                                        <View style={{ marginTop: -10, width: 1, height: '40%', backgroundColor: '#EBEAEA', }} />

                                                        <View style={{ flexDirection: 'column', marginRight: 20, marginTop: 0 }}>
                                                            < Sekolah style={{ marginLeft: 20, }} />
                                                            <Text style={{ marginLeft: 5, color: '#fff', fontSize: 10 }}>Sekolah Dasar</Text>
                                                        </View>
                                                    </View>
                                                </View>
                                                <View style={{ backgroundColor: '#fff', borderTopRightRadius: 20, borderTopLeftRadius: 20, marginTop: -10 }}>





                                                </View>



                                            </ScrollView >


                                        </SafeAreaView>


                                    </View>
                                </View>
                            </Modal>
                            <Modal
                                animationType={'slide'}
                                transparent={true}
                                visible={this.state.fil}
                                style={{
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}>
                                <View style={style.ModalCont2}>
                                    <View
                                        style={{
                                            paddingHorizontal: 15,
                                            paddingVertical: 10,
                                            backgroundColor: '#ffffff',
                                            borderTopLeftRadius: 20,
                                            borderTopRightRadius: 20,
                                            height: '80%',
                                            shadowColor: '#333',
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
                                        <SafeAreaView style={{ width: '100%', height: '100%', paddingHorizontal: 20, }}>
                                            <View
                                                style={{
                                                    flexDirection: 'row',
                                                    alignItems: 'center',
                                                    marginTop: 10,
                                                }}>
                                                <TouchableOpacity
                                                    onPress={() => {
                                                        this.setState({ fil: false });
                                                    }}>
                                                    <Image
                                                        source={Union}
                                                        style={{
                                                            width: 15,
                                                            height: 15,
                                                            marginRight: 10,
                                                        }}></Image>
                                                </TouchableOpacity>
                                                <Text style={{ fontWeight: 'bold', fontSize: 18, fontFamily: 'Poppins-SemiBold', marginLeft: 10, color: '#000', }}>
                                                    Filter
                                                </Text>
                                            </View>
                                            <Text style={{ fontWeight: 'bold', fontSize: 14, fontFamily: 'Poppins-SemiBold', color: '#000', marginTop: 20, }}>
                                                Waktu Aktivitas
                                            </Text>
                                            <RadioForm
                                                radio_props={listfilter}
                                                onPress={value => {
                                                    this.setState({ listfilter: value }),
                                                        ToastAndroid.show(value.toString(), ToastAndroid.SHORT);
                                                }}
                                                initial={0}
                                                buttonSize={10}
                                                buttonOuterSize={20}
                                                radioStyle={{ marginVertical: 10 }}
                                                animation={true}
                                                formHorizontal={false}
                                                buttonColor="#000"></RadioForm>

                                            {this.state.listfilter === 'Pilih Sendiri' ? (
                                                <View style={{}}>
                                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                                                        <Text style={{ flex: 1, color: '#000', marginTop: 10, fontFamily: 'Poppins-Regular', fontSize: 11 }}>
                                                            Mulai dari
                                                        </Text>
                                                        <Text style={{ flex: 1, color: '#000', marginTop: 10, fontFamily: 'Poppins-Regular', fontSize: 11 }}>
                                                            Sampai
                                                        </Text>
                                                    </View>

                                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

                                                        <TouchableOpacity style={{ marginTop: 10, flex: 1, }} onPress={() => this.setState({ modaldate: true })}>
                                                            <Text style={{ color: '#000', width: '45%', fontFamily: 'Poppins-Regular', fontSize: 15, borderBottomWidth: 1 }}>{this.state.date.toLocaleDateString('default')}</Text>
                                                        </TouchableOpacity>
                                                        <TouchableOpacity style={{ marginTop: 10, flex: 1, }} onPress={() => this.setState({ modaldate1: true })}>
                                                            <Text style={{ color: '#000', width: '45%', fontFamily: 'Poppins-Regular', fontSize: 15, borderBottomWidth: 1 }}>{this.state.date1.toLocaleDateString('default')}</Text>
                                                        </TouchableOpacity>
                                                    </View>
                                                </View>
                                            ) : (
                                                <View></View>
                                            )}
                                            <Text style={{ fontWeight: 'bold', fontSize: 14, fontFamily: 'Poppins-SemiBold', color: '#000', marginTop: '4%', }}>
                                                Pilih Jenis Kelamin
                                            </Text>
                                            <View style={{ marginTop: '4%' }}>
                                                <View style={{ borderColor: '#DDD', borderWidth: 1, height: 50, width: '100%', borderRadius: 10, position: 'absolute', }}
                                                />
                                                <Picker
                                                    style={style.Textinputcss2}
                                                    selectedValue={this.state.ST}
                                                    onValueChange={itemValue =>
                                                        this.setState({ ST: itemValue, show: 1 })
                                                    }>
                                                    <Picker.Item
                                                        style={{ fontSize: 14, fontFamily: 'Poppins-Regular' }}
                                                        label="Jenis Kelamin"
                                                        value=""
                                                    />
                                                    <Picker.Item
                                                        style={{ fontSize: 14, fontFamily: 'Poppins-Regular' }}
                                                        label="Laki-Laki"
                                                        value="Laki-Laki"
                                                    />
                                                    <Picker.Item
                                                        style={{ fontSize: 14, fontFamily: 'Poppins-Regular' }}
                                                        label="Perempuan"
                                                        value="Perempuan"
                                                    />
                                                </Picker>
                                            </View>



                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                                <TouchableOpacity style={style.btnSimpan3}>
                                                    <Text style={{ color: '#fff', fontFamily: 'Poppins-Medium', fontSize: 15 }}> Terapkan</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity style={style.btnSimpan2} onPress={() => btnReset}>
                                                    <Text style={{ color: '#00A9B8', fontFamily: 'Poppins-Medium', fontSize: 15 }}>Reset</Text>
                                                </TouchableOpacity>
                                            </View>

                                        </SafeAreaView>
                                    </View>
                                </View>
                            </Modal>

                            <Modal
                                animationType={"slide"}
                                transparent={true}
                                visible={this.state.modaldate}
                                style={{
                                    alignItems: 'center',
                                    justifyContent: 'center',

                                }}>
                                <View style={style.ModalCont2}>
                                    <View style={{
                                        paddingTop: 5,
                                        backgroundColor: '#ffffff',
                                        // flexDirection: 'row',
                                        borderTopLeftRadius: 10,
                                        borderTopRightRadius: 10,
                                        height: '37%',
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
                                        <TouchableOpacity onPress={() => this.setState({ modaldate: false })} style={{ position: 'absolute', left: 20, top: '5%' }}>
                                            <Image source={Union}
                                                style={{
                                                    height: 15,
                                                    width: 15,
                                                    alignItems: 'center',
                                                }} />
                                        </TouchableOpacity>
                                        <Text style={{ color: '#000', fontFamily: 'Poppins-SemiBold', fontSize: 16 }}>Mulai Dari</Text>
                                        <ScrollView style={{ width: '100%', height: '100%' }}>
                                            <DatePicker
                                                style={{ marginTop: '4%', justifyContent: 'center', alignSelf: 'center' }}
                                                date={this.state.date}
                                                placeholder="select date"
                                                minimumDate={new Date('2000-01-01')}
                                                maximumDate={new Date('2999-12-31')}
                                                onDateChange={(date) =>
                                                    this.setState({ date }, () => console.log(this.state.date))
                                                }
                                                androidVariant="nativeAndroid"
                                                mode='date'

                                            />
                                        </ScrollView>

                                    </View>
                                </View>

                            </Modal>


                            <Modal
                                animationType={"slide"}
                                transparent={false}
                                visible={this.state.filteranakpengelola}
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
                                        height: '70%',
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
                                            <View style={{ flexDirection: 'row' }}>
                                                <TouchableOpacity onPress={() => { this.setState({ filteranakpengelola: false }) }}>
                                                    <Image source={Union} style={{ width: 15, height: 15, marginLeft: 10, marginRight: 10, marginTop: 5 }}></Image>
                                                </TouchableOpacity>
                                                <Text style={{ fontWeight: 'bold', fontSize: 18, textAlign: 'center' }}> Filter</Text>
                                            </View>


                                            <View>
                                                <Text style={{ marginLeft: 10, marginBottom: 10, marginTop: 10 }}>Jenis Anak</Text>
                                                <View style={{ flexDirection: 'row', justifyContent: 'space-around', }}>
                                                    <TouchableOpacity style={style.btnFilt}>
                                                        <Text style={{ textAlign: 'center' }}>Tahfidz</Text>
                                                    </TouchableOpacity>
                                                    <TouchableOpacity style={style.btnFilt}>
                                                        <Text style={{ textAlign: 'center' }}>Non-Tahfidz</Text>
                                                    </TouchableOpacity>
                                                </View>

                                            </View>
                                            <View>
                                                <Text style={{ marginLeft: 10, marginBottom: 10, marginTop: 10 }}>Jenis Anak</Text>
                                                <View style={{ flexDirection: 'row', justifyContent: 'space-around', }}>
                                                    <TouchableOpacity style={style.btnFilt}>
                                                        <Text style={{ textAlign: 'center' }}>Laki-laki</Text>
                                                    </TouchableOpacity>
                                                    <TouchableOpacity style={style.btnFilt}>
                                                        <Text style={{ textAlign: 'center' }}>Perempuan</Text>
                                                    </TouchableOpacity>
                                                </View>
                                            </View>

                                            <View>
                                                <Text style={{ marginLeft: 10, marginBottom: 10, marginTop: 10 }}>Pendidikan</Text>
                                                <View style={{ flexDirection: 'row' }}>
                                                    <TouchableOpacity style={style.btnFilt}>
                                                        <Text style={{ textAlign: 'center' }}>SD</Text>
                                                    </TouchableOpacity>
                                                    <TouchableOpacity style={style.btnFilt}>
                                                        <Text style={{ textAlign: 'center' }}>SMP</Text>
                                                    </TouchableOpacity>
                                                </View>
                                                <View style={{ flexDirection: 'row' }}>
                                                    <TouchableOpacity style={style.btnFilt}>
                                                        <Text style={{ textAlign: 'center' }}>SMA</Text>
                                                    </TouchableOpacity>
                                                    {/* <TouchableOpacity style={style.btnFilt1}>
                                                    <Text style={{ textAlign: 'center' }}>Perguruan Tinggi</Text>
                                                </TouchableOpacity> */}
                                                </View>
                                            </View>


                                            {/* <Text style={{ marginLeft: 10, marginBottom: 10, marginTop: 10 }}>Waktu Aktivitas</Text>
                                            <RadioForm
                                                radio_props={tgl}
                                                onPress={(tgl) => {
                                                    this.setState({ tgl: tgl }),
                                                        ToastAndroid.show(tgl.toString(), ToastAndroid.SHORT)
                                                }}
                                                initial={0}
                                                buttonSize={10}
                                                buttonOuterSize={20}
                                                radioStyle={{ margin: 10, }}
                                                animation={true}
                                                formHorizontal={false}
                                            >
                                            </RadioForm>
                                        </View>
                                        {this.state.tgl === 'Pilih' ?
                                            <View>
                                                <DatePicker
                                                    date={this.state.date}
                                                    placeholder="select date"
                                                    onDateChange={(date) =>
                                                        this.setState({ date }, () => console.log(this.state.date))
                                                    }
                                                    androidVariant="nativeAndroid"
                                                    mode='date'
                                                />
                                            </View>
                                            :
                                            <View></View>
                                        } */}
                                            <View style={{ alignContent: 'center', justifyContent: 'center', alignItems: 'center', marginBottom: 50, flexDirection: 'row' }}>
                                                <Text
                                                    style={style.btnSimpanbaru}
                                                    onPress={() => {
                                                        this.setState({ filteranakpengelola: false })
                                                    }}>Terapkan</Text>
                                            </View>
                                        </SafeAreaView>
                                    </View>
                                </View>
                            </Modal>



                            <Modal
                                animationType={"slide"}
                                transparent={true}
                                visible={this.state.modaldetailadmin}
                                style={{
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}>
                                <View style={style.ModalCont2}>
                                    <View style={{
                                        paddingTop: 5,
                                        backgroundColor: '#ffffff',
                                        // flexDirection: 'row',
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
                                        <Text style={style.itemText}>Detail</Text>
                                        <ScrollView style={{ width: '100%', height: '100%' }}>
                                            <View style={style.detailgmbr}>
                                                <Image source={{ uri: 'https://www.kilauindonesia.org/datakilau/gambarDonatur/' + detak.gambar_donatur }} style={{ justifyContent: 'center', alignItems: 'center', height: 200, width: '50%', }} />
                                            </View>
                                            <Collapse>
                                                <CollapseHeader>
                                                    <View style={style.coltom}>
                                                        <Text style={{ marginLeft: 25, color: '#7e7e7e', fontSize: 14, textAlign: 'center' }}>Data Diri</Text>
                                                        <Image source={arrow} style={{
                                                            padding: 10,
                                                            margin: 5,
                                                            height: 20,
                                                            width: 20,
                                                            position: 'absolute',
                                                            resizeMode: 'stretch',
                                                            alignItems: 'center',
                                                            right: 15,
                                                            top: 5,
                                                        }}></Image>
                                                    </View>
                                                </CollapseHeader>
                                                <CollapseBody>

                                                    <View style={style.detail}>
                                                        <Text style={{
                                                            padding: 10, fontSize: 12, fontWeight: 'bold',
                                                        }}>Nama Lengkap:{detak.nama} </Text>
                                                        <Text style={{
                                                            fontSize: 12, fontWeight: 'bold', padding: 10,
                                                        }}>Jenis Kelamin:{detak.jk}</Text>
                                                        <Text style={{
                                                            fontSize: 12, fontWeight: 'bold', padding: 10,
                                                        }}>Email:{detak.email}</Text>
                                                        <Text style={{
                                                            fontSize: 12, fontWeight: 'bold', padding: 10,
                                                        }}>Alamat:{detak.alamat}</Text>
                                                        <Text style={{
                                                            fontSize: 12, fontWeight: 'bold', padding: 10,
                                                        }}>Kota:{detak.kota}</Text>
                                                        <Text style={{
                                                            fontSize: 12, fontWeight: 'bold', padding: 10,
                                                        }}>Nomor HP:{detak.no_hp}</Text>
                                                    </View>
                                                </CollapseBody>
                                            </Collapse>

                                            <Collapse>
                                                <CollapseHeader>
                                                    <View style={style.coltom}>
                                                        <Text style={{ marginLeft: 25, color: '#7e7e7e', fontSize: 14, textAlign: 'center' }}>Aktifitas</Text>
                                                        <Image source={arrow} style={{
                                                            padding: 10,
                                                            margin: 5,
                                                            height: 20,
                                                            width: 20,
                                                            position: 'absolute',
                                                            resizeMode: 'stretch',
                                                            alignItems: 'center',
                                                            right: 15,
                                                            top: 5,
                                                        }}></Image>
                                                    </View>
                                                </CollapseHeader>
                                                <CollapseBody>

                                                    <View style={style.detail}>
                                                        <Text> Aktifitas Anak Asuh</Text>
                                                        <Image style={{
                                                            padding: 10,
                                                            margin: 5,
                                                            height: 20,
                                                            width: 20,
                                                            position: 'absolute',
                                                            resizeMode: 'stretch',
                                                            alignItems: 'center',
                                                            right: 15,
                                                            top: 5,
                                                        }}></Image>
                                                    </View>
                                                </CollapseBody>
                                            </Collapse>

                                            <Collapse>
                                                <CollapseHeader>
                                                    <View style={style.coltom}>
                                                        <Text style={{ marginLeft: 25, color: '#7e7e7e', fontSize: 14, textAlign: 'center' }}>Detail Hadir</Text>
                                                        <Image source={arrow} style={{
                                                            padding: 10,
                                                            margin: 5,
                                                            height: 20,
                                                            width: 20,
                                                            position: 'absolute',
                                                            resizeMode: 'stretch',
                                                            alignItems: 'center',
                                                            right: 15,
                                                            top: 5,
                                                        }}></Image>
                                                    </View>
                                                </CollapseHeader>
                                                <CollapseBody>

                                                    <View style={style.detail}>
                                                        <View style={{ padding: 10, flexDirection: 'row', justifyContent: 'space-around' }}>
                                                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                                                <Text style={{ color: '#51C95D', fontWeight: 'bold' }}>{this.state.hadirbaw}</Text>
                                                                <Text style={{ fontSize: 14, color: '#353739', }}> 0 Hadir</Text>
                                                            </View>
                                                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                                                <Text style={{ color: '#FF845D', fontWeight: 'bold' }}>{this.state.terlambatbaw}</Text>
                                                                <Text style={{ fontSize: 14, color: '#353739', }}> 0 Tidak Hadir </Text>
                                                            </View>
                                                        </View>
                                                    </View>
                                                </CollapseBody>
                                            </Collapse>




                                            <View style={{ alignContent: 'center', justifyContent: 'center', alignItems: 'center', padding: 10, flexDirection: 'row' }}>
                                                <Text
                                                    style={style.btnSimpanUn1}
                                                    onPress={() => {
                                                        this.setState({ detak: [], modaldetailadmin: false })
                                                    }}>Kembali</Text>
                                                {/* <Text
                                    style={style.btnSimpanDark}
                                    onPress={() => { this.setState({ modalhistori: true }) }}
                                >Tambah
                                </Text> */}

                                                {/* <Text
                                    style={style.btnSimpanDark}
                                    onPress={() => this.props.navigation.navigate('Tamrap', this.setState({ modaldetail: false }))}>Tambah Rapot
                                </Text> */}
                                            </View>
                                            {/* <TouchableOpacity style={style.refresh} onPress={() => this.togleTambah(true)}>
              <Image source={search} style={style.tambah}></Image>
            </TouchableOpacity> */}

                                        </ScrollView>
                                    </View>
                                </View>
                            </Modal>

                        </SafeAreaView >
                        :
                        <View />
                }

                <Modal
                    animationType={"slide"}
                    transparent={true}
                    visible={this.state.jk}
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
                            height: '30%',
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
                                <View style={{ flexDirection: 'row' }}>
                                    <TouchableOpacity onPress={() => { this.setState({ jk: false }) }}>
                                        <Image source={Union} style={{ width: 15, height: 15, marginLeft: 10, marginRight: 10, marginTop: 5 }}></Image>
                                    </TouchableOpacity>
                                    <Text style={{ fontWeight: 'bold', fontSize: 18 }}> Pilih Jenis Kelamin</Text>
                                </View>

                                <View style={{ marginBottom: 25, marginLeft: 30 }}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignContent: 'space-between' }}>
                                        {/* <View style={{ marginLeft: -30, marginRight: 120, }}>
                      <Text style={{ margin: 15 }}>Semua Anak</Text>
                      <Text style={{ margin: 15 }}>Tahfidz</Text>
                      <Text style={{ margin: 15 }}>Non-Tahfidz</Text>
                    </View> */}

                                        <RadioForm
                                            radio_props={this.state.jenisK}
                                            onPress={(jenisK) => { ToastAndroid.show(jenisK.toString(), ToastAndroid.SHORT) }}
                                            initial={0}
                                            buttonSize={10}
                                            buttonOuterSize={20}
                                            radioStyle={{ marginRight: -20, marginBottom: 20, marginTop: 10 }}
                                            animation={true}
                                            formHorizontal={false}
                                        >
                                        </RadioForm>
                                    </View>

                                    <View style={{ alignContent: 'center', justifyContent: 'center', alignItems: 'center', }}>
                                        <TouchableOpacity style={style.btnSimpan}>
                                            <Text style={{ color: '#fff' }}> Terapkan</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </SafeAreaView>
                        </View>
                    </View>
                </Modal>

                <Modal
                    animationType={"slide"}
                    transparent={true}
                    visible={this.state.modaldate}
                    style={{
                        alignItems: 'center',
                        justifyContent: 'center',

                    }}>
                    <View style={style.ModalCont2}>
                        <View style={{
                            paddingTop: 5,
                            backgroundColor: '#ffffff',
                            // flexDirection: 'row',
                            borderTopLeftRadius: 10,
                            borderTopRightRadius: 10,
                            height: '27%',
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
                            <Text style={style.tglText}>Pilih Tanggal</Text>
                            <ScrollView style={{ width: '100%', height: '100%' }}>

                                <TouchableOpacity onPress={() => this.setState({ modaldate: false })} style={{ position: 'absolute', right: 20, top: 20 }}>
                                    <Image source={x}
                                        style={{
                                            height: 30,
                                            width: 30, alignItems: 'center',
                                        }}></Image>
                                </TouchableOpacity>
                                <DatePicker
                                    date={this.state.date}
                                    placeholder="select date"
                                    onDateChange={(date) =>
                                        this.setState({ date }, () => console.log(this.state.date))
                                    }
                                    androidVariant="nativeAndroid"
                                    mode='date'

                                />
                            </ScrollView>

                        </View>
                    </View>
                </Modal>

                <Modal
                    animationType={"slide"}
                    transparent={true}
                    visible={this.state.modaldate1}
                    style={{
                        alignItems: 'center',
                        justifyContent: 'center',

                    }}>
                    <View style={style.ModalCont2}>
                        <View style={{
                            paddingTop: 5,
                            backgroundColor: '#ffffff',
                            // flexDirection: 'row',
                            borderTopLeftRadius: 10,
                            borderTopRightRadius: 10,
                            height: '27%',
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
                            <Text style={style.tglText}>Pilih Tanggal</Text>
                            <ScrollView style={{ width: '100%', height: '100%' }}>

                                <TouchableOpacity onPress={() => this.setState({ modaldate1: false })} style={{ position: 'absolute', right: 20, top: 20 }}>
                                    <Image source={x}
                                        style={{
                                            height: 30,
                                            width: 30, alignItems: 'center',
                                        }}></Image>
                                </TouchableOpacity>
                                <DatePicker
                                    date={this.state.date}
                                    placeholder="select date"
                                    onDateChange={(date1) =>
                                        this.setState({ date1 }, () => console.log(this.state.date1))
                                    }
                                    androidVariant="nativeAndroid"
                                    mode='date'

                                />
                            </ScrollView>
                        </View>
                    </View>
                </Modal>

                <Modal
                    animationType={"slide"}
                    transparent={true}
                    visible={this.state.st}
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
                            height: '50%',
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
                            <ScrollView style={{ width: '100%', height: '100%' }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <TouchableOpacity onPress={() => { this.setState({ st: false }) }}>
                                        <Image source={Union} style={{ width: 15, height: 15, marginLeft: 10, marginRight: 10, marginTop: 5 }}></Image>
                                    </TouchableOpacity>
                                    <Text style={{ fontWeight: 'bold', fontSize: 18 }}> Pilih Tanggal</Text>
                                </View>

                                <View style={{ marginBottom: 50, }}>
                                    <View style={{ marginBottom: 25, marginLeft: 30 }}>
                                        <View>


                                            <RadioForm
                                                radio_props={tgl}
                                                onPress={(tgl) => {
                                                    this.setState({ tgl: tgl }),
                                                        ToastAndroid.show(tgl.toString(), ToastAndroid.SHORT)
                                                }}
                                                initial={0}
                                                buttonSize={10}
                                                buttonOuterSize={20}
                                                radioStyle={{ marginRight: -20, marginBottom: 20, marginTop: 10 }}
                                                animation={true}
                                                formHorizontal={false}
                                            >
                                            </RadioForm>
                                        </View>
                                    </View>
                                    {this.state.tgl === 'Pilih' ?
                                        <View style={{}}>
                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                                                <Text style={{ flex: 1, color: '#000', marginTop: 10, fontFamily: 'Poppins-Regular', fontSize: 11 }}>
                                                    Mulai dari
                                                </Text>
                                                <Text style={{ flex: 1, color: '#000', marginTop: 10, fontFamily: 'Poppins-Regular', fontSize: 11 }}>
                                                    Sampai
                                                </Text>
                                            </View>

                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

                                                <TouchableOpacity style={{ marginTop: 10, flex: 1, }} onPress={() => this.setState({ modaldate: true })}>
                                                    <Text style={{ color: '#000', width: '45%', fontFamily: 'Poppins-Regular', fontSize: 15, borderBottomWidth: 1 }}>{this.state.date.toLocaleDateString('default')}</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity style={{ marginTop: 10, flex: 1, }} onPress={() => this.setState({ modaldate1: true })}>
                                                    <Text style={{ color: '#000', width: '45%', fontFamily: 'Poppins-Regular', fontSize: 15, borderBottomWidth: 1 }}>{this.state.date1.toLocaleDateString('default')}</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                        :
                                        <View></View>
                                    }
                                </View>
                                <View style={{ alignContent: 'center', justifyContent: 'center', alignItems: 'center', }}>
                                    <TouchableOpacity style={style.btnSimpan}>
                                        <Text style={{ color: '#fff' }}> Terapkan</Text>
                                    </TouchableOpacity>
                                </View>

                            </ScrollView>
                        </View>
                    </View>
                </Modal>

                <Modal
                    animationType={"slide"}
                    transparent={true}
                    visible={this.state.sa}
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
                            height: '30%',
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
                                <View style={{ flexDirection: 'row', margin: 10 }}>
                                    <TouchableOpacity onPress={() => { this.setState({ sa: false }) }}>
                                        <Image source={Union} style={{ width: 15, height: 15, marginLeft: 10, marginRight: 10, marginTop: 5 }}></Image>
                                    </TouchableOpacity>
                                    <Text style={{ fontWeight: 'bold', fontSize: 18 }}> Pilih Jenis Anak</Text>
                                </View>

                                <View style={{ marginBottom: 25, marginLeft: 30 }}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignContent: 'space-between' }}>
                                        {/* <View style={{ marginLeft: -30, marginRight: 120, }}>
                      <Text style={{ margin: 15 }}>Semua Anak</Text>
                      <Text style={{ margin: 15 }}>Tahfidz</Text>
                      <Text style={{ margin: 15 }}>Non-Tahfidz</Text>
                    </View> */}

                                        <RadioForm
                                            radio_props={this.state.jenisA}
                                            onPress={(value) => { ToastAndroid.show(value.toString(), ToastAndroid.SHORT) }}
                                            initial={0}
                                            buttonSize={10}
                                            buttonOuterSize={20}
                                            radioStyle={{ marginRight: -20, marginBottom: 20, marginTop: 10 }}
                                            animation={true}
                                            formHorizontal={false}
                                        >
                                        </RadioForm>
                                    </View>

                                    <View style={{ alignContent: 'center', justifyContent: 'center', alignItems: 'center', marginTop: -10 }}>
                                        <TouchableOpacity style={style.btnSimpan}>
                                            <Text style={{ color: '#fff' }}> Terapkan</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </SafeAreaView>
                        </View>
                    </View>
                </Modal>







            </View >

        )
    }
}
const style = StyleSheet.create({
    contentContainer: {
        backgroundColor: '#fff',
        flex: 1,
    },
    kolomkecil: {
        backgroundColor: '#00A9B8',
        width: '100%',
        height: 200,
        marginTop: -150,
    },
    kolomkecil1: {
        width: '90%',
        height: 60,
        marginTop: 15,
        justifyContent: 'space-around',
        alignContent: 'space-around',
        alignItems: 'center',
        alignSelf: 'center',
        borderRadius: 15,
        flexDirection: 'row',
        textAlign: 'center',
    },
    labeldlm: {
        fontSize: 10,
        color: '#fff',
        marginTop: 3,
    },
    containerfoto: {
        marginTop: 40,
        marginLeft: 75,
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
        flexDirection: 'row',
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
        width: '40%',
        backgroundColor: '#87cefa',
        borderRadius: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: '#E9E9E9',
        justifyContent: 'space-between', alignContent: 'space-between',
        marginRight: 10,
        marginTop: 10,

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
        marginTop: 10,
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
        marginTop: 10,
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
    coltom1: {
        width: '100%',
        marginTop: 20,
        fontSize: 16,
        flexDirection: 'row',
        padding: 10,
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
    coltom2: {
        width: '100%',
        fontSize: 16,
        flexDirection: 'row',
        padding: 10,
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
    item2: {
        padding: 10,
        height: 120, width: '30%',
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
        shadowColor: "#333",
        shadowOffset: {
            width: 1,
            height: 1,
        },
        shadowOpacity: 0.3,
        shadowRadius: 2,

        elevation: 3,
        alignItems: 'center',
        justifyContent: 'center'
    },
    imgSmall: {
        position: 'absolute', flex: 1, alignItems: 'center', justifyContent: 'center'
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
        marginLeft: 30,
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
        textAlign: 'center',
        fontSize: 14,
    },
    Labeltmb: {
        padding: 5,
        color: '#fff',
        marginLeft: 10,
        marginTop: 20,
        fontWeight: 'bold',
        textAlign: 'center',
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
        width: '90%',
        padding: 10,
        marginLeft: 20,
        justifyContent: 'center',
        alignContent: 'center',
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
    Label1: {
        marginTop: 10,
        marginLeft: 15,
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#000000',
    },
    Label2: {
        marginTop: 5,
        marginLeft: 25,
        padding: 5,
        color: '#000',
        alignItems: 'center',
        justifyContent: 'center'
    },
    Label3: {
        marginTop: 10,
        textAlign: 'center',
        color: '#000000',
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
    kkk: {
        flexDirection: 'row',
        width: '40%',
        backgroundColor: '#87cefa',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#E9E9E9',
        justifyContent: 'space-between',
        marginRight: 10,
        marginTop: 10,

    },
    itemText: {
        textAlign: 'center',
        color: 'black',
        fontSize: 16,
        width: '100%',
        height: 50
    },
    item: {
        flex: 1,
        fontSize: 16,
        flexDirection: 'row',
        padding: 10,
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
    list: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        padding: 10,
        marginVertical: 8,
        marginHorizontal: 8,
        backgroundColor: '#fff',
        shadowColor: "#333",
        shadowOffset: {
            width: 1,
            height: 1,
        },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        elevation: 3,
        borderRadius: 5,
        borderColor: '#7e7e7e',
        height: width / numColumns,
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
        height: 20,
        width: 20,
        alignItems: 'center',
    },
    itemflat: {
        flex: 1,
        fontSize: 12,
        flexDirection: 'row',
        marginLeft: 20,
        padding: 10,
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
    btnSimpan: {
        width: '60%',
        fontWeight: 'bold',
        backgroundColor: '#00A9B8',
        borderRadius: 10,
        padding: '4%',
        borderWidth: 1,
        borderColor: '#E9E9E9',
        justifyContent: 'center', alignItems: 'center',
        alignContent: 'center',
        textAlign: 'center',
    },
    btnSimpanbaru: {
        width: '40%',
        fontWeight: 'bold',
        backgroundColor: '#00A9B8',
        borderRadius: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: '#00A9B8',
        justifyContent: 'center', alignItems: 'center',
        textAlign: 'center',
        color: '#fff'
    },
    iconbesar: {
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
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
    kotakbaru1: {
        shadowColor: "#333",
        shadowOffset: {
            width: 1,
            height: 1,
        },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        elevation: 3,
        width: '90%',
        height: 100,
        borderRadius: 15,
        borderWidth: 1,
        marginLeft: 20,
        marginTop: 10,
        borderColor: '#E9E9E9',
        backgroundColor: '#fff',
        flexDirection: 'row',
    },
    refresh: {
        padding: 10,
        bottom: 0,
        top: 650,

        left: 0,
        borderRadius: 5,
        // marginHorizontal: 5,
        height: 45,
    },
    bottom: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        borderRadius: 15,
        paddingLeft: 15,
        paddingRight: 15,
    },
    actionButtonIcon: {
        fontSize: 14,
        color: 'black',
    },
    btnFilt: {
        width: '30%',
        borderRadius: 10,
        padding: 10,
        borderWidth: 1,
        color: '#fff',
        borderColor: '#E9E9E9',
        margin: 10,
    },
    btnFilt1: {
        width: '50%',
        borderRadius: 10,
        padding: 10,
        borderWidth: 1,
        color: '#fff',
        borderColor: '#E9E9E9',
    },
    kotak7: {
        marginTop: 10,
        color: '#000',
        borderRadius: 10,
        borderWidth: 0.1,
        fontSize: 13,
        height: 50,
        width: windowWidth - 130,
        padding: 12,
        backgroundColor: '#fff',
        borderColor: '#DDDDDD',
        borderWidth: 1,
        fontFamily: 'Poppins-Regular',
    },
    btnSimpan2: {
        borderWidth: 1,
        borderColor: '#00A9B8',
        borderRadius: 10,
        padding: '4%',
        marginTop: '6%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnSimpan3: {
        backgroundColor: '#00A9B8',
        width: '60%',
        borderWidth: 1,
        borderColor: '#fff',
        borderRadius: 10,
        padding: '4%',
        marginTop: '6%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    IconCari: {
        position: 'absolute',
        top: 8,
        left: 20,
    },
    itemflat2: {
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
    // transform: [{ rotate: '90deg'}] ini untuk tulisan kebawah
});

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
export default connect(mapStateToProps, mapDispatchToProps)(List_anak);

