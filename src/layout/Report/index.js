import { Text, TouchableOpacity, View, StyleSheet } from 'react-native'
import React, { Component } from 'react'

export class index extends Component {
    render() {
        return (
            <View style={{ backgroundColor: '#FFF', flex: 1 }}>
                <Text style={{ textAlign: 'center', fontSize: 15, marginTop: 10 }}>List Report</Text>
                <View style={{ marginTop: 10 }}>
                    <View style={style.itemflat}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('JumlahDonatur')}>
                            <Text style={style.labelkiri}>Laporan Jumlah Donatur</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={style.itemflat}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Jumlahlistshelter')}>
                            <Text style={style.labelkiri}>Laporan Jumlah Anak</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={style.itemflat}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Aktif')}>
                            <Text style={style.labelkiri}>Laporan Anak</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={style.itemflat}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('ListShelter')}>
                            <Text style={style.labelkiri}>Laporan Aktifitas</Text>
                        </TouchableOpacity>
                    </View>
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
        height: 60,
        width: '90%',
        justifyContent: 'center',
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
    labelkiri: {
        fontSize: 12,
        fontWeight: 'bold',
        marginVertical: 5,
        marginLeft: 10,
    },
});
export default index