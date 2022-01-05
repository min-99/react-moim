import Login from '@/func-components/Login/Login';
import React from 'react';

function LoginPage() {
  return <Login />;
}

export default LoginPage;

// export const getServerSideProps = withAuthPage.getServerSideProps(
//   async ({ context: { req, res } }) => {
//     if (isAuthenticatedTokenCookieFromServer(req, res)) {
//       return {
//         redirect: {
//           statusCode: 302,
//           destination: '/',
//         },
//       };
//     }
//     return {
//       props: {
//         hiddenFooter: false,
//         headerOnlyLogo: true,
//       },
//     };
//   },
//   true,
// );
