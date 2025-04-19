import { SafeAreaView, Text, View, StyleSheet, Image, TouchableOpacity, Modal, TextInput } from 'react-native'
import React, { Component } from 'react'
import { Rekening } from '../../assets/icons';
import { back } from '../../assets/images';
import CheckBox from 'react-native-check-box';

export class rek extends Component {
    constructor(props) {
        super(props)
        this.state = {
            rek: false,
            atnama: false,

        }
    }
    render() {
        return (
            <SafeAreaView>
                <Image source={back} style={{ marginLeft: 20, marginTop: 20 }}></Image>

                <View>
                    <Text style={style.labelbaru}>Rekening</Text>
                </View>
                <View style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center', alignSelf: 'center', marginTop: 50 }}>
                    <View style={{ flexDirection: 'column', marginTop: 30, }}>
                        <View style={style.iconbesar}>
                            <Rekening />
                        </View>
                        <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'center', }}>Anda belum mendaftarkan rekening</Text>
                        <Text style={{ fontSize: 12, textAlign: 'center', }}>Coba Tambah Rekening dahulu untuk melihat</Text>
                        <Text style={{ fontSize: 12, textAlign: 'center', }}>daftar rekening</Text>
                    </View>


                    <View style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center', alignSelf: 'center', marginTop: 20 }}>
                        <TouchableOpacity style={style.btnSimpanbaru} onPress={() => { this.setState({ rek: true }) }}>
                            <View style={{ flexDirection: 'row' }}>

                                <Text style={{ color: '#fff' }}>Tambah Rekening</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={style.kotakrek}>
                    <Text style={style.labelnorek}>XXXX-XXXX-XXXX-XXXX</Text>
                    <Text style={style.labelvisa}>VISA</Text>
                </View>

                <Modal
                    animationType={"slide"}
                    transparent={true}
                    visible={this.state.rek}
                    style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                    <SafeAreaView style={{
                        backgroundColor: '#ffffff',
                        alignItems: 'center',
                        justifyContent: 'center',
                        alignContent: 'center',
                    }}>
                        <View style={style.ModalCont}>
                            <View style={{
                                paddingTop: 5,
                                marginHorizontal: 10,
                                marginTop: 500,
                                backgroundColor: '#ffffff',
                                // flexDirection: 'row',
                                borderRadius: 20,
                                height: 170,
                                width: 300,
                                shadowColor: "#333",
                                shadowOffset: {
                                    width: 1,
                                    height: 1,
                                },
                                shadowOpacity: 0.3,
                                shadowRadius: 2,
                                elevation: 3,
                                alignItems: 'center',

                            }}>
                                <View style={{ justifyContent: 'center', alignItems: 'center', textAlign: 'center', }}>
                                    <Text>Tambah Rekening</Text>
                                    <View style={{ flexDirection: 'row' }}>
                                        <TextInput
                                            style={style.kotak3}
                                            onChangeText={atnama => this.setState({ atnama })}
                                            value={this.state.atnama}
                                            keyboardType='default'
                                            placeholder="Atas Nama"
                                            placeholderTextColor='#7e7e7e'
                                        />
                                    </View>




                                </View>
                                <View style={{
                                    flexDirection: 'row', justifyContent: 'space-around',
                                    alignContent: 'space-around', alignItems: 'center', marginTop: 15,
                                }}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignContent: 'space-around', alignItems: 'center', marginTop: 15, }}>

                                        <TouchableOpacity onPress={() => { this.setState({ rek: false }) }} style={style.btnBatalbaru}>
                                            <Text>Batal</Text>

                                        </TouchableOpacity>

                                        <TouchableOpacity style={style.btnSimpanbaru}>
                                            <Text>Simpan</Text>
                                        </TouchableOpacity>

                                    </View>
                                </View>
                            </View>
                        </View>
                    </SafeAreaView>
                </Modal>
            </SafeAreaView>
        )
    }
}

export default rek
const style = StyleSheet.create({
    labelbaru: {
        fontSize: 16,
        marginLeft: 10,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    btnBatalbaru: {
        width: '30%',
        fontWeight: 'bold',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 10,
        marginRight: 10,
        borderWidth: 1,
        borderColor: '#00A9B8',
        justifyContent: 'center', alignItems: 'center',
        textAlign: 'center',
        color: '#00A9B8'
    },
    ModalCont: {
        flex: 1,
        justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: '#00000099',
        paddingHorizontal: 10,
    },
    btnSimpanbaru: {
        width: '40%',
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
    iconbesar: {
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
    },
    kotak3: {
        color: '#000000',
        margin: 10,
        borderRadius: 2,
        borderWidth: 0.1,
        fontSize: 12,
        height: 40,
        width: 250,
        backgroundColor: '#F0F8FF',
    },
    kotak2: {
        color: '#000000',
        margin: 10,
        borderRadius: 2,
        borderWidth: 0.1,
        fontSize: 12,
        height: 40,
        width: 115,
        backgroundColor: '#F0F8FF',
    },
    kotakrek: {
        backgroundColor: '#00A9B8',
        width: '70%',
        height: 150,
        borderRadius: 10,
        marginLeft: 60,
        marginTop: 50,
    },
    labelnorek: {
        justifyContent: 'center',
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#fff',
        marginTop: 25,
    },
    labelvisa: {
        justifyContent: 'flex-end',
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'right',
        marginRight: 20,
        fontSize: 20,
        top: 70
    },
})