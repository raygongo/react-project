import React from 'react'
import FooterLink from '@/containers/FooterLink'

const Footer = ( ) => (
    <p>
        SHOW:{"  "}
        <FooterLink filter="SHOW_ALL">ALL</FooterLink>
        {"    "}
        <FooterLink filter="SHOW_ACTIVE">ACTIVE</FooterLink>
        {"    "}
        <FooterLink filter="SHOW_COMPLETED">COMPLETED</FooterLink>
    </p>    
)

export default Footer