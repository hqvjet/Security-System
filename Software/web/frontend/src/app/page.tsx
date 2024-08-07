import { Row, Col } from 'antd';

export default function Home() {
  return (
    <Row justify="center" align="middle" style={{ minHeight: '100vh', backgroundColor: '#f0f2f5' }}>
      <Col span={12} style={{ textAlign: 'center' }}>
        <h1 style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '1rem' }}>Hệ thống phòng chống bạo lực</h1>
        <p style={{ fontSize: '1.2rem', color: '#555', marginBottom: '2rem' }}>
          Hệ thống phòng chống bạo lực - xử lý các vấn đề liên quan đến bạo lực.
        </p>
        <Row justify="center">
          <Col>
            <a href="/login">
              <button style={{ padding: '10px 20px', fontSize: '1.2rem', backgroundColor: '#1890ff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                Tìm hiểu thêm
              </button>
            </a>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}
