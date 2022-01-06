import React from 'react';

function NotFound() {
  return (
    <div>
      <div>
        <p>
          요청하신 페이지를 찾을 수 없습니다
        </p>
        <p>
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

export default NotFound;
