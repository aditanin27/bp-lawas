import {
    Text, View, StyleSheet, TouchableOpacity,
    FlatList, RefreshControl, ImageBackground, Dimensions, Image, Modal, SafeAreaView, TextInput, ToastAndroid
} from 'react-native'
import React, { Component } from 'react'
import { FilterdanText, Adduser, IconCari } from '../../assets/icons';
import {
    orang3,
    orang2,
    orang1,
    Warnakuning,
    Warnapink, Warnamerah, Warnahijau, Warnaabu, Warnabiru,

} from '../../assets/images';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ActionButton from 'react-native-action-button';
import { Picker } from '@react-native-picker/picker';
import { connect } from 'react-redux';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
export class DetailKelompok extends Component {
    constructor(props) {
        super(props)
        this.state = {
            // detail: this.props.route.params.item,
            Kelompok: [],
            level: [],
            filter: [],
            refreshing: true,
            namkel: '',
            levanak: '',
            cari: '',
            modaltambah: false,
        }
    }

    sendData() {
        {
            let simpandata = {
                nama_kelompok: this.state.namkel,
                id_level_anak_binaan: this.state.levanak
            }
            let data = new FormData();
            for (let key in simpandata) {
                data.append(key, simpandata[key]);
            }
            fetch('https://kilauindonesia.org/datakilau/api/tamkelompok/' + this.props.user.id_shelter, {
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
                        this.onRefresh()
                        ToastAndroid.show("Data berhasil ditambah!", ToastAndroid.SHORT)
                    } else {
                        alert(`Data gagal disimpan !!!`);
                    }
                })
                .catch((err) => console.log('dari catch send Data ===', err));
        }

    }
    GetLevelAPi() {
        fetch('https://kilauindonesia.org/datakilau/api/levelbinaan')
            .then(res => {
                if (res.status === 200) return res.json();
            })
            .then(resdata => {
                console.log(resdata.data);
                this.setState({
                    level: resdata.data,
                    refreshing: false,
                });
            });
    }


    GetkelompkokallAPi() {
        AsyncStorage.getItem('token').then((token) => {
            fetch('https://kilauindonesia.org/datakilau/api/kelompokall', {
                headers: {
                    Authorization: 'Bearer ' + token,
                    // 'Accept': 'application/json',
                    // 'Content-Type': 'application/json'
                },
            }).then((res) => res.json())
                .then((resJson) => {
                    console.log('oke');
                    const length = resJson.data.length;
                    this.setState({
                        Kelompok: resJson.data,
                        filter: resJson.data,
                    });
                })
                .catch((err) => console.log('error catch home', err));
        });
    }
    componentDidMount() {
        this.GetkelompkokallAPi();
        this.GetLevelAPi();
        console.log(this.props);
    }
    onRefresh() {
        this.GetkelompkokallAPi();
        this.setState({ refreshing: false });
    }
    filterList(textToSearch) {
        this.setState({
            filter: this.state.Kelompok
                .filter(item => item.nama_kelompok.toLowerCase(textToSearch).includes(textToSearch)
                )
        })
    }
    render() {
        return (
            <View style={{ flex: 1 }}>
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
                    renderItem={({ item, index }) => (
                        <View style={{}}>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('KelompokKun', { item: item, id_shelter: this.state.detail })}>
                                {/* <ImageBackground source={CardImages} style={{ width: width * 0.90, height: height * 0.20, marginTop: '3%', justifyContent: 'center', alignSelf: 'center' }}> */}
                                <ImageBackground source={(index + 1) % 6 == 0 ? Warnahijau : (index + 2) % 6 == 0 ? Warnakuning : (index + 3) % 6 == 0 ? Warnabiru : (index + 4) % 6 == 0 ? Warnaabu : (index + 5) % 6 == 0 ? Warnapink : Warnamerah} style={{ width: width * 0.90, height: height * 0.20, marginTop: '3%', justifyContent: 'center', alignSelf: 'center' }}>
                                    <Text style={{ position: 'absolute', zIndex: 1, fontSize: 18, color: '#fff', fontFamily: 'Poppins-Medium', left: '11%', top: '11%' }}>{item.nama_kelompok}</Text>
                                    {/* <View style={{ position: 'absolute', zIndex: 1, flexDirection: 'row', top: '25%', left: '11%' }}>
                                        <Kidsabukecil />
                                        <Text style={{ fontSize: 16, color: '#fff', fontFamily: 'Poppins-Regular' }}>{item.jumlah_anggota}</Text>
                                        <Text style={{ fontSize: 16, color: '#fff', fontFamily: 'Poppins-Regular', left: '15%' }}>Orang</Text>
                                    </View> */}
                                    <Text style={{ position: 'absolute', zIndex: 1, fontSize: 18, color: '#fff', fontFamily: 'Poppins-Medium', left: '11%' }}>{item.nama_level_binaan}</Text>
                                    <View style={{ position: 'absolute', zIndex: 1, paddingRight: '10%', top: '57%', flexDirection: 'row', alignItems: 'center', width: '100%', justifyContent: 'flex-end' }}>
                                        <Image source={orang1} style={{ borderRadius: 100, width: 41, height: 41, }} />
                                    </View>

                                </ImageBackground>
                            </TouchableOpacity>
                        </View>
                    )}></FlatList>


                <ActionButton buttonColor='#00A9B8' offsetX={'7%'} offsetY={'140%'} bgColor="#000" bgOpacity={0.7}>
                    <ActionButton.Item
                        buttonColor='#00A9B8'
                        title="Tambah Kelompok"
                        offsetX={25}
                        hideShadow={true}
                        onPress={() => this.setState({ modaltambah: true })}
                        textStyle={{ fontSize: 14, fontFamily: 'Poppins-Medium' }}
                        buttonTextStyle={{ backgroundColor: '#000' }}
                    >
                        <Adduser style={style.actionButtonIcon} />
                    </ActionButton.Item>
                </ActionButton>


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

                                <View style={{ justifyContent: 'center', alignItems: 'center', textAlign: 'center', }}>
                                    <Text >Tambah Kelompok</Text>

                                    <View style={style.form}>
                                        <Text style={style.labelkiri}>Level Binaan</Text>
                                        <View
                                            style={[style.kotakpicker, { marginLeft: 20 }]}>
                                            <Picker
                                                style={style.Textinputcss}

                                                selectedValue={this.state.levanak}
                                                onValueChange={(itemValue,) => {
                                                    this.setState({
                                                        levanak: itemValue
                                                    })
                                                }}>
                                                <Picker.Item style={{ fontSize: 12 }} label="Pilih" value={''} key={'0'} />
                                                {
                                                    this.state.level.map((pillev, index) =>
                                                        <Picker.Item style={{ height: '100%', width: '100%', fontSize: 12, }} label={pillev.nama_level_binaan} value={pillev.id_level_anak_binaan} key={index} />
                                                    )}
                                            </Picker>

                                        </View>
                                    </View>
                                    <View style={style.form}>
                                        <Text style={style.labelkiri}>Nama Kelompok</Text>
                                        <TextInput
                                            style={style.kotak3}
                                            onChangeText={namkel => this.setState({ namkel })}
                                            value={this.state.namkel}
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

                                    <TouchableOpacity style={[style.kotakkecil, { backgroundColor: '#00A9B8', width: '40%', height: '60%' }]} onPress={() => this.setState({ modaltambah: false }, this.sendData())}>
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
            </View>
        )
    }
}
const style = StyleSheet.create({
    IconCari: {
        position: 'absolute',
        top: 8,
        left: 20,
    },
    itemflat: {
        flex: 1,
        fontSize: 12,
        flexDirection: 'row',
        marginLeft: 10,
        paddingRight: 30,
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
    },
    refresh: {
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
        bottom: 0,
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
        marginLeft: 10,
    },
    kotak3: {
        color: '#000000',
        borderColor: '#bdbdbd',
        margin: 10,
        borderRadius: 2,
        borderWidth: 1,
        fontSize: 12,
        borderRadius: 7,
        height: 45,
        width: 150,
    },
    containerSafe: {
        flex: 1,
        flexDirection: 'column',
    },
    ModalCont: {
        flex: 1,
        justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: '#00000099',
        paddingHorizontal: 10,
    },
    kotakkecil: {
        flexDirection: 'column',
        borderColor: '#bdbdbd',
        borderWidth: 1,
        width: '40%',
        height: 60,
        justifyContent: 'center',
        alignContent: 'center',
        alignSelf: 'center',
        textAlign: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginTop: 10,
        marginHorizontal: 10,
    },
    kotakpicker: {
        marginLeft: 10,
        marginTop: 10,
        paddingVertical: 5,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#DDD',
        width: width * 0.4,
        height: 40,
    },
    Textinputcss: {
        width: width - 50,
        color: '#C0C0C0',
        marginTop: -10,
        borderRadius: 10,
        borderWidth: 1,
        fontSize: 10,
        height: 40,
        borderColor: '#C0C0C0',
        fontFamily: 'Poppins-Regular',
    },
    IconCari: {
        position: 'absolute',
        top: 8,
        left: 20,
    },
});


const mapStateToProps = state => {
    return {
        user: state,
        initialState: state,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeUser: data => dispatch({ type: 'CHANGE/USER', payload: data }),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(DetailKelompok);