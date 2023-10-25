import { useContext } from 'react';
import { SidebarContext } from '../pages/admin/dashboard/AdminDashboard';

export const useToggleSidebar = () => {
    return useContext(SidebarContext);
};
