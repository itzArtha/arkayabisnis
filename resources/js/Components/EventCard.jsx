import {Badge} from "primereact/badge";
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import {Button} from "primereact/button";
import {Card} from "primereact/card";
import React from "react";

export default function EventCard({data}) {
    return (
        <Card title={data.title} subTitle={data.start_at ? `${data.start_at} - ${data.end_at}` : ''} header={<img alt={data.title}
        src={data.banner_url} />}>
            <div className="grid gap-1">
                {
                    data.category &&
                <div className="p-col">
                    <Badge value={data.category?.name} severity="success" />
                </div>
                }
                {
                    data.format && <div className="p-col">
                        <Badge value={data.format?.name} severity="warning" />
                    </div>
                }
            </div>
            <div className="mt-4 gap-2 grid">
                            <span className="p-buttonset flex w-full">
                                <PrimaryButton className="w-full justify-content-center">Edit Event</PrimaryButton>
                                <Button icon="pi pi-eye" severity="warning"></Button>
                            </span>
            </div>
        </Card>
    );
}
