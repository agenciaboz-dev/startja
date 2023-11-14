import { Snackbar, SnackbarProvider } from "burgos-snackbar"
import { IoProvider } from "./contexts/ioContext"
import { UserProvider } from "./contexts/userContext"
import { CustomerProvider } from "./contexts/customerContext"
import { ProductProvider } from "./contexts/productContext"
import { CompanyProvider } from "./contexts/companyContext"
import { HeaderProvider } from "./contexts/headerContext"

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
                                <HeaderProvider>
                                    <Snackbar />
                                    {children}
                                </HeaderProvider>
                            </CustomerProvider>
                        </UserProvider>
                    </ProductProvider>
                </CompanyProvider>
            </IoProvider>
        </SnackbarProvider>
    )
}