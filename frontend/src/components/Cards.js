import React , {useRef, useEffect} from 'react'
import {Container,Row, Col, Card, Button} from "react-bootstrap"
import {gsap} from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger";

const Cards = () => {
    gsap.registerPlugin(ScrollTrigger);
    const card1 = useRef();
    const card2 = useRef();
    const card3 = useRef();
    useEffect(() => {
        const cards = [card1, card2, card3];
        cards.forEach((el) => {
            gsap.to(el.current,{
                opacity:1,
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
        <Container id="cards" className="position-relative py-5" fluid>
            <Row>
                <Col md={4}>
                    <Card ref={card1}>
                        <Card.Header id="card-header-1">
                            <h2 className="text-center fw-bold py-4">معامل الكربوهيدرات</h2>
                        </Card.Header>
                        <Card.Body>
                            <p>يساعدنا فى تحديد جرعة الأنسولين السريع بدقة
                            وهذا يساعدنا فى الوصول ل سكر مظبوط ويجعلنا نتجنب السكر العالى أو السكر المنخفض ( نوبات الهبوط )
                            السكرى المعتمد على الأنسولين السريع والقاعدى لازم يعرف أساسيات التعامل مع السكري ومن بينها معامل الكارب ومعامل التصحيح
                            </p>
                            <Button id="cardButton1" variant="outilne-secondary fw-bold" size="lg">اقرأ المزيد</Button>
                        </Card.Body>                        
                    </Card>
                </Col>
                <Col md={4}>
                    <Card ref={card2}>
                        <Card.Header id="card-header-2">
                            <h2 className="text-center fw-bold py-4">معامل تصحيح الارتفاع</h2>
                        </Card.Header>
                        <Card.Body>
                            <p>يساعدنا فى تحديد جرعة الأنسولين السريع بدقة
                            وهذا يساعدنا فى الوصول ل سكر مظبوط ويجعلنا نتجنب السكر العالى أو السكر المنخفض ( نوبات الهبوط )
                            السكرى المعتمد على الأنسولين السريع والقاعدى لازم يعرف أساسيات التعامل مع السكري ومن بينها معامل الكارب ومعامل التصحيح
                            </p>
                            <Button id="cardButton2" variant="outilne-secondary fw-bold" size="lg">اقرأ المزيد</Button>
                        </Card.Body>                        
                    </Card>
                </Col>
                <Col md={4}>
                    <Card ref={card3}>
                        <Card.Header id="card-header-3">
                            <h2 className="text-center fw-bold py-4">معامل الرفع</h2>
                        </Card.Header>
                        <Card.Body>
                            <p>يساعدنا فى تحديد جرعة الأنسولين السريع بدقة
                            وهذا يساعدنا فى الوصول ل سكر مظبوط ويجعلنا نتجنب السكر العالى أو السكر المنخفض ( نوبات الهبوط )
                            السكرى المعتمد على الأنسولين السريع والقاعدى لازم يعرف أساسيات التعامل مع السكري ومن بينها معامل الكارب ومعامل التصحيح
                            </p>
                            <Button id="cardButton3" variant="outilne-secondary fw-bold" size="lg">اقرأ المزيد</Button>
                        </Card.Body>                        
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default Cards
