import React, { useContext } from 'react';
import AppMenuitem from './AppMenuitem';
import { MenuProvider } from './context/menucontext';

const AppMenu = () => {

    const model = [
        {
            label: 'Tokoevent',
            items: [
                { label: 'Dashboard', icon: 'pi pi-fw pi-home', to: route('event.dashboard') },
                { label: 'Peserta', value: 120, icon: 'pi pi-fw pi-users', to: route('event.participants') },
                { label: 'OTS System', icon: 'pi pi-fw pi-dollar', to: route('button') },
                { label: 'Keuangan', icon: 'pi pi-fw pi-credit-card', to: route('button') },
                { label: 'Pengaturan Event', icon: 'pi pi-fw pi-cog', to: route('button') },
            ]
        },
        {
            label: 'Tokoundangan',
            items: [
                { label: 'Dashboard', icon: 'pi pi-fw pi-home', to: route('undangan.dashboard') },
                { label: 'Undangan', value: 120, icon: 'pi pi-fw pi-calendar', to: route('undangan.index') },
                { label: 'Template', value: 5, icon: 'pi pi-fw pi-desktop', to: route('button') },
                { label: 'Referral', icon: 'pi pi-fw pi-dollar', to: route('button') },
                { label: 'Keuangan', icon: 'pi pi-fw pi-credit-card', to: route('button') }
            ]
        },
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
