const randomAvatar = () => {
  let avatar;
  switch (Math.round(Math.random() * 10)) {
    case 0:
      avatar = 'Kimberly';
      break;
    case 1:
      avatar = 'Brian';
      break;
    case 2:
      avatar = 'Ryker';
      break;
    case 3:
      avatar = 'Mackenzie';
      break;
    case 4:
      avatar = 'Liam';
      break;
    case 5:
      avatar = 'Andrea';
      break;
    case 6:
      avatar = 'Katherine';
    case 7:
      avatar = 'George';
    case 8:
      avatar = 'Sophia';
    case 9:
      avatar = 'Adrian';
    case 10:
      avatar = 'Chase';
  }
  return `https://api.dicebear.com/9.x/adventurer-neutral/svg?seed=${avatar}`;
};

module.exports = randomAvatar;
