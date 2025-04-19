import { Text, View } from 'react-native'
import React, { Component } from 'react'
import { WebView } from 'react-native-webview';

export class Detail_berita extends Component {
  render() {
    return (
      <WebView
      source={{uri: 'https://berbagibahagia.org/berbagiinfo'}}
      />
 
    )
  }
}

export default Detail_berita


// {/* <View style={{ flexDirection: 'row' }}>
// <FlatList
//     horizontal
//     pagingEnabled={true}
//     data={this.state.berita}
//     renderItem={({ item }) => (
//         <View >
//             <TouchableOpacity style={style.itemflat1} onPress={() => {
//                 this.props.navigation.navigate('Web', { des: item.deskripsi })
//             }}>
//                 <View style={{ padding: 10, margin: 10, flexDirection: 'row' }}>
//                     <Image source={{ uri: 'https://berbagibahagia.org/gambarUpload/' + item.gambar }}
//                         style={{ borderRadius: 10, height: 50, width: 50, }} />
//                     <View >
//                         <Text numberOfLines={2} style={{ width: 100, textAlign: 'center', marginLeft: 5, fontSize: 9, }}>{item.title}</Text>
//                         <TouchableOpacity>
//                             <View style={style.container}>
//                                 <View style={style.example}>
//                                     <View style={{ flexDirection: 'column' }}>
//                                         <Text style={style.Label}> Terkumpul</Text>
//                                         <Text style={style.Label}>Rp.{item.terkumpul}</Text>

//                                     </View>
//                                     <View style={{ flexDirection: 'column' }}>
//                                         <Text style={style.Label}> Sampai</Text>
//                                         <Text style={style.Label}>{item.end_date}</Text>
//                                     </View>

//                                 </View>
//                             </View>

//                             <View style={style.controls}>
//                                 <View style={style.generalControls}>
//                                     <View style={style.trackingControls}>
//                                         <View style={style.progress}>
//                                             {/* <ProgressBarAndroid styleAttr="Horizontal" color="#2196F3" /> */}
//                                             <View onProgress={this.onProgress} style={[style.innerProgressCompleted, { flex: flexCompleted }]} />
//                                             <View onProgress={this.onProgress} style={[style.innerProgressRemaining, { flex: flexRemaining }]} />
//                                         </View>
//                                     </View>
//                                 </View>
//                             </View>
//                         </TouchableOpacity>

//                         {/* <View style={style.container}>
//             <View style={style.example}>
//                 <Text>Fixed Progress Value</Text>
//                 <ProgressBarAndroid
//                     styleAttr="Horizontal"
//                     indeterminate={false}
//                     progress={0.1}
//                     />
//                 </View>
//         </View> */}
//                     </View>
//                 </View>
//             </TouchableOpacity>
//         </View>
//     )}>
// </FlatList>

{/* <FlatList
    horizontal
    pagingEnabled={true}
    data={this.state.anakren}
    renderItem={({ item }) => (
        <View >

            <TouchableOpacity style={style.itemflat1} onPress={() => { this.setState({ detrand: item, modaldetail: false }); }}>
                <View style={{ padding: 10, margin: 10, flexDirection: 'row' }}>
                    <Image source={{ uri: 'https://berbagibahagia.org/gambarUpload/' + item.gambar_anak }}
                        style={{ borderRadius: 10, height: 50, width: 50, }} />
                    <View >
                        <Text numberOfLines={2} style={{ width: 100, textAlign: 'center', marginLeft: 5, fontSize: 9, }}>{item.title}</Text>
                        <TouchableOpacity>
                            <View style={style.container}>
                                <View style={style.example1}>
                                    <View style={{ flexDirection: 'column' }}>
                                        <Text style={style.Label1}>{item.nama}</Text>
                                        <Text style={style.Label1}> {item.jk}</Text>
                                        <Text style={style.Label1}> {item.kls}</Text>
                                        <Text style={style.Label1}> {item.kriteria}</Text>

                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    )}>
</FlatList> */}
// </View> */}