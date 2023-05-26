import axios from 'axios';
import { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';

export default function App() {
  //상태, 함수, 상수, 변수 들어가는 자리

  // 네트워킹 방식 1. axios third party (선호 직관적) 2. 기본 내장
  // fetch 데이터가 어떻게 들어오는지 확인
  // 데이터 담을 그릇 만들기
  const [newsData, setNewsData] = useState([]);

  // 데이터를 불러올 함수 만들기 네트워킹시 async/await
  const getNewsData = async () => {
    const address =
      'https://newsapi.org/v2/everything?q=tesla&from=2023-04-26&sortBy=publishedAt&apiKey=5fddc9cea96243d286344fda2da50446';
    await fetch(address) // 동기 방식 , Header, network 정보가 담겨져 있지 않다. axios fetch 의 차이
      .then((res) => res.json()) // 형태변환 text -> json
      .then((response) => setNewsData(response.articles));

    // try {
    //   const address =
    //     'https://newsapi.org/v2/everything?q=tesla&from=2023-04-26&sortBy=publishedAt&apiKey=5fddc9cea96243d286344fda2da50446';
    //   // const { data, status } = await axios.get(address); // 직접호출
    //   // console.log('********************', data);

    //   // fetch
    //   fetch(address)
    //     .then((res) => res.json()) // 형태변환 text -> json
    //     .then((response) => console.log(response));

    //   // if (status === 200) {
    //     // 명확하게 만약 성공했지만 데이터가 없을 경우, 에러핸들링 대비하기 위해
    //     // setNewsData(data.articles);
    //   }
    // } catch (error) {
    //   // 모든 에러를 상수화
    //   console.log(error.message);
    // }
  };

  // 데이터 화면에 뿌려주기 (자동으로 실행하는 함수(훅))
  useEffect(() => {
    getNewsData();
  }, []);

  // 이쁘게 뿌려주기 (html, css) 데이터 처리 (개발자)
  return (
    // 화면에 보여지는 부분 html
    <Container>
      <Row>
        {/* <h1>{newsData.length}</h1> */}

        {/* <button onClick={getNewsData}>데이터 가져오기</button> */}

        {/* 하나의 데이터를 샘플링(표준화, 상수화, news) */}
        {newsData &&
          newsData.map((news) => (
            <Col className='mt-5'>
              <Card style={{ width: '18rem' }}>
                <Card.Img
                  variant='top'
                  style={{ height: '180px' }}
                  src={news.urlToImage}
                />
                <Card.Body>
                  <Card.Title>{news.title.slice(0, 15)}</Card.Title>
                  <Card.Text>{news.description.slice(0, 100)}</Card.Text>

                  <Card.Text>author: {news.author}</Card.Text>
                  <Card.Text>
                    <h5>publishedAt: {news.publishedAt.slice(0, 10)}</h5>
                  </Card.Text>

                  <Button href={news.url} variant='primary'>
                    {/* <a href={news.url}>기사 보기</a> */}
                    기사 보기
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
      </Row>
    </Container>
  );
}
