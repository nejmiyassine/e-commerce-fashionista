const columns = [
    { name: 'ID', uid: '_id', sortable: true },
    { name: 'FIRSTNAME', uid: 'first_name', sortable: true },
    { name: 'LASTNAME', uid: 'last_name', sortable: true },
    { name: 'USERNAME', uid: 'username', sortable: true },
    { name: 'EMAIL', uid: 'email', sortable: true },
    { name: 'ROLE', uid: 'role', sortable: true },
    { name: 'CREATION_DATE', uid: 'creation_date', sortable: true },
    { name: 'LAST_LOGIN', uid: 'last_login', sortable: true },
    { name: 'LAST_UPDATE', uid: 'last_update', sortable: true },
    { name: 'ACTIONS', uid: 'actions', sortable: true },
];

const roleColorMap = {
    admin: 'success',
    manager: 'warning',
};

const statusOptions = [
    { name: 'Admin', uid: 'admin' },
    { name: 'Manager', uid: 'manager' },
];

const INITIAL_VISIBLE_COLUMNS = [
    'username',
    'first_name',
    'last_name',
    'role',
    '_id',
    'actions',
];

export { columns, roleColorMap, statusOptions, INITIAL_VISIBLE_COLUMNS };
