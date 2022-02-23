interface LinkItem {
  title: string
  caption: string
  icon: string
  link: string
}

export const linkList: LinkItem[] = [
  // {
  //   title: 'Usuarios',
  //   caption: 'Gestión de usuarios',
  //   icon: 'las la-users-cog',
  //   link: 'users-admon',
  // },
  {
    title: 'Razones de visita',
    caption: 'Gestión de razones y motivos de las visitas de los usuarios',
    icon: 'las la-cogs',
    link: 'reasons-admon',
  },
  {
    title: 'Registros',
    caption: 'Registrar visitas de usuarios',
    icon: 'las la-clipboard',
    link: 'logs-admon',
  },
]
