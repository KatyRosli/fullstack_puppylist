import React, { useState, ChangeEvent } from 'react';
import PuppyDataService from '../services/PuppyService';
import IPuppyData from '../types/Puppy';

const AddPuppy: React.FC = () => {
    const initialPuppyState = {
        breed: '',
        name: '',
        birthdate: ''
        };
        const [puppy, setPuppy] = useState<Omit<IPuppyData, 'id'>>(initialPuppyState);
        const [submitted, setSubmitted] = useState<boolean>(false);

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setPuppy({ ...puppy, [name]: value})
    };

    const savePuppy = () => {
        let data = {
            breed: puppy.breed,
            name: puppy.name,
            birthdate: puppy.birthdate
        };

        PuppyDataService.create(data)
           .then((response: any) => {
            setPuppy({
                breed: puppy.breed,
                name: puppy.name,
                birthdate: puppy.birthdate
            });
            setSubmitted(true);
            console.log(response.data);
        })
        .catch((e: Error) => {
            console.log(e);
        });
    };
    const newPuppy = () => {
        setPuppy(initialPuppyState);
        setSubmitted(false);
    };

    return (
        <div className='addpuppy__form'>
            {submitted ? (
                <div>
                    <h4> You have submitted succesfully</h4>
                    <button className='btn btn-success' onClick={newPuppy}>
                        Add Puppy
                    </button>
                </div>
            ) : (
            <div>
                <div>
                    <p className='addpuppy__instruction'> Please fill in all of the inputs to add puppy data.</p>
                    <label className='addpuppy__label' htmlFor='Breed'>Breed:</label>
                    <input
                        type='text'
                        className='addpuppy__input'
                        id='breed'
                        value={puppy.breed}
                        onChange={handleInputChange}
                        name='breed'
                    />
            </div>
            <div>
                <label className='addpuppy__label' htmlFor='name'>Name:</label>
                <input
                type='text'
                className='addpuppy__input'
                id='name'
                value={puppy.name}
                onChange={handleInputChange}
                name='name'
            />
            </div>
            <div>
                <label className='addpuppy__label' htmlFor='name'>Birthdate:</label>
                <input
                type='text'
                className='addpuppy__input'
                id='birthdate'
                value={puppy.birthdate}
                onChange={handleInputChange}
                name='birthdate'
            />
            </div>

            <button onClick={savePuppy} className='btn__submit'>
                Submit
            </button>
            </div>
            )}
        </div>
    )
};
export default AddPuppy;
