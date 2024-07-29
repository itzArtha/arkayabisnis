import {Button} from 'primereact/button';
import React, {useContext, useEffect, useRef, useState} from 'react';
import Layout from "@/Layouts/layout/layout.jsx";
import DashboardInfoCard from "@/Components/DashboardInfoCard.jsx";
import { Head } from '@inertiajs/react';
import { Card } from 'primereact/card';
import { Badge } from 'primereact/badge';
import PrimaryButton from '@/Components/PrimaryButton';
import LineChart from "@/Components/LineChart.jsx";
import {Messages} from "primereact/messages";

const Dashboard = () => {
    const msgs = useRef(null);

    useEffect(() => {
        if (msgs.current) {
            msgs.current.clear();
            msgs.current.show([
                { sticky: true, severity: 'warn', summary: 'Perlu Dokumen!', detail: 'Event kamu perlu dokumen pendukung untuk proses verifikasi', closable: false }
            ]);
        }
    });

    return (
        <Layout>
            <Head title="Dashboard" />
            <Messages ref={msgs} />
            <div className="grid">
                <DashboardInfoCard title="Tiket"
                                   value="2"
                                   icon="ticket"
                                   iconColor="blue"
                                   descriptionValue=""
                                   descriptionText="Tipe tiket yang tersedia">
                </DashboardInfoCard>
                <DashboardInfoCard title="Penjualan Harian"
                                   value="Rp2.100.000"
                                   icon="money-bill"
                                   iconColor="orange"
                                   descriptionValue="%52+"
                                   descriptionText="daripada kemarin">
                </DashboardInfoCard>
                <DashboardInfoCard title="Pengunjung Harian" value="28.441"
                                   descriptionValue="+520"
                                   icon="chart-line"
                                   iconColor="cyan"
                                   descriptionText="daripada kemarin">
                </DashboardInfoCard>
                <DashboardInfoCard title="Peserta" value="120"
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
                            <span className="p-buttonset flex w-full">
                                <PrimaryButton className="w-full justify-content-center">Edit Event</PrimaryButton>
                                <Button icon="pi pi-eye" severity="warning"></Button>
                            </span>
                        </div>
                </Card>
                </div>
                </div>
                <div className="col-12 xl:col-8">
                    <div className="card">
                        <h5>Pengunjung vs Transaksi</h5>
                        <LineChart className={"h-12"} type="line" datasets={[]} />
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Dashboard;

