import { Snackbar, SnackbarProvider } from "burgos-snackbar"
import { IoProvider } from "./contexts/ioContext"
import { UserProvider } from "./contexts/userContext"
import { ProductProvider } from "./contexts/productContext"
import { CompanyProvider } from "./contexts/companyContext"
import { HeaderProvider } from "./contexts/headerContext"
import { NatureProvider } from "./contexts/natureContext"
import { DrawerProvider } from "./contexts/drawerContext"
import { InvoiceProvider } from "./contexts/invoiceContext"
import { ConfirmDialog, ConfirmDialogProvider } from "burgos-confirm"

interface ProvidersProps {
    children: React.ReactNode
}

export const Providers: React.FC<ProvidersProps> = ({ children }) => {
    return (
        <SnackbarProvider>
            <ConfirmDialogProvider>
                <IoProvider>
                    <UserProvider>
                        <CompanyProvider>
                            <InvoiceProvider>
                                <ProductProvider>
                                    <NatureProvider>
                                        <HeaderProvider>
                                            <DrawerProvider>
                                                <Snackbar />
                                                <ConfirmDialog />
                                                {children}
                                            </DrawerProvider>
                                        </HeaderProvider>
                                    </NatureProvider>
                                </ProductProvider>
                            </InvoiceProvider>
                        </CompanyProvider>
                    </UserProvider>
                </IoProvider>
            </ConfirmDialogProvider>
        </SnackbarProvider>
    )
}