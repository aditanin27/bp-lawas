import { Dimensions, Text, ToastAndroid, TouchableNativeFeedback, View } from 'react-native'
import React, { Component } from 'react'
import {
    Arrowleft, ArrowleftWhite, Book, GenderAbu, IconAktifitas, IconBook,
    IconProfile, Jenis, JenisAbu, LocationAbu1, PanahKan, TogaAbu
} from '../../assets/icons';


const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

export class ProfilTutor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            detail: this.props.route.params.item,
        };
    }
    componentDidMount() {
        // this.GetDetAPi(),
        console.log(this.state.detail);
    }
    render() {
        const { detail } = this.state;
        return (

            <View style={{ backgroundColor: '#01A2B0', width: width, height: height, alignItems: 'center' }}>
                <TouchableNativeFeedback onPress={() => ToastAndroid.show('Kembali', ToastAndroid.SHORT,)}>
                    <ArrowleftWhite style={{ top: '3%', right: '40%' }} />
                </TouchableNativeFeedback>
                <View style={{ backgroundColor: '#fff', width: width, height: '76%', top: '22%', borderTopLeftRadius: 30, borderTopRightRadius: 30 }}>
                    <View style={{ top: '42%', paddingHorizontal: '8%' }}>
                        <View style={{ borderBottomColor: '#c0c0c0', borderBottomWidth: 1, }} />
                    </View>
                    <View style={{ top: '70%', paddingHorizontal: '8%' }}>
                        <View style={{ borderBottomColor: '#c0c0c0', borderBottomWidth: 1, }} />
                    </View>
                    <View style={{ alignItems: 'center', top: '17%' }}>
                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ color: '#000', fontFamily: 'Poppins-Medium', fontSize: 16, }}>{detail.nama}</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', left: '10%' }}>
                                <JenisAbu style={{ right: 10 }} />
                                <Text style={{ color: '#C0C0C0', fontFamily: 'Poppins-Medium', fontSize: 12, }}>{detail.mapel}</Text>
                            </View>
                        </View>
                        <View style={{ marginTop: '4%', flexDirection: 'row', width: '100%', justifyContent: 'space-between', paddingHorizontal: '14%', }}>
                            <View style={{ flexDirection: 'column', alignItems: 'center', right: '30%' }}>
                                <GenderAbu />
                                <Text style={{ color: '#c0c0c0', fontFamily: 'Poppins-Medium', fontSize: 14 }}>Laki-laki</Text>
                            </View>
                            <View style={{ borderRightColor: '#c0c0c0', borderRightWidth: 1, right: '30%' }} />
                            <View style={{ flexDirection: 'column', alignItems: 'center', right: '20%' }}>
                                <LocationAbu1 />
                                <Text style={{ color: '#c0c0c0', fontFamily: 'Poppins-Medium', fontSize: 14 }}>{detail.nama_kacab}</Text>
                            </View>
                            <View style={{ borderRightColor: '#c0c0c0', borderRightWidth: 1, right: '10%' }} />
                            <View style={{ flexDirection: 'column', alignItems: 'center', left: '10%' }}>
                                <TogaAbu />
                                <Text style={{ color: '#c0c0c0', fontFamily: 'Poppins-Medium', fontSize: 14, }}>{detail.pendidikan}</Text>
                            </View>
                        </View>
                    </View>

                </View>
                <View style={{ backgroundColor: '#C0C0C0', width: 130, height: 130, borderRadius: 120, position: 'absolute', top: '16%' }} />
                <View style={{ top: '-22%', width: '100%' }}>
                    <TouchableNativeFeedback onPress={() => this.props.navigation.navigate('DetailTutor', { detail: detail }, ToastAndroid.show('Detail Identitas Diklik', ToastAndroid.SHORT,))}>
                        <View style={{ marginTop: '4%', flexDirection: 'row', width: '100%', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: '8%' }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <IconProfile />
                                <Text style={{ left: '45%', color: '#000', fontFamily: 'Poppins-Medium', fontSize: 14, right: '30%' }}>Detail Identitas</Text>
                            </View>
                            <PanahKan />
                        </View>
                    </TouchableNativeFeedback>
                    <TouchableNativeFeedback onPress={() => this.props.navigation.navigate('AktifitasTutor', { detail: detail })}>
                    <View style={{ marginTop: '4%', flexDirection: 'row', width: '100%', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: '8%' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <IconAktifitas />
                            <Text style={{ left: '45%', color: '#000', fontFamily: 'Poppins-Medium', fontSize: 14, right: '30%' }}>Aktivitas Tutor</Text>
                        </View>
                        <PanahKan />
                    </View>
                </TouchableNativeFeedback>
                <TouchableNativeFeedback onPress={() => this.props.navigation.navigate('Pel', { detail: detail })}>
                    <View style={{ marginTop: '4%', flexDirection: 'row', width: '100%', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: '8%' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                            <IconBook />
                            <Text style={{ left: '45%', color: '#000', fontFamily: 'Poppins-Medium', fontSize: 14, right: '30%' }}>Pelatihan Tutor</Text>
                        </View>
                        <PanahKan />
                    </View>
                </TouchableNativeFeedback>
                <View style={{ top: '15%', width: '100%' }}>
                    <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between', paddingHorizontal: '10%', }}>
                        <Text style={{ color: '#000', fontFamily: 'Poppins-Reguler', fontSize: 14, }}>Kantor Cabang</Text>
                        <Text style={{ color: '#000', fontFamily: 'Poppins-Reguler', fontSize: 14 }}>{detail.nama_kacab}</Text>
                    </View>
                    <View style={{ marginTop: '3%', flexDirection: 'row', width: '100%', justifyContent: 'space-between', paddingHorizontal: '10%', }}>
                        <Text style={{ color: '#000', fontFamily: 'Poppins-Reguler', fontSize: 14, }}>Wilayah Binaan</Text>
                        <Text style={{ color: '#000', fontFamily: 'Poppins-Reguler', fontSize: 14, }}>{detail.nama_wilbin}</Text>
                    </View>
                    <View style={{ marginTop: '3%', flexDirection: 'row', width: '100%', justifyContent: 'space-between', paddingHorizontal: '10%', }}>
                        <Text style={{ color: '#000', fontFamily: 'Poppins-Reguler', fontSize: 14, }}>Shelter</Text>
                        <Text style={{ color: '#000', fontFamily: 'Poppins-Reguler', fontSize: 14, }}>{detail.nama_shelter}</Text>
                    </View>
                    <Text>
                    </Text>
                </View>
            </View>

            </View >
        )
    }
}

export default ProfilTutor