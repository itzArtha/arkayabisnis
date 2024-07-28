import { useEffect } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import { useState } from 'react';
import CreateEvent from "@/Pages/Auth/Components/CreateEvent.jsx";
import CreateAccount from "@/Pages/Auth/Components/CreateAccount";

export default function Register({heroImage}) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        event_title: '',
        whatsapp: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route('register'));
    };

    return (
        <GuestLayout>
            <Head title="Register" />

            <div className="grid grid-nogutter surface-0 text-800">
                <div className="col-12 md:col-8 overflow-hidden hidden md:block h-screen">
                    <img src={heroImage} alt="hero-1" className="h-full w-full object-cover" style={{objectFit: "cover"}} />
                </div>
                <div className="col-12 md:col-4 p-4 md:h-screen h-full">
                    <section>
                        <div className="mb-5">
                            <div className="shrink-0 mb-4">
                                <ApplicationLogo className="block w-4 h-4 fill-current text-gray-800" />
                            </div>
                        </div>
                        <div className={"mt-8 px-4 justify-content-center items-center"}>
                            {/*<CreateAccount data={data} setData={setData} errors={errors} processing={processing} />*/}
                            <CreateEvent data={data} setData={setData} errors={errors} processing={processing} />
                        </div>
                    </section>
                </div>
            </div>
        </GuestLayout>
    );
}
