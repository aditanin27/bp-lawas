import {
    ScrollView, Text, View, StyleSheet, Dimensions, TextInput, TouchableOpacity,
    Image, Modal, ToastAndroid, SafeAreaView, Alert
} from 'react-native'
import React, { Component } from 'react'
import { Picker } from '@react-native-picker/picker';
// import { DatePicker } from 'react-native-wheel-pick'
import { x, date } from '../../assets/images'
import moment from 'moment';
import { Tanggal } from '../../assets/icons';

export class Four extends Component {
    constructor(props) {
        super(props)
        this.state = {
            status_validasi: 'tidak aktif',
            test: '2-02-1999',
            nikwali: '',
            namawali: '',
            agamawali: '',
            temwali: '',
            alamatwali: '',
            // datewali: '',
            provwali: '',
            kabwali: '',
            kecwali: '',
            kelwali: '',
            penghasilanwali: '',
            hubungan: '',
            prov: [],
            pro: '',
            kab: [],
            kot: '',
            kecamatan: [],
            kec: '',
            kelurahan: [],
            kel: '',
            penghasilan: [],
            gaji: '',
            nik_anak: this.props.route.params.nikanak,
            noKK: this.props.route.params.KK,
            deskripsi: '',
            totalSteps: "",
            currentStep: "",
            datewali: new Date(),
            modaldate: false,
            show: false,
            modallihatnik: false,
            modallihatnokk: false,

        }
    }
    componentDidMount() {
        this.GetprovAPi();
        this.GetKabupatenAPi();
        this.GetKelurahanAPi();
        this.GetKecamatanAPi();
        console.log()
    }
    GetprovAPi() {
        fetch('https://kilauindonesia.org/datakilau/api/getprovinsi').then(res => {
            if (res.status === 200)
                return res.json()
        }).then(resdata => {
            console.log(resdata.data)
            this.setState({
                prov: resdata.data

            })
        })
    }

    GetKabupatenAPi() {
        fetch('https://kilauindonesia.org/datakilau/api/getkab/' + this.state.provwali).then(res => {
            if (res.status === 200)
                return res.json()
        }).then(resdata => {
            console.log(resdata.data)
            this.setState({
                kab: resdata.data,
            })
        })
    }

    GetKecamatanAPi() {
        fetch('https://kilauindonesia.org/datakilau/api/getkec/' + this.state.kabwali).then(res => {
            if (res.status === 200)
                return res.json()
        }).then(resdata => {
            console.log(resdata.data)
            this.setState({
                kecamatan: resdata.data

            })
        })
    }
    GetKelurahanAPi() {
        fetch('https://kilauindonesia.org/datakilau/api/getkel/' + this.state.kecwali).then(res => {
            if (res.status === 200)
                return res.json()
        }).then(resdata => {
            console.log(resdata.data)
            this.setState({
                kelurahan: resdata.data

            })
        })
    }

    SimpanDatanoKK() {
        {
            let simpandata = {
                nik_wali: this.state.nikwali,
                nama_wali: this.state.namawali,
                agama_wali: this.state.agamawali,
                tempat_lahir_wali: this.state.temwali,
                alamat_wali: this.state.alamatwali,
                tanggal_lahir_wali: moment(this.state.datewali).format('YYYY-MM-DD'),
                id_prov_wali: this.state.provwali,
                id_kab_wali: this.state.kabwali,
                id_kec_wali: this.state.kecwali,
                id_kel_wali: this.state.kelwali,
                penghasilan_wali: this.state.penghasilanwali,
                hub_kerabat_wali: this.state.hubungan,
                nik_ibu: this.props.route.params.nikibu,
                nama_ibu: this.props.route.params.namaibu,
                agama_ibu: this.props.route.params.agamaibu,
                tempat_lahir_ibu: this.props.route.params.temibu,
                alamat_ibu: this.props.route.params.alamatibu,
                tanggal_lahir_ibu: moment(this.props.route.params.dateibu).format('YYYY-MM-DD'),
                tanggal_kematian_ibu: moment(this.props.route.params.dateibu2).format('YYYY-MM-DD'),
                id_prov_ibu: this.props.route.params.provibu,
                id_kab_ibu: this.props.route.params.kabibu,
                id_kec_ibu: this.props.route.params.kecibu,
                id_kel_ibu: this.props.route.params.kelibu,
                penghasilan_ibu: this.props.route.params.penghasilanibu,
                penyebab_kematian_ibu: this.props.route.params.penyebabibu,
                nik_ayah: this.props.route.params.nikayah,
                nama_ayah: this.props.route.params.namaayah,
                agama_ayah: this.props.route.params.agamaayah,
                tempat_lahir_ayah: this.props.route.params.temayah,
                alamat_ayah: this.props.route.params.alamatayah,
                tanggal_lahir_ayah: moment(this.props.route.params.dateayah).format('YYYY-MM-DD'),
                tanggal_kematian_ayah: moment(this.props.route.params.dateayah2).format('YYYY-MM-DD'),
                id_prov_ayah: this.props.route.params.provayah,
                id_kab_ayah: this.props.route.params.kabayah,
                id_kec_ayah: this.props.route.params.kecayah,
                id_kel_ayah: this.props.route.params.kelayah,
                penghasilan_ayah: this.props.route.params.penghasilanayah,
                penyebab_kematian_ayah: this.props.route.params.penyebabayah,
                nik_anak: this.state.nik_anak,
                anak_ke: this.props.route.params.anak,
                dari_bersaudara: this.props.route.params.saudara,
                nick_name: this.props.route.params.panggilan,
                full_name: this.props.route.params.namaanak,
                agama: this.props.route.params.agama,
                tempat_lahir: this.props.route.params.tempatlahir,
                tanggal_lahir: this.props.route.params.dateanak,
                prestasi: this.props.route.params.prestasi,
                jenis_kelamin: this.props.route.params.JK,
                tinggal_bersama: this.props.route.params.TB,
                status_validasi: this.state.status_validasi,
                transportasi: this.props.route.params.kendaraan,
                pelajaran_favorit: this.props.route.params.pelfa,
                hobi: this.props.route.params.hobi,
                jenis_anak_binaan: this.props.route.params.jenis_anak_binaan,
                jarak_rumah: this.props.route.params.jarak,
                status_cpb: this.props.route.params.JB,
                latitude: this.props.route.params.latitude,
                longitude: this.props.route.params.longitude,
                foto: this.props.route.params.anakfoto,
                jenjang: this.props.route.params.tingkat,
                kelas: this.props.route.params.kelas,
                nama_sekolah: this.props.route.params.namasek,
                alamat_sekolah: this.props.route.params.alamatsek,
                semester: this.props.route.params.semester,
                jurusan: this.props.route.params.jurusan,
                kepala_keluarga: this.props.route.params.kepala,
                no_kk: this.state.noKK,
                id_kacab: this.props.route.params.cabang,
                id_wilbin: this.props.route.params.binaan,
                id_shelter: this.props.route.params.shel,
                status_ortu: this.props.route.params.SOT,
                id_bank: this.props.route.params.namabank,
                no_rek: this.props.route.params.norek,
                an_rek: this.props.route.params.an_rek,
                no_tlp: this.props.route.params.nohp,
                an_hp: this.props.route.params.an_hp,
                // surket: this.props.route.params.surket,
                // sktm: this.props.route.params.sktm,
            }
            let data = new FormData();
            for (let key in simpandata) {
                data.append(key, simpandata[key]);
            }
            fetch('https://kilauindonesia.org/datakilau/api/tambahkeluarga', {
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
                        this.props.navigation.navigate('List_Anak_Binaan')
                        // this.onRefresh()
                        ToastAndroid.show("Data berhasil ditambah!", ToastAndroid.SHORT)
                        if (resJson.status === 'no_kk') {
                            Alert.alert(
                                'Peringatan',
                                'No KK Sudah terdaftar',
                                [
                                    {
                                        text: "Ya",
                                        onPress: () => this.setState({ modallihatnik: true }),
                                        style: "cancel"
                                    },
                                ],
                                { cancelable: false },
                            )
                        }
                    } else {

                        ToastAndroid.show("gagal menyimpan", ToastAndroid.SHORT)
                    }
                })
                .catch((err) => console.log('dari catch send Data ===', err));
        }

    }
    SimpanDatanik() {
        {
            let simpandata = {
                nik_wali: this.state.nikwali,
                nama_wali: this.state.namawali,
                agama_wali: this.state.agamawali,
                tempat_lahir_wali: this.state.temwali,
                alamat_wali: this.state.alamatwali,
                tanggal_lahir_wali: moment(this.state.datewali).format('YYYY-MM-DD'),
                id_prov_wali: this.state.provwali,
                id_kab_wali: this.state.kabwali,
                id_kec_wali: this.state.kecwali,
                id_kel_wali: this.state.kelwali,
                penghasilan_wali: this.state.penghasilanwali,
                hub_kerabat_wali: this.state.hubungan,
                nik_ibu: this.props.route.params.nikibu,
                nama_ibu: this.props.route.params.namaibu,
                agama_ibu: this.props.route.params.agamaibu,
                tempat_lahir_ibu: this.props.route.params.temibu,
                alamat_ibu: this.props.route.params.alamatibu,
                tanggal_lahir_ibu: moment(this.props.route.params.dateibu).format('YYYY-MM-DD'),
                tanggal_kematian_ibu: moment(this.props.route.params.dateibu2).format('YYYY-MM-DD'),
                id_prov_ibu: this.props.route.params.provibu,
                id_kab_ibu: this.props.route.params.kabibu,
                id_kec_ibu: this.props.route.params.kecibu,
                id_kel_ibu: this.props.route.params.kelibu,
                penghasilan_ibu: this.props.route.params.penghasilanibu,
                penyebab_kematian_ibu: this.props.route.params.penyebabibu,
                nik_ayah: this.props.route.params.nikayah,
                nama_ayah: this.props.route.params.namaayah,
                agama_ayah: this.props.route.params.agamaayah,
                tempat_lahir_ayah: this.props.route.params.temayah,
                alamat_ayah: this.props.route.params.alamatayah,
                tanggal_lahir_ayah: moment(this.props.route.params.dateayah).format('YYYY-MM-DD'),
                tanggal_kematian_ayah: moment(this.props.route.params.dateayah2).format('YYYY-MM-DD'),
                id_prov_ayah: this.props.route.params.provayah,
                id_kab_ayah: this.props.route.params.kabayah,
                id_kec_ayah: this.props.route.params.kecayah,
                id_kel_ayah: this.props.route.params.kelayah,
                penghasilan_ayah: this.props.route.params.penghasilanayah,
                penyebab_kematian_ayah: this.props.route.params.penyebabayah,
                nik_anak: this.state.nik_anak,
                anak_ke: this.props.route.params.anak,
                dari_bersaudara: this.props.route.params.saudara,
                nick_name: this.props.route.params.panggilan,
                full_name: this.props.route.params.namaanak,
                agama: this.props.route.params.agama,
                tempat_lahir: this.props.route.params.tempatlahir,
                tanggal_lahir: this.props.route.params.dateanak,
                prestasi: this.props.route.params.prestasi,
                jenis_kelamin: this.props.route.params.JK,
                tinggal_bersama: this.props.route.params.TB,
                status_validasi: this.state.status_validasi,
                transportasi: this.props.route.params.kendaraan,
                pelajaran_favorit: this.props.route.params.pelfa,
                hobi: this.props.route.params.hobi,
                jenis_anak_binaan: this.props.route.params.jenis_anak_binaan,
                jarak_rumah: this.props.route.params.jarak,
                status_cpb: this.props.route.params.JB,
                latitude: this.props.route.params.latitude,
                longitude: this.props.route.params.longitude,
                foto: this.props.route.params.anakfoto,
                jenjang: this.props.route.params.tingkat,
                kelas: this.props.route.params.kelas,
                nama_sekolah: this.props.route.params.namasek,
                alamat_sekolah: this.props.route.params.alamatsek,
                semester: this.props.route.params.semester,
                jurusan: this.props.route.params.jurusan,
            }
            let data = new FormData();
            for (let key in simpandata) {
                data.append(key, simpandata[key]);
            }
            fetch('https://kilauindonesia.org/datakilau/api/tambahkeluarga', {
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
                        this.props.navigation.navigate('List_Anak_Binaan')
                        // this.onRefresh()
                        ToastAndroid.show("Data berhasil ditambah!", ToastAndroid.SHORT)
                        if (resJson.status === 'nik_anak') {
                            Alert.alert(
                                'Peringatan',
                                'NIK Anak Sudah terdaftar',
                                [
                                    {
                                        text: "Ya",
                                        onPress: () => this.setState({ modallihatnik: true }),
                                        style: "cancel"
                                    },
                                ],
                                { cancelable: false },
                            )
                        }
                    } else {

                        ToastAndroid.show("gagal menyimpan", ToastAndroid.SHORT)
                    }
                })
                .catch((err) => console.log('dari catch send Data ===', err));
        }

    }
    SimpanData() {
        {
            let simpandata = {
                nik_wali: this.state.nikwali,
                nama_wali: this.state.namawali,
                agama_wali: this.state.agamawali,
                tempat_lahir_wali: this.state.temwali,
                alamat_wali: this.state.alamatwali,
                tanggal_lahir_wali: moment(this.state.datewali).format('YYYY-MM-DD'),
                id_prov_wali: this.state.provwali,
                id_kab_wali: this.state.kabwali,
                id_kec_wali: this.state.kecwali,
                id_kel_wali: this.state.kelwali,
                penghasilan_wali: this.state.penghasilanwali,
                hub_kerabat_wali: this.state.hubungan,
                nik_ibu: this.props.route.params.nikibu,
                nama_ibu: this.props.route.params.namaibu,
                agama_ibu: this.props.route.params.agamaibu,
                tempat_lahir_ibu: this.props.route.params.temibu,
                alamat_ibu: this.props.route.params.alamatibu,
                tanggal_lahir_ibu: moment(this.props.route.params.dateibu).format('YYYY-MM-DD'),
                tanggal_kematian_ibu: moment(this.props.route.params.dateibu2).format('YYYY-MM-DD'),
                id_prov_ibu: this.props.route.params.provibu,
                id_kab_ibu: this.props.route.params.kabibu,
                id_kec_ibu: this.props.route.params.kecibu,
                id_kel_ibu: this.props.route.params.kelibu,
                penghasilan_ibu: this.props.route.params.penghasilanibu,
                penyebab_kematian_ibu: this.props.route.params.penyebabibu,
                nik_ayah: this.props.route.params.nikayah,
                nama_ayah: this.props.route.params.namaayah,
                agama_ayah: this.props.route.params.agamaayah,
                tempat_lahir_ayah: this.props.route.params.temayah,
                alamat_ayah: this.props.route.params.alamatayah,
                tanggal_lahir_ayah: moment(this.props.route.params.dateayah).format('YYYY-MM-DD'),
                tanggal_kematian_ayah: moment(this.props.route.params.dateayah2).format('YYYY-MM-DD'),
                id_prov_ayah: this.props.route.params.provayah,
                id_kab_ayah: this.props.route.params.kabayah,
                id_kec_ayah: this.props.route.params.kecayah,
                id_kel_ayah: this.props.route.params.kelayah,
                penghasilan_ayah: this.props.route.params.penghasilanayah,
                penyebab_kematian_ayah: this.props.route.params.penyebabayah,
                nik_anak: this.state.nik_anak,
                anak_ke: this.props.route.params.anak,
                dari_bersaudara: this.props.route.params.saudara,
                nick_name: this.props.route.params.panggilan,
                full_name: this.props.route.params.namaanak,
                agama: this.props.route.params.agama,
                tempat_lahir: this.props.route.params.tempatlahir,
                tanggal_lahir: this.props.route.params.dateanak,
                prestasi: this.props.route.params.prestasi,
                jenis_kelamin: this.props.route.params.JK,
                tinggal_bersama: this.props.route.params.TB,
                status_validasi: this.state.status_validasi,
                transportasi: this.props.route.params.kendaraan,
                pelajaran_favorit: this.props.route.params.pelfa,
                hobi: this.props.route.params.hobi,
                jenis_anak_binaan: this.props.route.params.jenis_anak_binaan,
                jarak_rumah: this.props.route.params.jarak,
                status_cpb: this.props.route.params.JB,
                latitude: this.props.route.params.latitude,
                longitude: this.props.route.params.longitude,
                foto: this.props.route.params.anakfoto,
                jenjang: this.props.route.params.tingkat,
                kelas: this.props.route.params.kelas,
                nama_sekolah: this.props.route.params.namasek,
                alamat_sekolah: this.props.route.params.alamatsek,
                semester: this.props.route.params.semester,
                jurusan: this.props.route.params.jurusan,
                kepala_keluarga: this.props.route.params.kepala,
                no_kk: this.state.noKK,
                status_ortu: this.props.route.params.SOT,
                id_kacab: this.props.route.params.cabang,
                id_wilbin: this.props.route.params.binaan,
                id_shelter: this.props.route.params.shel,
                id_bank: this.props.route.params.namabank,
                no_rek: this.props.route.params.norek,
                an_rek: this.props.route.params.an_rek,
                no_tlp: this.props.route.params.nohp,
                an_hp: this.props.route.params.an_hp,
                // surket: this.props.route.params.surket,
                // sktm: this.props.route.params.sktm,
            }
            let data = new FormData();
            for (let key in simpandata) {
                data.append(key, simpandata[key]);
            }
            fetch('https://kilauindonesia.org/datakilau/api/tambahkeluarga', {
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
                        this.props.navigation.navigate('List_Anak_Binaan')
                        // this.onRefresh()
                        ToastAndroid.show("Data berhasil ditambah!", ToastAndroid.SHORT)
                    } else if (resJson.status === 'nik_anak') {
                        Alert.alert(
                            'Peringatan',
                            'NIK Anak Sudah terdaftar',
                            [
                                {
                                    text: "Ya",
                                    onPress: () => this.setState({ modallihatnik: true }),
                                    style: "cancel"
                                },
                            ],
                            { cancelable: false },
                        )
                    } else if (resJson.status === 'no_kk') {
                        Alert.alert(
                            'Peringatan',
                            'No Kartu Keluarga Sudah terdaftar',
                            [
                                {
                                    text: "Ya",
                                    onPress: () => this.setState({ modallihatnokk: true }),
                                    style: "cancel"
                                },
                            ],
                            { cancelable: false },
                        )
                    } else {

                        ToastAndroid.show("NIK Anak/Nomer Kartu Keluarga Sudah terdaftar", ToastAndroid.SHORT)
                    }

                }

                )

                .catch((err) => console.log('dari catch send Data ===', err));
        }

    }
    onPress = (dodol, kabu, keca, tanggal, birth) => {
        console.log(dodol, kabu, keca, tanggal, birth)
        if (dodol != this.state.provwali) {
            Alert.alert(
                'Peringatan Data yang anda isi ',
                'Kode Provinsi dengan NIK TIDAK SAMA ',
                [
                    {
                        text: "Simpan",
                        onPress: () => {
                            this.SimpanData()
                        }
                        ,
                        style: "cancel"
                    },
                    {
                        text: "Ubah",
                        onPress: () => this.setState({}),
                        style: "cancel"
                    },
                ],
                { cancelable: false },
            )
        }
        if (kabu != this.state.kabwali) {
            Alert.alert(
                'Peringatan Data yang anda isi ',
                'Kode Kabupaten dengan NIK TIDAK SAMA ',
                [
                    {
                        text: "Simpan",
                        onPress: () => {
                            this.SimpanData()
                        }
                        ,
                        style: "cancel"
                    },
                    {
                        text: "Ubah",
                        onPress: () => this.setState({}),
                        style: "cancel"
                    },
                ],
                { cancelable: false },
            )
        }
        if (keca != this.state.kecwali) {
            Alert.alert(
                'Peringatan Data yang anda isi ',
                'Kode Kecamatan dengan NIK TIDAK SAMA ',
                [
                    {
                        text: "Simpan",
                        onPress: () => {
                            this.SimpanData()
                        }
                        ,
                        style: "cancel"
                    },
                    {
                        text: "Ubah",
                        onPress: () => this.setState({}),
                        style: "cancel"
                    },
                ],
                { cancelable: false },
            )
        }
        if (tanggal != moment(this.state.datewali).format('DDMMYY')) {
            Alert.alert(
                'Peringatan Data yang anda isi ',
                'Kode Tanggal Lahir dengan NIK TIDAK SAMA ',
                [
                    {
                        text: "Simpan",
                        onPress: () => {
                            this.SimpanData()
                        }
                        ,
                        style: "cancel"
                    },
                    {
                        text: "Ubah",
                        onPress: () => this.setState({}),
                        style: "cancel"
                    },
                ],
                { cancelable: false },
            )
        }
        if (dodol == this.state.provwali && kabu == this.state.kabwali && keca == this.state.kecwali && tanggal == moment(this.state.datewali).format('DDMMYY')) {
            Alert.alert(
                'Peringatan Data yang anda isi ',
                'Kode Provinsi/Kecamatan/Kabupaten dengan NIK SUDAH SAMA',
                [
                    {
                        text: "Lanjutkan",
                        onPress: () => {
                            console.log('wdadawd')
                            this.SimpanData()
                        }
                        ,
                        style: "cancel"
                    },

                ],
                { cancelable: false },
            )
        }


    }
    render() {
        const { currentStep, totalSteps } = this.state;
        const didin = this.state.nikwali;
        const dodol = didin.substring(0, 2);
        const kabu = didin.substring(0, 4)
        const keca = didin.substring(0, 6)
        const birth = moment(this.state.datewali).format('DDMMYY')
        const tanggal = didin.substring(6, 12)
        return (
            <ScrollView style={{ backgroundColor: '#fff' }}>
                <Text style={style.Label2}>Informasi Wali
                    {this.props.route.params.cabang}
                    <Text> {dodol}</Text>
                    <Text> {kabu}</Text>
                    <Text>{keca}</Text>
                    <Text>{tanggal}</Text>
                    <Text> {birth} tanggal lahir</Text>
                    {/* {moment(this.props.route.params.dateanak).format('YYYY/MM/DD')} */}
                </Text>
                <View style={{ height: '100%', alignContent: 'center', alignSelf: 'center' }}>
                    <TextInput
                        style={style.kotak3}
                        onChangeText={nikwali => this.setState({ nikwali })}
                        value={this.state.nikwali}
                        placeholder="NIK Wali"
                        placeholderTextColor="#C0C0C0"
                    />
                    <TextInput
                        style={style.kotak3}
                        onChangeText={namawali => this.setState({ namawali })}
                        value={this.state.namawali}
                        placeholder="Nama Wali"
                        placeholderTextColor="#C0C0C0"
                    />
                    <View
                        style={style.kotakpicker}>
                        <Picker
                            style={style.Textinputcss}
                            selectedValue={this.state.agamawali}
                            onValueChange={itemValue =>
                                this.setState({ agamawali: itemValue, show: 1 })
                            }>
                            <Picker.Item
                                style={{ fontSize: 14, fontFamily: 'Poppins-Regular' }}
                                label="Agama"
                                value=""
                            />
                            <Picker.Item
                                style={{ fontSize: 14, fontFamily: 'Poppins-Regular' }}
                                label="Islam"
                                value="Islam"
                            />
                            <Picker.Item
                                style={{ fontSize: 14, fontFamily: 'Poppins-Regular' }}
                                label="Kristen"
                                value="Kristen"
                            />
                            <Picker.Item
                                style={{ fontSize: 14, fontFamily: 'Poppins-Regular' }}
                                label="Hindu"
                                value="Hindu"
                            />
                            <Picker.Item
                                style={{ fontSize: 14, fontFamily: 'Poppins-Regular' }}
                                label="Budha"
                                value="Budha"
                            />
                        </Picker>
                    </View>
                    <TextInput
                        style={style.kotak3}
                        onChangeText={temwali => this.setState({ temwali })}
                        value={this.state.temwali}
                        placeholder="Tempat Lahir"
                        placeholderTextColor="#C0C0C0"
                    />

                    <View style={{ flexDirection: 'row' }}>
                        <View style={[style.kotak3, { height: 100, }]}>
                            <Text>Tanggal Lahir</Text>
                            <View style={{ flexDirection: 'row' }}>
                                <Text
                                    style={style.kotak7}>
                                    {moment(this.state.datewali).format('YYYY-MM-DD')}

                                </Text>
                                <View
                                    style={{
                                        borderColor: '#DDD',
                                        borderWidth: 1,
                                        height: 50,
                                        width: 50,
                                        borderRadius: 10,
                                        top: 10,
                                        marginLeft: 10,

                                    }}>
                                    <TouchableOpacity TouchableOpacity onPress={() => this.setState({ modaldate: true })}>
                                        <View style={{ height: 50, width: 50, justifyContent: 'center', alignItems: 'center', borderRadius: 10, }}>
                                            <Tanggal />
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>

                        <Modal
                            animationType={"slide"}
                            transparent={true}
                            visible={this.state.modaldate}
                            onRequestClose={() => this.setState({ modaldate: false })}
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
                                    // height: '50%',
                                    shadowColor: "#333",
                                    shadowOffset: {
                                        width: 1,
                                        height: 1,
                                    },
                                    shadowOpacity: 0.3,
                                    shadowRadius: 2,
                                    elevation: 3,
                                    height: '50%',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    position: 'absolute',
                                    top: '50%',
                                    bottom: 0,
                                    left: 0,
                                    right: 0,
                                }}>
                                    <Text style={style.tglText}>Pilih Tanggal</Text>
                                    <ScrollView style={{ width: '100%', height: '100%' }}>

                                        <DatePicker
                                            order='D-M-Y'
                                            style={{ height: 215, width: 380, backgroundColor: '#fff', marginLeft: 5 }}
                                            minimumDate={new Date('1000-01-01')}
                                            maximumDate={new Date('2222-12-31')}
                                            onDateChange={(date) =>
                                                this.setState({ datewali: moment(date).format('YYYY-MM-DD') }, () => console.log(this.state.datewali))
                                            }
                                        />

                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: '10%' }}>
                                            <View style={style.kotakkecil}>
                                                <TouchableOpacity onPress={() => this.setState({ modaldate: false })}>

                                                    <Text style={{
                                                        justifyContent: 'center', textAlign: 'center',
                                                    }}>Batal</Text>
                                                </TouchableOpacity>
                                            </View>
                                            <View style={style.kotakkecil}>


                                                <TouchableOpacity onPress={() => this.setState({ modaldate: false })}>
                                                    <Text style={{
                                                        justifyContent: 'center', textAlign: 'center',
                                                    }}>Simpan</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    </ScrollView>
                                </View>
                            </View>
                        </Modal>
                    </View>

                    <View>
                        <View style={style.infoContainer} >
                            <TextInput style={style.txtDesc} placeholder="Alamat Lengkap"
                                placeholderTextColor='#A9A9A9'
                                keyboardType="email-address"
                                value={this.state.alamatwali}
                                onChangeText={alamatwali => this.setState({ alamatwali })}
                                multiline={true}
                                numberOfLines={5}
                                autoCorrect={false}>
                            </TextInput>
                        </View>
                    </View>
                    <View
                        style={style.kotakpicker}>
                        <Picker
                            selectedValue={this.state.provwali}
                            onValueChange={(itemValue) => {
                                this.setState({
                                    provwali: itemValue
                                }, () => console.log(this.state.provwali))
                            }}>
                            <Picker.Item style={{ fontSize: 12 }} label={'Pilih Provinsi'} value={'0'} key={'0'} />

                            {
                                this.state.prov.map((prov) =>
                                    <Picker.Item style={{ height: '100%', width: '100%', fontSize: 12, }} label={prov.nama} value={prov.id_prov} key={prov.id_prov} />
                                )}
                        </Picker>
                    </View>

                    <View
                        style={style.kotakpicker}>
                        <Picker
                            selectedValue={this.state.kabwali}
                            onFocus={() => { this.GetKabupatenAPi() }}
                            onValueChange={(itemValue, prov) => {
                                this.setState({
                                    kabwali: itemValue
                                })
                            }}>
                            <Picker.Item style={{ fontSize: 12 }} label={'Pilih Kabupaten'} value={'0'} key={'0'} />

                            {
                                this.state.kab.map((kab) =>
                                    <Picker.Item style={{ height: '100%', width: '100%', fontSize: 12, }} label={kab.nama.toString()} value={kab.id_kab} key={kab.id_kab} />
                                )}
                        </Picker>
                    </View>
                    <View
                        style={style.kotakpicker}>
                        <Picker
                            selectedValue={this.state.kecwali}
                            onFocus={() => { this.GetKecamatanAPi() }}
                            onValueChange={(itemValue, kab) => {
                                this.setState({
                                    kecwali: (itemValue)
                                })
                            }}>
                            <Picker.Item style={{ fontSize: 12 }} label={'Pilih Kecamatan'} value={'0'} key={'0'} />

                            {
                                this.state.kecamatan.map((kec) =>
                                    <Picker.Item style={{ height: '100%', width: '100%', fontSize: 12, }} label={kec.nama.toString()} value={kec.id_kec} key={kec.id_kec} />
                                )}
                        </Picker>
                    </View>
                    <View
                        style={style.kotakpicker}>
                        <Picker
                            selectedValue={this.state.kelwali}
                            onFocus={() => { this.GetKelurahanAPi() }}
                            onValueChange={(itemValue, kec) => {
                                this.setState({
                                    kelwali: (itemValue)
                                })
                            }}>
                            <Picker.Item style={{ fontSize: 12 }} label={'Pilih Kelurahan'} value={'0'} key={'0'} />
                            {
                                this.state.kelurahan.map((kel) =>
                                    <Picker.Item style={{ height: '100%', width: '100%', fontSize: 12, }} label={kel.nama.toString()} value={kel.id_kel} key={kel.id_kel} />
                                )}
                        </Picker>
                    </View>



                    <View style={style.kotakpicker}>
                        <Picker style={style.Textinputcss} mode="dropdown"
                            selectedValue={this.state.penghasilanwali}
                            onValueChange={(itemValue,) => {
                                this.setState({
                                    penghasilanwali: itemValue
                                })
                            }}>
                            <Picker.Item style={{ fontSize: 12 }} label={'Pilih Penghasilan'} value={'0'} key={'0'} />
                            <Picker.Item label="Dibawah Rp.500.000,-" value="Dibawah Rp.500.000,-" />
                            <Picker.Item label="Rp.500.000,- s/d Rp.1.500.000,-" value="Rp.500.000,- s/d Rp.1.500.000,-" />
                            <Picker.Item label="Rp.1.500.000,- s/d Rp.2.500.000,-" value="Rp.1.500.000,- s/d Rp.2.500.000,-" />
                            <Picker.Item label="Rp.2.500.000,- s/d Rp.3.500.000,-" value="Rp.2.500.000,- s/d Rp.3.500.000,-" />
                            <Picker.Item label="Rp.3.500.000,- s/d Rp.5.000.000,-" value="Rp.3.500.000,- s/d Rp.5.000.000,-" />
                            <Picker.Item label="Rp.5.000.000,- s/d Rp.7.000.000,-" value="Rp.5.000.000,- s/d Rp.7.000.000,-" />
                            <Picker.Item label="Rp.7.000.000,- s/d Rp.10.000.000,-" value="Rp.7.000.000,- s/d Rp.10.000.000,-" />
                            <Picker.Item label="Diatas Rp.10.000.000,-" value="Diatas Rp.10.000.000,-" />
                        </Picker>
                    </View>



                    <View
                        style={style.kotakpicker}>
                        <Picker
                            selectedValue={this.state.hubungan}
                            onValueChange={(itemValue) => {
                                this.setState({
                                    hubungan: (itemValue)
                                })
                            }}>
                            <Picker.Item style={{ fontSize: 12 }} label={'Pilih Hub.Kerabat'} value={'0'} key={'0'} />
                            <Picker.Item label="Kakak" value="kakak" />
                            <Picker.Item label="Saudara dari Ayah" value="saudara_ibu" />
                            <Picker.Item label="Saudara dari Ibu" value="saudara_ayah" />
                            <Picker.Item label="Tidak Ada Hubungan Kerabat" value="tdk_ada_hub" />
                        </Picker>
                    </View>
                    <TouchableOpacity style={style.nextbuttonTextStyle} onPress={() =>
                        // this.state.NIK === '' ? alert('Tolong ada kolom yang belum terisi') :
                        //     this.state.ayah === '' ? alert('Tolong ada kolom yang belum terisi') :
                        //         this.state.ag === '' ? alert('Tolong ada kolom yang belum terisi') :
                        //             this.state.jarak === '' ? alert('Tolong ada kolom yang belum terisi') :
                        //                 this.state.lahir === '' ? alert('Tolong ada kolom yang belum terisi') :
                        //                     this.state.tglahir === '' ? alert('Tolong ada kolom yang belum terisi') :
                        //                         this.state.hub === '' ? alert('Tolong ada kolom yang belum terisi') :
                        //                             this.state.gaji === '' ? alert('Tolong ada kolom yang belum terisi') :
                        // this.sendData()

                        this.onPress(dodol, kabu, keca, tanggal, birth)}>
                        <Text>Simpan</Text>
                    </TouchableOpacity>
                </View>

                <Modal animationType={"fade"} transparent={true}
                    visible={this.state.modallihatnik}
                    onRequestClose={() => this.setState({ modallihatnik: false })}>

                    <View style={{
                        backgroundColor: '#fff',
                        paddingTop: 5,
                        marginHorizontal: 5,
                        marginTop: '50%',
                        borderRadius: 20,
                        height: '35%',
                        width: '90%',
                        borderWidth: 1,
                        alignItems: 'center',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignSelf: 'center',
                        borderColor: '#f0f0f0'
                    }}>
                        <SafeAreaView style={{ alignItems: 'center' }}>
                            {/* <View style={style.form}>
                                <Text style={style.labelkiri}>No Kartu Keluarga</Text>
                                <TextInput
                                    style={style.kotak100}
                                    onChangeText={noKK => this.setState({ noKK })}
                                    value={this.state.noKK}
                                    keyboardType='numeric'
                                    placeholder=""
                                    placeholderTextColor="#C0C0C0"
                                />
                            </View> */}
                            <View style={style.form}>
                                <Text style={style.labelkiri}>NIK Anak</Text>
                                <TextInput
                                    style={style.kotak100}
                                    onChangeText={nik_anak => this.setState({ nik_anak })}
                                    value={this.state.nik_anak}
                                    keyboardType='numeric'
                                    placeholder=""
                                    placeholderTextColor="#C0C0C0"
                                />
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                                {/* <View style={[style.kotakkecil, { backgroundColor: '#DC143C', }]}>
                                    <TouchableOpacity onPress={() => this.setState({ modallihat: false })}>
                                        <Text style={{ color: '#fff', textAlign: 'center', padding: 5 }}>Batal</Text>
                                    </TouchableOpacity>
                                </View> */}

                                <View style={[style.kotakkecil, { width: '28%', backgroundColor: '#00A9B8' }]}>
                                    <TouchableOpacity onPress={() => this.setState({ modallihatnik: false }, this.SimpanDatanik())}>
                                        {/* <KKada style={{ justifyContent: 'center', alignSelf: 'center' }} /> */}
                                        <Text style={{ color: '#fff', textAlign: 'center', padding: 5 }}>Simpan</Text>
                                    </TouchableOpacity>
                                </View>

                            </View>
                        </SafeAreaView>
                    </View >

                </Modal >


                <Modal animationType={"fade"} transparent={true}
                    visible={this.state.modallihatnokk}
                    onRequestClose={() => this.setState({ modallihatnokk: false })}>

                    <View style={{
                        backgroundColor: '#fff',
                        paddingTop: 5,
                        marginHorizontal: 5,
                        marginTop: '50%',
                        borderRadius: 20,
                        height: '35%',
                        width: '90%',
                        borderWidth: 1,
                        alignItems: 'center',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignSelf: 'center',
                        borderColor: '#f0f0f0'
                    }}>
                        <SafeAreaView style={{ alignItems: 'center' }}>
                            <View style={style.form}>
                                <Text style={style.labelkiri}>No Kartu Keluarga</Text>
                                <TextInput
                                    style={style.kotak100}
                                    maxLength={16}
                                    onChangeText={noKK => this.setState({ noKK })}
                                    value={this.state.noKK}
                                    keyboardType='numeric'
                                    placeholder=""
                                    placeholderTextColor="#C0C0C0"
                                />
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>


                                <View style={[style.kotakkecil, { width: '28%', backgroundColor: '#00A9B8' }]}>
                                    <TouchableOpacity onPress={() => this.setState({ modallihatnokk: false }, this.SimpanData())}>
                                        {/* <KKada style={{ justifyContent: 'center', alignSelf: 'center' }} /> */}
                                        <Text style={{ color: '#fff', textAlign: 'center', padding: 5 }}>Simpan</Text>
                                    </TouchableOpacity>
                                </View>

                            </View>
                        </SafeAreaView>
                    </View >

                </Modal >

            </ScrollView>
        )
    }
}

export default Four
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const style = StyleSheet.create({
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    header: {
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        width: windowWidth * 0.95,
        height: windowHeight * 0.29,
        flexDirection: 'row',
    },
    header2: {
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        width: windowWidth * 0.6,
        height: windowHeight * 0.3,
        flexDirection: 'row',
    },
    contentContainer: {
        backgroundColor: '#fff',
        width: '100%',
        height: '100%',
        flex: 1,
    }, // vildan menghapus flex dan menambahkan backgroundCOlor,width dan hight
    colnilai: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    Label2: {
        marginTop: -5,
        fontSize: 16,
        marginTop: 10,
        marginLeft: 10,
        width: '100%',
        color: '#000',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Poppins-Medium',
    },
    Label3: {
        marginTop: 10,
        fontSize: 16,
        width: '100%',
        color: '#000',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Poppins-Medium',
    },
    Label3: {
        marginTop: 15,
        fontSize: 16,
        width: '100%',
        color: '#000',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Poppins-Medium',
    },
    title2: {
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginRight: 20,
        fontSize: 15,
        color: '#000',
        fontFamily: 'Poppins-SemiBold',
    },
    Textinputcss: {
        color: '#C0C0C0',
        marginTop: -10,
        borderRadius: 10,
        borderWidth: 1,
        fontSize: 10,
        height: 40,
        borderColor: '#C0C0C0',
        fontFamily: 'Poppins-Regular',
    },
    Textinputcss2: {
        color: '#C0C0C0',
        marginTop: 10,
        left: 2,
        marginLeft: 10,
        borderRadius: 10,
        borderWidth: 1,
        fontSize: 10,
        height: 30,
        width: windowWidth - 240,
        borderColor: '#C0C0C0',
        fontFamily: 'Poppins-Regular',
    },
    kotak3: {
        marginTop: 10,
        color: '#000',
        borderRadius: 10,
        borderWidth: 0.1,
        fontSize: 13,
        height: 50,
        width: windowWidth - 40,
        padding: 12,
        backgroundColor: '#fff',
        borderColor: '#DDDDDD',
        borderWidth: 1,
        fontFamily: 'Poppins-Regular',
    },
    kotak4: {
        marginTop: 10,
        color: '#000',
        borderRadius: 10,
        borderWidth: 0.1,
        fontSize: 13,
        height: 50,
        width: windowWidth - 123,
        padding: 12,
        backgroundColor: '#fff',
        borderColor: '#DDDDDD',
        borderWidth: 1,
        fontFamily: 'Poppins-Regular',
    },
    kotak7: {
        marginTop: 10,
        color: "#C0C0C0",
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
    kotak5: {
        marginTop: 15,
        color: '#000',
        borderRadius: 10,
        borderWidth: 0.1,
        fontSize: 13,
        height: 100,
        width: windowWidth - 40,
        backgroundColor: '#fff',
        borderColor: '#DDDDDD',
        borderWidth: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        padding: 12,
        fontFamily: 'Poppins-Regular',
        textAlignVertical: 'top'
    },
    kotak6: {
        marginTop: 10,
        color: '#000',
        borderRadius: 10,
        marginHorizontal: 10,
        borderWidth: 0.1,
        fontSize: 14,
        height: 50,
        width: 83,
        backgroundColor: '#fff',
        borderColor: '#DDDDDD',
        borderWidth: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        padding: 12,
        fontFamily: 'Poppins-Regular',
        textAlignVertical: 'top'
    },
    kotakpicker: {
        marginTop: 10,
        paddingVertical: 5,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#DDD',
        width: windowWidth - 20,
    },
    infoContainer: {
        width: '100%',
        marginTop: 10,
        borderRadius: 10,
        borderWidth: 1,
        height: 70,
        borderColor: '#DDDDDD',
        backgroundColor: '#fff',
    },
    ModalCont2: {
        flex: 1,
        backgroundColor: '#00000079',
    },
    imgSmall: {
        position: 'absolute', flex: 1, alignItems: 'center', justifyContent: 'center'
    },
    nextbuttonTextStyle: {
        backgroundColor: '#00A9B8',
        height: 50,
        width: 130,
        marginTop: 10,
        borderRadius: 12,
        color: 'white',
        justifyContent: 'center',
        alignContent: 'center',
        alignSelf: 'center',
        paddingHorizontal: 25,
        paddingVertical: 13,
        fontFamily: 'Poppins-SemiMedium',
        fontSize: 15,
    },
    kotakkecil: {
        borderColor: '#bdbdbd',
        borderWidth: 1,
        width: '40%',
        height: 50,
        justifyContent: 'center',
        alignContent: 'center',
        alignSelf: 'center',
        borderRadius: 10,
        marginTop: 10,
        marginHorizontal: 10,
    },
    kotak100: {
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
    // contentContainer: {
    // },
    // Label1: {
    //     flex: 1,
    //     fontSize: 15,
    //     marginTop: 10,
    //     marginBottom: -1,
    //     marginLeft: 30,
    //     color: '#000000',
    //     flexDirection: 'column',
    // },
    // Textinputcss: {
    //     color: '#7e7e7e',
    //     marginLeft: 15,
    //     marginRight: 10,
    //     borderRadius: 10,
    //     borderWidth: 1,
    //     fontSize: 12,
    //     height: 52,
    //     backgroundColor: '#fff',
    //     shadowColor: "#333",
    //     shadowOffset: {
    //         width: 1,
    //         height: 1,
    //     },
    //     shadowOpacity: 0.3,
    //     shadowRadius: 2,
    //     borderColor: '#7e7e7e',
    //     elevation: 3,
    // },
    // Label2: {
    //     marginTop: 5,
    //     marginLeft: 25,
    //     padding: 5,
    //     color: '#000',
    //     alignItems: 'center',
    //     justifyContent: 'center'
    // },
    // kotak2: {
    //     color: '#000000',
    //     marginTop: 10,
    //     marginLeft: 30,
    //     marginRight: 10,
    //     borderRadius: 2,
    //     borderWidth: 0.1,
    //     fontSize: 12,
    //     height: 52,
    //     backgroundColor: '#7e7e7e',
    // },
    // title1: {
    //     marginRight: 20,
    //     marginLeft: 20,
    //     marginTop: 15,
    //     marginBottom: 15,
    //     fontSize: 18,
    //     fontWeight: 'bold',
    //     color: '#fff',
    // },
    // Labeltgl: {
    //     marginTop: 5,
    //     position: 'absolute',
    //     top: 0, left: 10, right: 0, bottom: 0,
    //     height: 25, width: 25,
    // },
    // item: {
    //     flex: 1,
    //     fontSize: 16,
    //     flexDirection: 'row',
    //     backgroundColor: '#fff',
    //     padding: 17,
    //     marginVertical: 8,
    //     marginHorizontal: 16,
    //     shadowColor: "#333",
    //     shadowOffset: {
    //         width: 1,
    //         height: 1,
    //     },
    //     shadowOpacity: 0.3,
    //     shadowRadius: 2,
    //     borderColor: '#7e7e7e',
    //     elevation: 3,
    // },
    // container: {
    //     marginTop: 40,
    //     marginLeft: 75,
    //     width: 250,
    //     height: 250,
    //     flex: 1,
    //     margin: 20,
    //     alignItems: 'center',
    //     justifyContent: 'center',
    //     backgroundColor: '#fff',
    //     shadowColor: "#333",
    //     shadowOffset: {
    //         width: 1,
    //         height: 1,
    //     },
    //     shadowOpacity: 0.3,
    //     shadowRadius: 2,
    //     borderColor: '#7e7e7e',
    //     elevation: 3,
    // },

    // btnSimpanUn1: {
    //     width: '40%',
    //     fontWeight: 'bold',
    //     backgroundColor: '#C6C6C6',
    //     borderRadius: 10,
    //     padding: 10,
    //     borderWidth: 1,
    //     borderColor: '#E9E9E9',
    //     justifyContent: 'center', alignItems: 'center',
    //     alignContent: 'center',
    //     textAlign: 'center',
    // },
    // coltom1: {
    //     width: '90%',
    //     marginLeft: 20,
    //     justifyContent: 'space-between',
    //     alignItems: 'center',
    //     alignContent: 'center',
    //     fontSize: 16,
    //     flexDirection: 'row',
    //     paddingTop: 10,
    //     paddingBottom: 10,
    //     backgroundColor: '#fff',
    //     marginVertical: 8,
    //     marginHorizontal: 16,
    //     shadowColor: "#333",
    //     shadowOffset: {
    //         width: 1,
    //         height: 1,
    //     },
    //     shadowOpacity: 0.3,
    //     shadowRadius: 2,
    //     borderColor: '#7e7e7e',
    //     elevation: 3,
    // },
    // itemflat: {
    //     fontSize: 16,
    //     flexDirection: 'column',
    //     backgroundColor: '#fff',
    //     padding: 20,
    //     height: 75,
    //     shadowColor: "#333",
    //     shadowOffset: {
    //         width: 1,
    //         height: 1,
    //     },
    //     shadowOpacity: 0.3,
    //     shadowRadius: 2,
    //     borderColor: '#7e7e7e',
    //     elevation: 1,
    // },
    // ModalCont2: {
    //     flex: 1,
    //     backgroundColor: '#00000079',
    // },
    // wrap: {
    //     width: Dimensions.get('window').width,
    //     height: Dimensions.get('window').height * 0.25 // 25% window
    // },
    // itemText: {
    //     textAlign: 'justify',
    //     marginLeft: 10,
    //     fontSize: 12,
    //     width: '35%',
    //     height: 43,
    // },
    // btnSimpanDark: {
    //     flexDirection: 'row',
    //     color: '#fff',
    //     fontWeight: 'bold',
    //     textAlign: 'center',
    //     width: 150, height: 50,
    //     backgroundColor: '#87cefa',
    //     borderRadius: 10,
    //     padding: 10,
    //     borderWidth: 1,
    //     borderColor: '#E9E9E9',
    //     justifyContent: 'center', alignContent: 'center',
    //     marginLeft: 120,
    //     fontSize: 12,
    // },
    // txtDesc: {
    //     color: '#2E3E5C',
    //     fontSize: 15,
    //     paddingLeft: 5,
    //     height: 100,
    //     marginHorizontal: 15,
    // },
    // infoContainer: {
    //     width: '90%',
    //     marginLeft: 30,
    //     backgroundColor: '#fff',
    //     borderRadius: 10,
    //     borderWidth: 1,
    //     height: 70,
    //     borderColor: '#E9E9E9',
    // },
    // currentStepText: {
    //     color: "#7e7e7e",
    //     fontSize: 12
    // },
    // kotak5: {
    //     width: '90%',
    //     height: 90,
    //     borderRadius: 10,
    //     borderWidth: 1,
    //     marginLeft: 20,
    //     marginTop: 10,
    //     borderColor: '#E9E9E9',
    //     backgroundColor: '#fff',
    //     flexDirection: 'column',
    //     justifyContent: 'space-around'
    // },
    // Label2: {
    //     marginBottom: -30,
    //     marginLeft: 25,
    //     color: '#000',
    // },
    // kotak3: {
    //     color: '#000000',
    //     marginTop: 2,
    //     marginLeft: 20,
    //     marginRight: 10,
    //     borderRadius: 2,
    //     borderWidth: 0.1,
    //     fontSize: 12,
    //     height: 40,
    //     width: '90%',
    //     backgroundColor: '#F0F8FF',
    // },
    // kotak4: {
    //     color: '#000000',
    //     marginTop: 2,
    //     marginLeft: 18,
    //     marginRight: 10,
    //     borderRadius: 2,
    //     borderWidth: 0.1,
    //     fontSize: 12,
    //     height: 50,
    //     width: '90%',
    //     backgroundColor: '#F0F8FF',
    // },
    // kotak6: {
    //     width: '90%',
    //     height: 100,
    //     borderRadius: 10,
    //     borderWidth: 1,
    //     marginLeft: 20,
    //     marginTop: 10,
    //     borderColor: '#E9E9E9',
    //     backgroundColor: '#fff',
    //     flexDirection: 'column',
    //     justifyContent: 'space-around'
    // },
});



{/* <View style={{ backgroundColor: '#00A9B8' }}>
<Text style={style.title1}>Tambah Anak Binaan</Text>
</View>
<Text
style={style.currentStepText}
>{`Tahap 6`}</Text>
<View style={style.kotak5}>
<Text style={style.Label2}>NIK Wali</Text>
<TextInput
    style={style.kotak3}
    onChangeText={NIK => this.setState({ NIK })}
    value={this.state.NIK}
    keyboardType='numeric'
    placeholder="NIK wali"
    placeholderTextColor='#7e7e7e'
/>
</View>
<View style={style.kotak5}>
<Text style={style.Label2}>Nama Wali</Text>
<TextInput
    style={style.kotak3}
    onChangeText={wali => this.setState({ wali })}
    value={this.state.wali}
    keyboardType='default'
    placeholder="Nama wali"
    placeholderTextColor='#7e7e7e'
/>
</View>
<View>
<Text style={style.Label1}>Agama</Text>
<Picker style={style.Textinputcss} mode="dropdown"
    selectedValue={this.state.ag}
    onValueChange={(itemValue) => {
        this.setState({
            ag: itemValue
        })
    }}>
    <Picker.Item style={{ fontSize: 12 }} label={'Pilih Agama'} value={'0'} key={'0'} />
    <Picker.Item label="Islam" value="Islam" />
    <Picker.Item label="Kristen" value="Kristen" />
    <Picker.Item label="Budha" value="Budha" />
    <Picker.Item label="Hindu" value="Hindu" />
    <Picker.Item label="Konghuncu" value="Konghuncu" />
</Picker>
</View>

<View style={style.kotak5}>
<Text style={style.Label2}>Tempat Lahir</Text>
<TextInput
    style={style.kotak3}
    onChangeText={lahir => this.setState({ lahir })}
    value={this.state.lahir}
    keyboardType='default'
    placeholder="Tempat lahir"
    placeholderTextColor='#7e7e7e'
/>
</View>
<View style={style.kotak5}>
<Text style={style.Label2}>Tanggal Lahir</Text>
<TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-around', backgroundColor: '#F0F8FF', width: '90%', marginLeft: 20 }} onPress={() => this.setState({ modaldate: true })}>
    <Image source={date}
        style={{
            height: 30,
            width: 30,
            marginTop: 5,
            marginLeft: 20,
        }}></Image>
    <Text style={style.Label1}>{this.state.date.toLocaleString('default', { month: 'short' })}</Text>
</TouchableOpacity>
</View>

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

<View>
<Text style={style.Label1}>Provinsi</Text>
<Picker style={style.Textinputcss} mode="dropdown"
    selectedValue={this.state.pro}
    onValueChange={(itemValue) => {
        this.setState({
            pro: itemValue
        })
    }}>
    <Picker.Item style={{ fontSize: 12 }} label={'Pilih provinsi'} value={'0'} key={'0'} />
    {
        this.state.prov.map((pro) =>
            <Picker.Item style={{ height: '100%', width: '100%', fontSize: 12, }} label={pro.name.toString()} value={pro.province_id} key={pro.province_id} />
        )}
</Picker>
</View>
<View>
<Text style={style.Label1}>Kabupaten/Kota</Text>
<Picker style={style.Textinputcss} mode="dropdown" onFocus={() => { this.GetkotaAPi() }} //untuk get data yang terhubung dengan picker lain//
    selectedValue={this.state.kot}
    onValueChange={(itemValue, prov) => {
        {
            this.setState({ kot: (itemValue), })
        }
    }}>
    <Picker.Item style={{ fontSize: 12 }} label={'Pilih Kota'} value={'0'} key={'0'} />
    {
        this.state.kota.map((kot) =>
            <Picker.Item style={{ height: '100%', width: '100%', fontSize: 12, }} label={kot.name.toString()} value={kot.name.toString()} key={kot.name.toString()} />
        )}
</Picker>
</View>

<View>
<Text style={style.Label1}>Kecamatan</Text>
<Picker style={style.Textinputcss} mode="dropdown"
    selectedValue={this.state.kec}
    onValueChange={(itemValue) => {
        this.setState({
            kec: itemValue
        })
    }}>
    <Picker.Item style={{ fontSize: 12 }} label={'Pilih Kecamatan'} value={'0'} key={'0'} />
    {
        this.state.kecamatan.map((kec) =>
            <Picker.Item style={{ height: '100%', width: '100%', fontSize: 12, }} label={lv.id_level_anak_binaan.toString()} value={lv.id_level_anak_binaan.toString()} key={lv.id_level_anak_binaan.toString()} />
        )}
</Picker>
</View>
<View>
<Text style={style.Label1}>Kelurahan</Text>
<Picker style={style.Textinputcss} mode="dropdown"
    selectedValue={this.state.kel}
    onValueChange={(itemValue) => {
        this.setState({
            kel: itemValue
        })
    }}>
    <Picker.Item style={{ fontSize: 12 }} label={'Pilih Kelurahan'} value={'0'} key={'0'} />
    {
        this.state.kelurahan.map((kel) =>
            <Picker.Item style={{ height: '100%', width: '100%', fontSize: 12, }} label={lv.id_level_anak_binaan.toString()} value={lv.id_level_anak_binaan.toString()} key={lv.id_level_anak_binaan.toString()} />
        )}
</Picker>
</View>

<View>
<Text style={style.Label1}>Penghasilan</Text>
<Picker style={style.Textinputcss} mode="dropdown"
    selectedValue={this.state.gaji}
    onValueChange={(itemValue) => {
        this.setState({
            gaji: itemValue
        })
    }}>
    <Picker.Item style={{ fontSize: 12 }} label={'Pilih Penghasilan'} value={'0'} key={'0'} />
    <Picker.Item label="Dibawah Rp.500.000,-" value="Kakak" />
    <Picker.Item label="Rp.500.000,- s/d Rp.1.500.000,-" value="1" />
    <Picker.Item label="Rp.1.500.000,- s/d Rp.2.500.000,-" value="2" />
    <Picker.Item label="Rp.2.500.000,- s/d Rp.3.500.000,-" value="3" />
    <Picker.Item label="Rp.3.500.000,- s/d Rp.5.000.000,-" value="4" />
    <Picker.Item label="Rp.5.000.000,- s/d Rp.7.000.000,-" value="5" />
    <Picker.Item label="Rp.7.000.000,- s/d Rp.10.000.000,-" value="6" />
    <Picker.Item label="Diatas Rp.10.000.000,-" value="7" />

</Picker>
</View>

<View>
<Text style={style.Label1}>Hubungan Kerabat</Text>
<Picker style={style.Textinputcss} mode="dropdown"
    selectedValue={this.state.hub}
    onValueChange={(itemValue) => {
        this.setState({
            hub: itemValue
        })
    }}>
    <Picker.Item style={{ fontSize: 12 }} label={'Pilih Hub.Kerabat'} value={'0'} key={'0'} />
    <Picker.Item label="Kakak" value="Kakak" />
    <Picker.Item label="Saudara dari Ayah" value="SA" />
    <Picker.Item label="Saudara dari Ibu" value="SI" />
    <Picker.Item label="Tidak Ada Hubungan Kerabat" value="TAHK" />
</Picker>
</View> */}