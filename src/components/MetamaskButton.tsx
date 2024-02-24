import {useAccount, useConnect, useDisconnect} from "wagmi";
import {wagmiConfig} from "../utils/config";
import {mainnet} from "viem/chains";
import {useAlephAccount} from "../context/useAlephAccount.tsx";
import {useCallback} from "react";
import {useCreatePost, useGetPosts} from "../utils/query.ts";

export default function MetamaskButton() {
  const account = useAccount()
  const { connect } = useConnect({
    config: wagmiConfig,
  })
  const { disconnect } = useDisconnect()
  const alephAccount = useAlephAccount()

  const posts = useGetPosts({
    page: 1,
    pagination: 10,
  })

  const { mutateAsync: createPost } = useCreatePost()

  const submitPost = useCallback(async () => {
    try {
      if (!alephAccount?.account) {
        throw new Error("No aleph account")
      }
      await createPost({
        content: { message: "Crampté" },
        account: alephAccount.account,
    })
    } catch (e) {
      console.error(e)
    }
  }, [createPost, alephAccount?.account])

  return (
    <>
      <button
        onClick={() => {
          if (!account.isConnected) {
            connect({
              chainId: mainnet.id,
              connector: wagmiConfig.connectors[0],
            })
          } else {
            disconnect()
          }
        }}
      >
        {account.isConnected ? "Disconnect" : "Connect"}
      </button>
      <p>
        Current aleph account: {alephAccount?.account?.address ?? "None"}
      </p>
      {alephAccount?.account && (
        <button
          onClick={submitPost}
        >
          Create new post
        </button>
      )}
      {posts.isLoading && <p>Loading...</p>}
      {posts.error && <p>Error: {posts.error.message}</p>}
      {posts.data ? posts.data.posts.map((post) => {
        return (
          <div key={post.hash}>
            <p>{JSON.stringify(post.content)}</p>
            <p>Author: {post.address}</p>
          </div>
        )
      }) : (
        <p>No posts :(</p>
      )}
    </>
  );
}
