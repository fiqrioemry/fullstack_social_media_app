const { Notification, User, Profile, Post, Comment } = require('../../models');

async function getNotifications(req, res) {
  const receiverId = req.user.userId;
  try {
    const notificationsData = await Notification.findAll({
      where: { receiverId },
      include: [
        {
          model: User,
          as: 'sender',
          include: { model: Profile, as: 'profile' },
        },
        { model: Post, as: 'post' },
        { model: Comment, as: 'comment' },
      ],
      order: [['createdAt', 'DESC']],
    });

    if (!notificationsData)
      return res.status(200).json({
        message: 'You dont have any notifications',
        notifications: [],
      });

    const notifications = notificationsData.map((notif) => {
      return {
        id: notif.id,
        type: notif.type,
        isRead: notif.isRead,
        postId: notif.post?.id,
        post: notif.post?.content,
        createdAt: notif.createdAt,
        commentId: notif.comment?.id,
        comment: notif.comment?.content,
        username: notif.sender?.username,
        avatar: notif.sender?.profile.avatar,
      };
    });
    res.status(200).json({ notifications });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function markAsRead(req, res) {
  const receiverId = req.user.userId;
  try {
    await Notification.update({ isRead: true }, { where: { receiverId } });

    res.status(200).json({ message: 'Marked as Read' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = { getNotifications, markAsRead };
