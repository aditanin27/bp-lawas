import {
    Text, View, StyleSheet, FlatList, SafeAreaView, Dimensions,
    RefreshControl, TouchableOpacity, Image
} from 'react-native'
import React, { Component } from 'react'
import {
    Plus,
    Math,
    IconCari,
    FilterdanText,
    Location,
    Book,
    Document,
    Adduser,
    TKP,
    TP,
    Arrowleft,
    LabelBimbel,
} from '../../assets/icons';
import {
    search,
    arrow,
    plus,
    Background,
    addfoto,
    Union,
    x,
    test
} from '../../assets/images';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
export class Pel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            refreshing: true,
            pelatihan: [],
            detail: this.props.route.params.detail,
        };
    }
    GetPelatihanAPi() {
        fetch('https://kilauindonesia.org/datakilau/api/pelatihantutor/' + this.state.detail.id_tutor)
            .then(res => {
                if (res.status === 200) return res.json();
            })
            .then(resdata => {
                console.log(resdata.data);
                this.setState({
                    pelatihan: resdata.data,
                    filter: resdata.data,
                    refreshing: false,
                });
            });
    }
    componentDidMount() {
        this.GetPelatihanAPi();
        console.log(this.props);
    }
    onRefresh() {
        this.GetPelatihanAPi();
        this.setState({ refreshing: false });
    }
    render() {
        const detail = this.state.detail
        return (
            <SafeAreaView style={{ backgroundColor: '#fff', flex: 1 }}>

                <View style={{ backgroundColor: '#fff', flexDirection: 'row', height: 70, width: '100%', paddingHorizontal: '7%', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Arrowleft />
                    <Text style={{ color: '#000', fontFamily: 'Poppins-SemiBold', fontSize: 16, right: width / 4 }}>Pelatihan Tutor</Text>
                </View>
                {/* <View style={{flexDirection:'row'}}> */}
                <FlatList
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={() => this.onRefresh()}
                        />
                    }
                    data={this.state.pelatihan}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={style.itemflat}
                        >
                            <View>
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                    }}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Image
                                            source={test}
                                            style={{
                                                justifyContent: 'center',
                                                height: 40,
                                                width: 40,
                                                borderRadius: 45,
                                                color: '#000',
                                            }}
                                        />
                                        <View
                                            style={{ flexDirection: 'column', marginLeft: 10 }}>
                                            <Text
                                                style={{
                                                    color: '#000',
                                                    fontFamily: 'Poppins-Medium',
                                                    fontSize: 14,
                                                }}>
                                                {detail.nama}
                                            </Text>
                                            <Text>{item.tingkat_pelatihan}</Text>
                                        </View>
                                    </View>

                                    <View
                                        style={{
                                            flexDirection: 'column',
                                            alignItems: 'flex-end',
                                        }}>
                                        <Text style={style.labelbaru5}>{item.Tahun}</Text>
                                    </View>
                                </View>
                                <View
                                    style={{
                                        borderWidth: 0.3,
                                        borderColor: '#c0c0c0',
                                        width: '100%',
                                        marginTop: 10,
                                    }}
                                />
                                <Image source={addfoto} style={style.img2}></Image>
                                <View style={style.form}>
                                    <Text style={style.labelkiri}>Jenis</Text>
                                    <Text style={style.labelkanan}>{item.jenis_pelatihan}</Text>
                                </View>
                                <View style={style.form}>
                                    <Text style={[style.labelkiri, { width: 150 }]}>Nama Pelatihan</Text>
                                    <Text style={[style.labelkanan, { marginLeft: -32 }]}>{item.nama_pelatihan}</Text>
                                </View>
                                <View style={[style.form, { width: 300 }]}>

                                </View>
                            </View>
                        </TouchableOpacity>
                    )}></FlatList>

            </SafeAreaView>
        )
    }
}
const style = StyleSheet.create({
    itemflat: {
        fontSize: 12,
        flexDirection: 'row',
        padding: 10,
        backgroundColor: '#fff',
        width: '90%',
        color: '#000',
        marginVertical: 20,
        justifyContent: 'center',
        alignSelf: 'center',
        shadowColor: '#858585',
        overflow: 'hidden',
        shadowRadius: 15,
        elevation: 6,
        shadowOpacity: '25%',
        borderColor: '#7e7e7e',
        borderRadius: 15,
    },
    form: {
        flexDirection: 'row',
        width: '100%'
    },
    labelkiri: {
        fontWeight: 'bold',
        marginVertical: 5,
        marginLeft: 0,
        width: 60,
    },
    labelkanan: {
        marginHorizontal: 5,
        marginVertical: 5,
        width: 100,
    },
    img2: {
        width: '100%',
        height: 170,
        marginTop: 10,
        borderRadius: 10,
    },
    labelbaru5: {
        fontFamily: 'Poppins-Medium',
        fontSize: 12,
        marginLeft: 10,
        color: '#C0C0C0',
    },
})
export default Pel