"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("PostGalleries", [
      {
        id: 1,
        postId: 1,
        image:
          "https://res.cloudinary.com/dnlrzhdcs/image/upload/v1734671866/social_media_project/ahifweqxpidvcenx3hc7.webp",
        createdAt: "2024-12-20 05:17:46",
        updatedAt: "2024-12-20 05:17:46",
      },
      {
        id: 2,
        postId: 2,
        image:
          "https://res.cloudinary.com/dnlrzhdcs/image/upload/v1734671931/social_media_project/ikg5xsoalgyfmgtojq3w.webp",
        createdAt: "2024-12-20 05:18:52",
        updatedAt: "2024-12-20 05:18:52",
      },
      {
        id: 3,
        postId: 3,
        image:
          "https://res.cloudinary.com/dnlrzhdcs/image/upload/v1734690534/social_media_project/zpcxot0r5dge8ltz0k3a.webp",
        createdAt: "2024-12-20 10:28:56",
        updatedAt: "2024-12-20 10:28:56",
      },
      {
        id: 4,
        postId: 3,
        image:
          "https://res.cloudinary.com/dnlrzhdcs/image/upload/v1734690536/social_media_project/vphsuvw3sswtm2goffy5.jpg",
        createdAt: "2024-12-20 10:28:56",
        updatedAt: "2024-12-20 10:28:56",
      },
      {
        id: 5,
        postId: 4,
        image:
          "https://res.cloudinary.com/dnlrzhdcs/image/upload/v1734690584/social_media_project/qzj7c0aw3tphlqrmz4ub.webp",
        createdAt: "2024-12-20 10:29:45",
        updatedAt: "2024-12-20 10:29:45",
      },
      {
        id: 6,
        postId: 4,
        image:
          "https://res.cloudinary.com/dnlrzhdcs/image/upload/v1734690585/social_media_project/gmwedq9pbpoboqzgcpfj.jpg",
        createdAt: "2024-12-20 10:29:45",
        updatedAt: "2024-12-20 10:29:45",
      },
      {
        id: 7,
        postId: 5,
        image:
          "https://res.cloudinary.com/dnlrzhdcs/image/upload/v1734690615/social_media_project/tv7uhmoomqcwedst65cm.webp",
        createdAt: "2024-12-20 10:30:17",
        updatedAt: "2024-12-20 10:30:17",
      },
      {
        id: 8,
        postId: 5,
        image:
          "https://res.cloudinary.com/dnlrzhdcs/image/upload/v1734690617/social_media_project/v6zq0dkxaq6rfg4pjhzj.jpg",
        createdAt: "2024-12-20 10:30:17",
        updatedAt: "2024-12-20 10:30:17",
      },
      {
        id: 9,
        postId: 6,
        image:
          "https://res.cloudinary.com/dnlrzhdcs/image/upload/v1734692569/social_media_project/l6btbatmhazyrabzqjdq.webp",
        createdAt: "2024-12-20 11:02:51",
        updatedAt: "2024-12-20 11:02:51",
      },
      {
        id: 10,
        postId: 6,
        image:
          "https://res.cloudinary.com/dnlrzhdcs/image/upload/v1734692571/social_media_project/zlaphbduu8iengkfhtmv.jpg",
        createdAt: "2024-12-20 11:02:51",
        updatedAt: "2024-12-20 11:02:51",
      },
      {
        id: 11,
        postId: 7,
        image:
          "https://res.cloudinary.com/dnlrzhdcs/image/upload/v1734692602/social_media_project/umkbuaynzufaimrwxib5.webp",
        createdAt: "2024-12-20 11:03:24",
        updatedAt: "2024-12-20 11:03:24",
      },
      {
        id: 12,
        postId: 7,
        image:
          "https://res.cloudinary.com/dnlrzhdcs/image/upload/v1734692604/social_media_project/a9lwan8r3nouws11povr.jpg",
        createdAt: "2024-12-20 11:03:24",
        updatedAt: "2024-12-20 11:03:24",
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("PostGalleries", null, {});
  },
};
