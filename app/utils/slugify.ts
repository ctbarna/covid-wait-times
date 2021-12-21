import npmSlugify from "slugify";

const slugify = (text: string) => {
  return npmSlugify(text, {
    lower: true,
    strict: true,
  });
};

export default slugify;
