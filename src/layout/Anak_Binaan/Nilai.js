import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  Modal,
  Dimensions,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import moment from 'moment';
import { JenisH, Tamnak } from '../../assets/icons';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export class Nilai extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nilai: [],
      detail: this.props.route.params.id_anak,
    };
  }
  componentDidMount() {
    this.GetDetAPi();
    console.log();
  }
  GetDetAPi() {
    fetch(
      'https://kilauindonesia.org/datakilau/api/getnilaianak/' +
      this.state.detail,
    )
      .then(res => {
        if (res.status === 200) return res.json();
      })
      .then(resdata => {
        console.log(resdata.data);
        this.setState({
          nilai: resdata.data,
          refreshing: false,
        });
      });
  }
  onRefresh() {
    this.GetDetAPi();
    this.setState({ refreshing: false });
  }
  render() {
    return (
      <View style={{ backgroundColor: '#fff', flex: 1 }}>
        <View style={{ backgroundColor: '#0EBEDF' }}>
          <Text style={style.title2}>Nilai anak</Text>
        </View>
        {/* <Text> hahahah</Text> */}
        <FlatList
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={() => this.onRefresh()}
            />
          }
          data={this.state.nilai}
          renderItem={({ item, index }) => (
            <View>
              <View style={{}}>
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate('', {
                      id_anak: item.id_anak,
                      item: item,
                    })
                  }>
                  <View style={style.itemflat}>
                    
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
                          
                          <View
                            style={{
                             
                              width: '100%',
                            }}>
                            <Text
                              style={{
                                marginTop: -10,
                                color: '#000',
                                fontFamily: 'Poppins-Medium',
                                fontSize: 14,
                                marginLeft: 10,
                              }}>
                              Kegiatan: {item.jenis_kegiatan}
                            </Text>

                            <View
                              style={{
                                flexDirection: 'row',
                                alignContent: 'space-between',
                                marginTop: 10,
                              }}>
                              <JenisH style={{ marginLeft: 20 }} />

                              <Text
                                style={{
                                  color: '#000',
                                  fontFamily: 'Poppins-Medium',
                                  fontSize: 14,
                                  marginLeft: 10,
                                }}>
                                {item.tugas}:
                              </Text>
                              <Text
                                style={{
                                  color: '#000',
                                  fontFamily: 'Poppins-Medium',
                                  fontSize: 14,
                                  marginLeft: 10,
                                }}>
                                {item.nilai}
                              </Text>
                            </View>
                                                        <View>
                              <Text
                                style={{
                                  color: '#000',
                                  fontFamily: 'Poppins-Medium',
                                  fontSize: 10,
                                  marginLeft: 10,
                                  marginTop: 5,
                                  textAlign: 'right',
                                }}>
                                {item.tanggal}
                              </Text>
                            </View>
                          </View>
                        </View>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
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
                <Text style={{ fontSize: 12, textAlign: 'center', }}>Belum Ada Nilai</Text>
              </View>


            </View>
          }

        ></FlatList>
        
      </View>
    );
  }
}

export default Nilai;
const style = StyleSheet.create({
  contentContainer: {
    flex: 1,
  },
  containerfoto: {
    marginTop: 40,
    multiline: true,
    marginLeft: 100,
    width: 200,
    height: 200,
    flex: 1,
    margin: 20,
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    shadowColor: '#333',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    borderColor: '#7e7e7e',
    elevation: 3,
  },
  iconbesar: {
    marginTop: 50,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  btnSimpanDark: {
    width: '40%',
    fontWeight: 'bold',
    backgroundColor: '#87cefa',
    borderRadius: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#E9E9E9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnSimpanUn: {
    width: '40%',
    fontWeight: 'bold',
    backgroundColor: '#C6C6C6',
    borderRadius: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#E9E9E9',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  btnSimpanUn1: {
    width: '40%',
    fontWeight: 'bold',
    backgroundColor: '#C6C6C6',
    borderRadius: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#E9E9E9',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    textAlign: 'center',
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
  tambah: {
    position: 'absolute',
    width: 50,
    height: 50,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  logo4: {
    width: 75,
    height: 75,
    marginLeft: 10,
  },
  coltom: {
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
    shadowColor: '#333',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    borderColor: '#7e7e7e',
    elevation: 3,
  },
  coltom1: {
    width: '100%',
    marginTop: 20,
    fontSize: 16,
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#fff',
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: '#333',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    borderColor: '#7e7e7e',
    elevation: 3,
  },
  coltom2: {
    width: '90%',
    fontSize: 16,
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#fff',
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: '#333',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    borderColor: '#7e7e7e',
    elevation: 3,
  },
  item2: {
    padding: 10,
    height: 120,
    width: '30%',
    position: 'absolute',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  item1: {
    flex: 1,
    marginTop: 10,
    textAlign: 'center',
    fontSize: 16,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 10,
    borderWidth: 0.1,
    marginVertical: 1,
    marginHorizontal: 50,
  },
  picker: {
    color: 'F',
    marginTop: 10,
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    borderRadius: 5,
    // marginHorizontal: 5,
    height: 30,
    width: '100%',
    shadowColor: '#333',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.3,
    shadowRadius: 2,

    elevation: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imgSmall: {
    position: 'absolute',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
  title2: {
    marginRight: 20,
    marginLeft: 20,
    marginTop: 15,
    marginBottom: 15,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  kotak2: {
    color: '#000000',
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 2,
    borderWidth: 0.1,
    fontSize: 12,
    height: 52,
    backgroundColor: '#7e7e7',
  },
  Label: {
    padding: 5,
    color: '#000000',
    marginLeft: 10,
    marginTop: 20,
  },
  detailgmbr: {
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 18,
    marginTop: 20,
    fontWeight: 'bold',
    color: '#7e7e7e',
  },
  detail: {
    // borderRadius: 2,
    // borderWidth: 0.1,
    width: '90%',
    padding: 10,
    marginLeft: 25,
    justifyContent: 'center',
    alignContent: 'center',
    shadowColor: '#333',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    borderColor: '#7e7e7e',
    elevation: 3,
  },
  Label1: {
    marginTop: 20,
    marginLeft: 20,
    textAlign: 'center',
    color: '#000',
  },
  Label2: {
    marginTop: 5,
    marginLeft: 20,
    padding: 5,
    color: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  Textinputcss: {
    color: '#7e7e7e',
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 10,
    borderWidth: 1,
    fontSize: 12,
    height: 52,
    backgroundColor: '#fff',
    shadowColor: '#333',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    borderColor: '#7e7e7e',
    elevation: 3,
  },
  Textinputcss2: {
    color: '#7e7e7e',
    borderRadius: 10,
    borderWidth: 1,
    fontSize: 12,
    height: 52,
  },
  searchBar: {
    fontSize: 12,
    width: '90%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    alignContent: 'center',
    marginTop: 5,
  },
  itemText: {
    textAlign: 'center',
    color: 'black',
    fontSize: 16,
    width: '100%',
    height: 50,
  },
  item: {
    flex: 1,
    fontSize: 16,
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#fff',
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: '#333',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    borderColor: '#7e7e7e',
    elevation: 3,
  },
  types: {
    marginRight: 5,
    borderWidth: 1,
    borderColor: '#bbb',
    paddingHorizontal: 15,
    paddingVertical: 7,
    borderRadius: 6,
    backgroundColor: '#fff',
  },
  itemflat: {
    flex: 1,
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
  ModalLaporan: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#00000099',
    paddingHorizontal: '10%',
  },
  ModalCont2: {
    flex: 1,
    // alignItems: 'center',
    backgroundColor: '#00000079',
  },
  checkbox: {
    flexDirection: 'row',
    alignContent: 'space-between',
    alignItems: 'center',
    margin: 20,
  },

  ImageStyle: {
    padding: 10,
    margin: 5,
    height: 20,
    width: 20,
    resizeMode: 'stretch',
    alignItems: 'center',
  },
  kotak4: {
    color: '#000000',
    marginTop: 2,
    marginLeft: 18,
    marginRight: 10,
    borderRadius: 2,
    borderWidth: 0.1,
    fontSize: 12,
    height: 40,
    width: '40%',
    backgroundColor: '#F0F8FF',
  },
  kotak5: {
    color: '#000000',
    marginTop: 2,
    marginLeft: 18,
    marginRight: 10,
    borderRadius: 2,
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    fontSize: 12,
    height: 40,
    width: '40%',
    backgroundColor: '#FFF',
  },
  refresh: {
    padding: 10,
    bottom: 0,
    right: -250,
    top: 700,
    left: 0,
    flexDirection: 'row',
    borderRadius: 5,
    position: 'absolute',
    // marginHorizontal: 5,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
  },
  labelbaru5: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    marginLeft: 10,
    color: '#C0C0C0',
  }, //vildan
  img2: {
    width: '100%',
    height: 170,
    marginTop: 10,
    borderRadius: 10,
  }, //vildan
  IconCari: {
    position: 'absolute',
    top: 8,
    left: 20,
  },
  kotakkecil: {
    flexDirection: 'column',
    borderColor: '#bdbdbd',
    borderWidth: 1,
    width: '40%',
    height: 160,
    justifyContent: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    textAlign: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 10,
    marginHorizontal: 10,
  },
  title2: {
    marginRight: 20,
    marginLeft: 20,
    marginTop: 15,
    marginBottom: 15,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
});
