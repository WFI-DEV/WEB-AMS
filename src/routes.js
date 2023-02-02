import React from 'react'

// Master Import
const Dashboard = React.lazy(() => import('./views/pages/admin/Dashboard'))
const Category = React.lazy(() => import('./views/pages/admin/Category'))
const Branch = React.lazy(() => import('./views/pages/admin/Branch'))
const Division = React.lazy(() => import('./views/pages/admin/Division'))
const Vendor = React.lazy(() => import('./views/pages/admin/Vendor'))
const Submission = React.lazy(() => import('./views/pages/admin/Submission'))
const UserApprove = React.lazy(() => import('./views/pages/admin/UserApprove'))
const Damage = React.lazy(() => import('./views/pages/admin/Damage'))
const Detail = React.lazy(() => import('./views/pages/admin/Detail'))

// Routes Admin
const routesAdmin = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/master/category', name: 'Category', element: Category },
  { path: '/master/branch', name: 'Branch', element: Branch },
  { path: '/master/division', name: 'Division', element: Division },
  { path: '/master/vendor', name: 'Vendor', element: Vendor },
  { path: '/master/submission', name: 'Submission', element: Submission },
  { path: '/master/userapprove', name: 'UserApprove', element: UserApprove },
  { path: '/master/damage', name: 'Damage', element: Damage },
  { path: '/master/detail', name: 'Detail', element: Detail },
]

export default routesAdmin
