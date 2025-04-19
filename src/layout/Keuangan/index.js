import { Text, View, FlatList, TouchableOpacity, StyleSheet, Dimensions, RefreshControl, Image, TextInput } from 'react-native'
import React, { Component } from 'react'
import { LocationsH, TingkatH, JenisH, IconCari, FilterdanText, OrangHitam } from '../../assets/icons';
import { test } from '../../assets/images';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
export class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            refreshing: true,
            data: [],
            cari: '',
            filter: [],
        };
    }
    getKeuanganAPi() {
        fetch('https://kilauindonesia.org/datakilau/api/PenKeuangan')
            .then(res => {
                if (res.status === 200) return res.json();
            })
            .then(resdata => {
                console.log(resdata.DATA);
                this.setState({
                    data: resdata.data,
                    filter: resdata.data,
                    refreshing: false,
                });
            });
    }
    componentDidMount() {
        this.getKeuanganAPi();
        console.log(this.props);
    }
    onRefresh() {
        this.getKeuanganAPi();
        this.setState({ refreshing: false });
    }
    filterList(textToSearch) {
        this.setState({
            filter: this.state.data
                .filter(item => item.full_name.toLowerCase(textToSearch).includes(textToSearch)
                )
        })
    }
    render() {

        return (
            <View style={{ backgroundColor: '#Fff', flex: 1 }}>
                <View style={{ backgroundColor: '#0EBEDF', height: 100 }}>
                    <View
                        style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20 }}>
                        <TextInput
                            style={{
                                flexDirection: 'row',
                                backgroundColor: '#FFF',
                                paddingHorizontal: 40,
                                height: 38,
                                width: 250,
                                borderRadius: 9,
                                marginLeft: 10,
                            }}
                            color={'#000'}
                            onChangeText={(text) => {
                                this.filterList(text.toLowerCase()), this.setState({ cari: text })
                            }}
                            value={this.state.text}
                            placeholder="Cari Anak Binaan"
                            placeholderTextColor="#C0C0C0"
                            underlineColorAndroid="transparent"
                        />
                        <IconCari style={style.IconCari} name="your-icon" size={20} />
                        <TouchableOpacity
                            onPress={() => {
                                this.setState({ fil: true });
                            }}>
                            <FilterdanText style={{ marginLeft: 20 }} />
                        </TouchableOpacity>


                    </View>
                    <Text style={{ justifyContent: 'center', marginLeft: 10, padding: 10, color: '#FFF', fontSize: 14 }}>Data Keuangan</Text>
                </View>
                <FlatList
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={() => this.onRefresh()}
                        />
                    }
                    style={{ marginBottom: 25 }}
                    data={this.state.filter}
                    renderItem={({ item, index }) => (
                        <View>
                            <View style={{}}>
                                <TouchableOpacity
                                    onPress={() => this.props.navigation.navigate('')}>

                                    <View style={style.itemflat}>
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
                                                        <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                                            {/* <View style={{ flexDirection: 'row' }}>
                                                                <OrangHitam style={{ marginLeft: 10 }} />
                                                                {
                                                                    item.nama_lengkap === '' | item.nama_lengkap === 'null' | item.nama_lengkap === null ?
                                                                        <Text style={{ color: '#000', fontSize: 10, fontFamily: 'Poppins-Regular', marginLeft: 5, marginTop: 5 }}>Belum Memiliki Donatur</Text>
                                                                        :
                                                                        <Text style={style.labelkanan}>{item.nama_lengkap}</Text>
                                                                }
                                                            </View> */}

                                                            <View style={{ flexDirection: 'row', }}>
                                                                <TingkatH style={{ marginLeft: 10, }} />
                                                                <Text style={{ color: '#000', fontSize: 10, fontFamily: 'Poppins-Regular', marginLeft: 5 }}>Kelas {item.semester}</Text>
                                                            </View>

                                                            <View style={{ flexDirection: 'row', }}>
                                                                <LocationsH style={{ marginLeft: 10, }} />
                                                                <Text style={{ color: '#000', fontSize: 10, fontFamily: 'Poppins-Regular', marginLeft: 5 }}>{item.tingkat_sekolah}</Text>
                                                            </View>

                                                        </View>

                                                    </View>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            </View>

                        </View>
                    )
                    }></FlatList >
                <View style={{ flexDirection: "row", justifyContent: 'space-around' }}>
                    <TouchableOpacity style={style.btnSimpan} onPress={() => this.props.navigation.navigate('TambahKeuangan')}>
                        <Text style={{ color: '#fff', fontFamily: 'Poppins-Medium', fontSize: 15 }}>Pengaturan</Text>
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
        marginVertical: 10,
        marginHorizontal: 16,
        shadowColor: '#858585',
        overflow: 'hidden',
        shadowRadius: 15,
        elevation: 6,
        shadowOpacity: '25%',
        borderColor: '#7e7e7e',
        borderRadius: 15,
    },
    IconCari: {
        position: 'absolute',
        top: 8,
        left: 20,
    },
    refresh: {
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
        bottom: 0,
    },
    ModalCont: {
        flex: 1,
        justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: '#00000099',
        paddingHorizontal: 10,
    },
    labelkanan: {
        fontSize: 12,
        marginHorizontal: 5,
        width: 100,
    },
    labelkiri: {
        fontSize: 12,
        fontWeight: 'bold',
        marginVertical: 5,
        marginLeft: 20,
        width: 100,
    },
    form: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        width: '100%'
    },
    kotak3: {
        marginTop: 10,
        color: '#000',
        borderRadius: 10,
        borderWidth: 0.1,
        fontSize: 13,
        height: 40,
        width: windowWidth * 0.5,
        padding: 12,
        backgroundColor: '#fff',
        borderColor: '#DDDDDD',
        borderWidth: 1,
        fontFamily: 'Poppins-Regular',
    },
    containerSafe: {
        flex: 1,
        flexDirection: 'column',
    },
    kotakkecil: {
        flexDirection: 'column',
        borderColor: '#bdbdbd',
        borderWidth: 1,
        width: '40%',
        height: 100,
        justifyContent: 'center',
        alignContent: 'center',
        alignSelf: 'center',
        textAlign: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginTop: 10,
        marginHorizontal: 10,
    },
    btnSimpan: {
        backgroundColor: '#00A9B8',
        padding: '4%',
        borderRadius: 10,
        marginTop: '1%',
        width: '70%',
        justifyContent: 'center',
        alignItems: 'center',
    },
});
export default index