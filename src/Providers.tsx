import { IoProvider } from "./contexts/ioContext"

interface ProvidersProps {
    children: React.ReactNode
}

export const Providers: React.FC<ProvidersProps> = ({ children }) => {
    return (
        <IoProvider>
            {children}
        </IoProvider>
    )
}