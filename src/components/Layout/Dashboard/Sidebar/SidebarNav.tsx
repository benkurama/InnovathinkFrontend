import {
  faAddressCard, faBell, faFileLines, faStar,
} from '@fortawesome/free-regular-svg-icons'
import {
  faBug,
  faCalculator,
  faChartPie,
  faCode,
  faDroplet,
  faGauge,
  faLayerGroup,
  faLocationArrow,
  faPencil,
  faPuzzlePiece,
  faRightToBracket,
} from '@fortawesome/free-solid-svg-icons'
import React, { PropsWithChildren } from 'react'
import { Badge } from 'react-bootstrap'
import SidebarNavGroup from '@/components/Layout/Dashboard/Sidebar/SidebarNavGroup'
import SidebarNavItem from '@/components/Layout/Dashboard/Sidebar/SidebarNavItem'
import { getDictionary } from '@/locales/dictionary'

const SidebarNavTitle = (props: PropsWithChildren) => {
  const { children } = props

  return (
    <li className="nav-title px-3 py-2 mt-3 text-uppercase fw-bold">{children}</li>
  )
}

export default async function SidebarNav() {
  const dict = await getDictionary()
  return (
    <ul className="list-unstyled">

      <SidebarNavItem icon={faGauge} href="/">
        {dict.sidebar.items.dashboard}
        {/* <small className="ms-auto"><Badge bg="info" className="ms-auto">NEW</Badge></small> */}
      </SidebarNavItem>

      <SidebarNavItem icon={faCode} href="/pokemons">
        {dict.sidebar.items.sample}
        {/* <small className="ms-auto"><Badge bg="danger" className="ms-auto">DEMO</Badge></small> */}
      </SidebarNavItem>

      <SidebarNavItem icon={faLayerGroup} href="/profile">
        My Profile
      </SidebarNavItem>

      <SidebarNavItem icon={faLayerGroup} href="/notes">
        Notes
      </SidebarNavItem>

       </ul>
  )
}
