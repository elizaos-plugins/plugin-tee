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
    /**
     * Derives a raw key from the given path and subject.
     * @param path - The path to derive the key from. This is used to derive the key from the root of trust.
     * @param subject - The subject to derive the key from. This is used for the certificate chain.
     * @returns The derived key.
     */
    rawDeriveKey(path: string, subject: string): Promise<DeriveKeyResponse>;
    /**
     * Derives an Ed25519 keypair from the given path and subject.
     * @param path - The path to derive the key from. This is used to derive the key from the root of trust.
     * @param subject - The subject to derive the key from. This is used for the certificate chain.
     * @param agentId - The agent ID to generate an attestation for.
     * @returns An object containing the derived keypair and attestation.
     */
    deriveEd25519Keypair(path: string, subject: string, agentId: string): Promise<{
        keypair: Keypair;
        attestation: RemoteAttestationQuote;
    }>;
    /**
     * Derives an ECDSA keypair from the given path and subject.
     * @param path - The path to derive the key from. This is used to derive the key from the root of trust.
     * @param subject - The subject to derive the key from. This is used for the certificate chain.
     * @param agentId - The agent ID to generate an attestation for. This is used for the certificate chain.
     * @returns An object containing the derived keypair and attestation.
     */
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
