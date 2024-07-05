import {Button} from "primereact/button";

export default function PrimaryButton({ className = '', disabled, children, ...props }) {
    return (
        <Button severity="warning" disabled={disabled} {...props} loading={disabled}>
            {children}
        </Button>
    );
}
