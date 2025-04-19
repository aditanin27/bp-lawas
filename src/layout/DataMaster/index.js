import { Text, View, TouchableOpacity, StyleSheet, Modal, SafeAreaView, ToastAndroid } from 'react-native'
import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Close } from '../../assets/icons';
export class index extends Component {
    constructor(props) {
        super(props)
        this.state = {
            wilayah: false,
        }
    }
    render() {
        return (
            <View style={{ backgroundColor: '#fff', flex: 1 }}>
                <View style={style.itemflat}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Bank')}>
                        <Text style={style.labelkiri}>List Bank</Text>
                    </TouchableOpacity>
                </View>

                <View style={style.itemflat}>
                    <TouchableOpacity onPress={() => this.setState({ wilayah: true })}>
                        <Text style={style.labelkiri}>Data Wilayah</Text>
                    </TouchableOpacity>
                </View>

                <View style={style.itemflat}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Barang')}>
                        <Text style={style.labelkiri}>Data Barang Pengajuan Anak</Text>
                    </TouchableOpacity>
                </View>

                <View style={style.itemflat}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('UserManagement')}>
                        <Text style={style.labelkiri}>User Management</Text>
                    </TouchableOpacity>
                </View>


                <Modal animationType={"fade"} transparent={true}
                    visible={this.state.wilayah}
                    onRequestClose={() => this.setState({ wilayah: false })}>
                    <SafeAreaView style={style.containerSafe}>
                        <TouchableOpacity activeOpacity={1.0} onPress={() => this.setState({ wilayah: false })} style={style.ModalCont}>
                            {this.props.user.presensi === 'admin' ? //admin cabang
                                <View style={{
                                    paddingTop: 5,
                                    marginHorizontal: 10,
                                    backgroundColor: '#fff',
                                    // flexDirection: 'row',
                                    borderRadius: 20,
                                    height: 250,
                                    shadowColor: "#333",
                                    shadowOffset: {
                                        width: 1,
                                        height: 1,
                                    },
                                    shadowOpacity: 0.3,
                                    shadowRadius: 2,
                                    elevation: 3,
                                    alignItems: 'center'
                                }}>
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('DataMaster', this.setState({ wilayah: false }))} style={{ position: 'absolute', right: 20, top: 20 }}>
                                        <Close />
                                    </TouchableOpacity>
                                    <Text style={style.txtPresensi}>Pilih Data yang ingin di lihat</Text>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                                        <View style={[style.kotakkecil, { backgroundColor: '#00A9B8' }]}>
                                            <TouchableOpacity onPress={() => this.props.navigation.navigate('Datawilayah', this.setState({ wilayah: false }))}>
                                                {/* <KKada style={{ justifyContent: 'center', alignSelf: 'center' }} /> */}
                                                <Text style={{ color: '#fff', textAlign: 'center', padding: 5, fontWeight: 'bold' }}>Data Wilayah Binaan</Text>
                                            </TouchableOpacity>
                                        </View>

                                        <View style={[style.kotakkecil, { backgroundColor: '#00A9B8', }]}>
                                            <TouchableOpacity onPress={() => this.props.navigation.navigate('Datashelter', this.setState({ wilayah: false }))}>
                                                {/* <KKada style={{ justifyContent: 'center', alignSelf: 'center' }} /> */}
                                                <Text style={{ color: '#fff', textAlign: 'center', padding: 5, fontWeight: 'bold' }}>Data Shelter</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>

                                    <View style={{ marginTop: '5%', alignItems: 'center', flexDirection: 'row', alignContent: 'center', }}>
                                        <TouchableOpacity onPress={() => this.setState({ wilayah: false }) + ToastAndroid.show('Batal', ToastAndroid.SHORT)}>
                                            <View style={{ height: 50, borderColor: '#00A9B8', borderWidth: 1, width: 100, justifyContent: 'center', alignItems: 'center', alignSelf: 'center', borderRadius: 5 }}>
                                                <Text style={{ color: '#00A9B8', fontFamily: 'Poppins-Medium', fontSize: 14 }}>Batal</Text>
                                            </View>
                                        </TouchableOpacity>

                                    </View>
                                </View>
                                :
                                <View />
                            }
                            {this.props.user.presensi === 'karyawan' ? //admin Pusat
                                <View style={{
                                    paddingTop: 5,
                                    marginHorizontal: 10,
                                    backgroundColor: '#fff',
                                    // flexDirection: 'row',
                                    borderRadius: 20,
                                    height: 250,
                                    shadowColor: "#333",
                                    shadowOffset: {
                                        width: 1,
                                        height: 1,
                                    },
                                    shadowOpacity: 0.3,
                                    shadowRadius: 2,
                                    elevation: 3,
                                    alignItems: 'center'
                                }}>
                                    {/* <TouchableOpacity onPress={() => this.props.navigation.navigate('Home', this.setState({ wilayah: false }))} style={{ position: 'absolute', right: 20, top: 20 }}>
                                        <Close />
                                    </TouchableOpacity> */}
                                    <Text style={style.txtPresensi}>Pilih Data yang ingin di lihat</Text>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 10 }}>
                                        <View style={[style.kotakkecil, {
                                            backgroundColor: '#00A9B8', width: '30%', height: '60%',
                                        }]}>
                                            <TouchableOpacity onPress={() => this.props.navigation.navigate('Datakacab', this.setState({ wilayah: false }))}>
                                                {/* <KKada style={{ justifyContent: 'center', alignSelf: 'center' }} /> */}
                                                <Text style={{ color: '#fff', textAlign: 'center', padding: 5, fontWeight: 'bold' }}>Data Kacab</Text>
                                            </TouchableOpacity>
                                        </View>
                                        <View style={[style.kotakkecil, { backgroundColor: '#00A9B8', width: '30%', height: '60%', }]}>
                                            <TouchableOpacity onPress={() => this.props.navigation.navigate('Datawilayah', this.setState({ wilayah: false }))}>
                                                {/* <KKada style={{ justifyContent: 'center', alignSelf: 'center' }} /> */}
                                                <Text style={{ color: '#fff', textAlign: 'center', padding: 5, fontWeight: 'bold' }}>Data Wilayah Binaan</Text>
                                            </TouchableOpacity>
                                        </View>

                                        <View style={[style.kotakkecil, { backgroundColor: '#00A9B8', width: '30%', height: '60%', }]}>
                                            <TouchableOpacity onPress={() => this.props.navigation.navigate('Datashelter', this.setState({ wilayah: false }))}>
                                                {/* <KKada style={{ justifyContent: 'center', alignSelf: 'center' }} /> */}
                                                <Text style={{ color: '#fff', textAlign: 'center', padding: 5, fontWeight: 'bold' }}>Data Shelter</Text>
                                            </TouchableOpacity>
                                        </View>

                                    </View>

                                    <View style={{ marginTop: '5%', alignItems: 'center', flexDirection: 'row', alignContent: 'center', }}>
                                        <TouchableOpacity onPress={() => this.setState({ wilayah: false }) + ToastAndroid.show('Batal', ToastAndroid.SHORT)}>
                                            <View style={{ height: 50, borderColor: '#00A9B8', borderWidth: 1, width: 100, justifyContent: 'center', alignItems: 'center', alignSelf: 'center', borderRadius: 5 }}>
                                                <Text style={{ color: '#00A9B8', fontFamily: 'Poppins-Medium', fontSize: 14 }}>Batal</Text>
                                            </View>
                                        </TouchableOpacity>

                                    </View>
                                </View>
                                :
                                <View />
                            }
                        </TouchableOpacity>
                    </SafeAreaView>
                </Modal>
            </View>

        )
    }
}

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
    containerSafe: {
        flex: 1,
        flexDirection: 'column',
    },
    ModalCont: {
        flex: 1,
        justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: '#00000099',
        paddingHorizontal: 10,
    },
    kotakkecil: {
        flexDirection: 'column',
        borderColor: '#bdbdbd',
        borderWidth: 1,
        width: '40%',
        height: 100,
        justifyContent: 'center',
        alignContent: 'center',
        alignSelf: 'center',
        textAlign: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginTop: 10,
        marginHorizontal: 10,
    },
});