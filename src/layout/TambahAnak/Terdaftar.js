import { ScrollView, Text, View, StyleSheet, Dimensions, TouchableOpacity, ToastAndroid, TextInput } from 'react-native'
import React, { Component } from 'react'
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Picker } from '@react-native-picker/picker';

export class Terdaftar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tingkat: '',
            kelas: '',
            kel: '',
            namasek: '',
            alamatsek: '',
            semester: '',
            sem: '',
            jurusan: '',
            totalSteps: "",
            currentStep: "",
            tamak: this.props.route.params.item,
        };
    }

    render() {
        const tamak = this.state.tamak
        const { currentStep, totalSteps } = this.state;
        var tingkat = [
            { label: 'Belum SD', value: 'Belum SD' },
            { label: 'SD', value: 'SD' },
            { label: 'SMP', value: 'SMP' },
            { label: 'SMA', value: 'SMA' },
            { label: 'Perguruan Tinggi', value: 'Perguruan Tinggi' },
        ];
        return (
            <ScrollView style={{ backgroundColor: '#fff' }}>
                <View style={{ backgroundColor: '#00A9B8' }}>
                    <Text style={style.title1}>Tambah Anak Binaan</Text>
                </View>
                <Text
                    style={style.currentStepText}
                >{`Tahap 2`}</Text>
                <View>
                    <Text style={style.Label1}>Jenjang Pendidikan</Text>
                    <RadioForm
                        radio_props={tingkat}
                        onPress={(value) => { this.setState({ tingkat: value }), ToastAndroid.show(value.toString(), ToastAndroid.SHORT) }}
                        initial={-1}
                        buttonSize={10}
                        buttonOuterSize={20}
                        animation={true}
                        formHorizontal={false}
                        style={{ flexDirection: 'column', marginLeft: 15, marginTop: 10 }}
                    >
                    </RadioForm>

                </View>
                {this.state.tingkat === 'SD' ?
                    <View style={{
                        width: '90%',
                        height: 300,
                        borderRadius: 10,
                        borderWidth: 1,
                        marginLeft: 20,
                        marginTop: 10,
                        borderColor: '#E9E9E9',
                        backgroundColor: '#fff',
                        flexDirection: 'column',
                        justifyContent: 'space-around'
                    }}>
                        <Text style={{
                            marginBottom: -10,
                            marginLeft: 25,
                            color: '#000',
                        }}>Kelas</Text>
                        <Picker style={style.Textinputcss} mode="dropdown"
                            selectedValue={this.state.kelas}
                            onValueChange={(itemValue) => {
                                this.setState({
                                    kelas: itemValue
                                })
                            }}>
                            <Picker.Item style={{ fontSize: 12 }} label={'Pilih Kelas'} value={'0'} key={'0'} />
                            <Picker.Item label="1" value="1" />
                            <Picker.Item label="2" value="2" />
                            <Picker.Item label="3" value="3" />
                            <Picker.Item label="4" value="4" />
                            <Picker.Item label="5" value="5" />
                            <Picker.Item label="6" value="6" />

                        </Picker>

                        <View>
                            <Text style={style.Label1}>Nama Sekolah</Text>
                            <TextInput
                                style={style.kotak3}
                                onChangeText={namasek => this.setState({ namasek })}
                                value={this.state.namasek}
                                keyboardType='default'
                                placeholder="Nama Sekolah"
                                placeholderTextColor='#7e7e7e'
                            />
                        </View>

                        <View>
                            <Text style={style.Label1}>Alamat Sekolah</Text>
                            <View style={style.infoContainer} >
                                <TextInput style={style.txtDesc} placeholder="Alamat Lengkap"
                                    placeholderTextColor='#A9A9A9'
                                    keyboardType="email-address"
                                    value={this.state.alamatsek}
                                    onChangeText={alamatsek => this.setState({ alamatsek })}
                                    multiline={true}
                                    numberOfLines={5}
                                    autoCorrect={false}>
                                </TextInput>
                            </View>
                        </View>

                    </View>

                    : this.state.tingkat === 'SMP' ?
                        <View style={{
                            width: '90%',
                            height: 300,
                            borderRadius: 10,
                            borderWidth: 1,
                            marginLeft: 20,
                            marginTop: 10,
                            borderColor: '#E9E9E9',
                            backgroundColor: '#fff',
                            flexDirection: 'column',
                            justifyContent: 'space-around'
                        }}>
                            <Text style={{
                                marginBottom: -10,
                                marginLeft: 25,
                                color: '#000',
                            }}>Kelas</Text>
                            <Picker style={style.Textinputcss} mode="dropdown"
                                selectedValue={this.state.kelas}
                                onValueChange={(itemValue) => {
                                    this.setState({
                                        kel: itemValue
                                    })
                                }}>
                                <Picker.Item style={{ fontSize: 12 }} label={'Pilih Kelas'} value={'0'} key={'0'} />
                                <Picker.Item label="7" value="7" />
                                <Picker.Item label="8" value="8" />
                                <Picker.Item label="9" value="9" />
                            </Picker>

                            <View>
                                <Text style={style.Label1}>Nama Sekolah</Text>
                                <TextInput
                                    style={style.kotak3}
                                    onChangeText={namasek => this.setState({ namasek })}
                                    value={this.state.namasek}
                                    keyboardType='default'
                                    placeholder="Nama Sekolah"
                                    placeholderTextColor='#7e7e7e'
                                />
                            </View>

                            <View>
                                <Text style={style.Label1}>Alamat Sekolah</Text>
                                <View style={style.infoContainer} >
                                    <TextInput style={style.txtDesc} placeholder="Alamat Lengkap"
                                        placeholderTextColor='#A9A9A9'
                                        keyboardType="email-address"
                                        value={this.state.alamatsek}
                                        onChangeText={alamatsek => this.setState({ alamatsek })}
                                        multiline={true}
                                        numberOfLines={5}
                                        autoCorrect={false}>
                                    </TextInput>
                                </View>
                            </View>

                        </View>
                        : this.state.tingkat === 'SMA' ?
                            <View style={{
                                width: '90%',
                                height: 300,
                                borderRadius: 10,
                                borderWidth: 1,
                                marginLeft: 20,
                                marginTop: 10,
                                borderColor: '#E9E9E9',
                                backgroundColor: '#fff',
                                flexDirection: 'column',
                                justifyContent: 'space-around'
                            }}>
                                <Text style={{
                                    marginBottom: -10,
                                    marginLeft: 25,
                                    color: '#000',
                                }}>Kelas</Text>
                                <Picker style={style.Textinputcss} mode="dropdown"
                                    selectedValue={this.state.kelas}
                                    onValueChange={(itemValue) => {
                                        this.setState({
                                            kel: itemValue
                                        })
                                    }}>
                                    <Picker.Item style={{ fontSize: 12 }} label={'Pilih Kelas'} value={'0'} key={'0'} />
                                    <Picker.Item label="10" value="10" />
                                    <Picker.Item label="11" value="11" />
                                    <Picker.Item label="12" value="12" />
                                </Picker>
                                <View>
                                    <Text style={style.Label1}>Nama Sekolah</Text>
                                    <TextInput
                                        style={style.kotak3}
                                        onChangeText={namasek => this.setState({ namasek })}
                                        value={this.state.namasek}
                                        keyboardType='default'
                                        placeholder="Nama Sekolah"
                                        placeholderTextColor='#7e7e7e'
                                    />
                                </View>
                                <View>
                                    <Text style={style.Label1}>Alamat Sekolah</Text>
                                    <View style={style.infoContainer} >
                                        <TextInput style={style.txtDesc} placeholder="Alamat Lengkap"
                                            placeholderTextColor='#A9A9A9'
                                            keyboardType="email-address"
                                            value={this.state.alamatsek}
                                            onChangeText={alamatsek => this.setState({ alamatsek })}
                                            multiline={true}
                                            numberOfLines={5}
                                            autoCorrect={false}>
                                        </TextInput>
                                    </View>
                                </View>


                            </View>
                            : this.state.tingkat === 'Perguruan Tinggi' ?
                                <View style={{
                                    width: '90%',
                                    height: 380,
                                    borderRadius: 10,
                                    borderWidth: 1,
                                    marginLeft: 20,
                                    marginTop: 10,
                                    borderColor: '#E9E9E9',
                                    backgroundColor: '#fff',
                                    flexDirection: 'column',
                                    justifyContent: 'space-around'
                                }}>
                                    <View>
                                        <Text style={style.Label1}>Jurusan</Text>
                                        <TextInput
                                            style={style.kotak3}
                                            onChangeText={jurusan => this.setState({ jurusan })}
                                            value={this.state.jurusan}
                                            keyboardType='default'
                                            placeholder="Jurusan"
                                            placeholderTextColor='#7e7e7e'
                                        />
                                    </View>
                                    <Text style={{
                                        marginBottom: -10,
                                        marginLeft: 25,
                                        color: '#000',
                                    }}>Tingkat</Text>
                                    <Picker style={style.Textinputcss} mode="dropdown"
                                        selectedValue={this.state.semester}
                                        onValueChange={(itemValue) => {
                                            this.setState({
                                                semester: itemValue
                                            })
                                        }}>
                                        <Picker.Item style={{ fontSize: 12 }} label={'Pilih Semester'} value={'0'} key={'0'} />
                                        <Picker.Item label="Semester 1" value="Semester 1" />
                                        <Picker.Item label="Semester 2" value="Semester 2" />
                                        <Picker.Item label="Semester 3" value="Semester 3" />
                                        <Picker.Item label="Semester 4" value="Semester 4" />
                                        <Picker.Item label="Semester 5" value="Semester 5" />
                                        <Picker.Item label="Semester 6" value="Semester 6" />
                                        <Picker.Item label="Semester 7" value="Semester 7" />
                                        <Picker.Item label="Semester 8" value="Semester 8" />
                                        <Picker.Item label="Semester 9" value="Semester 9" />
                                        <Picker.Item label="Semester 10" value="Semester 10" />

                                    </Picker>
                                    <View>
                                        <Text style={style.Label1}>Nama Sekolah</Text>
                                        <TextInput
                                            style={style.kotak3}
                                            onChangeText={namasek => this.setState({ namasek })}
                                            value={this.state.namasek}
                                            keyboardType='default'
                                            placeholder="Nama Sekolah"
                                            placeholderTextColor='#7e7e7e'
                                        />
                                    </View>

                                    <View>
                                        <Text style={style.Label1}>Alamat Sekolah</Text>
                                        <View style={style.infoContainer} >
                                            <TextInput style={style.txtDesc} placeholder="Alamat Lengkap"
                                                placeholderTextColor='#A9A9A9'
                                                keyboardType="email-address"
                                                value={this.state.alamatsek}
                                                onChangeText={alamatsek => this.setState({ alamatsek })}
                                                multiline={true}
                                                numberOfLines={5}
                                                autoCorrect={false}>
                                            </TextInput>
                                        </View>
                                    </View>

                                </View>
                                :
                                <View></View>
                }
                <TouchableOpacity style={style.btnSimpanDark}
                    onPress={() => this.props.navigation.replace('Terdaftar1',
                        {
                            tamak: this.state.tamak, tingkat: this.state.tingkat,
                            jurusan: this.state.jurusan,
                            kelas: this.state.kelas,
                            namasek: this.state.namasek,
                            alamatsek: this.state.alamatsek,
                            semester: this.state.semester,
                        })}>
                    <Text>Lanjutkan</Text>
                </TouchableOpacity>
            </ScrollView>
        )
    }
}

export default Terdaftar
const style = StyleSheet.create({
    contentContainer: {
    },
    Label1: {
        marginTop: 5,
        marginLeft: 25,
        marginBottom: 5,
        color: '#000',
    },
    Textinputcss: {
        color: '#7e7e7e',
        marginLeft: 10,
        marginRight: 10,
        borderRadius: 10,
        borderWidth: 1,
        fontSize: 12,
        height: 52,
        backgroundColor: '#fff',
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
    Label2: {
        marginTop: 5,
        marginLeft: 25,
        padding: 5,
        color: '#000',
        alignItems: 'center',
        justifyContent: 'center'
    },
    kotak2: {
        color: '#000000',
        marginTop: 10,
        marginLeft: 30,
        marginRight: 10,
        borderRadius: 2,
        borderWidth: 0.1,
        fontSize: 12,
        height: 52,
        backgroundColor: '#F0F8FF',
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
    Labeltgl: {
        marginTop: 5,
        position: 'absolute',
        top: 0, left: 10, right: 0, bottom: 0,
        height: 25, width: 25,
    },
    item: {
        flex: 1,
        fontSize: 16,
        flexDirection: 'row',
        backgroundColor: '#fff',
        padding: 17,
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
    container: {
        marginTop: 40,
        marginLeft: 75,
        width: 250,
        height: 250,
        flex: 1,
        margin: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
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
    },
    coltom1: {
        width: '90%',
        marginLeft: 20,
        justifyContent: 'space-between',
        alignItems: 'center',
        alignContent: 'center',
        fontSize: 16,
        flexDirection: 'row',
        paddingTop: 10,
        paddingBottom: 10,
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
    itemflat: {
        fontSize: 16,
        flexDirection: 'column',
        backgroundColor: '#fff',
        padding: 20,
        height: 75,
        shadowColor: "#333",
        shadowOffset: {
            width: 1,
            height: 1,
        },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        borderColor: '#7e7e7e',
        elevation: 1,
    },
    ModalCont2: {
        flex: 1,
        backgroundColor: '#00000079',
    },
    wrap: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height * 0.25 // 25% window
    },
    itemText: {
        textAlign: 'justify',
        marginLeft: 10,
        fontSize: 12,
        width: '35%',
        height: 43,
    },
    kotak3: {
        color: '#000000',
        marginTop: 2,
        marginLeft: 20,
        marginRight: 10,
        borderRadius: 2,
        borderWidth: 0.1,
        fontSize: 12,
        height: 40,
        width: '90%',
        backgroundColor: '#F0F8FF',
    },
    btnSimpanDark: {
        flexDirection: 'row',
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
        width: 150, height: 50,
        backgroundColor: '#87cefa',
        borderRadius: 10,
        padding: 10,
        marginTop: 10,
        borderWidth: 1,
        borderColor: '#E9E9E9',
        justifyContent: 'center', alignContent: 'center',
        marginLeft: 120,
        fontSize: 12,
    },
    currentStepText: {
        color: "#7e7e7e",
        fontSize: 12
    },
    infoContainer: {
        width: '90%',
        marginLeft: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        borderWidth: 1,
        height: 70,
        borderColor: '#E9E9E9',
        backgroundColor: '#F0F8FF',

    },
});