'use client'
import { Col, Card, Space, Button, Input, Form, message } from "antd"
import Title from 'antd/es/typography/Title';
import { MdEmail } from "react-icons/md";

export default function ForgetPasswordPage() {
    const onFinishForm = (values: any) => {
        console.log(values)
        message.success('An mail has been sent to your Email address', 10)
    }

    return (
        <Space direction="vertical" className="">
            <Card className="bg-transparent p-10">
                <Col>
                    <Title><p className="text-white">Lost Your Password ?</p></Title>
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
                                {
                                  type: 'email',
                                  message: 'Please enter a valid email address!',
                                },
                            ]}
                        >
                            <Input prefix={<MdEmail />} placeholder="Email Address" type='email'/>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="bg-green-500 w-full">
                                Get New Password
                            </Button>
                        </Form.Item>
                        <Form.Item
                            className="flex justify-end"
                        >
                            <a className="text-blue-500" href="/signin">
                                SignIn Here
                            </a>
                        </Form.Item>
                    </Form>
                </Col>
            </Card>
        </Space>
    )
}