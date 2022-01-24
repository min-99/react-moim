import { FieldErrors } from 'react-hook-form';

export const isServer = () =>
  typeof window === 'undefined' || typeof window === undefined;

export const isClient = () => !isServer();

export const isDeploy = () => process.env.NODE_ENV === 'production';

/**
 * 외부링크 새창 오픈
 */
export const handleGoExternalLink = (link: string) => {
  (window.open('about:blank') as any).location.href = link;
};

const getObjectErrorByFieldName = (errors: FieldErrors, fieldName: string) => {
  if (fieldName.indexOf('.') >= 0) {
    let result = errors;
    const arrFieldName = fieldName.split('.');
    arrFieldName.forEach((name) => (result = result?.[name]));
    return result;
  } else {
    return errors[fieldName];
  }
};

export const hasFieldError = (errors: FieldErrors, fieldName: string) =>
  getObjectErrorByFieldName(errors, fieldName) !== undefined;

export const hasFieldErrors = (errors: FieldErrors, fieldNames: string[]) => {
  return (
    fieldNames.findIndex((fieldName) => hasFieldError(errors, fieldName)) >= 0
  );
};

export const getFieldErrorMessage = (
  errors: FieldErrors,
  fieldName: string,
) => {
  return getObjectErrorByFieldName(errors, fieldName)?.message || '';
};
