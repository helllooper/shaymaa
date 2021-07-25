import React, {useEffect, useRef} from 'react'
import {Container, Row, Col, Button} from "react-bootstrap";
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
            <h1 className="text-center fw-bold py-5">ما هي <span className="aim">أهدافنا</span></h1>
            <Row className="align-items-start">
                <Col ref={col1} id="col1" md={3}>
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
                <Col ref={col2} id="col2" md={4}>
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
                <Col ref={col3} id="col3"  md={5}>
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
            <div className="my-5 text-center text-md-start">
               <Button variant="outilne-secondary fw-bold" size="lg">اقرأ المزيد</Button>
            </div>
        </Container>
    )
}

export default Circles
