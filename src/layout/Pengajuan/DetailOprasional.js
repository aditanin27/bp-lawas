import { Text, View, StyleSheet, Dimensions, ScrollView, FlatList, TouchableOpacity, Modal } from 'react-native'
import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Picker } from '@react-native-picker/picker';
import moment from 'moment';
import { Tanggal } from '../../assets/icons';
// import { DatePicker } from 'react-native-wheel-pick'

export class DetailOprasional extends Component {
    constructor(props) {
        super(props)
        this.state = {
            text: '',
            list: this.props.route.params.list,
            status: '',
            pembayaran: '',
            tanggal_diberikan: new Date(),
            modaldate: false,

        }
    }


    SimpanData() {
        {
            let simpandata = {
                status: this.state.status,
                // tanggal: this.state.list.tanggal,
                pembayaran: this.state.pembayaran,
                tanggal_diberikan:
                    this.state.list.berupa === "Uang" ?
                        moment(this.state.tanggal_diberikan).format('YYYY-MM-DD') : '',

            }
            let data = new FormData();
            for (let key in simpandata) {
                data.append(key, simpandata[key]);
            }
            fetch('https://kilauindonesia.org/datakilau/api/pengajuanupd/' + this.state.list.id_pengajuan, {
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
                        this.props.navigation.navigate('pendidikan')
                        this.onRefresh()
                        ToastAndroid.show("Data berhasil ditambah!", ToastAndroid.SHORT)
                    } else {

                        ToastAndroid.show("gagal menyimpan", ToastAndroid.SHORT)
                    }
                })
                .catch((err) => console.log('dari catch send Data ===', err));
        }

    }
    render() {
        // const lists = []
        // for (let i = 0; i < this.state.list.nama_barang.length; i++) {
        //     lists.push(
        //         <View key={i}>
        //             <View style={style.form}>
        //                 <Text style={style.labelkiri}>{this.state.list.nama_barang[i]}</Text>
        //                 <Text style={style.labelkanan}>{this.state.list.jumlah[i]}</Text>
        //             </View>
        //         </View >
        //     )
        // }
        console.log(this.state.list)
        return (
            <View >
                {
                    this.props.user.presensi === '' ? //pengelola//
                        <View style={{ backgroundColor: '#fff', height: '100%' }}>
                            <Text style={{ textAlign: 'center', fontSize: 16, fontWeight: 'bold' }}>Pengajuan Oprasional</Text>

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 30 }}>
                                <Text style={style.status1}>Status:</Text>
                                <Text style={[style.status, {
                                    color: this.state.list.status === 'Diterima' ?
                                        'green' : this.state.list.status === 'Ditolak' ? 'red' : '#D39800'
                                }]}>{this.state.list.status}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 30 }}>
                                <Text style={{ marginLeft: 15 }}>Jenis Pengajuan:</Text>
                                <Text style={{ marginRight: 0 }}>{this.state.list.berupa}</Text>
                            </View>
                            {this.state.list.berupa === "Uang" && this.state.list.status === "Diterima" ?
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 30 }}>
                                    <Text style={{ marginLeft: 15 }}>Tanggal Diberikan:</Text>
                                    <Text style={{ marginRight: 0 }}>{this.state.list.tanggal_diberikan}</Text>
                                </View>
                                : <View />}
                            <View style={{ width: '90%', borderWidth: 1, height: 1, justifyContent: "center", alignContent: 'center', alignSelf: 'center', borderColor: '#bdbdbd', marginTop: 10 }}></View>
                            {/* {lists} */}
                            {this.state.list.berupa === "Tutor Baru" ?
                                < View style={{ marginTop: 15 }}>

                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 30 }}>
                                        <Text style={{ marginLeft: 15 }}>Tutor Pelajaran:</Text>
                                        <Text style={{ marginRight: 20 }}>{this.state.list.pelajaran}</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 30 }}>
                                        <Text style={{ marginLeft: 15 }}>Jumlah yang dibutuhkan:</Text>
                                        <Text style={{ marginRight: 20 }}>{this.state.list.jumlahorang}</Text>
                                    </View>
                                </View>
                                :
                                < View style={{ marginTop: 15, justifyContent: 'center', }}>
                                    <View style={style.form}>
                                        <Text style={style.labelkiri}>Nominal yang di ajukan</Text>
                                        <Text style={style.labelkanan}>:{"Rp. " + this.state.list.uang.toString().replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</Text>
                                    </View>

                                    <View style={style.form}>
                                        <Text style={style.labelkiri}>Detail</Text>
                                        <Text style={style.labelkanan}>:{this.state.list.detail}</Text>
                                    </View>
                                </View>
                            }
                        </View>
                        : <View />}

                {
                    this.props.user.presensi === 'karyawan' ? //admin//
                        <View style={{ backgroundColor: '#fff', height: '100%' }}>
                            <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 16, marginTop: 15, marginBottom: 15 }}>Pengajuan Dana </Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10 }}>
                                <Text style={{ marginLeft: 15, }}>Jenis Pengajuan:</Text>
                                <Text style={{ marginRight: 20 }}>{this.state.list.berupa}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={{ marginLeft: 15, marginTop: 15 }}>Status:</Text>
                                < View style={{
                                    width: '40%',
                                    borderRadius: 10,
                                    borderWidth: 1,
                                    marginRight: 10,
                                    borderColor: '#E9E9E9',
                                    backgroundColor: '#fff',
                                    flexDirection: 'column',
                                    justifyContent: 'space-around'
                                }}>

                                    <Picker mode="dropdown" style={style.Textinputcss}
                                        selectedValue={this.state.status}
                                        value={this.state.status}
                                        onValueChange={(itemValue) => {
                                            this.setState({
                                                status: itemValue
                                            })
                                        }}>
                                        <Picker.Item style={{ fontSize: 12 }} label={this.state.list.status} value={'0'} key={'0'} />
                                        <Picker.Item style={{ fontSize: 12 }} label={'Diterima'} value={'Diterima'} key={'0'} />
                                        <Picker.Item style={{ fontSize: 12 }} label={'Ditolak'} value={'Ditolak'} key={'0'} />


                                        {/* <Picker.Item style={{ fontSize: 12 }} label="NPB/CPB/BCPB" value="Bimbingan" /> */}

                                    </Picker>
                                </View>
                            </View>


                            {this.state.list.berupa === "Uang" && this.state.status === "Diterima" || this.state.list.status === "Diterima" ?
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 }}>
                                    <Text style={{ marginLeft: 15, marginTop: 15 }}>Pembayaran:</Text>
                                    < View style={{
                                        width: '50%',
                                        borderRadius: 10,
                                        borderWidth: 1,
                                        marginRight: 10,
                                        borderColor: '#E9E9E9',
                                        backgroundColor: '#fff',
                                        flexDirection: 'column',
                                        justifyContent: 'space-around'
                                    }}>

                                        <Picker mode="dropdown" style={style.Textinputcss}
                                            selectedValue={this.state.pembayaran}
                                            value={this.state.pembayaran}
                                            onValueChange={(itemValue) => {
                                                this.setState({
                                                    pembayaran: itemValue
                                                })
                                            }}>
                                            <Picker.Item style={{ fontSize: 12 }} label={this.state.list.pembayaran} value={'0'} key={'0'} />
                                            <Picker.Item style={{ fontSize: 12 }} label={'Rapel'} value={'Rapel'} key={'0'} />
                                            <Picker.Item style={{ fontSize: 12 }} label={'Bertahap'} value={'Bertahap'} key={'0'} />
                                            {/* <Picker.Item style={{ fontSize: 12 }} label="NPB/CPB/BCPB" value="Bimbingan" /> */}
                                        </Picker>
                                    </View>

                                </View> : <View />
                            }
                            {this.state.pembayaran === 'Rapel' ?
                                <View style={[style.kotak3, { height: 100 }]}>
                                    <Text>Tanggal Diberikan </Text>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text
                                            style={style.kotak7}>
                                            {moment(this.state.tanggal_diberikan).format('YYYY-MM-DD')}

                                        </Text>
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
                                            <TouchableOpacity TouchableOpacity onPress={() => this.setState({ modaldate: true })}>
                                                <View style={{ height: 50, width: 50, justifyContent: 'center', alignItems: 'center', borderRadius: 10, }}>
                                                    <Tanggal />
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                                : <View />}
                            {this.state.list.berupa === "Uang" && this.state.list.status === "Diterima" ?
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text style={{ marginLeft: 15 }}>Tanggal Diberikan:</Text>
                                    <Text style={{ marginRight: 20 }}>{this.state.list.tanggal_diberikan}</Text>
                                </View>
                                : <View />}
                            <View style={{ marginBottom: 10, marginTop: 10, width: '92%', borderWidth: 1, height: 1, justifyContent: "center", alignContent: 'center', alignSelf: 'center', borderColor: '#bdbdbd' }}></View>

                            {this.state.list.berupa === "Tutor Baru" ?
                                <View style={{ marginTop: 15 }}>

                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 30 }}>
                                        <Text style={{ marginLeft: 15 }}>Tutor:</Text>
                                        <Text style={{ marginRight: 20 }}>{this.state.list.pelajaran}</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 30 }}>
                                        <Text style={{ marginLeft: 15 }}>Jumlah yang dibutuhkan:</Text>
                                        <Text style={{ marginRight: 20 }}>{this.state.list.jumlahorang}</Text>
                                    </View>
                                </View>
                                :
                                < View style={{ marginTop: 15 }}>

                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 30 }}>
                                        <Text style={{ marginLeft: 15 }}>Nominal yang di ajukan</Text>
                                        <Text style={{ marginRight: 20 }}>{"Rp. " + this.state.list.uang.toString().replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</Text>
                                    </View>
                                    <View style={style.form}>
                                        <Text style={style.labelkiri}>Detail</Text>
                                        <Text style={style.labelkanan}>{this.state.list.detail}</Text>
                                    </View>
                                </View>
                            }






                            <View style={{ justifyContent: 'center', position: 'absolute', alignItems: 'center', alignSelf: 'center', bottom: 10 }}>
                                <TouchableOpacity style={style.btntambah} onPress={() =>
                                    this.SimpanData()
                                } >
                                    <Text style={{ color: '#fff', textAlign: 'center' }}>Simpan</Text>
                                </TouchableOpacity>
                            </View>
                            <Modal
                                animationType={"slide"}
                                transparent={true}
                                visible={this.state.modaldate}
                                onRequestClose={() => this.setState({ modaldate: false })}
                                style={{
                                    alignItems: 'center',
                                    justifyContent: 'center',

                                }}>
                                <View style={style.ModalCont2}>
                                    <View style={{
                                        paddingTop: 5,
                                        backgroundColor: '#ffffff',
                                        // flexDirection: 'row',
                                        borderTopLeftRadius: 10,
                                        borderTopRightRadius: 10,
                                        // height: '50%',
                                        shadowColor: "#333",
                                        shadowOffset: {
                                            width: 1,
                                            height: 1,
                                        },
                                        shadowOpacity: 0.3,
                                        shadowRadius: 2,
                                        elevation: 3,
                                        height: '50%',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        position: 'absolute',
                                        top: '50%',
                                        bottom: 0,
                                        left: 0,
                                        right: 0,
                                    }}>
                                        <Text style={style.tglText}>Pilih Tanggal</Text>
                                        <ScrollView style={{ width: '100%', height: '100%' }}>

                                            <DatePicker
                                                order='D-M-Y'
                                                style={{ height: 215, width: 380, backgroundColor: '#fff', marginLeft: 5 }}
                                                minimumDate={new Date('1000-01-01')}
                                                maximumDate={new Date('2222-12-31')}
                                                format="YYYY-MM-DD"
                                                onDateChange={(date) =>
                                                    this.setState({ tanggal_diberikan: moment(date).format('YYYY-MM-DD') }, () => console.log(this.state.tanggal_diberikan))
                                                }
                                            />
                                            {/* <DatePicker
                                         date={this.state.dateanak}
                                         placeholder="select date"
                                         onDateChange={(dateanak) =>
                                             this.setState({ dateanak }, () => console.log(this.state.dateanak))
                                         }
                                         androidVariant='iosClone'
                                         locale='id'
                                     /> */}
                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: '10%' }}>
                                                <View style={style.kotakkecil}>
                                                    <TouchableOpacity onPress={() => this.setState({ modaldate: false })}>

                                                        <Text style={{
                                                            justifyContent: 'center', textAlign: 'center',
                                                        }}>Batal</Text>
                                                    </TouchableOpacity>
                                                </View>
                                                <View style={style.kotakkecil}>
                                                    <TouchableOpacity onPress={() => this.setState({ modaldate: false })}>
                                                        <Text style={{
                                                            justifyContent: 'center', textAlign: 'center',
                                                        }}>Simpan</Text>
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                        </ScrollView>
                                    </View>
                                </View>
                            </Modal>
                        </View>
                        :
                        <View />


                }


            </View >
        )
    }
}



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

    kotakstat: {
        backgroundColor: '#fff',
        height: 140,
        marginVertical: 8,
        marginLeft: 20,
        width: '90%',
        borderRadius: 10,
        paddingHorizontal: '4%',
        shadowColor: '#858585',
        overflow: 'hidden',
        shadowRadius: 15,
        elevation: 6,
        shadowOpacity: '25%',
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
    status: {
        marginTop: 10,
        marginLeft: 20,
        marginBottom: 10,
        color: '#D39800',
        width: 60,
        height: 30,
        fontWeight: 'bold',
        padding: 3,
        textAlign: 'center',
        borderRadius: 5,
        // position: 'absolute',
        // right: 10,
        // top: 30,
        // borderWidth: 1,
        // borderColor: 'yellow'
    },
    status1: {
        marginTop: 10,
        marginLeft: 20,
        marginBottom: 10,
        width: 60,
        height: 30,
        padding: 3,
        textAlign: 'center',
        // position: 'absolute',
        // right: 10,
        // top: 30,
        // borderWidth: 1,
        // borderColor: 'yellow'
    },
    form: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        alignContent: 'center',
        paddingHorizontal: 20,
        width: '100%',
        marginLeft: 25,
        marginTop: 10,
    },
    labelkiri: {
        fontSize: 12,
        fontWeight: 'bold',
        marginVertical: 5,
        width: 80,
    },
    labelkanan: {
        fontSize: 12,
        marginHorizontal: 5,
        width: 150,
    },
    botomnav: {
        position: 'absolute',
        bottom: 10,
        top: 0,
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        backgroundColor: 'red',
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 20,
        shadowColor: '#52006A'
    },
    btntambah: {
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        width: 100, height: 50,
        borderWidth: 1,
        borderRadius: 10,
        color: '#fff',
        borderColor: '#00A9B8',
        backgroundColor: '#00A9B8',
    },
    kotakkecil: {
        borderColor: '#bdbdbd',
        borderWidth: 1,
        width: '40%',
        height: 50,
        justifyContent: 'center',
        alignContent: 'center',
        alignSelf: 'center',
        borderRadius: 10,
        marginTop: 10,
        marginHorizontal: 10,
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
    ModalCont2: {
        flex: 1,
        backgroundColor: '#00000079',
    },
    // labelkanan: {
    //     fontSize: 12,
    //     marginHorizontal: 5,
    //     width: 150,
    // },
    // form: {
    //     flexDirection: 'row',
    //     alignItems: 'center',
    //     paddingHorizontal: 10,
    //     width: '100%',
    // },
    // labelkiri: {
    //     fontSize: 12,
    //     fontWeight: 'bold',
    //     marginVertical: 5,
    //     marginLeft: 20,
    //     width: 100,
    // },
});
const mapStateToProps = (state) => {
    return {
        user: state,
        initialState: state
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        changeUser: (data) => dispatch({ type: 'CHANGE/USER', payload: data }),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(DetailOprasional);