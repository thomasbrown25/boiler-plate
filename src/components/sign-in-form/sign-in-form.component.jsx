import { useState } from 'react';

import FormInput from '../form-input/form-input.component';
import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';

import {
    signInWithGooglePopup,
    createUserDocumentFromAuth,
    signInAuthUserWithEmailAndPassword
} from '../../utils/firebase/firebase.utils';

import { SignInContainer, ButtonsContainer } from './sign-in-form.styles';

const defaultFormFields = {
    email: '',
    password: ''
};
const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormFields({ ...formFields, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !password)
            return alert('Must provide email and password');

        // Sign in user with email and password
        try {
            const { user } = await signInAuthUserWithEmailAndPassword(
                email,
                password
            );

            resetFormFields();
        } catch (err) {
            switch (err.code) {
                case 'auth/wrong-password':
                    alert('Incorrect password');
                    break;

                case 'auth/user-not-found':
                    alert('No account with that email');
                    break;

                default:
                    console.error(err.message);
            }
        }
    };

    // Sign in user with Google Pop-up
    const SignInWithGoogle = async () => {
        await signInWithGooglePopup();
    };

    return (
        <SignInContainer>
            <h2>I already have an account</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
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
                <ButtonsContainer>
                    <Button type='submit' onClick={handleSubmit}>
                        Sign In
                    </Button>
                    <Button
                        buttonType={BUTTON_TYPE_CLASSES.google}
                        type='button'
                        onClick={SignInWithGoogle}
                    >
                        Google Sign In
                    </Button>
                </ButtonsContainer>
            </form>
        </SignInContainer>
    );
};

export default SignInForm;
