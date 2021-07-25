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
                            <div class="carousel-text">
                                <p>تتبع دائمًا مستوى السكر في الدم، حتى تتمكن من اتخاذ الإجراءات وفقًا لذلك للحفاظ على السيطرة عليها، ويجب أن تختبر مستوى السكر في الدم بشكل متكرر حسب حالتك.</p>
                            </div>
                            <img src="images/carousel1.jpeg" class="img-fluid" />
                        </div>
                        <div className="item">
                            <div class="carousel-text">
                                <p>تتبع دائمًا مستوى السكر في الدم، حتى تتمكن من اتخاذ الإجراءات وفقًا لذلك للحفاظ على السيطرة عليها، ويجب أن تختبر مستوى السكر في الدم بشكل متكرر حسب حالتك.</p>
                            </div>
                            <img src="images/carousel2.jpeg" class="img-fluid" />
                        </div>
                        <div className="item">
                            <div class="carousel-text">
                                <p>تتبع دائمًا مستوى السكر في الدم، حتى تتمكن من اتخاذ الإجراءات وفقًا لذلك للحفاظ على السيطرة عليها، ويجب أن تختبر مستوى السكر في الدم بشكل متكرر حسب حالتك..</p>
                            </div>
                            <img src="images/carousel3.jpeg" class="img-fluid" />
                        </div>
                         {/* <div class='item'>
                            <h4 className="text-center">test1</h4>
                         </div>
                         <div class='item'>
                            <h4 className="text-center">test2</h4>
                         </div>
                         <div class='item'>
                            <h4 className="text-center">test3</h4>
                         </div> */}
                    </OwlCarousel>
              </Col>
          </Row>
        </Container>
    )
}

export default Carousel
