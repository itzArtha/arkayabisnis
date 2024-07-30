import {Button} from 'primereact/button';
import React, {useContext, useEffect, useRef, useState} from 'react';
import Layout from "@/Layouts/layout/layout.jsx";
import DashboardInfoCard from "@/Components/DashboardInfoCard.jsx";
import { Head } from '@inertiajs/react';
import LineChart from "@/Components/LineChart.jsx";
import {Messages} from "primereact/messages";
import EventCard from "@/Components/EventCard.jsx";

const Dashboard = ({event, stats}) => {
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
                                   value={stats.total_tickets}
                                   icon="ticket"
                                   iconColor="blue"
                                   descriptionText="Tipe tiket yang tersedia">
                </DashboardInfoCard>
                <DashboardInfoCard title="Penjualan Harian"
                                   value={stats.daily_sales}
                                   icon="money-bill"
                                   iconColor="orange"
                                   descriptionValue="%52+"
                                   descriptionText="daripada kemarin">
                </DashboardInfoCard>
                <DashboardInfoCard title="Pengunjung Harian" value={stats.daily_visitors}
                                   descriptionValue={"+0"}
                                   icon="chart-line"
                                   iconColor="cyan"
                                   descriptionText="daripada kemarin">
                </DashboardInfoCard>
                <DashboardInfoCard title="Peserta" value={stats.total_participants}
                                   descriptionValue="+85"
                                   icon="users"
                                   iconColor="purple"
                                   descriptionText="daripada kemarin">
                </DashboardInfoCard>

                <div className="col-12 xl:col-4">
                    <div className="card">
                    <h5>Event Preview</h5>
                        <EventCard data={event.data} />
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

