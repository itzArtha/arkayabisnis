import {IconField} from "primereact/iconfield";
import {InputIcon} from "primereact/inputicon";
import {InputText} from "primereact/inputtext";
import InputError from "@/Components/InputError.jsx";
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import {Button} from "primereact/button";
import {Link} from "@inertiajs/react";
import {InputNumber} from "primereact/inputnumber";
import {InputMask} from "primereact/inputmask";

export default function CreateEvent({data, errors, setData, processing})
{
    const submit = () => {
        console.log('ok')
    }

    return(
        <>
            <div className="text-900 text-3xl font-medium mb-1">Halo {data.name}, <br/> buat event yuk! 🙌🏻</div>
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
                                placeholder={"Mis. Tokoevent Festival"}
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
                                onChange={(e) => setData('name', e.target.value)}
                            />
                        </IconField>
                        <InputError message={errors.name} className=""/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="whatsapp" className="block text-900 font-medium mb-2">No. WA</label>
                        <IconField iconPosition="left">
                            <InputIcon className="pi pi-whatsapp"> </InputIcon>
                            <InputMask
                                id="whatsapp"
                                className="w-full pl-5"
                                mask={"+62 9999 9999 999"}
                                placeholder={"+62 8123 4567 890"}
                                value={data.whatsapp}
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
        </>
    )
}
