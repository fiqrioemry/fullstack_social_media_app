module.exports = randomAvatar = () => {
  let avatar;
  switch (Math.round(Math.random() * 10)) {
    case 0:
      avatar = "Lucy";
      break;
    case 1:
      avatar = "Bob";
      break;
    case 2:
      avatar = "Cookie";
      break;
    case 3:
      avatar = "Bubba";
      break;
    case 4:
      avatar = "Garfield";
      break;
    case 5:
      avatar = "Cuddles";
      break;
    case 6:
      avatar = "Leo";
    case 7:
      avatar = "Fluffy";
    case 8:
      avatar = "Gizmo";
    case 9:
      avatar = "Sheba";
    case 10:
      avatar = "Angel";
  }
  return `https://api.dicebear.com/5.x/adventurer/svg?seed=${avatar}`;
};
