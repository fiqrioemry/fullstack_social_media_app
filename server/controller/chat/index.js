const { Op } = require('sequelize');
const Message = require('../../models/message');
const { Chat, Profile, User } = require('../../models');
const { getReceiverSocketId, io } = require('../../config/socket');
const uploadToCloudinary = require('../../utils/uploadToCloudinary');

async function getChats(req, res) {
  const userId = req.user.userId;
  try {
    const chatsData = await Chat.findAll({
      where: { [Op.or]: [{ senderId: userId }, { receiverId: userId }] },
      include: [
        {
          model: User,
          as: 'sender',
          attributes: ['id', 'username'],
          include: { model: Profile, as: 'profile', attributes: ['avatar'] },
        },
        {
          model: User,
          as: 'receiver',
          attributes: ['id', 'username'],
          include: { model: Profile, as: 'profile', attributes: ['avatar'] },
        },
      ],
    });

    if (!chatsData)
      return res.status(200).send({ message: 'No Chats was found', chats: [] });

    const chats = chatsData.map((chat) => {
      const chatPartner =
        chat.senderId === userId ? chat.receiver : chat.sender;

      return {
        chatId: chat.id,
        userId: chatPartner.id,
        username: chatPartner.username,
        avatar: chatPartner.profile?.avatar,
      };
    });

    res.status(200).json(chats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function sendChat(req, res) {
  const file = req.file;
  const senderId = req.user.userId;
  let { chatId, message } = req.body;
  const receiverId = req.params.receiverId;

  try {
    if (!senderId || !receiverId) {
      return res
        .status(400)
        .json({ message: 'Sender ID and Receiver ID are required' });
    }

    if (!chatId) {
      const existingChat = await Chat.findOne({
        where: {
          [Op.or]: [
            { senderId, receiverId },
            { senderId: receiverId, receiverId: senderId },
          ],
        },
      });

      if (existingChat) {
        chatId = existingChat.id;
      } else {
        const newChat = await Chat.create({
          senderId,
          receiverId,
        });
        chatId = newChat.id;
      }
    }

    let image = '';
    let timestamp = new Date();

    if (file?.buffer) {
      try {
        uploadedImage = await uploadToCloudinary(file.buffer);
        image = uploadedImage.secure_url;
      } catch (error) {
        return res.status(500).json({ message: error.message });
      }
    }

    const newChat = await Message.create({
      chatId,
      senderId,
      receiverId,
      message,
      image,
      timestamp,
    });

    const receiverSocketId = getReceiverSocketId(receiverId);

    if (receiverSocketId) {
      io.to(receiverSocketId).emit('newChat', newChat);
    }
    res.status(200).json({ message: 'Chat is sent', newChat });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function getChat(req, res) {
  const senderId = req.user.userId;
  const receiverId = req.params.receiverId;
  try {
    const prevChat = await Chat.findOne({
      where: {
        [Op.or]: [
          { senderId, receiverId },
          { senderId: receiverId, receiverId: senderId },
        ],
      },
      include: [
        {
          model: User,
          as: 'sender',
          attributes: ['id', 'username'],
          include: { model: Profile, as: 'profile' },
        },
        {
          model: User,
          as: 'receiver',
          attributes: ['id', 'username'],
          include: { model: Profile, as: 'profile' },
        },
      ],
    });

    if (!prevChat) {
      return res.status(200).json({ message: 'Start a new chat', chat: [] });
    }

    const chat_id = prevChat.id;
    const result = await Message.find({ chatId: chat_id }).sort({
      timestamp: 1,
    });
    if (!result || result.length === 0) {
      return res
        .status(200)
        .json({ message: 'No chat found in history', chat: [] });
    }

    const chat = result.map((chat) => ({
      chatId: chat.chatId,
      senderId: chat.senderId,
      receiverId: chat.receiverId,
      image: chat.image,
      message: chat.message,
      timestamp: chat.timestamp,
    }));

    res.status(200).json({ message: 'Success fetch chat', chat });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = { getChats, getChat, sendChat };
