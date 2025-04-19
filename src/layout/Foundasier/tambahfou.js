import { Text, View, StyleSheet, TextInput, TouchableOpacity,Platform,Button} from 'react-native'
import React, { Component } from 'react'
import DocumentPicker from "react-native-document-picker"
import DateTimePicker from '@react-native-community/datetimepicker';
import DatePicker from 'react-native-datepicker';
import { Picker } from '@react-native-picker/picker';


export class tambahfou extends Component {
    constructor(props) {
        super(props)
        this.state = {
            file: {
                name: '',
                type: '',
                uri: '',
                size: '',
            },
            text: '',
            dana: '',
            deskripsi: '',
            date: new Date('2022-juni-10'),
            mode: 'date',
            show: false,
            date1: '',
            date2: '',
            kota: [],
            prov: [],
            pro: '',
            cat: [],
            nama: [],
            kot: '',

        }
    }
    setDate = (event, date) => {
        date = date || this.state.state
        this.setState({
            show: Platform.OS === 'ios' ? true : false,
            date,
        });
    }
    show = mode => {
        this.setState({
            show: true,
            mode,
        });
    }
    datepicker = () => {
        this.show('date');

    }
    timepicker = () => {
        this.show('time');

    }
    GetprovAPi() {
        fetch('https://berbagibahagia.org/api/getprov').then(res => {
            if (res.status === 200)
                return res.json()
        }).then(resdata => {
            console.log(resdata.data)
            this.setState({
                prov: resdata.data

            })
        })
    }
    componentDidMount() {
        this.GetcatAPi();
        this.GetkotaAPi();
        this.GetprovAPi();
    }
    GetcatAPi() {
        fetch('https://berbagibahagia.org/api/getcat').then(res => {
            if (res.status === 200)
                return res.json()
        }).then(resdata => {
            console.log(resdata.data)
            this.setState({
                cat: resdata.data
            })
        })
    }
    // +this.state.pro digunakan untuk menghubungkan dengan picker yanglain//
    GetkotaAPi() {
        fetch('https://berbagibahagia.org/api/getkota/' + this.state.pro).then(res => {
            if (res.status === 200)
                return res.json()
        }).then(resdata => {
            console.log(resdata.data)
            this.setState({
                kota: resdata.data

            })
        })
    }
    // componentDidMount() {
    //     this.setState({
    //         //Setting the value of the date time
    //         date1:
    //             year + '-' + month + '-' + date,
    //         date2:
    //             year + '-' + month + '-' + date,
    //     });
    // }
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
    checkAndroidIos(show, date, mode) {
        if (Platform.OS === 'ios') {
            return (
                <View>

                </View>
            )
        } else {
            return (
                <View >
                <Button onPress={this.datepicker} title='wkdad'>
                </Button>
                    {
                show && <DateTimePicker
                    value={date}
                    mode={mode}
                    is24Hour={true}
                    display='spinner'
                    onChange={this.setDate}>

                </DateTimePicker>
            }
            </View>
            )
        }
    }
    render() {
        const { deskripsi } = this.state;
        const { text } = this.state;
        const { show, date, mode } = this.state;
        return (
            <View style={style.contentContainer}>
                <View style={{ backgroundColor: '#0EBEDF' }}>
                    <Text style={style.title}>Galang Dana</Text>
                </View>

                <View>
                    <Text style={style.Label1}>Judul Campaign </Text>
                    <TextInput
                        style={style.kotak2}
                        onChangeText={text => this.setState({ text })}
                        value={this.state.text}
                        placeholder="Judul Campaign"
                        placeholderTextColor='#7e7e7e'
                    />
                </View>

                <View>
                    <Text style={style.Label1}>Target Dana</Text>
                    <TextInput
                        style={style.kotak2}
                        onChangeText={dana => this.setState({ dana })}
                        value={this.state.dana.replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                        placeholder="Rp."
                        placeholderTextColor='#7e7e7e'
                    />
                </View>

                <View style={{ flexDirection: 'column' }}>
                    <Text style={style.Label1}>Deadline Penggalangan Dana</Text>

                    {/* '#000000' '#777777'  '#E9E9E9'*/}
                </View>
                <View>
                    {this.checkAndroidIos(show, date, mode,)}

                </View>

                {/* <DateTimePicker
                    testID="dateTimePicker"
                    timeZoneOffsetInMinutes={tzOffsetInMinutes}
                    minuteInterval={interval}
                    maximumDate={maximumDate}
                    minimumDate={minimumDate}
                    value={date}
                    mode={mode}
                    is24Hour
                    display={display}
                    onChange={onChange}
                    style={styles.iOsPicker}
                    textColor={textColor || undefined}
                    accentColor={accentColor || undefined}
                    neutralButtonLabel={neutralButtonLabel}
                    disabled={disabled}
                /> */}

                <View>
                    <Text style={style.Label1}>Lokasi penyaluran</Text>
                    <TextInput
                        style={style.kotak2}
                        onChangeText={text => this.setState({ text })}
                        value={this.state.text}
                        placeholder="Lokasi penyaluran"
                        placeholderTextColor='#7e7e7e'
                    />
                </View>

                <View>
                    <Text style={style.Label1}>Tentukan link untuk campaign</Text>
                    <TextInput
                        style={style.kotak2}
                        onChangeText={text => this.setState({ text })}
                        value={this.state.text}
                        placeholder="Tentukan nama"
                        placeholderTextColor='#7e7e7e'
                    />
                    {/* <TextInput
                    style={style.kotak2}
                    onChangeText={text => this.setState({ text })}
                    value={this.state.text}
                    editable={true}
                    placeholder="Tentukan nama"
                    placeholderTextColor='#7e7e7e'
                /> */}
                </View>

                <View style={{ flexDirection: 'column' }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                        <Text>Kategori</Text>
                        <Text>Profinsi</Text>
                        <Text>Kota</Text>
                    </View>
                </View>

                <View style={{ flexDirection: 'column' }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                        <Picker style={style.datePickerStyleRight} mode="dropdown"
                            selectedValue={this.state.nama}
                            onValueChange={(itemValue) => {
                                this.setState({
                                    nama: itemValue
                                })
                            }}>
                            <Picker.Item style={{ fontSize: 12 }} label={'Pilih kategori'} value={'0'} key={'0'} />
                            {
                                this.state.cat.map((nama) =>
                                    <Picker.Item style={{ height: '100%', width: '100%', fontSize: 12, }} label={nama.name.toString()} value={nama.name.toString()} key={nama.name.toString()} />
                                )}
                        </Picker>

                        <Picker style={style.datePickerStyleRight} mode="dropdown"
                            selectedValue={this.state.pro}
                            onValueChange={(itemValue) => {
                                this.setState({
                                    pro: itemValue
                                })
                            }}>
                            <Picker.Item style={{ fontSize: 12 }} label={'Pilih Propinsi'} value={'0'} key={'0'} />
                            {
                                this.state.prov.map((pro) =>
                                    <Picker.Item style={{ height: '100%', width: '100%', fontSize: 12, }} label={pro.name.toString()} value={pro.province_id} key={pro.province_id} />
                                )}
                        </Picker>

                        <Picker style={style.datePickerStyleRight} mode="dropdown" onFocus={() => { this.GetkotaAPi() }} //untuk get data yang terhubung dengan picker lain//
                            selectedValue={this.state.kot}
                            onValueChange={(itemValue, prov) => {
                                {
                                    this.setState({ kot: (itemValue), })
                                }
                            }}>
                            <Picker.Item style={{ fontSize: 12 }} label={'Pilih Kota'} value={'0'} key={'0'} />
                            {
                                this.state.kota.map((kot) =>
                                    <Picker.Item style={{ height: '100%', width: '100%', fontSize: 12, }} label={kot.name.toString()} value={kot.name.toString()} key={kot.name.toString()} />
                                )}
                        </Picker>
                    </View>

                </View>

                <View>
                    <Text style={{ marginLeft: 30, color: '#7e7e7e' }}>Deskripsi</Text>
                    <View style={style.infoContainer} >
                        <TextInput style={style.txtDesc} placeholder="Tuliskan Deskripsi disini"
                            placeholderTextColor='#A9A9A9'
                            keyboardType="email-address"
                            value={deskripsi}
                            onChangeText={deskripsi => this.setState({ deskripsi })}
                            multiline={true}
                            numberOfLines={5}
                            autoCorrect={false}>
                        </TextInput>
                    </View>
                </View>

                <View style={{
                    width: '85%',
                    backgroundColor: '#ffffff',
                    borderRadius: 10,
                    marginTop: 5,
                    height: 40,
                    marginLeft: 30,
                    borderWidth: 1,
                    flexWrap: 'wrap',
                    padding: 5,
                    justifyContent: 'center', alignItems: 'center',
                    flexDirection: 'column',
                    borderColor: '#E9E9E9',
                }} >
                    <TextInput style={{ color: '#c7c7c7', width: '65%', padding: 5, marginLeft: 5, fontSize: 12 }}
                        placeholderTextColor='#A9A9A9'
                        keyboardType="email-address"
                        returnKeyType='next'
                        placeholder="Tidak ada file yang dipilih"
                        autoCorrect={false} value={this.state.file.name}>

                    </TextInput>
                    <TouchableOpacity style={{ height: 25, paddingLeft: 5, paddingRight: 5, backgroundColor: this.state.file.name === "" ? '#87cefa' : '#f2f2f2', borderRadius: 5, marginLeft: 10, }}
                        onPress={() => this.docPicker()}
                    >
                        <Text style={{ color: 'white', fontSize: 12 }}>Upload File</Text>
                    </TouchableOpacity>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignContent: 'center', alignItems: 'center' }}>
                    <TouchableOpacity style={{ marginTop: 20, marginRight: 10 }} onPress={() => this.props.navigation.navigate('donasi')}>
                        <Text style={style.btnSimpanDark}>Buat Campaign</Text>
                    </TouchableOpacity>
                </View>

            </View>
        )
    }
}

export default tambahfou

const style = StyleSheet.create({
    contentContainer: {
        height: '100%',
        backgroundColor: '#fff'
    },
    title: {
        marginLeft: 20,
        marginTop: 15,
        marginBottom: 15,
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
    },
    btnSimpanDark: {
        width: '100%',
        fontWeight: 'bold',
        backgroundColor: '#87cefa',
        borderRadius: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: '#E9E9E9',
        textAlign: 'center',
        justifyContent: 'center', alignItems: 'center',
        color: '#fff'

    },
    btnSimpanUn: {
        width: '100%',
        fontWeight: 'bold',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 10,
        justifyContent: 'center', alignItems: 'center',
        alignContent: 'center',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    coltom: {
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
    coltom1: {
        width: '90%',
        marginLeft: 20,
        fontSize: 16,
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
        textAlign: 'justify',
        justifyContent: 'center',
    },
    coltom2: {
        fontSize: 16,
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: '#fff',
        marginVertical: 8,
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
    controls: {
        backgroundColor: 'transparent',
        borderRadius: 5,
        position: 'absolute',
        bottom: 50,
        left: 10,
        right: 10,
    },
    generalControls: {
        flex: 1,
        flexDirection: 'row',
        borderRadius: 4,
        overflow: 'hidden',
        paddingBottom: 10,
    },
    trackingControls: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    progress: {
        flex: 1,
        flexDirection: 'row',
        borderRadius: 3,
        overflow: 'hidden',
    },
    innerProgressCompleted: {
        height: 10,
        backgroundColor: '#B22222',
    },
    innerProgressRemaining: {
        height: 10,
        backgroundColor: '#f2f2f2',
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
        backgroundColor: '#7e7e7',
    },
    infoContainer: {
        width: '90%',
        marginLeft: 30,
        backgroundColor: '#fff',
        borderRadius: 10,
        borderWidth: 1,
        height: 70,
        borderColor: '#E9E9E9',
    },
    txtDesc: {
        color: '#2E3E5C',
        fontSize: 15,
        paddingLeft: 5,
        height: 100,
        marginHorizontal: 15,
    },
    datePickerStyleRight: {
        width: 140,
        marginLeft: 10,

    },
    datePickerStyle: {
        width: 150,
        marginLeft: 30,
    },
    Label1: {
        marginTop: 5,
        marginLeft: 25,
        padding: 5,
        color: '#000',
        alignItems: 'center',
        justifyContent: 'center'
    },
    Textinputcss: {
        color: '#7e7e7e',
        marginLeft: 30,
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
})