import {Link, Head, useForm, router, usePage} from '@inertiajs/react';
import React, {useContext, useState} from "react";
import Layout from '@/Layouts/layout/layout';
import OtsWelcome from "@/Pages/Event/OtsWelcome";
import OtsContent from "@/Pages/Event/OtsContent.jsx";
import {SelectButton} from "primereact/selectbutton";
import {Dialog} from "primereact/dialog";
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import OtsHeader from "@/Pages/Event/OtsHeader";
import InputError from "@/Components/InputError";

export default function OtsSystem() {
    const {ots, tickets} = usePage().props;
    const [visible, setVisible] = useState(false);
    const {data, setData, post, processing, errors, reset} = useForm({
        fields: ots?.data?.fields,
        fee: '0:100',
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

    const fees = [
        { name: '0k:5k', value: '0:100', description: '0k fee untuk penyelenggara, 5k fee untuk pembeli' },
        { name: '2,5k:2,5k', value: '50:50', description: '2,5k fee untuk penyelenggara dan pembeli' },
        { name: '5k:0k', value: '100:0', description: '5k fee untuk penyelenggara, 0k fee untuk pembeli' },
    ];

    function checkAdminFee()
    {
        return fees.filter((item) => item.value === data.fee)[0].description;
    }

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
                    {ots &&  <OtsHeader ots={ots} />}
                    {ots &&  <OtsContent ots={ots} tickets={tickets} setModalSettingVisible={(e) => setVisible(e)} />}
                    {!ots && <OtsWelcome setModalSettingVisible={(e) => setVisible(e)} />}
                    <Dialog header="Atur Sistem OTS" draggable={false} visible={visible} className={"md:w-3 w-full mx-2"} onHide={() => {if (!visible) return; setVisible(false); }} footer={footerContent}>
                        <div className={"detail-buyer mb-4"}>
                            <div className={"mb-3"}>
                                <p className="m-0">Data apa aja yang kamu perluin dari pembeli?</p>
                                <div className="mt-4 flex justify-content-center">
                                    <SelectButton className={"grid gap-2"} value={data.fields} onChange={(e) => setData('fields', e.value)} optionLabel="name" options={fields} multiple />
                                </div>
                                <InputError message={errors.fields} />
                            </div>
                            {/*<div>
                                <p className="m-0">Atur skema biaya admin</p>
                                <div className="mt-4 flex justify-content-center">
                                    <SelectButton className={"grid gap-2"} value={data.fee} onChange={(e) => setData('fee', e.value)} optionLabel="name" options={fees} />
                                </div>
                                <p className="m-0 text-sm">*{checkAdminFee()}</p>
                            </div>*/}
                        </div>
                    </Dialog>
                </div>
            </Layout>
        </>
    );
}
