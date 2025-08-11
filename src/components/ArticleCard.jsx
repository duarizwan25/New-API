import React from 'react'
import { Card, Typography } from 'antd'
import dayjs from 'dayjs'

const { Text } = Typography

export default function ArticleCard({ article }) {
  const thumb = article.fields?.thumbnail
  return (
    <Card
      hoverable
      onClick={() => window.open(article.webUrl, '_blank')}
      style={{
        borderRadius: 12,
        overflow: 'hidden',
        background: 'var(--card)',
        border: '1px solid rgba(0,0,0,0.06)',
        transition: 'transform 200ms ease, box-shadow 200ms ease',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        color: '#000'
      }}
      bodyStyle={{
        padding: 16,
        flex: 1,
        display: 'flex',
        flexDirection: 'column'
      }}
      cover={
        thumb ? (
          <img
            src={thumb}
            alt=""
            style={{
              width: '100%',
              height: 160,
              objectFit: 'cover'
            }}
          />
        ) : null
      }
    >
      <div style={{ flex: 1 }}>
        <div
          style={{
            fontWeight: 700,
            color: '#000',
            marginBottom: 8
          }}
        >
          {article.webTitle}
        </div>
        <div
          style={{
            color: '#000',
            fontSize: 13
          }}
          dangerouslySetInnerHTML={{
            __html: article.fields?.trailText || ''
          }}
        />
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: 12
        }}
      >
        <Text style={{ color: '#000', fontSize: 12 }}>
          {article.fields?.byline || ''}
        </Text>
        <Text style={{ color: '#000', fontSize: 12 }}>
          {dayjs(article.webPublicationDate).format('DD MMM YYYY')}
        </Text>
      </div>
    </Card>
  )
}
