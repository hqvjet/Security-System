# Logic to create a new admin user
# You will need to implement this logic based on your requirements
# For example:
# - Hashing the password
# - Generating an access key
# - Creating a new Admin object with the provided data
# - Adding the new Admin object to the database
# - Returning a success message or the newly created Admin object"use client"
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