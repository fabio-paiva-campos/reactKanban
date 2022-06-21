import React from 'react'

function Layout(props: any) {
  return (
    <div className="AreaApp">
      <main>{props.children}</main>
    </div>
  )
}

export default Layout