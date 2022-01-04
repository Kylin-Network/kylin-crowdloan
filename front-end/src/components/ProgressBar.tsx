import React, { useMemo } from 'react'
import styled from 'styled-components'

export interface ProgressBarProps {
  steps?: number;
  completed: number;
}
const ProgressBarWrap = styled.div`
  padding: 0 16rem; 
  margin-bottom:5rem;
  @media screen and (max-width:1440px) {
    padding: 0 8rem;
  }
  @media screen and (max-width:1000px) {
    padding: 0 4rem;
  }
  @media screen and (max-width:768px) {
    padding: 0 ;
  }
`
const Steps = styled.div`
  display:flex;
  justify-content: space-between;
  align-items: center;
  position:relative;
  &:before{
    content: '';
    border: 8px dotted white;
    width: 100%;
    border-top: 0;
    border-right: 0;
    border-left: 0;
    height: 3rem;
    display: block;
    position: absolute;
    bottom: 0.45rem;
    z-index:0;
  }
`
const Step = styled.div`
  z-index:1;
  width: 1.5rem;
  height: 1.5rem;
  border-radius:50%;
  background: white;
  border:1px solid #ccc;

  &.active {
    background: var(--primary-color);
    border-color: var(--primary-color);
  }

`

export interface CompletedHandler {
  setCompleted: React.Dispatch<React.SetStateAction<number>>
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ steps=7, completed }) => {
  const _Steps = useMemo(()=>{
    const stepComponents = []
    for(let i = 0; i<= steps; i++){
      const actived = i <= completed ? 'active' : ''
      stepComponents.push(<Step className={actived} key={i}/>)
    }
    return stepComponents
  },[steps,completed])
  return (
    <ProgressBarWrap>
      <Steps>
        {
          _Steps
        }
        </Steps>
    </ProgressBarWrap>
  )
}
