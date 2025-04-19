import { Text, View, StyleSheet, TextInput, Image, TouchableOpacity, ToastAndroid } from 'react-native'
import React, { Component } from 'react'
// import { IconMarker } from '../../assets/icons';
import {
    orang3, siswa2
} from '../../assets/images'
import { IconMarker, UpLoc } from '../../assets/icons';
import { connect } from 'react-redux';
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps'
export class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            detail: this.props.route.params.det,
            koor: [],
            forceRefresh: 0,
            mapType: 'hybrid',
            markers: {
                coordinate: {
                    latitude: 0,
                    longitude: 0,
                },
            }

        };
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
    editData() {
        {
            let simpandata = {
                latitude: this.state.markers.coordinate.latitude,
                longitude: this.state.markers.coordinate.longitude,

            }
            let data = new FormData();
            for (let key in simpandata) {
                data.append(key, simpandata[key]);
            }
            fetch('https://kilauindonesia.org/datakilau/api/kooranakupd/' + this.props.route.params.det.id_anak, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'multipart/form-data'
                },
                body: data,
            })
                .then((res) => res.json())
                .then((resJson) => {
                    console.log(resJson);
                    if (resJson.status === 'sukses') {
                        this.props.navigation.navigate('List_Anak_Binaan')
                        ToastAndroid.show("Data berhasil diperbaharui!", ToastAndroid.SHORT)
                    } else {
                        alert(`Data gagal disimpan !!!`);
                    }
                })
                .catch((err) => console.log('dari catch send Data ===', err));
        }

    }


    componentDidMount() {
        // this.Getkooranak();
        // this.GetDetAPi(),
        // BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
        // Firebase.initializeApp(this);
        // this.requestCameraPermission();
        console.log(this.state.detail.latitude, this.state.detail.longitude);
    }
    onMapPress(e) {
        this.setState({
            markers:
            {
                coordinate: e.nativeEvent.coordinate,

            },

        });
        console.log(this.state.markers)
    }
    render() {
        const lat = parseFloat(this.state.detail.latitude).toFixed()
        const long = parseFloat(this.state.detail.longitude).toFixed()
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
                    style={style.map}
                    initialRegion={{
                        latitude: parseFloat(this.state.detail.latitude),
                        longitude: parseFloat(this.state.detail.longitude),
                        latitudeDelta: 0.001,
                        longitudeDelta: 0.003
                    }}
                    onRegionChange={this.onRegionChange}
                    showsUserLocation={true}
                    followUserLocation={true}
                    zoomEnabled={true}
                    showsScale={true}
                    mapType={this.state.mapType}
                    userLocationCalloutEnabled={true}
                    followsUserLocation={true}
                    userLocationAnnotationTitle={true}
                    onPress={e => this.onMapPress(e)}
                >
                    <Marker draggable coordinate={{
                        latitude: parseFloat(this.state.detail.latitude),
                        longitude: parseFloat(this.state.detail.longitude),
                        latitudeDelta: 0.04,
                        longitudeDelta: 0.05,

                    }}>
                        <Callout tooltip >
                            <View style={style.bubble}>
                                <View style={{ width: 130, }}>
                                    <Text style={style.kotak3}>{this.state.detail.full_name}</Text>
                                    <Text style={style.kotak3}>{this.state.detail.jenis_kelamin}</Text>
                                    {/* <Text style={style.kotak3}>Jalan Sudirman Rt:0200 Rw:1200 Sumedang selatan kabupaten sumedang</Text> */}
                                </View>
                                <View style={{ borderWidth: 0.7, height: '100%', borderColor: '#007a87', marginHorizontal: 10 }} />
                                <View>
                                    <Text>ini gambar</Text>
                                    <Image source={siswa2} style={{ width: 60, height: 60, }}></Image>
                                </View>

                            </View>
                            <View style={style.arrowborder}></View>
                            <View style={StyleSheet.arrow}></View>
                        </Callout>
                    </Marker>
                    {this.props.user.presensi === 'karyawan' ? //non donatur//
                        <Marker
                            key={this.state.markers.key}
                            coordinate={this.state.markers.coordinate}
                            pinColor={this.state.markers.color}
                        >
                            <Callout tooltip >
                                <View style={[style.bubble, { width: 150 }]}>
                                    <Text >Ini Koordinat baru</Text>
                                </View>
                                <View style={style.arrowborder}></View>
                                <View style={StyleSheet.arrow}></View>
                            </Callout>
                            {/* <View style={style.marker}>
                            <Image source={require('../../assets/images/IconMarker2.png')} />
                            <Text style={style.text}>
                                {JSON.stringify(this.state.markers.coordinate)}</Text>


                        </View> */}

                        </Marker>
                        : <View />}


                </MapView >
                {/* <TouchableOpacity style={style.refresh} onPress={() => this.setState({ mapType: this.state.mapType === 'hybrid' ? 'standard' : 'hybrid' })}>
                    <UpLoc />
                </TouchableOpacity> */}
                {
                    this.props.user.presensi === 'karyawan' ? //non donatur//
                        <TouchableOpacity style={{
                            padding: 10,
                            position: 'absolute',
                            bottom: 30,
                            marginLeft: '25%',
                            textAlign: 'center',
                            borderRadius: 5,
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: '#0EBEDF', width: 170, height: 40, borderRadius: 10
                        }} onPress={() =>
                            this.props.navigation.navigate('editdataanak',
                                { mapType: this.state.mapType === 'hybrid' ? 'standard' : 'hybrid' }, this.editData())}>
                            <Text style={{ color: '#fff' }}>Ubah Koordinat Anak</Text>
                        </TouchableOpacity>
                        : <View />
                }
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
    map: {
        ...StyleSheet.absoluteFillObject,
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
});
const mapStateToProps = (state) => {
    return {
        user: state,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        changeUser: (data) => dispatch({ type: 'CHANGE/USER', payload: data }),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(index);