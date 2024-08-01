import { Link, Head } from '@inertiajs/react';
import React, {useContext, useState} from "react";
import Layout from '@/Layouts/layout/layout';
import PrimaryButton from "@/Components/PrimaryButton";
import {Dialog} from "primereact/dialog";
import {SelectButton} from "primereact/selectbutton";

export default function OtsSystem({ auth }) {
    const [visible, setVisible] = useState(false);
    const [value, setValue] = useState(null);
    const items = [
        { name: 'Nama', value: 1 },
        { name: 'Email', value: 2 },
        { name: 'No. WA', value: 3 }
    ];

    const footerContent = (
        <div>
            <PrimaryButton label="Simpan" icon="pi pi-check" className={"w-full"} onClick={() => setVisible(false)} />
        </div>
    );

    return (
        <>
            <Layout>
                <Head title="Participants" />
                <div className={"card col-sm-12 md:py-8"}>
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
                                <SelectButton className={"grid gap-2"} value={value} onChange={(e) => setValue(e.value)} optionLabel="name" options={items} multiple />
                            </div>
                        </div>
                    </Dialog>
                </div>
            </Layout>
        </>
    );
}
