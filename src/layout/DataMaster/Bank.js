import {
    Text, View, Modal, TouchableOpacity, StyleSheet, SafeAreaView, FlatList,
    RefreshControl, TextInput, ToastAndroid
} from 'react-native'
import React, { Component } from 'react'
import { Close, IconCari, FilterdanText } from '../../assets/icons';
export class Bank extends Component {
    constructor(props) {
        super(props)
        this.state = {
            modalpilih: false,
            modaledit: false,
            modaltambah: false,
            refreshing: true,
            bank: [],
            debank: [],
            namabaru: '',
            baru: '',
            filter: [],

        }
    }
    GetBankAPi() {
        fetch('https://kilauindonesia.org/datakilau/api/getbankpen')
            .then(res => {
                if (res.status === 200) return res.json();
            })
            .then(resdata => {
                console.log(resdata.data);
                this.setState({
                    bank: resdata.data,
                    refreshing: false,
                    filter: resdata.data

                });
            });
    }
    Hapusbank() {
        {
            fetch('https://kilauindonesia.org/datakilau/api/penbankhps/' + this.state.debank.id_bank, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'multipart/form-data'
                },
            })
                .then((res) => res.json())
                .then((resJson) => {
                    console.log(resJson);
                    if (resJson.status === 'sukses') {

                        ToastAndroid.show("Data berhasil dihapus!", ToastAndroid.SHORT)
                    } else {
                        alert(`Data gagal disimpan !!!`);
                    }
                })
                .catch((err) => console.log('dari catch send Data ===', err));
        };
    }

    sendData() {
        {
            let simpandata = {
                nama_bank: this.state.baru,
            }
            let data = new FormData();
            for (let key in simpandata) {
                data.append(key, simpandata[key]);
            }
            fetch('https://kilauindonesia.org/datakilau/api/pentambank', {
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

                        ToastAndroid.show("Data berhasil ditambah!", ToastAndroid.SHORT)
                    } else {
                        alert(`Data gagal disimpan !!!`);
                    }
                })
                .catch((err) => console.log('dari catch send Data ===', err));
        }

    }
    editData() {
        {
            let simpandata = {
                nama_bank: this.state.namabaru,
            }
            let data = new FormData();
            for (let key in simpandata) {
                data.append(key, simpandata[key]);
            }
            fetch('https://kilauindonesia.org/datakilau/api/penbankupd/' + this.state.debank.id_bank, {
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

                        ToastAndroid.show("Data berhasil diperbaharui!", ToastAndroid.SHORT)
                    } else {
                        alert(`Data gagal disimpan !!!`);
                    }
                })
                .catch((err) => console.log('dari catch send Data ===', err));
        }

    }
    filterList(textToSearch) {
        this.setState({
            filter: this.state.bank
                .filter(item => item.nama_bank.toLowerCase(textToSearch).includes(textToSearch)
                )
        })
    }
    componentDidMount() {
        this.GetBankAPi();
        console.log(this.state.debank);
    }
    onRefresh() {
        this.GetBankAPi();
        this.setState({ refreshing: false });
    }
    render() {
        const debank = this.state.debank
        return (
            <View style={{ backgroundColor: '#fff', flex: 1 }}>
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
                                this.filterList(text.toLowerCase()), this.setState({ caribarang: text })
                            }}
                            value={this.state.text}
                            placeholder="Cari Nama Bank "
                            placeholderTextColor="#C0C0C0"
                            underlineColorAndroid="transparent"
                        />
                        <IconCari style={style.IconCari} name="your-icon" size={20} />
                        <View style={{ padding: 7, width: 90, marginLeft: 10, borderRadius: 5 }}>
                            <TouchableOpacity
                                onPress={() => {
                                    this.setState({ fil: true });
                                }}>
                                <FilterdanText />
                            </TouchableOpacity>
                        </View>

                    </View>
                </View>
                <View>
                    <FlatList
                        refreshControl={
                            <RefreshControl
                                refreshing={this.state.refreshing}
                                onRefresh={() => this.onRefresh()}
                            />
                        }
                        data={this.state.filter}
                        renderItem={({ item, index }) => (
                            <TouchableOpacity style={style.itemflat} onPress={() => this.setState({ modalpilih: true, debank: item })}>
                                <Text style={style.labelkiri}>{item.nama_bank}</Text>
                            </TouchableOpacity>
                        )}></FlatList>

                </View>
                <View style={{ position: 'absolute', justifyContent: 'center', alignContent: 'center', alignItems: 'center', alignSelf: 'center', bottom: 10, }}>
                    <TouchableOpacity onPress={() => this.setState({ modaltambah: true })} style={style.refresh} >
                        <View style={{
                            top: 20,
                            backgroundColor: '#0EBEDF', width: 170, height: 40, justifyContent: 'center', alignContent: 'center', alignItems: 'center', alignSelf: 'center', borderRadius: 10
                        }}>
                            <Text style={{ color: '#fff', textAlign: 'center', justifyContent: 'center', alignContent: 'center' }}>Tambah Data Bank</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <Modal
                    animationType={"slide"}
                    transparent={true}
                    visible={this.state.modaledit}
                    onRequestClose={() => this.setState({ modaledit: false })}
                    style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                    <SafeAreaView style={style.containerSafe}>
                        <TouchableOpacity activeOpacity={1.0} onPress={() => this.setState({ modaledit: false })} style={style.ModalCont}>

                            <View style={{
                                paddingTop: 5,
                                marginHorizontal: 10,
                                backgroundColor: '#fff',
                                // flexDirection: 'row',
                                borderRadius: 20,
                                height: 250,
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
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('', this.setState({ modaledit: false }))} style={{ position: 'absolute', right: 20, top: 20 }}>
                                    <Close />
                                </TouchableOpacity>
                                <Text>Edit Data</Text>
                                <View style={{ justifyContent: 'center', alignItems: 'center', textAlign: 'center', }}>
                                    <View style={style.form}>
                                        <Text style={style.labelkiri}>Nama Bank</Text>
                                        <TextInput
                                            style={style.kotak3}
                                            onChangeText={namabaru => this.setState({ namabaru })}
                                            value={debank.nama_bank}
                                            editable={false}
                                            keyboardType='default'
                                            placeholder=""
                                            placeholderTextColor="#C0C0C0"
                                        />
                                    </View>

                                    <View style={style.form}>
                                        <Text style={style.labelkiri}>Nama Baru</Text>
                                        <TextInput
                                            style={style.kotak3}
                                            onChangeText={namabaru => this.setState({ namabaru })}
                                            value={this.state.namabaru}
                                            keyboardType='default'
                                            placeholder=""
                                            placeholderTextColor="#C0C0C0"
                                        />
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                                    <TouchableOpacity style={[style.kotakkecil, { backgroundColor: '#B22222', width: '40%', height: '60%' }]} onPress={() => this.setState({ modaledit: false })}>
                                        <View >
                                            {/* <KKada style={{ justifyContent: 'center', alignSelf: 'center' }} /> */}
                                            <Text style={{ color: '#fff', textAlign: 'center', padding: 5, fontWeight: 'bold' }}>Batal</Text>
                                        </View>
                                    </TouchableOpacity>

                                    <TouchableOpacity style={[style.kotakkecil, { backgroundColor: '#00A9B8', width: '40%', height: '60%' }]} onPress={() => this.setState({ modaledit: false }, this.editData())}>
                                        <View >
                                            {/* <KKada style={{ justifyContent: 'center', alignSelf: 'center' }} /> */}
                                            <Text style={{ color: '#fff', textAlign: 'center', padding: 5, fontWeight: 'bold' }}>Simpan</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>

                            </View>

                        </TouchableOpacity>

                    </SafeAreaView>
                </Modal>


                <Modal
                    animationType={"slide"}
                    transparent={true}
                    visible={this.state.modaltambah}
                    onRequestClose={() => this.setState({ modaltambah: false })}
                    style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                    <SafeAreaView style={style.containerSafe}>
                        <TouchableOpacity activeOpacity={1.0} onPress={() => this.setState({ modaltambah: false })} style={style.ModalCont}>

                            <View style={{
                                paddingTop: 5,
                                marginHorizontal: 10,
                                backgroundColor: '#fff',
                                // flexDirection: 'row',
                                borderRadius: 20,
                                height: 250,
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
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('', this.setState({ modaltambah: false }))} style={{ position: 'absolute', right: 20, top: 20 }}>
                                    <Close />
                                </TouchableOpacity>
                                <View style={{ justifyContent: 'center', alignItems: 'center', textAlign: 'center', }}>
                                    <Text >Tambah Bank</Text>
                                    <View style={style.form}>
                                        <Text style={style.labelkiri}>Nama Bank</Text>
                                        <TextInput
                                            style={style.kotak3}
                                            onChangeText={baru => this.setState({ baru })}
                                            value={this.state.baru}
                                            keyboardType='default'
                                            placeholder="Masukan Nama"
                                            placeholderTextColor="#C0C0C0"
                                        />
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                                    <TouchableOpacity style={[style.kotakkecil, { backgroundColor: '#B22222', width: '40%', height: '60%' }]} onPress={() => this.setState({ modaltambah: false }) + ToastAndroid.show('Batal', ToastAndroid.SHORT)}>
                                        <View >
                                            {/* <KKada style={{ justifyContent: 'center', alignSelf: 'center' }} /> */}
                                            <Text style={{ color: '#fff', textAlign: 'center', padding: 5, fontWeight: 'bold' }}>Batal</Text>
                                        </View>
                                    </TouchableOpacity>

                                    <TouchableOpacity style={[style.kotakkecil, { backgroundColor: '#00A9B8', width: '40%', height: '60%' }]} onPress={() => this.setState({ modaltambah: false }, this.sendData()) + ToastAndroid.show('Simpan', ToastAndroid.SHORT)}>
                                        <View >
                                            {/* <KKada style={{ justifyContent: 'center', alignSelf: 'center' }} /> */}
                                            <Text style={{ color: '#fff', textAlign: 'center', padding: 5, fontWeight: 'bold' }}>Simpan</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>

                            </View>

                        </TouchableOpacity>

                    </SafeAreaView>
                </Modal>

                <Modal animationType={"fade"} transparent={true}
                    visible={this.state.modalpilih}
                    onRequestClose={() => this.setState({ modalpilih: false })}>
                    <SafeAreaView style={style.containerSafe}>
                        <TouchableOpacity activeOpacity={1.0} onPress={() => this.setState({ modalpilih: false })} style={style.ModalCont}>

                            <View style={{
                                paddingTop: 5,
                                marginHorizontal: 10,
                                backgroundColor: '#fff',
                                // flexDirection: 'row',
                                borderRadius: 20,
                                height: 250,
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
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('', this.setState({ modalpilih: false }))} style={{ position: 'absolute', right: 20, top: 20 }}>
                                    <Close />
                                </TouchableOpacity>
                                <Text style={style.txtPresensi}>Pilih Pengaturan {debank.nama_bank}</Text>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                                    <TouchableOpacity style={[style.kotakkecil, { backgroundColor: '#B22222' }]} onPress={() => this.setState({ modalpilih: false }, this.Hapusbank())}>
                                        <View >
                                            {/* <KKada style={{ justifyContent: 'center', alignSelf: 'center' }} /> */}
                                            <Text style={{ color: '#fff', textAlign: 'center', padding: 5, fontWeight: 'bold' }}>Hapus</Text>
                                        </View>
                                    </TouchableOpacity>

                                    <TouchableOpacity style={[style.kotakkecil, { backgroundColor: '#00A9B8', }]} onPress={() => this.setState({ modalpilih: false, modaledit: true, debank: this.state.debank, })}>
                                        <View >
                                            {/* <KKada style={{ justifyContent: 'center', alignSelf: 'center' }} /> */}
                                            <Text style={{ color: '#fff', textAlign: 'center', padding: 5, fontWeight: 'bold' }}>Edit</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>

                                <TouchableOpacity onPress={() => this.setState({ modalpilih: false }) + ToastAndroid.show('Batal', ToastAndroid.SHORT)}>
                                    <View style={{ marginTop: '5%', alignItems: 'center', flexDirection: 'row', alignContent: 'center', }}>
                                        <View style={{ height: 50, borderColor: '#00A9B8', borderWidth: 1, width: 100, justifyContent: 'center', alignItems: 'center', alignSelf: 'center', borderRadius: 5 }}>
                                            <Text style={{ color: '#00A9B8', fontFamily: 'Poppins-Medium', fontSize: 14 }}>Batal</Text>
                                        </View>

                                    </View>
                                </TouchableOpacity>
                            </View>

                        </TouchableOpacity>
                    </SafeAreaView>
                </Modal>
            </View >

        )
    }
}

export default Bank
const style = StyleSheet.create({
    itemflat: {
        fontSize: 12,
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
        height: 60,
        width: '90%',
        justifyContent: 'center',
    },
    IconCari: {
        position: 'absolute',
        top: 8,
        left: 20,
    },
    ModalCont: {
        flex: 1,
        justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: '#00000099',
        paddingHorizontal: 10,
    },
    containerSafe: {
        flex: 1,
        flexDirection: 'column',
    },
    txtPresensi: {
        justifyContent: 'center', alignItems: 'center',
        fontSize: 18,
        marginTop: 20,
        fontWeight: 'bold',
        color: '#7e7e7e'
    },
    kotakkecil: {
        flexDirection: 'column',
        borderColor: '#bdbdbd',
        borderWidth: 1,
        width: '40%',
        height: '50%',
        justifyContent: 'center',
        alignContent: 'center',
        alignSelf: 'center',
        textAlign: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginTop: 10,
        marginHorizontal: 10,
    },
    labelkiri: {
        fontSize: 12,
        fontWeight: 'bold',
        marginVertical: 5,
        marginLeft: 10,
    },

    form: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        width: '100%'
    },
    kotak3: {
        color: '#000000',
        borderColor: '#bdbdbd',
        margin: 10,
        borderRadius: 2,
        borderWidth: 1,
        fontSize: 12,
        height: 40,
        width: 150,
    },

    refresh: {
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
        bottom: 0,
    },
});