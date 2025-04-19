import { SET_PASS, SET_EMAIL, getdatalogin, id, user, presensi } from './action';

const initialState = {
    email: '',
    password: '',
    login: [],
    user: [],
    id: '',
    id_karyawan: '',
    name: '',
    presensi: '',
    akun: '',
}
function userReducer(state = initialState, action) {
    switch (action.type) {
        case SET_EMAIL:
            return { ...state, email: action.payload };
        case SET_PASS:
            return { ...state, password: action.payload };
        case getdatalogin:
            return { ...state, login: action.payload };
        case user:
            return { ...state, user: action.payload };
        case id:
            return { ...state, id: action.payload };
        case presensi:
            return { ...state, presensi: action.payload };
        default:
            return state;
    }
}

export default userReducer;