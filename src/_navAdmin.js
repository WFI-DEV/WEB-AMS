import React from 'react'
import CIcon from '@coreui/icons-react'
import { cilMonitor, cilSpeedometer, cilStorage } from '@coreui/icons'
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
  // {
  //   component: CNavTitle,
  //   name: 'Submissions',
  // },
  // {
  //   component: CNavGroup,
  //   name: 'All Submissions',
  //   icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
  //   items: [
  //     {
  //       component: CNavItem,
  //       name: 'Category',
  //       to: 'submissions/allasets/category',
  //     },
  //   ],
  // },
  // {
  //   component: CNavGroup,
  //   name: 'Branch Submissions',
  //   icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
  //   items: [
  //     {
  //       component: CNavItem,
  //       name: 'Category',
  //       to: 'submission/branchassets/category',
  //     },
  //   ],
  // },

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
        name: 'Detail',
        to: 'master/detail',
      },
      {
        component: CNavItem,
        name: 'Submission',
        to: 'master/submission',
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
