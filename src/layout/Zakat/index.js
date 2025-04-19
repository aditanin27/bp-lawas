import { Text, View, StyleSheet, TextInput, TouchableHighlight, Modal, Image, Linking, Platform, ToastAndroid } from 'react-native'
import React, { Component } from 'react'
import { Picker } from '@react-native-picker/picker';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Collapse, CollapseHeader, CollapseBody, AccordionList } from 'accordion-collapse-react-native';
import { ovo, arrow, qr } from '../../assets/images'
import { Infak } from '../../assets/icons'

export class index extends Component {
    constructor(props) {
        super(props)
        this.state = {
            zakat: '',
            ife: [],
            text: '',
            show: 0,
            count: 1,
            status: true,
            firstValue: '',
            secondValue: '',
            thirdValue: '',
            fourValue: '',
            sumpro: '',
            sumper: '',
            sumsim: '',
            sumemas: '',

            sum: 0,
            modalsimpan: false,
            modalemas: false,
            modalpropesi: false,
            modalperdagangan: false,
            nameError: '',
            emas: [],
            showProfesi: false,
            showPerdagangan: false,
            showEmas: false,
            showSimpanan: false,
            nama: '',
        }
    }

    Getemas() {
        fetch('https://metals-api.com/api/latest').then(res => {
            if (res.status === 200)
                return res.json()
        }).then(resdata => {
            console.log(resdata.data)
            this.setState({
                emas: resdata.data,
            })
        })
    }

    displayModal(show) {
        this.setState({ modalsimpan: show })
    }
    displayModal(show) {
        this.setState({ modalemas: show })
    }
    displayModal(show) {
        this.setState({ modalperdagangan: show })
    }
    displayModal(show) {
        this.setState({ modalpropesi: show })
    }
    ShowHideTextComponentView = () => {

        if (this.state.status == false) {
            this.setState({ status: true })
        }
        else {
            this.setState({ status: false })
        }
    }
    componentDidMount() {
        this.Getemas();
    }
    hargaemas = () => {
        const { emasValue, secondValue, thirdValue, fourValue } = this.state;
        this.setState({
            sum: ((85 * 938099))
        });
    }
    sumbersimpan = () => {
        let url =
            'https://baznas.go.id/zakatreksadana'
        Linking.openURL(url)
            .then(data => {
                console.log("Opened successfully " + data);
            })
    };
    sumberemas = () => {
        let url =
            'https://baznas.go.id/zakatemas'
        Linking.openURL(url)
            .then(data => {
                console.log("Opened successfully " + data);
            })
    };
    sumberpropesi = () => {
        let url =
            'https://baznas.go.id/zakatpenghasilan'
        Linking.openURL(url)
            .then(data => {
                console.log("Opened successfully " + data);
            })
    };
    sumberperdagangan = () => {
        let url =
            'https://baznas.go.id/zakatperdagangan'
        Linking.openURL(url)
            .then(data => {
                console.log("Opened successfully " + data);
            })
    };
    profesi(text1, text2) {
        // const { firstValue, secondValue, thirdValue, fourValue, sum } = this.state;

        this.setState({
            sumpro: ((text1 * 12 * 2.5) / 100) + ((text2 * 12 * 2.5) / 100)
        });

    }

    simpanan(text1, text2) {
        // const { firstValue, secondValue, thirdValue, fourValue, sum } = this.state;

        this.setState({
            sumsim: ((text1 * 12 * 2.5) / 100) + ((text2 * 12 * 2.5) / 100)
        });

    }

    perdagangan(text1, text3) {

        this.setState({
            sumper: ((text1 - text3) * 2.5 * 12 / 100)
        });

    }

    emas(text1) {

        this.setState({
            sumemas: ((text1 * 938099) * 2.5 / 100)
        });
    }
    showProfesi = () => {
        this.setState({ showProfesi: !this.state.showProfesi })
    }
    showPerdagangan = () => {
        this.setState({ showPerdagangan: !this.state.showPerdagangan })
    }
    showEmas = () => {
        this.setState({ showEmas: !this.state.showEmas })
    }
    showSimpanan = () => {
        this.setState({ showSimpanan: !this.state.showSimpanan })
    }
    render() {
        const openURL = async (url) => {
            const isSupported = await Linking.canOpenURL(url);
            if (isSupported) {
                await Linking.openURL(url);
            } else {
                Alert.alert('dont know how to open this url:${url}');
            }
        }

        const { firstValue } = this.state
        const { secondValue } = this.state
        const { thirdValue } = this.state
        const { fourValue } = this.state
        const { text1 } = this.state
        const { text2 } = this.state
        const { text3 } = this.state
        const { text4 } = this.state
        const { emasValue } = this.state
        const { jumlah } = this.state
        const { sum } = this.state
        const { nameError } = this.state
        const inputbutton = [];
        for (let i = 0; i < this.state.count; i++) {

            <><View key={i}>
                <Text>{i + 1}.</Text>
                <Picker style={style.Textinputcss} mode="dropdown"
                    value={this.state.ife[i]}
                    selectedValue={this.state.zakat}
                    onValueChange={(itemValue) => {
                        this.setState({
                            zakat: itemValue
                        })
                    }}>
                    <Picker.Item style={{ fontSize: 12 }} label={'Pilih Zakat'} value={'0'} key={'0'} />
                    {/* {
                        this.state.Kegiatan.map((keg) =>
                            <Picker.Item style={{ height: '100%', width: '100%', fontSize: 12, }} label={keg.nama_kegiatan.toString()} value={keg.nama_kegiatan.toString()} key={keg.id_kegiatan.toString()} />
                        )} */}
                    <Picker.Item label="Pilih Zakat" value="" />
                    <Picker.Item label="Zakat Propesi" value="Zakat Propesi" />
                    <Picker.Item label="Zakat Emas" value="Zakat Emas" />
                    <Picker.Item label="Zakat Simpanan" value="Zakat Simpanan" />
                    <Picker.Item label="Zakat Perdagangan" value="Zakat Perdagangan" />


                </Picker>
            </View></>
        }

        return (
            <ScrollView contentContainer style={style.contentContainer} >
                <View >
                    <View style={{ backgroundColor: '#00A9B8', width: '100%', height: 240, borderBottomLeftRadius: 28, borderBottomRightRadius: 28 }}>
                    </View>
                    <View style={{ marginLeft: 20, backgroundColor: '#fff', width: '90%', height: '90%', top: -150, borderRadius: 15 }}>
                        <View style={{ flexDirection: 'row', marginTop: 20, marginLeft: 30 }}>
                            <Infak />
                            <Text style={{ marginTop: 5, fontSize: 20, marginLeft: 10 }}>Zakat</Text>
                        </View>
                        <View style={{ width: '100%', height: 1, backgroundColor: '#EBEAEA', marginTop: 20 }} />
                        <Text style={{ marginLeft: 10, color: '#C0C0C0', marginTop: 10 }}>Jenis Zakat</Text>
                        <View style={{ flexDirection: 'column' }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                                <TouchableOpacity style={style.kotak3} onPress={this.showProfesi}>
                                    <Text style={{ textAlign: 'center' }}>Profesi</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={style.kotak3} onPress={this.showPerdagangan}>
                                    <Text style={{ textAlign: 'center' }}>Perdagangan</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                                <TouchableOpacity style={style.kotak3} onPress={this.showEmas}>
                                    <Text style={{ textAlign: 'center' }}>Emas</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={style.kotak3} onPress={this.showSimpanan}>
                                    <Text style={{ textAlign: 'center' }}>Simpanan</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        {this.state.showProfesi &&
                            <View>
                                <View>
                                    <View style={{ flexDirection: 'column' }}>
                                        <View style={{ marginTop: 10, marginBottom: 10, }}>
                                            {!!this.state.nameError && (
                                                <Text style={{ color: "red" }}>{this.state.nameError}</Text>
                                            )}
                                            <Text style={{ marginBottom: 10, marginLeft: 10 }}>Perhitungan Zakat</Text>
                                            <TextInput style={style.Textinputcss}
                                                value={firstValue.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                                                keyboardType="numeric"
                                                onChangeText={(text) => { this.setState({ firstValue: text.replace(/\D/g, "") }), this.profesi(text.replace(/\D/g, ""), this.state.secondValue) }}
                                                placeholder="Pendapatan Perbulan(Wajib isi)"
                                                placeholderTextColor='#7e7e7e'
                                            />
                                        </View>
                                        <View style={{ marginTop: 10, marginBottom: 10, }}>
                                            <TextInput style={style.Textinputcss}
                                                value={secondValue.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                                                keyboardType="numeric"
                                                onChangeText={(text) => { this.setState({ secondValue: text.replace(/\D/g, "") }), this.profesi(this.state.firstValue, text.replace(/\D/g, "")) }}
                                                placeholder="Bonus, THR Lainnya (Jika ada)"
                                                placeholderTextColor='#7e7e7e'
                                            />
                                        </View>

                                    </View>
                                    <View style={{ flexDirection: 'column' }}>
                                        <TouchableOpacity onPress={(this.sumberpropesi)}>
                                            <Text style={style.Labelsumber}> Sumber</Text>
                                        </TouchableOpacity>
                                        <Text style={style.Label1}>harga emas:{"\n"}Rp.938.099 </Text>
                                    </View>
                                    <Text style={style.Label1}>Jumlah zakat profesi yang anda bayar</Text>
                                    <TextInput style={style.Textinputcss}
                                        value={Math.round(this.state.sumpro).toString().replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                                        keyboardType="numeric"
                                        onChange={this.profesi}
                                        editable={false}
                                        placeholderTextColor='#7e7e7e'
                                    />
                                    {/* <Text style={style.kotak1}>Rp. {Math.round(this.state.sumpro).toString().replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</Text>
                                    <TouchableOpacity style={{ marginTop: 10, justifyContent: 'center', alignContent: 'center', alignItems: 'center', }} onPress={this.profesi}>
                                        <Text style={style.btnSimpanDark}>Hitung</Text>
                                    </TouchableOpacity> */}
                                    <Picker style={style.datePickerStyleRight} mode="dropdown"
                                        selectedValue={this.state.nama}
                                        value={this.state.bayar}
                                        onValueChange={(itemValue) => {
                                            this.setState({
                                                nama: itemValue
                                            })
                                        }}>
                                        <Picker.Item style={{ fontSize: 12 }} label={'Pilih Metode Pembayaran'} value={'0'} key={'0'} />
                                        <Picker.Item label="ATM/Bank Tranfer" value="ATM" />

                                    </Picker>
                                    <TouchableOpacity onPress={() => {
                                        if (text1 < harmas) {
                                            this.setState(() => ({ nameError: " Masukan Nominal." }));
                                            ToastAndroid.show('untuk pendapatan propesi tidak wajib membayar zakat', ToastAndroid.LONG);
                                        } else {
                                            this.profesi
                                            this.setState(() => ({ nameError: null }));
                                            this.setState({ modalpropesi: true })
                                            this.setState({
                                                sumpro: ((text1 * 12 * 2.5) / 100) + ((text2 * 12 * 2.5) / 100)
                                            });
                                        }
                                    }} style={{ marginTop: 10, justifyContent: 'center', alignContent: 'center', alignItems: 'center', }}>
                                        <View style={style.btnSimpanDark}>
                                            <Text> Bayar Zakat</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                                <View style={{ width: '100%', height: 1, backgroundColor: '#EBEAEA', marginTop: 20 }} />

                                <View style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center', alignSelf: 'center', marginTop: 20, width: '90%' }}>
                                    <TouchableOpacity style={style.btnSimpanbaru} onPress={() => this.props.navigation.navigate('')}>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Text style={{ color: '#fff' }}>Lanjut Pembayaran</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        }
                        {this.state.showPerdagangan &&
                            <View>
                                <View style={{ flexDirection: 'column' }}>
                                    <View style={{ marginTop: 10, marginBottom: 10, }}>
                                        {!!this.state.nameError && (
                                            <Text style={{ color: "red" }}>{this.state.nameError}</Text>
                                        )}
                                        <Text style={{ marginBottom: 10, marginLeft: 10 }}>Perhitungan Zakat</Text>
                                        <TextInput style={style.Textinputcss}
                                            value={firstValue.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                                            keyboardType="numeric"
                                            onChangeText={(text) => { this.setState({ firstValue: text.replace(/\D/g, "") }), this.perdagangan(text.replace(/\D/g, ""), this.state.secondValue) }}
                                            placeholder="Modal (1 Tahun)"
                                            placeholderTextColor='#7e7e7e'
                                        />
                                    </View>
                                    <View style={{ marginTop: 10, marginBottom: 10, }}>
                                        <TextInput style={style.Textinputcss}
                                            value={secondValue.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                                            keyboardType="numeric"
                                            onChangeText={(text) => { this.setState({ secondValue: text.replace(/\D/g, "") }), this.perdagangan(this.state.firstValue, text.replace(/\D/g, "")) }}
                                            placeholder="Keuntungan (1 Tahun)"
                                            placeholderTextColor='#7e7e7e'
                                        />
                                    </View>

                                    <View style={{ marginTop: 10, marginBottom: 10, }}>
                                        <TextInput style={style.Textinputcss}
                                            value={thirdValue.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                                            keyboardType="numeric"
                                            onChangeText={(text) => { this.setState({ thirdValue: text.replace(/\D/g, "") }), this.perdagangan(text.replace(/\D/g, ""), this.state.fourValue) }}
                                            placeholder="Hutang / Kerugian (1 Tahun)"
                                            placeholderTextColor='#7e7e7e'
                                        />
                                    </View>
                                    <View style={{ marginTop: 10, marginBottom: 10, }}>
                                        <TextInput style={style.Textinputcss}
                                            value={fourValue.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                                            keyboardType="numeric"
                                            onChangeText={(text) => { this.setState({ fourValue: text.replace(/\D/g, "") }), this.perdagangan(this.state.thirdValue, text.replace(/\D/g, "")) }}
                                            placeholder="Hutang Jatuh Tempo"
                                            placeholderTextColor='#7e7e7e'
                                        />
                                    </View>

                                </View>
                                <View style={{ flexDirection: 'column', marginTop: 15, }}>
                                    <Text style={style.Label1}>Harga Emas saat ini: Rp 938.099</Text>
                                    <View >
                                        <TouchableOpacity onPress={(this.sumberperdagangan)}>
                                            <Text style={style.Labelsumber}> Sumber</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>

                                <Text style={style.Label1}>Jumlah zakat perdagangan yang anda bayar</Text>
                                <TextInput style={style.Textinputcss}
                                    value={Math.round(this.state.sumper).toString().replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                                    keyboardType="numeric"
                                    onChange={this.perdagangan}
                                    editable={false}
                                    placeholderTextColor='#7e7e7e'
                                />
                                {/* <Text style={style.kotak1}>Rp. {Math.round(this.state.sum).toString().replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</Text>
                                <TouchableOpacity style={{ marginTop: 10, justifyContent: 'center', alignContent: 'center', alignItems: 'center', }} onPress={this.perdagangan}>
                                    <Text style={style.btnSimpanDark}>Hitung</Text>
                                </TouchableOpacity> */}
                                <TouchableOpacity onPress={() => {
                                    if (text1 < harmas) {
                                        this.setState(() => ({ nameError: " Masukan Nominal." }));
                                        ToastAndroid.show('untuk pendapatan propesi tidak wajib membayar zakat', ToastAndroid.LONG);
                                    } else {
                                        this.profesi
                                        this.setState(() => ({ nameError: null }));
                                        // this.setState({ modalpropesi: true })
                                        this.setState({
                                            sumper: ((text1 - text3) * 2.5 * 12 / 100)
                                        });

                                    }
                                }} style={{ marginTop: 10, justifyContent: 'center', alignContent: 'center', alignItems: 'center', }}>
                                    <View style={style.btnSimpanDark}>
                                        <Text> Bayar Zakat</Text>
                                    </View>
                                </TouchableOpacity>

                            </View>
                        }

                        {this.state.showEmas &&
                            <View>
                                <View style={{ flexDirection: 'column' }}>
                                    <View style={{ marginTop: 10, marginBottom: 10, }}>
                                        {!!this.state.nameError && (
                                            <Text style={{ color: "red" }}>{this.state.nameError}</Text>
                                        )}
                                        <Text style={{ marginBottom: 10, marginLeft: 10 }}>Perhitungan Zakat</Text>
                                        <View style={{ marginTop: 10, marginBottom: 10, }}>
                                            <TextInput style={style.Textinputcss}
                                                value={firstValue.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                                                keyboardType="numeric"
                                                onChangeText={(text) => { this.setState({ firstValue: text.replace(/\D/g, "") }), this.emas(this.state.secondValue, text.replace(/\D/g, "")) }}
                                                placeholder="Gram"
                                                placeholderTextColor='#7e7e7e'
                                            />
                                        </View>
                                    </View>
                                </View>
                                <View style={{ marginTop: -15 }}>
                                    <Text style={style.Label1}>Harga Emas saat ini{"\n"}: Rp 938.099</Text>
                                </View>

                                <View >
                                    <TouchableOpacity onPress={(this.sumberemas)}>
                                        <Text style={style.Labelsumber}> Sumber</Text>
                                    </TouchableOpacity>
                                </View>
                                <Text style={style.Label1}>Jumlah zakat emas yang anda bayar</Text>
                                <TextInput style={style.Textinputcss}
                                    value={Math.round(this.state.sumemas).toString().replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                                    keyboardType="numeric"
                                    onChange={this.profesi}
                                    editable={false}
                                    placeholderTextColor='#7e7e7e'
                                />
                                {/* <Text style={style.kotak1}>Rp. {Math.round(this.state.sum).toString().replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</Text>
                                <TouchableOpacity style={{ marginTop: 10, justifyContent: 'center', alignContent: 'center', alignItems: 'center', }} onPress={this.emas}>
                                    <Text style={style.btnSimpanDark}>Hitung</Text>
                                </TouchableOpacity> */}
                                <TouchableOpacity onPress={() => {
                                    if (this.state.firstValue.trim() === "") {
                                        this.setState(() => ({ nameError: " Masukan Nominal." }));
                                    } else {
                                        this.setState(() => ({ nameError: null }));

                                        this.setState({
                                            sumemas: ((text1 * 938099) * 2.5 / 100)
                                        });
                                    }
                                }} style={{ marginTop: 10, justifyContent: 'center', alignContent: 'center', alignItems: 'center', }}>
                                    <View style={style.btnSimpanDark}>
                                        <Text> Bayar Zakat</Text>
                                    </View>
                                </TouchableOpacity>

                            </View>
                        }

                        {this.state.showSimpanan &&
                            <View>
                                <View>
                                    <View style={{ flexDirection: 'column' }}>
                                        <View style={{ marginTop: 10, marginBottom: 10, }}>
                                            {!!this.state.nameError && (
                                                <Text style={{ color: "red" }}>{this.state.nameError}</Text>
                                            )}
                                            <Text style={{ marginBottom: 10, marginLeft: 10 }}>Perhitungan Zakat</Text>
                                            <TextInput style={style.Textinputcss}
                                                value={firstValue.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                                                keyboardType="numeric"
                                                onChangeText={(text) => { this.setState({ firstValue: text.replace(/\D/g, "") }), this.simpanan(text.replace(/\D/g, ""), this.state.secondValue) }}
                                                placeholder="Saldo Tabungan (Wajib Isi)"
                                                placeholderTextColor='#7e7e7e'
                                            />
                                        </View>
                                        <View style={{ marginTop: 10, marginBottom: 10, }}>
                                            <TextInput style={style.Textinputcss}
                                                value={secondValue.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                                                keyboardType="numeric"
                                                onChangeText={(text) => { this.setState({ secondValue: text.replace(/\D/g, "") }), this.simpanan(this.state.firstValue, text.replace(/\D/g, "")) }}
                                                placeholder="Bagi Hasil (Jika ada)"
                                                placeholderTextColor='#7e7e7e'
                                            />
                                        </View>

                                    </View>
                                    <View style={{ flexDirection: 'column' }}>
                                        <TouchableOpacity onPress={(this.sumberpropesi)}>
                                            <Text style={style.Labelsumber}> Sumber</Text>
                                        </TouchableOpacity>
                                        <Text style={style.Label1}>harga emas:p.938.099 </Text>
                                    </View>
                                    <Text style={style.Label1}>Jumlah zakat simpanan yang anda bayar</Text>
                                    <TextInput style={style.Textinputcss}
                                        value={Math.round(this.state.sumsim).toString().replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                                        keyboardType="numeric"
                                        onChange={this.profesi}
                                        editable={false}
                                        placeholderTextColor='#7e7e7e'
                                    />
                                    {/* <Text style={style.kotak1}>Rp. {Math.round(this.state.sum).toString().replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</Text>
                                    <TouchableOpacity style={{ marginTop: 10, justifyContent: 'center', alignContent: 'center', alignItems: 'center', }} onPress={this.profesi}>
                                        <Text style={style.btnSimpanDark}>Hitung</Text>
                                    </TouchableOpacity> */}
                                    <Picker style={style.datePickerStyleRight} mode="dropdown"
                                        selectedValue={this.state.nama}
                                        value={this.state.bayar}
                                        onValueChange={(itemValue) => {
                                            this.setState({
                                                nama: itemValue
                                            })
                                        }}>
                                        <Picker.Item style={{ fontSize: 12 }} label={'Pilih Metode Pembayaran'} value={'0'} key={'0'} />
                                        <Picker.Item label="ATM/Bank Tranfer" value="ATM" />

                                    </Picker>
                                    <TouchableOpacity onPress={() => {
                                        if (this.state.firstValue.trim() === "") {
                                            this.setState(() => ({ nameError: " Masukan Nominal." }));
                                        } else {
                                            this.profesi
                                            this.setState(() => ({ nameError: null }));
                                            // this.setState({ modalpropesi: true })

                                            this.setState({
                                                sumsim: ((text1 * 12 * 2.5) / 100) + ((text2 * 12 * 2.5) / 100)
                                            });
                                        }
                                    }} style={{ marginTop: 10, justifyContent: 'center', alignContent: 'center', alignItems: 'center', }}>
                                        <View style={style.btnSimpanDark}>
                                            <Text> Bayar Zakat</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                                <View style={{ width: '100%', height: 1, backgroundColor: '#EBEAEA', marginTop: 20 }} />

                                <View style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center', alignSelf: 'center', marginTop: 20, width: '90%' }}>
                                    <TouchableOpacity style={style.btnSimpanbaru} onPress={() => this.props.navigation.navigate('')}>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Text style={{ color: '#fff' }}>Lanjut Pembayaran</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        }
                    </View>

                </View>
                {/* <SafeAreaView>
                <View style={{ backgroundColor: '#0EBEDF' }}>
                    <Text style={style.title}>Zakat</Text>
                </View>
                <>
                    <View>
                        {inputbutton}
                        <View>
                            <Text style={style.Label1}>Jenis Zakat</Text>
                            <Picker style={style.Textinputcss}
                                selectedValue={this.state.zakat}
                                onValueChange={(itemValue) => this.setState({ zakat: itemValue, show: 1 })}
                            >
                                <Picker.Item label="Pilih Zakat" value="" />
                                <Picker.Item label="Zakat Propesi" value="Zakat_Propesi" />
                                <Picker.Item label="Zakat Emas" value="Zakat_Emas" />
                                <Picker.Item label="Zakat Simpanan" value="Zakat_Simpanan" />
                                <Picker.Item label="Zakat Perdagangan" value="Zakat_Perdagangan" />
                            </Picker>


                        </View>

                        {this.state.show === 1 && this.state.zakat === 'Zakat_Propesi' ?
                            <View>
                                <View style={{ flexDirection: 'row' }}>
                                    <View style={{ flexDirection: 'column' }}>
                                        {!!this.state.nameError && (
                                            <Text style={{ color: "red" }}>{this.state.nameError}</Text>
                                        )}
                                        <Text style={style.Label1}>Pendapatan Perbulan</Text>
                                        <TextInput style={{
                                            color: '#7e7e7e',
                                            marginLeft: 30,
                                            marginRight: 10,
                                            borderRadius: 10,
                                            borderWidth: 1,
                                            fontSize: 12,
                                            height: 52,
                                            backgroundColor: '#f2f2f2',
                                            shadowColor: "#333",
                                            shadowOffset: {
                                                width: 1,
                                                height: 1,
                                            },
                                            shadowOpacity: 0.3,
                                            shadowRadius: 2,
                                            borderColor: '#7e7e7e',
                                            elevation: 3,
                                            marginTop: 10,
                                        }}
                                            value={'Rp. ' + firstValue.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                                            keyboardType="numeric"
                                            onChangeText={(text) => this.setState({ firstValue: text.replace(/\D/g, "") })}
                                            placeholder="Rp.0"
                                            placeholderTextColor='#7e7e7e'
                                        />
                                    </View>

                                    <View style={{ flexDirection: 'column', }}>
                                        <Text style={style.Label1}>Bonus, THR Lainnya {"\n"}(jika ada)</Text>
                                        <TextInput style={style.Textinputcss}
                                            value={'Rp. ' + secondValue.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                                            keyboardType="numeric"
                                            onChangeText={(text) => this.setState({ secondValue: text.replace(/\D/g, "") })}
                                            placeholder="Rp.0"
                                            placeholderTextColor='#7e7e7e'
                                        />
                                    </View>

                                </View>
                                <View style={{ flexDirection: 'column' }}>
                                    <TouchableOpacity onPress={(this.sumberpropesi)}>
                                        <Text style={style.Labelsumber}> Sumber</Text>
                                    </TouchableOpacity>
                                    <Text style={style.Label1}>harga emas:{"\n"}Rp.938.099 </Text>
                                </View>
                                <Text style={style.Label1}>Jumlah zakat profesi yang anda bayar</Text>
                                <Text style={style.kotak1}>Rp. {Math.round(this.state.sum).toString().replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</Text>
                                <TouchableOpacity style={{ marginTop: 10, justifyContent: 'center', alignContent: 'center', alignItems: 'center', }} onPress={this.profesi}>
                                    <Text style={style.btnSimpanDark}>Hitung</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => {
                                    if (this.state.firstValue.trim() === "") {
                                        this.setState(() => ({ nameError: " Masukan Nominal." }));
                                    } else {
                                        this.profesi
                                        this.setState(() => ({ nameError: null }));
                                        this.setState({ modalpropesi: true })
                                    }
                                }} style={{ marginTop: 10, justifyContent: 'center', alignContent: 'center', alignItems: 'center', }}>
                                    <View style={style.btnSimpanDark}>
                                        <Text> Bayar Zakat</Text>
                                    </View>
                                </TouchableOpacity>
                                <Collapse>
                                    <CollapseHeader>
                                        <View style={style.coltom}>
                                            <Text style={{ marginLeft: 25, color: '#7e7e7e', fontSize: 14, }}>Muzakki Zakat Profesi</Text>
                                            <Image source={arrow} style={{
                                                padding: 10,
                                                margin: 5,
                                                height: 20,
                                                width: 20,
                                                position: 'absolute',
                                                resizeMode: 'stretch',
                                                alignItems: 'center',
                                                right: 15,
                                                top: -5,
                                            }}></Image>
                                        </View>
                                    </CollapseHeader>
                                    <CollapseBody>
                                        <View>
                                            <Text> Disini List Muzakki</Text>
                                        </View>
                                    </CollapseBody>
                                </Collapse>
                            </View>
                            :

                            this.state.show === 1 && this.state.zakat === 'Zakat_Emas' ?
                                <View>
                                    <View style={{ flexDirection: 'row' }}>
                                        <View style={{ flexDirection: 'column' }}>
                                            {!!this.state.nameError && (
                                                <Text style={{ color: "red" }}>{this.state.nameError}</Text>
                                            )}
                                            <Text style={style.Label1}>Jumlah Emas per gram</Text>
                                            <TextInput style={style.Textinputcss}
                                                value={firstValue.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                                                keyboardType="numeric"
                                                onChangeText={(text) => this.setState({ firstValue: text.replace(/\D/g, "") })}
                                                placeholder="Gram"
                                                placeholderTextColor='#7e7e7e'
                                            />
                                        </View>
                                        <View style={{ flexDirection: 'column', marginTop: 15, }}>
                                            <Text style={style.Label1}>Harga Emas saat ini{"\n"}: Rp 938.099</Text>
                                        </View>
                                    </View>
                                    <View >
                                        <TouchableOpacity onPress={(this.sumberemas)}>
                                            <Text style={style.Labelsumber}> Sumber</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <Text style={style.Label1}>Jumlah zakat profesi yang anda bayar</Text>
                                    <Text style={style.kotak1}>Rp. {Math.round(this.state.sum).toString().replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</Text>
                                    <TouchableOpacity style={{ marginTop: 10, justifyContent: 'center', alignContent: 'center', alignItems: 'center', }} onPress={this.emas}>
                                        <Text style={style.btnSimpanDark}>Hitung</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => {
                                        if (this.state.firstValue.trim() === "") {
                                            this.setState(() => ({ nameError: " Masukan Nominal." }));
                                        } else {
                                            this.setState(() => ({ nameError: null }));
                                            this.setState({ modalemas: true })
                                        }
                                    }} style={{ marginTop: 10, justifyContent: 'center', alignContent: 'center', alignItems: 'center', }}>
                                        <View style={style.btnSimpanDark}>
                                            <Text> Bayar Zakat</Text>
                                        </View>
                                    </TouchableOpacity>
                                    <Collapse>
                                        <CollapseHeader>
                                            <View style={style.coltom}>
                                                <Text style={{ marginLeft: 25, color: '#7e7e7e', fontSize: 14, }}>Muzakki Zakat emas</Text>
                                                <Image source={arrow} style={{
                                                    padding: 10,
                                                    margin: 5,
                                                    height: 20,
                                                    width: 20,
                                                    position: 'absolute',
                                                    resizeMode: 'stretch',
                                                    alignItems: 'center',
                                                    right: 15,
                                                    top: -5,
                                                }}></Image>
                                            </View>
                                        </CollapseHeader>
                                        <CollapseBody>
                                            <View>
                                                <Text> Disini List Muzakki</Text>
                                            </View>
                                        </CollapseBody>
                                    </Collapse>
                                </View>
                                :

                                this.state.show === 1 && this.state.zakat === 'Zakat_Simpanan' ?
                                    <View>
                                        <View style={{ flexDirection: 'row' }}>
                                            <View style={{ flexDirection: 'column' }}>
                                                <Text style={style.Label1}>Saldo Tabungan{"\n"}(wajib di isi)</Text>
                                                {!!this.state.nameError && (
                                                    <Text style={{ color: "red" }}>{this.state.nameError}</Text>
                                                )}
                                                <TextInput style={style.Textinputcss}
                                                    value={'Rp. ' + firstValue.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                                                    keyboardType="numeric"
                                                    onChangeText={(text) => this.setState({ firstValue: text.replace(/\D/g, "") })}
                                                    placeholder="Rp.0"
                                                    placeholderTextColor='#7e7e7e'
                                                />
                                            </View>

                                            <View style={{ flexDirection: 'column', marginTop: 15, }}>
                                                <Text style={style.Label1}>Bagi Hasil (jika ada)</Text>
                                                <TextInput style={style.Textinputcss}
                                                    value={'Rp. ' + secondValue.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                                                    keyboardType="numeric"
                                                    onChangeText={(text) => this.setState({ secondValue: text.replace(/\D/g, "") })}
                                                    placeholder="Rp.0"
                                                    placeholderTextColor='#7e7e7e'
                                                />
                                            </View>
                                        </View>
                                        <View style={{ flexDirection: 'row', marginTop: 15, }}>
                                            <Text style={style.Label1}>Harga Emas saat ini{"\n"}: Rp 938.099</Text>
                                            <TouchableOpacity onPress={(this.sumbersimpan)}>
                                                <Text style={style.Labelsumber}> Sumber</Text>
                                            </TouchableOpacity>
                                        </View>
                                        <View >

                                        </View>
                                        <Text style={style.Label1}>Jumlah zakat simpan yang anda bayar</Text>
                                        <Text style={style.kotak1}>Rp. {Math.round(this.state.sum).toString().replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</Text>
                                        <TouchableOpacity style={{ marginTop: 10, justifyContent: 'center', alignContent: 'center', alignItems: 'center', }} onPress={this.simpanan}>
                                            <Text style={style.btnSimpanDark}>Hitung</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => {
                                            if (this.state.firstValue.trim() === "") {
                                                this.setState(() => ({ nameError: " Masukan Nominal." }));
                                            } else {
                                                this.setState(() => ({ nameError: null }));
                                                this.setState({ modalsimpan: true })
                                            }
                                        }} style={{ marginTop: 10, justifyContent: 'center', alignContent: 'center', alignItems: 'center', }}>
                                            <View style={style.btnSimpanDark}>
                                                <Text> Bayar Zakat</Text>
                                            </View>
                                        </TouchableOpacity>
                                        <Collapse>
                                            <CollapseHeader>
                                                <View style={style.coltom}>
                                                    <Text style={{ marginLeft: 25, color: '#7e7e7e', fontSize: 14, }}>Muzakki Zakat Simpan</Text>
                                                    <Image source={arrow} style={{
                                                        padding: 10,
                                                        margin: 5,
                                                        height: 20,
                                                        width: 20,
                                                        position: 'absolute',
                                                        resizeMode: 'stretch',
                                                        alignItems: 'center',
                                                        right: 15,
                                                        top: -5,
                                                    }}></Image>
                                                </View>
                                            </CollapseHeader>
                                            <CollapseBody>
                                                <View>
                                                    <Text> Disini List Muzakki</Text>
                                                </View>
                                            </CollapseBody>
                                        </Collapse>
                                    </View>
                                    :

                                    this.state.show === 1 && this.state.zakat === 'Zakat_Perdagangan' ?
                                        <View>
                                            <View style={{ flexDirection: 'row' }}>
                                                <View style={{ flexDirection: 'column', marginTop: 20 }}>
                                                    {!!this.state.nameError && (
                                                        <Text style={{ color: "red" }}>{this.state.nameError}</Text>
                                                    )}
                                                    <Text style={style.Label1}>Modal (1 Tahun)     </Text>
                                                    <TextInput style={style.Textinputcss}
                                                        value={'Rp. ' + firstValue.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                                                        keyboardType="numeric"
                                                        onChangeText={(text) => this.setState({ firstValue: text.replace(/\D/g, "") })}
                                                        placeholder="Rp."
                                                        placeholderTextColor='#7e7e7e'
                                                    />
                                                </View>
                                                <View style={{ flexDirection: 'column', }}>
                                                    <View style={{ flexDirection: 'column' }}>
                                                        <Text style={style.Label1}>Hutang /{"\n"}Kerugian (1 Tahun)</Text>
                                                        <TextInput style={style.Textinputcss}
                                                            value={'Rp. ' + thirdValue.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                                                            keyboardType="numeric"
                                                            onChangeText={(text) => this.setState({ thirdValue: text.replace(/\D/g, "") })}
                                                            placeholder="Rp.0"
                                                            placeholderTextColor='#7e7e7e'
                                                        />
                                                    </View>
                                                </View>
                                            </View>
                                            <View style={{ flexDirection: 'column', marginTop: 15, }}>
                                                <Text style={style.Label1}>Harga Emas saat ini: Rp 938.099</Text>
                                                <View >
                                                    <TouchableOpacity onPress={(this.sumberperdagangan)}>
                                                        <Text style={style.Labelsumber}> Sumber</Text>
                                                    </TouchableOpacity>
                                                </View>
                                            </View>

                                            <Text style={style.Label1}>Jumlah zakat perdagangan yang anda bayar</Text>
                                            <Text style={style.kotak1}>Rp. {Math.round(this.state.sum).toString().replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</Text>
                                            <TouchableOpacity style={{ marginTop: 10, justifyContent: 'center', alignContent: 'center', alignItems: 'center', }} onPress={this.perdagangan}>
                                                <Text style={style.btnSimpanDark}>Hitung</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() => {
                                                if (this.state.firstValue.trim() === "") {
                                                    this.setState(() => ({ nameError: " Masukan Nominal." }));
                                                } else {
                                                    this.setState(() => ({ nameError: null }));
                                                    this.setState({ modalperdagangan: true })
                                                }
                                            }} style={{ marginTop: 10, justifyContent: 'center', alignContent: 'center', alignItems: 'center', }}>
                                                <View style={style.btnSimpanDark}>
                                                    <Text> Bayar Zakat</Text>
                                                </View>
                                            </TouchableOpacity>
                                            <Collapse>
                                                <CollapseHeader>
                                                    <View style={style.coltom}>
                                                        <Text style={{ marginLeft: 25, color: '#7e7e7e', fontSize: 14, }}>Muzakki Zakat Perdagangan</Text>
                                                        <Image source={arrow} style={{
                                                            padding: 10,
                                                            margin: 5,
                                                            height: 20,
                                                            width: 20,
                                                            position: 'absolute',
                                                            resizeMode: 'stretch',
                                                            alignItems: 'center',
                                                            right: 15,
                                                            top: -5,
                                                        }}></Image>
                                                    </View>
                                                </CollapseHeader>
                                                <CollapseBody>
                                                    <View>
                                                        <Text> Disini List Muzakki</Text>
                                                    </View>
                                                </CollapseBody>
                                            </Collapse>
                                        </View>
                                        :
                                        <View />
                        }


                    </View>
                </>
                <Modal
                    animationType={"slide"}
                    transparent={true}
                    visible={this.state.modalpropesi}
                >
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
                            <Text style={style.itemText}>Pembayaran</Text>
                            <Image source={qr} style={{ height: '25%', width: '50%', marginTop: 10, }}></Image>
                            <View>
                                <Text> Tata cara Pembayaran</Text>
                                <Text>
                                    0. pilih metode Pembayaran yang dipakai
                                    {"\n"}
                                    1. ketika memilih metode pembayaran akan mendownload QR code dan anda akan dialikan ke aplikasi pembayaran
                                    {"\n"}
                                    2. Klik Menu "Bayar"
                                    {"\n"}
                                    3. Scan Kode QRIS atau Upload Kode QRIS yang sudah di download sebelumnya
                                    {"\n"}
                                    4. Masukan Nominal transaksi
                                    {"\n"}
                                    5. Masukan Pin
                                    {"\n"}
                                    6. Pembayaran Berhasil
                                </Text>
                            </View>
                            <ScrollView style={{ width: '100%', height: '100%' }}>
                                <Text style={{
                                    color: '#000000',
                                    marginTop: 10,
                                    justifyContent: 'center',
                                    alignContent: 'center',
                                    alignItems: 'center',
                                    textAlign: 'center',
                                    fontSize: 16,
                                    height: 35,
                                    width: '50%',
                                }}>{`Rp. ${this.state.sum}`}</Text>
                                <Collapse>
                                    <CollapseHeader>
                                        <View style={style.coltom}>
                                            <Text style={{ marginLeft: 25, color: '#7e7e7e', fontSize: 14, }}>Pilih Metode Pembayaran</Text>
                                            <Image source={arrow} style={{
                                                padding: 10,
                                                margin: 5,
                                                height: 20,
                                                width: 20,
                                                position: 'absolute',
                                                resizeMode: 'stretch',
                                                alignItems: 'center',
                                                right: 15,
                                                top: -5,
                                            }}></Image>
                                        </View>
                                    </CollapseHeader>
                                    <CollapseBody>
                                        <View>
                                            <Text onPress={() => { Linking.openURL('https://link.dana.id', this.setState({ modalpropesi: false })) }} style={style.itemflat1}>
                                                <View style={{ flexDirection: 'row', marginLeft: 20, }}>
                                                    <Image source={ovo}
                                                        style={{ borderRadius: 10, height: 80, width: 55, }} />
                                                    <Text style={{ marginLeft: 20, marginTop: 15, fontWeight: 'bold' }}> OVO</Text>
                                                </View>
                                            </Text>
                                        </View>
                                        <View>
                                            <Text onPress={() => { Linking.openURL('https://gojek.link', this.setState({ modalpropesi: false })) }} style={style.itemflat1}>
                                                <View style={{ flexDirection: 'row', marginLeft: 20, }}>
                                                    <Image source={ovo}
                                                        style={{ borderRadius: 10, height: 80, width: 55, }} />
                                                    <Text style={{ marginLeft: 20, marginTop: 15, fontWeight: 'bold' }}> GO-PAY</Text>
                                                </View>
                                            </Text>
                                        </View>
                                        <View >
                                            <Text onPress={() => { Linking.openURL('https://shopeepay.link', this.setState({ modalpropesi: false })) }} style={style.itemflat1}>
                                                <View style={{ flexDirection: 'row', marginLeft: 20, }}>
                                                    <Image source={ovo}
                                                        style={{ borderRadius: 10, height: 80, width: 55, }} />
                                                    <Text style={{ marginLeft: 20, marginTop: 15, fontWeight: 'bold' }}> ShopeePay</Text>
                                                </View>
                                            </Text>
                                        </View>
                                        <View>
                                            <Text style={style.itemflat1}>
                                                <View style={{ flexDirection: 'row', marginLeft: 20, }}>
                                                    <Image source={ovo}
                                                        style={{ borderRadius: 10, height: 80, width: 55, }} />
                                                    <Text style={{ marginLeft: 20, marginTop: 15, fontWeight: 'bold' }}> LinkAja</Text>
                                                </View>
                                            </Text>
                                        </View>
                                        <View>
                                            <Text style={style.itemflat1}>
                                                <View style={{ flexDirection: 'row', marginLeft: 20, }}>
                                                    <Image source={ovo}
                                                        style={{ borderRadius: 10, height: 80, width: 55, }} />
                                                    <Text style={{ marginLeft: 20, marginTop: 15, fontWeight: 'bold' }}> DANA</Text>
                                                </View>
                                            </Text>
                                        </View>
                                    </CollapseBody>
                                </Collapse>
                                <View style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center', marginTop: 10, }}>
                                    <Text onPress={() => this.setState({ modalpropesi: false })} style={{ marginTop: 10, justifyContent: 'center', alignContent: 'center', alignItems: 'center', }}>
                                        <View style={style.btnSimpanUn1}>
                                            <Text> Kembali</Text>
                                        </View>
                                    </Text>
                                </View>
                            </ScrollView>
                        </View>

                    </View>

                </Modal>
                <Modal
                    animationType={"slide"}
                    transparent={true}
                    visible={this.state.modalsimpan}
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
                            <Text style={style.itemText}>Pembayaran</Text>
                            <ScrollView style={{ width: '100%', height: '100%' }}>
                                <Text style={{
                                    color: '#000000',
                                    marginTop: 10,
                                    justifyContent: 'center',
                                    alignContent: 'center',
                                    alignItems: 'center',
                                    textAlign: 'center',
                                    fontSize: 16,
                                    height: 35,
                                    width: '50%',
                                }}>{`Rp. ${this.state.sum}`}</Text>
                                <Collapse>
                                    <CollapseHeader>
                                        <View style={style.coltom}>
                                            <Text style={{ marginLeft: 25, color: '#7e7e7e', fontSize: 14, }}>Pilih Metode Pembayaran</Text>
                                            <Image source={arrow} style={{
                                                padding: 10,
                                                margin: 5,
                                                height: 20,
                                                width: 20,
                                                position: 'absolute',
                                                resizeMode: 'stretch',
                                                alignItems: 'center',
                                                right: 15,
                                                top: -5,
                                            }}></Image>
                                        </View>
                                    </CollapseHeader>
                                    <CollapseBody>
                                        <View>
                                            <TouchableOpacity style={style.itemflat1}>
                                                <View style={{ flexDirection: 'row', marginLeft: 20, }}>
                                                    <Image source={ovo}
                                                        style={{ borderRadius: 10, height: 80, width: 55, }} />
                                                    <Text style={{ marginLeft: 20, marginTop: 15, fontWeight: 'bold' }}> OVO</Text>
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                        <View >
                                            <TouchableOpacity style={style.itemflat1}>
                                                <View style={{ flexDirection: 'row', marginLeft: 20, }}>
                                                    <Image source={ovo}
                                                        style={{ borderRadius: 10, height: 80, width: 55, }} />
                                                    <Text style={{ marginLeft: 20, marginTop: 15, fontWeight: 'bold' }}> ShopeePay</Text>
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                        <View>
                                            <TouchableOpacity style={style.itemflat1}>
                                                <View style={{ flexDirection: 'row', marginLeft: 20, }}>
                                                    <Image source={ovo}
                                                        style={{ borderRadius: 10, height: 80, width: 55, }} />
                                                    <Text style={{ marginLeft: 20, marginTop: 15, fontWeight: 'bold' }}> GO-PAY</Text>
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                        <View>
                                            <TouchableOpacity style={style.itemflat1}>
                                                <View style={{ flexDirection: 'row', marginLeft: 20, }}>
                                                    <Image source={ovo}
                                                        style={{ borderRadius: 10, height: 80, width: 55, }} />
                                                    <Text style={{ marginLeft: 20, marginTop: 15, fontWeight: 'bold' }}> LinkAja</Text>
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                        <View>
                                            <TouchableOpacity style={style.itemflat1}>
                                                <View style={{ flexDirection: 'row', marginLeft: 20, }}>
                                                    <Image source={ovo}
                                                        style={{ borderRadius: 10, height: 80, width: 55, }} />
                                                    <Text style={{ marginLeft: 20, marginTop: 15, fontWeight: 'bold' }}> DANA</Text>
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                    </CollapseBody>
                                </Collapse>
                                <View style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center', marginTop: 10, }}>
                                    <Text onPress={() => this.setState({ modalsimpan: false })} style={{ marginTop: 10, justifyContent: 'center', alignContent: 'center', alignItems: 'center', }}>
                                        <View style={style.btnSimpanUn1}>
                                            <Text> Kembali</Text>
                                        </View>
                                    </Text>
                                </View>
                            </ScrollView>
                        </View>

                    </View>

                </Modal>
                <Modal
                    animationType={"slide"}
                    transparent={true}
                    visible={this.state.modalperdagangan}
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
                            <Text style={style.itemText}>Pembayaran</Text>
                            <ScrollView style={{ width: '100%', height: '100%' }}>
                                <Text style={{
                                    color: '#000000',
                                    marginTop: 10,
                                    justifyContent: 'center',
                                    alignContent: 'center',
                                    alignItems: 'center',
                                    textAlign: 'center',
                                    fontSize: 16,
                                    height: 35,
                                    width: '50%',
                                }}>{`Rp. ${this.state.sum}`}</Text>
                                <Collapse>
                                    <CollapseHeader>
                                        <View style={style.coltom}>
                                            <Text style={{ marginLeft: 25, color: '#7e7e7e', fontSize: 14, }}>Pilih Metode Pembayaran</Text>
                                            <Image source={arrow} style={{
                                                padding: 10,
                                                margin: 5,
                                                height: 20,
                                                width: 20,
                                                position: 'absolute',
                                                resizeMode: 'stretch',
                                                alignItems: 'center',
                                                right: 15,
                                                top: -5,
                                            }}></Image>
                                        </View>
                                    </CollapseHeader>
                                    <CollapseBody>
                                        <View>
                                            <TouchableOpacity style={style.itemflat1}>
                                                <View style={{ flexDirection: 'row', marginLeft: 20, }}>
                                                    <Image source={ovo}
                                                        style={{ borderRadius: 10, height: 80, width: 55, }} />
                                                    <Text style={{ marginLeft: 20, marginTop: 15, fontWeight: 'bold' }}> OVO</Text>
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                        <View >
                                            <TouchableOpacity style={style.itemflat1}>
                                                <View style={{ flexDirection: 'row', marginLeft: 20, }}>
                                                    <Image source={ovo}
                                                        style={{ borderRadius: 10, height: 80, width: 55, }} />
                                                    <Text style={{ marginLeft: 20, marginTop: 15, fontWeight: 'bold' }}> ShopeePay</Text>
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                        <View>
                                            <TouchableOpacity style={style.itemflat1}>
                                                <View style={{ flexDirection: 'row', marginLeft: 20, }}>
                                                    <Image source={ovo}
                                                        style={{ borderRadius: 10, height: 80, width: 55, }} />
                                                    <Text style={{ marginLeft: 20, marginTop: 15, fontWeight: 'bold' }}> GO-PAY</Text>
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                        <View>
                                            <TouchableOpacity style={style.itemflat1}>
                                                <View style={{ flexDirection: 'row', marginLeft: 20, }}>
                                                    <Image source={ovo}
                                                        style={{ borderRadius: 10, height: 80, width: 55, }} />
                                                    <Text style={{ marginLeft: 20, marginTop: 15, fontWeight: 'bold' }}> LinkAja</Text>
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                        <View>
                                            <TouchableOpacity style={style.itemflat1}>
                                                <View style={{ flexDirection: 'row', marginLeft: 20, }}>
                                                    <Image source={ovo}
                                                        style={{ borderRadius: 10, height: 80, width: 55, }} />
                                                    <Text style={{ marginLeft: 20, marginTop: 15, fontWeight: 'bold' }}> DANA</Text>
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                    </CollapseBody>
                                </Collapse>
                                <View style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center', marginTop: 10, }}>
                                    <Text onPress={() => this.setState({ modalperdagangan: false })} style={{ marginTop: 10, justifyContent: 'center', alignContent: 'center', alignItems: 'center', }}>
                                        <View style={style.btnSimpanUn1}>
                                            <Text> Kembali</Text>
                                        </View>
                                    </Text>
                                </View>
                            </ScrollView>
                        </View>

                    </View>
                </Modal>

                <Modal
                    animationType={"slide"}
                    transparent={true}
                    visible={this.state.modalemas}
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
                            <Text style={style.itemText}>Pembayaran</Text>
                            <Image source={qr}></Image>
                            <ScrollView style={{ width: '100%', height: '100%' }}>
                                <Text style={{
                                    color: '#000000',
                                    marginTop: 10,
                                    justifyContent: 'center',
                                    alignContent: 'center',
                                    alignItems: 'center',
                                    textAlign: 'center',
                                    fontSize: 16,
                                    height: 35,
                                    width: '50%',
                                }}>{`Rp. ${this.state.sum}`}</Text>
                                <Collapse>
                                    <CollapseHeader>
                                        <View style={style.coltom}>
                                            <Text style={{ marginLeft: 25, color: '#7e7e7e', fontSize: 14, }}>Pilih Metode Pembayaran</Text>
                                            <Image source={arrow} style={{
                                                padding: 10,
                                                margin: 5,
                                                height: 20,
                                                width: 20,
                                                position: 'absolute',
                                                resizeMode: 'stretch',
                                                alignItems: 'center',
                                                right: 15,
                                                top: -5,
                                            }}></Image>
                                        </View>
                                    </CollapseHeader>
                                    <CollapseBody>
                                        <View>
                                            <TouchableOpacity style={style.itemflat1}>
                                                <View style={{ flexDirection: 'row', marginLeft: 20, }}>
                                                    <Image source={ovo}
                                                        style={{ borderRadius: 10, height: 80, width: 55, }} />
                                                    <Text style={{ marginLeft: 20, marginTop: 15, fontWeight: 'bold' }}> OVO</Text>
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                        <View >
                                            <TouchableOpacity style={style.itemflat1}>
                                                <View style={{ flexDirection: 'row', marginLeft: 20, }}>
                                                    <Image source={ovo}
                                                        style={{ borderRadius: 10, height: 80, width: 55, }} />
                                                    <Text style={{ marginLeft: 20, marginTop: 15, fontWeight: 'bold' }}> ShopeePay</Text>
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                        <View>
                                            <TouchableOpacity style={style.itemflat1}>
                                                <View style={{ flexDirection: 'row', marginLeft: 20, }}>
                                                    <Image source={ovo}
                                                        style={{ borderRadius: 10, height: 80, width: 55, }} />
                                                    <Text style={{ marginLeft: 20, marginTop: 15, fontWeight: 'bold' }}> GO-PAY</Text>
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                        <View>
                                            <TouchableOpacity style={style.itemflat1}>
                                                <View style={{ flexDirection: 'row', marginLeft: 20, }}>
                                                    <Image source={ovo}
                                                        style={{ borderRadius: 10, height: 80, width: 55, }} />
                                                    <Text style={{ marginLeft: 20, marginTop: 15, fontWeight: 'bold' }}> LinkAja</Text>
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                        <View>
                                            <TouchableOpacity style={style.itemflat1}>
                                                <View style={{ flexDirection: 'row', marginLeft: 20, }}>
                                                    <Image source={ovo}
                                                        style={{ borderRadius: 10, height: 80, width: 55, }} />
                                                    <Text style={{ marginLeft: 20, marginTop: 15, fontWeight: 'bold' }}> DANA</Text>
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                    </CollapseBody>
                                </Collapse>
                                <View style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center', marginTop: 10, }}>
                                    <Text onPress={() => this.setState({ modalemas: false })} style={{ marginTop: 10, justifyContent: 'center', alignContent: 'center', alignItems: 'center', }}>
                                        <View style={style.btnSimpanUn1}>
                                            <Text> Kembali</Text>
                                        </View>
                                    </Text>
                                </View>
                            </ScrollView>
                        </View>

                    </View>

                </Modal>
            </SafeAreaView> */}
            </ScrollView>
        )
    }
}

export default index
const style = StyleSheet.create({
    contentContainer: {
        flex: 1,
        backgroundColor: '#fff'
    },
    title: {
        marginRight: 20,
        marginLeft: 20,
        marginTop: 15,
        marginBottom: 15,
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
    },
    Textinputcss: {
        marginLeft: 10,
        marginRight: 10,
        borderRadius: 10,
        borderWidth: 1,
        fontSize: 12,
        height: 52,
        borderColor: '#C0C0C0',
        fontWeight: 'bold',
    },
    Label1: {
        marginTop: 5,
        marginLeft: 10,
        padding: 5,
        color: '#000',
        alignItems: 'center',
        justifyContent: 'center'
    },
    Labelsumber: {
        marginLeft: 10,
        padding: 5,
        color: '#000',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 'bold',
        color: 'blue'
    },
    kotak1: {
        color: '#000000',
        marginTop: 10,
        marginLeft: 30,
        marginRight: 10,
        borderRadius: 2,
        borderWidth: 0.1,
        fontSize: 26,
        height: 52,
        width: '70%',
        borderColor: '#C0C0C0',
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
        width: '70%',
        backgroundColor: '#f2f2f2',
    },
    kotak3: {
        color: '#000000',
        marginTop: 10,
        marginLeft: 30,
        marginRight: 10,
        borderRadius: 2,
        borderWidth: 0.1,
        fontSize: 12,
        height: 40,
        width: 100,
        backgroundColor: '#f2f2f2',
        justifyContent: 'center',
        backgroundColor: '#fff',
        textAlign: 'center',
    },
    Label2: {
        marginTop: 5,
        marginLeft: 25,
        padding: 5,
        width: '100%',
        color: '#000',
        alignItems: 'center',
        justifyContent: 'center'
    },
    btnSimpanDark: {
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
    ModalCont: {
        flex: 1,
    },
    ModalCont2: {
        flex: 1,
        // alignItems: 'center',
        backgroundColor: '#00000079',
    },
    itemflat1: {
        fontSize: 16,
        flexDirection: 'column',
        backgroundColor: '#fff',
        padding: 15,
        height: 75,
        shadowColor: "#333",
        shadowOffset: {
            width: 1,
            height: 1,
        },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        borderColor: '#7e7e7e',
        elevation: 1,
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
})



// https://www.detik.com/ramadan/kalkulator-zakat/simpanan#:~:text=Zakat%20simpanan%20adalah%20zakat%20yang,yaitu%20senilai%2085%20gram%20emas.
// https://baznas.go.id/zakatsaham