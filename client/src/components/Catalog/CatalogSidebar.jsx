// import { useState } from 'react';
import { Checkbox, CheckboxGroup } from '@nextui-org/react';
import { useSelector } from 'react-redux';
import LoadingSpinner from '../LoadingSpinner';

const CatalogSidebar = () => {
    const { categories, isLoading } = useSelector((state) => state.categories);

    // const [selected, setSelected] = useState([]);

    // useEffect(() => {}, [])

    console.log(categories);

    if (isLoading) {
        return <LoadingSpinner />;
    }

    return (
        <div className='flex flex-col gap-3'>
            {categories.map(({ _id, category_name }) => (
                <CheckboxGroup
                    key={_id}
                    label='Select cities'
                    color='warning'
                    value={category_name}
                    // onValueChange={setSelected}
                >
                    <Checkbox value={category_name}>{category_name}</Checkbox>
                </CheckboxGroup>
            ))}
            {/* <p className='text-default-500 text-small'>
                Selected: {selected.join(', ')}
            </p> */}
        </div>
    );
};

export default CatalogSidebar;
