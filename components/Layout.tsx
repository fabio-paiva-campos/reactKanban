import React from 'react'
import TopBar from './TopBar'
import SideBar from './SideBar'

function Layout(props: any) {
  return (
    <div className="AreaApp">
      <TopBar />
      <SideBar />
      <main>{props.children}</main>
    </div>
  )
}

export default Layout