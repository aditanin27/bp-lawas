import {
  RefreshControl, Modal, Video, ToastAndroid, Alert, ScrollView,
  Text, View, StyleSheet, TextInput, TouchableOpacity, Image, FlatList,
  BackHandler, Dimensions, SafeAreaView,
} from 'react-native'
import { Calendar } from '../../assets/images'
import React, { Component } from 'react'

export class Berita extends Component {
  constructor(props) {
    super(props)
    this.state = {
      refreshing: true,
      berita: [],
      items: [],
      gambar_donatur: '',
      nama: '',
      detbe: [],
      modaldetail: 'false',
      active: 0,
      hasScrolled: false,
      page:1,
      perPage:2,
      loadMoreVisible:true,
    }
  }
  
  onScroll = () => {
    this.setState({ hasScrolled: true })
  }
  handleLoadMore = () => {
    if (!this.state.hasScrolled) { return null; }

    //here load data from your backend

  }
  change(nativeEvent) {
    // console.log("nativeEvent:", nativeEvent)
    if (nativeEvent) {
      const slide = Math.ceil(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width);
      if (slide !== this.state.active) {
        this.setState({
          active: slide
        })
      }
    }
  }
  displayModal(show) {
    this.setState({ modaldetail: show })
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
    this.GetBeritaAPi();
    // BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    // Firebase.initializeApp(this);
    // this.requestCameraPermission();
    console.log(this.props);
  }
  onRefresh() {
    this.GetBerita();
    this.setState({ refreshing: false });
  }
  render() {
    const { detbe } = this.state
    const { active } = this.state;
    const images = [
      'https://www.omipharma.vn/files/banner/2020-07/xit-chong-nang-lishan-nhat-ban-spf-50-pa-huong-tinh-dau-thien-nhien.jpg',
      'https://www.omipharma.vn/files/banner/2020-06/omi-pharma-thau-hieu-hon-moi-ngay.jpg',
      'https://www.omipharma.vn/files/banner/2020-06/omi-pharma-thau-hieu-nhu-cau-dan-dau-lua-chon.jpg'
    ]
    return (
      <ScrollView contentContainerStyle={style.contentContainer} showsVerticalScrollIndicator={false}>
        <View>
          <View style={{ backgroundColor: '#0EBEDF' }}>
            <Text style={style.title}>Artikel</Text>
          </View>

          <FlatList
          onScroll={this.onScroll}
            onEndReached={this.handleLoadMore}
            data={this.state.berita}
            renderItem={({ item }) => (
              <View >
                <TouchableOpacity style={style.itemflat} onPress={() => {
                  this.props.navigation.navigate('Detail_Artikel', { des: item.deskripsi })
                }}>
                  <View style={{ flexDirection: 'row' }}>
                    <Image source={{ uri: 'https://www.kilauindonesia.org/datakilau/gambarDonatur/' + item.gambar_donatur }}
                      style={{ height: 100, width: 150, }} />
                    <View style={{ flexDirection: 'column', marginTop: 20 }}>
                      <Text style={{ marginTop: -20, marginLeft: 20, fontWeight: 'bold', }}>{item.nama}</Text>
                      <Text numberOfLines={3} style={style.itemText}> Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry </Text>
                      <View style={{ flexDirection: 'row' }}>
                        <Image style={style.Labeltgl} source={Calendar}></Image>
                        <Text style={style.baca}>Penulis</Text>
                      </View>
                    </View>
                  </View>


                </TouchableOpacity>

              </View>
            )}>
          </FlatList>
          <Modal
            animationType={"slide"}
            transparent={true}
            visible={this.state.modaldetail}
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
                <Text>Detail</Text>
                <SafeAreaView style={{ width: '100%', height: '100%' }}>
                  <View style={style.wrap}>
                    <ScrollView
                      onScroll={({ nativeEvent }) => this.change(nativeEvent)}
                      showsHorizontalScrollIndicator={false}
                      pagingEnabled
                      horizontal
                      style={style.wrap}
                    >
                      {/* {
                          images.map((e, index) =>
                            <Image
                              key={e}
                              resizeMode="stretch"
                              style={style.wrap}
                              source={{ uri: e }}
                            />
                          )
                        } */}
                      <Image source={{ uri: 'https://www.kilauindonesia.org/datakilau/gambarDonatur/' + detbe.gambar_donatur }} style={style.wrap} />
                    </ScrollView>
                    <View style={style.wrapDot}>
                      {
                        images.map((e, index) =>
                          <Text
                            key={e}
                            style={active === index ? style.dotActive : style.dot}>●</Text>)
                      }
                    </View>
                  </View>
                  {/* <View style={style.detailgmbr}>
                      <Image source={{ uri: 'https://www.kilauindonesia.org/datakilau/gambarDonatur/' + detbe.gambar_donatur }} style={{ justifyContent: 'center', alignItems: 'center', height: 150, width: '95%', marginLeft: 10, }} />
                    </View> */}
                  <ScrollView>
                    <View>
                      <Text style={{
                        marginTop: 10,
                        marginBottom: 10,
                        textAlign: 'center',
                        fontSize: 16,
                        fontWeight: 'bold',
                      }}>{detbe.nama} </Text>
                      <Text style={{
                        margin: 15,
                        textAlign: 'justify',

                      }}>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.

                        Why do we use it?
                        It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).


                        Where does it come from?
                        Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.

                        The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.
                      </Text>
                    </View>
                    <View style={{ alignContent: 'center', justifyContent: 'center', alignItems: 'center', marginBottom: 50, flexDirection: 'row' }}>
                      <Text
                        style={style.btnSimpanUn1}
                        onPress={() => {
                          this.setState({ detak: [], modaldetail: false })
                        }}>Kembali</Text>
                    </View>
                  </ScrollView>
                </SafeAreaView>
              </View>
            </View>
          </Modal>
        </View>
      </ScrollView>


    )
  }
}

export default Berita
const style = StyleSheet.create({
  wrap: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height * 0.25 // 25% window
  },
  wrapDot: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    alignSelf: 'center'
  },
  dot: {
    margin: 3,
    color: '#888'
  },
  dotActive: {
    margin: 3,
    color: 'black'
  },
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
    marginVertical: 8,
    marginLeft: 10,
    backgroundColor: '#fff',
    // shadowColor: "#333",
    // shadowOffset: {
    //   width: 1,
    //   height: 1,
    // },
    // shadowOpacity: 0.3,
    // shadowRadius: 2,
    // borderColor: '#7e7e7e',
    // elevation: 3,
  },
  Label: {
    color: '#fff',
    fontSize: 18,
    position: 'absolute',
    top: 55, left: 10, right: 0, bottom: 0,
  },
  Labeltgl: {
    marginTop: 5,
    position: 'absolute',
    top: 0, left: 10, right: 0, bottom: 0,
    height: 25, width: 25,
  },
  ModalCont2: {
    flex: 1,
    backgroundColor: '#00000079',
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
    marginRight: 10,
  },
  itemText: {
    textAlign: 'justify',
    marginLeft: 10,
    fontSize: 12,
    width: '35%',
    height: 43,
  },
  baca: {
    justifyContent: 'flex-end',
    marginLeft: 100,
    marginTop: 5,
    textAlign: 'center',
    height: 25,
    width: 50,
  },
})