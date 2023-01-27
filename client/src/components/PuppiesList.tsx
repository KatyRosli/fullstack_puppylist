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
        <div className='puppylist'>
        <div className='puppylist__container'>
            <h4 className='puppylist__header'>Puppy Breed List:</h4> 
            <p className='puppylist__innertext'> Click on the breed to view more info about the puppy.</p>  
            <ul className='puppylist__breedlist'>
                {puppies &&
                puppies.map((puppy, index) => (
                    <li
                    className={
                        'puppylist__item' + (index === currentIndex ? 'active' : '')
                    }
                    onClick={() => setActivePuppy(puppy, index)}
                    key={index}
                >
                    {puppy.breed}
                </li>
                ))}
            </ul>            
        </div>
        <div className='puppyinfo__container'>
            {currentPuppy ? (
                <div>
                    <h4 className='puppyinfo__header'>Puppy Info:</h4>
                    <div className='puppyinfo__breed'>
                    <label>
                        <strong>Breed:</strong>
                    </label>{''}
                    {currentPuppy.breed}
                </div>
                <div className='puppyinfo__name'>
                    <label>
                        <strong>Name:</strong>
                    </label>{''}
                    {currentPuppy.name}
                    </div>
                    <div className='puppyinfo__birthdate'>
                        <label>
                            <strong>Birthdate:</strong>
                        </label>
                        {currentPuppy.birthdate}
                    </div>

                    <Link
                    to={'/puppies/' + currentPuppy.id}
                    className='btn__edit-delete'>
                        Edit / Delete
                    </Link>
                    </div>
                ) : (
                     <div>
                        <br />
                        <p className='puppyinfo__innertext'>Puppy Info</p>
                        </div>
                    )}
                </div>
            </div>
    );
};

export default PuppiesList;