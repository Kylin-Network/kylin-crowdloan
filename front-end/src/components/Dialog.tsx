import React, { Children, useEffect, useState } from 'react'
import styled from 'styled-components'
import { Button } from '@chakra-ui/react'
import { BaseProps } from './Content'
interface DialogBoxProps {
  width?: number;
}
interface DialogProps extends BaseProps,DialogBoxProps {
  confirmText?: string;
  onConfirm: () => void;
  cancelText?: string;
  onCancel: () => void;
  showCancel?: boolean;
  visible: boolean;
}
const DialogWrap = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  background: rgba(0,0,0,.4);
  z-index: 999;
`
const DialogBox = styled.div<DialogBoxProps>`
  position: absolute;
  width: ${({ width }) => width ? width + 'px' : '480px'};
  padding: 1rem;
  border-radius: 1rem;
  background: white;
  z-index: 1000;
`
const DialogContent = styled.div`
  width:100%;
  margin: 1rem 0;`
export const Dialog: React.FC<DialogProps> = ({
  confirmText,
  onConfirm,
  cancelText,
  onCancel,
  showCancel,
  visible,
  width,
  children,
  className
}) => {
  const [_visible, setVisible] = useState(false)
  useEffect(() => {
    setVisible(visible)
    if (!visible) return
  }, [visible])

  return (
    <DialogWrap className={className}>
      <DialogBox width={width}>
        <DialogContent>
          {children}
        </DialogContent>
        <div className="flex flex-h-right">
          <Button onClick={onConfirm}>{confirmText || 'Confirm'}</Button>
          {
            showCancel &&
            <Button onClick={onCancel}>{cancelText || 'Cancel'}</Button>
          }
        </div>
      </DialogBox>
    </DialogWrap>
  )
}
