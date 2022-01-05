import React from 'react';

function Unauthorized() {
  return (
    <div>
      <div>
        <p>
          접근 권한이 없는 페이지 입니다
        </p>
        <p>
          현재 페이지는 권한이 없어 접근이 거부되었습니다
          <br />
          서비스 이용에 불편을 드려 죄송합니다
        </p>
        <button
          type="button"
          onClick={() => window.history.back()}
        >
          이전 페이지로 이동
        </button>
      </div>
    </div>
  );
}

export default Unauthorized;
