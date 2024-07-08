import { Link, Head } from '@inertiajs/react';
import React, {useContext} from "react";
import Layout from '@/Layouts/layout/layout';
import { Button } from 'primereact/button';
import Table from "@/Components/Table";

export default function Participants({ auth }) {
    return (
        <>
            <Layout>
                <Head title="Participants" />
                <div className="card">
                        <h5>Peserta</h5>
                        <Table />
                    </div>
            </Layout>
        </>
    );
}
