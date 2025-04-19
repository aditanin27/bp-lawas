import {
  Text, View, TouchableOpacity, RefreshControl,
  FlatList, StyleSheet, Dimensions, TextInput, Modal, SafeAreaView, Image, ScrollView
} from 'react-native'
import React, { Component } from 'react'
import {
  FilterdanText,
  IconCari,
  LocationsH,
  TingkatH,
  JenisH,
} from '../../assets/icons';
import {
  Union,
} from '../../assets/images';
import CheckBox from '@react-native-community/checkbox';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

export class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: true,
      fil: false,
      carikeluarga: '',
      JenisS: '',
      JenisA: '',
      JenisK: '',
      JenisS: '',
      pilih: '',
      isChecked: false,
      kacab: [],
      filter: [],
      wilbin: [],
      shelter: [],
      selectedId: [],
      selectedId1: [],
      selectedId2: [],
    };
  }
  componentDidMount() {
    this.GetKeluargaAPi();
    this.getkacabAPi();
    this.getwilbinAPi();
    this.getshelterAPi();

    console.log();
  }
  onRefresh() {
    this.GetKeluargaAPi();
    this.setState({ refreshing: false });
  }
  getkacabAPi() {
    fetch('https://kilauindonesia.org/datakilau/api/kacab')
      .then(res => {
        if (res.status === 200) return res.json();
      })
      .then(resdata => {
        console.log(resdata.DATA);
        this.setState({
          kacab: resdata.data,
          refreshing: false,
        });
      });
  }
  getwilbinAPi() {
    fetch('https://kilauindonesia.org/datakilau/api/wilbinfil')
      .then(res => {
        if (res.status === 200) return res.json();
      })
      .then(resdata => {
        console.log(resdata.DATA);
        this.setState({
          wilbin: resdata.data,
          refreshing: false,
        });
      });
  }
  getshelterAPi() {
    fetch('https://kilauindonesia.org/datakilau/api/shelterfil')
      .then(res => {
        if (res.status === 200) return res.json();
      })
      .then(resdata => {
        console.log(resdata.DATA);
        this.setState({
          shelter: resdata.data,
          refreshing: false,
        });
      });
  }
  GetKeluargaAPi() {
    fetch('https://kilauindonesia.org/datakilau/api/pengetkeluarga')
      .then(res => {
        if (res.status === 200) return res.json();
      })
      .then(resdata => {
        console.log(resdata.data);
        this.setState({
          keluarga: resdata.data,
          filter: resdata.data,
          refreshing: false,

        });
      });
  }

  onCheckBoxPress = (id_kacab) => {
    let checkboxes = this.state.selectedId;
    if (checkboxes && checkboxes.includes(id_kacab)) {
      checkboxes.splice(checkboxes.indexOf(id_kacab), 1);
    } else {
      checkboxes = checkboxes.concat(id_kacab);
    }
    this.setState({ selectedId: checkboxes })
    // console.log("selectde checkbox nama_id: ", checkboxes)
  }
  onCheckBoxwilbin = (id_wilbin) => {
    let checkboxes = this.state.selectedId1;
    if (checkboxes && checkboxes.includes(id_wilbin)) {
      checkboxes.splice(checkboxes.indexOf(id_wilbin), 1);
    } else {
      checkboxes = checkboxes.concat(id_wilbin);
    }
    this.setState({ selectedId1: checkboxes })
    // console.log("selectde checkbox wilbin_id: ", checkboxes)
  }
  onCheckBoxshelter = (id_shelter) => {

    if (this.state.selectedId2 && this.state.selectedId2.includes(id_shelter)) {
      this.state.selectedId2.splice(this.state.selectedId2.indexOf(id_shelter), 1);
    } else {
      this.state.selectedId2 = this.state.selectedId2.concat(id_shelter);
    }
    this.setState({ selectedId2: this.state.selectedId2 })
    console.log("selectde checkbox nama: ", this.state.selectedId2)
  }
  filterList(textToSearch) {
    this.setState({
      filter: this.state.keluarga
        .filter(item => item.kepala_keluarga.toLowerCase(textToSearch).includes(textToSearch) ||
          item.id_shelter === this.state.selectedId2
        )
    })
  }
  render() {
    let { JenisA } = this.state;
    let { JenisK } = this.state;
    let { JenisS } = this.state;
    let { pilih } = this.state;

    const filter_wilbin = this.state.wilbin.filter(wilbin => {
      return this.state.selectedId.find(selid => selid === wilbin.id_kacab);
    });

    const filter_shelter = this.state.shelter.filter(shelter => {
      return this.state.selectedId1.find(selid => selid === shelter.id_wilbin);
    });
    return (
      <View style={{ flex: 1, backgroundColor: '#FFF' }}>

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
                this.filterList(text.toLowerCase()), this.setState({ carikeluarga: text })
              }}
              value={this.state.text}
              placeholder="Cari Data Keluarga"
              placeholderTextColor="#C0C0C0"
              underlineColorAndroid="transparent"
            />
            <IconCari style={style.IconCari} name="your-icon" size={20} />
            <View style={{ borderColor: '#FFF', borderWidth: 1, padding: 7, width: 90, marginLeft: 10, borderRadius: 5 }}>
              <TouchableOpacity
                onPress={() => {
                  this.setState({ fil: true });
                }}>
                <FilterdanText />
              </TouchableOpacity>
            </View>

          </View>
        </View>
        <FlatList
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={() => this.onRefresh()}
            />
          }
          data={this.state.filter}
          renderItem={({ item, index }) => (
            <View>
              <View style={{}}>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('detailkeluarga', { id_anak: item.id_anak, item: item })}>
                  <View style={style.itemflat}>

                    <View
                      style={{
                        height: 90,
                        width: '100%',
                        justifyContent: 'center',
                      }}>
                      <View >
                        <View style={{
                          flexDirection: 'row', justifyContent: 'space-between'
                          // justifyContent: 'center',
                          // backgroundColor: item.status_ortu === 'non-dhuafa' ? '#0076B8' : '#000' &&
                          //   item.status_ortu === 'dhuafa' ? '#00B855' : '#000' && item.status_ortu === 'yatim_piatu' ? '#E32845' : '#000' && item.status_ortu === 'yatim' ? '#FFBB0C' : '#000'
                        }}>
                          <Text style={{ fontSize: 12, fontFamily: 'Poppins-Medium', marginLeft: 20, marginTop: -20, fontWeight: 'bold' }}></Text>

                        </View>
                      </View>
                      <View
                        style={{
                          marginLeft: '15%'
                        }}>
                        <View style={{ flexDirection: 'row' }}>

                          <View
                            style={{ flexDirection: 'column', marginLeft: '-10%', justifyContent: 'center', width: '70%' }}>
                            <Text style={{ color: '#000', fontFamily: 'Poppins-Medium', fontSize: 14, marginLeft: 10, }}>
                              {item.kepala_keluarga}
                            </Text>
                            <View style={{ flexDirection: 'row', marginTop: 7 }}>
                              <View style={{ flexDirection: 'row' }}>
                                <JenisH style={{ marginLeft: 10 }} />
                                <Text style={{ color: '#000', fontSize: 10, marginLeft: 5, fontFamily: 'Poppins-Regular' }}>{item.status_ortu}</Text>
                              </View>

                              {/* <View style={{ flexDirection: 'row', }}>
                                <TingkatH style={{ marginLeft: 10, }} />
                                <Text style={{ color: '#000', fontSize: 10, fontFamily: 'Poppins-Regular', marginLeft: 5 }}>Kelas {item.no_tlp}</Text>
                              </View> */}

                              <View style={{ flexDirection: 'row', width: '80%' }}>
                                <LocationsH style={{ marginLeft: 10, }} />
                                {
                                  item.nama_shelter === '' | item.nama_shelter === 'null' | item.nama_shelter === null ?
                                    <Text style={{ color: '#000', fontSize: 10, fontFamily: 'Poppins-Regular', marginLeft: 5 }}>Belum Memasukan Shelter</Text>
                                    :
                                    <Text style={{ color: '#000', fontSize: 10, fontFamily: 'Poppins-Regular', marginLeft: 5 }}>{item.nama_shelter}</Text>
                                }
                              </View>

                            </View>

                          </View>
                        </View>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          )
          }></FlatList >
        <Modal
          animationType={'slide'}
          transparent={true}
          onRequestClose={() => this.setState({ fil: false })}
          visible={this.state.fil}
          style={{
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View style={style.ModalCont2}>
            <View
              style={{
                paddingHorizontal: 15,
                paddingVertical: 10,
                backgroundColor: '#ffffff',
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                height: '90%',
                shadowColor: '#333',
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
              <ScrollView style={{ width: '100%', height: '100%', paddingHorizontal: 20, }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: 10,
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      this.setState({ fil: false });
                    }}>
                    <Image
                      source={Union}
                      style={{
                        width: 15,
                        height: 15,
                        marginRight: 10,
                      }}></Image>
                  </TouchableOpacity>
                  <Text style={{ fontWeight: 'bold', fontSize: 18, fontFamily: 'Poppins-SemiBold', marginLeft: 10, color: '#000', }}>
                    Filter
                  </Text>
                </View>
                <View>
                  <Text style={{ fontWeight: 'bold', fontSize: 14, fontFamily: 'Poppins-SemiBold', color: '#000', marginTop: 20, }}>
                    Kantor Cabang</Text>
                  <FlatList
                    refreshControl={
                      <RefreshControl
                        refreshing={this.state.refreshing}
                        onRefresh={() => this.onRefresh()}
                      />
                    }
                    data={this.state.kacab}
                    keyExtractor={(item, index) => String(index)}
                    renderItem={({ item, index }) => (
                      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text>{item.nama_kacab}</Text>
                        <CheckBox
                          value={this.state.selectedId && this.state.selectedId.includes(item.id_kacab)}
                          onChange={() => this.onCheckBoxPress(item.id_kacab)}
                        />
                      </View>

                    )
                    }></FlatList >
                </View>
                <View>
                  <Text style={{ fontWeight: 'bold', fontSize: 14, fontFamily: 'Poppins-SemiBold', color: '#000', }}>
                    Wilayah Binaan</Text>
                  <FlatList
                    refreshControl={
                      <RefreshControl
                        refreshing={this.state.refreshing}
                        onRefresh={() => this.onRefresh()}
                      />
                    }
                    data={filter_wilbin}
                    keyExtractor={(item, index) => String(index)}
                    renderItem={({ item, index }) => (
                      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text>{item.nama_wilbin}</Text>
                        <CheckBox
                          disabled={false}
                          value={this.state.selectedId1 && this.state.selectedId1.includes(item.id_wilbin)}
                          onChange={() => this.onCheckBoxwilbin(item.id_wilbin)}
                        />
                      </View>

                    )
                    }></FlatList >
                </View>

                <View>
                  <Text style={{ fontWeight: 'bold', fontSize: 14, fontFamily: 'Poppins-SemiBold', color: '#000', }}>
                    Shelter</Text>
                  <FlatList
                    refreshControl={
                      <RefreshControl
                        refreshing={this.state.refreshing}
                        onRefresh={() => this.onRefresh()}
                      />
                    }
                    data={filter_shelter}
                    keyExtractor={(item, index) => String(index)}
                    renderItem={({ item, index }) => (
                      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text>{item.nama_shelter}</Text>
                        <CheckBox
                          value={this.state.selectedId2 && this.state.selectedId2.includes(item.id_shelter)}
                          onChange={() => this.onCheckBoxshelter(item.id_shelter)}
                        />
                      </View>

                    )
                    }></FlatList >
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <TouchableOpacity style={style.btnSimpan} onPress={() => this.setState({ fil: false }, this.filterList())}>
                    <Text style={{ color: '#fff', fontFamily: 'Poppins-Medium', fontSize: 15 }}>Terapkan</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={style.btnSimpan2} onPress={() => this.setState({ selectedId: [], selectedId1: [], selectedId2: [] })}>
                    <Text style={{ color: '#00A9B8', fontFamily: 'Poppins-Medium', fontSize: 15 }}>Reset</Text>
                  </TouchableOpacity>
                </View>

              </ScrollView>
            </View>
          </View>
        </Modal>
      </View >
    )
  }
}

export default index
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
  },
  IconCari: {
    position: 'absolute',
    top: 8,
    left: 20,
  },
  ModalCont2: {
    flex: 1,
    // alignItems: 'center',
    backgroundColor: '#00000079',
  },
  types: {
    marginRight: 5,
    borderWidth: 1,
    borderColor: '#bbb',
    paddingHorizontal: 15,
    paddingVertical: 7,
    borderRadius: 6,
    backgroundColor: '#fff'
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

  btnSimpan2: {
    borderWidth: 1,
    borderColor: '#00A9B8',
    padding: '4%',
    borderRadius: 10,
    marginTop: '6%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

{/* <FlatList
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={() => this.onRefresh()}
            />
          }
          data={this.state.keluarga}
          renderItem={({ item, index }) => (
            <View style={{ flex: 1, }}>
              <View>
                <View style={{}}>
                  <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('detailkeluarga', { id_keluarga: item.id_keluarga, item: item })}>

                    <View style={style.itemflat}>

                      <View
                        style={{ flexDirection: 'column', marginLeft: '-10%', justifyContent: 'center', width: '70%' }}>
                        <View style={{ backgroundColor: '#00B855' }}>
                          <Text style={{ fontSize: 12, fontFamily: 'Poppins-Medium', }}>{item.status_ortu}</Text>
                        </View>
                        <Text style={{ color: '#000', fontFamily: 'Poppins-Medium', fontSize: 14, marginLeft: 10, }}>
                          {item.kepala_keluarga}
                        </Text>
                        <View style={{ flexDirection: 'row' }}>
                          <View style={{ flexDirection: 'row' }}>
                            <JenisH style={{ marginLeft: 10 }} />
                            <Text style={{ color: '#000', fontSize: 10, marginLeft: 5, fontFamily: 'Poppins-Regular' }}>Non-Tahfidz</Text>
                          </View>

                          <View style={{ flexDirection: 'row', }}>
                            <TingkatH style={{ marginLeft: 10, }} />
                            <Text style={{ color: '#000', fontSize: 10, fontFamily: 'Poppins-Regular', marginLeft: 5 }}>Kelas {item.kelas}</Text>
                          </View>

                          <View style={{ flexDirection: 'row', }}>
                            <LocationsH style={{ marginLeft: 10, }} />
                            <Text style={{ color: '#000', fontSize: 10, fontFamily: 'Poppins-Regular', marginLeft: 5 }}>{item.tempat_lahir}</Text>
                          </View>

                        </View>

                      </View>
                      {/* <View
                        style={{
                          height: 90,
                          width: '100%',
                          justifyContent: 'center',
                        }}>
                        <View>
                          <View style={{ flexDirection: 'row' }}>

                            
                          </View>
                        </View>
                      </View> */}
//           </View>
//         </TouchableOpacity>
//       </View>
//     </View>


//   </View>
// )}></FlatList> */}

