
module.exports = function(eleventyConfig) {

  // Collections ==================================

  eleventyConfig.addCollection("headerLink", function(collection) {
    return collection.getFilteredByTag("headerLink").sort((a, b) => {
      return a.data.headerOrder - b.data.headerOrder;
    });
  });

    // Filters ==================================

  const md = require("markdown-it")({
    html: false,
    breaks: true,
    linkify: true
  });

  eleventyConfig.addNunjucksFilter("markdownify", markdownString =>
    md.render(markdownString)
  );

  eleventyConfig.addFilter("limit", function(arr, limit) {
    return arr.slice(0, limit);
  });

  // Passthrough copy ===========================
  eleventyConfig
    .addPassthroughCopy({ "src/assets/fonts": "fonts" })
    .addPassthroughCopy({ "src/assets/js": "js" })
    .addPassthroughCopy({ "src/assets/images": "images" });

  // override default config
  return {
    dir: {
      input: "src",
      output: "_site"
    }
  };
};
