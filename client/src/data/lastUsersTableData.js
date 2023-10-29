const columns = [
    { name: 'ID', uid: 'id', sortable: true },
    { name: 'USERNAME', uid: 'username', sortable: true },
    { name: 'ROLE', uid: 'role', sortable: true },
    { name: 'EMAIL', uid: 'email' },
    { name: 'STATUS', uid: 'status', sortable: true },
];

const statusOptions = [
    { name: 'Active', uid: 'active' },
    { name: 'Paused', uid: 'paused' },
    { name: 'Vacation', uid: 'vacation' },
];

const users = [
    {
        id: 1,
        username: 'Tony Reichert',
        role: 'Admin',
        status: 'active',
        avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026024d',
        email: 'tony.reichert@example.com',
    },
    {
        id: 2,
        username: 'Zoey Lang',
        role: 'Manager',
        status: 'paused',
        avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
        email: 'zoey.lang@example.com',
    },
    {
        id: 3,
        username: 'Jane Fisher',
        role: 'Manager',
        status: 'active',
        avatar: 'https://i.pravatar.cc/150?u=a04258114e29026702d',
        email: 'jane.fisher@example.com',
    },
    {
        id: 4,
        username: 'William Howard',
        role: 'Manager',
        status: 'vacation',
        avatar: 'https://i.pravatar.cc/150?u=a048581f4e29026701d',
        email: 'william.howard@example.com',
    },
    {
        id: 5,
        username: 'Kristen Copper',
        role: 'Manager',
        status: 'active',
        avatar: 'https://i.pravatar.cc/150?u=a092581d4ef9026700d',
        email: 'kristen.cooper@example.com',
    },
];

export { columns, users, statusOptions };
