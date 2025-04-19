import React, { Component } from 'react'
import { Text, View, FlatList, StyleSheet, TouchableOpacity, Dimensions, Image } from 'react-native'
import { connect } from 'react-redux';
import { Picker } from '@react-native-picker/picker';
import { test } from '../../assets/images';
import moment from 'moment';

export class DetailDonatur extends Component {
    constructor(props) {
        super(props)
        this.state = {
            status: '',
            status_bayar: '',
            list: this.props.route.params.list,
            anak: [],
            tanggal_acc: new Date(),
        }
    }



    GetPengajuanAPi() {
        var seleksi = this.state
        fetch('https://kilauindonesia.org/datakilau/api/getanakreq/' + this.state.list.id_anak).then(res => {
            if (res.status === 200)
                return res.json()
        }).then(resdata => {
            console.log(resdata.data)
            this.setState({
                anak: resdata.data,


            })
        })
    }
    componentDidMount() {
        this.GetPengajuanAPi();
    }

    SimpanData() {
        {
            let simpandata = {
                status: this.state.status,
                status_bayar: this.state.status_bayar,
                id_users_acc: this.props.user.id,
                tanggal_acc: moment(this.state.tanggal_acc).format('YYYY-MM-DD')
            }
            let data = new FormData();
            for (let key in simpandata) {
                data.append(key, simpandata[key]);
            }
            fetch('https://kilauindonesia.org/datakilau/api/requestupd/' + this.state.list.id_request, {
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
                        console.log(this.state.status_bayar)
                    } else {

                        ToastAndroid.show("gagal menyimpan", ToastAndroid.SHORT)
                    }
                })
                .catch((err) => console.log('dari catch send Data ===', err));
        }

    }
    render() {
        return (
            <View style={{ backgroundColor: '#fff', height: '100%' }}>
                <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 16, marginTop: 15, marginBottom: 15 }}>Pengajuan Dana  </Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10 }}>
                    <Text style={{ marginLeft: 15, }}>Jenis Pengajuan:</Text>
                    <Text style={{ marginRight: 20 }}>Pengajuan Anak Asuh</Text>
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

                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ marginLeft: 15, marginTop: 15 }}>Status Bayar:</Text>
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
                            selectedValue={this.state.status_bayar}
                            value={this.state.status_bayar}
                            onValueChange={(itemValue) => {
                                this.setState({
                                    status_bayar: itemValue
                                })
                            }}>
                            <Picker.Item style={{ fontSize: 12 }} label={this.state.list.status_bayar} value={'0'} key={'0'} />
                            <Picker.Item style={{ fontSize: 12 }} label={'Sudah'} value={'Sudah'} key={'0'} />
                            <Picker.Item style={{ fontSize: 12 }} label={'Belum'} value={'Belum'} key={'0'} />


                            {/* <Picker.Item style={{ fontSize: 12 }} label="NPB/CPB/BCPB" value="Bimbingan" /> */}

                        </Picker>
                    </View>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10 }}>
                    <Text style={{ marginLeft: 15, }}>Jenis Pengajuan:</Text>
                    <Text style={{ marginRight: 20 }}>{"Rp." + this.state.list.biaya.toString().replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</Text>
                </View>

                <View style={{ marginBottom: 10, marginTop: 10, width: '92%', borderWidth: 1, height: 1, justifyContent: "center", alignContent: 'center', alignSelf: 'center', borderColor: '#bdbdbd' }}></View>


                <FlatList
                    pagingEnabled={true}
                    data={this.state.anak}
                    renderItem={({ item, index }) => (
                        // style={style.kotakbaru4}
                        <View style={{
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
                        }}>
                            <View style={{
                                width: '10%', justifyContent: 'center',
                                backgroundColor: item.status_cpb === 'CPB' ? '#0076B8' : '#000' &&
                                    item.status_cpb === 'PB' ? '#00B855' : '#000' && item.status_cpb === 'NPB' ? '#E32845' : '#000' && item.status_cpb === 'BCPB' ? '#FFBB0C' : '#000'
                            }}>
                                <View style={{ width: '40%', justifyContent: 'center', alignItems: 'center', alignSelf: 'center', alignContent: 'center' }}>
                                    <Text style={{ fontSize: 12, fontFamily: 'Poppins-Medium', color: '#fff' }}>{item.status_cpb}</Text>
                                </View>
                            </View>
                            <View
                                style={{
                                    height: 90,
                                    width: '100%',
                                    justifyContent: 'center',
                                }}>
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Image source={test}
                                            style={{
                                                height: 50,
                                                width: 50,
                                                borderRadius: 45,
                                                color: '#000',
                                                marginRight: 30
                                            }}
                                        />
                                        <View
                                            style={{ flexDirection: 'column', marginLeft: '-10%', justifyContent: 'center', width: '70%' }}>
                                            <Text style={{ color: '#000', fontFamily: 'Poppins-Medium', fontSize: 14, marginLeft: 10, }}>
                                                {item.full_name}
                                            </Text>


                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>

                    )
                    }>
                </FlatList >





                <View style={{ justifyContent: 'center', position: 'absolute', alignItems: 'center', alignSelf: 'center', bottom: 10 }}>
                    <TouchableOpacity style={style.btntambah} onPress={() =>
                        this.SimpanData()
                    } >
                        <Text style={{ color: '#fff', textAlign: 'center' }}>Simpan</Text>
                    </TouchableOpacity>
                </View>

            </View>
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
        marginLeft: 50,
    },
    labelkiri: {
        fontSize: 12,
        fontWeight: 'bold',
        marginVertical: 5,
        width: 100,
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
export default connect(mapStateToProps, mapDispatchToProps)(DetailDonatur);