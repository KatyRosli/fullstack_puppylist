import React, { useState, useEffect } from 'react';
import PuppyDataService from '../services/PuppyService';
import IPuppyData from '../types/Puppy';
import { Link } from 'react-router-dom';

const PuppiesList: React.FC = () => {
    const [puppies, setPuppies] = useState<Array<IPuppyData>>([]);
    const [currentPuppy, setCurrentPuppy] = useState<IPuppyData | null>(null);
    const [currentIndex, setCurrentIndex] = useState<number>(-1);

    useEffect(() => {
        retrievePuppies();
    }, []);

    const retrievePuppies = () => {
        PuppyDataService.getAll()
        .then((response: any) => {

            setPuppies(response.data);
        })
        .catch((e: Error) => {
            console.log(e);
        });
    };

    const setActivePuppy = (puppy: IPuppyData, index: number) => {
        setCurrentPuppy(puppy);
        setCurrentIndex(index);
    };

    return (
        <div className='list row'>
        <div className='col-md-6'>
            <h4>Puppy Breed List:</h4> 
            <p> Click on the breed to view more info about the puppy.</p>  
            <ul className='list-group'>
                {puppies &&
                puppies.map((puppy, index) => (
                    <li
                    className={
                        'list-group-item' + (index === currentIndex ? 'active' : '')
                    }
                    onClick={() => setActivePuppy(puppy, index)}
                    key={index}
                >
                    {puppy.breed}
                </li>
                ))}
            </ul>            
        </div>
        <div className='col-md-6'>
            {currentPuppy ? (
                <div>
                    <h4>Puppy Info:</h4>
                    <div>
                    <label>
                        <strong>Breed:</strong>
                    </label>{''}
                    {currentPuppy.breed}
                </div>
                <div>
                    <label>
                        <strong>Name:</strong>
                    </label>{''}
                    {currentPuppy.name}
                    </div>
                    <div>
                        <label>
                            <strong>Birthdate:</strong>
                        </label>
                        {currentPuppy.birthdate}
                    </div>

                    <Link
                    to={'/puppies/' + currentPuppy.id}
                    className='badge-warning'>
                        Edit / Delete
                    </Link>
                    </div>
                ) : (
                     <div>
                        <br />
                        <p>Please click on the list above to view more info here.</p>
                        </div>
                    )}
                </div>
            </div>
    );
};

export default PuppiesList;