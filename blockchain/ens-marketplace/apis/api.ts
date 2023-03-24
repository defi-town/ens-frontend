import dotenv from 'dotenv';
dotenv.config();
import { BigNumber, ethers } from 'ethers';
import {
  abi as ENSMarketAbi,
  address as ensMarketAddress,
} from '../build/deployments/ENSMarket.json';
import { abi as ENSAbi } from '../build/dependencies/ENS.json';

const ensAddress = process.env.ENS_ADDRESS_MAINNET as string;

const ensMarketInstance = new ethers.Contract(ensMarketAddress, ENSMarketAbi);
const ensNft = new ethers.Contract(ensAddress, ENSAbi);

/**
 * Returns the approved address for a specific token ID.
 * @param {BigNumber} tokenId - The token ID to check the allowance status for.
 * @returns {Promise<any>} The allowed address.
 */
export const getAllowanceStatus = async (tokenId: BigNumber): Promise<any> => {
  const allowedAddress = await ensNft.getApproved(tokenId);
  console.log('allowedAddress', allowedAddress);

  return allowedAddress;
};

/**
 * Approves an asset for listing by setting the ENS marketplace as the approved address.
 * @param {ethers.Signer} signer - The signer object used for signing the transaction.
 * @param {BigNumber} tokenId - The token ID of the asset to approve for listing.
 * @returns {Promise<any>} The transaction receipt.
 */
export const approveAssetListing = async (
  signer: ethers.Signer,
  tokenId: BigNumber
): Promise<any> => {
  const tx = await ensNft.connect(signer).approve(ensMarketAddress, tokenId);
  const receipt = await tx.wait();
  console.log('receipt', receipt);

  return receipt;
};

/**
 * Lists an asset for sale on the ENS marketplace with a specified price.
 * @param {ethers.Signer} signer - The signer object used for signing the transaction.
 * @param {BigNumber} tokenId - The token ID of the asset to list.
 * @param {BigNumber} price - The price of the asset in the marketplace.
 * @returns {Promise<any>} The transaction receipt.
 */
export const listAsset = async (
  signer: ethers.Signer,
  tokenId: BigNumber,
  price: BigNumber
): Promise<any> => {
  const tx = await ensMarketInstance.connect(signer).listAsset(tokenId, price);
  const receipt = await tx.wait();
  console.log('receipt', receipt);

  return receipt;
};

/**
 * Buys an asset from the ENS marketplace.
 * @param {ethers.Signer} signer - The signer object used for signing the transaction.
 * @param {BigNumber} tokenId - The token ID of the asset to buy.
 * @param {BigNumber} value - The value to send in the transaction to purchase the asset.
 * @returns {Promise<any>} The transaction receipt.
 */
export const buyAsset = async (
  signer: ethers.Signer,
  tokenId: BigNumber,
  value: BigNumber
): Promise<any> => {
  const tx = await ensMarketInstance
    .connect(signer)
    .buyAsset(tokenId, { value: value });
  const receipt = await tx.wait();
  console.log('receipt', receipt);

  return receipt;
};

/**
 * Unlists an asset from the ENS marketplace.
 * @param {ethers.Signer} signer - The signer object used for signing the transaction.
 * @param {BigNumber} tokenId - The token ID of the asset to unlist.
 * @returns {Promise<any>} The transaction receipt.
 */
export const unlistAsset = async (
  signer: ethers.Signer,
  tokenId: BigNumber
): Promise<any> => {
  const tx = await ensMarketInstance.connect(signer).unlistAsset(tokenId);
  const receipt = await tx.wait();
  console.log('receipt', receipt);

  return receipt;
};

/**
 * Sets the marketplace admin address.
 * @param {ethers.Signer} signer - The signer object used for signing the transaction.
 * @param {string} admin - The address to set as the marketplace admin.
 * @returns {Promise<any>} The transaction receipt.
 */
export const setAdmin = async (
  signer: ethers.Signer,
  admin: string
): Promise<any> => {
  const tx = await ensMarketInstance.connect(signer).setAdmin(admin);
  const receipt = await tx.wait();

  return receipt;
};

/**
 * Sets the marketplace royalty percentage.
 * @param {ethers.Signer} signer - The signer object used for signing the transaction.
 * @param {BigNumber} royalty - The royalty percentage to set.
 * @returns {Promise<any>} The transaction receipt.
 */
export const setRoyalty = async (
  signer: ethers.Signer,
  royalty: BigNumber
): Promise<any> => {
  const tx = await ensMarketInstance.connect(signer).setRoyalty(royalty);
  const receipt = await tx.wait();

  return receipt;
};

/**
 * Returns the current marketplace admin address.
 * @returns {Promise<any>} The admin address.
 */
export const getAdmin = async (): Promise<any> => {
  const admin = await ensMarketInstance.getAdmin();
  console.log('admin', admin);

  return admin;
};

/**
 * Returns the current ENS token address used by the marketplace.
 * @returns {Promise<any>} The ENS token address.
 */
export const getENS = async (): Promise<any> => {
  const ens = await ensMarketInstance.getENS();
  console.log('ens', ens);

  return ens;
};

/**
 * Returns the current royalty percentage of the marketplace.
 * @returns {Promise<any>} The royalty percentage.
 */
export const getRoyalty = async (): Promise<any> => {
  const royalty = await ensMarketInstance.getRoyalty();
  console.log('royalty', royalty);

  return royalty;
};
/**
 * Returns the listing details for a specific token ID
 * in the ENS marketplace.
 * @param {BigNumber} tokenId - The token ID of the listing to retrieve.
 * @returns {Promise<any>} The listing details.
 */
export const getListing = async (tokenId: BigNumber): Promise<any> => {
  const listing = await ensMarketInstance.getListing(tokenId);
  console.log('listing', listing);

  return listing;
};

/**
 * Returns all listings in the ENS marketplace.
 * @returns {Promise<any>} An array of all listings.
 */
export const getAllListings = async (): Promise<any> => {
  const allListings = await ensMarketInstance.getAllListings();
  console.log('allListings', allListings);

  return allListings;
};
