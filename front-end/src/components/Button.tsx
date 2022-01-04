import { Box, BoxProps } from '@chakra-ui/react'
import React, { useMemo } from 'react'
import { BaseProps } from './Content'


interface ButtonProps extends BaseProps, BoxProps {
  variant?: string;
  disabled?: boolean;
  type?: 'solid' | 'outline' | 'white';
}

export const Button: React.FC<ButtonProps> = ({ children, onClick, disabled, type, ...props }) => {

  const handleClick = (e: any) => {
    onClick && onClick(e)
  }

  const bg = useMemo(()=>{
    return type === 'outline' ? 'tranparent' : type ==='white' ? 'white' : 'var(--primary-color)'
  },[type])
  const hover = useMemo(()=>{
    return type === 'outline' ? { bg: 'var(--primary-light-color)' } : { bg: 'var(--primary-light-color)' }
  },[type])

  return (
    <Box
      onClick={(e: any) => handleClick(e)}
      as='button'
      disabled={disabled}
      height='2.5rem'
      lineHeight='2.5rem'
      transition='all 0.2s cubic-bezier(.08,.52,.52,1)'
      border='1px'
      borderRadius='1.25rem'
      fontSize='1rem'
      fontWeight='semibold'
      style={disabled ? {cursor:'not-allowed', opacity: .7} : undefined}
      bg={bg}
      borderColor={type==='white' ? 'transparent' :'var(--primary-color)'}
      color={type==='white' ? 'black' :'white'}
      pl='1rem'
      pr='1rem'
      minW='10rem'
      _hover={hover}
      _active={{
        bg: 'var(--primary-dark-color)',
        transform: 'scale(0.98)'
      }}
      _focus={{
        boxShadow:
          '0 0 1px 2px rgba(88, 144, 255, .75), 0 1px 1px rgba(0, 0, 0, .15)',
      }}
      {...props}
    >
      {children}
    </Box>
  )
}
