import {
  Text, View, TouchableOpacity, StyleSheet, RefreshControl,
  Dimensions, FlatList, Image, ScrollView, PermissionsAndroid
} from 'react-native'
import React, { Component } from 'react'
import { test } from '../../assets/images';
import { TingkatH, LocationsH, GenderH, } from '../../assets/icons';
var RNFS = require('react-native-fs');
import XLSX from 'xlsx';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

export class Detailjumlahanak extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jumlah: [],
      jumlah1: [],
      bcpb: false,
      npb: false,
      cpb: false,
      pb: false,
      refreshing: true,
      detail: this.props.route.params.detail,

    };
  }
  componentDidMount() {
    this.GetAnakAPi()
    this.GetAnakAPi1();
    console.log(this.GetAnakAPi());
  }
  GetAnakAPi1() {
    fetch('https://kilauindonesia.org/datakilau/api/joindatapend').then(res => {
      if (res.status === 200)
        return res.json()
    }).then((resdata) => {
      console.log('ini resdata get', resdata);
      const length = resdata.data.length;
      if (length > 0) {
        this.setState({
          jumlah1: resdata.data,
          refreshing: false,

        });
      } else {
        this.setState({
          jumlah1: resdata.data,
          refreshing: false,
        });
      }
    })
  }
  GetAnakAPi() {
    fetch('https://kilauindonesia.org/datakilau/api/getlaporananak/' + this.state.detail.id_shelter).then(res => {
      if (res.status === 200)
        return res.json()
    }).then((resdata) => {
      console.log('ini resdata get', resdata);
      const length = resdata.data.length;
      if (length > 0) {
        this.setState({
          jumlah: resdata.data,
          refreshing: false,

        });
      } else {
        this.setState({
          jumlah: resdata.data,
          refreshing: false,
        });
      }
    })
  }



  fucntion = async () => {
    const permission = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        title: 'dada',
        message: '',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK'
      }
    );

    if (permission === 'denied') return;
    if (permission === 'granted') {
      exportDataToExcel();
      console.log();
    }
  }
  semuaanak = () => {

    let wb = XLSX.utils.book_new();
    let ws = XLSX.utils.json_to_sheet(this.state.jumlah)
    XLSX.utils.book_append_sheet(wb, ws, "Users")
    const wbout = XLSX.write(wb, { type: 'binary', bookType: "xlsx" });

    // Write generated excel to Storage
    RNFS.writeFile(RNFS.DownloadDirectoryPath + '/Semua_anak.xlsx', wbout, 'ascii').then((r) => {
      console.log('Success');
    }).catch((e) => {
      console.log('Error', e);
    });

  }

  cpb = () => {
    const CPB = this.state.jumlah.filter(item => item.status_cpb === 'CPB')

    let wb = XLSX.utils.book_new();
    let ws = XLSX.utils.json_to_sheet(CPB)
    XLSX.utils.book_append_sheet(wb, ws, "Users")
    const wbout = XLSX.write(wb, { type: 'binary', bookType: "xlsx" });

    // Write generated excel to Storage
    RNFS.writeFile(RNFS.DownloadDirectoryPath + '/CPB_anak.xlsx', wbout, 'ascii').then((r) => {
      console.log('Success');
    }).catch((e) => {
      console.log('Error', e);
    });

  }
  npb = () => {
    const NPB = this.state.jumlah.filter(item => item.status_cpb === 'NPB')

    let wb = XLSX.utils.book_new();
    let ws = XLSX.utils.json_to_sheet(NPB)
    XLSX.utils.book_append_sheet(wb, ws, "Users")
    const wbout = XLSX.write(wb, { type: 'binary', bookType: "xlsx" });

    // Write generated excel to Storage
    RNFS.writeFile(RNFS.DownloadDirectoryPath + '/NPB_anak.xlsx', wbout, 'ascii').then((r) => {
      console.log('Success');
    }).catch((e) => {
      console.log('Error', e);
    });

  }

  bcpb = () => {
    const BCPB = this.state.jumlah.filter(item => item.status_cpb === 'BCPB')

    let wb = XLSX.utils.book_new();
    let ws = XLSX.utils.json_to_sheet(BCPB)
    XLSX.utils.book_append_sheet(wb, ws, "Users")
    const wbout = XLSX.write(wb, { type: 'binary', bookType: "xlsx" });

    // Write generated excel to Storage
    RNFS.writeFile(RNFS.DownloadDirectoryPath + '/BCPB_anak.xlsx', wbout, 'ascii').then((r) => {
      console.log('Success');
    }).catch((e) => {
      console.log('Error', e);
    });

  }
  pb = () => {
    const PB = this.state.jumlah.filter(item => item.status_cpb === 'PB')

    let wb = XLSX.utils.book_new();
    let ws = XLSX.utils.json_to_sheet(PB)
    XLSX.utils.book_append_sheet(wb, ws, "Users")
    const wbout = XLSX.write(wb, { type: 'binary', bookType: "xlsx" });

    // Write generated excel to Storage
    RNFS.writeFile(RNFS.DownloadDirectoryPath + '/PB_anak.xlsx', wbout, 'ascii').then((r) => {
      console.log('Success');
    }).catch((e) => {
      console.log('Error', e);
    });

  }
  handleClick = async () => {

    try {
      // Check for Permission (check if permission is already given or not)
      let isPermitedExternalStorage = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);

      if (!isPermitedExternalStorage) {

        // Ask for permission
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: "Storage permission needed",
            buttonNeutral: "Ask Me Later",
            buttonNegative: "Cancel",
            buttonPositive: "OK"
          }
        );


        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          // Permission Granted (calling our exportDataToExcel function)
          semuaanak();
          cpb();
          console.log("Permission granted");
        } else {
          // Permission denied
          console.log("Permission denied");
        }
      } else {
        // Already have Permission (calling our exportDataToExcel function)
        semuaanak();
        cpb();
      }
    } catch (e) {
      console.log('Error while checking permission');
      console.log(e);
      return
    }

  };

  render() {
    const CPB = this.state.jumlah.filter(item => item.status_cpb === 'CPB')
    const PB = this.state.jumlah.filter(item => item.status_cpb === 'PB')
    const BCPB = this.state.jumlah.filter(item => item.status_cpb === 'BCPB')
    const NPB = this.state.jumlah.filter(item => item.status_cpb === 'NPB')
    const detail = this.state.detail
    return (
      <View style={{ backgroundColor: '#fff', height: '100%' }}>
        <Text style={[style.labelkiri, { textAlign: 'center', fontSize: 18 }]}>Shelter {detail.nama_shelter}</Text>
        <View style={{ justifyContent: 'center', flexDirection: 'row', }}>
          <TouchableOpacity style={[style.kotakbtn, {
            marginHorizontal: 15, width: '25%',
            backgroundColor: this.state.bcpb === false ? '#fff' : '#0EBEDF',
            borderColor: this.state.bcpb === false ? '#bdbdbd' : '#fff',
            padding: 8, borderRadius: 5
          }]} onPress={() => this.setState({
            cpb: false, bcpb: !this.state.bcpb, npb: false, pb: false,
          })}>
            <Text style={{ color: this.state.bcpb === false ? '#000' : '#fff', textAlign: 'center' }}>List BCPB</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[style.kotakbtn, {
            marginHorizontal: 15, width: '25%',
            backgroundColor: this.state.npb === false ? '#fff' : '#0EBEDF',
            borderColor: this.state.npb === false ? '#bdbdbd' : '#fff',
            padding: 8, borderRadius: 5
          }]} onPress={() => this.setState({
            bcpb: false, npb: !this.state.npb, cpb: false, pb: false,
          })}>
            <Text style={{ color: this.state.npb === false ? '#000' : '#fff', textAlign: 'center' }}>List NPB</Text>
          </TouchableOpacity>

        </View>

        <View style={{ justifyContent: 'center', flexDirection: 'row', }}>
          <TouchableOpacity style={[style.kotakbtn, {
            marginHorizontal: 15, width: '25%',
            backgroundColor: this.state.cpb === false ? '#fff' : '#0EBEDF',
            borderColor: this.state.cpb === false ? '#bdbdbd' : '#fff',
            padding: 8, borderRadius: 5
          }]} onPress={() => this.setState({
            bcpb: false, cpb: !this.state.cpb, npb: false, pb: false,
          })}>
            <Text style={{ color: this.state.cpb === false ? '#000' : '#fff', textAlign: 'center' }}>List CPB</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[style.kotakbtn, {
            marginHorizontal: 15, width: '25%',
            backgroundColor: this.state.pb === false ? '#fff' : '#0EBEDF',
            borderColor: this.state.pb === false ? '#bdbdbd' : '#fff',
            padding: 8, borderRadius: 5
          }]} onPress={() => this.setState({
            bcpb: false, pb: !this.state.pb, cpb: false, npb: false,
          })}>
            <Text style={{ color: this.state.pb === false ? '#000' : '#fff', textAlign: 'center' }}>List PB</Text>
          </TouchableOpacity>

        </View>

        <ScrollView>
          {this.state.cpb === true ?
            <View>
              <FlatList
                refreshControl={
                  <RefreshControl
                    refreshing={this.state.refreshing}
                    onRefresh={() => this.onRefresh()}
                  />
                }
                data={CPB}
                renderItem={({ item, index }) => (
                  <View style={{}}>
                    <TouchableOpacity
                      onPress={() => this.props.navigation.navigate('Detail1', { id_anak: item.id_anak, item: item })}>
                      <View style={style.itemflat}>
                        <View style={{
                          width: '10%', justifyContent: 'center',
                          backgroundColor: item.status_cpb === 'CPB' ? '#0076B8' : '#000' &&
                            item.status_cpb === 'PB' ? '#00B855' : '#000' && item.status_cpb === 'NPB' ? '#E32845' : '#000' && item.status_cpb === 'BCPB' ? '#FFBB0C' : '#000'
                        }}>
                          <View style={{ width: '40%', justifyContent: 'center', alignItems: 'center', alignSelf: 'center', alignContent: 'center' }}>
                            <Text style={{ fontSize: 12, fontFamily: 'Poppins-Medium', color: '#fff' }}>{item.status_cpb}</Text>
                          </View>
                        </View>
                        <View
                          style={{
                            height: 90,
                            width: '100%',
                            justifyContent: 'center',
                          }}>
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}>
                            <View style={{ flexDirection: 'row' }}>
                              <Image source={test}
                                style={{
                                  height: 50,
                                  width: 50,
                                  borderRadius: 45,
                                  color: '#000',
                                  marginRight: 30
                                }}
                              />
                              <View
                                style={{ flexDirection: 'column', marginLeft: '-10%', justifyContent: 'center', width: '70%' }}>
                                <Text style={{ color: '#000', fontFamily: 'Poppins-Medium', fontSize: 14, marginLeft: 10, }}>
                                  {item.full_name}
                                </Text>
                                <View style={{ flexDirection: 'row' }}>
                                  <View style={{ flexDirection: 'row', marginTop: 2 }}>
                                    <GenderH style={{ marginLeft: 10 }} />
                                    <Text style={{ color: '#000', fontSize: 10, marginLeft: 5, fontFamily: 'Poppins-Regular' }}>{item.jenis_kelamin}</Text>
                                  </View>

                                  <View style={{ flexDirection: 'row', }}>
                                    <TingkatH style={{ marginLeft: 10, }} />
                                    <Text style={{ color: '#000', fontSize: 10, fontFamily: 'Poppins-Regular', marginLeft: 5, marginTop: 2 }}>Kelas {item.kelas}</Text>
                                  </View>

                                  <View style={{ flexDirection: 'row', }}>
                                    <LocationsH style={{ marginLeft: 10, }} />
                                    <Text style={{ color: '#000', fontSize: 10, fontFamily: 'Poppins-Regular', marginLeft: 5, marginTop: 2 }}>{item.tempat_lahir}</Text>
                                  </View>

                                </View>

                              </View>
                            </View>
                          </View>
                        </View>
                      </View>
                    </TouchableOpacity>
                  </View>
                )}></FlatList>

            </View>
            : <View />
          }
          {this.state.bcpb === true ?
            <View>
              <Text style={[style.labelkiri, { fontSize: 14 }]}>Jumlah Anak Status BCPB :{BCPB.length}</Text>
              <FlatList
                refreshControl={
                  <RefreshControl
                    refreshing={this.state.refreshing}
                    onRefresh={() => this.onRefresh()}
                  />
                }
                data={BCPB}
                renderItem={({ item, index }) => (
                  <View style={{}}>
                    <TouchableOpacity
                      onPress={() => this.props.navigation.navigate('Detail1', { id_anak: item.id_anak, item: item })}>
                      <View style={style.itemflat}>
                        <View style={{
                          width: '10%', justifyContent: 'center',
                          backgroundColor: item.status_cpb === 'CPB' ? '#0076B8' : '#000' &&
                            item.status_cpb === 'PB' ? '#00B855' : '#000' && item.status_cpb === 'NPB' ? '#E32845' : '#000' && item.status_cpb === 'BCPB' ? '#FFBB0C' : '#000'
                        }}>
                          <View style={{ width: '40%', justifyContent: 'center', alignItems: 'center', alignSelf: 'center', alignContent: 'center' }}>
                            <Text style={{ fontSize: 12, fontFamily: 'Poppins-Medium', color: '#fff' }}>{item.status_cpb}</Text>
                          </View>
                        </View>
                        <View
                          style={{
                            height: 90,
                            width: '100%',
                            justifyContent: 'center',
                          }}>
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}>
                            <View style={{ flexDirection: 'row' }}>
                              <Image source={test}
                                style={{
                                  height: 50,
                                  width: 50,
                                  borderRadius: 45,
                                  color: '#000',
                                  marginRight: 30
                                }}
                              />
                              <View
                                style={{ flexDirection: 'column', marginLeft: '-10%', justifyContent: 'center', width: '70%' }}>
                                <Text style={{ color: '#000', fontFamily: 'Poppins-Medium', fontSize: 14, marginLeft: 10, }}>
                                  {item.full_name}
                                </Text>
                                <View style={{ flexDirection: 'row' }}>
                                  <View style={{ flexDirection: 'row', marginTop: 2 }}>
                                    <GenderH style={{ marginLeft: 10 }} />
                                    <Text style={{ color: '#000', fontSize: 10, marginLeft: 5, fontFamily: 'Poppins-Regular' }}>{item.jenis_kelamin}</Text>
                                  </View>

                                  <View style={{ flexDirection: 'row', }}>
                                    <TingkatH style={{ marginLeft: 10, }} />
                                    <Text style={{ color: '#000', fontSize: 10, fontFamily: 'Poppins-Regular', marginLeft: 5, marginTop: 2 }}>Kelas {item.kelas}</Text>
                                  </View>

                                  <View style={{ flexDirection: 'row', }}>
                                    <LocationsH style={{ marginLeft: 10, }} />
                                    <Text style={{ color: '#000', fontSize: 10, fontFamily: 'Poppins-Regular', marginLeft: 5, marginTop: 2 }}>{item.tempat_lahir}</Text>
                                  </View>

                                </View>

                              </View>
                            </View>
                          </View>
                        </View>
                      </View>
                    </TouchableOpacity>
                  </View>
                )}></FlatList>
            </View>
            : <View />
          }
          {this.state.npb === true ?
            <View>
              <Text style={[style.labelkiri, { fontSize: 14 }]}>Jumlah Anak Status NPB :{NPB.length}</Text>
              <FlatList
                refreshControl={
                  <RefreshControl
                    refreshing={this.state.refreshing}
                    onRefresh={() => this.onRefresh()}
                  />
                }
                data={NPB}
                renderItem={({ item, index }) => (

                  <View style={{}}>
                    <TouchableOpacity
                      onPress={() => this.props.navigation.navigate('Detail1', { id_anak: item.id_anak, item: item })}>
                      <View style={style.itemflat}>
                        <View style={{
                          width: '10%', justifyContent: 'center',
                          backgroundColor: item.status_cpb === 'CPB' ? '#0076B8' : '#000' &&
                            item.status_cpb === 'PB' ? '#00B855' : '#000' && item.status_cpb === 'NPB' ? '#E32845' : '#000' && item.status_cpb === 'BCPB' ? '#FFBB0C' : '#000'
                        }}>
                          <View style={{ width: '40%', justifyContent: 'center', alignItems: 'center', alignSelf: 'center', alignContent: 'center' }}>
                            <Text style={{ fontSize: 12, fontFamily: 'Poppins-Medium', color: '#fff' }}>{item.status_cpb}</Text>
                          </View>
                        </View>
                        <View
                          style={{
                            height: 90,
                            width: '100%',
                            justifyContent: 'center',
                          }}>
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}>
                            <View style={{ flexDirection: 'row' }}>
                              <Image source={test}
                                style={{
                                  height: 50,
                                  width: 50,
                                  borderRadius: 45,
                                  color: '#000',
                                  marginRight: 30
                                }}
                              />
                              <View
                                style={{ flexDirection: 'column', marginLeft: '-10%', justifyContent: 'center', width: '70%' }}>
                                <Text style={{ color: '#000', fontFamily: 'Poppins-Medium', fontSize: 14, marginLeft: 10, }}>
                                  {item.full_name}
                                </Text>
                                <View style={{ flexDirection: 'row' }}>
                                  <View style={{ flexDirection: 'row', marginTop: 2 }}>
                                    <GenderH style={{ marginLeft: 10 }} />
                                    <Text style={{ color: '#000', fontSize: 10, marginLeft: 5, fontFamily: 'Poppins-Regular' }}>{item.jenis_kelamin}</Text>
                                  </View>

                                  <View style={{ flexDirection: 'row', }}>
                                    <TingkatH style={{ marginLeft: 10, }} />
                                    <Text style={{ color: '#000', fontSize: 10, fontFamily: 'Poppins-Regular', marginLeft: 5, marginTop: 2 }}>Kelas {item.kelas}</Text>
                                  </View>

                                  <View style={{ flexDirection: 'row', }}>
                                    <LocationsH style={{ marginLeft: 10, }} />
                                    <Text style={{ color: '#000', fontSize: 10, fontFamily: 'Poppins-Regular', marginLeft: 5, marginTop: 2 }}>{item.tempat_lahir}</Text>
                                  </View>

                                </View>

                              </View>
                            </View>
                          </View>
                        </View>
                      </View>
                    </TouchableOpacity>
                  </View>
                )}></FlatList>
            </View>
            : <View />
          }
          {this.state.pb === true ?
            <View>
              <Text style={[style.labelkiri, { fontSize: 14 }]}>Jumlah Anak Status PB :{PB.length}</Text>
              <FlatList

                refreshControl={
                  <RefreshControl
                    refreshing={this.state.refreshing}
                    onRefresh={() => this.onRefresh()}
                  />
                }
                style={{ marginBottom: 65 }}
                data={PB}
                renderItem={({ item, index }) => (
                  <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('Detail1', { id_anak: item.id_anak, item: item })}>
                    <View style={style.itemflat}>
                      <View style={{
                        width: '10%', justifyContent: 'center',
                        backgroundColor: item.status_cpb === 'CPB' ? '#0076B8' : '#000' &&
                          item.status_cpb === 'PB' ? '#00B855' : '#000' && item.status_cpb === 'NPB' ? '#E32845' : '#000' && item.status_cpb === 'BCPB' ? '#FFBB0C' : '#000'
                      }}>
                        <View style={{ width: '40%', justifyContent: 'center', alignItems: 'center', alignSelf: 'center', alignContent: 'center' }}>
                          <Text style={{ fontSize: 12, fontFamily: 'Poppins-Medium', color: '#fff' }}>{item.status_cpb}</Text>
                        </View>
                      </View>
                      <View
                        style={{
                          height: 90,
                          width: '100%',
                          justifyContent: 'center',
                        }}>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}>
                          <View style={{ flexDirection: 'row' }}>
                            <Image source={test}
                              style={{
                                height: 50,
                                width: 50,
                                borderRadius: 45,
                                color: '#000',
                                marginRight: 30
                              }}
                            />
                            <View
                              style={{ flexDirection: 'column', marginLeft: '-10%', justifyContent: 'center', width: '70%' }}>
                              <Text style={{ color: '#000', fontFamily: 'Poppins-Medium', fontSize: 14, marginLeft: 10, }}>
                                {item.full_name}
                              </Text>
                              <View style={{ flexDirection: 'row' }}>
                                <View style={{ flexDirection: 'row', marginTop: 2 }}>
                                  <GenderH style={{ marginLeft: 10 }} />
                                  <Text style={{ color: '#000', fontSize: 10, marginLeft: 5, fontFamily: 'Poppins-Regular' }}>{item.jenis_kelamin}</Text>
                                </View>

                                <View style={{ flexDirection: 'row', }}>
                                  <TingkatH style={{ marginLeft: 10, }} />
                                  <Text style={{ color: '#000', fontSize: 10, fontFamily: 'Poppins-Regular', marginLeft: 5, marginTop: 2 }}>Kelas {item.kelas}</Text>
                                </View>

                                <View style={{ flexDirection: 'row', }}>
                                  <LocationsH style={{ marginLeft: 10, }} />
                                  <Text style={{ color: '#000', fontSize: 10, fontFamily: 'Poppins-Regular', marginLeft: 5, marginTop: 2 }}>{item.tempat_lahir}</Text>
                                </View>

                              </View>

                            </View>
                          </View>
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>

                )}></FlatList>

            </View>
            : <View />
          }
        </ScrollView>

        {this.state.pb === true ?
          <View style={{ flexDirection: "row", justifyContent: 'center', position: 'absolute', bottom: 10, alignSelf: 'center' }}>
            <TouchableOpacity style={style.btnSimpan} onPress={() => this.pb()}>
              <Text style={{ color: '#fff', fontFamily: 'Poppins-Medium', fontSize: 15 }}>Download File</Text>
            </TouchableOpacity>
          </View>
          : <View />
        }
        {this.state.cpb === true ?
          <View style={{ flexDirection: "row", justifyContent: 'center', position: 'absolute', bottom: 10, alignSelf: 'center' }}>
            <TouchableOpacity style={style.btnSimpan} onPress={() => this.cpb()}>
              <Text style={{ color: '#fff', fontFamily: 'Poppins-Medium', fontSize: 15 }}>Download File</Text>
            </TouchableOpacity>
          </View>
          : <View />
        }
        {this.state.npb === true ?
          <View style={{ flexDirection: "row", justifyContent: 'center', position: 'absolute', bottom: 10, alignSelf: 'center' }}>
            <TouchableOpacity style={style.btnSimpan} onPress={() => this.npb()}>
              <Text style={{ color: '#fff', fontFamily: 'Poppins-Medium', fontSize: 15 }}>Download File</Text>
            </TouchableOpacity>
          </View>
          : <View />
        }
        {this.state.bcpb === true ?
          <View style={{ flexDirection: "row", justifyContent: 'center', position: 'absolute', bottom: 10, alignSelf: 'center' }}>
            <TouchableOpacity style={style.btnSimpan} onPress={() => this.bcpb()}>
              <Text style={{ color: '#fff', fontFamily: 'Poppins-Medium', fontSize: 15 }}>Download File</Text>
            </TouchableOpacity>
          </View>
          : <View />
        }
        {this.state.pb === false && this.state.npb === false && this.state.bcpb === false && this.state.cpb === false ?
          <View style={{ flexDirection: "row", justifyContent: 'center', position: 'absolute', bottom: 10, alignSelf: 'center' }}>
            <TouchableOpacity style={style.btnSimpan} onPress={() => this.semuaanak()}>
              <Text style={{ color: '#fff', fontFamily: 'Poppins-Medium', fontSize: 15 }}>Download Semua</Text>
            </TouchableOpacity>
          </View>
          : <View />
        }
      </View>
    )
  }
}

const style = StyleSheet.create({
  itemflat: {
    fontSize: 12,
    flexDirection: 'row',
    marginLeft: 10,
    paddingRight: 30,
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
  ModalCont: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#00000099',
    paddingHorizontal: 10,
  },
  labelkanan: {
    fontSize: 12,
    marginHorizontal: 5,
    width: 100,
  },
  labelkiri: {
    fontWeight: 'bold',
    marginVertical: 5,
  },
  form: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    width: '100%'
  },
  kotak3: {
    marginTop: 10,
    color: '#000',
    borderRadius: 10,
    borderWidth: 0.1,
    fontSize: 13,
    height: 40,
    width: windowWidth * 0.5,
    padding: 12,
    backgroundColor: '#fff',
    borderColor: '#DDDDDD',
    borderWidth: 1,
    fontFamily: 'Poppins-Regular',
  },
  containerSafe: {
    flex: 1,
    flexDirection: 'column',
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
  btnSimpan: {
    backgroundColor: '#00A9B8',
    padding: '4%',
    borderRadius: 10,
    marginTop: '1%',
    width: '70%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  kotakbtn: {
    marginVertical: 10,
    marginHorizontal: 16,
    borderRadius: 15,
    shadowColor: '#858585',
    overflow: 'hidden',
    shadowRadius: 15,
    elevation: 6,
    shadowOpacity: '25%',
    borderColor: '#7e7e7e',
  },
  btnSimpan: {
    backgroundColor: '#00A9B8',
    padding: '4%',
    borderRadius: 10,
    marginTop: '6%',
    width: '70%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default Detailjumlahanak