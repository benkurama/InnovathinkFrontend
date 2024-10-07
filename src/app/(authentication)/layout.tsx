import { Container } from 'react-bootstrap'
import React from 'react'
import { ReactQueryClient } from '@/components/root/ReactQueryClient';

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    
    <div className="bg-light dark:bg-dark min-vh-100 d-flex flex-row align-items-center">
      <Container>

        {children}
        
      </Container>
    </div>
  )
}
