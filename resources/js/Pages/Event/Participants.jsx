import { Link, Head } from '@inertiajs/react';
import React, {useContext} from "react";
import Layout from '@/Layouts/layout/layout';
import Table from "@/Components/Table";

export default function Participants({ participants }) {
    return (
        <>
            <Layout>
                <Head title="Participants" />
                <div className="card">
                        <h5>Peserta</h5>
                        <Table data={participants.data} />
                    </div>
            </Layout>
        </>
    );
}
