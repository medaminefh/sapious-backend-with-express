## Wattpad Clone with Nodejs, Express, Mongoose (Sapious Bootcamp)

### we used aggregation in this project, and i want to put some tips on how to use it

#### 1- why we use aggregation :

we use aggregation to find some data and let us manipulate that data freely, and its much faster than the normal find, because it uses the native mongodb command(not mongoose)

#### 2- how to findById with aggregation :

we use the **\_id** and not <del>id</del> because \_id returns the new ObjectId and that's what aggregate wants , and id returns a string

#### 3- how to find collection with some fields from another collection (JOIN in SQL)

we use the **$lookup** for exp we have a chapters collection and we want to find them based on the id and returns them inside a field(as) chapters:

```js
    {
        $lookup: {
          from: "chapters",
          localField: "_id",
          foreignField: "story",
          as: "chapters",
        },
    }
```

we can use as many lookups as we want

#### 4- how to know add another field to the returned collection for exp number of chapters :

we use the **$addFields** for exp we want to add another field called **totalChapters** that will returns the number of chapters inside that collection :

PS: **`$chapters`** here must be exist in the collection (as a variable) Look `story.controller.js` file

```js
    {
        $addFields: {
          totalChapters: { $size: "$chapters" },
        },
      },
```
