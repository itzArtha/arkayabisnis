import {Link, Head} from '@inertiajs/react';
import React, {useContext, useRef, useState} from "react";
import Layout from '@/Layouts/layout/layout';
import {Steps} from "primereact/steps";
import PrimaryButton from "@/Components/PrimaryButton";
import {Button} from "primereact/button";
import FieldInfoUndangan from "@/Pages/Undangan/Partials/FieldInfoUndangan";
import FieldBrideUndangan from "@/Pages/Undangan/Partials/FieldBrideUndangan";
import FieldThemeUndangan from "@/Pages/Undangan/Partials/FieldThemeUndangan";

export default function Welcome() {
    const [activeIndex, setActiveIndex] = useState(0);

    const itemRenderer = (item, itemIndex) => {
        const isActiveItem = activeIndex === itemIndex;
        const backgroundColor = isActiveItem ? 'var(--primary-color)' : 'var(--surface-b)';
        const textColor = isActiveItem ? 'var(--surface-b)' : 'var(--text-color-secondary)';

        return (
            <span
                className="inline-flex align-items-center justify-content-center align-items-center border-circle border-primary border-1 h-3rem w-3rem z-1 cursor-pointer"
                style={{backgroundColor: backgroundColor, color: textColor, marginTop: '-25px'}}
            >
                <i className={`${item.icon} text-xl`}/>
            </span>
        );
    };

    const items = [
        {
            icon: 'pi pi-user',
            template: (item) => itemRenderer(item, 0)
        },
        {
            icon: 'pi pi-users',
            template: (item) => itemRenderer(item, 1)
        },
        {
            icon: 'pi pi-check',
            template: (item) => itemRenderer(item, 2)
        }
    ];

    return (
        <>
            <Layout>
                <Head title="Buat Undangan"/>
                <div className="card">
                    <h5>Buat Undangan</h5>
                    <Steps model={items} activeIndex={activeIndex} readOnly className="m-2 pt-4"/>
                    <FieldInfoUndangan active={activeIndex} activeDefaultValue={0} />
                    <FieldBrideUndangan active={activeIndex} activeDefaultValue={1} />
                    <FieldThemeUndangan active={activeIndex} activeDefaultValue={2} />
                        <div className={"flex justify-content-end mt-8 gap-2"}>
                            {
                                activeIndex >= 1 ? <Button severity={"secondary"} label={"Kembali"} icon={"pi pi-arrow-left"} onClick={() => {
                                    setActiveIndex(activeIndex - 1)
                                }} /> : null
                            }
                            {
                                activeIndex === 2 ?
                                <PrimaryButton label={"Simpan"} icon={"pi pi-check"} onClick={() => {
                                console.log('ok')
                            }} /> :
                                    <PrimaryButton label={"Selanjutnya"} icon={"pi pi-arrow-right"} iconPos="right" onClick={() => {
                                        setActiveIndex(activeIndex + 1)
                                    }} />
                            }
                        </div>
                    </div>
            </Layout>
        </>
    );
}
