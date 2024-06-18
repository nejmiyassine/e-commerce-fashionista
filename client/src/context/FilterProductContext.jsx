import { createContext, useState } from 'react';

const FilterProductContext = createContext();

export const FilterProductProvider = ({ children }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <FilterProductContext.Provider value={{ isSidebarOpen, toggleSidebar }}>
            {children}
        </FilterProductContext.Provider>
    );
};

export default FilterProductContext;
