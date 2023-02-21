import React from 'react'

// Dasboard Admin Import
const DashboardAdmin = React.lazy(() => import('./views/pages/admin/Dashboard'))

// Assets Admin Import
const AssetsAdmin = React.lazy(() => import('./views/pages/admin/assets/Assets'))

// Master Admin Import
const CategoryMaster = React.lazy(() => import('./views/pages/admin/master/Category'))
const BranchMaster = React.lazy(() => import('./views/pages/admin/master/Branch'))
const DivisionMaster = React.lazy(() => import('./views/pages/admin/master/Division'))
const VendorMaster = React.lazy(() => import('./views/pages/admin/master/Vendor'))
const RequestMaster = React.lazy(() => import('./views/pages/admin/master/Request'))
const UserApproveMaster = React.lazy(() => import('./views/pages/admin/master/UserApprove'))
const DamageMaster = React.lazy(() => import('./views/pages/admin/master/Damage'))
const statusAssetsMaster = React.lazy(() => import('./views/pages/admin/master/StatusAssets'))
const BrandMaster = React.lazy(() => import('./views/pages/admin/master/Brand'))

// Routes Admin
const routesAdmin = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'DashboardAdmin', element: DashboardAdmin },
  { path: '/assets', name: 'AssetsAdmin', element: AssetsAdmin },

  { path: '/master/category', name: 'CategoryMaster', element: CategoryMaster },
  { path: '/master/branch', name: 'BranchMaster', element: BranchMaster },
  { path: '/master/brand', name: 'BrandhMaster', element: BrandMaster },
  { path: '/master/division', name: 'DivisionMaster', element: DivisionMaster },
  { path: '/master/vendor', name: 'VendorMaster', element: VendorMaster },
  { path: '/master/request', name: 'RequestMaster', element: RequestMaster },
  { path: '/master/userapprove', name: 'UserApproveMaster', element: UserApproveMaster },
  { path: '/master/damage', name: 'DamageMaster', element: DamageMaster },
  { path: '/master/statusassets', name: 'StatusAssetsMaster', element: statusAssetsMaster },
]

export default routesAdmin
