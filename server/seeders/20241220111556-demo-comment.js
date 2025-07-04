'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Comments', [
      // ✅ Komentar utama untuk Post 1
      {
        id: 1,
        userId: 2,
        postId: 1,
        parentId: null,
        content: 'Coffee and sunsets are the best combo!',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        userId: 3,
        postId: 1,
        parentId: null,
        content: 'Which coffee do you prefer, espresso or latte?',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        userId: 4,
        postId: 1,
        parentId: null,
        content: 'Nothing beats a quiet evening with coffee.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      // 🔄 Balasan untuk salah satu komentar utama (ID 2)
      {
        id: 4,
        userId: 5,
        postId: 1,
        parentId: 2,
        content: 'I personally love cappuccino! How about you?',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 5,
        userId: 6,
        postId: 1,
        parentId: 2,
        content: 'Espresso for the win! Gives me the energy boost I need.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 6,
        userId: 7,
        postId: 1,
        parentId: 2,
        content: 'Latte is my go-to drink, smooth and creamy!',
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      // ✅ Komentar utama untuk Post 2
      {
        id: 7,
        userId: 3,
        postId: 2,
        parentId: null,
        content: 'JavaScript is so versatile, I love working with it!',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 8,
        userId: 5,
        postId: 2,
        parentId: null,
        content: 'Frontend development is fun, but backend is magical!',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 9,
        userId: 6,
        postId: 2,
        parentId: null,
        content: 'Building real projects is the best way to learn.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      // 🔄 Balasan untuk salah satu komentar utama (ID 7)
      {
        id: 10,
        userId: 8,
        postId: 2,
        parentId: 7,
        content: 'Completely agree! Have you tried React?',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 11,
        userId: 9,
        postId: 2,
        parentId: 7,
        content: 'JavaScript is great, but TypeScript is even better!',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 12,
        userId: 10,
        postId: 2,
        parentId: 7,
        content: "I started learning JS last month, and it's amazing!",
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      // ✅ Komentar utama untuk Post 3
      {
        id: 13,
        userId: 4,
        postId: 3,
        parentId: null,
        content: 'Mountains have the best view, nothing compares!',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 14,
        userId: 7,
        postId: 3,
        parentId: null,
        content: 'I love hiking! Which trail did you take?',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 15,
        userId: 9,
        postId: 3,
        parentId: null,
        content: 'That sounds amazing! Nature is truly beautiful.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      // 🔄 Balasan untuk salah satu komentar utama (ID 14)
      {
        id: 16,
        userId: 1,
        postId: 3,
        parentId: 14,
        content: 'I recommend the Sunrise Peak Trail, breathtaking view!',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 17,
        userId: 2,
        postId: 3,
        parentId: 14,
        content: 'Did you encounter any wild animals on the way?',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 18,
        userId: 3,
        postId: 3,
        parentId: 14,
        content: "I've been wanting to try hiking, any beginner tips?",
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      // ✅ Komentar utama untuk Post 4
      {
        id: 19,
        userId: 5,
        postId: 4,
        parentId: null,
        content: 'Books take you on journeys without moving an inch.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 20,
        userId: 6,
        postId: 4,
        parentId: null,
        content: 'Reading before bed is the best relaxation method.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 21,
        userId: 8,
        postId: 4,
        parentId: null,
        content: 'What’s your favorite book of all time?',
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      // 🔄 Balasan untuk salah satu komentar utama (ID 21)
      {
        id: 22,
        userId: 9,
        postId: 4,
        parentId: 21,
        content: "For me, it's ‘To Kill a Mockingbird’. A classic!",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 23,
        userId: 10,
        postId: 4,
        parentId: 21,
        content: 'I love ‘The Alchemist’ by Paulo Coelho.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 24,
        userId: 1,
        postId: 4,
        parentId: 21,
        content: '‘1984’ by George Orwell really opened my mind.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      // ✅ Komentar utama untuk Post 5
      {
        id: 25,
        userId: 3,
        postId: 5,
        parentId: null,
        content: "Cooking is an art! What's your favorite pasta recipe?",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 26,
        userId: 6,
        postId: 5,
        parentId: null,
        content: 'Homemade pasta sounds delicious! Any tips?',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 27,
        userId: 9,
        postId: 5,
        parentId: null,
        content: 'I tried making carbonara once, it was amazing!',
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      // 🔄 Balasan untuk salah satu komentar utama (ID 26)
      {
        id: 28,
        userId: 4,
        postId: 5,
        parentId: 26,
        content: 'Use fresh ingredients, it makes a huge difference!',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 29,
        userId: 7,
        postId: 5,
        parentId: 26,
        content: 'Kneading the dough well is key for good texture.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 30,
        userId: 10,
        postId: 5,
        parentId: 26,
        content: "Don't forget to salt the pasta water generously!",
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      // ✅ Komentar utama untuk Post 6
      {
        id: 31,
        userId: 2,
        postId: 6,
        parentId: null,
        content: 'Tech conferences are always exciting!',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 32,
        userId: 5,
        postId: 6,
        parentId: null,
        content: 'Which topics are you most excited about?',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 33,
        userId: 8,
        postId: 6,
        parentId: null,
        content: 'Networking at conferences is the best part!',
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      // 🔄 Balasan untuk salah satu komentar utama (ID 32)
      {
        id: 34,
        userId: 1,
        postId: 6,
        parentId: 32,
        content: "I'm looking forward to the AI discussions!",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 35,
        userId: 6,
        postId: 6,
        parentId: 32,
        content: 'Blockchain technology is what excites me most.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 36,
        userId: 9,
        postId: 6,
        parentId: 32,
        content: 'Cybersecurity talks are always insightful!',
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      // ✅ Komentar utama untuk Post 7
      {
        id: 37,
        userId: 4,
        postId: 7,
        parentId: null,
        content: 'Movies are a great way to relax! What did you watch?',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 38,
        userId: 7,
        postId: 7,
        parentId: null,
        content: 'Was it an action movie or a drama?',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 39,
        userId: 10,
        postId: 7,
        parentId: null,
        content: 'I love movies with a deep storyline!',
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      // 🔄 Balasan untuk salah satu komentar utama (ID 37)
      {
        id: 40,
        userId: 2,
        postId: 7,
        parentId: 37,
        content: 'It was a thriller, had me on edge the whole time!',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 41,
        userId: 5,
        postId: 7,
        parentId: 37,
        content: 'Sci-fi movies are always my favorite!',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 42,
        userId: 8,
        postId: 7,
        parentId: 37,
        content: 'Did it have a good ending? No spoilers!',
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      // ✅ Komentar utama untuk Post 8
      {
        id: 43,
        userId: 1,
        postId: 8,
        parentId: null,
        content: 'Starting a gym routine is tough, but worth it!',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 44,
        userId: 3,
        postId: 8,
        parentId: null,
        content: 'What kind of workouts are you focusing on?',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 45,
        userId: 6,
        postId: 8,
        parentId: null,
        content: 'Consistency is key to building strength!',
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      // 🔄 Balasan untuk salah satu komentar utama (ID 44)
      {
        id: 46,
        userId: 7,
        postId: 8,
        parentId: 44,
        content: 'Mainly strength training, but also some cardio!',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 47,
        userId: 9,
        postId: 8,
        parentId: 44,
        content: 'Leg day is always the hardest for me!',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 48,
        userId: 10,
        postId: 8,
        parentId: 44,
        content: "Don't forget to stretch before and after!",
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      // ✅ Komentar utama untuk Post 9
      {
        id: 49,
        userId: 5,
        postId: 9,
        parentId: null,
        content: 'Road trips with friends are the best memories!',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 50,
        userId: 8,
        postId: 9,
        parentId: null,
        content: 'Which place did you visit?',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 51,
        userId: 2,
        postId: 9,
        parentId: null,
        content: 'Nothing beats a road trip playlist!',
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      // 🔄 Balasan untuk salah satu komentar utama (ID 50)
      {
        id: 52,
        userId: 4,
        postId: 9,
        parentId: 50,
        content: 'We went to the mountains, breathtaking view!',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 53,
        userId: 6,
        postId: 9,
        parentId: 50,
        content: 'A beach trip would be amazing too!',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 54,
        userId: 1,
        postId: 9,
        parentId: 50,
        content: 'Did you camp overnight or just a day trip?',
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      // ✅ Komentar utama untuk Post 10
      {
        id: 55,
        userId: 3,
        postId: 10,
        parentId: null,
        content: 'Finally finishing a project feels so satisfying!',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 56,
        userId: 7,
        postId: 10,
        parentId: null,
        content: 'Time to celebrate! What’s next?',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 57,
        userId: 10,
        postId: 10,
        parentId: null,
        content: 'Great job! Hard work always pays off!',
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      // 🔄 Balasan untuk salah satu komentar utama (ID 56)
      {
        id: 58,
        userId: 5,
        postId: 10,
        parentId: 56,
        content: 'Starting a new project, already brainstorming ideas!',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 59,
        userId: 8,
        postId: 10,
        parentId: 56,
        content: 'Take a break before jumping into the next one!',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 60,
        userId: 9,
        postId: 10,
        parentId: 56,
        content: 'Any lessons learned from this project?',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Comments for Post ID 11
      {
        id: 61,
        userId: 2,
        postId: 11,
        parentId: null,
        content:
          'This is great news! More funding means better training for young athletes. 🏅',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 62,
        userId: 3,
        postId: 11,
        parentId: null,
        content:
          'I hope they allocate the funds properly. Some sports never get enough support.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 63,
        userId: 5,
        postId: 11,
        parentId: null,
        content:
          'Sports investment can also boost local economies. Excited to see the impact!',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 64,
        userId: 1,
        postId: 11,
        parentId: null,
        content:
          'I wonder if this will actually help underprivileged athletes. Hope so!',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // 🔄 Reply to Comment ID 62
      {
        id: 65,
        userId: 5,
        postId: 11,
        parentId: 62,
        content:
          "That's a valid concern. Some niche sports definitely get overlooked. 😕",
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      // Comments for Post ID 12
      {
        id: 66,
        userId: 3,
        postId: 12,
        parentId: null,
        content:
          "Yeah, ticket prices have been crazy lately. It's getting harder for fans to attend games.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 67,
        userId: 4,
        postId: 12,
        parentId: null,
        content:
          'Clubs should offer discounts to keep stadiums full despite inflation.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 68,
        userId: 2,
        postId: 12,
        parentId: null,
        content:
          'Streaming is becoming the go-to alternative. Live attendance might decline.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 69,
        userId: 5,
        postId: 12,
        parentId: null,
        content:
          'Governments should reduce taxes on sporting events to ease the burden!',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // 🔄 Reply to Comment ID 68
      {
        id: 70,
        userId: 3,
        postId: 12,
        parentId: 68,
        content: 'True! But nothing beats the stadium atmosphere. 🏟️🔥',
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      // Comments for Post ID 13
      {
        id: 71,
        userId: 1,
        postId: 13,
        parentId: null,
        content:
          'A strong economy helps in every sector, including sports development. Good times ahead!',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 72,
        userId: 5,
        postId: 13,
        parentId: null,
        content:
          'We need more stadiums and better training facilities. Hope they invest wisely.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 73,
        userId: 4,
        postId: 13,
        parentId: null,
        content:
          'I hope they dont forget grassroots-level sports programs too.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 74,
        userId: 3,
        postId: 13,
        parentId: null,
        content:
          'This could also mean more job opportunities in the sports industry! 🎉',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // 🔄 Reply to Comment ID 72
      {
        id: 75,
        userId: 1,
        postId: 13,
        parentId: 72,
        content: 'Exactly! Infrastructure is key to long-term success.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      // Comments for Post ID 14
      {
        id: 76,
        userId: 1,
        postId: 14,
        parentId: null,
        content:
          'Government subsidies could help, but where does the money come from?',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 77,
        userId: 3,
        postId: 14,
        parentId: null,
        content:
          'Public spending needs to be controlled, but young athletes do need support.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 78,
        userId: 5,
        postId: 14,
        parentId: null,
        content: 'Maybe they should partner with private sponsors instead?',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 79,
        userId: 4,
        postId: 14,
        parentId: null,
        content:
          'A mix of government and private funding could be the best approach.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // 🔄 Reply to Comment ID 76
      {
        id: 80,
        userId: 3,
        postId: 14,
        parentId: 76,
        content:
          'Taxpayer money will be used, but it depends on how they justify the spending.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      // Comments for Post ID 15
      {
        id: 81,
        userId: 1,
        postId: 15,
        parentId: null,
        content: 'Hosting events can boost tourism, but is it worth the cost?',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 82,
        userId: 2,
        postId: 15,
        parentId: null,
        content:
          'Local businesses could benefit a lot from these events. More jobs, more revenue!',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 83,
        userId: 4,
        postId: 15,
        parentId: null,
        content:
          "I think it's risky during economic slowdowns. Budgets should be prioritized.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 84,
        userId: 5,
        postId: 15,
        parentId: null,
        content:
          'International exposure is good, but long-term economic benefits matter more.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // 🔄 Reply to Comment ID 82
      {
        id: 85,
        userId: 3,
        postId: 15,
        parentId: 82,
        content:
          'True, but only if the event is well-managed. Otherwise, it could be a loss!',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 86,
        userId: 3,
        postId: 16,
        parentId: null,
        content:
          'I watched it too! The visuals were absolutely breathtaking. 🎥🔥',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 87,
        userId: 5,
        postId: 16,
        parentId: null,
        content: 'Was the storyline good too, or just the cinematography? 🤔',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 88,
        userId: 1,
        postId: 16,
        parentId: null,
        content: 'This movie is getting so much hype. Worth watching in IMAX?',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 89,
        userId: 4,
        postId: 16,
        parentId: null,
        content:
          'Im waiting for reviews before watching it. No spoilers please! 😅',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // 🔄 Reply to Comment ID 87
      {
        id: 90,
        userId: 3,
        postId: 16,
        parentId: 87,
        content:
          'The story was decent, but the visuals stole the show. Definitely a must-watch in theaters!',
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      // Comments for Post ID 17 (Music Concert Announcement)
      {
        id: 91,
        userId: 2,
        postId: 17,
        parentId: null,
        content:
          'Their last tour was amazing! Hoping to get VIP tickets this time. 🎟️',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 92,
        userId: 3,
        postId: 17,
        parentId: null,
        content:
          'Which cities are included in the tour? Hoping they come to my country! 🌍',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 93,
        userId: 1,
        postId: 17,
        parentId: null,
        content:
          'Prices better not be insane like last time. Concerts are getting so expensive. 💰',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 94,
        userId: 5,
        postId: 17,
        parentId: null,
        content: 'I hope they drop a new album before the tour starts! 🎶',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // 🔄 Reply to Comment ID 93
      {
        id: 95,
        userId: 2,
        postId: 17,
        parentId: 93,
        content:
          'Right? Ticket resellers make it even worse. Need better price controls!',
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      // Comments for Post ID 18 (Stock Market Drop)
      {
        id: 96,
        userId: 4,
        postId: 18,
        parentId: null,
        content:
          'This could impact global markets too. Investors must be worried. 📊',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 97,
        userId: 1,
        postId: 18,
        parentId: null,
        content:
          'Crypto is also dropping! Seems like a bad week for investments. 😬',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 98,
        userId: 3,
        postId: 18,
        parentId: null,
        content: 'Hoping for a rebound soon. Time to buy the dip? 🤷‍♂️',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 99,
        userId: 5,
        postId: 18,
        parentId: null,
        content:
          'Regulators might step in if things get worse. Let’s see how it plays out.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // 🔄 Reply to Comment ID 97
      {
        id: 100,
        userId: 4,
        postId: 18,
        parentId: 97,
        parentId: null,
        content:
          'Yeah, but some see this as an opportunity. Long-term holders stay strong! 💪',
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      // Comments for Post ID 19 (Medical Breakthrough)
      {
        id: 101,
        userId: 3,
        postId: 19,
        parentId: null,
        content:
          'This could save so many lives! Medical science is truly advancing. 👏',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 102,
        userId: 2,
        postId: 19,
        parentId: null,
        content:
          'Hope this treatment becomes affordable for everyone. Healthcare costs are crazy. 💊',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 103,
        userId: 4,
        postId: 19,
        parentId: null,
        content:
          'Exciting times! But we need more trials to ensure long-term safety.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 104,
        userId: 5,
        postId: 19,
        parentId: null,
        content:
          'Is this already available or still in testing? Need more details!',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // 🔄 Reply to Comment ID 102
      {
        id: 105,
        userId: 3,
        postId: 19,
        parentId: 102,
        content: 'True! Hope governments step in to make it accessible to all.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      // Comments for Post ID 20 (Severe Weather Alert)
      {
        id: 106,
        userId: 2,
        postId: 20,
        parentId: null,
        content:
          'I hope people take this seriously. Better to be safe than sorry! 🌪️',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 107,
        userId: 3,
        postId: 20,
        parentId: null,
        content:
          'Stocking up on essentials just in case. These storms can be unpredictable. ⛈️',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 108,
        userId: 1,
        postId: 20,
        parentId: null,
        content:
          'Are emergency shelters being set up? Authorities need to be proactive.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 109,
        userId: 4,
        postId: 20,
        parentId: null,
        content:
          'Stay updated with local news. Warnings help, but people must act fast! ⚠️',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // 🔄 Reply to Comment ID 108
      {
        id: 110,
        userId: 5,
        postId: 20,
        parentId: 108,
        content:
          'Some shelters are being set up. Hopefully, they have enough capacity!',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Comments', null, {});
  },
};
