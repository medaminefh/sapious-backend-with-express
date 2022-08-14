//import section
const dotenv = require("dotenv");
dotenv.config();
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const tagModels = require("../models/tag.model");
const categoryModels = require("../models/category.model");
const userModels = require("../models/user.model");
const path = require("path");
const fs = require("fs/promises");
const storyModel = require("../models/story.model");
const chapterModel = require("../models/chapter.model");
mongoose.connect(process.env.MONGODB_URI);

// we need to ensure that we're connected to the db before making any queries
mongoose.connection.on("connected", async () => {
  try {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash("123456", salt);
    const newUser = new userModels({
      firstName: "Mohamed Amine",
      lastName: "Fhal",
      email: "root@gmail.com",
      password: hashedPassword,
    });

    // creating the first user
    const userCreated = await newUser.save();

    const tagsJson = await fs.readFile(
      path.resolve("./", "scripts", "tags.json")
    );

    // creating tags from the tags.json file
    const tags = JSON.parse(tagsJson);
    await tagModels.insertMany(tags);

    const catJson = await fs.readFile(
      path.resolve("./", "scripts", "categories.json")
    );

    // creating categories from the categories.json file
    const categories = JSON.parse(catJson);
    await categoryModels.insertMany(categories);

    // creating the first story

    const newStory = new storyModel({
      title: "First dummy story title",
      description: "First dummy story description! YAY",
      author: userCreated.id,
      cover: "treat it as a cover!",
    });

    const storyCreated = await newStory.save();

    // create first chapter

    const newChapter = new chapterModel({
      content: "Hello there this is the first chapter of the first story",
      part: 1,
      story: storyCreated.id,
      title: "First story chapter title of the first story",
    });

    const chapterCreated = await newChapter.save();

    process.exit(0);
  } catch (err) {
    console.log("script end with error -", err);
    process.exit(1);
  }
});

mongoose.connection.on("error", (err) => {
  console.log("Mongodb failed with- ", err);
});
