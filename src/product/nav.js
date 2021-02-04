

export default [
  {
    title: "Управление",
    children: [

      {
        _tag: 'CSidebarNavDivider',
      },
      {
        _tag: 'CSidebarNavTitle',
        _children: ['Сводка']
      },
      {
        _tag: 'CSidebarNavItem',

        to: '/quote',

        name: 'Квоты'
      },
      {
        _tag: 'CSidebarNavItem',

        to: '/permit',

        name: 'Разрешения'
      }
    ]
  },
  {
    title: "Производство",

    children: [
      {
        _tag: 'CSidebarNavDivider',
      },
      {
        _tag: 'CSidebarNavTitle',
        _children: ['Информация']
      },
    ]
  }

]

