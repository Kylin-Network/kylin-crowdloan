import React from 'react'
import styled from 'styled-components'
import { ReactComponent as Logo } from '../assets/logo.svg'
import { openUrl } from '../utils'

const HeaderWrap = styled.div`
  width:100%;
  height: 5rem;
  background: var(--black);  
  color: white;
`
const LogoWrap = styled.div`
  font-size: 1.25rem;
  font-weight:bold;
`
const Nav = styled.nav`
  li{
    display:inline-block;
    list-style:none;
    margin-left:2rem;
  }
  @media screen and (max-width: 1200px){
    display:none;
  }
`
export const Header = () => {
  const refresh = () => {
    window.location.reload()
  }
  return (
    <HeaderWrap className='flex flex-v-center'>
      <div className="container">
        <div className='flex flex-v-center flex-h-between'>
          <LogoWrap className='flex flex-v-center'>
            <Logo style={{ cursor: 'pointer' }} width='150' height='60' onClick={refresh} />
            <div>Crowdloan</div>
          </LogoWrap>
          <Nav style={{cursor:'pointer'}} onClick={()=>openUrl('https://kylin.network')}>
            <ul>
              <li>Technology</li>
              <li>Docs</li>
              <li>Token</li>
              <li>Ecosystom</li>
              <li>Team</li>
              <li>Tools</li>
            </ul>
          </Nav>
        </div>
      </div>
    </HeaderWrap>
  )
}
