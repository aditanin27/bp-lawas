import { ScrollView, Text, View, TouchableOpacity, StyleSheet, Dimensions, FlatList } from 'react-native'
import React, { Component } from 'react'
import { r6 } from '../../assets/vid'
// import Video from 'react-native-video'
export class Doc extends Component {
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
            anakren: [],
        }
    }
    componentDidMount() {
        this.GetanakrenAPi();
    }
    GetanakrenAPi() {
        fetch('https://berbagibahagia.org/api/getanakrand').then(res => {
            if (res.status === 200)
                return res.json()
        }).then(resdata => {
            console.log(resdata.data)
            this.setState({
                anakren: resdata.data,
                filter: resdata.data,
                refreshing: false,

            })
        })
    }
    getCurrentTimePercentage() {
        if (this.state.currentTime > 0) {
            return parseFloat(this.state.currentTime) / parseFloat(this.state.duration);
        }
        return 0;
    };
    render() {
        var video = [];
        const flexCompleted = this.getCurrentTimePercentage() * 100;
        const flexRemaining = (1 - this.getCurrentTimePercentage()) * 100;
        return (

            <ScrollView style={{ backgroundColor: '#fff' }}>
                <View style={{ marginTop: 20, marginBottom: 10 }}>
                    <Text style={{ textAlign: 'center', fontSize: 16, fontWeight: 'bold' }}>Dokumentasi Pengguna</Text>
                </View>
                <View>
                            <TouchableOpacity
                                style={style.container}
                                onPress={() => this.setState({ paused: !this.state.paused })}
                            >
                                <Video
                                    ref={(ref) => { this.video = ref }}
                                    /* For ExoPlayer */

                                    // source={{ uri: 'https://youtu.be/iZnLZFRylbs.mp4' }}
                                    source={r6}// Can be a URL or a local file.
                                    style={style.fullScreen}
                                    rate={this.state.rate}
                                    paused={this.state.paused}
                                    volume={this.state.volume}
                                    muted={this.state.muted}
                                    canPlayFastForward={true}
                                    canStepForward={true}
                                    resizeMode={this.state.resizeMode}
                                    onLoad={this.onLoad}

                                    onProgress={this.onProgress}
                                    onEnd={this.onEnd}
                                    onAudioBecomingNoisy={this.onAudioBecomingNoisy}
                                    onAudioFocusChanged={this.onAudioFocusChanged}
                                    repeat={false}
                                />
                                <View style={style.controls}>
                                    <View style={style.generalControls}>
                                        <View style={style.trackingControls}>
                                            <View style={style.progress}>
                                                <View style={[style.innerProgressCompleted, { flex: flexCompleted }]} />
                                                <View style={[style.innerProgressRemaining, { flex: flexRemaining }]} />
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </View>
                

            </ScrollView>
        )
    }
}

export default Doc
const style = StyleSheet.create({

    contentContainer: {
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
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
        textAlign: 'center',
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
        marginTop: 10,
        marginLeft: 20,
        width: '90%',
        height: 250,
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
        marginTop: 10
    },
    labelbaru2: {
        fontSize: 12,
        marginLeft: 10,
        marginTop: 10
    },
    kotakbaru1: {
        shadowColor: "#333",
        shadowOffset: {
            width: 1,
            height: 1,
        },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        elevation: 3,
        width: 350,
        height: 100,
        borderRadius: 15,
        borderWidth: 1,
        marginLeft: 20,
        marginTop: 10,
        borderColor: '#E9E9E9',
        justifyContent: 'center',
        backgroundColor: '#fff'
    },
});