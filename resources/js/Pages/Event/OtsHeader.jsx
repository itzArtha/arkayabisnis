import {Link, Head, useForm, router, usePage} from '@inertiajs/react';
import React, {useContext, useState, useEffect} from "react";
import {SelectButton} from "primereact/selectbutton";
import {Dialog} from "primereact/dialog";
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import {Button} from "primereact/button";
import {InputNumber} from "primereact/inputnumber";
import FormatRupiah from "@/Components/FormatRupiah";
import { Message } from 'primereact/message';
import InputError from "@/Components/InputError.jsx";
import toast from "react-hot-toast";
import { Dropdown } from 'primereact/dropdown';

export default function OtsHeader({ ots }) {
    const [visible, setVisible] = useState(false);
    const [visibleWd, setVisibleWd] = useState(false);
    const [processing, setProcessing] = useState(false);
    const [payment, setPayment] = useState({});
    const [errors, setErrors] = useState({});
    const {data, setData, post, reset} = useForm({
        type: 'topup',
        amount: 0,
        payment_method: '',
        bank_id: ''
    });

    const {banks} = usePage().props;

    const submit = (e) => {
        e.preventDefault();
        setProcessing(true);

        axios.post(route('ots.collateral.store', {ots: ots.data.id}), data)
        .then((response) => {
            setPayment(response.data)
            setErrors({});

            setTimeout(() => {
                if(payment.confirmed) {
                    window.location.reload();
                }
            }, 2000)
        }).catch((err) => {
            setErrors(err.response.data.errors);
        });

        setProcessing(false);
    };

    const withdraw = (e) => {
        e.preventDefault();
        setProcessing(true);

        axios.post(route('ots.collateral.withdraw', {ots: ots.data.id}), data)
        .then((response) => {
            setPayment(response.data)
            setErrors({});

            toast.success(`Permintaan penarikan dana berhasil`);

            setTimeout(() => {
                if(payment.confirmed) {
                    window.location.reload();
                }
            }, 2000)
        }).catch((err) => {
            setErrors(err.response.data.errors);
        });

        setProcessing(false);
    }

    useEffect(() => {
        const subscribed = window.Echo.join(`topup-status.${ots.data.id}`)
            .listen('.SendWebhookTopupStatusEvent', (e) => onUpdateWebhook(e));
    }, []);

    const onUpdateWebhook = () => {
        toast.success(`Topup berhasil`);

        setTimeout(() => {
            window.location.href = route('ots.event.index', route().params);
        }, 2000)
    }

    const methods = [
        { name: 'BRI', value: 'BRI' },
        { name: 'BNI', value: 'BNI' },
        { name: 'Permata', value: 'Permata' },
    ];

    function checkType()
    {
        return data.type;
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
            && <PrimaryButton loading={processing} disabled={processing} onClick={submit} label={checkType()} icon="pi pi-check" className={"w-full"} />
            }
        </div>
    );

    const footerContentWd = (
        <div>
            {data.type
            && <PrimaryButton loading={processing} disabled={processing} onClick={withdraw} label={'Withdraw'} icon="pi pi-check" className={"w-full"} />
            }
        </div>
    );

    return (
        <>
            <div className="grid mb-4">
                <div className="col-12 xl:col-6">
                    <div className="card relative overflow-hidden">
                        <div className="z-2 relative text-white">
                            <div className="text-xl text-900 font-semibold">Saldo Jaminan</div>
                            <span className="text-sm text-900 font-light">Khusus diperlukan untuk metode pembayaran cash</span>
                            <div className="mt-2 text-2xl text-primary mb-5 font-bold">{<FormatRupiah amount={ots.data.collateral} />}</div>
                            <div className="md:flex align-items-center md:justify-content-between">
                                <span
                                className="font-medium text-lg">
                                    <Button className='mt-4' onClick={() => setVisible(true)} severity={"warning"} label='Top Up' icon={"pi pi-arrow-up"} rounded />
                                    <Button className='ml-2 mt-4' onClick={() => setVisibleWd(true)} severity={"warning"} label='Withdraw' icon={"pi pi-arrow-down"} rounded />
                                </span></div>
                        </div>
                    </div>
                </div>
                <div className="col-12 xl:col-6">
                    {/*<div className="card border-0 grid relative overflow-hidden mt-0">
                        <div className={"col-12 md:col-6"}>
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
                        <div className={"col-12 md:col-6 flex xl:justify-content-end justify-content-end"}>
                            <img alt="qr code" src={ots.data.qr_code} className="w-full md:w-8rem xl:w-12rem" />
                        </div>
                    </div>*/}
                </div>
            </div>
            <Dialog header="Tambah Jaminan" draggable={false} visible={visible} className={"md:w-3 w-full mx-2"} onHide={() => {if (!visible) return; setVisible(false); }} footer={footerContent}>
                <div className={"flex justify-content-center"}>
                    <div className={"detail-buyer my-4"}>
                        <div className={"mb-3"}>
                            <p className="m-0">Tambahkan saldo jaminan dengan metode apa?</p>
                            <div className="mt-4 flex justify-content-center">
                                <SelectButton className={"grid gap-2"} value={data.payment_method} onChange={(e) => setData('payment_method', e.value)} optionLabel="name" options={methods} />
                            </div>
                        </div>
                        <div className={"mb-3"}>
                            <label htmlFor={'currency-id'} className="block text-900 font-medium mb-2">Jumlah</label>
                            <div>
                                <InputNumber className={"w-full"} inputId="currency-id" value={data.amount} onValueChange={(e) => setData('amount', e.value)} mode="currency" currency="IDR" locale="id-ID" maxFractionDigits={0} />
                                <InputError message={errors?.amount} className=""/>
                            </div>
                        </div>
                        <div className={"mt-2 text-center"}>
                            {payment.confirmed && <Message severity="success" text="Transfer penghasilan berhasil" />}
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

            <Dialog header="Tarik Jaminan" draggable={false} visible={visibleWd} className={"md:w-3 w-full mx-2"} onHide={() => {if (!visibleWd) return; setVisibleWd(false); }} footer={footerContentWd}>
                <div>
                    <div className={"detail-buyer my-4"}>
                        <div className={"mb-3"}>
                        <label className="block text-900 font-medium my-2">Pilih rekening penerima</label>
                                    <Dropdown value={data.bank_id} onChange={(e) => setData('bank_id', e.value)} options={banks} optionLabel="holder_name"
                                              placeholder="Pilih rekening" className="w-full" />
                                    <InputError message={errors?.bank_id} className=""/>
                        </div>
                        <div className={"mb-3"}>
                            <label htmlFor={'currency-id'} className="block text-900 font-medium mb-2">Jumlah</label>
                            <div>
                                <InputNumber className={"w-full"} inputId="currency-id" value={data.amount} onValueChange={(e) => setData('amount', e.value)} mode="currency" currency="IDR" locale="id-ID" maxFractionDigits={0} />
                                <InputError message={errors?.amount} className=""/>
                            </div>
                        </div>
                        <div className={"mt-2 text-center"}>
                            {payment.confirmed && <Message severity="success" text="Permintaan penarikan berhasil" />}
                        </div>
                    </div>
                </div>
            </Dialog>
        </>
    );
}
