import {call, put, takeLatest, select} from 'redux-saga/effects'
import axios from 'axios';

const apiKey = '0968b911-b62d-4570-8c3f-82ba6fb40b1d';


const showSelectedList =(currentSelect)=>{
    if (currentSelect !== 'isEmpty'){
        return  currentSelect.map(obj => { return {
                point: obj.GeoObject.Point.pos.split(' '),
                info: obj.GeoObject.metaDataProperty.GeocoderMetaData.text
            }})
    } else{
        return [];
    }

};


function* getData() {
    try {
        const geoCode = yield select(state => state.form.search.values.address);
        const currentSelect = yield call(() => {
            if(geoCode !== ''){ return axios.get(`https://geocode-maps.yandex.ru/1.x/?format=json&apikey=${apiKey}&geocode=${geoCode}`)
                .then(res => res.data.response.GeoObjectCollection.featureMember);
            }else {
                return 'isEmpty';
            }

        });
        const selectedList = yield call(showSelectedList, currentSelect);
        yield put({type: 'CHANGE_SELECTED_LIST', selectedList: selectedList});
    } catch (e) {
        yield put({type: "CHANGE_SELECTED_LIST", selectedList: []});
    }
}

function* mySaga() {
    yield takeLatest("@@redux-form/CHANGE", getData);
}

export default mySaga;