import { Text, View, StyleSheet, TextInput, Image, TouchableOpacity } from 'react-native'
import React, { Component } from 'react'
import { IconMarker, Locationabu, UpLoc } from '../../assets/icons';
import {
    orang3, siswa2
} from '../../assets/images'
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps'
export class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            latitude: 0,
            longitude: 0,
            latitudeDelta: 0.001,
            longitudeDelta: 0.003,
            key:'',
            markers: {
                coordinate: {
                    latitude: 0,
                    longitude: 0,
                },
            
            },
            koor: [],
            forceRefresh: 0,
            mapType: 'standard',
            id: '',
            marker: null

        };
    }
    // Getkooranak() {

    //     fetch('https://kilauindonesia.org/datakilau/api/getkooranak/'+this.state.detail)
    //         .then(res => {
    //             if (res.status === 200)
    //                 return res.json()
    //         }).then(resdata => {
    //             console.log(resdata.data)
    //             this.setState({
    //                 det: resdata.data,

    //             })
    //         })
    // }
    rendermarker() {
        return (
            <Marker
                coordinate={{
                    latitude: 0,
                    longitude: 0
                }}
            >
                <View >
                    <Image source={require('../../assets/images/IconMarker.png')} />
                </View>
            </Marker>)


    }
    switchMapType() {
        console.log('Changing');
        this.setState({ mapType: this.state.mapType === 'satellite' ? 'standard' : 'satellite' });
    }
    renderCircle() {
        return sel_kan.map((map, index) => {
            const { id, unit, latitude, longitude } = map
            return (
                <MapView.Circle
                    key={(latitude + longitude).toString()}
                    center={{
                        latitude: parseFloat(latitude),
                        longitude: parseFloat(longitude)
                    }}
                    radius={30}
                    strokeWidth={2}
                    strokeColor={WARNA_SEKUNDER}
                    fillColor={"rgba(230,238,255,0.5)"}
                />
            )
        })

    }

    onMapPress(e) {
        this.setState({
            markers:
            {
                coordinate: e.nativeEvent.coordinate,
                key: id,
            },

        });

        // SaveAddress = () => {
        //     console.log(JSON.stringify(this.state.markers[0].coordinate.latitude))
        // }
    }


    componentDidMount() {

        console.log();
    }
    render() {
        // const lat = parseFloat(this.state.detail.latitude).toFixed()
        // const long = parseFloat(this.state.detail.longitude).toFixed()
        const tokyoRegion = {
            latitude: -6.95,
            longitude: 107.57,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
        };
        return (
            // <View>
            //     <Text>awdaw</Text>
            // </View>

            <View style={{ flex: 1 }}>
                <MapView
                    key={this.state.forceRefresh}
                    provider={this.props.provider}
                    style={style.map}
                    initialRegion={{
                        latitude: this.state.latitude,
                        longitude: this.state.longitude,
                        latitudeDelta: 0.001,
                        longitudeDelta: 0.003
                    }}
                    onUserLocationChange={(e) => this.setState({
                        latitude: e.nativeEvent.coordinate.latitude,
                        longitude: e.nativeEvent.coordinate.longitude,
                    })}
                    showsUserLocation={true}
                    followUserLocation={true}
                    zoomEnabled={true}
                    showsScale={true}
                    mapType={this.state.mapType}
                    onPress={e => this.onMapPress(e)}
//                     onPress={(e) => this.setState({ marker: e.nativeEvent.coordinate })}>
// {
//       // if state contains marker variable with a valid value, render the marker
//       this.state.marker &&
//       <MapView.Marker coordinate={this.state.marker} />
// }
                >
                    <Marker
                        key={this.state.key}
                        coordinate={{
                            latitude: this.state.latitude,
                            longitude: this.state.longitude,
                            latitudeDelta: 0.001,
                            longitudeDelta: 0.003
                        }}
                        followUserLocation={true}
                    >
                        <Callout tooltip >
                            {/* <View style={style.bubble}>
                                <View style={{ width: 130, }}>
                                    <Text style={style.kotak3}>
                                        {JSON.stringify(this.state.markers.coordinate)}</Text>
                                </View>
                            </View> */}
                            <View style={style.arrowborder}></View>
                            <View style={StyleSheet.arrow}></View>


                        </Callout>



                        {/* <View style={style.marker}>
                            <Image source={require('../../assets/images/IconMarker2.png')} />
                            <Text style={style.text}>
                                {JSON.stringify(this.state.markers.coordinate)}</Text>
                        </View> */}

                    </Marker>
                    {/* <TouchableOpacity>
                        <Text>Kembali</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text>Simpan</Text>
                    </TouchableOpacity> */}
                </MapView>
                <TouchableOpacity style={style.refresh} onPress={() => this.setState({ mapType: this.state.mapType === 'hybrid' ? 'standard' : 'hybrid' })}>
                    <UpLoc />
                </TouchableOpacity>

                <View style={style.buttonCallout}>
                    <TouchableOpacity style={style.btnSimpan} onPress={() => this.props.navigation.navigate('DetailTamAnakBinaan', { region: this.state.region })}>
                        <Text style={{ color: '#fff', fontFamily: 'Poppins-Medium', fontSize: 15 }}>Terapkan</Text>
                    </TouchableOpacity>
                </View>

            </View >
        )
    }
}
const style = StyleSheet.create({
    arrow: {
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        borderTopColor: '#fff',
        borderWidth: 16,
        alignSelf: 'center',
        marginTop: -32,
    },
    arrowborder: {
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        borderTopColor: '#fff',
        borderWidth: 16,
        alignSelf: 'center',
        marginTop: -0.5,

    },
    bubble: {
        flexDirection: 'row',
        alignSelf: 'flex-start',
        backgroundColor: '#fff',
        borderRadius: 6,
        borderColor: '#ccc',
        borderWidth: 0.5,
        padding: 15,
        width: 250,
    },
    container: {
        ...StyleSheet.absoluteFillObject,
        flex: 1, //the container will fill the whole screen.
        justifyContent: "flex-end",
        alignItems: "center",
    },
    kotak3: {
        fontSize: 13,

    },
    buttonCallout: {
        flex: 1,
        position: 'absolute',
        bottom: 10,
        alignSelf: "center",
        justifyContent: "center",
        alignItems: 'center',
        backgroundColor: "transparent",
    },
    btnSimpan: {
        width: '100%',
        fontWeight: 'bold',
        backgroundColor: '#87CEEB',
        borderRadius: 10,
        padding: 10,
        justifyContent: 'center', alignItems: 'center',
        alignContent: 'center',
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#fff'
    },
    refresh: {
        padding: 10,
        position: 'absolute',
        bottom: 70,
        right: 10,
        flexDirection: 'row',
        borderRadius: 5,
        // marginHorizontal: 5,
        height: 45,
        alignItems: 'center',
        justifyContent: 'center'
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
});
export default index
