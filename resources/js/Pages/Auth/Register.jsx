import { useEffect } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import { Head, Link, useForm } from '@inertiajs/react';
import {InputText} from "primereact/inputtext";
import {Button} from "primereact/button";
import ApplicationLogo from '@/Components/ApplicationLogo';
import { useState } from 'react';

export default function Register({heroImage}) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });
    const [selectedCity, setSelectedCity] = useState(null);

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route('register'));
    };

    const cities = [
        { name: 'Saya Ingin Jual Tiket', code: 'TKVT' },
        { name: 'Saya Ingin Jualan Undangan Online', code: 'TKUD' }
    ];

    return (
        <GuestLayout>
            <Head title="Register" />

            <div className="grid grid-nogutter surface-0 text-800">
                <div className="col-12 md:col-8 overflow-hidden hidden md:block">
                    <img src={heroImage} alt="hero-1" className="h-full w-full object-cover" style={{objectFit: "cover"}} />
                </div>
                <div className="col-12 md:col-4 p-4 h-full">
                    <section>
                        <div className="mb-5">
                            <div className="shrink-0 mb-4">
                                <ApplicationLogo className="block w-4 h-4 fill-current text-gray-800" />
                            </div>
                        </div>
                        <div className={"mt-8 px-4 justify-content-center items-center"}>
                            <div className="text-900 text-3xl font-medium mb-1">Selamat datang</div>
                            <p className={"text-400 mb-4"}>Daftar di bawah ini untuk mendapatkan akses akun</p>
                            <form onSubmit={submit}>
                                <div>
                                    <div className="mb-3">
                                        <label htmlFor="name" className="block text-900 font-medium mb-2">Nama Event</label>
                                        <InputText
                                            id="name"
                                            type="text"
                                            className="w-full"
                                            value={data.name}
                                            onChange={(e) => setData('name', e.target.value)}
                                        />
                                        <InputError message={errors.email} className=""/>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="email" className="block text-900 font-medium mb-2">Email</label>
                                        <InputText
                                            id="email"
                                            type="text"
                                            className="w-full"
                                            value={data.email}
                                            onChange={(e) => setData('email', e.target.value)}
                                        />
                                        <InputError message={errors.email} className=""/>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="password" className="block text-900 font-medium mb-2">Password</label>
                                        <InputText
                                            id="password"
                                            type="password"
                                            className="w-full"
                                            value={data.password}
                                            onChange={(e) => setData('password', e.target.value)}
                                        />
                                        <InputError message={errors.password} className=""/>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="password_confirmation" className="block text-900 font-medium mb-2">Konfirmasi Password</label>
                                        <InputText
                                            id="password_confirmation"
                                            type="password"
                                            className="w-full"
                                            value={data.password_confirmation}
                                            onChange={(e) => setData('password_confirmation', e.target.value)}
                                        />
                                        <InputError message={errors.password_confirmation} className=""/>
                                    </div>
                                    <div className='grid gap-2 mt-6'>
                                        <PrimaryButton label="Register" className="w-full" disabled={processing}/>
                                        <Button label='Masuk Dengan Google' className='w-full' icon="pi pi-google" outlined />
                                    </div>
                                </div>
                            </form>
                            <div className={"mt-4 text-center"}>
                                <span className="text-600 font-medium line-height-3">Udah punya akun?</span>
                                <Link href={route('register')} className="font-medium ml-1 text-900 underline cursor-pointer">Login di sini yuk!</Link>
                            </div>
                        </div>
                    </section>
                </div>
            </div>

        </GuestLayout>
    );
}
