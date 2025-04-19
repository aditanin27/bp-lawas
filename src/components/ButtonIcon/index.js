import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import {
  IconAddSaldo,
  MasukHijau,
  PulangMerah,
  RequestKuning,
  InGreen,
  OutRed,
  ReqOrange,
  PreBlue
} from '../../assets';
import { connect } from 'react-redux';

const ButtonIcon = ({ title, type, tema, acc }) => {
  const Icon = () => {
    if (title === 'Masuk') return <InGreen />;

    if (title === 'Pulang') return <OutRed />;
    
    if (title === 'Istirahat') return <OutRed/>;

    if (title === 'Presensi') return <PreBlue />;

    if (title === 'Request') return <ReqOrange />;

    if (title === 'Update') return <ReqOrange />;
  };
  
  return (
    <View>
      <View style={styles.button(tema)}>
        <Icon />
        {title === 'Request' ?
        acc != 0 ?
        <View style={{width:17, height:17, borderRadius:17, backgroundColor:'#F5564A', position:'absolute', top:8, right:8, justifyContent:'center', alignItems:'center'}}>
          <Text style={{fontSize:9, color:'#fff'}}>{acc}</Text>
        </View>
        :
        <View/>
        :
        <View/>
        }
      </View>
      <Text style={styles.text(type, tema)} >{title}</Text>
    </View>
  );
};
export default ButtonIcon;

const styles = StyleSheet.create({
  container: (type) => ({
    marginBottom: type === "layanan" ? 12 : 0,
  }),
  button: (tema) => ({
    backgroundColor: tema === 0 ? '#FEFEFE' : '#111111',
    flexDirection: 'row',
    borderRadius: 30,
    height: 55,
    width: 55,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: tema === 0 ? '#EDEDED' : '#1b1e23',
  }),
  text: (type, tema) => ({
    fontSize: type === 'layanan' ? 12 : 10,
    textAlign: 'center',
    marginTop: 5,
    color: tema === 0 ? '#444444' : '#ffffff'
    
  }),

});
