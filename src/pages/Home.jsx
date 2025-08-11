import React, { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchFromGuardian } from '../api/newsApi';
import { Layout, Input, Row, Col, Pagination, Spin, Typography, Empty } from 'antd';
import ArticleCard from '../components/ArticleCard';
import './Home.css';

const { Header, Content } = Layout;
const { Search } = Input;
const { Title } = Typography;

export default function Home() {
  const [q, setQ] = useState('');
  const [page, setPage] = useState(1);
  const pageSize = 12;

  const queryKey = useMemo(() => ['guardian', { q, page, pageSize }], [q, page, pageSize]);

  const { data, isLoading, isError } = useQuery({
    queryKey,
    queryFn: fetchFromGuardian,
    keepPreviousData: true,
    staleTime: 1000 * 60
  });

  const results = data?.results || [];
  const total = data?.total || 0;

  return (
    <Layout style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <Header className="custom-navbar">
        <div className="search-bar-container">
          <Search
            placeholder="Search news (press Enter)"
            enterButton="Search"
            size="large"
            onSearch={(val) => {
              setQ(val);
              setPage(1);
            }}
            allowClear
            className="custom-search"
          />
        </div>
        <div className="logo-text">The Guardian</div>
      </Header>

      <Content style={{ padding: '28px' }}>
        {isLoading ? (
          <div className="center-content">
            <Spin size="large" />
          </div>
        ) : isError ? (
          <div className="center-content error">
            Failed to load news. Check your .env key and network.
          </div>
        ) : results.length === 0 ? (
          <div className="center-content">
            <Empty description="No articles found" />
          </div>
        ) : (
          <>
            <Row gutter={[20, 20]}>
              {results.map((item) => (
                <Col key={item.id} xs={24} sm={12} md={8} lg={6}>
                  <ArticleCard article={item} />
                </Col>
              ))}
            </Row>

            <div style={{ display: 'flex', justifyContent: 'center', marginTop: 28 }}>
              <Pagination
                current={page}
                pageSize={pageSize}
                total={total}
                onChange={(p) => setPage(p)}
                showSizeChanger={false}
                responsive
              />
            </div>
          </>
        )}
      </Content>
    </Layout>
  );
}
