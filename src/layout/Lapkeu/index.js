import {
  RefreshControl, Modal, Video, ToastAndroid, Alert, ScrollView,
  Text, View, StyleSheet, TextInput, TouchableOpacity, Image, FlatList,
  BackHandler, Dimensions,
} from 'react-native'
import React, { Component } from 'react'
import { Collapse, CollapseHeader, CollapseBody, AccordionList } from 'accordion-collapse-react-native';
import { arrow, akun } from '../../assets/images'

export class Lapkeu extends Component {
  constructor(props) {
    super(props)
    this.state = {
      refreshing: true,
      det: [],
      detak: [],


    }
  }
  componentDidMount() {
    this.GetDetAPi(),
      // BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
      // Firebase.initializeApp(this);
      // this.requestCameraPermission();
      console.log(this.props);
  }
  GetDetAPi() {
    fetch('https://kilauindonesia.org/datakilau/api/testo').then(res => {
      if (res.status === 200)
        return res.json()
    }).then(resdata => {
      console.log(resdata.data)
      this.setState({
        det: resdata.data,
        filter: resdata.DATA,
        refreshing: false,

      })
    })
  }

  onRefresh() {
    this.GetAnakAPi();
    this.setState({ refreshing: false });
  }
  render() {
    const { detak } = this.state
    return (
      <ScrollView contentContainerStyle={style.contentContainer} showsVerticalScrollIndicator={false}>
        <View>

          <View style={{ backgroundColor: '#00A9B8', width: '100%', height: 140, borderBottomLeftRadius: 28, borderBottomRightRadius: 28 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{
                fontSize: 16,
                fontWeight: 'bold',
                color: '#ffffff',
                marginLeft: 10,
                marginTop: 10,
              }}
              >Laporan Keuangan</Text>
              {/* <Image source={bell} style={{ marginTop: 20, left: 200 }}></Image> */}
              {/* <View style={{ marginRight: 30, marginTop: 10 }}>
                <Text style={{ color: '#fff' }}>Anak Yang {"\n"}Diasuh</Text>
                <View style={{ flexDirection: 'row' }}>
                  <Image source={akun}></Image>
                  <Text style={style.angka}>1</Text>
                </View>
              </View> */}
            </View>
            <Text style={{
              fontSize: 12,
              color: '#ffffff',
              marginLeft: 20,
              marginTop: 20,
            }}>Total Pendanaan yang {'\n'}Dilakukan:</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{
                fontSize: 16,
                color: '#ffffff',
                marginLeft: 30,
                marginTop: 10,
                fontWeight: 'bold'
              }}>Rp.10.000.000</Text>
              {/* <View style={{ marginRight: 50 }}>
                <Text style={style.Labelbaru2}>Zakat:2</Text>
                <Text style={style.Labelbaru2}>Infak:3</Text>
              </View> */}
            </View>
          </View>
         
          <View style={style.kotakbaru}>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Detanak')}>
              <View style={{ flexDirection: 'row' }}>
                <Text style={style.Labelbaru}>Pendanaan Anak {'\n'}Asuh</Text>
                <Text style={[style.Labelbaru, { marginLeft: 70, marginTop: 10 }]}>Rp.5.000.000</Text>
              </View>
              {/* <View style={{ flexDirection: 'row', margin: 10, }}>
                <Text style={style.Labelbaru1}>22 Januari 2022</Text>
                <Text style={style.Labelbaru1}>12.45</Text>
              </View> */}
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={() => this.props.navigation.navigate('Detdona')}>
            <View style={style.kotakbaru1}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                <Text style={[style.Labelbaru, { marginLeft: -40, marginTop: 10 }]}>Donasi</Text>
                <Text style={[style.Labelbaru, { marginRight: -40, marginTop: 10 }]}>Rp.2.500.000</Text>
              </View>
              {/* <View style={{ flexDirection: 'row', margin: 10, }}>
                <Text style={style.Labelbaru1}>22 Januari 2022</Text>
                <Text style={style.Labelbaru1}>12.45</Text>
              </View> */}
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => this.props.navigation.navigate('Detinfak')}>
            <View style={style.kotakbaru1}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                <Text style={[style.Labelbaru, { marginLeft: -40, marginTop: 10 }]}>Infak</Text>
                <Text style={[style.Labelbaru, { marginRight: -40, marginTop: 10 }]}>Rp.2.500.000</Text>
              </View>
              {/* <View style={{ flexDirection: 'row', margin: 10, }}>
                <Text style={style.Labelbaru1}>22 Januari 2022</Text>
                <Text style={style.Labelbaru1}>12.45</Text>
              </View> */}
            </View>
          </TouchableOpacity>


        </View>
      </ScrollView>
    )
  }
}

export default Lapkeu
const style = StyleSheet.create({
  contentContainer: {
    flex: 1,
    backgroundColor: '#fff',
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
  itemflat: {
    flex: 1,
    fontSize: 12,
    flexDirection: 'row',
    marginLeft: 20,
    padding: 10,
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
  Label1: {
    marginTop: 15,
    marginLeft: 15,
    textAlign: 'center',
    color: '#000000',
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
  kotakbaru: {
    shadowColor: "#333",
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 3,
    width: '90%',
    height: 90,
    borderRadius: 10,
    borderWidth: 1,
    marginLeft: 20,
    marginTop: 10,
    borderColor: '#E9E9E9',
    justifyContent: 'center',
    textAlign: 'center',
    backgroundColor: '#fff',
    justifyContent: 'space-around'
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
    width: '90%',
    height: 90,
    borderRadius: 10,
    borderWidth: 1,
    marginLeft: 20,
    marginTop: 10,
    borderColor: '#E9E9E9',
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    alignContent: 'space-between',
    textAlign: 'center',
  },
  Labelbaru: {
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: -5,
    marginLeft: 20,
  },
  Labelbaru1: {
    marginLeft: 10,
  },
  angka: {
    fontSize: 22,
    color: '#fffE'
  },
  Labelbaru2: {
    color: '#fffE',
    fontSize: 14,
  }
})

{/* <FlatList
refreshControl={
  <RefreshControl
    refreshing={this.state.refreshing}
    onRefresh={() => this.onRefresh()}
  />
}
data={this.state.det}
renderItem={({ item }) => (
  
)}>
</FlatList> */}

// {/* <View >
//     <TouchableOpacity style={style.itemflat} onPress={() => { this.props.navigation.navigate('Detkeu'),this.setState({ detak: item}) }}>
//       {/* <View tyle={{ justifyContent: 'row', alignItems: 'center', alignContent: 'center' }} > */}
//       <Image source={{ uri: 'https://www.kilauindonesia.org/datakilau/gambarDonatur/' + item.gambar_donatur }} style={{ justifyContent: 'center', alignItems: 'center', alignContent: 'center', height: 90, width: 90, borderRadius: 45, }} />
//       <View style={style.Label1}>
//         <Text>{item.nama} </Text>
//         <Text>{item.email}</Text>
//         {/* <Text>Mata Pelajaran</Text>
//           <Text>Tingkat</Text> */}
//         {/* <Text>{item.alamat}</Text> */}
//       </View>
//       {/* </View> */}
//     </TouchableOpacity>
//   </View> */}