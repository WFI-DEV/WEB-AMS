import React from 'react'

// Dasboard Admin Import
const DashboardAdmin = React.lazy(() => import('./views/pages/admin/Dashboard'))

// Assets Admin Import
const AssetsAdmin = React.lazy(() => import('./views/pages/admin/assets/assets'))

// Master Admin Import
const CategoryMaster = React.lazy(() => import('./views/pages/admin/master/Category'))
const BranchMaster = React.lazy(() => import('./views/pages/admin/master/Branch'))
const DivisionMaster = React.lazy(() => import('./views/pages/admin/master/Division'))
const VendorMaster = React.lazy(() => import('./views/pages/admin/master/Vendor'))
const SubmissionMaster = React.lazy(() => import('./views/pages/admin/master/Submission'))
const UserApproveMaster = React.lazy(() => import('./views/pages/admin/master/UserApprove'))
const DamageMaster = React.lazy(() => import('./views/pages/admin/master/Damage'))
const DetailMaster = React.lazy(() => import('./views/pages/admin/master/Detail'))
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
  { path: '/master/submission', name: 'SubmissionMaster', element: SubmissionMaster },
  { path: '/master/userapprove', name: 'UserApproveMaster', element: UserApproveMaster },
  { path: '/master/damage', name: 'DamageMaster', element: DamageMaster },
  { path: '/master/detail', name: 'DetailMaster', element: DetailMaster },
]

export default routesAdmin
