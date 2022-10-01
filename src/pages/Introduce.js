import { useState, useEffect } from 'react';
import './introduce.scss';
import doctor_img from '../components/img/doctor-bg.jpeg';
import farm_img from '../components/img/farm.jpg';
import pepper from '../components/img/pepper.jpg';
import ai_img from '../components/img/ai.jpg';
import guide_img1 from '../components/img/guide1.gif';
import guide_img2 from '../components/img/guide2.gif';
import guide_img3 from '../components/img/guide3.gif';

export default function Introduce() {

  const [introducetitle, setIntroducetitle] = useState('');
  const [count, setCount] = useState(0);
  const completedTitle = '최적의 솔루션을 받고\n건강한 농작물을 기를수 있는 곳 ';

  useEffect(() => {
    // var typingInterval = setInterval(() => {
    //   setIntroducetitle((prevTitleValue) => {
    //     let result = prevTitleValue ? prevTitleValue + completionWord[count] : completionWord[0];
    //     setCount(count + 1);

    //     if (count == completionWord.length) {
    //       setCount(0);
    //       setIntroducetitle('');
    //       clearInterval(typingInterval)
    //     }

    //     return result;
    //   });
    // }, 100);
    var typingInterval = setInterval(() => {
      // 만약, count가 completedTitle의 길이와 같거나 커지면 반복을 멈춘다.
      if (count >= completedTitle.length) {
        return;
      }

      setIntroducetitle((prevTitleValue) => {
        let result = prevTitleValue ? prevTitleValue + completedTitle[count] : completedTitle[0];
        setCount(count + 1);
        return result;
      });

      // 150ms에 한번씩 연산이 진행된다.
      // 즉, 150ms에 한번씩 문자열이 늘어난다.(타이핑 효과)
    }, 100);

    return () => {
      clearInterval(typingInterval);
    };
  });

  return (
    <>
      <div className='introduce-head'>
        <img className='head_img' src={doctor_img}></img>
        <div className='head-title'>
          {introducetitle}
        </div>
      </div>
      <div className='introduce-body'>
        <div className='int-body1'>
          <div className='int-text'>
            <h1 className='dev_reason'>개발이유</h1>
            <span>저희의 서비스 주제를</span>
            <span>농작물 병해 감지로 선택한 이유</span>
          </div>
          <div className='dev_img'>
            <img className='dev_img1' src={farm_img}></img>
            <div className='inner_content'>
              <span className='inner_title'>2030 청년농부</span>
              <hr />
              &nbsp;
              <span className='overview'>
                30대 이하 귀농 가구의 증가세가 두드러졌습니다. 지난해 가구주가 30대 이하인 귀농 가구는 전년보다 12.7% 늘어난 1362가구입니다. 이들이 귀농 가구에서 차지하는 비중은 10.9%였지만 숫자는 꾸준히 늘고 있습니다. 또한 귀농 가구의 약 70%를 차지하는 50, 60대 가구는 8425가구로 같은 기간 9.3% 늘었습니다.
              </span>
            </div>
          </div>
          <div className='dev_img-1'>
            <img className='dev_img1' src={pepper}></img>
            <div className='inner_content'>
              <span className='inner_title'>초보 귀농인</span>
              <hr />
              &nbsp;
              <span className='overview'>
                기후변화, 자연재해로 인한 농작물 병해 피해가 증가하며, 초보 청년 귀농인의 병해에 대한 전문성 부족 등등 안정적인 작물 생산을 가장 저해하는 요인을 해결하는게 저희 서비스의 목적입니다.
              </span>
            </div>
          </div>
          <div className='dev_img'>
            <img className='dev_img1' src={ai_img}></img>
            <div className='inner_content'>
              <span className='inner_title'>AI 진단</span>
              <hr />
              &nbsp;
              <span className='overview'>
                초보 농부들은 눈으로 직접 농작물의 병해를 알아내기 힘들 것 입니다. 저희 서비스는 인공지능(AI)으로 눈으로 식별하기 어려운 병해를 진단해주고 그에 걸맞는 서비스와 농약을 추천해 드리는게 저희 서비스의 궁극적인 목표입니다.
              </span>
            </div>
          </div>
        </div>
        <div className='int-body2'>
          <div className='int-text'>
            <h1 className='dev_reason'>서비스 소개</h1>
            <div className='guide1'>
              <p>1. 이미지를 업로드 하세요!</p>
              <img className='guide_img1' src={guide_img1}></img>
            </div>
            <div className='guide2'>
              <p>2. 병해의 솔루션을 받고<br />유사증상과 추천농약을 제공받으세요!</p>
              <img className='guide_img2' src={guide_img2}></img>
            </div>
            <div className='guide3'>
              <p>3. 게시글을 올리고 포인트를 받으세요!<br />다른 사용자와 노하우도 공유해요!</p>
              <img className='guide_img3' src={guide_img3}></img>
            </div>
            &nbsp;
          </div>
        </div>
      </div>
    </>
  )
}
