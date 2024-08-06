import {Button} from "primereact/button";

export default function PrimaryButton({ className = '', disabled, children, ...props }) {
    return (
        <Button severity="warning" loading={disabled} {...props} className={className + ` border-black border`}>
            {children}
        </Button>
    );
}
