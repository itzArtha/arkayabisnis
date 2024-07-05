import {Button} from 'primereact/button';
import {Chart} from 'primereact/chart';
import {Menu} from 'primereact/menu';
import React, {useContext, useEffect, useRef, useState} from 'react';
import {LayoutContext} from '@/Layouts/layout/context/layoutcontext';
import Layout from "@/Layouts/layout/layout.jsx";
import DashboardInfoCard from "@/Components/DashboardInfoCard.jsx";
import { Head } from '@inertiajs/react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Card } from 'primereact/card';
import { Badge } from 'primereact/badge';
import PrimaryButton from '@/Components/PrimaryButton';

const Dashboard = () => {
    const [products, setProducts] = useState([]);

    return (
        <Layout>
            <Head title="Dashboard" />
            <div className="grid">
                <DashboardInfoCard title="Tiket"
                                   value="2"
                                   icon="ticket"
                                   iconColor="blue"
                                   descriptionValue=""
                                   descriptionText="Tipe tiket yang tersedia">
                </DashboardInfoCard>
                <DashboardInfoCard title="Penjualan"
                                   value="Rp2.100.000"
                                   icon="money-bill"
                                   iconColor="orange"
                                   descriptionValue="%52+"
                                   descriptionText="daripada kemarin">
                </DashboardInfoCard>
                <DashboardInfoCard title="Transaksi" value="28.441"
                                   descriptionValue="+520"
                                   icon="chart-line"
                                   iconColor="cyan"
                                   descriptionText="daripada kemarin">
                </DashboardInfoCard>
                <DashboardInfoCard title="Pengunjung" value="152"
                                   descriptionValue="+85"
                                   icon="users"
                                   iconColor="purple"
                                   descriptionText="daripada kemarin">
                </DashboardInfoCard>

                <div className="col-12 xl:col-4">
                <div className="card">
                <h5>Event Preview</h5>
                <Card title="Kramat Unmas" subTitle="15 Apr 2023   19.00 - 22.00" header={<img alt="Event" src="https://assets-gerra.s3.ap-southeast-1.amazonaws.com/organizations/1690/events/JgV1lvaoSQEPyDC6dBP7z4PM03YP60oI8fd8sQNm.jpg" />}>
             
                        <div className="grid gap-1">
                            <div className="p-col">
                                <Badge value="Live" severity="success" />
                            </div>
                            <div className="p-col">
                                <Badge value="Offline event" severity="warning" />
                            </div>
                            <div className="p-col">
                                <Badge value="Hiburan" severity="info" />
                            </div>
                        </div>
                        <div className="mt-4 gap-2 grid">
                        <PrimaryButton>Lihat Penjualan</PrimaryButton>
                        <Button label="Edit" severity="warning" outlined />
                        </div>
               
                </Card>
                </div>
                </div>
                <div className="col-12 xl:col-8">
                    <div className="card">
                        <h5>Riwayat Penjualan</h5>
                        <DataTable value={products}>
                            <Column field="code" header="Nama"></Column>
                            <Column field="name" header="Tiket"></Column>
                            <Column field="category" header="Nominal"></Column>
                            <Column field="category" header="Status"></Column>
                            <Column field="quantity" header="Tanggal"></Column>
                        </DataTable>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Dashboard;

