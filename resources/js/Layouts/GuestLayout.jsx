export default function Guest({ children }) {
    return (
        <div className="flex flex-col sm:justify-center items-center sm:pt-0 bg-white">
            <div className="w-full sm:max-w-md my-auto bg-white shadow-md overflow-hidden sm:rounded-lg">
                {children}
            </div>
        </div>
    );
}
