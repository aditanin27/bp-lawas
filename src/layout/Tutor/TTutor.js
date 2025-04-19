import {
  ScrollView, Text, View, StyleSheet, Dimensions,
  TextInput, ToastAndroid, TouchableOpacity, Button, Modal
} from 'react-native'
import React, { Component } from 'react'
import { Picker } from '@react-native-picker/picker';
import DocumentPicker from "react-native-document-picker"
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
export class TTutor extends Component {

  constructor(props) {
    super(props)
    this.state = {
      file: {
        name: '',
        type: '',
        uri: '',
        size: '',
      },
      text: '',
      pen: '',
      nama: '',
      kelamin: '',
      kantor: [],
      cabang: '',
      wilayah: [],
      binaan: '',
      status: [],
      so: '',
      shelter: [],
      tempat: '',
      email: '',
      hp: '',
      mapel: '',
      alamat: '',
      foto: '',
      modalVisible: false
    }
  }
  async docPicker() {
    // Pick a single file
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      const source = {
        uri: res[0].uri,
        type: res[0].type,
        name: res[0].name,
        size: res[0].size,
      };
      this.setState({
        file: source,
      });
      console.log('ini file', this.state.file);//here you can call your API and send the data to that API
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log("error -----", err);
      } else {
        throw err;
      }
    }
  }
  render() {
    return (
      <ScrollView style={{ flex: 1, backgroundColor: '#fff' }}>
        <View View style={styles.Textatas}>
          <Text style={styles.judul}>Tambah Tutor</Text>


          <View><Text style={styles.com}>Informasi Pribadi</Text></View>

          <View style={styles.intake}>
            <TextInput
              style={styles.input}
              placeholder='Nama Lengkap'
              autoCapitalize="none"
              placeholderTextColor='Black'
              onChangeText={val => this.onChangeText('Nama Lengkap', val)}
            />
            <TextInput
              style={styles.input}
              placeholder='Jenis Kelamin'
              autoCapitalize="none"
              placeholderTextColor='Black'
              onChangeText={val => this.onChangeText('Nama Lengkap', val)}
            />
            <TextInput
              style={styles.input}
              placeholder='Email'
              autoCapitalize="none"
              placeholderTextColor='Black'
              onChangeText={val => this.onChangeText('email', val)}
            />
            <TextInput
              style={styles.input}
              placeholder='No HP'
              autoCapitalize="none"
              placeholderTextColor='Black'
              onChangeText={val => this.onChangeText('Nomor telepon', val)}
            />
            <TextInput
              style={styles.input}
              placeholder='Pendidikan'
              autoCapitalize="none"
              placeholderTextColor='Black'
              onChangeText={val => this.onChangeText('Nomor telepon', val)}
            />
          </View>

          <TextInput
            style={styles.formalamat}
            placeholder='Alamat'
            autoCapitalize="none"
            textAlign="left"
            placeholderTextColor='Black'
            onChangeText={val => this.onChangeText('Alamat', val)}
          />
          <View><Text style={styles.com}>Informasi Penugasan</Text></View>



          <View style={styles.contPicker}>
            <Picker style={styles.Picker}
              selectedValue={this.state.keg}
              onValueChange={(itemValue) => this.setState({ keg: itemValue, show: 1 })}>
              <Picker.Item label="Mata Pelajaran" />
              <Picker.Item label="Pendidikan Agama" value="Pendidikan Agama" />
              <Picker.Item label="Bahasa Indonesia" value="Bahasa Indonesia" />
              <Picker.Item label="Matematika" value="Matematika" />
              <Picker.Item label="IPA" value="IPA" />
              <Picker.Item label="IPS" value="IPS" />
              <Picker.Item label="Bahasa Inggris" value="Bahasa Inggris" />
            </Picker>
          </View>





          {/* style={{position: 'absolute', justifyContent : 'center', alignItems : 'center'}}      */}

          <View><Text style={styles.com}>Foto Tutor</Text></View>
          <View style={styles.body} >
            <View >
              <View style={styles.btn} >
                <Button onPress={() =>
                  ImagePicker.launchImageLibrary(
                    {
                      mediaType: 'photo',
                      includeBase64: false,
                      maxHeight: 200,
                      maxWidth: 200,
                    },
                    (response) => {
                      console.log(response);
                      this.setState({ resourcePath: response });
                    },
                  )
                }
                  title="Tamabah Foto +" />
              </View>
            </View>

          </View>

        </View>

        <View style={styles.Button} >
          <Button
            title='Simpan'
            onPress={() => { this.toggleModal(true) }} />

        </View>
        <View style={styles.container}>
          <Modal animationType={"slide"} transparent={false}
            visible={this.state.modalVisible}
            onRequestClose={() => { console.log("Modal has been closed.") }}>

            <View style={styles.modal}>
              <Text style={{ justifyContent: 'center', alignItems: 'center', alignItems: 'center' }}> Simpan Data ?</Text>

              <TouchableOpacity onPress={() => { this.setState({ modalVisible: false }) }}>

                <Text style={styles.text}>Batal</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => { this.setState({ modalVisible: false }) }}>

                <Text style={styles.text}>SIMPAN</Text>
              </TouchableOpacity>
            </View>
          </Modal>

        </View>

      </ScrollView>
    )
  }
}
const styles = StyleSheet.create({
  images: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    borderWidth: 3,
    shadowRadius: 2,
    alignSelf: 'center'
  },
  btn: {
    flexDirection: 'column',
    padding: '1%', overflow: 'hidden',
    borderRadius: 50,
    elevation: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  body: {
    backgroundColor: '#EEEEEE',
    alignItems: 'center',
    textAlignVertical: 'top',
    marginBottom: 10,
    height: 200,
    justifyContent: 'center',
    borderColor: '#CECBCB',
    marginHorizontal: 20,
    padding: '10%',
    borderRadius: 10,
    borderWidth: 3,
    shadowRadius: 2,
    borderStyle: 'dashed',
    marginHorizontal: '10%',
  },
  input: {
    marginTop: 10,
    color: '#000',
    borderRadius: 10,
    borderWidth: 1,
    fontSize: 13,
    height: 50,
    width: windowWidth - 40,
    padding: 12,
    backgroundColor: '#fff',
    borderColor: '#DDDDDD',
    borderWidth: 1,
    fontFamily: 'Poppins-Regular',
  },
  btnParentSection: {
    alignItems: 'center',
    marginTop: 10,
  },
  contPicker: {
    flexDirection: 'column',
    backgroundColor: '#fffff',
    shadowRadius: 2,
    borderWidth: 1,
    borderRadius: 15,
    marginBottom: 10,
    marginHorizontal: '7%',
    justifyContent: 'center',
    borderColor: '#CECBCB',


  },
  formalamat: {
    width: '90%',
    marginTop: 10,
    borderRadius: 10,
    borderWidth: 1,
    height: 70,
    borderColor: '#DDDDDD',
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignSelf: 'center'
  },

  container: {
    flex: 1,
    alignItems: 'center'
  },
  Textatas: {


  },

  com: {
    fontFamily: 'Poppins-Bold',
    marginHorizontal: 30,
    borderRadius: 10,
    paddingTop: '5%',
    paddingBottom: '3%',
    padding: 5,
    fontWeight: 'bold'
  },

  Picker: {
    flexDirection: 'column',
    color: '#CECBCB',



  },
  judul: {
    paddingLeft: '35%',
    fontSize: 20,
    fontWeight: 'bold',
    padding: 10,

  },
  Button: {
    justifyContent: 'center',
    borderRadius: 50,
    padding: '1%',
    overflow: 'hidden',
    marginTop: '5%',
    marginBottom: '10%',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.80,
    shadowRadius: 4.65,
    elevation: 7,
  },
  intake: {
    justifyContent: 'center',
    alignSelf: 'center'
  },
  intake2: {
    alignSelf: 'center',
    justifyContent: 'center',

  }

})
export default TTutor
