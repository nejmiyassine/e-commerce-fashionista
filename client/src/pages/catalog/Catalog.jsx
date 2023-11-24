import CatalogSidebar from '../../components/Catalog/CatalogSidebar';

const Catalog = () => {
    return (
        <div className='flex gap-4 p-6'>
            <aside className='w-1/6'>
                <CatalogSidebar />
            </aside>
            <div className='w-5/6'>hello</div>
        </div>
    );
};

export default Catalog;
