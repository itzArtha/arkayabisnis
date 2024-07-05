import {Button} from 'primereact/button';
import React, {useContext, useEffect, useRef, useState} from 'react';
import Layout from "@/Layouts/layout/layout.jsx";
import DashboardInfoCard from "@/Components/DashboardInfoCard.jsx";
import { Head } from '@inertiajs/react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Card } from 'primereact/card';
import { Image } from 'primereact/image';
import PrimaryButton from '@/Components/PrimaryButton';

const Dashboard = () => {
    const [products, setProducts] = useState([]);

    return (
        <Layout>
            <Head title="Dashboard" />
            <div className="grid">
                <DashboardInfoCard title="Undangan"
                                   value="2"
                                   icon="ticket"
                                   iconColor="blue"
                                   descriptionValue=""
                                   descriptionText="Undangan yang telah dibuat">
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
                <h5>Undangan Terakhir</h5>
                <Card title="Undangan pernikahan" subTitle="15 Apr 2023   19.00 - 22.00" header={
                    <Image src="https://primefaces.org/cdn/primereact/images/galleria/galleria10.jpg" alt="Image" height="250" className={"w-full"} preview />
                }>
                        <div className="mt-4 gap-2 grid">
                            <span className="p-buttonset flex w-full">
                                <PrimaryButton className="w-full justify-content-center" outlined>Lihat Penjualan</PrimaryButton>
                                <Button icon="pi pi-file-edit" severity="warning"></Button>
                            </span>
                        </div>
                </Card>
                </div>
                </div>
                <div className="col-12 xl:col-8">
                    <div className="card">
                        <h5>Riwayat Penjualan</h5>
                        <DataTable value={products}>
                            <Column field="code" header="No"></Column>
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

