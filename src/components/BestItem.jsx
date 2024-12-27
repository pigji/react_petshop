import React from 'react';
import { Link } from 'react-router-dom';
import './BestItem.scss';

const BestItem = () => {
  return (
    <div className='bestItem'>
      <h2>Best Item</h2>
      <p>Anniversary Sale early</p>
      <div className="best">
        <ul className="flexbox">
          <li>
            <Link to="">
              <span className='bestsp'>
                <div className="bestTextBox">
                  <b>루나 베이직 물병식기</b>
                  <p>보급형 물병은 퍼피의 체형에 맞게 높이 조절이 가능합니다.<br />모든 구성품은 분리가 가능하여 세척이 용이합니다.</p>
                  <span>More Btn</span>
                </div>
              </span>
            </Link>
          </li>
          <li>
            <div className="bestbox">
              <ul>
                <li>
                  <Link to="">
                    <div className="aWrap">
                      <b>반자동급식</b>
                      <p>먹은만큼 사료가 나와 외출시에도 끼니 걱정 NO!<br />반려동물이 자율적으로 먹을 수 있습니다.</p>
                    </div>
                  </Link>
                </li>
                <li>
                  <Link to="">
                    <div className="aWrap">
                      <span>
                        <i>
                          <button>More View</button>
                        </i>
                      </span>
                    </div>
                  </Link>
                </li>
                <li>
                  <Link to="">
                    <div className="aWrap">
                      <span>
                        <i>
                          <button>More View</button>
                        </i>
                      </span>
                    </div>
                  </Link>
                </li>
                <li>
                  <Link to="">
                    <div className="aWrap">
                      <b>반려동물 접이식 밥그릇 2p세트</b>
                      <p>늘렸다 줄였다 높이 조절로 편리~<br />반려동물이 휴대용 접이식 밥그릇</p>
                    </div>
                  </Link>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default BestItem;