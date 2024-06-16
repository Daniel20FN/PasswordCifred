export type App = {
  icon: string;
  nombre: string;
  contraseña: string;
};

export type User = {
  nombre: string;
  username: string;
  password: string;
  keepLogin: boolean;
  isActive: boolean;
};
