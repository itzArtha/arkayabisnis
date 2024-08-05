import {Link, Head, useForm, router} from '@inertiajs/react';
import React, {useContext, useState} from "react";
import Layout from '@/Layouts/layout/layout';
import PrimaryButton from "@/Components/PrimaryButton";
import {Dialog} from "primereact/dialog";
import {SelectButton} from "primereact/selectbutton";

export default function OtsWelcome({setModalSettingVisible}) {

    return (
        <>
                    <div className={"text-center"}>
                        <img className={"w-8 h-8 md:w-3 md:h-3"} src={import.meta.env.VITE_APP_URL + '/images/hero/settings.gif'} alt="Setting Icon"/>
                        <div className={"mt-4"}>
                            <h2>Ups, Sistem ots belum diatur, mau atur sekarang?</h2>
                            <p>Dengan sistem ots, kamu bisa berjualan di stand atau di lokasi acara dengan mudah dan cepat bersama kami.</p>
                            <div>
                                <PrimaryButton label={'Atur Sekarang!'} icon={"pi pi-key"}
                                               onClick={() => setModalSettingVisible(true)} />
                            </div>
                        </div>
                    </div>

        </>
    );
}
