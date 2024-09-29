import React, { useContext } from 'react';
import AppMenuitem from './AppMenuitem';
import { MenuProvider } from './context/menucontext';
import {usePage} from "@inertiajs/react";

const AppMenu = () => {

    const {events} = usePage().props;

    let eventsRoute = [];

    events.map((event) => {
        eventsRoute.push({ label: event.title, icon: 'pi pi-fw pi-ticket', to: route('ots.event.index', event.slug) });
    });

    const model = [
        {
            label: 'Sistem OTS',
            items: eventsRoute
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
