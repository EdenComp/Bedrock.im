import {post} from "aleph-sdk-ts/dist/messages";
import {alephChannel, alephPostType} from "../utils/config.ts";
import {useMutation, useQuery} from "@tanstack/react-query";
import {ETHAccount} from "aleph-sdk-ts/dist/accounts/ethereum";

type WithAccount<T> = T & {
  account: ETHAccount
}

interface GetPostsRequest {
  page?: number
  pagination?: number
}

interface CreatePostRequest {
  content: unknown
}

export const useGetPosts = ({ page = 1, pagination = 10 }: GetPostsRequest) => {
  return useQuery({
    queryKey: ["getPosts"],
    queryFn: async () => {
      return post.Get({
        page,
        pagination,
        types: alephPostType,
      })
    }
  })
}

export const useCreatePost = () => {
  return useMutation({
    mutationKey: ["createPost"],
    mutationFn: async ({ account, content }: WithAccount<CreatePostRequest>) =>
      post.Publish({
        content,
        account: account,
        channel: alephChannel,
        postType: alephPostType,
      })
  })
}
