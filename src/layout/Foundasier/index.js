import { Text, View, StyleSheet, TextInput, TouchableOpacity, FlatList,Image} from 'react-native'
import React, { Component } from 'react'
import { Picker } from '@react-native-picker/picker';

export class index extends Component {
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
            date: '',
            date1: '',
            date2: '',
            kat: [],
            prov: [],
            pro: [],
            cat: [],
            nama: [],
            berita: [],
        }
    }
    GetBeritaAPi() {
        fetch('https://kilauindonesia.org/datakilau/api/testo').then(res => {
            if (res.status === 200)
                return res.json()
        }).then(resdata => {
            console.log(resdata.data)
            this.setState({
                berita: resdata.data,
                filter: resdata.DATA,
                refreshing: false,

            })
        })
    }
    GetprovAPi() {
        fetch('https://berbagibahagia.org/api/getprov').then(res => {
            if (res.status === 200)
                return res.json()
        }).then(resdata => {
            console.log(resdata.DATA)
            this.setState({
                prov: resdata.DATA

            })
        })
    }
    componentDidMount() {
        this.GetcatAPi();
        this.GetkotaAPi();
        this.GetprovAPi();
        this.GetBeritaAPi()
    }
    GetcatAPi() {
        fetch('https://berbagibahagia.org/api/getcat').then(res => {
            if (res.status === 200)
                return res.json()
        }).then(resdata => {
            console.log(resdata.DATA)
            this.setState({
                cat: resdata.DATA
            })
        })
    }
    GetkotaAPi() {
        fetch('https://berbagibahagia.org/api/getkota/idprov').then(res => {
            if (res.status === 200)
                return res.json()
        }).then(resdata => {
            console.log(resdata.DATA)
            this.setState({
                kota: resdata.DATA

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
    render() {
        const { deskripsi } = this.state;
        const { text } = this.state;
        // for (let i = 0; i < this.state.count; i++) {
        //     <><View key={i}>
        //         <Text>{i + 1}.</Text>
        //         <View style={{ flexDirection: 'column' }}>
        //             <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
        //                 <Picker style={style.datePickerStyleRight} mode="dropdown"
        //                     selectedValue={this.state.nama}
        //                     value={this.state.ife[i]}
        //                     onValueChange={(itemValue) => {
        //                         this.setState({
        //                             nama: itemValue
        //                         })
        //                     }}>
        //                     <Picker.Item style={{ fontSize: 12 }} label={'Pilih kategori'} value={'0'} key={'0'} />
        //                     {
        //                         this.state.cat.map((nama) =>
        //                             <Picker.Item style={{ height: '100%', width: '100%', fontSize: 12, }} label={nama.name.toString()} value={nama.name.toString()} key={nama.name.toString()} />
        //                         )}
        //                 </Picker>

        //                 <Picker style={style.datePickerStyleRight} mode="dropdown"
        //                     selectedValue={this.state.pro}
        //                     onValueChange={(itemValue) => {
        //                         this.setState({
        //                             pro: itemValue
        //                         })
        //                     }}>
        //                     <Picker.Item style={{ fontSize: 12 }} label={'Pilih Propinsi'} value={'0'} key={'0'} />
        //                     {
        //                         this.state.prov.map((pro) =>
        //                             <Picker.Item style={{ height: '100%', width: '100%', fontSize: 12, }} label={pro.name.toString()} value={pro.name.toString()} key={pro.name.toString()} />
        //                         )}
        //                 </Picker>

        //                 <Picker style={style.datePickerStyleRight} mode="dropdown"
        //                     selectedValue={this.state.kat}
        //                     onValueChange={(itemValue) => {
        //                         this.setState({
        //                             kat: itemValue
        //                         })
        //                     }}>
        //                     <Picker.Item style={{ fontSize: 12 }} label={'Pilih Kota'} value={'0'} key={'0'} />
        //                     {
        //                         this.state.kat.map((kat) =>
        //                             <Picker.Item style={{ height: '100%', width: '100%', fontSize: 12, }} label={kat.id_level_anak_binaan.toString()} value={kat.id_level_anak_binaan.toString()} key={kat.id_level_anak_binaan.toString()} />
        //                         )}
        //                 </Picker>
        //             </View>
        //         </View>
        //     </View></>
        // }
        return (
            <View style={style.contentContainer}>
                <View style={{ backgroundColor: '#0EBEDF' }}>
                    <Text style={style.title}>List campaign saya</Text>
                </View>

                <FlatList
                    data={this.state.berita}
                    renderItem={({ item }) => (
                        <View >
                            <TouchableOpacity style={style.itemflat} onPress={() => { this.setState({ detbe: item, modaldetail: true }) }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Image source={{ uri: 'https://www.kilauindonesia.org/datakilau/gambarDonatur/' + item.gambar_donatur }}
                                        style={{ height: 100, width: 150, }} />
                                    <View style={{ flexDirection: 'column', marginTop: 20 }}>
                                        <Text style={{ marginTop: -20, marginLeft: 20, fontWeight: 'bold', }}>{item.nama}</Text>
                                        <Text numberOfLines={3} style={style.itemText}> Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry </Text>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Image style={style.Labeltgl} source={Calendar}></Image>
                                            <Text style={style.baca}>Penulis</Text>
                                        </View>
                                    </View>
                                </View>


                            </TouchableOpacity>

                        </View>
                    )}>
                </FlatList>

            </View>
        )
    }
}

export default index

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
        width: 110,
        marginLeft: 30,

    },
    datePickerStyle: {
        width: 110,
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
    itemflat: {
        flex: 1,
        marginVertical: 8,
        marginLeft: 10,
        backgroundColor: '#fff',
        // shadowColor: "#333",
        // shadowOffset: {
        //   width: 1,
        //   height: 1,
        // },
        // shadowOpacity: 0.3,
        // shadowRadius: 2,
        // borderColor: '#7e7e7e',
        // elevation: 3,
    },
    Labeltgl: {
        marginTop: 5,
        position: 'absolute',
        top: 0, left: 10, right: 0, bottom: 0,
        height: 25, width: 25,
    },
    baca: {
        justifyContent: 'flex-end',
        marginLeft: 160,
        marginTop: 5,
        textAlign: 'center',
        height: 25,
        width: 50,
        backgroundColor: '#f2f2f2',
        shadowColor: "#333",
        shadowOffset: {
            width: 1,
            height: 1,
        },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        elevation: 0.1,
        borderRadius: 0.5,
        borderColor: '#7e7e7e',
    },
    Labeltgl: {
        marginTop: 5,
        position: 'absolute',
        top: 0, left: 10, right: 0, bottom: 0,
        height: 25, width: 25,
    },
})