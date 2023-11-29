import { Snackbar, SnackbarProvider } from "burgos-snackbar"
import { IoProvider } from "./contexts/ioContext"
import { UserProvider } from "./contexts/userContext"
import { CustomerProvider } from "./contexts/customerContext"
import { ProductProvider } from "./contexts/productContext"
import { CompanyProvider } from "./contexts/companyContext"
import { HeaderProvider } from "./contexts/headerContext"
import { NatureProvider } from "./contexts/natureContext"

interface ProvidersProps {
    children: React.ReactNode
}

export const Providers: React.FC<ProvidersProps> = ({ children }) => {
    return (
        <SnackbarProvider>
            <IoProvider>
                <UserProvider>
                    <CompanyProvider>
                        <ProductProvider>
                            <CustomerProvider>
                                <NatureProvider>
                                    <HeaderProvider>
                                        <Snackbar />
                                        {children}
                                    </HeaderProvider>
                                </NatureProvider>
                            </CustomerProvider>
                        </ProductProvider>
                    </CompanyProvider>
                </UserProvider>
            </IoProvider>
        </SnackbarProvider>
    )
}