import {useEffect} from 'react';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import {Head, Link, useForm} from '@inertiajs/react';
import {InputText} from "primereact/inputtext";
import {Button} from "primereact/button";
import ApplicationLogo from '@/Components/ApplicationLogo';
import {IconField} from "primereact/iconfield";
import {InputIcon} from "primereact/inputicon";

export default function Login({status, canResetPassword, heroImage}) {
    const {data, setData, post, processing, errors, reset} = useForm({
        email: '',
        password: '',
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route('login'));
    };

    function setChecked(checked) {
        return undefined;
    }

    return (
        <div>
            <Head title="Log in"/>

            {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}

            <div className="grid grid-nogutter surface-0 text-800">
                <div className="col-12 md:col-8 overflow-hidden hidden md:block h-screen">
                    <img src={heroImage} alt="hero-1" className="h-full w-full object-cover" style={{objectFit: "cover"}} />
                </div>
                <div className="col-12 md:col-4 p-4 h-screen">
                    <section>
                        <div className="mb-5">
                            <div className="shrink-0 mb-4">
                                <ApplicationLogo className="block w-4 h-4 fill-current text-gray-800" />
                            </div>
                        </div>
                        <div className={"mt-8 px-4 justify-content-center items-center"}>
                            <div className="text-900 text-3xl font-medium mb-1">Selamat datang</div>
                            <p className={"text-400 mb-4"}>Login di bawah ini untuk akses akun mu</p>
                            <form onSubmit={submit}>
                                <div>
                                    <div className="mb-3">
                                        <label htmlFor="email" className="block text-900 font-medium mb-2">Email</label>
                                        <IconField iconPosition="left">
                                            <InputIcon className="pi pi-user"> </InputIcon>
                                            <InputText
                                                id="email"
                                                type="text"
                                                className="w-full pl-5"
                                                value={data.email}
                                                onChange={(e) => setData('email', e.target.value)}
                                            />
                                        </IconField>
                                        <InputError message={errors.email} className=""/>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="password" className="block text-900 font-medium mb-2">Password</label>
                                        <IconField iconPosition="left">
                                            <InputIcon className="pi pi-lock"> </InputIcon>
                                            <InputText
                                                id="password"
                                                type="password"
                                                className="w-full pl-5"
                                                value={data.password}
                                                onChange={(e) => setData('password', e.target.value)}
                                            />
                                        </IconField>
                                        <InputError message={errors.password} className=""/>
                                    </div>

                                    <div className="flex align-items-center justify-content-end mb-6">
                                        <Link
                                            href={route('password.request')}
                                            className="font-medium underline ml-2 text-900 text-right cursor-pointer"
                                        >
                                            Lupa password?
                                        </Link>
                                    </div>

                                    <div className='grid gap-2'>
                                        <PrimaryButton label="Masuk" icon="pi pi-sign-in" className="w-full" disabled={processing}/>
                                        <Button label='Masuk Dengan Google' className='w-full' icon="pi pi-google" outlined />
                                    </div>
                                </div>
                            </form>
                            <div className={"mt-4 text-center"}>
                                <span className="text-600 font-medium line-height-3">Gak punya akun?</span>
                                <Link href={route('register')} className="font-medium ml-1 text-900 underline cursor-pointer">Buat dulu yuk!</Link>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
