import {Button} from "primereact/button";

export default function PrimaryButton({ className = '', disabled, children, ...props }) {
    return (
        <Button loadingIcon={"pi pi-spinner"} severity="warning" disabled={disabled} {...props} loading={disabled} className={className + ` border-black border`}>
            {children}
        </Button>
    );
}
