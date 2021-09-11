import React from 'react'
import { Container, Row, Col} from "react-bootstrap";
import OwlCarousel from 'react-owl-carousel';
import "./owl.carousel.min.css"
import "./owl.theme.default.min.css"

const Carousel = () => {
    return (
        <Container fluid id="carousel" className="py-5 position-relative">
          <Row className="justify-content-center">
              <Col md={8} lg={6}>
                    <OwlCarousel className="owl-theme text-center" loop autoplay items={1} smartSpeed={1000}>
                        <div className="item">
                            <div className="carousel-text">
                                <p>تتبع دائمًا مستوى السكر في الدم، حتى تتمكن من اتخاذ الإجراءات وفقًا لذلك للحفاظ على السيطرة عليها، ويجب أن تختبر مستوى السكر في الدم بشكل متكرر حسب حالتك.</p>
                            </div>
                            <img alt="" src="images/carousel1.jpeg" className="img-fluid" />
                        </div>
                        <div className="item">
                            <div className="carousel-text">
                                <p>تتبع دائمًا مستوى السكر في الدم، حتى تتمكن من اتخاذ الإجراءات وفقًا لذلك للحفاظ على السيطرة عليها، ويجب أن تختبر مستوى السكر في الدم بشكل متكرر حسب حالتك.</p>
                            </div>
                            <img alt="" src="images/carousel2.jpeg" className="img-fluid" />
                        </div>
                        <div className="item">
                            <div className="carousel-text">
                                <p>تتبع دائمًا مستوى السكر في الدم، حتى تتمكن من اتخاذ الإجراءات وفقًا لذلك للحفاظ على السيطرة عليها، ويجب أن تختبر مستوى السكر في الدم بشكل متكرر حسب حالتك..</p>
                            </div>
                            <img alt="" src="images/carousel3.jpeg" className="img-fluid" />
                        </div>
                         
                    </OwlCarousel>
              </Col>
          </Row>
        </Container>
    )
}

export default Carousel
