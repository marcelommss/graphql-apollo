const { ApolloServer } = require('apollo-server');

const typeDefs = `

  type Query {
    channels(idChannel: Int): [Channel]
    musics(idMusic: Int): [Music]
  }

  type Channel {
    idChannel: Int
    name: String
    playlists: [Playlist]
  }

  type Playlist {
    idPlaylist: Int
    idChannel: Int
    description: String
    videos: [Video]
  }

  type Video {
    idVideo: Int
    title: String
  }

  type Music {
    idMusic: Int
    title: String
    author: String
  }

  input MusicInput {
    title: String
    author: String
  }

  type Mutation {
    saveChannel(idChannel: Int, name: String): Channel
    createChannel(name: String): Channel
    saveMusic(music: MusicInput): Music
  }

`;

const channels = [
  { idChannel: 1, name: 'DEV Full Cycle' },
  { idChannel: 2, name: 'Rodrigo Branas' },
]

const playlists = [
  { idPlaylist: 1, idChannel: 1, description: 'Javascript' },
  { idPlaylist: 2, idChannel: 1, description: 'Node JS' },
]

const videos = [
  { idVideo: 1, idPlaylist: 1, title: 'Intro ao Javascript' },
  { idVideo: 2, idPlaylist: 1, title: 'Tipos de Dados' },
  { idVideo: 3, idPlaylist: 1, title: 'DDD' },
]

const musics = [
  {idMusic : 1, title: 'Otherside', author: 'Red Hot Chilli Peppers'},
  {idMusic : 2, title: 'Smell like teen spirit', author: 'Nirvana'},
  {idMusic : 3, title: 'In the End', author: 'Linking Park'},
]

const resolvers = {
  Query: {
    channels(obj, args) {
      return channels.filter(channel => !args.idChannel || channel.idChannel === args.idChannel);
    },
    musics(obj, args) {
      return musics.filter(music => !args.idMusic || channel.idMusic === args.idMusic);
    }
  },
  Mutation: {
    saveChannel(obj, args) {
      console.log(args);
    },
    createChannel(obj, args) {
      const name = args.name;
      const channel = { idChannel: channels.length + 1, name };
      channels.push(channel);
      return channel;
    },
    saveMusic(obj, args) {
      const music = { 
        idMusic: musics.length + 1, 
        ...args.music 
      };
      musics.push(music);
      return musics;
    }
  },
  Channel: {
    playlists(obj, args) {
      return playlists.filter(playlist => playlist.idChannel === obj.idChannel);
    }
  },
  Playlist:{
    videos(obj, args) {
      return videos.filter(video => video.idPlaylist === obj.idPlaylist);
    }
  },
};

const server = new ApolloServer({ typeDefs, resolvers });
server.listen(4001);