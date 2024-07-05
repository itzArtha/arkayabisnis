import React, { useContext } from 'react';

const AppFooter = () => {
    return (
        <div className="layout-footer">
            <span className="font-medium mr-1">Tokoevent Bisnis {new Date().getFullYear()}</span>
            |
            <span className="ml-1">PT ARTHA KAYANA UTAMA</span>
        </div>
    );
};

export default AppFooter;
