import React from 'react';
import {Field, reduxForm} from 'redux-form';
import {useSelector, useDispatch} from "react-redux";

function SearchBar() {
    const selectedList = useSelector(state => state.appState.selectedList);
    const dispatch = useDispatch();

    const handleSubmit = (event) => {
        event.preventDefault();
        addPoint(0);
    };

    const handleClick = (event) =>{
        addPoint(event.currentTarget.id);
    };

    const addPoint = (index) => {
        const selected = selectedList[index] || false;
        if(selected){
            dispatch({type: 'ADD_NEW_MARKER', point: [selected.point[1], selected.point[0]], info: selected.info});
        }
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