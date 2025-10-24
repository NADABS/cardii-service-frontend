export default interface Role  {
    name: string
    guard: string
    permissions: Permission[]
}

export interface Permission {
    name: string
    guard: string
}