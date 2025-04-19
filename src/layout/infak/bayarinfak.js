import {
    Text, View, ScrollView, SafeAreaView, StyleSheet,
    Image, TouchableOpacity, ImageBackground, Linking, Modal, TextInput
} from 'react-native'
import { Picker } from '@react-native-picker/picker';
import React, { Component } from 'react'
import { Infak, } from '../../assets/icons'

import { qr, read1, arrow, BB, rapot, ovo } from '../../assets/images'
import { Collapse, CollapseHeader, CollapseBody, AccordionList } from 'accordion-collapse-react-native';
export class bayarinfak extends Component {
    constructor(props) {
        super(props)
        this.state = {
            img1: null,
            img2: 0,
            vid: null,
            vid1: 0,
            text: '',
            pesan: '',
            rate: 1,
            volume: 1,
            muted: false,
            resizeMode: 'contain',
            duration: 0.0,
            currentTime: 0.0,
            paused: true,
            modaldetail: false,
            firstValue: '',
            nominal: '',
        }
    }
    WA = () => {
        let url =
            'https://api.whatsapp.com/send?text=Berbagi%20Infak%0a%0aInfak%20adalah%20mengeluarkan%20harta%20yang%20Pokok.%20mencakup%20zakat%20(hukumnya%20wajib)dan%20non-zakat%20(hukumny...%0a%0ainformasi%20selengkapnya%20klik%20https://berbagibahagia.org/program/Infak'
        Linking.openURL(url)
            .then(data => {
                console.log("Opened successfully " + data);
            })
    };
    facebook = () => {
        let url =
            'https://www.facebook.com/sharer/sharer.php?u=https://berbagibahagia.org/program/Infak'
        Linking.openURL(url)
            .then(data => {
                console.log("Opened successfully " + data);
            })
    };
    getCurrentTimePercentage() {
        if (this.state.currentTime > 0) {
            return parseFloat(this.state.currentTime) / parseFloat(this.state.duration);
        }
        return 0;
    };
    render() {
        const { firstValue, secondValue, thirdValue, fourValue } = this.state;
        const flexCompleted = this.getCurrentTimePercentage() * 100;
        const flexRemaining = (1 - this.getCurrentTimePercentage()) * 100;
        return (
            <ScrollView style={style.contentContainer}>
                <View style={{ backgroundColor: '#00A9B8', width: '100%', height: 240, borderBottomLeftRadius: 28, borderBottomRightRadius: 28 }}>
                </View>
                <View style={{ marginLeft: 20, backgroundColor: '#fff', width: '90%', height: '90%', top: -150, borderRadius: 15 }}>
                    <View style={{ flexDirection: 'row', marginTop: 20, marginLeft: 30 }}>
                        <Infak />
                        <Text style={{ marginTop: 5, fontSize: 20, marginLeft: 10 }}>Infak</Text>
                    </View>
                    <View style={{ width: '100%', height: 1, backgroundColor: '#EBEAEA', marginTop: 20 }} />
                    <View>
                        <Text style={style.Label2}>Nominal Infak</Text>
                        <TextInput
                            style={style.kotak3}
                            onChangeText={nominal => this.setState({ nominal })}
                            value={this.state.nominal}
                            keyboardType='numeric'
                            placeholder="Masukan Nominal"
                            placeholderTextColor='#7e7e7e'
                        />
                        <View style={{ flexDirection: 'row', margin: 10, justifyContent: 'space-around' }}>
                            <TouchableOpacity style={style.kotakbaru3}>
                                <Text style={{ textAlign: 'center', }}>Rp.10.000</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={style.kotakbaru3}>
                                <Text style={{ textAlign: 'center', }}>Rp.20.000</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ flexDirection: 'row', margin: 10, justifyContent: 'space-around' }}>
                            <TouchableOpacity style={style.kotakbaru3}>
                                <Text style={{ textAlign: 'center', }}>Rp.30.000</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={style.kotakbaru3}>
                                <Text style={{ textAlign: 'center', }}>Rp.40.000</Text>
                            </TouchableOpacity>
                        </View>
                        <TextInput
                            style={style.kolompesan}
                            onChangeText={pesan => this.setState({ pesan })}
                            value={this.state.pesan}
                            keyboardType='default'
                            placeholder="Masukan Pesan"
                            multiline={true}
                            numberOfLines={5}
                            placeholderTextColor='#7e7e7e'
                        />
                    </View>
                    <View style={{ width: '100%', height: 1, backgroundColor: '#EBEAEA', marginTop: 20 }} />
                    <Text style={{ marginTop: 20, marginLeft: 10 }} >Metode Pembayaran</Text>
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
                    <View style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center', alignSelf: 'center', marginTop: 20, width: '90%' }}>
                        <TouchableOpacity style={style.btnSimpanbaru} onPress={() => this.props.navigation.navigate('')}>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ color: '#fff' }}>Lanjut Pembayaran</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* <View style={{ backgroundColor: '#0EBEDF' }}>
                    <Text style={style.title}>Infak</Text>
                </View>
                <View style={style.coltom2}>
                    <View style={{
                        justifyContent: 'center',
                        alignContent: 'center',
                        alignItems: 'center',
                    }}>
                        <Image source={BB} style={{ height: 110, width: 235, marginBottom: 10, }}></Image>
                    </View>
                    <View>
                        <View>
                            <Text style={{ marginLeft: 10 }}>Berbagi Infak</Text>
                        </View>

                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 10 }}>
                        <Text mar>Terkumpul Rp.</Text>
                        <Text>Goals</Text>

                    </View>
                    <View style={style.controls}>
                        <View style={style.generalControls}>
                            <View style={style.trackingControls}>
                                <View style={style.progress}>
                                    <View style={[style.innerProgressCompleted, { flex: flexCompleted }]} />
                                    <View style={[style.innerProgressRemaining, { flex: flexRemaining }]} />
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignContent: 'center', alignItems: 'center' }}>
                        <TouchableOpacity style={{ marginTop: 20, marginRight: 10 }} onPress={() => { this.setState({ modaldetail: true }) }}>
                            <Text style={style.btnSimpanDark}>Inffak Sekarang</Text>
                        </TouchableOpacity>

                    </View>
                </View>

                <View>
                    <Collapse>
                        <CollapseHeader>
                            <View style={style.coltom}>
                                <Text style={{ marginLeft: 25, color: '#7e7e7e', fontSize: 14, }}>Deskripsi</Text>
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
                            <View style={style.coltom1}>
                                <Text > Infak adalah mengeluarkan harta yang Pokok. mencakup zakat (hukumnya wajib) dan non-zakat (hukumnya sunnah). Infak wajib di antaranya zakat, kafarat, nazar, dan lain-lain. Infak sunnah di antaranya, infak kepada Fakir miskin sesama muslim, infak bencana alam, infak kemanusiaan, dan lain-lain. Terkait dengan infak ini Rasulullah SAW bersabda:

                                    "Ada malaikat yang senantiasa berdoa setiap pagi dan sore: "Ya Allah SWT berilah orang yang berinfak, gantinya dan berkata yang lain : "Ya Allah jadikanlah orang yang menahan infak, kehancuran". - Hadits Riwayat Bukhari dan Muslim
                                    {"\n"}

                                    (wikipedia.com)
                                </Text>
                            </View>
                        </CollapseBody>
                    </Collapse>

                    <Collapse>
                        <CollapseHeader>
                            <View style={style.coltom}>
                                <Text style={{ marginLeft: 25, color: '#7e7e7e', fontSize: 14, }}>Update terbaru</Text>
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
                            <View style={style.coltom1}>
                                <Text> test</Text>
                            </View>
                        </CollapseBody>
                    </Collapse>

                    <Collapse>
                        <CollapseHeader>
                            <View style={style.coltom}>
                                <Text style={{ marginLeft: 25, color: '#7e7e7e', fontSize: 14, }}>pilih</Text>
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
                            <View style={style.coltom1}>
                                <Text> test</Text>
                            </View>
                        </CollapseBody>
                    </Collapse>

                    <Collapse>
                        <CollapseHeader>
                            <View style={style.coltom}>
                                <Text style={{ marginLeft: 25, color: '#7e7e7e', fontSize: 14, }}>Foundasier</Text>
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
                            <View style={style.coltom1}>
                                <Text> test</Text>
                            </View>
                        </CollapseBody>
                    </Collapse>

                </View>

                <View style={{
                    flexDirection: 'row',
                    width: '90%',
                    height: 100,
                    borderRadius: 10,
                    borderWidth: 1,
                    marginLeft: 20,
                    marginTop: 10,
                    borderColor: '#E9E9E9',
                    justifyContent: 'center', alignItems: 'center',
                    alignContent: 'center',
                    textAlign: 'center',
                    backgroundColor: '#00BFFF',
                }}>
                    <View style={{ flexDirection: 'column' }}>
                        <Text style={{ textAlign: 'center', marginBottom: 10, }}>
                            ayo sebarkan kebaikan dengan share
                        </Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                            <TouchableOpacity onPress={(this.facebook)}>
                                <Text style={style.btnSimpanUn}> Facebook</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={(this.WA)}>
                                <Text style={style.btnSimpanUn}> WhatsApp</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <ImageBackground source={read1} style={{
                        marginLeft: 20,
                        marginTop: -10,
                        width: 80,
                        height: 100,
                    }}></ImageBackground>
                </View>

                <View style={{
                    flexDirection: 'row',
                    width: '90%',
                    height: 100,
                    borderRadius: 10,
                    borderWidth: 1,
                    marginLeft: 20,
                    marginTop: 10,
                    borderColor: '#E9E9E9',
                    justifyContent: 'center', alignItems: 'center',
                    alignContent: 'center',
                    textAlign: 'center',
                    backgroundColor: '#FFD700',
                }}>
                    <View style={{ flexDirection: 'column' }}>
                        <Text style={{ textAlign: 'center', marginBottom: 10, }}>
                            ayo jadi salah satu bagian {"\n"}Foundasier
                        </Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('tambahfou')}>
                                <Text style={style.btnSimpanUn}> Jadi Foundasier</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <ImageBackground source={read1} style={{
                        marginLeft: 20,
                        marginTop: -10,
                        width: 80,
                        height: 100,
                    }}></ImageBackground>
                </View> */}

                {/* <Modal
                    animationType={"slide"}
                    transparent={true}
                    visible={this.state.modaldetail}>
                    <View style={{
                        paddingTop: 5,
                        backgroundColor: '#ffffff',
                        borderTopLeftRadius: 10,
                        borderTopRightRadius: 10,
                        height: '93%',
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
                        <ScrollView style={{ height: '100%', width: '100%', backgroundColor: '#f2f2f2', }}>
                            <View>
                                <View style={{ flexDirection: 'row', backgroundColor: 'white', borderRadius: 5, }}>
                                    <Image source={BB} style={{ width: 170, height: 80, marginLeft: 20, marginBottom: 10, }}></Image>
                                    <View style={{ flexDirection: 'column' }}>
                                        <Text>Anda akan berbagi untuk :</Text>
                                        <Text>Berbgai Infak</Text>
                                    </View>
                                </View>

                                <View style={{ height: '100%', width: '100%', backgroundColor: 'white', borderRadius: 5, marginTop: 5 }}>
                                    <View style={{ marginBottom: 10, marginLeft: 10, }}>
                                        <Text> Tata cara Pembayaran</Text>
                                        <Text>
                                            0.masukan nominal yang diinfakan
                                            {"\n"}
                                            1. ketika memilih metode pembayaran akan mendownload QR code dan anda akan dialikan ke aplikasi pembayaran
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
                                    <Text style={{ marginLeft: 25, }}> Masukan Nominal</Text>
                                    <TextInput style={style.Textinputcss}
                                         value={'Rp. ' + firstValue.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                                        keyboardType="numeric"
                                        onChangeText={(text) => this.setState({ firstValue : text.replace(/\D/g, "")})}
                                        placeholder="Rp.0"
                                        placeholderTextColor='#7e7e7e'
                                    />
                                    <View style={{ marginTop: 20, marginTop: 20, }}>
                                        <Text style={{ marginLeft: 25, }}>Pesan</Text>
                                        <TextInput style={style.kolompesan} placeholder="Isi Pesan"
                                            placeholderTextColor='#A9A9A9'
                                            onChangeText={(pes) => this.setState({ pesan: pes })}
                                            multiline={true}
                                            numberOfLines={5}
                                            returnKeyType='next'
                                        ></TextInput>
                                    </View>
                                    <Collapse style={{marginTop:20,}}>
                                        <CollapseHeader>
                                            <View style={style.coltom}>
                                                <Text style={{ marginLeft: 25, color: '#7e7e7e', fontSize: 14, }}>pilih pembayaran</Text>
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
                                            <View>
                                                <Text onPress={() => { Linking.openURL('https://link.dana.id', this.setState({ modalpropesi: false })) }} style={style.itemflat1}>
                                                    <View style={{ flexDirection: 'row', marginLeft: 20, }}>
                                                        <Image source={ovo}
                                                            style={{ borderRadius: 10, height: 80, width: 55, marginLeft: 20, }} />
                                                        <Text style={{ marginLeft: 20, marginTop: 15, fontWeight: 'bold' }}> OVO</Text>
                                                    </View>
                                                </Text>
                                            </View>
                                        </CollapseBody>
                                    </Collapse>
                                    {/* <View style={{}}>
                                            <TouchableOpacity onPress={() => this.setState({ pilihpembayaran: true })} style={{ marginTop: 20, marginRight: 10 }}>
                    <Text style={style.btnSimpanDark}>Bayar</Text>
                </TouchableOpacity>

                                        </View> */}
                {/* <TouchableOpacity style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center',marginTop:60,}} onPress={() => this.setState({ modaldetail: false })}>
                                        <Text style={style.btnSimpanUn1}>Kembali</Text>
                                    </TouchableOpacity>
                                </View>

                            </View>

                        </ScrollView>
                    </View> */}

                {/* </Modal> */}

            </ScrollView>
        )
    }
}

export default bayarinfak

const style = StyleSheet.create({
    contentContainer: {
        flex: 1,
    },
    title: {
        marginLeft: 20,
        marginTop: 15,
        marginBottom: 15,
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
    },
    btnSimpanDark: {
        width: '100%',
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
        width: '100%',
        fontWeight: 'bold',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 10,
        justifyContent: 'center', alignItems: 'center',
        alignContent: 'center',
        textAlign: 'center',
        fontWeight: 'bold',
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
        width: '90%',
        marginLeft: 20,
        fontSize: 16,
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
        textAlign: 'justify',
        justifyContent: 'center',
    },
    coltom2: {
        fontSize: 16,
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: '#fff',
        marginVertical: 8,
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
    controls: {
        backgroundColor: 'transparent',
        borderRadius: 5,
        position: 'absolute',
        bottom: 50,
        left: 10,
        right: 10,
    },
    generalControls: {
        flex: 1,
        flexDirection: 'row',
        borderRadius: 4,
        overflow: 'hidden',
        paddingBottom: 10,
    },
    trackingControls: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    progress: {
        flex: 1,
        flexDirection: 'row',
        borderRadius: 3,
        overflow: 'hidden',
    },
    innerProgressCompleted: {
        height: 10,
        backgroundColor: '#B22222',
    },
    innerProgressRemaining: {
        height: 10,
        backgroundColor: '#f2f2f2',
    },
    ModalCont2: {
        widh: '100%',
        height: '100%',
        backgroundColor: '#00000079',
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
    countContainer: {
        color: '#000000',
        alignItems: "center",
        flexDirection: 'row',
        padding: 5,
        justifyContent: 'center'
    },
    btnSimpanDark1: {
        width: '10%',
        fontWeight: 'bold',
        backgroundColor: '#0EBEDF',
        borderRadius: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: '#E9E9E9',
        textAlign: 'center',
        justifyContent: 'center', alignItems: 'center'
    },
    Textinputcss: {
        color: '#7e7e7e',
        width: '30%',
        marginLeft: 30,
        marginRight: 10,
        borderRadius: 10,
        fontSize: 12,
        height: 40,
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
    },
    kolompesan: {
        color: '#c7c7c7',
        marginLeft: 20,
        fontSize: 12,
        textAlign: 'justify',
        height: 120,
        width: '90%',
        marginHorizontal: 15,
        borderWidth: 0.2,
        borderRadius: 5,
        marginTop: 10,
    },
    kotakbaru: {
        shadowColor: "#333",
        shadowOffset: {
            width: 1,
            height: 1,
        },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        elevation: 3,
        borderWidth: 1,
        borderColor: '#E9E9E9',
        marginLeft: 20,
        backgroundColor: '#fff', width: '90%', height: '90%', top: -150, borderRadius: 15
    },
    kotak3: {
        color: '#000000',
        marginTop: 10,
        marginLeft: 20,
        marginRight: 10,
        borderRadius: 2,
        borderWidth: 0.1,
        fontSize: 12,
        height: 40,
        width: '90%',
        backgroundColor: '#F0F8FF',
    },
    pesan: {
        color: '#000000',
        marginTop: 10,
        marginLeft: 20,
        marginRight: 10,
        borderRadius: 2,
        borderWidth: 0.1,
        fontSize: 12,
        height: 40,
        width: '90%',
        backgroundColor: '#F0F8FF',
    },
    Label2: {
        marginTop: 10,
        marginLeft: 25,
        color: '#000',
    },
    kotakbaru3: {
        shadowColor: "#333",
        shadowOffset: {
            width: 1,
            height: 1,
        },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        elevation: 3,
        width: 120,
        height: 50,
        borderRadius: 5,
        borderWidth: 1,
        marginLeft: 10,
        marginTop: 10,
        borderColor: '#E9E9E9',
        justifyContent: 'center',
        backgroundColor: '#fff'
    },
    btnSimpanbaru: {
        width: '80%',
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
})