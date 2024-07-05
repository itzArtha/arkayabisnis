import React, { useContext } from 'react';

const AppFooter = () => {
    return (
        <div className="layout-footer">
            <span className="font-medium mt-2">Tokoevent Bisnis {new Date().getFullYear()}</span>
        </div>
    );
};

export default AppFooter;
