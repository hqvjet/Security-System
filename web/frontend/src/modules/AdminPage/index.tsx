'use client'
import { Row, Col, Table } from "antd"
import { cols, data } from "./MOCKDATA"

export default function Admin() {
    return (
        <Col className="w-3/4">
            <Table
                columns={cols}
                dataSource={data}
                className="bg-gray-800 border border-gray-700 divide-y divide-gray-700"
            />
        </Col>
    )
}