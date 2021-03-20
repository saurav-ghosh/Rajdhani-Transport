import React, { useEffect, useState } from 'react';
import './Home.css';
import Header from '../Header/Header';
import fakedata from '../../fakedata/fakedata.json';
import Vehicle from '../Vehicle/Vehicle';
import { Container } from 'react-bootstrap';

const Home = () => {
    const [vehicles, setVehicles] = useState([]);

    useEffect(() => {
        setVehicles(fakedata);
    }, [])
    return (
        <div className="home">
            <Header></Header>
            <Container className="vehicle-container">
                {
                    vehicles.map(vehicle => <Vehicle key={vehicle.name} vehicle={vehicle}></Vehicle>)
                }
            </Container>
        </div>
    );
};

export default Home;