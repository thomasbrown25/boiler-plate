import { useState } from 'react';

import FormInput from '../form-input/form-input.component';

import {
    createAuthUserWithEmailAndPassword,
    createUserDocumentFromAuth
} from '../../utils/firebase/firebase.utils';

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
};
const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword } = formFields;

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormFields({ ...formFields, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // confirm the password matches
        if (password !== confirmPassword)
            return alert('passwords do not match');

        // see if user is authenticated
        try {
            const { user } = await createAuthUserWithEmailAndPassword(
                email,
                password
            );

            await createUserDocumentFromAuth(user, { displayName });
            console.log(user);
            resetFormFields();

            // create user document
            const userDocRef = await createUserDocumentFromAuth(user);
        } catch (err) {
            if (err.code === 'auth/email-already-in-use') {
                alert('Cannot create user, email already in use');
            }
            console.error(err.message);
        }
    };

    return (
        <div>
            <h1>Sign up with email and password</h1>
            <form onSubmit={handleSubmit}>
                <FormInput
                    label='Display Name'
                    type='text'
                    required
                    onChange={handleChange}
                    name='displayName'
                    value={displayName}
                />

                <FormInput
                    label='Email'
                    type='email'
                    required
                    onChange={handleChange}
                    name='email'
                    value={email}
                />

                <FormInput
                    label='Password'
                    type='password'
                    required
                    onChange={handleChange}
                    name='password'
                    value={password}
                />

                <FormInput
                    label='Confirm Password'
                    type='password'
                    required
                    onChange={handleChange}
                    name='confirmPassword'
                    value={confirmPassword}
                />

                <button type='submit'>Sign Up</button>
            </form>
        </div>
    );
};

export default SignUpForm;
