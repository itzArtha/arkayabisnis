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
import FormatRupiah from "@/Components/FormatRupiah";
import { Message } from 'primereact/message';

export default function OtsHeader({ ots }) {
    const [visible, setVisible] = useState(false);
    const [payment, setPayment] = useState({});
    const [errors, setErrors] = useState({});
    const {data, setData, post, processing, reset} = useForm({
        type: 'topup',
        amount: 0,
        payment_method: 'MANDIRI'
    });

    const submit = (e) => {
        e.preventDefault();

        axios.post(route('ots.collateral.store', {ots: ots.data.id}), data)
        .then((response) => {
            setPayment(response.data)
        }).catch((err) => {
            setErrors(err.response.data.errors);
        });
    };

    const types = [
        { name: 'Top Up', value: 'topup' },
        { name: 'Transfer Penghasilan', value: 'transfer' }
    ];

    function checkType()
    {
        return types.filter((item) => item.value === data.type)[0].name;
    }

    function downloadImage(img)
    {
        const a = document.createElement('a')

        a.download = 'qr-code-ots.png'
        a.href = img
        a.click()
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
                            <div className="text-2xl text-primary mb-5 font-bold">{<FormatRupiah amount={ots.data.collateral} />}</div>
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
                                <PrimaryButton onClick={() => {
                                    downloadImage(ots.data.qr_code)
                                }} label="QR Code" icon="pi pi-download" />
                            </div>
                        </div>
                        <div className={"col-12 xl:col-6 flex xl:justify-content-end justify-content-center"}>
                            <img alt="qr code" src={ots.data.qr_code} className="w-12 xl:w-8" />
                        </div>
                    </div>
                </div>
            </div>
            <Dialog header="Tambah Jaminan" draggable={false} visible={visible} className={"md:w-3 w-full mx-2"} onHide={() => {if (!visible) return; setVisible(false); }} footer={footerContent}>
                <div className={"flex justify-content-center"}>
                    <div className={"detail-buyer mb-4"}>
                        <div className={"mb-3"}>
                            <p className="m-0">Tambahkan saldo jaminan dengan cara apa?</p>
                            <div className="mt-4 flex justify-content-center">
                                <SelectButton className={"grid gap-2"} value={data.type} onChange={(e) => setData('type', e.value)} optionLabel="name" options={types} />
                            </div>
                        </div>
                        <div className={"mb-3"}>
                            <label htmlFor={'currency-id'} className="block text-900 font-medium mb-2">Jumlah</label>
                            <div>
                                <InputNumber className={"w-full"} inputId="currency-id" value={data.amount} onValueChange={(e) => setData('amount', e.value)} mode="currency" currency="IDR" locale="id-ID" maxFractionDigits={0} />
                            </div>
                        </div>
                        {((payment.meta) && (data.type == 'topup')) && <div>
                            <p>Silakan dibayar ke nomor virtual account di bawah</p>
                            <div className='mt-2 text-center'>
                                <div className='my-2'>
                                    {!payment.confirmed && <Message severity="warn" text="Sedang menunggu pembayaran" />}
                                    {payment.confirmed && <Message severity="success" text="Pembayaran berhasil" />}
                                </div>
                                {!payment.confirmed && <div>
                                    <p className="m-0 text-red-500 text-md font-semibold">{payment.meta.channel_code}</p>
                                    <p className="m-0 text-red-500 text-md font-semibold">{payment.meta.virtual_account_number}</p>
                                    <p className="m-0 text-red-500 text-md font-semibold"><FormatRupiah amount={payment.amount} /></p>
                                </div>}
                            </div>
                        </div>}
                    </div>
                </div>
            </Dialog>
        </>
    );
}
