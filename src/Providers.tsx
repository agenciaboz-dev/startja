import { Snackbar, SnackbarProvider } from "burgos-snackbar"
import { IoProvider } from "./contexts/ioContext"
import { UserProvider } from "./contexts/userContext"
import { CustomersListProvider } from "./contexts/customersListContext"
import { ProductProvider } from "./contexts/productContext"
import { CompanyProvider } from "./contexts/companyContext"
import { HeaderProvider } from "./contexts/headerContext"
import { NatureProvider } from "./contexts/natureContext"
import { DrawerProvider } from "./contexts/drawerContext"

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
                            <CustomersListProvider>
                                <NatureProvider>
                                    <HeaderProvider>
                                        <DrawerProvider>
                                            <Snackbar />
                                            {children}
                                        </DrawerProvider>
                                    </HeaderProvider>
                                </NatureProvider>
                            </CustomersListProvider>
                        </ProductProvider>
                    </CompanyProvider>
                </UserProvider>
            </IoProvider>
        </SnackbarProvider>
    )
}