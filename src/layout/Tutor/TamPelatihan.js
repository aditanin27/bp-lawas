import {
    ScrollView, Text, View, StyleSheet, Dimensions, FlatList, RefreshControl,
    TextInput, ToastAndroid, TouchableOpacity, Button, Modal, Image, Alert
} from 'react-native'
import React, { Component } from 'react'
import RadioForm from 'react-native-simple-radio-button';
import { addfoto2, addfoto3, date, test } from '../../assets/images';
import { Camera, Cekputih, Bukuabu, Locationabu, IconCari } from '../../assets/icons';
import * as ImagePicker from 'react-native-image-picker';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
export class TamPelatihan extends Component {
    constructor(props) {
        super(props);
        this.state = {
            namapel: '',

            tingpel: '',
            jenispel: '',
            rapimg: {
                0: {
                    image: {
                        addfoto2
                    },
                },
            },
            img1: null,
            img2: 0,
            pilihtutor: false,
            refreshing: true,
            filt_tutor: [],
            Tutor: [],
            caritutor: '',
            seleksi:0

        }
    }
    componentDidMount() {
        this.GetTutorAPi();
        console.log(this.state.Tutor);
    }
    GetTutorAPi() {
        fetch('https://kilauindonesia.org/datakilau/api/tutor' )
            .then(res => {
                if (res.status === 200) return res.json();
            })
            .then(resdata => {
                console.log(resdata.data);
                this.setState({
                    Tutor: resdata.data,
                    filt_tutor: resdata.data,
                    refreshing: false,
                });
            });
    }
    takePic(index) {
        {
            ImagePicker.launchCamera(
                {
                    noData: true,
                    saveToPhotos: true,
                    title: 'Select Photo',
                    maxWidth: 300,
                    maxHeight: 400,
                    allowsEditing: true,
                    compressImageQuality: 0.5,
                    storageOptions: {
                        skipBackup: false,
                        path: 'images',
                    },
                },
                response => {
                    console.log('Response = ', response);

                    if (response.didCancel) {
                        console.log('User cancelled image picker');
                    } else if (response.error) {
                        console.log('ImagePicker Error: ', response.error);
                    } else {
                        const source = {
                            image: {
                                uri: response.assets[0].uri,
                                name: response.assets[0].fileName,
                                type: response.assets[0].type,
                            },
                            //   id: 0,
                        };
                        console.log('ini gambar = ', source);
                        this.setState(
                            prevState => {
                                prevState.rapimg[index] = source;
                                //   prevState.tgl_lahir[index] != this.props.route.params.tgl_lahir[index] ? this.setState({tglmbuh : true}) : this.setState({tglmbuh : false});
                                return {
                                    rapimg: prevState.rapimg,
                                };
                            },
                            () => console.log(this.state.rapimg),
                        );
                        this.setState({
                            img1: index,
                            img2: index,
                        });
                        console.log('ini gambar = ', this.state.rapimg);
                    }
                },
            );
        }
    }
    selek(ind) {
        console.log(ind);
        let temp = [...this.state.Tutor];
        temp[ind].seleksi = !temp[ind].seleksi;
        seleksi(temp);
    }
    filterList(textToSearch) {
        this.setState({
            filt_tutor: this.state.Tutor.filter(i => i.nama.toLowerCase(textToSearch).includes(textToSearch)),
        });
    }
    render() {
        var JenisPel = [
            { label: 'Reguler', value: 'Reguler' },
            { label: 'Quran', value: 'Quran' },
        ];
        var rapimg = [];
        for (let i = 0; i <= this.state.img2; i++) {
            rapimg.push(
                <Image
                    style={{ width: 200, height: 200, resizeMode: 'contain' }}
                    source={this.state.rapimg[i].image}
                />,
            );
        }
        return (
            <ScrollView style={{ height: '100%', width: '100%', backgroundColor: '#fff' }}>
                <View >
                    <View>
                        <Text style={style.judul}>Tambah Pelatihan Tutor</Text>
                    </View>
                    <View>
                        <Text style={{ marginLeft: 10, fontSize: 16, marginTop: 25 }}>Informasi Pelatihan</Text>
                        <View style={{ justifyContent: 'center', alignSelf: 'center' }}>
                            <TextInput
                                style={style.kotak3}
                                onChangeText={namapel => this.setState({ namapel })}
                                value={this.state.namapel}
                                keyboardType='default'
                                placeholder="Nama Pelatihan"
                                placeholderTextColor='#7e7e7e'
                            />
                            <TextInput
                                style={style.kotak3}
                                onChangeText={tingpel => this.setState({ tingpel })}
                                value={this.state.tingpel}
                                keyboardType='default'
                                placeholder="Tingkat Pelatihan"
                                placeholderTextColor='#7e7e7e'
                            />
                            <Text style={style.Label2}>Jenjang Pendidikan</Text>
                            <RadioForm
                                radio_props={JenisPel}
                                onPress={(value) => {
                                    this.setState({ jenispel: value }),
                                        ToastAndroid.show(value.toString(), ToastAndroid.SHORT)
                                }}
                                initial={0}
                                buttonSize={10}
                                buttonOuterSize={20}
                                animation={true}

                                style={{ flexDirection: 'column', marginLeft: 15, marginTop: 10, }}
                            >
                            </RadioForm>
                            <Text style={style.judul2}>Foto Pelatihan</Text>

                            <View style={style.body}>
                                {rapimg}
                            </View>

                            <TouchableOpacity onPress={() =>
                                Alert.alert(
                                    'Info',
                                    'Ambl foto menggunakan',
                                    [
                                        {
                                            text: 'Kamera',
                                            onPress: () =>
                                                this.takePic(this.state.img1 === null ? 0 : this.state.img1 + 1),
                                            style: 'cancel',
                                        },
                                        {
                                            text: "Cancel",
                                            onPress: () => console.log("Cancel Pressed"),
                                            style: "cancel"
                                        },
                                    ],
                                    { cancelable: false },
                                )
                            }>
                                <View style={{ backgroundColor: '#00A9B8', borderRadius: 10, marginTop: 20, padding: 10, width: 180, alignSelf: 'center' }}>
                                    <Text style={{ color: '#fff', fontFamily: 'Poppins-Medium', fontSize: 13 }}>+ Tambah Foto Pelatihan</Text>
                                </View>
                            </TouchableOpacity>
                            <View style={{ width: windowWidth - 30, height: 1, borderWidth: 1, borderColor: '#bdbdbd', marginTop: 10 }}></View>
                            <Text style={style.Label2}>List Tutor</Text>
                            <View style={style.body}>

                            </View>
                            <View style={{ width: 150, height: 40, backgroundColor: '#0076B8', justifyContent: 'center', textAlign: 'center', alignSelf: 'center', alignContent: 'center', alignItems: 'center', borderRadius: 5 }}>

                                <TouchableOpacity style={{ flexDirection: 'row', }} onPress={() => { this.setState({ pilihtutor: true }); }}>
                                    <Cekputih />
                                    <Text style={{ color: '#fff', marginTop: 5, marginLeft: 5 }}>Tambah Tutor</Text>
                                </TouchableOpacity>
                            </View>


                        </View>

                        <View>
                            <TouchableOpacity style={{ marginTop: 10, width: '90%', height: 40, backgroundColor: '#00A9B8', justifyContent: 'center', textAlign: 'center', alignSelf: 'center', alignContent: 'center', alignItems: 'center', borderRadius: 5 }}>
                                <Text style={{ color: '#fff', marginTop: 5, marginLeft: 5 }}>Simpan</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>



                <Modal
                    animationType={'slide'}
                    transparent={true}
                    visible={this.state.pilihtutor}
                    style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                    onRequestClose={() => this.setState({ pilihtutor: false })}>
                    <View style={style.ModalCont2}>
                        <View
                            style={{
                                paddingTop: 5,
                                backgroundColor: '#ffffff',
                                // flexDirection: 'row',
                                borderTopLeftRadius: 10,
                                borderTopRightRadius: 10,
                                height: '100%',
                                shadowColor: '#333',
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
                            <Text style={style.itemText}>Tambah Tutor</Text>
                            <ScrollView style={{ width: '100%', height: '100%' }}>
                                <View style={{
                                    alignSelf: 'center',
                                    flexDirection: 'row',
                                    backgroundColor: '#fff',
                                    height: 38,
                                    width: '90%',
                                    borderRadius: 9,
                                    borderColor: '#C0C0C0',
                                    borderWidth: 1,
                                    marginTop: 10,
                                    color: '#000'
                                }}>
                                    <IconCari style={style.IconCari} name="your-icon" size={20} />
                                    <TextInput
                                        // style={{
                                        //     marginLeft: 10,
                                        //     width: '80%'
                                        // }}
                                        // onChangeText={text => this.setState({text})}
                                        onChangeText={(text) => {
                                            this.filterList(text.toLowerCase()), this.setState({ caritutor: text })
                                        }}
                                        placeholder="Cari"
                                        placeholderTextColor="#C0C0C0"
                                        underlineColorAndroid="transparent"
                                    />

                                </View>
                                <FlatList
                                    refreshControl={
                                        <RefreshControl
                                            refreshing={this.state.refreshing}
                                            onRefresh={() => this.onRefresh()}
                                        />
                                    }
                                    data={this.state.Tutor}
                                    renderItem={({ item }) => (
                                        <View>
                                            <TouchableOpacity
                                                style={style.itemflat}
                                                // onPress={() => this.selek()}
                                                >
                                                <View
                                                    style={{
                                                        height: 90,
                                                        width: '100%',
                                                        justifyContent: 'center',
                                                        justifyContent: 'center',
                                                    }}>
                                                    <View
                                                        style={{
                                                            flexDirection: 'row',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                        }}>
                                                        <View style={{ flexDirection: 'row' }}>
                                                            <Image
                                                                source={test}
                                                                // source={{
                                                                //   uri:
                                                                //     'https://www.kilauindonesia.org/datakilau/gambarDonatur/' +
                                                                //     item.gambar_donatur,
                                                                // }}
                                                                style={{
                                                                    justifyContent: 'center',
                                                                    alignItems: 'center',
                                                                    alignSelf: 'center',
                                                                    height: 70,
                                                                    width: 70,
                                                                    borderRadius: 45,
                                                                    color: '#000',
                                                                }}
                                                            />

                                                            <View
                                                                style={{ flexDirection: 'column', marginLeft: 10 }}>
                                                                <Text
                                                                    style={{
                                                                        color: '#000',
                                                                        fontFamily: 'Poppins-Medium',
                                                                        fontSize: 16,
                                                                        marginLeft: 10,
                                                                    }}>
                                                                    {item.nama}
                                                                </Text>
                                                                <Text
                                                                    style={{
                                                                        color: '#000',
                                                                        fontFamily: 'Poppins-Regular',
                                                                        fontSize: 14,
                                                                        marginLeft: 10,
                                                                    }}>
                                                                    {item.pendidikan}
                                                                </Text>
                                                                <View
                                                                    style={{
                                                                        flexDirection: 'row',
                                                                        marginLeft: 10,
                                                                        marginTop: 10,
                                                                        justifyContent: 'center',
                                                                    }}>
                                                                    <Bukuabu />
                                                                    <Text
                                                                        style={{
                                                                            color: '#5D5C5D',
                                                                            fontFamily: 'Poppins-Regular',
                                                                            fontSize: 12,
                                                                            marginLeft: 5,
                                                                            marginRight: 10,
                                                                        }}>
                                                                        {item.mapel}
                                                                    </Text>
                                                                    <Locationabu />
                                                                    <Text
                                                                        style={{
                                                                            color: '#5D5C5D',
                                                                            fontFamily: 'Poppins-Regular',
                                                                            fontSize: 12,
                                                                            marginLeft: 5,
                                                                            marginRight: 10,
                                                                        }}>
                                                                        {item.nama_wilbin}
                                                                    </Text>
                                                                </View>
                                                            </View>
                                                        </View>
                                                    </View>
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                    )}></FlatList>
                            </ScrollView>
                        </View>
                    </View>
                </Modal>


            </ScrollView>
        )
    }
}
const style = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex: 1,
    },
    judul: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 15,
    },
    judul2: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 5,
        marginBottom: 5
    },
    images: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        borderWidth: 3,
        shadowRadius: 2,
        alignSelf: 'center'
    },
    btn: {
        flexDirection: 'column',
        padding: '1%', overflow: 'hidden',
        borderRadius: 50,
        elevation: 3,
        alignItems: 'center',
        justifyContent: 'center',

    },
    body: {
        backgroundColor: '#EEEEEE',
        alignItems: 'center',
        textAlignVertical: 'top',
        marginBottom: 10,
        height: 200,
        justifyContent: 'center',
        borderColor: '#CECBCB',
        marginHorizontal: 20,
        padding: '10%',
        borderRadius: 10,
        borderWidth: 3,
        shadowRadius: 2,
        borderStyle: 'dashed',
        marginHorizontal: '10%',
    },
    kotak3: {
        marginTop: 15,
        color: '#000',
        borderRadius: 10,
        borderWidth: 1,
        fontSize: 13,
        height: 50,
        width: windowWidth - 40,
        padding: 12,
        backgroundColor: '#fff',
        borderColor: '#DDDDDD',
        borderWidth: 1,
        fontFamily: 'Poppins-Regular',
    },
    btnParentSection: {
        alignItems: 'center',
        marginTop: 10,
    },
    contPicker: {
        flexDirection: 'column',
        backgroundColor: '#fffff',
        shadowRadius: 2,
        borderWidth: 1,
        borderRadius: 15,
        marginBottom: 10,
        marginHorizontal: '7%',
        justifyContent: 'center',
        borderColor: '#CECBCB',
    },
    formalamat: {
        width: '90%',
        marginTop: 10,
        borderRadius: 10,
        borderWidth: 1,
        height: 70,
        borderColor: '#DDDDDD',
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignSelf: 'center'
    },
    Button: {
        justifyContent: 'center',
        borderRadius: 50,
        padding: '1%',
        overflow: 'hidden',
        marginTop: '5%',
        marginBottom: '10%',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.80,
        shadowRadius: 4.65,
        elevation: 7,
    },
    intake: {
        justifyContent: 'center',
        alignSelf: 'center'
    },
    intake2: {
        alignSelf: 'center',
        justifyContent: 'center',
    },
    Label2: {
        marginTop: 10,
        fontSize: 16,
        width: '100%',
        color: '#000',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Poppins-Medium',
    },
    ModalCont2: {
        flex: 1,
        // alignItems: 'center',
        backgroundColor: '#00000079',
    },
    itemText: {
        textAlign: 'center',
        color: 'black',
        fontSize: 16,
        width: '100%',
        height: 50,
    },
    itemflat: {
        flex: 1,
        fontSize: 12,
        flexDirection: 'row',
        marginLeft: 20,
        padding: 10,
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
    IconCari: {
        marginTop: 7,
        marginLeft: 10,
    },
})
export default TamPelatihan