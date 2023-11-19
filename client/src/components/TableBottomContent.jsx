import PropTypes from 'prop-types';
import { Pagination } from '@nextui-org/react';

const TableBottomContent = ({
    pages,
    hasSearchFilter,
    selectedKeys,
    items,
    page,
    setPage,
}) => {
    return (
        <div className='py-2 px-2 flex justify-between items-center'>
            {pages > 0 ? (
                <Pagination
                    showControls
                    classNames={{
                        cursor: 'bg-foreground text-background',
                    }}
                    color='default'
                    isDisabled={hasSearchFilter}
                    page={page}
                    total={pages}
                    variant='light'
                    onChange={setPage}
                />
            ) : null}
            <span className='text-small text-default-400'>
                {selectedKeys === 'all'
                    ? 'All items selected'
                    : `${selectedKeys.size} of ${items?.length || 0} selected`}
            </span>
        </div>
    );
};

export default TableBottomContent;

TableBottomContent.propTypes = {
    pages: PropTypes.number,
    hasSearchFilter: PropTypes.bool,
    selectedKeys: PropTypes.any,
    items: PropTypes.array,
    page: PropTypes.number,
    setPage: PropTypes.func,
};
