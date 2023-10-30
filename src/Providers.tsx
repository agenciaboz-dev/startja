import { Snackbar, SnackbarProvider } from "burgos-snackbar"
import { IoProvider } from "./contexts/ioContext"
import { UserProvider } from "./contexts/userContext"
import { CustomerProvider } from "./contexts/customerContext"
import { ProductProvider } from "./contexts/productContext"

interface ProvidersProps {
    children: React.ReactNode
}

export const Providers: React.FC<ProvidersProps> = ({ children }) => {
    return (
        <SnackbarProvider>
            <IoProvider>
                <ProductProvider>
                    <UserProvider>
                        <CustomerProvider>
                                <Snackbar />
                                {children}
                        </CustomerProvider>
                    </UserProvider>
                </ProductProvider>
            </IoProvider>
        </SnackbarProvider>
    )
}