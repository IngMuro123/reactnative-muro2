import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, Button, Alert, View, Image, useWindowDimensions, TouchableOpacity } from 'react-native';
import fotope from './assets/logo.png';
import fotopo from './assets/perfil.jpeg';
import { FullWidthImage } from './FullWidthImage';
import * as ImagePicker from 'expo-image-picker';
import * as Sharing from 'expo-sharing';
import * as ImageManipulator from 'expo-image-manipulator';

export default function App() {

  const [selectedImage, setSelectedImage] = useState(undefined);

  const [selectedImage2, setSelectedImage2] = useState(undefined);
  let Galery = async () => {
    let permiso = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permiso.granted === false) {
      Alert.alert('Los Permisos son requeridos');
      return;
    }
    const miImagen = await ImagePicker.launchImageLibraryAsync();
    console.log(miImagen);
    if (miImagen.cancelled === true) {
      return;
    }
    setSelectedImage({ localUri: miImagen.uri });
  }


  let Galerys = async () => {

    const miImagen2 = await ImagePicker.launchImageLibraryAsync();
    console.log(miImagen2);
    if (miImagen2.cancelled === true) {
      return;
    }
    setSelectedImage2({ localUri: miImagen2.uri });
  }


  let openSharing = async () => {
    if (!(await Sharing.isAvailableAsync())) {
      Alert.alert('Compartir no esta disponible en tu dispositivo');
      return;
    }
    let imageProc = await ImageManipulator.manipulateAsync(selectedImage2.localUri);
    await Sharing.shareAsync(imageProc.uri);
  }

  const { height, width } = useWindowDimensions();
  const isHorizontal = width > height ? true : false;

  return (
    <View style={gato.container}>
      <FullWidthImage permiso={Galery} ratio={.8} source={selectedImage !== undefined ?
         { uri: selectedImage.localUri } : fotope} estilo={gato.view4} />
      <FullWidthImage permiso={Galerys} ratio={.8} source={selectedImage2 !== undefined ?
         { uri: selectedImage2.localUri } : fotopo} estilo={gato.view5} />
      <View style={gato.view6}>
        <Text style={gato.textStyle}>ME LLAMO JORGE ANTONIO MURO VIRGEN
        TENGO 43 AÑOS SOY CASADO Y TENGO 5 HIJOS, ACTUALMENTE ESTUDIO EN LA UT DE LA COSTA,
        LA CARRERA DESARROLLO DE SOFTWARE, Y VIVO EN TECUALA NAYARIT.       
        </Text>      
      </View>
      <View style={gato.button}>
        <Button onPress={openSharing}
          title="Comparte"/>
      </View>
      <StatusBar style="auto" />

    </View>

  )
}

const gato = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'gray'
  },
  view6: {
    Color: '#fff',
    fontSize:'30'
  
   
  },
  view1: {
    backgroundColor: "green",
    flex: 1,
  },
  view2: {
    backgroundColor: "white",
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  view3: {
    backgroundColor: "red",
    flex: 1
  },
  view4: {
    width: 380,
    height: 240,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 230
  },
  view5: {
    width: 150,
    height: 100,

    alignItems:'center',
    paddingTop: 50
  },
  Image: {
    width: 140,
    height: 140
  },
  miImagen2: {
    width: 140,
    height: 140
  },
  textStyle: {
    fontSize: 15,
    paddingTop: 150,
    textAlign:'center',
    color: '#fff'
  },
  button: {
    alignItems: "center",
    paddingTop: 80,
    padding: 10
  }
});
