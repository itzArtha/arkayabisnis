import React, { useEffect, useRef} from 'react';
import Layout from "@/Layouts/layout/layout.jsx";
import { Head } from '@inertiajs/react';
import PrimaryButton from "@/Components/PrimaryButton.jsx";

const Dashboard = () => {
    return (
        <Layout>
            <Head title="Dashboard" />
            <div className={"text-center"}>
                <img className={"w-8 h-8 md:w-3 md:h-3"} src={'/images/hero/settings.gif'} alt="Setting Icon"/>
                <div className={"mt-4"}>
                    <h2>Pilih event di sebelah</h2>
                    <p>Dengan sistem ots, kamu bisa berjualan di stand atau di lokasi acara dengan mudah dan cepat bersama kami.</p>
                </div>
            </div>
        </Layout>
    );
};

export default Dashboard;

