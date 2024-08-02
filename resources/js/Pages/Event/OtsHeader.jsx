import {Link, Head, useForm, router} from '@inertiajs/react';
import React, {useContext, useState} from "react";
import Layout from '@/Layouts/layout/layout';
import OtsWelcome from "@/Pages/Event/OtsWelcome";
import OtsContent from "@/Pages/Event/OtsContent.jsx";
import {SelectButton} from "primereact/selectbutton";
import {Dialog} from "primereact/dialog";
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import {Button} from "primereact/button";
import {InputNumber} from "primereact/inputnumber";

export default function OtsHeader({ ots }) {
    const [visible, setVisible] = useState(false);
    const {data, setData, post, processing, errors, reset} = useForm({
        type: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('ots.store'))
    };

    const types = [
        { name: 'Top Up', value: 'topup' },
        { name: 'Transfer Penghasilan', value: 'transfer' }
    ];

    function checkType()
    {
        return types.filter((item) => item.value === data.type)[0].name;
    }

    const footerContent = (
        <div>
            {data.type
            && <PrimaryButton onClick={submit} label={checkType()} icon="pi pi-check" className={"w-full"} />
            }
        </div>
    );

    return (
        <>
            <div className="grid mb-4">
                <div className="col-12 xl:col-6">
                    <div className="card relative overflow-hidden">
                        <div className="z-2 relative text-white">
                            <div className="text-xl text-900 font-semibold mb-3">Saldo Jaminan</div>
                            <div className="text-2xl text-primary mb-5 font-bold">Rp10.000</div>
                            <div className="flex align-items-center justify-content-between"><span
                                className="text-sm text-900 font-light">Khusus diperlukan untuk metode pembayaran cash</span><span
                                className="font-medium text-lg">
                                    <Button onClick={() => setVisible(true)} severity={"warning"} icon={"pi pi-arrow-up"} rounded />
                                </span></div>
                        </div>
                    </div>
                </div>
                <div className="col-12 xl:col-6">
                    <div className="card border-0 grid relative overflow-hidden mt-0">
                        <div className={"col-12 xl:col-6"}>
                            <div className="flex align-items-center justify-content-between mb-3">
                                <div className="text-900 text-xl font-semibold">QR Code Pembelian Mandiri</div>
                            </div>
                            <div className="flex align-items-center justify-content-between"><span
                                className="text-900 text-sm">Pembeli bisa membeli dengan mandiri menggunakan QR Code ini</span><span
                                className="text-600 font-medium text-lg"></span>
                            </div>
                            <div className={"mt-4"}>
                                <PrimaryButton label="QR Code" icon="pi pi-download" />
                            </div>
                        </div>
                        <div className={"col-12 xl:col-6 flex xl:justify-content-end justify-content-center"}>
                            <img alt="avatar" src="https://5.imimg.com/data5/SELLER/Default/2022/10/RR/YR/YM/13168808/cu-qr-codes-chennai-website-developers--500x500.png" className="w-12 xl:w-8" />
                        </div>
                    </div>
                </div>
            </div>
            <Dialog header="Atur Sistem OTS" draggable={false} visible={visible} className={"md:w-3 w-full mx-2"} onHide={() => {if (!visible) return; setVisible(false); }} footer={footerContent}>
                <div className={"flex justify-content-center"}>
                    <div className={"detail-buyer mb-4"}>
                        <div className={"mb-3"}>
                            <label className="block text-900 font-medium mb-2">Tambahkan saldo jaminan dengan cara apa?</label>
                            <div className="mt-4 flex justify-content-center">
                                <SelectButton className={"grid gap-2"} value={data.type} onChange={(e) => setData('type', e.value)} optionLabel="name" options={types} />
                            </div>
                        </div>
                        <div className={"mb-3"}>
                            <label htmlFor={'currency-id'} className="block text-900 font-medium mb-2">Jumlah</label>
                            <div>
                                <InputNumber className={"w-full"} inputId="currency-id" value={100} onValueChange={(e) => setData('amount', e.value)} mode="currency" currency="IDR" locale="id-ID" maxFractionDigits={0} />
                            </div>
                        </div>
                    </div>
                </div>
            </Dialog>
        </>
    );
}
