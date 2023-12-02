/* eslint-disable react/prop-types */
import { useRef } from 'react';
import { IoMdCloudUpload } from 'react-icons/io';

const FileInput = ({ props }) => {
    const ref = useRef();

    const handleClick = () => {
        ref.current?.click();
    };

    return (
        <div
            onClick={handleClick}
            className='p-4 flex  flex-col items-center gap-2 bg-violet-100 text-violet-500 rounded-lg hover:bg-violet-100 cursor-pointer'
        >
            <IoMdCloudUpload className='w-6 h-6' />
            <span>Choose some files to upload</span>
            <input type='file' className='hidden' ref={ref} {...props} />
        </div>
    );
};

export default FileInput;
