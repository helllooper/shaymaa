import React, {useEffect, useRef} from 'react';
import {Container, Row} from "react-bootstrap";
import {gsap} from "gsap"

const MainPic = () => {
  const image = useRef(); 
  useEffect(() => {
     gsap.fromTo(image.current, {css: { 'filter': 'grayscale(100%)','-webkit-filter': 'grayscale(100%)' }}, {delay:1, duration:3, css: { 'filter': 'grayscale(0%)','-webkit-filter': 'grayscale(0%)' }})
  })
    return (
          <Container fluid className="picContainer position-relative">
              <Row> 
                <img alt="" ref={image} className="mainPic img-fluid px-0" src="/images/kids.jpg" />
              </Row>
              
          </Container>
          
    )
}

export default MainPic
