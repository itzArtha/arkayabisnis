import {Link, Head, useForm, router} from '@inertiajs/react';
import React, {useContext, useEffect, useState} from "react";
import Layout from '@/Layouts/layout/layout';
import OtsWelcome from "@/Pages/Event/OtsWelcome";
import {Toolbar} from "primereact/toolbar";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import moment from "moment";
import {Button} from "primereact/button";
import {Tag} from "primereact/tag";
import {SelectButton} from "primereact/selectbutton";
import {Dialog} from "primereact/dialog";
import {InputNumber} from "primereact/inputnumber";
import InputError from "@/Components/InputError.jsx";
import {IconField} from "primereact/iconfield";
import {InputIcon} from "primereact/inputicon";
import {InputText} from "primereact/inputtext";
import {Dropdown} from "primereact/dropdown";
import {Message} from "primereact/message";
import FormatRupiah from "@/Components/FormatRupiah.jsx";

export default function OtsContent({ ots, tickets, setModalSettingVisible }) {
    const [visible, setVisible] = useState(false);
    const [processing, setProcessing] = useState(false);
    const [payment, setPayment] = useState({});
    const [errors, setErrors] = useState({});
    const [calculation, setCalculation] = useState({
        subtotal: 0,
        admin: 0,
        total: 0,
    });
    const {data, setData, post, reset} = useForm({
        payment_methods: '',
        quantity: 0,
        ticket: '',
    });

    useEffect(() => {
        let subtotal = (data.ticket?.price ?? 0) * data.quantity;
        let admin = data.ticket?.price === 0 ? 0 : 5000 * data.quantity;

       setCalculation({
           ...calculation,
           subtotal: subtotal,
           admin: admin,
           total: subtotal + admin
       })
    }, [data]);

    const leftToolbarTemplate = () => {
        return <>
            <h5 className={"mb-0"}>OTS</h5>
        </>
    }

    const rightToolbarTemplate = () => {
        return <div className={"flex gap-2"}>
                <PrimaryButton label={"Pembeli"} icon={"pi pi-plus"}
                onClick={() => setVisible(true)}/>
            <PrimaryButton onClick={() => setModalSettingVisible(true)} icon={"pi pi-cog"} />
        </div>
    }

    const dateFormat = (rowData) => {
        return moment(rowData.start_date).format('MMMM Do YYYY, HH:mm');
    };

    const locationFormat = (rowData) => {
        return <div>
            <a target={"_blank"} href={rowData.location.url}>{rowData.location.name}</a>
        </div>;
    };

    const statusFormat = (rowData) => {
        return <Tag value={"Paid"} severity={"success"} />;
    };

    const submit = (e) => {
        e.preventDefault();
        setProcessing(true);
        axios.post(route('ots.transaction.store', {ots: ots.data.id}), data)
            .then((response) => {
                setPayment(response.data.data)
            }).catch((err) => {
                setErrors(err.response.data.errors);
        });
        setProcessing(false);
    };

    const payment_methods = [
        { name: 'QRIS', value: 'qris' },
        { name: 'Cash', value: 'cash' }
    ];

    const footerContent = (
        <div>
            {payment.qr_code && <PrimaryButton loading={processing} disabled={processing} onClick={() => setVisible(false)} label="Tutup" icon="pi pi-times" className={"w-full"} />}
            {!payment.qr_code && <PrimaryButton loading={processing} disabled={processing} onClick={submit} label="Checkout" icon="pi pi-check" className={"w-full"} />}
        </div>
    );

    return (
        <>
                <Head title="Sistem OTS" />
                <div>
                    <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>
                    <DataTable value={[]} rows={10} tableStyle={{ minWidth: '50rem' }}>
                        <Column header="#" body={(data, options) => options.rowIndex + 1}></Column>
                        <Column field="name" header="No. Tiket"></Column>
                        <Column field="start_date" header="Nama Tiket" body={dateFormat}></Column>
                        <Column field="location" header="Jumlah" body={locationFormat}></Column>
                        <Column field="location" header="Pembayaran" body={locationFormat}></Column>
                        <Column field="status" header="Status" body={statusFormat}></Column>
                    </DataTable>

                    <Dialog header="Pembelian OTS" draggable={false} position={"center"} visible={visible} className={"md:w-3 w-full mx-2"} onHide={() => {if (!visible) return; setVisible(false); }} footer={footerContent}>
                        <div className={"flex justify-content-center"}>
                            <div className={"detail-buyer"}>
                                { ots.data?.fields?.map((item, key) => (

                                <div className="mb-3" key={key}>
                                    <label htmlFor={item} className="block text-900 font-medium mb-2 capitalize">{item}</label>
                                        <InputText
                                            id={item}
                                            type="text"
                                            className="w-full"
                                            value={data[item]}
                                            onChange={(e) => setData(item, e.target.value)}
                                        />

                                    {item !== 'name' && <InputError message={errors[item]} />}
                                </div>

                                ))}
                                <div className="mb-3">
                                    <label className="block text-900 font-medium mb-2">Pilih tiket</label>
                                    <Dropdown value={data.ticket} onChange={(e) => setData('ticket', e.value)} options={tickets.data} optionLabel="title"
                                              placeholder="Pilih tiket" className="w-full" />
                                    <InputError message={errors.ticket} className=""/>
                                </div>
                                <div className="mb-3">
                                    <label className="block text-900 font-medium mb-2">Jumlah tiket</label>
                                    <InputNumber min={0} max={10} value={data.quantity} onValueChange={(e) => setData('quantity', e.value)} showButtons buttonLayout="horizontal"
                                              className={"w-full"}
                                                 incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus" />
                                    <InputError message={errors.quantity} className=""/>
                                </div>
                                <div className="mt-4">
                                    <div className={"mb-3 flex justify-content-center"}>
                                        <SelectButton className={"grid gap-2"} value={data.payment_methods} onChange={(e) => setData('payment_methods', e.value)} optionLabel="name" options={payment_methods} />
                                    </div>
                                    <InputError message={errors.payment_methods} className=""/>
                                    {data.payment_methods === 'cash' && <Message severity="warn" text="Pastikan dana jaminan kamu cukup ya!" className={"w-full"} />}
                                </div>
                                <div className={"mt-4 text-right"}>
                                    <div className={"mb-1"}>
                                        <span className="text-900 text-md font-semibold">Subtotal: {<FormatRupiah amount={calculation.subtotal} />}</span>
                                    </div>
                                    <div className={"mb-1"}>
                                        <span className="text-900 text-md font-semibold">Biaya Admin: {<FormatRupiah amount={calculation.admin} />}</span>
                                    </div>
                                    <div className={"mb-1"}>
                                        <span className="text-red-500 text-md font-semibold">Total: {<FormatRupiah amount={calculation.total} />}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={"mt-4"}>
                            <div className={"text-center"}>
                                <p>Silakan bayar melalui QRIS di bawah ini</p>
                                <img alt="qr code" src={payment.qr_code} className="w-12 xl:w-8" />
                            </div>
                        </div>
                    </Dialog>
                </div>

        </>
    );
}
