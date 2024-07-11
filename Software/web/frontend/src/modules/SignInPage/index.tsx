'use client'
import { Col, Row, Card, Space, Form, Input, Button, message } from "antd"
import { FaUser, FaLock } from "react-icons/fa";
import Title from 'antd/es/typography/Title';

export default function SignInPage() {

    const onFinishForm = (values: any) => {
        console.log(values)
        message.error('Login failed')
    }

    return (
        <Space direction="vertical" className="">
            <Card className="bg-transparent p-10">
                <Col>
                    <Title><p className="text-white">Welcome Back</p></Title>
                    <Form
                        name='sign-in'
                        onFinish={onFinishForm}
                    >
                        <Form.Item
                            name='username'
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your Username!',
                                },
                            ]}
                        >
                            <Input prefix={<FaUser />} placeholder="USername" />
                        </Form.Item>
                        <Form.Item
                            name='password'
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your Password!',
                                },
                                {
                                    min: 6,
                                    message: 'Password must be at least 6 characters long',
                                },
                                {
                                    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/,
                                    message: 'Password must contain at least one uppercase letter, one lowercase letter, and one digit',
                                }
                            ]}
                        >
                            <Input prefix={<FaLock />} placeholder="Password" type="password" />
                        </Form.Item>
                        <Form.Item
                            className="flex justify-end"
                        >
                            <a className="text-blue-500 text-right" href="/signin/forget">
                                Forgot password
                            </a>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="bg-green-500 w-full">
                                Log in
                            </Button>
                        </Form.Item>
                    </Form>
                </Col>
            </Card>
        </Space>
    )
}