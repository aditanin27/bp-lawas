import {
    Text, View, TextInput, StyleSheet, Dimensions, FlatList,
    TouchableOpacity, Image, Alert, ScrollView, Modal, SafeAreaView, ToastAndroid
} from 'react-native'
import React, { Component } from 'react'
import { test, } from '../../assets/images';
import { Pluskecil } from '../../assets/icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import { Picker } from '@react-native-picker/picker';
import { connect } from 'react-redux';
import { LocationsH, TingkatH, JenisH, IconCari } from '../../assets/icons';
export class Pengajuan extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tujuan: 'Biaya Pengajuan Anak',
            status: 'Pending',
            // berupapb: '',
            berupa: '',
            anak: [],
            cari: '',
            detail: [],
            jumlah: [],
            harga: [],
            nama_barang: [],
            filter_sta: [],
            date: new Date(),
            seleksi: false,
            isSelected: false,
            select: [],
            stat: [],
            dapat: [],
            allbarang: [],
            count: 1,
            modalbarang: false,
            modaluang: false,
            uang: '',
            id_anak: '',



        };
    }
    componentDidMount() {
        this.GetPengajuanAPi();
        this.GetBarangAPi();
        console.log(this.GetBarangAPi())
    }


    GetPengajuanAPi() {
        AsyncStorage.getItem('token').then((token) => {
            fetch('https://kilauindonesia.org/datakilau/api/joindataanak', {
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
                        anak: resJson.data,
                        filter_sta: resJson.data,
                        refreshing: false,

                    });
                })
                .catch((err) => console.log('error catch home', err));
        });
    }

    GetBarangAPi() {
        AsyncStorage.getItem('token').then((token) => {
            fetch('https://kilauindonesia.org/datakilau/api/getpengajuanbarang', {
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
                        allbarang: resJson.data,


                    });
                })
                .catch((err) => console.log('error catch home', err));
        });
    }


    SimpanData(id_anak) {
        AsyncStorage.getItem('token').then((token) => {
            let dataToSend = {
                id_anak: id_anak,
                nama_barang: encodeURIComponent(JSON.stringify(this.state.nama_barang)),
                jumlah: encodeURIComponent(JSON.stringify(this.state.jumlah)),
                detail: encodeURIComponent(JSON.stringify(this.state.detail)),
                harga: encodeURIComponent(JSON.stringify(this.state.harga)),
                tanggal: moment(this.state.date).format('YYYY-MM-DD'),
                status: this.state.status,
                tujuan: this.state.tujuan,
                berupa: this.state.berupa,
                id_shelter: this.props.user.id_shelter,
            };
            let data = new FormData();

            for (let key in dataToSend) {
                data.append(key, dataToSend[key]);
            }
            console.log('kkkk', data);
            fetch('https://kilauindonesia.org/datakilau/api/tampengajuananakbarang', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: 'application/json',
                    'Content-Type': 'multipart/form-data'
                },
                body: data,
            })
                .then((res) => res.json())
                .then((resJson) => {
                    console.log(resJson);
                    if (resJson.status === 'sukses') {
                        this.props.navigation.navigate('ListPengajuan')
                        ToastAndroid.show("Data berhasil ditambah!", ToastAndroid.SHORT)
                    } else {
                        alert(
                            'Tolong isi Kolom barang dan jumlahnya '
                        )
                        ToastAndroid.show("gagal menyimpan", ToastAndroid.SHORT)
                    }
                })
                .catch((err) => console.log('dari catch send Data ===', err));
        });
    }

    Simpanuang() {
        AsyncStorage.getItem('token').then((token) => {
            let dataToSend = {
                id_anak: encodeURIComponent(JSON.stringify(this.state.select)),
                uang: this.state.uang,
                tanggal: moment(this.state.date).format('YYYY-MM-DD'),
                status: this.state.status,
                tujuan: this.state.tujuan,
                berupa: this.state.berupa,
                id_shelter: this.props.user.id_shelter,
            };
            let data = new FormData();

            for (let key in dataToSend) {
                data.append(key, dataToSend[key]);
            }
            console.log('kkkk', data);
            fetch('https://kilauindonesia.org/datakilau/api/tampengajuananak', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: 'application/json',
                    'Content-Type': 'multipart/form-data'
                },
                body: data,
            })
                .then((res) => res.json())
                .then((resJson) => {
                    console.log(resJson);
                    if (resJson.status === 'sukses') {
                        this.props.navigation.navigate('ListPengajuan')

                        ToastAndroid.show("Data berhasil ditambah!", ToastAndroid.SHORT)
                    } else {
                        alert(
                            'Tolong isi Kolom Uang yang diajukan '
                        )
                        ToastAndroid.show("gagal menyimpan", ToastAndroid.SHORT)
                    }
                })
                .catch((err) => console.log('dari catch send Data ===', err));
        });
    }

    selectanak = (id_anak, status_cpb) => {
        var select = this.state.select;
        var stat = this.state.stat;
        var dapat = this.state.dapat;
        var del = 0;
        var hapus = 0;
        var hps = 0;
        for (let i = 0; i < this.state.select.length; i++) {
            if (this.state.select[i].id_anak === id_anak) {
                this.state.select.splice(i, 1);
                del = id_anak;
            }
        }
        if (id_anak != del) {
            select.push({ id_anak });
        }

        for (let i = 0; i < this.state.stat.length; i++) {
            if (this.state.stat[i].status_cpb === status_cpb) {
                this.state.stat.splice(i, 1);
                hapus = status_cpb;
            }
        }
        if (status_cpb != hapus) {
            stat.push({ status_cpb });
        }
        console.log(select, stat);
        // this.setState({id_anak, no});

        // }

    }
    // selectanak = (id_anak,index) => {
    //    this.setState(prev => prev.select[])

    // }
    select11 = (full_name) => {
        const { filter_sta } = this.state;
        let arr = filter_sta.map((item, index) => {
            if (full_name == index) {
                item.isSelected = !item.isSelected;
            }
            return { ...item }
        })
        console.log("Selection ==>", full_name)
        this.setState({ filter_sta })
    }
    onChangeTextjumlah = (text, index) => {
        this.setState(prevState => {
            prevState.jumlah[index] = text;
            return {
                jumlah: prevState.jumlah,
                Jumlah: 1
            }
        }, () => console.log(this.state.jumlah))
    }

    onChangeTextNama = (text, index) => {
        this.setState(prevState => {
            prevState.nama_barang[index] = text;
            return {
                nama_barang: prevState.nama_barang
            }
        }, () => console.log(this.state.nama_barang))
    }
    onChangeTextdetail = (text, index) => {
        this.setState(prevState => {
            prevState.detail[index] = text;
            return {
                detail: prevState.detail
            }
        }, () => console.log(this.state.detail))
    }
    onChangeTextharga = (text, index) => {
        this.setState(prevState => {
            prevState.harga[index] = text;
            return {
                harga: prevState.harga
            }
        }, () => console.log(this.state.harga))
    }


    filterList(textToSearch) {
        this.setState({
            filter_sta: this.state.anak.filter(i => i.full_name.toLowerCase(textToSearch).includes(textToSearch)),
        });
    }
    render() {
        const filter_sta = this.state.anak.filter(item => item.status_cpb === 'PB' && item.status_validasi === "aktif")
        const filter_npb = this.state.anak.filter(item => item.status_cpb != 'PB' && item.status_validasi === "aktif")
        const select = this.state.select;
        const list = []
        const inputbutton = [];
        for (let i = 0; i < this.state.count; i++) {
            inputbutton.push(
                <>
                    <View style={{
                        fontSize: 12,
                        marginBottom: 10,
                        backgroundColor: '#fff',
                        color: '#000',
                        borderRadius: 15,
                    }}>
                        <View key={i}>
                            <ScrollView>
                                < View style={{
                                    width: '90%',
                                    borderRadius: 10,
                                    borderWidth: 1,
                                    marginLeft: 10,
                                    marginTop: 10,
                                    borderColor: '#E9E9E9',
                                    backgroundColor: '#fff',
                                    flexDirection: 'column',
                                    justifyContent: 'space-around'
                                }}>
                                    <Picker style={style.Textinputcss}
                                        selectedValue={this.state.nama_barang[i]}
                                        value={this.state.nama_barang[i]}
                                        onValueChange={(itemValue) => { this.onChangeTextNama((itemValue), i) }}>
                                        <Picker.Item
                                            style={{ fontSize: 14, fontFamily: 'Poppins-Regular', fontWeight: 'bold' }}
                                            label={"Pilih Barang"}
                                            value=""
                                        />
                                        {
                                            this.state.allbarang.map((all) =>
                                                <Picker.Item style={{ height: '100%', width: '100%', fontSize: 12, }} label={all.nama_barang} value={all.nama_barang} key={all.nama_barang} />
                                            )}
                                    </Picker>
                                </View>
                                {/* <View style={{ flexDirection: 'row', marginTop: 10, justifyContent: 'space-between' }}>


                                    <Picker
                                        style={[style.Textinputcss, { width: 200 }]}
                                        selectedValue={this.state.nama_barang[i]}
                                        onValueChange={(itemValue) => { this.onChangeTextNama((itemValue), i) }}
                                    >
                                        <Picker.Item
                                            style={{ fontSize: 14, fontFamily: 'Poppins-Regular', fontWeight: 'bold' }}
                                            label={"Pilih Barang"}
                                            value=""
                                        />
                                        {
                                            this.state.allbarang.map((all) =>
                                                <Picker.Item style={{ height: '100%', width: '100%', fontSize: 12, }} label={all.nama_barang} value={all.nama_barang} key={all.nama_barang} />
                                            )}

                                    </Picker>



                                </View> */}

                                <View style={{ flexDirection: 'row', marginTop: 10, justifyContent: 'space-between', marginHorizontal: 10 }}>
                                    <View >
                                        <Text style={{ marginLeft: 0 }}>Jumlah</Text>
                                        <TextInput
                                            style={[style.kotak3, { width: windowWidth * 0.2, marginLeft: 0, }]}
                                            onChangeText={(text) => { this.onChangeTextjumlah((text), i) }}
                                            value={this.state.jumlah[i]}
                                            keyboardType='numeric'
                                            placeholder="jumlah"
                                            placeholderTextColor="#C0C0C0"
                                        />
                                    </View>
                                    <View >
                                        <Text style={{ marginLeft: 0 }}>Harga Satuan</Text>
                                        <TextInput
                                            style={[style.kotak3, { width: windowWidth * 0.2, marginLeft: 0, }]}
                                            onChangeText={(text) => { this.onChangeTextharga((text), i) }}
                                            value={this.state.harga[i]}
                                            keyboardType='numeric'
                                            placeholder="Harga"
                                            placeholderTextColor="#C0C0C0"
                                        />
                                    </View>

                                </View>
                                <View >
                                    <Text style={{ marginLeft: 10 }}>Detail Barang</Text>
                                    <TextInput
                                        style={[style.kotak3, { width: windowWidth * 0.6, marginLeft: 10, height: 75 }]}
                                        onChangeText={(text) => { this.onChangeTextdetail((text), i) }}
                                        value={this.state.detail[i]}
                                        keyboardType='default'
                                        multiline={true}
                                        placeholder="Masukan detail "
                                        placeholderTextColor="#C0C0C0"
                                    />
                                </View>
                            </ScrollView>
                        </View>
                        <View style={{
                            height: 1,
                            width: '95%',
                            backgroundColor: '#bdbdbb',
                            marginTop: 10,
                            marginHorizontal: 0,
                        }}></View>
                    </View>

                </>
            );
        }
        return (
            <View style={{ backgroundColor: '#fff', height: '100%' }}>
                <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 16, marginTop: 15, marginBottom: 15 }}>Pengajuan Dana</Text>
                <Text>Tujuan Pencairan Untuk </Text>
                < View style={{
                    width: '90%',
                    borderRadius: 10,
                    borderWidth: 1,
                    marginLeft: 20,
                    marginTop: 10,
                    borderColor: '#E9E9E9',
                    backgroundColor: '#fff',
                    flexDirection: 'column',
                    justifyContent: 'space-around'
                }}>
                    <Picker mode="dropdown" style={style.Textinputcss}
                        selectedValue={this.state.berupa}
                        value={this.state.berupa}
                        onValueChange={(itemValue) => {
                            this.setState({
                                berupa: itemValue
                            })
                        }}>
                        <Picker.Item style={{ fontSize: 12 }} label={'Pilih Status Anak'} value={'0'} key={'0'} />
                        <Picker.Item style={{ fontSize: 12 }} label="PB (Uang)" value="Uang" />
                        <Picker.Item style={{ fontSize: 12 }} label="PB (Barang)" value="Barang" />
                        {/* <Picker.Item style={{ fontSize: 12 }} label="NPB/CPB/BCPB" value="Bimbingan" /> */}

                    </Picker>
                </View>
                {
                    this.state.berupa === 'Uang' || this.state.berupa === 'Barang' || this.state.berupa === '' ?
                        <FlatList
                            pagingEnabled={true}
                            data={filter_sta}
                            renderItem={({ item, index }) => (
                                // style={style.kotakbaru4}
                                <View>
                                    {
                                        this.state.berupa === 'Uang' ?
                                            <View style={[style.item, {
                                                borderWidth: this.state.select.find(data => data.id_anak === item.id_anak) ? 3 : 1,
                                                borderColor: this.state.select.find(data => data.id_anak === item.id_anak) ? '#0076B8' : '#bdbdbb',
                                            }]}>
                                                <View style={{
                                                    width: '10%', justifyContent: 'center',

                                                    backgroundColor: item.status_cpb === 'CPB' ? '#0076B8' : '#000' &&
                                                        item.status_cpb === 'PB' ? '#00B855' : '#000' && item.status_cpb === 'NPB' ? '#E32845' : '#000' && item.status_cpb === 'BCPB' ? '#FFBB0C' : '#000'
                                                }}>
                                                    <View style={{ width: '40%', justifyContent: 'center', alignItems: 'center', alignSelf: 'center', alignContent: 'center' }}>
                                                        <Text style={{ fontSize: 12, fontFamily: 'Poppins-Medium', color: '#fff' }}>{item.status_cpb}</Text>
                                                    </View>
                                                </View>
                                                <TouchableOpacity
                                                    onPress={() => { this.selectanak(item.id_anak, item.status_cpb), this.setState({}) }
                                                    }>
                                                    <View style={[style.itemflat,
                                                    ]}>
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
                                                                            <View style={{ flexDirection: 'row' }}>
                                                                                <JenisH style={{ marginLeft: 10 }} />
                                                                                <Text style={{ color: '#000', fontSize: 10, marginLeft: 5, fontFamily: 'Poppins-Regular' }}>Non-Tahfidz</Text>
                                                                            </View>

                                                                            <View style={{ flexDirection: 'row', }}>
                                                                                <TingkatH style={{ marginLeft: 10, }} />
                                                                                <Text style={{ color: '#000', fontSize: 10, fontFamily: 'Poppins-Regular', marginLeft: 5 }}>Kelas {item.kelas}</Text>
                                                                            </View>

                                                                            <View style={{ flexDirection: 'row', }}>
                                                                                <LocationsH style={{ marginLeft: 10, }} />
                                                                                <Text style={{ color: '#000', fontSize: 10, fontFamily: 'Poppins-Regular', marginLeft: 5 }}>{item.tempat_lahir}</Text>
                                                                            </View>

                                                                        </View >
                                                                    </View>
                                                                </View>
                                                            </View>
                                                        </View>
                                                    </View>
                                                    {/* {item.status_cpb === 'BCPB' || item.status_cpb === 'NPB' || item.status_cpb === 'CPB' ?
                                    < View >
                                        <Picker mode="dropdown" style={style.Textinputcss}
                                            selectedValue={this.state.berupa}
                                            value={this.state.berupa}
                                            onValueChange={(itemValue) => {
                                                this.setState({
                                                    berupa: itemValue
                                                })
                                            }}>
                                            <Picker.Item style={{ fontSize: 12 }} label={'Pilih Metode Pembayaran'} value={'0'} key={'0'} />
                                            <Picker.Item label="Uang" value="Uang" />
                                            <Picker.Item label="Barang" value="Barang" />

                                        </Picker>
                                    </View>
                                    : <View />} */}



                                                </TouchableOpacity>
                                            </View >
                                            :
                                            <View />
                                    }


                                    {this.state.berupa === 'Barang' ?
                                        <View style={[style.item, {
                                            borderWidth: this.state.select.find(data => data.id_anak === item.id_anak) ? 3 : 1,
                                            borderColor: this.state.select.find(data => data.id_anak === item.id_anak) ? '#0076B8' : '#bdbdbb',
                                        }]}>
                                            <View style={{
                                                width: '10%', justifyContent: 'center',

                                                backgroundColor: item.status_cpb === 'CPB' ? '#0076B8' : '#000' &&
                                                    item.status_cpb === 'PB' ? '#00B855' : '#000' && item.status_cpb === 'NPB' ? '#E32845' : '#000' && item.status_cpb === 'BCPB' ? '#FFBB0C' : '#000'
                                            }}>
                                                <View style={{ width: '40%', justifyContent: 'center', alignItems: 'center', alignSelf: 'center', alignContent: 'center' }}>
                                                    <Text style={{ fontSize: 12, fontFamily: 'Poppins-Medium', color: '#fff' }}>{item.status_cpb}</Text>
                                                </View>
                                            </View>
                                            <TouchableOpacity
                                                onPress={() => this.setState({ modalbarang: true, id_anak: item.id_anak },)
                                                }>
                                                <View style={[style.itemflat,
                                                ]}>
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
                                                                        <View style={{ flexDirection: 'row' }}>
                                                                            <JenisH style={{ marginLeft: 10 }} />
                                                                            <Text style={{ color: '#000', fontSize: 10, marginLeft: 5, fontFamily: 'Poppins-Regular' }}>Non-Tahfidz</Text>
                                                                        </View>

                                                                        <View style={{ flexDirection: 'row', }}>
                                                                            <TingkatH style={{ marginLeft: 10, }} />
                                                                            <Text style={{ color: '#000', fontSize: 10, fontFamily: 'Poppins-Regular', marginLeft: 5 }}>Kelas {item.kelas}</Text>
                                                                        </View>

                                                                        <View style={{ flexDirection: 'row', }}>
                                                                            <LocationsH style={{ marginLeft: 10, }} />
                                                                            <Text style={{ color: '#000', fontSize: 10, fontFamily: 'Poppins-Regular', marginLeft: 5 }}>{item.tempat_lahir}</Text>
                                                                        </View>

                                                                    </View >
                                                                </View>
                                                            </View>
                                                        </View>
                                                    </View>
                                                </View>

                                            </TouchableOpacity>
                                        </View >
                                        : <View />}

                                </View >
                            )
                            }>
                        </FlatList >
                        : <View />}


                {/* {
                    this.state.berupa === 'Uang' ?
                        <View style={{ marginLeft: 25, }}>
                            <TouchableOpacity style={style.btntambah} onPress={() => this.state.berupa === '' ?
                                alert('Pilih Terlebih dahulu tujuan Pencarian') :
                                this.SimpanData()}>
                                <Text style={{ color: '#fff' }}>Simpan</Text>
                            </TouchableOpacity>
                        </View>
                        : <View />
                } */}
                {
                    this.state.berupa === 'Uang' ?
                        <View style={{ marginLeft: 25, }}>
                            <TouchableOpacity style={style.btntambah} onPress={() => {
                                if (this.state.select.length === 0) {

                                    alert('Pilih Anak Terlebih Dahulu')
                                } else {
                                    this.setState({ modaluang: true })
                                }
                            }}
                            >
                                <Text style={{ color: '#fff' }}>Simpan</Text>
                            </TouchableOpacity>
                        </View>
                        : <View />
                }
                <Modal animationType={"fade"} transparent={true}
                    visible={this.state.modalbarang}
                    onRequestClose={() => this.setState({ modalbarang: false })}
                >
                    <SafeAreaView style={style.containerSafe}>
                        <TouchableOpacity activeOpacity={1.0} style={style.ModalCont}>
                            <View style={{
                                paddingTop: 5,
                                marginHorizontal: 10,
                                backgroundColor: '#fff',
                                // flexDirection: 'row',
                                borderRadius: 20,
                                height: '90%',
                                shadowColor: "#333",
                                shadowOffset: {
                                    width: 1,
                                    height: 1,
                                },
                                shadowOpacity: 0.3,
                                shadowRadius: 2,
                                elevation: 3,
                                // alignItems: 'center'
                            }}>

                                <Text style={{ textAlign: 'center' }}>Masukan Barang</Text>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text style={{ marginLeft: 10, marginTop: 30 }}>Pengajuan Untuk</Text>
                                    <View style={{ marginRight: 10 }}>
                                        <TouchableOpacity
                                            style={[style.kotak3, { width: windowWidth * 0.13, marginLeft: 0, marginTop: 10, marginBottom: 10 }]}
                                            onPress={() => {
                                                this.setState({ count: this.state.count + 1 })
                                            }}>
                                            <Pluskecil style={{ justifyContent: "center", alignContent: "center", alignItems: 'center', alignSelf: 'center', marginTop: 0 }} />

                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <ScrollView >

                                    <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                                        <ScrollView style={{ marginLeft: 15, }}>
                                            {inputbutton}
                                        </ScrollView>

                                    </View>
                                </ScrollView>

                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                                    <View style={[style.kotakkecil, { backgroundColor: 'red' }]}>
                                        <TouchableOpacity onPress={() => this.setState({ modalbarang: false })}>
                                            {/* <KKada style={{ justifyContent: 'center', alignSelf: 'center' }} /> */}
                                            <Text style={{ color: '#fff', textAlign: 'center', padding: 5, fontWeight: 'bold' }}>Batal</Text>
                                        </TouchableOpacity>
                                    </View>

                                    <View style={[style.kotakkecil, { backgroundColor: '#00A9B8', }]}>
                                        <TouchableOpacity onPress={() => {
                                            console.log(this.state.nama_barang)
                                            if (this.state.nama_barang.length === 0) {

                                                alert('masukan Barang yang di ajukan')
                                            } else {
                                                this.setState({ modalbarang: false }, this.SimpanData(this.state.id_anak))
                                            }
                                        }}>
                                            {/* <KKada style={{ justifyContent: 'center', alignSelf: 'center' }} /> */}
                                            <Text style={{ color: '#fff', textAlign: 'center', padding: 5, fontWeight: 'bold' }}>Simpan</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>

                        </TouchableOpacity>
                    </SafeAreaView>
                </Modal>

                <Modal animationType={"fade"} transparent={true}
                    visible={this.state.modaluang}
                    onRequestClose={() => this.setState({ modaluang: false })}
                >
                    <SafeAreaView style={style.containerSafe}>
                        <TouchableOpacity activeOpacity={1.0} style={style.ModalCont}>
                            <View style={{
                                paddingTop: 5,
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
                                {/* <TouchableOpacity onPress={() => this.props.navigation.navigate('Home', this.setState({ wilayah: false }))} style={{ position: 'absolute', right: 20, top: 20 }}>
                                        <Close />
                                    </TouchableOpacity> */}
                                <View>
                                    <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>Masukan Uang yang di ajukan</Text>
                                    <TextInput
                                        style={[style.kotak3, { width: windowWidth * 0.8, marginLeft: 10 }]}
                                        value={this.state.uang
                                            .replace(/\D/g, '')
                                            .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
                                        keyboardType="numeric"
                                        onChangeText={text =>
                                            this.setState({ uang: text.replace(/\D/g, '') })
                                        }
                                        placeholder="Masukan Nominal"
                                        placeholderTextColor="#7e7e7e"
                                    />
                                </View>

                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                                    <View style={[style.kotakkecil, {
                                        backgroundColor: 'red', width: '40%',
                                        height: '50%',
                                    }]}>
                                        <TouchableOpacity onPress={() => this.setState({ modaluang: false })}>
                                            {/* <KKada style={{ justifyContent: 'center', alignSelf: 'center' }} /> */}
                                            <Text style={{ color: '#fff', textAlign: 'center', padding: 5, fontWeight: 'bold' }}>Batal</Text>
                                        </TouchableOpacity>
                                    </View>

                                    <View style={[style.kotakkecil, {
                                        backgroundColor: '#00A9B8', width: '40%',
                                        height: '50%',
                                    }]}>
                                        <TouchableOpacity onPress={() => {
                                            if (this.state.uang === '') {

                                                alert('masukan uang yang di ajukan')
                                            } else {
                                                this.setState({ modaluang: false }, this.Simpanuang())
                                            }
                                        }}>
                                            {/* <KKada style={{ justifyContent: 'center', alignSelf: 'center' }} /> */}
                                            <Text style={{ color: '#fff', textAlign: 'center', padding: 5, fontWeight: 'bold' }}>Simpan</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>

                        </TouchableOpacity>
                    </SafeAreaView>
                </Modal>
            </View >
        )
    }
}
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const style = StyleSheet.create({
    kotak3: {
        marginTop: 10,
        color: '#000',
        borderRadius: 10,
        borderWidth: 0.1,
        fontSize: 13,
        height: 50,
        marginLeft: 20,
        width: windowWidth - 40,
        padding: 12,
        backgroundColor: '#fff',
        borderColor: '#DDDDDD',
        borderWidth: 1,
        fontFamily: 'Poppins-Regular',
    },
    itemflat: {
        flex: 1,
        fontSize: 12,
        flexDirection: 'row',
    },
    item: {
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
        borderRadius: 15,
        flexDirection: 'row',
    },
    btntambah: {
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        width: '90%',
        height: 50,
        borderWidth: 1,
        borderRadius: 10,
        color: '#fff',
        borderColor: '#00A9B8',
        backgroundColor: '#00A9B8',
    },
    Textinputcss: {
        color: '#7e7e7e',
        marginLeft: 10,
        marginRight: 10,
        borderRadius: 10,
        fontSize: 12,
        height: 52,
        // borderWidth: 1,
        // backgroundColor: '#fff',
        // shadowColor: "#333",
        // shadowOffset: {
        //     width: 1,
        //     height: 1,
        // },
        // shadowOpacity: 0.3,
        // shadowRadius: 2,
        // borderColor: '#7e7e7e',
        // elevation: 3,
    },
    containerSafe: {
        flex: 1,
        flexDirection: 'column',
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
        height: '30%',
        justifyContent: 'center',
        alignContent: 'center',
        alignSelf: 'center',
        textAlign: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginTop: 10,
        marginHorizontal: 10,
    },
});

const mapStateToProps = state => {
    return {
        user: state,
        initialState: state,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeUser: data => dispatch({ type: 'CHANGE/USER', payload: data }),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Pengajuan);
