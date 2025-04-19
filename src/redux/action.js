export const SET_EMAIL = 'SET_EMAIL';
export const SET_PASS = 'SET_PASS';
export const getdatalogin = 'getdatalogin';
export const user = 'user';
export const id = 'id';
export const presensi = 'CHANGE/USER';
const API_URL = 'https://kilauindonesia.org/datakilau/api/loginkar'

export const getlogin = () => {
    try {
        return async dispatch => {
            const result = await fetch(API_URL, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const json = await result.json();
            if (json) {
                dispatch({
                    type: getdatalogin,
                    payload: json
                });
            } else {
                console.log('Unable to fetch!');
            }
        }
    } catch (error) {
        console.log(error);
    }
}
export const email = email => dispatch => {
    dispatch({
        type: SET_EMAIL,
        payload: email,
    });
};

export const password = password => dispatch => {
    dispatch({
        type: SET_PASS,
        payload: password,
    });
};

export const pengguna = user => dispatch => {
    dispatch({
        type: user,
        payload: user,
    });
};

export const idorang = id => dispatch => {
    dispatch({
        type: id,
        payload: id,
    });
};
export const akun = presensi => dispatch => {
    dispatch({
        type: presensi,
        payload: presensi,
    });
};