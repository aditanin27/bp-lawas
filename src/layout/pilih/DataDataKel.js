import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import React, { Component } from 'react'

export class DataDataKel extends Component {
    render() {
        const jumlah = this.props.route.params.belummasuk
        console.log(this.props.route.params.belummasuk)
        return (
            <View style={{ backgroundColor: '#fff', flex: 1 }}>
                <View style={style.itemflat}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('DataValidasi')}>
                        {jumlah === 0 ?
                            <View /> :
                            jumlah < 100 ?
                                <View style={{
                                    // marginTop: 0, marginRight: 10,
                                    position: 'absolute', top: -2, right: 3, backgroundColor: "red", padding: 5,
                                    justifyContent: 'center', borderRadius: 30
                                }}>
                                    <Text style={{ fontSize: 11, justifyContent: "center", alignSelf: 'center', marginTop: -2, color: '#fff', fontWeight: 'bold' }}>{jumlah}</Text>
                                </View>
                                :
                                <View style={{
                                    // marginTop: 0, marginRight: 10,
                                    position: 'absolute', top: -15, right: 3, backgroundColor: "red", padding: 5,
                                    justifyContent: 'center', borderRadius: 90, height: 32,
                                }}>
                                    <Text style={{ fontSize: 10, justifyContent: "center", alignSelf: 'center', marginTop: -2, color: '#fff', fontWeight: 'bold' }}>{jumlah}</Text>
                                </View>
                        }
                        <Text style={style.labelkiri}>Data Validasi </Text>
                    </TouchableOpacity>
                </View>
                <View style={style.itemflat}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Keluarga')}>
                        <Text style={style.labelkiri}>List Keluarga</Text>
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
        height: 60,
        width: '90%',
        justifyContent: 'center',
    },
    labelkiri: {
        fontSize: 12,
        fontWeight: 'bold',
        marginVertical: 5,
        marginLeft: 10,
    },
});
export default DataDataKel