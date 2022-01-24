import React from 'react';
import { getFieldErrorMessage, hasFieldError, hasFieldErrors } from '@/utils';
import { Button, Container, TextField, Typography } from '@mui/material';
import { REG_EXP } from '@/constants';
import Grid from '@mui/material/Grid';
import { Box } from '@mui/system';
import ErrorText from '@/components/ErrorText/ErrorText';
import useLogin from './hooks/useLogin';

interface ErrorContainerProps {
  message: string | undefined;
  isShow: boolean;
}

function ErrorContainer({ message, isShow }: ErrorContainerProps) {
  return (
    <>
      {isShow && (
        <>
          <Grid item xs={2}></Grid>
          <Grid item xs={10}>
            <ErrorText message={message ?? ''}></ErrorText>
          </Grid>
        </>
      )}
    </>
  );
}

function Login() {
  const { hookForm, handleLogin, isLoadingLogin } = useLogin();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = hookForm;
  return (
    <Box padding="114px 50px" width="100%">
      <form onSubmit={handleSubmit(handleLogin)}>
        {/* -- email -- */}
        <Grid container spacing="5px">
          <Grid item xs={2}>
            <Typography variant="h4">Email</Typography>
          </Grid>
          <Grid item xs={10}>
            <TextField
              hiddenLabel
              variant="standard"
              size="small"
              fullWidth
              placeholder="Email"
              {...register('email', {
                required: {
                  value: true,
                  message: '이메일을 입력해주세요',
                },
                pattern: {
                  value: REG_EXP.email,
                  message: '유효하지 않은 이메일 형식입니다',
                },
              })}
              error={hasFieldError(errors, 'email')}
            />
          </Grid>
          <ErrorContainer
            message={getFieldErrorMessage(errors, 'email')}
            isShow={hasFieldError(errors, 'email')}
          />

          {/* -- password -- */}
          <Grid item xs={2}>
            <Typography variant="h4">PW</Typography>
          </Grid>
          <Grid item xs={10}>
            <TextField
              hiddenLabel
              type="password"
              variant="standard"
              placeholder="(영문/숫자/특수문자, 8~16자)"
              fullWidth
              size="small"
              {...register('password', {
                required: {
                  value: true,
                  message: '비밀번호를 입력해주세요',
                },
                pattern: {
                  value: REG_EXP.password,
                  message:
                    '비밀번호는 영문/숫자/특수문자 8 ~ 16자 이어야 합니다',
                },
              })}
              error={hasFieldError(errors, 'password')}
            />
          </Grid>
          <ErrorContainer
            message={getFieldErrorMessage(errors, 'password')}
            isShow={hasFieldError(errors, 'password')}
          />
        </Grid>
        {/* {!isLoginSuccess && (
          <HStack ml="14px" alignment="center" mb="24px">
            <SvgIcon
              useFillColor
              color={pickColor('base_line_color.error.default')}
              variant="info_24px"
              mr="10px"
            />
            <Text
              asTag="p"
              variant="body2"
              color={pickColor('base_line_color.error.default')}
            >
              아이디 또는 비밀번호가 일치하지 않습니다
            </Text>
          </HStack>
        )} */}
        <Container style={{ marginTop: '35px', padding: '0' }}>
          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={
              hasFieldErrors(errors, ['id', 'password']) || isLoadingLogin
            }
          >
            LOGIN
          </Button>
        </Container>
      </form>
    </Box>
  );
}

export default Login;
