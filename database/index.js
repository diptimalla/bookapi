const books = [
    {
      ISBN: "12345ONE",
      title: "Getting started with MERN",
      authors: [1, 2],
      language: "en",
      pubDate: "2021-07-07",
      numOfPage: 225,
      category: ["fiction", "programming", "tech", "web dev"],
      publication: 1,
    },
    {
        ISBN: "12345TWO",
        title: "Getting started with python",
        authors: [1, 2],
        language: "en",
        pubDate: "2021-07-07",
        numOfPage: 225,
        category: ["fiction", "programming", "tech", "web dev"],
        publication: 1,
      },
  ];
  
  const authors = [
    {
      id: 1,
      name: "Dipti",
      books: ["12345ONE"],
    },
    {
      id: 2,
      name: "Trupti",
      books: ["12345ONE"],
    },
  ];
  
  const publications = [
    {
      id: 1,
      name: "Chakra",
      books: ["12345ONE"],
    },
  ];
  
  module.exports = { books, authors, publications };
  