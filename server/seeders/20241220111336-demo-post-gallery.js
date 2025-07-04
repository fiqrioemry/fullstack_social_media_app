'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('PostGalleries', [
      {
        id: 1,
        postId: 1,
        image:
          'https://res.cloudinary.com/dnlrzhdcs/image/upload/v1739549456/fullstack_instagram_clone/1.1_y30n7z.webp',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        postId: 1,
        image:
          'https://res.cloudinary.com/dnlrzhdcs/image/upload/v1739549457/fullstack_instagram_clone/1.2_hlxwcq.webp',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        postId: 2,
        image:
          'https://res.cloudinary.com/dnlrzhdcs/image/upload/v1739549457/fullstack_instagram_clone/2.1_mgjxzx.webp',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 4,
        postId: 2,
        image:
          'https://res.cloudinary.com/dnlrzhdcs/image/upload/v1739549458/fullstack_instagram_clone/2.2_fmwt2y.webp',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 5,
        postId: 3,
        image:
          'https://res.cloudinary.com/dnlrzhdcs/image/upload/v1739549441/fullstack_instagram_clone/3.1_p0aq7a.webp',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 6,
        postId: 3,
        image:
          'https://res.cloudinary.com/dnlrzhdcs/image/upload/v1739549442/fullstack_instagram_clone/3.2_wwnr9n.webp',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 7,
        postId: 4,
        image:
          'https://res.cloudinary.com/dnlrzhdcs/image/upload/v1739549441/fullstack_instagram_clone/4.1_mgpskg.webp',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 8,
        postId: 4,
        image:
          'https://res.cloudinary.com/dnlrzhdcs/image/upload/v1739549442/fullstack_instagram_clone/4.2_onpxwu.webp',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 9,
        postId: 5,
        image:
          'https://res.cloudinary.com/dnlrzhdcs/image/upload/v1739549443/fullstack_instagram_clone/5.1_hp60jq.webp',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 10,
        postId: 5,
        image:
          'https://res.cloudinary.com/dnlrzhdcs/image/upload/v1739549446/fullstack_instagram_clone/5.2_nmzaxg.webp',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 11,
        postId: 6,
        image:
          'https://res.cloudinary.com/dnlrzhdcs/image/upload/v1739549445/fullstack_instagram_clone/6.2_crekcy.webp',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 12,
        postId: 6,
        image:
          'https://res.cloudinary.com/dnlrzhdcs/image/upload/v1739549445/fullstack_instagram_clone/6.1_ynww5p.webp',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 13,
        postId: 7,
        image:
          'https://res.cloudinary.com/dnlrzhdcs/image/upload/v1739549443/fullstack_instagram_clone/7.1_ytxceh.webp',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 14,
        postId: 7,
        image:
          'https://res.cloudinary.com/dnlrzhdcs/image/upload/v1739549444/fullstack_instagram_clone/7.2_otehbz.webp',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 15,
        postId: 8,
        image:
          'https://res.cloudinary.com/dnlrzhdcs/image/upload/v1739549445/fullstack_instagram_clone/8.2_mshcny.webp',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 16,
        postId: 8,
        image:
          'https://res.cloudinary.com/dnlrzhdcs/image/upload/v1739549444/fullstack_instagram_clone/8.1_sq0xu2.webp',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 17,
        postId: 9,
        image:
          'hhttps://res.cloudinary.com/dnlrzhdcs/image/upload/v1739549446/fullstack_instagram_clone/9.1_sz2b4x.webp',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 18,
        postId: 9,
        image:
          'https://res.cloudinary.com/dnlrzhdcs/image/upload/v1739549446/fullstack_instagram_clone/9.2_ok48gc.webp',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 19,
        postId: 10,
        image:
          'https://res.cloudinary.com/dnlrzhdcs/image/upload/v1739549446/fullstack_instagram_clone/10.1_fkosns.webp',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 20,
        postId: 10,
        image:
          'https://res.cloudinary.com/dnlrzhdcs/image/upload/v1739549447/fullstack_instagram_clone/10.2_yhq3oq.webp',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 21,
        postId: 11,
        image:
          'https://res.cloudinary.com/dnlrzhdcs/image/upload/v1739549447/fullstack_instagram_clone/11_j7f0dk.webp',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 22,
        postId: 12,
        image:
          'https://res.cloudinary.com/dnlrzhdcs/image/upload/v1739549456/fullstack_instagram_clone/12_ywdhqq.webp',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 24,
        postId: 13,
        image:
          'https://res.cloudinary.com/dnlrzhdcs/image/upload/v1739549451/fullstack_instagram_clone/13_c8mojd.webp',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 25,
        postId: 14,
        image:
          'https://res.cloudinary.com/dnlrzhdcs/image/upload/v1739549451/fullstack_instagram_clone/14.1_dxx1kf.webp',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 26,
        postId: 14,
        image:
          'https://res.cloudinary.com/dnlrzhdcs/image/upload/v1739549459/fullstack_instagram_clone/14.2_nvmbt6.webp',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 27,
        postId: 15,
        image:
          'https://res.cloudinary.com/dnlrzhdcs/image/upload/v1739549452/fullstack_instagram_clone/15.2_pgsjtn.webp',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 28,
        postId: 15,
        image:
          'https://res.cloudinary.com/dnlrzhdcs/image/upload/v1739549465/fullstack_instagram_clone/15.1_svwfss.webp',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 29,
        postId: 16,
        image:
          'https://res.cloudinary.com/dnlrzhdcs/image/upload/v1739549453/fullstack_instagram_clone/16_fzq7rn.webp',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 30,
        postId: 17,
        image:
          'https://res.cloudinary.com/dnlrzhdcs/image/upload/v1739549453/fullstack_instagram_clone/17_jpoeyl.webp',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 31,
        postId: 18,
        image:
          'https://res.cloudinary.com/dnlrzhdcs/image/upload/v1739549453/fullstack_instagram_clone/18_so4mux.webp',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 32,
        postId: 19,
        image:
          'https://res.cloudinary.com/dnlrzhdcs/image/upload/v1739549454/fullstack_instagram_clone/19.2_lluz9j.webp',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 33,
        postId: 19,
        image:
          'https://res.cloudinary.com/dnlrzhdcs/image/upload/v1739549458/fullstack_instagram_clone/19.1_xgmeap.webp',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 34,
        postId: 20,
        image:
          'https://res.cloudinary.com/dnlrzhdcs/image/upload/v1739549456/fullstack_instagram_clone/20_eqzqef.webp',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('PostGalleries', null, {});
  },
};
