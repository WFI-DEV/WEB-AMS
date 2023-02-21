import React from 'react'
import CIcon from '@coreui/icons-react'
import { cilMonitor, cilNoteAdd, cilSpeedometer, cilStorage } from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/admin/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    badge: {
      color: 'info',
      text: 'NEW',
    },
  },
  {
    component: CNavTitle,
    name: 'Request',
  },
  {
    component: CNavGroup,
    name: 'Request',
    icon: <CIcon icon={cilNoteAdd} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Request Purchase New',
        to: 'asdsa',
      },
      {
        component: CNavItem,
        name: 'Request Repair',
        to: 'asdsa',
      },
    ],
  },

  {
    component: CNavTitle,
    name: 'Assets',
  },
  {
    component: CNavItem,
    name: 'Assets',
    to: '/admin/assets',
    icon: <CIcon icon={cilMonitor} customClassName="nav-icon" />,
    badge: {
      color: 'info',
    },
  },

  {
    component: CNavTitle,
    name: 'Master',
  },
  {
    component: CNavGroup,
    name: 'Master',
    icon: <CIcon icon={cilStorage} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Category',
        to: 'master/category',
      },
      {
        component: CNavItem,
        name: 'Branch',
        to: 'master/branch',
      },
      {
        component: CNavItem,
        name: 'Brand',
        to: 'master/brand',
      },
      {
        component: CNavItem,
        name: 'Division',
        to: 'master/division',
      },
      {
        component: CNavItem,
        name: 'Vendor',
        to: 'master/vendor',
      },
      {
        component: CNavItem,
        name: 'Status Assets',
        to: 'master/statusassets',
      },
      {
        component: CNavItem,
        name: 'Request',
        to: 'master/request',
      },
      {
        component: CNavItem,
        name: 'User Approve',
        to: 'master/userapprove',
      },
      {
        component: CNavItem,
        name: 'Damage',
        to: 'master/damage',
      },
    ],
  },
]

export default _nav
