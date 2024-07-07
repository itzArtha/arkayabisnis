import { Link, Head } from '@inertiajs/react';
import {LayoutContext, LayoutProvider} from "@/Layouts/layout/context/layoutcontext.jsx";
import React, {useContext, useEffect, useState} from "react";
import Layout from '@/Layouts/layout/layout';
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import {Column} from "primereact/column";
import {DataTable} from "primereact/datatable";
import {Button} from "primereact/button";
import { Chart } from 'primereact/chart';

export default function Welcome({ auth }) {
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});

    useEffect(() => {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
        const data = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
                {
                    label: 'First Dataset',
                    data: [65, 59, 80, 81, 56, 55, 40],
                    fill: false,
                    borderColor: documentStyle.getPropertyValue('--blue-500'),
                    tension: 0.4
                },
                {
                    label: 'Second Dataset',
                    data: [28, 48, 40, 19, 86, 27, 90],
                    fill: false,
                    borderColor: documentStyle.getPropertyValue('--pink-500'),
                    tension: 0.4
                }
            ]
        };
        const options = {
            maintainAspectRatio: false,
            aspectRatio: 0.6,
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder
                    }
                },
                y: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder
                    }
                }
            }
        };

        setChartData(data);
        setChartOptions(options);
    }, []);

    return (
        <>
            <Layout>
                <Head title="Keuangan" />
                <h5>Keuangan</h5>
                <div className="grid mb-4">
                    <div className="col-12 xl:col-6">
                        <div className="card h-64 relative overflow-hidden">
                            <svg id="visual" viewBox="0 0 900 600" xmlns="http://www.w3.org/2000/svg"
                                 xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1"
                                 className="absolute left-0 top-0 h-full w-full z-1" preserveAspectRatio="none">
                                <rect x="0" y="0" width="900" height="600" fill="#F59E0B"></rect>
                                <path
                                    d="M0 400L30 386.5C60 373 120 346 180 334.8C240 323.7 300 328.3 360 345.2C420 362 480 391 540 392C600 393 660 366 720 355.2C780 344.3 840 349.7 870 352.3L900 355L900 601L870 601C840 601 780 601 720 601C660 601 600 601 540 601C480 601 420 601 360 601C300 601 240 601 180 601C120 601 60 601 30 601L0 601Z"
                                    fill="#eab308" stroke-linecap="round" stroke-linejoin="miter"></path>
                            </svg>
                            <div className="z-2 relative text-white">
                                <div className="text-xl font-semibold mb-3">Saldo</div>
                                <div className="text-2xl mb-5 font-bold">Rp150.000.000</div>
                                <div className="flex align-items-center justify-content-between"><span
                                    className="text-sm font-light">Penarikan terakhir: Rp1.000.000</span><span
                                    className="font-medium text-lg">
                                    <Button className={"text-white"} icon={"pi pi-arrow-down"} rounded outlined />
                                </span></div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 xl:col-6">
                        <div className="card h-64">
                            <div className="flex align-items-center justify-content-between mb-3">
                                <div className="text-900 text-xl font-semibold">Rekening Bank</div>
                                <img alt="avatar" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Bank_Central_Asia.svg/1200px-Bank_Central_Asia.svg.png" className="h-1rem" />
                            </div>
                            <div className="text-900 text-2xl text-primary mb-5 font-bold">I KM TRIYANA ARTHA P</div>
                            <div className="flex align-items-center justify-content-between"><span
                                className="text-900 text-lg">**** **** 0060</span><span
                                className="text-600 font-medium text-lg">
                                <PrimaryButton icon={"pi pi-pencil"} rounded outlined />
                            </span></div>
                        </div>
                    </div>
                    <div className={"col-12"}>
                        <div className="card">
                            <div className="text-900 text-xl font-semibold">Realita vs Target</div>
                            <Chart className={"h-12"} type="line" data={chartData} options={chartOptions} />
                        </div>
                    </div>
                    <div className="col-12 xl:col-8">
                    <div className="card">
                        <div className="text-900 text-xl font-semibold mb-3">Riwayat Pemasukan</div>
                        <div className={"mt-2"}>
                            <DataTable value={[]}>
                                <Column field="code" header="#"></Column>
                                <Column field="name" header="Nama"></Column>
                                <Column field="code" header="Jumlah"></Column>
                                <Column field="code" header="Bank"></Column>
                                <Column field="category" header="Status"></Column>
                            </DataTable>
                        </div>
                    </div>
                    </div>
                    <div className="col-12 xl:col-4">
                        <div className="card">
                            <div className="text-900 text-xl font-semibold mb-3">Riwayat Penarikan</div>
                            <div className={"mt-2"}>
                                <DataTable value={[]}>
                                    <Column field="code" header="#"></Column>
                                    <Column field="name" header="Bank"></Column>
                                    <Column field="code" header="Jumlah"></Column>
                                    <Column field="category" header="Status"></Column>
                                </DataTable>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    );
}
