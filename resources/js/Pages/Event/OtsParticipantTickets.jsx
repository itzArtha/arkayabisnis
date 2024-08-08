
import React, { useState, useEffect } from 'react';
import { OrderList } from 'primereact/orderlist';
import { Head } from '@inertiajs/react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import { data } from 'autoprefixer';
import { Dialog } from 'primereact/dialog';

export default function OtsParticipantTicket({participants}) {
    const [showQrCode, setShowQrCode] = useState({
        visible: false,
        qr_code: "",
        ticket_number: ""
    });

    return (
<div>
<div>
            <Head title={`Beli tiket`}/>

            {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}

            <div className="grid grid-nogutter surface-0 text-800">
                <div className="col-12 flex justify-content-center p-4 h-screen">
                    <section>
                        <div className="mb-5">
                            <div className="shrink-0 mb-4">
                                <ApplicationLogo className="block w-4 h-4 fill-current text-gray-800" />
                            </div>
                        </div>
                        <div className={"mt-8 px-4 justify-content-center items-center"}>
                            <div className="text-900 text-3xl font-medium mb-1">Halo, ini dia tiketmu 🎫</div>
                            <p className={"text-400 mb-4"}>Berikan QR kepada panitia untuk scan tiket</p>
                            
            {participants?.data?.map((item) => (<div className="cursor-pointer card flex flex-wrap p-2 align-items-center gap-3" onClick={() => setShowQrCode({visible: true, qr_code: item.qr_code, ticket_number: item.ticket_number})}>
                <img className="w-4rem shadow-2 flex-shrink-0 border-round" src={item.qr_code} alt={item.ticket_name} />
                <div className="flex-1 flex flex-column gap-2 xl:mr-8">
                    <span className="font-bold">{item.ticket_name}</span>
                    <div className="flex align-items-center gap-2">
                        <i className="pi pi-qrcode text-sm"></i>
                        <span>{item.ticket_number}</span>
                    </div>
                </div>
            </div>))}
</div>
</section>
</div>
</div>
</div>
<Dialog header={showQrCode.ticket_number} draggable={false} position={"center"} visible={showQrCode.visible} className={"md:w-4 w-full mx-2"} onHide={() => {if (!showQrCode.visible) return; setShowQrCode({...showQrCode, visible: false}); }}>

    <div className={"text-center"}>
                                <img alt="qr code" src={showQrCode.qr_code} className="w-12 xl:w-8" />
                            </div>

                            </Dialog>
</div>
    )
}