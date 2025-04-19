import { Text, View, TouchableOpacity, Image, StyleSheet, Modal, SafeAreaView } from 'react-native'
import React, { Component } from 'react'
import {
    Vector, Doc,
    arrowright, back, kunci
} from '../../assets/images'
import { ScrollView } from 'react-native-gesture-handler'
import { Whatapps, SMS } from '../../assets/icons';

export class bantuan extends Component {
    constructor(props) {
        super(props)
        this.state = {
            pesan: false,

        }
    }
    render() {
        return (
            <ScrollView>
                <View style={{ marginBottom: 20, marginTop: 10, }}>
                    <Text style={{ textAlign: 'center', fontSize: 18, marginTop: 20, fontWeight: 'bold' }}>Bantuan</Text>
                </View>

                <TouchableOpacity onPress={() => this.props.navigation.replace('Doc')}>
                    <View style={{ flexDirection: 'row', marginLeft: 20, marginTop: 10 }}>
                        <Image source={Doc}></Image>
                        <Text style={style.labelbaru}>Dokumentasi Pengguna</Text>
                    </View>
                    <Image source={arrowright} style={{
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
                </TouchableOpacity>

                <TouchableOpacity onPress={() => { this.setState({ pesan: true }) }}>
                    <View style={{ flexDirection: 'row', marginLeft: 20, marginTop: 10 }}>
                        <Image source={kunci}></Image>
                        <Text style={style.labelbaru}>Kirim Pesan</Text>
                    </View>
                    <Image source={arrowright} style={{
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
                </TouchableOpacity>

                <Modal
                    animationType={"slide"}
                    transparent={true}
                    visible={this.state.pesan}
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
                                height: 220,
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
                                    <Text >Hubungi Via</Text>
                                    <View style={{ flexDirection: 'row', marginTop: 15, }}>

                                        <View style={{ flexDirection: 'column' }}>
                                            <Whatapps />
                                            <Text>Whatapps</Text>
                                        </View>

                                        <View style={{ flexDirection: 'column', marginLeft: 20, marginTop: -5 }}>
                                            <SMS />
                                            <Text style={{ marginLeft: 25 }}>SMS</Text>
                                        </View>

                                    </View>

                                </View>
                                <View style={{
                                    flexDirection: 'row', justifyContent: 'space-around',
                                    alignContent: 'space-around', alignItems: 'center', marginTop: 15,
                                }}>
                                    <TouchableOpacity onPress={() => { this.setState({ pesan: false }) }} style={style.btnBatalbaru}>
                                        <Text>Batal</Text>
                                    </TouchableOpacity>

                                </View>
                            </View>
                        </View>
                    </SafeAreaView>
                </Modal>

            </ScrollView>


        )
    }
}

export default bantuan
const style = StyleSheet.create({
    labelbaru: {
        fontSize: 16,
        marginLeft: 10,
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
        backgroundColor: '#00000099',
        paddingHorizontal: 10,
    },
})