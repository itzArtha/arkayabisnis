export default function Guest({ children }) {
    return (
        <div className="min-h-screen flex flex-col sm:justify-center items-center py-2 sm:pt-0 bg-white">
            <div className="w-full sm:max-w-md px-4 my-auto py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">
                {children}
            </div>
        </div>
    );
}
