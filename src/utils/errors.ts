const errors: {
  [key: string]: string;
} = {
  "Invalid invite code": "존재하지 않는 초대 코드입니다.",
  "Invite code is not exist": "존재하지 않는 초대 코드입니다.",
  "Category has subjects": "하위 과목이 존재합니다.",
  "Study log is already exist at the same time":
    "이미 같은 시간대에 다른 학습기록이 존재합니다.",
  "Category limit exceeded": "카테고리 제한을 초과하였습니다.",
  "Subject limit exceeded": "과목 제한을 초과하였습니다.",
  "Quit user can re-register after 1 week":
    "탈퇴한 사용자는 1주일 후 재가입할 수 있습니다.",
  "Group owner cannot quit service": "그룹장은 서비스를 탈퇴할 수 없습니다.",
  "Invite code limit exceeded": "초대 코드 제한을 초과하였습니다.",
};
const existsError = (error: string) => errors[error] !== undefined;

export { errors, existsError };
