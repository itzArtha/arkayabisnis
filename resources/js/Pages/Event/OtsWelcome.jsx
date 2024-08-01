import {Link, Head, useForm, router} from '@inertiajs/react';
import React, {useContext, useState} from "react";
import Layout from '@/Layouts/layout/layout';
import PrimaryButton from "@/Components/PrimaryButton";
import {Dialog} from "primereact/dialog";
import {SelectButton} from "primereact/selectbutton";

export default function OtsWelcome() {
    const [visible, setVisible] = useState(false);
    const {data, setData, post, processing, errors, reset} = useForm({
        fields: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('ots.store'))
    };

    const fields = [
        { name: 'Nama', value: 'name' },
        { name: 'Email', value: 'email' },
        { name: 'No. WA', value: 'whatsapp' }
    ];

    const footerContent = (
        <div>
            <PrimaryButton onClick={submit} label="Simpan" icon="pi pi-check" className={"w-full"} />
        </div>
    );

    return (
        <>
                    <div className={"text-center"}>
                        <img className={"w-8 h-8 md:w-3 md:h-3"} src={import.meta.env.VITE_APP_URL + '/images/hero/settings.gif'} alt="Setting Icon"/>
                        <div className={"mt-4"}>
                            <h2>Ups, Sistem ots belum diatur, mau atur sekarang?</h2>
                            <p>Dengan sistem ots, kamu bisa berjualan di stand atau di lokasi acara dengan mudah dan cepat bersama kami.</p>
                            <div>
                                <PrimaryButton label={'Atur Sekarang!'} icon={"pi pi-key"}
                                               onClick={() => setVisible(true)} />
                            </div>
                        </div>
                    </div>
                    <Dialog header="Atur Sistem OTS" draggable={false} visible={visible} className={"md:w-3 w-full mx-2"} onHide={() => {if (!visible) return; setVisible(false); }} footer={footerContent}>
                        <div className={"detail-buyer mb-4"}>
                            <p className="m-0">Data apa aja yang kamu perluin dari pembeli?</p>
                            <div className="mt-4 flex justify-content-center">
                                <SelectButton className={"grid gap-2"} value={data.fields} onChange={(e) => setData('fields', e.value)} optionLabel="name" options={fields} multiple />
                            </div>
                        </div>
                    </Dialog>
        </>
    );
}
