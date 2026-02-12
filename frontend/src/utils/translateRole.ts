const roleMap: Record<string, string> = {
  admin: 'Quản trị viên',
  librarian: 'Thủ thư',
  user: 'Người dùng',
};

function translateRole(role: string): string {
  return roleMap[role] || 'Không xác định';
}
export default translateRole;
