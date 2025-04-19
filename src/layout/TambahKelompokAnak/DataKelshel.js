import {
    ScrollView, Text, ViewBackground, TextInput,
    View, StyleSheet, TouchableOpacity, FlatList, RefreshControl, Image
} from 'react-native'
import React, { Component } from 'react'
import {
    test,

} from '../../assets/images';
import {
    IconCari,
    FilterdanText,
    JenisH,
    TingkatH,
    LocationsH,
    Locationabu,
    Banyakanak,
} from '../../assets/icons';
export class DataKelshel extends Component {
    constructor(props) {
        super(props)
        this.state = {
            text: '',
            Shelter: [],
            refreshing: true,

        }
    }
    GetShelterAPi() {
        fetch('https://kilauindonesia.org/datakilau/api/shelterfil')
            .then(res => {
                if (res.status === 200) return res.json();
            })
            .then(resdata => {
                console.log(resdata.data);
                this.setState({
                    Shelter: resdata.data,
                    filter: resdata.data,
                    refreshing: false,

                });
            });
    }
    componentDidMount() {
        this.GetShelterAPi();

        console.log(this.props);
    }

    
    onRefresh() {
        this.GetAnakAPi();
        this.setState({ refreshing: false });
    }
    render() {
        return (
            <ScrollView style={{ backgroundColor: '#fff' }}>
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
                            onChangeText={text => this.filterList(text)}
                            value={this.state.text}
                            placeholder="Cari"
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
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={() => this.onRefresh()}
                        />
                    }
                    data={this.state.Shelter}
                    renderItem={({ item }) => (
                        <View>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('ListKelompok', { item: item })}>
                                <View style={style.itemflat}>
                                    <View style={{ justifyContent: 'space-between', flexDirection: 'row', marginHorizontal: '10%' }}>
                                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                                            <LocationsH />
                                            <Text style={[style.labelkiri,]}>Shelter {item.nama_shelter}</Text>
                                        </View>

                                    </View>
                                </View>
                            </TouchableOpacity>

                        </View>
                    )}></FlatList>
            </ScrollView>
        )
    }
}
const style = StyleSheet.create({
    IconCari: {
        position: 'absolute',
        top: 8,
        left: 20,
    },
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
    labelkiri: {
        fontSize: 12,
        fontWeight: 'bold',
        marginVertical: 5,
        marginLeft: 10,
    },
});
export default DataKelshel