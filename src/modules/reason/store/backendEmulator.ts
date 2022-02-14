import { Reason } from '../interfaces'

const data = {
  reasons: [
    {
      description:
        'Laboris qui ea eu sit esse quis ad ex anim est. Esse esse sunt do aliqua ipsum. Cillum tempor ea pariatur ut duis quis veniam esse cillum anim nostrud ut id. Duis laborum culpa do nulla fugiat fugiat officia anim est nostrud.',
      id: '7',
      name: 'Deserunt aute voluptate velit laborum mollit aliqua officia pariatur nisi incididunt irure nisi. Fugiat esse ex occaecat culpa nostrud excepteur. Do magna eu laboris culpa. Culpa esse elit officia laboris et do aliquip voluptate ut labore sint aliquip. Aliquip anim dolor aute id consectetur tempor ex. Sunt enim quis id consequat voluptate est labore tempor veniam dolore est.',
    },
    {
      description:
        'Exercitation non eu cupidatat dolore dolore duis deserunt. Consectetur ut dolor adipisicing cillum laborum ea. Non exercitation quis incididunt ea esse labore tempor. Cillum deserunt ex laborum exercitation sit sint incididunt amet excepteur. Culpa eiusmod et elit minim consectetur est occaecat. Ipsum incididunt reprehenderit incididunt amet. Elit consequat nulla voluptate eu incididunt magna est sit. Commodo commodo mollit et officia. Esse elit labore dolore dolore. Proident anim ad id ex ipsum occaecat esse amet in do cillum. Tempor adipisicing ad commodo nisi laboris. Ullamco consectetur aliquip et non aliqua incididunt incididunt voluptate amet non velit ad eu sint.',
      id: '6',
      name: 'Et laboris esse dolore velit.',
    },
    {
      description:
        'Aliquip ea dolor exercitation ea fugiat cupidatat occaecat reprehenderit officia aliquip.',
      id: '5',
      name: 'Taller de emprendimiento',
    },
    {
      description: 'La dicta Paul Tamayo',
      id: '4',
      name: 'Taller de emprendimiento',
    },
    {
      description: '',
      id: '3',
      name: 'Visita general',
    },
    {
      description:
        'Sunt in ad non voluptate officia nostrud nisi anim aliqua consectetur aute eu officia. Eiusmod enim ad cillum elit quis aliqua est laborum non amet incididunt in aliqua. Fugiat quis eu exercitation consequat irure nostrud minim est sint ad in elit ad exercitation.',
      name: 'Taller de CSS',
      id: '2',
    },
    {
      description: 'Clase impartida por Sergio Manrique el martes 22-06-22',
      name: 'Taller de HTML',
      id: '1',
    },
  ],
}

interface Data {
  id: string
  message?: string
  status?: number
  reason?: Reason
  reasons?: Reason[]
}

const backendEmulator = {
  getReasons: async (): Promise<{ data: Data }> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({ data })
      }, 1500)
    }).then()
  },

  postReasons: async (reason: Reason): Promise<{ data: Data }> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const data = {
          reason,
          status: 200,
        }
        resolve({ data })
      }, 2500)
    }).then()
  },

  deleteReasons: async (id: string): Promise<{ data: Data }> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const data = {
          id,
          message: 'objeto eliminado',
          status: 200,
        }
        resolve({ data })
      }, 2500)
    }).then()
  },

  putReasons: async (reason: Reason): Promise<{ data: Data }> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const data = {
          reason,
          message: 'objeto eliminado',
          status: 200,
        }
        resolve({ data })
      }, 2500)
    }).then()
  },
}

export default backendEmulator
