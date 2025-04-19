import {
    ScrollView, Text, View, StyleSheet, TouchableOpacity, Dimensions,
    TextInput, Button, Modal, SafeAreaView, Image
} from 'react-native'
import React, { Component } from 'react'
import DateTimePicker from 'react-native-modal-datetime-picker';
import { x, date } from '../../assets/images'
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import { Camera, Markers, Date } from '../../assets/icons'
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'react-native-image-picker';
import DocumentPicker from "react-native-document-picker"

export class Third1 extends Component {
    constructor(props) {
        super(props)
        this.state = {
            file: {
                name: '',
                type: '',
                uri: '',
                size: '',
            },
            nikanak: '',
            anak: '',
            saudara: '',
            panggilan: '',
            namaanak: '',
            agama: '',
            tempatlahir: '',
            chosenDate: '',
            jenis: [],
            gender: '',
            tinggal: [],
            sm: '',
            YT: [],
            so: this.props.route.params.so,
            Binaan: [],
            bina: '',
            hobi: '',
            tahfidz: [],
            bacaan: '',
            pres: '',
            jarak: '',
            trans: [],
            kendaraan: '',
            totalSteps: "",
            currentStep: "",
            date: new Date(),
            modaldate: false,
            show: false,
            isVisible: false,
        }
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
    //     saveState({ data: "" });
    //     next();
    // };
    async docPicker() {
        // Pick a single file
        try {
            const res = await DocumentPicker.pick({
                type: [DocumentPicker.types.allFiles],
            });
            const source = {
                uri: res[0].uri,
                type: res[0].type,
                name: res[0].name,
                size: res[0].size,
            };
            this.setState({
                file: source,
            });
            console.log('ini file', this.state.file);//here you can call your API and send the data to that API
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                console.log("error -----", err);
            } else {
                throw err;
            }
        }
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
                    compressImageQuality: 0.5,
                    storageOptions: {
                        skipBackup: false,
                        path: 'images',
                    },
                },
                (response) => {
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
                            }
                            //   id: 0,
                        };
                        console.log('ini gambar = ', source);
                        this.setState(prevState => {
                            prevState.taimage[index] = source
                            //   prevState.tgl_lahir[index] != this.props.route.params.tgl_lahir[index] ? this.setState({tglmbuh : true}) : this.setState({tglmbuh : false});
                            return {
                                taimage: prevState.taimage
                            }
                        }, () => console.log(this.state.taimage));
                        this.setState({
                            totol: index,
                            tot: index,
                        });
                        console.log('ini gambar = ', this.state.taimage);
                    }
                },
            );
        }
    }
    handlePicker = (date) => {
        this.setState({ isVisible: false, chosenDate: moment(date).format('DD-MM-YYYY') }, console.log(chosenDate))
    }
    hidePicker = () => {
        this.setState({
            isVisible: false,

        })
    }
    showPicker = () => {
        this.setState({ isVisible: true })
    }
    render() {
        const onChange = (event, selectedDate) => {
            const currentDate = selectedDate;
            setShow(false);
            setDate(currentDate);
        };

        const showMode = (currentMode) => {
            setShow(true);
            setMode(currentMode);
        };

        const showDatepicker = () => {
            showMode('date');
        };

        const showTimepicker = () => {
            showMode('time');
        };

        const { currentStep, totalSteps } = this.state;
        // const sm = [
        //     this.state.so === 'YT' ?
        //         label: "Tinggal bersama Wali", value: "TBW"

        //     },
        //     {
        //         label: "Tinggal bersama Ayah", value: "TBA"
        //     },
        //     {
        //         label: "Tinggal bersama Ibu", value: "TBI"
        //     }
        // ]
        const sm = this.state.so === 'Yatim_Piatu' ?
            [
                { label: 'Tinggal Bersama Wali', value: 'TBW', index: '0' }
            ] :
            [
                { label: 'Tinggal Bersama Ayah', value: 'TBA', index: '1' },
                { label: 'Tinggal Bersama Ibu', value: 'TBI', index: '2' }
            ]

        const bina = this.state.so === 'ND' ?
            [
                { label: 'Calon Non-Penerima Beasiswa (CPB)', value: 'CPB', index: '0' }
            ] :
            [
                { label: 'Calon Non-Penerima Beasiswa (CPB)', value: 'CPB', index: '0' },
                { label: 'Bakal Calon Penerima Beasiswa(BCPB)', value: 'BCPB', index: '1' },
            ]

        const so = [
            { label: 'Yatim Piatu', value: 'YT' }
        ];

        return (
            <ScrollView style={{ backgroundColor: '#fff' }}>
                <Text style={style.Label2}>Informasi Anak</Text>
                <View style={{ height: '100%', alignContent: 'center', alignSelf: 'center' }}>

                    <TextInput
                        style={style.kotak3}
                        onChangeText={nikanak => this.setState({ nikanak })}
                        value={this.state.nikanak}
                        placeholder="NIK"
                        placeholderTextColor="#C0C0C0"
                    />
                    <TextInput
                        style={style.kotak3}
                        onChangeText={namaanak => this.setState({ namaanak })}
                        value={this.state.namaanak}
                        placeholder="Nama Lengkap"
                        placeholderTextColor="#C0C0C0"
                    />
                    <TextInput
                        style={style.kotak3}
                        onChangeText={panggilan => this.setState({ panggilan })}
                        value={this.state.panggilan}
                        placeholder="Nama Panggilan"
                        placeholderTextColor="#C0C0C0"
                    />
                    <View style={style.kotakpicker}>
                        <Picker
                            style={style.Textinputcss}
                            selectedValue={this.state.agama}
                            onValueChange={itemValue =>
                                this.setState({ agama: itemValue, show: 1 })
                            }>
                            <Picker.Item
                                style={{ fontSize: 14, fontFamily: 'Poppins-Regular' }}
                                label="Agama" s
                                value=""
                            />
                            <Picker.Item
                                style={{ fontSize: 14, fontFamily: 'Poppins-Regular' }}
                                label="Islam"
                                value="Islam"
                            />
                            <Picker.Item
                                style={{ fontSize: 14, fontFamily: 'Poppins-Regular' }}
                                label="Kristen"
                                value="Kristen"
                            />
                            <Picker.Item
                                style={{ fontSize: 14, fontFamily: 'Poppins-Regular' }}
                                label="Hindu"
                                value="Hindu"
                            />
                            <Picker.Item
                                style={{ fontSize: 14, fontFamily: 'Poppins-Regular' }}
                                label="Budha"
                                value="Budha"
                            />
                        </Picker>
                    </View>
                    <TextInput
                        style={style.kotak3}
                        onChangeText={tempatlahir => this.setState({ tempatlahir })}
                        value={this.state.tempatlahir}
                        placeholder="Tempat Lahir"
                        placeholderTextColor="#C0C0C0"
                    />
                    <View style={{ flexDirection: 'row' }}>
                        <TextInput
                            style={style.kotak7}
                            onChangeText={chosenDate => this.setState({ chosenDate })}
                            value={this.state.chosenDate}
                            placeholder="Tanggal Lahir"
                            placeholderTextColor="#C0C0C0"
                        />
                        <View
                            style={{
                                borderColor: '#DDD',
                                borderWidth: 1,
                                height: 50,
                                width: 50,
                                borderRadius: 10,
                                top: 10,
                                marginLeft: 10,

                            }}>
                            <TouchableOpacity TouchableOpacity onPress={this.showPicker}>
                                <View style={{ height: 50, width: 50, justifyContent: 'center', alignItems: 'center', borderRadius: 10, }}>
                                    <Date />
                                </View>
                            </TouchableOpacity>
                        </View>
                        <DateTimePicker
                            isVisible={this.state.isVisible}
                            onConfirm={this.handlePicker}
                            onCancel={this.hidePicker}
                            mode={'date'}
                            is24Hour={true}
                        />
                    </View>

                    <View
                        style={style.kotakpicker}>
                        <Picker
                            style={style.Textinputcss}
                            selectedValue={this.state.JKanak}
                            onValueChange={itemValue =>
                                this.setState({ JK: itemValue, show: 1 })
                            }>
                            <Picker.Item
                                style={{ fontSize: 14, fontFamily: 'Poppins-Regular' }}
                                label="Jenis Kelamin"
                                value=""
                            />
                            <Picker.Item
                                style={{ fontSize: 14, fontFamily: 'Poppins-Regular' }}
                                label="Laki-Laki"
                                value="Laki-Laki"
                            />
                            <Picker.Item
                                style={{ fontSize: 14, fontFamily: 'Poppins-Regular' }}
                                label="Perempuan"
                                value="Perempuan"
                            />
                        </Picker>
                    </View>

                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ color: '#000', fontSize: 16, fontFamily: 'Poppins-Regular' }}> Anak ke</Text>
                        <TextInput
                            style={style.kotak6}
                            onChangeText={anak => this.setState({ anak })}
                            value={this.state.anak}
                            placeholder="Anak ke"
                            placeholderTextColor="#C0C0C0"
                        />
                        <Text style={{ color: '#000', color: '#000', fontSize: 16, fontFamily: 'Poppins-Regular' }}> dari</Text>
                        <TextInput
                            style={style.kotak6}
                            onChangeText={saudara => this.setState({ saudara })}
                            value={this.state.saudara}
                            placeholder="Saudara"
                            placeholderTextColor="#C0C0C0"
                        />
                    </View>
                    <View
                        style={style.kotakpicker}>
                        <Picker
                            style={style.Textinputcss}
                            selectedValue={this.state.TB}
                            onValueChange={itemValue =>
                                this.setState({ TB: itemValue, show: 1 })
                            }>
                            <Picker.Item
                                style={{ fontSize: 14, fontFamily: 'Poppins-Regular' }}
                                label="Tinggal Bersama"
                                value=""
                            />
                            {sm.map(({ label, value, index }) => (
                                <Picker.Item style={{ fontSize: 14, fontFamily: 'Poppins-Regular' }} label={label} value={value} key={index} />
                            ))}
                        </Picker>
                    </View>


                    <TextInput
                        style={style.kotak3}
                        onChangeText={pelfa => this.setState({ pelfa })}
                        value={this.state.pelfa}
                        placeholder="Pelajaran Favorit"
                        placeholderTextColor="#C0C0C0"
                    />
                    <TextInput
                        style={style.kotak3}
                        onChangeText={hobi => this.setState({ hobi })}
                        value={this.state.hobi}
                        placeholder="Hobi"
                        placeholderTextColor="#C0C0C0"
                    />
                    <View
                        style={style.kotakpicker}>
                        <Picker
                            style={style.Textinputcss}
                            selectedValue={this.state.JB}
                            onValueChange={itemValue =>
                                this.setState({ JB: itemValue, show: 0 })
                            }>
                            <Picker.Item
                                style={{ fontSize: 14, fontFamily: 'Poppins-Regular' }}
                                label="Jenis Binaan"
                                value=""
                            />
                            {bina.map(({ label, value, index }) => (
                                <Picker.Item style={{ fontSize: 14, fontFamily: 'Poppins-Regular' }} label={label} value={value} key={index} />
                            ))}
                        </Picker>


                    </View>

                    <View style={style.kotakpicker}>
                        <Picker
                            style={style.Textinputcss}
                            selectedValue={this.state.jenis_anak_binaan}
                            onValueChange={itemValue =>
                                this.setState({ jenis_anak_binaan: itemValue, show: 1 })
                            }>
                            <Picker.Item style={{ fontSize: 12 }} label={'Jenis Tahfidz'} value={'0'} key={'0'} />
                            <Picker.Item label=" Tahfidz" value="Tahfidz" />
                            <Picker.Item label="Non-Tahfidz" value="Non-Tahfidz" />
                        </Picker>
                    </View>
                    <Text style={{ color: '#000', color: '#000', fontSize: 16, fontFamily: 'Poppins-Regular', marginTop: 10 }}>Foto Anak</Text>

                    <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 20 }}>
                        <TouchableOpacity onPress={() => { this.takePicAnak() }} style={{
                            width: '90%',
                            backgroundColor: '#ffffff',
                            borderRadius: 5,
                            marginTop: 5,
                            paddingTop: 40,
                            paddingBottom: 40,
                            paddingLeft: 30,
                            paddingRight: 30,
                            borderWidth: 0.5,
                            borderColor: '#E9E9E9',
                            justifyContent: 'center', alignItems: 'center'
                        }}>
                            <Image source={this.state.anakfoto} style={{ width: 150, height: 150 }} />
                            <Camera style={style.imgSmall} />

                            {this.state.anakfoto === null ?
                                <View>

                                </View>
                                : <View><Text style={{ backgroundColor: '#00A9B8', borderRadius: 10, padding: 10, color: '#fff', marginTop: 10, }}>Masukan Foto Anak</Text></View>}
                        </TouchableOpacity>
                    </View>

                </View>

                <TouchableOpacity style={style.nextbuttonTextStyle} onPress={() =>
                    // this.state.anak === '' ? alert('Tolong ada kolom yang belum terisi') :
                    //     this.state.dari === '' ? alert('Tolong ada kolom yang belum terisi') :
                    //         this.state.bina === '' ? alert('Tolong ada kolom yang belum terisi') :
                    //             this.state.jarak === '' ? alert('Tolong ada kolom yang belum terisi') :
                    //                 this.state.nickname === '' ? alert('Tolong ada kolom yang belum terisi') :
                    //                     this.state.full === '' ? alert('Tolong ada kolom yang belum terisi') :
                    //                         this.state.ag === '' ? alert('Tolong ada kolom yang belum terisi') :
                    //                             this.state.lahir === '' ? alert('Tolong ada kolom yang belum terisi') :
                    //                                 this.state.sm === '' ? alert('Tolong ada kolom yang belum terisi') :
                    //                                     this.state.tglahir === '' ? alert('Tolong ada kolom yang belum terisi') :
                    //                                         this.state.gender === '' ? alert('Tolong ada kolom yang belum terisi') :
                    //                                             this.state.kendaraan === '' ? alert('Tolong ada kolom yang belum terisi') :
                    this.props.navigation.replace('Four', {
                        kelas: this.state.kelas,
                        namasek: this.state.namasek,
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
                    })} >
                    <Text>Lanjutkan</Text>
                </TouchableOpacity>
            </ScrollView >
        )
    }
}

export default Third1
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
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