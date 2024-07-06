import { Link, Head } from '@inertiajs/react';
import {LayoutContext, LayoutProvider} from "@/Layouts/layout/context/layoutcontext.jsx";
import React, {useContext} from "react";
import Layout from '@/Layouts/layout/layout';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import PrimaryButton from "@/Components/PrimaryButton";
import {Toolbar} from "primereact/toolbar";
import moment from "moment";
import {Tag} from "primereact/tag";
import {InputText} from "primereact/inputtext";
import {Calendar} from "primereact/calendar";

export default function FieldInfoUndangan({active, activeDefaultValue}) {

    if(active !== activeDefaultValue) {
        return null;
    }

    return (
        <>

                        <div className="mt-4 flex flex-wrap gap-3">
                            <div className="flex-auto">
                                <label htmlFor="username">Nama Undangan</label>
                                <InputText id="username" className="w-full"/>
                            </div>
                            <div className="flex-auto">
                                <label htmlFor="calendar">Kapan acaranya?</label>
                                <Calendar id="calendar" className="w-full" showIcon showTime />
                            </div>
                        </div>
                        <div className="mt-4 flex flex-wrap gap-3">
                            <div className="flex-auto">
                                <label htmlFor="username">Dimana lokasinya?</label>
                                <InputText id="spacekey" className="w-full"/>
                            </div>
                            <div className="flex-auto">
                                <label htmlFor="username">Link Google Maps?</label>
                                <InputText id="chars" placeholder={'https://maps.google.com'} className="w-full"/>
                            </div>
                        </div>


        </>
    );
}
