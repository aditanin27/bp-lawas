import {
    Text, View, TouchableOpacity, TextInput, StyleSheet,
    FlatList, Modal, SafeAreaView, Dimensions, ToastAndroid, RefreshControl
} from 'react-native'
import React, { Component } from 'react'
import { IconCari, FilterdanText, LocationsH, JenisH, Sekolah, SekolahH, Close } from '../../assets/icons'
import { Picker } from '@react-native-picker/picker';


const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

export class Datawilayah extends Component {
    constructor(props) {
        super(props);
        this.state = {
            refreshing: true,
            fil: false,
            edit: false,
            pilih: false,
            wilayah: false,
            tambah: false,
            tamwil: '',
            tamid: '',
            cari: '',
            wilbin: '',
            datawil: [],
            filter: [],
            id: '',
            namae: '',
            id_kacab: '',
            kacab: '',
            datakacab: [],
        };
    }
    componentDidMount() {
        this.getwilyahAPi();
        this.getkacabAPi();
        console.log(this.state.datawil);
    }
    onRefresh() {
        this.getwilyahAPi();
        this.getkacabAPi();
        this.setState({ refreshing: false });
    }
    getwilyahAPi() {
        fetch('https://kilauindonesia.org/datakilau/api/datawilbin')
            .then(res => {
                if (res.status === 200) return res.json();
            })
            .then(resdata => {
                console.log(resdata.DATA);
                this.setState({
                    datawil: resdata.data,
                    filter: resdata.data,
                    refreshing: false,
                });
            });
    }
    getkacabAPi() {
        fetch('https://kilauindonesia.org/datakilau/api/kacab')
            .then(res => {
                if (res.status === 200) return res.json();
            })
            .then(resdata => {
                console.log(resdata.data);
                this.setState({
                    datakacab: resdata.data,
                    refreshing: false,
                });
            });
    }

    sendData() {
        {
            let simpandata = {
                nama_wilbin: this.state.tamwil,
                id_kacab: this.state.tamid,
            }
            let data = new FormData();
            for (let key in simpandata) {
                data.append(key, simpandata[key]);
            }
            fetch('https://kilauindonesia.org/datakilau/api/tamwilbin', {
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
                nama_wilbin: this.state.namae,
                id_kacab: this.state.id_kacab,
            }
            let data = new FormData();
            for (let key in simpandata) {
                data.append(key, simpandata[key]);
            }
            fetch('https://kilauindonesia.org/datakilau/api/wilbinupd/' + this.state.id, {
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
    Hapuswilbin() {
        {
            fetch('https://kilauindonesia.org/datakilau/api/penhapuswilbin/' + this.state.id, {
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
    filterList(textToSearch) {
        this.setState({
            filter: this.state.datawil
                .filter(item => item.nama_wilbin.toLowerCase(textToSearch).includes(textToSearch)
                )
        })
    }
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#FFF' }}>
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
                                this.filterList(text.toLowerCase()), this.setState({ cari: text })
                            }}
                            value={this.state.cari}
                            placeholder="Cari Data"
                            placeholderTextColor="#C0C0C0"
                            underlineColorAndroid="transparent"
                        />
                        <IconCari style={style.IconCari} name="your-icon" size={20} />
                        <TouchableOpacity
                            onPress={() => {
                                this.setState({ fil: true });
                            }}>
                            <FilterdanText style={{ marginLeft: 20 }} />
                        </TouchableOpacity>

                    </View>
                </View>

                <FlatList
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={() => this.onRefresh()}
                        />
                    }
                    data={this.state.filter}
                    renderItem={({ item }) => (
                        <View>
                            <View style={{}}>
                                <TouchableOpacity
                                    onPress={() => this.setState({ pilih: true, id: item.id_wilbin, namae: item.nama_wilbin, id_kacab: item.id_kacab, kacab: item.nama_kacab })}>
                                    <View style={{
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        alignSelf: 'center',
                                        backgroundColor: '#fff',
                                        width: '90%',
                                        height: 100,
                                        marginTop: 10,
                                        marginBottom: 10,
                                        marginHorizontal: 10,
                                        borderRadius: 10,
                                        paddingHorizontal: '4%',
                                        shadowColor: '#858585',
                                        shadowRadius: 15,
                                        elevation: 6,
                                        shadowOpacity: '25%',
                                    }}>
                                        <View style={{ flexDirection: 'row', height: '90%', justifyContent: 'center', alignItems: 'center' }}>
                                            <LocationsH style={{ marginLeft: 10 }} />
                                            <Text style={{ color: '#000', fontSize: 10, marginLeft: 5, fontFamily: 'Poppins-Regular' }}>{item.nama_wilbin}</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', width: '50%', height: '90%', justifyContent: 'center', alignItems: 'center' }}>
                                            <SekolahH style={{ marginLeft: 10, }} />
                                            <Text style={{ color: '#000', fontSize: 10, marginLeft: 5, fontFamily: 'Poppins-Regular' }}>{item.nama_kacab}</Text>
                                        </View>
                                    </View>


                                </TouchableOpacity>
                            </View>
                        </View>
                    )}></FlatList>




                <View style={{ position: 'absolute', justifyContent: 'center', alignContent: 'center', alignItems: 'center', alignSelf: 'center', bottom: 10, }}>
                    <TouchableOpacity onPress={() => this.setState({ tambah: true })} style={style.refresh} >
                        <View style={{
                            top: 20,
                            backgroundColor: '#0EBEDF', width: 170, height: 40, justifyContent: 'center', alignContent: 'center', alignItems: 'center', alignSelf: 'center', borderRadius: 10
                        }}>
                            <Text style={{ color: '#fff', textAlign: 'center', justifyContent: 'center', alignContent: 'center' }}>Tambah Data Wilayah Binaan</Text>
                        </View>
                    </TouchableOpacity>
                </View>


                <Modal animationType={"fade"} transparent={true}
                    visible={this.state.wilayah}
                    onRequestClose={() => this.setState({ wilayah: false })}>

                    <SafeAreaView style={style.containerSafe}>
                        <TouchableOpacity style={style.ModalCont}>
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
                                <TouchableOpacity onPress={() => this.setState({ wilayah: false })} style={{ position: 'absolute', right: 20, top: 20 }}>
                                    <Close />
                                </TouchableOpacity>
                                <Text style={style.txtPresensi}>Edit Data</Text>
                                <View style={style.form}>
                                    <Text style={style.labelkiri}>Pilih Kantor Cabang</Text>
                                    <View style={style.kotakpicker}>
                                        <Picker
                                            style={style.Textinputcss}
                                            selectedValue={this.state.id_kacab}
                                            onValueChange={itemValue =>
                                                this.setState({ id_kacab: itemValue, show: 1 })
                                            }>
                                            <Picker.Item
                                                style={{ fontSize: 14, fontFamily: 'Poppins-Regular', fontWeight: 'bold' }}
                                                label={this.state.kacab}
                                                value=""
                                            />
                                            {
                                                this.state.datakacab.map((cab) =>
                                                    <Picker.Item style={{ height: '100%', width: '100%', fontSize: 12, color: '#000' }} label={cab.nama_kacab.toString()} value={cab.id_kacab} key={cab.id_kacab} />
                                                )}

                                        </Picker>
                                    </View>
                                </View>
                                <View style={style.form}>
                                    <Text style={style.labelkiri}>Nama Wilayah Binaan</Text>
                                    <TextInput
                                        style={style.kotak3}
                                        onChangeText={namae => this.setState({ namae })}
                                        value={this.state.namae}
                                        keyboardType='default'
                                        placeholder=""
                                        placeholderTextColor="#C0C0C0"
                                    />
                                </View>

                                <View style={{ marginTop: '5%', alignItems: 'center', flexDirection: 'row', alignContent: 'center' }}>
                                    <TouchableOpacity onPress={() => this.setState({ wilayah: false }) + ToastAndroid.show('Batal', ToastAndroid.SHORT)}>
                                        <View style={{ height: 50, borderColor: '#00A9B8', borderWidth: 1, width: 100, justifyContent: 'center', alignItems: 'center', alignSelf: 'center', borderRadius: 5 }}>
                                            <Text style={{ color: '#00A9B8', fontFamily: 'Poppins-Medium', fontSize: 14 }}>Batal</Text>
                                        </View>
                                    </TouchableOpacity>

                                    <TouchableOpacity onPress={() => this.setState({ wilayah: false }, this.editData())}>
                                        <View style={{ backgroundColor: '#00A9B8', marginLeft: 15, height: 50, borderColor: '#00A9B8', borderWidth: 1, width: 100, justifyContent: 'center', alignItems: 'center', alignSelf: 'center', borderRadius: 5 }}>
                                            <Text style={{ color: '#fff', fontFamily: 'Poppins-Medium', fontSize: 14 }}>Simpan</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </SafeAreaView>
                </Modal>

                <Modal animationType={"fade"} transparent={true}
                    visible={this.state.tambah}
                    onRequestClose={() => this.setState({ tambah: false })}>

                    <SafeAreaView style={style.containerSafe}>
                        <TouchableOpacity activeOpacity={1.0} onPress={() => this.setState({ tambah: false })} style={style.ModalCont}>
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
                                <TouchableOpacity onPress={() => this.setState({ tambah: false })} style={{ position: 'absolute', right: 20, top: 20 }}>
                                    <Close />
                                </TouchableOpacity>
                                <Text style={style.txtPresensi}>Tambah Data</Text>
                                <View style={style.form}>
                                    <Text style={style.labelkiri}>Pilih Kantor Cabang</Text>
                                    <View style={style.kotakpicker}>
                                        <Picker
                                            style={style.Textinputcss}
                                            selectedValue={this.state.tamid}
                                            onValueChange={itemValue =>
                                                this.setState({ tamid: itemValue, show: 1 })
                                            }>
                                            <Picker.Item
                                                style={{ fontSize: 14, fontFamily: 'Poppins-Regular', fontWeight: 'bold' }}
                                                label="Pilih Kantor Cabang"
                                                value=""
                                            />
                                            {
                                                this.state.datakacab.map((cab) =>
                                                    <Picker.Item style={{ height: '100%', width: '100%', fontSize: 12, color: '#000' }} label={cab.nama_kacab.toString()} value={cab.id_kacab} key={cab.id_kacab} />
                                                )}

                                        </Picker>
                                    </View>
                                </View>
                                <View style={style.form}>
                                    <Text style={style.labelkiri}>Nama Wilayah Binaan</Text>
                                    <TextInput
                                        style={style.kotak3}
                                        onChangeText={tamwil => this.setState({ tamwil })}
                                        value={this.state.tamwil}
                                        keyboardType='default'
                                        placeholder=""
                                        placeholderTextColor="#C0C0C0"
                                    />
                                </View>

                                <View style={{ marginTop: '5%', alignItems: 'center', flexDirection: 'row', alignContent: 'center', }}>
                                    <TouchableOpacity onPress={() => this.setState({ tambah: false }) + ToastAndroid.show('Batal', ToastAndroid.SHORT)}>
                                        <View style={{ height: 50, borderColor: '#00A9B8', borderWidth: 1, width: 100, justifyContent: 'center', alignItems: 'center', alignSelf: 'center', borderRadius: 5 }}>
                                            <Text style={{ color: '#00A9B8', fontFamily: 'Poppins-Medium', fontSize: 14 }}>Batal</Text>
                                        </View>
                                    </TouchableOpacity>

                                    <TouchableOpacity onPress={() => this.setState({ wilayah: false }, this.sendData())}>
                                        <View style={{ backgroundColor: '#00A9B8', marginLeft: 15, height: 50, borderColor: '#00A9B8', borderWidth: 1, width: 100, justifyContent: 'center', alignItems: 'center', alignSelf: 'center', borderRadius: 5 }}>
                                            <Text style={{ color: '#fff', fontFamily: 'Poppins-Medium', fontSize: 14 }}>Simpan</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </SafeAreaView>
                </Modal>

                <Modal animationType={"fade"} transparent={true}
                    visible={this.state.pilih}
                    onRequestClose={() => this.setState({ pilih: false })}>

                    <SafeAreaView style={style.containerSafe}>
                        <TouchableOpacity activeOpacity={1.0} onPress={() => this.setState({ pilih: false })} style={style.ModalCont}>
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
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('Home', this.setState({ pilih: false }))} style={{ position: 'absolute', right: 20, top: 20 }}>
                                    <Close />
                                </TouchableOpacity>
                                <Text style={style.txtPresensi}>Pilih Pengaturan</Text>
                                <Text>{this.state.namae}</Text>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                                    <View style={[style.kotakkecil, { backgroundColor: '#00A9B8' }]}>
                                        <TouchableOpacity onPress={() => this.setState({ pilih: false, wilayah: true })}>
                                            {/* <KKada style={{ justifyContent: 'center', alignSelf: 'center' }} /> */}
                                            <Text style={{ color: '#fff', textAlign: 'center', padding: 5, fontWeight: 'bold' }}>Edit Data</Text>
                                        </TouchableOpacity>
                                    </View>

                                    <View style={[style.kotakkecil, { backgroundColor: '#DC143C', }]}>
                                        <TouchableOpacity onPress={() => this.setState({ pilih: false }, this.Hapuswilbin())}>
                                            {/* <KKada style={{ justifyContent: 'center', alignSelf: 'center' }} /> */}
                                            <Text style={{ color: '#fff', textAlign: 'center', padding: 5, fontWeight: 'bold' }}>Hapus</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>

                                <View style={{ marginTop: '5%', alignItems: 'center', flexDirection: 'row', alignContent: 'center', }}>
                                    <TouchableOpacity onPress={() => this.setState({ pilih: false })}>
                                        <View style={{ height: 50, borderColor: '#00A9B8', borderWidth: 1, width: 100, justifyContent: 'center', alignItems: 'center', alignSelf: 'center', borderRadius: 5 }}>
                                            <Text style={{ color: '#00A9B8', fontFamily: 'Poppins-Medium', fontSize: 14 }}>Batal</Text>
                                        </View>
                                    </TouchableOpacity>

                                </View>
                            </View>
                        </TouchableOpacity>
                    </SafeAreaView>
                </Modal>

            </View>
        )
    }
}
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
        alignSelf: 'center',
    },
    IconCari: {
        position: 'absolute',
        top: 8,
        left: 20,
    },
    refresh: {
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
        bottom: 0,
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
    ModalCont: {
        flex: 1,
        justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: '#00000099',
        paddingHorizontal: 10,
    },
    labelkanan: {
        fontSize: 12,
        marginHorizontal: 5,
        width: 150,
    },
    labelkiri: {
        fontSize: 12,
        fontWeight: 'bold',
        marginVertical: 5,
        marginLeft: 20,
        width: 100,
    },
    form: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        width: '100%'
    },
    kotak3: {
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
    kotakpicker: {
        marginTop: 10,
        paddingVertical: 5,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#DDD',
        width: windowWidth * 0.5,
        height: 40,
    },
    Textinputcss: {
        width: windowWidth - 200,
        color: '#C0C0C0',
        marginTop: -10,
        borderRadius: 10,
        borderWidth: 1,
        fontSize: 10,
        height: 40,
        borderColor: '#C0C0C0',
        fontFamily: 'Poppins-Regular',
    },
});
export default Datawilayah