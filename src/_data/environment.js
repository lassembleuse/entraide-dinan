const env = process.env.ELEVENTY_ENV;

module.exports = async function() {
  if (env == "production") {
    return {
      baseUrl: "https://entraide-dinan.lassembleuse.fr"
    };
  } else {
    return {
      baseUrl: "http://localhost:8080"
    };
  }
};
