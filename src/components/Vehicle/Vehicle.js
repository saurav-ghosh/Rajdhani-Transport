import React from 'react';
import { Link } from 'react-router-dom';
import './Vehicle.css';

const Vehicle = (props) => {
    const {name, img} = props.vehicle;
    return (
        <Link to={`/vehicle/${name}`}>
            <div className="single-vehicle">
                <img src={img} alt=""/>
                <h4>{name}</h4>
            </div>
        </Link>
    );
};

export default Vehicle;