import prisma from "./prismaGlobal";
import bcrypt from "bcryptjs";
import pcFans1 from "./demoImages/pc-fans-1.jpg";
import pcFans2 from "./demoImages/pc-fans-2.jpeg";
import japaneseFans2 from "./demoImages/japanese-fan-2.jpg";
import japaneseFans3 from "./demoImages/japanese-fan-3.jpg";
import industrialFan1 from "./demoImages/industrial-fan-1.jpg";
import industrialFan3 from "./demoImages/industrial-fan-3.jpg";
import { StaticImageData } from "next/image";

type Post = {
  id: string;
  text: string;
  images: StaticImageData[];
  numOfLikes: number;
  userId: string;
};

export default async function populateDatabase() {
  accountData.forEach(async (account) => {
    const hashedPassword = await bcrypt.hash(account.password, 10);
    const user = await prisma.user.create({
      data: {
        id: account.id,
        name: account.name,
        username: account.username,
        email: account.email,
        password: hashedPassword,
        image: account.image,
      },
    });
  });

  postData.forEach(async (post) => {
    const createdPost = await prisma.post.create({
      data: {
        id: post.id,
        text: post.text,
        numOfLikes: post.numOfLikes,
        userId: post.userId,
      },
    });
  });
}

const accountData = [
  {
    id: "1-test",
    name: "Breezy",
    username: "BreezeBuddies",
    email: "breezebuddies@gmail.com",
    password: "breezebuddies",
    image: "/pc-fans-3.jpg",
  },
  {
    id: "2-test",
    name: "Arctic",
    username: "arcticadmirer",
    email: "arcticadmirer@gmail.com",
    password: "arcticdmirer",
    image: "/japanese-fan-1.jpg",
  },
  {
    id: "3-test",
    name: "Frosty",
    username: "frostyfandom",
    email: "frostyfandom@gmail.com",
    password: "frostyfandom",
    image: "/industrial-fan-2.jpg",
  },
];

const postData: Post[] = [
  {
    id: "1a-test-post",
    text: "Unlock access to my refreshing content and beat the heat in style!",
    images: [],
    numOfLikes: 120,
    userId: "1-test",
  },
  {
    id: "1b-test-post",
    text: "Just dropped a new pic of my favorite fan! Who's ready to feel the breeze?",
    images: [pcFans1],
    numOfLikes: 579,
    userId: "1-test",
  },
  {
    id: "1c-test-post",
    text: "Spicing up your feed with some fan-tastic freshness! Stay chill, my BreezyBuddies.",
    images: [pcFans2],
    numOfLikes: 2847,
    userId: "1-test",
  },
  {
    id: "2a-test-post",
    text: "Need a cooldown? Dive into my ArcticAdmirers for some icy delights!",
    images: [],
    numOfLikes: 587,
    userId: "2-test",
  },
  {
    id: "2b-test-post",
    text: "Just posted a new pic of my coolest companion! Enjoy the breeze, ArcticAdmirers.",
    images: [japaneseFans2],
    numOfLikes: 5198,
    userId: "2-test",
  },
  {
    id: "2c-test-post",
    text: "Another day, another cool pic of my trusty fan! Stay breezy, ArcticAdmirers.",
    images: [japaneseFans3],
    numOfLikes: 341,
    userId: "2-test",
  },
  {
    id: "3a-test-post",
    text: "Summer sizzle got you down? Dive into my FrostyFandom and stay cool all season long!",
    images: [industrialFan1],
    numOfLikes: 492,
    userId: "3-test",
  },
  {
    id: "3b-test-post",
    text: "Ready to cool down? Swipe up to see my latest fan pic and feel the chill.",
    images: [industrialFan3],
    numOfLikes: 176,
    userId: "3-test",
  },
  {
    id: "3c-test-post",
    text: "Bringing some cool vibes to your feed with my latest fan pic. Enjoy the breeze, FrostyFans!",
    images: [],
    numOfLikes: 6842,
    userId: "3-test",
  },
];
