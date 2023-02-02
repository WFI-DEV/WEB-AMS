import React from 'react'
import { AppContent, AppSidebarMaster, AppFooter, AppHeader } from 'src/views/components'

const MasterLayout = () => {
  return (
    <div>
      <AppSidebarMaster />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AppHeader />
        <div className="body flex-grow-1 px-3">
          <AppContent />
        </div>
        <AppFooter />
      </div>
    </div>
  )
}

export default MasterLayout
