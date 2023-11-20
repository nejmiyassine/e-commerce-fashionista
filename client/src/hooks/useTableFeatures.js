import { useMemo, useState } from 'react';
import { useCallback } from 'react';

const useTableFeatures = (initialVisibleColumns, columns, data) => {
    const [filterValue, setFilterValue] = useState('');
    const [selectedKeys, setSelectedKeys] = useState(new Set([]));
    const [visibleColumns, setVisibleColumns] = useState(
        new Set(initialVisibleColumns)
    );
    const [statusFilter, setStatusFilter] = useState('all');
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [sortDescriptor, setSortDescriptor] = useState({
        column: 'order_date',
        direction: 'ascending',
    });
    const [page, setPage] = useState(1);

    const pages = useMemo(() => {
        return data?.length ? Math.ceil(data.length / rowsPerPage) : 0;
    }, [data?.length, rowsPerPage]);

    const onRowsPerPageChange = useCallback((e) => {
        setRowsPerPage(Number(e.target.value));
        setPage(1);
    }, []);

    const onSearchChange = useCallback((value) => {
        if (value) {
            setFilterValue(value);
            setPage(1);
        } else {
            setFilterValue('');
        }
    }, []);

    return {
        filterValue,
        setFilterValue,
        selectedKeys,
        setSelectedKeys,
        visibleColumns,
        setVisibleColumns,
        statusFilter,
        setStatusFilter,
        rowsPerPage,
        // setRowsPerPage,
        sortDescriptor,
        setSortDescriptor,
        page,
        setPage,
        pages,
        onRowsPerPageChange,
        onSearchChange,
    };
};

export default useTableFeatures;
