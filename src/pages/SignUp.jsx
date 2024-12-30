import React, { useState, useRef, useEffect } from "react";
import { IoCheckmark } from "react-icons/io5"; //리액트 아이콘
import "./SignUp.scss"; //스타일

const SignUp = () => {
  const idInputRef = useRef(null);
  const pwInputRef = useRef(null);
  const nameInputRef = useRef(null);
  const phoneInputRef = useRef(null);
  const emailInputRef = useRef(null);
  const birthInputRef = useRef(null);

  const [id, setId] = useState(""); //아이디
  const [pw, setPw] = useState(""); //비밀번호
  const [pw2, setPw2] = useState(""); //비밀번호 확인
  const [name, setName] = useState(""); //이름
  const [phone, setPhone] = useState(""); //휴대폰
  const [email, setEmail] = useState(""); //이메일
  const [birth, setBirth] = useState(""); //생년월일

  //정규표현식( ^:시작위치 , $:끝위치 )
  const idRule = /^[a-z0-9]{4,16}$/; // 소문자 a-z까지, 숫자0-9까지
  const pwRule = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,16}$/; // 대/소문자 a-z까지, 숫자0-9까지
  const nameRule = /^[a-zA-Z가-힣]{1,20}$/; // 대/소문자  a-z까지, 한글 가~하
  const phoneRule = /^(?:(010)|(01[1|6|7|8|9]))-\d{3,4}-(\d{4})$/; //
  const emailRule = /[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]$/i;
  const birthRule = /^(19[0-9][0-9]|20\d{2})(0[0-9]|1[0-2])(0[1-9]|[1-2][0-9]|3[0-1])$/;

  //이용약관 동의 버튼
  const [allChecked, setAllChecked] = useState(false);
  const [termsChecked, setTermsChecked] = useState(false);
  const [privacyChecked, setPrivacyChecked] = useState(false);
  const [marketingChecked, setMarketingChecked] = useState(false);

  // const [isSubmitted, setIsSubmitted] = useState(false);


  //안내 메지시 출력(사용 가능, 불가능, 입력형식에 맞지 않음)
  const [messages, setMessages] = useState({
    id: { text: "", color: "" },
    pw: { text: "", color: "" },
    pw2: { text: "", color: "" },
    name: { text: "", color: "" },
    phone: { text: "", color: "" },
    email: { text: "", color: "" },
    birth: { text: "", color: "" },
  });

  //모두동의 이용약관 체크 시 자동으로 체크되도록 구현
  const handleAllCheck = () => {
    setAllChecked(!allChecked)
    setTermsChecked(!termsChecked)
    setPrivacyChecked(!privacyChecked)
    setMarketingChecked(!marketingChecked)
  }

  //해당 이용약관이 체크되어 있을 경우 모두 동의 체크란 자동 체크
  useEffect(() => {
    if(termsChecked && privacyChecked && marketingChecked){ 
      setAllChecked(true)
    }else{  //동의함이 하나라도 없을 경우 체크되지 않음
      setAllChecked(false)
    }
  }, [termsChecked, privacyChecked, marketingChecked])

  //
  const handleMessageChange = (key, text, color) => {
    setMessages((prevMessages) => ({
      ...prevMessages,
      [key]: { text, color },
    }));
  };

  //아이디
  const handleId = (event) => {
    const newValue = event.target.value;
    setId(newValue);
    if (idRule.test(newValue)) {
      handleMessageChange("id", "사용 가능한 아이디 입니다.", "success-color"); //사용 가능한 아이디일 경우: 안내문구 + 글자색(초록색)
    } else if (newValue === "") {
      handleMessageChange("id", "아이디를 입력해 주세요.", "error-color"); //아이디를 입력하지 않은 경우: 안내문구 + 글자색(빨간색)
    } else {
      handleMessageChange(
        "id",
        "아이디는 영문소문자/숫자 4글자 이상 16글자 미만으로 사용 가능합니다.",
        "error-color"
      ); //형식에 맞지 않게 아이디를 입력한 경우: 안내문구 + 글자색(초록색)
      setId("");
    }
  };

  //비밀번호
  const handlePw = (event) => {
    const newPwValue = event.target.value;
    setPw(newPwValue);
    if (pwRule.test(newPwValue)) {
      handleMessageChange(
        "pw",
        "사용 가능한 비밀번호 입니다.",
        "success-color"
      ); //사용 가능한 비밀번호일 경우: 안내문구 + 글자색(초록색)
    } else if (newPwValue === "") {
      handleMessageChange("pw", "비밀번호를 입력해 주세요.", "error-color"); //비밀번호를 입력하지 않은 경우: 안내문구 + 글자색(빨간색)
    } else {
      handleMessageChange(
        "pw",
        "비밀번호는 영문소문자/숫자/특수기호 8글자 이상 16글자 미만으로 사용 가능합니다.",
        "error-color"
      ); //형식에 맞지 않게 비밀번호를 입력한 경우: 안내문구 + 글자색(빨간색)
      setPw("");
    }
  };

  //비밀번호 확인
  const handlePw2 = (event) => {
    const newPwValue2 = event.target.value;
    setPw2(newPwValue2);
    if (pw === "") {
      handleMessageChange("pw2", "비밀번호를 입력해 주세요.", "error-color"); //비밀번호를 입력하지 않은 경우: 안내문구 + 글자색(빨간색)
    } else if (newPwValue2 === pw) {
      handleMessageChange("pw2", "비밀번호가 일치합니다.", "success-color"); //비밀번호가 일치한 경우: 안내문구 + 글자색(초록색)
    } else if (newPwValue2 === "") {
      handleMessageChange("pw2", "비밀번호를 입력해 주세요.", "error-color"); //비밀번호확인 칸에 비밀번호를 입력하지 않은 경우: 안내문구 + 글자색(초록색)
    } else {
      handleMessageChange(
        "pw2",
        "비밀번호가 일치하지 않습니다.",
        "error-color"
      ); //입력한 비밀번호와 일치하지 않은 경우: 안내문구 + 글자색(빨간색)
      setPw("");
    }
  };

  //이름
  const handleName = (event) => {
    const newNameValue = event.target.value;
    setName(newNameValue);
    if (nameRule.test(newNameValue)) {
      handleMessageChange("name", "사용가능한 이름입니다", "success-color");
    } else if (newNameValue === "") {
      handleMessageChange("name", "이름을 입력해주세요", "error-color");
    } else {
      handleMessageChange("name", "올바른 이름이 아닙니다", "error-color");
      setName("");
    }
  };

  //휴대폰
  const handlePhone = (event) => {
    const newPhoneValue = event.target.value;
    setPhone(newPhoneValue);
    if (phoneRule.test(newPhoneValue)) {
      handleMessageChange(
        "phone",
        "사용가능한 전화번호입니다",
        "success-color"
      );
    } else if (newPhoneValue === "") {
      handleMessageChange("phone", "전화번호 입력해주세요", "error-color");
    } else {
      handleMessageChange(
        "phone",
        "전화번호를 다시 확인해주세요",
        "error-color"
      );
      setPhone("");
    }
  };

  //이메일
  const handleEmail = (event) => {
    const newEmailValue = event.target.value;
    setEmail(newEmailValue);
    if (emailRule.test(newEmailValue)) {
      handleMessageChange(
        "email",
        "사용 가능한 이메일입니다.",
        "success-color"
      );
    } else if (newEmailValue === "") {
      handleMessageChange("email", "이메일을 입력해주세요", "error-color");
    } else {
      handleMessageChange(
        "email",
        "이메일을 다시 한번 확인해주세요",
        "error-color"
      );
      setEmail("");
    }
  };

  //생년월일
  const handleBirth = (event) => {
    const newBirthValue = event.target.value;
    setBirth(newBirthValue);
    if (birthRule.test(newBirthValue)) {
      handleMessageChange("birth", "올바른 생년월일입니다", "success-color");
    } else if (newBirthValue === "") {
      handleMessageChange("birth", "생년월일을 입력해주세요", "error-color");
    } else {
      handleMessageChange(
        "birth",
        "생년월일을 다시 한번 확인해주세요",
        "error-color"
      );
      setBirth("");
    }
  };

  //회원가입 버튼 클릭했을때
  const handleSubmit = (event) => {
    event.preventDefault();

    if(
      idRule.test(id) && 
      pwRule.test(pw) && 
      pw2 === pw &&
      nameRule.test(name) &&
      phoneRule.test(phone) &&
      emailRule.test(email) &&
      birthRule.test(birth) &&
      termsChecked &&
      privacyChecked &&
      marketingChecked
    ){
      console.log('회원가입을 성공했습니다.')
    }else{
      console.log('에러발생')
    }

  };

  return (
    <div className="signWrap">
      <h2>회원가입</h2>
      <form action="#" method="post" name="signup" onSubmit={handleSubmit}>
        <fieldset className="signUpArea">
          <ul>
            <li className="id-section">   {/* 아아디 */}
              <div className="area-style">
                <label htmlFor="idArea" className="label-style">
                  아이디
                </label>
                {/* id 20글자 제한설정 */}
                <input
                  ref={idInputRef}
                  type="text"
                  id="idArea"
                  required
                  size={20}
                  value={id}
                  onChange={(event) => {
                    setId(event.target.value);
                  }}
                  onBlur={handleId}
                />
                <span className={`mes-style ${messages.id.color}`}>
                  {messages.id.text}
                </span>
                <p className="help-style">
                  <IoCheckmark />
                  영문소문자/숫자, 4~16자 제한합니다.
                </p>
              </div>
            </li>
            <li className="pw-section">   {/* 비밀번호 */}
              <div className="area-style">
                <label htmlFor="pwArea" className="label-style">
                  비밀번호
                </label>
                {/* 비밀번호 20글자 제한설정 */}
                <input
                  ref={pwInputRef}
                  type="text"
                  id="pwArea"
                  required
                  size={20}
                  value={pw}
                  onChange={(event) => {
                    setPw(event.target.value);
                  }}
                  onBlur={handlePw}
                />
                <span className={`mes-style ${messages.pw.color}`}>
                  {messages.pw.text}
                </span>
                <p className="help-style">
                  <IoCheckmark />
                  영문 대/소문자/숫자, 특수문자 조합, 8~16글자 제한합니다.
                </p>
                <br />

                <label htmlFor="pw2Area" className="label-style">   {/* 비밀번호 확인 */}
                  비밀번호 확인
                </label>{" "}
                {/* 비밀번호 20글자 제한설정 */}
                <input
                  type="text"
                  id="pw2Area"
                  required
                  size={20}
                  value={pw2}
                  onChange={(event) => {
                    setPw2(event.target.value);
                  }}
                  onBlur={handlePw2}
                />
                <span className={`mes-style ${messages.pw2.color}`}>
                  {messages.pw2.text}
                </span>
              </div>
            </li>
            <li className="name-section">   {/* 이름 */}
              <div className="area-style">
                <label htmlFor="nameArea" className="label-style">
                  이름
                </label>
                <input
                  ref={nameInputRef}
                  type="text"
                  id="nameArea"
                  required
                  size={20}
                  value={name}
                  onChange={(event) => {
                    setName(event.target.value);
                  }}
                  onBlur={handleName}
                />
                <span className={`mes-style ${messages.name.color}`}>
                  {messages.name.text}
                </span>
              </div>
            </li>
            <li className="phone-section">    {/* 전화번호 */}
              <div className="area-style">
                <label htmlFor="phoneArea" className="label-style">
                  핸드폰
                </label>
                <input
                  ref={phoneInputRef}
                  type="text"
                  id="phoneArea"
                  required
                  size={20}
                  value={phone}
                  onChange={(event) => {
                    setPhone(event.target.value);
                  }}
                  onBlur={handlePhone}
                />
                <span className={`mes-style ${messages.phone.color}`}>
                  {messages.phone.text}
                </span>
              </div>
            </li>
            <li className="email-section">    {/* 이메일 */}
              <div className="area-style">
                <label htmlFor="emailArea" className="label-style">
                  이메일
                </label>
                <input
                  ref={emailInputRef}
                  type="text"
                  id="emailArea"
                  required
                  size={20}
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                  }}
                  onBlur={handleEmail}
                />
                <span className={`mes-style ${messages.email.color}`}>
                  {messages.email.text}
                </span>
              </div>
            </li>
            <li className="birth-section">    {/* 생년월일 */}
              <div className="area-style">
                <label htmlFor="birthArea" className="label-style">
                  생년월일
                </label>
                <input
                  ref={birthInputRef}
                  type="text"
                  id="birthArea"
                  required
                  size={8}
                  value={birth}
                  onChange={(event) => {
                    setBirth(event.target.value);
                  }}
                  onBlur={handleBirth}
                />
                <span className={`mes-style ${messages.birth.color}`}>
                  {messages.birth.text}
                </span>
                <p className="help-style">
                  <IoCheckmark />- 를 제외한 8글자 ex)19990101
                </p>
              </div>
            </li>
            <li>
              <br />
              <hr />
              <br />
            </li>
            <li id="terms-section">
              <input type="checkbox" id="allCheck" className="chick-style" checked={allChecked} onChange={handleAllCheck}/>
              <label htmlFor="allCheck">
                이용약관 및 개인정보수집 및 이용, 쇼핑정보 수신(선택)에 모두
                동의합니다.
              </label>
              <br />
              <h3>[필수] 이용약관 동의</h3>
              <div className="termsBox">
                <p>
                  ■ 수집하는 개인정보 항목 <br />
                  회사는 수집한 개인정보를 다음의 목적을 위해 활용합니다.
                </p>
                <p>
                  ο 서비스 제공에 관한 계약 이행 및 서비스 제공에 따른 요금정산
                  콘텐츠 제공 , 구매 및 요금 결제 , 물품배송 또는 청구지 등 발송{" "}
                  <br />
                  ο 회원 관리
                  <br />
                  회원제 서비스 이용에 따른 본인확인 , 개인 식별 , 연령확인 ,
                  만14세 미만 아동 개인정보 수집 시 법정 <br />
                  대리인 동의여부 확인 , 고지사항 전달 ο 마케팅 및 광고에 활용
                  <br />
                  접속 빈도 파악 또는 회원의 서비스 이용에 대한 통계
                </p>
                <p>■ 개인정보의 보유 및 이용기간</p>

                <p>
                  회사는 개인정보 수집 및 이용목적이 달성된 후에는 예외 없이
                  해당 정보를 지체 없이 파기합니다.
                </p>
              </div>
              <p>
                <span>이용약관에 동의하십니까?</span>
                <input type="checkbox" id="terms-check1" className="check-style" checked={termsChecked} onChange={() => setTermsChecked(!termsChecked)} />
                <label htmlFor="terms-check1"> 동의함</label>
              </p>

              <h3>[필수] 개인정보 수집 및 이용 동의</h3>
              <div className="termsBox">
                <p>
                  ■ 수집하는 개인정보 항목
                  <br />
                  회사는 회원가입, 상담, 서비스 신청 등등을 위해 아래와 같은
                  개인정보를 수집하고 있습니다.
                </p>
                <p>
                  ο 수집항목 : 이름 , 생년월일 , 성별 , 로그인ID , 비밀번호 ,
                  비밀번호 질문과 답변 , 자택 전화번호 , 자택 주소 ,
                  휴대전화번호 , 이메일 , 직업 , 회사명 , 부서 , 직책 ,
                  회사전화번호 , 취미 , 결혼여부 , 기념일 , 법정대리인정보 ,
                  서비스 이용기록 , 접속 로그 , 접속 IP 정보 , 결제기록
                  <br />ο 개인정보 수집방법 : 홈페이지(회원가입) , 서면양식
                </p>
                <br />
                <p>
                  ■ 개인정보의 수집 및 이용목적 <br />
                  회사는 수집한 개인정보를 다음의 목적을 위해 활용합니다.
                  <br />
                  ο 서비스 제공에 관한 계약 이행 및 서비스 제공에 따른 요금정산
                  콘텐츠 제공 , 구매 및 요금 결제 , 물품배송 또는 청구지 등 발송{" "}
                  <br />
                  ο 회원 관리 회원제 서비스 이용에 따른 본인확인 , 개인 식별 ,
                  연령확인 , 만14세 미만 아동 개인정보 수집 시 법정 대리인
                  동의여부 확인 , 고지사항 전달 <br />
                  ο 마케팅 및 광고에 활용 <br />
                  접속 빈도 파악 또는 회원의 서비스 이용에 대한 통계
                </p>
                <p>
                  ■ 개인정보의 보유 및 이용기간
                  <br />
                  회사는 개인정보 수집 및 이용목적이 달성된 후에는 예외 없이
                  해당 정보를 지체 없이 파기합니다.
                </p>
              </div>
              <p>
                <span>개인정보 수집 및 이용에 동의하십니까?</span>
                <input type="checkbox" id="terms-check2" className="check-style"  checked={privacyChecked} onChange={() => setPrivacyChecked(!privacyChecked)}/>
                <label htmlFor="terms-check2"> 동의함</label>
              </p>

              <h3>[필수] 쇼핑정보 수신 동의</h3>
              <div className="termsBox">
                <p>
                  ■ 수집하는 개인정보 항목 <br />
                  회사는 회원가입, 상담, 서비스 신청 등등을 위해 아래와 같은
                  개인정보를 수집하고 있습니다.
                  <br />
                  <br />
                  ο 수집항목 : 이름 , 생년월일 , 성별 , 로그인ID , 비밀번호 ,
                  비밀번호 질문과 답변 , 자택 전화번호 , 자택 주소 ,
                  휴대전화번호 , 이메일 , 직업 , 회사명 , 부서 , 직책 ,
                  회사전화번호 , 취미 , 결혼여부 , 기념일 , 법정대리인정보 ,
                  서비스 이용기록 , 접속 로그 , 접속 IP 정보 , 결제기록 <br />ο
                  개인정보 수집방법 : 홈페이지(회원가입) , 서면양식
                </p>
                <p>
                  ■ 개인정보의 수집 및 이용목적 <br />
                  <br />
                  회사는 수집한 개인정보를 다음의 목적을 위해 활용합니다.
                  <br />
                  <br />
                  ο 서비스 제공에 관한 계약 이행 및 서비스 제공에 따른 요금정산
                  콘텐츠 제공 , 구매 및 요금 결제 , 물품배송 또는 청구지 등 발송{" "}
                  <br />
                  ο 회원 관리 회원제 서비스 이용에 따른 본인확인 , 개인 식별 ,
                  연령확인 , 만14세 미만 아동 개인정보 수집 시 법정 대리인
                  동의여부 확인 , 고지사항 전달 <br />
                  ο 마케팅 및 광고에 활용 <br />
                  접속 빈도 파악 또는 회원의 서비스 이용에 대한 통계 <br />
                  <br />
                </p>
                <p>
                  ■ 개인정보의 보유 및 이용기간 <br />
                  <br />
                  회사는 개인정보 수집 및 이용목적이 달성된 후에는 예외 없이
                  해당 정보를 지체 없이 파기합니다.
                </p>
              </div>
              <p>
                <span>SMS 수신을 동의하십니까?</span>
                <input type="checkbox" id="terms-check2" className="check-style" checked={marketingChecked} onChange={() => setMarketingChecked(!marketingChecked)}  />
                <label htmlFor="terms-check3"> 동의함</label>
              </p>
            </li>
            <li className="submit-section">
              <button className="submit-style" type="submit">회원가입</button>
            </li>
          </ul>
        </fieldset>
      </form>
    </div>
  );
};

export default SignUp;
