import React, { Component } from 'react'
import { Text, View, StyleSheet, Dimensions, ScrollView, TextInput, TouchableOpacity, ToastAndroid, FlatList } from 'react-native'
import { Picker } from '@react-native-picker/picker';
import { Pluswarna } from '../../assets/icons'
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';

export class Editrapotshelter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0,
            nilai: this.props.route.params.list.nilai,
            mapel: this.props.route.params.list.mapel,
            materi: [],
            sikap: this.props.route.params.list.sikap,
            date: new Date(),
            detail: this.props.route.params.detail,
            item: this.props.route.params.item,
            kelas: this.props.route.params.kelas,
            list: this.props.route.params.list,
            catatan: this.props.route.params.list.catatan,
            semester: this.props.route.params.list.semester,
            nilaibaru: [],
            mapelbaru: [],
            // deta: this.props.route.params.kelas.nama_kelas_binaan,
        };
    }



    SimpanData() {
        AsyncStorage.getItem('token').then((token) => {
            const datagabugnil = encodeURIComponent(JSON.stringify(this.state.nilai)) + encodeURIComponent(JSON.stringify(this.state.nilaibaru));
            const datagabug = encodeURIComponent(JSON.stringify(this.state.mapel)) + encodeURIComponent(JSON.stringify(this.state.mapelbaru));
            let dataToSend = {
                nilai: encodeURIComponent(JSON.stringify(this.state.nilai)),
                mapel: encodeURIComponent(JSON.stringify(this.state.mapel)),

                // nilai: encodeURIComponent(JSON.stringify(this.state.nilaibaru)),
                // mapel: encodeURIComponent(JSON.stringify(this.state.mapelbaru)),
                // mapel: datagabug,
                // nilai: datagabugnil,
                sikap: this.state.sikap,
                semester: this.state.semester,
                catatan: this.state.catatan,
            }
            let data = new FormData();
            for (let key in dataToSend) {
                data.append(key, dataToSend[key]);
            }
            console.log('kkkk', data);
            fetch('https://kilauindonesia.org/datakilau/api/rapotshelterupd/' + this.state.list.id_rapshelter, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: 'application/json',
                    'Content-Type': 'multipart/form-data'
                },
                body: data,
            })
                .then((res) => res.json())
                .then((resJson) => {
                    console.log(resJson.status)
                    console.log(resJson);
                    if (resJson.status === 'sukses') {

                        this.props.navigation.navigate('Rapshelter', { id_anak: this.state.detail })
                        this.onRefresh()
                        ToastAndroid.show("Data berhasil ditambah!", ToastAndroid.SHORT)
                    } else {
                        ToastAndroid.show("gagal menyimpan", ToastAndroid.SHORT)
                    }
                })
                .catch((err) => console.log('dari catch send Data ===', err));
        });
    }

    onChangeTextnilai = (text, index) => {
        this.setState(
            prevState => {
                prevState.nilai[index] = text;
                return {
                    nilai: prevState.nilai,
                };
            },
            () => console.log(this.state.nilai),
        );
    };

    onChangeTextmapel = (itemValue, index) => {
        this.setState(
            prevState => {
                prevState.mapel[index] = itemValue;
                return {
                    mapel: prevState.mapel,
                };
            },
            () => console.log(this.state.mapel),

        );
    };

    onChangeTextnilaibaru = (text, index) => {
        this.setState(
            prevState => {
                prevState.nilaibaru[index] = text;
                return {
                    nilaibaru: prevState.nilaibaru,
                };
            },
            () => console.log(this.state.nilaibaru),
        );
    };

    onChangeTextmapelbaru = (itemValue, index) => {
        this.setState(
            prevState => {
                prevState.mapelbaru[index] = itemValue;
                return {
                    mapelbaru: prevState.mapelbaru,
                };
            },
            () => console.log(this.state.mapelbaru),

        );
    };


    getmateriAPi() {
        AsyncStorage.getItem('token').then((token) => {
            fetch('https://kilauindonesia.org/datakilau/api/materi', {
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
                        materi: resJson.data,
                        refreshing: false,
                    });
                })
                .catch((err) => console.log('error catch home', err));
        });
    }
    componentDidMount() {
        this.getmateriAPi();
        // this.GetDetAPi();
        console.log(this.state.list.id_rapshelter)
    }
    render() {
        const kel = this.state.item
        const filmateri = this.state.materi.filter((item, index) => {
            return (
                this.state.materi.findIndex(
                    i => i.mata_pelajaran === item.mata_pelajaran && i.nama_level_binaan === this.state.kelas[0].nama_level_binaan,
                ) === index
            );
        });
        const nilai = []

        for (let i = 0; i < this.state.list.mapel.length; i++) {
            nilai.push(
                <View key={i}>
                    <View >
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={[style.labelkiri, { width: 150 }]}>{this.state.list.mapel[i]}</Text>
                            <Text style={style.labelkanan}>{this.state.list.nilai[i]}</Text>
                        </View>
                    </View>
                </View >

            )
        }
        const inputbutton = [];
        for (let i = 0; i < this.state.list.mapel.length; i++) {
            inputbutton.push(
                <>
                    <ScrollView>
                        <View key={i}>
                            <View style={{ flexDirection: 'row', marginTop: 8 }}>
                                <View style={{ width: '70%' }}>
                                    <Text style={{ marginLeft: 20 }}>Mata Pelajaran</Text>
                                    <View
                                        style={{
                                            height: 50,
                                            borderRadius: 10,
                                            borderWidth: 1,
                                            marginLeft: 20,
                                            marginTop: 10,
                                            borderColor: '#E9E9E9',
                                            backgroundColor: '#fff',
                                            flexDirection: 'column',
                                            justifyContent: 'space-around',
                                        }}>
                                        <Picker
                                            style={style.Textinputcss}
                                            selectedValue={this.state.mapel}
                                            value={this.state.mapel}
                                            onValueChange={itemValue => {
                                                this.onChangeTextmapel(itemValue, i);
                                            }}
                                        >
                                            <Picker.Item
                                                style={{ fontSize: 12 }}
                                                label={this.state.list.mapel[i]}
                                            />
                                            {
                                                filmateri.map((kel, index) => (
                                                    <Picker.Item
                                                        style={{ height: '100%', width: '100%', fontSize: 12 }}
                                                        label={kel.mata_pelajaran}
                                                        value={kel.mata_pelajaran}
                                                        key={index}
                                                    />
                                                ))
                                            }
                                        </Picker>
                                    </View>
                                </View>
                                <View style={{ marginLeft: 20 }}>
                                    <Text>Nilai</Text>
                                    <TextInput
                                        style={[style.kotak3, { width: windowWidth * 0.2 }]}
                                        onChangeText={text => {
                                            this.onChangeTextnilai(text, i);
                                        }}
                                        value={this.state.nilai[i]}
                                        keyboardType="numeric"
                                        placeholder=''
                                        placeholderTextColor="#C0C0C0"
                                    />
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                </>,
            );
        }


        const tambah = [];
        for (let i = 0; i < this.state.count; i++) {
            tambah.push(
                <>
                    <ScrollView>
                        <View key={i}>
                            <View style={{ flexDirection: 'row', marginTop: 8 }}>
                                <View style={{ width: '70%' }}>
                                    <Text style={{ marginLeft: 20 }}>Mata Pelajaran</Text>
                                    <View
                                        style={{
                                            height: 50,
                                            borderRadius: 10,
                                            borderWidth: 1,
                                            marginLeft: 20,
                                            marginTop: 10,
                                            borderColor: '#E9E9E9',
                                            backgroundColor: '#fff',
                                            flexDirection: 'column',
                                            justifyContent: 'space-around',
                                        }}>
                                        <Picker
                                            style={style.Textinputcss}
                                            selectedValue={this.state.mapelbaru[i]}
                                            value={this.state.mapelbaru[i]}
                                            // onValueChange={itemValue =>
                                            //     this.setState({ mapel: itemValue, show: 1 })
                                            // }
                                            onValueChange={itemValue => {
                                                this.onChangeTextmapelbaru(itemValue, i);
                                            }}
                                        >

                                            <Picker.Item
                                                style={{ fontSize: 12 }}
                                                label={'Pilih '}
                                            />
                                            {
                                                filmateri.map((kel, index) => (
                                                    <Picker.Item
                                                        style={{ height: '100%', width: '100%', fontSize: 12 }}
                                                        label={kel.mata_pelajaran}
                                                        value={kel.mata_pelajaran}
                                                        key={index}
                                                    />
                                                ))
                                            }
                                        </Picker>
                                    </View>
                                </View>
                                <View style={{ marginLeft: 20 }}>
                                    <Text>Nilai</Text>
                                    <TextInput
                                        style={[style.kotak3, { width: windowWidth * 0.2 }]}
                                        onChangeText={text => {
                                            this.onChangeTextnilaibaru(text, i);
                                        }}
                                        value={this.state.nilaibaru[i]}
                                        keyboardType="numeric"
                                        placeholder="Nilai"
                                        placeholderTextColor="#C0C0C0"
                                    />
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                </>,
            );
        }


        return (
            <View style={{ height: '100%', backgroundColor: '#fff' }}>
                <View style={{ backgroundColor: '#0EBEDF' }}>
                    <Text style={style.title2}>Penilaian semester</Text>
                </View>


                <View
                    style={{
                        height: 50,
                        borderRadius: 10,
                        borderWidth: 1,
                        marginLeft: 10,
                        width: '95%',
                        marginTop: 10,
                        borderColor: '#E9E9E9',
                        backgroundColor: '#fff',
                        flexDirection: 'column',
                        justifyContent: 'space-around',
                    }}>
                    <Picker
                        style={style.Textinputcss}
                        selectedValue={this.state.semester}
                        value={this.state.semester}
                        onValueChange={itemValue =>
                            this.setState({ semester: itemValue, show: 1 })
                        }
                    
                    >
                        <Picker.Item style={{ fontSize: 12, fontFamily: 'Poppins-Regular' }} label="Ganjil" value="Ganjil" />
                        <Picker.Item style={{ fontSize: 12, fontFamily: 'Poppins-Regular' }} label="Genap" value="Genap" />

                    </Picker>
                </View>
                {/* <Text>fsef{this.state.deta}</Text> */}
                <View style={{ flexDirection: 'row' }}>
                    
                </View>
                <View style={{ height: '60%' }}>
                    <ScrollView>
                        <View >
                            <View>
                                {inputbutton}

                            </View>
                            {/* <View>{tambah}</View> */}
                        </View>

                    </ScrollView>

                </View>

                <View style={style.infoContainer} >
                    <TextInput style={style.txtDesc} placeholder="Catatan Untuk Anak(Opsional)"
                        placeholderTextColor='#A9A9A9'
                        keyboardType="email-address"
                        value={this.state.catatan}
                        onChangeText={(text) => this.setState({ catatan: text })}
                        multiline={true}
                        numberOfLines={10}
                        autoCorrect={false}>
                    </TextInput>
                </View>
                <TouchableOpacity style={style.refresh} onPress={() =>
                    this.state.semester === '' ? alert('Tolong Pilih Semester terlebih dahulu') : this.SimpanData(this.state.item)}>
                    <View style={{
                        backgroundColor: '#0EBEDF', width: 170, height: 40, justifyContent: 'center', alignContent: 'center', alignItems: 'center', alignSelf: 'center', borderRadius: 10
                    }}>
                        <Text style={{ color: '#fff', textAlign: 'center', justifyContent: 'center', alignContent: 'center' }}>Simpan</Text>
                    </View>
                </TouchableOpacity>
            </View >
        )
    }
}

export default Editrapotshelter

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const style = StyleSheet.create({
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
        borderRadius: 15,
    },
    btntambah: {
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        width: '90%',
        height: 50,
        borderWidth: 1,
        borderRadius: 10,
        color: '#fff',
        borderColor: '#00A9B8',
        backgroundColor: '#00A9B8',
    },
    kotak3: {
        marginTop: 10,
        color: '#000',
        borderRadius: 10,
        borderWidth: 0.1,
        fontSize: 13,
        height: 50,
        width: windowWidth * 0.3,
        padding: 12,
        backgroundColor: '#fff',
        borderColor: '#DDDDDD',
        borderWidth: 1,
        fontFamily: 'Poppins-Regular',
    },
    coltom1: {
        width: '90%',
        marginTop: 10,
        fontSize: 16,
        padding: 10,
        marginTop: 10,
        backgroundColor: '#0EBEDF',
        marginVertical: 8,
        marginHorizontal: 16,
        borderWidth: 0.1,
        borderRadius: 2,
        borderColor: '#fff',
    },
    botomnav: {
        position: 'absolute',
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        height: 70,
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        top: '92%',
        backgroundColor: 'white',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 20,
        shadowColor: '#52006A',
    },
    title2: {
        marginRight: 20,
        marginLeft: 20,
        marginTop: 15,
        marginBottom: 15,
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
    },
    refresh: {
        padding: 10,
        marginBottom: 10,
        flexDirection: 'row',
        borderRadius: 5,
        bottom: 0,
        position: 'absolute',
        // marginHorizontal: 5,
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'center',
        alignSelf: 'center',
        marginTop: 20,
    },
    form: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,

    },
    labelkiri: {
        fontSize: 12,
        fontWeight: 'bold',
        marginVertical: 5,
        marginLeft: 10,
        width: 100,
    },
    infoContainer: {
        width: '90%',
        marginTop: 10,
        marginHorizontal: 20,
        bottom: '8%',
        position: 'absolute',
        borderRadius: 10,
        borderWidth: 1,
        height: 70,
        borderColor: '#DDDDDD',
        backgroundColor: '#fff',
    },
});
