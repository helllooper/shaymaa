import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

const HomePageVideo = () => {
    return (
        <Container id="video" className="position-relative text-center pb-5">
            <h1 className="pb-5 fw-bold">مقدمة عن مرض <span className="aim">السكري</span></h1>
            <Row className="justify-content-center">
              <Col md={10} lg={8}>
                  <iframe id="homePageVideo" className="w-100" src="https://www.youtube.com/embed/V9v_bQuaNZU" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
              </Col>
            </Row>
        </Container>
    )
}

export default HomePageVideo
