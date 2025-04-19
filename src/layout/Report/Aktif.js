import {
    Text, View, RefreshControl, TouchableOpacity, TextInput,
    FlatList, StyleSheet, Image, Modal, SafeAreaView, ScrollView, Dimensions
} from 'react-native'
import React, { Component } from 'react'
import { IconCari, FilterdanText, LocationsH, TingkatH, JenisH } from '../../assets/icons';
import { test, Union, x } from '../../assets/images';
import { Picker } from '@react-native-picker/picker';
var RNFS = require('react-native-fs');
import XLSX from 'xlsx';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
export class Kehadiran extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            anak: [],
            filter: [],
            fil: false,
            date: new Date(),
            date1: new Date(),
            modaldate1: false,
            modaldate: false,
            shel: '',
            shelter: [],
            bulan: '',
            Tahun: '',
            setOpen: '',
            setDate: '',
            chosenDate: '',
            refreshing: true
        };

    }
    // getAnakAPi() {
    //     fetch('https://kilauindonesia.org/datakilau/api/penkehadiran')
    //         .then(res => {
    //             if (res.status === 200) return res.json();
    //         })
    //         .then(resdata => {
    //             console.log(resdata.data);
    //             this.setState({
    //                 anak: resdata.data,
    //                 filter: resdata.data,
    //                 refreshing: false,
    //             });
    //         });
    // }

    getAnakAPi() {
        fetch('https://kilauindonesia.org/datakilau/api/joindataanak')
            .then(res => {
                if (res.status === 200) return res.json();
            })
            .then(resdata => {
                console.log(resdata.data);
                this.setState({
                    anak: resdata.data,
                    filter: resdata.data,
                    refreshing: false,
                });
            });
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
                });
            });
    }
    onRefresh() {
        this.getAnakAPi();
        this.setState({ refreshing: false });
    }
    filterList(textToSearch) {
        this.setState({
            filter: this.state.anak
                .filter(i => i.status_validasi === 'aktif' &&
                    i.full_name.toLowerCase(textToSearch).includes(textToSearch) || i.status_cpb === this.state.JenisS && i.nama_shelter === this.state.shel),
        })
    }
    semuaanak = () => {

        let wb = XLSX.utils.book_new();
        let ws = XLSX.utils.json_to_sheet(this.state.filter)
        XLSX.utils.book_append_sheet(wb, ws, "Users")
        const wbout = XLSX.write(wb, { type: 'binary', bookType: "xlsx" });

        // Write generated excel to Storage
        RNFS.writeFile(RNFS.DownloadDirectoryPath + '/Jumlah_Kehadiran_Anak.xlsx', wbout, 'ascii').then((r) => {
            console.log('Success');
        }).catch((e) => {
            console.log('Error', e);
        });

    }
    componentDidMount() {
        this.getAnakAPi();
        this.getShelterAPi();
    }
    render() {
        let { pilih } = this.state;
        let { JenisA } = this.state;
        let { Jenis1 } = this.state;
        let { JenisS } = this.state;
        let { lebih100 } = this.state

        return (
            <View style={{ backgroundColor: '#FFF', flex: 1 }}>
                <View style={{ backgroundColor: '#0EBEDF', height: 90 }}>

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
                                this.filterList(text.toLowerCase()), this.setState({ text: text })
                            }}
                            value={this.state.text}
                            placeholder="Cari"
                            placeholderTextColor="#C0C0C0"
                            underlineColorAndroid="transparent"
                        />
                        <IconCari style={style.IconCari} name="your-icon" size={20} />
                        <View style={{ borderColor: '#FFF', borderWidth: 1, padding: 7, width: 90, marginLeft: 10, borderRadius: 5 }}>
                            <TouchableOpacity
                                onPress={() => {
                                    this.setState({ fil: true });
                                }}>
                                <FilterdanText />
                            </TouchableOpacity>
                        </View>

                    </View>
                </View>
                {/* <Text>{this.state.anak.full_name}</Text> */}
                <FlatList
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={() => this.onRefresh()}
                        />
                    }
                    style={{ marginBottom: 25 }}
                    data={this.state.filter}
                    renderItem={({ item, index }) => (

                        <View style={{}}>
                            <TouchableOpacity
                                onPress={() => this.props.navigation.navigate('DetailAktif', { item: item })}>

                                <View style={style.itemflat}>
                                    <View style={{
                                        width: '10%', justifyContent: 'center',
                                        backgroundColor: item.status_cpb === 'CPB' ? '#0076B8' : '#000' &&
                                            item.status_cpb === 'PB' ? '#00B855' : '#000' && item.status_cpb === 'NPB' ? '#E32845' : '#000' && item.status_cpb === 'BCPB' ? '#FFBB0C' : '#c0c0c0'
                                    }}>
                                        <View style={{ width: '40%', justifyContent: 'center', alignItems: 'center', alignSelf: 'center', alignContent: 'center' }}>
                                            <Text style={{ fontSize: 12, fontFamily: 'Poppins-Medium', color: '#fff' }}>{item.status_cpb}</Text>
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

                                                    <Text style={{ color: '#000', fontFamily: 'Poppins-Medium', fontSize: 12, marginLeft: 10, }}>
                                                        {item.full_name}
                                                    </Text>
                                                    <View style={{ flexDirection: 'row' }}>
                                                        <View style={{ flexDirection: 'row', }}>
                                                            <TingkatH style={{ marginLeft: 10, }} />
                                                            <Text style={{ color: '#000', fontSize: 10, fontFamily: 'Poppins-Regular', marginLeft: 5 }}>{item.jenjang}</Text>
                                                        </View>

                                                        <View style={{ flexDirection: 'row', }}>
                                                            <LocationsH style={{ marginLeft: 10, }} />
                                                            {
                                                                item.nama_shelter === '' | item.nama_shelter === 'null' | item.nama_shelter === null ?
                                                                    <Text style={style.labelkanan}>Belum Memasukan/Tidak Ada Shelter</Text>
                                                                    :
                                                                    <Text style={{ color: '#000', fontSize: 10, fontFamily: 'Poppins-Regular', marginLeft: 5 }}>{item.nama_shelter}</Text>
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

                    )
                    }></FlatList >

                <Modal
                    animationType={'slide'}
                    transparent={true}
                    onRequestClose={() => this.setState({ fil: false })}
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
                                height: '90%',
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

                                {/* <View style={style.form}>
                                    <Text style={{ fontWeight: 'bold', fontSize: 14, fontFamily: 'Poppins-SemiBold', color: '#000', marginTop: '4%', }}>Bulan</Text>
                                    <View style={style.kotakpicker}>
                                        <Picker
                                            style={style.Textinputcss}
                                            selectedValue={this.state.bulan}
                                            onValueChange={itemValue =>
                                                this.setState({ bulan: itemValue, show: 1 })
                                            }>
                                            <Picker.Item label="Pilih Bulan" value="" />
                                            <Picker.Item label="Januari" value="January" />
                                            <Picker.Item label="Februari" value="February" />
                                            <Picker.Item label="Maret" value="March" />
                                            <Picker.Item label="April" value="April" />
                                            <Picker.Item label="Mei" value="May" />
                                            <Picker.Item label="Juni" value="June" />
                                            <Picker.Item label="Juli" value="July" />
                                            <Picker.Item label="Agustus" value="August" />
                                            <Picker.Item label="September" value="September" />
                                            <Picker.Item label="Oktober" value="October" />
                                            <Picker.Item label="November" value="November" />
                                            <Picker.Item label="Desember" value="Desember" />

                                        </Picker>
                                    </View>
                                </View>
                                
                                <View style={style.form}>
                                    <Text style={{ fontWeight: 'bold', fontSize: 14, fontFamily: 'Poppins-SemiBold', color: '#000', marginTop: '4%', }}>Tahun</Text>
                                    <View style={style.kotakpicker}>
                                        <Picker
                                            style={style.Textinputcss}
                                            selectedValue={this.state.Tahun}
                                            onValueChange={itemValue =>
                                                this.setState({ Tahun: itemValue, show: 1 })
                                            }>
                                            <Picker.Item label="Pilih Tahun" value="" />
                                            <Picker.Item label="2018" value="2018" />
                                            <Picker.Item label="2019" value="2019" />
                                            <Picker.Item label="2020" value="2020" />
                                            <Picker.Item label="2021" value="2021" />
                                            <Picker.Item label="2022" value="2022" />
                                            <Picker.Item label="2023" value="2023" />
                                            <Picker.Item label="2024" value="2024" />
                                            <Picker.Item label="2025" value="2025" />
                                            <Picker.Item label="2026" value="2026" />
                                            <Picker.Item label="2027" value="2027" />
                                            <Picker.Item label="2028" value="2028" />
                                            <Picker.Item label="2029" value="2029" />

                                        </Picker>
                                    </View>
                                </View> */}

                                <View style={style.form}>
                                    <Text style={{ fontWeight: 'bold', fontSize: 14, fontFamily: 'Poppins-SemiBold', color: '#000', marginTop: '4%', }}>Shelter</Text>
                                    <View style={style.kotakpicker}>
                                        <Picker
                                            style={style.Textinputcss}
                                            selectedValue={this.state.shel}
                                            onValueChange={itemValue =>
                                                this.setState({ shel: itemValue, show: 1 })
                                            }>
                                            <Picker.Item label="Pilih Shelter" value="" />
                                            {
                                                this.state.shelter.map((shel, index) =>
                                                    <Picker.Item style={{ height: '100%', width: '100%', fontSize: 12, }} label={shel.nama_shelter} value={shel.nama_shelter} key={index} />
                                                )}
                                        </Picker>
                                    </View>
                                </View>
                                {/* <Text style={{ fontWeight: 'bold', fontSize: 14, fontFamily: 'Poppins-SemiBold', color: '#000', marginTop: 20, }}>
                                    Jenis Anak
                                </Text>
                                <View style={{ flexDirection: 'row', marginTop: '4%' }}>
                                    <TouchableOpacity
                                        style={[style.types, { backgroundColor: JenisA === 'Non-Tahfidz' ? '#00A9B8' : '#fff' }]}
                                        onPress={() => this.setState({ JenisA: 'Non-Tahfidz' })}
                                    >
                                        <Text style={{ color: JenisA === 'Non-Tahfidz' ? '#fff' : '#5D5C5D', fontFamily: 'Poppins-Regular', fontSize: 14 }}>
                                            Non-Tahfidz
                                        </Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        style={[style.types, { backgroundColor: JenisA === 'Tahfidz' ? '#00A9B8' : '#fff', }]}
                                        onPress={() => this.setState({ JenisA: 'Tahfidz' })}
                                    >
                                        <Text style={{ color: JenisA === 'Tahfidz' ? '#fff' : '#5D5C5D', fontFamily: 'Poppins-Regular', fontSize: 14 }}>
                                            Tahfidz
                                        </Text>
                                    </TouchableOpacity>
                                </View> */}


                                {/* <Text style={{ fontWeight: 'bold', fontSize: 14, fontFamily: 'Poppins-SemiBold', color: '#000', marginTop: '4%', }}>
                                    Jenis Kelamin
                                </Text>

                                <View>

                                    <View style={{ flexDirection: 'row', marginTop: '4%' }}>
                                        <TouchableOpacity
                                            style={[style.types, { backgroundColor: JenisK === 'Laki-Laki' ? '#00A9B8' : '#fff' }]}
                                            onPress={() => this.setState({ JenisK: 'Laki-Laki' })}
                                        >
                                            <Text style={{ color: JenisK === 'Laki-Laki' ? '#fff' : '#5D5C5D', fontFamily: 'Poppins-Regular', fontSize: 14 }}>
                                                Laki-laki
                                            </Text>
                                        </TouchableOpacity>

                                        <TouchableOpacity
                                            style={[style.types, { backgroundColor: JenisK === 'Perempuan' ? '#00A9B8' : '#fff', }]}
                                            onPress={() => this.setState({ JenisK: 'Perempuan' })}
                                        >
                                            <Text style={{ color: JenisK === 'Perempuan' ? '#fff' : '#5D5C5D', fontFamily: 'Poppins-Regular', fontSize: 14 }}>
                                                Perempuan
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <Text style={{ fontWeight: 'bold', fontSize: 14, fontFamily: 'Poppins-SemiBold', color: '#000', marginTop: '4%', }}>
                                    Pendidikan
                                </Text >

                                <View style={{ marginTop: 10, flexDirection: 'column' }}>

                                    <View style={{ flexDirection: 'row' }}>

                                        <TouchableOpacity
                                            style={[style.types, { backgroundColor: pilih === 'SD' ? '#00A9B8' : '#fff' }]}
                                            onPress={() => this.setState({ pilih: 'SD' }, () => console.log(this.state.pilih))}
                                        >
                                            <Text style={{ color: pilih === 'SD' ? '#fff' : '#5D5C5D', fontFamily: 'Poppins-Regular', fontSize: 14 }}>
                                                SD
                                            </Text>
                                        </TouchableOpacity>

                                        <TouchableOpacity
                                            style={[style.types, { backgroundColor: pilih === 'SMP' ? '#00A9B8' : '#fff', }]}
                                            onPress={() => this.setState({ pilih: 'SMP' }, () => console.log(this.state.pilih))}
                                        >
                                            <Text style={{ color: pilih === 'SMP' ? '#fff' : '#5D5C5D', fontFamily: 'Poppins-Regular', fontSize: 14 }}>
                                                SMP
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{ flexDirection: 'row', marginTop: '4%' }}>
                                        <TouchableOpacity
                                            style={[style.types, { backgroundColor: pilih === 'SMA' ? '#00A9B8' : '#fff' }]}
                                            onPress={() => this.setState({ pilih: 'SMA' }, () => console.log(this.state.pilih))}
                                        >
                                            <Text style={{ color: pilih === 'SMA' ? '#fff' : '#5D5C5D', fontFamily: 'Poppins-Regular', fontSize: 14 }}>
                                                SMA
                                            </Text>
                                        </TouchableOpacity>

                                        <TouchableOpacity
                                            style={[style.types, { backgroundColor: pilih === 'Kuliah' ? '#00A9B8' : '#fff' }]}
                                            onPress={() => this.setState({ pilih: 'Kuliah' }, () => console.log(this.state.pilih))}
                                        >
                                            <Text style={{ color: pilih === 'Kuliah' ? '#fff' : '#5D5C5D', fontFamily: 'Poppins-Regular', fontSize: 14 }}>
                                                Perguruan Tinggi
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                </View> */}

                                <Text style={{ fontWeight: 'bold', fontSize: 14, fontFamily: 'Poppins-SemiBold', color: '#000', marginTop: '4%', }}>
                                    Status Binaan
                                </Text>
                                <View style={{ flexDirection: 'row', marginTop: '4%' }}>
                                    <TouchableOpacity
                                        style={[style.types, { backgroundColor: JenisS === 'BCPB' ? '#00A9B8' : '#fff' }]}
                                        onPress={() => this.setState({ JenisS: 'BCPB' }, () => console.log(this.state.JenisS))}
                                    >
                                        <Text style={{ color: JenisS === 'BCPB' ? '#fff' : '#5D5C5D', fontFamily: 'Poppins-Regular', fontSize: 14 }}>
                                            BCPB
                                        </Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        style={[style.types, { backgroundColor: JenisS === 'CPB' ? '#00A9B8' : '#fff' }]}
                                        onPress={() => this.setState({ JenisS: 'CPB' }, () => console.log(this.state.JenisS))}
                                    >
                                        <Text style={{ color: JenisS === 'CPB' ? '#fff' : '#5D5C5D', fontFamily: 'Poppins-Regular', fontSize: 14 }}>
                                            CPB
                                        </Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        style={[style.types, { backgroundColor: JenisS === 'PB' ? '#00A9B8' : '#fff' }]}
                                        onPress={() => this.setState({ JenisS: 'PB' }, () => console.log(this.state.JenisS))}
                                    >
                                        <Text style={{ color: JenisS === 'PB' ? '#fff' : '#5D5C5D', fontFamily: 'Poppins-Regular', fontSize: 14 }}>
                                            PB
                                        </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={[style.types, { backgroundColor: JenisS === 'NPB' ? '#00A9B8' : '#fff' }]}
                                        onPress={() => this.setState({ JenisS: 'NPB' }, () => console.log(this.state.JenisS))}
                                    >
                                        <Text style={{ color: JenisS === 'NPB' ? '#fff' : '#5D5C5D', fontFamily: 'Poppins-Regular', fontSize: 14 }}>
                                            NPB
                                        </Text>
                                    </TouchableOpacity>
                                </View>

                                {/* <View style={{}}>
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
                                </View> */}


                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <TouchableOpacity style={style.btnSimpan} onPress={() => this.setState({ fil: false }, this.filterList())}>
                                        <Text style={{ color: '#fff', fontFamily: 'Poppins-Medium', fontSize: 15 }}> Terapkan</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={style.btnSimpan2} onPress={() => this.setState({ JenisS: [], shel: '' })}>
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
            </View>
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
    labelkiri: {
        fontSize: 12,
        fontWeight: 'bold',
        marginVertical: 5,
        marginLeft: 10,
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
    ModalCont2: {
        flex: 1,
        // alignItems: 'center',
        backgroundColor: '#00000079',
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
    btnSimpan2: {
        borderWidth: 1,
        borderColor: '#00A9B8',
        padding: '4%',
        borderRadius: 10,
        marginTop: '6%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    form: {
        paddingHorizontal: 10,
        width: '100%'
    },
    labelkiri: {
        fontSize: 12,
        fontWeight: 'bold',
        marginVertical: 5,
        marginLeft: 20,
        width: 100,
    },
    Textinputcss: {
        width: windowWidth - 200,
        color: '#C0C0C0',
        marginTop: -10,
        borderRadius: 10,
        borderWidth: 1,
        fontSize: 10,
        height: 40,
        borderColor: '#C0C0C0',
        fontFamily: 'Poppins-Regular',
    },
    kotakpicker: {
        marginTop: 10,
        paddingVertical: 5,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#DDD',
        width: windowWidth * 0.5,
        height: 40,
    },
    labelkanan: {
        fontSize: 12,
        marginHorizontal: 5,
        width: 150,
    },
});
export default Kehadiran