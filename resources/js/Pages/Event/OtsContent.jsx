import {Link, Head, useForm, router, usePage} from '@inertiajs/react';
import React, {useContext, useEffect, useRef, useState} from "react";
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
import {Paginator} from "primereact/paginator";
import toast from 'react-hot-toast';

export default function OtsContent({ ots, tickets, setModalSettingVisible }) {
    const [visible, setVisible] = useState(false);
    const [processing, setProcessing] = useState(false);
    const [payment, setPayment] = useState({});
    const [errors, setErrors] = useState({});

    const [calculation, setCalculation] = useState({
        subtotal: 0,
        admin: 0,
        transaction: 0,
        total: 0,
    });
    const {data, setData, reset} = useForm({
        payment_methods: '',
        quantity: 0,
        ticket: '',
    });
    const {payments} = usePage().props

    useEffect(() => {
        let subtotal = (data.ticket?.price ?? 0) * data.quantity;
        let admin = data.ticket?.price === 0 ? 0 : 5000 * data.quantity;
        let transaction = data.payment_methods === 'QRIS' ? subtotal > 100000 ? 1000 : 0 : 0;

       setCalculation({
           ...calculation,
           subtotal: subtotal,
           admin: admin,
           transaction: transaction,
           total: subtotal + admin + transaction
       })
    }, [data]);

    useEffect(() => {
        window.Echo.join(`payment-status.${ots.data.id}`)
        .listen('.SendWebhookPaymentStatusEvent', (e) => onUpdateWebhook(e));
    }, []);

    const onUpdateWebhook = (paymentWebhook) => {
        toast.success(`Pembayaran sebesar ${paymentWebhook.total} berhasil`);

        setPayment(paymentWebhook);
    }

    const onPageChange = (event) => {
        router.visit(route(route().current(), {
            page: event.page + 1
        }), { preserveScroll: true })
    };

    const leftToolbarTemplate = () => {
        return <>
            <h5 className={"mb-0"}>OTS</h5>
        </>
    }

    const rightToolbarTemplate = () => {
        return <div className={"flex gap-2"}>
                <PrimaryButton label={"Pembeli"} icon={"pi pi-plus"}
                onClick={() => openPaymentModal()}/>
            <PrimaryButton onClick={() => setModalSettingVisible(true)} icon={"pi pi-cog"} />
        </div>
    }

    const dateFormat = (rowData) => {
        return moment(rowData.created_at).format('MMMM Do YYYY, HH:mm');
    };

    const statusFormat = (rowData) => {
        return <Tag value={rowData.status.label} severity={rowData.status.severity} />;
    };

    const submit = async (e) => {
        e.preventDefault();
        setProcessing(true);
        await axios.post(route('ots.transaction.store', {ots: ots.data.id}), data)
            .then((response) => {
                setPayment(response.data.data)
            }).catch((err) => {
                setErrors(err.response.data.errors);
        });
        setProcessing(false);
    };

    function openPaymentModal()
    {
        setVisible(true);
        setPayment({});
        reset()
    }

    const payment_methods = [
        { name: 'QRIS', value: 'QRIS' },
        { name: 'Cash', value: 'CASH' }
    ];

    const footerContent = (
        <div>
            {payment.status === 'settlement' && <PrimaryButton disabled={processing} onClick={() => setVisible(false)} label="Tutup" icon="pi pi-times" className={"w-full"} />}
            {payment.status !== 'settlement' && <PrimaryButton disabled={processing} onClick={submit} label="Checkout" icon="pi pi-check" className={"w-full"} />}
        </div>
    );

    return (
        <>
                <Head title="Sistem OTS" />
                <div>
                    <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>
                    <DataTable value={payments?.data} rows={payments.meta.per_page} tableStyle={{ minWidth: '50rem' }}>
                        <Column header="#" body={(data, options) => options.rowIndex + payments.meta.from}></Column>
                        <Column field="ticket_name" header="Nama Tiket" ></Column>
                        <Column field="buyer_phone" header="No. Whatsapp" ></Column>
                        <Column field="quantity" header="Jumlah"></Column>
                        <Column field="total" header="Total" body={(rowData) => <FormatRupiah amount={rowData.total} />}></Column>
                        <Column field="channel" header="Pembayaran"></Column>
                        <Column field="status" header="Status" body={statusFormat}></Column>
                        <Column field="created_at" header="Tanggal" body={dateFormat}></Column>
                    </DataTable>
                    <Paginator first={payments.meta.from} rows={payments.meta.per_page} totalRecords={payments.meta.total} onPageChange={onPageChange} />

                    <Dialog header="Pembelian OTS" draggable={false} position={"center"} visible={visible} className={"md:w-4 w-full mx-2"} onHide={() => {if (!visible) return; setVisible(false); }} footer={footerContent}>
                        <div className={"flex justify-content-center"}>
                            <div className={"detail-buyer"}>
                                { ots.data?.fields?.map((item, key) => (

                                <div className="mb-3" key={key}>
                                    <label htmlFor={item} className="block text-900 font-medium mb-2 capitalize">{item}</label>
                                        <InputText
                                            id={item}
                                            type="text"
                                            className="w-full"
                                            placeholder={item === 'whatsapp' ? '081237123456' : ''}
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
                                    {data.payment_methods === 'CASH' && <Message severity="warn" text="Pastikan dana jaminan kamu cukup ya!" className={"w-full"} />}
                                </div>
                                <div className={"mt-4 text-right"}>
                                    <div className={"mb-1"}>
                                        <span className="text-900 text-md font-semibold">Subtotal: {<FormatRupiah amount={calculation.subtotal} />}</span>
                                    </div>
                                    <div className={"mb-1"}>
                                        <span className="text-900 text-md font-semibold">Biaya Admin: {<FormatRupiah amount={calculation.admin} />}</span>
                                    </div>
                                    <div className={"mb-1"}>
                                        <span className="text-900 text-md font-semibold">Biaya Transaksi: {<FormatRupiah amount={calculation.transaction} />}</span>
                                    </div>
                                    <div className={"mb-1"}>
                                        <span className="text-red-500 text-md font-semibold">Total: {<FormatRupiah amount={calculation.total} />}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {payment.status === 'settlement' && <div className={"mt-4"}>
                            <div className={"text-center"}>
                                <p>Pembayaran berhasil, tiket akan dikirimkan via whatsapp</p>
                                <Message severity="success" text="Pembayaran berhasil" />
                            </div>
                        </div>}

                        {(payment.qr_code && payment.status !== 'settlement') && <div className={"mt-4"}>
                            <div className={"text-center"}>
                                <p>Silakan bayar melalui QRIS di bawah ini, tiket akan dikirimkan via whatsapp</p>
                                <img alt="qr code" src={payment.qr_code} className="w-12 xl:w-8" />
                            </div>
                        </div>}
                    </Dialog>
                </div>

        </>
    );
}
