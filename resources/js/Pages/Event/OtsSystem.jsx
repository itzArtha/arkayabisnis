import {Link, Head, useForm, router} from '@inertiajs/react';
import React, {useContext, useState} from "react";
import Layout from '@/Layouts/layout/layout';
import OtsWelcome from "@/Pages/Event/OtsWelcome";
import OtsContent from "@/Pages/Event/OtsContent.jsx";

export default function OtsSystem({ ots }) {
    return (
        <>
            <Layout>
                <Head title="Sistem OTS" />
                <div className={"card col-sm-12 md:py-8"}>
                    {ots && <OtsContent />}
                    {!ots && <OtsWelcome />}
                </div>
            </Layout>
        </>
    );
}
