import { Link, Head } from '@inertiajs/react';
import {LayoutContext, LayoutProvider} from "@/Layouts/layout/context/layoutcontext.jsx";
import React, {useContext} from "react";
import Layout from '@/Layouts/layout/layout';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import PrimaryButton from "@/Components/PrimaryButton";
import {Toolbar} from "primereact/toolbar";
import moment from "moment";
import {Tag} from "primereact/tag";
import {InputText} from "primereact/inputtext";
import {Calendar} from "primereact/calendar";

export default function FieldThemeUndangan({active, activeDefaultValue}) {

    if(active !== activeDefaultValue) {
        return null;
    }

    return (
        <>
            ...
        </>
    );
}
