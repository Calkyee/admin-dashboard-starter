import React from 'react'

interface SideNavButton {
  children: React.ReactNode; 
  selected?: boolean;
} 

const SideNavButton = ({children, selected}: SideNavButton) => {
  const ClassNames = `
  ${selected 
    ? `` 
    : ``
  }
  `
  return (
    <h2 className={ClassNames}>
      {children}
    </h2>
  )
}

export default SideNavButton