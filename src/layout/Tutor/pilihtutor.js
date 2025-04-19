import { Text, View } from 'react-native'
import React, { Component } from 'react'

export class pilihtutor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filt_anak1: [],
        };
    }
    componentDidMount() {
        this.GetTutorAPi();      
        console.log(this.props);
      }
    GetTutorAPi() {
        fetch('https://kilauindonesia.org/datakilau/api/tutor')
            .then(res => {
                if (res.status === 200) return res.json();
            })
            .then(resdata => {
                console.log(resdata.data);
                this.setState({
                    Tutor: resdata.data,
                    filt_anak1: resdata.data,
                    refreshing: false,
                });
            });
    }
    render() {
        return (
            <View>
                <Text>Pilih Tutor</Text>
                <FlatList
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={() => this.onRefresh()}
                        />
                    }
                    data={this.state.filt_anak1}
                    renderItem={({ item }) => (
                        <View>
                            <TouchableOpacity
                                style={style.itemflat}
                                onPress={() => this.props.navigation.navigate('ProfilTutor', { item: item, })}>
                                <View
                                    style={{
                                        height: 90,
                                        width: '100%',
                                        justifyContent: 'center',
                                        justifyContent: 'center',
                                    }}>
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Image
                                                source={test}
                                                // source={{
                                                //   uri:
                                                //     'https://www.kilauindonesia.org/datakilau/gambarDonatur/' +
                                                //     item.gambar_donatur,
                                                // }}
                                                style={{
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    alignSelf: 'center',
                                                    height: 70,
                                                    width: 70,
                                                    borderRadius: 45,
                                                    color: '#000',
                                                }}
                                            />
                                            {/* <View style={style.Label1}>
                          <Text>{item.nama} </Text>
                          <Text>{item.email}</Text>
                        </View> */}
                                            <View
                                                style={{ flexDirection: 'column', marginLeft: 10 }}>
                                                <Text
                                                    style={{
                                                        color: '#000',
                                                        fontFamily: 'Poppins-Medium',
                                                        fontSize: 16,
                                                        marginLeft: 10,
                                                    }}>
                                                    {item.nama}
                                                </Text>
                                                <Text
                                                    style={{
                                                        color: '#000',
                                                        fontFamily: 'Poppins-Regular',
                                                        fontSize: 14,
                                                        marginLeft: 10,
                                                    }}>
                                                    {item.pendidikan}
                                                </Text>
                                                <View
                                                    style={{
                                                        flexDirection: 'row',
                                                        marginLeft: 10,
                                                        marginTop: 10,
                                                        justifyContent: 'center',
                                                    }}>
                                                    <Bukuabu />
                                                    <Text
                                                        style={{
                                                            color: '#5D5C5D',
                                                            fontFamily: 'Poppins-Regular',
                                                            fontSize: 12,
                                                            marginLeft: 5,
                                                            marginRight: 10,
                                                        }}>
                                                        {item.mapel}
                                                    </Text>
                                                    <Locationabu />
                                                    <Text
                                                        style={{
                                                            color: '#5D5C5D',
                                                            fontFamily: 'Poppins-Regular',
                                                            fontSize: 12,
                                                            marginLeft: 5,
                                                            marginRight: 10,
                                                        }}>
                                                        {item.nama_wilbin}
                                                    </Text>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </View>
                    )}></FlatList>
            </View>

        )
    }
}

export default pilihtutor