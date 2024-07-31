import React, { useContext } from 'react';
import AppMenuitem from './AppMenuitem';
import { MenuProvider } from './context/menucontext';

const AppMenu = () => {

    const model = [
        {
            label: 'Tokoevent',
            items: [
                { label: 'Dashboard', icon: 'pi pi-fw pi-home', to: route('dashboard') },
                { label: 'Peserta', value: 120, icon: 'pi pi-fw pi-users', to: route('participants.index') },
                { label: 'OTS System', icon: 'pi pi-fw pi-dollar', to: route('ots.index') },
                { label: 'Keuangan', icon: 'pi pi-fw pi-credit-card', to: route('finance.index') },
                // { label: 'Pengaturan Event', icon: 'pi pi-fw pi-cog', to: route('button') },
            ]
        }
    ];

    return (
        <MenuProvider>
            <ul className="layout-menu">
                {model.map((item, i) => {
                    return !item?.seperator ? <AppMenuitem item={item} root={true} index={i} key={item.label} /> : <li className="menu-separator"></li>;
                })}
            </ul>
        </MenuProvider>
    );
};

export default AppMenu;
