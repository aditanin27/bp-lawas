import { Text, View, StyleSheet, TextInput, FlatList, Dimensions, TouchableOpacity, Image, Modal, ScrollView } from 'react-native'
import React, { Component } from 'react'
import { Picker } from '@react-native-picker/picker';

const width = Dimensions.get('window').width;

export class Kelompok extends Component {
  constructor(props) {
    super(props)
    this.state = {
      nama: '',
      kel: '',
      anak: [],
      filt_anak: [],
      anak1: [],
      carianak: '',
      kosong: [],
      filt_anak1: [],
      modalkelompok: false,
      modaleditkel: false,
      modaldata: false,
    }
  }
  filterList(textToSearch) {
    this.setState({
      filt_anak: this.state.anak.filter(i => i.nama.toLowerCase().includes(textToSearch),
      )
    });
  }

  filterList1(textToSearch) {
    this.setState({
      filt_anak1: this.state.anak1.filter(i => i.nama.toLowerCase().includes(textToSearch)),
    });

  }
  componentDidMount() {
    this.GetAnakAPi();
  }
  GetAnakAPi() {
    fetch('https://kilauindonesia.org/datakilau/api/testo').then(res => {
      if (res.status === 200)
        return res.json()
    }).then(resdata => {
      console.log(resdata.data)
      this.setState({
        anak: resdata.data,
        anak1: resdata.data,
        filt_anak: resdata.data,
        filt_anak1: resdata.data,
        Refreshing: false,
      })
    })
  }
  render() {
    return (
      <View>
        <View style={{ backgroundColor: '#0EBEDF' }}>
          <Text style={style.title1}>Data Kelompok Shelter</Text>
        </View>

        <View style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#fff',
          borderWidth: 0.5,
          borderColor: '#000',
          height: 40,
          borderRadius: 5,
          margin: 10,
        }}>
          <TextInput
            placeholder='Cari' onChangeText={text => { this.filterList(text.toLowerCase()) }}
            style={style.searchBar}>
            {/* <Image source={search} style={style.ImageStyle}></Image> */}
          </TextInput>
        </View>

        <FlatList
          // extraData={this.state.selectedId}
          // keyExtractor={(materi, index) => String(index)}
          data={this.state.filt_anak}
          renderItem={({ item }) => (
            <View style={style.item1}>
              <View style={{ flexDirection: 'row' }}>
                <Image source={{ uri: 'https://www.kilauindonesia.org/datakilau/gambarDonatur/' + item.gambar_donatur }} style={{ height: 100, width: '50%' }} />
                <View style={style.Label}>
                  <Text>Nama Cabang</Text>
                  <Text>Nama Wilbin</Text>
                  <Text>Nama Shelter</Text>
                  <Text>Jumlah Kelompok</Text>
                  <TouchableOpacity style={style.btnSimpanDark} onPress={() => {
                    this.setState({ modalkelompok: true })
                  }}>
                    <Text style={{ fontSize: 12, }}>Lihat Kelompok</Text>
                  </TouchableOpacity>
                </View>
              </View>

            </View>
          )}>
        </FlatList>

        <Modal
          animationType={"slide"}
          transparent={true}
          visible={this.state.modalkelompok}
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
              <Text style={style.itemText}>Data Kelompok</Text>
              <ScrollView style={{ width: '100%', height: '100%' }}>
                <View style={{
                  width: '90%',
                  height: 100,
                  borderTopLeftRadius: 10,
                  borderTopRightRadius: 10,
                  borderTopWidth: 1,
                  borderLeftWidth: 1,
                  borderRightWidth: 1,
                  marginLeft: 20,
                  marginTop: 10,
                  borderColor: '#E9E9E9',
                  flexDirection: 'column',
                  justifyContent: 'space-around'
                }}>
                  <Text style={style.Label1}>Kelas</Text>
                  <Text style={style.Label1}>Kelompok </Text>
                  <Text style={style.Label1}>Jumlah Anggota: </Text>
                </View>
                <View style={{
                  width: '90%',
                  height: 30,
                  marginLeft: 20,
                  borderTopWidth: 1,
                  borderBottomWidth: 1,
                  borderLeftWidth: 1,
                  borderRightWidth: 1,
                  borderBottomLeftRadius: 10,
                  borderBottomRightRadius: 10,
                  borderColor: '#E9E9E9',
                  backgroundColor: '#F0F8FF',

                }}
                >
                  <View style={{
                    justifyContent: 'space-around',
                    flexDirection: 'row',
                  }}>
                    <TouchableOpacity onPress={() => {
                      this.setState({ modaleditkel: true })
                    }}>
                      <Text>Edit Kelompok</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => {
                      this.setState({ modaldata: true })
                    }}>
                      <Text style={style.itemText}>Data anggota</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </ScrollView>
              <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
              
                <TouchableOpacity style={style.btnSimpanDark} onPress={() => {
                  this.setState({ modalkelompok: false })
                }}>
                  <Text style={{ textAlign: 'center' }}>Kembali</Text>
                </TouchableOpacity>
              </View>
            </View>

          </View>
        </Modal>

        <Modal
          animationType={"slide"}
          transparent={true}
          visible={this.state.modaleditkel}
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
              <Text style={style.itemText}>Data Kelompok</Text>
              <ScrollView style={{ width: '100%', height: '100%' }}>
                <View>
                  <Text style={style.Label1}> Level Binaan</Text>
                  <Picker style={style.Textinputcss}
                    selectedValue={this.state.kel}
                    onValueChange={(itemValue) => this.setState({ kel: itemValue, show: 1 })}
                  >
                    <Picker.Item label="Pilih Kelas" value="" />
                    <Picker.Item label="Kelas 1-3" value="Kelas 1-3" />
                    <Picker.Item label="Kelas 4-6" value="Kelas 4-6" />
                    <Picker.Item label="Kelas 7-9" value="Kelas 7-9" />
                    <Picker.Item label="Kelas 10-12" value="Kelas 10-12" />
                    <Picker.Item label="Tutor" value="Tutor" />
                    <Picker.Item label="Reguler Campuran" value="RC" />
                    <Picker.Item label="RTSQ Level 1" value="RTSQ1" />
                    <Picker.Item label="RTSQ Level 2" value="RTSQ2" />
                    <Picker.Item label="RTSQ Level 3" value="RTSQ3" />
                    <Picker.Item label="RTSQ Level 4" value="RTSQ4" />
                    <Picker.Item label="PAUD" value="PAUD" />
                    <Picker.Item label="Tahfidz SD 1-3" value="Tahfidz1" />
                    <Picker.Item label="Tahfidz SD 3-6" value="Tahfidz2" />
                    <Picker.Item label="Tahfidz SMP" value="TahfidzSMP" />
                    <Picker.Item label="Tahfidz SMA" value="TahfidzSMA" />
                  </Picker>
                </View>

                <View>
                  <View style={{
                    width: '90%',
                    height: 100,
                    borderRadius: 10,
                    borderWidth: 1,
                    marginLeft: 20,
                    marginTop: 10,
                    borderColor: '#E9E9E9',
                    backgroundColor: '#fff',
                    flexDirection: 'column',
                    justifyContent: 'space-around'
                  }}>
                    <Text style={style.Label1}>Nama Kelompok</Text>
                    <TextInput
                      style={style.kotak3}
                      onChangeText={nama => this.setState({ nama })}
                      value={this.state.nama}
                      keyboardType='default'
                      placeholder="Nama Kelompok"
                      placeholderTextColor='#7e7e7e'
                    />
                  </View>
                </View>
              </ScrollView>
              <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                <TouchableOpacity style={style.btnSimpanDark} >
                  <Text style={{ textAlign: 'center' }}>Simpan</Text>
                </TouchableOpacity>
                <TouchableOpacity style={style.btnSimpanDark} onPress={() => {
                  this.setState({ modaleditkel: false })
                }}>
                  <Text style={{ textAlign: 'center' }}>Kembali</Text>
                </TouchableOpacity>
              </View>
            </View>

          </View>
        </Modal>

        <Modal
          animationType={"slide"}
          transparent={true}
          visible={this.state.modaldata}
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

              <Text style={style.itemText}>Data Kelompok</Text>
              <ScrollView style={{ width: '100%', height: '100%' }}>
                <View style={{ borderWidth: 1, width: '90%', marginLeft: 20, borderColor: '#E9E9E9', }}>
                  <Text style={{ textAlign: 'center', fontSize: 18, }}>Tambah Anggota</Text>
                  <View style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#fff',
                    borderWidth: 0.5,
                    borderColor: '#000',
                    height: 40,
                    borderRadius: 5,
                    margin: 10,
                  }}>
                    <TextInput
                      value={this.state.carianak}
                      placeholder={'Cari'}
                      onChangeText={(text) => {
                        this.filterList1(text.toLowerCase()), this.setState({ carianak: text })
                      }}
                      style={style.searchBar} />
                  </View>
                  <FlatList
                   
                    data={this.state.carianak === '' ? this.state.kosong
                      : this.state.filt_anak1}
                    renderItem={({ item }) => (
                      <View style={style.item1}>
                        <View style={{ flexDirection: 'row', }}>
                          <View style={style.Label}>
                            <Text>{item.nama}</Text>
                          </View>

                        </View>

                      </View>
                    )}>
                  </FlatList>
                </View>

                <View style={{ borderWidth: 1, width: '90%', marginLeft: 20, borderColor: '#E9E9E9', }}>
                  <Text style={{ textAlign: 'center', fontSize: 18, }}>Data Anggota</Text>
                  <FlatList
                    
                    data={this.state.filt_anak}
                    renderItem={({ item }) => (
                      <View style={style.item1}>
                        <View style={{ flexDirection: 'row', }}>
                          <View style={style.Label}>
                            <Text>{item.nama}</Text>
                          </View>
                        
                        </View>

                      </View>
                    )}>
                  </FlatList>
                  <TouchableOpacity style={style.btnSimpanDark} onPress={() => {
                    this.setState({ modaldata: false })
                  }}>
                    <Text style={{ fontSize: 12, }}>kembali</Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>

            </View>

          </View>
        </Modal>

      </View>

    )
  }
}

export default Kelompok
const style = StyleSheet.create({
  contentContainer: {
    flex: 1,
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
  contentContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  checkboxbtn: {
    flex: 1,
    flexDirection: 'column',
    alignContent: 'flex-end',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  closeText: {
    fontSize: 24,
    color: '#00479e',
    textAlign: 'center',
  },
  containerLaporanPesan: {
    paddingTop: 5,
    marginHorizontal: 10,
    backgroundColor: 'white',
    borderRadius: 20,
    height: 280,
    shadowColor: "#333",
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 3,
    alignItems: 'center'
  },
  containerSafe: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  containermodal: {
    flex: 0,
    marginTop: 200,
    marginBottom: 400,
  },
  ImageStyle: {
    padding: 10,
    margin: 5,
    height: 20,
    width: 20,
    resizeMode: 'stretch',
    alignItems: 'center',
  },
  ImageStyle1: {
    padding: 10,
    height: 20,
    width: 20,
    resizeMode: 'stretch',
    alignItems: 'center',
  },
  dropdown: {
    position: 'absolute',
    backgroundColor: '#fff',
    width: '100%',
    shadowColor: '#000000',
    shadowRadius: 4,
    shadowOffset: { height: 4, width: 0 },
    shadowOpacity: 0.5,
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
  item1: {
    fontSize: 12,
    backgroundColor: '#fff',
    padding: 20,
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
    textAlign: 'center',
    fontWeight: 'bold',
  },
  container: {
    marginTop: 40,
    marginLeft: 75,
    multiline: true,
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
  container2: {
    backgroundColor: '#fff',
  },
  container1: {
    padding: 10,
    backgroundColor: '#fff',
    flexDirection: 'row'
  },
  images: {
    width: 150,
    height: 150,
    borderColor: 'black',
    borderWidth: 1,
    marginHorizontal: 3
  },
  btn: {
    backgroundColor: '#0080ff',
    height: 50,
    width: width - 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ModalCont: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#00000099',
    paddingHorizontal: 10,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 15,
    color: '#000'
  },
  logo4: {
    width: 75,
    height: 75,
    marginLeft: 10,
  },
  picker: {
    color: 'F',
    marginTop: 10,
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    borderRadius: 5,
    height: 30,
    width: '100%',
    shadowColor: "#333",
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 3,
    alignItems: 'center',
    justifyContent: 'center'
  },
  imgSmall: {
    position: 'absolute', flex: 1, alignItems: 'center', justifyContent: 'center'
  },
  title: {
    marginRight: 20,
    marginLeft: 20,
    marginTop: 15,
    marginBottom: 15,
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
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
  tmbl: {
    justifyContent: 'center', alignItems: 'center', backgroundColor: '#0EBEDF', borderRadius: 10, fontSize: 12, width: 150, height: 60, marginTop: 10, fontWeight: 'bold', marginLeft: 120,
  },
  tmbl1: {
    justifyContent: 'center', alignItems: 'center', backgroundColor: '#0EBEDF', borderRadius: 10, fontSize: 12, width: 150, height: 60, marginTop: 10, fontWeight: 'bold', paddingLeft: 50,
  },
  tmbl2: {
    shadowColor: "#333",
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 3,
    fontSize: 24,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0EBEDF',
    borderRadius: 10,
    fontSize: 12,
    width: 150,
    height: 60,
    marginTop: 10,
    marginLeft: 120,
  },
  tmbl3: {
    shadowColor: "#333",
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 3,
    fontSize: 24,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0EBEDF',
    borderRadius: 10,
    fontSize: 12,
    width: 150,
    height: 60,
    marginTop: 10,
    marginLeft: 120,
    paddingTop: 2,
  },
  Label: {
    fontSize: 12,
    padding: 5,
    color: '#000000',
    marginLeft: 5,
  },
  Label2: {
    marginTop: 10,
    marginLeft: 25,
    marginBottom: -10,
    padding: 5,
    color: '#000',
    alignItems: 'center',
    justifyContent: 'center'
  },
  Label1: {
    marginTop: 5,
    marginLeft: 25,
    padding: 5,
    color: '#000',
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    height: '50%',
    width: '50%',
  },
  Textinputcss: {
    color: '#7e7e7e',
    marginLeft: 20,
    marginRight: 10,
    borderRadius: 10,
    borderWidth: 1,
    fontSize: 12,
    width: '90%',
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
  containerBtn: {
    borderRadius: 10,
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 40,
    position: 'absolute',
    justifyContent: 'center', alignItems: 'center',
    bottom: 0,
    left: 0,
    right: 0,
  },
  radioButton: {
    height: 20,
    width: 20,
    backgroundColor: "#F8F8F8",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E6E6E6",
    alignItems: "center",
    justifyContent: "center"
  },
  radioButtonIcon: {
    height: 14,
    width: 14,
    borderRadius: 7,
    backgroundColor: "#98CFB6"
  },
  searchBar: {
    fontSize: 12,
    width: '70%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    alignContent: 'center',
    marginTop: 5,
  },
  btnSimpanDark: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    width: 120, height: 40,
    backgroundColor: '#87cefa',
    marginTop: 0,
    borderRadius: 5,
    padding: 10,
    borderWidth: 1,
    borderColor: '#E9E9E9',
    justifyContent: 'center', alignContent: 'center',
  },
  btnhapus: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    width: 60, height: 40,
    backgroundColor: 'red',
    marginTop: 0,
    borderRadius: 5,
    padding: 10,
    borderWidth: 1,
    borderColor: 'red',
    justifyContent: 'flex-end'
  },
  ModalCont2: {
    flex: 1,
    backgroundColor: '#00000079',
  },
  kotak3: {
    color: '#000000',
    marginTop: 2,
    marginLeft: 20,
    marginRight: 10,
    marginBottom: 20,
    borderRadius: 2,
    borderWidth: 0.1,
    fontSize: 12,
    height: 40,
    width: '90%',
    backgroundColor: '#F0F8FF',
  },

});