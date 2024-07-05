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

export default function Welcome({ events }) {

    const leftToolbarTemplate = () => {
        return <>
            <h5 className={"mb-0"}>Undangan</h5>
        </>
    }

    const rightToolbarTemplate = () => {
        return <>
            <PrimaryButton icon={"pi pi-plus"} />
        </>
    }

    const dateFormat = (rowData) => {
        return moment(rowData.start_date).format('MMMM Do YYYY, HH:mm');
    };

    const actionIconFormat = (rowData) => {
        return <div>
            <Button severity={"info"} rounded text icon={"pi pi-external-link"} />
            <Button severity={"warning"} rounded text icon={"pi pi-pencil"} />
        </div>;
    };

    const locationFormat = (rowData) => {
        return <div>
            <a target={"_blank"} href={rowData.location.url}>{rowData.location.name}</a>
        </div>;
    };

    const statusFormat = (rowData) => {
        return <Tag value={"Published"} severity={"success"} />;
    };

    return (
        <>
            <Layout>
                <Head title="Undangan" />
                    <div className="card">
                        <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>
                        <DataTable value={events.data} rows={10} tableStyle={{ minWidth: '50rem' }}>
                            <Column header="#" body={(data, options) => options.rowIndex + 1}></Column>
                            <Column field="name" header="Nama Undangan"></Column>
                            <Column field="start_date" header="Tanggal" body={dateFormat}></Column>
                            <Column field="location" header="Lokasi" body={locationFormat}></Column>
                            <Column field="status" header="Status" body={statusFormat}></Column>
                            <Column header="" body={actionIconFormat}></Column>
                            <Column rowEditor={true} headerStyle={{ width: '10%', minWidth: '8rem' }} bodyStyle={{ textAlign: 'center' }}></Column>
                        </DataTable>
                    </div>
            </Layout>
        </>
    );
}
