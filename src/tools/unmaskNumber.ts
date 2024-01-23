export const unmaskNumber = (value: string) => {
    return Number(value.replace(/[^\d,]/g, "").replace(",", "."))
}
