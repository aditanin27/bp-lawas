import { Text, View, StyleSheet, TextInput, FlatList,TouchableOpacity,RefreshControl } from 'react-native'
import React, { Component } from 'react'
import { LocationsH, Orangbanyakhitam, FilterdanText, IconCari } from '../../assets/icons'

export class ListShelter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            laporan: [],
            jumlah: [],
            filter: [],
            cari: '',
            refreshing: false,

        };
    }
    GetLaporanAPi() {
        fetch('https://kilauindonesia.org/datakilau/api/shelterfil').then(res => {
            if (res.status === 200)
                return res.json()
        }).then((resdata) => {
            console.log('ini resdata get', resdata);
            const length = resdata.data.length;
            if (length > 0) {
                this.setState({
                    laporan: resdata.data,
                    filter: resdata.data,
                    refreshing: false,

                });
            } else {
                this.setState({
                    laporan: resdata.data,
                    filter: resdata.data,
                    refreshing: false,
                });
            }
        })
    }
    componentDidMount() {
        this.GetLaporanAPi();
    }
    filterList(textToSearch) {
        this.setState({
            filter: this.state.laporan
                .filter(i => i.nama_shelter.toLowerCase(textToSearch).includes(textToSearch))
        })
    }
    render() {
        return (
            <View style={{ backgroundColor: '#FFF', flex: 1 }}>
                <View style={{ backgroundColor: '#0EBEDF', height: 90 }}>
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
                            placeholder="Cari Shelter"
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
                </View>
                <FlatList
                    style={{ marginBottom: 25 }}
                    data={this.state.filter}
                    renderItem={({ item, index }) => (
                        <View>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('DetailShelter', { item: item })}>
                                <View style={style.itemflat}>
                                    <View style={{ justifyContent: 'space-between', flexDirection: 'row', marginHorizontal: '10%' }}>
                                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                                            <LocationsH />
                                            <Text style={[style.labelkiri,]}>Shelter {item.nama_shelter}</Text>
                                        </View>
                                        {/* <View style={{ flexDirection: 'row', }}>
                                    <View style={{ flexDirection: 'column' }}>
                                        <Text style={style.labelkiri}>BCPB {BCPB.length}</Text>
                                        <Text style={style.labelkiri}>CPB {CPB.length}</Text>
                                    </View>
                                    <View style={{ flexDirection: 'column' }}>
                                        <Text style={style.labelkiri}>NPB {NPB.length}</Text>
                                        <Text style={style.labelkiri}>PB {PB.length}</Text>

                                    </View>
                                </View> */}
                                    </View>
                                </View>
                            </TouchableOpacity>

                        </View>
                    )
                    }></FlatList >

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
        marginTop: 15,
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
export default ListShelter