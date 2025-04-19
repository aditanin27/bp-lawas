import { Text, TouchableOpacity, View, StyleSheet, ImageBackground, Dimensions } from 'react-native'
import React, { Component } from 'react'
import { log, AB, read1, tamak, news1, arrow, x, WA, massage, report, Group, Banner, Calendar, kegiatan, Bgbg1, tutor, Tutor2, pel, pulangmerah, home1, akun, logout, anak, berita } from '../../assets/images'

export class index extends Component {
  render() {
    return (
      <View style={{ backgroundColor: '#fff',height:'100%' }}>
        <View style={{ backgroundColor: '#00A9B8', height: 140, borderBottomLeftRadius: 28, borderBottomRightRadius: 28  }}>
          <Text style={style.title1}>Tambah Anak Binaan</Text>
        </View>
        <View style={{ flexDirection: 'column', marginBottom: 20, }}>
          <View style={{
            flexDirection: 'row',
            width: '90%',
            height: 100,
            borderRadius: 10,
            borderWidth: 1,
            marginLeft: 20,
            marginTop: 10,
            borderColor: '#E9E9E9',
            justifyContent: 'center', alignItems: 'center',
            alignContent: 'center',
            textAlign: 'center',
            backgroundColor: '#fff',
          }}>
            <View style={{ flexDirection: 'column' }}>
              <Text style={{ textAlign: 'center', marginBottom: 10, color: '#000' }}>
              Pengajuan Calon Anak Binaan Baru
              </Text>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('DetailTamAnakBinaan')}>
                <Text style={style.btnSimpanUn}>Tambah Anak binaan</Text>
              </TouchableOpacity>
            </View>

          </View>

          <View style={{
            flexDirection: 'row',
            width: '90%',
            height: 120,
            borderRadius: 10,
            borderWidth: 1,
            marginLeft: 20,
            marginTop: 10,
            marginBottom: 50,
            borderColor: '#E9E9E9',
            justifyContent: 'center', alignItems: 'center',
            alignContent: 'center',
            textAlign: 'center',
            backgroundColor: '#fff',
            color: '#000'
          }}>
            <View style={{ flexDirection: 'column' }}>
              <Text style={{ textAlign: 'center', margin: 10,color: '#000' }}>
                Sudah memiliki keluarga {"\n"}yang terdaftar
              </Text>

              <TouchableOpacity onPress={() => this.props.navigation.navigate('carikk')}>
                <Text style={{
                  width: '90%',
                  fontWeight: 'bold',
                  backgroundColor: '#87CEEB',
                  borderRadius: 10,
                  padding: 10,
                  justifyContent: 'center', alignItems: 'center',
                  alignContent: 'center',
                  textAlign: 'center',
                  fontWeight: 'bold',
                  marginLeft: 20,
                  color:'#fff'
                }}> Tambah Anak Asuh</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>

    )
  }
}

export default index
const style = StyleSheet.create({
  presensi: {
    flexDirection: 'column',
    borderRadius: 1,
    backgroundColor: '#fff',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.43,
    shadowRadius: 0.51,
    elevation: 5,
    bottom: 0,
    left: 0, right: 0,
    height: 75,
  },
  presensi1: {
    flexDirection: 'column',
    borderRadius: 1,
    width: '90%',
    backgroundColor: '#fff',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.43,
    shadowRadius: 9.51,
    elevation: 15,
    bottom: 0,
    left: 0, right: 0,
    height: 70,
    marginTop: 20,
    marginLeft: 20,
    borderRadius: 10,
  },
  example: {
    marginVertical: 10,
    flexDirection: 'row',
    marginLeft: 10,
    justifyContent: 'space-between',
  },
  example1: {
    flexDirection: 'row',
    marginLeft: 10,
    justifyContent: 'space-between',
  },
  logo4: {
    width: 75,
    height: 75,
    marginLeft: 10,
  },
  logo5: {
    width: 25,
    height: 25,
    marginLeft: 10,
  },
  logo3: {
    marginTop: 0,
    marginBottom: 10,
    marginLeft: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: 70,
    height: 70,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: "#333",
    shadowOffset: {
      width: 1,
      height: 1,
    },
    backgroundColor: '#f2f2f2'
  },
  logo: {
    marginTop: 20,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
  },
  banner: {
    marginLeft: 30,
    width: 100,
    height: 120,

  },

  cardtop: {
    width: '90%',
    marginLeft: 20,
    marginTop: -60,
    borderRadius: 50,
    shadowColor: "#333",
    shadowOffset: {
      width: 1,
      height: 1,
    },
  },
  nama: {
    height: 50,
    width: '100%',
    flexDirection: 'row',
    borderRadius: 1,
    backgroundColor: '#0EBEDF',
  },

  foto: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: 7,
    alignItems: 'center',
    justifyContent: 'center',
    width: 30,
    height: 30,
    borderRadius: 50,
  },
  icons: {
    marginTop: 10,
    marginBottom: 10,
    paddingRight: 30,

  },
  icons2: {
    marginTop: 10,
    marginBottom: 10,
    paddingLeft: 30,

  },
  icons3: {
    marginTop: 10,
    marginBottom: 10,
    paddingLeft: 30,
  },

  grouptop: {
    marginTop: -10,
    marginLeft: 5,
    border: 1,

  },
  texttop: {
    fontSize: 12,
    color: '#000',
    marginTop: 0,

  },
  texttop1: {
    fontSize: 12,
    color: '#fff',
    marginTop: 15,
  },

  texttop2: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    width: '100%',
    marginTop: -5,
    flexDirection: 'row',

  },
  texttop3: {
    fontSize: 12,
    color: '#353739',
    paddingLeft: 30,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  texttop4: {
    fontSize: 12,
    color: '#000',
    paddingLeft: 30,
    marginBottom: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  texttop5: {
    fontSize: 16,
    color: '#353739',
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  boxtop: {
    flex: 1,
    borderRadius: 10,
    width: '80%',
    padding: 20,
    color: '#51C9C2',
    padding: 5,
    marginRight: 20,
    marginLeft: 20,
  },
  button: {
    marginTop: 10,
    alignItems: 'center',
    backgroundColor: "#DDDDDD",
    padding: 10,
    width: '30%',
    justifyContent: 'center'
  },
  countContainer: {
    color: '#000000',
    alignItems: "center",
    padding: 5,
    justifyContent: 'center'
  },
  input: {
    color: '#000000',
    height: 100,
    borderRadius: 5,
  },
  Textinputcss: {
    borderRadius: 5,
    borderWidth: 1,
    marginLeft: 10,
    marginRight: 10,
    height: 100,
    color: '#000000',
    borderColor: '#000000'
  },
  kotak1: {
    marginLeft: 30,
    marginTop: 10,
    marginRight: 10,
    borderRadius: 5,
    borderWidth: 1,
    height: 100,
    width: 300,
    padding: 20,
    color: '#000000',
  },
  kotak2: {
    color: '#000000',
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 5,
    borderWidth: 1,
    fontSize: 12,
    height: 52,
    width: 300,
    padding: 20,
    borderColor: '#000000',
  },
  Label: {
    padding: 5,
    color: '#000000',
    marginTop: -10,
    fontSize: 7,
  },
  Label1: {
    padding: 5,
    color: '#000000',
    fontSize: 7,
  },
  contentContainer: {
    backgroundColor: '#fff',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
  },
  tmblogout: {
    backgroundColor: '#0EBEDF',
    borderRadius: 10,
    fontSize: 12,
    width: 90,
    height: 30,
    paddingLeft: 25,
    marginHorizontal: 20,
    marginTop: 10,
  },
  tmbl: {
    backgroundColor: '#0EBEDF',
    borderRadius: 10,
    fontSize: 12,
    width: 90,
    height: 40,
    paddingLeft: 25,
    marginHorizontal: 20,
    marginTop: 10,
  },

  cardtop2: {
    width: '80%',
    height: '50%',
    height: 150,
    alignItems: 'center',
    marginLeft: 60,
  },
  texttime: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textdate: {
    fontSize: 14,
    color: '#fff',
    justifyContent: 'center',
    alignItems: 'center',


  },
  kotak3: {
    shadowColor: "#333",
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ModalCont2: {
    flex: 1,
    // alignItems: 'center',
    backgroundColor: '#00000079',
  },

  groupdatetime: {
    marginTop: 30,
    justifyContent: 'center',
    alignContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginLeft: -50,
  },
  form: {
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },
  ModalCont: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#00000099',
    paddingHorizontal: 10,
  },
  wrap: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height * 0.25 // 25% window
  },
  itemflat: {
    fontSize: 16,
    flexDirection: 'column',
    marginVertical: 8,
    borderColor: '#7e7e7e',
  },

  itemflat1: {
    fontSize: 16,
    flexDirection: 'column',
    backgroundColor: '#fff',
    marginVertical: 8,
    shadowColor: "#333",
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    borderColor: '#7e7e7e',
    elevation: 1,
  },
  btnSimpanUn: {
    width: '100%',
    fontWeight: 'bold',
    backgroundColor: '#87CEEB',
    borderRadius: 10,
    padding: 10,
    justifyContent: 'center', alignItems: 'center',
    alignContent: 'center',
    textAlign: 'center',
    fontWeight: 'bold',
    color:'#fff'
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
    marginLeft: 20,
    fontWeight: 'bold',
  },
  btnSimpanUn2: {
    flexDirection: 'row',
    width: '80%',
    height: 100,
    borderRadius: 10,
    borderWidth: 1,
    marginLeft: 50,
    marginTop: 10,
    borderColor: '#E9E9E9',
    justifyContent: 'center', alignItems: 'center',
    alignContent: 'center',
    textAlign: 'center',
    backgroundColor: '#FFD700',
  },
  innerProgressCompleted: {
    height: 10,
    backgroundColor: '#0EBEDF',
  },
  innerProgressRemaining: {
    height: 10,
    backgroundColor: '#f2f2f2',
  },
  controls: {
    backgroundColor: 'transparent',
    borderRadius: 5,
    position: 'absolute',
    bottom: -5,
    left: 10,
    right: 10,
  },
  generalControls: {
    flex: 1,
    flexDirection: 'row',
    borderRadius: 4,
    overflow: 'hidden',
    paddingBottom: 10,
  },
  trackingControls: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  progress: {
    flex: 1,
    flexDirection: 'row',
    borderRadius: 3,
    overflow: 'hidden',
  },
  wrap: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height * 0.25 // 25% window
  },
  detail: {
    justifyContent: 'center',
    textAlign: 'center',
    margin: 20,
  },
  home: {
    justifyContent: 'center',
    textAlign: 'center',
    flexDirection: 'row',
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
})