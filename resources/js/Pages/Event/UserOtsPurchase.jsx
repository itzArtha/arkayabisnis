import {useEffect, useState} from 'react';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import {Head, Link, useForm, usePage} from '@inertiajs/react';
import {InputText} from "primereact/inputtext";
import {Button} from "primereact/button";
import ApplicationLogo from '@/Components/ApplicationLogo';
import {Dropdown} from "primereact/dropdown";
import {InputNumber} from "primereact/inputnumber";
import {SelectButton} from "primereact/selectbutton";
import {Message} from "primereact/message";
import FormatRupiah from "@/Components/FormatRupiah.jsx";
import {Dialog} from "primereact/dialog";
import toast from "react-hot-toast";

export default function Login({ots, tickets}) {
    const [visible, setVisible] = useState(false);
    const [processing, setProcessing] = useState(false);
    const [payment, setPayment] = useState({});
    const [errors, setErrors] = useState({});
    const [calculation, setCalculation] = useState({
        subtotal: 0,
        admin: 0,
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

        setCalculation({
            ...calculation,
            subtotal: subtotal,
            admin: admin,
            total: subtotal + admin
        })
    }, [data]);

    const submit = async (e) => {
        e.preventDefault();
        setProcessing(true);
        await axios.post(route('ots.transaction.store', {ots: ots.data.id}), data)
            .then((response) => {
                setPayment(response.data.data)
                setVisible(true)
            }).catch((err) => {
            setErrors(err.response.data.errors);
        });
        setProcessing(false);
    };

    useEffect(() => {
        window.Echo.join(`payment-status.${ots.data.id}`)
            .listen('.SendWebhookPaymentStatusEvent', (e) => onUpdateWebhook(e));
    }, []);

    const onUpdateWebhook = (paymentWebhook) => {
        toast.success(`Pembayaran berhasil`);

        setTimeout(() => {
            window.location.href = route('ots.user.tickets', paymentWebhook.reference_id);
        }, 1000)
    }

    const payment_methods = [
        { name: 'BNI', value: 'BNI' },
        { name: 'Mandiri', value: 'MANDIRI' },
        { name: 'Permata', value: 'PERMATA' },
        { name: 'BRI', value: 'BRI' }
    ];

    return (
        <div>
            <Head title={`Beli tiket`}/>

            {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}

            <div className="grid grid-nogutter surface-0 text-800">
                <div className="col-12 flex justify-content-center p-4 h-screen">
                    <section>
                        <div className="mb-5">
                            <div className="shrink-0 mb-4">
                                <ApplicationLogo className="block w-4 h-4 fill-current text-gray-800" />
                            </div>
                        </div>
                        <div className={"mt-8 px-4 justify-content-center items-center"}>
                            <div className="text-900 text-3xl font-medium mb-1">Halo, yuk beli tiketnya 👋🏻</div>
                            <p className={"text-400 mb-4"}>Lengkapi data di bawah untuk membeli tiket</p>
                            <form onSubmit={submit}>
                                <div>
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
                                            <label className="block text-900 font-medium mb-3">Metode Pembayaran</label>
                                            <div className={"mb-3 flex justify-content-center"}>
                                                <SelectButton className={"grid gap-2"} value={data.payment_methods} onChange={(e) => setData('payment_methods', e.value)} optionLabel="name" options={payment_methods} />
                                            </div>
                                            <InputError message={errors.payment_methods} className=""/>
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
                                    <div className={"mt-4"}>
                                        <PrimaryButton label="Beli Tiket" icon="pi pi-money-bill" className="w-full mb-2" disabled={processing}/>
                                    </div>
                                </div>
                            </form>
                            <Dialog header="Detail Pembayaran" draggable={false} visible={visible} className={"m-2"} onHide={() => {if (!visible) return; setVisible(false); }}>
                                <div className={"text-center"}>
                                    <p>Silakan bayar melalui bank di bawah ini, tiket akan dikirimkan via email/whatsapp</p>
                                    <div className={"my-3"}>
                                        <p className="m-0 text-red-500 text-md font-semibold">{payment.channel_code}</p>
                                        <p className="m-0 text-red-500 text-md font-semibold">{payment.virtual_account_number}</p>
                                        <p className="m-0 text-red-500 text-md font-semibold"><FormatRupiah amount={payment.total} /></p>
                                    </div>
                                    <p>Jangan tutup halaman ini hingga selesai membayar, tiket juga akan muncul disini</p>
                                </div>
                            </Dialog>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
