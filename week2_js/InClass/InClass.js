const fs = require("fs");
const superagent = require("superagent");

// Callback Hell
// fs.readFile(`${__dirname}/dog.txt`, (err, data) => {
//   if (err) {
//     console.error(err);
//   } else {
//     const breed = data.toString().trim();
//     superagent
//       .get(`https://dog.ceo/api/breed/${breed}/images/random`)
//       .then((res) => {
//         console.log(res.body.message);
//         fs.writeFile("dog-img.txt", res.body.message, (err) => {
//           if (err) {
//             console.error(err);
//           } else {
//             console.log("Random dog image saved to file!");
//           }
//         });
//       })
//       .catch((err) => {
//         console.error(err);
//       });
//   }
// });

// Promises
const readFilePro = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, `utf-8`, (err, data) => {
      if (err) reject(`I could not find that file 😢`);
      resolve(data);
    });
  });
};

const writeFilePro = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, (err) => {
      if (err) reject(`Could not write file 😢`);
      resolve(`Success!`);
    });
  });
};

// readFilePro(`${__dirname}/dog.txt`).then((data) =>
//   superagent
//     .get(`https://dog.ceo/api/breed/${data}/images/random`)
//     .then((res) => writeFilePro(`dog-img.txt`, res.body.message))
//     .then((res) => console.log(res))
//     .catch((err) => console.error(err))
//     .finally(() => console.log(`Random dog image saved to file!`))
// );

// Async/Await
const getDogPic = async () => {
  try {
    const data = await readFilePro(`${__dirname}/dog.txt`);
    const res = await superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const text = await writeFilePro(`dog-img.txt`, res.body.message);
    console.log(text);
    return text;
  } catch (err) {
    throw new Error(err);
  }
};
// getDogPic();

// IFFI (Immediately Invoked Function Expression)
// (async () => {
//   try {
//     const data = await getDogPic();
//     console.log(data);
//   } catch (e) {
//     console.error(e);
//   }
// })();

// Waitin for multiple promises to resolve
const getThreeDogPics = async () => {
  try {
    const data = await readFilePro(`${__dirname}/dog.txt`);

    const res1 = await superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const res2 = await superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const res3 = await superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const all = await Promise.all([res1, res2, res3]);
    const imgs = all.map((el) => el.body.message);
    const text = writeFilePro(`dog-img.txt`, imgs.join("\n"));
    console.log(imgs);
  } catch (err) {
    console.error(err);
  }
};

getThreeDogPics();
