"use client"
import { Col, Row, Button } from 'antd'
import { ImUserTie } from "react-icons/im";
import Title from 'antd/es/typography/Title';
import { useState } from 'react';

export default function AvatarField() {

    return (
        <Button className='h-auto px-3 py-2 shadow-sm shadow-slate-300' type='primary'>
            <Row className='gap-5'>
                <ImUserTie size={30} className='text-blue-500' />
                <p className='text-white font-bold text-xl'>Admin</p>
            </Row>
        </Button>
    )
}