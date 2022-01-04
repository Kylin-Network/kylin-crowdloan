import React from 'react'
import styled from 'styled-components'
import { BaseProps } from './Content'
const RowWrap = styled.div`
  display: flex;
`
const ColWrap = styled.div`
display: block;
flex-basis: 0px;
flex-grow: 1;
flex-shrink: 1;
padding: 0.75rem;
`
const Row: React.FC<BaseProps> = ({ children }) => {
  return (
    <RowWrap>
      {children}
    </RowWrap>
  )
}
const Col: React.FC<BaseProps> = ({ children }) => {
  return (
    <ColWrap>
      {children}
    </ColWrap>
  )
}

export { Row, Col }