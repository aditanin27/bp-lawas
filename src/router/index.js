import 'react-native-gesture-handler';
import * as React from 'react';
import { StyleSheet, Text, View, StatusBar, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomNavigator } from '../components/';
import {
  Login,
  Home,
  // Splash,
  Anak_Binaan,
  Tutor,
  Akun,
  Berita,
  Lapkeu,
  List_anak,
  Zakat,
  infak,
  Foundasier,
  RQurban,
  TambahAnak,
} from '../layout';
// import {List_anak} from '../layout/Anak_Binaan/List_anak';

import TambahKelompok from '../layout/TambahKelompokAnak/TambahKelompok';
import Web from '../layout/Home/Web';
import Splash from '../layout/Splash';
import Web1 from '../layout/Home/Web1';
import Berita_info from '../layout/Berita/Berita_info';
import Tamrap from '../layout/Anak_Binaan/Tamrap';
import Histori from '../layout/Anak_Binaan/Histori';
import Presensi from '../layout/Anak_Binaan/Presensi';
import SuratAB from '../layout/Anak_Binaan/SuratAB';
import Absen from '../layout/Anak_Binaan/Absen';
import { Detail } from '../layout/Anak_Binaan/Detail';
import Detail1 from '../layout/Anak_Binaan/Detail1';
import { First } from '../layout/TambahAnak/First';
import Second from '../layout/TambahAnak/Second';
import { Third } from '../layout/TambahAnak/Third';
import { Four } from '../layout/TambahAnak/Four';
import { Terdaftar1 } from '../layout/TambahAnak/Terdaftar1';
import { Terdaftar } from '../layout/TambahAnak/Terdaftar';
import Five from '../layout/TambahAnak/Five';
import Six from '../layout/TambahAnak/Six';
import Lib from '../layout/TambahAnak/Lib';
import Lib1 from '../layout/TambahAnak/Lib1';
import tambah1 from '../layout/TambahAnak/tambah1';
import tambah from '../layout/TambahAnak/tambah';
import TTutor from '../layout/Tutor/TTutor';
import carikk from '../layout/TambahAnak/carikk';
import Detinfak from '../layout/Lapkeu/Detinfak';
import Detanak from '../layout/Lapkeu/Detanak';
import Detdona from '../layout/Lapkeu/Detdona';
import Detail_Artikel from '../layout/Berita/Detail_Artikel';
import tambahfou from '../layout/Foundasier/tambahfou';
import Qurban from '../layout/RQurban/Qurban';
import SapiRetail from '../layout/RQurban/SapiRetail';
import Sapi from '../layout/RQurban/Sapi';
import Sedekah from '../layout/RQurban/Sedekah';
import Kambing from '../layout/RQurban/Kambing';
import Kelompok from '../layout/Admin/Kelompok';
import List_donatur from '../layout/Admin/List_donatur';
import bantuan from '../layout/Akun/bantuan';
import Bayar from '../layout/Bayar';
import rek from '../layout/Akun/rek';
import Pilnak from '../layout/Anak_Binaan/Pilnak';
import DetAktifitasAnak from '../layout/Anak_Binaan/DetAktifitasAnak';
import bayarinfak from '../layout/infak/bayarinfak';
import Donasi from '../layout/Donasi/';
import maps from '../layout/maps';
import ambil from '../layout/maps/ambil';
import ambilbaru from '../layout/maps/ambilbaru';
import bayardonasi from '../layout/Donasi/bayardonasi';
import Identitas from '../layout/Anak_Binaan/Identitas';
import DetailPenga from '../layout/Pengajuan/DetailPenga';
import ListPengajuan from '../layout/Pengajuan/ListPengajuan';
import Pengajuan from '../layout/Pengajuan/Pengajuan';
import Doc from '../layout/Akun/Doc';
import DetailTamRapot from '../layout/Anak_Binaan/DetailTamRapot';
import DetailTamSuratCinta from '../layout/Anak_Binaan/DetailTamSuratCinta';
import DetailTamPrestasi from '../layout/Anak_Binaan/DetailTamPrestasi';
import DetailTamRiwayat from '../layout/Anak_Binaan/DetailTamRiwayat';
import SuratCinta from '../layout/Anak_Binaan/SuratCinta';
import DetailTamAnakBinaan from '../layout/TambahAnak/DetailTamAnakBinaan';
import DetailTamAnakAsuh from '../layout/TambahAnak/DetailTamAnakAsuh';
import PilAnggotaKel from '../layout/TambahKelompokAnak/PilAnggotaKel';
import KelompokKun from '../layout/TambahKelompokAnak/KelompokKun';
import ProfilTutor from '../layout/Tutor/ProfilTutor';
import AktifitasTutor from '../layout/Tutor/AktifitasTutor';
import DetailTutor from '../layout/Tutor/DetailTutor';
import DetailAktifitas from '../layout/Tutor/DetailAktifitas';
import List_Anak_Binaan from '../layout/Anak_Binaan/List_Anak_Binaan';
import TamPelatihan from '../layout/Tutor/TamPelatihan';
import Listkeg from '../layout/Kegiatan/Listkeg';
import Kegiatan from '../layout/Kegiatan';
import absenanak from '../layout/Kegiatan/absenanak';
import DataKelshel from '../layout/TambahKelompokAnak/DataKelshel';
import Non_aktif from '../layout/Anak_Binaan/Non_aktif';
import Keluarga from '../layout/Keluarga';
import UserManagement from '../layout/Admin/UserManagement';
import ProfilAdminShelter from '../layout/Admin/ProfilAdminShelter';
import ProfilDonatur from '../layout/Admin/ProfilDonatur';
import PengajuanAnak from '../layout/Anak_Binaan/PengajuanAnak';
import DataValidasi from '../layout/DataValidasi';
import editdata from '../layout/DataValidasi/editdata';
import tambahdata from '../layout/DataValidasi/tambahdata';
import detailkeluarga from '../layout/Keluarga/detailkeluarga';
import editdatakel from '../layout/Keluarga/editdatakel';
import editdataibu from '../layout/Keluarga/editdataibu';
import editdataayah from '../layout/Keluarga/editdataayah';
import editdatawali from '../layout/Keluarga/editdatawali';
import editdataanak from '../layout/Keluarga/editdataanak';
import ListKelompok from '../layout/TambahKelompokAnak/ListKelompok';
import MasukanAnak from '../layout/TambahKelompokAnak/MasukanAnak';
import Datashelter from '../layout/Wilayah/Datashelter';
import Datakacab from '../layout/Wilayah/Datakacab';
import Datawilayah from '../layout/Wilayah/Datawilayah';
import Tambahshelter from '../layout/Wilayah/Tambahshelter';
import Editdatashelter from '../layout/Wilayah/Editdatashelter';
import Keuangan from '../layout/Keuangan';
import TambahKeuangan from '../layout/Keuangan/TambahKeuangan';
import Jumlahlistshelter from '../layout/Report/Jumlahlistshelter';
import Detailjumlahanak from '../layout/Report/Detailjumlahanak';
import JumlahDonatur from '../layout/Report/JumlahDonatur';
import Detailjumlahdonatur from '../layout/Report/Detailjumlahdonatur';
import infoanak from '../layout/Report/infoanak';
import Aktif from '../layout/Report/Aktif';
import DetailAktif from '../layout/Report/DetailAktif';
import DetailShelter from '../layout/Report/DetailShelter';
import ListShelter from '../layout/Report/ListShelter';
import Oprasional from '../layout/Pengajuan/Oprasional';
import Pel from '../layout/Tutor/Pel';
import Report from '../layout/Report';
import testface from '../layout/Kegiatan/testface';
import ProfilAdminCabang from '../layout/Admin/ProfilAdminCabang';
import Master from '../layout/DataMaster';
import Bank from '../layout/DataMaster/Bank';
import LevelBinaan from '../layout/DataMaster/LevelBinaan';
import Materi from '../layout/DataMaster/Materi';
import ListKegiatan from '../layout/DataMaster/ListKegiatan';
import TambahADMC from '../layout/TambahUser/TambahADMC';
import TambahADMS from '../layout/TambahUser/TambahADMS';
import TambahTutor from '../layout/TambahUser/TambahTutor';
import TambahDona from '../layout/TambahUser/TambahDona';
import pendidikan from '../layout/pilih/pendidikan';
import DataDataKel from '../layout/pilih/DataDataKel';
import ProfilTutoradmin from '../layout/Admin/ProfilTutoradmin';
import DetailOprasional from '../layout/Pengajuan/DetailOprasional';
import PengajuanDonatur from '../layout/Pengajuan/PengajuanDonatur';
import DetailDonatur from '../layout/Pengajuan/DetailDonatur';
import Nilai from '../layout/Anak_Binaan/Nilai';
import Rapshelter from '../layout/Anak_Binaan/Rapshelter';
import TamRapotShelter from '../layout/Anak_Binaan/TamRapotShelter';
import DetailRShel from '../layout/Anak_Binaan/DetailRShel';
import Barang from '../layout/DataMaster/Barang';
import Editrapotshelter from '../layout/Anak_Binaan/Editrapotshelter';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function MainApp() {
  return (
    <>
      <StatusBar hidden={true} />
      <Tab.Navigator tabBar={props => <BottomNavigator {...props} />}>
 
        <Tab.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="Aktifitas"
          component={Aktifitas}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="Bayar"
          component={Bayar}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="Anak Asuh"
          component={Anak_Asuh}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="Profil"
          component={Profil}
          options={{ headerShown: false }}
        />
      </Tab.Navigator>
    </>
  );
}
const App = () => {
  return (
    <NavigationContainer initialRouteName="Splash">
      <StatusBar hidden />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="MainApp" component={MainApp} />
        <Stack.Screen name="Berita" component={Berita} />
        <Stack.Screen name="Lapkeu" component={Lapkeu} />
        <Stack.Screen name="Detinfak" component={Detinfak} />
        <Stack.Screen name="Kegiatan" component={Kegiatan} />
        <Stack.Screen name="Anak_Binaan" component={Anak_Binaan} />
        <Stack.Screen name="Detail" component={Detail} />
        <Stack.Screen name="Detail1" component={Detail1} />
        <Stack.Screen name="List_anak" component={List_anak} />
        <Stack.Screen name="Tamrap" component={Tamrap} />
        <Stack.Screen name="Histori" component={Histori} />
        <Stack.Screen name="First" component={First} />
        <Stack.Screen name="Second" component={Second} />
        <Stack.Screen name="Third" component={Third} />
        <Stack.Screen name="Four" component={Four} />
        <Stack.Screen name="Five" component={Five} />
        <Stack.Screen name="Six" component={Six} />
        <Stack.Screen name="Lib" component={Lib} />
        <Stack.Screen name="Lib1" component={Lib1} />
        <Stack.Screen name="tambah" component={tambah} />
        <Stack.Screen name="tambah1" component={tambah1} />
        <Stack.Screen name="carikk" component={carikk} />
        <Stack.Screen name="TambahAnak" component={TambahAnak} />
        <Stack.Screen name="Terdaftar1" component={Terdaftar1} />
        <Stack.Screen name="Terdaftar" component={Terdaftar} />
        <Stack.Screen name="Presensi" component={Presensi} />
        <Stack.Screen name="SuratAB" component={SuratAB} />
        <Stack.Screen name="Absen" component={Absen} />
        <Stack.Screen name="Tutor" component={Tutor} />
        <Stack.Screen name="TTutor" component={TTutor} />
        <Stack.Screen name="Akun" component={Akun} />
        <Stack.Screen name="Web" component={Web} />
        <Stack.Screen name="Web1" component={Web1} />
        <Stack.Screen name="Detail_Artikel" component={Detail_Artikel} />
        <Stack.Screen name="Berita_info" component={Berita_info} />
        <Stack.Screen name="Zakat" component={Zakat} />
        <Stack.Screen name="infak" component={infak} />
        <Stack.Screen name="Foundasier" component={Foundasier} />
        <Stack.Screen name="tambahfou" component={tambahfou} />
        <Stack.Screen name="RQurban" component={RQurban} />
        <Stack.Screen name="Qurban" component={Qurban} />
        <Stack.Screen name="SapiRetail" component={SapiRetail} />
        <Stack.Screen name="Sapi" component={Sapi} />
        <Stack.Screen name="Kambing" component={Kambing} />
        <Stack.Screen name="Sedekah" component={Sedekah} />
        <Stack.Screen name="Kelompok" component={Kelompok} />
        <Stack.Screen name="List_donatur" component={List_donatur} />
        <Stack.Screen name="bantuan" component={bantuan} />
        <Stack.Screen name="Bayar" component={Bayar} />
        <Stack.Screen name="rek" component={rek} />
        <Stack.Screen name="Pilnak" component={Pilnak} />
        <Stack.Screen name="DetAktifitasAnak" component={DetAktifitasAnak} />
        <Stack.Screen name="Detanak" component={Detanak} />
        <Stack.Screen name="Detdona" component={Detdona} />
        <Stack.Screen name="bayarinfak" component={bayarinfak} />
        <Stack.Screen name="Donasi" component={Donasi} />
        <Stack.Screen name="bayardonasi" component={bayardonasi} />
        <Stack.Screen name="Identitas" component={Identitas} />
        <Stack.Screen name="Doc" component={Doc} />
        <Stack.Screen name="DetailTamRapot" component={DetailTamRapot} />
        <Stack.Screen name="DetailTamRiwayat" component={DetailTamRiwayat} />
        <Stack.Screen name="DetailTamPrestasi" component={DetailTamPrestasi} />
        <Stack.Screen
          name="DetailTamSuratCinta"
          component={DetailTamSuratCinta}
        />
        <Stack.Screen
          name="DetailTamAnakBinaan"
          component={DetailTamAnakBinaan}
        />
        <Stack.Screen name="DetailTamAnakAsuh" component={DetailTamAnakAsuh} />
        <Stack.Screen name="SuratCinta" component={SuratCinta} />
        <Stack.Screen name="maps" component={maps} />
        <Stack.Screen name="TambahKelompok" component={TambahKelompok} />
        <Stack.Screen name="PilAnggotaKel" component={PilAnggotaKel} />
        <Stack.Screen name="KelompokKun" component={KelompokKun} />
        <Stack.Screen name="ProfilTutor" component={ProfilTutor} />
        <Stack.Screen name="AktifitasTutor" component={AktifitasTutor} />
        <Stack.Screen name="ambil" component={ambil} />
        <Stack.Screen name="ambilbaru" component={ambilbaru} />
        <Stack.Screen name="DetailTutor" component={DetailTutor} />
        <Stack.Screen name="List_Anak_Binaan" component={List_Anak_Binaan} />
        <Stack.Screen name="ListPengajuan" component={ListPengajuan} />
        <Stack.Screen name="Pengajuan" component={Pengajuan} />
        <Stack.Screen name="DetailPenga" component={DetailPenga} />
        <Stack.Screen name="DetailAktifitas" component={DetailAktifitas} />
        <Stack.Screen name="TamPelatihan" component={TamPelatihan} />
        <Stack.Screen name="Listkeg" component={Listkeg} />
        <Stack.Screen name="absenanak" component={absenanak} />
        <Stack.Screen name="DataKelshel" component={DataKelshel} />
        <Stack.Screen name="Non_aktif" component={Non_aktif} />
        <Stack.Screen name="Keluarga" component={Keluarga} />
        <Stack.Screen name="UserManagement" component={UserManagement} />
        <Stack.Screen name="ProfilDonatur" component={ProfilDonatur} />
        <Stack.Screen
          name="ProfilAdminShelter"
          component={ProfilAdminShelter}
        />
        <Stack.Screen name="PengajuanAnak" component={PengajuanAnak} />
        <Stack.Screen name="DataValidasi" component={DataValidasi} />
        <Stack.Screen name="editdata" component={editdata} />
        <Stack.Screen name="tambahdata" component={tambahdata} />
        <Stack.Screen name="detailkeluarga" component={detailkeluarga} />
        <Stack.Screen name="editdatakel" component={editdatakel} />
        <Stack.Screen name="editdatawali" component={editdatawali} />
        <Stack.Screen name="editdataibu" component={editdataibu} />
        <Stack.Screen name="editdataayah" component={editdataayah} />
        <Stack.Screen name="editdataanak" component={editdataanak} />
        <Stack.Screen name="ListKelompok" component={ListKelompok} />
        <Stack.Screen name="MasukanAnak" component={MasukanAnak} />
        <Stack.Screen name="Datashelter" component={Datashelter} />
        <Stack.Screen name="Datawilayah" component={Datawilayah} />
        <Stack.Screen name="Tambahshelter" component={Tambahshelter} />
        <Stack.Screen name="Editdatashelter" component={Editdatashelter} />
        <Stack.Screen name="Keuangan" component={Keuangan} />
        <Stack.Screen name="TambahKeuangan" component={TambahKeuangan} />
        <Stack.Screen name="Report" component={Report} />
        <Stack.Screen name="Jumlahlistshelter" component={Jumlahlistshelter} />
        <Stack.Screen name="Detailjumlahanak" component={Detailjumlahanak} />
        <Stack.Screen name="JumlahDonatur" component={JumlahDonatur} />
        <Stack.Screen
          name="Detailjumlahdonatur"
          component={Detailjumlahdonatur}
        />
        <Stack.Screen name="infoanak" component={infoanak} />
        <Stack.Screen name="Aktif" component={Aktif} />
        <Stack.Screen name="DetailAktif" component={DetailAktif} />
        <Stack.Screen name="ListShelter" component={ListShelter} />
        <Stack.Screen name="DetailShelter" component={DetailShelter} />
        <Stack.Screen name="Oprasional" component={Oprasional} />
        <Stack.Screen name="Pel" component={Pel} />
        <Stack.Screen name="testface" component={testface} />
        <Stack.Screen name="ProfilAdminCabang" component={ProfilAdminCabang} />
        <Stack.Screen name="Datakacab" component={Datakacab} />
        <Stack.Screen name="Master" component={Master} />
        <Stack.Screen name="Bank" component={Bank} />
        <Stack.Screen name="LevelBinaan" component={LevelBinaan} />
        <Stack.Screen name="Materi" component={Materi} />
        <Stack.Screen name="ListKegiatan" component={ListKegiatan} />
        <Stack.Screen name="TambahADMC" component={TambahADMC} />
        <Stack.Screen name="TambahTutor" component={TambahTutor} />
        <Stack.Screen name="TambahADMS" component={TambahADMS} />
        <Stack.Screen name="TambahDona" component={TambahDona} />
        <Stack.Screen name="pendidikan" component={pendidikan} />
        <Stack.Screen name="DataDataKel" component={DataDataKel} />
        <Stack.Screen name="ProfilTutoradmin" component={ProfilTutoradmin} />
        <Stack.Screen name="DetailOprasional" component={DetailOprasional} />
        <Stack.Screen name="PengajuanDonatur" component={PengajuanDonatur} />
        <Stack.Screen name="DetailDonatur" component={DetailDonatur} />
        <Stack.Screen name="Nilai" component={Nilai} />
        <Stack.Screen name="Rapshelter" component={Rapshelter} />
        <Stack.Screen name="TamRapotShelter" component={TamRapotShelter} />
        <Stack.Screen name="DetailRShel" component={DetailRShel} />
        <Stack.Screen name="Barang" component={Barang} />
        <Stack.Screen name="Editrapotshelter" component={Editrapotshelter} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
const style = StyleSheet.create({
  bg: {
    position: 'absolute',
    bottom: 25,
    left: 20,
    right: 20,
    elevation: 0,
    backgroundColor: '#000',
    borderRadius: 15,
    height: 90,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 60,
    borderRadius: 50,
    backgroundColor: '#27D2F2',
    // position: "absolute",
    marginTop: -35,
    shadowColor: '#7F58FF',
    shadowRadius: 5,
    shadowOffset: { height: 1 },
    shadowOpacity: 0.3,
    // elevation: 3,
    borderWidth: 2,
    borderColor: '#f6f6f6',
  },
  container2: {
    alignItems: 'center',
  },
  container: {
    alignItems: 'center',
  },
  text: isFocused => ({
    fontSize: 13,
    color: isFocused ? '#51C9C2' : '#C8C8C8',
    marginTop: 8,
  }),
});
