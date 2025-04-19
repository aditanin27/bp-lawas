import { Text, View, Dimensions, FlatList, StyleSheet, Modal, TouchableOpacity, Image, ScrollView, ToastAndroid } from 'react-native'
import React, { Component } from 'react'
import { test } from '../../assets/images';
import { LocationsH, TingkatH, JenisH, IconCari, Tanggal } from '../../assets/icons';
import { connect } from 'react-redux';
import { Picker } from '@react-native-picker/picker';
import moment from 'moment';
// import { DatePicker } from 'react-native-wheel-pick'
import AsyncStorage from '@react-native-async-storage/async-storage';
export class DetailPenga extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tujuan: '',
      anak: [],
      anakbarang: [],
      cari: '',
      filter_sta: [],
      select: [],
      st: [],
      list: this.props.route.params.list,
      modaldate: false,
      status: '',
      pembayaran: '',
      tanggal_diberikan: new Date(),
    };
  }
  componentDidMount() {
    this.GetPengajuanAPi();
    this.GetPengajuanbarangAPi();
    console.log(this.state.list)
  }

  SimpanData() {
    {
      let simpandata = {
        status: this.state.status,
        pembayaran: this.state.pembayaran,
        // tanggal_diberikan:
        //   this.state.list.berupa === "Uang" ?
        //     moment(this.state.tanggal_diberikan).format('YYYY-MM-DD') : '',
        tanggal_diberikan:
          // this.state.list.berupa === "Uang" ?
          moment(this.state.tanggal_diberikan).format('YYYY-MM-DD'),
        status_barang: encodeURIComponent(JSON.stringify(this.state.st))
      }
      let data = new FormData();
      for (let key in simpandata) {
        data.append(key, simpandata[key]);
      }
      fetch('https://kilauindonesia.org/datakilau/api/pengajuanupd/' + this.state.list.id_pengajuan, {
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
            this.props.navigation.navigate('Home')
            this.onRefresh()
            console.log(simpandata)
            ToastAndroid.show("Data berhasil ditambah!", ToastAndroid.SHORT)
          } else {

            ToastAndroid.show("gagal menyimpan", ToastAndroid.SHORT)
            console.log(simpandata)
          }
        })
        .catch((err) => console.log('dari catch send Data ===', err));
      console.log(simpandata)
    }

  }


  GetPengajuanAPi() {
    AsyncStorage.getItem('token').then((token) => {
      fetch('https://kilauindonesia.org/datakilau/api/detailpengajuan/' + this.state.list.id_pengajuan, {
        headers: {
          Authorization: 'Bearer ' + token,
          // 'Accept': 'application/json',
          // 'Content-Type': 'application/json'
        },
      }).then((res) => res.json())
        .then((resJson) => {
          const length = resJson.data.length;
          console.log('oke' + length);
          this.setState({
            anak: resJson.data,
            filter_sta: resJson.data,
            refreshing: false,
          });
        })
        .catch((err) => console.log('error catch home', err));
    });
  }
  GetPengajuanbarangAPi() {
    AsyncStorage.getItem('token').then((token) => {
      fetch('https://kilauindonesia.org/datakilau/api/detailpengajuanbarang/' + this.state.list.id_pengajuan, {
        headers: {
          Authorization: 'Bearer ' + token,
          // 'Accept': 'application/json',
          // 'Content-Type': 'application/json'
        },
      }).then((res) => res.json())
        .then((resJson) => {
          const length = resJson.data.length;
          console.log('oke' + length);
          this.setState({
            anakbarang: resJson.data,
            refreshing: false,
          });
        })
        .catch((err) => console.log('error catch home', err));
    });
  }
  selectbarang = (nama_barang) => {
    var select = this.state.select;
    var del = 0;
    var st = this.state.st;
    for (let i = 0; i < this.state.select.length; i++) {
      if (this.state.select[i].nama_barang === nama_barang) {
        this.state.select.splice(i, 1);
        del = nama_barang;
      }
    }
    if (nama_barang != del) {

      select.push({ nama_barang });

    }
    console.log(select, this.state.st);
    // this.setState({id_anak, no});

    // }

  }
  render() {
    // const filter_sta = this.state.anak.filter(item => item.status_cpb === 'PB')

    const list = []
    const barang = []
    for (let i = 0; i < this.state.list.nama_barang.length; i++) {
      const totharga = this.state.list.harga[i] * this.state.list.jumlah[i]
      barang.push(
        <View key={i}>
          <ScrollView>
            <View style={[style.item, {
              borderWidth: this.state.select.find(data => data.nama_barang === this.state.list.nama_barang[i]) ? 3 : 1,
              borderColor: this.state.select.find(data => data.nama_barang === this.state.list.nama_barang[i]) ? '#0076B8' : '#bdbdbb',
            }]}>
              <TouchableOpacity onPress={() => this.selectbarang(this.state.list.nama_barang[i], this.setState({}))}>
                <View style={style.form}>
                  <Text style={style.labelkiri}>Nama Barang</Text>
                  <Text style={style.labelkanan}>
                    :{this.state.list.nama_barang[i]}
                  </Text>
                </View>
                <View style={style.form}>
                  <Text style={style.labelkiri}>Jumlah</Text>
                  <Text style={style.labelkanan}>
                    :{this.state.list.jumlah[i]}
                  </Text>
                </View>
                <View style={style.form}>
                  <Text style={style.labelkiri}>Harga Satuan</Text>
                  <Text style={style.labelkanan}>
                    :{"Rp." + this.state.list.harga[i].replace(/\D/g, '')
                      .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
                  </Text>
                </View>
                <View style={style.form}>
                  <Text style={style.labelkiri}>Total Harga</Text>
                  <Text style={style.labelkanan}>
                    :{"Rp." + totharga.toString().replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
                  </Text>
                </View>

                <View style={style.form}>
                  <Text style={style.labelkiri}>Detail Barang</Text>
                  <Text style={[style.labelkanan, { width: "50%" }]}>
                    :{this.state.list.detail[i]}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </ScrollView>
          <View style={{
            height: 1,
            width: '95%',
            backgroundColor: '#bdbdbb',
            marginTop: 10,
            marginHorizontal: 10,
          }}></View>
        </View >
      )
    }
    for (let i = 0; i < this.state.list.id_anak.length; i++) {
      list.push(
        <View key={i}>
          <View >
            {this.state.anak.map((item, key) => (
              <View >
                <View style={{
                  fontSize: 12,
                  flexDirection: 'row',
                  backgroundColor: '#fff',
                  color: '#000',
                  marginVertical: 10,
                  marginHorizontal: 20,
                  shadowColor: '#858585',
                  overflow: 'hidden',
                  shadowRadius: 15,
                  elevation: 6,
                  shadowOpacity: '25%',
                  borderColor: '#7e7e7e',
                  borderRadius: 15,
                  width: '90%'
                }}>
                  <View style={{
                    width: '10%', justifyContent: 'center',
                    backgroundColor: item.status_cpb[i] === 'CPB' ? '#0076B8' : '#000' &&
                      item.status_cpb[i] === 'PB' ? '#00B855' : '#000' && item.status_cpb[i] === 'NPB' ? '#E32845' : '#000' && item.status_cpb[i] === 'BCPB' ? '#FFBB0C' : '#000'
                  }}>
                    <View style={{ width: '40%', justifyContent: 'center', alignItems: 'center', alignSelf: 'center', alignContent: 'center' }}>
                      <Text style={{ fontSize: 12, fontFamily: 'Poppins-Medium', color: '#fff' }}>{item.status_cpb[i]}</Text>
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
                            {item.full_name[i]}
                          </Text>


                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            ))}
            {/* <Text>{this.state.list.id_anak[i]}</Text>
           
            <Text style={style.labelkanan}>{this.state.list.jumlah[i]}</Text> */}
          </View>
        </View >
      )
    }
    return (
      <View style={{ backgroundColor: '#fff', height: '100%' }} >
        {
          this.props.user.presensi === '' ? //Pengelola//
            <ScrollView style={{ backgroundColor: '#fff', height: '100%' }}>
              <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 16, marginTop: 15, marginBottom: 15 }}>Pengajuan Dana</Text>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ marginLeft: 15 }}>Jenis Pengajuan:</Text>
                <Text style={{ marginRight: 20 }}>{this.state.list.berupa}</Text>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ marginLeft: 15, marginTop: 5 }}>Status Pengajuan:</Text>
                <Text style={[style.status, {
                  color: this.state.list.status === 'Diterima' ?
                    'green' : this.state.list.status === 'Ditolak' ? 'red' : '#D39800'
                }]}>{this.state.list.status}</Text>
              </View>



              {this.state.list.berupa === "Uang" ?
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text style={{ marginLeft: 15, marginTop: 5 }}>Jumlah Uang:</Text>
                  <Text style={{ width: 100, }}>{"Rp." + this.state.list.uang.toString().replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</Text>
                </View>
                : <View />}
              {this.state.list.berupa === 'Uang' ?
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text style={{ marginLeft: 15 }}>Jumlah Anak Yang Diajukan:</Text>
                  <Text style={{ marginRight: 30 }}>{this.state.list.id_anak.length}</Text>
                </View>
                : <View />}
              {this.state.berupa === "Uang" && this.state.list.status === "Diterima" ?
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text style={{ marginLeft: 15, }}>Pembayaran:</Text>
                  <Text style={{ marginRight: 30 }}>{this.state.list.pembayaran}</Text>
                </View> : <View />
              }

              {this.state.list.status === "Diterima" ?
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text style={{ marginLeft: 15 }}>Tanggal Diberikan:</Text>
                  <Text style={{ marginRight: 20 }}>{this.state.list.tanggal_diberikan}</Text>
                </View>
                : <View />}

              <View style={{
                height: 1,
                width: '95%',
                backgroundColor: '#bdbdbb',
                marginTop: 10,
                marginHorizontal: 10,
              }}></View>
              {this.state.list.berupa === 'Barang' ?
                <View style={{}}>
                  <Text style={{ marginLeft: 15 }}>Barang yang Diajukan:</Text>

                  {barang}

                </View>
                : <View />}
              {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ marginLeft: 15 }}>Jumlah Yang Dicairkan:</Text>
          <Text style={{ marginRight: 10 }}>Rp.10.000.000</Text>
        </View> */}
              {/* <View
          style={[style.kotak3, { flexDirection: 'row' }]}>
          <IconCari style={style.IconCari} name="your-icon" size={20} />
          <TextInput
            style={{
              flexDirection: 'row',
              backgroundColor: '#FFF',
              paddingHorizontal: 40,
              height: 38,
              width: '90%',
              borderRadius: 9,
              marginTop: -9,
            }}
            color={'#000'}
            onChangeText={(text) => {
              this.filterList(text.toLowerCase()), this.setState({ cari: text })
            }}
            value={this.state.cari}
            placeholder="Cari Anak Binaan"
            placeholderTextColor="#C0C0C0"
            underlineColorAndroid="transparent"
          />
        </View> */}
              {/* <View style={{
                height: 1,
                width: '100%',
                backgroundColor: '#bdbdbb',
                marginTop: 10
              }}></View> */}

              {/* <FlatList
          pagingEnabled={true}
          data={this.state.anak}
          renderItem={({ item }) => (
            // style={style.kotakbaru4}
            <View style={{}}>
              <TouchableOpacity>
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
                      </View>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          )}>
        </FlatList> */}
              <ScrollView>
                {this.state.list.berupa === 'Barang' ?
                  <View >
                    {this.state.anakbarang.map((item, key) => (
                      <View >
                        <View style={{
                          fontSize: 12,
                          flexDirection: 'row',
                          backgroundColor: '#fff',
                          color: '#000',
                          marginVertical: 10,
                          marginHorizontal: 20,
                          shadowColor: '#858585',
                          overflow: 'hidden',
                          shadowRadius: 15,
                          elevation: 6,
                          shadowOpacity: '25%',
                          borderColor: '#7e7e7e',
                          borderRadius: 15,
                          width: '90%'
                        }}>
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


                                </View>
                              </View>
                            </View>
                          </View>
                        </View>
                      </View>
                    ))}
                    {/* <Text>{this.state.list.id_anak[i]}</Text>
                
                 <Text style={style.labelkanan}>{this.state.list.jumlah[i]}</Text> */}
                  </View> :
                  <View>

                    {list}
                  </View>
                }
              </ScrollView>
              {/* <Text style={style.labelkiri}>{this.state.list.full_name}</Text> */}
            </ScrollView>
            :
            <View />
        }
        {
          this.props.user.presensi === 'karyawan' ? //admin//
            <ScrollView style={{ backgroundColor: '#fff', height: '100%' }}>
              <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 16, marginTop: 15, marginBottom: 15 }}>Pengajuan Dana{this.state.list.id_pengajuan}</Text>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ marginLeft: 15 }}>Jenis Pengajuan:</Text>
                <Text style={{ marginRight: 20 }}>{this.state.list.berupa}</Text>
              </View>

              {this.state.berupa === "Uang" ?
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text style={{ marginLeft: 15 }}>Jumlah Anak Yang Diajukan:</Text>
                  <Text style={{ marginRight: 30 }}>{this.state.list.id_anak.length}</Text>
                </View> : <View />}
              {this.state.list.berupa === "Uang" ?
                <View>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ marginLeft: 15 }}>Jumlah Anak Yang Diajukan:</Text>
                    <Text style={{ marginRight: 30 }}>{this.state.list.id_anak.length}</Text>
                  </View>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ marginLeft: 15 }}>Jumlah Yang Diajukan:</Text>
                    <Text style={{ marginRight: 20 }}>{"Rp." + this.state.list.uang.toString().replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</Text>
                  </View>
                </View>
                : <View />}
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ marginLeft: 15, marginTop: 5 }}>Status:</Text>
                < View style={{
                  width: '40%',
                  borderRadius: 10,
                  borderWidth: 1,
                  marginRight: 10,
                  borderColor: '#E9E9E9',
                  backgroundColor: '#fff',
                  flexDirection: 'column',
                  justifyContent: 'space-around'
                }}>

                  <Picker mode="dropdown" style={style.Textinputcss}
                    selectedValue={this.state.status}
                    value={this.state.status}
                    onValueChange={(itemValue) => {
                      this.setState({
                        status: itemValue
                      })
                    }}>
                    <Picker.Item style={{ fontSize: 12 }} label={this.state.list.status} value={'0'} key={'0'} />
                    <Picker.Item style={{ fontSize: 12 }} label={'Diterima'} value={'Diterima'} key={'0'} />
                    <Picker.Item style={{ fontSize: 12 }} label={'Ditolak'} value={'Ditolak'} key={'0'} />


                    {/* <Picker.Item style={{ fontSize: 12 }} label="NPB/CPB/BCPB" value="Bimbingan" /> */}

                  </Picker>
                </View>
              </View>

              {this.state.list.berupa === "Uang" && this.state.list.status === "Diterima" ?
                <View>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ marginLeft: 15 }}>Jenis Pembayaran:</Text>
                    <Text style={{ marginRight: 20 }}>{this.state.list.pembayaran}</Text>
                  </View>
                  {this.state.pembayaran === 'Rapel' ?
                    <View>
                      <View style={[style.kotak3, { height: 100 }]}>
                        <Text>Tanggal Diberikan </Text>
                        <View style={{ flexDirection: 'row' }}>
                          <Text
                            style={style.kotak7}>
                            {moment(this.state.tanggal_diberikan).format('YYYY-MM-DD')}

                          </Text>
                          <View
                            style={{
                              borderColor: '#DDD',
                              borderWidth: 1,
                              height: 50,
                              width: 50,
                              borderRadius: 10,
                              top: 10,
                              marginLeft: 10,

                            }}>
                            <TouchableOpacity onPress={() => this.setState({ modaldate: true })}>
                              <View style={{ height: 50, width: 50, justifyContent: 'center', alignItems: 'center', borderRadius: 10, }}>
                                <Tanggal />
                              </View>
                            </TouchableOpacity>
                          </View>
                        </View>
                      </View>

                    </View>
                    : <View />}
                </View>
                : <View />}


              {this.state.list.status === "Diterima" && this.state.list.pembayaran === 'Rapel' ?
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text style={{ marginLeft: 15 }}>Tanggal Diberikan:</Text>
                  <Text style={{ marginRight: 20 }}>{this.state.list.tanggal_diberikan}</Text>
                </View>
                : <View />
              }
              {this.state.berupa === "Uang" && this.state.list.status === "Diterima" || this.state.status === "Diterima" ?
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 }}>
                  <Text style={{ marginLeft: 15, marginTop: 15 }}>Pembayaran:</Text>
                  < View style={{
                    width: '50%',
                    borderRadius: 10,
                    borderWidth: 1,
                    marginRight: 10,
                    borderColor: '#E9E9E9',
                    backgroundColor: '#fff',
                    flexDirection: 'column',
                    justifyContent: 'space-around'
                  }}>

                    <Picker mode="dropdown" style={style.Textinputcss}
                      selectedValue={this.state.pembayaran}
                      value={this.state.pembayaran}
                      onValueChange={(itemValue) => {
                        this.setState({
                          pembayaran: itemValue
                        })
                      }}>
                      <Picker.Item style={{ fontSize: 12 }} label={this.state.list.pembayaran} value={'0'} key={'0'} />
                      <Picker.Item style={{ fontSize: 12 }} label={'Rapel'} value={'Rapel'} key={'0'} />
                      <Picker.Item style={{ fontSize: 12 }} label={'Bertahap'} value={'Bertahap'} key={'0'} />
                      {/* <Picker.Item style={{ fontSize: 12 }} label="NPB/CPB/BCPB" value="Bimbingan" /> */}
                    </Picker>
                  </View>

                </View> : <View />
              }
              {this.state.pembayaran === 'Rapel' ?
                <View style={[style.kotak3, { height: 100 }]}>
                  <Text>Tanggal Diberikan </Text>
                  <View style={{ flexDirection: 'row' }}>
                    <Text
                      style={style.kotak7}>
                      {moment(this.state.tanggal_diberikan).format('YYYY-MM-DD')}

                    </Text>
                    <View
                      style={{
                        borderColor: '#DDD',
                        borderWidth: 1,
                        height: 50,
                        width: 50,
                        borderRadius: 10,
                        top: 10,
                        marginLeft: 10,

                      }}>
                      <TouchableOpacity TouchableOpacity onPress={() => this.setState({ modaldate: true })}>
                        <View style={{ height: 50, width: 50, justifyContent: 'center', alignItems: 'center', borderRadius: 10, }}>
                          <Tanggal />
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
                : <View />}


              {this.state.list.berupa === 'Barang' ?
                <View style={{}}>
                  <Text style={{ marginLeft: 15 }}>Barang yang Diajukan:</Text>
                  {barang}
                </View>
                : <View />}
              <View style={{ marginBottom: 10, marginTop: 10, width: '92%', borderWidth: 1, height: 1, justifyContent: "center", alignContent: 'center', alignSelf: 'center', borderColor: '#bdbdbd' }}></View>
              <Modal
                animationType={"slide"}
                transparent={true}
                visible={this.state.modaldate}
                onRequestClose={() => this.setState({ modaldate: false })}
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',

                }}>
                <View style={style.ModalCont2}>
                  <View style={{
                    paddingTop: 5,
                    backgroundColor: '#ffffff',
                    // flexDirection: 'row',
                    borderTopLeftRadius: 10,
                    borderTopRightRadius: 10,
                    // height: '50%',
                    shadowColor: "#333",
                    shadowOffset: {
                      width: 1,
                      height: 1,
                    },
                    shadowOpacity: 0.3,
                    shadowRadius: 2,
                    elevation: 3,
                    height: '50%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'absolute',
                    top: '50%',
                    bottom: 0,
                    left: 0,
                    right: 0,
                  }}>
                    <Text style={style.tglText}>Pilih Tanggal</Text>
                    <ScrollView style={{ width: '100%', height: '100%' }}>

                      <DatePicker
                        order='D-M-Y'
                        style={{ height: 215, width: 380, backgroundColor: '#fff', marginLeft: 5 }}
                        minimumDate={new Date('1000-01-01')}
                        maximumDate={new Date('2222-12-31')}
                        format="YYYY-MM-DD"
                        onDateChange={(date) =>
                          this.setState({ tanggal_diberikan: moment(date).format('YYYY-MM-DD') }, () => console.log(this.state.tanggal_diberikan))
                        }
                      />
                      {/* <DatePicker
                                         date={this.state.dateanak}
                                         placeholder="select date"
                                         onDateChange={(dateanak) =>
                                             this.setState({ dateanak }, () => console.log(this.state.dateanak))
                                         }
                                         androidVariant='iosClone'
                                         locale='id'
                                     /> */}
                      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: '10%' }}>
                        <View style={style.kotakkecil}>
                          <TouchableOpacity onPress={() => this.setState({ modaldate: false })}>

                            <Text style={{
                              justifyContent: 'center', textAlign: 'center',
                            }}>Batal</Text>
                          </TouchableOpacity>
                        </View>
                        <View style={style.kotakkecil}>
                          <TouchableOpacity onPress={() => this.setState({ modaldate: false })}>
                            <Text style={{
                              justifyContent: 'center', textAlign: 'center',
                            }}>Simpan</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </ScrollView>
                  </View>
                </View>
              </Modal>
              <ScrollView>
                {this.state.list.berupa === 'Barang' ?
                  <View >
                    {this.state.anakbarang.map((item, key) => (
                      <View >
                        <View style={{
                          fontSize: 12,
                          flexDirection: 'row',
                          backgroundColor: '#fff',
                          color: '#000',
                          marginVertical: 10,
                          marginHorizontal: 20,
                          shadowColor: '#858585',
                          overflow: 'hidden',
                          shadowRadius: 15,
                          elevation: 6,
                          shadowOpacity: '25%',
                          borderColor: '#7e7e7e',
                          borderRadius: 15,
                          width: '90%'
                        }}>
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


                                </View>
                              </View>
                            </View>
                          </View>
                        </View>
                      </View>
                    ))}
                    {/* <Text>{this.state.list.id_anak[i]}</Text>
                
                 <Text style={style.labelkanan}>{this.state.list.jumlah[i]}</Text> */}
                  </View> :
                  <View>

                    {list}
                  </View>
                }
              </ScrollView>



              <View style={style.botomnav}>
                <TouchableOpacity style={style.btntambah} onPress={() =>
                  this.SimpanData()
                } >
                  <Text style={{ color: '#fff', textAlign: 'center' }}>Simpan</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
            :
            <View />
        }
      </View >
    )
  }
}
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const style = StyleSheet.create({
  kotak3: {
    marginTop: 10,
    color: '#000',
    borderRadius: 10,
    borderWidth: 0.1,
    fontSize: 13,
    height: 50,
    marginLeft: 20,
    width: windowWidth - 40,
    padding: 12,
    backgroundColor: '#fff',
    borderColor: '#DDDDDD',
    borderWidth: 1,
    fontFamily: 'Poppins-Regular',
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
  btntambah: {
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    height: 50,
    borderWidth: 1,
    borderRadius: 10,
    color: '#fff',
    borderColor: '#00A9B8',
    backgroundColor: '#00A9B8',
  },
  status: {
    marginRight: 15,
    color: '#D39800',
    // backgroundColor: '#bdbdbd',
    width: 60,
    height: 30,
    fontWeight: 'bold',
    padding: 3,
    textAlign: 'center',
    borderRadius: 5,
  },
  botomnav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    height: 70,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    backgroundColor: 'white',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 20,
    shadowColor: '#52006A'
  },
  btntambah: {
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    height: 50,
    borderWidth: 1,
    borderRadius: 10,
    color: '#fff',
    borderColor: '#00A9B8',
    backgroundColor: '#00A9B8',
  },
  kotakkecil: {
    borderColor: '#bdbdbd',
    borderWidth: 1,
    width: '40%',
    height: 50,
    justifyContent: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    borderRadius: 10,
    marginTop: 10,
    marginHorizontal: 10,
  },
  kotak7: {
    marginTop: 10,
    color: "#C0C0C0",
    borderRadius: 10,
    borderWidth: 0.1,
    fontSize: 13,
    height: 50,
    width: windowWidth - 130,
    padding: 12,
    backgroundColor: '#fff',
    borderColor: '#DDDDDD',
    borderWidth: 1,
    fontFamily: 'Poppins-Regular',
  },
  ModalCont2: {
    flex: 1,
    backgroundColor: '#00000079',
  },
  form: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    width: '100%',
  },
  labelkiri: {
    fontSize: 12,
    fontWeight: 'bold',
    marginVertical: 5,
    marginLeft: 20,
    width: 100,
  },
  labelkanan: {
    fontSize: 12,
    marginHorizontal: 5,
    width: 150,
  },
  item: {
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
    borderRadius: 15,
    flexDirection: 'row',
  },
});
const mapStateToProps = (state) => {
  return {
    user: state,
    initialState: state
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeUser: (data) => dispatch({ type: 'CHANGE/USER', payload: data }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(DetailPenga);