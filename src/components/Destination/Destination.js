import React, { useState } from 'react';
import { useParams } from 'react-router';
import Header from '../Header/Header';
import fakedata from '../../fakedata/fakedata.json';
import map from '../../images/Map.png';
import { Container } from 'react-bootstrap';
import './Destination.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers } from '@fortawesome/free-solid-svg-icons';

const Destination = () => {
    const [showResult, setShowResult] = useState(false);
    const [location, setLocation] = useState({
        from: '',
        to: '',
        date: ''
    });

    const {vehicleName} = useParams();
    const vehicle = fakedata.find(vehicle => vehicle.name === vehicleName)
    const {name, img, capacity, ticket} = vehicle || {};

    //----------checking input field empty or not ---------
    const handleBlur = (e) => {
        let isFormFilled = true;
        if(e.target.name === 'from'){
            isFormFilled = e.target.value.length > 0;
        }
        if(e.target.name === 'to'){
            isFormFilled = e.target.value.length > 0;
        }
        if(e.target.name === 'date'){
            isFormFilled = e.target.value.length > 0;
        }
        if(isFormFilled){
            const newLocation = {...location};
            newLocation[e.target.name] = e.target.value;
            setLocation(newLocation);
        }
    }

    return (
        <Container>
            <Header></Header>
            <div className="destination-container">
                <div>
                    <div className="search-field" style={{display: showResult ? 'none' : 'block'}}>
                        <span>Pick from</span><br/>
                        <input type="text" name="from" onBlur={handleBlur} id="" placeholder="mirpur 1"/><br/>
                        
                        <span>Pick to</span><br/>
                        <input type="text" onBlur={handleBlur} name="to" id="" placeholder="bonani"/><br/>
                        
                        <span>date</span><br/>
                        <input type="date" onBlur={handleBlur} name="date" id=""/><br/><br/>
                        
                        <input onClick={() => setShowResult(true)} type="submit" value="Search"/>
                    </div>
                    <div className="result-field" style={{display: showResult ? 'block' : 'none'}}>
                        <div className="location-result">
                            <h5>From: {location.from}</h5>
                            <h5>To: {location.to}</h5>
                            <h5>date: {location.date}</h5>
                        </div>
                        <div className="vehicle-results">
                            <div className="vehicle-result">
                                <img src={img} alt=""/>
                                <h5>{name}</h5>
                                <p className="capacity"><b><FontAwesomeIcon icon={faUsers} /> {capacity}</b></p>
                                <p><b>${ticket}</b></p>
                            </div>
                            <div className="vehicle-result">
                                <img src={img} alt=""/>
                                <h5>{name}</h5>
                                <p className="capacity"><b><FontAwesomeIcon icon={faUsers} /> {capacity}</b></p>
                                <p><b>${ticket}</b></p>
                            </div>
                            <div className="vehicle-result">
                                <img src={img} alt=""/>
                                <h5>{name}</h5>
                                <p className="capacity"><b><FontAwesomeIcon icon={faUsers} /> {capacity}</b></p>
                                <p><b>${ticket}</b></p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="map">
                    <img src={map} alt=""/>
                </div>
            </div>
        </Container>
    );
};

export default Destination;