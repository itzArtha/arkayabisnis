import {IconField} from "primereact/iconfield";
import {InputIcon} from "primereact/inputicon";
import {InputText} from "primereact/inputtext";
import InputError from "@/Components/InputError.jsx";
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import {Button} from "primereact/button";
import {Link} from "@inertiajs/react";
import {Checkbox} from "primereact/checkbox";

export default function CreateAccount({data, errors, setData, processing})
{
    const submit = () => {
        console.log('ok')
    }

    return(
        <>
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
                                id="name"
                                type="text"
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
                        <Button label='Daftar Dengan Google' className='w-full' icon="pi pi-google" outlined />
                    </div>
                </div>
            </form>
            <div className={"mt-4 text-center"}>
                <span className="text-600 font-medium line-height-3">Udah punya akun?</span>
                <Link href={route('login')} className="font-medium ml-1 text-900 underline cursor-pointer">Login di sini yuk!</Link>
            </div>
        </>
    )
}
