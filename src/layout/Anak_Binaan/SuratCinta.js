import {
    Text,
    View,
    StyleSheet,
    TextInput,
    Image,
    ScrollView,
    SafeAreaView,
    TouchableOpacity,
    ToastAndroid,
    ImageBackground,
    Modal,
    Dimensions,
    Alert
  } from 'react-native';
  import React, {Component} from 'react';
  import {Picker} from '@react-native-picker/picker';
  import CheckBox from '@react-native-community/checkbox';
  import * as ImagePicker from 'react-native-image-picker';
  import RadioForm, {
    RadioButton,
    RadioButtonInput,
    RadioButtonLabel,
  } from 'react-native-simple-radio-button';
  import {connect} from 'react-redux';
  import {rapot, Calendar, juara, addfoto2, addfoto, addvid} from '../../assets/images';
  import { Arrowleft, Tagextra} from '../../assets/icons';
  import { TouchableWithoutFeedback } from 'react-native-gesture-handler';  
  class SuratCinta extends Component {
    constructor(props) {
      super(props);
      this.state = {
        gambar: '',
        rapimg: {
          0: {
            image: {
              addfoto2
            },
          },
        },
        count: 1,
        tr: [],
        rap: '',
        img1: null,
        img2: 0,
        text: '',
        text1: '',
        text2: '',
        show: 0,
        pel: '',
        peltinggi: '',
        pelrendah: '',
        Ganjil: false,
        Genap: false,
        modaldetail: false,
        kelas: '',
        resourcePath: {},
      };
    }
  
    takePic(index) {
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
          response => {
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
                },
                //   id: 0,
              };
              console.log('ini gambar = ', source);
              this.setState(
                prevState => {
                  prevState.rapimg[index] = source;
                  //   prevState.tgl_lahir[index] != this.props.route.params.tgl_lahir[index] ? this.setState({tglmbuh : true}) : this.setState({tglmbuh : false});
                  return {
                    rapimg: prevState.rapimg,
                  };
                },
                () => console.log(this.state.rapimg),
              );
              this.setState({
                img1: index,
                img2: index,
              });
              console.log('ini gambar = ', this.state.rapimg);
            }
          },
        );
      }
    }
    takePicGal(index) {
      {
        ImagePicker.launchImageLibrary(
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
          response => {
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
                },
                //   id: 0,
              };
              console.log('ini gambar = ', source);
              this.setState(
                prevState => {
                  prevState.rapimg[index] = source;
                  //   prevState.tgl_lahir[index] != this.props.route.params.tgl_lahir[index] ? this.setState({tglmbuh : true}) : this.setState({tglmbuh : false});
                  return {
                    rapimg: prevState.rapimg,
                  };
                },
                () => console.log(this.state.rapimg),
              );
              this.setState({
                img1: index,
                img2: index,
              });
              console.log('ini gambar = ', this.state.rapimg);
            }
          },
        );
      }
    }
    
  
    render() {
      var rapimg = [];
      var semester = [
        {label: 'Ganjil ', value: 'Ganjil'},
        {label: 'Genap', value: 'Genap'},
      ];
      for (let i = 0; i <= this.state.img2; i++) {
        rapimg.push(
          <Image
            style={{width: 200, height: 200, resizeMode: 'contain'}}
            source={this.state.rapimg[i].image}
          />,
        );
      }
  
      const inputbutton = [];
      for (let i = 0; i < this.state.count; i++) {
        <>
          <View key={i}>
            <Text>{i + 1}.</Text>
            <Picker
              style={style.Textinputcss}
              selectedValue={this.state.rap}
              value={this.state.tr[i]}
              onValueChange={itemValue =>
                this.setState({rap: itemValue, show: 1})
              }>
              <Picker.Item label="Pilih" value="" />
              <Picker.Item label="SD/MI" value="SD/MI" />
              <Picker.Item label="SMP/MTS" value="SMP/MTS" />
              <Picker.Item label="SMA/SMK/MA" value="SMA/SMK/MA" />
            </Picker>
          </View>
        </>;
      }
      return (
        <View contentContainer
        style={style.contentContainer}>
          <View style={{flexDirection: 'row', marginTop: 10,marginHorizontal:10, alignItems: 'center'}}> 
              <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('List_anak')}>
                <Arrowleft/>
              </TouchableWithoutFeedback>
              <View style={{justifyContent: 'center', width: '100%', padding:10}}>  
                <Text style={style.title2}>Surat Cinta</Text>
              </View>
            </View>
        <ScrollView 
          showsVerticalScrollIndicator={true}>
          {this.props.user.presensi === 'karyawan' ? ( //ini tampilan untuk donatur
            <SafeAreaView>
            <>
              <View>
                {inputbutton}
              <View style={{marginHorizontal: 20, marginTop:30,marginBottom:10}}>
                  <TouchableOpacity>
                    <View style={style.kotakabu2}>
                      <Image source={addfoto} style={style.img2}></Image>
                      <View
                        style={{

                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          marginHorizontal: 10
                        }}>
                      <View style={{flexDirection: 'column'}}>
                          <Text style={style.labelbaru3}>Pesan</Text>
                          <Text style={style.labelbaru4}>Keterangan Pesan</Text>
                      </View>
                      <View style={{flexDirection: 'column', marginTop:10}}>
                          <Text style={style.labelbaru5}>23 Jan 2022</Text>
                          <Text style={style.labelbaru5}> 10.45</Text>
                      </View>
                      
                      </View>   
                    </View>
                    </TouchableOpacity>
                    <TouchableOpacity>
                    <View style={style.kotakabu2}>
                      <Image source={addfoto} style={style.img2}></Image>
                      <View
                        style={{

                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          marginHorizontal: 10
                        }}>
                      <View style={{flexDirection: 'column'}}>
                          <Text style={style.labelbaru3}>Pesan</Text>
                          <Text style={style.labelbaru4}>Keterangan Pesan</Text>
                      </View>
                      <View style={{flexDirection: 'column', marginTop:10}}>
                          <Text style={style.labelbaru5}>23 Jan 2022</Text>
                          <Text style={style.labelbaru5}> 10.45</Text>
                      </View>
                      
                      </View>   
                    </View>
                    </TouchableOpacity>
                    <TouchableOpacity>
                    <View style={style.kotakabu2}>
                      <Image source={addvid} style={style.img2}></Image>
                      <View
                        style={{

                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          marginHorizontal: 10
                        }}>
                      <View style={{flexDirection: 'column'}}>
                          <Text style={style.labelbaru3}>Pesan</Text>
                          <Text style={style.labelbaru4}>Keterangan Pesan</Text>
                      </View>
                      <View style={{flexDirection: 'column', marginTop:10}}>
                          <Text style={style.labelbaru5}>23 Jan 2022</Text>
                          <Text style={style.labelbaru5}> 10.45</Text>
                      </View>
                      
                      </View>   
                    </View>
                    </TouchableOpacity>
                  <View style={{height: 60}}/>
                </View>
               <View>

                </View>

              </View>
            </>
          </SafeAreaView>
          ) : (
            <View />
          )}
        </ScrollView>
        <View style={style.BSimpan2}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('DetailTamSuratCinta')}>
                    <View style={style.BSimpan}>
                        <Text style={style.label5}>+ Tambah Surat Cinta</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
        </View>
      );
    }
  }
  
  const windowHeight = Dimensions.get('window').height;
  const windowWidth = Dimensions.get('window').width;
  
  const style = StyleSheet.create({
    header: {
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
      width: windowWidth*0.95,
      height: windowHeight*0.29
    },
    contentContainer: {
      backgroundColor: '#fff',
      width: '100%',
      height: '100%',
      flex:1
    },
    colnilai: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    Label1: {
      flex: 1,
      fontSize: 12,
      padding: 5,
      color: '#000000',
      flexDirection: 'column',
    },
    label5: {
      color: '#fff',
      padding: 10,
      fontFamily: 'Poppins-Medium',
      fontSize: 13, 
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
    },
    BSimpan: {
      backgroundColor: '#00A9B8',
      borderRadius: 10,
      marginHorizontal: 20,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 15,
  
    },
    BSimpan2: {
      height: 70,
      width: 260,
      position: 'absolute',
      justifyContent: 'center',
      alignSelf: 'center',
      top: 620,
     
      borderRadius: 40
    },
    BSimpan3: {
      backgroundColor: 'transparent'
    },
    ModalCont2: {
      flex: 1,
      backgroundColor: '#00000079',
    },
    Textinputcss: {
      color: '#C0C0C0',
      marginTop: 5,
      left: 2,
      marginRight:4,
      borderRadius: 10,
      borderWidth: 1,
      fontSize: 10,
      height: 40,
      backgroundColor: '#fff',
      borderColor: '#C0C0C0',
      fontFamily: 'Poppins-Regular'
    },
    Textinputcss2: {
      color: '#7e7e7e',
      marginHorizontal: 20,
      marginTop: 20,
      borderRadius:30,
      borderWidth: 1,
      fontSize: 12,
      fontFamily: 'Poppins-SemiBold',
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
      elevation: 3
    }, //vildan
    nilai: {
      color: '#C0C0C0',
      fontSize: 10,
      height: 30,
      width: '60%',
      backgroundColor: '#FFF',
      borderColor: '#000',
      borderWidth: 3,
      fontFamily: 'Poppins-Regular',
    },
    Label2: {
      marginTop: 10,
      padding: 5,
      width: '100%',
      color: '#000',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'Poppins-Medium'
    },
    Label3: {
      marginTop: 5,
      marginBottom: -25,
      marginLeft: 25,
      padding: 5,
      width: '100%',
      color: '#000',
      alignItems: 'center',
      justifyContent: 'center',
    },
    Label4: {
      marginTop: 25,
      width: '100%',
      color: '#000',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'Poppins-Medium'
    },
    kotak2: {
      color: '#C0C0C0',
      marginTop: 10,
      marginLeft: 30,
      marginRight: 10,
      borderRadius: 2,
      borderWidth: 0.1,
      fontSize: 12,
      height: 52,
      width: '15%',
      backgroundColor: '#7e7e7',
    },
    kotak3: {
      color: '#C0C0C0',
      marginLeft: 30,
      borderRadius: 10,
      borderWidth: 0.1,
      fontSize: 14,
      height: 52,
      width: '25%',
      textAlign: 'center',
      backgroundColor: '#fff',
      borderColor: '#DDDDDD',
      borderWidth: 1
    },
    kotak4: {
      color: '#C0C0C0',
      marginLeft: 4,
      borderRadius: 10,
      borderWidth: 0.1,
      fontSize: 14,
      height: 52,
      width: '25%',
      textAlign: 'center',
      backgroundColor: '#fff',
      borderColor: '#DDDDDD',
      borderWidth: 1
    },
  //vidan
    button: {
  
      width: 250,
  
      height: 60,
  
      backgroundColor: '#3740ff',
  
      alignItems: 'center',
  
      justifyContent: 'center',
  
      borderRadius: 4,
  
      marginBottom:12
  
    },
  
    buttonText: {
  
      textAlign: 'center',
  
      fontSize: 15,
  
      color: '#fff'
  
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
      justifyContent: 'center',
      alignItems:'center',
      alignSelf: 'center',
      marginRight: 20,
      fontSize: 15,
      color: '#000',
      fontFamily: 'Poppins-SemiBold'
    },
    item: {
      flex: 1,
      fontSize: 16,
      flexDirection: 'row',
      backgroundColor: '#fff',
      padding: 17,
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
    btnSimpanDark: {
      width: '40%',
      fontWeight: 'bold',
      backgroundColor: '#87cefa',
      borderRadius: 10,
      padding: 10,
      borderWidth: 1,
      borderColor: '#E9E9E9',
      textAlign: 'center',
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
  
    checkbox: {
      flexDirection: 'row',
      alignContent: 'space-between',
      alignItems: 'center',
      marginTop: 10,
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
    btnEye: {
      position: 'absolute',
      padding: 10,
      right: 0,
    },
    Labeltgl: {
      marginTop: 5,
      position: 'absolute',
      top: 0,
      left: 180,
      right: 0,
      bottom: 0,
      height: 25,
      width: 25,
    },
    itemText: {
      textAlign: 'justify',
      marginLeft: 10,
      fontSize: 12,
      width: '35%',
      height: 43,
    },
    kotakbaru: {
      flexDirection: 'column',
      width: '95%',
      height: 110,
      borderRadius: 10,
      borderWidth: 1,
      marginLeft: 10,
      marginTop: 10,
      borderColor: '#E9E9E9',
      alignItems: 'center',
      alignContent: 'center',
      textAlign: 'center',
      backgroundColor: '#fff',
      shadowColor: '#333',
      shadowOffset: {
        width: 1,
        height: 1,
      },
      shadowOpacity: 0.3,
      shadowRadius: 2,
      elevation: 3,
    },
    kotakabu: {
      shadowColor: '#333',
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
    kotakabu2: {
      shadowColor: '#333',
      shadowOffset: {
        width: 1,
        height: 1,
      },
      shadowOpacity: 0.3,
      shadowRadius: 2,
      elevation: 3,
      width: '100%',
      height: 250,
      borderRadius: 15,
      marginTop: 10,
      backgroundColor: 'white',
      paddingHorizontal:10
    }, //Vildan
  
    img: {
      width: '95%',
      height: 150,
      marginLeft: 10,
      marginTop: 10,
      borderRadius: 10,
    },
  
    img2: {
      width: '100%',
      height: 150,
      marginTop: 10,
      borderRadius: 10,
    }, //vildan
  
    labelbaru: {
      fontSize: 16,
      marginTop: 10,
      marginLeft: 10,
    },
    labelbaru1: {
      fontSize: 12,
      marginRight: 5,
      marginTop: 10,
    },
    labelbaru2: {
      fontSize: 12,
      marginLeft: 10,
      marginTop: 10,
    },
    labelbaru3: {
      fontSize: 16,
      marginTop: 10,
      fontWeight: 'bold',
      color: '#000'
    }, //vildan
    labelbaru4: {
      fontSize: 12,
      color: '#000',
      marginTop:10
    }, //vildan
    labelbaru5: {
      fontSize: 12,
      marginLeft: 10,
      color: '#000'
    }, //vildan
  
    refresh: {
      padding: 10,
      marginBottom: 10,
      borderRadius: 5,
      // marginHorizontal: 5,
      bottom: 10,
      position: 'absolute',
      top:600
  
  },//vildan
  });
  const mapStateToProps = state => {
    return {
      user: state,
    };
  };
  
  const mapDispatchToProps = dispatch => {
    return {
      changeUser: data => dispatch({type: 'CHANGE/USER', payload: data}),
    };
  };
  export default connect(mapStateToProps, mapDispatchToProps)(SuratCinta);
 