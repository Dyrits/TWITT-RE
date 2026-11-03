import type Db from '../db';
import type { DbTweet, DbUser } from '../db';

// Context used by the separate course resolver examples in this directory.
// The running application uses createResolvers in ../resolvers.ts instead.
export interface TwitterResolverContext {
  db: Db;
  dbTweetToFavoriteCountMap: Record<string, number>;
  dbUserCache: Record<string, DbUser>;
  dbTweetCache: Record<string, DbTweet>;
}
