import React, { useState, useEffect, ChangeEvent } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PuppyDataService from '../services/PuppyService';
import IPuppyData from '../types/Puppy';

const Puppy: React.FC = () => {
    const { id } = useParams();
    let navigate = useNavigate();

    const initialPuppyState = {
        id: '',
        breed: '',
        name: '',
        birthdate: ''
    };
    const [currentPuppy, setCurrentPuppy] = useState<IPuppyData>(initialPuppyState);
    const [message, setMessage] = useState<string>('');

    const getPuppy = (id: string) => {
        PuppyDataService.get(id)
        .then((response: any) => {
            setCurrentPuppy(response.data);
            console.log(response.data);
        })
        .catch((e: Error) => {
            console.log(e);
        });
    };

    useEffect(() => {
        if (id)
        getPuppy(id);
    }, [id]);

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setCurrentPuppy({ ...currentPuppy, [name]: value });
    };

    const updatePuppy = () => {
        PuppyDataService.update(currentPuppy.id, currentPuppy)
        .then((response: any) => {
            console.log(response.data);
            setMessage('The puppy was updated successfully!');
        })
        .catch((e: Error) => {
            console.log(e);
        });
    };

    const deletePuppy = () => {
        PuppyDataService.remove(currentPuppy.id)
        .then((response: any) => {
            console.log(response.data);
            navigate('/puppies');
        })
        .catch((e: Error) => {
            console.log(e);
        });
    };
        return(
            <div>
                {currentPuppy ? (
                    <div className='editpuppy__container'>
                        <h4 className='editpuppy__header'>Puppy</h4>
                        <form>
                            <div className='editpuppy__form'>
                                <label className='editpuppy__label' htmlFor='breed'>Breed:</label>
                                <input
                                type='text'
                                className='editpuppy__input'
                                id='breed'
                                name='breed'
                                value={currentPuppy.breed}
                                onChange={handleInputChange}
                                />
                            </div>
                            <div className='form-group'>
                                <label className='editpuppy__label' htmlFor='name'>Name:</label>
                                <input
                                type='text'
                                className='editpuppy__input'
                                id='name'
                                name='name'
                                value={currentPuppy.name}
                                onChange={handleInputChange}
                                />
                                </div>

                                <div className='form-group'>
                                <label className='editpuppy__label' htmlFor='name'>Birthdate:</label>
                                <input
                                type='text'
                                className='editpuppy__input'
                                id='name'
                                name='birthdate'
                                value={currentPuppy.birthdate}
                                onChange={handleInputChange}
                                />
                                </div>
                                </form>
                                <button className='btn__delete' onClick={deletePuppy}>
                                    Delete
                                </button>

                                <button
                                type='submit'
                                className='btn__update'
                                onClick={updatePuppy}
                                >
                                    Update
                                </button>
                                <p className='editpuppy__update-message'>{message}</p>
                             </div>
                        ) :(
                            <div>
                                <br />
                                <p className='editepuppy__delete-message'>Please click on a Puppy...</p>
                            </div>
                        )}
                        </div>
    );
};
                            

export default Puppy;