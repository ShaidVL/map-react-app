import React from 'react';
import axios from 'axios';
import {Field, reduxForm} from 'redux-form';
import {useSelector, useDispatch} from "react-redux";

function SearchBar() {
    const inputText = useSelector(state => state.form.search.values.address);
    const selectedList = useSelector(state => state.appState.selectedList);
    const changeInput = useSelector(state => state.appState.changeInput);
    const dispatch = useDispatch();
    const apiKey = '0968b911-b62d-4570-8c3f-82ba6fb40b1d';
    const geoCode = inputText;

    if (geoCode && changeInput) {
        axios.get(`https://geocode-maps.yandex.ru/1.x/?format=json&apikey=${apiKey}&geocode=${geoCode}`)
            .then(res => {
                const currentSelect = res.data.response.GeoObjectCollection.featureMember;
                showSelectedList(currentSelect);
                dispatch({type: 'CHANGE_INPUT', payload: false});
            });
    }

    const showSelectedList =(currentSelect)=>{
        const selectedList = currentSelect.map(obj => {
            const selectedEl = {
                point: obj.GeoObject.Point.pos.split(' '),
                info: obj.GeoObject.metaDataProperty.GeocoderMetaData.text
            };
            return selectedEl;
        });

        dispatch({type: 'CHANGE_SELECTED_LIST', selectedList: selectedList});
    };


    const handleSubmit = (event) => {
        event.preventDefault();
        addPoint(0);
    };

    const handleChange = () => {
        dispatch({type: 'CHANGE_INPUT', payload: true});
    };

    const handleClick = (event) =>{
        addPoint(event.currentTarget.id);
    };

    const addPoint = (index) => {
        const selected = selectedList[index];
        dispatch({type: 'ADD_NEW_MARKER', point: [selected.point[1], selected.point[0]], info: selected.info});
    };

    const showList = selectedList.map((obj,index) => <li id={index} onClick={handleClick}>{obj.info}</li>);

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <Field
                    name="address"
                    component="input"
                    type="text"
                    placeholder="Address"
                    onChange={handleChange}
                />
                <button type="submit">Add point</button>
            </form>
            <ul>{showList}</ul>
        </div>
    );
}

SearchBar = reduxForm({
    form: 'search',
    initialValues: {
        address: '',
    }
})(SearchBar);

export default SearchBar;