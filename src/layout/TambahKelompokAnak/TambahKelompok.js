import {
    Text,
    View,
    StyleSheet,
    TextInput,
    Image,
    ScrollView,
    SafeAreaView,
    TouchableOpacity,
    ToastAndroid,
    ImageBackground,
    Dimensions,
    Alert,
    Modal,
} from 'react-native';
import React, { Component } from 'react';
import { Picker } from '@react-native-picker/picker';
import CheckBox from '@react-native-community/checkbox';
import * as ImagePicker from 'react-native-image-picker';
import RadioForm, {
    RadioButton,
    RadioButtonInput,
    RadioButtonLabel,
} from 'react-native-simple-radio-button';
import { connect } from 'react-redux';
import { rapot, Calendar, juara, addfoto2, addfoto, addfoto4 } from '../../assets/images';
import { Arrowleft } from '../../assets/icons';
import { FlatList, TouchableWithoutFeedback } from 'react-native-gesture-handler';

class TamKelompokAnak extends Component {
    constructor(props) {
        super(props);
        this.state = {
            gambar: '',
            rapimg: {
                0: {
                    image: {
                        addfoto2
                    },
                },
            },
            count: 1,
            checked: this.props.checked,
            tr: [],
            rap: '',
            img1: null,
            img2: 0,
            text: '',
            text1: '',
            text2: '',
            show: 0,
            pel: '',
            peltinggi: '',
            pelrendah: '',
            Ganjil: false,
            Genap: false,
            modaldetail: false,
            simpan: false,
            kelas: '',
            resourcePath: {},
            showAlert: false,
            Wkuning: '#FFBB0C',
            Wkuning2: '#FFBB0C',
            pressed: false,

        };
    }

    changeColor() {
        if (!this.state.pressed) {
            this.setState({ pressed: true, Wkuning: '#FFBB0C', Wkuning2: '#000' });
        } else {
            this.setState({ pressed: false, Wkuning: '#000', Wkuning2: '#FFBB0C' });
        }
    }


    onChange = data => {
        this.setState({ selectedColor: data.selectedColor, text: data.text });
    };

    showAlert = () => {
        this.setState({
            showAlert: true
        });
    };

    // WarnaKuning = () => {
    //   this.setState({
    //    if ({Wkuning:true}){

    //    }
    //   });
    // };

    hideAlert = () => {
        this.setState({
            showAlert: false
        });
    };

    render() {


        const styles = {
            container: { marginTop: 24 },
            verticalStyle: { marginTop: 16 },
            textStyle: { textDecorationLine: "none" },
            iconImageStyle: { height: 20, width: 20 },
        };


        const { showAlert } = this.state;
        const { WKuning } = this.state;

        var rapimg = [];


        var semester = [
            { label: 'Ganjil ', value: 'Ganjil' },
            { label: 'Genap', value: 'Genap' },
        ];
        for (let i = 0; i <= this.state.img2; i++) {
            rapimg.push(
                <Image
                    style={{ width: 200, height: 200, resizeMode: 'contain' }}
                    source={this.state.rapimg[i].image}
                />,
            );
        }


        const inputbutton = [];
        for (let i = 0; i < this.state.count; i++) {
            <>
                <View key={i}>
                    <Text>{i + 1}.</Text>
                    <Picker
                        style={style.Textinputcss}
                        selectedValue={this.state.rap}
                        value={this.state.tr[i]}
                        onValueChange={itemValue =>
                            this.setState({ rap: itemValue, show: 1 })
                        }>
                        <Picker.Item label="Pilih" value="" />
                        <Picker.Item label="SD/MI" value="SD/MI" />
                        <Picker.Item label="SMP/MTS" value="SMP/MTS" />
                        <Picker.Item label="SMA/SMK/MA" value="SMA/SMK/MA" />
                    </Picker>
                </View>
            </>;
        }
        return (
            <View contentContainer
                style={style.contentContainer}>
                <View style={{ flexDirection: 'row', marginTop: 10, marginHorizontal: 10, alignItems: 'center' }}>
                    <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('List_anak')}>
                        <Arrowleft />
                    </TouchableWithoutFeedback>
                    <View style={{ justifyContent: 'center', width: '100%', padding: 10, }}>
                        <Text style={style.title2}>Tambah Kelompok Anak</Text>
                    </View>
                </View>
                <ScrollView style={{}}
                    showsVerticalScrollIndicator={true}>
                    {this.props.user.presensi === 'admin' | this.props.user.presensi === 'karyawan' ? ( //ini tampilan untuk pengelola dan admin cabang
                        <SafeAreaView>
                            <>
                                <View>
                                    <Text style={{ fontSize: 14, fontFamily: 'Poppins-SemiBold', color: '#000', top: 15 }}>Infomasi Kelompok</Text>
                                    <View style={{ justifyContent: 'center', alignItems: 'center', }}>
                                        <TextInput
                                            style={style.kotak3}
                                            onChangeText={text => this.setState({ text })}
                                            value={this.state.text}
                                            placeholder="Nama Kelompok"
                                            placeholderTextColor="#C0C0C0"
                                        />
                                    </View>
                                    <View style={{ flex: 1, backgroundColor: 'crimson' }}>

                                    </View>
                                    {/*vv*/}
                                    <FlatList
                                        horizontal
                                        data={this.state.data}
                                        renderItem={({ item: rowData }) => {
                                            return (
                                                <Card
                                                    title={null}
                                                    image={{ uri: rowData.imageUrl }}
                                                    containerStyle={{ padding: 0, width: 160 }}
                                                >
                                                    <Text style={{ marginBottom: 10 }}>
                                                        {rowData.title}
                                                    </Text>
                                                </Card>
                                            );
                                        }}
                                        keyExtractor={(item, index) => index}
                                    />
                                    <View style={{ marginTop: 5, height: 350 }}>
                                        <View style={{

                                        }}>
                                        </View>
                                        <View>
                                            <View style={{ flexDirection: 'row' }}>
                                                <Text style={style.Label2}>Anggota Kelompok</Text>
                                            </View>
                                        </View>

                                        <View style={{ marginTop: 8 }}>
                                            <ImageBackground source={addfoto4} style={style.header}>
                                                <TouchableOpacity onPress={() => this.props.navigation.navigate('PilAnggotaKel')}>
                                                    <View style={{ backgroundColor: '#00A9B8', borderRadius: 10, marginTop: 80, padding: 10 }}>
                                                        <Text style={{ color: '#fff', fontFamily: 'Poppins-Medium', fontSize: 13 }}>+ Tambah Anggota</Text>
                                                    </View>
                                                </TouchableOpacity>
                                            </ImageBackground>
                                        </View>
                                    </View>

                                </View>


                            </>
                        </SafeAreaView>
                    ) : (
                        <View />
                    )}
                </ScrollView>
                <View style={style.BSimpan2}>
                    <TouchableOpacity onPress={() => this.setState({ simpan: true })}>
                        <View style={style.BSimpan}>
                            <Text style={style.label5}>Simpan</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <Modal visible={this.state.simpan}>
                    <View style={{ backgroundColor: '#fff', borderRadius: 10, height: '23%', width: '80%', alignSelf: 'center', alignItems: 'center', flexDirection: 'column', justifyContent: 'space-between', padding: 30 }}>
                        <Text style={{ color: '#000', fontFamily: 'Poppins-Regular', fontSize: 14, marginBottom: 15 }}>Simpan Data ?</Text>
                        <View style={{ alignItems: 'center', flexDirection: 'row', alignContent: 'center' }}>
                            <TouchableOpacity onPress={() => this.setState({ simpan: false }) + ToastAndroid.show('Batal Disimpan', ToastAndroid.SHORT)}>
                                <View style={{ height: '70%', borderColor: '#00A9B8', borderWidth: 1, width: 100, justifyContent: 'center', alignItems: 'center', alignSelf: 'center', borderRadius: 10 }}>
                                    <Text style={{ color: '#00A9B8', fontFamily: 'Poppins-Medium', fontSize: 14 }}>Batal</Text>
                                </View>
                            </TouchableOpacity>
                            <View style={{ width: 20 }} />
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('KelompokKun') + ToastAndroid.show('Data Berhasil Disimpan', ToastAndroid.SHORT)}>
                                <View style={{ height: '70%', backgroundColor: '#00A9B8', width: 100, justifyContent: 'center', alignItems: 'center', alignSelf: 'center', borderRadius: 10 }}>
                                    <Text style={{ color: '#fff', fontFamily: 'Poppins-Medium', fontSize: 14 }}>Simpan</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </View>
        );
    }
}

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const style = StyleSheet.create({
    header: {
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        width: windowWidth * 0.95,
        height: windowHeight * 0.29
    },
    contentContainer: {
        backgroundColor: '#fff',
        width: windowWidth,
        height: windowHeight,
        paddingHorizontal: 15
    },// vildan menghapus flex dan menambahkan backgroundCOlor,width dan hight
    colnilai: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    Label1: {
        flex: 1,
        fontSize: 12,
        padding: 5,
        color: '#000000',
        flexDirection: 'column',
    },
    label5: {
        color: '#fff',
        padding: 10,
        fontFamily: 'Poppins-Medium',
        fontSize: 13,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
    },
    BSimpan: {
        backgroundColor: '#00A9B8',
        borderRadius: 10,
        marginHorizontal: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 15,

    },
    BSimpan2: {
        justifyContent: 'center',
        alignSelf: 'center',
        height: 70,
        width: windowWidth,
        backgroundColor: '#fff',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        shadowColor: '#333',
        shadowOffset: {
            width: 4,
            height: 4,
        },
        shadowOpacity: 5.3,
        shadowRadius: 5,
        borderColor: '#7e7e7e',
        elevation: 5,


    },
    Textinputcss: {
        color: '#C0C0C0',
        marginTop: 10,
        left: 2,
        marginRight: 4,
        borderRadius: 10,
        borderWidth: 1,
        fontSize: 10,
        height: 40,
        backgroundColor: '#fff',
        borderColor: '#C0C0C0',
        fontFamily: 'Poppins-Regular'
    },
    Textinputcss2: {
        color: '#C0C0C0',
        marginTop: 15,
        left: 2,
        marginRight: 4,
        borderRadius: 10,
        borderWidth: 1,
        fontSize: 10,
        height: 40,
        backgroundColor: '#fff',
        borderColor: '#C0C0C0',
        fontFamily: 'Poppins-Regular'
    }, //vildan
    nilai: {
        color: '#C0C0C0',
        fontSize: 10,
        height: 30,
        width: '60%',
        backgroundColor: '#FFF',
        borderColor: '#000',
        borderWidth: 3,
        fontFamily: 'Poppins-Regular',
    },
    Label2: {
        marginTop: 10,
        padding: 5,
        width: '100%',
        color: '#000',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Poppins-Medium'
    },
    Label3: {
        marginTop: 5,
        marginBottom: -25,
        marginLeft: 25,
        padding: 5,
        width: '100%',
        color: '#000',
        alignItems: 'center',
        justifyContent: 'center',
    },
    Label4: {
        marginTop: 25,
        width: '100%',
        color: '#000',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Poppins-Medium'
    },
    kotak2: {
        color: '#C0C0C0',
        marginTop: 10,
        marginLeft: 30,
        marginRight: 10,
        borderRadius: 2,
        borderWidth: 0.1,
        fontSize: 12,
        height: 52,
        width: '15%',
        backgroundColor: '#7e7e7',
    },
    kotak3: {
        marginTop: 30,
        color: '#C0C0C0',
        borderRadius: 10,
        borderWidth: 0.1,
        fontSize: 13,
        height: 52,
        width: windowWidth - 30,
        padding: 12,
        backgroundColor: '#fff',
        borderColor: '#DDDDDD',
        borderWidth: 1,
        fontFamily: 'Poppins-Regular',
    },
    kotak5: {
        marginTop: 15,
        color: '#000',
        borderRadius: 10,
        borderWidth: 0.1,
        fontSize: 13,
        height: 100,
        width: windowWidth - 30,
        backgroundColor: '#fff',
        borderColor: '#DDDDDD',
        borderWidth: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        padding: 12,
        fontFamily: 'Poppins-Regular',
        textAlignVertical: 'top'
    },
    kotak4: {
        color: '#C0C0C0',
        marginLeft: 4,
        borderRadius: 10,
        borderWidth: 0.1,
        fontSize: 14,
        height: 52,
        width: '25%',
        textAlign: 'center',
        backgroundColor: '#fff',
        borderColor: '#DDDDDD',
        borderWidth: 1
    },
    //vidan
    button: {

        width: 250,

        height: 60,

        backgroundColor: '#3740ff',

        alignItems: 'center',

        justifyContent: 'center',

        borderRadius: 4,

        marginBottom: 12

    },

    buttonText: {

        textAlign: 'center',

        fontSize: 15,

        color: '#fff'

    },

    title1: {
        marginRight: 20,
        marginLeft: 20,
        marginTop: 15,
        marginBottom: 15,
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
    },
    title2: {
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginRight: 20,
        fontSize: 15,
        color: '#000',
        fontFamily: 'Poppins-SemiBold'
    },
    item: {
        flex: 1,
        fontSize: 16,
        flexDirection: 'row',
        backgroundColor: '#fff',
        padding: 17,
        marginVertical: 8,
        marginHorizontal: 16,
        shadowColor: '#333',
        shadowOffset: {
            width: 1,
            height: 1,
        },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        borderColor: '#7e7e7e',
        elevation: 3,
    },
    container: {
        marginTop: 40,
        marginLeft: 75,
        multiline: true,
        width: 250,
        height: 250,
        flex: 1,
        margin: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        shadowColor: '#333',
        shadowOffset: {
            width: 1,
            height: 1,
        },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        borderColor: '#7e7e7e',
        elevation: 3,
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
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnSimpanUn: {
        width: '40%',
        fontWeight: 'bold',
        backgroundColor: '#C6C6C6',
        borderRadius: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: '#E9E9E9',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
    },

    checkbox: {
        flexDirection: 'row',
        alignContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
    },

    btnSimpanUn1: {
        width: '40%',
        fontWeight: 'bold',
        backgroundColor: '#C6C6C6',
        borderRadius: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: '#E9E9E9',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        textAlign: 'center',
    },
    btnEye: {
        position: 'absolute',
        padding: 10,
        right: 0,
    },
    Labeltgl: {
        marginTop: 5,
        position: 'absolute',
        top: 0,
        left: 180,
        right: 0,
        bottom: 0,
        height: 25,
        width: 25,
    },
    itemText: {
        textAlign: 'justify',
        marginLeft: 10,
        fontSize: 12,
        width: '35%',
        height: 43,
    },
    kotakbaru: {
        flexDirection: 'column',
        width: '95%',
        height: 110,
        borderRadius: 10,
        borderWidth: 1,
        marginLeft: 10,
        marginTop: 10,
        borderColor: '#E9E9E9',
        alignItems: 'center',
        alignContent: 'center',
        textAlign: 'center',
        backgroundColor: '#fff',
        shadowColor: '#333',
        shadowOffset: {
            width: 1,
            height: 1,
        },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        elevation: 3,
    },
    kotakabu: {
        shadowColor: '#333',
        shadowOffset: {
            width: 1,
            height: 1,
        },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        elevation: 3,
        width: '95%',
        height: 250,
        borderRadius: 15,
        borderWidth: 1,
        marginLeft: 10,
        marginTop: 10,
        borderColor: '#E9E9E9',
        backgroundColor: '#fff',
    },
    kotakabu2: {
        shadowColor: '#333',
        shadowOffset: {
            width: 1,
            height: 1,
        },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        elevation: 3,
        width: '100%',
        height: 230,
        borderRadius: 15,
        marginTop: 10,
        backgroundColor: 'white',
        paddingHorizontal: 10
    }, //Vildan

    img: {
        width: '95%',
        height: 150,
        marginLeft: 10,
        marginTop: 10,
        borderRadius: 10,
    },

    img2: {
        width: '100%',
        height: 150,
        marginTop: 10,
        borderRadius: 10,
    }, //vildan

    labelbaru: {
        fontSize: 16,
        marginTop: 10,
        marginLeft: 10,
    },
    labelbaru1: {
        fontSize: 12,
        marginRight: 5,
        marginTop: 10,
    },
    labelbaru2: {
        fontSize: 12,
        marginLeft: 10,
        marginTop: 10,
    },
    labelbaru3: {
        fontSize: 16,
        marginTop: 10,
        fontWeight: 'bold',
        color: '#000'
    }, //vildan
    labelbaru4: {
        fontSize: 12,
        color: '#000'
    }, //vildan
    labelbaru5: {
        fontSize: 12,
        marginLeft: 10,
        color: '#000'
    }, //vildan

    refresh: {
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
        // marginHorizontal: 5,
        bottom: 10,
        position: 'absolute',
        top: 600

    },//vildan
});
const mapStateToProps = state => {
    return {
        user: state,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeUser: data => dispatch({ type: 'CHANGE/USER', payload: data }),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(TamKelompokAnak);