module.exports = {
  fitpet: {
    input: {
      target: "https://api.distimer.com/swagger/doc.json",
    },
    output: {
      mode: "tags-split",
      target: "./src/api/endpoints",
      schemas: "./src/api/schemas",
      client: "react-query",
      mock: true,
      headers: true,
      clean: true,
      prettier: true,
      override: {
        mutator: {
          path: "./src/api/mutator/axios.ts",
          name: "customInstance",
        },
        query: {
          useQuery: true,
          useInfinite: true,
        },
      },
    },
  },
};
