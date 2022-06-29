import { Fragment } from 'react';

const FormInput = ({ label, ...otherProps }) => {
    return (
        <div className='group'>
            {/* <label className={`${otherProps.value.length ? }`}>{label}</label> */}
            <input {...otherProps} />
        </div>
    );
};

export default FormInput;
