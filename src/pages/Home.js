import React from 'react'
import "antd/dist/antd.min.css";
import { Carousel, Card } from "antd";
import pepper from '../components/img/berry.jpg'
import "./Home.css";
import ad from '../components/img/ad.png'



export default function Home() {

  const { Meta } = Card;

  return (
    <>

      &nbsp;
      <div className='detected-imgbox'>image</div>
      <div data-aos="fade-up-left" className='Card'>
        <span className='Card__Card1'>
          <Card hoverable style={{ width: 300 }} cover={<img src={pepper} />}>
            <Meta title="AI 진단" description="www.ai진단.com" />
          </Card>
        </span>
        <span className='Card__Card1'>
          <Card hoverable style={{ width: 300 }} cover={<img src={pepper} />}>
            <Meta title="AI 진단" description="www.ai진단.com" />
          </Card>
        </span>
        <span className='Card__Card1'>
          <Card hoverable style={{ width: 300 }} cover={<img src={pepper} />}>
            <Meta title="AI 진단" description="www.ai진단.com" />
          </Card>
        </span>
      </div>
      <img src={ad}></img>
    </>
  )
}
