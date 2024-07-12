export type App = {
  icon: IconoType
  nombre: string
  contraseña: string
  username: string
}

export type User = {
  nombre: string
  username: string
  password: string
  keepLogin: boolean
  isActive: boolean
}

export type IconoType = {
  nombre: string
  libreria: string
}
