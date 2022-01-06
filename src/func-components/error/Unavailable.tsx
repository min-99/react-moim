import React from 'react';

function Unavailable() {
  return (
    <div>
      <div>
        <p>
          현재 일시적인 장애로 인하여
          <br />
          서비스가 잠시 중단되었습니다
        </p>
        <p>
          서비스 이용에 불편을 드려 죄송합니다
        </p>
        <button
          type="button"
          onClick={() => {
            window.location.href = '/';
          }}
        >
          메인으로 이동
        </button>
      </div>
    </div>
  );
}

export default Unavailable;
