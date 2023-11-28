/* eslint-disable react/prop-types */
import { Spacer } from '@nextui-org/react';

const Line = ({ spacer = 4 }) => {
    return (
        <>
            <Spacer y={spacer} />
            <hr />
            <Spacer y={spacer} />
        </>
    );
};

export default Line;
