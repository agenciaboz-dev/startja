import { Snackbar, SnackbarProvider } from "burgos-snackbar"
import { IoProvider } from "./contexts/ioContext"
import { UserProvider } from "./contexts/userContext"
import { CustomerProvider } from "./contexts/customerContext"
import { ProductProvider } from "./contexts/productContext"
import { CompanyProvider } from "./contexts/companyContext"

interface ProvidersProps {
    children: React.ReactNode
}

export const Providers: React.FC<ProvidersProps> = ({ children }) => {
    return (
        <SnackbarProvider>
            <IoProvider>
                <CompanyProvider>
                    <ProductProvider>
                        <UserProvider>
                            <CustomerProvider>
                                    <Snackbar />
                                    {children}
                            </CustomerProvider>
                        </UserProvider>
                    </ProductProvider>
                </CompanyProvider>
            </IoProvider>
        </SnackbarProvider>
    )
}