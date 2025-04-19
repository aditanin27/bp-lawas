import { Text, View, StyleSheet, Dimensions, Image, Touchable, ScrollView,Modal} from 'react-native'
import React, { Component } from 'react'
import { qurban } from '../../assets/images'
import { TouchableOpacity } from 'react-native-gesture-handler'

class Qurban extends Component {
    constructor(props) {
        super(props)
        this.state = {
            modalpembayaran: false,
            count: '',
            harga: 2750000,
            text: '',
            orang: [],

        }
    }
    render() {
        const inputbutton = [];
        const { count } = this.state;
        const harga = 2750000;
        for (let i = 0; i < this.state.count; i++) {
            inputbutton.push(
                <><View key={i}>
                    <View style={{ height: 7, backgroundColor: '#696969', marginTop: 10 }} />
                    <Text>{i + 1}.</Text>
                    <Text style={style.Label}>Nama</Text>
                    <TextInput
                        style={style.kotak2}
                        onChangeText={text => this.setState({ text })}
                        value={this.state.orang[i]}
                        placeholder="Nama"
                    />
                </View></>
            );
        }
        return (
            <ScrollView>
                <View>
                    <View style={{ backgroundColor: '#0EBEDF' }}>
                        <Text style={style.title}>Qurban</Text>
                    </View>
                    <TouchableOpacity style={style.itemflat} onPress={() => {
                        this.props.navigation.navigate('Sedekah')
                    }}>
                        <View style={{ flexDirection: 'column', marginLeft: 10 }}>
                            <Image source={qurban} style={{ width: '100%', height: 170 }}></Image>
                            <Text style={{ textAlign: 'center' }}>Sedekah Daging</Text>
                            <Text style={{ textAlign: 'center' }}>Berbagi Bahagia</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={style.itemflat} onPress={() => {
                        this.props.navigation.navigate('SapiRetail')
                    }}>
                        <View style={{ flexDirection: 'column', marginLeft: 10 }}>
                            <Image source={qurban} style={{ width: '100%', height: 170 }}></Image>
                            <Text style={{ textAlign: 'center' }}>Quban Sapi Retail</Text>
                            <Text style={{ textAlign: 'center' }}>Berbagi Bahagia</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={style.itemflat} onPress={() => {
                        this.props.navigation.navigate('Sapi')
                    }}>
                        <View style={{ flexDirection: 'column', marginLeft: 10 }}>
                            <Image source={qurban} style={{ width: '100%', height: 170 }}></Image>
                            <Text style={{ textAlign: 'center' }}>Quban Sapi</Text>
                            <Text style={{ textAlign: 'center' }}>Berbagi Bahagia</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={style.itemflat} onPress={() => {
                        this.props.navigation.navigate('Kambing')
                    }}>
                        <View style={{ flexDirection: 'column', marginLeft: 10 }}>
                            <Image source={qurban} style={{ width: '100%', height: 170 }}></Image>
                            <Text style={{ textAlign: 'center' }}>Quban Kambing</Text>
                            <Text style={{ textAlign: 'center' }}>Berbagi Bahagia</Text>
                        </View>
                    </TouchableOpacity>
                </View >
                <Modal
                    animationType={"slide"}
                    transparent={true}
                    visible={this.state.modalpembayaran}
                    style={{
                        alignItems: 'center',
                        justifyContent: 'center',

                    }}>
                    <View style={{ height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center', alignContent: 'center', backgroundColor: '#f2f2f2', }}>
                        <View style={{ flexDirection: 'row', backgroundColor: 'white', borderRadius: 5, }}>
                            <Image source={qurban} style={{ width: 200, height: 100 }}></Image>
                            <View style={{ flexDirection: 'column' }}>
                                <Text>Anda akan berbagi untuk :</Text>
                                <Text>Qurban Kambing</Text>
                            </View>
                        </View>

                        <View style={{ height: '80%', width: '100%', backgroundColor: 'white', borderRadius: 5, marginTop: 5 }}>
                            <View style={{ flexDirection: 'column' }}>
                                <View>
                                    <View style={style.countContainer}>
                                        <TouchableOpacity
                                            style={style.btnSimpanDark1}
                                            onPress={() => {
                                                if (this.state.count > 0) {
                                                    this.setState({ count: this.state.count - 1 })
                                                } else {
                                                    alert('tidak bisa kurang dari 1');
                                                }
                                            }}>
                                            <Text style={{}}>-</Text>
                                        </TouchableOpacity>

                                        <TouchableOpacity
                                            style={style.btnSimpanDark1}
                                            onPress={() => {
                                                this.setState({ count: this.state.count + 1 })
                                                // if (this.state.count < 100) {
                                                //   this.setState({ count: this.state.count + 1 })
                                                // } else {
                                                //   alert('tidak bisa lebih dari 100');
                                                // }
                                            }}>
                                            <Text>+</Text>
                                        </TouchableOpacity>

                                    </View>

                                </View>
                                <Text>Total</Text>
                                <Text>{count}</Text>
                                {inputbutton}
                            </View>

                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignContent: 'center' }}>
                                <TouchableOpacity style={{ marginTop: 20, marginRight: 10 }} onPress={() => this.setState({ modalpembayaran: false })}>
                                    <Text style={style.btnSimpanUn1}>Kembali</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ marginTop: 20, marginRight: 10 }}>
                                    <Text style={style.btnSimpanDark}>Bayar</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
            </ScrollView>
        )
    }
}

export default Qurban
const style = StyleSheet.create({
    wrap: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height * 0.25 // 25% window
    },
    wrapDot: {
        position: 'absolute',
        bottom: 0,
        flexDirection: 'row',
        alignSelf: 'center'
    },
    dot: {
        margin: 3,
        color: '#888'
    },
    dotActive: {
        margin: 3,
        color: 'black'
    },
    contentContainer: {
        flex: 1,
        backgroundColor: '#fff',
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
    itemflat: {
        flex: 1,
        fontSize: 12,
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
    Label: {
        color: '#fff',
        fontSize: 18,
        position: 'absolute',
        top: 55, left: 10, right: 0, bottom: 0,
    },
    Labeltgl: {
        marginTop: 5,
        position: 'absolute',
        top: 0, left: 10, right: 0, bottom: 0,
        height: 25, width: 25,
    },
    ModalCont2: {
        flex: 1,
        backgroundColor: '#00000079',
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
    },
    itemText: {
        textAlign: 'justify',
        marginLeft: 10,
        fontSize: 12,
        width: '35%',
        height: 43,
    },
    baca: {
        justifyContent: 'flex-end',
        marginLeft: 100,
        marginTop: 5,
        textAlign: 'center',
        height: 25,
        width: 50,
    },


})