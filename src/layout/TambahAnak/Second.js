import { ScrollView, Text, View, StyleSheet, Dimensions, TouchableOpacity, ToastAndroid, TextInput } from 'react-native'
import React, { Component } from 'react'
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Picker } from '@react-native-picker/picker';

export class Second extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tingkat: '',
            kelas: '',
            namasek: '',
            alamatsek: '',
            semester: '',
            jurusan: '',
            kel: '',
            sem: '',
            totalSteps: "",
            currentStep: ""
        };
    }
    // static getDerivedStateFromProps = props => {
    //     const { getTotalSteps, getCurrentStep } = props;
    //     return {
    //         totalSteps: getTotalSteps(),
    //         currentStep: getCurrentStep()
    //     };
    // };

    // nextStep = () => {
    //     const { next, saveState } = this.props;
    //     saveState({ tingkat: "" });
    //     next();
    // };
    render() {
        const { currentStep, totalSteps } = this.state;
        var tingkat = [
            { label: 'Belum Sekolah', value: 'Belum Sekolah' },
            { label: 'SD', value: 'SD' },
            { label: 'SMP', value: 'SMP' },
            { label: 'SMA', value: 'SMA' },
            { label: 'Perguruan Tinggi', value: 'Perguruan_Tinggi' },
        ];
        return (
            <ScrollView style={{ flex: 1, backgroundColor: '#fff' }}>
                <Text style={style.Label2}>Jenjang Pendidikan </Text>
                <RadioForm
                    radio_props={tingkat}
                    onPress={(value) => {
                        this.setState({ tingkat: value }),
                            ToastAndroid.show(value.toString(), ToastAndroid.SHORT)
                    }}
                    initial={-1}
                    buttonSize={10}
                    buttonOuterSize={20}
                    animation={true}
                    formHorizontal={false}
                    style={{ flexDirection: 'column', marginLeft: 15, marginTop: 10 }}
                >
                </RadioForm>
                <View style={{ alignContent: 'center', alignSelf: 'center' }}>


                    {this.state.tingkat === 'SD' ?
                        <View >
                            <Text>Kelas</Text>
                            <View style={style.kotakpicker}>
                                <Picker style={style.Textinputcss} mode="dropdown"
                                    selectedValue={this.state.kelas}
                                    onValueChange={(itemValue) => {
                                        this.setState({
                                            kelas: itemValue
                                        })
                                    }}>
                                    <Picker.Item style={{ fontSize: 12 }} label={'Pilih Kelas'} value={'0'} key={'0'} />
                                    <Picker.Item label="I" value="I" />
                                    <Picker.Item label="II" value="II" />
                                    <Picker.Item label="III" value="III" />
                                    <Picker.Item label="IV" value="IV" />
                                    <Picker.Item label="V" value="V" />
                                    <Picker.Item label="VI" value="VI" />

                                </Picker>
                            </View>
                            <View>
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
                            <View>
                                <View style={style.kotakpicker}>
                                    <Picker style={style.Textinputcss} mode="dropdown"
                                        selectedValue={this.state.kelas}
                                        onValueChange={(itemValue) => {
                                            this.setState({
                                                kelas: itemValue
                                            })
                                        }}>
                                        <Picker.Item style={{ fontSize: 12 }} label={'Pilih Kelas'} value={'0'} key={'0'} />
                                        <Picker.Item label="VII" value="VII" />
                                        <Picker.Item label="VIII" value="VIII" />
                                        <Picker.Item label="IX" value="IX" />
                                    </Picker>
                                </View>
                                <View>
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
                                <View>
                                    <View style={style.kotakpicker}>
                                        <Picker style={style.Textinputcss} mode="dropdown"
                                            selectedValue={this.state.kelas}
                                            onValueChange={(itemValue) => {
                                                this.setState({
                                                    kelas: itemValue
                                                })
                                            }}>
                                            <Picker.Item style={{ fontSize: 12 }} label={'Pilih Kelas'} value={'0'} key={'0'} />
                                            <Picker.Item label="X" value="X" />
                                            <Picker.Item label="XI" value="XI" />
                                            <Picker.Item label="XII" value="XII" />
                                        </Picker>
                                    </View>

                                    <View>
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
                                : this.state.tingkat === 'Perguruan_Tinggi' ?
                                    <View >
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
                                        <View style={style.kotakpicker}>
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
                                        </View>
                                        <View>
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


                    <TouchableOpacity style={style.nextbuttonTextStyle} onPress={() => this.props.navigation.navigate('Third',
                        {
                            kelas: this.state.kelas,
                            namasek: this.state.namasek,
                            tingkat:this.state.tingkat,
                            alamatsek: this.state.alamatsek,
                            semester: this.state.semester,
                            jurusan: this.state.jurusan,
                            kepala: this.props.route.params.kepala,
                            KK: this.props.route.params.KK,
                            cabang: this.props.route.params.cabang,
                            binaan: this.props.route.params.binaan,
                            shel: this.props.route.params.shel,
                            SOT: this.props.route.params.SOT,
                            namabank: this.props.route.params.namabank,
                            norek: this.props.route.params.norek,
                            an_rek: this.props.route.params.an_rek,
                            nohp: this.props.route.params.nohp,
                            an_hp: this.props.route.params.an_hp,
                            notelp: this.props.route.params.notelp,
                            surket: this.props.route.params.surket,
                            sktm: this.props.route.params.sktm,
                        })}>
                        <Text style={{ justifyContent: 'center', textAlign: 'center', color: '#fff' }}>Lanjutkan</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        )
    }
}

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
export default Second
const style = StyleSheet.create({
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    header: {
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        width: windowWidth * 0.95,
        height: windowHeight * 0.29,
        flexDirection: 'row',
    },
    header2: {
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        width: windowWidth * 0.6,
        height: windowHeight * 0.3,
        flexDirection: 'row',
    },
    contentContainer: {
        backgroundColor: '#fff',
        width: '100%',
        height: '100%',
        flex: 1,
    }, // vildan menghapus flex dan menambahkan backgroundCOlor,width dan hight
    colnilai: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    Label2: {
        marginTop: -5,
        fontSize: 16,
        marginTop: 10,
        marginLeft: 10,
        width: '100%',
        color: '#000',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Poppins-Medium',
    },
    Label3: {
        marginTop: 10,
        fontSize: 16,
        width: '100%',
        color: '#000',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Poppins-Medium',
    },
    Label3: {
        marginTop: 15,
        fontSize: 16,
        width: '100%',
        color: '#000',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Poppins-Medium',
    },
    title2: {
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginRight: 20,
        fontSize: 15,
        color: '#000',
        fontFamily: 'Poppins-SemiBold',
    },
    Textinputcss: {
        color: '#C0C0C0',
        marginTop: -10,
        borderRadius: 10,
        borderWidth: 1,
        fontSize: 10,
        height: 40,
        borderColor: '#C0C0C0',
        fontFamily: 'Poppins-Regular',
    },
    Textinputcss2: {
        color: '#C0C0C0',
        marginTop: 10,
        left: 2,
        marginLeft: 10,
        borderRadius: 10,
        borderWidth: 1,
        fontSize: 10,
        height: 30,
        width: windowWidth - 240,
        borderColor: '#C0C0C0',
        fontFamily: 'Poppins-Regular',
    },
    kotak3: {
        marginTop: 10,
        color: '#000',
        borderRadius: 10,
        borderWidth: 0.1,
        fontSize: 13,
        height: 50,
        width: windowWidth - 40,
        padding: 12,
        backgroundColor: '#fff',
        borderColor: '#DDDDDD',
        borderWidth: 1,
        fontFamily: 'Poppins-Regular',
    },
    kotak4: {
        marginTop: 10,
        color: '#000',
        borderRadius: 10,
        borderWidth: 0.1,
        fontSize: 13,
        height: 50,
        width: windowWidth - 123,
        padding: 12,
        backgroundColor: '#fff',
        borderColor: '#DDDDDD',
        borderWidth: 1,
        fontFamily: 'Poppins-Regular',
    },
    kotak7: {
        marginTop: 10,
        color: "#C0C0C0",
        borderRadius: 10,
        borderWidth: 0.1,
        fontSize: 13,
        height: 50,
        width: windowWidth - 130,
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
        width: windowWidth - 40,
        backgroundColor: '#fff',
        borderColor: '#DDDDDD',
        borderWidth: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        padding: 12,
        fontFamily: 'Poppins-Regular',
        textAlignVertical: 'top'
    },
    kotak6: {
        marginTop: 10,
        color: '#000',
        borderRadius: 10,
        marginHorizontal: 10,
        borderWidth: 0.1,
        fontSize: 14,
        height: 50,
        width: 83,
        backgroundColor: '#fff',
        borderColor: '#DDDDDD',
        borderWidth: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        padding: 12,
        fontFamily: 'Poppins-Regular',
        textAlignVertical: 'top'
    },
    kotakpicker: {
        marginTop: 10,
        paddingVertical: 5,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#DDD',
        width: windowWidth - 20,
    },
    infoContainer: {
        width: '100%',
        marginTop: 10,
        borderRadius: 10,
        borderWidth: 1,
        height: 70,
        borderColor: '#DDDDDD',
        backgroundColor: '#fff',
    },
    ModalCont2: {
        flex: 1,
        backgroundColor: '#00000079',
    },
    imgSmall: {
        position: 'absolute', flex: 1, alignItems: 'center', justifyContent: 'center'
    },
    nextbuttonTextStyle: {
        backgroundColor: '#00A9B8',
        height: 50,
        width: 130,
        marginTop: 10,
        borderRadius: 12,
        color: 'white',
        justifyContent: 'center',
        alignContent: 'center',
        alignSelf: 'center',
        paddingHorizontal: 25,
        paddingVertical: 13,
        fontFamily: 'Poppins-SemiMedium',
        fontSize: 15,
    },
});
