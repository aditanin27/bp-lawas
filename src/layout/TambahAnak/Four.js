import { ScrollView, Text, View, StyleSheet, Dimensions, TextInput, TouchableOpacity, Image, Modal, Alert } from 'react-native'
import React, { Component } from 'react'
import { Picker } from '@react-native-picker/picker';
// import { DatePicker } from 'react-native-wheel-pick';// import DateTimePicker from 'react-native-modal-datetime-picker';
import { x, date } from '../../assets/images'
import moment from 'moment'
import { Tanggal } from '../../assets/icons';
// import { Date } from '../../assets/icons'
export class Four extends Component {
    constructor(props) {
        super(props)
        this.state = {
            nikayah: '',
            namaayah: '',
            agamaayah: '',
            temayah: '',
            alamatayah: '',
            // dateayah: '',
            // dateayah2: '',
            provayah: '',
            id_pro: '',
            kabayah: '',
            kecayah: '',
            kelayah: '',
            penghasilanayah: '',
            penyebabayah: '',
            prov: [],
            kab: [],
            kecamatan: [],
            kelurahan: [],
            penghasilan: [],
            gaji: '',
            deskripsi: '',
            totalSteps: "",
            currentStep: "",
            nameError: '',
            namapro: [],

            // so: props.route.params.so,
            enabled: true,//props.route.params.so
            dateayah: new Date(),
            dateayah2: new Date(),
            // date2: new Date(),
            modaldate: false,
            modaldate2: false,
            show: false,
            isVisible: false,
            filter: [],
        }
    }

    componentDidMount() {
        this.GetprovAPi();
        this.GetKabupatenAPi();
        this.GetKelurahanAPi();
        this.GetKecamatanAPi();
        this.GetAPi();
        console.log()
    }
    GetprovAPi() {

        fetch('https://kilauindonesia.org/datakilau/api/getprovinsi').then(res => {
            if (res.status === 200)
                return res.json()
        }).then(resdata => {
            console.log(resdata.data)
            this.setState({
                prov: resdata.data,
                filter: resdata.data

            })
        })
    }

    GetAPi() {
        const sen = this.state.nikayah.substring(0, 2);
        console.log(sen)
        // const provi = nikayah.substring(0, 2);
        fetch('https://kilauindonesia.org/datakilau/api/getprov/' + sen).then(res => {
            if (res.status === 200)
                return res.json()
        }).then(resdata => {
            console.log(resdata.data)
            this.setState({
                namapro: resdata.data

            })
        })
    }
    GetKabupatenAPi() {
        fetch('https://kilauindonesia.org/datakilau/api/getkab/' + this.state.provayah).then(res => {
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
        fetch('https://kilauindonesia.org/datakilau/api/getkec/' + this.state.kabayah).then(res => {
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
        fetch('https://kilauindonesia.org/datakilau/api/getkel/' + this.state.kecayah).then(res => {
            if (res.status === 200)
                return res.json()
        }).then(resdata => {
            console.log(resdata.data)
            this.setState({
                kelurahan: resdata.data

            })
        })
    }
    handlePicker = (date) => {
        this.setState({ isVisible: false, chosenDate: moment(date).format('DD-MM-YYYY') })
    }
    hidePicker = () => {
        this.setState({
            isVisible: false,

        })
    }
    showPicker = () => {
        this.setState({ isVisible2: true })
    }
    handlePicker2 = (date2) => {
        this.setState({ isVisible2: false, chosenDate2: moment(date2).format('DD-MM-YYYY') })
    }
    hidePicker2 = () => {
        this.setState({
            isVisible2: false,

        })
    }
    showPicker2 = () => {
        this.setState({ isVisible2: true })
    }

    onPress = (dodol, kabu, keca, tanggal, birth) => {
        console.log(dodol, kabu, keca, tanggal, birth)
        if (dodol != this.state.provayah) {
            Alert.alert(
                'Peringatan Data yang anda isi ',
                'Kode Provinsi dengan NIK TIDAK SAMA ',
                [
                    {
                        text: "Ubah",
                        onPress: () => this.setState({}),
                        style: "cancel"
                    },
                    {
                        text: "Lanjutkan",
                        onPress: () => this.props.navigation.replace('Five', {
                            nikayah: this.state.nikayah,
                            namaayah: this.state.namaayah,
                            agamaayah: this.state.agamaayah,
                            temayah: this.state.temayah,
                            alamatayah: this.state.alamatayah,
                            dateayah: this.state.dateayah,
                            dateayah2: this.state.dateayah2,
                            provayah: this.state.provayah,
                            kabayah: this.state.kabayah,
                            kecayah: this.state.kecayah,
                            kelayah: this.state.kelayah,
                            penghasilanayah: this.state.penghasilanayah,
                            penyebabayah: this.state.penyebabayah,
                            nikanak: this.props.route.params.nikanak,
                            latitude: this.props.route.params.latitude,
                            longitude: this.props.route.params.longitude,
                            anak: this.props.route.params.anak,
                            saudara: this.props.route.params.saudara,
                            panggilan: this.props.route.params.panggilan,
                            namaanak: this.props.route.params.namaanak,
                            agama: this.props.route.params.agama,
                            jenis_anak_binaan: this.props.route.params.jenis_anak_binaan,
                            tempatlahir: this.props.route.params.tempatlahir,
                            dateanak: this.props.route.params.dateanak,
                            JK: this.props.route.params.JK,
                            TB: this.props.route.params.TB,
                            prestasi: this.props.route.params.prestasi,
                            kendaraan: this.props.route.params.kendaraan,
                            pelfa: this.props.route.params.pelfa,
                            hobi: this.props.route.params.hobi,
                            JB: this.props.route.params.JB,
                            jarak: this.props.route.params.jarak,
                            anakfoto: this.props.route.params.anakfoto,
                            tingkat: this.props.route.params.tingkat,
                            kelas: this.props.route.params.kelas,
                            namasek: this.props.route.params.namasek,
                            alamatsek: this.props.route.params.alamatsek,
                            semester: this.props.route.params.semester,
                            jurusan: this.props.route.params.jurusan,
                            kepala: this.props.route.params.kepala,
                            KK: this.props.route.params.KK,
                            cabang: this.props.route.params.cabang,
                            binaan: this.props.route.params.binaan,
                            shel: this.props.route.params.shel,
                            SOT: this.props.route.params.SOT,
                            namabank: this.props.route.params.namabank,
                            norek: this.props.route.params.norek,
                            an_rek: this.props.route.params.an_rek,
                            nohp: this.props.route.params.nohp,
                            an_hp: this.props.route.params.an_hp,
                            notelp: this.props.route.params.notelp,
                            surket: this.props.route.params.surket,
                            sktm: this.props.route.params.sktm,

                        }),
                        style: "cancel"
                    },
                ],
                { cancelable: false },
            )
        }

        if (kabu != this.state.kabayah) {
            Alert.alert(
                'Peringatan Data yang anda isi ',
                'Kode Kabupaten dengan NIK TIDAK SAMA ',
                [
                    {
                        text: "Ubah",
                        onPress: () => this.setState({}),
                        style: "cancel"
                    },
                    {
                        text: "Lanjutkan",
                        onPress: () => this.props.navigation.replace('Five', {
                            nikayah: this.state.nikayah,
                            namaayah: this.state.namaayah,
                            agamaayah: this.state.agamaayah,
                            temayah: this.state.temayah,
                            alamatayah: this.state.alamatayah,
                            dateayah: this.state.dateayah,
                            dateayah2: this.state.dateayah2,
                            provayah: this.state.provayah,
                            kabayah: this.state.kabayah,
                            kecayah: this.state.kecayah,
                            kelayah: this.state.kelayah,
                            penghasilanayah: this.state.penghasilanayah,
                            penyebabayah: this.state.penyebabayah,
                            nikanak: this.props.route.params.nikanak,
                            latitude: this.props.route.params.latitude,
                            longitude: this.props.route.params.longitude,
                            anak: this.props.route.params.anak,
                            saudara: this.props.route.params.saudara,
                            panggilan: this.props.route.params.panggilan,
                            namaanak: this.props.route.params.namaanak,
                            agama: this.props.route.params.agama,
                            jenis_anak_binaan: this.props.route.params.jenis_anak_binaan,
                            tempatlahir: this.props.route.params.tempatlahir,
                            dateanak: this.props.route.params.dateanak,
                            JK: this.props.route.params.JK,
                            TB: this.props.route.params.TB,
                            prestasi: this.props.route.params.prestasi,
                            kendaraan: this.props.route.params.kendaraan,
                            pelfa: this.props.route.params.pelfa,
                            hobi: this.props.route.params.hobi,
                            JB: this.props.route.params.JB,
                            jarak: this.props.route.params.jarak,
                            anakfoto: this.props.route.params.anakfoto,
                            tingkat: this.props.route.params.tingkat,
                            kelas: this.props.route.params.kelas,
                            namasek: this.props.route.params.namasek,
                            alamatsek: this.props.route.params.alamatsek,
                            semester: this.props.route.params.semester,
                            jurusan: this.props.route.params.jurusan,
                            kepala: this.props.route.params.kepala,
                            KK: this.props.route.params.KK,
                            cabang: this.props.route.params.cabang,
                            binaan: this.props.route.params.binaan,
                            shel: this.props.route.params.shel,
                            SOT: this.props.route.params.SOT,
                            namabank: this.props.route.params.namabank,
                            norek: this.props.route.params.norek,
                            an_rek: this.props.route.params.an_rek,
                            nohp: this.props.route.params.nohp,
                            an_hp: this.props.route.params.an_hp,
                            notelp: this.props.route.params.notelp,
                            surket: this.props.route.params.surket,
                            sktm: this.props.route.params.sktm,

                        }),
                        style: "cancel"
                    },
                ],
                { cancelable: false },
            )
        }
        if (keca != this.state.kecayah) {
            Alert.alert(
                'Peringatan Data yang anda isi ',
                'Kode Kecamatan dengan NIK TIDAK SAMA ',
                [
                    {
                        text: "Ubah",
                        onPress: () => this.setState({}),
                        style: "cancel"
                    },
                    {
                        text: "Lanjutkan",
                        onPress: () => this.props.navigation.replace('Five', {
                            nikayah: this.state.nikayah,
                            namaayah: this.state.namaayah,
                            agamaayah: this.state.agamaayah,
                            temayah: this.state.temayah,
                            alamatayah: this.state.alamatayah,
                            dateayah: this.state.dateayah,
                            dateayah2: this.state.dateayah2,
                            provayah: this.state.provayah,
                            kabayah: this.state.kabayah,
                            kecayah: this.state.kecayah,
                            kelayah: this.state.kelayah,
                            penghasilanayah: this.state.penghasilanayah,
                            penyebabayah: this.state.penyebabayah,
                            nikanak: this.props.route.params.nikanak,
                            latitude: this.props.route.params.latitude,
                            longitude: this.props.route.params.longitude,
                            anak: this.props.route.params.anak,
                            saudara: this.props.route.params.saudara,
                            panggilan: this.props.route.params.panggilan,
                            namaanak: this.props.route.params.namaanak,
                            agama: this.props.route.params.agama,
                            jenis_anak_binaan: this.props.route.params.jenis_anak_binaan,
                            tempatlahir: this.props.route.params.tempatlahir,
                            dateanak: this.props.route.params.dateanak,
                            JK: this.props.route.params.JK,
                            TB: this.props.route.params.TB,
                            prestasi: this.props.route.params.prestasi,
                            kendaraan: this.props.route.params.kendaraan,
                            pelfa: this.props.route.params.pelfa,
                            hobi: this.props.route.params.hobi,
                            JB: this.props.route.params.JB,
                            jarak: this.props.route.params.jarak,
                            anakfoto: this.props.route.params.anakfoto,
                            tingkat: this.props.route.params.tingkat,
                            kelas: this.props.route.params.kelas,
                            namasek: this.props.route.params.namasek,
                            alamatsek: this.props.route.params.alamatsek,
                            semester: this.props.route.params.semester,
                            jurusan: this.props.route.params.jurusan,
                            kepala: this.props.route.params.kepala,
                            KK: this.props.route.params.KK,
                            cabang: this.props.route.params.cabang,
                            binaan: this.props.route.params.binaan,
                            shel: this.props.route.params.shel,
                            SOT: this.props.route.params.SOT,
                            namabank: this.props.route.params.namabank,
                            norek: this.props.route.params.norek,
                            an_rek: this.props.route.params.an_rek,
                            nohp: this.props.route.params.nohp,
                            an_hp: this.props.route.params.an_hp,
                            notelp: this.props.route.params.notelp,
                            surket: this.props.route.params.surket,
                            sktm: this.props.route.params.sktm,

                        }),
                        style: "cancel"
                    },
                ],
                { cancelable: false },
            )
        }
        if (tanggal != moment(this.state.dateayah).format('DDMMYY')) {
            Alert.alert(
                'Peringatan Data yang anda isi ',
                'Kode Tanggal Lahir dengan NIK TIDAK SAMA ',
                [
                    {
                        text: "Ubah",
                        onPress: () => this.setState({}),
                        style: "cancel"
                    },
                    {
                        text: "Lanjutkan",
                        onPress: () => this.props.navigation.replace('Five', {
                            nikayah: this.state.nikayah,
                            namaayah: this.state.namaayah,
                            agamaayah: this.state.agamaayah,
                            temayah: this.state.temayah,
                            alamatayah: this.state.alamatayah,
                            dateayah: this.state.dateayah,
                            dateayah2: this.state.dateayah2,
                            provayah: this.state.provayah,
                            kabayah: this.state.kabayah,
                            kecayah: this.state.kecayah,
                            kelayah: this.state.kelayah,
                            penghasilanayah: this.state.penghasilanayah,
                            penyebabayah: this.state.penyebabayah,
                            nikanak: this.props.route.params.nikanak,
                            latitude: this.props.route.params.latitude,
                            longitude: this.props.route.params.longitude,
                            anak: this.props.route.params.anak,
                            saudara: this.props.route.params.saudara,
                            panggilan: this.props.route.params.panggilan,
                            namaanak: this.props.route.params.namaanak,
                            agama: this.props.route.params.agama,
                            jenis_anak_binaan: this.props.route.params.jenis_anak_binaan,
                            tempatlahir: this.props.route.params.tempatlahir,
                            dateanak: this.props.route.params.dateanak,
                            JK: this.props.route.params.JK,
                            TB: this.props.route.params.TB,
                            prestasi: this.props.route.params.prestasi,
                            kendaraan: this.props.route.params.kendaraan,
                            pelfa: this.props.route.params.pelfa,
                            hobi: this.props.route.params.hobi,
                            JB: this.props.route.params.JB,
                            jarak: this.props.route.params.jarak,
                            anakfoto: this.props.route.params.anakfoto,
                            tingkat: this.props.route.params.tingkat,
                            kelas: this.props.route.params.kelas,
                            namasek: this.props.route.params.namasek,
                            alamatsek: this.props.route.params.alamatsek,
                            semester: this.props.route.params.semester,
                            jurusan: this.props.route.params.jurusan,
                            kepala: this.props.route.params.kepala,
                            KK: this.props.route.params.KK,
                            cabang: this.props.route.params.cabang,
                            binaan: this.props.route.params.binaan,
                            shel: this.props.route.params.shel,
                            SOT: this.props.route.params.SOT,
                            namabank: this.props.route.params.namabank,
                            norek: this.props.route.params.norek,
                            an_rek: this.props.route.params.an_rek,
                            nohp: this.props.route.params.nohp,
                            an_hp: this.props.route.params.an_hp,
                            notelp: this.props.route.params.notelp,
                            surket: this.props.route.params.surket,
                            sktm: this.props.route.params.sktm,

                        }),
                        style: "cancel"
                    },
                ],
                { cancelable: false },
            )
        }
        if (dodol == this.state.provayah && kabu == this.state.kabayah && keca == this.state.kecayah && tanggal == moment(this.state.dateayah).format('DDMMYY')) {
            Alert.alert(
                'Peringatan Data yang anda isi ',
                'Kode Provinsi/Kecamatan/Kabupaten dengan NIK SUDAH SAMA',
                [
                    {
                        text: "Lanjutkan",
                        onPress: () => {
                            this.props.navigation.replace('Five', {
                                nikayah: this.state.nikayah,
                                namaayah: this.state.namaayah,
                                agamaayah: this.state.agamaayah,
                                temayah: this.state.temayah,
                                alamatayah: this.state.alamatayah,
                                dateayah: this.state.dateayah,
                                dateayah2: this.state.dateayah2,
                                provayah: this.state.provayah,
                                kabayah: this.state.kabayah,
                                kecayah: this.state.kecayah,
                                kelayah: this.state.kelayah,
                                penghasilanayah: this.state.penghasilanayah,
                                penyebabayah: this.state.penyebabayah,
                                nikanak: this.props.route.params.nikanak,
                                latitude: this.props.route.params.latitude,
                                longitude: this.props.route.params.longitude,
                                anak: this.props.route.params.anak,
                                saudara: this.props.route.params.saudara,
                                panggilan: this.props.route.params.panggilan,
                                namaanak: this.props.route.params.namaanak,
                                agama: this.props.route.params.agama,
                                jenis_anak_binaan: this.props.route.params.jenis_anak_binaan,
                                tempatlahir: this.props.route.params.tempatlahir,
                                dateanak: this.props.route.params.dateanak,
                                JK: this.props.route.params.JK,
                                TB: this.props.route.params.TB,
                                prestasi: this.props.route.params.prestasi,
                                kendaraan: this.props.route.params.kendaraan,
                                pelfa: this.props.route.params.pelfa,
                                hobi: this.props.route.params.hobi,
                                JB: this.props.route.params.JB,
                                jarak: this.props.route.params.jarak,
                                anakfoto: this.props.route.params.anakfoto,
                                tingkat: this.props.route.params.tingkat,
                                kelas: this.props.route.params.kelas,
                                namasek: this.props.route.params.namasek,
                                alamatsek: this.props.route.params.alamatsek,
                                semester: this.props.route.params.semester,
                                jurusan: this.props.route.params.jurusan,
                                kepala: this.props.route.params.kepala,
                                KK: this.props.route.params.KK,
                                cabang: this.props.route.params.cabang,
                                binaan: this.props.route.params.binaan,
                                shel: this.props.route.params.shel,
                                SOT: this.props.route.params.SOT,
                                namabank: this.props.route.params.namabank,
                                norek: this.props.route.params.norek,
                                an_rek: this.props.route.params.an_rek,
                                nohp: this.props.route.params.nohp,
                                an_hp: this.props.route.params.an_hp,
                                notelp: this.props.route.params.notelp,
                                surket: this.props.route.params.surket,
                                sktm: this.props.route.params.sktm,


                            })
                        },
                        style: "cancel"
                    },
                ],
                { cancelable: false },
            )
        }



    }

    render() {
        const { currentStep, totalSteps } = this.state;
        const didin = this.state.nikayah;
        const dodol = didin.substring(0, 2);
        const kabu = didin.substring(0, 4)
        const keca = didin.substring(0, 6)
        const birth = moment(this.state.dateayah).format('DDMMYY')
        const tanggal = didin.substring(6, 12)
        return (
            <ScrollView style={{ backgroundColor: '#fff' }}>
                <Text>{dodol} Provinsi</Text>
                <Text>{kabu} Kabupaten</Text>
                <Text>{keca} Kecamatan</Text>
                <Text>{tanggal}Tanggal lahir</Text>
                <Text>{birth}</Text>
                {/* <Text>{kel} Kelurahan</Text> */}
                <Text style={style.Label2}>Informasi Ayah</Text>
                <View style={{ height: '100%', alignContent: 'center', alignSelf: 'center' }}>
                    <TextInput
                        style={style.kotak3}
                        editable={this.props.route.params.SOT === 'Yatim_Piatu' ? false : true && this.props.route.params.SOT === 'Yatim' ? false : true}
                        onChangeText={nikayah => this.setState({ nikayah })}

                        value={this.state.nikayah}
                        placeholder="NIK Ayah"
                        keyboardType='numeric'
                        maxLength={16}
                        placeholderTextColor="#C0C0C0"
                    />
                    <TextInput
                        style={style.kotak3}
                        onChangeText={namaayah => this.setState({ namaayah })}
                        value={this.state.namaayah}
                        placeholder="Nama Ayah"
                        placeholderTextColor="#C0C0C0"
                    />
                    <View
                        style={style.kotakpicker}>
                        <Picker
                            style={style.Textinputcss}
                            selectedValue={this.state.agamaayah}
                            onValueChange={itemValue =>
                                this.setState({ agamaayah: itemValue, show: 1 })
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
                        onChangeText={temayah => this.setState({ temayah })}
                        value={this.state.temayah}
                        placeholder="Tempat Lahir"
                        placeholderTextColor="#C0C0C0"
                    />
                    <View style={{ flexDirection: 'row' }}>
                        <View style={[style.kotak3, { height: 100, }]}>
                            <Text>Tanggal Lahir</Text>
                            <View style={{ flexDirection: 'row' }}>
                                <Text
                                    style={style.kotak7}>
                                    {moment(this.state.dateayah).format('YYYY-MM-DD')}

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
                                                this.setState({ dateayah: moment(date).format('YYYY-MM-DD') }, () => console.log(this.state.dateayah))
                                            }
                                        />
                                        {/* <DatePicker
                                        date={this.state.dateanak}
                                        placeholder="select date"
                                        onDateChange={(dateanak) =>
                                            this.setState({ dateanak }, () => console.log(this.state.dateanak))
                                        }
                                        androidVariant='iosClone'
                                        locale='id'
                                    /> */}
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
                                value={this.state.alamatayah}
                                onChangeText={alamatayah => this.setState({ alamatayah })}
                                multiline={true}
                                numberOfLines={5}
                                autoCorrect={false}>
                            </TextInput>
                        </View>
                    </View>
                    <View
                        style={style.kotakpicker}>
                        <Picker
                            enabled={this.props.route.params.SOT === 'Yatim_Piatu' ? false : true && this.props.route.params.SOT === 'Yatim' ? false : true}
                            selectedValue={this.state.provayah}
                            onValueChange={(itemValue) => {
                                this.setState({
                                    provayah: itemValue,
                                    id_pro: itemValue
                                })
                            }}

                        >

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
                            enabled={this.props.route.params.SOT === 'Yatim_Piatu' ? false : true && this.props.route.params.SOT === 'Yatim' ? false : true}
                            selectedValue={this.state.kabayah}
                            onFocus={() => { this.GetKabupatenAPi() }}
                            onValueChange={(itemValue, prov) => {
                                this.setState({
                                    kabayah: itemValue
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
                            enabled={this.props.route.params.SOT === 'Yatim_Piatu' ? false : true && this.props.route.params.SOT === 'Yatim' ? false : true}
                            selectedValue={this.state.kecayah}
                            onFocus={() => { this.GetKecamatanAPi() }}
                            onValueChange={(itemValue, kab) => {
                                this.setState({
                                    kecayah: (itemValue)
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
                            enabled={this.props.route.params.SOT === 'Yatim_Piatu' ? false : true && this.props.route.params.SOT === 'Yatim' ? false : true}
                            selectedValue={this.state.kelayah}
                            onFocus={() => { this.GetKelurahanAPi() }}
                            onValueChange={(itemValue, kec) => {
                                this.setState({
                                    kelayah: (itemValue)
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
                            selectedValue={this.state.penghasilanayah}
                            enabled={this.props.route.params.SOT === 'Yatim_Piatu' ? false : true && this.state.SOT === 'Yatim' ? false : true}
                            onValueChange={(itemValue,) => {
                                this.setState({
                                    penghasilanayah: itemValue
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
                    {this.props.route.params.SOT === 'Yatim_Piatu' || this.props.route.params.SOT === 'Yatim' ?
                        <View>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={[style.kotak3, { height: 100, }]}>
                                    <Text>Tanggal Kematian Ayah</Text>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text
                                            style={style.kotak7}>
                                            {moment(this.state.dateayah2).format('YYYY/MM/DD')}

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
                                            <TouchableOpacity TouchableOpacity onPress={() => this.setState({ modaldate2: true })}>
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
                                    visible={this.state.modaldate2}
                                    onRequestClose={() => this.setState({ modaldate2: false })}
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
                                                        this.setState({ dateayah2: moment(date).format('YYYY-MM-DD') }, () => console.log(this.state.dateayah2))
                                                    }
                                                />
                                                {/* <DatePicker
                                        date={this.state.dateanak}
                                        placeholder="select date"
                                        onDateChange={(dateanak) =>
                                            this.setState({ dateanak }, () => console.log(this.state.dateanak))
                                        }
                                        androidVariant='iosClone'
                                        locale='id'
                                    /> */}
                                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: '10%' }}>
                                                    <View style={style.kotakkecil}>
                                                        <TouchableOpacity onPress={() => this.setState({ modaldate2: false })}>

                                                            <Text style={{
                                                                justifyContent: 'center', textAlign: 'center',
                                                            }}>Batal</Text>
                                                        </TouchableOpacity>
                                                    </View>
                                                    <View style={style.kotakkecil}>
                                                        <TouchableOpacity onPress={() => this.setState({ modaldate2: false })}>
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

                            <TextInput
                                style={style.kotak3}
                                onChangeText={penyebabayah => this.setState({ penyebabayah })}
                                value={this.state.penyebabayah}
                                placeholder="Penyebab Kematian"
                                keyboardType='default'
                                placeholderTextColor="#C0C0C0"
                            />
                        </View> : <View></View >}



                    {this.props.route.params.SOT === 'Yatim_Piatu' || this.props.route.params.SOT === 'Yatim' ?
                        <TouchableOpacity style={style.nextbuttonTextStyle} onPress={() => {
                            this.props.navigation.replace('Five', {
                                nikayah: this.state.nikayah,
                                namaayah: this.state.namaayah,
                                agamaayah: this.state.agamaayah,
                                temayah: this.state.temayah,
                                alamatayah: this.state.alamatayah,
                                dateayah: this.state.dateayah,
                                dateayah2: this.state.dateayah2,
                                provayah: this.state.provayah,
                                kabayah: this.state.kabayah,
                                kecayah: this.state.kecayah,
                                kelayah: this.state.kelayah,
                                penghasilanayah: this.state.penghasilanayah,
                                penyebabayah: this.state.penyebabayah,
                                nikanak: this.props.route.params.nikanak,
                                latitude: this.props.route.params.latitude,
                                longitude: this.props.route.params.longitude,
                                anak: this.props.route.params.anak,
                                saudara: this.props.route.params.saudara,
                                panggilan: this.props.route.params.panggilan,
                                namaanak: this.props.route.params.namaanak,
                                agama: this.props.route.params.agama,
                                jenis_anak_binaan: this.props.route.params.jenis_anak_binaan,
                                tempatlahir: this.props.route.params.tempatlahir,
                                dateanak: this.props.route.params.dateanak,
                                JK: this.props.route.params.JK,
                                TB: this.props.route.params.TB,
                                prestasi: this.props.route.params.prestasi,
                                kendaraan: this.props.route.params.kendaraan,
                                pelfa: this.props.route.params.pelfa,
                                hobi: this.props.route.params.hobi,
                                JB: this.props.route.params.JB,
                                jarak: this.props.route.params.jarak,
                                anakfoto: this.props.route.params.anakfoto,
                                tingkat: this.props.route.params.tingkat,
                                kelas: this.props.route.params.kelas,
                                namasek: this.props.route.params.namasek,
                                alamatsek: this.props.route.params.alamatsek,
                                semester: this.props.route.params.semester,
                                jurusan: this.props.route.params.jurusan,
                                kepala: this.props.route.params.kepala,
                                KK: this.props.route.params.KK,
                                cabang: this.props.route.params.cabang,
                                binaan: this.props.route.params.binaan,
                                shel: this.props.route.params.shel,
                                SOT: this.props.route.params.SOT,
                                namabank: this.props.route.params.namabank,
                                norek: this.props.route.params.norek,
                                an_rek: this.props.route.params.an_rek,
                                nohp: this.props.route.params.nohp,
                                an_hp: this.props.route.params.an_hp,
                                notelp: this.props.route.params.notelp,
                                surket: this.props.route.params.surket,
                                sktm: this.props.route.params.sktm,


                            })
                        }} >
                            <Text style={{ justifyContent: 'center', textAlign: 'center', color: '#fff' }}>Lanjutkan YT Y</Text>
                        </TouchableOpacity>
                        : <TouchableOpacity style={style.nextbuttonTextStyle} onPress={() => {
                            dodol === this.state.provayah && kabu === this.state.kabayah && keca === this.state.kecayah && tanggal === moment(this.state.dateayah).format('DDMMYY') ?
                                this.props.navigation.replace('Five', {
                                    nikayah: this.state.nikayah,
                                    namaayah: this.state.namaayah,
                                    agamaayah: this.state.agamaayah,
                                    temayah: this.state.temayah,
                                    alamatayah: this.state.alamatayah,
                                    dateayah: this.state.dateayah,
                                    dateayah2: this.state.dateayah2,
                                    provayah: this.state.provayah,
                                    kabayah: this.state.kabayah,
                                    kecayah: this.state.kecayah,
                                    kelayah: this.state.kelayah,
                                    penghasilanayah: this.state.penghasilanayah,
                                    penyebabayah: this.state.penyebabayah,
                                    nikanak: this.props.route.params.nikanak,
                                    latitude: this.props.route.params.latitude,
                                    longitude: this.props.route.params.longitude,
                                    anak: this.props.route.params.anak,
                                    saudara: this.props.route.params.saudara,
                                    panggilan: this.props.route.params.panggilan,
                                    namaanak: this.props.route.params.namaanak,
                                    agama: this.props.route.params.agama,
                                    jenis_anak_binaan: this.props.route.params.jenis_anak_binaan,
                                    tempatlahir: this.props.route.params.tempatlahir,
                                    dateanak: this.props.route.params.dateanak,
                                    JK: this.props.route.params.JK,
                                    TB: this.props.route.params.TB,
                                    prestasi: this.props.route.params.prestasi,
                                    kendaraan: this.props.route.params.kendaraan,
                                    pelfa: this.props.route.params.pelfa,
                                    hobi: this.props.route.params.hobi,
                                    JB: this.props.route.params.JB,
                                    jarak: this.props.route.params.jarak,
                                    anakfoto: this.props.route.params.anakfoto,
                                    tingkat: this.props.route.params.tingkat,
                                    kelas: this.props.route.params.kelas,
                                    namasek: this.props.route.params.namasek,
                                    alamatsek: this.props.route.params.alamatsek,
                                    semester: this.props.route.params.semester,
                                    jurusan: this.props.route.params.jurusan,
                                    kepala: this.props.route.params.kepala,
                                    KK: this.props.route.params.KK,
                                    cabang: this.props.route.params.cabang,
                                    binaan: this.props.route.params.binaan,
                                    shel: this.props.route.params.shel,
                                    SOT: this.props.route.params.SOT,
                                    namabank: this.props.route.params.namabank,
                                    norek: this.props.route.params.norek,
                                    an_rek: this.props.route.params.an_rek,
                                    nohp: this.props.route.params.nohp,
                                    an_hp: this.props.route.params.an_hp,
                                    notelp: this.props.route.params.notelp,
                                    surket: this.props.route.params.surket,
                                    sktm: this.props.route.params.sktm,


                                })
                                : this.onPress(dodol, kabu, keca, tanggal, birth)
                        }} >
                            <Text style={{ justifyContent: 'center', textAlign: 'center', color: '#fff' }}>Lanjutkan</Text>
                        </TouchableOpacity>}

                </View>
            </ScrollView >
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

    }
});
// const style = StyleSheet.create({

//     contentContainer: {
//     },
//     Label1: {
//         flex: 1,
//         fontSize: 15,
//         marginTop: 10,
//         marginBottom: -1,
//         marginLeft: 30,
//         color: '#000000',
//         flexDirection: 'column',
//     },
//     Textinputcss: {
//         color: '#7e7e7e',
//         marginLeft: 15,
//         marginRight: 10,
//         borderRadius: 10,
//         borderWidth: 1,
//         fontSize: 12,
//         height: 52,
//         backgroundColor: '#fff',
//         shadowColor: "#333",
//         shadowOffset: {
//             width: 1,
//             height: 1,
//         },
//         shadowOpacity: 0.3,
//         shadowRadius: 2,
//         borderColor: '#7e7e7e',
//         elevation: 3,
//     },
//     Label2: {
//         marginBottom: -30,
//         marginLeft: 25,
//         color: '#000',
//     },
//     kotak2: {
//         color: '#000000',
//         marginTop: 10,
//         marginLeft: 30,
//         marginRight: 10,
//         borderRadius: 2,
//         borderWidth: 0.1,
//         fontSize: 12,
//         height: 52,
//         backgroundColor: '#7e7e7e',
//     },
//     kotak5: {
//         width: '90%',
//         height: 90,
//         borderRadius: 10,
//         borderWidth: 1,
//         marginLeft: 20,
//         marginTop: 10,
//         borderColor: '#E9E9E9',
//         backgroundColor: '#fff',
//         flexDirection: 'column',
//         justifyContent: 'space-around'
//     },
//     kotak6: {
//         width: '90%',
//         height: 100,
//         borderRadius: 10,
//         borderWidth: 1,
//         marginLeft: 20,
//         marginTop: 10,
//         borderColor: '#E9E9E9',
//         backgroundColor: '#fff',
//         flexDirection: 'column',
//         justifyContent: 'space-around'
//     },
//     title1: {
//         marginRight: 20,
//         marginLeft: 20,
//         marginTop: 15,
//         marginBottom: 15,
//         fontSize: 18,
//         fontWeight: 'bold',
//         color: '#fff',
//     },
//     Labeltgl: {
//         marginTop: 5,
//         position: 'absolute',
//         top: 0, left: 10, right: 0, bottom: 0,
//         height: 25, width: 25,
//     },
//     item: {
//         flex: 1,
//         fontSize: 16,
//         flexDirection: 'row',
//         backgroundColor: '#fff',
//         padding: 17,
//         marginVertical: 8,
//         marginHorizontal: 16,
//         shadowColor: "#333",
//         shadowOffset: {
//             width: 1,
//             height: 1,
//         },
//         shadowOpacity: 0.3,
//         shadowRadius: 2,
//         borderColor: '#7e7e7e',
//         elevation: 3,
//     },
//     container: {
//         marginTop: 40,
//         marginLeft: 75,
//         width: 250,
//         height: 250,
//         flex: 1,
//         margin: 20,
//         alignItems: 'center',
//         justifyContent: 'center',
//         backgroundColor: '#fff',
//         shadowColor: "#333",
//         shadowOffset: {
//             width: 1,
//             height: 1,
//         },
//         shadowOpacity: 0.3,
//         shadowRadius: 2,
//         borderColor: '#7e7e7e',
//         elevation: 3,
//     },

//     btnSimpanUn1: {
//         width: '40%',
//         fontWeight: 'bold',
//         backgroundColor: '#C6C6C6',
//         borderRadius: 10,
//         padding: 10,
//         borderWidth: 1,
//         borderColor: '#E9E9E9',
//         justifyContent: 'center', alignItems: 'center',
//         alignContent: 'center',
//         textAlign: 'center',
//     },
//     coltom1: {
//         width: '90%',
//         marginLeft: 20,
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         alignContent: 'center',
//         fontSize: 16,
//         flexDirection: 'row',
//         paddingTop: 10,
//         paddingBottom: 10,
//         backgroundColor: '#fff',
//         marginVertical: 8,
//         marginHorizontal: 16,
//         shadowColor: "#333",
//         shadowOffset: {
//             width: 1,
//             height: 1,
//         },
//         shadowOpacity: 0.3,
//         shadowRadius: 2,
//         borderColor: '#7e7e7e',
//         elevation: 3,
//     },
//     itemflat: {
//         fontSize: 16,
//         flexDirection: 'column',
//         backgroundColor: '#fff',
//         padding: 20,
//         height: 75,
//         shadowColor: "#333",
//         shadowOffset: {
//             width: 1,
//             height: 1,
//         },
//         shadowOpacity: 0.3,
//         shadowRadius: 2,
//         borderColor: '#7e7e7e',
//         elevation: 1,
//     },
//     ModalCont2: {
//         flex: 1,
//         backgroundColor: '#00000079',
//     },
//     wrap: {
//         width: Dimensions.get('window').width,
//         height: Dimensions.get('window').height * 0.25 // 25% window
//     },
//     itemText: {
//         textAlign: 'justify',
//         marginLeft: 10,
//         fontSize: 12,
//         width: '35%',
//         height: 43,
//     },
//     kotak3: {
//         color: '#000000',
//         marginTop: 2,
//         marginLeft: 20,
//         marginRight: 10,
//         borderRadius: 2,
//         borderWidth: 0.1,
//         fontSize: 12,
//         height: 40,
//         width: '90%',
//         backgroundColor: '#F0F8FF',
//     },
//     kotak4: {
//         color: '#000000',
//         marginTop: 2,
//         marginLeft: 20,
//         marginRight: 10,
//         borderRadius: 2,
//         borderWidth: 0.1,
//         fontSize: 12,
//         height: 50,
//         width: '90%',
//         backgroundColor: '#F0F8FF',
//     },
//     btnSimpanDark: {
//         flexDirection: 'row',
//         color: '#fff',
//         fontWeight: 'bold',
//         textAlign: 'center',
//         width: 150, height: 50,
//         backgroundColor: '#87cefa',
//         borderRadius: 10,
//         marginTop: 10,
//         padding: 10,
//         borderWidth: 1,
//         borderColor: '#E9E9E9',
//         justifyContent: 'center', alignContent: 'center',
//         marginLeft: 120,
//         fontSize: 12,
//     },
//     txtDesc: {
//         color: '#2E3E5C',
//         fontSize: 15,
//         paddingLeft: 5,
//         height: 100,
//         marginHorizontal: 15,
//         backgroundColor: '##F0F8FF'
//     },
//     infoContainer: {
//         width: '90%',
//         marginLeft: 30,
//         backgroundColor: '#fff',
//         borderRadius: 10,
//         borderWidth: 1,
//         height: 70,
//         borderColor: '#E9E9E9',
//     },
//     currentStepText: {
//         color: "#7e7e7e",
//         fontSize: 12
//     },
// });



   // <ScrollView style={{ backgroundColor: '#fff' }}>
            //     <View style={{ backgroundColor: '#00A9B8' }}>
            //         <Text style={style.title1}>Tambah Anak Binaan</Text>
            //     </View>
            //     <Text
            //         style={style.currentStepText}
            //     >{`Tahap 4`}</Text>
            //     <View style={style.kotak5}>
            //         <Text style={style.Label2}>NIK Ayah</Text>
            //         <TextInput
            //             style={style.kotak3}
            //             editable={this.state.so === 'YT' ? false : true && this.state.so === 'Yatim' ? false : true}
            //             onChangeText={NIK => this.setState({ NIK })}
            //             value={this.state.NIK}
            //             keyboardType='numeric'
            //             placeholder="NIK ayah"
            //             placeholderTextColor='#7e7e7e'
            //         />
            //     </View>
            //     <View style={style.kotak5}>
            //         <Text style={style.Label2}>Nama Ayah</Text>
            //         <TextInput
            //             style={style.kotak3}
            //             onChangeText={ayah => this.setState({ ayah })}
            //             value={this.state.ayah}
            //             keyboardType='default'
            //             placeholder="Nama ayah"
            //             placeholderTextColor='#7e7e7e'
            //         />
            //     </View>
            //     <View>
            //         <Text style={style.Label1}>Agama</Text>
            //         <Picker style={style.Textinputcss} mode="dropdown"
            //             selectedValue={this.state.ag}
            //             onValueChange={(itemValue) => {
            //                 this.setState({
            //                     ag: itemValue
            //                 })
            //             }}>
            //             <Picker.Item style={{ fontSize: 12 }} label={'Pilih Agama'} value={'0'} key={'0'} />
            //             <Picker.Item label="Islam" value="Islam" />
            //             <Picker.Item label="Kristen" value="Kristen" />
            //             <Picker.Item label="Budha" value="Budha" />
            //             <Picker.Item label="Hindu" value="Hindu" />
            //             <Picker.Item label="Konghuncu" value="Konghuncu" />
            //         </Picker>
            //     </View>

            //     <View style={style.kotak5}>
            //         <Text style={style.Label2}>Tempat Lahir</Text>
            //         <TextInput
            //             style={style.kotak3}
            //             onChangeText={lahir => this.setState({ lahir })}
            //             value={this.state.lahir}
            //             keyboardType='default'
            //             placeholder="Tempat lahir"
            //             placeholderTextColor='#7e7e7e'
            //         />
            //     </View>
            //     <View style={style.kotak5}>
            //         <Text style={style.Label2}>Tanggal Lahir</Text>
            //         <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-around' }} onPress={() => this.setState({ modaldate: true })}>
            //             <Image source={date}
            //                 style={{
            //                     height: 30,
            //                     width: 30,
            //                     marginTop: 5,
            //                     marginLeft: 20,
            //                 }}></Image>
            //             <Text style={style.Label1}>{this.state.date.toLocaleString('default', { month: 'short' })}</Text>
            //         </TouchableOpacity>
            //     </View>
            //     <Modal
            //         animationType={"slide"}
            //         transparent={true}
            //         visible={this.state.modaldate}
            //         style={{
            //             alignItems: 'center',
            //             justifyContent: 'center',

            //         }}>
            //         <View style={style.ModalCont2}>
            //             <View style={{
            //                 paddingTop: 5,
            //                 backgroundColor: '#ffffff',
            //                 // flexDirection: 'row',
            //                 borderTopLeftRadius: 10,
            //                 borderTopRightRadius: 10,
            //                 height: '27%',
            //                 shadowColor: "#333",
            //                 shadowOffset: {
            //                     width: 1,
            //                     height: 1,
            //                 },
            //                 shadowOpacity: 0.3,
            //                 shadowRadius: 2,
            //                 elevation: 3,
            //                 alignItems: 'center',
            //                 position: 'absolute',
            //                 bottom: 0,
            //                 left: 0,
            //                 right: 0,
            //             }}>
            //                 <Text style={style.tglText}>Pilih Tanggal</Text>
            //                 <ScrollView style={{ width: '100%', height: '100%' }}>

            //                     <TouchableOpacity onPress={() => this.setState({ modaldate: false })} style={{ position: 'absolute', right: 20, top: 20 }}>
            //                         <Image source={x}
            //                             style={{
            //                                 height: 30,
            //                                 width: 30, alignItems: 'center',
            //                             }}></Image>
            //                     </TouchableOpacity>
            //                     {/* <DatePicker
            //                         date={this.state.date}
            //                         placeholder="select date"
            //                         onDateChange={(date) =>
            //                             this.setState({ date }, () => console.log(this.state.date))
            //                         }
            //                         androidVariant="nativeAndroid"
            //                         mode='date'
            //                     /> */}
            //                 </ScrollView>
            //             </View>
            //         </View>
            //     </Modal>

            //     <View style={style.kotak6}>
            //         <Text style={style.Label2}>Alamat</Text>
            //         <TextInput style={style.kotak4} placeholder="Alamat Lengkap"
            //             placeholderTextColor='#A9A9A9'
            //             editable={this.state.so === 'YT' ? false : true && this.state.so === 'Yatim' ? false : true}
            //             keyboardType="email-address"
            //             value={this.state.alamat}
            //             onChangeText={alamat => this.setState({ alamat })}
            //             multiline={true}
            //             numberOfLines={5}
            //             autoCorrect={false}>
            //         </TextInput>
            //     </View>

            //     <View>
            //         <Text style={style.Label1}>Provinsi</Text>
            //         <Picker style={style.Textinputcss} mode="dropdown"
            //             enabled={this.state.so === 'YT' ? false : true && this.state.so === 'Yatim' ? false : true}
            //             selectedValue={this.state.pro}
            //             onValueChange={(itemValue) => {
            //                 this.setState({
            //                     pro: itemValue
            //                 })
            //             }}>
            //             <Picker.Item style={{ fontSize: 12 }} label={'Pilih provinsi'} value={'0'} key={'0'} />
            //             {
            //                 this.state.prov.map((pro) =>
            //                     <Picker.Item style={{ height: '100%', width: '100%', fontSize: 12, }} label={pro.name.toString()} value={pro.province_id} key={pro.province_id} />
            //                 )}
            //         </Picker>
            //     </View>
            //     <View>
            //         <Text style={style.Label1}>Kabupaten/Kota</Text>
            //         <Picker style={style.Textinputcss} mode="dropdown" onFocus={() => { this.GetkotaAPi() }} //untuk get data yang terhubung dengan picker lain//
            //             selectedValue={this.state.kot}
            //             enabled={this.state.so === 'YT' ? false : true && this.state.so === 'Yatim' ? false : true}
            //             onValueChange={(itemValue, prov) => {
            //                 {
            //                     this.setState({ kot: (itemValue), })
            //                 }
            //             }}>
            //             <Picker.Item style={{ fontSize: 12 }} label={'Pilih Kota'} value={'0'} key={'0'} />
            //             {
            //                 this.state.kota.map((kot) =>
            //                     <Picker.Item style={{ height: '100%', width: '100%', fontSize: 12, }} label={kot.name.toString()} value={kot.name.toString()} key={kot.name.toString()} />
            //                 )}
            //         </Picker>
            //     </View>

            //     <View>
            //         <Text style={style.Label1}>Kecamatan</Text>
            //         <Picker style={style.Textinputcss} mode="dropdown"
            //             selectedValue={this.state.kecayah}
            //             enabled={this.state.so === 'YT' ? false : true && this.state.so === 'Yatim' ? false : true}
            //             onValueChange={(itemValue,kota) => {
            //                 this.setState({
            //                     kecayah: itemValue
            //                 })
            //             }}>
            //             <Picker.Item style={{ fontSize: 12 }} label={'Pilih Kecamatan'} value={'0'} key={'0'} />
            //             {
            //                 this.state.kecamatan.map((kecayah) =>
            //                     <Picker.Item style={{ height: '100%', width: '100%', fontSize: 12, }} label={kecayah.name.toString()} value={kecayah.name.toString()} key={kecayah.name.toString()} />
            //                 )}
            //         </Picker>
            //     </View>
            //     <View>
            //         <Text style={style.Label1}>Kelurahan</Text>
            //         <Picker style={style.Textinputcss} mode="dropdown"
            //             selectedValue={this.state.kel}
            //             enabled={this.state.so === 'YT' ? false : true && this.state.so === 'Yatim' ? false : true}
            //             onValueChange={(itemValue) => {
            //                 this.setState({
            //                     kel: itemValue
            //                 })
            //             }}>
            //             <Picker.Item style={{ fontSize: 12 }} label={'Pilih Kelurahan'} value={'0'} key={'0'} />
            //             {
            //                 this.state.kelurahan.map((kel) =>
            //                     <Picker.Item style={{ height: '100%', width: '100%', fontSize: 12, }} label={lv.id_level_anak_binaan.toString()} value={lv.id_level_anak_binaan.toString()} key={lv.id_level_anak_binaan.toString()} />
            //                 )}
            //         </Picker>
            //     </View>

            //     <View>
            //         <Text style={style.Label1}>Penghasilan</Text>
            //         <Picker style={style.Textinputcss} mode="dropdown"
            //             selectedValue={this.state.gaji}
            //             enabled={this.state.so === 'YT' ? false : true && this.state.so === 'Yatim' ? false : true}
            //             onValueChange={(itemValue) => {
            //                 this.setState({
            //                     gaji: itemValue
            //                 })
            //             }}>
            //             <Picker.Item style={{ fontSize: 12 }} label={'Pilih Penghasilan'} value={'0'} key={'0'} />
            //             <Picker.Item label="Dibawah Rp.500.000,-" value="Kakak" />
            //             <Picker.Item label="Rp.500.000,- s/d Rp.1.500.000,-" value="1" />
            //             <Picker.Item label="Rp.1.500.000,- s/d Rp.2.500.000,-" value="2" />
            //             <Picker.Item label="Rp.2.500.000,- s/d Rp.3.500.000,-" value="3" />
            //             <Picker.Item label="Rp.3.500.000,- s/d Rp.5.000.000,-" value="4" />
            //             <Picker.Item label="Rp.5.000.000,- s/d Rp.7.000.000,-" value="5" />
            //             <Picker.Item label="Rp.7.000.000,- s/d Rp.10.000.000,-" value="6" />
            //             <Picker.Item label="Diatas Rp.10.000.000,-" value="7" />
            //         </Picker>
            //     </View>

            //     <View style={{
            //         width: '90%',
            //         height: 200,
            //         borderRadius: 10,
            //         borderWidth: 1,
            //         marginLeft: 20,
            //         marginTop: 10,
            //         borderColor: '#E9E9E9',
            //         backgroundColor: '#fff',
            //         flexDirection: 'column',
            //         justifyContent: 'space-around'
            //     }}>
            //         <Text style={{ marginTop: 10, marginBottom: -10, marginLeft: 20, }}> isi Jika Meninggal</Text>
            //         <View >
            //             <Text style={{
            //                 marginBottom: 0,
            //                 marginLeft: 25,
            //                 color: '#000',
            //             }}>Tanggal Kematian</Text>
            //             <TextInput
            //                 style={style.kotak3}
            //                 onChangeText={tgmati => this.setState({ tgmati })}
            //                 editable={this.state.so === 'Dhuafa' ? false : true}
            //                 value={this.state.tgmati}
            //                 keyboardType='default'
            //                 placeholder="Tanggal Kematian"
            //                 placeholderTextColor='#7e7e7e'
            //             />
            //         </View>
            //         <View >
            //             <Text style={{
            //                 marginBottom: 0,
            //                 marginLeft: 25,
            //                 color: '#000',
            //             }}>Penyebab Kematian</Text>
            //             <TextInput style={style.kotak4} placeholder="Tuliskan Deskripsi disini"
            //                 placeholderTextColor='#A9A9A9'
            //                 keyboardType="email-address"
            //                 editable={this.state.so === 'Dhuafa' ? false : true}
            //                 value={this.state.deskripsi}
            //                 onChangeText={deskripsi => this.setState({ deskripsi })}
            //                 multiline={true}
            //                 numberOfLines={5}
            //                 autoCorrect={false}>
            //             </TextInput>
            //         </View>
            //     </View>
            //     <TouchableOpacity style={style.btnSimpanDark}
            //         onPress={() =>
            //             // this.state.NIK === '' ? alert('Tolong ada kolom yang belum terisi') :
            //             //     this.state.ayah === '' ? alert('Tolong ada kolom yang belum terisi') :
            //             //         this.state.ag === '' ? alert('Tolong ada kolom yang belum terisi') :
            //             //             this.state.jarak === '' ? alert('Tolong ada kolom yang belum terisi') :
            //             //                 this.state.lahir === '' ? alert('Tolong ada kolom yang belum terisi') :
            //             //                     this.state.tglahir === '' ? alert('Tolong ada kolom yang belum terisi') :
            //             //                         this.state.gaji === '' ? alert('Tolong ada kolom yang belum terisi') :
            //             this.props.navigation.replace('Five', { so: this.props.route.params.so })}>
            //         <Text>Lanjutkan</Text>
            //     </TouchableOpacity>
            // </ScrollView >