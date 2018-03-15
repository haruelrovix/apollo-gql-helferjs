import { Author, View, FortuneCookie } from './connectors';

const resolvers = {
  // Query
  Query: {
    author(_, args) {
      return Author.find({ where: args });
    },
    allAuthors(_, args) {
      return Author.findAll();
    },
    getFortuneCookie() {
      return FortuneCookie.getOne();
    }
  },
  // Author
  Author: {
    posts(author) {
      return author.getPosts();
    }
  },
  // Post
  Post: {
    author(post) {
      return post.getAuthor();
    },
    views(post) {
      return View.findOne({ postId: post.id }).then(view => view.views);
    }
  }
};

export default resolvers;
