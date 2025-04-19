// import React, { Component } from 'react';
// import {
//   AppRegistry,
//   StyleSheet,
//   Text,
//   Image,
//   TouchableOpacity,
//   View
// } from 'react-native';
// import Scanner from 'react-native-document-scanner';

// export default class Web extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       image: null,
//       flashEnabled: false,
//       useFrontCam: false,
//     };
//   }

//   renderDetectionType() {
//     switch (this.state.lastDetectionType) {
//       case 0:
//         return "Correct rectangle found"
//       case 1:
//         return "Bad angle found";
//       case 2:
//         return "Rectangle too far";
//       default:
//         return "No rectangle detected yet";
//     }
//   }

//   render() {
//     return (
//       <View style={styles.container}>
//         {this.state.image ?
//           <Image style={{ flex: 1, width: 300, height: 200 }} source={{ uri: `data:image/jpeg;base64,${this.state.image}`}} resizeMode="contain" /> :
//           <Scanner
//             useBase64
//             onPictureTaken={data => this.setState({ image: data.croppedImage })}
//             overlayColor="rgba(255,130,0, 0.7)"
//             enableTorch={this.state.flashEnabled}
//             useFrontCam={this.state.useFrontCam}
//             brightness={0.2}
//             saturation={0}
//             quality={0.5}
//             contrast={1.2}
//             onRectangleDetect={({ stableCounter, lastDetectionType }) => this.setState({ stableCounter, lastDetectionType })}
//             detectionCountBeforeCapture={10}
//             detectionRefreshRateInMS={50}
//             style={styles.scanner}
//           />
//         }
//         <Text style={styles.instructions}>
//           ({this.state.stableCounter || 0} correctly formated rectangle detected
//         </Text>
//         <Text style={styles.instructions}>
//           {this.renderDetectionType()}
//         </Text>
//         {this.state.image === null ?
//           null :
//           <TouchableOpacity style={styles.newPic} onPress={() => this.setState({ image: "" })}>
//             <Text>Take another picture</Text>
//           </TouchableOpacity>
//         }

//         <TouchableOpacity style={[styles.button, styles.left]} onPress={() => this.setState({ flashEnabled: !this.state.flashEnabled })}>
//           <Text>📸 Flash</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={[styles.button, styles.right]} onPress={() => this.setState({ useFrontCam: !this.state.useFrontCam })}>
//           <Text>📸 Front Cam</Text>
//         </TouchableOpacity>
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//   },
//   newPic: {
//     height: 100,
//     alignItems: 'center',
//     justifyContent: 'center'
//   },
//   button: {
//     position: 'absolute',
//     alignItems: 'center',
//     justifyContent: 'center',
//     borderRadius: 10,
//     top: 20,
//     bottom: 20,
//     height: 40,
//     width: 120,
//     backgroundColor: '#FFF',
//   },
//   left: {
//     left: 20,
//   },
//   right: {
//     right: 20,
//   },
//   welcome: {
//     fontSize: 20,
//     textAlign: 'center',
//     margin: 10,
//   },
//   instructions: {
//     textAlign: 'center',
//     color: '#333333',
//     marginBottom: 5,
//   },
//   scanner: {
//     flex: 1,
//     width: 400,
//     height: 200,
//     borderColor: 'orange',
//     borderWidth: 1
//   }
// });
import React, { useRef, useState, useEffect } from "react"
import { View, StyleSheet, Text, TouchableOpacity, Image, Platform, Dimensions } from "react-native"
import Permissions from 'react-native-permissions';
import DocumentScanner from "@woonivers/react-native-document-scanner"

export default function App() {
  const pdfScannerElement = useRef(null)
  const [data, setData] = useState({})
  const [allowed, setAllowed] = useState(false)

  useEffect(() => {
    async function requestCamera() {
      const result = await Permissions.request(Platform.OS === "android" ? "android.permission.CAMERA" : "ios.permission.CAMERA")
      if (result === "granted") setAllowed(true)
    }
    requestCamera()
  }, [])

  function handleOnPressRetry() {
    setData({})
  }
  function handleOnPress() {
    pdfScannerElement.current.capture()
  }
  if (!allowed) {
    console.log("You must accept camera permission")
    return (<View style={styles.permissions}>
      <Text>You must accept camera permission</Text>
    </View>)
  }
  if (data.croppedImage) {
    console.log("data", data)
    return (
      <React.Fragment>
      

          <Image source={{ uri: data.croppedImage }}  style={styles.preview}/>
       
        <TouchableOpacity onPress={handleOnPressRetry} style={styles.button}>
          <Text style={styles.buttonText}>Retry</Text>
        </TouchableOpacity>
      </React.Fragment>
    )
  }
  return (

    <React.Fragment>
      <DocumentScanner
        ref={pdfScannerElement}
        style={styles.scanner}
        onPictureTaken={setData}
        overlayColor="rgba(255,130,0, 0.7)"
        enableTorch={false}
        quality={0.5}
        detectionCountBeforeCapture={5}
        detectionRefreshRateInMS={50}
      />
      <TouchableOpacity onPress={handleOnPress} style={styles.button}>
        <Text style={styles.buttonText}>Take picture</Text>
      </TouchableOpacity>
    </React.Fragment>
  )
}

const styles = StyleSheet.create({
  scanner: {
    width: '100%',
    height: '100%',
    aspectRatio: undefined
  },
  button: {
    alignSelf: "center",
    bottom: 52,
  },
  buttonText: {
    backgroundColor: "rgba(245, 252, 255, 0.7)",
    fontSize: 32,
  },
  preview: {
    width: '100%',
    height: '100%',
    // width: Dimensions.get('window').width,
    // height: Dimensions.get('window').height,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  permissions: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
})

// import React, { Component } from 'react';
// import { Alert, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
// import ImagePicker from 'react-native-image-crop-picker';
// import Video from 'react-native-video';

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   button: {
//     backgroundColor: 'blue',
//     marginBottom: 10,
//   },
//   text: {
//     color: 'black',
//     fontSize: 20,
//     textAlign: 'center',
//   },
// });

// export default class App extends Component {
//   constructor() {
//     super();
//     this.state = {
//       image: null,
//       images: null,
//     };
//   }

//   pickSingleWithCamera(cropping, mediaType,circular = 'photo') {
//     ImagePicker.openCamera({
//       cropping: cropping,
//       width: 500,
//       height: 500,
//       freeStyleCropEnabled: true,
//       cropperCircleOverlay: true,
//       forceJpg: true,
//       sortOrder: 'none',
//       compressImageMaxWidth: 1000,
//       compressImageMaxHeight: 1000,
//       compressImageQuality: 1,
//       compressVideoPreset: 'MediumQuality',
//       includeExif: true,
//       cropperStatusBarColor: 'white',
//       cropperToolbarColor: 'white',
//       cropperActiveWidgetColor: 'white',
//       cropperToolbarWidgetColor: '#3498DB',
//       mediaType,
//     })
//       .then((image) => {
//         console.log('received image', image);
//         this.setState({
//           image: {
//             uri: image.path,
//             width: image.width,
//             height: image.height,
//             mime: image.mime,
//           },
//           images: null,
//         });
//       })
//       .catch((e) => alert(e));
//   }



//   renderImage(image) {
//     return (
//       <Image
//         style={{ width: 300, height: 300, resizeMode: 'contain' }}
//         source={image}
//       />
//     );
//   }

//   renderAsset(image) {
//     if (image.mime && image.mime.toLowerCase().indexOf('video/') !== -1) {
//       return this.renderVideo(image);
//     }

//     return this.renderImage(image);
//   }

//   render() {
//     return (
//       <View style={styles.container}>
//         <ScrollView>
//           {this.state.image ? this.renderAsset(this.state.image) : null}
//           {this.state.images
//             ? this.state.images.map((i) => (
//               <View key={i.uri}>{this.renderAsset(i)}</View>
//             ))
//             : null}
//         </ScrollView>



//         <TouchableOpacity
//           onPress={() => this.pickSingleWithCamera(true)}
//         >
//           <Text style={styles.text}>
//             Select Single With Camera With Cropping
//           </Text>
//         </TouchableOpacity>

//       </View>
//     );
//   }
// }



// import React, { Component } from 'react'
// import { View, StyleSheet, Text, TouchableOpacity, Image, Platform } from "react-native"
// import PDFScanner from "@woonivers/react-native-document-scanner"
// export class Web extends Component {
//   render() {
//     return (
//       <React.Fragment>
//       <PDFScanner
//         ref={pdfScannerElement}
//         style={styles.scanner}
//         onPictureTaken={setData}
//         overlayColor="rgba(255,130,0, 0.7)"
//         enableTorch={false}
//         quality={0.5}
//         detectionCountBeforeCapture={5}
//         detectionRefreshRateInMS={50}
//       />
//       <TouchableOpacity onPress={handleOnPress} style={styles.button}>
//         <Text style={styles.buttonText}>Take picture</Text>
//       </TouchableOpacity>
//     </React.Fragment>
//     )
//   }
// }

// export default Web