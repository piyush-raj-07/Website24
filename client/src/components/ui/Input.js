import { useState } from 'react';

const Input = ({ icon: Icon, label, id, ...props }) => {
    const [isFocused, setIsFocused] = useState(false);
    const hasValue = props.value && props.value.length > 0;
    const inputId = id || `input-${label.toLowerCase().replace(/\s+/g, '-')}`;

    return (
        <div className='relative mb-6'>
            <div className='absolute inset-y-0 left-0 flex items-center pl-3'>
                <Icon className='size-5 text-purple-500' />
            </div>
            <input
                {...props}
                id={inputId}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                className='w-full pl-10 pr-3 py-2 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 text-white placeholder-transparent peer transition duration-200'
            />
            <label
                htmlFor={inputId}
                className={`absolute text-sm duration-200 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-purple-500 left-9 ${hasValue || isFocused ? 'text-purple-400 bg-gray-800 rounded-md -translate-y-4 scale-75 top-1.8 px-2' : 'text-gray-400'
                    }`}
            >
                {label}
            </label>
        </div>
    );
};

export default Input;