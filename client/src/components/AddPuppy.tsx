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
        <div className='submit-form'>
            {submitted ? (
                <div>
                    <h4> You have submitted succesfully</h4>
                    <button className='btn btn-success' onClick={newPuppy}>
                        Add Puppy
                    </button>
                </div>
            ) : (
            <div>
                <div className='form-group'>
                    <p> Please fill in all of the inputs to add puppy data.</p>
                    <label htmlFor='Breed'>Breed</label>
                    <input
                        type='text'
                        className='form-control'
                        id='breed'
                        value={puppy.breed}
                        onChange={handleInputChange}
                        name='breed'
                    />
            </div>
            <div className='form-group'>
                <label htmlFor='name'>Name</label>
                <input
                type='text'
                className='form-control'
                id='name'
                value={puppy.name}
                onChange={handleInputChange}
                name='name'
            />
            </div>
            <div className='form-group'>
                <label htmlFor='name'>Birthdate</label>
                <input
                type='text'
                className='form-control'
                id='birthdate'
                value={puppy.birthdate}
                onChange={handleInputChange}
                name='birthdate'
            />
            </div>

            <button onClick={savePuppy} className='btn btn-success'>
                Submit
            </button>
            </div>
            )}
        </div>
    )
};
export default AddPuppy;
