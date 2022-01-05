import React from 'react';
import { useForm } from 'react-hook-form';
import { hasFieldError, hasFieldErrors } from '@/utils';
import { Button, TextField } from '@mui/material';
import { REG_EXP } from '@/constants';

function Login() {
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();
      const onSubmit = (data : any) => console.log(data);
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
      <TextField
          hiddenLabel
          variant="standard"
          placeholder="email"
          size="small"
          {...register('email', {
            required: {
              value: true,
              message: '아이디를 입력해주세요',
            },
            pattern : REG_EXP.email
          })}
          error={hasFieldError(errors, 'email')}
        />
        <TextField
          hiddenLabel
          type="password"
          variant="standard"
          placeholder="password (영문/숫자/특수문자, 8~16자)"
          size="small"
          {...register('password', {
            required: {
              value: true,
              message: '아이디를 입력해주세요',
            },
            pattern : REG_EXP.password
          })}
          error={hasFieldError(errors, 'password')}
        />
        {/* <FormInput
          placeholder="아이디"
          mb="20px"
          sizeVariant="md"
          offAutoFill
          maxLength={20}
          {...register('id', {
            required: {
              value: true,
              message: '아이디를 입력해주세요',
            },
          })}
          error={hasFieldError(errors, 'id') || !isLoginSuccess}
          message={hasFieldError(errors, 'id') ? '아이디를 입력해주세요' : ''}
        /> */}
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
        <Button type="submit" variant="contained" disabled={hasFieldErrors(errors, ['id', 'password'])}>LOGIN</Button>
      </form>
    </div>
  );
}

export default Login;
