import React from 'react'
import {Row, Col} from "react-bootstrap"

const Article = () => {
    return (
        <Row id="article" className="pt-3">
           <Col xs={12}>
               <h3>أماكن حقن الأنسولين في الجسم</h3>
           </Col>
           <Col xs={12}>
               <p>تستخدم حقن الانسولين لخفض مستويات الجلوكوز في الدم لدى بعض مرضى السكري وهناك العديد من الاماكن لحقن</p>
           </Col>
           <Col xs={12}>
                <p>شيماء العدوي</p>
           </Col>
           <Col xs={12}>
                <p>26 July 2021</p>
           </Col>
        </Row>
    )
}

export default Article
