import {
    Text, View, StyleSheet, Dimensions, ScrollView, TextInput,
    FlatList, RefreshControl, ViewComponent, Image, TouchableOpacity
} from 'react-native'
import React, { Component } from 'react'
import { Tamnak } from '../../assets/icons'
import { test } from '../../assets/images'
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

export class detailkeluarga extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Anak: [],
            wali: [],
            ibu: [],
            ayah: [],
            anak1: [],
            detail: this.props.route.params.item,
            lihatkeluarga: false,
            lihatayah: false,
            lihatibu: false,
            lihatanak: false,
            lihatwali: false,
            refreshing: true,

        };
    }

    GetAnakAPi() {
        fetch('https://kilauindonesia.org/datakilau/api/getanakortu/' + this.state.detail)
            .then(res => {
                if (res.status === 200) return res.json();
            })
            .then(resdata => {
                console.log(resdata.data);
                this.setState({
                    Anak: resdata.data,
                    filter: resdata.DATA,
                    refreshing: false,

                });
            });
    }
    GetAyahAPi() {
        fetch('https://kilauindonesia.org/datakilau/api/getayah/' + this.state.detail.id_keluarga)
            .then(res => {
                if (res.status === 200) return res.json();
            })
            .then(resdata => {
                console.log(resdata.data);
                this.setState({
                    ayah: resdata.data,
                    filter: resdata.DATA,
                    refreshing: false,

                });
            });
    }
    GetIbuAPi() {
        fetch('https://kilauindonesia.org/datakilau/api/getibu/' + this.state.detail.id_keluarga)
            .then(res => {
                if (res.status === 200) return res.json();
            })
            .then(resdata => {
                console.log(resdata.data);
                this.setState({
                    ibu: resdata.data,
                    filter: resdata.DATA,
                    refreshing: false,

                });
            });
    }
    GetWaliAPi() {
        fetch('https://kilauindonesia.org/datakilau/api/getwali/' + this.state.detail.id_keluarga)
            .then(res => {
                if (res.status === 200) return res.json();
            })
            .then(resdata => {
                console.log(resdata.data);
                this.setState({
                    wali: resdata.data,
                    filter: resdata.DATA,
                    refreshing: false,

                });
            });
    }
    Getanak1APi() {
        fetch('https://kilauindonesia.org/datakilau/api/getanakkel/' + this.state.detail.id_keluarga)
            .then(res => {
                if (res.status === 200) return res.json();
            })
            .then(resdata => {
                console.log(resdata.data);
                this.setState({
                    anak1: resdata.data,
                    filter: resdata.DATA,
                    refreshing: false,

                });
            });
    }
    componentDidMount() {
        this.GetAnakAPi();
        this.GetWaliAPi();
        this.GetIbuAPi();
        this.GetAyahAPi();
        this.Getanak1APi();
        console.log(this.state.detail);
    }
    onRefresh() {
        this.GetAnakAPi();
        this.GetWaliAPi();
        this.GetIbuAPi();
        this.GetAyahAPi();
        this.Getanak1APi();
        this.setState({ refreshing: false });
    }
    render() {
        const detail = this.state.detail
        const ibu = this.state.ibu
        console.log()
        return (
            <View style={{ backgroundColor: '#fff', flex: 1 }}>
                <View style={{ height: "10%", backgroundColor: '#0EBEDF' }}>
                    <Text style={{ textAlign: 'center', fontSize: 16, fontWeight: 'bold', marginTop: 10, color: '#fff' }}>Data Keluarga</Text>
                    <Text style={{ textAlign: 'center', marginTop: 5, color: '#fff' }}>No. Kartu Keluarga:{detail.no_kk}</Text>
                </View>

                <View style={{ flexDirection: 'row', marginHorizontal: 10, }}>
                    <View style={[style.kotakbtn, {
                        marginHorizontal: 5,
                        backgroundColor: this.state.lihatkeluarga === false ? '#fff' : '#0EBEDF',
                        borderColor: this.state.lihatkeluarga === false ? '#bdbdbd' : '#fff',
                        padding: 8, borderRadius: 5
                    }]}>
                        <TouchableOpacity onPress={() => this.setState({ lihatkeluarga: !this.state.lihatkeluarga, lihatayah: false, lihatibu: false, lihatanak: false, lihatwali: false })}>
                            <Text style={{ color: this.state.lihatkeluarga === false ? '#bdbdbd' : '#fff', textAlign: 'center', }}>Keluarga</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={[style.kotakbtn, {
                        width: '17%',
                        marginHorizontal: 5,
                        backgroundColor: this.state.lihatayah === false ? '#fff' : '#0EBEDF',
                        borderColor: this.state.lihatayah === false ? '#bdbdbd' : '#fff',
                        padding: 8, borderRadius: 5
                    }]}>
                        <TouchableOpacity onPress={() => this.setState({ lihatayah: !this.state.lihatayah, lihatkeluarga: false, lihatibu: false, lihatanak: false, lihatwali: false })}>
                            <Text style={{ color: this.state.lihatayah === false ? '#bdbdbd' : '#fff', textAlign: 'center', }}>Ayah</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={[style.kotakbtn, {
                        width: '17%',
                        marginHorizontal: 5,
                        backgroundColor: this.state.lihatibu === false ? '#fff' : '#0EBEDF',
                        borderColor: this.state.lihatibu === false ? '#bdbdbd' : '#fff',
                        padding: 8, borderRadius: 5
                    }]}>
                        <TouchableOpacity onPress={() => this.setState({ lihatibu: !this.state.lihatibu, lihatkeluarga: false, lihatayah: false, lihatanak: false, lihatwali: false })}>
                            <Text style={{ color: this.state.lihatibu === false ? '#bdbdbd' : '#fff', textAlign: 'center', }}>Ibu</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={[style.kotakbtn, {
                        width: '17%',
                        marginHorizontal: 5,
                        backgroundColor: this.state.lihatanak === false ? '#fff' : '#0EBEDF',
                        borderColor: this.state.lihatanak === false ? '#bdbdbd' : '#fff',
                        padding: 8, borderRadius: 5
                    }]}>
                        <TouchableOpacity onPress={() => this.setState({ lihatanak: !this.state.lihatanak, lihatkeluarga: false, lihatayah: false, lihatibu: false, lihatwali: false })}>
                            <Text style={{ color: this.state.lihatanak === false ? '#bdbdbd' : '#fff', textAlign: 'center', }}>Anak</Text>
                        </TouchableOpacity>
                    </View>
                    {this.state.detail.nama_wali === null ?
                        <View /> :
                        <View style={[style.kotakbtn, {
                            width: '17%',
                            marginHorizontal: 5,
                            backgroundColor: this.state.lihatwali === false ? '#fff' : '#0EBEDF',
                            borderColor: this.state.lihatwali === false ? '#bdbdbd' : '#fff',
                            padding: 8, borderRadius: 5
                        }]}>
                            <TouchableOpacity onPress={() => this.setState({ lihatwali: !this.state.lihatwali, lihatanak: false, lihatayah: false, lihatibu: false, lihatkeluarga: false })}>
                                <Text style={{ color: this.state.lihatwali === false ? '#bdbdbd' : '#fff', textAlign: 'center', }}>Wali</Text>
                            </TouchableOpacity>
                        </View>
                    }
                </View>



                {/* <View style={{ justifyContent: 'center', flexDirection: 'row', }}>
                    <TouchableOpacity style={[style.kotakbtn, {
                        marginHorizontal: 15, width: '25%',
                        backgroundColor: this.state.lihatkeluarga === false ? '#fff' : '#0EBEDF',
                        borderColor: this.state.lihatkeluarga === false ? '#bdbdbd' : '#fff',
                        padding: 8, borderRadius: 5
                    }]}
                        onPress={() => this.setState({
                            lihatkeluarga: !this.state.lihatkeluarga, lihatayah: false, lihatibu: false, lihatanak: false, lihatwali: false,
                        })}>
                        <Text style={{ color: this.state.lihatkeluarga === false ? '#bdbdbd' : '#fff', textAlign: 'center' }}>Keluarga</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[style.kotakbtn, {
                        marginHorizontal: 15, width: '25%',
                        backgroundColor: this.state.lihatayah === false ? '#fff' : '#0EBEDF',
                        borderColor: this.state.lihatayah === false ? '#bdbdbd' : '#fff',
                        padding: 8, borderRadius: 5
                    }]} onPress={() => this.setState({
                        lihatkeluarga: false,
                        lihatayah: !this.state.lihatayah, lihatibu: false, lihatanak: false, lihatwali: false,
                    })}>
                        <Text style={{ color: this.state.lihatayah === false ? '#bdbdbd' : '#fff', textAlign: 'center' }}>Data Ayah</Text>
                    </TouchableOpacity>
                </View>

                <View style={{ justifyContent: 'center', flexDirection: 'row', }}>
                    <TouchableOpacity style={[style.kotakbtn, {
                        marginHorizontal: 15, width: '25%',
                        backgroundColor: this.state.lihatibu === false ? '#fff' : '#0EBEDF',
                        borderColor: this.state.lihatibu === false ? '#bdbdbd' : '#fff',
                        padding: 8, borderRadius: 5
                    }]} onPress={() => this.setState({
                        lihatkeluarga: false, lihatibu: !this.state.lihatibu, lihatayah: false, lihatanak: false, lihatwali: false,
                    })}>
                        <Text style={{ color: this.state.lihatibu === false ? '#bdbdbd' : '#fff', textAlign: 'center' }}>Data Ibu</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[style.kotakbtn, {
                        marginHorizontal: 15, width: '25%',
                        backgroundColor: this.state.lihatanak === false ? '#fff' : '#0EBEDF',
                        borderColor: this.state.lihatanak === false ? '#bdbdbd' : '#fff',
                        padding: 8, borderRadius: 5
                    }]} onPress={() => this.setState({
                        lihatkeluarga: false, lihatanak: !this.state.lihatanak, lihatayah: false, lihatibu: false, lihatwali: false,
                    })}>
                        <Text style={{ color: this.state.lihatanak === false ? '#bdbdbd' : '#fff', textAlign: 'center' }}>Data Anak</Text>
                    </TouchableOpacity>
                    {this.state.detail.nama_wali === null ?
                        <View />
                        : <TouchableOpacity style={[style.kotakbtn, {
                            marginHorizontal: 15, width: '25%',
                            backgroundColor: this.state.lihatwali === false ? '#fff' : '#0EBEDF',
                            borderColor: this.state.lihatwali === false ? '#bdbdbd' : '#fff',
                            padding: 8, borderRadius: 5
                        }]} onPress={() => this.setState({
                            lihatkeluarga: false, lihatwali: !this.state.lihatwali, lihatayah: false, lihatibu: false, lihatanak: false,
                        })}>
                            <Text style={{ color: this.state.lihatwali === false ? '#bdbdbd' : '#fff', textAlign: 'center' }}>Data Wali</Text>
                        </TouchableOpacity>
                    }
                </View> */}

                <View >
                    <View>
                        {this.state.lihatkeluarga === true ?
                            <View style={[{ backgroundColor: '#fff', }]}>
                                <Text style={style.labelatas}>Data Keluarga</Text>
                                <View style={{ justifyContent: 'center', marginTop: 20 }}>
                                    <View style={style.form}>
                                        <Text style={style.labelkiri}>Kantor Cabang</Text>
                                        <Text style={style.labelkanan}>:{detail.nama_kacab}</Text>
                                    </View>
                                    <View style={style.form}>
                                        <Text style={style.labelkiri}>Wilayah Binaan</Text>
                                        <Text style={style.labelkanan}>:{detail.nama_wilbin}</Text>
                                    </View>
                                    <View style={style.form}>
                                        <Text style={style.labelkiri}>Shelter</Text>
                                        {
                                            detail.nama_shelter === '' | detail.nama_shelter === 'null' | detail.nama_shelter === null ?
                                                <Text style={style.labelkanan}>Belum Memasukan Shelter</Text>
                                                :
                                                <Text style={style.labelkanan}>{detail.nama_shelter}</Text>
                                        }
                                    </View>
                                    <View style={style.form}>
                                        <Text style={style.labelkiri}>No. Kartu Keluarga</Text>
                                        <Text style={style.labelkanan}>:{detail.no_kk}</Text>
                                    </View>

                                    <View style={style.form}>
                                        <Text style={style.labelkiri}>Status Orang Tua</Text>
                                        <Text style={style.labelkanan}>:{detail.status_ortu}</Text>
                                    </View>
                                    <View style={style.form}>
                                        <Text style={style.labelkiri}>No. Rekening</Text>
                                        {
                                            detail.no_rek === '' | detail.no_rek === 'null' | detail.no_rek === null ?
                                                <Text style={style.labelkanan}>Belum Memasukan No.Rekening</Text>
                                                :
                                                <Text style={style.labelkanan}>{detail.no_rek}</Text>
                                        }

                                    </View>
                                    <View style={style.form}>
                                        <Text style={style.labelkiri}>No. Telpon</Text>
                                        {
                                            detail.no_tlp === '' | detail.no_tlp === 'null' | detail.no_tlp === null ?
                                                <Text style={style.labelkanan}>Belum Memasukan No.HP</Text>
                                                :
                                                <Text style={style.labelkanan}>{detail.no_tlp}</Text>
                                        }
                                    </View>
                                </View>

                            </View>

                            : <View />
                        }
                        {this.state.lihatayah === true ?
                            <FlatList
                                refreshControl={
                                    <RefreshControl
                                        refreshing={this.state.refreshing}
                                        onRefresh={() => this.onRefresh()}
                                    />
                                }
                                data={this.state.ayah}
                                renderItem={({ item, index }) => (
                                    <View style={[{ backgroundColor: '#fff' }]}>
                                        <Text style={style.labelatas}>Data Ayah</Text>
                                        <View style={{ justifyContent: 'center' }}>
                                            <View style={style.form}>
                                                <Text style={style.labelkiri}>Status Ayah</Text>
                                                {
                                                    detail.status_ortu === 'Yatim_Piatu' | detail.status_ortu === 'Yatim' ?
                                                        <Text style={style.labelkanan}>Sudah Meninggal</Text>
                                                        :
                                                        <Text style={style.labelkanan}>Hidup</Text>
                                                }
                                            </View>
                                            <View style={style.form}>
                                                <Text style={style.labelkiri}>NIK</Text>
                                                {
                                                    detail.status_ortu === 'Yatim_Piatu' | detail.status_ortu === 'Yatim' ?
                                                        <Text style={style.labelkanan}>: -</Text>
                                                        :
                                                        <Text style={style.labelkanan}>:{item.nik_ayah}</Text>
                                                }
                                            </View>
                                            <View style={style.form}>
                                                <Text style={style.labelkiri}>Nama Ayah</Text>
                                                <Text style={style.labelkanan}>:{item.nama_ayah}</Text>
                                            </View>
                                            <View style={style.form}>
                                                <Text style={style.labelkiri}>Agama</Text>
                                                <Text style={style.labelkanan}>:{item.agama}</Text>
                                            </View>

                                            <View style={style.form}>
                                                <Text style={style.labelkiri}>Tempat Tanggal Lahir</Text>
                                                <Text style={style.labelkanan}>:{item.tempat_lahir} {item.tanggal_lahir}</Text>
                                            </View>
                                            <View style={style.form}>
                                                <Text style={style.labelkiri}>Alamat</Text>
                                                {
                                                    detail.status_ortu === 'Yatim_Piatu' | detail.status_ortu === 'Yatim' ?
                                                        <Text style={style.labelkanan}>: -</Text>
                                                        :
                                                        <Text style={style.labelkanan}>:{item.alamat}</Text>
                                                }
                                            </View>
                                            <View style={style.form}>
                                                <Text style={style.labelkiri}>Penghasilan</Text>
                                                {
                                                    detail.status_ortu === 'Yatim_Piatu' | detail.status_ortu === 'Yatim' ?
                                                        <Text style={style.labelkanan}>: -</Text>
                                                        :
                                                        <Text style={style.labelkanan}>:{item.penghasilan}</Text>
                                                }
                                            </View>
                                            <View>
                                                {
                                                    detail.status_ortu === 'Yatim_Piatu' | detail.status_ortu === 'Yatim' ?
                                                        <View>
                                                            <View style={style.form}>
                                                                <Text style={style.labelkiri}>Tanggal Kematian</Text>
                                                                <Text style={style.labelkanan}>:{item.tanggal_kematian}</Text>
                                                            </View>
                                                            <View style={style.form}>
                                                                <Text style={style.labelkiri}>Penyebab Kematian</Text>
                                                                <Text style={style.labelkanan}>:{item.penyebab_kematian}</Text>
                                                            </View>
                                                        </View>
                                                        :
                                                        <View />


                                                }
                                            </View>

                                        </View>
                                        <View style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center', alignSelf: 'center', marginTop: 0, }}>
                                            <TouchableOpacity onPress={() => this.props.navigation.navigate('editdataayah', { detail: item, detail1: this.state.detail })} style={style.refresh} >
                                                <View style={{
                                                    top: 20,
                                                    backgroundColor: '#0EBEDF', width: 170, height: 40, justifyContent: 'center', alignContent: 'center', alignItems: 'center', alignSelf: 'center', borderRadius: 10
                                                }}>
                                                    <Text style={{ color: '#fff', textAlign: 'center', justifyContent: 'center', alignContent: 'center' }}>Edit Data ayah </Text>
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                )}></FlatList>
                            : <View />
                        }

                        {this.state.lihatibu === true ?
                            <FlatList
                                refreshControl={
                                    <RefreshControl
                                        refreshing={this.state.refreshing}
                                        onRefresh={() => this.onRefresh()}
                                    />
                                }
                                data={this.state.ibu}
                                renderItem={({ item, index }) => (
                                    <View style={[{ backgroundColor: '#fff' }]}>
                                        <Text style={style.labelatas}>Data Ibu</Text>
                                        <View style={{ justifyContent: 'center' }}>
                                            <View style={style.form}>
                                                <Text style={style.labelkiri}>Status</Text>
                                                {
                                                    detail.status_ortu === 'Yatim_Piatu' | detail.status_ortu === 'Piatu' ?
                                                        <Text style={style.labelkanan}>Sudah Meninggal</Text>
                                                        :
                                                        <Text style={style.labelkanan}>Hidup</Text>
                                                }
                                            </View>
                                            <View style={style.form}>
                                                <Text style={style.labelkiri}>NIK</Text>
                                                {
                                                    detail.status_ortu === 'Yatim_Piatu' | detail.status_ortu === 'Piatu' ?
                                                        <Text style={style.labelkanan}>: -</Text>
                                                        :
                                                        <Text style={style.labelkanan}>:{item.nik_ibu}</Text>
                                                }
                                            </View>
                                            <View style={style.form}>
                                                <Text style={style.labelkiri}>Nama Ibu</Text>
                                                <Text style={style.labelkanan}>:{item.nama_ibu}</Text>
                                            </View>
                                            <View style={style.form}>
                                                <Text style={style.labelkiri}>Agama</Text>
                                                <Text style={style.labelkanan}>:{item.agama}</Text>
                                            </View>

                                            <View style={style.form}>
                                                <Text style={style.labelkiri}>Tempat Tanggal Lahir</Text>
                                                <Text style={style.labelkanan}>:{item.tempat_lahir} {item.tanggal_lahir}</Text>
                                            </View>
                                            <View style={style.form}>
                                                <Text style={style.labelkiri}>Alamat</Text>
                                                {
                                                    detail.status_ortu === 'Yatim_Piatu' | detail.status_ortu === 'Piatu' ?
                                                        <Text style={style.labelkanan}>:-</Text>
                                                        :
                                                        <Text style={style.labelkanan}>:{item.alamat}</Text>
                                                }
                                            </View>
                                            <View style={style.form}>
                                                <Text style={style.labelkiri}>Penghasilan</Text>
                                                {
                                                    detail.status_ortu === 'Yatim_Piatu' | detail.status_ortu === 'Piatu' ?
                                                        <Text style={style.labelkanan}>: -</Text>
                                                        :
                                                        <Text style={style.labelkanan}>:{item.penghasilan}</Text>
                                                }
                                            </View>
                                            <View>
                                                {
                                                    detail.status_ortu === 'Yatim_Piatu' | detail.status_ortu === 'Piatu' ?
                                                        <View>
                                                            <View style={style.form}>
                                                                <Text style={style.labelkiri}>Tanggal Kematian</Text>
                                                                <Text style={style.labelkanan}>:{item.tanggal_kematian}</Text>
                                                            </View>
                                                            <View style={style.form}>
                                                                <Text style={style.labelkiri}>Penyebab Kematian</Text>
                                                                <Text style={style.labelkanan}>:{item.penyebab_kematian}</Text>
                                                            </View>
                                                        </View>
                                                        :
                                                        <View />


                                                }
                                            </View>
                                        </View>
                                        <View style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center', alignSelf: 'center', marginTop: 0, }}>
                                            <TouchableOpacity onPress={() => this.props.navigation.navigate('editdataibu', { detail: item, detail1: this.state.detail })} style={style.refresh} >
                                                <View style={{
                                                    top: 20,
                                                    backgroundColor: '#0EBEDF', width: 170, height: 40, justifyContent: 'center', alignContent: 'center', alignItems: 'center', alignSelf: 'center', borderRadius: 10
                                                }}>
                                                    <Text style={{ color: '#fff', textAlign: 'center', justifyContent: 'center', alignContent: 'center' }}>Edit Data Ibu </Text>
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                )}></FlatList>
                            : <View />
                        }
                        {this.state.lihatwali === true ?
                            <FlatList
                                refreshControl={
                                    <RefreshControl
                                        refreshing={this.state.refreshing}
                                        onRefresh={() => this.onRefresh()}
                                    />
                                }
                                data={this.state.wali}
                                renderItem={({ item, index }) => (
                                    <View style={[{ backgroundColor: '#fff' }]}>
                                        <Text style={style.labelatas}>Data Wali</Text>
                                        <View style={{ justifyContent: 'center' }}>
                                            <View style={style.form}>
                                                <Text style={style.labelkiri}>NIK</Text>
                                                <Text style={style.labelkanan}>:{item.nik_wali}</Text>
                                            </View>
                                            <View style={style.form}>
                                                <Text style={style.labelkiri}>Nama Wali</Text>
                                                <Text style={style.labelkanan}>:{item.nama_wali}</Text>
                                            </View>
                                            <View style={style.form}>
                                                <Text style={style.labelkiri}>Agama</Text>
                                                <Text style={style.labelkanan}>:{item.agama}</Text>
                                            </View>

                                            <View style={style.form}>
                                                <Text style={style.labelkiri}>Tempat Tanggal Lahir</Text>
                                                <Text style={style.labelkanan}>:{item.tempat_lahir} {item.tanggal_lahir}</Text>
                                            </View>
                                            <View style={style.form}>
                                                <Text style={style.labelkiri}>Alamat</Text>
                                                <Text style={style.labelkanan}>:{item.alamat}</Text>
                                            </View>
                                            <View style={style.form}>
                                                <Text style={style.labelkiri}>Penghasilan</Text>
                                                <Text style={style.labelkanan}>:{item.penghasilan} </Text>
                                            </View>
                                            <View style={style.form}>
                                                <Text style={style.labelkiri}>Hubungan Kerabat</Text>
                                                <Text style={style.labelkanan}>:{item.hub_kerabat} </Text>
                                            </View>
                                        </View>
                                        <View style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center', alignSelf: 'center', marginTop: 0, }}>
                                            <TouchableOpacity onPress={() => this.props.navigation.navigate('editdatawali', { detail: item })} style={style.refresh} >
                                                <View style={{
                                                    top: 20,
                                                    backgroundColor: '#0EBEDF', width: 170, height: 40, justifyContent: 'center', alignContent: 'center', alignItems: 'center', alignSelf: 'center', borderRadius: 10
                                                }}>
                                                    <Text style={{ color: '#fff', textAlign: 'center', justifyContent: 'center', alignContent: 'center' }}>Edit Data Wali </Text>
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                )}></FlatList>
                            : <View />
                        }
                        {this.state.lihatanak === true ?
                            <FlatList
                                refreshControl={
                                    <RefreshControl
                                        refreshing={this.state.refreshing}
                                        onRefresh={() => this.onRefresh()}
                                    />
                                }
                                data={this.state.anak1}
                                renderItem={({ item, index }) => (
                                    <View style={[{
                                        shadowColor: '#858585',
                                        overflow: 'hidden',
                                        shadowRadius: 15,
                                        elevation: 6,
                                        shadowOpacity: '25%',
                                        borderColor: '#7e7e7e',
                                        borderRadius: 15, fontSize: 12,
                                        backgroundColor: '#fff',
                                        color: '#000',
                                        marginVertical: 10,
                                        marginHorizontal: 16, flexDirection: 'row', backgroundColor: '#fff'
                                    }]} >
                                        <View >
                                            <Text style={style.labelatas}>Data Anak</Text>
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
                                            </View>
                                            <View style={style.form}>
                                                <Text style={style.labelkiri}>Donatur:</Text>
                                                {
                                                    item.id_donatur === '' | item.id_donatur === 'null' | item.id_donatur === null ?
                                                        <Text style={style.labelkanan}>Belum Memiliki donatur</Text>
                                                        :
                                                        <Text style={style.labelkanan}>{item.id_donatur}</Text>
                                                }
                                            </View>
                                        </View>
                                        <Image source={{
                                            uri:
                                                'https://kilauindonesia.org/datakilau/gambarUpload/' +
                                                item.foto,
                                        }} style={{ height: 80, width: 80, marginTop: 20, position: 'absolute', justifyContent: 'flex-end', right: 40, }}></Image>

                                    </View>
                                )} keyExtractor={
                                    (item, index) => index.toString()}
                                showsVerticalScrollIndicator={false}
                                ListEmptyComponent={() =>
                                    <View>
                                        <View style={{ flexDirection: 'column', }}>
                                            <View style={style.iconbesar}>
                                                <Tamnak />
                                            </View>
                                            <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'center', }}>Tidak Ada Anak Asuh</Text>
                                            <Text style={{ fontSize: 12, textAlign: 'center', }}>Yang Terdaftar</Text>
                                        </View>

                                        {/* <View style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center', alignSelf: 'center', marginTop: 20 }}>
                                            <TouchableOpacity style={style.btnSimpanbaru}>
                                                <View style={{ flexDirection: 'row' }}>
                                                    <Text style={{ color: '#fff' }}>Tambah Anak Asuh</Text>
                                                </View>
                                            </TouchableOpacity>
                                        </View> */}

                                    </View>
                                }></FlatList>
                            : <View />
                        }
                    </View>

                </View>
                <View style={{}}>
                    {this.state.lihatkeluarga === true ?
                        <View style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center', alignSelf: 'center', marginTop: 0, }}>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('editdatakel', { detail: this.state.detail })} style={style.refresh} >
                                <View style={{
                                    top: 20,
                                    backgroundColor: '#0EBEDF', width: 170, height: 40, justifyContent: 'center', alignContent: 'center', alignItems: 'center', alignSelf: 'center', borderRadius: 10
                                }}>
                                    <Text style={{ color: '#fff', textAlign: 'center', justifyContent: 'center', alignContent: 'center' }}>Edit Data Keluarga </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        : <View />}
                    {/* {this.state.lihatayah === true ?
                        <View style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center', alignSelf: 'center', marginTop: 0, }}>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('editdataayah', { detail: this.state.detail })} style={style.refresh} >
                                <View style={{
                                    top: 20,
                                    backgroundColor: '#0EBEDF', width: 170, height: 40, justifyContent: 'center', alignContent: 'center', alignItems: 'center', alignSelf: 'center', borderRadius: 10
                                }}>
                                    <Text style={{ color: '#fff', textAlign: 'center', justifyContent: 'center', alignContent: 'center' }}>Edit Data Ayah</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        : <View />} */}

                    {/* {this.state.lihatibu === true ?
                        <View style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center', alignSelf: 'center', marginTop: 0, }}>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('editdataibu', { detail: ibu })} style={style.refresh} >
                                <View style={{
                                    top: 20,
                                    backgroundColor: '#0EBEDF', width: 170, height: 40, justifyContent: 'center', alignContent: 'center', alignItems: 'center', alignSelf: 'center', borderRadius: 10
                                }}>
                                    <Text style={{ color: '#fff', textAlign: 'center', justifyContent: 'center', alignContent: 'center' }}>Edit Data Ibu </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        : <View />} */}

                </View>
            </View>
        )
    }
}
const style = StyleSheet.create({
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
    labelkirianak: {
        fontSize: 12,
        fontWeight: 'bold',
        marginVertical: 5,
        marginLeft: 20,
        width: 200,
    },
    labelkanan: {
        fontSize: 12,
        marginHorizontal: 5,
        width: 150,
    },
    labelkk: {
        fontSize: 12,
        marginHorizontal: 5,
        width: 200,
    },
    labelkanan2: {
        fontSize: 12,
        marginHorizontal: 5,
        width: 220,
    },
    labelkanan3: {
        marginHorizontal: 5,
        width: 200,
        height: 40,
        borderWidth: 1,
        borderColor: '#bdbdbd',
        justifyContent: 'center',
        alignContent: 'center'
    },
    labelkanan4: {
        marginHorizontal: 5,
        width: 200,
        height: 90,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#bdbdbd',
        justifyContent: 'center',
        alignContent: 'center'
    },
    kotak: {
        marginVertical: 10,
        marginHorizontal: 16,
        borderRadius: 15,
        shadowColor: '#858585',
        overflow: 'hidden',
        shadowRadius: 15,
        elevation: 6,
        shadowOpacity: '25%',
        borderColor: '#7e7e7e',
        height: 300
    },
    kotakbtn: {
        marginVertical: 10,
        marginHorizontal: 16,
        borderRadius: 15,
        shadowColor: '#858585',
        overflow: 'hidden',
        shadowRadius: 15,
        elevation: 6,
        shadowOpacity: '25%',
        borderColor: '#7e7e7e',
    },
    kotakank: {
        marginVertical: 10,
        marginHorizontal: 16,
        borderRadius: 15,
        shadowColor: '#858585',
        overflow: 'hidden',
        shadowRadius: 15,
        elevation: 6,
        shadowOpacity: '25%',
        borderColor: '#7e7e7e',
    },
    labelatas: {
        fontSize: 14,
        marginLeft: 20,
        marginBottom: 5,
        marginTop: 5,
        fontWeight: 'bold',
    },
    Textinputcss: {
        width: windowWidth - 40,
        color: '#C0C0C0',
        marginTop: -10,
        borderRadius: 10,
        borderWidth: 1,
        fontSize: 10,
        height: 40,
        borderColor: '#C0C0C0',
        fontFamily: 'Poppins-Regular',
    },
    refresh: {
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
        // marginHorizontal: 5,
        bottom: 10,
    },//vildan
    body: {
        backgroundColor: '#EEEEEE',
        borderColor: '#CECBCB',
        borderRadius: 10,
        borderWidth: 3,
        borderStyle: 'dashed',
        backgroundColor: '#ffff',
        marginTop: 10,
        width: '90%',
        height: 200,
        justifyContent: 'center',
        alignSelf: 'center',
        marginBottom: 10
    },
    itemflat: {
        flex: 1,
        fontSize: 12,
        flexDirection: 'row',
        marginLeft: 15,
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
    },
    iconbesar: {
        marginTop: 50,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
    },
    refresh: {
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
        bottom: 0,
    },
})
export default detailkeluarga