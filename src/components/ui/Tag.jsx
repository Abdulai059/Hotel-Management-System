export default function Tag({ children, className }) {
    return (
        <span className={`inline-block text-xs font-semibold px-3 py-1 rounded-full uppercase ${className}`}>
            {children}
        </span>
    );
}
