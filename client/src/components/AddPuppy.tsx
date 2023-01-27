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
                    <h4 className='addpuppy__innertext'> You have submitted succesfully! Click the button below to add more puppy.</h4>
                    <button className='btn__addpuppy' onClick={newPuppy}>
                        Add Puppy
                    </button>
                </div>
            ) : (
            <div>
                <div className='addpuppy__form'>
                    <p className='addpuppy__instruction'> Please fill in all of the inputs to add puppy data.</p>
                    <label className='addpuppy__label' htmlFor='Breed'>Breed</label>
                    <br/>
                    <input
                        type='text'
                        className='addpuppy__input'
                        id='breed'
                        value={puppy.breed}
                        onChange={handleInputChange}
                        name='breed'
                    />
            </div>
            <div className='addpuppy__form'>
                <label className='addpuppy__label' htmlFor='name'>Name</label>
                <br/>
                <input
                type='text'
                className='addpuppy__input'
                id='name'
                value={puppy.name}
                onChange={handleInputChange}
                name='name'
            />
            </div>
            <div className='addpuppy__form'>
                <label className='addpuppy__label' htmlFor='name'>Birthdate</label>
                <br/>
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
