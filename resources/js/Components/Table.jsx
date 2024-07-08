
import React, { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Skeleton } from 'primereact/skeleton';
import {ColumnGroup} from "primereact/columngroup";
import {Row} from "primereact/row";

export default function Table() {
    const [virtualCars, setVirtualCars] = useState([]);
    const [lazyLoading, setLazyLoading] = useState(false);
    let loadLazyTimeout = null;

    const loadCarsLazy = (event) => {
        !lazyLoading && setLazyLoading(true);

        if (loadLazyTimeout) {
            clearTimeout(loadLazyTimeout);
        }

        //simulate remote connection with a timeout
        loadLazyTimeout = setTimeout(() => {
            setLazyLoading(false);
        }, Math.random() * 1000 + 250);
    };

    const loadingTemplate = (options) => {
        return (
            <div className="flex align-items-center" style={{ height: '17px', flexGrow: '1', overflow: 'hidden' }}>
                <Skeleton width={options.cellEven ? (options.field === 'year' ? '30%' : '40%') : '60%'} height="1rem" />
            </div>
        );
    };

    const headerGroup = (
        <ColumnGroup>
            <Row>
                <Column header="Kehadiran" colSpan={1} />
                <Column header={"Total: 24"} />
                <Column header={"Hadir: 10"} />
                <Column header={"Tidak Hadir: 12"} />
            </Row>
            <Row>
                <Column header="#" sortable field="no" />
                <Column header="Tiket" sortable field="ticket" />
                <Column header="Nama" sortable field="name" />
                <Column header="Status" sortable field="status" />
            </Row>
        </ColumnGroup>
    );

    return (
        <div className="card">
            <DataTable value={virtualCars} scrollable scrollHeight="400px"
                       headerColumnGroup={headerGroup}
                       virtualScrollerOptions={{ lazy: true, onLazyLoad: loadCarsLazy, itemSize: 46, delay: 200, showLoader: true, loading: lazyLoading, loadingTemplate }}
                       tableStyle={{ minWidth: '50rem' }}>
                <Column field="id" header="Id" style={{ width: '20%' }}></Column>
                <Column field="vin" header="Vin" style={{ width: '20%' }}></Column>
                <Column field="year" header="Year" style={{ width: '20%' }}></Column>
                <Column field="brand" header="Brand" style={{ width: '20%' }}></Column>
                <Column field="color" header="Color" style={{ width: '20%' }}></Column>
            </DataTable>
        </div>
    );
}
