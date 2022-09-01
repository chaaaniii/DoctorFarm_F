import React, { useState, useEffect } from 'react';
import "antd/dist/antd.min.css";
import { Carousel, Card } from "antd";
import pepper from '../components/img/berry.jpg'
import bggif from '../components/img/1oxd.gif'
import './Main.scss'
import AOS from "aos";
import "aos/dist/aos.css";
//스코롤 모션
import { Animator, ScrollContainer, ScrollPage, batch, Fade, FadeIn, FadeOut, Move, MoveIn, MoveOut, Sticky, StickyIn, StickyOut, Zoom, ZoomIn, ZoomOut } from "react-scroll-motion";


//이거 스코롤 모션
const ZoomInScrollOut = batch(StickyIn(), FadeIn(), ZoomIn());
const FadeUp = batch(Fade(), Move(), Sticky());

const contentStyle = {
  height: '300px',
  width: '93%',
  color: 'black',
  lineHeight: '160px',
  textAlign: 'center',
  BackgroundColor: 'balck',
  // paddingLeft :'10%' ,
  // paddingRight : '10%',
  marginTop: '3%',
  marginRight: '40%',
  marginLeft: '3%',
  marginBottom: '3%'
};





export default function Main() {

  const [ScrollY, setScrollY] = useState(0);
  const [BtnStatus, setBtnStatus] = useState(false); // 버튼 상태

  const handleFollow = () => {
    setScrollY(window.pageYOffset);
    if (ScrollY > 50) {
      // 100 이상이면 버튼이 보이게
      setBtnStatus(true);
    } else {
      // 100 이하면 버튼이 사라지게
      setBtnStatus(false);
    }
  }

  const handleTop = () => {  // 클릭하면 스크롤이 위로 올라가는 함수
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
    setScrollY(0);  // ScrollY 의 값을 초기화
    setBtnStatus(false); // BtnStatus의 값을 false로 바꿈 => 버튼 숨김
  }

  useEffect(() => {
    const watch = () => {
      window.addEventListener('scroll', handleFollow)
    }
    watch();
    return () => {
      window.removeEventListener('scroll', handleFollow)
    }
  })

  useEffect(() => {
    AOS.init();
  })

  const { Meta } = Card;


  return (
    <div className='Body'>

      <div className='banner'>
        <Carousel autoplay>
          <div className='Mainhead'>
            <h1 ><b className="AI">Detect Disease with A.I</b></h1>
            <h3><span className="AI">A.I로 농작물의 병해를 찾고, 그에 따른 솔루션을 받아보세요.</span></h3>
          </div>
          <div className='Mainhead2'>
            <h1 ><b className="sol">Share your diagnosed solution</b></h1>
            <h3><span className="sol">진단 받은 솔루션을 통해 개선된 결과를 이용자들과 함께 공유해 보세요.</span></h3>
          </div>
          <div className='Mainhead3'>
            <h1 ><b className="board">Let's talk on the board</b></h1>
            <h3><span className="board">게시판 안에서 다양한 사람들과 자유롭게 이야기를 나누어 보세요.</span></h3>
          </div>
        </Carousel>
      </div>

      <div data-aos="fade-up-left" className='Card'>
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
      </ScrollContainer>
      <div >
        <button
          className={BtnStatus ? "topBtn active" : "topBtn"} // 버튼 노출 여부
          onClick={handleTop}  // 버튼 클릭시 함수 호출
        >TOP</button>
      </div>
    </div>

  );
}

