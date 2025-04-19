import { createStore } from 'redux';

import AsyncStorage from '@react-native-async-storage/async-storage';

export function user(
  state = {
    id: '',
    id_karyawan: '',
    // name: '',
    tema: '',
    color: '',
    // email: '',
    id_jabatan: '',
    pr_jabatan: '',
    id_kantor: '',
    kantor_induk: '',
    presensi: '',
    jenis: '',
    name: '',
    email: '',
    id_admin_shelter: '',
    id_kacab: '',
    id_wilbin: '',
    id_shelter: '',
  },
  action,
) {
  switch (action.type) {
    case 'CHANGE/USER':
      return { ...state, ...action.payload };
  }

  return state;
}

export const store = createStore(user);
