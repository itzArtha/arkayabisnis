import {usePage} from "@inertiajs/react";

export default function ApplicationLogo(props) {

    const {light} = usePage().props.logo;

    return (
        <img {...props} src={light} alt={`Logo ${import.meta.env.VITE_APP_NAME}`} />
    );
}
