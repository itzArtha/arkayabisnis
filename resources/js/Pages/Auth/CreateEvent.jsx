import {IconField} from "primereact/iconfield";
import {InputIcon} from "primereact/inputicon";
import {InputText} from "primereact/inputtext";
import InputError from "@/Components/InputError.jsx";
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import GuestLayout from '@/Layouts/GuestLayout';
import {Head, Link, useForm} from "@inertiajs/react";
import ApplicationLogo from "@/Components/ApplicationLogo.jsx";
import {useEffect} from "react";

export default function CreateEvent({auth, heroImage})
{
    const { data, setData, post, processing, errors, reset } = useForm({
        event_title: '',
        event_pic: '',
        whatsapp: ''
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('register'));
    };

    return(
        <GuestLayout>
            <Head title="Buat Event" />

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
            <div className="text-900 text-3xl font-medium mb-1">Halo {auth.user.name}, <br/> buat event yuk! 🙌🏻</div>
            <p className={"text-400 mb-4"}>Buat event mu bersama kami untuk penjualan tiket yang lebih mudah</p>
            <form onSubmit={submit}>
                <div>
                    <div className="mb-3">
                        <label htmlFor="event_title" className="block text-900 font-medium mb-2">Nama Event</label>
                        <IconField iconPosition="left">
                            <InputIcon className="pi pi-ticket"> </InputIcon>
                            <InputText
                                id="event_title"
                                type="text"
                                className="w-full pl-5"
                                value={data.event_title}
                                placeholder={"Tokoevent Festival"}
                                onChange={(e) => setData('event_title', e.target.value)}
                            />
                        </IconField>
                        <InputError message={errors.event_title} className=""/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="name" className="block text-900 font-medium mb-2">Nama Penanggung Jawab</label>
                        <IconField iconPosition="left">
                            <InputIcon className="pi pi-user"> </InputIcon>
                            <InputText
                                id="name"
                                type="text"
                                className="w-full pl-5"
                                value={data.name}
                                placeholder={"Elon Musk"}
                                onChange={(e) => setData('name', e.target.value)}
                            />
                        </IconField>
                        <InputError message={errors.name} className=""/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="whatsapp" className="block text-900 font-medium mb-2">No. WA</label>
                        <IconField iconPosition="left">
                            <InputIcon className="pi pi-whatsapp"> </InputIcon>
                            <InputText
                                id="whatsapp"
                                className="w-full pl-5"
                                placeholder={"081234567890"}
                                maxLength={13}
                                value={data.whatsapp}
                                keyfilter={"pnum"}
                                onChange={(e) => setData('whatsapp', e.target.value)}
                            />
                        </IconField>
                        <InputError message={errors.name} className=""/>
                    </div>
                    <div className='mt-6'>
                        <PrimaryButton label="Buat Event" icon={"pi pi-verified"} className="w-full mb-2" disabled={processing}/>
                    </div>
                </div>
            </form>
                            <div className={"mt-4 text-center"}>
                                <span className="text-600 font-medium line-height-3">Butuh bantuan?</span>
                                <a target={'_blank'} href={'https://wa.me/6281238169667'} className="font-medium ml-1 text-900 underline cursor-pointer">Hubungi kami</a>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </GuestLayout>
    )
}
