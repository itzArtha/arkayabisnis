import { Link, Head } from '@inertiajs/react';
import React, {useContext} from "react";
import Layout from '@/Layouts/layout/layout';
import { Button } from 'primereact/button';
import Table from "@/Components/Table";

export default function OtsSystem({ auth }) {
    return (
        <>
            <Layout>
                <Head title="Participants" />
                <div className="card">
                        <h5>Pembelian OTS</h5>
                        <Table />
                    </div>
            </Layout>
        </>
    );
}
