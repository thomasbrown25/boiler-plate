import { takeLatest, put, all, call } from 'redux-saga/effects';

import { USER_ACTION_TYPES } from './user.types';

import { signInSuccess, signInFailed } from './user.action';

import {
    getCurrentUser,
    createUserDocumentFromAuth,
    signInWithGooglePopup,
    signInAuthUserWithEmailAndPassword,
    signOutUser
} from '../../utils/firebase/firebase.utils';

export function* getSnapshotFromUserAuth(userAuth, additionalDetails) {
    try {
        const userSnapshot = yield call(
            createUserDocumentFromAuth,
            userAuth,
            additionalDetails
        );
        console.log(userSnapshot);
        console.log(userSnapshot.data());
        yield put(
            signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() })
        );
    } catch (error) {
        yield put(signInFailed(error));
    }
}

export function* signInWithGoogle() {
    try {
        const { user } = yield call(signInWithGooglePopup);
        yield call(getSnapshotFromUserAuth, user);
    } catch (error) {
        yield put(signInFailed(error));
    }
}

export function* signInWithEmail({ payload: { email, password } }) {
    try {
        const { user } = yield call(
            signInAuthUserWithEmailAndPassword,
            email,
            password
        );
        yield call(getSnapshotFromUserAuth, user);
    } catch (error) {
        yield put(signInFailed(error));
    }
}

export function* signOut() {
    try {
        yield call(signOutUser);
    } catch (error) {}
}

export function* isUserAuthenticated() {
    try {
        const userAuth = yield call(getCurrentUser);
        if (!userAuth) return;
        yield call(getSnapshotFromUserAuth, userAuth);
    } catch (error) {
        yield put(signInFailed(error));
    }
}

export function* onGoogleSignInStart() {
    yield takeLatest(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

export function* onCheckUserSession() {
    yield takeLatest(USER_ACTION_TYPES.CHECK_USER_SECTION, isUserAuthenticated);
}

export function* onEmailSignInStart() {
    yield takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, signInWithEmail);
}

export function* onSignOutStart() {
    yield takeLatest(USER_ACTION_TYPES.SIGN_OUT_START, signOut);
}

export function* userSaga() {
    yield all([
        call(onCheckUserSession),
        call(onGoogleSignInStart),
        call(onEmailSignInStart)
    ]);
}
