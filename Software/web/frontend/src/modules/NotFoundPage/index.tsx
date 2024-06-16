import { Button, Result } from 'antd'

export default function NotFoundPage() {
    return (
        <Result
            status="404"
            title={<span className='text-white font-bold text-6xl'>404</span>}
            subTitle={<span className='text-gray-400 font-bold text-lg'>Sorry, the page you visited does not exist.</span>}
            extra={<Button type="primary" className='bg-green-400 hover:bg-green-600'>Back Home</Button>}
        />
    )
}