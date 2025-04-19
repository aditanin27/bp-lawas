import { RefreshControl, Alert, Modal, TouchableOpacity, ScrollView, FlatList, SafeAreaView, Image, Text, View, TextInput, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Collapse, CollapseHeader, CollapseBody, AccordionList } from 'accordion-collapse-react-native';
import { arrow } from '../../assets/images'
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'react-native-image-picker';
import CheckBox from '@react-native-community/checkbox';

export class Anak_Binaan extends Component {
  constructor(props) {
    super(props)
    this.state = {
      gambar: '',
      img: {
        0: {
          image: {
            name: '',
            type: '',
            uri: 'https://static.thenounproject.com/png/187803-200.png'
          },
        }
      },
      imgp: {
        0: {
          image: {
            name: '',
            type: '',
            uri: 'https://static.thenounproject.com/png/187803-200.png'
          },
        }
      },
      img1: null,
      img2: 0,
      img3: null,
      img4: 0,
      count: 1,
      Camera: '',
      nama: '',
      anak: [],
      search: [],
      detak: [],
      modaldetail: 'false',
      collapse: 'false',
      index: -1,
      modalTamAK: false,
      modalTamPel: false,
      pel: '',
      myd: '',
      materi: [],
      check: false,
      reguler: false,
      quran: false,
      refreshing: true,
      berita: [],
    }
  }
  takePicAK(index) {
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
              prevState.img[index] = source
              //   prevState.tgl_lahir[index] != this.props.route.params.tgl_lahir[index] ? this.setState({tglmbuh : true}) : this.setState({tglmbuh : false});
              return {
                img: prevState.img
              }
            }, () => console.log(this.state.img));
            this.setState({
              img1: index,
              img2: index,
            });
            console.log('ini gambar = ', this.state.img);
          }
        },
      );
    }
  }
  takePicPel(index) {
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
              prevState.imgp[index
              ] = source
              //   prevState.tgl_lahir[index] != this.props.route.params.tgl_lahir[index] ? this.setState({tglmbuh : true}) : this.setState({tglmbuh : false});
              return {
                imgp: prevState.imgp
              }
            }, () => console.log(this.state.img));
            this.setState({
              img3: index,
              img4: index,
            });
            console.log('ini gambar = ', this.state.img);
          }
        },
      );
    }
  }
  getmateriAPi() {
    fetch('https://berbagipendidikan.org/sim/api/materi/getmateri').then(res => {
      if (res.status === 200)
        return res.json()
    }).then(resdata => {
      console.log(resdata.DATA)
      this.setState({
        materi: resdata.DATA,
        refreshing: false,
      })
    })
  }

  GetAnakAPi() {
    fetch('https://kilauindonesia.org/datakilau/api/testo').then(res => {
      if (res.status === 200)
        return res.json()
    }).then(resdata => {
      console.log(resdata.data)
      this.setState({
        anak: resdata.data

      })
    })
  }
  GetBeritaAPi() {
    fetch('https://kilauindonesia.org/datakilau/api/testo').then(res => {
      if (res.status === 200)
        return res.json()
    }).then(resdata => {
      console.log(resdata.data)
      this.setState({
        berita: resdata.data,
        filter: resdata.DATA,
        refreshing: false,

      })
    })
  }
  componentDidMount() {
    this.GetAnakAPi();
    this.getmateriAPi();
    this.GetBeritaAPi();
    // BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    // Firebase.initializeApp(this);
    // this.requestCameraPermission();
    console.log(this.props);
  }
  componentWillUnmount() {
    this.mounted = false;
    // BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }
  filterList(textToSearch) {
    this.setState({
      anak: this.state.anak.filter(i => i.nama.toLowerCase().includes(textToSearch)),
    });
  }
  _onLongPressButton() {
    alert('You long-pressed the button!')
  }
  // delete = (index) => {
  //   anak.splice(index, 1);
  //   this.setState({});
  // }
  displayModal(show) {
    this.setState({ modaldetail: show })
  }
  togleTamAK(show) {
    this.setState({ modalTamAK: show });
  }
  togleTamPel(show) {
    this.setState({ modalTamPel: show });
  }
  detail = () => {

  }
  onRefresh() {
    this.GetBerita();
    this.setState({ refreshing: false });
  }

  render() {
    const { detak } = this.state
    var img = [];
    for (let i = 0; i <= this.state.img2; i++) {
      img.push(
        <Image
          style={{ width: 200, height: 200, resizeMode: 'contain' }}
          source={this.state.img[i].image}
        />
      )
    }
    var imgpel = [];
    for (let i = 0; i <= this.state.img4; i++) {
      imgpel.push(
        <Image
          style={{ width: 200, height: 200, resizeMode: 'contain' }}
          source={this.state.imgp[i].image}
        />
      )
    }
    return (
      <ScrollView contentContainer style={style.contentContainer} showsVerticalScrollIndicator={true}>
        {this.props.user.presensi === 'karyawan' ?
          <SafeAreaView >
            <View style={{ backgroundColor: '#0EBEDF' }}>
              <Text style={style.title1}>List Anak Binaan </Text>
            </View>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('List_anak')} >
              <Text style={style.item}>Kelas 1-3 / Kelompok 1</Text>
            </TouchableOpacity>
          </SafeAreaView>
          :
          <View />
        }
        
      </ScrollView>
    )
  }
}
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
  containerfoto: {
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
  btnSimpanDark: {
    width: '40%',
    fontWeight: 'bold',
    backgroundColor: '#87cefa',
    borderRadius: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#E9E9E9',
    justifyContent: 'center', alignItems: 'center'
  },
  btnSimpanUn: {
    width: '40%',
    fontWeight: 'bold',
    backgroundColor: '#C6C6C6',
    borderRadius: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#E9E9E9',
    justifyContent: 'center', alignItems: 'center',
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
    justifyContent: 'center', alignItems: 'center',
    alignContent: 'center',
    textAlign: 'center',
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
    width: '100%',
    marginTop: 20,
    fontSize: 16,
    flexDirection: 'row',
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
  coltom1: {
    width: '100%',
    marginTop: 20,
    fontSize: 16,
    flexDirection: 'row',
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
  coltom2: {
    width: '100%',
    fontSize: 16,
    flexDirection: 'row',
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
  item2: {
    padding: 10,
    height: 120, width: '30%',
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
    marginLeft: 30,
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
    padding: 10,
    borderRadius: 2.5,
    borderWidth: 0.1,

  },
  Label1: {
    flex: 1,
    fontSize: 12,
    padding: 5,
    marginTop:15,
    marginLeft:10,
    color: '#000000',
    flexDirection: 'column',
  },
  Label2: {
    marginTop: 5,
    marginLeft: 25,
    padding: 5,
    color: '#000',
    alignItems: 'center',
    justifyContent: 'center'
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
  searchBar: {
    fontSize: 16,
    marginLeft: 50,
    width: '70%',
    height: 50,
    shadowColor: "#333",
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 3,
    backgroundColor: '#fff',
    borderRadius: 2,
    borderWidth: 0.1,
    justifyContent: 'center',
    textAlign: 'center',
  },
  itemText: {
    textAlign: 'center',
    color: 'black',
    fontSize: 16,
    width: '100%',
    height: 50
  },
  item: {
    flex: 1,
    fontSize: 16,
    flexDirection: 'row',
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
  refresh: {
    padding: 10,
    position: 'absolute',
    bottom: 95,
    right: 15,
    flexDirection: 'row',
    borderRadius: 5,
    // marginHorizontal: 5,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center'
  },
  checkbox: {
    flexDirection: 'row',
    alignContent: 'space-between',
    alignItems: 'center',
    margin: 20,
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
export default connect(mapStateToProps, mapDispatchToProps)(Anak_Binaan);

