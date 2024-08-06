import {Button} from "primereact/button";

export default function PrimaryButton({ className = '', children, ...props }) {
    return (
        <Button loadingIcon={"pi pi-spinner"} severity="warning" {...props} className={className + ` border-black border`}>
            {children}
        </Button>
    );
}
