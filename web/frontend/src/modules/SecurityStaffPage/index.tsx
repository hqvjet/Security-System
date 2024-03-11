"use client"
import { Row, Col, Typography } from 'antd'
import AvatarField from '@/components/AvatarField'
import Text from 'antd/es/typography/Text'
import Title from 'antd/es/typography/Title';
import { useState } from 'react';

export default function SecurityStaffPage() {
    const [video, setVideo] = useState(null)
    const [alert, setAlert] = useState(false)

    return (
        <>
            {!video ? (
                <Title level={1}><p className='text-green-500'>NO VIOLENCE DETECTED</p></Title>
            ) : (
                <div>video</div>
            )}
        </>
    )
}