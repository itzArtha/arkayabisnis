import { useEffect } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import {InputText} from "primereact/inputtext";
import {Checkbox} from "primereact/checkbox";
import {Button} from "primereact/button";
import ApplicationLogo from '@/Components/ApplicationLogo';
import { Dropdown } from 'primereact/dropdown';
import { useState } from 'react';

export default function Register() {
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

            <div className="flex align-items-center justify-content-center flex-column">
                <div className="surface-card md:p-6 p-4 shadow-2 border-round w-full lg:w-4">
                    <div className="shrink-0 flex align-items-center justify-content-center mb-4">
                        <ApplicationLogo className="block md:h-2 md:w-2 w-4 h-4 fill-current text-gray-800" />
                    </div>
                    <div className="text-center mb-5">
                        <div className="text-900 text-3xl font-medium mb-3">Buat akun</div>
                    </div>
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

                            <div className="flex align-items-center justify-content-end mb-4">
                                <Link
                                    href={route('login')}
                                    className="font-medium no-underline ml-1 text-blue-500 cursor-pointer"
                                >
                                    Udah punya akun?
                                </Link>
                            </div>
                            <div className='grid gap-2'>
                                <PrimaryButton label="Register" className="w-full" disabled={processing}/>
                                <Button label='Masuk Dengan Google' className='w-full' icon="pi pi-google" outlined /> 
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </GuestLayout>
    );
}
