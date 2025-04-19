import { Text, View, FlatList, StyleSheet, TouchableOpacity, Modal, SafeAreaView, ScrollView, RefreshControl, ToastAndroid } from 'react-native'
import React, { Component } from 'react'
import {
  Kidsabu,
  Close,
  Taks,
} from '../../assets/icons'
import { connect } from 'react-redux';
import SwitchSelector from 'react-native-switch-selector';
import AsyncStorage from '@react-native-async-storage/async-storage';

export class ListPengajuan extends Component {
  constructor(props) {
    super(props)
    this.state = {
      list: [],
      Pilih: false,
      modalpilih: false,
      Pengajuan: '',
      pegajuanlist: [],
      refreshing: true,
      listrqeust: [],


    }
  }

  componentDidMount() {
    this.GetPengajuanpengelola();
  }

  GetPengajuanpengelola() {
    AsyncStorage.getItem('token').then((token) => {
      fetch('https://kilauindonesia.org/datakilau/api/getpengajuan', {
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
            pegajuanlist: resJson.data,
            refreshing: false,
          });
        })
        .catch((err) => console.log('error catch home', err));
    });
  }
  onRefresh() {
    this.GetPengajuanpengelola();
    this.GetPengajuanAPi();
    this.setState({ refreshing: false });
  }
  render() {
    const Pengajuan = [
      { label: 'Anak', value: 'Anak' },
      { label: 'Oprasional', value: 'Oprasional' },
      // { label: 'Request', value: 'Request' },
    ];
    const anak = this.state.pegajuanlist.filter(item => item.tujuan === 'Biaya Pengajuan Anak')
    const Oprasional = this.state.pegajuanlist.filter(item => item.tujuan === 'Oprasional')
    const listanak = anak.map(item =>
      <View>
        <TouchableOpacity onPress={() =>
          // this.setState({ modalpilih: true })
          this.props.navigation.navigate('DetailPenga', { list: item })
        }>
          <View style={style.kotakstat}>

            <Text style={[style.status, {
              color: item.status === 'Diterima' ?
                'green' : item.status === 'Ditolak' ? 'red' : '#D39800'
            }]}>{item.status}</Text>


            <Text style={[style.judul, { color: '#bdbdbd' }]}>{item.tujuan}</Text>
            <Text style={{ textAlign: 'right', color: '#bdbdbd', fontWeight: 'bold' }}>{item.tanggal}</Text>
          </View>
        </TouchableOpacity>
      </View>

    );

    const listanakadmin = anak.map(item =>
      <View>
        <TouchableOpacity onPress={() =>
          this.props.navigation.navigate('DetailPenga', { list: item })
        }>
          <View style={style.kotakstat}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignContent: 'space-between' }}>
              <Text style={[style.status, {
                color: item.status === 'Diterima' ?
                  'green' : item.status === 'Ditolak' ? 'red' : '#D39800'
              }]}>{item.status}</Text>
              <Text style={{ fontSize: 12, fontWeight: 'bold' }}>{item.tanggal_diberikan}</Text>
            </View>
            <Text style={style.judul}>{item.tujuan}</Text>
            <View style={{ flexDirection: 'row', marginTop: 10, }}>
              <Kidsabu></Kidsabu>
              <Text style={{ marginTop: 6, fontSize: 16, color: '#bdbdbd', fontWeight: 'bold' }}>{item.id_anak.length}</Text>
            </View>
            <Text style={{ textAlign: 'right', color: '#bdbdbd', fontWeight: 'bold' }}>{item.tanggal}</Text>
          </View>
        </TouchableOpacity>
      </View>

    );
    return (
      <View>
        {
          this.props.user.presensi === 'admin' ? //admin cabang//
            <View style={{ backgroundColor: '#fff', height: '100%' }}>
              <View style={{ height: 150, backgroundColor: '#0EBEDF' }}>
                <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 16, marginTop: 15, marginBottom: 15, color: '#FFF' }}>Riwayat Pengajuan</Text>
                <View style={{ marginTop: 10, marginHorizontal: 20 }}>
                  <SwitchSelector
                    fontSize={12}
                    fontFamily={'Poppins-Medium'}
                    options={Pengajuan}
                    initial={0}
                    borderWidth={0}
                    height={49}
                    borderRadius={10}
                    hasPadding
                    // onPress={(value) => console.log(`Call onPress with value: ${value}`)}
                    onPress={value => {
                      this.setState({ Pengajuan: value })
                    }}

                  />
                </View>
              </View>
              {this.state.Pengajuan === 'Anak' || this.state.Pengajuan === '' ?
                <ScrollView>

                  {listanakadmin}
                </ScrollView>
                // <FlatList
                //   pagingEnabled={true}
                //   data={this.state.list}
                //   renderItem={({ item }) => (
                //     // style={style.kotakbaru4}
                //     <TouchableOpacity onPress={() => this.props.navigation.navigate('DetailPenga', { list: item })}>
                //       <View style={style.kotakstat}>
                //         <Text style={[style.status]}>Pending</Text>
                //         <Text style={style.judul}>Pengajuan Beasiswa Pendidikan</Text>
                //         <View style={{ flexDirection: 'row', marginTop: 10, }}>
                //           <Kidsabu></Kidsabu>
                //           <Text style={{ marginTop: 6, fontSize: 16, color: '#bdbdbd', fontWeight: 'bold' }}>40 Anak</Text>
                //         </View>
                //         <Text style={{ textAlign: 'right', color: '#bdbdbd', fontWeight: 'bold' }}>12 Jan 2022</Text>
                //       </View>
                //     </TouchableOpacity>
                //   )}>
                // </FlatList>
                : <View />}

              {this.state.Pengajuan === 'Oprasional' ?
                <FlatList
                  pagingEnabled={true}
                  data={Oprasional}
                  renderItem={({ item }) => (
                    // style={style.kotakbaru4}
                    <TouchableOpacity onPress={() =>
                      this.props.navigation.navigate('DetailOprasional', { list: item })
                    }
                    >
                      <View style={[style.kotakstat, { height: 120 }]}>
                        <Text style={[style.status, {
                          color: item.status === 'Diterima' ?
                            'green' : item.status === 'Ditolak' ? 'red' : '#D39800'
                        }]}>{item.status}</Text>

                        <View style={{ flexDirection: 'row', marginTop: 5 }}>
                          <Taks></Taks>
                          <Text style={[style.judul, { marginLeft: 4, color: '#bdbdbd' }]}>{item.tujuan}</Text>
                        </View>

                        <Text style={{ textAlign: 'right', color: '#bdbdbd', fontWeight: 'bold' }}>12 Jan 2022</Text>
                      </View>
                    </TouchableOpacity>
                  )}>
                </FlatList>
                : <View />}
            </View>
            :
            <View />
        }
        {
          this.props.user.presensi === '' ? //Pengelola//
            <View style={{ backgroundColor: '#fff', flex: 1 }}>
              <View style={{ backgroundColor: '#0EBEDF', height: 130 }}>
                <Text style={{ color: '#fff', textAlign: 'center', fontWeight: 'bold', fontSize: 16, marginTop: 5, marginBottom: 5 }}>Riwayat Pengajuan</Text>
                <View style={{ marginTop: 30, marginHorizontal: 10, }}>
                  <SwitchSelector
                    fontSize={12}
                    fontFamily={'Poppins-Medium'}
                    options={Pengajuan}
                    initial={0}
                    borderWidth={0}
                    height={49}
                    borderRadius={10}
                    hasPadding
                    // onPress={(value) => console.log(`Call onPress with value: ${value}`)}
                    onPress={value => {
                      this.setState({ Pengajuan: value })

                    }}

                  />
                </View>
              </View>

              <ScrollView>
                {this.state.Pengajuan === '' || this.state.Pengajuan === 'Anak' ?
                  <View>
                    <FlatList
                      refreshControl={
                        <RefreshControl
                          refreshing={this.state.refreshing}
                          onRefresh={() => this.onRefresh()}
                        />
                      }
                      data={anak}
                      renderItem={({ item, index }) => (
                        <View>
                          <TouchableOpacity onPress={() =>
                            // this.setState({ modalpilih: true })
                            this.props.navigation.navigate('DetailPenga', { list: item })
                          }>
                            <View style={style.kotakstat}>

                              <Text style={[style.status, {
                                color: item.status === 'Diterima' ?
                                  'green' : item.status === 'Ditolak' ? 'red' : '#D39800'
                              }]}>{item.status}</Text>
                              <Text style={[style.judul, { color: '#bdbdbd' }]}>{item.tujuan}</Text>
                              <Text style={{ textAlign: 'right', color: '#bdbdbd', fontWeight: 'bold' }}>{item.tanggal}</Text>
                            </View>
                          </TouchableOpacity>
                        </View>
                      )}></FlatList>
                    {/* {listanak} */}
                  </View>
                  : <View />}
                {this.state.Pengajuan === 'Oprasional' ?
                  <View>
                    <FlatList
                      refreshControl={
                        <RefreshControl
                          refreshing={this.state.refreshing}
                          onRefresh={() => this.onRefresh()}
                        />
                      }
                      data={Oprasional}
                      renderItem={({ item, index }) => (
                        <View>
                          <TouchableOpacity onPress={() =>
                            // this.setState({ modalpilih: true })
                            this.props.navigation.navigate('DetailOprasional', { list: item })
                          }>
                            <View style={style.kotakstat}>
                              <Text style={[style.status, {
                                color: item.status === 'Diterima' ?
                                  'green' : item.status === 'Ditolak' ? 'red' : '#D39800'
                              }]}>{item.status}</Text>
                              <Text style={style.judul}>{item.tujuan}</Text>
                              <Text style={{ textAlign: 'right', color: '#bdbdbd', fontWeight: 'bold' }}>{item.tanggal}</Text>
                            </View>
                          </TouchableOpacity>
                        </View>
                      )}></FlatList>
                    {/* {this.state.pegajuanlist.lenght === 0 ?
                      <View></View>
                      : { listops }
                    } */}
                  </View>
                  : <View />}
              </ScrollView >

              {/* <FlatList
                pagingEnabled={true}
                data={this.state.list}
                renderItem={({ item }) => (
                  // style={style.kotakbaru4}
                  <TouchableOpacity onPress={() => this.props.navigation.navigate('DetailPenga')}>
                    <View style={style.kotakstat}>
                      <Text style={[style.status]}>Pending</Text>
                      <Text style={style.judul}>Pengajuan Beasiswa Pendidikan</Text>
                      <View style={{ flexDirection: 'row', marginTop: 10, }}>
                        <Kidsabu></Kidsabu>
                        <Text style={{ marginTop: 6, fontSize: 16, color: '#bdbdbd', fontWeight: 'bold' }}>40 Anak</Text>
                      </View>
                      <Text style={{ textAlign: 'right', color: '#bdbdbd', fontWeight: 'bold' }}>12 Jan 2022</Text>
                    </View>
                  </TouchableOpacity>
                )}>
              </FlatList> */}
              <View style={{ flexDirection: 'row', marginVertical: 10, justifyContent: 'space-around', alignItems: 'center', }}>

                <TouchableOpacity style={style.btntambah} onPress={() => this.setState({ Pilih: true })}>
                  <Text style={{ color: '#fff' }}>+ Tambah Pengajuan</Text>
                </TouchableOpacity>
              </View>

              <Modal animationType={"fade"} transparent={true}
                visible={this.state.Pilih}
                onRequestClose={() => this.setState({ Pilih: false })}>

                <SafeAreaView style={style.containerSafe}>
                  <TouchableOpacity activeOpacity={1.0} onPress={() => this.setState({ Pilih: false })} style={style.ModalCont}>
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
                      <TouchableOpacity onPress={() => this.setState({ Pilih: false })} style={{ position: 'absolute', right: 20, top: 20 }}>
                        <Close />
                      </TouchableOpacity>
                      <Text style={style.txtPresensi}>Pilih Pengajuan</Text>
                      <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                        <View style={[style.kotakkecil, { backgroundColor: '#00A9B8' }]}>
                          <TouchableOpacity onPress={() => this.props.navigation.navigate('Pengajuan', this.setState({ Pilih: false }))}>
                            {/* <KKada style={{ justifyContent: 'center', alignSelf: 'center' }} /> */}
                            <Text style={{ color: '#fff', textAlign: 'center', padding: 5, fontWeight: 'bold' }}>Ajukan Pengajuan Anak</Text>
                          </TouchableOpacity>
                        </View>

                        <View style={[style.kotakkecil, { backgroundColor: '#00A9B8', }]}>
                          <TouchableOpacity onPress={() => this.props.navigation.navigate('Oprasional', this.setState({ Pilih: false }))}>
                            {/* <KKada style={{ justifyContent: 'center', alignSelf: 'center' }} /> */}
                            <Text style={{ color: '#fff', textAlign: 'center', padding: 5, fontWeight: 'bold' }}>Ajukan Biaya Operasional</Text>
                          </TouchableOpacity>
                        </View>
                      </View>

                      <View style={{ marginTop: '5%', alignItems: 'center', flexDirection: 'row', alignContent: 'center', }}>
                        <TouchableOpacity onPress={() => this.setState({ Pilih: false }) + ToastAndroid.show('Batal', ToastAndroid.SHORT)}>
                          <View style={{ height: 50, borderColor: '#00A9B8', borderWidth: 1, width: 100, justifyContent: 'center', alignItems: 'center', alignSelf: 'center', borderRadius: 5 }}>
                            <Text style={{ color: '#00A9B8', fontFamily: 'Poppins-Medium', fontSize: 14 }}>Batal</Text>
                          </View>
                        </TouchableOpacity>

                      </View>
                    </View>
                  </TouchableOpacity>
                </SafeAreaView>
              </Modal>

              <Modal animationType={"fade"} transparent={true}
                visible={this.state.modalpilih}
                onRequestClose={() => this.setState({ modalpilih: false })}>

                <View style={{
                  backgroundColor: '#fff',
                  paddingTop: 5,
                  marginHorizontal: 5,
                  marginTop: '50%',
                  borderRadius: 20,
                  height: '35%',
                  width: '90%',
                  borderWidth: 1,
                  alignItems: 'center',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignSelf: 'center'
                }}>
                  <SafeAreaView style={{ alignItems: 'center' }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>


                      <View style={{ marginTop: '2%', alignItems: 'center', flexDirection: 'row', alignContent: 'center', }}>
                        <TouchableOpacity onPress={() => this.setState({ modalpilih: false }) + ToastAndroid.show('Batal', ToastAndroid.SHORT)}>
                          <View style={{ height: 50, borderColor: '#00A9B8', borderWidth: 1, width: 100, justifyContent: 'center', alignItems: 'center', alignSelf: 'center', borderRadius: 5 }}>
                            <Text style={{ color: '#00A9B8', fontFamily: 'Poppins-Medium', fontSize: 14 }}>Kembali</Text>
                          </View>
                        </TouchableOpacity>

                      </View>
                    </View>
                  </SafeAreaView>
                </View >

              </Modal >
            </View>
            :
            <View />
        }

        <View style={{ backgroundColor: '#fff', height: '100%' }}>
          <View style={{ backgroundColor: '#0EBEDF', height: 130 }}>
            <Text style={{ color: '#fff', textAlign: 'center', fontWeight: 'bold', fontSize: 16, marginTop: 5, marginBottom: 5 }}>Riwayat Pengajuan</Text>
            <View style={{ marginTop: 30, marginHorizontal: 10, }}>
              <SwitchSelector
                fontSize={12}
                fontFamily={'Poppins-Medium'}
                options={Pengajuan}
                initial={0}
                borderWidth={0}
                height={49}
                borderRadius={10}
                hasPadding
                // onPress={(value) => console.log(`Call onPress with value: ${value}`)}
                onPress={value => {
                  this.setState({ Pengajuan: value })

                }}

              />
            </View>
          </View>

          <ScrollView>
            {this.state.Pengajuan === '' || this.state.Pengajuan === 'Anak' ?
              <View>
                <FlatList
                  refreshControl={
                    <RefreshControl
                      refreshing={this.state.refreshing}
                      onRefresh={() => this.onRefresh()}
                    />
                  }
                  data={anak}
                  renderItem={({ item, index }) => (
                    <View>
                      <TouchableOpacity onPress={() =>
                        // this.setState({ modalpilih: true })
                        this.props.navigation.navigate('DetailPenga', { list: item })
                      }>
                        <View style={style.kotakstat}>

                          <Text style={[style.status, {
                            color: item.status === 'Diterima' ?
                              'green' : item.status === 'Ditolak' ? 'red' : '#D39800'
                          }]}>{item.status}</Text>
                          <Text style={[style.judul, { color: '#bdbdbd' }]}>{item.tujuan}</Text>
                          <Text style={{ textAlign: 'right', color: '#bdbdbd', fontWeight: 'bold' }}>{item.tanggal}</Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  )}></FlatList>
                {/* {listanak} */}
              </View>
              : <View />}
            {this.state.Pengajuan === 'Oprasional' ?
              <View>
                <FlatList
                  refreshControl={
                    <RefreshControl
                      refreshing={this.state.refreshing}
                      onRefresh={() => this.onRefresh()}
                    />
                  }
                  data={Oprasional}
                  renderItem={({ item, index }) => (
                    <View>
                      <TouchableOpacity onPress={() =>
                        // this.setState({ modalpilih: true })
                        this.props.navigation.navigate('DetailOprasional', { list: item })
                      }>
                        <View style={style.kotakstat}>
                          <Text style={[style.status, {
                            color: item.status === 'Diterima' ?
                              'green' : item.status === 'Ditolak' ? 'red' : '#D39800'
                          }]}>{item.status}</Text>
                          <Text style={style.judul}>{item.tujuan}</Text>
                          <Text style={{ textAlign: 'right', color: '#bdbdbd', fontWeight: 'bold' }}>{item.tanggal}</Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  )}></FlatList>
                {/* {this.state.pegajuanlist.lenght === 0 ?
                      <View></View>
                      : { listops }
                    } */}
              </View>
              : <View />}
          </ScrollView >

          {/* <FlatList
                pagingEnabled={true}
                data={this.state.list}
                renderItem={({ item }) => (
                  // style={style.kotakbaru4}
                  <TouchableOpacity onPress={() => this.props.navigation.navigate('DetailPenga')}>
                    <View style={style.kotakstat}>
                      <Text style={[style.status]}>Pending</Text>
                      <Text style={style.judul}>Pengajuan Beasiswa Pendidikan</Text>
                      <View style={{ flexDirection: 'row', marginTop: 10, }}>
                        <Kidsabu></Kidsabu>
                        <Text style={{ marginTop: 6, fontSize: 16, color: '#bdbdbd', fontWeight: 'bold' }}>40 Anak</Text>
                      </View>
                      <Text style={{ textAlign: 'right', color: '#bdbdbd', fontWeight: 'bold' }}>12 Jan 2022</Text>
                    </View>
                  </TouchableOpacity>
                )}>
              </FlatList> */}
          <View style={{ flexDirection: 'row', marginVertical: 10, justifyContent: 'space-around', alignItems: 'center', }}>
            {/* <TouchableOpacity style={style.btnkembali} onPress={() => this.props.navigation.navigate('Home')}>
                  <Text>Kembali</Text>
                </TouchableOpacity> */}
            <TouchableOpacity style={style.btntambah} onPress={() => this.setState({ Pilih: true })}>
              <Text style={{ color: '#fff' }}>+ Tambah Pengajuan</Text>
            </TouchableOpacity>
          </View>

          <Modal animationType={"fade"} transparent={true}
            visible={this.state.Pilih}
            onRequestClose={() => this.setState({ Pilih: false })}>

            <SafeAreaView style={style.containerSafe}>
              <TouchableOpacity activeOpacity={1.0} onPress={() => this.setState({ Pilih: false })} style={style.ModalCont}>
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
                  <TouchableOpacity onPress={() => this.setState({ Pilih: false })} style={{ position: 'absolute', right: 20, top: 20 }}>
                    <Close />
                  </TouchableOpacity>
                  <Text style={style.txtPresensi}>Pilih Pengajuan</Text>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                    <View style={[style.kotakkecil, { backgroundColor: '#00A9B8' }]}>
                      <TouchableOpacity onPress={() => this.props.navigation.navigate('Pengajuan', this.setState({ Pilih: false }))}>
                        {/* <KKada style={{ justifyContent: 'center', alignSelf: 'center' }} /> */}
                        <Text style={{ color: '#fff', textAlign: 'center', padding: 5, fontWeight: 'bold' }}>Ajukan Pengajuan Anak</Text>
                      </TouchableOpacity>
                    </View>

                    <View style={[style.kotakkecil, { backgroundColor: '#00A9B8', }]}>
                      <TouchableOpacity onPress={() => this.props.navigation.navigate('Oprasional', this.setState({ Pilih: false }))}>
                        {/* <KKada style={{ justifyContent: 'center', alignSelf: 'center' }} /> */}
                        <Text style={{ color: '#fff', textAlign: 'center', padding: 5, fontWeight: 'bold' }}>Ajukan Biaya Operasional</Text>
                      </TouchableOpacity>
                    </View>
                  </View>

                  <View style={{ marginTop: '5%', alignItems: 'center', flexDirection: 'row', alignContent: 'center', }}>
                    <TouchableOpacity onPress={() => this.setState({ Pilih: false }) + ToastAndroid.show('Batal', ToastAndroid.SHORT)}>
                      <View style={{ height: 50, borderColor: '#00A9B8', borderWidth: 1, width: 100, justifyContent: 'center', alignItems: 'center', alignSelf: 'center', borderRadius: 5 }}>
                        <Text style={{ color: '#00A9B8', fontFamily: 'Poppins-Medium', fontSize: 14 }}>Batal</Text>
                      </View>
                    </TouchableOpacity>

                  </View>
                </View>
              </TouchableOpacity>
            </SafeAreaView>
          </Modal>

          <Modal animationType={"fade"} transparent={true}
            visible={this.state.modalpilih}
            onRequestClose={() => this.setState({ modalpilih: false })}>

            <View style={{
              backgroundColor: '#fff',
              paddingTop: 5,
              marginHorizontal: 5,
              marginTop: '50%',
              borderRadius: 20,
              height: '35%',
              width: '90%',
              borderWidth: 1,
              alignItems: 'center',
              flexDirection: 'column',
              justifyContent: 'center',
              alignSelf: 'center'
            }}>
              <SafeAreaView style={{ alignItems: 'center' }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>


                  <View style={{ marginTop: '2%', alignItems: 'center', flexDirection: 'row', alignContent: 'center', }}>
                    <TouchableOpacity onPress={() => this.setState({ modalpilih: false }) + ToastAndroid.show('Batal', ToastAndroid.SHORT)}>
                      <View style={{ height: 50, borderColor: '#00A9B8', borderWidth: 1, width: 100, justifyContent: 'center', alignItems: 'center', alignSelf: 'center', borderRadius: 5 }}>
                        <Text style={{ color: '#00A9B8', fontFamily: 'Poppins-Medium', fontSize: 14 }}>Kembali</Text>
                      </View>
                    </TouchableOpacity>

                  </View>
                </View>
              </SafeAreaView>
            </View >

          </Modal >
        </View>

      </View>
    )
  }
}

const style = StyleSheet.create({
  contentContainer: {
    backgroundColor: '#fff',
    width: '100%',
    height: '100%',
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
  label: {
    marginTop: 20,
    marginLeft: 10,
  },
  label3: {
    marginTop: 20,
    marginLeft: 30,
  },
  label2: {
    marginLeft: -40,
  },
  kotakbaru1: {
    width: '95%',
    height: 200,
    borderRadius: 15,
    marginTop: 5,
    marginLeft: 10,
    borderWidth: 1,
    borderColor: '#E9E9E9',
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  kotakstat: {
    backgroundColor: '#fff',
    height: 140,
    marginVertical: 8,
    marginLeft: 20,
    width: '90%',
    borderRadius: 10,
    paddingHorizontal: '4%',
    shadowColor: '#858585',
    overflow: 'hidden',
    shadowRadius: 15,
    elevation: 6,
    shadowOpacity: '25%',
  },
  status: {
    marginTop: 10,
    // color: '#D39800',
    // backgroundColor: '#bdbdbd',
    width: 60,
    height: 30,
    fontWeight: 'bold',
    padding: 3,
    textAlign: 'center',
    borderRadius: 5,
  },
  judul: {
    marginTop: 10,
    fontWeight: 'bold',
    fontSize: 16,
    width: '90%',
    // color: '#000',
  },
  btnkembali: {
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    width: '40%',
    height: 50,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#00A9B8',
  },
  btntambah: {
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    width: '40%',
    height: 50,
    borderWidth: 1,
    borderRadius: 10,
    color: '#fff',
    borderColor: '#00A9B8',
    backgroundColor: '#00A9B8',
  },
  txtPresensi: {
    justifyContent: 'center', alignItems: 'center',
    fontSize: 18,
    marginTop: 20,
    fontWeight: 'bold',
    color: '#7e7e7e'
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
})
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
export default connect(mapStateToProps, mapDispatchToProps)(ListPengajuan);