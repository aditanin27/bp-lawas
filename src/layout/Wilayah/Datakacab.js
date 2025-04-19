import {
    Text, View, TouchableOpacity, TextInput, StyleSheet,
    FlatList, Modal, SafeAreaView, Dimensions, ToastAndroid, RefreshControl
} from 'react-native'
import React, { Component } from 'react'
import { IconCari, FilterdanText, LocationsH, JenisH, Sekolah, SekolahH, Close } from '../../assets/icons'
import { Picker } from '@react-native-picker/picker';


const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

export class Datakacab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            refreshing: true,
            detail: '',
            fil: false,
            edit: false,
            pilih: false,
            tambah: false,
            wilayah: false,
            tamcab: '',
            notlp: '',
            alamat: '',
            pro: '',
            kab: '',
            kec: '',
            kel: '',
            cari: '',
            filter: [],
            kacab: [],
            prov: [],
            kabupaten: [],
            kecamatan: [],
            kelurahan: [],
            id: '',
            namae: '',
            notlpe: '',
            alamate: '',
            proe: '',
            kabe: '',
            kece: '',
            kele: '',
            namaprov: '',
            namakab: '',
            namakec: '',
            namakel: ''
        };
    }
    componentDidMount() {
        this.getkacabAPi();
        this.getprovAPi();
        this.getkabupatenAPi();
        this.getkecamatanAPi();
        this.getkelurahanAPi();
        console.log(this.state.proe);
    }
    onRefresh() {
        this.getprovAPi();
        this.getkabupatenAPi();
        this.getkecamatanAPi();
        this.getkelurahanAPi();
        this.setState({ refreshing: false });
    }
    getkacabAPi() {
        fetch('https://kilauindonesia.org/datakilau/api/kacab')
            .then(res => {
                if (res.status === 200) return res.json();
            })
            .then(resdata => {
                console.log(resdata.data);
                this.setState({
                    kacab: resdata.data,
                    filter: resdata.data,
                    refreshing: false,
                });
            });
    }
    getprovAPi() {
        fetch('https://kilauindonesia.org/datakilau/api/getprovinsi').then(res => {
            if (res.status === 200)
                return res.json()
        }).then(resdata => {
            console.log(resdata.data)
            this.setState({
                prov: resdata.data,
            })
        })
    }
    getkabupatenAPi() {
        fetch('https://kilauindonesia.org/datakilau/api/getkab/' + this.state.pro)
            .then(res => {
                if (res.status === 200) return res.json();
            })
            .then(resdata => {
                console.log(resdata.data);
                this.setState({
                    kabupaten: resdata.data,
                });
            });
    }

    getkecamatanAPi() {
        fetch('https://kilauindonesia.org/datakilau/api/getkec/' + this.state.kab)
            .then(res => {
                if (res.status === 200) return res.json();
            })
            .then(resdata => {
                console.log(resdata.data);
                this.setState({
                    kecamatan: resdata.data,
                });
            });
    }

    getkelurahanAPi() {
        fetch('https://kilauindonesia.org/datakilau/api/getkel/' + this.state.kec)
            .then(res => {
                if (res.status === 200) return res.json();
            })
            .then(resdata => {
                console.log(resdata.data);
                this.setState({
                    kelurahan: resdata.data,
                });
            });
    }
    sendData() {
        {
            let simpandata = {
                nama_kacab: this.state.tamcab,
                no_telpon: this.state.notlp,
                alamat: this.state.alamat,
                id_prov: this.state.pro,
                id_kab: this.state.kab,
                id_kec: this.state.kec,
                id_kel: this.state.kel,
            }
            let data = new FormData();
            for (let key in simpandata) {
                data.append(key, simpandata[key]);
            }
            fetch('https://kilauindonesia.org/datakilau/api/tamkacab', {
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
                nama_kacab: this.state.namae,
                no_telpon: this.state.notlpe,
                alamat: this.state.alamate,
                id_prov: this.state.proe,
                id_kab: this.state.kabe,
                id_kec: this.state.kece,
                id_kel: this.state.kele,
            }
            let data = new FormData();
            for (let key in simpandata) {
                data.append(key, simpandata[key]);
            }
            fetch('https://kilauindonesia.org/datakilau/api/kacabupd/' + this.state.id, {
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
    Hapuskacab() {
        {
            fetch('https://kilauindonesia.org/datakilau/api/penhapuskacab/' + this.state.id, {
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
            filter: this.state.kacab
                .filter(item => item.nama_kacab.toLowerCase(textToSearch).includes(textToSearch)
                )
        })
    }
    render() {
        const detail = this.state.detail
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
                                    onPress={() => this.setState({
                                        pilih: true, id: item.id_kacab, namae: item.nama_kacab, notlpe: item.no_telpon,
                                        alamate: item.alamat, proe: item.id_prov, kabe: item.id_kab, kece: item.id_kec, kele: item.id_kel,
                                        namaprov: item.provinsi, namakab: item.kabupaten, namakec: item.kecamatan, namakel: item.kelurahan
                                    })}>
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
                                            <SekolahH style={{ marginLeft: 10, }} />
                                            <Text style={{ color: '#000', fontSize: 10, marginLeft: 5, fontFamily: 'Poppins-Regular' }}>{item.nama_kacab}</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', width: '50%', height: '90%', justifyContent: 'center', alignItems: 'center' }}>
                                            <LocationsH style={{ marginLeft: 10 }} />
                                            <Text style={{ color: '#000', fontSize: 10, marginLeft: 5, fontFamily: 'Poppins-Regular' }}>{item.alamat}</Text>
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
                            <Text style={{ color: '#fff', textAlign: 'center', justifyContent: 'center', alignContent: 'center' }}>Tambah Data Kantor Cabang</Text>
                        </View>
                    </TouchableOpacity>
                </View>


                <Modal animationType={"fade"} transparent={true}
                    visible={this.state.edit}
                    onRequestClose={() => this.setState({ edit: false })}>

                    <SafeAreaView style={style.containerSafe}>
                        <TouchableOpacity activeOpacity={1.0} onPress={() => this.setState({ edit: false })} style={style.ModalCont}>
                            {/* <View style={{
                                paddingTop: 5,
                                marginHorizontal: 10,
                                backgroundColor: '#fff',
                                // flexDirection: 'row',
                                borderRadius: 20,
                                height: '70%',
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
                                <TouchableOpacity onPress={() => this.setState({ edit: false })} style={{ position: 'absolute', right: 20, top: 20 }}>
                                    <Close />
                                </TouchableOpacity>
                                <Text style={style.txtPresensi}>Edit Data</Text>
                               

                                

                                

                               


                                



                               


                            </View> */}





                            <View style={{
                                paddingTop: 5,
                                marginHorizontal: 10,
                                backgroundColor: '#fff',
                                // flexDirection: 'row',
                                borderRadius: 20,
                                height: '70%',
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
                                <TouchableOpacity onPress={() => this.setState({ edit: false })} style={{ position: 'absolute', right: 20, top: 20 }}>
                                    <Close />
                                </TouchableOpacity>
                                <Text style={style.txtPresensi}>Edit Data</Text>
                                <View style={style.form}>
                                    <Text style={style.labelkiri}>Nama Kantor Cabang</Text>
                                    <TextInput
                                        style={style.kotak3}
                                        onChangeText={namae => this.setState({ namae })}
                                        value={this.state.namae}
                                        keyboardType='default'
                                        placeholder=""
                                        placeholderTextColor="#C0C0C0"
                                    />
                                </View>

                                <View style={style.form}>
                                    <Text style={style.labelkiri}>No telp</Text>
                                    <TextInput
                                        style={style.kotak3}
                                        onChangeText={notlpe => this.setState({ notlpe })}
                                        value={this.state.notlpe}
                                        keyboardType='numeric'
                                        placeholder=""
                                        placeholderTextColor="#C0C0C0"
                                    />
                                </View>

                                <View style={style.form}>
                                    <Text style={style.labelkiri}>Alamat</Text>
                                    <TextInput
                                        style={style.kotak3}
                                        onChangeText={alamate => this.setState({ alamate })}
                                        value={this.state.alamate}
                                        keyboardType='default'
                                        placeholder=""
                                        placeholderTextColor="#C0C0C0"
                                    />
                                </View>


                                <View style={style.form}>
                                    <Text style={style.labelkiri}>Provinsi</Text>
                                    <View style={style.kotakpicker}>
                                        <Picker
                                            style={style.Textinputcss}
                                            selectedValue={this.state.proe}
                                            onValueChange={itemValue =>
                                                this.setState({ proe: itemValue, show: 1 })
                                            }>
                                            <Picker.Item
                                                style={{ fontSize: 14, fontFamily: 'Poppins-Regular', fontWeight: 'bold' }}
                                                label={this.state.namaprov}
                                                value=""
                                            />
                                            {
                                                this.state.prov.map((pro) =>
                                                    <Picker.Item style={{ height: '100%', width: '100%', fontSize: 12, }} label={pro.nama.toString()} value={pro.id_prov} key={pro.id_prov} />
                                                )}

                                        </Picker>
                                    </View>
                                </View>

                                <View style={style.form}>
                                    <Text style={style.labelkiri}>Kabupaten/Kota</Text>
                                    <View style={style.kotakpicker}>
                                        <Picker
                                            style={style.Textinputcss}
                                            selectedValue={this.state.kabe}
                                            onFocus={() => { this.getkabupatenAPi() }}
                                            onValueChange={(itemValue, proe) => {
                                                this.setState({
                                                    kabe: (itemValue),
                                                    show: 1
                                                })
                                            }}>
                                            <Picker.Item
                                                style={{ fontSize: 14, fontFamily: 'Poppins-Regular' }}
                                                label={this.state.namakab}
                                                value=""
                                            />
                                            {
                                                this.state.kabupaten.map((kab) =>
                                                    <Picker.Item style={{ height: '100%', width: '100%', fontSize: 12, color: '#000' }} label={kab.nama.toString()} value={kab.id_kab} key={kab.id_kab} />
                                                )}

                                        </Picker>
                                    </View>
                                </View>


                                <View style={style.form}>
                                    <Text style={style.labelkiri}>Kecamatan</Text>
                                    <View style={style.kotakpicker}>
                                        <Picker
                                            style={style.Textinputcss}
                                            selectedValue={this.state.kece}
                                            onFocus={() => { this.getkecamatanAPi() }}
                                            onValueChange={(itemValue, kabe) => {
                                                this.setState({
                                                    kece: (itemValue),
                                                    show: 1
                                                })
                                            }}>
                                            <Picker.Item
                                                style={{ fontSize: 14, fontFamily: 'Poppins-Regular' }}
                                                label={this.state.namakab}
                                                value=""
                                            />
                                            {
                                                this.state.kecamatan.map((kec) =>
                                                    <Picker.Item style={{ height: '100%', width: '100%', fontSize: 12, color: '#000' }} label={kec.nama.toString()} value={kec.id_kec} key={kec.id_kec} />
                                                )}

                                        </Picker>
                                    </View>
                                </View>

                                <View style={style.form}>
                                    <Text style={style.labelkiri}>Kelurahan/Desa</Text>
                                    <View style={style.kotakpicker}>
                                        <Picker
                                            style={style.Textinputcss}
                                            selectedValue={this.state.kele}
                                            onFocus={() => { this.getkelurahanAPi() }}
                                            onValueChange={(itemValue, kec) => {
                                                this.setState({
                                                    kel: (itemValue),
                                                    show: 1
                                                })
                                            }}>
                                            <Picker.Item
                                                style={{ fontSize: 14, fontFamily: 'Poppins-Regular' }}
                                                label={this.state.namakel}
                                                value=""
                                            />
                                            {
                                                this.state.kelurahan.map((kel) =>
                                                    <Picker.Item style={{ height: '100%', width: '100%', fontSize: 12, color: '#000' }} label={kel.nama.toString()} value={kel.id_kel} key={kel.id_kel} />
                                                )}

                                        </Picker>
                                    </View>
                                </View>

                                <View style={{ marginTop: '5%', alignItems: 'center', flexDirection: 'row', alignContent: 'center' }}>
                                    <TouchableOpacity onPress={() => this.setState({ edit: false }) + ToastAndroid.show('Batal', ToastAndroid.SHORT)}>
                                        <View style={{ height: 50, borderColor: '#00A9B8', borderWidth: 1, width: 100, justifyContent: 'center', alignItems: 'center', alignSelf: 'center', borderRadius: 5 }}>
                                            <Text style={{ color: '#00A9B8', fontFamily: 'Poppins-Medium', fontSize: 14 }}>Batal</Text>
                                        </View>
                                    </TouchableOpacity>

                                    <TouchableOpacity onPress={() => this.setState({ edit: false }, this.editData())}>
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
                                height: '70%',
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
                                    <Text style={style.labelkiri}>Nama Kantor Cabang</Text>
                                    <TextInput
                                        style={style.kotak3}
                                        onChangeText={tamcab => this.setState({ tamcab })}
                                        value={this.state.tamcab}
                                        keyboardType='default'
                                        placeholder=""
                                        placeholderTextColor="#C0C0C0"
                                    />
                                </View>

                                <View style={style.form}>
                                    <Text style={style.labelkiri}>No telp</Text>
                                    <TextInput
                                        style={style.kotak3}
                                        onChangeText={notlp => this.setState({ notlp })}
                                        value={this.state.notlp}
                                        keyboardType='numeric'
                                        placeholder=""
                                        placeholderTextColor="#C0C0C0"
                                    />
                                </View>

                                <View style={style.form}>
                                    <Text style={style.labelkiri}>Alamat</Text>
                                    <TextInput
                                        style={style.kotak3}
                                        onChangeText={alamat => this.setState({ alamat })}
                                        value={this.state.alamat}
                                        keyboardType='default'
                                        placeholder=""
                                        placeholderTextColor="#C0C0C0"
                                    />
                                </View>

                                <View style={style.form}>
                                    <Text style={style.labelkiri}>Provinsi</Text>
                                    <View style={style.kotakpicker}>
                                        <Picker
                                            style={style.Textinputcss}
                                            selectedValue={this.state.pro}
                                            onValueChange={itemValue =>
                                                this.setState({ pro: itemValue, show: 1 })
                                            }>
                                            <Picker.Item
                                                style={{ fontSize: 14, fontFamily: 'Poppins-Regular', fontWeight: 'bold' }}
                                                label="Pilih Kantor Cabang"
                                                value=""
                                            />
                                            {
                                                this.state.prov.map((pro) =>
                                                    <Picker.Item style={{ height: '100%', width: '100%', fontSize: 12, }} label={pro.nama.toString()} value={pro.id_prov} key={pro.id_prov} />
                                                )}

                                        </Picker>
                                    </View>
                                </View>


                                <View style={style.form}>
                                    <Text style={style.labelkiri}>Kabupaten/Kota</Text>
                                    <View style={style.kotakpicker}>
                                        <Picker
                                            style={style.Textinputcss}
                                            selectedValue={this.state.kab}
                                            onFocus={() => { this.getkabupatenAPi() }}
                                            onValueChange={(itemValue, pro) => {
                                                this.setState({
                                                    kab: (itemValue),
                                                    show: 1
                                                })
                                            }}>
                                            <Picker.Item
                                                style={{ fontSize: 14, fontFamily: 'Poppins-Regular' }}
                                                label="Pilih Kabupaten/Kota"
                                                value=""
                                            />
                                            {
                                                this.state.kabupaten.map((kab) =>
                                                    <Picker.Item style={{ height: '100%', width: '100%', fontSize: 12, color: '#000' }} label={kab.nama.toString()} value={kab.id_kab} key={kab.id_kab} />
                                                )}

                                        </Picker>
                                    </View>
                                </View>



                                <View style={style.form}>
                                    <Text style={style.labelkiri}>Kecamatan</Text>
                                    <View style={style.kotakpicker}>
                                        <Picker
                                            style={style.Textinputcss}
                                            selectedValue={this.state.kec}
                                            onFocus={() => { this.getkecamatanAPi() }}
                                            onValueChange={(itemValue, kab) => {
                                                this.setState({
                                                    kec: (itemValue),
                                                    show: 1
                                                })
                                            }}>
                                            <Picker.Item
                                                style={{ fontSize: 14, fontFamily: 'Poppins-Regular' }}
                                                label="Pilih Kecamatan"
                                                value=""
                                            />
                                            {
                                                this.state.kecamatan.map((kec) =>
                                                    <Picker.Item style={{ height: '100%', width: '100%', fontSize: 12, color: '#000' }} label={kec.nama.toString()} value={kec.id_kec} key={kec.id_kec} />
                                                )}

                                        </Picker>
                                    </View>
                                </View>

                                <View style={style.form}>
                                    <Text style={style.labelkiri}>Kelurahan/Desa</Text>
                                    <View style={style.kotakpicker}>
                                        <Picker
                                            style={style.Textinputcss}
                                            selectedValue={this.state.kel}
                                            onFocus={() => { this.getkelurahanAPi() }}
                                            onValueChange={(itemValue, kec) => {
                                                this.setState({
                                                    kel: (itemValue),
                                                    show: 1
                                                })
                                            }}>
                                            <Picker.Item
                                                style={{ fontSize: 14, fontFamily: 'Poppins-Regular' }}
                                                label="Pilih Kelurahan/Desa"
                                                value=""
                                            />
                                            {
                                                this.state.kelurahan.map((kel) =>
                                                    <Picker.Item style={{ height: '100%', width: '100%', fontSize: 12, color: '#000' }} label={kel.nama.toString()} value={kel.id_kel} key={kel.id_kel} />
                                                )}

                                        </Picker>
                                    </View>
                                </View>

                                <View style={{ marginTop: '5%', alignItems: 'center', flexDirection: 'row', alignContent: 'center', }}>
                                    <TouchableOpacity onPress={() => this.setState({ tambah: false }) + ToastAndroid.show('Batal', ToastAndroid.SHORT)}>
                                        <View style={{ height: 50, borderColor: '#00A9B8', borderWidth: 1, width: 100, justifyContent: 'center', alignItems: 'center', alignSelf: 'center', borderRadius: 5 }}>
                                            <Text style={{ color: '#00A9B8', fontFamily: 'Poppins-Medium', fontSize: 14 }}>Batal</Text>
                                        </View>
                                    </TouchableOpacity>

                                    <TouchableOpacity onPress={() => this.setState({ tambah: false }, this.sendData()) + ToastAndroid.show('Tersimpan', ToastAndroid.SHORT)}>
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
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('Home', this.setState({ pilih: false }))} style={{ position: 'absolute', right: 20, top: 20 }}>
                                    <Close />
                                </TouchableOpacity>
                                <Text style={style.txtPresensi}>Pilih Pengaturan</Text>
                                <Text style={{ marginTop: 5 }}>{this.state.namae}</Text>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                                    <View style={[style.kotakkecil, { backgroundColor: '#00A9B8' }]}>
                                        <TouchableOpacity onPress={() => this.setState({ pilih: false, edit: true })}>
                                            {/* <KKada style={{ justifyContent: 'center', alignSelf: 'center' }} /> */}
                                            <Text style={{ color: '#fff', textAlign: 'center', padding: 5, fontWeight: 'bold' }}>Edit Data</Text>
                                        </TouchableOpacity>
                                    </View>

                                    <View style={[style.kotakkecil, { backgroundColor: '#DC143C', }]}>
                                        <TouchableOpacity onPress={() => this.setState({ pilih: false }, this.Hapuskacab())}>
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
export default Datakacab