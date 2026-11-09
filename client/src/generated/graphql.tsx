/** Internal type. DO NOT USE DIRECTLY. */
type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** Internal type. DO NOT USE DIRECTLY. */
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
const defaultOptions = {} as const;
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

export type GetCurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCurrentUserQuery = { currentUser: { id: string, name: string, handle: string, avatarUrl: string, createdAt: string, updatedAt: string, coverUrl: string, favorites: Array<{ tweet: { id: string } | null }> | null, stats: { tweetCount: number, followerCount: number, followingCount: number } | null }, suggestions: Array<{ name: string, handle: string, avatarUrl: string, reason: string }> | null, trends: Array<
    | { tweetCount: number, hashtag: string }
    | { tweetCount: number, topic: string, quote: { title: string, imageUrl: string, description: string } | null }
  > | null };

export type CreateNewTweetMutationVariables = Exact<{
  userId: string;
  body: string;
}>;


export type CreateNewTweetMutation = { createTweet: { id: string } };

export type GetTimelineTweetsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetTimelineTweetsQuery = { tweets: Array<{ id: string, body: string, createdAt: string, stats: { favoriteCount: number, retweetCount: number, commentCount: number } | null, favorites: Array<{ user: { id: string } | null }> | null, author: { name: string, handle: string, avatarUrl: string } | null }> | null };

export type CreateFavoriteMutationVariables = Exact<{
  tweetId: string;
  userId: string;
}>;


export type CreateFavoriteMutation = { createFavorite: { tweet: { id: string } | null, user: { id: string } | null } };

export type DeleteFavoriteMutationVariables = Exact<{
  tweetId: string;
  userId: string;
}>;


export type DeleteFavoriteMutation = { deleteFavorite: { tweet: { id: string } | null, user: { id: string } | null } };


export const GetCurrentUserDocument = gql`
    query GetCurrentUser {
  currentUser {
    favorites {
      tweet {
        id
      }
    }
    id
    name
    handle
    avatarUrl
    createdAt
    updatedAt
    coverUrl
    stats {
      tweetCount
      followerCount
      followingCount
    }
  }
  suggestions {
    name
    handle
    avatarUrl
    reason
  }
  trends {
    ... on TopicTrend {
      tweetCount
      topic
      quote {
        title
        imageUrl
        description
      }
    }
    ... on HashtagTrend {
      tweetCount
      hashtag
    }
  }
}
    `;

/**
 * __useGetCurrentUserQuery__
 *
 * To run a query within a React component, call `useGetCurrentUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCurrentUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCurrentUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCurrentUserQuery(baseOptions?: Apollo.QueryHookOptions<GetCurrentUserQuery, GetCurrentUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCurrentUserQuery, GetCurrentUserQueryVariables>(GetCurrentUserDocument, options);
      }
export function useGetCurrentUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCurrentUserQuery, GetCurrentUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCurrentUserQuery, GetCurrentUserQueryVariables>(GetCurrentUserDocument, options);
        }
// @ts-ignore
export function useGetCurrentUserSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetCurrentUserQuery, GetCurrentUserQueryVariables>): Apollo.UseSuspenseQueryResult<GetCurrentUserQuery, GetCurrentUserQueryVariables>;
export function useGetCurrentUserSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetCurrentUserQuery, GetCurrentUserQueryVariables>): Apollo.UseSuspenseQueryResult<GetCurrentUserQuery | undefined, GetCurrentUserQueryVariables>;
export function useGetCurrentUserSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetCurrentUserQuery, GetCurrentUserQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetCurrentUserQuery, GetCurrentUserQueryVariables>(GetCurrentUserDocument, options);
        }
export type GetCurrentUserQueryHookResult = ReturnType<typeof useGetCurrentUserQuery>;
export type GetCurrentUserLazyQueryHookResult = ReturnType<typeof useGetCurrentUserLazyQuery>;
export type GetCurrentUserSuspenseQueryHookResult = ReturnType<typeof useGetCurrentUserSuspenseQuery>;
export type GetCurrentUserQueryResult = Apollo.QueryResult<GetCurrentUserQuery, GetCurrentUserQueryVariables>;
export const CreateNewTweetDocument = gql`
    mutation CreateNewTweet($userId: String!, $body: String!) {
  createTweet(userId: $userId, body: $body) {
    id
  }
}
    `;
export type CreateNewTweetMutationFn = Apollo.MutationFunction<CreateNewTweetMutation, CreateNewTweetMutationVariables>;

/**
 * __useCreateNewTweetMutation__
 *
 * To run a mutation, you first call `useCreateNewTweetMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateNewTweetMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createNewTweetMutation, { data, loading, error }] = useCreateNewTweetMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      body: // value for 'body'
 *   },
 * });
 */
export function useCreateNewTweetMutation(baseOptions?: Apollo.MutationHookOptions<CreateNewTweetMutation, CreateNewTweetMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateNewTweetMutation, CreateNewTweetMutationVariables>(CreateNewTweetDocument, options);
      }
export type CreateNewTweetMutationHookResult = ReturnType<typeof useCreateNewTweetMutation>;
export type CreateNewTweetMutationResult = Apollo.MutationResult<CreateNewTweetMutation>;
export type CreateNewTweetMutationOptions = Apollo.BaseMutationOptions<CreateNewTweetMutation, CreateNewTweetMutationVariables>;
export const GetTimelineTweetsDocument = gql`
    query GetTimelineTweets {
  tweets {
    id
    body
    stats {
      favoriteCount
      retweetCount
      commentCount
    }
    createdAt
    favorites {
      user {
        id
      }
    }
    author {
      name
      handle
      avatarUrl
    }
  }
}
    `;

/**
 * __useGetTimelineTweetsQuery__
 *
 * To run a query within a React component, call `useGetTimelineTweetsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTimelineTweetsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTimelineTweetsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetTimelineTweetsQuery(baseOptions?: Apollo.QueryHookOptions<GetTimelineTweetsQuery, GetTimelineTweetsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTimelineTweetsQuery, GetTimelineTweetsQueryVariables>(GetTimelineTweetsDocument, options);
      }
export function useGetTimelineTweetsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTimelineTweetsQuery, GetTimelineTweetsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTimelineTweetsQuery, GetTimelineTweetsQueryVariables>(GetTimelineTweetsDocument, options);
        }
// @ts-ignore
export function useGetTimelineTweetsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetTimelineTweetsQuery, GetTimelineTweetsQueryVariables>): Apollo.UseSuspenseQueryResult<GetTimelineTweetsQuery, GetTimelineTweetsQueryVariables>;
export function useGetTimelineTweetsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetTimelineTweetsQuery, GetTimelineTweetsQueryVariables>): Apollo.UseSuspenseQueryResult<GetTimelineTweetsQuery | undefined, GetTimelineTweetsQueryVariables>;
export function useGetTimelineTweetsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetTimelineTweetsQuery, GetTimelineTweetsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetTimelineTweetsQuery, GetTimelineTweetsQueryVariables>(GetTimelineTweetsDocument, options);
        }
export type GetTimelineTweetsQueryHookResult = ReturnType<typeof useGetTimelineTweetsQuery>;
export type GetTimelineTweetsLazyQueryHookResult = ReturnType<typeof useGetTimelineTweetsLazyQuery>;
export type GetTimelineTweetsSuspenseQueryHookResult = ReturnType<typeof useGetTimelineTweetsSuspenseQuery>;
export type GetTimelineTweetsQueryResult = Apollo.QueryResult<GetTimelineTweetsQuery, GetTimelineTweetsQueryVariables>;
export const CreateFavoriteDocument = gql`
    mutation CreateFavorite($tweetId: String!, $userId: String!) {
  createFavorite(tweetId: $tweetId, userId: $userId) {
    tweet {
      id
    }
    user {
      id
    }
  }
}
    `;
export type CreateFavoriteMutationFn = Apollo.MutationFunction<CreateFavoriteMutation, CreateFavoriteMutationVariables>;

/**
 * __useCreateFavoriteMutation__
 *
 * To run a mutation, you first call `useCreateFavoriteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateFavoriteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createFavoriteMutation, { data, loading, error }] = useCreateFavoriteMutation({
 *   variables: {
 *      tweetId: // value for 'tweetId'
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useCreateFavoriteMutation(baseOptions?: Apollo.MutationHookOptions<CreateFavoriteMutation, CreateFavoriteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateFavoriteMutation, CreateFavoriteMutationVariables>(CreateFavoriteDocument, options);
      }
export type CreateFavoriteMutationHookResult = ReturnType<typeof useCreateFavoriteMutation>;
export type CreateFavoriteMutationResult = Apollo.MutationResult<CreateFavoriteMutation>;
export type CreateFavoriteMutationOptions = Apollo.BaseMutationOptions<CreateFavoriteMutation, CreateFavoriteMutationVariables>;
export const DeleteFavoriteDocument = gql`
    mutation DeleteFavorite($tweetId: String!, $userId: String!) {
  deleteFavorite(tweetId: $tweetId, userId: $userId) {
    tweet {
      id
    }
    user {
      id
    }
  }
}
    `;
export type DeleteFavoriteMutationFn = Apollo.MutationFunction<DeleteFavoriteMutation, DeleteFavoriteMutationVariables>;

/**
 * __useDeleteFavoriteMutation__
 *
 * To run a mutation, you first call `useDeleteFavoriteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteFavoriteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteFavoriteMutation, { data, loading, error }] = useDeleteFavoriteMutation({
 *   variables: {
 *      tweetId: // value for 'tweetId'
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useDeleteFavoriteMutation(baseOptions?: Apollo.MutationHookOptions<DeleteFavoriteMutation, DeleteFavoriteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteFavoriteMutation, DeleteFavoriteMutationVariables>(DeleteFavoriteDocument, options);
      }
export type DeleteFavoriteMutationHookResult = ReturnType<typeof useDeleteFavoriteMutation>;
export type DeleteFavoriteMutationResult = Apollo.MutationResult<DeleteFavoriteMutation>;
export type DeleteFavoriteMutationOptions = Apollo.BaseMutationOptions<DeleteFavoriteMutation, DeleteFavoriteMutationVariables>;