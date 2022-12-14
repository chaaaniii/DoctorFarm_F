import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "antd/dist/antd.min.css";
// import { Carousel, Card } from "antd";
// import pepper from '../components/img/berry.jpg'
// import bggif from '../components/img/1oxd.gif'
import './Main.scss'
import AOS from "aos";
import "aos/dist/aos.css";
import video from "../components/img/farm.mp4"
//스코롤 모션
// import { Animator, ScrollContainer, ScrollPage, batch, FadeIn } from "react-scroll-motion";



// const contentStyle = {
//   height: '300px',
//   width: '93%',
//   color: 'black',
//   lineHeight: '160px',
//   textAlign: 'center',
//   BackgroundColor: 'balck',
//   // paddingLeft :'10%' ,
//   // paddingRight : '10%',
//   marginTop: '3%',
//   marginRight: '40%',
//   marginLeft: '3%',
//   marginBottom: '3%'
// };



export default function Main() {

  useEffect(() => {
    AOS.init();
  })
  const navigate = useNavigate();

  const gotoAI = () => {
    navigate("/AI");
  }

  // const { Meta } = Card;

  return (
    <div className='Main-Body'>
      <video className='bg-video' autoPlay muted loop playsinline>
        <source src={video} type="video/mp4" />
      </video>
      <span className='Mainhead'>
        <h1 ><b className="AI">A.I로 농작물의 병해를 진단해 보세요.</b></h1>
        <h3><span className="AI">AI를 이용하여 농작물의 질병을 감지하고 해결책을 받아보세요.<br/>
        다른 유저들과 함께 비슷한 질병에 대해서 이야기를 나눠보고 자신의 노하우를 공유하세요.<br/>
        모두 건강한 농작물을 키워봅시다. 
       
        </span></h3>
        <button className='gotoAI' onClick={gotoAI}>진료받기</button>

      </span>



      {/* <div data-aos="fade-up-left" className='Card'>
        <Carousel
          autoplay
          draggable={true}
          slidesToShow={3}>
          <span className='Card__Card1'>
            <Card hoverable style={{ width: 330 }} cover={<img src={pepper} />}>
              <Meta title="AI 진단" description="www.ai진단.com" />
            </Card>
          </span>
          <span className='Card__Card1'>
            <Card hoverable style={{ width: 330 }} cover={<img src={pepper} />}>
              <Meta title="AI 진단" description="www.ai진단.com" />
            </Card>
          </span>
          <span className='Card__Card1'>
            <Card hoverable style={{ width: 330 }} cover={<img src={pepper} />}>
              <Meta title="AI 진단" description="www.ai진단.com" />
            </Card>
          </span>
          <span className='Card__Card1'>
            <Card hoverable style={{ width: 330 }} cover={<img src={pepper} />}>
              <Meta title="AI 진단" description="www.ai진단.com" />
            </Card>
          </span>
          <span className='Card__Card1'>
            <Card hoverable style={{ width: 330 }} cover={<img src={pepper} />}>
              <Meta title="AI 진단" description="www.ai진단.com" />
            </Card>
          </span>
          <span className='Card__Card1'>
            <Card hoverable style={{ width: 330 }} cover={<img src={pepper} />}>
              <Meta title="AI 진단" description="www.ai진단.com" />
            </Card>
          </span>
          <span className='Card__Card1'>
            <Card hoverable style={{ width: 330 }} cover={<img src={pepper} />}>
              <Meta title="AI 진단" description="www.ai진단.com" />
            </Card>
          </span>
        </Carousel>
      </div>

      <div className='Body1'>
        <h1 className='carou_title'>
          Best Solution!
        </h1>
        <Carousel dotPosition='left' autoplay>
          <div>
            <img style={contentStyle} src={pepper}></img>
          </div>
          <div>
            <img style={contentStyle} src={bggif}></img>
          </div>
          <div>
            <img style={contentStyle} src={bggif}></img>
          </div>
          <div>
            <img style={contentStyle} src={bggif}></img>
          </div>
        </Carousel>
      </div>

      <ScrollContainer>
        <ScrollPage>
          <Animator animation={batch(FadeIn(0, 500))}>
            <img style={contentStyle} src={bggif}></img>
          </Animator>
        </ScrollPage>
      </ScrollContainer> */}
    </div >

  );
}

