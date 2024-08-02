import {Link, Head, useForm, router} from '@inertiajs/react';
import React, {useContext, useState} from "react";
import Layout from '@/Layouts/layout/layout';
import OtsWelcome from "@/Pages/Event/OtsWelcome";
import OtsContent from "@/Pages/Event/OtsContent.jsx";
import {SelectButton} from "primereact/selectbutton";
import {Dialog} from "primereact/dialog";
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import OtsHeader from "@/Pages/Event/OtsHeader";

export default function OtsSystem({ ots, tickets }) {
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
            <Layout>
                <Head title="Sistem OTS" />
                <div className={"card col-sm-12"}>
                    <OtsHeader ots={ots} />
                    {ots && <OtsContent ots={ots} tickets={tickets} setModalSettingVisible={(e) => setVisible(e)} />}
                    {!ots && <OtsWelcome setModalSettingVisible={setVisible(e)} />}
                    <Dialog header="Atur Sistem OTS" draggable={false} visible={visible} className={"md:w-3 w-full mx-2"} onHide={() => {if (!visible) return; setVisible(false); }} footer={footerContent}>
                        <div className={"detail-buyer mb-4"}>
                            <p className="m-0">Data apa aja yang kamu perluin dari pembeli?</p>
                            <div className="mt-4 flex justify-content-center">
                                <SelectButton className={"grid gap-2"} value={data.fields} onChange={(e) => setData('fields', e.value)} optionLabel="name" options={fields} multiple />
                            </div>
                        </div>
                    </Dialog>
                </div>
            </Layout>
        </>
    );
}
