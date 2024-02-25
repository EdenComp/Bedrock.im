import { createContext } from 'react'
import { ETHAccount } from 'aleph-sdk-ts/dist/accounts/ethereum'

export const AlephContext = createContext<ETHAccount | null>(null)
