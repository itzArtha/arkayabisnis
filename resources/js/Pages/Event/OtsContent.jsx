import {Link, Head, useForm, router} from '@inertiajs/react';
import React, {useContext, useState} from "react";
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

export default function OtsContent({ ots }) {
    const [visible, setVisible] = useState(false);
    const {data, setData, post, processing, errors, reset} = useForm({
        payment_methods: '',
        quantity: 0
    });

    const leftToolbarTemplate = () => {
        return <>
            <h5 className={"mb-0"}>OTS</h5>
        </>
    }

    const rightToolbarTemplate = () => {
        return <div className={"flex gap-2"}>
                <PrimaryButton label={"Pembeli"} icon={"pi pi-plus"}
                onClick={() => setVisible(true)}/>
            <PrimaryButton icon={"pi pi-cog"} />
        </div>
    }

    const dateFormat = (rowData) => {
        return moment(rowData.start_date).format('MMMM Do YYYY, HH:mm');
    };

    const actionIconFormat = (rowData) => {
        return <div>
            <Button severity={"info"} rounded text icon={"pi pi-external-link"} />
            <Button severity={"warning"} rounded text icon={"pi pi-pencil"} />
        </div>;
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

        console.log(data);
    };

    const payment_methods = [
        { name: 'QRIS', value: 'qris' },
        { name: 'Cash', value: 'cash' }
    ];

    const footerContent = (
        <div>
            <PrimaryButton onClick={submit} label="Checkout" icon="pi pi-check" className={"w-full"} />
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
                            <div className={"detail-buyer mb-4"}>
                                { ots.settings?.fields?.map((item, key) => (

                                <div className="mb-3" key={key}>
                                    <label htmlFor={item} className="block text-900 font-medium mb-2 capitalize">{item}</label>
                                        <InputText
                                            id={item}
                                            type="text"
                                            className="w-full"
                                            value={data[item]}
                                            onChange={(e) => setData(item, e.target.value)}
                                        />

                                    <InputError message={errors[item]} />
                                </div>

                                ))}
                                <div className="mb-3">
                                <label className="block text-900 font-medium mb-2">Jumlah tiket</label>
                                    <InputNumber min={0} max={10} value={data.quantity} onValueChange={(e) => setData('quantity', e.value)} showButtons buttonLayout="horizontal"
                                              incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus" />
                                    <InputError message={errors.quantity} className=""/>
                                </div>
                                <div className="mt-4 flex justify-content-center">
                                    <SelectButton className={"grid gap-2"} value={data.payment_methods} onChange={(e) => setData('payment_methods', e.value)} optionLabel="name" options={payment_methods} />
                                    <InputError message={errors.payment_methods} className=""/>
                                </div>
                            </div>
                        </div>
                    </Dialog>
                </div>

        </>
    );
}
