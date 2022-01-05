import React from 'react';

function Shutdown() {
  return (
    <div>
      <div>
        <p>
          시스템 점검 중입니다
        </p>
        <p>
          현재 시스템 기능 개선을 위해 점검 중입니다
          <br />
          문의 사항은 고객센터로 문의 부탁드립니다
        </p>
        <button
          type="button"
          onClick={() => {
            window.location.href = 'https://forms.gle/BAsbPHdRyGRMTJDY8';
          }}
        >
          고객센터로 문의하기
        </button>
      </div>
    </div>
  );
}

export default Shutdown;
