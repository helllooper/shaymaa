import React, {useEffect, useRef} from 'react'
import {Container, Row, Col, Card} from "react-bootstrap";
import {gsap} from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger";

const Circles = () => {
    gsap.registerPlugin(ScrollTrigger);
    const col1 = useRef();
    const col2 = useRef();
    const col3 = useRef();
    const cols = [col1, col2, col3];
    useEffect(() => {
        cols.forEach((el) => {
            gsap.to(el.current,{
                css:{"transform":"translateX(0)"},
                duration:2,
                scrollTrigger:{
                    trigger:el.current,
                    start:"top 75%",
                    toggleActions:"play none none none"
                }
            })
        })
     },[])
    return (
        <Container className="portion1 position-relative" fluid>
            <h1 className="text-center fw-bold py-5">ما هي <span id="aim">أهدافنا</span></h1>
            <Row className="align-items-start">
                <Col ref={col1} id="col1" lg={3}>
                    <Row>
                        <div className="col-12 position-relative">
                            <div className="dummy test"></div>
                            <div id="element1" className="element"></div>
                        </div>
                        <div className="my-2 text-center">
                            <h3>تبادل الرؤى</h3>
                            <p>صياغة رؤية  كاملة وشاملة تشترك بها  الدولة والشباب المصري معاً من خلال الحوار</p>
                        </div>
                    </Row>
                </Col>
                <Col ref={col2} id="col2" lg={4}>
                    <Row>
                        <div className="col-12 position-relative">
                            <div className="dummy"></div>
                            <div id="element2" className="element"></div>
                        </div>
                        <div className="my-2 text-center">
                            <h3>تبادل الرؤى</h3>
                            <p>صياغة رؤية  كاملة وشاملة تشترك بها  الدولة والشباب المصري معاً من خلال الحوار</p>
                        </div>
                    </Row>                    
                </Col>
                <Col ref={col3} id="col3"  lg={5}>
                    <Row>
                        <div className="col-12 position-relative">
                            <div className="dummy"></div>
                            <div id="element3" className="element"></div>
                        </div> 
                    </Row> 
                    <div className="my-2 text-center">
                            <h3>تبادل الرؤى</h3>
                            <p>صياغة رؤية  كاملة وشاملة تشترك بها  الدولة والشباب المصري معاً من خلال الحوار</p>
                    </div>              
                </Col>
            </Row>
        </Container>
    )
}

export default Circles
