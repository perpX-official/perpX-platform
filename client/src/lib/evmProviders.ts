export function isPhantomEvmProvider(provider: any): boolean {
  if (!provider) return false;
  if (provider.isPhantom || provider.isPhantomWallet) return true;
  if (typeof window !== "undefined") {
    const phantomProvider = (window as any).phantom?.ethereum;
    if (phantomProvider && provider === phantomProvider) return true;
  }
  return false;
}

export function isMetaMaskProvider(provider: any): boolean {
  if (!provider) return false;
  if (!provider.isMetaMask) return false;
  if (isPhantomEvmProvider(provider)) return false;
  if (provider.isRabby || provider.isBraveWallet || provider.isCoinbaseWallet) return false;
  return true;
}

export function isTrustProvider(provider: any): boolean {
  if (!provider) return false;
  if (provider.isPhantom || provider.isPhantomWallet) return false;
  if (provider.isMetaMask && !provider.isTrust && !provider.isTrustWallet) return false;
  return !!(provider.isTrust || provider.isTrustWallet);
}

export function isSafePalProvider(provider: any): boolean {
  if (!provider) return false;
  if (provider.isPhantom || provider.isPhantomWallet) return false;
  if (provider.isMetaMask && !provider.isSafePal) return false;
  return !!provider.isSafePal;
}

export function getMetaMaskProvider(targetWindow?: Window): any | undefined {
  const win = targetWindow ?? (typeof window !== "undefined" ? window : undefined);
  if (!win) return undefined;
  const ethereum = (win as any).ethereum;
  if (!ethereum) return undefined;

  const providers = Array.isArray(ethereum.providers) ? ethereum.providers : [];
  const metaMaskProvider = providers.find(isMetaMaskProvider);
  if (metaMaskProvider) return metaMaskProvider;
  if (isMetaMaskProvider(ethereum)) return ethereum;
  return undefined;
}

export function getTrustProvider(targetWindow?: Window): any | undefined {
  const win = targetWindow ?? (typeof window !== "undefined" ? window : undefined);
  if (!win) return undefined;
  const ethereum = (win as any).ethereum;
  if (!ethereum) return undefined;

  const providers = Array.isArray(ethereum.providers) ? ethereum.providers : [];
  const trustProvider = providers.find(isTrustProvider);
  if (trustProvider) return trustProvider;
  if (isTrustProvider(ethereum)) return ethereum;
  return undefined;
}

export function getSafePalProvider(targetWindow?: Window): any | undefined {
  const win = targetWindow ?? (typeof window !== "undefined" ? window : undefined);
  if (!win) return undefined;
  const ethereum = (win as any).ethereum;
  if (!ethereum) return undefined;

  const providers = Array.isArray(ethereum.providers) ? ethereum.providers : [];
  const safePalProvider = providers.find(isSafePalProvider);
  if (safePalProvider) return safePalProvider;
  if (isSafePalProvider(ethereum)) return ethereum;
  return undefined;
}

export function detectMetaMaskAvailable(targetWindow?: Window): boolean {
  return !!getMetaMaskProvider(targetWindow);
}

export function detectTrustAvailable(targetWindow?: Window): boolean {
  return !!getTrustProvider(targetWindow);
}

export function detectSafePalAvailable(targetWindow?: Window): boolean {
  return !!getSafePalProvider(targetWindow);
}
