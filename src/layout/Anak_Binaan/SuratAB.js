import {
    Modal, FlatlList, Dimensions, video,
    SafeAreaView, ScrollView, Text, View,
    Image, TextInput, StyleSheet, TouchableOpacity, ToastAndroid, ImageBackground, FlatList, RefreshControl
} from 'react-native'
import React, { Component } from 'react'
import * as ImagePicker from 'react-native-image-picker';
import { Collapse, CollapseHeader, CollapseBody, AccordionList } from 'accordion-collapse-react-native';
import { search, arrow, SK1 } from '../../assets/images'
import { r6 } from '../../assets/vid'
// import Video from 'react-native-video'
import { connect } from 'react-redux'
import { Calendar, email, juara, addfoto2, addfoto, addvid } from '../../assets/images'
import { Tamnak } from '../../assets/icons'
import AsyncStorage from '@react-native-async-storage/async-storage';

// import ImagePicker from 'react-native-image-crop-picker';

class SuratAB extends Component {
    constructor(props) {
        super(props)
        this.state = {
            gambar: '',
            psnimg: {
                0: {
                    image: {
                        name: '',
                        type: '',
                        uri: 'https://static.thenounproject.com/png/187803-200.png'
                    },
                }
            },
            video: {
                0: {
                    v: {
                        name: '',
                        type: '',
                        uri: 'https://static.thenounproject.com/png/187803-200.png'
                    },
                }
            },
            img1: null,
            img2: 0,
            vid: null,
            vid1: 0,
            text: '',
            pesan: '',
            rate: 1,
            volume: 1,
            muted: false,
            resizeMode: 'contain',
            duration: 0.0,
            currentTime: 0.0,
            paused: true,
            modaldetail: false,
            det: [],
            surat: [],
            refreshing: true,
            detail: this.props.route.params.id_anak,

        }
    }
    onLoad = (data) => {
        this.setState({ duration: data.duration });
    };

    onProgress = (data) => {
        this.setState({ currentTime: data.currentTime });
    };

    onEnd = () => {
        this.setState({ paused: true })
        this.video.seek(0)
    };

    onAudioBecomingNoisy = () => {
        this.setState({ paused: true })
    };


    getCurrentTimePercentage() {
        if (this.state.currentTime > 0) {
            return parseFloat(this.state.currentTime) / parseFloat(this.state.duration);
        }
        return 0;
    };

    renderResizeModeControl(resizeMode) {
        const isSelected = (this.state.resizeMode === resizeMode);

        return (
            <TouchableOpacity onPress={() => { this.setState({ resizeMode }) }}>
                <Text style={[style.controlOption, { fontWeight: isSelected ? 'bold' : 'normal' }]}>
                    {resizeMode}
                </Text>
            </TouchableOpacity>
        )
    }
    takeVidGal(index) {
        {
            ImagePicker.launchImageLibrary(
                {
                    mediaType: 'video',
                    videoQuality: 'high',
                    noData: true,
                    saveToPhotos: true,
                    title: 'Video',
                    maxWidth: 720,
                    maxHeight: 360,
                    compressImageQuality: 0.5,
                    storageOptions: {
                        skipBackup: false,
                        path: 'Video',
                    },
                },
                (response) => {
                    console.log('Response = ', response);

                    if (response.didCancel) {
                        console.log('User cancelled video picker');
                    } else if (response.error) {
                        console.log('ImagePicker Error: ', response.error);
                    } else {
                        const source = {
                            v: {
                                uri: response.assets[0].uri,
                                name: response.assets[0].fileName,
                                type: response.assets[0].type,
                            }
                            //   id: 0,
                        };
                        console.log('ini gambar = ', source);
                        this.setState(prevState => {
                            prevState.video[index] = source
                            //   prevState.tgl_lahir[index] != this.props.route.params.tgl_lahir[index] ? this.setState({tglmbuh : true}) : this.setState({tglmbuh : false});
                            return {
                                video: prevState.video
                            }
                        }, () => console.log(this.state.video));
                        this.setState({
                            vid: index,
                            vid1: index,
                        });
                        console.log('ini gambar = ', this.state.video);
                    }
                },
            );
        }
    }
    takeVid(index) {
        {
            ImagePicker.launchCamera(
                {
                    mediaType: 'video',
                    videoQuality: 'high',
                    noData: true,
                    saveToPhotos: true,
                    title: 'Video',
                    maxWidth: 720,
                    maxHeight: 360,
                    compressImageQuality: 0.5,
                    storageOptions: {
                        skipBackup: false,
                        path: 'Video',
                    },
                },
                (response) => {
                    console.log('Response = ', response);

                    if (response.didCancel) {
                        console.log('User cancelled video picker');
                    } else if (response.error) {
                        console.log('ImagePicker Error: ', response.error);
                    } else {
                        const source = {
                            v: {
                                uri: response.assets[0].uri,
                                name: response.assets[0].fileName,
                                type: response.assets[0].type,
                            }
                            //   id: 0,
                        };
                        console.log('ini gambar = ', source);
                        this.setState(prevState => {
                            prevState.video[index] = source
                            //   prevState.tgl_lahir[index] != this.props.route.params.tgl_lahir[index] ? this.setState({tglmbuh : true}) : this.setState({tglmbuh : false});
                            return {
                                video: prevState.video
                            }
                        }, () => console.log(this.state.video));
                        this.setState({
                            vid: index,
                            vid1: index,
                        });
                        console.log('ini gambar = ', this.state.video);
                    }
                },
            );
        }
    }
    takePic(index) {
        {
            ImagePicker.launchCamera(
                {
                    noData: true,
                    saveToPhotos: true,
                    title: 'Select Photo',
                    maxWidth: 300,
                    maxHeight: 400,
                    compressImageQuality: 0.5,
                    storageOptions: {
                        skipBackup: false,
                        path: 'images',
                    },
                },
                (response) => {
                    console.log('Response = ', response);

                    if (response.didCancel) {
                        console.log('User cancelled image picker');
                    } else if (response.error) {
                        console.log('ImagePicker Error: ', response.error);
                    } else {
                        const source = {
                            image: {
                                uri: response.assets[0].uri,
                                name: response.assets[0].fileName,
                                type: response.assets[0].type,
                            }
                            //   id: 0,
                        };
                        console.log('ini gambar = ', source);
                        this.setState(prevState => {
                            prevState.psnimg[index] = source
                            //   prevState.tgl_lahir[index] != this.props.route.params.tgl_lahir[index] ? this.setState({tglmbuh : true}) : this.setState({tglmbuh : false});
                            return {
                                psnimg: prevState.psnimg
                            }
                        }, () => console.log(this.state.psnimg));
                        this.setState({
                            img1: index,
                            img2: index,
                        });
                        console.log('ini gambar = ', this.state.psnimg);
                    }
                },
            );
        }
    }
    componentDidMount() {
        this.GetDetAPi(),
            // BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
            // Firebase.initializeApp(this);
            // this.requestCameraPermission();
            this.onRefresh()
        console.log(this.state.detail);
    }
    onRefresh() {
        this.GetDetAPi();
        this.setState({ refreshing: false });
    }
    GetDetAPi() {
        AsyncStorage.getItem('token').then((token) => {
            fetch('https://kilauindonesia.org/datakilau/api/detailanaksurat/' + this.state.detail, {
                headers: {
                    Authorization: 'Bearer ' + token,
                    // 'Accept': 'application/json',
                    // 'Content-Type': 'application/json'
                },
            }).then((res) => res.json())
                .then((resJson) => {
                    console.log('oke');
                    const length = resJson.data.length;
                    this.setState({
                        surat: resJson.data,
                        filter: resJson.data,
                        refreshing: false,
                    });
                })
                .catch((err) => console.log('error catch home', err));
        });
    }

    render() {
        const det = this.state.det

        const inputbutton = [];
        for (let i = 0; i < this.state.count; i++) {
            <>
                <View key={i}>
                    <Text>{i + 1}.</Text>
                    <Picker
                        style={style.Textinputcss}
                        selectedValue={this.state.rap}
                        value={this.state.tr[i]}
                        onValueChange={itemValue =>
                            this.setState({ rap: itemValue, show: 1 })
                        }>
                        <Picker.Item label="Pilih" value="" />
                        <Picker.Item label="SD/MI" value="SD/MI" />
                        <Picker.Item label="SMP/MTS" value="SMP/MTS" />
                        <Picker.Item label="SMA/SMK/MA" value="SMA/SMK/MA" />
                    </Picker>
                </View>
            </>;
        }
        const flexCompleted = this.getCurrentTimePercentage() * 100;
        const flexRemaining = (1 - this.getCurrentTimePercentage()) * 100;
        var psnimg = [];
        for (let i = 0; i <= this.state.img2; i++) {
            psnimg.push(
                <Image
                    style={{ width: 200, height: 200, resizeMode: 'contain' }}
                    source={this.state.psnimg[i].image}
                />
            )
        }
        var video = [];
        for (let i = 0; i <= this.state.vid1; i++) {
            video.push(
                <Image
                    style={{ width: 200, height: 200, resizeMode: 'contain' }}
                    source={this.state.video[i].v}
                />
            )
        }

        return (
            <View contentContainer style={style.contentContainer} showsVerticalScrollIndicator={true}>
                <View style={{ backgroundColor: '#0EBEDF' }}>
                    <Text style={style.title1}>Surat Anak Asuh</Text>
                </View>
                {this.props.user.presensi === '' ? // pengelola / admin 
                    <ScrollView >
                        <FlatList
                            refreshControl={
                                <RefreshControl
                                    refreshing={this.state.refreshing}
                                    onRefresh={() => this.onRefresh()}
                                />
                            }
                            data={this.state.surat}
                            renderItem={({ item }) => (
                                <TouchableOpacity onPress={() => this.setState({ modaldetail: true, det: item })}>
                                    <View style={style.kotakabu}>
                                        <Image source={{ uri: 'https://kilauindonesia.org/datakilau/gambarUpload/' + item.foto }} style={style.img}></Image>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignContent: 'space-between' }}>
                                            <Text style={style.labelbaru}>PESAN</Text>
                                            <Text style={style.labelbaru1}>{item.tanggal}</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Text numberOfLines={2} style={{ width: '70%', marginLeft: 10, }}>{item.pesan}</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            )}
                            keyExtractor={
                                (item, index) => index.toString()}
                            showsVerticalScrollIndicator={false}
                            ListEmptyComponent={() =>
                                <View>
                                    <View style={{ flexDirection: 'column', }}>
                                        <View style={style.iconbesar}>
                                            <Tamnak />
                                        </View>
                                        <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'center', }}>Anak Asuh Belum</Text>
                                        <Text style={{ fontSize: 12, textAlign: 'center', }}>Mengirimkan Surat</Text>
                                    </View>

                                </View>
                            }>
                        </FlatList>
                    </ScrollView>

                    :
                    <View />
                }

                {
                    this.props.user.presensi === 'admin' ? //donatur
                        <SafeAreaView>

                            <FlatList
                                data={this.state.surat}
                                renderItem={({ item }) => (
                                    <TouchableOpacity onPress={() => this.setState({ modaldetail: true, det: item })}>
                                        <View style={style.kotakabu}>
                                            <Image source={juara} style={style.img}></Image>
                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignContent: 'space-between' }}>
                                                <Text style={style.labelbaru}>PESAN</Text>
                                                <Text style={style.labelbaru1}>{item.tanggal}</Text>
                                            </View>
                                            <View style={{ flexDirection: 'row' }}>
                                                <Text numberOfLines={2} style={{ width: '70%', marginLeft: 10, }}>{item.pesan}</Text>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                )}
                                keyExtractor={
                                    (item, index) => index.toString()}
                                showsVerticalScrollIndicator={false}
                                ListEmptyComponent={() =>
                                    <View>
                                        <View style={{ flexDirection: 'column', }}>
                                            <View style={style.iconbesar}>
                                                <Tamnak />
                                            </View>
                                            <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'center', }}>Anak Asuh Belum</Text>
                                            <Text style={{ fontSize: 12, textAlign: 'center', }}>Mengirimkan Surat</Text>
                                        </View>
                                    </View>

                                }>
                            </FlatList>
                            
                            <View >
                                <View>

                                </View>
                            </View>
                        </SafeAreaView>
                        :
                        <View />
                }

                {this.props.user.presensi === '' ? // pengelola / admin 

                    <View style={{
                        justifyContent: 'center', alignContent: 'center', alignItems: 'center',
                        alignSelf: 'center', marginTop: 20, position: 'absolute',
                    }}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('DetailTamSuratCinta', { detail: this.state.detail })} style={style.refresh} >
                            <View style={{
                                backgroundColor: '#0EBEDF', width: 170, height: 40, justifyContent: 'center', alignContent: 'center', alignItems: 'center', alignSelf: 'center', borderRadius: 10
                            }}>
                                <Text style={{ color: '#fff', textAlign: 'center', justifyContent: 'center', alignContent: 'center' }}>+ Tambah Rapot</Text>
                            </View>
                        </TouchableOpacity>
                    </View>



                    :
                    <View />
                }
                <Modal
                    animationType={"slide"}
                    transparent={true}
                    visible={this.state.modaldetail}
                    onRequestClose={() => this.setState({ modaldetail: false })}
                    style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                    <View style={style.ModalCont2}>
                        <View style={{
                            paddingTop: 5,
                            backgroundColor: '#ffffff',
                            borderTopLeftRadius: 10,
                            borderTopRightRadius: 10,
                            height: '100%',
                            shadowColor: "#333",
                            shadowOffset: {
                                width: 1,
                                height: 1,
                            },
                            shadowOpacity: 0.3,
                            shadowRadius: 2,
                            elevation: 3,
                            alignItems: 'center',
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            right: 0,
                        }}>
                            <Text>Detail</Text>
                            <SafeAreaView style={{ width: '100%', height: '100%' }}>
                                <Image source={{ uri: 'https://kilauindonesia.org/datakilau/gambarUpload/' + det.foto }} style={style.img}></Image>
                           
                                <ScrollView>
                                    <View>
                                        <TouchableOpacity onLongPress={() => { this.setState({ modaldetail: false }) }}>
                                            <Text style={{
                                                marginTop: 10,
                                                marginBottom: 10,
                                                textAlign: 'center',
                                                fontSize: 16,
                                                fontWeight: 'bold',
                                            }}>Isi Pesan</Text>
                                            <Text style={{
                                                margin: 15,
                                                textAlign: 'justify',

                                            }}>
                                                {det.pesan}
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                           
                                </ScrollView>
                            </SafeAreaView>
                        </View>
                    </View>
                </Modal>
            </View >

        )
    }
}
const style = StyleSheet.create({
    contentContainer: {
        backgroundColor: '#fff',
        width: '100%',
        height: '100%',
        flex: 1
    },
    Label1: {
        flex: 1,
        fontSize: 12,
        padding: 5,
        color: '#000000',
        flexDirection: 'column',
    },
    Textinputcss: {
        color: '#7e7e7e',
        marginLeft: 30,
        marginRight: 10,
        borderRadius: 10,
        borderWidth: 1,
        fontSize: 12,
        height: 52,
        backgroundColor: '#fff',
        shadowColor: "#333",
        shadowOffset: {
            width: 1,
            height: 1,
        },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        borderColor: '#7e7e7e',
        elevation: 3,
    },
    Label2: {
        marginTop: 5,
        marginLeft: 25,
        padding: 5,
        color: '#000',
        alignItems: 'center',
        justifyContent: 'center'
    },
    kotak2: {
        color: '#000000',
        marginTop: 10,
        marginLeft: 30,
        marginRight: 10,
        borderRadius: 2,
        borderWidth: 0.1,
        fontSize: 12,
        height: 52,
        backgroundColor: '#7e7e7',
    },
    title1: {
        marginRight: 20,
        marginLeft: 20,
        marginTop: 15,
        marginBottom: 15,
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
    },
    Labeltgl: {
        marginTop: 5,
        position: 'absolute',
        top: 0, left: 10, right: 0, bottom: 0,
        height: 25, width: 25,
    },
    item: {
        flex: 1,
        fontSize: 16,
        flexDirection: 'row',
        backgroundColor: '#fff',
        padding: 17,
        marginVertical: 8,
        marginHorizontal: 16,
        shadowColor: "#333",
        shadowOffset: {
            width: 1,
            height: 1,
        },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        borderColor: '#7e7e7e',
        elevation: 3,
    },
    container: {
        marginTop: 40,
        marginLeft: 75,
        width: 250,
        height: 250,
        flex: 1,
        margin: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        shadowColor: "#333",
        shadowOffset: {
            width: 1,
            height: 1,
        },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        borderColor: '#7e7e7e',
        elevation: 3,
    },
    btnSimpanDark: {
        width: '40%',
        fontWeight: 'bold',
        backgroundColor: '#87cefa',
        borderRadius: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: '#E9E9E9',
        textAlign: 'center',
        justifyContent: 'center', alignItems: 'center'
    },
    btnSimpanUn1: {
        width: '40%',
        fontWeight: 'bold',
        backgroundColor: '#C6C6C6',
        borderRadius: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: '#E9E9E9',
        justifyContent: 'center', alignItems: 'center',
        alignContent: 'center',
        textAlign: 'center',
    },
    coltom1: {
        width: '90%',
        marginLeft: 20,
        justifyContent: 'space-between',
        alignItems: 'center',
        alignContent: 'center',
        fontSize: 16,
        flexDirection: 'row',
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: '#fff',
        marginVertical: 8,
        marginHorizontal: 16,
        shadowColor: "#333",
        shadowOffset: {
            width: 1,
            height: 1,
        },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        borderColor: '#7e7e7e',
        elevation: 3,
    },
    backgroundVideo: {
        flex: 1,
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
    fullScreen: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
    controls: {
        backgroundColor: 'transparent',
        borderRadius: 5,
        position: 'absolute',
        bottom: -5,
        left: 10,
        right: 10,
    },
    progress: {
        flex: 1,
        flexDirection: 'row',
        borderRadius: 3,
        overflow: 'hidden',
    },
    innerProgressCompleted: {
        height: 10,
        backgroundColor: '#B22222',
    },
    innerProgressRemaining: {
        height: 10,
        backgroundColor: '#2C2C2C',
    },
    generalControls: {
        flex: 1,
        flexDirection: 'row',
        borderRadius: 4,
        overflow: 'hidden',
        paddingBottom: 10,
    },
    rateControl: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    volumeControl: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    resizeModeControl: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    controlOption: {
        alignSelf: 'center',
        fontSize: 11,
        color: 'white',
        paddingLeft: 2,
        paddingRight: 2,
        lineHeight: 12,
    },
    trackingControls: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    itemflat: {
        fontSize: 16,
        flexDirection: 'column',
        backgroundColor: '#fff',
        padding: 20,
        height: 75,
        shadowColor: "#333",
        shadowOffset: {
            width: 1,
            height: 1,
        },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        borderColor: '#7e7e7e',
        elevation: 1,
    },
    ModalCont2: {
        flex: 1,
        backgroundColor: '#00000079',
    },
    wrap: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height * 0.25 // 25% window
    },
    itemText: {
        textAlign: 'justify',
        marginLeft: 10,
        fontSize: 12,
        width: '35%',
        height: 43,
    },
    kotakabu: {
        shadowColor: "#333",
        shadowOffset: {
            width: 1,
            height: 1,
        },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        elevation: 3,
        width: '95%',
        height: 250,
        borderRadius: 15,
        borderWidth: 1,
        marginLeft: 10,
        marginTop: 10,
        borderColor: '#E9E9E9',
        backgroundColor: '#fff',
    },
    img: {
        width: '95%',
        height: 150,
        marginLeft: 10,
        marginTop: 10,
        borderRadius: 10,
    },
    labelbaru: {
        fontSize: 16,
        marginTop: 10,
        marginLeft: 10
    },
    labelbaru1: {
        fontSize: 12,
        marginRight: 5,
        marginTop: 10,
        marginLeft: 10

    },
    labelbaru2: {
        fontSize: 12,
        marginLeft: 10,
        marginTop: 10
    },
    iconbesar: {
        marginTop: 50,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
    },
    kotakabu2: {
        shadowColor: '#333',
        shadowOffset: {
            width: 1,
            height: 1,
        },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        elevation: 3,
        width: '100%',
        height: 250,
        borderRadius: 15,
        marginTop: 10,
        backgroundColor: 'white',
        paddingHorizontal: 10
    },
    img2: {
        width: '100%',
        height: 150,
        marginTop: 10,
        borderRadius: 10,
    }, //vildan
    labelbaru3: {
        fontSize: 16,
        marginTop: 10,
        fontWeight: 'bold',
        color: '#000'
    }, //vildan
    labelbaru4: {
        fontSize: 12,
        color: '#000',
        marginTop: 10
    }, //vildan
    labelbaru5: {
        fontSize: 12,
        marginLeft: 10,
        color: '#000'
    }, //vildan

    refresh: {
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
        // marginHorizontal: 5,
        bottom: 10,
        position: 'absolute',
        top: 600
    },//vildan
    label5: {
        color: '#fff',
        padding: 10,
        fontFamily: 'Poppins-Medium',
        fontSize: 13,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
    },
    BSimpan: {
        backgroundColor: '#00A9B8',
        borderRadius: 10,
        marginHorizontal: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 15,

    },
    BSimpan2: {
        height: 70,
        width: 260,
        position: 'absolute',
        justifyContent: 'center',
        alignSelf: 'center',
        top: 620,
       
        borderRadius: 40
    },
    refresh: {
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
        bottom: 10,
        position: 'absolute',
        top: 600
    },
    btnSimpanbaru: {
        width: '55%',
        fontWeight: 'bold',
        backgroundColor: '#0EBEDF',
        borderRadius: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: '#0EBEDF',
        justifyContent: 'center', alignItems: 'center',
        textAlign: 'center',
        color: '#fff',


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
export default connect(mapStateToProps, mapDispatchToProps)(SuratAB);