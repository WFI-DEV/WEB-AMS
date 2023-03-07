import React from 'react'

// Dasboard Admin Import
const DashboardAdmin = React.lazy(() => import('./views/pages/admin/Dashboard'))

// Request Admin Import
const AllReqAdmin = React.lazy(() => import('./views/pages/admin/request/AllRequest'))
const PurchaseReqAdmin = React.lazy(() => import('./views/pages/admin/request/PurchaseRequest'))
const RepairReqAdmin = React.lazy(() => import('./views/pages/admin/request/RepairRequest'))

const CreateReqPurchase = React.lazy(() => import('./views/pages/admin/request/CreateReqPurchase'))

const ReqByIdPurchase = React.lazy(() => import('./views/pages/admin/request/RequestByIdPurchase'))
const ReqByIdRepair = React.lazy(() => import('./views/pages/admin/request/RequestByIdRepair'))

// Assets Admin Import
const AssetsAdmin = React.lazy(() => import('./views/pages/admin/assets/Assets'))

// Master Admin Import
const CategoryMaster = React.lazy(() => import('./views/pages/admin/master/Category'))
const BranchMaster = React.lazy(() => import('./views/pages/admin/master/Branch'))
const DivisionMaster = React.lazy(() => import('./views/pages/admin/master/Division'))
const VendorMaster = React.lazy(() => import('./views/pages/admin/master/Vendor'))
const RequestMaster = React.lazy(() => import('./views/pages/admin/master/RequestType'))
const UserApproveMaster = React.lazy(() => import('./views/pages/admin/master/UserApprove'))
const DamageMaster = React.lazy(() => import('./views/pages/admin/master/Damage'))
const statusAssetsMaster = React.lazy(() => import('./views/pages/admin/master/StatusAssets'))
const BrandMaster = React.lazy(() => import('./views/pages/admin/master/Brand'))
const statusRequestMaster = React.lazy(() => import('./views/pages/admin/master/StatusRequest'))

// Routes Admin
const routesAdmin = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'DashboardAdmin', element: DashboardAdmin },

  { path: '/request/allrequest', name: 'AllReqAdmin', element: AllReqAdmin },
  { path: '/request/purchaserequest', name: 'PurchaseReqAdmin', element: PurchaseReqAdmin },
  { path: '/request/repairrequest', name: 'RepairReqAdmin', element: RepairReqAdmin },

  {
    path: '/request/createpurchase',
    name: 'CreateReqPurchase',
    element: CreateReqPurchase,
  },
  {
    path: '/request/purchase/:no/:branchCode/:typeReq/:month/:year',
    name: 'ReqByIdPurchase',
    element: ReqByIdPurchase,
  },
  {
    path: '/request/repair/:no/:branchCode/:typeReq/:month/:year',
    name: 'ReqByIdPurchase',
    element: ReqByIdRepair,
  },

  { path: '/assets', name: 'AssetsAdmin', element: AssetsAdmin },

  { path: '/master/category', name: 'CategoryMaster', element: CategoryMaster },
  { path: '/master/branch', name: 'BranchMaster', element: BranchMaster },
  { path: '/master/brand', name: 'BrandhMaster', element: BrandMaster },
  { path: '/master/division', name: 'DivisionMaster', element: DivisionMaster },
  { path: '/master/vendor', name: 'VendorMaster', element: VendorMaster },
  { path: '/master/requesttype', name: 'RequestMaster', element: RequestMaster },
  { path: '/master/userapprove', name: 'UserApproveMaster', element: UserApproveMaster },
  { path: '/master/damage', name: 'DamageMaster', element: DamageMaster },
  { path: '/master/statusassets', name: 'StatusAssetsMaster', element: statusAssetsMaster },
  { path: '/master/statusrequest', name: 'StatuRequestMaster', element: statusRequestMaster },
]

export default routesAdmin
