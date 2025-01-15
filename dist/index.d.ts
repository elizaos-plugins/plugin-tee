import { Plugin } from '@elizaos/core';
import { Keypair } from '@solana/web3.js';
import { DeriveKeyResponse, TdxQuoteHashAlgorithms } from '@phala/dstack-sdk';
import { PrivateKeyAccount } from 'viem';

declare enum TEEMode {
    OFF = "OFF",
    LOCAL = "LOCAL",// For local development with simulator
    DOCKER = "DOCKER",// For docker development with simulator
    PRODUCTION = "PRODUCTION"
}
interface RemoteAttestationQuote {
    quote: string;
    timestamp: number;
}

declare class DeriveKeyProvider {
    private client;
    private raProvider;
    constructor(teeMode?: string);
    private generateDeriveKeyAttestation;
    rawDeriveKey(path: string, subject: string): Promise<DeriveKeyResponse>;
    deriveEd25519Keypair(path: string, subject: string, agentId: string): Promise<{
        keypair: Keypair;
        attestation: RemoteAttestationQuote;
    }>;
    deriveEcdsaKeypair(path: string, subject: string, agentId: string): Promise<{
        keypair: PrivateKeyAccount;
        attestation: RemoteAttestationQuote;
    }>;
}

declare class RemoteAttestationProvider {
    private client;
    constructor(teeMode?: string);
    generateAttestation(reportData: string, hashAlgorithm?: TdxQuoteHashAlgorithms): Promise<RemoteAttestationQuote>;
}

declare const teePlugin: Plugin;

export { DeriveKeyProvider, RemoteAttestationProvider, type RemoteAttestationQuote, TEEMode, teePlugin };
