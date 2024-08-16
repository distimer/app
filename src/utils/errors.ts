const errors: {
  [key: string]: string;
} = {
  "Invalid invite code": "존재하지 않는 초대 코드입니다.",
  "Invite code is not exist": "존재하지 않는 초대 코드입니다.",
  "Category has subjects": "하위 과목이 존재합니다.",
  "Study log is already exist at the same time":
    "이미 같은 시간대에 다른 학습기록이 존재합니다.",
};
const existsError = (error: string) => errors[error] !== undefined;

export { errors, existsError };
