import {
    Alert, Modal, TouchableOpacity, ScrollView, FlatList, SafeAreaView,
    Image, Text, View, TextInput, StyleSheet, ImageBackground, ToastAndroid
} from 'react-native'
import React, { Component } from 'react'
import * as ImagePicker from 'react-native-image-picker';
import CheckBox from '@react-native-community/checkbox';
import { connect } from 'react-redux';
import { akun, test, Union, background1, juara } from '../../assets/images'
import { Profilin, Sekolah, Tgl, Jenis, Cerita, Prestasi, Profil2, Locations, Label } from '../../assets/icons';
import { Picker } from '@react-native-picker/picker';
import Swiper from 'react-native-swiper'
import moment from 'moment';

export class Detail extends Component {
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
            Camera: '',
            nama: '',
            anak: [],
            search: [],
            detak: [],
            modaldetail: 'false',
            modalhistori: 'false',
            collapse: 'false',
            index: -1,
            modalTamAK: false,
            modalTamPel: false,
            pel: '',
            myd: '',
            materi: [],
            check: false,
            reguler: false,
            quran: false,
            modalpembayaran: false,
            berapabulan: 0,
            berapasemester: 0,
            bulan: 0,
            sms: 0,
            bayar: '',
            det: [],
            pilih: '',
            show: 0,
            detail: this.props.route.params.item,
            keu: this.props.route.params.id_anak,
            biaya: [],
            bank: [],
            namabank: '',
            status: "Pending",
            tanggal: new Date(),
            sum: 0,
            lanjut: false,
            Belum: 'Belum',

        }
    }

    sendData() {
        {
            let simpandata = {
                id_anak: this.state.detail.id_anak,
                diajukan: this.state.pilih === 'bulanan' ? this.state.berapabulan : this.state.berapasemester,
                biaya: this.state.pilih === 'bulanan' ? this.state.bulan : this.state.sms,
                pembayaran: this.state.pembayaran,
                // id_users: this.state.id_users,
                status: this.state.status,
                id_bank: this.state.namabank,
                tanggal: moment(this.state.date).format('YYYY-MM-DD'),
                status_bayar: this.state.Belum,
                per: this.state.pilih,
                // req: this.state.req,
            }
            let data = new FormData();
            for (let key in simpandata) {
                data.append(key, simpandata[key]);
            }
            fetch('https://kilauindonesia.org/datakilau/api/tamrequestanak', {
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
                        this.props.navigation.navigate('List_anak')
                        // this.props.navigation.navigate.('List_anak'),
                        ToastAndroid.show("Data berhasil ditambah!", ToastAndroid.SHORT)
                    } else {
                        alert(`Data gagal disimpan !!!`);
                    }
                })
                .catch((err) => console.log('dari catch send Data ===', err));
        }

    }
    GetKeuAPi() {
        fetch('https://kilauindonesia.org/datakilau/api/keuangananak/' + id_anak).then(res => {
            if (res.status === 200)
                return res.json()
        }).then(resdata => {
            console.log(resdata.data)
            this.setState({
                det: resdata.data,
                filter: resdata.DATA,
                refreshing: false,
                filter_sta: resdata.data,
            })
        })
    }


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
    GetBankAPi() {
        fetch('https://kilauindonesia.org/datakilau/api/getbankpen',)
            .then(res => {
                if (res.status === 200)
                    return res.json()
            }).then(resdata => {
                console.log(resdata.data)
                this.setState({
                    bank: resdata.data,

                })
            })
    }

    GetBiayaAPi() {
        fetch('https://kilauindonesia.org/datakilau/api/getbiaya/' + this.state.detail.jenjang,)
            .then(res => {
                if (res.status === 200)
                    return res.json()
            }).then(resdata => {
                console.log(resdata.data)
                this.setState({
                    biaya: resdata.data,

                })
            })
    }
    componentDidMount() {
        this.GetBiayaAPi();
        this.GetBankAPi();
        // this.GetDetAPi();
        // BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
        // Firebase.initializeApp(this);
        // this.requestCameraPermission();
        console.log(this.state.detail);
    }
    componentWillUnmount() {
        this.mounted = false;
        // BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    }
    filterList(array, status) {
        this.setState({
            list: this.state.list.filter(i => i.toLowerCase().includes(list))
        });
        // return array.filter(item => item.Status === status);
        // return list.filter(listItem =>th listItem.toString().toLowerCase().includes(this.state.search.toString().toLowerCase()));
    }

    jumlah() {
        this.setState({
            sms: (this.state.biaya.biaya_donasi * 6 * parseInt(this.state.berapasemester))
        });
    }
    render() {
        const { detail } = this.state
        const { count } = this.state;
        const { sms } = this.state;
        const { bulan } = this.state;
        const berapasemester = this.state;
        const { text1 } = this.state
        const test = this.state.biaya.biaya_donasi;
        var jumlah = test * 6 * berapasemester;
        return (

            <ScrollView contentContainer showsVerticalScrollIndicator={true}>
                <ImageBackground source={background1} style={{ width: '100%', height: 300 }}>
                </ImageBackground>
                <View style={style.kolomkecil}>
                    <Image source={test} style={{ width: 150, height: 150, borderRadius: 70, justifyContent: 'center', alignSelf: 'center', marginTop: -110, position: 'absolute' }}></Image>
                    <View style={{ justifyContent: 'center', textAlign: 'center', alignItems: 'center', alignContent: 'center', alignSelf: 'center', marginTop: 50 }}>
                        <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold', }}>{detail.full_name}</Text>
                        <View style={{ flexDirection: 'column', justifyContent: 'center', textAlign: 'center', alignItems: 'center', alignContent: 'center', alignSelf: 'center', }}>
                            {/* <Text style={style.labeldlm}> 7 Tahun</Text> */}
                            <View style={{ flexDirection: 'row' }}>
                                <Locations />
                                <Text style={style.labeldlm}>{detail.tempat_lahir}</Text>
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
                            <Tgl style={{ marginLeft: 15, }} />
                            <Text style={{ color: '#fff', fontSize: 10 }}>{detail.tanggal_lahir}</Text>
                        </View>
                        <View style={{ marginTop: -10, width: 1, height: '40%', backgroundColor: '#EBEAEA', }} />

                        <View style={{ flexDirection: 'column', marginRight: 20, marginTop: 0 }}>
                            < Sekolah style={{ marginLeft: 0, }} />
                            <Text style={{ marginLeft: 0, color: '#fff', fontSize: 10 }}>{detail.tingkat}</Text>
                        </View>
                    </View>
                </View>
                <View style={{ backgroundColor: '#fff', borderTopRightRadius: 20, borderTopLeftRadius: 20, marginTop: -10 }}>


                    <Swiper style={style.wrapper} showsButtons={false} loop={false}
                        paginationStyle={{ bottom: 0 }}
                        height={550}>
                        <ScrollView style={style.slide1}>
                            <Text style={{ fontSize: 16, fontWeight: 'bold', marginLeft: 20 }}>Cerita</Text>
                            <Text style={{ textAlign: 'justify', justifyContent: 'center' }}>
                                Gugun (13), seorang anak kecil dari pasangan Jujun Suhanda dan Dede Rosmiati ini tinggal di sebuah rumah yang sederhana di daerah Pamarisen, Kabupaten Sumedang, Jawa Barat, dan kondisi yang ia alami sangatlah memprihatinkan.
                                Pasalnya, sudah sejak kecil ia beserta kakak dan adiknya hidup dengan serba kekurangan dikarenakan faktor ekonomi dari keluarganya. kalian bayangkan saja, mereka untuk memenuhi kebutuhan hidupnya hanya mengandalkan pendapatan yang diterima oleh ayahnya dan pendapatan yang diterimanya pun hanya cukup untuk memenuhi kebutuhan pokoknya saja.
                                Oleh sebab itu, dengan segala keterbatasan yang ia miliki serta alami membuat dirinya menjadi cemas akan bagaimana nasib pendidikannya nanti. Namun, dibalik rasa kecemasan yang ia rasakan, tidak membuat dirinya menjadi minder ataupun malu terhadap teman-teman sebayanya ketika sedang berkumpul. Selain itu, ia bahkan masih memiliki semangat dan bertekad untuk terus rajin belajar agar kelak nantinya ia bisa merubah kondisi kehidupan keluarganya menjadi lebih baik.
                                Untuk itu, yuk jangan biarkan kondisi Gugun terus menerus seperti ini dan berikan bantuan terbaik yang kita miliki agar apa yang ia impikan bisa terwujud. Terima kasih sahabat.

                            </Text>
                            <View style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center', alignSelf: 'center', marginTop: 20 }}>
                                <TouchableOpacity style={style.btnSimpanbaru} onPress={() => { this.setState({ modalpembayaran: true }) }}>
                                    <View style={{ flexDirection: 'row' }}>

                                        <Text style={{ color: '#fff' }}>JADI ORANG TUA ASUH</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </ScrollView>

                        <ScrollView
                            nestedScrollEnabled={true}
                            style={style.slide2}>
                            <Text style={{ fontSize: 16, fontWeight: 'bold', marginLeft: 20 }}>Prestasi</Text>
                            <FlatList
                                data={detail.prestasi}
                                renderItem={({ item }) => (
                                    <View style={style.kotakabu}>
                                        <Image source={juara} style={style.img}></Image>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                                            <View style={{ flexDirection: 'row', backgroundColor: '#D2D2D2', borderRadius: 10, padding: 1, width: 120, height: 40, marginTop: 10, marginLeft: 5 }}>
                                                <Label style={{ alignItems: 'center', alignSelf: 'center' }} />
                                                <Text style={{ marginTop: -3, marginLeft: 5, color: '#FFFFFF', textAlign: 'center', alignItems: 'center', alignSelf: 'center' }}>Ekstrakulikuler</Text>
                                            </View>
                                            <View style={{ flexDirection: 'column' }}>
                                                <Text style={style.labelbaru1}>23 Jan 2022</Text>
                                                <Text> 10.45</Text>
                                            </View>
                                        </View>
                                        <Text style={style.labelbaru}>Nama Perlombaan</Text>
                                        <Text style={style.labelbaru2}>Keterangan Prestasi</Text>
                                    </View>

                                )}>
                            </FlatList>


                            <View style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center', alignSelf: 'center', marginTop: 20 }}>
                                <TouchableOpacity style={style.btnSimpanbaru} onPress={() => { this.setState({ modalpembayaran: true }) }}>
                                    <View style={{ flexDirection: 'row' }}>

                                        <Text style={{ color: '#fff' }}>JADI ORANG TUA ASUH</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </ScrollView>

                        <ScrollView style={style.slide3}>
                            <View style={{ flexDirection: 'column', marginTop: 10 }}>
                                <Text style={{ fontSize: 16, fontWeight: 'bold', marginLeft: 20 }}>Identitas Anak</Text>
                                <View style={{ justifyContent: 'center' }}>
                                    <View style={style.form}>
                                        <Text style={style.labelkiri}>Nama</Text>
                                        <Text style={style.labelkanan}>:{detail.full_name}</Text>
                                    </View>
                                    <View style={style.form}>
                                        <Text style={style.labelkiri}>Tempat, Tanggal Lahir</Text>
                                        <Text style={style.labelkanan}>:{detail.tempat_lahir},{detail.tanggal_lahir}</Text>
                                    </View>
                                    <View style={style.form}>
                                        <Text style={style.labelkiri}>Jenis Kelamin</Text>
                                        <Text style={style.labelkanan}>:{detail.jenis_kelamin}</Text>
                                    </View>
                                    <View style={style.form}>
                                        <Text style={style.labelkiri}>Hobi</Text>
                                        <Text style={style.labelkanan}>:{detail.hobi}</Text>
                                    </View>
                                </View>
                                <View style={{ marginLeft: 10, width: '90%', height: 1, backgroundColor: '#EBEAEA', marginTop: 10, }} />
                                <Text style={{ fontSize: 16, fontWeight: 'bold', marginLeft: 20 }}>Detail Anak</Text>

                                <View style={{ justifyContent: 'center' }}>
                                    <View style={style.form}>
                                        <Text style={style.labelkiri}>Anak ke</Text>
                                        <Text style={style.labelkanan}>:{detail.anak_ke}</Text>
                                    </View>
                                    <View style={style.form}>
                                        <Text style={style.labelkiri}>Tinggal Bersama</Text>
                                        <Text style={style.labelkanan}>:{detail.tinggal_bersama}</Text>
                                    </View>
                                    <View style={style.form}>
                                        <Text style={style.labelkiri}>Jarak rumah ke sheleter</Text>
                                        <Text style={style.labelkanan}>:{detail.jarak_rumah}</Text>
                                    </View>
                                    <View style={style.form}>
                                        <Text style={style.labelkiri}>Transportasi</Text>
                                        <Text style={style.labelkanan}>:{detail.transportasi}</Text>
                                    </View>

                                    <View style={{ marginLeft: 10, width: '90%', height: 1, backgroundColor: '#EBEAEA', marginTop: 10, }} />
                                    <Text style={{ fontSize: 16, fontWeight: 'bold', marginLeft: 20 }}>Detail Pendidikan</Text>
                                    <View style={{ justifyContent: 'center' }}>
                                        <View style={style.form}>
                                            <Text style={style.labelkiri}>Nama Sekolah</Text>
                                            <Text style={style.labelkanan}>:{detail.nama_sekolah}</Text>
                                        </View>
                                        <View style={style.form}>
                                            <Text style={style.labelkiri}>Kelas</Text>
                                            <Text style={style.labelkanan}>:{detail.kelas}</Text>
                                        </View>
                                        <View style={style.form}>
                                            <Text style={style.labelkiri}>Alamat Sekolah</Text>
                                            <Text style={style.labelkanan}>:{detail.alamat_sekolah}</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center', alignSelf: 'center', marginTop: 20 }}>
                                    <TouchableOpacity style={style.btnSimpanbaru} onPress={() => { this.setState({ modalpembayaran: true }) }}>
                                        <View style={{ flexDirection: 'row' }}>

                                            <Text style={{ color: '#fff' }}>JADI ORANG TUA ASUH</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </ScrollView>

                    </Swiper>


                </View>
                <Modal
                    animationType={"slide"}
                    transparent={true}
                    visible={this.state.modalpembayaran}
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
                                <View style={{ flexDirection: 'row', marginTop: 20, }}>
                                    <TouchableOpacity onPress={() => { this.setState({ modalpembayaran: false }) }}>
                                        <Image source={Union} style={{ width: 15, height: 15, marginLeft: 10, marginRight: 10, marginTop: 5 }}></Image>
                                    </TouchableOpacity>
                                    <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Pendanaan {this.state.detail.id_anak}</Text>
                                </View>

                                <View style={{ marginLeft: 20, width: '90%', height: 1, backgroundColor: '#EBEAEA', marginTop: 25, }} />

                                <View style={{ marginTop: 10, }}>
                                    <Picker style={style.datePickerStyleRight}
                                        selectedValue={this.state.pilih}
                                        onValueChange={(itemValue) => this.setState({ pilih: itemValue, show: 1 })}
                                    >
                                        <Picker.Item style={{ fontSize: 12 }} label={'Pilih Pembayaran'} value={'0'} key={'0'} />
                                        <Picker.Item label="Perbulan" value="bulanan" />
                                        <Picker.Item label="Persemester" value="semester" />
                                    </Picker>

                                    {this.state.show === 1 && this.state.pilih === 'bulanan' ?
                                        <View>
                                            <View style={{ flexDirection: 'row', }}>
                                                <Text style={style.labelkiri1}>Total Nominal Pendanaan</Text>
                                                <TextInput style={style.labelkanan2}
                                                    value={'Rp. ' + this.state.bulan.toString().replace(/\D/g, "")
                                                        .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                                                    keyboardType="numeric"
                                                    onChangeText={(bulan) => this.setState({ bulan })}
                                                    editable={false}
                                                />
                                            </View>
                                        </View>
                                        :
                                        this.state.show === 1 && this.state.pilih === 'semester' ?
                                            <View>
                                                <View style={{ flexDirection: 'row', }}>
                                                    <Text style={style.labelkiri1}>Total Nominal Pendanaan</Text>

                                                    <Text> {"Rp. " + this.state.sms}</Text>
                                                    {/* <TextInput style={style.labelkanan2}
                                                        value=
                                                        {`rp ${this.state.sms}`}
                                                        // {'Rp. ' + this.state.sms.toString().replace(/\D/g, "")
                                                        //     .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                                                        keyboardType="numeric"
                                                        onChangeText={(sms) => this.setState({ sms })}
                                                        editable={false}
                                                    /> */}
                                                </View>
                                            </View>
                                            : <></>}
                                    <View style={{ flexDirection: 'row', }}>
                                        <Text style={style.labelkiri1}>Nominal Pendanaan perbulan</Text>
                                        <Text style={style.labelkanan1}>{this.state.biaya.biaya_donasi}</Text>
                                    </View>

                                    {this.state.pilih === 'bulanan' ?
                                        <View style={{ flexDirection: 'row', }}>
                                            <Text style={style.labelkiri1}>Banyak semester yang didanai</Text>
                                            <View style={{ flexDirection: 'row', marginLeft: 60, }}>
                                                <TouchableOpacity
                                                    style={style.btnSimpanDark1}
                                                    onPress={() => {
                                                        if (this.state.berapabulan > 0) {
                                                            this.setState({ count: this.state.berapabulan - 1 })
                                                            this.setState({ bulan: this.state.bulan - this.state.biaya.biaya_donasi })
                                                        } else {
                                                            alert('tidak bisa kurang dari 0');
                                                        }
                                                    }}>
                                                    <Text >-</Text>
                                                </TouchableOpacity>

                                                <Text style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center', alignSelf: 'center', marginHorizontal: 10 }}>{this.state.berapabulan}</Text>

                                                {/* <TextInput style={style.Textinputcss}
                                                    value={Math.round(this.state.sumemas).toString().replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                                                    keyboardType="numeric"
                                                    onChange={this.profesi}
                                                    editable={false}
                                                    placeholderTextColor='#7e7e7e'
                                                /> */}

                                                <TouchableOpacity
                                                    style={style.btnSimpanDark1}
                                                    onPress={() => {
                                                        this.setState({ berapabulan: this.state.berapabulan + 1 })
                                                        // this.sms()
                                                        // this.calculateSum();
                                                        this.setState({ bulan: this.state.bulan + this.state.biaya.biaya_donasi })
                                                        console.log(this.state.sms)
                                                    }}>
                                                    <Text>+</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                        : <View />}

                                    {this.state.pilih === 'semester' ?
                                        <View style={{ flexDirection: 'row', }}>
                                            <Text style={style.labelkiri1}>Banyak semester yang didanai</Text>
                                            <View style={{ flexDirection: 'row', marginLeft: 60, }}>
                                                <TouchableOpacity
                                                    style={style.btnSimpanDark1}
                                                    onPress={() => {

                                                        if (this.state.berapasemester === 0) {
                                                            ToastAndroid.show('Klik lagi untuk Konfirmasi', ToastAndroid.LONG)
                                                            this.setState({ berapasemester: 1 })
                                                            console.log(this.state.berapasemester)

                                                        } else {
                                                            this.setState({ berapasemester: 1 })
                                                            this.jumlah()
                                                        }

                                                    }}>

                                                    <Text>1</Text>
                                                </TouchableOpacity>

                                                <TouchableOpacity
                                                    style={style.btnSimpanDark1}
                                                    onPress={() => {
                                                        if (this.state.berapasemester === 2) {
                                                            ToastAndroid.show('Klik lagi untuk Konfirmasi', ToastAndroid.LONG)
                                                            this.setState({ berapasemester: 2 })
                                                            console.log(this.state.berapasemester)

                                                        } else {
                                                            this.setState({ berapasemester: 2 })
                                                            this.jumlah()
                                                        }
                                                    }}>

                                                    <Text>2</Text>
                                                </TouchableOpacity>

                                                <TouchableOpacity
                                                    style={style.btnSimpanDark1}
                                                    onPress={() => {

                                                        if (this.state.berapasemester === 3) {
                                                            ToastAndroid.show('Klik lagi untuk Konfirmasi', ToastAndroid.LONG)
                                                            this.setState({ berapasemester: 3 })
                                                            console.log(this.state.berapasemester)

                                                        } else {
                                                            this.setState({ berapasemester: 3 })
                                                            this.jumlah()
                                                        }


                                                    }}>
                                                    <Text>3</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                        : <View />}
                                    <View>
                                        <Text style={style.labelkiri2}>* 1 Semester = 6 bulan</Text>
                                    </View>

                                    <Picker style={style.datePickerStyleRight} mode="dropdown"
                                        selectedValue={this.state.pembayaran}
                                        value={this.state.pembayaran}
                                        onValueChange={(itemValue) => {
                                            this.setState({
                                                pembayaran: itemValue
                                            })
                                        }}>
                                        <Picker.Item style={{ fontSize: 12 }} label={'Pilih Metode Pembayaran'} value={'0'} key={'0'} />
                                        <Picker.Item label="Tranfer" value="Tranfer" />
                                        <Picker.Item label="Dijemput" value="Dijemput" />
                                    </Picker>
                                    {this.state.pembayaran === 'Tranfer' ?
                                        <Picker style={style.datePickerStyleRight} mode="dropdown"
                                            selectedValue={this.state.namabank}
                                            value={this.state.namabank}
                                            onValueChange={(itemValue) => {
                                                this.setState({
                                                    namabank: itemValue
                                                })
                                            }}>
                                            <Picker.Item style={{ fontSize: 12 }} label={'Pilih Bank'} value={'0'} key={'0'} />
                                            {
                                                this.state.bank.map((item) =>
                                                    <Picker.Item style={{ height: '100%', width: '100%', fontSize: 12, }} label={item.nama_bank.toString()} value={item.id_bank} key={item.id_bank} />
                                                )}
                                        </Picker>
                                        : <View />}

                                    <View style={{ alignContent: 'center', justifyContent: 'center', alignItems: 'center', }}>
                                        <TouchableOpacity style={style.btnSimpanbaru} onPress={() => this.sendData()}>
                                            <Text style={{ color: '#fff' }}>Request</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </SafeAreaView>
                        </View>
                    </View>
                </Modal>


            </ScrollView >


        )
    }
}
const style = StyleSheet.create({
    wrapper: {},
    slide1: {
        flex: 1,
        marginLeft: 10,
    },
    slide2: {
        height: '100%'
    },
    slide3: {
        flex: 1,
        width: '100%',
        height: '50%',
    },
    contentContainer: {
        width: '100%',
        height: '85%',
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        flex: 1,
        marginTop: -25,
    },
    contentContainer1: {
        backgroundColor: '#fff',
    },
    containerfoto: {
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
        color: '#fff',
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
    groupdatetime: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    coltom: {
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
    coltom1: {
        flex: 2,
        width: '90%',
        marginTop: 10,
        fontSize: 16,
        flexDirection: 'row',
        padding: 10,
        marginLeft: 10,
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
        padding: 10,
        borderRadius: 2.5,
        borderWidth: 0.1,

    },
    Label1: {
        flex: 1,
        fontSize: 12,
        padding: 5,
        color: '#000000',
        flexDirection: 'column',
    },
    Label2: {
        marginTop: 5,
        marginLeft: 25,
        padding: 5,
        color: '#000',
        alignItems: 'center',
        justifyContent: 'center'
    },
    Textinputcss: {
        color: '#7e7e7e',
        borderRadius: 10,
        borderWidth: 0.1,
        fontSize: 12,
        height: 52,
        width: '20%',
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
        textAlign: 'center',
        justifyContent: 'center', alignItems: 'center'
    },
    searchBar: {
        fontSize: 16,
        marginLeft: 50,
        width: '70%',
        height: 50,
        shadowColor: "#333",
        shadowOffset: {
            width: 1,
            height: 1,
        },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        elevation: 3,
        backgroundColor: '#fff',
        borderRadius: 2,
        borderWidth: 0.1,
        justifyContent: 'center',
        textAlign: 'center',
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
    refresh: {
        padding: 10,
        position: 'absolute',
        bottom: 95,
        right: 15,
        flexDirection: 'row',
        borderRadius: 5,
        // marginHorizontal: 5,
        height: 45,
        alignItems: 'center',
        justifyContent: 'center'
    },
    checkbox: {
        flexDirection: 'row',
        alignContent: 'space-between',
        alignItems: 'center',
        margin: 20,
    },
    foto: {
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'center',
        width: 125,
        height: 125,
        borderRadius: 50,
        marginLeft: 10,
        marginTop: 30,
        marginRight: 20,
    },
    form: {
        flexDirection: 'row',
        alignItems: 'center',
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
    labelkiri1: {
        fontSize: 12,
        fontWeight: 'bold',
        marginVertical: 5,
        marginLeft: 20,
        width: 100,
        color: '#C0C0C0',
    },
    labelkiri2: {
        fontSize: 12,
        fontWeight: 'bold',
        marginVertical: 5,
        marginTop: -9,
        marginLeft: 20,
        width: 100,
        color: '#C0C0C0',
    },
    labelkanan: {
        fontSize: 12,
        marginHorizontal: 5,
        width: 150,

    },
    labelkanan2: {
        fontSize: 12,
        marginHorizontal: 5,
        width: 150,
        marginLeft: 80,
        fontWeight: 'bold',

    },
    labelkanan1: {
        fontSize: 12,
        marginHorizontal: 5,
        width: 150,
        marginTop: 10,
        marginLeft: 80,
        fontWeight: 'bold',
    },
    btnSimpanbaru: {
        width: '55%',
        fontWeight: 'bold',
        backgroundColor: '#0EBEDF',
        borderRadius: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: '#0EBEDF',
        justifyContent: 'center', alignItems: 'center', alignContent: 'center',
        textAlign: 'center',
        color: '#fff'
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
    countContainer: {
        color: '#000000',
        alignItems: "center",
        flexDirection: 'row',
        padding: 5,
        justifyContent: 'center'
    },
    btnSimpanDark1: {
        width: '20%',
        fontWeight: 'bold',
        backgroundColor: '#E9E9E9',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#E9E9E9',
        textAlign: 'center',
        justifyContent: 'center', alignItems: 'center'
    },
    labeldlm: {
        fontSize: 10,
        color: '#fff',
        marginTop: 3,
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
        height: 300,
        borderRadius: 15,
        borderWidth: 1,
        marginLeft: 10,
        marginTop: 10,
        borderColor: '#E9E9E9',
        backgroundColor: '#fff',

    },
    img: {
        width: '95%',
        height: 150,
        marginLeft: 10,
        marginTop: 10,
        borderRadius: 10,
    },
    labelbaru: {
        fontSize: 16,
        marginTop: 10,
        marginLeft: 10
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
    }
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
export default connect(mapStateToProps, mapDispatchToProps)(Detail);
