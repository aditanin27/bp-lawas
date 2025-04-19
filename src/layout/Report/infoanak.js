import { Text, View, FlatList, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native'
import React, { Component } from 'react'
import { test } from '../../assets';
import { Banyakanak, Tamnak } from '../../assets/icons';
var RNFS = require('react-native-fs');
import XLSX from 'xlsx'

export class infoanak extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Jumnak: [],
            info: this.props.route.params.item,
        };
    }
    componentDidMount() {
        this.GetAnakAPi();
        console.log(this.GetAnakAPi())
    }
    GetAnakAPi() {
        fetch('https://kilauindonesia.org/datakilau/api/AnakDona/' + this.state.info.id_donatur).then(res => {
            if (res.status === 200)
                return res.json()
        }).then((resdata) => {
            console.log('ini resdata get', resdata);
            const length = resdata.data.length;
            if (length > 0) {
                this.setState({
                    Jumnak: resdata.data,
                    refreshing: false,

                });
            } else {
                this.setState({
                    Jumnak: resdata.data,
                    refreshing: false,
                });
            }
        })
    }
    SemuaAnak = () => {
        let wb = XLSX.utils.book_new();
        let ws = XLSX.utils.json_to_sheet(this.state.Jumnak)
        XLSX.utils.book_append_sheet(wb, ws, "Users")
        const wbout = XLSX.write(wb, { type: 'binary', bookType: "xlsx" });

        // Write generated excel to Storage
        RNFS.writeFile(RNFS.DownloadDirectoryPath + '/Anak_yang_diasuh.xlsx', wbout, 'ascii').then((r) => {
            console.log('Success');
        }).catch((e) => {
            console.log('Error', e);
        });

    }
    render() {
        return (
            <View style={{ height: '100%', }}>
                <View style={{ backgroundColor: '#fff' }}>
                    <Text style={[style.labelatas, { justifyContent: "center", alignSelf: 'center', marginLeft: 0 }]}>Data Anak</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <Banyakanak style={{ marginLeft: 5 }} />
                        <Text style={[style.labelatas, { marginLeft: 5 }]}>Jumlah Anak yang Diasuh:{this.state.Jumnak.length}</Text>
                    </View>
                </View>
                <FlatList
                    data={this.state.Jumnak}
                    renderItem={({ item, index }) => (
                        <View style={[{ flexDirection: 'row', backgroundColor: '#fff', marginVertical: 7 }]}>
                            <View >
                                <View style={{ justifyContent: 'center' }}>
                                    <View style={style.form}>
                                        <Text style={style.labelkiri}>Status Anak:</Text>
                                        <Text style={style.labelkanan}>{item.status_validasi}</Text>
                                    </View>
                                    <View style={style.form}>
                                        <Text style={style.labelkiri}>Nama Anak:</Text>
                                        <Text style={style.labelkanan}>{item.full_name}</Text>
                                    </View>
                                    <View style={style.form}>
                                        <Text style={style.labelkiri}>Anak Ke:</Text>
                                        <Text style={style.labelkanan}>{item.anak_ke}</Text>
                                    </View>
                                    <View style={style.form}>
                                        <Text style={style.labelkiri}>Pendidikan:</Text>
                                        <Text style={style.labelkanan}>{item.jenjang}</Text>
                                    </View>
                                    <View style={style.form}>
                                        <Text style={style.labelkiri}>Transportasi:</Text>
                                        <Text style={style.labelkanan}>{item.transportasi}</Text>
                                    </View>
                                </View>

                            </View>
                            <Image source={test} style={{ height: 80, width: 80, marginTop: 20, position: 'absolute', justifyContent: 'flex-end', right: 40, }}></Image>
                        </View>

                    )}

                ></FlatList>
                <View style={{ flexDirection: "row", justifyContent: 'center', alignSelf: 'center', }}>
                    <TouchableOpacity style={style.btnSimpan} onPress={() => this.SemuaAnak()}>
                        <Text style={{ color: '#fff', fontFamily: 'Poppins-Medium', fontSize: 15 }}>Download Semua</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}
const style = StyleSheet.create({
    itemflat: {
        fontSize: 12,
        backgroundColor: '#fff',
        color: '#000',
        marginVertical: 5,
        marginHorizontal: 16,
        marginTop: 15,
        shadowColor: '#858585',
        overflow: 'hidden',
        shadowRadius: 15,
        elevation: 6,
        shadowOpacity: '25%',
        borderColor: '#7e7e7e',
        borderRadius: 15,
        height: 200,
        justifyContent: 'center',
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
        marginLeft: 20,
        width: 100,
    },
    labelkanan: {
        fontSize: 12,
        marginHorizontal: 5,
        width: 150,
    },
    labelatas: {
        fontSize: 14,
        marginLeft: 20,
        marginBottom: 5,
        marginTop: 5,
        fontWeight: 'bold',
    },
    iconbesar: {
        marginTop: 50,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
    },
    btnSimpan: {
        backgroundColor: '#00A9B8',
        padding: '4%',
        borderRadius: 10,
        marginTop: '6%',
        width: '70%',
        justifyContent: 'center',
        alignItems: 'center',
    },
})
export default infoanak