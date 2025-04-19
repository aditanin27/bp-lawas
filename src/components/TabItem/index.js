import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Profile, IconLaporanAktif, IconLaporan, Clock, IconRumah, IconRumahAktif, ProfileAktif, IconAbsensi, IconAbsensiAktif } from '../../assets/icons'

const TabItem = ({ isFocused, onPress, onLongPress, label }) => {
  const Icon = () => {
    if (label === "Home") return isFocused ? <IconRumahAktif />  : <IconRumah />

    if (label === "Laporan") return isFocused ? 
    
      <IconLaporanAktif />  
      
    :
    
    <IconLaporan />   
    if (label === "Presensi") return isFocused ? <IconAbsensiAktif /> : <IconAbsensi />
    if (label === "Akun") return isFocused ? <ProfileAktif /> : <Profile />
    return <IconRumah />
  }
  return (
    <TouchableOpacity
      onPress={onPress}
      onLongPress={onLongPress}
      style={styles.container2}
    >
      <View style={styles.container}>
      <Icon />
      
      </View>
      <Text style={styles.text(isFocused)}>{label}</Text>
    </TouchableOpacity>
  );
};

export default TabItem;

const styles = StyleSheet.create({

  button: {
    alignItems: "center",
    justifyContent: "center",
    width: 60,
    height: 60,
    borderRadius: 50,
    backgroundColor: "#27D2F2",
    marginTop: -35,
    shadowColor: "#7F58FF",
    shadowRadius: 5,
    shadowOffset: { height: 1 },
    shadowOpacity: 0.3,
    // elevation: 3,
    borderWidth: 2,
    borderColor: "#f6f6f6"
  },
  container2: {
    alignItems: 'center',
  },
  container: {
    alignItems: 'center',
  },
  text: (isFocused) => ({
    fontSize: 13,
    color: isFocused ? '#51C9C2' : '#C8C8C8',
    marginTop: 8
  })
});
