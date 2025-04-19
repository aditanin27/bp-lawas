import {
  Modal, Text, View, StyleSheet, Dimensions, Image, ScrollViewBase,
  ScrollView, TouchableOpacity, ImageBackground, TextInput
} from 'react-native'
import React, { Component } from 'react'
import { qurban,ovo} from '../../assets/images'
import { Collapse, CollapseHeader, CollapseBody, AccordionList } from 'accordion-collapse-react-native';
import { search, arrow, qr, read1, BB } from '../../assets/images'

class SapiRetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      modalpembayaran: false,
      pilihpembayaran:false,
      count: 0,
      harga: 0,
      text: '',
      orang: [],

    }
  }
  WA = () => {
    let url =
      'https://api.whatsapp.com/send?text=qurbansapiretail%0a%0a...%0a%0ainformasi%20selengkapnya%20klik%20https://657e147121e7.ngrok.io/program/%3C!DOCTYPE%20html%20PUBLIC%20%22-//W3C//DTD%20HTML%204.0%20Transitional//EN%22%20%22http://www.w3.org/TR/REC-html40/loose.dtd%22%3E%3Chtml%3E%3Cbody%3E%3Cp%20style=%22margin-bottom:%2016px;%20display:%20inline;%20font-family:%20Helvetica,%20Helvetica-FF,%20Arial,%20Tahoma,%20sans-serif;%20font-size:%2016px;%22%3E%3Ca%20href=%22http://detik.com/tag/idul-adha%22%20style=%22background-image:%20initial;%20background-position:%20initial;%20background-size:%20initial;%20background-repeat:%20initial;%20background-attachment:%20initial;%20background-origin:%20initial;%20background-clip:%20initial;%20color:%20var(--kuler-1);%20transition:%20all%200.3s%20ease-in-out%200s;%22%3EQurban%3C/a%3E&nbsp;menjadi%20salah%20satu%20sunnah%20yang%20dilakukan%20umat%20Islam%20di%20bulan%20Dzulhijjah.%20Hukum%20dan%20dalil%20qurban%20tertulis%20dalam%20Quran%20surat%20Al%20Hajj%20ayat%2034%20yang%20berbunyi,%3C/p%3E%3Cp%20style=%22margin-top:%2016px;%20margin-bottom:%2016px;%20font-family:%20Helvetica,%20Helvetica-FF,%20Arial,%20Tahoma,%20sans-serif;%20font-size:%2016px;%22%3E%3Ci%3EArtinya:%20Dan%20bagi%20setiap%20umat%20telah%20Kami%20syariatkan%20penyembelihan%20(qurban),%20agar%20mereka%20menyebut%20nama%20Allah%20atas%20rezeki%20yang%20dikaruniakan%20Allah%20kepada%20mereka%20berupa%20hewan%20ternak.%20Maka%20Tuhanmu%20ialah%20Tuhan%20Yang%20Maha%20Esa,%20karena%20itu%20berserahdirilah%20kamu%20kepada-Nya.%20Dan%20sampaikanlah%20(Muhammad)%20kabar%20gembira%20kepada%20orang-orang%20yang%20tunduk%20patuh%20(kepada%20Allah).%3C/i%3E%3Cbr%3E%3C/p%3E%3Ch2%20style=%22font-family:%20Helvetica,%20Helvetica-FF,%20Arial,%20Tahoma,%20sans-serif;%20font-weight:%20700;%20line-height:%201.3;%20color:%20rgb(0,%200,%200);%20margin-top:%200px;%20margin-bottom:%208px;%20font-size:%2026px;%22%3EArti%20qurban,%20hukum,%20dan%20ketentuannya:%3C/h2%3E%3Cp%20style=%22margin-bottom:%2016px;%20font-family:%20Helvetica,%20Helvetica-FF,%20Arial,%20Tahoma,%20sans-serif;%20font-size:%2016px;%22%3E%3C/p%3E%3Ch3%20style=%22font-family:%20Helvetica,%20Helvetica-FF,%20Arial,%20Tahoma,%20sans-serif;%20font-weight:%20700;%20line-height:%201.3;%20color:%20rgb(0,%200,%200);%20margin-top:%200px;%20margin-bottom:%208px;%20font-size:%2023px;%22%3EApa%20Arti%20Qurban?%3C/h3%3E%3Cp%20style=%22margin-bottom:%2016px;%20font-family:%20Helvetica,%20Helvetica-FF,%20Arial,%20Tahoma,%20sans-serif;%20font-size:%2016px;%22%3EQurban%20dalam%20bahasa%20Arab%20adalah%20hewan%20sembelihan,%20seperti%20unta,%20sapi,%20dan%20kambing%20yang%20disembelih%20pada%20Hari%20Raya.%20Menurut%20bahasa%20berarti%20mendekatkan%20diri,%20sedangkan%20menurut%20istilah%20adalah%20menyembelih%20hewan%20tertentu%20pada%20hari%20Raya%20Idul%20Adha%20sebagai%20bentuk%20ibadah%20kepada%20Allah%20SWT.%3C/p%3E%3Cp%20style=%22margin-bottom:%2016px;%20font-family:%20Helvetica,%20Helvetica-FF,%20Arial,%20Tahoma,%20sans-serif;%20font-size:%2016px;%22%3EDalam%20hadits%20riwayat%20Ibnu%20Majah,%20Rasulullah%20menjelaskan%20dasar%20hukum%20qurban%20adalah%20di%20setiap%20bulu%20hewan%20yang%20disembelih%20terdapat%20kebaikan.%20Dari%20Zaid%20bin%20Arqam,%20seseorang%20bertanya%20%27Ya%20Rasulullah,%20apakah%20arti%20qurban%20ini?%27%20Beliau%20menjawab%20%27Ini%20Sunnah%20Ibrahim%20AS%27%20Beliau%20ditanya%20lagi%20%27Mengapa%20kita%20harus%20melakukannya?%27%20Beliau%20menjawab%20%27Pada%20setiap%20bulunya%20terdapat%20kebaikan.%22%3C/p%3E%3Ch3%20style=%22font-family:%20Helvetica,%20Helvetica-FF,%20Arial,%20Tahoma,%20sans-serif;%20font-weight:%20700;%20line-height:%201.3;%20color:%20rgb(0,%200,%200);%20margin-top:%200px;%20margin-bottom:%208px;%20font-size:%2023px;%22%3EApa%20Hukumnya%20Berkurban?%3C/h3%3E%3Cp%20style=%22margin-bottom:%2016px;%20font-family:%20Helvetica,%20Helvetica-FF,%20Arial,%20Tahoma,%20sans-serif;%20font-size:%2016px;%22%3E%3Ca%20href=%22https://detik.com/tag/idul-adha%22%20style=%22background-image:%20initial;%20background-position:%20initial;%20background-size:%20initial;%20background-repeat:%20initial;%20background-attachment:%20initial;%20background-origin:%20initial;%20background-clip:%20initial;%20color:%20var(--kuler-1);%20transition:%20all%200.3s%20ease-in-out%200s;%22%3EDasar%20hukum%20qurban%3C/a%3E&nbsp;dan%20ketentuannya%20tertulis%20dalam%20Quran%20surat%20Al%20Kausar%20ayat%201-3.%20Dalam%20surat%20itu,%20Allah%20SWT%20berfirman%20agar%20umat%20Islam%20melaksanakan%20qurban%20sebagai%20ibadah%20mendekatkan%20diri%20kepada-Nya.%3C/p%3E%3Cp%20style=%22margin-bottom:%2016px;%20font-family:%20Helvetica,%20Helvetica-FF,%20Arial,%20Tahoma,%20sans-serif;%20font-size:%2016px;%22%3E%3Ci%3EArtinya:%20Sungguh,%20Kami%20telah%20memberimu%20(Muhammad)%20nikmat%20yang%20banyak.%20Maka%20laksanakanlah%20salat%20karena%20Tuhanmu,%20dan%20berkurbanlah%20(sebagai%20ibadah%20dan%20mendekatkan%20diri%20kepada%20Allah).%20Sungguh,%20orang-orang%20yang%20membencimu%20dialah%20yang%20terputus%20(dari%20rahmat%20Allah).%3C/i%3E%3Cbr%3E%3C/p%3E%3Ch3%20style=%22font-family:%20Helvetica,%20Helvetica-FF,%20Arial,%20Tahoma,%20sans-serif;%20font-weight:%20700;%20line-height:%201.3;%20color:%20rgb(0,%200,%200);%20margin-top:%200px;%20margin-bottom:%208px;%20font-size:%2023px;%22%3E%3Cspan%20style=%22font-size:%2016px;%20font-weight:%20400;%22%3EQurban%20dianjurkan%20kepada%20setiap%20umat%20islam%20yang%20mampu%20karena%20mengandung%20hikmah%20dan%20keutamaan.%20Hal%20itu%20sesuai%20dengan%20hadits%20riwayat%20Tirmidzi%20bahwa%20qurban%20bisa%20meningkatkan%20pengorbanan%20untuk%20kepentingan%20agama%20Allah%20dan%20menenangkan%20jiwa.%3C/span%3E%3C/h3%3E%3Ch3%20style=%22font-family:%20Helvetica,%20Helvetica-FF,%20Arial,%20Tahoma,%20sans-serif;%20font-weight:%20700;%20line-height:%201.3;%20color:%20rgb(0,%200,%200);%20margin-top:%200px;%20margin-bottom:%208px;%20font-size:%2023px;%22%3E%3Cspan%20style=%22font-size:%2016px;%20font-weight:%20400;%22%3E%3Cbr%3E%3C/span%3EHikmah%20Qurban%3C/h3%3E%3Cp%20style=%22margin-bottom:%2016px;%20font-family:%20Helvetica,%20Helvetica-FF,%20Arial,%20Tahoma,%20sans-serif;%20font-size:%2016px;%22%3E%22Tidak%20ada%20amalan%20yang%20diperbuat%20manusia%20pada%20Hari%20Raya%20Qurban%20yang%20lebih%20dicintai%20oleh%20Allah%20selain%20menyembelih%20hewan.%20Sesungguhnya%20hewan%20qurban%20itu%20kelak%20pada%20hari%20kiamat%20akan%20datang%20beserta%20tanduk-tanduknya,%20bulu-bulu,%20dan%20kuku-kukunya.%20Sesungguhnya%20sebelum%20darah%20qurban%20itu%20mengalir%20ke%20tanah,%20pahalanya%20telah%20diterima%20di%20sisi%20Allah.%20Maka%20tenangkan%20lah%20jiwa%20dengan%20berqurban.%22%3C/p%3E%3C/body%3E%3C/html%3E'
    Linking.openURL(url)
      .then(data => {
        console.log("Opened successfully " + data);
      })
  };
  facebook = () => {
    let url =
      'https://www.facebook.com/sharer/sharer.php?u=https://657e147121e7.ngrok.io/program/qurbansapiretail'
    Linking.openURL(url)
      .then(data => {
        console.log("Opened successfully " + data);
      })
  };
  render() {
    const inputbutton = [];
    const { count } = this.state;
    const { harga } = this.state;
    for (let i = 0; i < this.state.count; i++) {
      inputbutton.push(
        <><View key={i}>
          <View style={{ height: 7, backgroundColor: '#696969', marginTop: 10 }} />
          <Text>{i + 1}.</Text>
          <Text style={style.Label}>Nama</Text>
          <TextInput
            style={style.kotak2}
            onChangeText={text => this.setState({ text })}
            value={this.state.orang[i]}
            placeholder="Nama"
          />
        </View></>
      );
    }
    return (
      <ScrollView>
        <View>
          <View style={{ backgroundColor: '#0EBEDF' }}>
            <Text style={style.title}>Sapi Retail</Text>
          </View>
          <Image source={qurban} style={{ width: '100%', height: 170 }}></Image>
          <View style={style.coltom}>
            <View>
              <View>
                <Text style={{ marginLeft: 10, fontWeight: 'bold', fontSize: 16 }}>Harga Per Ekor</Text>
                <Text style={{ marginLeft: 10, fontWeight: 'bold' }}>Rp.4.000.000</Text>
                <Text style={{ marginLeft: 10 }}>Berbagi bahagia</Text>
                <Text style={{ marginLeft: 10 }}>Terkumpul Rp.</Text>
              </View>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignContent: 'center', alignItems: 'center' }}>
              <TouchableOpacity style={{ marginTop: 20, marginRight: 10 }} onPress={() => this.setState({ modalpembayaran: true })}>
                <Text style={style.btnSimpanDark}>Qurban Sekarang</Text>
              </TouchableOpacity>

            </View>
          </View>
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
            backgroundColor: '#00BFFF',
          }}>
            <View style={{ flexDirection: 'column' }}>
              <Text style={{ textAlign: 'center', marginBottom: 10, }}>
                ayo sebarkan kebaikan dengan share
              </Text>
              <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                <TouchableOpacity onPress={(this.facebook)}>
                  <Text style={style.btnSimpanUn}> Facebook</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={(this.WA)}>
                  <Text style={style.btnSimpanUn}> WhatsApp</Text>
                </TouchableOpacity>
              </View>
            </View>
            <ImageBackground source={read1} style={{
              marginLeft: 20,
              marginTop: -10,
              width: 80,
              height: 100,
            }}></ImageBackground>
          </View>
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
            backgroundColor: '#FFD700',
          }}>
            <View style={{ flexDirection: 'column' }}>
              <Text style={{ textAlign: 'center', marginBottom: 10, }}>
                ayo jadi salah satu bagian {"\n"}Foundasier
              </Text>
              <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('tambahfou')}>
                  <Text style={style.btnSimpanUn}> Jadi Foundasier</Text>
                </TouchableOpacity>
              </View>
            </View>
            <ImageBackground source={read1} style={{
              marginLeft: 20,
              marginTop: -10,
              width: 80,
              height: 100,
            }}></ImageBackground>
          </View>
          <Collapse>
            <CollapseHeader>
              <View style={style.coltom1}>
                <Text style={{ marginLeft: 25, color: '#7e7e7e', fontSize: 14, textAlign: 'center' }}>Deskripsi</Text>
                <Image source={arrow} style={{
                  padding: 10,
                  margin: 5,
                  height: 20,
                  width: 20,
                  position: 'absolute',
                  resizeMode: 'stretch',
                  alignItems: 'center',
                  right: 15,
                  top: 5,
                }}></Image>
              </View>
            </CollapseHeader>
            <CollapseBody>
              <View>
                <Text style={style.coltom1}>
                  Qurban menjadi salah satu sunnah yang dilakukan umat Islam di bulan Dzulhijjah. Hukum dan dalil qurban tertulis dalam Quran surat Al Hajj ayat 34 yang berbunyi,
                  Artinya: Dan bagi setiap umat telah Kami syariatkan penyembelihan (qurban), agar mereka menyebut nama Allah atas rezeki yang dikaruniakan Allah kepada mereka berupa hewan ternak.
                  Maka Tuhanmu ialah Tuhan Yang Maha Esa, karena itu berserahdirilah kamu kepada-Nya. Dan sampaikanlah (Muhammad) kabar gembira kepada orang-orang yang tunduk patuh (kepada Allah).
                  {'\n'}Arti qurban, hukum, dan ketentuannya:
                  {'\n'}Apa Arti Qurban?
                  Qurban dalam bahasa Arab adalah hewan sembelihan, seperti unta, sapi, dan kambing yang disembelih pada Hari Raya. Menurut
                  bahasa berarti mendekatkan diri, sedangkan menurut istilah adalah menyembelih hewan tertentu pada hari Raya Idul Adha sebagai bentuk ibadah kepada Allah SWT.
                  {'\n'}
                  Dalam hadits riwayat Ibnu Majah, Rasulullah menjelaskan dasar hukum qurban adalah di setiap bulu hewan yang disembelih terdapat kebaikan. Dari Zaid bin Arqam, seseorang bertanya 'Ya Rasulullah, apakah arti qurban ini?' Beliau menjawab 'Ini Sunnah Ibrahim AS' Beliau ditanya lagi 'Mengapa kita harus melakukannya?' Beliau menjawab 'Pada setiap bulunya terdapat kebaikan."
                  {'\n'}Apa Hukumnya Berkurban?
                  Dasar hukum qurban dan ketentuannya tertulis dalam Quran surat Al Kausar ayat 1-3. Dalam surat itu, Allah SWT berfirman agar umat Islam melaksanakan qurban sebagai ibadah mendekatkan diri kepada-Nya.
                  {'\n'}
                  Artinya: Sungguh, Kami telah memberimu (Muhammad) nikmat yang banyak. Maka laksanakanlah salat karena Tuhanmu, dan berkurbanlah (sebagai ibadah dan mendekatkan diri kepada Allah). Sungguh, orang-orang yang membencimu dialah yang terputus (dari rahmat Allah).
                  {'\n'}Qurban dianjurkan kepada setiap umat islam yang mampu karena mengandung hikmah dan keutamaan. Hal itu sesuai dengan hadits riwayat Tirmidzi bahwa qurban bisa meningkatkan pengorbanan untuk kepentingan agama Allah dan menenangkan jiwa.
                  {'\n'}Hikmah Qurban
                  {'\n'}"Tidak ada amalan yang diperbuat manusia pada Hari Raya Qurban yang lebih dicintai oleh Allah selain menyembelih hewan. Sesungguhnya hewan qurban itu kelak pada hari kiamat akan datang beserta tanduk-tanduknya, bulu-bulu, dan kuku-kukunya. Sesungguhnya sebelum darah qurban itu mengalir ke tanah, pahalanya telah diterima di sisi Allah. Maka tenangkan lah jiwa dengan berqurban."
                </Text>
              </View>
            </CollapseBody>
          </Collapse>
          <Collapse>
            <CollapseHeader>
              <View style={style.coltom1}>
                <Text style={{ marginLeft: 25, color: '#7e7e7e', fontSize: 14, textAlign: 'center' }}>Update Terbaru</Text>
                <Image source={arrow} style={{
                  padding: 10,
                  margin: 5,
                  height: 20,
                  width: 20,
                  position: 'absolute',
                  resizeMode: 'stretch',
                  alignItems: 'center',
                  right: 15,
                  top: 5,
                }}></Image>
              </View>
            </CollapseHeader>
            <CollapseBody>
              <View>
                <Text style={style.coltom1}>
                  Test
                </Text>
              </View>
            </CollapseBody>
          </Collapse>
          <Collapse>
            <CollapseHeader>
              <View style={style.coltom1}>
                <Text style={{ marginLeft: 25, color: '#7e7e7e', fontSize: 14, textAlign: 'center' }}>Donatur</Text>
                <Image source={arrow} style={{
                  padding: 10,
                  margin: 5,
                  height: 20,
                  width: 20,
                  position: 'absolute',
                  resizeMode: 'stretch',
                  alignItems: 'center',
                  right: 15,
                  top: 5,
                }}></Image>
              </View>
            </CollapseHeader>
            <CollapseBody>
              <View>
                <Text style={style.coltom1}>
                  Test
                </Text>
              </View>
            </CollapseBody>
          </Collapse>
          <Collapse>
            <CollapseHeader>
              <View style={style.coltom1}>
                <Text style={{ marginLeft: 25, color: '#7e7e7e', fontSize: 14, textAlign: 'center' }}>Foudasier</Text>
                <Image source={arrow} style={{
                  padding: 10,
                  margin: 5,
                  height: 20,
                  width: 20,
                  position: 'absolute',
                  resizeMode: 'stretch',
                  alignItems: 'center',
                  right: 15,
                  top: 5,
                }}></Image>
              </View>
            </CollapseHeader>
            <CollapseBody>
              <View>
                <Text style={style.coltom1}>
                  Test
                </Text>
              </View>
            </CollapseBody>
          </Collapse>

          <Modal
            animationType={"slide"}
            transparent={true}
            visible={this.state.modalpembayaran}
            style={{
              alignItems: 'center',
              justifyContent: 'center',

            }}>
            <ScrollView style={{ height: '100%', width: '100%', backgroundColor: '#f2f2f2', }}>
              <View >
                <View style={{ flexDirection: 'row', backgroundColor: 'white', borderRadius: 5, }}>
                  <Image source={qurban} style={{ width: 200, height: 100 }}></Image>
                  <View style={{ flexDirection: 'column' }}>
                    <Text>Anda akan berbagi untuk :</Text>
                    <Text>Qurban Sapi</Text>
                  </View>
                </View>

                <View style={{ height: '80%', width: '100%', backgroundColor: 'white', borderRadius: 5, marginTop: 5 }}>
                  <Text style={{ justifyContent: 'center', textAlign: 'center' }}>Total</Text>
                  <View style={{ flexDirection: 'column' }}>
                    <View>
                      <View style={style.countContainer}>
                        <TouchableOpacity
                          style={style.btnSimpanDark1}
                          onPress={() => {
                            if (this.state.harga > 0) {
                              this.setState({ count: this.state.count - 1 })
                              this.setState({ harga: this.state.harga - 4000000 })
                            } else {
                              alert('tidak bisa kurang dari 1');
                            }
                          }}>
                          <Text style={{}}>-</Text>
                        </TouchableOpacity>

                        <TextInput style={style.Textinputcss}
                          value={harga.toString().replace(/\D/g, "")
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                          keyboardType="numeric"
                          onChangeText={(harga) => this.setState({ harga })}
                          placeholder="Rp.0"
                          placeholderTextColor='#7e7e7e'
                        />

                        <TouchableOpacity
                          style={style.btnSimpanDark1}
                          onPress={() => {
                            this.setState({ count: this.state.count + 1 })
                            this.setState({ harga: this.state.harga + 4000000 })
                            // if (this.state.count < 100) {
                            //   this.setState({ count: this.state.count + 1 })
                            // } else {
                            //   alert('tidak bisa lebih dari 100');
                            // }
                          }}>
                          <Text>+</Text>
                        </TouchableOpacity>

                      </View>

                    </View>
                    {inputbutton}
                  </View>

                  <View style={{ flexDirection: 'row', justifyContent: 'center', alignContent: 'center' }}>
                    <TouchableOpacity style={{ marginTop: 20, marginRight: 10 }} onPress={() => this.setState({ modalpembayaran: false })}>
                      <Text style={style.btnSimpanUn1}>Kembali</Text>
                    </TouchableOpacity>
                    <TouchableOpacity  onPress={() => this.setState({ pilihpembayaran: true })} style={{ marginTop: 20, marginRight: 10 }}>
                      <Text style={style.btnSimpanDark}>Bayar</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </ScrollView>
          </Modal>
        </View>
      
      

        <Modal
          animationType={"slide"}
          transparent={true}
          visible={this.state.pilihpembayaran}
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
              <Text style={style.itemText}>Pembayaran</Text>
              <ScrollView style={{ width: '100%', height: '100%' }}>
                <Text style={{
                  color: '#000000',
                  marginTop: 10,
                  justifyContent: 'center',
                  alignContent: 'center',
                  alignItems: 'center',
                  textAlign: 'center',
                  fontSize: 16,
                  height: 35,
                  width: '50%',
                }}>{harga.toString().replace(/\D/g, "")
                .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</Text>
                <Collapse>
                  <CollapseHeader>
                    <View style={style.coltom}>
                      <Text style={{ marginLeft: 25, color: '#7e7e7e', fontSize: 14, }}>Pilih Metode Pembayaran</Text>
                      <Image source={arrow} style={{
                        padding: 10,
                        margin: 5,
                        height: 20,
                        width: 20,
                        position: 'absolute',
                        resizeMode: 'stretch',
                        alignItems: 'center',
                        right: 15,
                        top: -5,
                      }}></Image>
                    </View>
                  </CollapseHeader>
                  <CollapseBody>
                    <View>
                      <TouchableOpacity style={style.itemflat1}>
                        <View style={{ flexDirection: 'row', marginLeft: 20, }}>
                          <Image source={ovo}
                            style={{ borderRadius: 10, height: 80, width: 55, }} />
                          <Text style={{ marginLeft: 20, marginTop: 15, fontWeight: 'bold' }}> DANA</Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  </CollapseBody>
                </Collapse>
                <View style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center', marginTop: 10, }}>
                  <Text onPress={() => this.setState({ pilihpembayaran: false, modalpembayaran: false })} style={{ marginTop: 10, justifyContent: 'center', alignContent: 'center', alignItems: 'center', }}>
                    <View style={style.btnSimpanUn1}>
                      <Text> Kembali</Text>
                    </View>
                  </Text>
                </View>
              </ScrollView>
            </View>

          </View>
        </Modal>

      </ScrollView>
    )
  }
}

export default SapiRetail
const style = StyleSheet.create({
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

 Label: {
    padding: 5,
    color: '#000000',
    marginLeft: 10,
    marginTop:-5
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
  btnSimpanUn: {
    width: '100%',
    fontWeight: 'bold',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    justifyContent: 'center', alignItems: 'center',
    alignContent: 'center',
    textAlign: 'center',
    fontWeight: 'bold',
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
  coltom1: {
    width: '90%',
    marginLeft: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    alignContent: 'center',
    textAlign: 'justify',
    fontSize: 16,
    flexDirection: 'row',
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#fff',
    marginVertical: 2,
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
  coltom: {
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignContent: 'center',
    textAlign: 'justify',
    fontSize: 16,
    flexDirection: 'row',
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#fff',
    marginVertical: 2,
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
    width: '100%',
    fontWeight: 'bold',
    backgroundColor: '#87cefa',
    borderRadius: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#E9E9E9',
    textAlign: 'center',
    justifyContent: 'center', alignItems: 'center'
  },
  btnSimpanDark1: {
    width: '10%',
    fontWeight: 'bold',
    backgroundColor: '#0EBEDF',
    borderRadius: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#E9E9E9',
    textAlign: 'center',
    justifyContent: 'center', alignItems: 'center'
  },
  btnSimpanUn1: {
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
  kotak2: {
    color: '#000',
    marginLeft: 20,
    marginRight: 20,
    marginTop: -5,
    borderRadius: 10,
    borderWidth: 1,
    fontSize: 12,
    height: 47,
    backgroundColor: '#fff',
    shadowColor: "#333",
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    borderColor: '#f2f2f2',
    elevation: 3,
  },
  countContainer: {
    color: '#000000',
    alignItems: "center",
    flexDirection: 'row',
    padding: 5,
    justifyContent: 'center'
  },
  Textinputcss: {
    textAlign: 'center',
    color: '#7e7e7e',
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 10,
    fontSize: 12,
    height: 40,
    backgroundColor: '#f2f2f2',
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
  itemflat1: {
    fontSize: 16,
    flexDirection: 'column',
    backgroundColor: '#fff',
    padding: 15,
    height: 75,
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
})