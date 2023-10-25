import AdminNavbar from '../../../layouts/AdminNavbar';
import AdminSidebar from '../../../layouts/AdminSidebar';

const AdminDashboard = () => {
    return (
        <div className='flex'>
            <AdminSidebar />
            <div className='w-full'>
                <AdminNavbar />

                <div className='min-h-screen text-primary-light bg-primary-dark dark:text-primary-dark dark:bg-primary-light'>
                    <h2>Dashboard</h2>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
