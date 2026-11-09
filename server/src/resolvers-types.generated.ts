import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type DeletionResult = {
  __typename?: 'DeletionResult';
  deleted?: Maybe<Array<Scalars['String']['output']>>;
};

export type Favorite = {
  __typename?: 'Favorite';
  createdAt: Scalars['String']['output'];
  id: Scalars['String']['output'];
  tweet?: Maybe<Tweet>;
  updatedAt: Scalars['String']['output'];
  user?: Maybe<User>;
};

export type HashtagTrend = {
  __typename?: 'HashtagTrend';
  hashtag: Scalars['String']['output'];
  tweetCount: Scalars['Int']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createFavorite: Favorite;
  createTweet: Tweet;
  deleteFavorite: Favorite;
};


export type MutationCreateFavoriteArgs = {
  tweetId: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};


export type MutationCreateTweetArgs = {
  body: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};


export type MutationDeleteFavoriteArgs = {
  tweetId: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  currentUser: User;
  suggestions?: Maybe<Array<Suggestion>>;
  trends?: Maybe<Array<Trend>>;
  tweets?: Maybe<Array<Tweet>>;
  user?: Maybe<User>;
};


export type QueryUserArgs = {
  id: Scalars['String']['input'];
};

export type Retweet = {
  __typename?: 'Retweet';
  createdAt: Scalars['String']['output'];
  id: Scalars['String']['output'];
  tweet?: Maybe<Tweet>;
  updatedAt: Scalars['String']['output'];
  user?: Maybe<User>;
};

export type Suggestion = {
  __typename?: 'Suggestion';
  avatarUrl: Scalars['String']['output'];
  handle: Scalars['String']['output'];
  name: Scalars['String']['output'];
  reason: Scalars['String']['output'];
};

export type TopicTrend = {
  __typename?: 'TopicTrend';
  quote?: Maybe<TopicTrendQuote>;
  topic: Scalars['String']['output'];
  tweetCount: Scalars['Int']['output'];
};

export type TopicTrendQuote = {
  __typename?: 'TopicTrendQuote';
  description: Scalars['String']['output'];
  imageUrl: Scalars['String']['output'];
  title: Scalars['String']['output'];
};

export type Trend = HashtagTrend | TopicTrend;

export type Tweet = {
  __typename?: 'Tweet';
  author?: Maybe<User>;
  body: Scalars['String']['output'];
  createdAt: Scalars['String']['output'];
  favorites?: Maybe<Array<Favorite>>;
  id: Scalars['String']['output'];
  retweets?: Maybe<Array<Retweet>>;
  stats?: Maybe<TweetStats>;
  updatedAt: Scalars['String']['output'];
};

export type TweetStats = {
  __typename?: 'TweetStats';
  commentCount: Scalars['Int']['output'];
  favoriteCount: Scalars['Int']['output'];
  retweetCount: Scalars['Int']['output'];
};

export type User = {
  __typename?: 'User';
  avatarUrl: Scalars['String']['output'];
  coverUrl: Scalars['String']['output'];
  createdAt: Scalars['String']['output'];
  deletedAt?: Maybe<Scalars['String']['output']>;
  favorites?: Maybe<Array<Favorite>>;
  handle: Scalars['String']['output'];
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  retweets?: Maybe<Array<Retweet>>;
  stats?: Maybe<UserStats>;
  tweets?: Maybe<Array<Tweet>>;
  updatedAt: Scalars['String']['output'];
};

export type UserStats = {
  __typename?: 'UserStats';
  followerCount: Scalars['Int']['output'];
  followingCount: Scalars['Int']['output'];
  tweetCount: Scalars['Int']['output'];
  user: User;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>, TArgs = Record<PropertyKey, never>> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>, TArgs = Record<PropertyKey, never>> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = Record<PropertyKey, never>, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>, TArgs = Record<PropertyKey, never>> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping of union types */
export type ResolversUnionTypes<_RefType extends Record<string, unknown>> = {
  Trend:
    | ( HashtagTrend )
    | ( TopicTrend )
  ;
};


/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  DeletionResult: ResolverTypeWrapper<DeletionResult>;
  Favorite: ResolverTypeWrapper<Favorite>;
  HashtagTrend: ResolverTypeWrapper<HashtagTrend>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Mutation: ResolverTypeWrapper<Record<PropertyKey, never>>;
  Query: ResolverTypeWrapper<Record<PropertyKey, never>>;
  Retweet: ResolverTypeWrapper<Retweet>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  Suggestion: ResolverTypeWrapper<Suggestion>;
  TopicTrend: ResolverTypeWrapper<TopicTrend>;
  TopicTrendQuote: ResolverTypeWrapper<TopicTrendQuote>;
  Trend: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['Trend']>;
  Tweet: ResolverTypeWrapper<Tweet>;
  TweetStats: ResolverTypeWrapper<TweetStats>;
  User: ResolverTypeWrapper<User>;
  UserStats: ResolverTypeWrapper<UserStats>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean']['output'];
  DeletionResult: DeletionResult;
  Favorite: Favorite;
  HashtagTrend: HashtagTrend;
  Int: Scalars['Int']['output'];
  Mutation: Record<PropertyKey, never>;
  Query: Record<PropertyKey, never>;
  Retweet: Retweet;
  String: Scalars['String']['output'];
  Suggestion: Suggestion;
  TopicTrend: TopicTrend;
  TopicTrendQuote: TopicTrendQuote;
  Trend: ResolversUnionTypes<ResolversParentTypes>['Trend'];
  Tweet: Tweet;
  TweetStats: TweetStats;
  User: User;
  UserStats: UserStats;
};

export type DeletionResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['DeletionResult'] = ResolversParentTypes['DeletionResult']> = {
  deleted?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>;
};

export type FavoriteResolvers<ContextType = any, ParentType extends ResolversParentTypes['Favorite'] = ResolversParentTypes['Favorite']> = {
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  tweet?: Resolver<Maybe<ResolversTypes['Tweet']>, ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
};

export type HashtagTrendResolvers<ContextType = any, ParentType extends ResolversParentTypes['HashtagTrend'] = ResolversParentTypes['HashtagTrend']> = {
  hashtag?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  tweetCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createFavorite?: Resolver<ResolversTypes['Favorite'], ParentType, ContextType, RequireFields<MutationCreateFavoriteArgs, 'tweetId' | 'userId'>>;
  createTweet?: Resolver<ResolversTypes['Tweet'], ParentType, ContextType, RequireFields<MutationCreateTweetArgs, 'body' | 'userId'>>;
  deleteFavorite?: Resolver<ResolversTypes['Favorite'], ParentType, ContextType, RequireFields<MutationDeleteFavoriteArgs, 'tweetId' | 'userId'>>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  currentUser?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  suggestions?: Resolver<Maybe<Array<ResolversTypes['Suggestion']>>, ParentType, ContextType>;
  trends?: Resolver<Maybe<Array<ResolversTypes['Trend']>>, ParentType, ContextType>;
  tweets?: Resolver<Maybe<Array<ResolversTypes['Tweet']>>, ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryUserArgs, 'id'>>;
};

export type RetweetResolvers<ContextType = any, ParentType extends ResolversParentTypes['Retweet'] = ResolversParentTypes['Retweet']> = {
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  tweet?: Resolver<Maybe<ResolversTypes['Tweet']>, ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
};

export type SuggestionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Suggestion'] = ResolversParentTypes['Suggestion']> = {
  avatarUrl?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  handle?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  reason?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export type TopicTrendResolvers<ContextType = any, ParentType extends ResolversParentTypes['TopicTrend'] = ResolversParentTypes['TopicTrend']> = {
  quote?: Resolver<Maybe<ResolversTypes['TopicTrendQuote']>, ParentType, ContextType>;
  topic?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  tweetCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TopicTrendQuoteResolvers<ContextType = any, ParentType extends ResolversParentTypes['TopicTrendQuote'] = ResolversParentTypes['TopicTrendQuote']> = {
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  imageUrl?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export type TrendResolvers<ContextType = any, ParentType extends ResolversParentTypes['Trend'] = ResolversParentTypes['Trend']> = {
  __resolveType: TypeResolveFn<'HashtagTrend' | 'TopicTrend', ParentType, ContextType>;
};

export type TweetResolvers<ContextType = any, ParentType extends ResolversParentTypes['Tweet'] = ResolversParentTypes['Tweet']> = {
  author?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  body?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  favorites?: Resolver<Maybe<Array<ResolversTypes['Favorite']>>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  retweets?: Resolver<Maybe<Array<ResolversTypes['Retweet']>>, ParentType, ContextType>;
  stats?: Resolver<Maybe<ResolversTypes['TweetStats']>, ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export type TweetStatsResolvers<ContextType = any, ParentType extends ResolversParentTypes['TweetStats'] = ResolversParentTypes['TweetStats']> = {
  commentCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  favoriteCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  retweetCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  avatarUrl?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  coverUrl?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  deletedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  favorites?: Resolver<Maybe<Array<ResolversTypes['Favorite']>>, ParentType, ContextType>;
  handle?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  retweets?: Resolver<Maybe<Array<ResolversTypes['Retweet']>>, ParentType, ContextType>;
  stats?: Resolver<Maybe<ResolversTypes['UserStats']>, ParentType, ContextType>;
  tweets?: Resolver<Maybe<Array<ResolversTypes['Tweet']>>, ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export type UserStatsResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserStats'] = ResolversParentTypes['UserStats']> = {
  followerCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  followingCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  tweetCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  DeletionResult?: DeletionResultResolvers<ContextType>;
  Favorite?: FavoriteResolvers<ContextType>;
  HashtagTrend?: HashtagTrendResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Retweet?: RetweetResolvers<ContextType>;
  Suggestion?: SuggestionResolvers<ContextType>;
  TopicTrend?: TopicTrendResolvers<ContextType>;
  TopicTrendQuote?: TopicTrendQuoteResolvers<ContextType>;
  Trend?: TrendResolvers<ContextType>;
  Tweet?: TweetResolvers<ContextType>;
  TweetStats?: TweetStatsResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  UserStats?: UserStatsResolvers<ContextType>;
};

