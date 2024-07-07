import { Link, Head } from '@inertiajs/react';
import React, {useContext} from "react";
import Layout from '@/Layouts/layout/layout';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';

export default function Participants({ auth }) {
    const paginatorRight = <Button type="button" icon="pi pi-download" text />;
    return (
        <>
            <Layout>
                <Head title="Participants" />
                <div className="card">
                        <h5>Peserta</h5>
                        <DataTable value={[]} paginator rows={10} paginatorRight={paginatorRight} tableStyle={{ minWidth: '50rem' }}
                        paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                        currentPageReportTemplate="{first} to {last} of {totalRecords}">
                            <Column field="code" header="No"></Column>
                            <Column field="code" header="Tiket"></Column>
                            <Column field="name" header="Nama"></Column>
                            <Column field="category" header="Status"></Column>
                            <Column field="quantity" header="Absen"></Column>
                        </DataTable>
                    </div>
            </Layout>
        </>
    );
}
