import {IconField} from "primereact/iconfield";
import {InputIcon} from "primereact/inputicon";
import {InputText} from "primereact/inputtext";
import InputError from "@/Components/InputError.jsx";
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import {Button} from "primereact/button";
import {Head, Link, useForm} from "@inertiajs/react";
import ApplicationLogo from "@/Components/ApplicationLogo.jsx";
import GuestLayout from '@/Layouts/GuestLayout';
import {useEffect} from "react";

export default function CreateAccount({heroImage})
{
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: ''
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

    return(
        <GuestLayout>
            <Head title="Register" />

            <div className="grid grid-nogutter surface-0 text-800">
                <div className="col-12 md:col-8 overflow-hidden hidden md:block h-screen">
                    <img src={heroImage} alt="hero-1" className="h-full w-full object-cover" style={{objectFit: "cover"}} />
                </div>
                <div className="col-12 md:col-4 p-4 h-screen">
                    <section>
                        <div className="mb-2">
                            <div className="shrink-0 mb-4">
                                <ApplicationLogo className="block w-4 h-4 fill-current text-gray-800" />
                            </div>
                        </div>
                        <div className={"mt-6 px-4 justify-content-center items-center"}>
            <div className="text-900 text-3xl font-medium mb-1">Selamat datang 🙌🏻</div>
            <p className={"text-400 mb-4"}>Kamu harus punya akun untuk menjual tiket</p>
            <form onSubmit={submit}>
                <div>
                    <div className="mb-3">
                        <label htmlFor="name" className="block text-900 font-medium mb-2">Nama Penyelenggara</label>
                        <IconField iconPosition="left">
                            <InputIcon className="pi pi-users"> </InputIcon>
                            <InputText
                                id="name"
                                type="text"
                                className="w-full pl-5"
                                value={data.name}
                                placeholder={"Tokoevent"}
                                onChange={(e) => setData('name', e.target.value)}
                            />
                        </IconField>
                        <InputError message={errors.name} className=""/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="block text-900 font-medium mb-2">Email</label>
                        <IconField iconPosition="left">
                            <InputIcon className="pi pi-envelope"> </InputIcon>
                            <InputText
                                id="email"
                                type="text"
                                className="w-full pl-5"
                                value={data.email}
                                placeholder={"example@tokoevent.id"}
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
                        <InputError message={errors.name} className=""/>
                    </div>
                    <div className="flex align-items-center justify-content-between mb-6">
                        <div className="flex align-items-center">
                            <IconField className={'pi pi-check mr-2'} /> <small>Dengan mendaftar, saya berarti telah menyetujui seluruh <span className={"text-900 underline cursor-pointer"}>syarat dan ketentuan</span> yang berlaku</small>
                        </div>
                    </div>
                    <div className='mt-6'>
                        <PrimaryButton label="Buat Akun" icon={"pi pi-user-plus"} className="w-full mb-2" disabled={processing}/>
                        {/* <Button label='Daftar Dengan Google' className='w-full' icon="pi pi-google" outlined /> */}
                    </div>
                </div>
            </form>
            <div className={"mt-4 text-center"}>
                <span className="text-600 font-medium line-height-3">Udah punya akun?</span>
                <Link href={route('login')} className="font-medium ml-1 text-900 underline cursor-pointer">Login di sini yuk!</Link>
            </div>
                        </div>
                    </section>
                </div>
            </div>
        </GuestLayout>
    )
}
